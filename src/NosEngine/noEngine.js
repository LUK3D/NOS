
import Vue from 'vue'
import { Show,Read, Start, End, If_Else} from "../Rete_components/numbers";
import i18n from '../i18n';
import { Console } from 'console';

let t = 'luk3disthebest';

(function (window) {
    window.Nos = {
      
        /* Funcao para carregar arquivos .nosx */
        loadPlugin: async function () {
            const {dialog} = require('electron').remote
            let files = await dialog.showOpenDialog({
                properties: ['openFile', 'multiSelections'],
                filters: [{
                        name: '{Nos} Extensions',
                        extensions: ['nosx', 'nosex', 'nos']
                    },
                    {
                        name: 'All Files',
                        extensions: ['*']
                    }
                ]
            }).then(result => {
                return result
            }).catch(err => {
                return err
            })
            files.filePaths.forEach((element, i) => {
                 this.installPlugin(element)

                Vue.toasted.show(element.toString().split('\\')[element.toString().split('\\').length - 1], {
                    position: 'bottom-right',
                    duration: 2000 + (i * 200)
                })
            });
            return files

        },
        installPlugin:async function(path){

            var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

            fs.readFileSync(path, 'utf-8', (err, data) => {
                if(err){

                    Vue.toasted.show("An error ocurred reading the file :" + err.message, {
                        position: 'bottom-right',
                        type:'error',
                        duration: 2000
                    })
                    // alert();
                    return;
                }
                // Change how to handle the file content
                let menus = JSON.parse(localStorage.salvos)
                

               return menus
            });


        },
        exportPlugin:async function(){
           let val =  {title:'Filas', icon:'mdi-code-brackets', function:"function(args = null){console.log(\"Estou ViVO!!!!\")}"}

             localStorage.salvos = JSON.stringify(val);

             Vue.toasted.show("Plugin Salvo com sucesso!", {
                position: 'bottom-right',
                type:'info',
                duration: 2000
            })
        },
        /* Esta funcção procura por  Arquivos de uma determinada extencao dentro de pastas*/
        getFilesByExtention:async function getFiles(startPath,filter, withDir= true,  _callback = function(){}){
            window.Nos.isLoading(true)
                var path = require('path'), 
                fs   = require('fs');
                var results = [];
                
                if (!fs.existsSync(startPath)){
                    console.log("no dir ",startPath);
                    return;
                }
                var files=fs.readdirSync(startPath);
                for(var i=0;i<files.length;i++){
                    var filename=path.join(startPath,files[i]);
                    var stat = fs.lstatSync(filename);
                    if (stat.isDirectory() && withDir){
                        results = results.concat(getFiles(filename,filter)); //recurse
                    }
                    else if (filename.indexOf(filter)>=0) {
                       // console.log('#-> Found: ',filename);
                        results.push(filename);
                    }
                }
               
                window.Nos.isLoading(false)
                _callback(results);
                return results;

            },
        isLoading:(valor)=>{
            window.eventBus.$emit('loading', valor);
        },
        justExec:async (code)=>{
           

            if(code != null){
                var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
                fs.writeFile(`${process.cwd()}`+ "\\src\\Interface_de_execucao_nos\\nos.py", code, function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    
                    
                    const path = require('path');
                    console.log(`Current directory: ${process.cwd()}`);
                    // shell.openExternal(path.join(`${process.cwd()}`+ "\\src\\Interface_de_execucao_nos", 'compiler.pyc'));
                    let p = path.join(`${process.cwd()}`+ "\\src\\Interface_de_execucao_nos\\", 'nos.py');
                    let p2 = path.join(`${process.cwd()}`, "\\src\\Interface_de_execucao_nos\\",);
                    window.Nos.pyExec( p, p2);


                });

                

               
                    
               

                return
            }

       
        },
        compile:async (code)=>{
           

            if(code != null){

                window.Nos.toBinary(code, ()=>{
                    const path = require('path');
                    console.log(`Current directory: ${process.cwd()}`);
                    // shell.openExternal(path.join(`${process.cwd()}`+ "\\src\\Interface_de_execucao_nos", 'compiler.pyc'));
                    let p = path.join(`${process.cwd()}`+ "\\src\\Interface_de_execucao_nos\\", 'compiler.pyc');
                    let p2 = path.join(`${process.cwd()}`, "\\src\\Interface_de_execucao_nos\\",);
                    console.log(p)
                    window.Nos.pyExec( p, p2);
                });

                return
            }

       
        },
        /* FUncao para ler arquivo */
        readFile:(path,_callback=function(){})=>{
                var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)
                fs.readFile(path, 'utf-8', (err, data) => {
                    // console.log("lendoArquivo " + path);
                    if(err){
                        // console.log("Hove um erro");
                        Vue.toasted.show("An error ocurred reading the file :" + err.message, {
                            position: 'bottom-right',
                            type:'error',
                            duration: 2000
                        })
                        // alert();
                        return;
                    }
                    _callback(data);
                });
        },
        pyExec: async function(file,p2){
            var child = await require('child_process').execSync('cd '+ p2+ ' &&  start ' + file);

            /* child.stdout.pipe(process.stdout)
            child.on('exit', function() {
              process.exit()
            }) */
        },
        cmd:function execute(command, callback) {
            const exec = require('child_process').exec;
            exec(command, (error, stdout, stderr) => { 
                callback(stdout); 
            });
        },
        /* Funcao para converter codigo nos para  */
        toBinary:(nosCode, _callback)=>{

            let objectModel = require('./nos_py_model');
            /* nosCode = nosCode.split('}').join('');
            nosCode = nosCode.split('{').join(''); */

            var filtered = nosCode.split("\n").filter(function(el) { return el; });

            // let code = nosCode.replace(/^\s*[\r\n]/gm, '\n').split(".");
            let code = filtered;
            let termos = [];

            let finalJson = [];
            code.forEach((element,i) => {
                /* Verificar se é comentário. */
                if(!element.includes('//')){
                    let obj = new objectModel();
                    let tipo = "";
                    let comando = "";
                    let el = element.split('(').join(' ').trim().split(')').join(' ').split('"').join("'");

                    if(el.trim()[el.length-1] =="."){
                        el = el.substr(0,el.lastIndexOf('.'));
                        console.log(el)
                    }
                   
                   
                    if(el.trim()!=''){
                        
                        // TODO: Reconhecimento de uncoes utilizando regex
                            let verificaFuncao = element.match(/\)(.?){/g);

                                if(verificaFuncao)
                                if(verificaFuncao.length>0){
                                    
                                    let fcode = "";
                                    for (let index = i; index < code.length; index++) {

                                        if(code[index+1] != "}"){

                                        fcode +=code[index+1]+" ";

                                        }else{
                                            i = code.length;
                                        }

                                        

                                        
                                    }
    
                                    console.info("codigo da funcao", fcode);


                                   
                                    return
                                }

                            
                        




                            window.Nos.dicionario(el.split(' ')[0].trim(),(valor, cm)=>{
                                tipo = valor;
                                comando = cm;
                                termos.push(el.split(' ')[0].trim());
                            })
                            if( el.split(' ')[0].trim() == "var"){
                                obj.label = el.split(' ')[1].trim();
                            }else{
                                obj.label = comando;
                            }
                        
                            obj.type = tipo;
                            
                            if(comando == "show"){
                                let val = element.substr(element.indexOf('('), element.trim().length-1).trim().split('"').join("'");
                                if(val.trim()[val.length-1] =="."){
                                    val = val.substr(0,val.lastIndexOf('.'));
                                    console.log(val)
                                }
                               
                                obj.value = val;
                            }else{
                                obj.value = el.substr(el.indexOf(' '), el.length).trim();
                            }
                           
                            finalJson.push(obj);
                    }
                }
                
            });

            const fs = require('fs');

            fs.writeFile(`${process.cwd()}`+ "\\src\\Interface_de_execucao_nos\\nos.tmp", JSON.stringify(finalJson), function(err) {
                if(err) {
                    return console.log(err);
                }
                console.log("The file was saved!");
            }); 

            _callback();
           
  

        },
        dicionario:(palavra, _callback = function(){})=>{
           
           let p =  i18n.t(palavra)

            let commands = require('./noCommands');
            let palavrasReservadas = commands;
           
           
            palavrasReservadas.forEach(element => {

                var keys = Object.keys(element);
                var value = Object.values(element);

                if( p == keys[0] ){
                    _callback(value[0],p)
                    return 

                }

               /*  if( palavra == keys[ 0 ] ){
                    _callback(value[ 0 ])
                    return 

                } */
                
            
            });
           

           /*  return palavrasReservadas[palavra]; */

        },

        /* Funcao para cria um novo no */

        addNo:async (name)=>{

            let editor  = window.nosEditor
            const showComponent = new Show(name);
            const readComponent = new Read(name);
            const startComponent = new Start(name);
            const endComponent = new End(name);
            const if_Else = new If_Else(name);
            try {
                    editor.register(showComponent);
                    editor.register(readComponent);
            } catch (error) {

                console.log("Erro! " + error)
              
            }

            switch (name.toString().toLowerCase()) {
                case "show":
                    editor.addNode(await showComponent.createNode({ num: 10 , str:'Filipe',name:"Teste basico", code:'Mostre', id:window.nodeC}));
                    break;
                case "read":
                    editor.addNode(await readComponent.createNode({ num: 10 , id:window.nodeC, code:'Leia'}));
                    break;
                case "start":
                    editor.addNode(await startComponent.createNode({id:window.nodeC, code:'Inicio'}));
                    break;
                case "end":
                    editor.addNode(await endComponent.createNode({id:window.nodeC,code:'Fim'}));
                    break;
                case "if-else":
                    editor.addNode(await if_Else.createNode({id:window.nodeC, code:'Se/Senao'}));
                    break;
                default:
                    window.eventBus.$toasted.show("Este node não existe")
                    break;
            }
            
            
        },

        // FUncao que retorna o codigo atual
        getCurrentClass: function(index = 0){
            let cl =  window.eventBus.$store.state.ProjectInfo.code[index];
            return cl; 
        },
        getProjectInfo:function(){
            let pi =  window.eventBus.$store.state.ProjectInfo;
            return pi; 
        },
        openProject:async function(_callback){

            const {dialog} = require('electron').remote
            const fs = require('fs')
            let files = await dialog.showOpenDialog({
                properties: ['openFile'],
                filters: [{
                        name: '{Nos} Extensions',
                        extensions: ['nosx', 'nosex', 'nos']
                    },
                    {
                        name: 'All Files',
                        extensions: ['*']
                    }
                ]
            }).then(result => {
                if(!result.canceled){
                    

                    fs.readFile(result.filePaths[0], function read(err, data) {
                        if (err) {
                            window.eventBus.$toasted.show('Houve um erro ao Salvar o projecto');
                            throw err;
                        }
                       
                        let projectInfo = JSON.parse(data);
                        window.eventBus.$store.state.ProjectInfo = projectInfo;
                        window.eventBus.$toasted.show('Projecto ' + projectInfo.name + " Carregado com sucesso");
                        _callback(projectInfo)
            
                       
                      
                    });

                }
              
            }).catch(err => {
                window.eventBus.$toasted.show('Houve um erro ao carregar o projecto');

                return err
            })
            
        },
        createProject:function(path, projectName, content, _callback){

            let projectData = JSON.stringify(content);
           

            let projectPath = path + "\\" + projectName;
            /* Criando o diretorio do projecto */
            let fs = require('fs');

            /* Verificar se o diretorio já existe */
            fs.exists(projectPath,(existe)=>{
                if(existe){
                    window.eventBus.$toasted.show('Já existe um projecto com o este nome');
                   
                }else{
                    fs.mkdir(projectPath,()=>{

                        fs.writeFile(projectPath + "\\main.nos",projectData,()=>{
                            window.eventBus.$toasted.show('Houve um erro ao criar o arquivo de execução');
                           
                        },()=>{
                            _callback();
                            window.eventBus.$toasted.show('O projecto foi criad em: ' + projectPath);
                        });
                        
                    },()=>{
                        window.eventBus.$toasted.show('Houve um erro ao criar o Projecto');
                    })
                }
            })
            
        },
        saveProject(index = 0, code = ""){
            let project = window.Nos.getProjectInfo();
            let path = project.path + "\\" + project.name + "\\"+project.code[index].label.toLowerCase()+ ".no";
            let fs = require('fs');

        
            

          fs.readFile(path, function read(err, data) {
            if (err) {
                window.eventBus.$toasted.show('Houve um erro ao Salvar o projecto');
                throw err;
            }
           
         

            let finalCode = JSON.parse(data);
            finalCode.code[index].code = code;

            window.Nos.getProjectInfo().code[index].code = code

            console.log(finalCode)

            fs.writeFile(path,JSON.stringify(finalCode),()=>{
                window.eventBus.$toasted.show('Projecto Salvo com sucesso!');
                
            })
          
        });

        },
        crypt:function(data, _callback){

            let SimpleCrypto  = require('simple-crypto-js').default;

            let cript = new SimpleCrypto(t);

            _callback(cript.encrypt(data))
1
        },
        decrypt:function(data,_callback){
            let SimpleCrypto  = require('simple-crypto-js').default;
            let cript = new SimpleCrypto(t);
            _callback(cript.decrypt(data))

        }

        
    }



})(window);