import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useUserStore = defineStore('userStore', {
  state: () => ({
    token: '',
    userInfo: {},
    subscription: {}
  }),
  persist: true
})
