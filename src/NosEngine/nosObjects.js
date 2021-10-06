let sintaxe = null;
let getRules= null;
if(localStorage.lang == "pt"){
    sintaxe =  require('./pt/noslexicopt')
    getRules = require('./pt/nosLanguaRulespt')
}else{
    sintaxe =  require('./noslexico')
    getRules = require('./nosLanguaRules')
}


let editor = function (monaco){
// Esta funcao serve para controlar se a linguagem ja foi registado no editor Monaco para nao ser repitido varias vezes no intelicence
if(!window.Nos.getProjectInfo.started){
    // Register a new language
    monaco.languages.register({ id: 'Nos' });
    window.Nos.getProjectInfo.started = true;
    monaco.languages.setMonarchTokensProvider('Nos',getRules);                
    // Register a completion item provider for the new language
   const {dispose} =  monaco.languages.registerCompletionItemProvider('Nos', {
        provideCompletionItems: () => sintaxe(monaco)
    });

    console.log(dispose)
   // dispose()
}


}
module.exports = editor;
