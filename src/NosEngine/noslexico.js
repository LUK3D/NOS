let sintaxe = function(monaco){

    var suggestions = [
    {
        label: 'Read',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'read(${1:value}).',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Pede ao utilizador que digite um valor e retorna o mesmo.',

    }, 
    {
        label: 'Show',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'show(${1:value}).',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Exibe o valor atribuida na tela',

    }, 
    {
        label: 'Use',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: 'use:${1:library}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Importa as funções internas de uma biblioteca.',

    }, 
    {
        label: 'ifelse',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'if (${1:condition}) {',
            '\t$0',
            '} else {',
            '\t',
            '}'
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'If-Else Statement'
    }
    ,{
        label: 'function',
        kind: monaco.languages.CompletionItemKind.Snippet,
        insertText: [
            'function ${1:functionName} (${2:condition1},${3:condition2}) {',
            '\t$0',
            
            '}',
           
        ].join('\n'),
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Create a new function'
    },
    {
        label: 'Var',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'var ${1:name}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável genérica.',

    }, 
    {
        label: 'Int',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'int ${1:name}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Inteiro.',

    }, 
    {
        label: 'Number',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'number ${1:name}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável Numérica (Inteiros e Reais).',

    }, 
    {
        label: 'String',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'string ${1:name}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Texto (String).',

    }, 
    {
        label: 'Boolean',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'boolean ${1:name}.',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Declara um avarável do tipo Lógico (Boolean).',

    }, 
    {
        label: 'True',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'true',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Valor lógico aplicado a uma variável do tipo boleano',

    }, 
    {
        label: 'False',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'false',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Valor lógico aplicado a uma variável do tipo boleano',

    }, 
    {
        label: 'Null',
        kind: monaco.languages.CompletionItemKind.Snippet,
       /*  kind: monaco.languages.CompletionItemKind.Text, */
        insertText: 'null',
        insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
        documentation: 'Atribui o valor nulo a uma variável.',

    }, 
    
    ];
    return { suggestions: suggestions };

}

module.exports = sintaxe;