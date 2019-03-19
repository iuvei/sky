<template>
  <form :action="data.url"
        :method="data.method">
    <input type="text"
           v-for="(val,key) in data.data"
           :key="key"
           :name="key"
           :value="val">
  </form>
</template>
<script>
export default {
  props: ["data"],
  data() {
    return { url: "" };
  },
  watch: {
    data() {
      // console.log(this.data);
      // console.log(this.$el);
      // console.log(this.data.url.replace(/[\\]/g, ""));
      if (this.data.qrcode == 1) {
        // this.url = ;
        // console.log(this.url);
        this.$nextTick(() => {
          this.$el.submit();
        });
      } else {
        // saoma   url就是二维码信息
        this.$emit("backstep");
      }
    }
  },
  methods: {
    backstep() {
      this.$router.push("/moreService/Nrecharge");
    }
  }
};
</script>
<style lang="scss" scoped>
</style>

