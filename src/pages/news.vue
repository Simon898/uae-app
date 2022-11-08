<template>
  <div>
    <div
      style="
        background-image: url('https://mbzuai.ac.ae/wp-content/uploads/2022/07/hero_department-of-machine-learning.jpg');
      "
      class="bg-cover"
    >
      <div
        class="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-4 lg:px-8"
      >
        <img src="./image-31.svg" class="" />
        <div>
          <ButtonRepo />
        </div>
      </div>
    </div>
    <h1 class="mt-5 text-center text-4xl font-thin text-gray-500">
      University News
    </h1>
    <div class="flex content-center justify-center">
      <section class="w-10/12">
        <div v-for="item in items1.slice(0, 1)" :key="item.id">
          <div class="grid md:grid-cols-2">
            <div>
              <h1 class="m-3 p-2 text-2xl font-bold text-gray-500">
                {{ item.title }}
              </h1>
              <h3 class="m-3 p-2 text-xl font-light text-gray-600">
                {{ item.shorttext }}
              </h3>
              <button
                class="m-3 border-2 border-blue-300 p-2 text-blue-300 hover:border-blue-400 hover:text-blue-400"
              >
                Read more ...
              </button>
            </div>
            <div>
              <img
                :src="imageUrlFor(item.picGroup)"
                class="md:h-8/12 m-3 mx-auto rounded-xl p-2 md:w-10/12"
              />
            </div>
          </div>
        </div>
        <div class="grid grid-cols-2 md:grid-cols-3">
        <div v-for="item in items1.slice(1)" :key="item.id">
          
            <div>
              <img
                :src="imageUrlFor(item.picGroup)"
                class="m-3 mx-auto rounded-xl p-2"
              />
              <h1 class="m-3 p-2 font-semibold text-gray-600">{{item.title}}</h1>
              <h2 class="m-3 p-2 font-light text-gray-600">{{item.shorttext}}</h2>
              <button
                class="border-2 border-blue-300 p-2 m-3 text-blue-300 hover:border-blue-400 hover:text-blue-400"
              >
                Read more ...
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import sanity from "../../client";
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
