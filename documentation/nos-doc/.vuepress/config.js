module.exports = {
    title:'{Nos} Linguagem de Programação',
    themeConfig:{
        theme: 'default-prefers-color-scheme',
        themeConfig: {
            overrideTheme: 'dark',
            prefersTheme: 'dark',
          },
        nav:[
            {
                text:'Introdução',
                link:"introduction.md"
            },
            {
                text:'Instalação',
                link:"instalation.md"
            },
            {
                text:'Sintaxe',
                link:"sintaxe.md"
            },
        ],
        sidebar:[
            '/',
            '/introduction',
            '/instalation',
            '/sintaxe',
        ]
    }
}