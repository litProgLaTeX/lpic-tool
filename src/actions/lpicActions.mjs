
import yaml from "yaml"

class BuildArtifact {
  constructor(artifactName, buildType) {
    this.name = artifactName
    this.type = buildType
  }

}

class BuildReqs {

  buildInfo = {}

  addBuildArtifact(buildName, buildType) {
    if (!this.buildInfo[buildType]) this.buildInfo[buildType] = {}
    this.buildInfo[buildType][buildName] = new BuildArtifact(buildName, buildType)
  }
}

class CodeChunk {
  constructor(startLine, stopLine, theLines, docName) {
    this.startLine = startLine
    this.stopLine  = stopLine
    this.theLines  = theLines
    this.docName   = docName
  }
}

class CodeChunks {
  chunks = {}

  startCodeFor(docName, codeType, lineNumber) {
    if (!this.chunks[codeType]) this.chunks[codeType] = {}
    if (!this.chunks[codeType][docName]) this.chunks[codeType][docName] = {}
    this.chunks[codeType][docName]['start'] = lineNumber
  }

  stopCodeFor(docName, codeType, lineNumber, docLines) {
    if (!this.chunks[codeType]) this.chunks[codeType] = {}
    if (!this.chunks[codeType][docName]) this.chunks[codeType][docName] = {}
    const theCode = this.chunks[codeType][docName]
    if (!theCode['start']) {
      console.log(`WARNING: no start of ${codeType} in ${docName}`)
      console.log(`  ... ignoring the chunk that ends at ${lineNumber}!`)
      return
    }
    const startLine = theCode['start']
    const stopLine  = lineNumber
    if (stopLine <= startLine) {
      console.log(`WARNING: no ${codeType} found between ${startLine} and ${stopLine} in ${docName}`)
      console.log("  ... ignoring this chuck!")
      return
    }
    if (!theCode['chunks']) theCode['chunks'] = []
    theCode['chunks'].push(new CodeChunk(
      startLine, stopLine, docLines.slice(startLine+1, stopLine), docName
    ))
  }

}

export function registerActions(config, Builders, Grammars, ScopeActions, Structures) {

  Structures.newStructure('code', new CodeChunks())
  Structures.newStructure('build', new BuildReqs())

  function getCodeType(aScope) {
    return aScope.split('.')[4]
  }

  ScopeActions.addScopedAction(
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

  ScopeActions.addScopedAction(
    'keyword.control.source.stop.lpic',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      const codeType = theTokens[1]
      console.log("----------------------------------------------------------")
      console.log("stopCode")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(` codeType: ${codeType}`)
      console.log(`theTokens: ${theTokens}`)
      console.log(`  theLine: ${theLine}`)
      console.log(`   theDoc: ${theDoc.docName}`)
     console.log("----------------------------------------------------------") 
     const code = Structures.getStructure('code')
     code.stopCodeFor(theDoc.docName, codeType, theLine, theDoc.docLines)
   }
  )

  ScopeActions.addScopedAction(
    'finalize.control.source',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      console.log("----------------------------------------------------------")
      console.log("finalizeCode")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      //console.log(`  theLine: ${theLine}`)
      //console.log(`   theDoc: ${theDoc.docName}`)
     console.log("----------------------------------------------------------")
     const code = Structures.getStructure('code')
     for (const aCodeType in code.chunks) {
      for (const aDocName in code.chunks[aCodeType]) {
        console.log(aCodeType)
        console.log(aDocName)
        const chunks = code.chunks[aCodeType][aDocName]['chunks']
        for (const aChunk of chunks) {
          console.log(yaml.stringify(aChunk))
        }
      }
     }
    }
  )

  ScopeActions.addScopedAction(
    'keyword.control.build.lpic',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      console.log("----------------------------------------------------------")
      console.log("build")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      console.log(`  theLine: ${theLine}`)
      console.log(`   theDoc: ${theDoc.docName}`)
     console.log("----------------------------------------------------------")
     const buildName = theTokens[1]
     const buildType = theTokens[3]
     const buildInfo = Structures.getStructure('build')
     buildInfo.addBuildArtifact(buildName, buildType)
    }
  )

  ScopeActions.addScopedAction(
    'keyword.control.requires.lpic',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      console.log("----------------------------------------------------------")
      console.log("requires")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      console.log(`  theLine: ${theLine}`)
      console.log(`   theDoc: ${theDoc.docName}`)
     console.log("----------------------------------------------------------")
     const buildName = theTokens[1]
     const reqType   = theTokens[3]
     const reqName   = theTokens[5]
    }
  )

}