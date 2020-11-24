<template>
  <button
    :class="buttonClasses"
    v-on="$listeners"
  >
    <slot />
  </button>
</template>

<script>
export default {
  name: 'CButton',
  computed: {
    buttonClasses () {
      return [
        'inline-flex',
        'items-center',
        'px-4',
        'py-2',
        'border',
        'border-gray-300',
        'rounded-md',
        'shadow-sm',
        'text-sm',
        'font-medium',
        'text-gray-700',
        'bg-white',
        'hover:bg-gray-50',
        'focus:outline-none',
        'focus:ring-2',
        'focus:ring-offset-2',
        'focus:ring-indigo-500'
      ]
    }
  }
}
</script>
