<template>
  <yd-popup v-model="show"
            position="center"
            width="90%"
            :close-on-masker="false"
            class="chat-number"
            v-show="show">
    <div style="background-color:#fff;">
      <div class="title">
        {{this.txt.title||'是否进入私人聊天室'}}
        <span class="close"
              @click="close">+</span>
      </div>
      <div :class="['number',min]">
        <div>输入房间号</div>
        <div class="input-wrap">
          <input type="text"
                 placeholder="请输入房间号"
                 v-model="number">
        </div>
        <div class="third"
             v-show="isShowOldNumber"
             @click="submit(0)">点击此处进入上次房间 ></div>
      </div>
      <div class="btn-group">
        <div @click="submit(1)">{{this.txt.cancel||'直接进入大厅'}}</div>
        <div class="submit"
             @click="submit(2)">确定</div>

      </div>
    </div>
  </yd-popup>
</template>
<script>
//  游客试玩提示框
export default {
  props: ["show", "isShowOldNumber", "txt"],
  data() {
    return {
      number: ""
    };
  },
  computed: {
    min() {
      return this.isShowOldNumber ? "" : "min";
    }
  },
  methods: {
    close() {
      this.$emit("closeWelcPop");
    },
    submit(type = 0) {
      this.$emit("submit", { type, number: this.number });
    }
  },
  watch: {
    show(val) {
      if (val) {
        this.number = "";
      }
    }
  }
};
</script>
<style lang="scss" >
.chat-number {
  color: #434343;
  div {
    user-select: none;
  }
  .yd-popup-center {
    border-radius: 0.25rem;
    overflow: hidden;
  }

  .title {
    position: relative;
    height: 3.75rem;
    line-height: 3.75rem;
    font-size: 1.25rem;
    margin: 0 0.5rem;
    border-bottom: 1px dashed #bfbfbf;
    text-align: center;
    .close {
      position: absolute;
      font-size: 1.75rem;
      right: 0.3125rem;
      top: 0.9375rem;
      height: 1.875rem;
      width: 1.875rem;
      line-height: 1.875rem;
      transform: rotate(45deg);
    }
  }
  .number {
    height: 12.5rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    font-size: 1.0625rem;
    text-align: center;
    padding-bottom: 1.25rem;
    > div {
      width: 17.5625rem;
      height: 2.6875rem;
      line-height: 2.6875rem;
      border-radius: 3px;
    }
    .input-wrap {
      border: 1px solid #bfbfbf;
      background: rgba(242, 242, 242, 1);
      input {
        height: 100%;
        border: none;
        width: 100%;
        padding-left: 0.625rem;
      }
      ::placeholder {
        color: #aaaaaa;
        opacity: 1;
      }
    }
    .third {
      border: 1px solid #bfbfbf;
      color: #ff7c34;
    }
  }
  .min {
    height: 9.0625rem;
  }
  .note {
    font-size: 16px;
    line-height: 20px;
    margin: 1.25rem 0.625rem;
    i {
      color: #e33939;
    }
  }
  .btn-group {
    display: flex;
    border: 0.0625rem solid #bfbfbf;
    height: 3.4375rem;
    text-align: center;

    div {
      flex: 1;
      height: 100%;
      line-height: 3.4375rem;
      font-size: 1.3125rem;
      color: #7d7d7d;
    }
    .submit {
      border-left: 0.0625rem solid #bfbfbf;
      color: #00a0e9;
    }
  }
}
</style>

