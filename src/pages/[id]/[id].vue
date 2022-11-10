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
    <router-link to="/people">
      <img
        class="ml-5 mt-3 h-5 w-5"
        alt="Return"
        src="../left-arrow-svgrepo-com.svg"
      />
    </router-link>
    <div v-for="item in items1"
      :key="item.id">
    <body
    v-if="item._id == $route.params.id"
      class="md:grid md:grid-cols-2 md:gap-4 bg-gray-50 md:mt-2"
    >
      <div>
        <img
          :src="imageUrlFor(item.picPersonIn)"
          class="m-3 mx-auto rounded-lg"
          v-if="item._id == $route.params.id && item.picPersonIn"
        />
      </div>
      <div>
        <p
          class="pl-5 text-start text-2xl font-light text-gray-700"
          v-if="item._id == $route.params.id"
        >
          {{ item.name }}
        </p>
        <p
          v-if="item._id == $route.params.id"
          class="mt-3 font-light text-gray-500"
        >
          {{ item.group }}
        </p>
        <a href="mailto:{{item.email}}">
          <p
            v-if="item._id == $route.params.id"
            class="mt-3 font-light text-gray-500"
          >
            {{ item.email }}
          </p>
        </a>
        <h2
          v-if="item._id == $route.params.id"
          class="mt-3 mb-3 pl-5 text-2xl text-gray-700"
        >
          Education Profile
        </h2>
        <div class="w-11/12 text-gray-500 font-light pl-5"
        v-if="item._id == $route.params.id">
          <SanityBlocks :blocks="item.education" />
        </div>
      </div>
      </body>
    </div>
      <div v-for="item in items1" :key="item.id">
      <div
        v-if="item._id == $route.params.id"
        class="mt-3 pl-5 font-light text-gray-500"
      >
        <SanityBlocks :blocks="item.objective1" />
        <h2 class="mt-3 mb-3 text-2xl text-gray-700">Research Interests</h2>
        <SanityBlocks :blocks="item.research" />
        <h2 class="mt-3 mb-3 text-2xl text-gray-700">Selected publications</h2>
        <SanityBlocks :blocks="item.selectPublic" />
        <h2 class="mt-3 mb-3 text-2xl text-gray-700">Publications</h2>
        <SanityBlocks :blocks="item.publications" />
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
const query = `*[_type == "people"] {
  _id,
  name,
  objective,
  link,
  objective1,
  picPerson,
  picPersonIn,
  education,
  relLinks,
  publications,
  selectPublic,
  research,
  group,
  email
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
