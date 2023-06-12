
import yaml from "yaml"

import { Config, AppendableCommand } from "lpic-modules/lib/configuration.mjs"
import { Grammars     } from "lpic-modules/lib/grammars.mjs"
import { ScopeActions } from "lpic-modules/lib/scopeActions.mjs"
import { Structures   } from "lpic-modules/lib/structures.mjs"

const True  = 1
const False = 0

const cliArgs = new AppendableCommand('[path]')

cliArgs
  .name('lpic')
  .description('A tool to extract and build code from Literate Programming in ConTeXt documents.')
  .version('0.0.1')

Config.addCliArgs(cliArgs, 'lpic') ;

cliArgs
.arguments('[path]', 'The document to parse')

cliArgs.parse();

var config = {}
try {
  config = await Config.loadConfig(cliArgs, 'lpic', {
    ignoreConfig: True
  }, {
    preLoadFunc: function(config) {
      const loadActions = {}
      if (config['loadActions']) {
        config['loadActions'].forEach(function(actionsPath){
          loadActions[actionsPath] = True
        })
      }
      loadActions['$/src/actions'] = True
      config['loadActions'] = Object.keys(loadActions)

      const loadGrammars = {}
      if (config['loadGrammar']) {
        config['loadGrammar'].forEach(function(grammarPath){
          loadGrammars[grammarPath] = True
        })
      }
      loadGrammars["@/lpic-syntaxes/lpicSyntaxes/context.tmLanguage.json"] = True
      loadGrammars["@/lpic-syntaxes/lpicSyntaxes/lpic.tmLanguage.json"] = True
      config['loadGrammar'] = Object.keys(loadGrammars)
    },
    preSaveFunc: function(config){
      if (config['ignoreConfig']) delete config['ignoreConfig']
      if (config['loadActions']) {
        config['loadActions'] = config['loadActions'].map(function(aPath){
          return Config.normalizePath(aPath)
        })
      }
      if (config['loadGrammar']) {
        config['loadGrammar'] = config['loadGrammar'].map(function(aPath){
          return Config.normalizePath(aPath)
        })
      }
    }
  })
} catch (error) {
  console.error(error)
  process.exit(1)
}

if (config['initialFiles'].length < 1) {
  console.log("No document specified to parse")
  process.exit(0)
}

try {
  await ScopeActions.runActionsStartingWith('initialize', 'lpic', [], config['parallel'])
  
  await ScopeActions.runActionsStartingWith('run', 'lpic', config['initialFiles'], config['parallel'])
  
  await ScopeActions.runActionsStartingWith('finalize', 'lpic', [], config['parallel'])
} catch (err) {
  const error = await err
  console.log(error)
}
