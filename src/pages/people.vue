<template>
  <div>
    <div class="bg-gray-50">
      <div
        class="mx-auto max-w-screen-xl px-4 py-12 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-16 lg:px-8"
      >
        <h2
          class="text-3xl font-extrabold leading-9 tracking-tight text-gray-600 sm:text-4xl sm:leading-10"
        >
          Mohammed Bin Zayed
          <br />

          <span class="text-gray-400"
            >University of <br />
            Artificial Inteligance</span
          >
        </h2>
        <div>
          <ButtonRepo />
        </div>
      </div>
    </div>
    <div class="m-3 p-3 md:grid md:grid-cols-3 md:gap-4">
      <body v-for="item in items1" :key="item.id">
        <div class="rounded-lg border-0 shadow-md hover:shadow-xl">
          <img
            :src="imageUrlFor(item.picPerson)"
            class="m-3 mx-auto rounded-lg h-64"
          />
          
            <p class="m-3 font-light text-gray-700">{{ item.name }}</p>
          
          <div class="m-3 font-light text-gray-500 h-36">
            <SanityBlocks :blocks="item.objective1" />
          </div>
          <router-link :to="`/${item._id}`">
          <div class="flex content-center justify-center p-3">
            <button
              class="rounded bg-gray-400 p-2 text-white shadow"
              type="button"
            >
              More Info
            </button>
          
          </div>
        </router-link>
        </div>
      </body>
    </div>
  </div>
</template>

<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityBlocks } from "sanity-blocks-vue-component";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "people"] {
  _id,
  name,
  objective,
  link,
  objective1,
  picPerson
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
          // items1.sort((a, b) => a.frontenddist - b.frontenddist);
          console.log(items1);
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
