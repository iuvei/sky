<template>
  <div class="actions">
    <span v-for="(action, i) in actions"
          :key="i"
          @click="doAction(action)"
          :class="{'active': action.checked && action.label !='清'}">{{action.label}}</span>
  </div>
</template>

<script>
export default {
  name: "bet_acions",

  props: {
    row: {
      type: Object,
      default: {}
    }
  },

  data() {
    return {
      actions: this.row.actions
    };
  },

  methods: {
    doAction(action) {
      // action.checked = !action.checked;
      this.actions.forEach(x => {
        x.checked = false;
      });
      action.checked = !action.checked;
      this.$emit("doAction", action, this.row);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.actions {
  flex: 1;
  background: rgb(220, 220, 220);
  border-radius: poTorem(20px);
  @include center;
  padding: poTorem(3px) 0;
  > span {
    width: poTorem(34px);
    height: poTorem(34px);
    display: inline-block;
    color: #666;
    background: #fff;
    border-radius: 50%;
    font-size: poTorem(18px);
    line-height: poTorem(34px);
    text-align: center;
    margin: 0 0.3rem;
    border: 1px solid #ccc;
    &.active {
      background: #e33939;
      color: #fff;
    }
  }
}
</style>
