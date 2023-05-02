
export function registerActions(ScopeActions) {

  function loadComponent(thisScope, theScope, theTokens, callArgs) {
    console.log("----------------------------------------------------------")
    console.log("loadComponent")
    console.log(`thisScope: ${thisScope}`)
    console.log(` theScope: ${theScope}`)
    console.log(`theTokens: ${theTokens}`)
    console.log(` callArgs: ${callArgs}`)
    console.log("----------------------------------------------------------")
  }

  ScopeActions.addScopedAction(
    'keyword.control.structure.context',
    import.meta.url,
    { },
    loadComponent
  )

}