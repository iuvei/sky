import { getFields } from '../../../gouCai/lottery/qxc/components/field';
import calcBetQuantity from '../../../gouCai/lottery/qxc/components/calc';
import getDwdArr from '~/js/touzhu/util';
import labelUtil from '~/js/touzhu/getLabels';

class QXC {
  showActions(playid) {
    return playid < 7;
  }

  getValue(item, x, i, index) {
    let val = !isNaN(x)
      ? x
      : item.options
        ? index * item.options.length + i
        : index + i;
    if (item.options.includes('大') && item.options.includes('小')) {
      val = i;
    }
    return val;
  }

  /**
   * 获取选球数据
   *
   * @param { Number } playid 玩法ID
   * @param { Array } odds 赔率数组
   * @returns { Array } 选球模板数据源
   * @memberof QXC
   */
  getBalls(playid, odds, columns) {
    columns = getFields(playid, columns);
    const dataSet = columns.map((item, index) => ({
      name: typeof item === 'string' ? item : item.name,
      data: item.options.map((x, i) => ({
        name: x.name || x,
        checked: false,
        peilv:
          odds && odds.length > 2 ? odds[index * item.options.length + 1] : '-',
        playid,
        value: this.getValue(item, x, i, index) // 从0开始
      }))
    }));
    return dataSet;
  }

  /**
   * 号码选择互斥
   *
   * @param { Array } dataSet 数据源
   * @param { Sring } name 行上的名称
   * @param { Object } curItem 当前选中的球
   * @memberof QXC
   */
  mutex() {}

  /**
   * 是否是定位胆
   *
   * @param {Number} playid
   * @returns true or false
   * @memberof QXC
   */
  isDwd(playid) {
    return [1, 2, 3, 4, 8].includes(playid);
  }

  /**
   * 计算注数
   *
   * @param { Number } playid 玩法ID
   * @param { Array } one 一维数组
   * @param { Array } two 二维数组
   * @returns Number 计算的出的注数
   * @memberof QXC
   */
  calcBetNumber(playid, one, two) {
    if (this.isDwd(playid)) {
      two = getDwdArr(two).filter(x => x.length);
    } else if ([5, 6].includes(playid)) {
      return calcBetQuantity(playid, one);
    }
    return calcBetQuantity(playid, two);
  }

  /**
   * 取球函数
   * 获取选中球抽象
   * @param { Array } arr
   * @returns 选中球的值
   * @memberof QXC
   */
  getValues(arr) {
    return arr.filter(x => x.checked).map(x => x.value);
  }

  /**
   * 获取选中球
   *
   * @param { Array } dataSet 数据源
   * @returns 一维数组放one 二维数组放two,一般是胆拖
   * @memberof QXC
   */
  getCheckedBalls(dataSet) {
    let one = [];
    dataSet.forEach(x => {
      one.push(this.getValues(x.data));
    });
    one = one.reduce((a, b) => a.concat(b));
    const two =
      dataSet.length > 1
        ? [...dataSet.map(x => this.getValues(x.data).join('|'))]
        : [];

    return {
      one,
      two
    };
  }

  // 获取显示球
  getShowLabels(dataSet, playid) {
    if ([7].includes(playid)) {
      // 显示label，多行
      return labelUtil.getLabels(dataSet, ',', true, true);
    } else if ([1, 2, 3, 4, 8, 9, 10, 11, 12].includes(playid)) {
      // 显示label，单行
      return labelUtil.getLabels(dataSet, ',', true);
    } else {
      // 不显示label,单行
      return labelUtil.getLabels(dataSet);
    }
  }

  /**
   * 计算提交数据
   *
   * @param { Array } dataSet 数据源
   * @param { Number } playid 玩法ID
   * @param { Number } price 投注单价
   * @returns String 计算后的投注字符串
   * @memberof QXC
   */
  getSubmitData(dataSet, playid, price) {
    const obj = this.getCheckedBalls(dataSet);
    let arr = [];
    if (this.isDwd(playid)) {
      const two = getDwdArr(obj.two).filter(x => x.length);
      arr = [`${playid}#${price}#${two.reduce((a, b) => a + '+' + b)}`];
    } else if ([5, 6].includes(playid)) {
      arr = [`${playid}#${price}#${obj.one.join('+')}`];
    } else {
      const str = obj.two.reduce((a, b) => a + '+' + b);
      arr = [`${playid}#${price}#${str}`];
    }
    return JSON.stringify(arr).replace('/\\/g', '');
  }

  /**
   * 组装提交数据
   *
   * @param {Object} { gameid, dataSet, playid, price, qishu, token }
   * @returns Object
   * @memberof QXC
   */
  assemblyBetData({ gameid, dataSet, playid, price, qishu, token }) {
    return {
      gameid,
      qishu,
      data: this.getSubmitData(dataSet, playid, price),
      auto: 1,
      stop: 1,
      multiple: 1,
      form_unique_token: token
    };
  }
}

export default new QXC();
