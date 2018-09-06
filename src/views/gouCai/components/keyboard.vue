<template>
  <div class="con_math" ref="keyboard" :class="{'hide': hide}">
    <span class="math_title">
      <slot></slot>
      <span style="width:50%">{{content}}</span>
      <span @click="transformBoard">完成</span>
    </span>
    <div class="digital">
      <ul>
        <li v-for="(item, index) in keyboardArr" :key="index" :class="{nothing: item === '',thin: thinSkin}" @click="setNumber(item)">{{item}}</li>
        <li class="icon" @click="deleteNum" :class="{thin: thinSkin}">
          <i></i>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: ['num', 'title', 'hide', 'thinSkin', 'relative'],
  data() {
    return {
      keyboardArr: [1, 2, 3, 4, 5, 6, 7, 8, 9, '', 0],
      number: this.num || 0
    }
  },
  computed: {
    content() {
      return this.title || '请输入购买金额'
    }
  },
  methods: {
    transformBoard() {
      this.$emit('hideKeyboard')
    },
    setNumber(num) {
      if (num == 0 && this.number == 0) {
        this.number = ''
      } else if (this.number === 0 && Number(num) > 0) {
        this.number = Number(num)
      } else {
        let c = Number(this.number.toString() + num.toString())
        if (c < 100001) {
          this.number = c
        }
      }
      this.$emit('keyboardPressed', this.number)
    },
    deleteNum() {
      let c = this.number.toString()
      console.log(this.number.toString())
      if (c.length === 1 || c.length === 0) {
        c = ''
      } else c = Number(c.substring(0, c.length - 1))
      this.number = c
      this.$emit('keyboardPressed', this.number)
    }
  },
  watch: {
    hide(val) {
      if (val) {
        this.$refs.keyboard.classList.remove('relative')
        this.$refs.keyboard.style = ''
      } else {
        this.$nextTick(() => {
          this.$refs.keyboard.classList.add('relative')
          this.$refs.keyboard.style = 'position:relative'
          document.documentElement.scrollTop =
            document.documentElement.scrollHeight
          document.body.scrollTop = document.body.scrollHeight
        })
      }
    },
    num(val) {
      this.number = val
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../../../css/resources.scss";
.con_math {
  position: absolute;
  transition: bottom 0.2s ease, opacity 0.2s ease;
  bottom: 0;
  width: 100%;
  background: #dfdfdf;
  z-index: 20;
  opacity: 1;
  height: auto;
  &.relative {
    position: relative;
  }
  .math_title {
    width: 100%;
    height: poTorem(40px);
    display: flex;
    @include center;
    color: #898989;
    position: relative;
    font-size: 1.125rem;
    justify-content: space-around;
    span {
      display: inline-block;
      @include center;
      height: 2.5rem;
      width: 25%;
      color: #000000;
    }
    span:first-child {
      -webkit-box-pack: unset;
      text-align: left;
      // text-indent: 1rem;
      padding-left: 1rem;
      justify-content: flex-start;
    }
    span:last-child {
      -webkit-box-pack: unset;
      text-align: right;
      // text-indent: 1rem;
      padding-right: 1rem;
      justify-content: flex-end;
    }
  }
  .digital {
    display: inline-block;
    width: 100%;
    ul {
      width: 100%;
      @include between;
      flex-wrap: wrap;
      li {
        background: #fff;
        @include center;
        width: 33%;
        height: poTorem(50px);
        margin: 0 0 poTorem(2px) 0;
        color: #000;
        font-size: poTorem(24px);
        font-weight: 400;
        &.thin {
          height: poTorem(36px);
        }
      }
      .icon {
        background: #dfdfdf;
        i {
          background: url(~img/goucai/number_back.png) no-repeat;
          background: contain;
          background-position: center;
          width: poTorem(30px);
          height: poTorem(30px);
        }
      }
      .nothing {
        background: #dfdfdf;
      }
    }
  }
}
.con_math.hide {
  // bottom: -30rem;
  opacity: 0;
  z-index: -1;
}
</style>

