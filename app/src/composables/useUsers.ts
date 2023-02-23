
import { ref } from 'vue'
import { api } from '../axiosConfig'

export default function useUsers() {
  const user = ref(null)

  const login = async (email: string, password: string) => {
    const params = { email: email, password: password }
    console.log("params")
    console.log(params)
    return api.post('/api/login', params)
  }

  return {
    user,
    login
  }
}
