import { ref, onMounted } from "vue"
import axios from "axios"

const API_URL = "http://localhost:5000/posts"

export function usePosts() {
  const posts = ref<any[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  // Fetch all posts
  const fetchPosts = async () => {
    loading.value = true
    error.value = null
    try {
      const res = await axios.get(API_URL)
      posts.value = res.data
    } catch (err: any) {
      error.value = err.message || "Failed to load posts"
      posts.value = []
    } finally {
      loading.value = false
    }
  }

  // Create a new post
  const createPost = async (newPost: any) => {
    try {
      const res = await axios.post(API_URL, newPost)
      posts.value.push(res.data)
    } catch (err: any) {
      console.error("Failed to create post:", err)
    }
  }

  // Load posts when composable is used
  onMounted(fetchPosts)

  return {
    posts,
    loading,
    error,
    fetchPosts,
    createPost,
    reload: fetchPosts // optional: keep `reload` alias for backward compatibility
  }
}