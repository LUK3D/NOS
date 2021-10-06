/* Arquivo de configuracao de IDE portugues */
let rules = {

    delimiter: ['.'],
    keywords: [
        'funcao',
        'mostre',
        'leia',
        'se',
        'senao',
        'faca',
        'enquanto',
        'para',
        'paraInteiro',
        'paraTexto',
        'enquanto',
        'importa',

    ],

    typeKeywords: [
        'inteiro',
        'decimal',
        'boleano',
        'dinamico',
        'texto',
        'real',
        
    ],

    operators: [
        '=',
        '>',
        '<',
        '!',
        '~',
        '?',
        ':',
        '==',
        '<=',
        '>=',
        '!=',
        '&&',
        '||',
        '++',
        '--',
        '+',
        '-',
        '*',
        '/',
        '&',
        '|',
        '^',
        '%',
        '<<',
        '>>',
        '>>>',
        '+=',
        '-=',
        '*=',
        '/=',
        '&=',
        '|=',
        '^=',
        '%=',
        '<<=',
        '>>=',
        '>>>=',
    ],

    // we include these common regular expressions
    // eslint-disable-next-line
    symbols: /[=><!~?:&|+\-*\/\^%]+/,

    // C# style strings
    // eslint-disable-next-line
    escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

    // The main tokenizer for our languages
    tokenizer: {
        root: [
            // identifiers and keywords
            [
                /[a-z_$][\w$]*/, {
                    cases: {
                        '@typeKeywords': 'keyword',
                        '@keywords': 'keyword',
                        '@default': 'identifier'
                    }
                }
            ],
            // eslint-disable-next-line
            [
                /[A-Z][\w\$]*/, 'type.identifier'
            ],
            // to show class names nicely

            // whitespace
            {
                include: '@whitespace'
            },

            // delimiters and operators
            // eslint-disable-next-line
            [
                /[{}()\[\]]/, '@brackets'
            ],
            [
                /[<>](?!@symbols)/, '@brackets'
            ],
            [
                /@symbols/, {
                    cases: {
                        '@operators': 'operator',
                        '@default': ''
                    }
                }
            ],

            // @ annotations.
            // As an example, we emit a debugging log message on these tokens.
            // Note: message are supressed during the first load -- change some lines to see them.
            // eslint-disable-next-line
            [
                /@\s*[a-zA-Z_\$][\w\$]*/, {
                    token: 'annotation',
                    log: 'annotation token: $0'
                }
            ],

            // numbers
            // eslint-disable-next-line
            [
                /\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'
            ],
            [
                /0[xX][0-9a-fA-F]+/, 'number.hex'
            ],
            [
                /\d+/, 'number'
            ],

            // delimiter: after number because of .\d floats
            [
                /[;,.]/, 'delimiter'
            ],

            // strings
            [
                /"([^"\\]|\\.)*$/, 'string.invalid'
            ], // non-teminated string
            [
                /"/, {
                    token: 'string.quote',
                    bracket: '@open',
                    next: '@string'
                }
            ],

            // characters
            [
                /'[^\\']'/, 'string'
            ],
            [
                /(')(@escapes)(')/,
                [
                    'string', 'string.escape', 'string'
                ]
            ],
            [
                /'/, 'string.invalid'
            ]
        ],

        comment: [
            // eslint-disable-next-line
            [
                /[^\/*]+/, 'comment'
            ],
            [
                /\/\*/, 'comment', '@push'
            ], // nested comment
            [
                "\\*/", 'comment', '@pop'
            ],
            // eslint-disable-next-line
            [/[\/*]/, 'comment']
        ],

        string: [
            [
                /[^\\"]+/, 'string'
            ],
            [
                /@escapes/, 'string.escape'
            ],
            [
                /\\./, 'string.escape.invalid'
            ],
            [
                /"/, {
                    token: 'string.quote',
                    bracket: '@close',
                    next: '@pop'
                }
            ]
        ],

        whitespace: [
            [
                /[ \t\r\n]+/, 'white'
            ],
            [
                /\/\*/, 'comment', '@comment'
            ],
            [
                /\/\/.*$/, 'comment'
            ],
        ]
    }
};


function getRules() {
    return rules;
}

module.exports = rules;
