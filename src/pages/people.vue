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
        <img src="./image-31.svg" class="" />
        <div>
          <ButtonRepo />
        </div>
      </div>
    </div>
    <div class="p-2 text-xl font-light text-gray-600">
      Filter:
      <select v-model="people" class="rounded-lg">
        <option value="Allpeople">All people</option>
        <option value="Professors">Professors</option>
        <option value="Students">Students</option>
        <option value="ResearchScientists">Research scientists</option>
        <option value="UniversityAffiliate">University Affiliate</option>
        <option value="Postdoctoral">Postdoctoral Fellow</option>
        <option value="Adminstaff">Administrative Staff</option>
        <option value="FormerMemeber">Former Members</option>
        <option value="Alumni">Alumni</option>
      </select>
    </div>
    <div
      class="p-3 md:grid md:grid-cols-2 md:gap-2 lg:grid-cols-3 xl:grid-cols-4"
    >
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
            <p class="p-5 text-xl text-gray-600">{{ item.name }}</p>
          </router-link>
          <div class="h-20 pl-5">{{ item.position }}</div>
          <div class="pl-5 text-blue-400">
            {{ item.group }}
          </div>
          <a :href="item.links.linkName">
            <div class="mt-5 pl-3">
              <div
                class="m-2 inline w-1/4 rounded-lg border-2 border-l-8 border-l-green-600"
              >
                {{ item.links.linkShort }}
              </div>
            </div>
          </a>
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
      <p class="my-auto ml-5 mr-5 text-xl text-gray-500">{{ curPage }}</p>
      <button
        v-if="items1.length > endNum"
        class="m-2 rounded-lg border-2 border-gray-200 p-2 text-gray-500 shadow-md hover:border-gray-100 hover:text-gray-600"
        @click="nextPage"
      >
        Next
      </button>
    </div>
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
  position,
  objective,
  group,
  sort,
  links,
  objective1,
  picPersonIn,
  rank
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
    startNum: 0,
    endNum: 8,
    perpage: 8,
    curPage: 1,
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
    functionName() {
      console.log("pagination");
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
