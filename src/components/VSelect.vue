<script lang="ts" setup>
import { ref } from 'vue'

interface IOption {
  label: string
  value: string
}

withDefaults(
  defineProps<{
    options?: IOption[]
    placeholder?: string
  }>(),
  {
    placeholder: 'Выберите вариант',
  },
)

const selectRef = ref<HTMLElement | null>(null)

const isOpen = ref(false)

const model = defineModel<IOption | null>({ default: null })

const toggleOpen = () => {
  if (!isOpen.value) {
    setOpened()
  } else {
    setClosed()
  }
}

const setOpened = () => {
  isOpen.value = true
  document.addEventListener('click', catchOuterClick)
}

const setClosed = () => {
  isOpen.value = false
  document.removeEventListener('click', catchOuterClick)
}

const selectOption = (value: IOption) => {
  model.value = value
  setClosed()
}

const catchOuterClick = (e: MouseEvent) => {
  if (!selectRef.value) return
  const target = e.target as HTMLElement
  if (!selectRef.value.contains(target)) {
    setClosed()
  }
}
</script>
<template>
  <div class="v-select" ref="selectRef">
    <div class="v-select__field" :class="{ opened: isOpen }" @click="toggleOpen">
      <span v-if="model">{{ model.label }}</span>
      <span v-else class="v-select__field__placeholder">{{ placeholder }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -4.5 20 20" version="1.1">
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
          <g
            id="Dribbble-Light-Preview"
            transform="translate(-220.000000, -6684.000000)"
            fill="#000000"
          >
            <g id="icons" transform="translate(56.000000, 160.000000)">
              <path
                d="M164.292308,6524.36583 L164.292308,6524.36583 C163.902564,6524.77071 163.902564,6525.42619 164.292308,6525.83004 L172.555873,6534.39267 C173.33636,6535.20244 174.602528,6535.20244 175.383014,6534.39267 L183.70754,6525.76791 C184.093286,6525.36716 184.098283,6524.71997 183.717533,6524.31405 C183.328789,6523.89985 182.68821,6523.89467 182.29347,6524.30266 L174.676479,6532.19636 C174.285736,6532.60124 173.653152,6532.60124 173.262409,6532.19636 L165.705379,6524.36583 C165.315635,6523.96094 164.683051,6523.96094 164.292308,6524.36583"
                id="arrow_down-[#338]"
              ></path>
            </g>
          </g>
        </g>
      </svg>
    </div>
    <transition name="slide-fade" mode="out-in">
      <ul v-show="isOpen" class="v-select__option-list">
        <li
          class="v-select__option"
          :key="option.value"
          v-for="option in options"
          @click="selectOption(option)"
        >
          {{ option.label }}
        </li>
      </ul>
    </transition>
  </div>
</template>

<style scoped>
.v-select {
  position: relative;
  user-select: none;
  display: inline-block;
  min-width: 200px;
}

.v-select__field {
  border: 1px #ccc solid;
  padding: 12px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
}

.v-select__field svg {
  width: 16px;
  transition: transform 0.3s ease-in-out;
}

.v-select__field.opened svg {
  transform: rotate(180deg);
}

.v-select__field__placeholder {
  color: #999;
}

.v-select__option-list {
  position: absolute;
  z-index: 100;
  top: 52px;
  left: 0;
  max-height: 260px;
  overflow: auto;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.08);
  width: 100%;
  border: 1px #ccc solid;
  background-color: #fff;
  border-radius: 8px;
  list-style: none;
}

.v-select__option {
  border-radius: 8px;
  padding: 12px 20px;
  transition: background-color 0.3s ease-in-out;
  cursor: pointer;
}

.v-select__option:hover {
  background-color: #eee;
}

.slide-fade-enter-active,
.slide-fade-leave-active {
  overflow: hidden;
  transition: all 0.3s ease-in-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  max-height: 0;
}
</style>
