<script>
import sanity from "../../client";
import imageUrlBuilder from "@sanity/image-url";
import { SanityBlocks } from "sanity-blocks-vue-component";
import Footer1 from "../components/Footer.vue";

const imageBuilder = imageUrlBuilder(sanity);
const query = `*[_type == "home"] {
  title,
  objective,
  picName
}`;

export default {
  components: {
    SanityBlocks,
    Footer1,
  },
  data: () => ({
    drawer: null,
    selectedItem: undefined,
    choosen: -1,
    model: 0,
    model1: undefined,
    items1: [],
    changeNav: false,
    showNavbar: true,
    lastScrollPosition: 0,
  }),
  mounted() {
    window.addEventListener("scroll", this.onScroll);
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.onScroll);
  },
  created() {
    this.fetchData();
  },
  methods: {
    onScroll() {
      // Get the current scroll position
      const currentScrollPosition =
        window.pageYOffset || document.documentElement.scrollTop;
      // Because of momentum scrolling on mobiles, we shouldn't continue if it is less than zero
      if (currentScrollPosition < 0) {
        return;
      }
      // Here we determine whether we need to show or hide the navbar
      else if (currentScrollPosition == 0) {
        this.changeNav = false;
      }
      else {
      this.showNavbar = currentScrollPosition < this.lastScrollPosition;
      this.changeNav = true;
      // Set the current scroll position as the last scroll position
      this.lastScrollPosition = currentScrollPosition;
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
    scrollCounter1() {
      if (document.documentElement.myScroll > 50) {
        this.changeNav = true;
        console.log(this.changeNav);
      } else {
        this.changeNav = false;
        console.log(this.changeNav);
      }
    },
    scrollCounter() {
      console.log(this.changeNav);
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

<template>
  <div>
   
    <div
      v-if="!changeNav"
      style="
        background-image: url('https://mbzuai.ac.ae/wp-content/uploads/2022/07/hero_department-of-machine-learning.jpg');
      "
    >
      <div
        class="mx-auto max-w-screen-xl px-4 py-4 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-4 lg:px-8"
      >
      <router-link to="/"> <img src="./image-31.svg" class="" /></router-link>
        <div>
          <ButtonRepo />
        </div>
      </div>
      <br />
      <br />
      <br />
      <div
        class="ßp-40 mx-auto max-w-screen-xl px-4 py-4 text-4xl font-bold text-gray-200 sm:px-6 lg:flex lg:items-center lg:justify-between lg:py-4 lg:px-8"
        id="myScroll"
      >
        Machine learning department
      </div>
    </div>
    
      <div
      v-else
      style="
        background-image: url('https://mbzuai.ac.ae/wp-content/uploads/2022/07/hero_department-of-machine-learning.jpg');
      "
      class="bg-cover sticky top-0"
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
    <body 
    class="max-w-screen-xl mx-auto"
    v-for="item in items1" :key="item.id">
      <p
        class="mx-auto mt-10 w-9/12 text-justify text-2xl font-light text-gray-600"
      >
        <span class="font-bold">
          Machine learning researchers working at MBZUAI investigate the
          development of algorithms which can improve automated cognition,
          perception, and action with experience by observations.</span
        >
        <br /><br />
        Our reseachers focus on both fundamental and applied research in machine
        learning. This can be used for many enterprise applications (such as
        business intelligence and analytics), effective web search, robotics,
        smart cities, and understanding of the human genome.<br /><br />
        Our students, supervised by our world-class faculty, get unique hands-on
        experience by developing and evaluating algorithms on complex real
        datasets. The university offers Ph.D. and master's degrees in machine
        learning with exceptionally advanced courses and outcomes.
      </p>
      <!-- <span class="m-10 w-7/12 text-center text-2xl font-light text-gray-600"
        ><SanityBlocks :blocks="item.objective"
      /></span> -->
      <div class="bg-gray-100">
        <div class="mx-auto mt-5 w-9/12 gap-8 text-lg md:grid md:grid-cols-2">
          <div>
            <p class="m-5 font-extralight text-gray-600">
              <span class="mt-5 text-2xl font-bold"> Chair's message </span>
              <br />
              The Machine Learning (ML) Department at MBZUAI is dedicated to
              imparting a world-class education in ML to our students. From
              foundational principles to advanced applications, our
              research-intensive education model will provide our students
              theoretical concepts to test under supervision from senior AI
              researchers in the field as they tackle real-world problems and
              produce meaningful results. It is the task of the ML Department to
              engage in ML research by exposing our expert faculty, research
              staff, and students to problems faced by industry partners, and
              sponsored research. We leverage these relationships to ensure all
              researchers have access to the latest technology, emerging
              problems, and solutions. One of our main goals is creating
              disruptive solutions and technologies, powered by AI, that unlock
              the secrets of science across all areas.
            </p>
          </div>
          <div class="p-10">
            <img class="rounded-lg" src="./Le-Song_inn.jpeg" alt="" />
            <p class="font-bold text-gray-500">
              <br />
              Le Song <br />
              <span class="font-light">
                Department Chair of Machine Learning, and Professor of Machine
                Learning
              </span>
            </p>
            <br />
            <p class="font-light text-gray-500">
              It is my commitment to establish the ML Department as a major hub
              for ML expertise and solutions, not only in the region, but
              globally. We do this by embracing emerging concepts and applying
              sustainable ML algorithms to problems that we all face, in order
              to maximize our efforts and produce AI for good.
            </p>
          </div>
        </div>
      </div>
    </body>
    <Footer></Footer>
  </div>
</template>
