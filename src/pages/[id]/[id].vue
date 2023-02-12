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
    <div class="mx-auto max-w-screen-xl" v-for="item in items1" :key="item.id">
      <body
        v-if="item._id == $route.params.id"
        class="mx-auto max-w-screen-xl bg-gray-50 md:mt-2 md:grid md:grid-cols-2 md:gap-4"
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
            class="pl-5 text-start text-3xl font-light text-indigo-600"
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
          <div
            class="w-11/12 pl-5 font-light text-gray-500"
            v-if="item._id == $route.params.id"
          >
            <Block :data="educationItem" />

            <a :href="item.link">
              <img
                v-if="item.link"
                class="mr-4 mt-5 mb-10 inline h-7 w-7"
                src="../connect.png"
                target="_blank"
                alt=""
              />
            </a>
            <a :href="item.google" target="_blank">
              <img
                v-if="item.google"
                class="mt-5 mb-10 inline h-7 w-7"
                src="../google-scholar.png"
                alt=""
              />
            </a>
          </div>
          <div v-if="item.links" class="inline">
            <a :href="item.links.linkName">
              <div class="mt-3 inline pl-3">
                <div
                  class="mt-10 inline w-1/4 rounded-lg border-2 border-l-8 border-l-green-600"
                >
                  {{ item.links.linkShort }}
                </div>
              </div>
            </a>
          </div>
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
        </div>
      </body>
    </div>
    <div class="mx-auto max-w-screen-xl" v-for="item in items1" :key="item.id">
      <div
        v-if="item._id == $route.params.id"
        class="mt-3 pl-5 font-light text-gray-500"
      >
        <h2 class="mt-3 mb-3 text-2xl text-indigo-600">Bio</h2>
        <div class="mb-10">
          <Block :data="objectiveItem" />
        </div>
        <h2 class="mt-3 mb-3 text-2xl text-indigo-600">Research Interests</h2>
        <Block :data="researchItem" />
        <h2 class="mt-3 mb-3 text-2xl text-indigo-600">
          Selected publications
        </h2>
        <Block :data="selectPublicItem" />
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import sanity from "../../../client";
import imageUrlBuilder from "@sanity/image-url";
import Links from "../../components/Links.vue";
import Block from "../../components/Block.vue";

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
  email,
  google,
  links,
  hashlinks,
  publications1
}`;

export default {
  components: { Links, Block },
  setup() {
    const serializers = {
      types: {
        custom: Links,
      },
    };
    return serializers;
  },

  props: [],
  data: () => ({
    drawer: null,
    selectedItem: undefined,
    choosen: -1,
    model: 0,
    model1: undefined,
    items1: [],
    isOpen: false,
    selectPublicItem: [],
    educationItem: [],
    objectiveItem: [],
    researchItem: [],
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
          this.items1.filter((item) => {
            if (item._id == this.$route.params.id) {
              this.selectPublicItem = item.selectPublic;
              this.educationItem = item.education;
              this.objectiveItem = item.objective;
              this.researchItem = item.research;
            }
          });
        },

        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>
