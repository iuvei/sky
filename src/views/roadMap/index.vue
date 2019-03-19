<template>
  <div class="paper">
    <heads></heads>
    <papertemplate></papertemplate>
  </div>
</template>
<script>
import heads from "./heads";
import papertemplate from "./components/papertemplate";
export default {
  data() {
    return {
      data: []
    };
  },
  mounted() {},
  watch: {},
  created() {},
  components: {
    heads,
    papertemplate
  },
  methods: {}
};
</script>
