import type { IOption } from '@/App.vue'

export const BREAKFAST_VARIANTS = [
  'Овсянка на молоке с бананом / яблоком и корицей',
  'Сырники вкусвилл + сметана',
  'Творог с бананом',
  'Омлет с овощами',
  'Творожная запеканка + сметана/сгущенка/ягоды',
]

export const MEAT_VARIANTS = [
  'Голень курицы',
  'Бедро курицы',
  'Грудка курицы',
  'Филе индейки',
  'Семга/форель в духовке',
  'Крылышки в духовке',
  'Треска',
  'Свинина',
  'Купаты / сосиски',
]

export const GARNISH_VARIANTS = [
  'гречкой',
  'киноа',
  'чечевицой',
  'макаронами',
  'картошкой',
  'рисом',
  'булгуром',
  'овощами в духовке',
]

export const DISH_VARIANTS = [
  'Куриный суп',
  'Тыквенный крем-суп',
  'Болгарский перец, фаршированный курицей и овощами',
  'Лазанья',
  'Вок',
  'Салат кальмаровый',
  'Шаурма домашняя',
  'Салат с курицей с соусом сметана+горчица',
]

export const SELECT_PERIOD_VARIANTS: IOption[] = [
  {
    label: 'На 1 прием пищи',
    value: 'oneMeal',
  },
  {
    label: 'На 1 день',
    value: 'oneDay',
  },
  {
    label: 'На кол-во дней',
    value: 'severalDays',
  },
]

export const SELECT_MEAL_VARIANTS = [
  {
    label: 'Завтрак',
    value: 'breakfast',
  },
  {
    label: 'Обед или ужин',
    value: 'dinner',
  },
]

export const MEAL_NAME_MAP: Record<string, string> = {
  breakfast: 'Завтрак',
  lunch: 'Обед',
  dinner: 'Ужин',
}
