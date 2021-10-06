import Vue from "vue";
import Vuex from "vuex";
const noClass = require('../NosEngine/nos_classe_model') ;

let mainClass = new noClass();
mainClass.label = "Main";
mainClass.code = "//Este é um hello world basico. \n//Você pode declarar as suas varitáveis aqui. \n\n//Aqui você pode começar o seu codigo. ";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    ProjectInfo:{
      name:"",
      type:"",
      path:"",
      author:"",
      version:"",
      code:[
        mainClass
      ],
      started:false,
    }
  },
  mutations: {},
  actions: {},
  modules: {}
});
