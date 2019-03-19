<template>
  <!-- 对原有的数字输入框调整  输入的值可以不为 unit 整数倍  -->
  <span class="yd-spinner"
        :class="buttonStyle === 'circle' ? 'yd-spinner-circle' : 'yd-spinner-square'"
        :style="boxStyle">
    <span ref="minus"
          :style="btnStyle">
      <i></i>
    </span>
    <input type="number"
           pattern="[0-9]*"
           :style="{width: buttonStyle === 'circle' ? width : '50%'}"
           ref="numInput"
           class="yd-spinner-input"
           :readonly="readonly"
           v-model="counter"
           placeholder="" />
    <span ref="add"
          :style="btnStyle">
      <i></i>
    </span>
  </span>
</template>

<script type="text/babel">
export default {
  name: "yd-spinner",
  data() {
    return {
      counter: 0,
      tapParams: {
        timer: null,
        tapStartTime: 0
      },
      parms: {
        max: 0,
        min: -1
      }
    };
  },
  computed: {
    boxStyle() {
      if (this.buttonStyle === "square") {
        return { height: this.height, width: this.width };
      }
      return { height: this.height };
    },
    btnStyle() {
      if (this.buttonStyle === "square") {
        return {};
      }
      const h = this.height;
      return {
        width: h,
        height: h
      };
    }
  },
  watch: {
    value(val) {
      this.callback(this.val, val);
      this.setDefalutValue();
    }
  },
  props: {
    callback: {
      type: Function,
      default: () => {}
    },
    val: {
      type: [Boolean, String, Number],
      default: ""
    },
    unit: {
      default: 1,
      validator(val) {
        return /^([1-9]\d*)$/.test(val);
      }
    },
    max: {
      default: 0,
      validator(val) {
        return /^(([1-9]\d*)|0)$/.test(val);
      }
    },
    min: {
      default: -1,
      validator(val) {
        return /^((-?([1-9]\d*))|0)$/.test(val);
      }
    },
    longpress: {
      type: Boolean,
      default: true
    },
    readonly: {
      type: Boolean,
      default: false
    },
    value: {
      validator(val) {
        return /^(([1-9]\d*)|0)$/.test(val);
      }
    },
    width: {
      validator(value) {
        return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
      },
      default: "2rem"
    },
    height: {
      validator(value) {
        return /^(\.|\d+\.)?\d+(px|rem)$/.test(value);
      },
      default: ".6rem"
    },
    buttonStyle: {
      validator(value) {
        return ["square", "circle"].indexOf(value) > -1;
      },
      default: "square"
    }
  },
  methods: {
    init() {
      if (!this.checkParameters()) return;

      this.setDefalutValue();

      this.bindEvents();
    },
    checkParameters() {
      const max = ~~this.max;
      const unit = ~~this.unit;
      const min = ~~this.min;

      if (max < unit && max !== 0) {
        console.error(
          "[YDUI warn]: The parameter 'max'(" +
            max +
            ") must be greater than or equal to 'unit'(" +
            unit +
            ")."
        );
        return false;
      }
      // 不需要考虑max 是 unit 的整数倍数
      // if (max % unit !== 0) {
      //   console.error(
      //     "[YDUI warn]: The parameter 'max'(" +
      //       max +
      //       ") and 'unit'(" +
      //       unit +
      //       ') must be multiple.'
      //   )
      //   return false
      // }

      // if (min % unit !== 0 && min >= 0) {
      //   console.error(
      //     "[YDUI warn]: The parameter 'min'(" +
      //       min +
      //       ") and 'unit'(" +
      //       unit +
      //       ') must be multiple.'
      //   )
      //   return false
      // }

      if (max < min && max !== 0) {
        console.error(
          "[YDUI warn]: The parameter 'max'(" +
            max +
            ") must be greater than to 'min'(" +
            min +
            ")."
        );
        return false;
      }

      return true;
    },
    setDefalutValue() {
      const unit = ~~this.unit;
      const min = ~~this.min;
      const value = ~~this.value;

      if (~~value > 0) {
        this.setValue(value);
        return;
      }

      this.setValue(min < 0 ? unit : min);
    },
    calculation(type) {
      const max = ~~this.max;
      const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
      const unit = ~~this.unit;

      if (this.readonly) return;

      const val = ~~this.counter;
      let newval;

      if (type === "add") {
        newval = val + unit;
        if (max !== 0 && newval > max) newval = max;
      } else {
        newval = val - unit;
        if (newval < min) newval = min;
      }

      this.$emit("input", newval);

      if (this.longpress) {
        this.longpressHandler(type);
      }
    },
    setValue(val) {
      const max = ~~this.max;
      const min = ~~this.min < 0 ? ~~this.unit : ~~this.min;
      const unit = ~~this.unit;

      if (!/^(([1-9]\d*)|0)$/.test(val)) val = unit;

      if (val > max && max !== 0) val = max;

      // if (val % unit > 0) {
      //   val = val - val % unit + unit
      //   if (val > max && max !== 0) val -= unit
      // }

      if (val < min) val = min - (min % unit);

      this.counter = val;
    },
    longpressHandler(type) {
      const currentDate = new Date().getTime() / 1000;

      let intervalTime = currentDate - this.tapParams.tapStartTime;

      if (intervalTime < 1) intervalTime = 0.5;

      let secondCount = intervalTime * 10;
      if (intervalTime === 30) secondCount = 50;
      if (intervalTime >= 40) secondCount = 100;

      this.tapParams.timer = setTimeout(() => {
        this.calculation(type);
      }, 1000 / secondCount);
    },
    clearTapTimer() {
      clearTimeout(this.tapParams.timer);
    },
    bindEvents() {
      const add = this.$refs.add;
      const minus = this.$refs.minus;
      const events = {
        mousedownEvent: "touchstart",
        mouseupEvent: "touchend"
      };

      const isMobile =
        (window.Modernizr && !!window.Modernizr.touch) ||
        (function() {
          return !!("ontouchstart" in window || "Touch" in window);
        }());

      if (!isMobile) {
        events.mousedownEvent = "mousedown";
        events.mouseupEvent = "mouseup";
      }

      add.addEventListener(events.mousedownEvent, e => {
        if (this.longpress) {
          e.preventDefault();
          e.stopPropagation();

          this.tapParams.tapStartTime = new Date().getTime() / 1000;

          add.addEventListener(events.mouseupEvent, this.clearTapTimer);
        }

        this.calculation("add");
      });

      minus.addEventListener(events.mousedownEvent, e => {
        if (this.longpress) {
          e.preventDefault();
          e.stopPropagation();

          this.tapParams.tapStartTime = new Date().getTime() / 1000;

          minus.addEventListener(events.mouseupEvent, this.clearTapTimer);
        }

        this.calculation("minus");
      });

      this.$refs.numInput.addEventListener("change", () => {
        this.setValue(~~this.counter);
        this.$emit("input", ~~this.counter);
        this.callback(this.val, ~~this.counter);
      });
    }
  },
  mounted() {
    this.$nextTick(this.init);
  }
};
</script>

<style lang="scss" scoped>
// @import "../../../styles/components/spinner.less";
.yd-spinner {
  border-radius: 0.2rem;
  display: inline-block;
  position: relative;
  overflow: hidden;
  > span {
    margin-top: -0.4rem;
    float: left;
    width: 25%;
    height: 100%;
    text-align: center;
    font-weight: bold;
    color: #666;
    letter-spacing: 0;
    position: relative;
    overflow: hidden;
    // .tap-color(#FAFAFA, .95);
    > i:after {
      font-family: "YDUI-INLAY";
      color: #777;
      font-size: 1rem;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-45%, -40%);
    }
    &:last-child > i:after {
      content: "\E602";
    }
    &:first-child > i:after {
      content: "\E60B";
    }
  }
}
</style>
