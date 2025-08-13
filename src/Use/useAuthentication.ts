import { ref, onMounted } from 'vue'
import { useRouter} from 'vue-router'

const signInState = ref(false)

export default function useAuth() {
  const router = useRouter()

  const init = () => {
    const storedAuth = localStorage.getItem("lc-userId")

    if (storedAuth === "true") {
      signInState.value = true
    } 
  }

  const signIn = () => {
    signInState.value = true
    localStorage.setItem("lc-userId", JSON.stringify(signInState.value))
    router.push("/")
  }

  const signOut = () => {
    signInState.value = false
    localStorage.setItem("lc-userId", JSON.stringify(signInState.value))
    router.push("/sign-in")
  }

  onMounted(() => {
    init()
  })

  return {
    signInState,
    signIn,
    signOut
  }
}