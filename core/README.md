# NOS-CORE

Este arquivo serve para explicar e tomar notas sobre alguns pontos impotantes nos relacionados ao compilador

## DICTIONARY OBJECT SYNTAX

### Basic nos-compiler dictionary's word syntax

This is how each word/command that will be translated should look.

 ```json
 "nos_command": {
        "type": String,
        "command": String,
        "end": "Character to append on the end of the line",
        "internals": Array[
            {
                "key":String,
                "command":String,
            }
        ],
        "ignore_on_translate": Boolean,
        "ignore_all": Boolean,
        "no_parentheses":Boolean
    },
 ```

 Como podemos ver aí em cima, o dicionário de Nós pode ser escrito de uma única forma, a qual descrevemos.

|Key|Description| Possible options |Required?|
|----|---|---|---|
|nos_command|This refers to the command/word that you want to register on the compiler|Any one word string|YES|
|type|This propertie, informs to compiler how to handle the translation of this command|`data_t` (Data type eg: int, float, string etc), `func` (Function), `cmd` (command that just need to be executed), `bloc` (Bloc, a group that will containe multiple commands or groups), `operator` (Operator dat will asign a value to a variable), `compiler_command` (This is a special command just fore the compiler)|YES|
|command|Here we specify the Equivalent python command that this word will be translated to, or any character we nedd to replace this command/word|Any one word string|YES|
|end|This is useful when you wat that any line of code containing this command ends with a specifique character|Any string|NO|
|internals|This is an Array of objects that are (sub-words) that will be inside this command. For an example see the command `para` in the dictionary, this command need to have the `=>` sign (internaly) an it will be translated to `in` when pased to python|NULL|YES if the command contains internal reserved keys|
|ignore_on_translate|This informs to the compiler if this command need to be ignored when translating the commands|NO|
|ignore_all|In case that we want the compiler to ignore the code line taht containes this command, this option is here for us|NO|
|no_parentheses|This option tels to the compiler to remo the first pair of parentheses in case we are making a function, because python functions does not need to have parentheses|NULL|YES if dealing with function ou commands that python supports only without parentheses|

Now you have the knowledge on how to build your own {NOS} dictionary, go on and make a try.
