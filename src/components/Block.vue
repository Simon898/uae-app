<template>
  <div class="mb-5">
    <ul>
      <div v-for="(item, ind) in adjustedData" :key="ind">
        <p v-if="item.listItem != 'bullet'">
          <span v-for="(child, childInd) in item.children" :key="childInd">
            <a
              class="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
              :href="child.href"
              v-if="child.type == 'link'"
            >
              {{ child.text }}</a
            >
            <span
              v-if="child.type == 'span'"
              :class="{
                italic: child.isItalic,
                'font-bold': child.isStrong,
              }"
            >
              {{ child.text }}</span
            >
          </span>
        </p>
        <div class="pl-4">
          <li class="list-disc" v-if="item.listItem == 'bullet'">
            <span v-for="(child, childInd) in item.children" :key="childInd">
              <a
                class="font-medium text-indigo-600 hover:underline dark:text-indigo-500"
                :href="child.href"
                v-if="child.type == 'link'"
              >
                {{ child.text }}</a
              >
              <span
                v-if="child.type == 'span'"
                :class="{
                  italic: child.isItalic,
                  'font-bold': child.isStrong,
                }"
              >
                {{ child.text }}</span
              >
            </span>
          </li>
        </div>
      </div>
    </ul>
  </div>
</template>
<script>
export default {
  props: {
    data: Object,
  },
  data: () => ({
    adjustedData: [],
  }),
  created() {
    this.adjustData();
  },
  methods: {
    adjustData() {
      this.data.forEach((element) => {
        const childObj = [];
        const markDef = element.markDefs;
        element.children.forEach((children) => {
          const child = {};
          child.text = children.text;
          child.type = children._type;
          if (children.marks.length > 0) {
            children.marks.forEach((mark) => {
              markDef.forEach((markDef) => {
                if (mark == markDef._key) {
                  child.type = markDef._type;
                  child.href = markDef?.href;
                }
              });
              if (mark == "strong") {
                child.isStrong = true;
              } else {
                child.isStrong = false;
              }
              if (mark == "em") {
                child.isItalic = true;
              } else {
                child.isItalic = false;
              }
            });
          }
          childObj.push(child);
        });
        const obj = {
          children: childObj,
          level: element.level,
          listItem: element.listItem,
          style: element.style,
          type: element._type,
        };
        this.adjustedData.push(obj);
      });
    },
  },
};
</script>
