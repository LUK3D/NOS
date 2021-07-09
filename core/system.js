//Codigo {NOS} de teste que e usado para testar o transpilador
window.code=`
#Teste basico de codigo em {Nos}

texto resultado;
funcao mostrar (nome, idade = 5){
   
    retorna (nome, "a sua idade e", idade);
}

resultado = mostrar("Filipe Lukebana", 42)

mostre(resultado)

resultado = mostrar("Tabita Makuntima")

mostre(resultado)

`;


window.NOS = {
    Transpile(code){
        var ncode = code.replace(/^\s*\n/gm,'').split("\n"); //Removendo todas as linhas em branco (sem comandos) do código informado pelo user.
        var pyCode_final = "";
        var insideFunction = false; //Esta variavel define se o transpilador esta lendo uma função ou está lendo comandos no escopo global.
        //Percorrendo cada linha de comando ser processado
        var userFunctions = [];
        ncode.forEach(element => {
                var v = element.trimStart().split(" "); //Dividindo o comando em duas parte, onde a primeira deve corresponder à instrução e a segunda parte corresponder ao valor.
                var dType = this.typeOf(v[0].trim());
               // console.log(v)
                /* 
                *Caso o comando for um tipo de dado, então trata-se de declaração de uma variavel
                Então neste bloco inicializamos uma variavel em python e removemos o delimitador ";"
                */
               if(insideFunction && element.trim() == "}"){
                insideFunction = false;
               }
                if(dType && element!=""){
                    if(dType.type == "Function"){
                        insideFunction = true;
                        pyCode_final +="def " +element.substring(6,element.length-1).trim() +":";
                        userFunctions.push(element.substring(6,element.indexOf("(")-1).trim())
                    }
                    else
                        if(insideFunction)
                            pyCode_final += "\t"+(v[1].replace(";","")+"="+dType.default);
                        else
                            pyCode_final += (v[1].replace(";","")+"="+dType.default);
                }else{
                    var cmd = element.trim().match(/^([^(]+)/gm);
                   if(cmd){

                        if(cmd[0].includes("=")){
                            cmd = cmd[0].split(" ")[2].trim();
                        }else{
                            cmd = cmd[0].trim();
                        }
                       
                        var command = this.translate(cmd); 
                        
                        if(command){
                            if(command.type == "function"){
                                if(!command.input){
                                    var result = command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    if(insideFunction)
                                        pyCode_final += "\t"+(result);
                                    else
                                        pyCode_final+=(result);
                                        
                                }else{
                                    var result = v[0].trim().split("(")[0] + "=" + command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    if(insideFunction)
                                    pyCode_final+="\t"+(result);
                                    else
                                    pyCode_final+=(result);
                                }
                            }
                            if(command.type == "command"){
                                
                                        if(insideFunction)
                                        pyCode_final+="\t"+command.pyCode + element.split(cmd)[1].split(";").join("");
                                        else
                                        pyCode_final+=command.pyCode + element.split(cmd)[1].split(";").join("");
                            }
                        }else{
                            var customFunc = element.split("(")[0];
                            //console.log(userFunctions.indexOf(customFunc))

                            //console.log(userFunctions[0], customFunc)
                            if(userFunctions.indexOf(customFunc)==-1){
                                //console.error(this.DEBUGGER.undefinedFunction(customFunc));
                                var commandParts = element.trim().split("=");
                                if(commandParts.length>1){
                                    if(insideFunction)
                                        pyCode_final+="\t"+ element.split(";").join("");
                                    else
                                        pyCode_final+=element.split(";").join("");
                                }else{
                                    var cmd = element.trimStart().split("(")[0].trim;
                                    if(this.translate(cmd)){
                                        if(insideFunction)
                                        pyCode_final+="\t"+cmd + element.split(cmd)[1].split(";").join("");
                                        else
                                        pyCode_final+=cmd + element.split(cmd)[1].split(";").join("");
                                    }
                                }
                            }
                            else{
                                if(insideFunction)
                                pyCode_final+="\t"+element.split(";").join("");
                                else
                                pyCode_final+=element.split(";").join("");
                            }
                        }

                   }else{
                        //console.log(element)
                        //this.Transpile(element.split(" ").join("").split("=")[1]);
                    
                   }
                }
                pyCode_final+= "\n";
        });

        return pyCode_final;
    },
    /** Função que determina o tipo de dado da variavel passada como parâmetro
     * @param  {any} value
     * @returns {object} 
     */
    typeOf(value){
        return this.DATATYPES[value];
    },
    /** Função que traduz os comandos NOS em seus equivalentes em Python
     * @param  {string} word é a palavra que será retornada
     * @returns {object} 
     */
    translate(word){
        return this.RESERVED[word];
    },
    RESERVED:{
        leia:{type:"function", pyCode:"input", input:true},
        mostre:{type:"function", pyCode:"print", input:false},
        toInt:{type:"function", pyCode:"int", input:true},
        elevado:{type:"function", pyCode:"pow", input:true},
        retorna:{type:"command", pyCode:"return", input:true},
    },
    DATATYPES:{
        float:{type:"Decimal", default:0.0},
        int:{type:"Integer", default:0},
        bool:{type:"Boolean", default:"True"},
        texto:{type:"String", default:`""`},
        var:{type:"Any", default:`""`},
        objecto:{type:"Object", default:"{}"},
        funcao:{type:"Function", default:null},
    },
    DEBUGGER:{
        undefinedFunction(functionName){
            return `Nenhuma função ${functionName} foi definida neste documento`;
        }
    }
    

    
};