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
      <div class="flex content-center justify-center">
        <h1 class="mt-10 text-3xl font-medium text-gray-600">
          Honors and Awards page
        </h1>
      </div>
      <div class="mt-5 mb-5 flex w-full content-center justify-center">
        <img src="./Awards_pic.jpeg" alt="" />
      </div>
      <div class="text-center">
        <div>
          <router-link to="/bestpaper">
            <p class="mb-6 text-2xl font-light text-gray-600">
              <span class="border-gray-600 hover:border-b-2">
                Best Paper Awards</span
              >
            </p>
          </router-link>
        </div>
        <div>
          <router-link to="/facultyawards">
            <p class="mb-6 text-2xl font-light text-gray-600">
              <span class="border-gray-600 hover:border-b-2">
                Faculty Awards</span
              >
            </p>
          </router-link>
        </div>
        <div>
          <router-link to="/facultyhonors">
            <p class="mb-6 text-2xl font-light text-gray-600">
              <span class="border-gray-600 hover:border-b-2">
                Faculty Honors</span
              >
            </p>
          </router-link>
        </div>
        <div>
          <router-link to="/studenthonor">
            <p class="mb-6 text-2xl font-light text-gray-600">
              <span class="border-gray-600 hover:border-b-2">
                Student Awards</span
              >
            </p>
          </router-link>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "awards"] {
    title,
    link,
    description,
    category,
  }`;

export default {
  components: {},
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
