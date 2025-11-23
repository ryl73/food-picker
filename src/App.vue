<script setup lang="ts">
import VSelect from '@/components/VSelect.vue'
import {
  BREAKFAST_VARIANTS,
  DISH_VARIANTS,
  GARNISH_VARIANTS,
  MEAL_NAME_MAP,
  MEAT_VARIANTS,
  SELECT_MEAL_VARIANTS,
  SELECT_PERIOD_VARIANTS,
} from '@/consts.ts'
import { computed, ref } from 'vue'
import { createUniqueRandomGenerator, getRandom } from '@/utils/random.ts'
import VInput from '@/components/VInput.vue'

export interface IOption {
  label: string
  value: string
}

const period = ref<undefined | IOption>(SELECT_PERIOD_VARIANTS[0])
const meal = ref<null | IOption>(null)
const result = ref<string | Record<string, string> | Record<string, string>[] | null>(null)
const daysCount = ref(3)

const getRandomBreakfast = (generator: () => number | undefined) => {
  const randomIndex = generator()
  const randomBreakfast = BREAKFAST_VARIANTS[randomIndex || 0]
  if (!randomBreakfast) return ''

  return randomBreakfast
}

const getRandomLaunchDinner = (
  meatGenerator: () => number | undefined,
  garnishGenerator: () => number | undefined,
  dishGenerator: () => number | undefined,
) => {
  const randomIndexMeat = meatGenerator()
  const randomIndexGarnish = garnishGenerator()
  const randomIndexDish = dishGenerator()
  const randomMeat = MEAT_VARIANTS[randomIndexMeat || 0]
  const randomGarnish = GARNISH_VARIANTS[randomIndexGarnish || 0]
  const randomDish = DISH_VARIANTS[randomIndexDish || 0]
  if (!randomMeat || !randomGarnish || !randomDish) return ''

  const totalVariants = [`${randomMeat} c ${randomGarnish}`, randomDish]

  const totalIndex = getRandom(totalVariants.length - 1)
  console.log(totalIndex)
  if (!totalVariants[totalIndex]) return ''

  return totalVariants[totalIndex]
}

const generate = () => {
  if (!period.value) return

  if (period.value.value === 'oneMeal' && meal.value) {
    if (meal.value.value === 'breakfast') {
      const generator = createUniqueRandomGenerator(BREAKFAST_VARIANTS.length - 1)
      result.value = getRandomBreakfast(generator)
    } else {
      const meatGenerator = createUniqueRandomGenerator(MEAT_VARIANTS.length - 1)
      const garnishGenerator = createUniqueRandomGenerator(GARNISH_VARIANTS.length - 1)
      const dishGenerator = createUniqueRandomGenerator(DISH_VARIANTS.length - 1)

      result.value = getRandomLaunchDinner(meatGenerator, garnishGenerator, dishGenerator)
    }
  } else if (period.value.value === 'oneDay') {
    const resultObj: Record<string, string> = {
      breakfast: '',
      lunch: '',
      dinner: '',
    }
    const breakfastGenerator = createUniqueRandomGenerator(BREAKFAST_VARIANTS.length - 1)
    const meatGenerator = createUniqueRandomGenerator(MEAT_VARIANTS.length - 1)
    const garnishGenerator = createUniqueRandomGenerator(GARNISH_VARIANTS.length - 1)
    const dishGenerator = createUniqueRandomGenerator(DISH_VARIANTS.length - 1)

    for (const key in resultObj) {
      if (key === 'breakfast') {
        resultObj.breakfast = getRandomBreakfast(breakfastGenerator)
      } else {
        resultObj[key] = getRandomLaunchDinner(meatGenerator, garnishGenerator, dishGenerator)
      }
    }
    result.value = resultObj
  } else {
    result.value = []
    const breakfastGenerator = createUniqueRandomGenerator(BREAKFAST_VARIANTS.length - 1)
    const meatGenerator = createUniqueRandomGenerator(MEAT_VARIANTS.length - 1)
    const garnishGenerator = createUniqueRandomGenerator(GARNISH_VARIANTS.length - 1)
    const dishGenerator = createUniqueRandomGenerator(DISH_VARIANTS.length - 1)

    for (let i = 0; i < daysCount.value; i++) {
      const resultObj: Record<string, string> = {
        breakfast: '',
        lunch: '',
        dinner: '',
      }

      for (const key in resultObj) {
        if (key === 'breakfast') {
          resultObj.breakfast = getRandomBreakfast(breakfastGenerator)
        } else {
          resultObj[key] = getRandomLaunchDinner(meatGenerator, garnishGenerator, dishGenerator)
        }
      }
      result.value.push(resultObj)
    }
  }
}

const generatingDisabled = computed(() => {
  if (!period.value) {
    return true
  } else {
    if (period.value.value === 'oneMeal') {
      if (!meal.value) return true
    }
  }
  return false
})
</script>

<template>
  <main>
    <div class="wrapper">
      <section class="section-description">
        <h1>Что бы покушать?</h1>
        <p>Если вы оказались здесь, вы не понимаете, что же вам поесть</p>
        <p>Это небольшое приложение поможет вам выбрать</p>
      </section>
      <section class="section-parameters">
        <h2>Параметры</h2>
        <div class="parameters">
          <VSelect v-model="period" :options="SELECT_PERIOD_VARIANTS" />
          <VSelect
            v-if="period?.value === 'oneMeal'"
            v-model="meal"
            :options="SELECT_MEAL_VARIANTS"
          />
          <VInput v-if="period?.value === 'severalDays'" v-model="daysCount" />
        </div>
        <button class="button" :disabled="generatingDisabled" @click="generate">Выдать</button>
      </section>
      <section v-if="!!result" class="result-section">
        <div v-if="typeof result === 'string'" class="">{{ result }}</div>
        <div
          v-else-if="typeof result === 'object' && 'breakfast' in result"
          class="day-meal"
          :key="key"
          v-for="(value, key) in result"
        >
          <div class="day-meal__title">{{ MEAL_NAME_MAP[key] }}</div>
          <div class="day-meal__text">{{ value }}</div>
        </div>
        <div v-else class="day-meal__grid">
          <div :key="index" v-for="(_, index) in result">
            <div class="day-meal__grid__title">День {{ index + 1 }}</div>
            <div class="day-meal" :key="key" v-for="(value, key) in result[index]">
              <div class="day-meal__title">{{ MEAL_NAME_MAP[key] }}</div>
              <div class="day-meal__text">{{ value }}</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </main>
</template>

<style scoped>
section {
  padding: 16px 0;
}

.section-description h1 {
  margin-bottom: 16px;
}

.section-description p {
  margin-bottom: 8px;
}

.section-description p:last-child {
  margin-bottom: 0;
}

.section-parameters h2 {
  margin-bottom: 16px;
}

.parameters {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-bottom: 16px;
}

.day-meal {
  padding: 8px 0;
  border-bottom: 1px solid #dcdcdc;
}

.day-meal__title {
  font-size: 1.5rem;
  margin-bottom: 8px;
}

.day-meal__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 32px;
}

.day-meal__grid__title {
  font-size: 2rem;
  margin-bottom: 12px;
}
</style>
