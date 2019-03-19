import {
  getTwoBalls,
  getThreeBalls,
  getFourBalls,
  getFiveBalls
} from '~/js/touzhu/touzhu.lhc';
import { mapActions, mapState } from 'vuex';
import { RenderTypes } from '~/js/touzhu/commonTypes';
import getLhcCartDetail from '~/js/cart.lhc.detail';

export default {
  methods: {
    ...mapActions(['addToCart']),
    processLHCData(betData) {
      const towArr = [22, 26, 32, 33, 34],
        threeArr = [23, 27, 30, 31],
        fourArr = [24, 28, 35],
        fiveArr = [25, 29];

      if (towArr.includes(betData.playid)) {
        betData.arr = getTwoBalls(betData.arr.split('|'));
        betData.arr2 = getTwoBalls(betData.arr2.split('|'));
      }
      if (threeArr.includes(betData.playid)) {
        betData.arr = getThreeBalls(betData.arr.split('|'));
        betData.arr2 = getThreeBalls(betData.arr2.split('|'));
      }
      if (fourArr.includes(betData.playid)) {
        betData.arr = getFourBalls(betData.arr.split('|'));
        betData.arr2 = getFourBalls(betData.arr2.split('|'));
      }
      if (fiveArr.includes(betData.playid)) {
        betData.arr = getFiveBalls(betData.arr.split('|'));
        betData.arr2 = getFiveBalls(betData.arr2.split('|'));
      }
    },
    addLHCDataToCart() {
      const _arr = [22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
        //  const _arr = [ 30, 31, 32, 33, 34, 35],
        _betData = this.calcBetData;
      if (
        // 合肖 自选不中
        [8, 21].includes(this.calcBetData.playid)
      ) {
        let _arr2 = _betData.arr2[0];
        if (_arr2.includes(' ')) {
          _arr2 = _arr2.split(' ').join('+');
        }
        if (_arr2.includes('|')) {
          _arr2 = _arr2.split('|').join('+');
        }
        this.calcBetData.arr2 = [_arr2];
        this.addToCart(this.calcBetData);
      } else if (_arr.includes(this.calcBetData.playid)) {
        // 其他需要分离的，一行多个值，有对应球的
        this.processLHCData(_betData);
        _betData.arr.forEach((x, i) => {
          const _arr2 = _betData.arr2[i];
          const detail = x
            .split(' ')
            .map(y => {
              let _detail = getLhcCartDetail(_betData.playid, y);
              _detail =
                _detail && _detail.length
                  ? `${y}(<span style='color:red'>${_detail.toString()}</span>)`
                  : `<span style='color:red'>${y}</span>`;
              return _detail;
            })
            .join(', ');
          const obj = {
            detail: false,
            arr: x,
            arr2: _arr2.split(' ').join('+'),
            formatShowStr: x,
            formatValueStr: _betData.arr2[i],
            formatedStr: detail,
            totalPrice: _betData.unitPrice,
            peilvStr: _betData.peilv,
            zhushu: 1
          };
          const _obj = Object.assign({}, _betData);
          this.addToCart(Object.assign(_obj, obj));
        });
      } else {
        // 每一行一个球或者值的
        _betData.filteredData[0].data.forEach(x => {
          let detail = getLhcCartDetail(_betData.playid, x.name);
          detail =
            detail && detail.length
              ? `${x.name}(<span style='color:red'>${detail.toString()}</span>)`
              : `<span style='color:red'>${x.name}</span>`;
          const obj = {
            detail: false,
            arr: [x.name],
            arr2: [x.value],
            formatShowStr: x.name,
            formatValueStr: x.value,
            // formatedStr: `<span style='color:red'>${x.name}</span>`,
            formatedStr: detail,
            totalPrice: _betData.unitPrice,
            peilvStr: x.peilv,
            zhushu: 1
          };
          const _obj = Object.assign({}, _betData);
          this.addToCart(Object.assign(_obj, obj));
        });
      }
    },
    toCart() {
      this.addLHCDataToCart();
      this.$router.push('/shopcart');
    }
  },
  computed: {
    calcBetData() {
      let formatedStr = '',
        peilvStr = '';
      const filteredData = [
        {
          name: this.betData.dataSource[0].name,
          data: this.betData.dataSource[0].data.filter(x => Number(x.price) > 0)
        }
      ];
      // 六合彩和时时彩
      if (this.betData.peilvType === RenderTypes.LHC) {
        filteredData.forEach(item => {
          formatedStr += `${item.data
            .map(y => {
              const detail = getLhcCartDetail(this.betData.playid, y.name);

              return detail && detail.length
                ? `${y.name}
                (<span style='color:red'>${detail.toString()}</span>)`
                : `<span style='color:red'>${y.name}</span>`;
            })
            .join(',')}`;
        });
        // console.log('formatedStr', formatedStr)
      }
      if (this.betData.peilvType === RenderTypes.LHC && this.betData.pl) {
        peilvStr = this.betData.pl;
      }
      // console.log('this.betData', this.betData)

      const price = filteredData[0].data
        .map(x => Number(x.price))
        .reduce((a, b) => a + b);
      console.log('price', price);
      return Object.assign(JSON.parse(JSON.stringify(this.betData)), {
        unitPrice: price,
        formatedStr,
        totalPrice: price,
        peilvStr,
        filteredData,
        arr: filteredData[0].data
          .map(x => x.name.toString().replace(/\s/g, ''))
          .join('|'),
        arr2: filteredData[0].data
          .map(x => x.value.toString().replace(/\s/g, ''))
          .join('|')
      });
    },
    ...mapState({
      betData: state => state.betting.betData
    })
  }
};
