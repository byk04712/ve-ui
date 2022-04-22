<template>
  <div>
    <slot>Form</slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Form',
  props: {},
  setup(props) {
    // init here
  }
})
</script>
