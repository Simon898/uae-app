<template>
  <div>
    <!-- <div class="bg-gray-500"> -->
      <div style="background-image: url('https://mbzuai.ac.ae/wp-content/uploads/2022/07/hero_department-of-machine-learning.jpg');"
      class="bg-cover sticky top-0">
      <div
        class="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-4 lg:px-8"
      >
      <router-link to="/"> <img src="./image-31.svg" class="" /></router-link>
        <div>
          <ButtonRepo />
        </div>
      </div>
    </div>
    <div class="border-b-2">
      <h2 class="pt-10 pb-4 pl-10 text-3xl text-gray-600">Research Groups</h2>
    </div>
    <body class="min-h-screen">
      <div class="grid md:grid-cols-3 md:gap-2">
        <div
          class="relative m-2 min-w-lg shadow-lg hover:shadow-xl rounded"
          v-for="item in items1"
          :key="item.id"
        >
          <a :href="item.link" target="_blank">
            <img
              :src="imageUrlFor(item.picGroup)"
              class="relative mx-auto p-10 h-80"
            />
            <h1 class="absolute top-5 left-5 text-2xl text-gray-500">
              {{ item.title }}
            </h1>
            <!-- <span
              class="absolute bottom-3 left-1/2 mb-3 pl-10 w-full -translate-x-1/2 text-xl font-light h-9 text-gray-800 bg-gray-300 opacity-60"
            > -->
            <div
              class="pl-7 text-xl font-light h-9 text-gray-800 bg-gray-300 opacity-60"
            >
              <SanityBlocks :blocks="item.objective" />
            </div>
            <p class="text-md pl-7 h-5 text-gray-700 bg-gray-300 opacity-60">
              Professor {{ item.professor }}
            </p>
          </a>
        </div>
      </div>
    </body>
    <Footer></Footer>
  </div>
</template>

<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityBlocks } from "sanity-blocks-vue-component";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "group"] {
  title,
  objective,
  professor,
  link,
  picGroup
}`;

export default {
  components: {
    SanityBlocks,
  },
  data: () => ({
    drawer: null,
    selectedItem: undefined,
    choosen: -1,
    model: 0,
    model1: undefined,
    items1: [],
  }),
  created() {
    this.fetchData();
  },
  methods: {
    orderList(item) {
      const prem = this.items1;
      for (let i = 0; i < prem.length; i++) {
        const element = i;
        if (element == item) {
          return prem[i].frontenddist;
        }
      }
    },
    imageUrlFor(source) {
      return imageBuilder.image(source);
    },
    fetchData() {
      this.error = this.post = null;
      this.loading = true;
      sanity.fetch(query).then(
        (items1) => {
          this.loading = false;
          this.items1 = items1;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>

<style></style>
