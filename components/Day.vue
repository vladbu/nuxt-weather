<template>
  <div>
    kek
    {{ day }}
  </div>
</template>

<script>
export default {
  name: 'Day',
  props: {
    data: {
      type: Object,
      default: () => {
        return {}
      }
    }
  }
}
</script>
