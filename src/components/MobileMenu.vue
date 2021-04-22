<template>
  <nav class="mobile-menu">
    <div class="logo">
      <span class="logo__log">Log</span>
    </div>
    <ul class="mobile-menu__main">
      <li class="mobile-menu__item">
        <router-link class="mobile-menu__link" to="./views/input">
          <span class="main-title">Input</span>
          <span class="sub-title">勉強内容入力</span>
        </router-link>
      </li>
      <li class="mobile-menu__item">
        <router-link class="mobile-menu__link" to="./views/calendar">
          <span class="main-title">Calendar</span>
          <span class="sub-title">ユーザーデータ</span>
        </router-link>
      </li>
      <li class="mobile-menu__item">
        <router-link class="mobile-menu__link" to="./views/graph">
          <span class="main-title">Graph</span>
          <span class="sub-title">グラフデータ</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>
