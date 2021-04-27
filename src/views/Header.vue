<template>
  <header class="header">
    <div class="header__inner">
      <div class="header__title">
        <router-link to="/" class="link home">
          <h1 class="logo">Log</h1>
        </router-link>
      </div>
      <button
        v-if="$mq === 'mobile'"
        class="mobile-menu-btn"
        :class="{ isActive: menuOpen }"
        @click="mobileEvent"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="header__nav" v-if="$mq === 'pc'">
        <ul class="header__ul">
          <li class="header__li">
            <router-link to="/input" active-class="active" class="link input">
              <pen-tool-icon size="1.5x" class="custom-class"></pen-tool-icon>
            </router-link>
          </li>
          <li class="header__li">
            <router-link
              to="/userdata/0"
              active-class="active"
              class="link userdata"
              exact
            >
              <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
            </router-link>
          </li>
          <li class="header__li">
            <router-link to="/graph" active-class="active" class="link graph">
              <pie-chart-icon size="1.5x" class="custom-class"></pie-chart-icon>
            </router-link>
          </li>
          <li class="header__li" v-if="photoURL">
            <router-link to="/" class="link logout">
              <log-out-icon
                @click="logout"
                size="1.5x"
                class="custom-class"
              ></log-out-icon>
            </router-link>
          </li>
          <li class="header__li" v-if="photoURL">
            <img :src="photoURL" class="user-img" alt="" />
          </li>
        </ul>
      </nav>
    </div>
  </header>
</template>

<script>
import {
  PenToolIcon,
  CalendarIcon,
  PieChartIcon,
  LogOutIcon
} from "vue-feather-icons";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    PenToolIcon,
    CalendarIcon,
    PieChartIcon,
    LogOutIcon
  },
  props: ["menuOpen"],
  computed: {
    ...mapGetters("getpost", ["photoURL"])
  },
  methods: {
    ...mapActions("getpost", ["logout"]),
    mobileEvent() {
      this.$emit("button-click");
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";
@import "../assets/styles/views/_header.scss";
</style>
