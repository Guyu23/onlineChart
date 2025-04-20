<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { onBeforeMount, ref } from 'vue';

const START = 21
const END = 20

const dataObj = ref<{
    year: number,
    month: number,
    lastMonth: number,
    today: {
        week: number,
        day: number
    }
}>({
    year: 0,
    month: 0,
    lastMonth: 0,
    today: {
        week: 0,
        day: 0
    }
})


onBeforeMount(() => {
    const date = new Date();
    dataObj.value.year = date.getFullYear();
    dataObj.value.month = date.getMonth();
    dataObj.value.lastMonth = date.getMonth() - 1;
    dataObj.value.today.week = date.getDay();
    dataObj.value.today.day = date.getDate();
    console.log(dataObj.value);
})

</script>

<template>
    <div class="date-chart">
        <div class="date-title">
            <Icon icon="iconoir:skip-prev" width="24" height="24" />
            <span>2025</span>
            <Icon icon="iconoir:skip-next" width="24" height="24" />
        </div>
    </div>
</template>

<style scoped lang="sass">
</style>
