<template>
  <div
    class="mt-3 grid grid-cols-1 text-center sm:grid-rows-none md:grid-flow-col md:gap-10"
  >
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
    <div class="font-extrabold text-gray-100 sm:inline">
      <router-link to="/awards" class="hover:underline hover:underline-offset-2"
        >Honors and Awards
      </router-link>
    </div>
    <div class="font-extrabold text-gray-100 sm:inline">
     
        <div class="relative group">
      <div class="font-extrabold text-gray-100 sm:inline">
          Academics
      </div>
      <div class="absolute z-10 hidden bg-grey-200 group-hover:block">
          
          <div class="px-2 pt-2 pb-4 bg-gray-100 text-gray-600 shadow-lg">
            <div class="grid grid-cols-1 gap-4">
              <a href="https://mbzuai.ac.ae/study/msc-programs/">
              <p class="font-light hover:font-semibold">
                Master's programs
              </p>
            </a>
            <a href="https://mbzuai.ac.ae/study/phd-programs/">
              <p class="font-light hover:font-semibold">
                Ph.D. programs
              </p>
            </a>
              <a href="https://mbzuai.ac.ae/study/admission-process/">
              <p class="font-light hover:font-semibold">
                Admission process
              </p>
            </a>
            </div>
          </div>
      </div>
  </div> 
    </div>
  </div>
</template>
<script></script>
