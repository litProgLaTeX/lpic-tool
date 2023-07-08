
class Components {

  pendingComponents : Set<string> = new Set()
  loadedComponents : Set<string>  = new Set()

  pending(aComponent : string) {
    this.pendingComponents.add(aComponent)
  }

  getPending() {
    return Object.keys(this.pendingComponents)
  }

  loaded(aComponent : string) {
    if (this.pendingComponents.has(aComponent)) {
      this.pendingComponents.delete(aComponent)
    }
    this.loadedComponents.add(aComponent)
  }
}

export function registerActions(configDict, ConfigClass, Builders, Grammars, ScopeActions, Structures, logger) {

  Structures.newStructure('components', new Components())

  ScopeActions.addScopedAction(
    'initialize.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      logger.trace("----------------------------------------------------------")
      logger.trace("initializeComponents")
      logger.trace(`thisScope: ${thisScope}`)
      logger.trace(` theScope: ${theScope}`)
      logger.trace(`theTokens: ${theTokens}`)
      //logger.trace(`  theLine: ${theLine}`)
      //logger.trace(`   theDoc: ${theDoc.docName}`)
      logger.trace("----------------------------------------------------------")  
    }
  )

  ScopeActions.addScopedAction(
    'run.load.components.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      logger.trace("----------------------------------------------------------")
      logger.trace("runComponent")
      logger.trace(`thisScope: ${thisScope}`)
      logger.trace(` theScope: ${theScope}`)
      logger.trace(`theTokens: ${theTokens}`)
      //logger.trace(`  theLine: ${theLine}`)
      //logger.trace(`   theDoc: ${theDoc.docName}`)
      logger.trace("----------------------------------------------------------")
      const components = Structures.getStructure('components')
      for (const aDocPath of theTokens) {
        components.pending(aDocPath)
      }
      var someComponents = components.getPending()
      while (0 < someComponents.length) {
        logger.trace(someComponents)
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
      logger.trace("----------------------------------------------------------")
      logger.trace("loadComponent")
      logger.trace(`thisScope: ${thisScope}`)
      logger.trace(` theScope: ${theScope}`)
      logger.trace(`theTokens: ${theTokens}`)
      logger.trace(`  theLine: ${theLine}`)
      logger.trace(`   theDoc: ${theDoc.docName}`)
      logger.trace("----------------------------------------------------------")
    }
  )

  ScopeActions.addScopedAction(
    'finalize.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens, theLine, theDoc) {
      logger.trace("----------------------------------------------------------")
      logger.trace("finalizeComponents")
      logger.trace(`thisScope: ${thisScope}`)
      logger.trace(` theScope: ${theScope}`)
      logger.trace(`theTokens: ${theTokens}`)
      //logger.trace(`  theLine: ${theLine}`)
      //logger.trace(`   theDoc: ${theDoc.docName}`)
      logger.trace("----------------------------------------------------------")  
    }
  )

}