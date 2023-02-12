<template>
  <div>
    <!-- <div class="bg-gray-500"> -->
    <div
      style="
        background-image: url('https://mbzuai.ac.ae/wp-content/uploads/2022/07/hero_department-of-machine-learning.jpg');
      "
      class="sticky top-0 bg-cover"
    >
      <div
        class="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-4 lg:px-8"
      >
        <router-link to="/"> <img src="./image-31.svg" class="" /></router-link>
        <div>
          <ButtonRepo />
        </div>
      </div>
    </div>
    <div class="mx-auto max-w-screen-xl">
      <div class="border-b-2">
        <h2 class="pt-10 pb-4 pl-10 text-3xl text-gray-600">Research Groups</h2>
      </div>
      <body class="min-h-screen">
        <div class="grid md:grid-cols-3 md:gap-2">
          <div
            class="min-w-xl m-2 rounded shadow-lg hover:shadow-xl"
            v-for="item in items1"
            :key="item.id"
          >
            <h1 class="p-5 text-2xl text-gray-500">
              {{ item.title }}
            </h1>
            <a :href="item.link" target="_blank">
              <img
                :src="imageUrlFor(item.picGroup)"
                class="mx-auto h-80 p-10"
              />

              <div
                class="h-16 bg-gray-300 pl-7 text-xl font-light text-gray-800 opacity-60"
              >
                <Block :data="item.objective" />
              </div>
              <p class="text-md h-5 bg-gray-300 pl-7 text-gray-700 opacity-60">
                Professor {{ item.professor }}
              </p>
            </a>
          </div>
        </div>
      </body>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import Block from "../components/Block.vue";

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
    Block,
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
