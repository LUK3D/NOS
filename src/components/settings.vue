<template >
 <v-row justify="center" class="hideY">
    <v-dialog 
      v-model="show"
      persistent
      max-width="600px"
      fullscreen
      
    >
     <v-col cols="12" class="black500">
        <n-header :options='false' title="Settings"></n-header>
    </v-col>
      <v-card class="black500 showY" width="100%" max-width="100%">
        <v-card-text>
          <v-container>
            <v-row>
               
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
               <v-btn @click="openPlugin()">Open Plugin</v-btn>
               <v-btn @click="savePlugin()">Save my Plugin</v-btn>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal middle name"
                  hint="example of helper text only on focus"
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Legal last name*"
                  hint="example of persistent helper text"
                  persistent-hint
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Email*"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  label="Password*"
                  type="password"
                  required
                ></v-text-field>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-select
                  :items="['0-17', '18-29', '30-54', '54+']"
                  label="Age*"
                  required
                ></v-select>
              </v-col>
              <v-col
                cols="12"
                sm="6"
              >
                <v-autocomplete
                  :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                  label="Interests"
                  multiple
                ></v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="this.closeDialog"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import cabecalho from './cabecalho'
import { dialog } from 'electron'
import Vue from 'vue'
export default {
    components:{
        'n-header':cabecalho
    },
    props: {
    dialog: {
      type: Boolean,
      default: false,
      required: true,
     
    }
  },
  data(){
      return{
          show:false
      }
  },
  methods:{
      showDialog:function(){
          this.show = !this.show;
      },
      closeDialog:function(){
          this.$emit('closeSettings')
      },
      openPlugin: function(){
            window.Nos.loadPlugin().then(
               function(value){
                   console.log(value)
               },function(error){
                    console.log(error)
               }
           );
           
      },
      savePlugin:function(){
          let val = window.Nos.exportPlugin();
           this.$emit('addplugin',{title:'Filas', icon:'mdi-code-brackets', function:"function(args = null){this.drawer = !this.drawer;}"})
      }
  },
  watch:{
      dialog:function(val,old){
        this.show = !this.show;
      }
  }

}
</script>

<style>

</style>