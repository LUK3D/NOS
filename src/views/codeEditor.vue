<template>
  <v-container
    style="height: 100%; min-width: 100%; max-width: 100%"
    class="pa-0 ma-0"
  >
    <cabecalho :func="compile" >
        <v-btn  @click="openFile" small color="transparent" class="ml-2 elevation-0 black100t"><v-icon>mdi-folder-plus</v-icon></v-btn>
        <v-btn  @click="saveProject" small color="transparent" class="ml-2 elevation-0 black100t"><v-icon>mdi-content-save-outline</v-icon></v-btn>
        <v-btn  @click="compile" small color="transparent" class="ml-2 elevation-0 red100t"><v-icon>mdi-play-box</v-icon></v-btn>
    </cabecalho>
    <v-row
      cols="12"
      class="pa-0 ma-0 d-flex align-stretch"
      style="height: 100%; width: 100%"
    >
      <v-col
        cols="1"
        class="pa-0 ma-0"
        style="max-width: 40px; padding-left: 10px"
      >
        <v-btn
          v-for="(item, i) in sideMenu2Item"
          :key="i"
          flat
          icon
          color="primary"
          @click="item.function()"
        >
          <v-icon>{{ item.icon }}</v-icon>
        </v-btn>
      </v-col>
      <v-col class="pa-0 ma-0" cols="10">

        <v-dialog v-model="showTerminal" width="70vw" >
        <v-card >
        <v-card-text>
          <div class="terminal" id="xterm-container">

        </div>
        </v-card-text>
      </v-card>
    </v-dialog>



        <MonacoEditor
          theme="vs-dark"
          @editorWillMount="editorDidMount"
          
          class="editor"
          v-model="code"
          language="Nos"
        ></MonacoEditor>
        <v-btn @click="showTerminalFunc" small text color="warning"> <v-icon>mdi-code-greater-than</v-icon> Show Terminal</v-btn>
      </v-col>
      <Definicoes
        v-on:addplugin="addAddExtensions($event)"
        v-on:closeSettings="toggleSettings()"
        :dialog="this.settings"
      ></Definicoes>
    </v-row>
     

    <v-navigation-drawer v-model="drawer" class="black400" app>
      <v-list-item>
        <v-list-item-avatar>
          <v-icon class="black100t">mdi-hammer-screwdriver</v-icon>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title class="black100t">ToolBox</v-list-item-title>
        </v-list-item-content>
        <v-list-item-avatar>
          <v-btn flat icon color="primary">
            <v-icon class="black100t">mdi-plus-box-multiple</v-icon>
          </v-btn>
        </v-list-item-avatar>
      </v-list-item>

      <v-divider></v-divider>

      <v-expansion-panels>
        <v-expansion-panel
          class="black400"
          v-for="menu in sideMenuItens"
          :key="menu.title"
        >
          <v-expansion-panel-header class="black100t">
            {{ menu.title }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="black500">
            <v-list dense>
              <v-list-item v-for="item in menu.item" :key="item.title" link>
                <v-col class="pa-0 ma-0">
                  <v-row>
                    <v-list-item-icon>
                      <v-badge
                        dot
                        offset-x="-10"
                        offset-y="15"
                        color="primary"
                      ></v-badge>
                      <!--  <v-icon class="black100t">{{ item.icon }}</v-icon> -->
                    </v-list-item-icon>

                    <v-list-item-content>
                      <v-list-item-title class="black100t">{{
                        item.title
                      }}</v-list-item-title>
                    </v-list-item-content>
                  </v-row>
                  <v-divider></v-divider>
                </v-col>
              </v-list-item>
            </v-list>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-navigation-drawer>

    


    

  </v-container>
</template>

<script>
import cabecalho from "../components/cabecalho.vue";
import SimpleFlowchart from "../components/simpleFlowChart/SimpleFlowchart.vue";
import Definicoes from "../components/settings";
import propertiePanel from "../components/propertiePanel";
/* import 'prismjs'
import 'prismjs/themes/prism-coldark-dark.css' */
import Prism from "vue-prism-component";
import router from "../router";
import { ipcRenderer } from "electron";
import LoadScript from "vue-plugin-load-script";
import MonacoEditor from "vue-monaco";

import { Terminal } from 'xterm';

const editor = require("../NosEngine/nosObjects");

ipcRenderer.on("addPlugin", (ev, args) => {
  console.log(args);
  alert("PluginCarregado!!");
  vm.methods.addAddExtensions(args);
});

var vm = {
    computed:{
        code(){
            return this.$store.state.ProjectInfo.code[0].code;
        }
    },
  components: {
    cabecalho,
    SimpleFlowchart,
    Prism,
    Definicoes,
    "n-properties": propertiePanel,
    MonacoEditor,
  },
  data() {
    return {
      showTerminal:false,
       code: window.Nos.getCurrentClass().code,
      drawer: true,
      tab: null,
      nodeCounts: 1,
      settings: false,
      sideMenuItens: [
        {
          title: "Query",
          item: [
            { title: "Select" },
            { title: "Delete" },
            { title: "Update" },
            { title: "Insert" },
          ],
        },
        { title: "Conditions", item: [{ title: "If" }, { title: "Swich" }] },
        {
          title: "Repetition",
          item: [
            { title: "For" },
            { title: "While" },
            { title: "doWhile" },
            { title: "Foreach" },
          ],
        },
        {
          title: "Columns",
          item: [
            { title: "User" },
            { title: "Password" },
            { title: "Email" },
            { title: "Status" },
          ],
        },
        {
          title: "Variables",
          item: [
            { title: "User" },
            { title: "Password" },
            { title: "Email" },
            { title: "Status" },
          ],
        },
      ],
      sideMenu2Item: [
        {
          title: "Assets",
          icon: "mdi-hammer-screwdriver",
          function: (args = null) => {
            this.drawer = !this.drawer;
          },
        },
        {
          title: "Plugins / Extensions",
          icon: "mdi-puzzle-outline",
          function: (args = null) => {
            ipcRenderer.send("loadPlugin");
          },
        },
        {
          title: "New Project",
          icon: "mdi-file-code-outline",
          function: (args = null) => {
            router.push({ path: "/" });
          },
        },
        {
          title: "New Project",
          icon: "mdi-cog-outline",
          function: (args = null) => {
            //ipcRenderer.send('settings')
            this.settings = !this.settings;

            console.log(this.settings);
          },
        },
        {
          title: "",
          icon: "mdi-file-code-outline",
          function: (args = null) => {
            // In the main process.
            const { BrowserWindow } = require("electron").remote;

            // Or use `remote` from the renderer process.
            // const {BrowserWindow} = require('electron').remote

            let win = new BrowserWindow({ width: 800, height: 600 });
            win.on("closed", () => {
              win = null;
            });

            // Load a remote URL
            win.loadURL("http://localhost/api");

            // Or load a local HTML file
            // win.loadURL(`file://${__dirname}/app/index.html`)
          },
        },
        {
          title: "{Nós}",
          icon: "mdi-sitemap",
          function: (args = null) => {
            this.$router.push("/nodeEditor");
          },
        },
      ],
      showMenu: false,
      x: 0,
      y: 0,
      items: [
        {
          title: "Start",
          node: {
            id: 0,
            x: 0,
            y: 0,
            type: "terminator",
            label: "Utilizadores",
            value: { var: "nome" },
          },
        },
        {
          title: "Read",
          node: {
            id: 0,
            x: 0,
            y: 0,
            type: "manual_input",
            label: "Utilizadores1",
            value: {},
          },
        },
        {
          title: "Select",
          node: { id: 0, x: 0, y: 0, type: "process", label: "Utilizadores2" },
          value: {},
        },
        {
          title: "Show",
          node: {
            id: 0,
            x: 0,
            y: 0,
            type: "display",
            label: "Utilizadores3",
            value: {},
          },
        },
        {
          title: "if",
          node: {
            id: 0,
            x: 0,
            y: 0,
            type: "decision",
            label: "Utilizadores4",
            value: {},
          },
        },
        {
          title: "Preparation",
          node: {
            id: 0,
            x: 0,
            y: 0,
            type: "preparation",
            label: "Utilizadores4",
            value: {},
          },
        },
        {
          title: "Pre Process",
          node: {
            id: 0,
            x: 0,
            y: 0,
            type: "predefined_process",
            label: "Utilizadores4",
            value: {},
          },
        },
      ],
      data: {
        centerX: 614,
        centerY: 140,
        scale: 1,
        nodes: [],
        links: [
       
        ],
      },
    };
  },
  methods: {
    openFile(){
        window.Nos.openProject((projectInfo)=>{
            this.code = projectInfo.code[0].code;
        })
    },
    saveProject(){
        window.Nos.saveProject(0,this.code)
    },
    translate(){
        editor(window.Nos.monacoTmp);
    },
    compile() {
      var res = window.NOS.Transpile(this.code);
      //ipcRenderer.send("run",res);
      console.log("Resultado: ",res);
      window.Nos.justExec(res);
      //window.Nos.compile(this.code);
    },
    toggleSettings: function () {
      this.settings = !this.settings;
    },
    addAddExtensions: function (d) {
      if (d == null || d == "") {
        return;
      } else {
        var fs = require("fs");
        let fn = fs.readFileSync(
          "C:/Users/filip/Documents/teste.nosx",
          "utf-8",
          (err, data) => {
            if (err) {
              return;
            }
            return data;
          }
        );

        if (typeof d.function == "string") {
          var newMenuItem = {
            title: d.title,
            icon: d.icon,
            function: Function(fn),
          };
          /* d.function = new Function(d.function.split('('), "b", "return a + b"); */
        }
        console.log(newMenuItem);
        this.sideMenu2Item.push(newMenuItem);
        console.log(this.sideMenu2Item);
        this.$toasted.show("Plugin " + newMenuItem.title + " foi adicionado", {
          type: "alert",
          icon: "mdi-alert",
          position: "bottom-right",
          action: {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },

            className: "toast",
          },
          duration: 1000,
        });
      }
    },

    addNode: function (node) {
      if (node == null || node == "") {
        return;
      } else {
        console.log(node);
        this.nodeCounts += 1;
        var n = {
          id: this.nodeCounts,
          label: node["label"],
          x: node["x"],
          y: node["y"],
          type: node["type"],
          value: node["value"],
        };
        this.data.nodes.push(n);
        this.$toasted.show("No " + node["label"] + " foi adicionado", {
          type: "info",
          icon: "mdi-alert",
          position: "bottom-right",
          action: {
            text: "Cancel",
            onClick: (e, toastObject) => {
              toastObject.goAway(0);
            },

            className: "toast",
          },
          duration: 1000,
        });
        return;
      }
    },
    show(e) {
      e.preventDefault();
      this.showMenu = false;
      this.x = e.clientX;
      this.y = e.clientY;
      this.$nextTick(() => {
        this.showMenu = true;
      });
    },
    mounted: function () {
      window.eventBus.on("nodeSelected", (val) => {
        console.log("selected");
        console.log(val);
      });

      
    },
    showTerminalFunc:function(){
      this.showTerminal = !this.showTerminal;

      setTimeout(() => {
        console.log("MONTADO!-------------------------------------------")
        const term = new Terminal();

        term.open(document.getElementById('xterm-container'));
        term.write('Hello from \x1B[1;3;31mxterm.js\x1B[0m $ ')
        term.onData(a=>{
          term.write(a);
        })
        console.log("MONTADO!-------------------------------------------")
      }, 500);

    },
    /* MONACO EDITOR */
    editorDidMount(monaco) {


        

        window.Nos.monacoTmp = monaco;
        monaco.languages.registerHoverProvider('Nos', {
       provideHover: function (model, position, token) {
        var line = model.getLineContent(position.lineNumber);
         console.log("MOSTRANDO: ", line)
         console.log("MOSTRANDO: ", model, position , token)
        return {
           range: new monaco.Range(1, 1, model.getLineCount(), model.getLineMaxColumn(model.getLineCount())),
          contents: [
            { value: '**SOURCE**' },
            { value: typeof(model).toString(), position , token }
          ]
        };
    }
    });

      editor(monaco);

      
    },
  },
};
export default vm;
</script>

<style  >
.editor {
  float: left;
  width: 100% !important;
  height: 84vh;
}
.flowchart-container {
  background: #0c0c0d !important;
}

.node-port.node-output {
  background: yellow;
}

*::-webkit-scrollbar {
  width: 8px;
}

*::-webkit-scrollbar-track {
  background: #0000009f;
  /*   -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.535);  */
  /*  border-radius: 10px; */
}

*::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background: #4343fe;
  -webkit-box-shadow: inset 0 0 6px #4343fe;
}

.terminal{
 
}
</style>