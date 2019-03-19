<template>
  <div class="race-date">
    <header>
      <div class="year">{{date.year}}</div>
      <div class="date">{{date.date}} {{date.week}}</div>
    </header>
    <vue-event-calendar class="race-date-calendar"
                        :events="events"
                        @day-changed="handleDayChanged"
                        @month-changed="handleMonthChanged"></vue-event-calendar>
    <footer>
      <span class="cancel"
            @click="$emit('close')">取消</span>
      <span class="confirm"
            @click="submit">确认</span>
    </footer>
  </div>
</template>
<script>
export default {
  name: "FootballRaceDate",
  props: ["unixStamp"],
  data() {
    return {
      dateStamp: new Date(),
      events: [
        {
          date: new Date().format("yyyy/MM/dd"),
          title: "",
          customClass: "highlight" // Custom classes to an calendar cell
        }
      ]
    };
  },
  watch: {
    unixStamp(v) {
      this.dateStamp = v;
      this.events[0].date = v.format("yyyy/MM/dd");
    }
  },
  computed: {
    date() {
      return {
        year: this.dateStamp.format("yyyy"),
        date: this.dateStamp.format("MM月dd日"),
        week: this.dateStamp.format("w")
      };
    }
  },

  methods: {
    handleDayChanged(d) {
      if (
        new Date(new Date().format("yyyy-MM-dd 23:59:59")).getTime() <
        new Date(d.date).getTime()
      ) {
        return;
      }

      this.events[0].date = d.date;
      this.dateStamp = new Date(d.date);
    },
    handleMonthChanged() {
      // console.log("month-changed", data);
    },
    submit() {
      if (
        new Date(new Date().format("yyyy-MM-dd 23:59:59")).getTime() <
        new Date(this.dateStamp).getTime()
      ) {
        this.dateStamp = new Date();
      }

      this.$emit("submit", this.dateStamp);
      this.$emit("close");
    }
  },
  mounted() {}
};
</script>

<style lang="scss" scoped>
@import "../../../../css/resources.scss";
.race-date {
  // @include center;
  display: flex;
  flex-direction: column;
  margin: poTorem(28px) auto 0;
  background-color: #fff;
  header {
    width: poTorem(340px);
    height: poTorem(100px);
    padding: poTorem(18px) 0 0 poTorem(34px);
    background-color: $mainColor;
    color: #ffffff;
    .year {
      font-size: poTorem(23px);
    }
    .date {
      font-size: poTorem(30px);
    }
  }
  &-calendar {
    width: poTorem(340px);
  }
  footer {
    // @include end;
    display: flex;
    justify-content: flex-end;
    height: poTorem(40px);
    span {
      font-size: poTorem(18px);
      color: $mainColor;
    }
    .confirm {
      margin-right: poTorem(18px);
    }
    .cancel {
      margin-right: poTorem(28px);
    }
  }
}
</style>


<style lang="scss">
@import "../../../../css/resources.scss";
.race-date {
  line-height: 2rem;
  .highlight {
    p {
      color: #fff !important;
    }
    span {
      background-color: $mainColor !important;
    }
  }

  // 时间样式
  .__vev_calendar-wrapper .cal-wrapper {
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
</style>
