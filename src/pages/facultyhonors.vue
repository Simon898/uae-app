<template>
  <div>
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
      <router-link to="/awards">
        <img
          class="ml-5 mt-3 h-5 w-5"
          alt="Return"
          src="./left-arrow-svgrepo-com.svg"
        />
      </router-link>
      <div class="flex content-center justify-center">
        <h1 class="mt-10 text-3xl font-medium text-gray-600">Faculty Honors</h1>
      </div>
      <div
        v-for="item in items1"
        :key="item.id"
        class="mx-auto mt-5 mb-5 grid w-10/12 grid-cols-1"
      >
        <a v-if="item.category == 'FH'" :href="item.link">
          <div v-if="item.category == 'FH'" class="text-xl font-light">
            <span class="mb-5 border-gray-600 hover:border-b-2">
              {{ item.title }}
            </span>
          </div>
        </a>
        <div v-if="item.category == 'FH'" class="mt-3">
          <Block :data="item.description" />
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import Block from "../components/Block.vue";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "awards"] {
    title,
    link,
    description,
    category,
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
