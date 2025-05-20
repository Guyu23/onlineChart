<script lang="ts" setup>
const { user } = defineProps({
  user: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="user cursor-pointer inline-flex items-center gap-[5px] border border-gray-300 pl-[10px] pr-[12px] rounded-[12px]">
    <span class="inline-block w-[10px] h-[10px] rounded-full" :style="{ backgroundColor: user.color }"></span>
    {{ user.name }}
  </div>
</template>

<style scoped></style>
