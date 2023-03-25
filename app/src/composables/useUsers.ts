
import { ref } from 'vue'
import { api } from '../axiosConfig'

export default function useUsers() {
  const user = ref(null)

  const login = async (email: string, password: string) => {
    const params = { email: email, password: password }
    return api.post('/login', params, { withCredentials: true })
  }

  const register = async (name: string, email: string, password: string, password_confirmation: string) => {
    const params = {
      name: name,
      email: email,
      password: password,
      password_confirmation: password_confirmation
    }

    await api.get('/sanctum/csrf-cookie')
    return api.post('/register', params)
  }

  const sendPasswordResetLink = async (email: string) => {
    const params = { email: email }
    return api.post('/password/request', params)
  }

  return {
    user,
    login,
    register,
    sendPasswordResetLink
  }
}
