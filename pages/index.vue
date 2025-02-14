<template>
    <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div class="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          class="mx-auto h-10 w-auto"
          src="https://tailwindui.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
        />
        <h2 class="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
      </div>
  
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form @submit.prevent="handleLogin" class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-900">Email address</label>
            <div class="mt-2">
              <input
                v-model="form.email"
                type="email"
                id="email"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>
  
          <div>
            <label for="password" class="block text-sm font-medium text-gray-900">Password</label>
            <div class="mt-2">
              <input
                v-model="form.password"
                type="password"
                id="password"
                required
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>
  
          <div>
            <div class="mt-2">
              <input
                v-model="userIp"
                type="text"
                id="userIp"
                readonly
                class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:outline-indigo-600"
              />
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Sign in
            </button>
          </div>
        </form>
  
        <p class="mt-10 text-center text-sm text-gray-500">
          Not a member?
          <a href="#" class="font-semibold text-indigo-600 hover:text-indigo-500">Start a 14 day free trial</a>
        </p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  
  const router = useRouter();
  const allowedIps = ref<string[]>([]); // Initialize as a reactive array
  const userIp = ref<string>('');
  const userIdArray = ref<{ eMail: string; passWord: string }[]>([]); // Adjust type as needed
  const form = ref({
    email: '',
    password: '',
    remember: false,
  });
  
  const isValidEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };
  
  const isValidPassword = (password: string) => {
    return password.length === 6; // Adjust password validation as needed
  };
  
  const isValidForm = computed(() => {
    return isValidEmail(form.value.email) && isValidPassword(form.value.password);
  });
  
  onMounted(async () => {
    const response = await axios.get('https://api.ipify.org?format=json');
    userIp.value = response.data.ip;
    console.log(userIp.value, 'userIp');
    await getIp(); // Fetch allowed IPs on mount
    await getId(); // Fetch user IDs on mount
  });
  
  const handleLogin = async () => {
    const response = await axios.get('https://api.ipify.org? format=json');
    // const clientIp = response.data.ip;
  const clientIp='49.204.130.71';
    console.log(Array.isArray(allowedIps.value), allowedIps.value); // Debugging
  
    if (allowedIps.value.includes(clientIp)) {
      const enteredEmail = form.value.email;
      const enteredPassword = form.value.password;
  
      const foundUser  = userIdArray.value.find(user => user.eMail === enteredEmail && user.passWord === enteredPassword);
  
      if (foundUser ) {
        router.push('/dashboard');
      } else {
        alert('Invalid email or password');
      }
    } else {
      alert('Access denied. Your IP address is not allowed.');
    }
  };
  
  const getIp = async () => {
    try {
      const response = await axios.get('https://g1.gwcindia.in/powerstocks/ipadress.php');
      allowedIps.value = response.data.ips; // Ensure this is an array
      console.log(response.data.ips, 'response.data.ips'); // Debugging
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  const getId = async () => {
    try {
      const response = await axios.get('https://g1.gwcindia.in/powerstocks/userId.php');
      userIdArray.value = response.data; // Ensure this is an array
      console.log(response.data, 'response.data.id'); // Debugging
    } catch (err) {
      console.error('Error:', err);
    }
  };
  
  const isPasswordVisible = ref(false);
  </script>
  
  <style scoped>
  /* Add your styles here */
  </style>