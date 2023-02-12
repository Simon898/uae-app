<template>
  <div>
    {{ blocks }}
  </div>
</template>
<script>
export default {
  props: {
    blocks: Object,
  },
  created() {
    this.getProps();
  },
  methods: {
    getProps() {
      console.log(this.props);
    },
  },
};
</script>
