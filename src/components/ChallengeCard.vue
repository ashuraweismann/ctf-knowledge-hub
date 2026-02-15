<script setup lang="ts">
import type { Challenge } from '../types/challenge'
import { computed } from "vue"

const props = defineProps<{
  challenge: Challenge
}>()


const difficultyLevel = computed(() => {
  const rating = props.challenge.difficulty

  if (rating < 3) return "Easy"
  if (rating < 4.5) return "Medium"
  return "Hard"
})

// Map category to Tailwind colors
const categoryClasses = (category: string) => {
  switch (category) {
    case "Web":
      return "bg-blue-200 text-blue-800"
    case "Crypto":
      return "bg-purple-200 text-purple-800"
    case "Forensics":
      return "bg-green-200 text-green-800"
    default:
      return "bg-gray-200 text-gray-800"
  }
}

</script>

<template>
   <router-link
    :to="`/challenges/${challenge.id}`"
    class="block bg-white shadow-lg rounded-xl p-6 hover:scale-105 transition-transform"
  >
    <div class="flex justify-between items-center mb-2">
      <h2 class="text-xl font-semibold">{{ challenge.title }}</h2>
      <span
        :class="['px-2 py-1 rounded text-sm font-medium', categoryClasses(challenge.category)]"
      >
        {{ challenge.category }}
      </span>
      
      <span
          :class="{
            'bg-green-200 text-green-800': difficultyLevel === 'Easy',
           'bg-yellow-200 text-yellow-800': difficultyLevel === 'Medium',
           'bg-red-200 text-red-800': difficultyLevel === 'Hard'
                  }"
          class="px-2 py-1 rounded text-sm font-medium"
          >
          {{ difficultyLevel }}
        </span>
    </div>

      

   <p class="text-gray-600 text-sm mb-2">{{ challenge.description }}</p>

    <div class="flex justify-between text-sm font-medium">
      <p>Points: {{ challenge.points }}</p>
      <p>Difficulty: {{ challenge.difficulty }}</p>
    </div>
  </router-link>
</template>
