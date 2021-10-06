<template>

    <v-col class="node pa-0 ma-0 " :class="[selected(), node.name] | kebab; node.name">
    


      <v-row class="pa-0 ma-0 justify-center align-center">
         <!-- Inputs-->
        <div class="inputs">
          <div class="input" v-for="input in inputs()" :key="input.key">
            <Socket v-socket:input="input" type="input" class="bblack600 whiteb" :socket="input.socket"></Socket>
            <div class="input-title black100t" v-show="!input.showControl()">{{input.name}}</div>
            <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
          </div>
        </div>

        <v-tooltip bottom  :stype="{ 'opacity:0;' : destroyed != false}"  @mouseleave.prevent="destroyed = !destroyed">
          <template v-slot:activator="{ on, attrs }" >
              <div class="title black100t"  v-bind="attrs" v-on="on">{{node.name.toUpperCase()}}</div>
          </template>
                <span>{{node.description}} </span>
        </v-tooltip>

        <!-- Outputs-->
        <div class="outputs">
          <div class="output " v-for="output in outputs()" :key="output.key">
            <div class="output-title black100t">{{output.name}}</div>
            <Socket v-socket:output="output" type="output" class="red100 bblack600" :socket="output.socket"></Socket>
          </div>
        </div>

      </v-row>
       
      <!-- Controls-->
      <div class="controls">
        <div class="control" v-for="control in controls()" v-control="control" :key="control.key"></div>
      </div>
    </v-col>
  
</template>


<script>
// adapted from https://github.com/retejs/vue-render-plugin/blob/master/src/Node.vue
import VueRenderPlugin from "rete-vue-render-plugin";
export default {
  data(){
    return{
      destroyed:false
    }
  },
  mixins: [VueRenderPlugin.mixin],
  components: {
    Socket: VueRenderPlugin.Socket
  }
};
</script>

<style type="css">


.node {
  background: rgb(245, 251, 255);
  border: 2px solid #c9c9c9;
  border-radius: 10px;
  cursor: pointer;
  min-width: 100px;
  height: auto;
  padding-bottom: 6px;
  box-sizing: content-box;
  position: relative;
  user-select: none;
}
.node:hover {
  background: rgb(240, 240, 240);
  border-color: #86cfff;
}
.node.selected {
  background: rgb(240, 240, 240);
  border-color: #0062e3;
}
.node .title {
  color: rgb(56, 56, 56);
  font-family: sans-serif;
  font-size: 18px;
  padding: 8px;
}
.node .output {
  text-align: right;
}
.node .input {
  text-align: left;
}
.node .input-title,
.node .output-title {
  vertical-align: middle;
  color: rgb(68, 68, 68);
  display: inline-block;
  font-family: sans-serif;
  font-size: 14px;
  margin: 10px;
  line-height: 10px;
}
.node .input-control {
  z-index: 1;
  vertical-align: middle;
  display: inline-block;
 
}
.node .control {
  padding: 10px;
   background: #00000096;
   border-radius: 10px;
}

.show{
  background: #0C0C0D !important;
}
.read{
  background: #4545a9 !important;
}

.next{
  background: brown !important;
}
.any-type{
  background: cornsilk !important;
}
</style>