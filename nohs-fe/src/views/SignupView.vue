<script setup>

</script>

<template>
  <div id="login-container" class="card-25">
    <form class="card-container">
      <h2>Sign up</h2>
      <div class="form-group">
        <label for="first-name">First name</label>
        <input type="text" id="first-name" name="firstName" placeholder="Enter your first name" required>
      </div>
      <div class="form-group">
        <label for="last-name">Last name</label>
        <input type="text" id="last-name" name="lasName" placeholder="Enter your last name" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input type="email" id="email" name="email" placeholder="Enter your email" required>
      </div>
      <div class="form-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required>
      </div>
      <button type="submit">Sign up</button>
    </form>
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

</style>
