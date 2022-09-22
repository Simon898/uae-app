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
    <router-link to="/people">
      <img
        class="ml-5 mt-3 h-5 w-5"
        alt="Return"
        src="./left-arrow-svgrepo-com.svg"
      />
    </router-link>
    <body v-for="item in items1" :key="item.id" class="md:grid md:grid-cols-2">
      <div>
        <img
          :src="imageUrlFor(item.picPerson)"
          class="m-3 mx-auto rounded-lg"
          v-if="item._id == $route.params.id"
        />
      </div>
      <div>
        <p
          class="text-center text-2xl font-light text-gray-700"
          v-if="item._id == $route.params.id"
        >
          {{ item.name }}
        </p>
      </div>

      <div
        v-if="item._id == $route.params.id"
        class="mx-auto p-4 font-light text-gray-500"
      >
        <SanityBlocks :blocks="item.objective" />
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
const query = `*[_type == "people"] {
  _id,
  name,
  objective,
  link,
  objective1,
  picPerson,
  education,
  relLinks,
  publications,
  selectPublic,
  research
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
          // console.log(items1);
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
