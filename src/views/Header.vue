<template>
  <header class="header">
    <header class="header__inner">
      <div class="header__title">
        <router-link to="/" class="link home">
          <h1 class="logo">Log</h1>
        </router-link>
      </div>
      <button
        v-if="$mq == 'sm'"
        class="mobile-menu-btn"
        :class="{ isActive: menuOpen }"
        @click="mobileEvent"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <nav class="header__nav" v-if="$mq == 'md'">
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
    </header>
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

.header {
  background-color: $cBg;
  border: none;

  &__inner {
    height: 100px;
    max-width: 1070px;
    margin: 0 auto 15%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 30px;

    @media screen and (min-width: 480px) {
      flex-direction: row;
      justify-content: space-evenly;
      margin: 0 auto;
    }
  }

  &__title {
    vertical-align: middle;
    @media screen and (min-width: 480px) {
      margin-bottom: 0;
    }
    & .logo {
      color: $cTitle;
      font-weight: 900;
      font-size: 40px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 1);
    }
  }

  &__ul {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  &__li {
    margin: 0 1rem;
  }

  & .link:not(.home) {
    color: $cIcon;
    position: relative;
    padding: 0.5rem 1.5rem;
    border: 2px solid rgba(255, 255, 255, 0.3);
    box-shadow: 4px 4px 6px 0 rgba(0, 0, 0, 0.1),
      -4px -4px 6px rgba(255, 255, 255, 1);
    border-radius: 10px;
    cursor: pointer;
    transition: color 0.2s ease-out, transform 0.2s ease-out;

    &:hover {
      transform: scale(1.05);
      color: $cMain;
      box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.1),
        -4px -4px 10px rgba(255, 255, 255, 1);
    }

    &.active {
      color: $cMain;
      outline: none;
      transform: scale(0.95);
      box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.1),
        -4px -4px 10px rgba(255, 255, 255, 1),
        4px 4px 10px 0 rgba(0, 0, 0, 0.1) inset,
        -4px -4px 10px rgba(255, 255, 255, 1) inset;
    }

    & .custom-class {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }

  & .user-img {
    display: inline-block;
    margin-top: 20%;
    width: 30px;
    height: 30px;
    border-radius: 50%;
  }
}

.mobile-menu-btn {
  outline: none;
  box-shadow: -7px -7px 20px 0px #fff9, -4px -4px 5px 0px #fff9,
    7px 7px 20px 0px #0002, 4px 4px 5px 0px #0001, inset 0px 0px 0px 0px #fff9,
    inset 0px 0px 0px 0px #0001, inset 0px 0px 0px 0px #fff9,
    inset 0px 0px 0px 0px #0001;
  transition: box-shadow 0.6s cubic-bezier(0.79, 0.21, 0.06, 0.81);
  background-color: $cBg;
  cursor: pointer;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 50px;
  height: 50px;

  & span {
    background-color: $cText;
    box-shadow: 0px 0px 10px 0px rgba(240, 128, 128, 0.3);
    width: 30px;
    height: 2px;
    border-radius: 4px;
    margin: 3px 0px 3px 0px;
    transition: margin 0.4s cubic-bezier(0.79, 0.21, 0.06, 0.81),
      transform 0.4s cubic-bezier(0.79, 0.21, 0.06, 0.81);

    &:nth-child(2) {
      transform-origin: 50% 50%;
    }
  }
}

.isActive {
  box-shadow: 0px 0px 0px 0px #fff9, 0px 0px 0px 0px #fff9,
    0px 0px 0px 0px #0001, 0px 0px 0px 0px #0001, inset -7px -7px 20px 0px #fff9,
    inset -4px -4px 5px 0px #fff9, inset 7px 7px 20px 0px #0003,
    inset 4px 4px 5px 0px #0001;

  & span {
    margin: -1px;

    &:nth-child(1) {
      transform: rotate(-45deg);
    }
    &:nth-child(2) {
      transform: scale(0);
    }
    &:nth-child(3) {
      transform: rotate(45deg);
    }
  }
}
</style>
