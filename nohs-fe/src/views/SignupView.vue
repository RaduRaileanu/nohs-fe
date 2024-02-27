<script setup>
  import axios from 'axios';
  import { reactive } from 'vue';
  import pinia from '@/stores/store.js'
  import {useUserStore} from '@/stores/userStore'
  import {useNavStore} from '@/stores/navStore'
  import router from '@/router/index';

  const userStore = useUserStore(pinia);
  const navStore = useNavStore(pinia);

  const controlls = reactive({
    addUser: true,
    showOrgOptions: false,
    addOrganisation: false,
    selectService: false,
    showToken: false
  });

  const userInfo = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',

  });

  const organisationInfo = reactive({
    name: '',
    code: ''
  });

  let serviceId = 1;

  /**
   * Register the user
   */
  async function signupUser(){

    try {
      // Make a POST request to the auth/register endpoint with the user information
      const response = await axios.post('http://127.0.0.1:8080/auth/register', userInfo);

      // Get the data sent with the response
      const responseData = response.data;

      // if user registration was successfull
      if(responseData.successfulCompletion){
        // Get the token returned upon successful registration
        const token = response.data.accessToken;
        
        // Store the token in store for authentication
        userStore.token = token;

        // Store user info in user store except for the password
        userStore.userInfo = userInfo;
        delete userStore.userInfo.password

        // Set the controlls to dispaly next step in user sign up 
        controlls.addUser = false;
        controlls.selectService = true;
      }
      // if the registration failed, alert user
      else {
        alert(responseData.message);
      }
      
    } catch (error) {
      // Handle any errors, such as network errors or invalid credentials
      console.error('Error registering user:', error);
    }
    
  }

  /**
   * Add an organisation for the user. 
   * !!!!!! Currently not used
   */
  async function addOrganizationInfo(){
    try {

      // construct the code for the organisation
      const orgNameArray = organisationInfo.name.split(" ");
      organisationInfo.code = orgNameArray.join("");

      // Set the Authorization header for Axios request
      axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.token}`;

      // Make a POST request to the organisation endpoint with the organisation information
      const response = await axios.post('http://127.0.0.1:8080/organisation', organisationInfo);
      
      // Get the data sent with the response
      const responseData = response.data;

      // if user registration was successfull
      if(responseData.successfulCompletion){
        
        /**
         * Logic to be coded later
         */

        // Set the controlls to dispaly next step in user sign up 
        controlls.addOrganisation = false;
        controlls.selectService = true;
      }
      // if the registration failed, alert user
      else {
        // alert(responseData.message);
      }
      
    } catch (error) {
      // Handle any errors, such as network errors or invalid credentials
      console.error('Error registering organisation:', error);
    }

    
  }

  /**
   * Selects the service chosen by the user
   */
  async function selectService(){
    try {

      console.log(parseInt(serviceId));
      // Set the Authorization header for Axios request
      axios.defaults.headers.common['Authorization'] = `Bearer ${userStore.token}`;

      // Make a POST request to the subscription endpoint with the id of the service selected by the user
      const response = await axios.post('http://127.0.0.1:8080/subscription', parseInt(serviceId), {
      headers: {
          'Content-Type': 'application/json'
      }
      });

    // Get the data sent with the response
    const responseData = response.data;

    // if user registration was successfull
    if(response.status >= 200  && response.status <300){
      // Get the subscription returned upon successful signup and store it in userStore
      userStore.subscription = responseData;
      userStore.subscription[serviceId] = userStore.subscription.service.id;
      delete userStore.subscription.service;
      
      // Set the controlls to dispaly next step in user sign up 
      controlls.selectService = false;
      controlls.showToken = true;
    }

    } catch (error) {
    // Handle any errors, such as network errors or invalid credentials
    console.error('Error logging in:', error);
    // throw error; // Optionally, rethrow the error to be caught elsewhere
    }

  }

  /**
   * Copies the api key stored in userStore.token in the clipboard for use in other applications
   */
  function copyApiKey(){
    // Create a temporary textarea element
    const textarea = document.createElement('textarea');
    textarea.value = userStore.token;
    document.body.appendChild(textarea);

    // Select the text within the textarea
    textarea.select();
    textarea.setSelectionRange(0, 99999); // For mobile devices

    // Copy the selected text to clipboard
    document.execCommand('copy');

    // Remove the temporary textarea
    document.body.removeChild(textarea);
  }

  /**
   * Redirects the user to the page visited before they started the registration process or, if the user visited the sign up page directly, to the home page
   */
  function finnishSignup(){
    // Redirect to the route saved in the navStore or to home
    router.push({ name: navStore.landingDest ?? 'home' });
  }
</script>

<template>
  <div id="login-container" class="card-25">
    <form class="card-container">
      <h2>Sign up</h2>
      <div v-if="controlls.addUser">
        <div class="form-group">
          <label for="first-name">First name</label>
          <input v-model="userInfo.firstName" type="text" id="first-name" name="firstName" placeholder="Enter your first name" required>
        </div>
        <div class="form-group">
          <label for="last-name">Last name</label>
          <input v-model="userInfo.lastName" type="text" id="last-name" name="lasName" placeholder="Enter your last name" required>
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input v-model="userInfo.email" type="email" id="email" name="email" placeholder="Enter your email" required>
        </div>
        <div class="form-group">
          <label for="password">Password</label>
          <input v-model="userInfo.password" type="password" id="password" name="password" placeholder="Enter your password" required>
        </div>
        <button @click.prevent.stop="signupUser">Save user info</button>
      </div>

      <div v-if="controlls.showOrgOptions">
        <button @click.prevent.stop="controlls.addOrganisation = true; controlls.showOrgOptions" style="margin-bottom: 5px;">Add organization</button>
        <button @click.prevent.stop="controlls.selectService = true; controlls.showOrgOptions = false">Individual user</button>
      </div>

      <div v-if="controlls.addOrganisation">
        <div class="form-group">
          <label for="organisation-name">Organization name</label>
          <input v-model="organisationInfo.name" type="text" id="organisation-name" name="organisationName" placeholder="Enter your organisation's name" required>
        </div>
        <button @click.prevent.stop="addOrganizationInfo">Save organization</button>
      </div>

      <div v-if="controlls.selectService">
        <div class="form-group">
        <label>Select service:</label><br>
        <label for="basic"><input type="radio" id="basic" name="options" v-model="selectedOption" value="3"> Basic</label><br>
        <label for="regular"><input type="radio" id="regular" name="options" v-model="selectedOption" value="2"> Regular</label><br>
        <label for="extended"><input type="radio" id="extended" name="options" v-model="selectedOption" value="1"> Extended</label>
        <button @click.prevent.stop="selectService">Sign up</button>
        </div>
      </div>
    </form>
    <div class="card-container" v-if="controlls.showToken">
      <label>Your API key:</label>
      <div id="api-key-container">
        <p>{{ userStore.token }}</p>
        <button class="utils-button" @click.prevent.stop="copyApiKey">Copy</button>  
      </div>
      <p>Please copy your api key and store it securely</p>
      <button @click.prevent.stop="finnishSignup">Got it</button>
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

#api-key-container {
  background: var(--color-background);
  width:100%;
  /* height: 32px; */
  padding: 0.75rem;
  border-color: var(--vt-c-divider-dark-2);
  border: 1px solid;
  border-radius: 8px;
  overflow: hidden
}

.utils-button{
  height: 25px !important;
  width: 25px !important;
  background-color: var(--color-background-soft) !important;
  color: var(--vt-c-white) !important;
  border: none !important;
  border-radius: 8px !important;
  cursor: pointer !important;
  transition: background-color 0.3s ease;
}

</style>
