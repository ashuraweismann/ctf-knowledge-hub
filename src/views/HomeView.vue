<script setup lang="ts">
import { ref, onMounted, computed } from "vue"

const users = ref(0)

// Background images
const images = [
  "https://images.unsplash.com/photo-1511379938547-c1f69419868d",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085"
]

const currentImage = ref(0)

// Counter animation
const displayUsers = computed(() => {
  return users.value >= 1000
    ? (users.value / 1000).toFixed(1) + "K"
    : users.value
})

onMounted(() => {
  // Counter
  let count = 0
  const counterInterval = setInterval(() => {
    count += 50
    users.value = count
    if (count >= 10000) clearInterval(counterInterval)
  }, 20)

  // Image slider
  setInterval(() => {
    currentImage.value =
      (currentImage.value + 1) % images.length
  }, 4000)
})
</script>

<template>
  <div class="w-full">

    <!-- HERO SECTION -->
    <section class="relative h-[85vh] flex items-center justify-center text-white overflow-hidden">

      <!-- Glow blobs -->
      <div class="absolute w-72 h-72 bg-blue-500/30 blur-3xl rounded-full top-10 left-10 animate-pulse"></div>
      <div class="absolute w-72 h-72 bg-purple-500/30 blur-3xl rounded-full bottom-10 right-10 animate-pulse"></div>

      <!-- Background Image Slider -->
      <transition name="fade" mode="out-in">
        <img
          :key="currentImage"
          :src="images[currentImage]"
          class="absolute inset-0 w-full h-full object-cover scale-110 transition-transform duration-4000"
        />
      </transition>

      <!-- Overlay -->
      <div class="absolute inset-0 bg-linear-to-r from-black/80 via-purple-900/60 to-black/80"></div>

      <!-- Content -->
      <div
        v-motion
        :initial="{ opacity: 0, y: 50 }"
        :enter="{ opacity: 1, y: 0 }"
        :transition="{ duration: 800 }"
        class="relative z-10 text-center max-w-2xl px-4"
      >
        <p class="text-sm tracking-widest text-blue-400 mb-2">
          CTF SOLUTIONS
        </p>

        <h1
          v-motion
          :initial="{ opacity: 0, y: 30 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="200"
          class="text-4xl md:text-6xl font-bold mb-4"
        >
          Master Cybersecurity Skills
        </h1>

        <p class="text-gray-200 mb-6">
          Learn, practice and solve real CTF challenges with guided walkthroughs.
        </p>

        <router-link
          to="/challenges"
          class="relative inline-block px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 transition text-white shadow-lg hover:shadow-blue-500/50"
        >
          Explore Challenges
        </router-link>
      </div>
    </section>

    <!-- STATS SECTION -->
    <section
      class="bg-white dark:bg-gray-900 py-16 text-center"
      v-motion:initial="{ opacity: 0 }"
      v-motion:visible="{ opacity: 1 }"
    >
      <h2 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        Trusted By Hackers Worldwide
      </h2>

      <p class="text-gray-500 dark:text-gray-400 mb-10">
        Thousands of learners improving security skills.
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">

        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition">
          <h3 class="text-xl font-bold text-blue-600">500+</h3>
          <p class="text-gray-600 dark:text-gray-300">Challenges</p>
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition">
          <h3 class="text-xl font-bold text-purple-600">200+</h3>
          <p class="text-gray-600 dark:text-gray-300">Walkthroughs</p>
        </div>

        <div class="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl hover:scale-105 transition">
          <h3 class="text-xl font-bold text-green-600">
            {{ displayUsers }}+
          </h3>
          <p class="text-gray-600 dark:text-gray-300">Users</p>
        </div>

      </div>
    </section>

    <!-- FEATURE CARDS -->
    <section class="bg-gray-50 dark:bg-gray-800 py-16">
      <div class="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6">

        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="200"
          class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition duration-300"
        >
          <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">
            Web Exploitation
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Practice real-world web vulnerabilities and attacks.
          </p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="300"
          class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition duration-300"
        >
          <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">
            Cryptography
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Solve encryption puzzles and understand secure systems.
          </p>
        </div>

        <div
          v-motion
          :initial="{ opacity: 0, y: 40 }"
          :enter="{ opacity: 1, y: 0 }"
          :delay="400"
          class="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-xl hover:-translate-y-2 transition duration-300"
        >
          <h3 class="text-lg font-bold mb-2 text-gray-900 dark:text-white">
            Forensics
          </h3>
          <p class="text-gray-600 dark:text-gray-400">
            Analyze data, logs, and hidden information.
          </p>
        </div>

      </div>
    </section>

  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>