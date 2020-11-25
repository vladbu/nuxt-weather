<template>
  <button v-on="$listeners">
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
    background-color: #3b8070;
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
      cursor: pointer;
    }
  }
</style>
