<script
  lang="ts"
  setup
>
const { day, isCurMonth, workingDay } = defineProps<{
  day: number
  isCurMonth: boolean
  workingDay: boolean
}>()
</script>

<template>
  <div class="day relative flex flex-col gap-[5px] w-[1fr] min-h-[100px] border border-gray-300 rounded-[4px] p-[4px]">
    <span class="day-number absolute top-[5px] right-[10px] font-[Monolisa]" :class="{ 'cur-month': isCurMonth, 'working-day': workingDay }">{{ day }}</span>
  </div>
</template>

<style scoped lang="scss">
.day {
  .day-number {
    display: inline-block;
    user-select: none;
    color: #9BA2AE;

    &.cur-month {
      color: #000;
    }
    &.working-day {
      color: #9BA2AE;
    }
  }
}
</style>
