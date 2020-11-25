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

  }
</style>
