import { ref, computed, onMounted } from "vue"
import type { Ref } from "vue"
import type { Challenge } from "../types/challenge"
import { fetchChallenges } from "../api/api"

export function useChallenges(searchQuery: Ref<string>, categoryFilter: Ref<string>) {
  const challenges = ref<Challenge[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const loadChallenges = async () => {
    loading.value = true
    error.value = null

    try {
      challenges.value = await fetchChallenges()
    } catch (err: any) {
      console.error(err)
      error.value = err.message || "Failed to load challenges"
      challenges.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(loadChallenges)

  const filteredChallenges = computed(() =>
    challenges.value.filter((c) => {
      const matchesCategory =
        categoryFilter.value === "All" ||
        c.category.toLowerCase() === categoryFilter.value.toLowerCase()
      const matchesSearch =
        c.title.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
        c.description.toLowerCase().includes(searchQuery.value.toLowerCase())
      return matchesCategory && matchesSearch
    })
  )

  const categories = computed(() => ["All", ...Array.from(new Set(challenges.value.map(c => c.category)))])

  return { challenges, filteredChallenges, loading, error, categories, reload: loadChallenges }
}
