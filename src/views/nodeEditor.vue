<template>
  
       <div class="hideX hideY">
         <cabecalho></cabecalho>
          <div id="rete"  class="black600">

          
         </div>
        
          <v-card v-draggable style="position:fixed; top:10px; left:10px; max-width:200px" class="black500 black100t ">
            <v-card-title primary-title class="toolBox">
              ToolBOx
            </v-card-title>
            
        
           <v-card-text>
              <v-row >

                

              <v-expansion-panels accordion class="pa-0 ma-0 black500">
                <v-expansion-panel
                  v-for="(item,i) in noBox"
                  :key="i"
                   class="pa-0 ma-0 black500 "
                >

                <v-expansion-panel-header class="black100t ma-0 pa-0 "> 
                  <v-row class="pa-0 ma-0">
                     <v-icon  class="yellow100t mr-2 ml-2" v-text="item.icon">  </v-icon> {{item.title}}
                  </v-row>
                </v-expansion-panel-header>
                  <v-expansion-panel-content>
                   
                    <v-list dense class="ma-0 pa-0">
                     <!--  <v-subheader>{{item.title}}</v-subheader> -->
                        <v-list-item-group v-model="selectedItem"  class="black500 black100t" >
                          <v-list-item  v-for="tool in item.options" :key="tool.title" @click="addNode(tool.title)" >
                            <v-list-item-icon>
                              <v-icon  class="black200t" v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                              <v-list-item-title class="black200t" v-text="tool.title"></v-list-item-title>
                            </v-list-item-content>
                          </v-list-item>
                      </v-list-item-group>
                    </v-list>

                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
            </v-row>
           </v-card-text>

            
            
          </v-card>


          <v-card v-draggable  center style="position:fixed; left:50vh; bottom:40px; height:60px; width:80vh" class="black500 black100t">
            <v-card-title primary-title  class="d-flex justify-space-between">
             <v-btn flat icon class="green100t" >
               <v-icon >mdi-content-save-outline</v-icon>
             </v-btn>
             <v-btn flat icon class="red100t" >
               <v-icon >mdi-code-braces</v-icon>
             </v-btn>
             <v-btn @click="paseNos()" flat icon class="yellow100t" >
               <v-icon >mdi-play-box</v-icon>
             </v-btn>
             <v-btn flat icon class="black100t" >
               <v-icon >mdi-help-rhombus-outline</v-icon>
             </v-btn>
             <v-btn flat icon class="blue100t" @click="codeEditor()">
               <v-icon >mdi-application-export</v-icon>
             </v-btn>
            </v-card-title>

            
            
          </v-card>
          
       </div>
       
  
</template>

<script>

import cabecalho from "@/components/cabecalho.vue"
import Rete from "rete";
import ConnectionPlugin from "rete-connection-plugin";
import VueRenderPlugin from "rete-vue-render-plugin";
import CustomNode from "../components/NoComponents/custom_node";
import CommentPlugin from 'rete-comment-plugin';
import { Draggable } from 'draggable-vue-directive'
import HistoryPlugin from 'rete-history-plugin';
import KeyBoardPlugin from 'rete-keyboard-plugin';
import CodePlugin from 'rete-code-plugin';
import router from "../router";
const engine = new Rete.Engine("demo@0.1.0");
let codes = [];
let codeId = [];

async function init() {

  window.nodeC = 0;

    const container = document.querySelector("#rete");
    const editor = new Rete.NodeEditor("demo@0.1.0", container);
    editor.use(ConnectionPlugin);
    editor.use(VueRenderPlugin, {
      component: CustomNode,
    });
    
  editor.use(CommentPlugin, { margin: 20 });
  editor.use(HistoryPlugin, { keyboard: true });
  editor.use(KeyBoardPlugin);
  

  editor.on(
      "process nodecreated noderemoved connectioncreated connectionremoved",
      async () => {
        await engine.abort();
        await engine.process(editor.toJSON());
      }
    );
  window.nosEditor =editor;
  window.engine =engine;


  editor.on('nodecreated', node => {
    /* return editor.nodes.some(item => item.name === node.name); */ // prevent adding new node
    window.nodeC += 1;
    window.n += 1;
    console.info("Node Criado",node)
  });
  editor.on('noderemoved', node => {
    window.n -= 1;
    console.info("qtd: ", window.nodeC)
  });

  editor.on('connectioncreate',(el)=>{
    if(el['input'].key !="run")
    return
    codeId.push(el['input'].node.data.id)
    codeId.push(el['input'].node.data.id)
    codes.push(el['input'].node.data.code)
    console.info(codes);
    console.info(el);

    
    console.info('allNodes: ', editor.toJSON())
    
    
  });

  editor.on('connectionremoved',conn =>{
    engine.process(null, 1);
    codes.splice(codeId.indexOf(conn['input'].node.data.id), 1);
   /*  delete codes[codes.indexOf(conn['input'].node.data.code)]; */
    codeId.splice(codeId.indexOf(conn['input'].node.data.id),1);
    console.info("conexao perdida: ", codes);

  });
  editor.on('process', async () => {
  
   let log =  await engine.process(editor.toJSON());
   console.info('allNodes: ', log)
});
}


window.generate =  async function generateCode(){

    let links = window.nosEditor.view.connections;
    

    links.forEach((element,i) => {
       console.info("link " + i , element.inputNode.node.data.code)
    });
    // console.log(links)
}


export default {
  components: {
   cabecalho 
  },
    data(){
      return{
        noBox:[
            {title:"Variables", options:[
            {title:"For"},
            {title:"While"},
            {title:"DoWhile"},
            {title:"Foreach"},], icon:"mdi-infinity"
            },
            {title:"Functions", options:[
            {title:"Start"},
            {title:"Read"},
            {title:"Show"},
            {title:"Integer"},
            {title:"Float"},
            {title:"Var"},
            {title:"If-Else"},
            {title:"End"}, ],icon:"mdi-function"
            },
            {title:"Loops", options:[
            {title:"For"},
            {title:"While"},
            {title:"DoWhile"},
            {title:"Foreach"},], icon:"mdi-infinity"
            },
            
            {title:"Math functions", options:[
            {title:"Add"},
            {title:"Subtract"},
            {title:"Divide"},
            {title:"Multiply"},
            {title:"Sin"},
            {title:"Cos"},
            ], icon:"mdi-infinity"
            },
            {title:"Logic Operators", options:[
            {title:">"},
            {title:"<"},
            {title:"=="},
            {title:"!="},
          
            ], icon:"mdi-infinity"
            },
        ]

      }
    },

    directives: {
      Draggable,
    },

    mounted:()=>{
        init();
    },
    methods:{
      addNode:function(name){
        window.Nos.addNo(name)
      },
      codeEditor:()=>{
        router.push('/codeEditor')
      },
      paseNos:()=>{
        window.generate;
      }
    }     
    
}
</script>


<style scoped>

#rete{
    height: 90vh !important;
    width: 100% !important;
}

</style>