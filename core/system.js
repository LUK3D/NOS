//Codigo {NOS} de teste que e usado para testar o transpilador
window.code=`
#Teste basico de codigo em {Nos}

var nome;
var idade;
var continuar;

funcao executa(){
    Terminal.limpaTela();
nome = leia("Informe o seu nome: ");
idade = leia("Informe a idade: ");

mostre(nome,"a sua idade e: ", idade);

continuar = leia("Pretende continuar? ");

    se(continuar == "sim"){
executa();
    }
    senao{
        mostre("Fim do programa");
    }
}

executa();

`;


window.NOS = {
    Transpile(code){
        var ncode = code.replace(/^\s*\n/gm,'').split("\n"); //Removendo todas as linhas em branco (sem comandos) do código informado pelo user.
        var pyCode_final = "";
        var insideFunction = false; //Esta variavel define se o transpilador esta lendo uma função ou está lendo comandos no escopo global.
        //Percorrendo cada linha de comando ser processado
        var userFunctions = [];
        var tabsTime = 0;
        ncode.forEach(element => {
                var v = element.trimStart().split(" "); //Dividindo o comando em duas parte, onde a primeira deve corresponder à instrução e a segunda parte corresponder ao valor.
                var dType = this.typeOf(v[0].trim());
                var classFunction = ""; // variavel para armazenar a funcao da classe invocada
               // console.log(v)
                /* 
                *Caso o comando for um tipo de dado, então trata-se de declaração de uma variavel
                Então neste bloco inicializamos uma variavel em python e removemos o delimitador ";"
                */
               if(insideFunction && element.trim() == "}"){
                insideFunction = false;
                tabsTime-=1;
               }
                if(dType && element!=""){
                    if(dType.type == "Function"){
                        insideFunction = true;
                        tabsTime+=1;
                        pyCode_final +="def " +element.substring(6,element.lastIndexOf(")")+1).trim() +":";
                        userFunctions.push(element.substring(6,element.indexOf("(")).trim())
                        console.log(userFunctions)
                    }
                    else
                        if(insideFunction)
                            pyCode_final += this.indent(tabsTime)+(v[1].replace(";","")+"="+dType.default);
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

                        if(cmd.split(".").length>1){
                            classFunction = cmd.split(".")[1];
                            cmd = cmd.split(".")[0];
                        }

                        var cmTmp = (cmd.split("}","").join().split("{","").join()).trim().split("{")[0];
                        cmTmp = cmd.trim().split("{")[0].split(" ").join("");

                        if(cmTmp == "senao"){
                          cmd = cmTmp;
                        }
                        
                       
                        var command = this.translate(cmd); 
                        
                        if(command){
                            if(command.type == "function"){
                                if(!command.input){
                                    var result = command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    if(insideFunction)
                                        pyCode_final += this.indent(tabsTime)+(result);
                                    else
                                        pyCode_final+=(result);
                                        
                                }else{
                                    var result = v[0].trim().split("(")[0] + "=" + command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    if(insideFunction)
                                    pyCode_final+=this.indent(tabsTime)+(result);
                                    else
                                    pyCode_final+=(result);
                                }
                            }

                            if(command.type == "class"){

                                console.log("cf", classFunction)
                                        pyCode_final += this.indent(tabsTime)+(command[classFunction]().toString());
                                    
                            }


                            if(command.type == "command"){
                                
                                        if(insideFunction)
                                        pyCode_final+=this.indent(tabsTime)+command.pyCode + element.split(cmd)[1].split(";").join("").split("{").join(":");
                                        else{
                                            var formatedCommand = command.pyCode + element.split(cmd)[1].split(";").join("");
                                            pyCode_final+=formatedCommand.substring(0,formatedCommand.lastIndexOf(")")+1) + ":"
                                        }

                                        if(element[element.length-1] == "{"){
                                            insideFunction = true;
                                            tabsTime+=1;
                                        }
                            }
                            if(command.type == "endcommand"){
                                
                                        
                                            pyCode_final+=this.indent(tabsTime)+command.pyCode + ":";
                                        
                                       
                                        if(element[element.length-1] == "{"){
                                            insideFunction = true;
                                            tabsTime+=1;
                                        }
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
                                        pyCode_final+=this.indent(tabsTime)+ element.split(";").join("");
                                    else
                                        pyCode_final+=element.split(";").join("");
                                }else{
                                    var cmd = element.trimStart().split("(")[0].trim;
                                    if(this.translate(cmd)){
                                        if(insideFunction)
                                        pyCode_final+=this.indent(tabsTime)+cmd + element.split(cmd)[1].split(";").join("");
                                        else
                                        pyCode_final+=cmd + element.split(cmd)[1].split(";").join("");
                                    }
                                }
                            }
                            else{
                                if(insideFunction)
                                pyCode_final+=this.indent(tabsTime)+element.split(";").join("");
                                else
                                pyCode_final+=element.split(";").join("");
                            }
                        }
                        
                   }else{
                    //if(cmd[0].includes(""))
                        console.log("else",element)
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
    indent(times){
        var tabs = "";
        for (let i = 0; i < times; i++) {
            tabs += "\t";
            
        }
        console.log(times)
        return tabs;
    },
   
    RESERVED:{
        leia:{type:"function", pyCode:"input", input:true},
        mostre:{type:"function", pyCode:"print", input:false},
        toInt:{type:"function", pyCode:"int", input:true},
        elevado:{type:"function", pyCode:"pow", input:true},
        retorna:{type:"command", pyCode:"return", input:true},
        se:{type:"command", pyCode:"if", input:true},
        senao:{type:"endcommand", pyCode:"else", input:true},
        Terminal:{
            type:"class",
            limpaTela(){
                return `
                \nprint("\\033[H\\033[J")
                `
            }
        }
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