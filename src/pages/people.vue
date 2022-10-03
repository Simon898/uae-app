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
    <div class="text-gray-600 font-light text-xl p-2">
      Filter:
      <select v-model="people" class="rounded-lg">
    <option value="Allpeople">All people</option>
    <option value="Professors">Professors</option>
    <option value="Students">Students</option>
    <option value="Researchscientists">Research scientists</option>
    <option value="UniversityAffiliate">University Affiliate</option>
    <option value="Postdoctoral">Postdoctoral Fellow</option>
    <option value="Adminstaff">Administrative Staff</option>
    <option value="Formermember">Former Members</option>
    <option value="Alumni">Alumni</option>
  </select>
    </div>
    <div class="m-3 p-3 md:grid md:grid-cols-2 md:gap-4 lg:grid-cols-3 xl:grid-cols-4">
      <!-- <p>{{computed_items}}</p> -->
      <body class="md:min-h-screen" v-for="item in computed_items" :key="item.id">
        <div class="h-3/4 rounded-lg border-0 shadow-md hover:shadow-xl relative h-content w-content mt-5 sm:md-0">
          <img
            :src="imageUrlFor(item.picPerson)"
            class="mx-auto h-72 w-full rounded-lg rounded-b-none"
          />
          <router-link :to="`/${item._id}`">
            <p class="p-5 text-xl text-gray-600">{{ item.name }}</p>
          </router-link>
          <div class="pl-5">{{ item.position }}</div>
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
          <div class="">
         <div class="p-5 text-blue-500 bg-gray-100 absolute inset-x-0 bottom-0 h-16">
          {{item.position}}
         </div>
        </div>
        </div>
      </body>
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
  picPerson
}`;

export default {
  components: {
    SanityBlocks,
  },
  data: () => ({
    drawer: null,
    people: 'Allpeople',
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
          console.log(items1);
          this.items1 = items1;
        },
        (error) => {
          this.error = error;
        }
      );
    },
  },
  computed: {
    computed_items: function () {
      let filterType= this.people
      return this.items1.filter(function(item){
        let filtered = true
        console.log(filterType)
        if(filterType!==item.sort){
          filtered = item.type == filterType
          console.log(filterType)
        }
        if (filterType=='Allpeople') {
          filtered = item
        }
        return filtered
      })
    }
  }
};
</script>

<style></style>
