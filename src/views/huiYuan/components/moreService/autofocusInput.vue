<template>
  <div class="deal_pw">
    <input type="tel"
           slot="left"
           v-model="first"
           maxlength='1'
           placeholder="-"
           v-on:input="del($event)">
    <input type="tel"
           slot="left"
           v-model="second"
           maxlength='1'
           v-focus="first"
           placeholder="-"
           v-on:input="del($event)">
    <input type="tel"
           slot="left"
           v-model="third"
           maxlength='1'
           v-focus="second"
           placeholder="-"
           v-on:input="del($event)">
    <input type="tel"
           slot="left"
           v-model="forth"
           maxlength='1'
           v-focus="third"
           placeholder="-"
           v-on:input="del($event)">
  </div>
</template>
<script>
export default {
  directives: {
    focus: {
      update(el, val) {
        if (val.value != "-" && val.value != "" && val.oldValue == "") {
          el.focus();
        }
      }
    }
  },
  data() {
    return {
      first: "",
      second: "",
      third: "",
      forth: ""
    };
  },
  activated() {
    this.first = "";
    this.second = "";
    this.third = "";
    this.forth = "";
  },
  methods: {
    del(e) {
      if ((e.target.value == "") & (e.target.previousElementSibling != null)) {
        e.target.previousElementSibling.focus();
      }
    },
    theFirst() {
      if (this.first == "") this.first = "-";
    },
    theSecond() {
      if (this.second == "") this.second = "-";
    },
    theThird() {
      if (this.third == "") this.third = "-";
    },
    theForth() {
      if (this.forth == "") this.forth = "-";
    }
  }
};
</script>
<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.deal_pw {
  input {
    text-security: disc;
    -webkit-text-security: disc;
    -mox-text-security: disc;
    // text-security: disc;
    width: poTorem(48px);
    height: poTorem(32px);
    font-size: poTorem(18px);
    border: 1px solid #acacb4;
    border-radius: poTorem(3px);
    margin: poTorem(5px);
    text-align: center;
    background-color: #f3f3f3;
  }
}
</style>


