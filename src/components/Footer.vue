<template>
  <footer class="mt-10 bg-gray-900 text-gray-300 dark:bg-black border-t border-gray-800">
    <div class="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center gap-4">

      <!-- Left -->
      <div class="text-center md:text-left">
        <h2 class="text-lg font-bold text-white">
          🛡️ CTF Knowledge Hub
        </h2>
        <p class="text-sm text-gray-400">
          Modern SPA for cybersecurity learning
        </p>
      </div>

      <!-- Center Links -->
      <div class="flex gap-6 text-sm">
        <router-link to="/" class="hover:text-white transition">Home</router-link>
        <router-link to="/challenges" class="hover:text-white transition">Challenges</router-link>
        <router-link to="/resources" class="hover:text-white transition">Resources</router-link>
      </div>

      <div class="flex gap-4 mt-2">
        <a href="https://github.com/ashuraweismann/ctf-knowledge-hub" target="_blank" class="hover:text-white">
          <img src="/src/assets/icone-github-blue.png" alt="Footer Icon" width="30" height="30">
        </a>
      </div>

      <!-- Right -->
      <div class="text-sm text-gray-500 text-center md:text-right">
        © {{ new Date().getFullYear() }} All rights reserved
      </div>

    </div>
  </footer>
</template>