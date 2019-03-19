<template>
  <div class="race-menu">
    <AppModel :show="modelDate"
              @close="close"
              class="race-date">
      <selectDate @close="close"
                  @submit="submit"
                  :unixStamp='unixStamp'></selectDate>
    </AppModel>

    <div class="left"
         @click="left"></div>
    <div class="date"
         @click="modelDate=true">{{unixStamp.format('yyyy-MM-dd')}} {{unixStamp.format('W')}}</div>
    <div class="right"
         @click="right"></div>
  </div>
</template>
<script>
import selectDate from "./selectDate";
export default {
  name: "select-date-label",
  props: ["unixStamp"],
  components: { selectDate },
  data() {
    return {
      modelDate: false
    };
  },
  methods: {
    close() {
      this.modelDate = false;
    },
    submit(date) {
      this.$emit("date", date);
    },
    left() {
      this.$emit(
        "date",
        new Date(this.unixStamp.setDate(this.unixStamp.getDate() - 1))
      );
    },
    right() {
      if (
        new Date(this.unixStamp).format("yyyyMMdd") >=
        new Date().format("yyyyMMdd")
      ) {
        return "";
      }
      this.$emit(
        "date",
        new Date(this.unixStamp.setDate(this.unixStamp.getDate() + 1))
      );
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
@import "~css/resources.scss";
.race-menu {
  .head_model .slot {
    line-height: 2rem;
    text-align: left;
    top: 8%;
  }

  .__vev_calendar-wrapper {
    .events-wrapper {
      display: none;
    }
    .cal-wrapper {
      .cal-header {
        display: block;
        padding-bottom: 0;
      }
      .date-num {
        line-height: unset;
        color: unset !important;
      }
      .highlight .date-num {
        color: #ffffff !important;
      }

      .cal-body .dates .item {
        .is-today,
        .is-event {
          content: "";
          border: 1px solid $mainColor !important;
          border-radius: 50%;
          opacity: 0.8;
          width: poTorem(26px);
          height: poTorem(26px);
          position: absolute;
          left: 50%;
          top: 50%;
          z-index: 2;
          margin-left: 0;
          margin-top: 0;
          transform: translate(-50%, -50%);
        }
        .is-event {
          background-color: $mainColor !important;
        }
        .is-today {
          background-color: unset !important;
        }
      }
    }
  }
}
</style>
<style lang="scss" scoped>
@import "~css/resources.scss";
.race-menu {
  position: relative;
  height: 3rem;
  line-height: 3rem;
  @include around;
  .date {
    font-size: poTorem(18px);
    color: #313131;
  }
  .left,
  .right {
    flex-basis: poTorem(50px);
    text-align: center;
  }
  .left {
    text-align: right;
    &::after {
      position: absolute;
      top: 33%;
      display: inline-block;
      content: " ";
      height: poTorem(15px);
      width: poTorem(15px);
      transform: rotate(135deg);
      background: transparent;
      border-right: 2px solid #313131;
      border-bottom: 2px solid #313131;
    }
  }
  .right {
    text-align: left;
    &::after {
      position: absolute;
      top: 33%;
      display: inline-block;
      content: " ";
      height: poTorem(15px);
      width: poTorem(15px);
      transform: rotate(-45deg);
      background: transparent;
      border-right: 2px solid #313131;
      border-bottom: 2px solid #313131;
    }
  }
}
</style>



