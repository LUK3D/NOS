//Codigo {NOS} de teste que e usado para testar o transpilador
window.code=`
var nome;
texto sobrenome;
int idade;
bool sexo; //true para masculino


nome = leia();

mostre("o seu nome e " ,  nome);

int n1;
int n2;

mostre("Informe o primeiro Numero");
n1 = leia();
mostre("Informe o primeiro Segundo Numero");
n2 = leia();

n1 = toInt(n1);
n2 = toInt(n2);
mostre(n1+n2);

`;


window.NOS = {
    Transpile(code){
        var ncode = code.replace(/^\s*\n/gm,'').split("\n"); //Removendo todas as linhas em branco (sem comandos) do código informado pelo user.
        var pyCode_final = "";
        //Percorrendo cada linha de comando ser processado
        ncode.forEach(element => {
                var v = element.split(" "); //Dividindo o comando em duas parte, onde a primeira deve corresponder à instrução e a segunda parte corresponder ao valor.
                var dType = this.typeOf(v[0].trim());
                /* 
                *Caso o comando for um tipo de dado, então trata-se de declaração de uma variavel
                Então neste bloco inicializamos uma variavel em python e removemos o delimitador ";"
                */
                if(dType && element!=""){
                    pyCode_final += (v[1].replace(";","")+"="+dType.default)+ "\n";
                }else{
                    var cmd = element.match(/^([^(]+)/gm);
                   if(cmd){
                        if(cmd[0].includes("=")){
                            cmd = cmd[0].split(" ")[2].trim();
                        }else{
                            cmd[0]
                        }
                        var command = this.translate(cmd); 
                        if(command)
                            if(command.type == "function"){
                                if(!command.input){
                                    var result = command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    pyCode_final+=(result)+ "\n";
                                }else{
                                    var result = v[0].trim().split("(")[0] + "=" + command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    pyCode_final+=(result) + "\n";
                                }
                            }
                   }else{
                        console.log(element)
                        //this.Transpile(element.split(" ").join("").split("=")[1]);
                    
                   }
                }
            
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
    },
    DATATYPES:{
        float:{type:"Decimal", default:0.0},
        int:{type:"Integer", default:0},
        bool:{type:"Boolean", default:"True"},
        texto:{type:"String", default:`""`},
        var:{type:"Any", default:`""`},
        objecto:{type:"Object", default:"{}"},
        funcao:{type:"Function", default:null},
    }
    

    
};