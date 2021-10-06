<template>
  <!-- <div  class="flowchart-node terminator" :style="nodeStyle" --> 
 <div  class="Nos-Node" :style="nodeStyle"  
    @mousedown="handleMousedown"
    @mouseover="handleMouseOver"
    @mouseleave="handleMouseLeave"
    v-bind:class="{selected: options.selected === id}">
   <div v-if="type=='terminator'" class="terminator">
      <div class="node-port node-input"
       @mousedown="inputMouseDown"
       @mouseup="inputMouseUp">
      </div>
      <div class="node-main">
        <div v-text="type" class="node-type"></div>
        <div v-text="label" class="node-label"></div>
      </div>
      <div class="node-port node-output" 
        @mousedown="outputMouseDown">
      </div>
      <div v-show="show.delete" class="node-delete">&times;</div>
   </div>

   <div v-if="type=='manual_input'" class="manual_input">
      <div class="node-port node-input"
       @mousedown="inputMouseDown"
       @mouseup="inputMouseUp">
      </div>
      <div class="node-main">
        <div v-text="type" class="node-type pt-3 red100"></div>
        <div v-text="label" class="node-label black100"></div>
      </div>
      <div class="node-port node-output" 
        @mousedown="outputMouseDown">
      </div>
      <div v-show="show.delete" class="node-delete">&times;</div>
   </div>
   <div v-if="type=='process'" class="process">
      <div class="node-port node-input"
       @mousedown="inputMouseDown"
       @mouseup="inputMouseUp">
      </div>
      <div class="node-main">
        <div v-text="type" class="node-type pt-3 yellow100"></div>
        <div v-text="label" class="node-label black100"></div>
      </div>
      <div class="node-port node-output" 
        @mousedown="outputMouseDown">
      </div>
      <div v-show="show.delete" class="node-delete">&times;</div>
   </div>
   <div v-if="type=='display'" class="display ">
      <div class="node-port node-input"
       @mousedown="inputMouseDown"
       @mouseup="inputMouseUp">
      </div>
      <div class="node-main ">
        <div v-text="type" class="node-type pt-3 green100"></div>
        <div v-text="label" class="node-label black100"></div>
      </div>
      <div class="node-port node-output" 
        @mousedown="outputMouseDown">
      </div>
      <div v-show="show.delete" class="node-delete">&times;</div>
   </div>
   <div v-if="type=='decision'" class="decision ">
      <div class="node-port node-input"
       @mousedown="inputMouseDown"
       @mouseup="inputMouseUp">
      </div>
      <div class="node-main ">
        <div v-text="type" class="node-type pt-3 green100 px-10"></div>
        <div v-text="label" class="node-label black100 px-10 py-20"></div>
      </div>
      <div class="node-port node-output" 
        @mousedown="outputMouseDown">
      </div>
      <div v-show="show.delete" class="node-delete">&times;</div>
   </div>
   <div v-if="type=='preparation'" class="preparation ">
      <div class="node-port node-input"
       @mousedown="inputMouseDown"
       @mouseup="inputMouseUp">
      </div>
      <div class="node-main ">
        <div v-text="type" class="node-type pt-3 green100 px-10"></div>
        <div v-text="label" class="node-label black100 px-10 py-20"></div>
      </div>
      <div class="node-port node-output" 
        @mousedown="outputMouseDown">
      </div>
      <div v-show="show.delete" class="node-delete">&times;</div>
   </div>
   <div v-if="type=='predefined_process'" class="predefined_process ">
      <div class="node-port node-input"
       @mousedown="inputMouseDown"
       @mouseup="inputMouseUp">
      </div>
      <div class="node-main ">
        <div v-text="type" class="node-type pt-3 green100 "></div>
        <div v-text="label" class="node-label black100  py-20"></div>
      </div>
      <div class="node-port node-output" 
        @mousedown="outputMouseDown">
      </div>
      <div v-show="show.delete" class="node-delete">&times;</div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'NosNode',
  props: {
    id: {
      type: Number,
      default: 1000,
      validator(val) {
        return typeof val === 'number'
      }
    },
    x: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },    
    y: {
      type: Number,
      default: 0,
      validator(val) {
        return typeof val === 'number'
      }
    },
    type: {
      type: String,
      default: 'Default'
    },
    label: {
      type: String,
      default: 'input name'
    },
    options: {
      type: Object,
      default() {
        return {
          centerX: 1024,
          scale: 1,
          centerY: 140,
        }
      }
    }
  },
  data() {
    return {
      show: {
        delete: false,
      }
    }
  },
  mounted() {
  },
  computed: {
    nodeStyle() {
      return {
        top: this.options.centerY + this.y * this.options.scale + 'px', // remove: this.options.offsetTop + 
        left: this.options.centerX + this.x * this.options.scale + 'px', // remove: this.options.offsetLeft + 
        transform: `scale(${this.options.scale})`,
      }
    }
  },
  methods: {
    handleMousedown(e) {
      const target = e.target || e.srcElement;
      // console.log(target);
      if (target.className.indexOf('node-input') < 0 && target.className.indexOf('node-output') < 0) {
        this.$emit('nodeSelected', e);
      }
      e.preventDefault();
    },
    handleMouseOver() {
      this.show.delete = true;
    },
    handleMouseLeave() {
      this.show.delete = false;
    },
    outputMouseDown(e) {
      this.$emit('linkingStart')
      e.preventDefault();
    },
    inputMouseDown(e) {
      e.preventDefault();
    },
    inputMouseUp(e) {
      this.$emit('linkingStop')
      e.preventDefault();
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$themeColor: rgb(85, 144, 255);
$portSize: 12;

.Nos-Node {
  margin: 0;
  min-width: 80px;
 /*  height: 80px; */
  position: absolute;
  box-sizing: border-box;
  border: none;
  background: transparent;
  z-index: 1;
  opacity: .9;
  cursor: move;
  transform-origin: top left;
  .node-main {
    text-align: center;
    .node-type {
      background: $themeColor;
      color: white;
      font-size: 13px;
      padding: 6px;
    }
    .node-label {
      font-size: 13px;
    }
  }
  .node-port {
    position: absolute;
    width: #{$portSize}px;
    height: #{$portSize}px;
    left: 50%;
    transform: translate(-50%);
    border: 1px solid #ccc;
    border-radius: 100px;
    background: white;
    &:hover {
      background: $themeColor;
      border: 1px solid $themeColor;
    }
  }
  .node-input {
    top: #{-2+$portSize/-2}px;
  }
  .node-output {
    bottom: #{-2+$portSize/-2}px;
  }
  .node-delete {
    position: absolute;
    right: -6px;
    top: -6px;
    font-size: 12px;
    width: 12px;
    height: 12px;
    color: $themeColor;
    cursor: pointer;
    background: white;
    border: 1px solid $themeColor;
    border-radius: 100px;
    text-align: center;
    &:hover{
      background: $themeColor;
      color: white;
    }
  }
}
.selected {
  box-shadow: 0 0 0 2px $themeColor;
}

.flowchart-node{
  min-width: 100px;
  min-height: 50px !important;
  background: transparent;
  
}
.terminator{
  .node-main{
    border-radius: 100px;
    overflow: hidden;
  }
  .node-label{
    background: #ffffff;
    border-radius: 0px 0px 100px 100px;
  }
}

.manual_input{
  .node-main{
   clip-path: polygon(0 20%, 100% 9%, 100% 100%, 0% 100%);
  }
}
.display{
  .node-main{
    clip-path: polygon(100% 0%, 100% 48%, 100% 100%, 25% 100%, 0% 50%, 25% 0%);
  }
  .node-label {
    padding-left: 33px;
    padding-right: 10px;
  }
}
.decision{
  .node-main{
    clip-path: polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%);
  }
  .node-label {
    padding-bottom: 30px;
   // padding-right: 10px;
  } 
}
.preparation{
  .node-main{
    clip-path: polygon(72% 0, 100% 49%, 76% 100%, 24% 100%, 0% 50%, 25% 0%);
  }
  .node-label {
   /*  padding-bottom: 30px; */
   // padding-right: 10px;
  } 
}
.predefined_process{
  .node-main{
   clip-path: polygon(0% 15%, 6% 15%, 6% 0, 94% 0, 94% 15%, 100% 15%, 100% 85%, 94% 85%, 94% 100%, 6% 100%, 6% 85%, 0% 85%);
  }
  .node-label {
   /*  padding-bottom: 30px; */
   // padding-right: 10px;
  } 
}
</style>
