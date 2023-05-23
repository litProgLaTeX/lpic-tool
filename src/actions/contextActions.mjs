
class Components {

  pendingComponents = {}
  loadedComponents  = {}

  pending(aComponent) {
    this.pendingComponents[aComponent] = true
  }

  getPending() {
    return Object.keys(this.pendingComponents)
  }

  loaded(aComponent) {
    if (this.pendingComponents[aComponent]) {
      delete this.pendingComponents[aComponent]
    }
    this.loadedComponents[aComponent] = true
  }
}

export function registerActions(configDict, ConfigClass, Builders, Grammars, ScopeActions, Structures) {

  Structures.newStructure('components', new Components())

  ScopeActions.addScopedAction(
    'initialize.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      console.log("----------------------------------------------------------")
      console.log("initializeComponents")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      //console.log(`  theLine: ${theLine}`)
      //console.log(`   theDoc: ${theDoc.docName}`)
      console.log("----------------------------------------------------------")  
    }
  )

  ScopeActions.addScopedAction(
    'run.load.components.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      console.log("----------------------------------------------------------")
      console.log("runComponent")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      //console.log(`  theLine: ${theLine}`)
      //console.log(`   theDoc: ${theDoc.docName}`)
      console.log("----------------------------------------------------------")
      const components = Structures.getStructure('components')
      for (const aDocPath of theTokens) {
        components.pending(aDocPath)
      }
      var someComponents = components.getPending()
      while (0 < someComponents.length) {
        console.log(someComponents)
        for (const aDocPath of someComponents) {
          components.loaded(aDocPath)
          await Grammars.traceParseOf(aDocPath, configDict)
        }
        someComponents = components.getPending()
      }
    }
  )

  ScopeActions.addScopedAction(
    'keyword.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      const components = Structures.getStructure('components')
      components.pending(theTokens[1]+'.tex')
      console.log("----------------------------------------------------------")
      console.log("loadComponent")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      console.log(`  theLine: ${theLine}`)
      console.log(`   theDoc: ${theDoc.docName}`)
      console.log("----------------------------------------------------------")
    }
  )

  ScopeActions.addScopedAction(
    'finalize.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      console.log("----------------------------------------------------------")
      console.log("finalizeComponents")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      //console.log(`  theLine: ${theLine}`)
      //console.log(`   theDoc: ${theDoc.docName}`)
     console.log("----------------------------------------------------------") 
    } 
  )

}