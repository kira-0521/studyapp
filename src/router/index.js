import Vue from "vue";
import Router from "vue-router";
// import store from "../store";
// webpackのimportを使用することで必要になったタイミングでコンポーネントをロードすることができる。
// 初期描画に時間がかからない。
const Home = () => import(/* webpackChunkName: "Home" */ "../views/Home.vue");
const Input = () =>
  import(/* webpackChunkName: "Input" */ "../views/Input.vue");
const Graph = () =>
  import(/* webpackChunkName: "Graph" */ "../views/Graph.vue");
const UserData = () =>
  import(/* webpackChunkName: "UserData" */ "../views/UserData.vue");

Vue.use(Router);

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
      path: "/userdata/:id",
      component: UserData,
      name: "userdata",
      props: true
    }
  ]
});
