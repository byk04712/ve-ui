<template>
  <div>
    <!-- <ve-table></ve-table> -->
    <!-- <ve-form></ve-form> -->
    <hr />
    <p>item组件</p>
    <ve-item v-model="text"></ve-item>
    <hr />
    <p>item-split组件</p>
    <ve-item-split v-model="range"></ve-item-split>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { VeForm, VeItem, VeItemSplit } from '@ve-ui/components'

const text = ref('')
const range = ref([new Date(), new Date()])
</script>
