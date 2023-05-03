
export function registerActions(ScopeActions, Structures) {

  Structures.newStructure('components')

  ScopeActions.addScopedAction(
    'initialize.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens) {
      console.log("----------------------------------------------------------")
      console.log("initializeComponents")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      console.log("----------------------------------------------------------")  
    }
  )

  ScopeActions.addScopedAction(
    'keyword.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens) {
      console.log("----------------------------------------------------------")
      console.log("loadComponent")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      console.log("----------------------------------------------------------")
    }
  )

  ScopeActions.addScopedAction(
    'finalize.control.structure.context',
    import.meta.url,
    async function(thisScope, theScope, theTokens) {
      console.log("----------------------------------------------------------")
      console.log("finalizeComponents")
      console.log(`thisScope: ${thisScope}`)
      console.log(` theScope: ${theScope}`)
      console.log(`theTokens: ${theTokens}`)
      console.log("----------------------------------------------------------") 
    } 
  )

}