# Aqui deve constar todos os codigos e arquivos relacionados a IExec_no


### Operações aritméticas básicas:
`x = 3`
`y = 2`
`x + y = 5`
`x + "p" = 3p`
var x = (2 + 3). =>[{
                    "label": "name",
                    "type": "var",
                    "value": {
                        "label": "show",
                        "type": "internalFunction",
                        "value": "'Clever Clever'"
                    }

}]


### Funções de Dados
`"Ismael Clever"->show().` => `[
                                    {
                                        "label": "name",
                                        "type": "var",
                                        "value": {
                                            "label": "show",
                                            "type": "internalFunction",
                                            "value": "'Clever Clever'"
                                        }
                                    }
                                ]`

`"Ismael Clever"->read()->show().` => `[
                                    {
                                        "label": "Ismael Clever",
                                        "type": "var",
                                        "value": [
                                            {
                                                "label": "read",
                                                "type": "internalFunction",
                                                "value": ""
                                            },
                                            {
                                                "label": "show",
                                                "type": "internalFunction",
                                                "value": "'Clever Clever'"
                                            }
                                        ]
                                    }
                                ]`
