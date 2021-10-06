<template>

    <div class="header" >
    
           <v-row class="align-center px-5 py-1" style="z-index:100 !important;" >
           
            <v-row cols="1" class="pa-0 ma-0 align-center d-flex">
                 <h3 class="black100t">{Nós}</h3> <label for="" class="ml-4 black100t">{{title}}</label>

                    <v-menu offset-y>
                        <template v-slot:activator="{ on, attrs }">
                            <v-btn
                             flat class="transparent blue100t" elevation="0" small 
                            v-bind="attrs"
                            v-on="on"
                            >
                            {{idioma}} <v-icon>mdi-translate</v-icon>
                            </v-btn>
                        </template>
                        <v-list class="black500">
                            <v-list-item
                            v-for="(item, index) in idiomas"
                            :key="index"
                            >
                            <v-list-item-title class="black100t" @click="mudarIdioma(item)" >{{ item.name }}</v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-menu>

                    <!-- <v-btn v-if="func!=null" @click="func()" depressed small color="primary"><v-icon>mdi-play-box</v-icon></v-btn> -->
                    <slot></slot>
            </v-row>
            <v-col cols="7" class="dragable  ma-0 ">

            </v-col>
            <v-row v-if="options" cols="3" class="pa-0 ma-0 d-flex justify-end">
               

                <v-btn @click="winMinimizar()"  icon class="green100t" >
                    

                    <v-icon>mdi-window-minimize</v-icon>
                </v-btn>
                <v-btn @click="winMmaximizar()" icon class="yellow100t" >
                    <v-icon>mdi-window-maximize</v-icon>
                </v-btn>
                <v-btn @click="winFechar()" icon class="red100t" >
                    <v-icon>mdi-close-box-outline</v-icon>
                </v-btn>
            </v-row>
            </v-row>


             <v-progress-linear
                v-if="loading"
                indeterminate
                absolute
                top
                color="deep-purple accent-4"
            ></v-progress-linear>
     
       
    </div>
  
</template>

<script>
import i18n from '../i18n';
const {ipcRenderer} = require("electron");
import bus from '../main'
export default {
    props:{
        func:{
            /* type:function(){} */
        },
        func2:{
            /* type:function(){} */
        },
        title:{
            type:String,
            default:''
            
        },
        options:{
            type:Boolean,
            default:true,
        },
        
    },
    data(){
        return{

            idioma: localStorage.langName,
             idiomas:[{name:'Português', key:'pt'},{name:'English',key:'en'}],
             loading:false
        }
    },
    methods:{
          /* Minimizar a janela */
        winMinimizar:()=>{
            ipcRenderer.send('minimizar')
        },
        winMmaximizar:()=>{
            ipcRenderer.send('maximizar')
        },
        winFechar:()=>{
            ipcRenderer.send('fechar')

        },
        mudarIdioma(idioma){

            if(idioma.key == localStorage.lang)
            return

            i18n.locale = idioma.key
            
            localStorage.lang = idioma.key
            localStorage.langName = idioma.name
           
            this.idioma =  localStorage.langName;
           
           /*  window.location.reload() */
        },
        isloading:function(dados) {
            this.loading = dados
        }
        
    },
    mounted: function(){
       // this.$toasted.global.welcome(i18n.t('welcome'))
       window.eventBus.$on('loading', (dados)=>this.isloading(dados));
    },
    
}
</script>

<style>

.header{
    border-bottom: 2px solid #0C0C0D;
}
.dragable{
    -webkit-app-region: drag;

}

</style>