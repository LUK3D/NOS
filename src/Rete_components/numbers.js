import Rete from "rete";
import Vue from "vue/dist/vue.esm";
import CodePlugin from 'rete-code-plugin';
////////////////////////////////////////////////////////////////////////////////
// numSocket



////////////////////////////////////////////////////////////////////////////////
// numControl

var VueNumControl = Vue.component("num", {
  props: ["readonly", "emitter", "ikey", "getData", "putData"],
  template: `
  <input type="text" style="outline:none;" class="black100t"  :readonly="readonly" :value="value"  @dblclick.stop="" @pointerdown.stop="" @pointermove.stop=""/>
  `,
  data() {
    return {
      value: 0
    };
  },
  methods: {
    change(e) {
      this.value = +e.target.value;
      this.update();
    },
    update() {
      if (this.ikey) this.putData(this.ikey, this.value);
      this.emitter.trigger("process");
    }
  },
  mounted() {
    this.value = this.getData(this.ikey);
  }
});

class NumControl extends Rete.Control {
  constructor(emitter, key, readonly) {
    super(key);
    this.component = VueNumControl;
    this.props = { emitter, ikey: key, readonly };
  }

  setValue(val) {
    this.vueContext.value = val;
  }
}

////////////////////////////////////////////////////////////////////////////////
// NumComponent
const execution = new Rete.Socket("Next");
const anyType = new Rete.Socket("Any Type");


/* var anyTypeSocket = new Rete.Socket('Any type');
numSocket.combineWith(anyTypeSocket); */


export class Start extends Rete.Component {


  constructor(name) {
    super(name.toLowerCase());
  }

   

  builder(node) {
    let outPut = new Rete.Output('run','Start', execution)
    node.description = "Starts The Application";
    node.addOutput(outPut);
    console.log(node);
  }

  worker(node, inputs, outputs) {
    inputs['code'] = node.data.code;
    inputs['id'] = node.data.id;
  }
}


export class End extends Rete.Component {
  constructor(name) {
    super(name.toLowerCase());
  }

  builder(node) {
    let inPut = new Rete.Input('run','End', execution,true)
    node.description = "Finish The Application";
    node.addInput(inPut);
    console.log(node);
  }

  worker(node, inputs, outputs) {
    inputs['code'] = node.data.code;
    inputs['id'] = node.data.id;
  }
}



export class Read extends Rete.Component {
  constructor(name) {
    super(name.toLowerCase());
  }

  builder(node) {
    let out = new Rete.Output("runNext", "Run next", execution);
    let out2 = new Rete.Output("val", "Return Val", anyType);
    let inPut = new Rete.Input('run','Run', execution)
    node.description = "Enable the user to insert a value";
    node.addControl(new NumControl(this.editor, "num",));
    node.addOutput(out);
    node.addOutput(out2);
    node.addInput(inPut);
    console.log(node);
  }

  worker(node, inputs, outputs) {
    outputs["num"] = node.data.num;
    inputs['code'] = node.data.code;
    inputs['id'] = node.data.id;
  }
}



export class Show extends Rete.Component {
  constructor(name,tipo) {
    /* this.name = name;
    this.tipo = tipo */
    super(name.toLowerCase());
  }

  builder(node) {
    let out2 = new Rete.Output("runNext", "Run Next", execution,);
    let inPut2 = new Rete.Input("run", "Run", execution, true);
    let inPut = new Rete.Input('num2','Value', anyType)



    node.description = "Displays a nunmber on the screen";
    node.addOutput(out2);
    node.addInput(inPut2);
    node.addInput(inPut);
    var offsets = document.getElementsByClassName('toolBox')[0];
    var top = offsets.getBoundingClientRect().top + window.pageYOffset - offsets.ownerDocument.documentElement.clientTop;
    var left = offsets.getBoundingClientRect().left + window.pageXOffset - offsets.ownerDocument.documentElement.clientLeft;

    node.position = [left+20, top];
  

    console.log(node);
  }

  worker(node, inputs, outputs, add,) {
    outputs["num"] = node.data.num;
    inputs['str'] = node.data.str;
    inputs['code'] = node.data.code;
    inputs['id'] = node.data.id;
   
  }

  code(node, inputs, add) { // 'node' param is similar to worker's "node"
        // "inputs" contains variables name
        add('console.log("hello!")') // add code line
        add('num', node.data.num); // add variable with value "node.data.num"
    }
}



export class If_Else extends Rete.Component {
  constructor(name,tipo) {
    /* this.name = name;
    this.tipo = tipo */
    super(name.toLowerCase());
  }

  builder(node) {
    let out2 = new Rete.Output("true", "True", execution,);
    let out1 = new Rete.Output("false", "False", execution,);
    let inPut2 = new Rete.Input("run", "Run", execution, true);
    let inPut = new Rete.Input('value','Logic', anyType)



    node.description = "Capare two numbers and execute diferent functions depending on the *Value";
    node.addOutput(out2);
    node.addOutput(out1);
    node.addInput(inPut2);
    node.addInput(inPut);

    console.log(node);
  }

  worker(node, inputs, outputs,add) {
   /*  add('console.log("Hello World! Filipe Lukebana com if e else")') */
   /*  outputs["num"] = node.data.num;
    inputs['str'] = node.data.str; */
    inputs['code'] = node.data.code;
    inputs['id'] = node.data.id;
  }
  code(node, inputs, add) { // 'node' param is similar to worker's "node"
        // "inputs" contains variables name
        add('console.log("hello!")') // add code line
        add('num', node.data.num); // add variable with value "node.data.num"
  }
}