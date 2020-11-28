<template>
  <button
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CButton'
}
</script>

<style lang="scss" scoped>
  button {
    margin: 10px;
    padding: 5px 10px;
    font-size: 24px;
    color: white;
    border: none;
    border-radius: 5px;

    &:not(&[disabled]) {
      background-color: #3b8070;
      cursor: pointer;
    }

    &[disabled] {
      background-color: lightslategrey;
    }
  }
</style>
