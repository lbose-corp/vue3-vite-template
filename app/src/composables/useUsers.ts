
import { ref } from 'vue'
import { api } from '../axiosConfig'

export default function useUsers() {
  const user = ref(null)

  const login = async (email: string, password: string) => {
    const params = { email: email, password: password }
    return api.post('/api/login', params)
  }

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    const params = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    return api.post('/api/register', params)
  }

  return {
    user,
    login,
    register
  }
}
