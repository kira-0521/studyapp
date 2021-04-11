import Vue from "vue";
import Router from "vue-router";
import Store from "vuex";
// webpackのimportを使用することで必要になったタイミングでコンポーネントをロードすることができる。
// 初期描画に時間がかからない。
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue");
const Input = () =>
  import(/* webpackChunkName: "Input" */ "../views/Input.vue");
const Graph = () =>
  import(/* webpackChunkName: "Graph" */ "../views/Graph.vue");
const Login = () =>
  import(/* webpackChunkName: "Login" */ "../views/Login.vue");
const Register = () =>
  import(/* webpackChunkName: "Register" */ "../views/Register.vue");
const Test = () => import(/* webpackChunkName: "Test" */ "../views/Test.vue");
const UserData = () =>
  import(/* webpackChunkName: "UserData" */ "../views/UserData.vue");

Vue.use(Router).use(Store);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      component: Home,
      name: "home"
    },
    {
      path: "/input",
      component: Input,
      name: "input"
    },
    {
      path: "/graph",
      component: Graph,
      name: "graph"
    },
    {
      path: "/login",
      component: Login,
      name: "login"
    },
    {
      path: "/register",
      component: Register,
      name: "register"
    },
    {
      path: "/test",
      component: Test,
      name: "test"
    },
    {
      path: "/userdata/:id",
      component: UserData,
      name: "userdata",
      props: true
    }
  ]
});
