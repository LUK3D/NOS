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

mostre(n1+n2);

`;


window.NOS = {
    Transpile(code){
        var ncode = code.replace(/^\s*\n/gm,'').split("\n");
        var pyCode = "";
        ncode.forEach(element => {
                var v = element.split(" ");
                var dType = this.typeOf(v[0].trim());
                if(dType && element!=""){
                    pyCode += (v[1].replace(";","")+"="+dType.default)+ "\n";
                }else{
                    var cmd = element.match(/^([^(]+)/gm);
                   if(cmd){
                        if(cmd[0].includes("=")){
                            cmd = cmd[0].split(" ")[2];
                        }else{
                            cmd[0]
                        }
                   }
                    var command = this.translate(cmd); 
                        if(command)
                            if(command.type == "function"){
                                if(!command.input){
                                    var result = command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    pyCode+=(result)+ "\n";
                                }else{
                                    var result = v[0].trim().split("(")[0] + "=" + command.pyCode + element.match(/\(([\s\S]*?)\)/gm);
                                    pyCode+=(result) + "\n";
                                }
                            }
                }
            
        });

        return pyCode;
    },
    typeOf(value){
        return this.DATATYPES[value];
    },
    /** Função que traduz os comandos NOS em seus equivalentes em Python
     * @param  {string} word é a palavra que será retornada
     * @returns {string} 
     */
    translate(word){
        return this.RESERVED[word];
    },
    RESERVED:{
        leia:{type:"function", pyCode:"input", input:true},
        mostre:{type:"function", pyCode:"print", input:false},
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