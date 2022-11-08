<template>
  <div
    class="mt-3 grid grid-cols-1 text-center sm:grid-rows-none md:grid-flow-col md:gap-10"
  >
    <!-- <div class="ml-3 inline-flex rounded-md shadow bg-white"> -->
    <div
      class="font-extrabold text-gray-100 hover:underline hover:underline-offset-2 sm:inline"
    >
      <router-link to="/" class="sm:inline">Home</router-link>
    </div>
    <div
      class="font-extrabold text-gray-100 hover:underline hover:underline-offset-2 sm:inline"
    >
      <router-link to="/researchGroup" class="">Research Groups</router-link>
    </div>
    <div class="font-extrabold text-gray-100 sm:inline">
      <router-link to="/people" class="hover:underline hover:underline-offset-2"
        >People
      </router-link>
    </div>
    <div class="font-extrabold text-gray-100 sm:inline">
      <router-link to="/news" class="hover:underline hover:underline-offset-2"
        >News
      </router-link>
    </div>
  </div>
</template>
<script></script>
