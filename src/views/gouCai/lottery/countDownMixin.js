import { mapState, mapActions } from 'vuex';
import api from '../../../../api/betting';
export default {
  data() {
    return {
      // nextOpen: 0,
      // nextQishu: '',
      closeTimer: 0,
      isSelectedBalls: false,
      isShowPrice: true, // 余额显示状态
      openless_leftTime: 0, // 开奖倒计时剩余时间 单位秒
      stopless: 0, // 封盘倒计时 单位秒
      openless: 0, // 开奖倒计时 单位秒
      resTimer: Function,
      randomBallTimer: 0,
      randomBalls: [], // 随机球数组
      isOne: 0
    };
  },
  computed: {
    ...mapState({
      isLogin: state => state.userinfo.isLogin,
      userBalance: state => state.userinfo.accountInfo.price,
      betData: state => state.betting.betData
    }),
    nextQishu() {
      if (this.nexts && Array.isArray(this.nexts) && this.nexts.length) {
        let newNextQishu = this.nexts[0] && this.nexts[0].qishu;
        if (newNextQishu && this.nexts[0].openless === 0) {
          newNextQishu = this.nexts[1].qishu;
        }
        return (newNextQishu + '').slice(-4);
      }
      return '';
    },
    nextQs() {
      if (this.nexts && Array.isArray(this.nexts) && this.nexts.length) {
        let newNextQishu = this.nexts[0] && this.nexts[0].qishu;
        if (newNextQishu && this.nexts[0].openless === 0) {
          newNextQishu = this.nexts[1].qishu;
        }
        return newNextQishu;
      }
      return 0;
    },
    renderStr() {
      let s = '余额:';
      if (!this.isLogin) {
        s += '请<span class="color-blue clickArea">[登录]</span>';
        return s;
      }

      s += `<span class="color-red clickArea">${
        this.isShowPrice ? this.userBalance : ''
      }</span>`;
      s += (this.isShowPrice && '元') || '';
      s += `<span class="color-blue clickArea">${
        this.isShowPrice ? '' : '[显示]'
      }</span>`;
      return s;
    }
  },
  watch: {
    '$store.state.betting.name_tag'(newVal, oldVal) {
      if (newVal !== oldVal) {
        this.firstLoad = true;
      }
    },
    '$store.state.betting.betData'(newVal, oldVal) {
      if (newVal !== oldVal && newVal) {
        this.isSelectedBalls = true;
      } else {
        this.isSelectedBalls = false;
      }
    },
    '$route.params'() {
      this.isOne = 0;
    },
    openless_leftTime(openless_leftTime) {
      const closeIsShow =
        openless_leftTime - (this.openless - this.stopless) > 0;
      this.closeIsShow = closeIsShow;
    },
    closeIsShow(closeIsShow) {
      this.setCloseBet(closeIsShow);
    }
  },
  methods: {
    ...mapActions(['modelBetShow', 'setBetData', 'setQishu', 'setCloseBet']),
    userBalanceClick({ target }) {
      if (target.classList.contains('clickArea')) {
        if (!this.isLogin) {
          return this.$router.push({
            path: '/login',
            query: { redirect: this.$route.fullPath }
          });
        }

        this.isShowPrice = !this.isShowPrice;
      }
    },
    // 获取历史数据
    async getHistory(tag) {
      const prevData = await api.getHistoryOpen(tag);
      if (prevData && Array.isArray(prevData) && prevData.length) {
        if (prevData[0].qishu === this.nextQs - 1) {
          this.balls =
            prevData[0].balls && prevData[0].balls.length
              ? prevData[0].balls.split('+')
              : [];
        } else {
          clearTimeout(window.______timer);
          window.______timer = window.setTimeout(async() => {
            if (this._inactive) return;
            await this.getHistory(tag);
          }, 5000);
        }
        this.kjBalls = prevData;
        this.kjBalls.forEach(x => {
          if (x.balls !== '') x.balls = x.balls.split('+');
          else x.balls = [];
        });
        if (this.isOne === 0) {
          this.data =
            this.kjBalls[0].balls.length === 10
              ? this.kjBalls[0].balls
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
        if (tag === 'xypknn' || tag === 'bjpkniuniu') {
          for (let i = 0; i < this.kjBalls.length; i++) {
            for (let n = 0; n < this.kjBalls[i].balls.length; n++) {
              this.kjBalls[i].balls[n] = this.kjBalls[i].balls[n] * 1;
            }
          }
        }
      }
    },
    // 获取历史数据
    async getHistorys(tag) {
      const prevData = await api.getHistoryOpen(tag);
      if (prevData && Array.isArray(prevData) && prevData.length) {
        if (prevData[0].qishu === this.nextQs - 1 && prevData[0].balls.length) {
          this.balls =
            prevData[0].balls && prevData[0].balls.length
              ? prevData[0].balls.split('+')
              : [];
        } else {
          clearTimeout(window.______timer);
          window.______timer = window.setTimeout(async() => {
            if (this._inactive) return;
            await this.getHistorys(tag);
          }, 5000);
        }
        this.kjBalls = prevData;
        this.kjBalls.forEach(x => {
          if (x.balls !== '') x.balls = x.balls.split('+');
          else x.balls = [];
        });
        if (this.isOne === 0) {
          this.data =
            this.kjBalls[0].balls.length === 10
              ? this.kjBalls[0].balls
              : [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }
        if (tag === 'xypknn' || tag === 'bjpkniuniu') {
          for (let i = 0; i < this.kjBalls.length; i++) {
            for (let n = 0; n < this.kjBalls[i].balls.length; n++) {
              this.kjBalls[i].balls[n] = this.kjBalls[i].balls[n] * 1;
            }
          }
        }
      }
    },
    // 获取开盘倒计时时间
    async getOpened(tag) {
      this.next = [];
      // console.log('tag', tag)
      const nextData = await api.getNextStop(tag);
      if (nextData && Array.isArray(nextData) && nextData.length) {
        // this.nexts = nextData[0].next
        if (
          nextData[0].next &&
          Array.isArray(nextData[0].next) &&
          nextData[0].next.length
        ) {
          // console.log('this.nexts', this.nexts)
          this.nexts = nextData[0].next;

          this.setQishu(this.nextQs);

          this.stopless =
            nextData[0].next[0].stopless || nextData[0].next[1].stopless;
          this.openless =
            nextData[0].next[0].openless || nextData[0].next[1].openless;
          if (tag === 'xypknn' || tag === 'bjpkniuniu') {
            this.count = this.openless;
            this.countDown();
          }
          this.alert();
          this.$nextTick(() => {
            if (this.$refs.stopless) {
              clearInterval(this.$refs.stopless.timer);
              this.$refs.stopless.run();
            }
            if (this.$refs.openless) {
              clearInterval(this.$refs.openless.timer);
              this.$refs.openless.run();
            }
          });
          if (this.stopless > 0) {
            this.closeIsShow = true;
          }
        }
      }
    },
    // 封盘倒计时完成后
    _closeCallback() {
      this.closeIsShow = false;
    },
    // 开奖倒计时完成后
    async _openCallback() {
      clearInterval(this.resTimer);
      this.balls = [];
      // 如果是需要倒计时完成后延迟5秒开奖
      const _this = this;
      clearInterval(this.resTimer);
      this.resTimer = setInterval(async() => {
        await this.getHistory(_this.routeLists.name_tag).then(() => {
          // console.log(_this.balls)
          if (_this.balls.length) {
            if (
              this.routeLists.name_tag === 'xypknn' ||
              this.routeLists.name_tag === 'bjpkniuniu'
            ) {
              if (this.isOne === 0) {
                this.isOne = 1;
                return;
              } else {
                this.downTime();
              }
            }
            clearInterval(this.resTimer);
          }
        });
        // await this.getOpened(this.routeLists.name_tag)
      }, 5000);
      await this.getOpened(this.routeLists.name_tag);
      if (
        this.routeLists.name_tag === 'xypknn' ||
        this.routeLists.name_tag === 'bjpkniuniu'
      ) {
        this.star();
      }
    },
    // 随机号
    randomBall(min, max, length, type, hasPre) {
      // 开奖球最小值  最大值  球长度   type1可重复 2不重复 type其他值为pk10专用 小于10十位是否加0
      const arr = [];
      for (let i = 0; i < length; i++) {
        if (type === 1) {
          let num = parseInt(Math.random() * (max - min) + min, 10);
          if (num < 10) {
            num = hasPre ? '0' + num : num;
          }
          arr.push(num);
        } else if (type === 2) {
          while (arr.length < i + 1) {
            let num = parseInt(Math.random() * (max - min) + min, 10);
            if (num < 10) {
              num = hasPre ? '0' + num : num;
            }
            if (arr.indexOf(num) === -1) arr.push(num);
          }
        } else {
          const arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            num1 = parseInt(Math.random() * arr1.length, 10),
            num2 = parseInt(Math.random() * arr1.length, 10);
          const tmp = arr1[num1];
          arr1[num1] = arr1[num2];
          arr1[num2] = tmp;
          arr1.forEach(item => arr.push(item));
        }
      }
      return arr;
    },
    // 根据彩种判断球数
    ballFromBet() {
      let arr = [];
      switch (this.routeLists.js_tag) {
        case 'ssc':
          arr = this.randomBall(0, 9, 5, 1);
          break;
        case 'pcdd':
          arr = this.randomBall(0, 9, 3, 1);
          arr.push(arr[0] + arr[1] + arr[2]);
          break;
        case '3d':
          arr = this.randomBall(0, 9, 3, 1);
          break;
        case 'lhc':
          arr = this.randomBall(1, 49, 7, 2, 1);
          arr.splice(6, 0, '+');
          break;
        case '11x5':
          arr = this.randomBall(1, 11, 5, 2);
          break;
        case 'pk10':
          arr = this.randomBall(1, 10, 1, 3);
          break;
        case 'k3':
          arr = this.randomBall(1, 6, 3, 1);
          break;
        case 'xync':
          arr = this.randomBall(1, 20, 8, 2);
          break;
        case 'xypk':
          arr = this.randomBall(0, 51, 3, 1);
          break;
        case 'qxc':
          arr = this.randomBall(0, 9, 4, 1);
          break;
      }
      this.randomBalls = arr;
    },
    // 下期提示
    alert() {
      const curQishu =
        (this.nextQishu && (this.nextQishu * 1 + '').padStart(4, '0')) || '';
      const curQishuStr = `<span style='color:red'>${curQishu}</span>`;
      if (
        this.betData &&
        (!(this.betData.dataSet && this.betData.dataSet.length) &&
          !this.betData.danshiExcl)
      ) {
        if (!this.firstLoad) {
          this.$dialog.toast({ mes: `请注意！当前进入${curQishu}期` });
        }
      } else if (
        this.betData &&
        (this.betData.dataSet.length || this.betData.danshiExcl)
      ) {
        if (this.$store.state.betting.modelShow) {
          this.$dialog.toast({ mes: `请注意！当前进入${curQishu}期` });
          return;
        }
        if (this.isSelectedBalls) {
          const msg = this.betData && this.betData.danshiExcl ? '输入' : '所选';

          this.$dialog.confirm({
            title: '提示',
            mes: `请注意! 当前进入${curQishuStr}期, 是否清空${msg}号码?`,
            opts: [
              {
                txt: '清空',
                color: false,
                callback: () => {
                  this.bus.$emit('clearBalls');
                  this.setBetData({});
                  this.modelBetShow(false);
                }
              },
              {
                txt: '保留',
                color: 'red',
                callback: this.stay
              }
            ]
          });

          this.$nextTick(() => {
            this.countDownClose(3);
          });
        } else if (!this.firstLoad) {
          this.$dialog.toast({ mes: `请注意！当前进入${curQishu}期` });
        }
      }
      if (this.firstLoad) this.firstLoad = false;
    },
    // 倒计时保留
    countDownClose(cd) {
      const btn = document.querySelectorAll('.yd-confirm-btn')[1];
      if (btn) {
        this.closeTimer = setTimeout(() => {
          btn.innerHTML = `保留(${cd})`;
          // console.log(btn.innerHTML)
          cd--;
          this.countDownClose(cd);
          if (cd === -1) {
            btn.innerHTML = '保留';
            clearTimeout(this.closeTimer);
            this.stay();
          }
        }, 1000);
      }
    },
    // 倒计时保留调用方法
    stay() {
      const btn = document.querySelectorAll('.yd-confirm-btn')[1];
      if (btn) {
        btn.click();
      }
    }
  },
  activated() {
    this.firstLoad = true;
  },
  deactivated() {
    this.balls = [];
    this.next = [];
    this.isOne = 0;
    // console.log('deactivated_this.next', this.next)
    if (this.$refs.openless) {
      clearInterval(this.$refs.openless.timer);
    }
    if (this.$refs.stopless) {
      clearInterval(this.$refs.stopless.timer);
    }
    clearTimeout(window.______timer);
    clearInterval(this.resTimer);
    clearTimeout(this.closeTimer);
    this.isSelectedBalls = false;
  }
};
