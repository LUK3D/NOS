/* Esta é a pagina inicial onde o utilizador pode criar um novo projecto. */
<template>
  <div class="home">
       <cabecalho :options="true" ></cabecalho>
   <v-col>
     <v-text-field v-model="projectName"  :rules="rules.name" @mouseover="tooltip=$t('what_is_your_project_name')" @mouseleave="tooltip=''"  background-color="#0C0C0D" class="black300t projectName" color="#ffffff" flat dense solo :label="$t('project_name')" prepend-icon="mdi-card-text-outline">

     </v-text-field>
      <v-select
      
      background-color="#0C0C0D"
      class="black300t"
      v-model="targetPlataform"
      prepend-icon="mdi-code-json"
      flat dense solo 
          :items="items"
          label="Target Plataform"
        ></v-select>

      <v-row class="pl-3">
       
       <v-icon class="black200t pr-3">mdi-folder-outline</v-icon> <v-chip :class="`${(selected)?'primary':'primary'}`"  @click="selectFolder()" > <label for="" id="caminho" @mouseover="tooltip=$t('select_folder_for_your_project')" @mouseleave="tooltip=''">{{project_folder}}</label></v-chip>
       
      </v-row>
      <v-divider class="mt-5 black600"  ></v-divider>
      <v-row>
         <v-subheader class="black200t">Project Info</v-subheader>
      </v-row>
      <v-row>
        <v-col cols="6">
          
             <v-text-field v-model="projectAuthor" @mouseover="tooltip='Your Name'" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t"  color="#ffffff" flat dense solo label="Author Name" prepend-icon="mdi-account"></v-text-field>
         
        </v-col>
        <v-col cols="6">
             <v-text-field v-model="projectVersion" @mouseover="tooltip='The versio of the project'" @mouseleave="tooltip=''" background-color="#0C0C0D" class="black300t"  color="#ffffff" flat dense solo label="Project Version Ex: 0.1" prepend-icon="mdi-account"></v-text-field>

        </v-col>
      </v-row>
     
      <v-row>
         <v-col cols="6">
          <v-btn @click="createProject()" small color="primary elevation-0">Start Project</v-btn>
         </v-col>
      </v-row>
   </v-col>

      <v-footer
      absolute
      class="font-weight-medium black500 black200t pa-0 px-3" color="#0C0C0D"
    > <v-icon class=" yellow100t">mdi-alert-box-outline</v-icon> <v-subheader class="pa-0 ma-0 black200t">{{tooltip}}</v-subheader>
    </v-footer>
  </div>
</template>

<script>
// @ is an alias to /src 
import i18n from '../i18n';
const {ipcRenderer} = require("electron");
import Vue from 'vue';
import router from '../router';
import fs from 'fs';
import cabecalho from "../components/cabecalho.vue"
// eslint-disable-next-line no-unused-vars
ipcRenderer.on('selectFolder-result', (event, arg) => {
  if(arg == "" || arg == null){
     home.methods.setProjectFolder(i18n.t('select_forlder')) 
     return
  }

   home.methods.setProjectFolder(arg) 
 
})

const home = {
  name: "Home",
  components: {
 cabecalho,
  },
  mounted: function () {
  /* if(localStorage.url != null && localStorage.url!=''){
      let url = localStorage.url;
      localStorage.url = null;
      router.push('/nodeEditor');
    } */
},
  data(){
    return{
      projectName:'',
      targetPlataform:'',
      projectFolder:'',
      projectAuthor:'',
      projectVersion:'',
      items:['Windows Aplication'],
      project_folder: i18n.t('select_forlder'),
      selected:false,
      tooltip:"",
      rules: {
          
          name: [val => (val || '' ).length > 0 || 'This field is required', val =>(val|| "").split(' ').length<=1||"Remove the blank Space or replace it with _"],
        },
    }
  },
  methods:{
    selectFolder(){
      ipcRenderer.send("selectFolder","hello!")
    },
    setProjectFolder:function(path){
     
      this.project_folder = path
      document.getElementById("caminho").innerText = path
      console.log( this.project_folder);
    },
    openNodeWindow(){
        ipcRenderer.send("startProject","hello!")
    },
    createProject:async function(){

     let project = window.Nos.getProjectInfo() 
     project.name = this.projectName;
     project.path = document.getElementById("caminho").innerText;
     project.author = this.projectAuthor;
     project.version = this.projectVersion;
     project.type = this.targetPlataform;

     window.Nos.createProject(project.path, project.name,project, ()=>{
      router.push('/codeEditor', {projectName:this.projectName, projectFolder:this.projectFolder, projectAuthor: this.projectAuthor, projectVersion:this.projectVersion})

     });

    }
  
  },
  watch: {
    project_folder: function (val) {
      alert(val)
    },
  
  },
};

export default home;
</script>

<style lang="scss" scoped>

/* .v-text-field.v-text-field--solo .v-input__control input {
   color: rgb(67, 67, 145) ;
} */
.v-divider{
  border-width: 1px;
}

</style>
