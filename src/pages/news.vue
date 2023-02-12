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
    <div class="mt-5 flex content-center justify-center md:mt-10">
      <section class="mx-auto max-w-screen-xl">
        <div v-for="item in items1.slice(0, 1)" :key="item.id">
          <div class="grid md:grid-cols-2">
            <div>
              <router-link :to="`${item._id}/new`">
                <h1
                  class="m-3 p-2 text-2xl font-bold text-gray-500 hover:underline hover:underline-offset-2"
                >
                  {{ item.title }}
                </h1>
              </router-link>
              <h3 class="m-3 p-2 text-xl font-light text-gray-600">
                {{ item.shorttext }}
              </h3>
              <router-link :to="`${item._id}/new`">
                <button
                  class="m-3 border-2 border-blue-300 p-2 text-blue-300 hover:border-blue-400 hover:text-blue-400"
                >
                  Read more ...
                </button>
              </router-link>
            </div>
            <div>
              <img
                :src="imageUrlFor(item.picGroup)"
                class="md:h-8/12 m-3 mx-auto rounded-xl shadow-md md:w-10/12"
              />
            </div>
          </div>
        </div>

        <div class="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
          <!-- <div v-for="item in items1.slice(1).slice(startNum,endNum)" :key="item.id"> -->
          <div
            v-for="item in items1.slice(1).slice(startNum, endNum)"
            :key="item.id"
          >
            <div class="rounded-xl border-2 border-gray-200 md:mt-5">
              <img
                :src="imageUrlFor(item.picGroup)"
                class="rounded-xl rounded-b-none"
              />
              <router-link :to="`${item._id}/new`">
                <h1
                  class="m-3 p-2 font-semibold text-gray-600 hover:underline hover:underline-offset-2"
                >
                  {{ item.title }}
                </h1>
              </router-link>
              <h2 class="m-3 p-2 font-light text-gray-600">
                {{ item.shorttext }}
              </h2>
              <router-link :to="`${item._id}/new`">
                <button
                  class="m-3 rounded-lg border-2 border-blue-300 p-2 text-blue-300 hover:border-blue-400 hover:text-blue-400"
                >
                  Read more ...
                </button>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
    <div class="mb-5 mt-5 flex content-center justify-center">
      <button
        v-if="curPage != 1"
        class="m-2 rounded-lg border-2 border-gray-200 p-2 text-gray-500 shadow-md hover:border-gray-100 hover:text-gray-600"
        @click="backPage"
      >
        Previous
      </button>
      <p class="my-auto ml-5 mr-5 text-xl text-gray-500">
        {{ curPage }} of {{ allPages }}
      </p>
      <button
        v-if="items1.length > endNum && curPage != allPages"
        class="m-2 rounded-lg border-2 border-gray-200 p-2 text-gray-500 shadow-md hover:border-gray-100 hover:text-gray-600"
        @click="nextPage"
      >
        Next
      </button>
    </div>
    <div class="mt-5 md:mt-6">
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "news"] {
  _id,
  title,
  shorttext,
  picGroup,
  objective
}`;

export default {
  components: {},
  data: () => ({
    drawer: null,
    people: "Allpeople",
    choosen: -1,
    model: 0,
    model1: undefined,
    items1: [],
    isOpen: false,
    startNum: 0,
    endNum: 3,
    perpage: 3,
    curPage: 1,
    allPages: 0,
  }),
  created() {
    this.fetchData();
  },
  methods: {
    backPage() {
      if (this.startNum > 1) {
        this.startNum = this.startNum - this.perpage;
        this.endNum = this.endNum - this.perpage;
        this.curPage--;
      }
    },
    nextPage() {
      if ((this.currentpage = 1 && this.items1.length > this.endNum)) {
        this.startNum = this.startNum + this.perpage;
        this.endNum = this.endNum + this.perpage;
        this.curPage++;
      }
    },
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
          if (Number.isInteger(this.items1.length - 1) / 3) {
            this.allPages = (this.items1.length - 1) / 3;
          } else {
            this.allPages = ((this.items1.length - 1) / 3 + 1).toFixed(0);
          }
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
