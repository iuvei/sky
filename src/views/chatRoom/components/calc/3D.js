import getFields from '../../../gouCai/lottery/3d/components/fields'
import { CalcObj } from '~/js/touzhu/touzhu.3d.calc'
import labelUtil from '~/js/touzhu/getLabels'
import getDwdArr from '~/js/touzhu/util'
// console.warn('labels', labels)
class ThreeD {
  getValue(obj, i, j) {
    // console.error('obj',obj)
    return obj.values ? obj.values[j] : i * obj.options.length + j
  }

  showActions(playid) {
    return ![12, 26, 27].includes(playid)
  }

  // 获取选球数据
  getBalls(playid, odds, columns = []) {
    columns = getFields(playid, columns)
    return columns.map((item, i) => ({
      name: item.name,
      data: item.options.map((x, index) => ({
        name: x.name || x,
        checked: false,
        peilv: odds && odds.length > 2 ? odds[index] : '-',
        playid,
        type: 2, // 1为圆球， 2为方框，3为中方框，4为大方框
        value: this.getValue(item, i, index)
      }))
    }))
  }

  // 取球函数
  getValues(arr) {
    return arr.filter(x => x.checked).map(x => x.value)
  }

  // 获取选中球
  getCheckedBalls(dataSet) {
    let one = []
    dataSet.forEach(x => {
      one.push(this.getValues(x.data))
    })
    one = one.reduce((a, b) => a.concat(b))
    const two =
      dataSet.length > 1
        ? [...dataSet.map(x => this.getValues(x.data).join('|'))]
        : []

    return {
      one,
      two
    }
  }

  // 获取显示球
  getShowLabels(dataSet, playid, danshiStr = '') {
    // const arr = []
    if ([2].includes(playid)) {
      return labelUtil.getDanshiLabels(danshiStr)
    } else if ([26, 27].includes(playid)) {
      // 显示label,多行
      return labelUtil.getLabels(dataSet, ',', true, true)
    } else if ([3, 6, 7].includes(playid)) {
      // 不显示label,多行
      return labelUtil.getLabels(dataSet, ',', false, true)
    } else if ([4, 5, 13, 14].includes(playid)) {
      // 不显示label,单行
      return labelUtil.getLabels(dataSet, ',', false)
    } else if ([12].includes(playid)) {
      // 显示label ，单行
      return labelUtil.getLabels(dataSet, ',', true)
    } else {
      // 显示label，多行
      return labelUtil.getLabels(dataSet, ',', true)
    }
  }

  // 计算注数
  calcBetNumber(playid, one, two, danshiExcl = '') {
    // if ([26].includes(playid)) {
    //   return zhushuFunc.calc_smp(one)
    // } else if ([12].includes(playid)) {
    //   return zhushuFunc.calc_dwd_dwd(two)
    // } else if ([1].includes(playid)) {
    //   return zhushuFunc.calc_3x_zhxfs(two)
    // } else if ([3].includes(playid)) {
    //   return zhushuFunc.calc_3x_zhxhz(one)
    // } else if ([4].includes(playid)) {
    //   return zhushuFunc.calc_3x_zu3fs(one)
    // } else if ([5].includes(playid)) {
    //   return zhushuFunc.calc_3x_zu6fs(one)
    // } else if ([6].includes(playid)) {
    //   return zhushuFunc.calc_3x_zu3hz(one)
    // } else if ([7].includes(playid)) {
    //   return zhushuFunc.calc_3x_zu6hz(one)
    // } else if ([8].includes(playid)) {
    //   return zhushuFunc.calc_2x_q2zhxfs(two)
    // } else if ([9].includes(playid)) {
    //   return zhushuFunc.calc_2x_h2zhxfs(two)
    // } else if ([10].includes(playid)) {
    //   return zhushuFunc.calc_2x_q2zuxfs(one)
    // } else if ([11].includes(playid)) {
    //   return zhushuFunc.calc_2x_h2zuxfs(one)
    // } else if ([13].includes(playid)) {
    //   return zhushuFunc.calc_bdw_1mbdw(one)
    // } else if (danshiUtil.danshiArr.includes(playid)) {
    //   danshiExcl = danshiExcl
    //     .split(' ')
    //     .join('|')
    //     .split(',')
    //   return zhushuFunc.calc_3x_zhxds(danshiExcl)
    // }
    // 单式
    if ([2].includes(playid)) {
      danshiExcl = danshiExcl
        .split(' ')
        .join('|')
        .split(',')
      return CalcObj.get(playid).calcFn(danshiExcl)
    } else if ([12].includes(playid)) {
      two = getDwdArr(two).filter(x => x.length)
      return CalcObj.get(playid).calcFn(two)
    } else if ([1, 8, 9].includes(playid)) {
      return CalcObj.get(playid).calcFn(two)
    } else {
      return CalcObj.get(playid).calcFn(one)
    }
  }

  // 数字盘参数计算
  square(two) {
    let param = Number('')
    if (two[0]) {
      param += 1
    }
    if (two[1]) {
      param += 2
    }
    if (two[2]) {
      param += 4
    }
    return param
  }

  // 数字盘投注拼接
  dwdtouzhu(obj, playid, price) {
    const param = this.square(obj.two)
    let two = [],
      arr = []
    two = obj.two.filter(x => !x === '')
    if (two.length === 1) {
      arr = [`${playid}#${price}#${param}+${two[0]}`]
    } else if (two.length === 2) {
      arr = [`${playid}#${price}#${param}+${two[0]}+${two[1]}`]
    } else {
      arr = [`${playid}#${price}#${param}+${two[0]}+${two[1]}+${two[2]}`]
    }
    return arr
  }

  getSubmitData(dataSet, playid, price, danshiExcl = '') {
    // 如果是单式
    if ([2].includes(playid) && danshiExcl.length) {
      const arr = danshiExcl.split(',')
      const _arr = arr.map(x => `${playid}#${price}#${x.replace(/\s/g, '|')}`)
      return JSON.stringify(_arr).replace('/\\/g', '')
    } else {
      const obj = this.getCheckedBalls(dataSet)
      let arr = []
      if ([3, 6, 7].includes(playid)) {
        arr = obj.one.map(x => `${playid}#${price}#${x}`)
      } else if ([26].includes(playid)) {
        // 双面盘是多赔率，需要拆成每一注
        // const _one =
        //   obj.one.length > 1 ? obj.one.reduce((a, b) => a.concat(b)) : obj.one
        // const _one = obj.one.reduce((a, b) => a.concat(b))
        // arr = _one.map(x => `${playid}#${price}#${x}`)
        arr = obj.one.map(x => `${playid}#${price}#${x}`)
      } else if (obj.two.length === 3) {
        if (playid === 12) {
          // 数字盘
          arr = this.dwdtouzhu(obj, playid, price)
        } else {
          arr = [`${playid}#${price}#${obj.two[0]}+${obj.two[1]}+${obj.two[2]}`]
        }
      } else if (obj.two.length === 2) {
        arr = [`${playid}#${price}#${obj.two[0]}+${obj.two[1]}`]
      } else {
        arr = [`${playid}#${price}#${obj.one.join('+')}`]
      }
      return JSON.stringify(arr).replace('/\\/g', '')
    }
  }
  getPlaceHolder(playid) {
    switch (playid) {
      case 2:
        return '1 2 3'
    }
  }
  mutex(dataSet, name, curItem) {
    if ([0].includes(curItem.playid)) {
      // 互斥的号码一般为胆拖，两行
      const arr1 = dataSet[0].data.filter(x => x.checked),
        arr2 = dataSet[1].data.filter(x => x.checked) || []

      // 如果是第一行点击，则第二行球消失
      if (name === dataSet[0].name) {
        arr1.forEach(item => {
          const index = arr2.findIndex(x => x.name === item.name)
          if (index >= 0) arr2[index].checked = !arr2[index].checked
        })
        // 胆码最多只能选择三个或者两个
        if (curItem.playid === 5 && arr1.length > 2) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        }

        if (curItem.playid === 10 && arr1.length > 1) {
          arr1.filter(x => x.name !== curItem.name)[0].checked = false
        }
      }
      // 如果是第二行点击，则第一行球消失
      if (name === dataSet[1].name) {
        arr2.forEach(item => {
          const index = arr1.findIndex(x => x.name === item.name)
          if (index >= 0) arr1[index].checked = !arr1[index].checked
        })
        // 拖胆最多只能选择5个
        if (arr2.length > 5) {
          if (curItem.checked) {
            if (curItem.name === 1) arr2[1].checked = false
            else arr2[0].checked = false
          }
        }
      }
    }
  }

  assemblyBetData({
    gameid,
    dataSet,
    danshiExcl,
    playid,
    price,
    qishu,
    token
  }) {
    // console.error('getData', this.getData(dataSet, playid, price))
    return {
      gameid,
      qishu,
      data: this.getSubmitData(dataSet, playid, price, danshiExcl),
      auto: 1,
      stop: 1,
      multiple: 1,
      form_unique_token: token
    }
  }
}
export default new ThreeD()
