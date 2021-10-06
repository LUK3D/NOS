<template>
  <div class="node" :class="[selected(), node.name] | kebab">
    <div class="title">{{node.name}}</div>

    <div class="description">{{node.description}}</div>

    <!-- Inputs-->
    <!-- <div class="inputs">
      <div class="input" v-for="input in inputs()" :key="input.key">
        <Socket v-socket:input="input" type="input" :socket="input.socket"></Socket>
        <div class="input-title" v-show="!input.showControl()">{{input.name}}</div>
        <div class="input-control" v-show="input.showControl()" v-control="input.control"></div>
      </div>
    </div> -->

    <!-- Controls-->
    <div class="controls">
      <div class="control" v-for="control in controls()" v-control="control" :key="control.key"></div>
    </div>

    <!-- Outputs-->
    <!-- <div class="outputs">
      <div class="output" v-for="output in outputs()" :key="output.key">
        <div class="output-title">{{output.name}}</div>
        <Socket v-socket:output="output" type="output" :socket="output.socket"></Socket>
      </div>
    </div> -->
  </div>
</template>


<script>
// adapted from https://github.com/retejs/vue-render-plugin/blob/master/src/Node.vue
import VueRenderPlugin from "rete-vue-render-plugin";
export default {
  mixins: [VueRenderPlugin.mixin],
  components: {
    /* Socket: VueRenderPlugin.Socket */
  }
};
</script>

<style>
.node {
  background: rgb(76, 112, 233);
  border: 2px solid #4e58bf;
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
  background: rgb(46, 72, 158);
}
.node.selected {
  background: rgb(76, 112, 233);
  border-color: #e3c000;
}
.node .title {
  color: white;
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
  color: white;
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
}
</style>