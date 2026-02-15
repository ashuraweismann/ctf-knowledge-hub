import { ref, onMounted } from "vue"
import type { Challenge } from "../types/challenge"
import { fetchChallengeById } from "../api/api"

export function useChallenge(id: string) {
  const challenge = ref<Challenge | null>(null)
  const loading = ref(true)
  const error = ref<string | null>(null)

  onMounted(async () => {
    loading.value = true
    error.value = null

    try {
      challenge.value = await fetchChallengeById(id)
    } catch (err: any) {
      error.value = err.message || "Challenge not found"
      challenge.value = null
    } finally {
      loading.value = false
    }
  })

  return {
    challenge,
    loading,
    error
  }
}
