<script setup>

</script>

<template>
  <div id="login-container" class="card-50">
    <form class="card-container">
      <h2>Login</h2>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>
      </div>
      <button type="submit">Login</button>
      <!-- <p>Don't have an account yet?
        <a href="/sign"></a> 
        <button class="sign-up-button" @click="redirectToSignUp">Sign Up</button>
      </p> -->
    </form>

    <div class="card-container">
      <p>Don't have an account yet? 
          <a href="/signup">Sign up</a> 
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
/* 
@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
} */
.card-50{
  width: 50vw;
  margin: 0 auto;
  margin-top: 5vw;
  padding: 2rem;
  font-weight: normal;
}

.card-container {
  background-color: var(--color-background-soft);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form.card-container h2 {
  color: var(--color-heading);
}

.form-group {
  margin-bottom: 1.5rem;
}

div.card-container{
  margin-top: 3vw;
  /* padding-left: 25%; */
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
  margin-left: 2rem;
}
</style>
