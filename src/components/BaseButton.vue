<template>
  <button class="el_btn">
    <slot />
  </button>
</template>

<style scoped lang="scss">
.el_btn {
  border: none;
  color: $cText;
  outline: none;
  font-size: 1rem;
  cursor: pointer;
  padding: 1em 2.8em;
  font-weight: 700;
  text-align: center;
  border-radius: 32px;
  letter-spacing: 0.2rem;
  background-color: $cBg;
  transition: 0.2s ease-in-out;
  box-shadow: -6px -6px 14px rgba(255, 255, 255, 0.7),
    -6px -6px 10px rgba(255, 255, 255, 0.5),
    6px 6px 8px rgba(255, 255, 255, 0.075), 6px 6px 10px rgba(0, 0, 0, 0.15);

  &:hover {
    color: $cMain;
    box-shadow: -2px -2px 6px rgba(255, 255, 255, 0.6),
      -2px -2px 4px rgba(255, 255, 255, 0.4),
      2px 2px 2px rgba(255, 255, 255, 0.05), 2px 2px 4px rgba(0, 0, 0, 0.1);
  }

  &:active {
    box-shadow: inset -2px -2px 6px rgba(255, 255, 255, 0.7),
      inset -2px -2px 4px rgba(255, 255, 255, 0.5),
      inset 2px 2px 2px rgba(255, 255, 255, 0.075),
      inset 2px 2px 4px rgba(0, 0, 0, 0.15);
  }
}
</style>
