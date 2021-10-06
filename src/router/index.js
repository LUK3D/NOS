import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import nodeEditor from "../views/nodeEditor.vue";
import codeEditor from "../views/codeEditor.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/nodeEditor",
    name: "nodeEditor",
    component: nodeEditor
  },
  {
    path: "/codeEditor",
    name: "codeEditor",
    component: codeEditor
  },
 
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue")
  }
];

const router = new VueRouter({
  //mode: "hash",
  mode: process.env.IS_ELECTRON ? 'hash' : 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
