<script
  setup
  lang="ts"
>
import { computed } from 'vue';
import FlowerLeaf from './FlowerLeaf.vue';
import type { FlowerSelectOption } from '@/types/flower';

const show = defineModel<boolean>('show', { required: true })
const { options, width = 50, backgroundColor = 'transparent', left = 0, top = 0 } = defineProps<{
  options: FlowerSelectOption;
  width?: number;
  backgroundColor?: string;
  left?: number;
  top?: number;
}>()

const ColorMap: [string, string][] = [
  ['#4E65FF', '#92EFFD'],
  ['#6FD6FF', '#BFF098'],
  ['#C6EA8D', '#FE90AF'],
  ['#EA8D8D', '#A890FE'],
  ['#D8B5FF', '#1EAE98'],
]

const extraDegMap = {
  right: 0,
  bottom: 90,
  left: 180,
  top: 270,
}

const direction = computed(() => {
  return options.direction || 'right';
})

const style = computed(() => {
  return {
    display: show.value ? 'block' : 'none',
    width: `${width}px`,
    height: `${width}px`,
    backgroundColor,
    left: `${left}px`,
    top: `${top}px`,
    '--top': `${width / 2 - options.height / 2}px`,
  }
})

const computedData = computed(() => {
  const extraDeg = extraDegMap[direction.value]
  const r = options.height / 2
  const l = options.width - r
  const cosβ = r / l
  const θ = Math.asin(cosβ) * 2 // 角度
  const dataLength = options.data.length // 选项数量
  const isEven = dataLength % 2 === 0 // 是否为偶数
  const count = Math.floor(dataLength / 2) // 花瓣数量的一半，因为基线会分隔选项
  const colorMapLength = ColorMap.length // 颜色数量
  const singleDeg = (θ + options.gap) // 单次旋转角度
  const startAngle = (isEven ? (count - 0.5) * singleDeg : count * singleDeg) + extraDeg // 结束角度
  return options.data.map((item, i) => {
    const option = {
      width: options.width,
      height: options.height,
      delay: 0,
      endAngle: startAngle - singleDeg * (dataLength - i - 1),
      startAngle: startAngle,
      data: item,
      stopColor: ColorMap[i % colorMapLength],
      cutWidth: width
    }

    return option
  })
})


</script>


<template>

  <div class="flower-select" @click="show = false"
       :style>
    <template v-if="show">
      <FlowerLeaf v-for="option in computedData"
                :key="option.data.value"
                v-bind="option" />
    </template>
  </div>
</template>

<style
  scoped
  lang="less"
>
.flower-select {
  position: absolute;
  border-radius: 50%;
  z-index: 1;

  >div {
    left: 50%;
    top: var(--top);
  }
}
</style>
