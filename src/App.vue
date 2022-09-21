<script>

export default {
  components: {
  },
name: "App",

  data: () => ({
  })
};
</script>

<template>
  <div>
    <header class="" v-if="$route.meta.title">
      <div class="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      </div>
    </header>
    <main>
      <router-view />
    </main>
   
  </div>
</template>
