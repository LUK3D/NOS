import Toasted from 'vue-toasted';
import Vue from 'vue'

Vue.use(Toasted,{iconPack:'mdi'});

// Lets Register a Global Error Notification Toast.
Vue.toasted.register('welcome', (msg)=>{
    return msg;
}, {
  type : 'info',
  icon : 'mdi-alert',
  position:'bottom-right',
  action : {
    text : 'Cancel',
    onClick : (e, toastObject) => {
        toastObject.goAway(0);
    },
   
    className:'toast'
},
})

export default {

}
