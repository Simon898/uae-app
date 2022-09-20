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
    <body>
      <div class="grid md:grid-cols-3 md:gap-2">
        <div
          class="relative m-2 min-w-lg shadow hover:shadow-xl"
          v-for="item in items1"
          :key="item.id"
        >
          <a :href="item.link" target="_blank">
            <img
              :src="imageUrlFor(item.picGroup)"
              class="relative mx-auto p-10"
            />
            <h1 class="absolute top-5 left-5 text-2xl text-gray-500">
              {{ item.title }}
            </h1>
            <span
              class="absolute bottom-3 left-1/2 m-5 w-full -translate-x-1/2 text-xl text-gray-800"
            >
              <SanityBlocks :blocks="item.objective" />
            </span>
            <p class="text-md ml-5 text-gray-800">
              Professor {{ item.professor }}
            </p>
          </a>
        </div>
      </div>
    </body>
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
