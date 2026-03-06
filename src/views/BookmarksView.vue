<script setup lang="ts">
import { computed, ref } from "vue"
import { useBookmarkStore } from "../stores/bookmarks"
import { useChallenges } from "../composables/useChallenges"
import ChallengeCard from "../components/ChallengeCard.vue"

const searchQuery = ref("")
const categoryFilter = ref("")

const { challenges } = useChallenges(searchQuery, categoryFilter)
const bookmarkStore = useBookmarkStore()

const bookmarkedChallenges = computed(() =>
  challenges.value.filter(c =>
    bookmarkStore.bookmarks.includes(c.id)
  )
)
</script>

<template>
  <div class="p-6 max-w-6xl mx-auto">
    <h1 class="text-2xl font-bold mb-6">Bookmarked Challenges</h1>

    <div v-if="bookmarkedChallenges.length === 0">
      No bookmarks yet.
    </div>

    <div class="grid md:grid-cols-3 gap-6">
      <ChallengeCard
        v-for="challenge in bookmarkedChallenges"
        :key="challenge.id"
        :challenge="challenge"
      />
    </div>
  </div>
</template>