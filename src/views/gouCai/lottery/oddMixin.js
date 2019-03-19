import api from '../../../../api/betting';
import { randomBet } from '../../../js/random/randomBet';
import { mapActions } from 'vuex';
export default {
  computed: {
    // 是否是从投注记录过来的
    isFromBetHistory() {
      return this.$route.params.hasOwnProperty('wanfa');
    },
    // 从投注记录过来的玩法
    historeyWanfa() {
      return this.isFromBetHistory ? this.$route.params.wanfa : null;
    }
  },
  methods: {
    ...mapActions(['updateField']),
    getLogonOddFromCache(gameid, playid) {
      const _odds = this.$store.state.betting.odds;
      if (this.odds && this.odds.length) {
        return this.odds.find(x => x.playid === playid);
      } else if (_odds && _odds.length) {
        const _odd = _odds.find(x => x.id === gameid);
        if (_odd && _odd.data && _odd.data.length) {
          return _odd.data.find(x => x.playid === playid);
        }
      }
      return {};
    },
    /**
     * 根据playid和gameid获取当前玩法的赔率
     *
     * @param {number} gameid
     * @param {number} playid
     * @returns promise
     */
    async getOddByGameid(gameid, playid) {
      const isLogin = this.$store.state.userinfo.isLogin;
      const odd = isLogin
        ? this.getLogonOddFromCache(gameid, playid)
        : await api.getUnloginGameOdd(gameid, playid);

      if (odd && odd.peilv) {
        let _peilv = '';
        if (!odd.peilv.includes('|')) {
          _peilv = this.processZero(odd.peilv);
        } else {
          _peilv = odd.peilv
            .split('|')
            .map(x => this.processZero(x))
            .join('|');
        }
        this.peilv = _peilv;
        if (this.setBetOdd) {
          this.setBetOdd(_peilv);
        }
        if (_peilv.includes('|')) {
          this.peilvs = _peilv.split('|');
        } else {
          this.peilvs = [];
        }
      }
    },
    async getOdds(gameid) {
      const isLogin = this.$store.state.userinfo.isLogin;
      // 登陆从缓存取，不登陆重新取未登录接口
      let odds = isLogin
        ? await api.getLogondGameOdds(gameid)
        : await api.getUnLoginOdds(gameid);
      let _odd = null;
      // 如果已经登陆并且缓存没有的，从接口获取赔率
      if ((!odds || !odds.length) && isLogin) {
        odds = await api.getLogondGameOdds(gameid);
      }
      if (odds && odds.length && gameid) {
        if (odds[0].id) {
          _odd = odds.find(x => x.id === gameid);
        } else {
          _odd = odds.filter(x => x.gameid === gameid);
        }
      }
      return _odd;
    },

    async setEachDataPeilv(playid) {
      this.setBetOdd('');
      await this.getOddByGameid(this.routeList.lotter_id, playid);

      // 多赔率 区分多行每行项数相同和多行每行项数不同
      if (this.peilvs.length) {
        let lastRowLength = 0;
        this.dataSet.forEach(x => {
          x.data.forEach(y => {
            const _index = lastRowLength;
            y.peilv = this.peilvs[_index] ? this.peilvs[_index] : '-';
            lastRowLength++;
          });
        });
      } else {
        // 单赔率
        this.dataSet.map(x =>
          x.data.map(y => {
            y.peilv = this.peilv;
            return y;
          })
        );
      }
    },
    /**
     * 设置某个彩种的赔率
     *
     * @param {number} gameid
     * @returns promise
     */
    async setGamePeilvConfig(gameid) {
      const resOdds = [];
      const cache = await this.getOdds(gameid),
        isLogin = this.$store.state.userinfo.isLogin;
      this.setBetOdd('');
      // console.error('cache', cache)
      if (cache) {
        return cache;
      }

      if (resOdds && resOdds.length) {
        const obj = {
          id: gameid,
          data: resOdds
        };
        if (isLogin) this.setBetOdds(obj);
        else this.setBetUOdds(obj);
        this.setBetOdd(resOdds);
        return resOdds;
      }
    },

    getPeilvConfig(newVal, oldVal) {
      // 如果是登陆进来的
      if (oldVal === false && newVal) {
        this.setOdds();
      }
    },
    /**
     * 处理多个0的情况,只需要一个0
     *
     * @param {string} num
     * @returns processed string
     */
    processZero(num) {
      let _peilv = num;
      if (/\.000/.test(num)) {
        _peilv = num.substring(0, num.length - 2);
      } else if (/\.00[1-9]/.test(num)) {
        _peilv = num;
      } else if (/\.00/.test(num)) {
        _peilv = num.substring(0, num.length - 1);
      } else if (/\.[0-9][1-9]0/.test(num)) {
        _peilv = num.substring(0, num.length - 1);
      } else if (/\.[1-9]00/.test(num)) {
        _peilv = num.substring(0, num.length - 2);
      }

      return _peilv;
    },
    async setOdds() {
      const gameid = this.$route.params.lotter_id * 1,
        res = await this.setGamePeilvConfig(gameid);
      // console.error('赔率', res)
      // pknn赔率
      if (
        res &&
        res[0] &&
        ['pkniuniu'].includes(this.$store.state.betting.js_tag)
      ) {
        return this.setBetOdd(res[0].peilv.split('|'));
      }
      // 梯子赔率
      if (['tzyx', 'xync'].includes(this.$store.state.betting.js_tag)) {
        return this.updateField({ odds: res });
      }

      this.odds = Array.isArray(res)
        ? res
        : res && res.data && res.data.length
          ? res.data
          : [];
      if (res && res.length && this.curPlayItem) {
        this.setEachDataPeilv(this.curPlayItem.playid);
      }
    },
    /**
     * 摇一摇选球
     *
     */
    shake() {
      this.zhushu = 0;
      this.clearBalls();
      const fakeBetData = {
        arr: [],
        arr2: [],
        wanfa: this.title, // 玩法
        zhushu: this.zhushu, // 注数
        gameid: this.$route.params.lotter_id,
        dataSource: this.dataSet,
        js_tag: this.$store.state.betting.js_tag,
        playid: this.curPlayItem.playid
      };
      const randomData = randomBet(fakeBetData);
      this.dataSet = randomData;
      this.clickHandle();
    },
    /**
     * 根据玩法从玩法集合中定位并选择玩法
     *
     * @param {*} wanfa
     */
    findItemByWanfa(wanfa) {
      this.playList.forEach(x => {
        x.submenu.forEach(y => {
          y.playlist.forEach((z, index) => {
            if (z.wanfa === wanfa) {
              // this.playSwitch(x.showofficial ? '双面玩法' : '官方玩法')
              this.specific(z, '显示', '', index, y);
              return false;
            }
          });
        });
      });
    }
  },
  activated() {
    this.bus.$on('shake', this.shake);
    this.bus.$on('clearBalls', this.clearBalls);
    this.bus.$on('selectSubmenu', this.changeList);
    this.bus.$on('selectPlayItem', this.specific);
  },
  deactivated() {
    this.show1 = false;
    this.bus.$off('clearBalls');
    this.bus.$off('selectSubmenu');
    this.bus.$off('selectPlayItem');
  },
  watch: {
    '$store.state.betting.name_tag'(newVal, oldVal) {
      if (newVal !== oldVal && this.$store.state.betting.betData) {
        this.setBetData({});
      }
    }
  }
};
