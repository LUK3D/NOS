<template>
<v-col class="d-flex flex-column bg--text justify-center align-center">
  <h1 class="text-h2">{Nos}</h1>
  <p class="text-caption mt-5">Transpiling all the code</p>
  <p class="text-caption">Aguarde enquanto fazemos a magia acontecer</p>
  <v-btn @click="getCode()" color="success" small>GetCode</v-btn>
  
  <div class="bg--text">
<pre>
{{code}}
</pre>
  </div>
</v-col>
</template>

<script>
  export default {
    name: 'Home',

    data(){
      return{
        code:""
      }
    },
    components: {
    },
    mounted(){
     this.getCode();
   
    },
    methods:{
      getCode(){
           var dis = this;
          window.ipcRenderer.invoke('getCode').then(async (res)=>{
             
              if(res.length>0){
               
                var finalCode = res;
                 dis.code = await window.NOS.Transpile(finalCode);
                console.dir(dis.code);
                 window.ipcRenderer.invoke('savePyCode', dis.code).then((result)=>{
                    console.dir(result);
                  
                  })
              }
            
            })
      }
    }
  }
</script>
