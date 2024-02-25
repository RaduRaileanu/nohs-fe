import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useNavStore = defineStore('userStore', {
  state: () => ({
    landingDest: ''
  }),
  persist: true
})
