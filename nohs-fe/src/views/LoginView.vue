<script setup>
  import axios from 'axios';
  import { reactive } from 'vue';
  import {useUserStore} from '@/stores/userStore'

  const userStore = useUserStore();

  const credentials = reactive({
    email: 'john.doe',
    password: ''
  });

  async function loginUser() {

    console.log(credentials);

    try {
      // Make a POST request to the login endpoint with the credentials
      const response = await axios.post('http://127.0.0.1:8080/auth/login', credentials);
      
      // Assuming the API returns a token upon successful login
      const token = response.data.accessToken;
      
      // Store the token in Pinia for authentication
      userStore.token = token;
      
      // Return the response or data you need
      return response.data;
    } catch (error) {
      // Handle any errors, such as network errors or invalid credentials
      console.error('Error logging in:', error);
      throw error; // Optionally, rethrow the error to be caught elsewhere
    }
  }
</script>

<template>
  <div id="login-container" class="card-25">
    <form class="card-container">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input v-model="credentials.email" type="email" id="email" name="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input v-model="credentials.password" type="password" id="password" name="password" placeholder="Enter your password" required>
      </div>
      <button @click.prevent.stop="loginUser()">Login</button>
    </form>

    <div class="card-container">
      <p>Don't have an account yet? 
        <span><RouterLink to="/signup">Sign up</RouterLink></span>
      </p>
    </div>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}

form.card-container h2 {
  color: var(--color-heading);
}

.form-group {
  margin-bottom: 1.5rem;
}

div.card-container{
  margin-top: 3vw;
  text-align: center;
}

label {
  color: var(--color-text);
}

input {
  width: 100%;
  padding: 0.5rem;
  border: 1px solid var(--color-border);
  border-radius: 4px;
  transition: border-color 0.3s ease;
}

input:focus {
  outline: none;
  border-color: var(--color-border-hover);
}

button {
  width: 100%;
  padding: 0.75rem;
  background-color: var(--vt-c-indigo);
  color: var(--vt-c-white);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: darken(var(--vt-c-indigo), 10%);
}

a{
  font-weight: bold;
}
</style>
