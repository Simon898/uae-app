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
    <router-link to="/people">
    <img class="w-5 h-5" alt="Return" src="./left-arrow-svgrepo-com.svg" />
   </router-link>
    <body v-for="item in items1" :key="item.id">
      <div class="rounded-lg border-0">
        <p
          class="text-center text-2xl font-light text-gray-700"
          v-if="item._id == $route.params.id"
        >
          {{ item.name }}
        </p>
        <img
          :src="imageUrlFor(item.picPerson)"
          class="m-3 mx-auto rounded-lg"
          v-if="item._id == $route.params.id"
        />

        <div
          v-if="item._id == $route.params.id"
          class="mx-auto w-2/3 font-light text-gray-500"
        >
          <SanityBlocks :blocks="item.objective" />
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
