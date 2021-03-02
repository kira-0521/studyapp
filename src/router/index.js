import Vue from "vue";
import Router from "vue-router";
import Store from "vuex";
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue");
const Input = () =>
  import(/* webpackChunkName: "Input" */ "../views/Input.vue");
const Graph = () =>
  import(/* webpackChunkName: "Graph" */ "../views/Graph.vue");
const Login = () =>
  import(/* webpackChunkName: "Login" */ "../views/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "../views/Register.vue");

Vue.use(Router).use(Store);

export default new Router({
  moda: "history",
  routes: [
    {
      path: "/",
      component: Home
    },
    {
      path: "/input",
      component: Input
    },
    {
      path: "/graph",
      component: Graph
    },
    {
      path: "/login",
      component: Login
    },
    {
      path: "/register",
      component: Register
    }
  ]
});
