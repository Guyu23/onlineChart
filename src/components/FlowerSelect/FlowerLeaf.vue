<script
  setup
  lang="ts"
>
import { computed, useId } from 'vue';

const {
  width, // 宽度
  height, // 高度
  delay, // 延迟
  startAngle, // 开始角度
  endAngle, // 结束角度
  stopColor, // 渐变色
  cutWidth, // 花瓣起始的位置
  data = {
    label: '选项',
    value: '1',
  }, // 花瓣上的文字
  fontSize = 14, // 字体大小
} = defineProps<{
  width: number;
  height: number;
  delay: number;
  startAngle: number;
  endAngle: number;
  stopColor: [string, string];
  cutWidth: number;
  data: {
    label: string;
    value: string | number;
  };
  fontSize?: number;
}>()
const uniqueId = useId()
const style = computed(() => {
  return {
    width: `${width}px`,
    height: `${height}px`,
    '--start-angle': `${startAngle}deg`,
    '--end-angle': `${endAngle}deg`,
    '--delay': `${delay}s`,
  }
})


const position = computed(() => {
  const r = height / 2
  const l = width - r
  const cosθ = r / l
  const sinθ = Math.sin(Math.acos(cosθ)) // cosθ = r / l
  const startH = cutWidth * cosθ // 起始点到中线距离
  const tanH = r * sinθ // 切点到中线距离
  const startX = cutWidth * sinθ // 起始点x坐标
  const endX = startX // 结束点x坐标
  const startY = r + startH // 因为是从下往上逆时针画
  const endY = r - startH
  const tanPointX = (l ** 2 - r ** 2) / l
  const tanPointY = r - tanH
  const tanPointY_2 = r + tanH

  const textX = (width + startX + r) / 2
  const textY = r
  return {
    d: `M ${startX} ${startY} A ${cutWidth} ${cutWidth} 0 0 0 ${endX} ${endY} L ${tanPointX} ${tanPointY} A ${r} ${r} 0 1 1 ${tanPointX} ${tanPointY_2} Z`,
    textX,
    textY,
  }
})
</script>

<template>
  <div class="flower-leaf cursor-pointer hover:scale-110 transition-all duration-300"
       :style>
    <svg>
      <path :d="position.d"
            :fill="`url(#gradient-${uniqueId})`" />
      <text :x="position.textX"
            :y="position.textY"
            style="dominant-baseline: middle; text-anchor: middle;"
            :font-size="fontSize + 'px'"
            fill="white"
            font-weight="bold">{{ data.label }}</text>
      <defs>
        <linearGradient :id="`gradient-${uniqueId}`">
          <stop :offset="0"
                :stop-color="stopColor[0]" />
          <stop :offset="1"
                :stop-color="stopColor[1]" />
        </linearGradient>
      </defs>
    </svg>
  </div>
</template>

<style
  scoped
  lang="less"
>
.flower-leaf {
  position: absolute;
  opacity: 0;
  transform-origin: left;
  animation: rotate 0.5s ease-in-out var(--delay) forwards;
  svg {
    width: 100%;
    height: 100%;
  }
}

@keyframes rotate {
  0% {
    opacity: 0;
    transform: rotate(var(--start-angle));
  }
  100% {
    opacity: 1;
    transform: rotate(var(--end-angle));
  }
}
</style>
