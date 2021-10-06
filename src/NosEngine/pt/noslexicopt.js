let sintaxe = function(monaco){

    var suggestions = [
    {
        label: 'Leia',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'leia("${1:Mensagem}: ");',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Pede ao utilizador que digite um valor e retorna o mesmo.',

    }, 
    {
        label: 'Mostre',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'mostre(${1:Valor});',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Exibe o valor atribuida na tela',

    }, 
    {
        label: 'Importa',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'importa:[${1:Propriedade}]:${2:Classe};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Importa as funções internas de uma classe.',

    }, 
    {
        label: 'Se / Senao',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'se (${1:condition}) {',
            '\t$0',
            '} senao {',
            '\t',
            '}'
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Se-Senao Statement'
    }
    ,{
        label: 'funcao',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'funcao ${1:nome_da_Funcao} (${2:parametro1},${3:parametro2}) {',
            '\t$0',
            
            '}',
           
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Create a new function'
    }
    ,{
        label: 'Para',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'para (${1:i} em ${2:vetor}) {',
            '\t$0',
            
            '}',
           
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: '## Ciclo de repetição. Recomendado ser utilizado quando se conhece o limite do loop.'
    },
    {
        label: 'Enquanto...',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'enquanto (${1:contador} ${2:condicao} ${3:valor}) {',
            '\t$0',
            
            '}',
           
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: '## Ciclo de repetição. Recomendado ser utilizado quando se conhece o limite do loop.'
    },
    {
        label: 'Dinamico',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'Dinamico ${1:name};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável dinâmica.',

    }, 
    {
        label: 'Inteiro',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'inteiro ${1:nome};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Inteiro.',

    }, 
    {
        label: 'Decimal',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'decimal ${1:nome};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável Numérica (Inteiros e Reais).',

    }, 
    {
        label: 'Texto',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'texto ${1:nome};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Texto.',

    }, 
    {
        label: 'Caractere',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'caractere ${1:nome};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Caractere.',

    }, 
    {
        label: 'Boleano',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'boleano ${1:nome};',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Lógico (Boolean).',

    }, 
    {
        label: 'Verdade',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'verdade',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Valor lógico aplicado a uma variável do tipo boleano',

    }, 
    {
        label: 'Falso',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'falso',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Valor lógico aplicado a uma variável do tipo boleano',

    }, 
    {
        label: 'Nulo',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'nulo',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Atribui o valor nulo a uma variável.',

    }, 
    
    ];
    return { suggestions: suggestions };

}

module.exports = sintaxe;