//Codigo {NOS} de teste que e usado para testar o transpilador
window.code=`

int n;

n = leia("Informe o número a ser multiplicado ");

para (x in [1,2,3,4,5,6,7,8,9,10,11,12]){
    mostre(n,"X",x,"=",paraInt(n)*paraInt(x));
}

funcao cacular (){
    teste = leia("Vamos la ver");
}
`;


window.NOS = {
    Transpile(code){
        //var ncode = code.split("\n"); //Removendo todas as linhas em branco (sem comandos) do código informado pelo user.
        code = JSON.stringify(code).split("\\n").join('\n').split('\\"').join('"').split('\\r').join(' ');
        var ncode = code.replace(/^\s*\n/gm,''); //Removendo todas as linhas em branco (sem comandos) do código informado pelo user.
        ncode = ncode.replace(/^\s*/gm, "").replace(/^\t*/gm, "").split("\n");
        console.log("codigo=",ncode);
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
                        userFunctions.push(element.substring(6,element.indexOf("(")).trim())
                       // console.log(userFunctions)
                    }
                    else
                        if(insideFunction)
                            pyCode_final += this.indent(tabsTime)+(v[1].replace(";","")+"="+dType.default);
                        else
                            pyCode_final += (v[1].replace(";","")+"="+dType.default);
                }else{
                    var cmd = element.trim().match(/^([^(]+)/gm);
                   if(Array.isArray(cmd)){
                        
                        if(cmd[0].includes("=")){
                            cmd = cmd[0].trim().split("=")[1].trim();
                            
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
                                    //var result = command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    var result = command.pyCode + element.match(/\(([^)].*)\)/gm); //Este regex deve ser revisto porque permite expressções do tipo: para(x em nomes)(outro para){}
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

                            
                                    pyCode_final+=this.indent(tabsTime);
                                    pyCode_final += (command[classFunction](tabsTime).toString());
                              
                                        
                                    
                            }


                            if(command.type == "command"){

                                        var unformatedCommand = "";
                                        if(insideFunction)
                                        unformatedCommand+=this.indent(tabsTime)+command.pyCode + element.split(cmd)[1].split(";").join("").split("{").join(":");
                                        else{
                                            var formatedCommand = command.pyCode + element.split(cmd)[1].split(";").join("");
                                            unformatedCommand+=formatedCommand.substring(0,formatedCommand.lastIndexOf(")")+1) + ":"
                                        }


                                        
                                        if(element.split('\\r').join('').trim().match(/{$/gm)){
                                            insideFunction = true;
                                            tabsTime+=1;
                                        }else{
                                            console.log(element)
                                            
                                        }

                                        if(command.noParentheses){
                                            unformatedCommand =NOS.UTILITY.replaceAt(unformatedCommand,unformatedCommand.indexOf("(")," "); 
                                            unformatedCommand =NOS.UTILITY.replaceAt(unformatedCommand,unformatedCommand.lastIndexOf(")")," "); 
                                        }

                                        pyCode_final +=unformatedCommand;
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
       
        return tabs;
    },
   
    RESERVED:{
        leia:{type:"function", pyCode:"input", input:true},
        mostre:{type:"function", pyCode:"print", input:false},
        paraInt:{type:"function", pyCode:"int", input:true},
        elevado:{type:"function", pyCode:"pow", input:true},
        retorna:{type:"command", pyCode:"return", input:true},
        em:{type:"command", pyCode:"in", input:true},
        se:{type:"command", pyCode:"if", input:true},
        senao:{type:"endcommand", pyCode:"else", input:true},
        enquanto:{type:"command", pyCode:"while", input:true},
        para:{type:"command", noParentheses:true, pyCode:"for", input:true},
        Terminal:{
            type:"class",
            limpaTela(tabTimes){
                return `print("\\033[H\\033[J")`
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
    },
    UTILITY:{
        replaceAt (str,index, replacement) {
            return str.substr(0, index) + replacement + str.substr(index + replacement.length);
        }
    }
    

    
};