<template>
  <nav class="mobile-menu">
    <div class="logo">
      <span class="logo__log">Log</span>
    </div>
    <ul class="mobile-menu__main">
      <li class="mobile-menu__item">
        <router-link class="mobile-menu__link" to="/input">
          <span class="main-title">Input</span>
          <span class="sub-title">入力</span>
        </router-link>
      </li>
      <li class="mobile-menu__item">
        <router-link class="mobile-menu__link" to="/userdata/0">
          <span class="main-title">Calendar</span>
          <span class="sub-title">データ</span>
        </router-link>
      </li>
      <li class="mobile-menu__item">
        <router-link class="mobile-menu__link" to="/graph">
          <span class="main-title">Graph</span>
          <span class="sub-title">グラフ</span>
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {};
</script>
