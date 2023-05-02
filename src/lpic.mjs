
import yaml from "yaml"

import { Config, AppendableCommand } from "tmgrammars/lib/configuration.mjs"
import { Grammars     } from "tmgrammars/lib/grammars.mjs"
import { ScopeActions } from "tmgrammars/lib/scopeActions.mjs"
import { Structures   } from "tmgrammars/lib/structures.mjs"

const True  = 1
const False = 0

const cliArgs = new AppendableCommand('[path]')

cliArgs
  .name('lpic')
  .description('A tool to extract and build code from Literate Programming in ConTeXt documents.')
  .version('0.0.1')

Config.addCliArgs(cliArgs) ;

cliArgs
.arguments('[path]', 'The document to parse while tracing scopes, actions and structures')

cliArgs.parse();

var config = {}
try {
  config = await Config.loadConfig(cliArgs, {
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

console.log(yaml.stringify(cliArgs.opts()))
console.log(yaml.stringify(cliArgs.args))
