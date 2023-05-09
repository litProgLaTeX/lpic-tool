
import yaml from "yaml"

export function registerBuilders(config, Builders, Grammars, ScopeActions, Structures) {

  Builders.addBuilder(
    'keyword.control.source.start.lpic',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      const codeType = theTokens[1]
      console.log("----------------------------------------------------------")
      console.log("startCode")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(` codeType: ${codeType}`)
      console.log(`theTokens: ${theTokens}`)
      console.log(`  theLine: ${theLine}`)
      console.log(`   theDoc: ${theDoc.docName}`)
     console.log("----------------------------------------------------------")
     const code = Structures.getStructure('code')
     code.startCodeFor(theDoc.docName, codeType, theLine)
    }
  )

}