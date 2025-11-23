<script setup lang="ts">
const model = defineModel({ default: 3 })
</script>

<template>
  <div class="input__container">
    <input class="input" v-model="model" type="number" />
  </div>
</template>

<style scoped>
.input__container {
  display: inline-block;
  min-width: 200px;
}

.input {
  width: 100%;
  border: 1px #ccc solid;
  font-size: 1rem;
  padding: 12px 20px;
  border-radius: 8px;
  gap: 16px;
  outline: none;
  transition: all 0.3s ease-in-out;
}

.input:hover {
  background-color: #eee;
}

.input:focus {
  border-color: #fd94ff;
}
</style>
