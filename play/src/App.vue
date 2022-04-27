<template>
  <div>
    <el-button type="primary">Hi, You see me ? </el-button>
    <ve-table></ve-table>
    <ve-form></ve-form>
    <ve-item v-model="text"></ve-item>
    <ve-item-range v-model="range"></ve-item-range>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import { VeTable, VeForm, VeItem, VeItemRange } from '@ve-ui/components'

const text = ref('')
const range = ref([])
</script>
