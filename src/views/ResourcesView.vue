<script setup lang="ts">
const resources = [
  {
    title: "What is CTF?",
    category: "Intro",
    videoId: "8ev9ZX9J45A"
  },
  {
    title: "Beginner CTF Guide",
    category: "Intro",
    videoId: "fNzpcB7ODxQ"
  },
  {
    title: "Web Exploitation Basics",
    category: "Web",
    videoId: "2TofunAI6fU"
  },
  {
    title: "SQL Injection Tutorial",
    category: "Web",
    videoId: "ciNHn38EyRc"
  },
  {
    title: "Cryptography Basics",
    category: "Crypto",
    videoId: "jhXCTbFnK8o"
  },
  {
    title: "Digital Forensics Intro",
    category: "Forensics",
    videoId: "kQkE9nTg6hg"
  }
]
import { ref, computed } from "vue"

const selectedCategory = ref("All")

const categories = ["All", "Intro", "Web", "Crypto", "Forensics"]

const filteredResources = computed(() => {
  if (selectedCategory.value === "All") return resources
  return resources.filter(r => r.category === selectedCategory.value)
})
</script>

<template>
  <div class="p-6 max-w-7xl mx-auto">

    <h1 class="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
      📚 Learning Resources
    </h1>

    <p class="text-gray-600 dark:text-gray-400 mb-10">
      Learn CTF concepts with curated videos from YouTube.
    </p>
    <!-- Category Filter -->
     <div class="mb-6 flex gap-3 flex-wrap">
        <button
          v-for="cat in categories"
          :key="cat"
          @click="selectedCategory = cat"
            class="px-4 py-1 rounded-full text-sm border
             bg-gray-100 dark:bg-gray-800
             hover:bg-blue-500 hover:text-white transition"
            :class="{ 'bg-blue-500 text-white': selectedCategory === cat }"
        >
          {{ cat }}
        </button>
      </div>
    <!-- Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

      <div
        v-for="res in filteredResources"
        :key="res.videoId"
        class="bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-xl transition overflow-hidden"
      >
        <!-- Video -->
        <div class="aspect-video">
          <iframe
            class="w-full h-full"
            :src="`https://www.youtube.com/embed/${res.videoId}`"
            title="YouTube video player"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>

        <!-- Content -->
        <div class="p-4">
          <h2 class="font-semibold text-lg text-gray-900 dark:text-white">
            {{ res.title }}
          </h2>

          <span
            class="inline-block mt-2 px-3 py-1 text-sm rounded-full bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
          >
            {{ res.category }}
          </span>
        </div>
      </div>

    </div>

  </div>
</template>