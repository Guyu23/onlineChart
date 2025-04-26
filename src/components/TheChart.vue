<script lang="ts" setup>
import { Icon } from '@iconify/vue';
import { onBeforeMount, ref } from 'vue';

const START = 21
const END = 20

type CalendarType = 'month' | 'week' | 'day'

type DateType = {
    year: number,
    month: number,
    day: number
}

type UserType = {
    name: string,
    age?: number,
    gender?: string,
    color?: string,
    avatar?: string
}

const users = ref<UserType[]>([
    {
        name: '张三',
        age: 20,
        gender: '男',
        color: '#1677ff',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png'
    },
    {
        name: '李四',
        age: 21,
        gender: '女',
        color: '#1677ff',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png'
    },
    {
        name: '王五',
        age: 22,
        gender: '男',
        color: '#1677ff',
        avatar: 'https://img.yzcdn.cn/vant/ipad.png'
    }
])

const calendarType = ref<CalendarType>('month')

const TODAY = ref<DateType>({
    year: 0,
    month: 0,
    day: 0
})

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
    <header class="function mb-[1rem]">
        <div class="users flex gap-[10px]">
            <div class="user inline-flex items-center gap-[5px] border border-gray-300 pl-[10px] pr-[12px] rounded-[12px]"
                v-for="user in users" :key="user.name">
                <span class="inline-block w-[10px] h-[10px] rounded-full"
                    :style="{ backgroundColor: user.color }"></span>
                {{ user.name }}
            </div>
        </div>
    </header>
    <main class="date-chart">
        <nav class="date-title">
            <div class="left">
                <span class="text-[1.2rem] font-500 mr-2">
                    <span>{{ TODAY.year }} 年</span>
                    <span>{{ TODAY.month }} 月</span>
                    <span v-if="calendarType === 'day'">{{ TODAY.day }} 日</span>
                </span>
                <button
                    class="transition duration-300 cursor-pointer bg-white border border-gray-400 p-1 rounded-[4px] text-gray-400 hover:border-[#1677ff] hover:text-[#1677ff]">
                    <Icon icon="fluent:triangle-left-20-regular" width="20" height="20" />
                </button>
                <button
                    class="transition ml-2 duration-300 cursor-pointer bg-white border border-gray-400 p-1 rounded-[4px] text-gray-400 hover:border-[#1677ff] hover:text-[#1677ff]">
                    <Icon class="rotate-180" icon="fluent:triangle-left-20-regular" width="20" height="20" />
                </button>
            </div>
            <div class="right"></div>
        </nav>
    </main>
</template>

<style scoped lang="scss">
.date-chart {
    flex: 1;
    border: 1px solid #ccc;
    border-radius: 10px;
    padding: 10px;
    box-shadow: rgba(14, 63, 126, 0.04) 0px 0px 0px 1px,
        rgba(42, 51, 69, 0.04) 0px 1px 1px -0.5px,
        rgba(42, 51, 70, 0.04) 0px 3px 3px -1.5px,
        rgba(42, 51, 70, 0.04) 0px 6px 6px -3px,
        rgba(14, 63, 126, 0.04) 0px 12px 12px -6px,
        rgba(14, 63, 126, 0.04) 0px 24px 24px -12px;

    .date-title {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .left {
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
    }
}
</style>
