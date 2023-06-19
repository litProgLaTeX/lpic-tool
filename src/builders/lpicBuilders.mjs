
import yaml from "yaml"

export function registerBuilders(config, Builders, Grammars, ScopeActions, Structures, logger) {

  Builders.addBuilder(
    'keyword.control.source.start.lpic',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      const codeType = theTokens[1]
      logger.debug("----------------------------------------------------------")
      logger.debug("startCode")
      logger.debug(`thisScope: ${thisScope}`)
      logger.debug(` theScope: ${theScope}`)
      logger.debug(` codeType: ${codeType}`)
      logger.debug(`theTokens: ${theTokens}`)
      logger.debug(`  theLine: ${theLine}`)
      logger.debug(`   theDoc: ${theDoc.docName}`)
      logger.debug("----------------------------------------------------------")
      const code = Structures.getStructure('code')
      code.startCodeFor(theDoc.docName, codeType, theLine)
    }
  )

}