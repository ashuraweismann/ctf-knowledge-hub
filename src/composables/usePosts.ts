import { ref, onMounted } from "vue"
import { fetchPosts } from "../api/api"

export function usePosts() {
  const posts = ref<any[]>([])
  const loading = ref(true)
  const error = ref<string | null>(null)

  const loadPosts = async () => {
    loading.value = true
    error.value = null

    try {
      posts.value = await fetchPosts()
    } catch (err: any) {
      error.value = err.message || "Failed to load posts"
      posts.value = []
    } finally {
      loading.value = false
    }
  }

  onMounted(loadPosts)

  return {
    posts,
    loading,
    error,
    reload: loadPosts
  }
}
