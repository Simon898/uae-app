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
      <div class="p-2 text-xl font-light text-gray-600">
        Filter:
        <select v-model="people" class="rounded-lg" @change="countPeople()">
          <option value="Allpeople">All people</option>
          <option value="Faculty">Faculty</option>
          <option value="Students">Students</option>
          <option value="ResearchScientists">Research scientists</option>
          <option value="UniversityAffiliate">University Affiliate</option>
          <option value="Adminstaff">Administrative Staff</option>
          <option value="Alumni">Alumni</option>
        </select>
      </div>
      <div class="p-3 md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3">
        <!-- <p>{{computed_items}}</p> -->
        <body
          class=""
          v-for="item in computed_items.slice(startNum, endNum)"
          :key="item.id"
        >
          <div
            class="w-content sm:md-0 mt-5 max-w-lg rounded-lg border-0 shadow-md hover:shadow-xl"
          >
            <img
              :src="imageUrlFor(item.picPersonIn)"
              class="mx-auto rounded-lg rounded-b-none md:h-72 md:w-full"
            />
            <router-link :to="`${item._id}/${item._id}`">
              <p class="p-5 text-xl text-indigo-600">{{ item.name }}</p>
            </router-link>
            <div class="h-20 pl-5">{{ item.position }}</div>
            <div class="h-auto pl-5 pr-5 text-xs font-light md:h-40">
              <Block :data="item.research" />
            </div>
            <div class="pl-5 text-blue-400">
              {{ item.group }}
            </div>
            <a :href="item.links.linkName">
              <div class="mt-5 inline pl-3">
                <div
                  class="m-2 inline w-1/4 rounded-lg border-2 border-l-8 border-l-green-600"
                >
                  {{ item.links.linkShort }}
                </div>
              </div>
            </a>
            <div v-if="item.hashlinks" class="inline">
              <a :href="item.hashlinks.linkName">
                <div class="mt-5 inline pl-3">
                  <div
                    class="m-2 inline w-1/4 rounded-lg border-2 border-l-8 border-l-indigo-600"
                  >
                    {{ item.hashlinks.linkShort }}
                  </div>
                </div>
              </a>
            </div>
            <!-- <div class=""> -->
            <div class="mt-3 h-10 bg-gray-100 p-3 text-blue-500">
              {{ item.sort }}
            </div>
            <!-- </div> -->
          </div>
        </body>
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
          v-if="items1.length > endNum && computed_items.length > endNum - 1"
          class="m-2 rounded-lg border-2 border-gray-200 p-2 text-gray-500 shadow-md hover:border-gray-100 hover:text-gray-600"
          @click="nextPage"
        >
          Next
        </button>
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
const query = `*[_type == "people"] {
  _id,
  name,
  position,
  objective,
  group,
  sort,
  links,
  research,
  objective1,
  picPersonIn,
  rank,
  hashlinks
}`;

export default {
  components: {
    Block,
  },
  data: () => ({
    drawer: null,
    people: "Allpeople",
    choosen: -1,
    model: 0,
    model1: undefined,
    items1: [],
    isOpen: false,
    startNum: 0,
    endNum: 9,
    perpage: 9,
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
          if (Number.isInteger(this.items1.length / 9)) {
            this.allPages = this.items1.length / 9;
          } else {
            this.allPages = (this.items1.length / 9 + 1).toFixed(0);
          }
          items1.sort((a, b) => a.rank - b.rank);
        },
        (error) => {
          this.error = error;
        }
      );
    },
    countPeople() {
      if (Number.isInteger(this.computed_items.length / 8)) {
        this.allPages = this.computed_items.length / 8;
      } else {
        this.allPages = (this.computed_items.length / 8 + 1).toFixed(0);
      }
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
