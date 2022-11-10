<template>
  <div>
    <div
      style="
        background-image: url('https://mbzuai.ac.ae/wp-content/uploads/2022/07/hero_department-of-machine-learning.jpg');
      "
      class="bg-cover sticky top-0"
    >
      <div
        class="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-4 lg:px-8"
      >
        <img src="../image-31.svg" class="" />
        <div>
          <ButtonRepo />
        </div>
      </div>
    </div>
    <router-link to="/news">
      <img
        class="ml-5 md:ml-15 mt-3 h-5 w-5 md:h-10 md:w-10"
        alt="Return"
        src="../left-arrow-svgrepo-com.svg"
      />
    </router-link>
    <div v-for="item in items1" :key="item.id" class="mt-5 mb-5">
      <div 
      v-if="item._id == $route.params.id"
      class="flex content-center justify-center">
        <div class="grid grid-cols-1">
          <div>
            <h1
              v-if="item._id == $route.params.id"
              class="text-center text-2xl font-semibold text-gray-600"
            >
              {{ item.title }}
            </h1>
          </div>
          <div>
            <h2
              v-if="item._id == $route.params.id"
              class="mt-5 mx-auto text-xl font-normal w-2/3 xl:w-2/4 text-gray-500 md:mt-10"
            >
              {{ item.shorttext }}
            </h2>
          </div>
          <div>
            <img
              :src="imageUrlFor(item.picGroup)"
              class="mx-auto mt-5 w-2/3 xl:w-2/4 rounded-lg md:mt-10"
              v-if="item._id == $route.params.id && item.picGroup"
            />
          </div>
          <div 
          class="text-gray-500 w-2/3 xl:w-2/4 mx-auto mt-5 md:mt-10"
          v-if="item._id == $route.params.id">
            <SanityBlocks :blocks="item.objective" />
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import sanity from "../../../client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityBlocks } from "sanity-blocks-vue-component";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "news"] {
  _id,
  title,
  shorttext,
  picGroup,
  objective
}`;

export default {
  components: {
    SanityBlocks,
  },
  data: () => ({
    drawer: null,
    people: "Allpeople",
    choosen: -1,
    model: 0,
    model1: undefined,
    items1: [],
    isOpen: false,
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
          items1.sort((a, b) => a.rank - b.rank);
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
  computed: {
    computed_items: function () {
      let filterType = this.people;
      return this.items1.filter(function (item) {
        let filtered = true;
        if (filterType !== item.sort) {
          filtered = item.type == filterType;
        }
        if (filterType == "Allpeople") {
          filtered = item;
        }
        return filtered;
      });
    },
  },
};
</script>

<style></style>
