<script
    lang="ts"
    setup
>
import { Icon } from '@iconify/vue';
import { onBeforeMount, ref, useId, watch, reactive } from 'vue';
import TheUser from './TheUser.vue';
import TheGrid from './TheGrid.vue';
import FlowerSelect from './FlowerSelect';
import type { FlowerSelectOption } from '@/types/flower';
const START = ref(20)

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
const showFlowerSelect = ref(false)
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

const currentDate = ref<DateType>({
    year: 0,
    month: 0,
    day: 0
})

const dateObj = reactive<{
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

const options = reactive<FlowerSelectOption>({
    width: 90,
    height: 36,
    gap: 30,
    data: [
        {
            label: '一',
            value: 1
        },
        {
            label: '二',
            value: 2
        },
        {
            label: '三',
            value: 3
        },
        {
            label: '四',
            value: 4
        },
        {
            label: '五',
            value: 5
        },
        {
            label: '六',
            value: 6
        }
    ]
})

const left = ref(0)
const top = ref(0)
const width = ref(10)

function showSelect(e: MouseEvent) {
    e.preventDefault()
    if (!showFlowerSelect.value) {
        const { clientX, clientY } = e
        left.value = clientX - width.value / 2
        top.value = clientY - width.value / 2
    }
    showFlowerSelect.value = !showFlowerSelect.value
}

watch(() => ({ ...dateObj }), (newVal) => {
    currentDate.value.year = newVal.year
    currentDate.value.month = newVal.month
    currentDate.value.day = newVal.today.day
}, { immediate: true })


/**
 * 计算上月start日到当月start日中间共多少天
 * @param year 年份
 * @param month 月份
 * @param start 开始日
 * @returns { lastStart: number, lastEnd: number, curStart: number, curEnd: number, days: number }
 */
function getDaysCount(year: number, month: number, start: number = 20): void | { day: number, isCurMonth: boolean, workingDay: boolean }[] {
    if (start > 28) return
    const lastMonthDays = new Date(year, month, 0).getDate()
    const isCurMonthDays = new Date(year, month + 1, 0).getDate()
    const startWeekDay = new Date(year, month - 1, start).getDay()
    const padDays = startWeekDay > 0 ? startWeekDay - 1 : 6

    const lastStart = start - padDays
    const lastEnd = lastMonthDays
    const curStart = 1
    const curEnd = isCurMonthDays
    const days = Math.ceil((lastMonthDays + isCurMonthDays + padDays + 1 - start) / 7) * 7

    let startDay = lastStart
    let endDay = lastEnd
    let minus = 0
    let isCurMonth = false
    let workingDay = false
    return Array.from({ length: days }, (_, index) => {
        let day = startDay + index - minus
        if (day > endDay) {
            day = startDay = curStart
            endDay = curEnd
            minus = index
            isCurMonth = !isCurMonth
        }
        if (day === start) {
            workingDay = !workingDay
        }
        return {
            day,
            isCurMonth,
            workingDay
        }
    })

}


const daysCount = ref<{ day: number, isCurMonth: boolean, workingDay: boolean }[]>([])

function initDate() {
    const date = new Date();
    dateObj.year = date.getFullYear();
    dateObj.month = date.getMonth();
    dateObj.lastMonth = date.getMonth();
    dateObj.today.week = date.getDay();
    dateObj.today.day = date.getDate();
}

function setDaysCount(year: number, month: number) {
    daysCount.value = getDaysCount(year, month)!
}


function handleMonth(type: 'prev' | 'next') {
    if (type === 'prev') {
        dateObj.month--
    } else {
        dateObj.month++
    }
    if (dateObj.month < 0) {
        dateObj.year--
        dateObj.month = 11
    }
    if (dateObj.month > 11) {
        dateObj.year++
        dateObj.month = 0
    }
    setDaysCount(dateObj.year, dateObj.month)
}

onBeforeMount(() => {
    initDate()
    setDaysCount(dateObj.year, dateObj.month)
})

</script>

<template>
    <header class="function mb-[1rem]">
        <div class="users flex gap-[10px]">
            <TheUser v-for="user in users"
                     :key="user.name"
                     :user />
        </div>
    </header>
    <main class="date-chart"
          @contextmenu='showSelect'
          @click='showFlowerSelect = false'>
        <nav class="date-title">
            <div class="left">
                <span class="text-[1.2rem] font-500 mr-2">
                    <span>{{ currentDate.year }} 年 </span>
                    <span>{{ currentDate.month + 1 }} 月</span>
                    <span v-if="calendarType === 'day'">{{ currentDate.day }} 日</span>
                </span>
                <button @click="handleMonth('prev')"
                        class="transition duration-300 cursor-pointer bg-white border border-gray-400 p-1 rounded-[4px] text-gray-400 hover:border-[#1677ff] hover:text-[#1677ff]">
                    <Icon icon="fluent:triangle-left-20-regular"
                          width="20"
                          height="20" />
                </button>
                <button @click="handleMonth('next')"
                        class="transition ml-2 duration-300 cursor-pointer bg-white border border-gray-400 p-1 rounded-[4px] text-gray-400 hover:border-[#1677ff] hover:text-[#1677ff]">
                    <Icon class="rotate-180"
                          icon="fluent:triangle-left-20-regular"
                          width="20"
                          height="20" />
                </button>
            </div>
            <div class="right">

            </div>
        </nav>
        <div class="week-title flex mt-[20px]">
            <div class="week-item flex-1 flex items-center justify-center h-[40px] font-bold"
                 v-for="item in ['一', '二', '三', '四', '五', '六', '日']"
                 :key="item">
                {{ item }}
            </div>
        </div>
        <div class="chart-body grid grid-cols-7 gap-[5px]">
            <TheGrid v-for="item in daysCount"
                     :day="item.day"
                     :isCurMonth="item.isCurMonth"
                     :workingDay="item.workingDay"
                     key="useId()" />
        </div>
        <teleport to="body">
            <FlowerSelect v-model:show="showFlowerSelect"
                          :options
                          :left
                          :top
                          :width />
        </teleport>
    </main>
</template>

<style
    scoped
    lang="scss"
>
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

    span {
        user-select: none;  
    }
}
</style>
