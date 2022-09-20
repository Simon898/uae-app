<route lang="json">
{
  "meta": {
    "title": "Home"
  }
}
</route>

<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityBlocks } from "sanity-blocks-vue-component";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "home"] {
  title,
  objective,
  picName
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
          console.log(items1)
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
    <body v-for="item in items1" :key="item.id">
      <h1 class="text-center text-3xl m-10 font-light leading-6 text-gray-600">{{item.title}}</h1>

      <span class="text-center text-2xl m-10 font-light leading-6 text-gray-600"><SanityBlocks :blocks="item.objective" /></span>

      <img :src="imageUrlFor(item.picName)" class="bg-blue-800 p-10 mx-auto" />
    </body>
  </div>
</template>
