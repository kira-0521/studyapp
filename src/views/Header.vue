<template>
  <header class="header">
    <header class="header__inner">
      <div class="header__title">
        <router-link to="/" class="link home">
          <h1 class="logo">Log</h1>
        </router-link>
      </div>
      <nav class="header__nav">
        <router-link to="/login" active-class="active" class="link login">
          <log-in-icon size="1.5x" class="custom-class"></log-in-icon>
        </router-link>

        <router-link to="/input" active-class="active" class="link input">
          <pen-tool-icon size="1.5x" class="custom-class"></pen-tool-icon>
        </router-link>

        <router-link
          to="/userdata/0"
          active-class="active"
          class="link userdata"
        >
          <calendar-icon size="1.5x" class="custom-class"></calendar-icon>
        </router-link>

        <router-link to="/graph" active-class="active" class="link graph">
          <pie-chart-icon size="1.5x" class="custom-class"></pie-chart-icon>
        </router-link>
      </nav>
    </header>
  </header>
</template>

<script>
import {
  LogInIcon,
  PenToolIcon,
  CalendarIcon,
  PieChartIcon
} from "vue-feather-icons";
export default {
  components: {
    LogInIcon,
    PenToolIcon,
    CalendarIcon,
    PieChartIcon
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

  & .link:not(.home) {
    color: $cIcon;
    position: relative;
    margin: 0 1rem;
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
}
</style>
