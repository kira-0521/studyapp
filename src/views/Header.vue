<template>
  <header class="header">
    <header class="header__inner">
      <div class="header__title">
        <router-link to="/" class="link home">
          <h1 class="logo">Log</h1>
        </router-link>
      </div>
      <nav class="header__nav">
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
          <li class="header__li">
            <router-link v-if="photoURL" to="/" class="link logout">
              <log-out-icon
                @click="logout"
                size="1.5x"
                class="custom-class"
              ></log-out-icon>
            </router-link>
          </li>
          <li class="header__li">
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
  computed: {
    ...mapGetters("login", ["photoURL"])
  },
  methods: {
    ...mapActions("login", ["logout"])
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/styles/modules/_variables.scss";
@import "../assets/styles/modules/_variables2.scss";

.header {
  background-color: $cBg;
  border: none;

  &__inner {
    height: 100px;
    max-width: 1070px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 0 30px;
  }

  &__title {
    vertical-align: middle;
    & .logo {
      color: $cText;
      font-weight: 900;
      font-size: 40px;
      text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.3),
        -2px -2px 4px rgba(255, 255, 255, 1);
    }
  }

  &__ul {
    display: flex;
    align-items: center;
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
      color: $cBlue;
      box-shadow: 4px 4px 10px 0 rgba(0, 0, 0, 0.1),
        -4px -4px 10px rgba(255, 255, 255, 1);
    }

    &.active {
      color: $cBlue;
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
</style>
