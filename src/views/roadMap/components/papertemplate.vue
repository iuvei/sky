<template>
  <div class="papertemplateabc">
    <yd-accordion accordion>
      <yd-accordion-item class="paper_zd" title="双面长龙排行" open>
        <ul class="ranking">
          <li class="ranking_list">
            <div class='ranking_list_xq' v-for="(item,index) in ba_dx_ds_hz_wdx.allKey" :key="index">
              <span class="right">{{ba_dx_ds_hz_wdx[item]}}</span>
            </div>
          </li>
        </ul>
      </yd-accordion-item>
      <yd-accordion-item class="paper_zd" title="双面路纸图" open>
        <ul class="shortcut_button">
          <li class="shortcut_button_li" v-if="datalb.length" v-for="(item, index) in datalb" :key="index" :class="{'active': activeIndex == index}" @click="paper_road(index)">{{item.title}}</li>
        </ul>
      </yd-accordion-item>
    </yd-accordion>
    <div class="value_form_top">
      <span>{{titlistbt}}</span>
      <!-- <div v-if="index == 0" v-for="(item, index) in ba555_gs" :key="index"> -->
      <div class="value_form_top_div">
        <i>{{ba745_hz_hr_wdx[0]}}</i>
        <i>({{ba745_hz_hr_wdx[2]}})</i>
        <i>{{ba745_hz_hr_wdx[1]}}</i>
        <i>({{ba745_hz_hr_wdx[3]}})</i>
      </div>
    </div>
    <div class="value_form">
      <ul class="value_form_aaaa">
        <li class="value_form_cccc" v-for="index in 100" :key="'row-0-'+index"></li>
      </ul>
      <ul class="value_form_aaaa">
        <li class="value_form_cccc" v-for="index in 100" :key="'row-0-'+index"></li>
      </ul>
      <ul class="value_form_aaaa">
        <li class="value_form_cccc" v-for="index in 100" :key="'row-1-'+index"></li>
      </ul>
      <ul class="value_form_aaaa">
        <li class="value_form_cccc" v-for="index in 100" :key="'row-2-'+index"></li>
      </ul>
      <ul class="value_form_aaaa">
        <li class="value_form_cccc" v-for="index in 100" :key="'row-3-'+index"></li>
      </ul>
    </div>
  </div>
</template>
<script>
const secondData = [
    // (ssc 0-2,4-13) (3d--0-2,3-9 )(11x5--0-13)
    { title: '总和-大小', key: 'bahz', titleto: '总和大小' },
    { title: '总和-单双', key: 'bahz', titleto: '总和单双' },
    { title: '总和-尾大小', key: 'hzwdx', titleto: '总和尾大小' },
    { title: '第一球-大小', key: 'ba_1', titleto: '第一球大小' },
    { title: '第一球-单双', key: 'ba_1', titleto: '第一球单双' },
    { title: '第二球-大小', key: 'ba_2', titleto: '第二球大小' },
    { title: '第二球-单双', key: 'ba_2', titleto: '第二球单双' },
    { title: '第三球-大小', key: 'ba_3', titleto: '第三球大小' },
    { title: '第三球-单双', key: 'ba_3', titleto: '第三球单双' },
    { title: '第四球-大小', key: 'ba_4', titleto: '第四球大小' },
    { title: '第四球-单双', key: 'ba_4', titleto: '第四球单双' },
    { title: '第五球-大小', key: 'ba_5', titleto: '第五球大小' },
    { title: '第五球-单双', key: 'ba_5', titleto: '第五球单双' },
    // k3 -- 0-2,13-19
    { title: '号码一-大小', key: 'ba_1', titleto: '号码一大小' },
    { title: '号码一-单双', key: 'ba_1', titleto: '号码一单双' },
    { title: '号码二-大小', key: 'ba_2', titleto: '号码二大小' },
    { title: '号码二-单双', key: 'ba_2', titleto: '号码二单双' },
    { title: '号码三-大小', key: 'ba_3', titleto: '号码三大小' },
    { title: '号码三-单双', key: 'ba_3', titleto: '号码三单双' },
    // pk10-- 19到34
    { title: '冠军-大小', key: 'ba_1', titleto: '冠军大小' },
    { title: '冠军-单双', key: 'ba_1', titleto: '冠军单双' },
    { title: '冠军-龙虎', key: 'ba_1lh', titleto: '冠军龙虎' },
    { title: '亚军-大小', key: 'ba_2', titleto: '亚军大小' },
    { title: '亚军-单双', key: 'ba_2', titleto: '亚军单双' },
    { title: '亚军-龙虎', key: 'ba_2lh', titleto: '亚军龙虎' },
    { title: '季军-大小', key: 'ba_3', titleto: '季军大小' },
    { title: '季军-单双', key: 'ba_3', titleto: '季军单双' },
    { title: '季军-龙虎', key: 'ba_3lh', titleto: '季军龙虎' },
    { title: '第四名-大小', key: 'ba_4', titleto: '第四名大小' },
    { title: '第四名-单双', key: 'ba_4', titleto: '第四名单双' },
    { title: '第四名-龙虎', key: 'ba_4lh', titleto: '第四名龙虎' },
    { title: '第五名-大小', key: 'ba_5', titleto: '第五名大小' },
    { title: '第五名-单双', key: 'ba_5', titleto: '第五名单双' },
    { title: '第五名-龙虎', key: 'ba_5lh', titleto: '第五名龙虎' },
    // pcdd --34到36
    { title: '特码-大小', key: 'ba_4', titleto: '特码大小' },
    { title: '特码-单双', key: 'ba_4', titleto: '特码单' }
]
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            ba_dx_ds_hz_wdx: { allKey: [] },
            ba745_hz_hr_wdx: [],
            ba555_gs: [],
            titlistbt: [],
            arrStr: [],
            datalb: [],
            activeIndex: 0,
            data: [],
            pageid: 0,
            btnTitArrSsc: [
                ...secondData.slice(0, 2),
                ...secondData.slice(4, 13)
            ],
            btnTitArrEleven: [...secondData.slice(0, 13)],
            btnTitArrSand: [
                ...secondData.slice(0, 2),
                ...secondData.slice(3, 9)
            ],
            btnTitArrPk10: [...secondData.slice(19, 34)],
            btnTitArrPcdd: [...secondData.slice(34, 36)],
            btnTitArrK3: [
                ...secondData.slice(0, 2),
                ...secondData.slice(13, 19)
            ]
        }
    },
    computed: {
        ...mapState({
            js_tag: state => state.betting.js_tag,
            name_tag: state => state.betting.name_tag,
            gameId: state => state.betting.gameId
        })
    },
    activated() {
        if (this.js_tag == '') {
            return
        } else {
            this._getKjCpLogData()
            this.getHeads()
        }
    },
    mounted() {
    },
    created() {},
    components: {},
    watch: {},
    deactivated() {
        this.data = []
    },
    methods: {
        // 双面路纸图
        paper_road(i) {
            this.activeIndex = i
            this.titlistbt = this.datalb[this.activeIndex].titleto
            if (this.js_tag == '') {
                return
            } else {
                this._scrollTableView(this.data)
            }
        },
        // 按js_tag 渲染对应的
        getHeads() {
            const headObj = {
                ssc: this.btnTitArrSsc,
                '3d': this.btnTitArrSand,
                '11x5': this.btnTitArrEleven,
                pk10: this.btnTitArrPk10,
                pcdd: this.btnTitArrPcdd,
                k3: this.btnTitArrK3
            }
            this.datalb = headObj[this.js_tag] || []
            this.titlistbt = this.datalb[this.activeIndex].titleto
        },
        // 请求数据
        _getKjCpLogData() {
            if (this.js_tag == '') {
                return
            }
            this.$dialog.loading.open(' ')
            this.$ajax('request', {
                ac: 'getKjCpLog',
                tag: this.name_tag,
                date: '',
                pcount: 20,
                pageid: this.pageid
            }).then(response => {
                const _data = response
                if (response.length > 0) {
                    this.data = [...this.data, ..._data]
                    if (this.pageid == 5) {
                        this.pageid = 0
                        this._allData(this.data)
                    } else {
                        this.pageid += 1
                        this._getKjCpLogData()
                    }
                } else {
                    if (this.data.length > 0) {
                        this._allData(this.data)
                    }
                }
                this.$dialog.loading.close()
            })
        },
        // 方法数据
        _allData(data) {
            this.ba_dx_ds_hz_wdx = this._handleChangLongPaiHang(data)
            this.ba123_hz_hr_wdx = this._handleData(data)
            this.ba745_hz_hr_wdx = this._scrollTableView(data)
            this.ba555_gs = this._countElement()
            console.error(1);
        },

        // 处理长龙
        _handleChangLongPaiHang(data) {
            let ba_dx_ds_hz_wdx = {}
            let titleArr = ['第一球', '第二球', '第三球', '第四球', '第五球']
            let keyArr = []
            let ba_ov = 0 // 大于ov 则为大。
            let baZH_ov = 0
            if (this.js_tag == 'k3') {
                ba_ov = 4 // 小：0-3， 大：4-6
                baZH_ov = 11 // 总和 小：3-10，大：11-18，单双
                titleArr = ['号码一', '号码二', '号码三']
                keyArr = [
                    'dx_1',
                    'ds_1',
                    'dx_2',
                    'ds_2',
                    'dx_3',
                    'ds_3',
                    'hzdx',
                    'hzds'
                ]
            } else if (this.js_tag == '3d') {
                ba_ov = 5 // 小：0-4， 大：5-9
                baZH_ov = 14 // 总和 小：0-13，大：14-27，单双
                keyArr = [
                    'dx_1',
                    'ds_1',
                    'dx_2',
                    'ds_2',
                    'dx_3',
                    'ds_3',
                    'hzdx',
                    'hzds'
                ]
            } else if (this.js_tag == 'pcdd') {
                ba_ov = 14 // 特码 小：0-13，大：14-27
                titleArr = ['', '', '', '特码']
                keyArr = ['dx_4', 'ds_4']
            } else if (this.js_tag == 'ssc') {
                ba_ov = 5 // 小：0-4， 大：5-9
                baZH_ov = 23 // 总和 小：0-22，大：23-45，单双
                keyArr = [
                    'dx_1',
                    'ds_1',
                    'dx_2',
                    'ds_2',
                    'dx_3',
                    'ds_3',
                    'dx_4',
                    'ds_4',
                    'dx_5',
                    'ds_5',
                    'hzdx',
                    'hzds'
                ]
            } else if (this.js_tag == '11x5') {
                ba_ov = 6 // 小：1-5， 大：6-11
                baZH_ov = 30 // 总和 小：15-29，大：30-45，尾小0-4，尾大5-9，单双
                keyArr = [
                    'dx_1',
                    'ds_1',
                    'dx_2',
                    'ds_2',
                    'dx_3',
                    'ds_3',
                    'dx_4',
                    'ds_4',
                    'dx_5',
                    'ds_5',
                    'hrhzdx',
                    'hrhzds',
                    'hzwdx',
                    'hzdx',
                    'hzds'
                ]
            } else if (this.js_tag == 'pk10') {
                ba_ov = 6 // 小：1-5， 大：6-10
                titleArr = ['冠军', '亚军', '季军', '第四名', '第五名']
                keyArr = [
                    'dx_1',
                    'ds_1',
                    'lh_1',
                    'dx_2',
                    'ds_2',
                    'lh_2',
                    'dx_3',
                    'ds_3',
                    'lh_3',
                    'dx_4',
                    'ds_4',
                    'lh_4',
                    'dx_5',
                    'ds_5',
                    'lh_5'
                ]
            }
            let len = data.length > 20 ? 20 : data.length
            for (let i = 0; i < len; i++) {
                // 先判断balls字段
                let ballsArr =
                    data[i].balls && data[i].balls.length > 1
                        ? data[i].balls.split('+')
                        : []
                let sumHZ = this._sumResults(ballsArr) // 总和值
                for (
                    let j = this.js_tag == 'pcdd' ? 3 : 0;
                    j < (this.js_tag == 'pk10' ? 5 : ballsArr.length);
                    j++
                ) {
                    let ball = ballsArr[j]
                    // 记录每一位号码的大小单双状态。
                    let dx = `${ball < ba_ov ? '小' : '大'}` // 大小
                    let ds = `${ball % 2 == 0 ? '双' : '单'}` // 单双
                    let lh = '' // 龙虎
                    if (this.js_tag == 'pk10') {
                        lh = `${ball > ballsArr[10 - j - 1] ? '龙' : '虎'}`
                    }

                    if (ba_dx_ds_hz_wdx[`dx_${j + 1}`] == null) {
                        // 最新一期的开奖号码，直接赋值给ba_dx_ds_hz_wdx
                        ba_dx_ds_hz_wdx[`dx_${j + 1}`] =
                            i == len - 1 ? `${titleArr[j]}-${dx}：1` : `${dx}1`
                        ba_dx_ds_hz_wdx[`ds_${j + 1}`] =
                            i == len - 1 ? `${titleArr[j]}-${ds}：1` : `${ds}1`

                        if (this.js_tag == 'pk10') {
                            ba_dx_ds_hz_wdx[`lh_${j + 1}`] =
                                i == len - 1
                                    ? `${titleArr[j]}-${lh}：1`
                                    : `${lh}1`
                        }
                    } else {
                        // 往期的开奖号码对比，改变ba_dx_ds_hz_wdx的值。
                        if (!ba_dx_ds_hz_wdx[`dx_${j + 1}`].includes('：')) {
                            // 包含：冒号的是已经对比到结果了。
                            if (ba_dx_ds_hz_wdx[`dx_${j + 1}`].includes(dx)) {
                                // 包含这一期的dx，但不包含：冒号
                                ba_dx_ds_hz_wdx[`dx_${j + 1}`] =
                                    i == len - 1
                                        ? `${titleArr[j]}-${dx}：${parseInt(
                                              ba_dx_ds_hz_wdx[
                                                  `dx_${j + 1}`
                                              ].substr(1)
                                          ) + 1}`
                                        : `${dx}${parseInt(
                                              ba_dx_ds_hz_wdx[
                                                  `dx_${j + 1}`
                                              ].substr(1)
                                          ) + 1}`
                            } else {
                                // 碰到不同的。加个冒号区分
                                ba_dx_ds_hz_wdx[`dx_${j + 1}`] = `${
                                    titleArr[j]
                                }-${ba_dx_ds_hz_wdx[`dx_${j + 1}`].substr(
                                    0,
                                    1
                                )}：${ba_dx_ds_hz_wdx[`dx_${j + 1}`].substr(1)}`
                            }
                        }

                        if (!ba_dx_ds_hz_wdx[`ds_${j + 1}`].includes('：')) {
                            if (ba_dx_ds_hz_wdx[`ds_${j + 1}`].includes(ds)) {
                                ba_dx_ds_hz_wdx[`ds_${j + 1}`] =
                                    i == len - 1
                                        ? `${titleArr[j]}-${ds}：${parseInt(
                                              ba_dx_ds_hz_wdx[
                                                  `ds_${j + 1}`
                                              ].substr(1)
                                          ) + 1}`
                                        : `${ds}${parseInt(
                                              ba_dx_ds_hz_wdx[
                                                  `ds_${j + 1}`
                                              ].substr(1)
                                          ) + 1}`
                            } else {
                                ba_dx_ds_hz_wdx[`ds_${j + 1}`] = `${
                                    titleArr[j]
                                }-${ba_dx_ds_hz_wdx[`ds_${j + 1}`].substr(
                                    0,
                                    1
                                )}：${ba_dx_ds_hz_wdx[`ds_${j + 1}`].substr(1)}`
                            }
                        }

                        if (this.js_tag == 'pk10') {
                            if (
                                !ba_dx_ds_hz_wdx[`lh_${j + 1}`].includes('：')
                            ) {
                                if (
                                    ba_dx_ds_hz_wdx[`lh_${j + 1}`].includes(lh)
                                ) {
                                    ba_dx_ds_hz_wdx[`lh_${j + 1}`] =
                                        i == len - 1
                                            ? `${titleArr[j]}-${lh}：${parseInt(
                                                  ba_dx_ds_hz_wdx[
                                                      `lh_${j + 1}`
                                                  ].substr(1)
                                              ) + 1}`
                                            : `${lh}${parseInt(
                                                  ba_dx_ds_hz_wdx[
                                                      `lh_${j + 1}`
                                                  ].substr(1)
                                              ) + 1}`
                                } else {
                                    ba_dx_ds_hz_wdx[`lh_${j + 1}`] = `${
                                        titleArr[j]
                                    }-${ba_dx_ds_hz_wdx[`lh_${j + 1}`].substr(
                                        0,
                                        1
                                    )}：${ba_dx_ds_hz_wdx[`lh_${j + 1}`].substr(
                                        1
                                    )}`
                                }
                            }
                        }
                    }

                    if (
                        j == ballsArr.length - 1 &&
                        this.js_tag != 'pcdd' &&
                        this.js_tag != 'pk10'
                    ) {
                        // 记录总和值大小单双，和值尾大小，后二和值，状态
                        let hzdx = `${sumHZ < baZH_ov ? '小' : '大'}` // 和值大小
                        let hzds = `${sumHZ % 2 == 0 ? '双' : '单'}` // 和值单双
                        let dxdsKeyArr = ['hzdx', 'hzds']
                        let dxdsValueArr = [hzdx, hzds]
                        if (this.js_tag == '11x5' && ballsArr.length == 5) {
                            // 11x5,有尾大小，后二大小单双
                            let hzwdx = `${
                                parseInt(`${sumHZ}`.substr(-1)) >= 5
                                    ? '尾大'
                                    : '尾小'
                            }` // 和值尾大尾小
                            let hrhzInt = this._sumResults([
                                ballsArr[3],
                                ballsArr[4]
                            ])
                            let hrhzdx = hrhzInt < 12 ? '小' : '大' // 后二和值大小； 小：3-11，大：12-21
                            let hrhzds = hrhzInt % 2 == 0 ? '双' : '单' // 后二和值单双

                            dxdsKeyArr = [
                                'hzdx',
                                'hzds',
                                'hrhzdx',
                                'hrhzds',
                                'hzwdx'
                            ]
                            dxdsValueArr = [hzdx, hzds, hrhzdx, hrhzds, hzwdx]
                        }

                        for (let x = 0; x < dxdsKeyArr.length; x++) {
                            let tit = dxdsKeyArr[x].includes('hr')
                                ? '后二和'
                                : '总和'
                            if (ba_dx_ds_hz_wdx[dxdsKeyArr[x]] == null) {
                                // 最新一期的开奖号码
                                ba_dx_ds_hz_wdx[dxdsKeyArr[x]] =
                                    i == len - 1
                                        ? `${tit}-${dxdsValueArr[x]}：1`
                                        : `${dxdsValueArr[x]}1`
                            } else {
                                // 往期的开奖号码对比，改变ba_dx_ds_hz_wdx的值。 截取的长度是value值的长度。
                                if (
                                    !ba_dx_ds_hz_wdx[dxdsKeyArr[x]].includes(
                                        '：'
                                    )
                                ) {
                                    if (
                                        ba_dx_ds_hz_wdx[dxdsKeyArr[x]].includes(
                                            dxdsValueArr[x]
                                        )
                                    ) {
                                        ba_dx_ds_hz_wdx[dxdsKeyArr[x]] =
                                            i == len - 1
                                                ? `${tit}-${
                                                      dxdsValueArr[x]
                                                  }：${parseInt(
                                                      ba_dx_ds_hz_wdx[
                                                          dxdsKeyArr[x]
                                                      ].substr(
                                                          dxdsValueArr[x].length
                                                      )
                                                  ) + 1}`
                                                : `${dxdsValueArr[x]}${parseInt(
                                                      ba_dx_ds_hz_wdx[
                                                          dxdsKeyArr[x]
                                                      ].substr(
                                                          dxdsValueArr[x].length
                                                      )
                                                  ) + 1}`
                                    } else {
                                        ba_dx_ds_hz_wdx[
                                            dxdsKeyArr[x]
                                        ] = `${tit}-${ba_dx_ds_hz_wdx[
                                            dxdsKeyArr[x]
                                        ].substr(
                                            0,
                                            dxdsValueArr[x].length
                                        )}：${ba_dx_ds_hz_wdx[
                                            dxdsKeyArr[x]
                                        ].substr(dxdsValueArr[x].length)}`
                                    }
                                }
                            }
                        }
                    }
                }
            }
            ba_dx_ds_hz_wdx['allKey'] = keyArr
            return ba_dx_ds_hz_wdx
        },
        // 数据转换状态
        _handleData(data) {
            let ba123_hz_hr_wdx = {}
            for (let i = 0; i < data.length; i++) {
                // 先判断balls字段
                let ballsArr =
                    data[i].balls && data[i].balls.length > 1
                        ? data[i].balls.split('+')
                        : []
                let sumHZ = this._sumResults(ballsArr)
                for (
                    let j = this.js_tag == 'pcdd' ? 3 : 0;
                    j < (this.js_tag == 'pk10' ? 5 : ballsArr.length);
                    j++
                ) {
                    if (ba123_hz_hr_wdx[`ba_${j + 1}`] == null) {
                        ba123_hz_hr_wdx[`ba_${j + 1}`] = [parseInt(ballsArr[j])]
                    } else {
                        ba123_hz_hr_wdx[`ba_${j + 1}`].push(
                            parseInt(ballsArr[j])
                        )
                    }
                    if (this.js_tag == 'pk10') {
                        let lh = `${
                            ballsArr[j] > ballsArr[10 - j - 1] ? '龙' : '虎'
                        }`
                        if (ba123_hz_hr_wdx[`ba_${j + 1}lh`] == null) {
                            ba123_hz_hr_wdx[`ba_${j + 1}lh`] = [lh]
                        } else {
                            ba123_hz_hr_wdx[`ba_${j + 1}lh`].push(lh)
                        }
                    }
                    if (
                        j == ballsArr.length - 1 &&
                        this.js_tag != 'pcdd' &&
                        this.js_tag != 'pk10'
                    ) {
                        // 总和值
                        if (ba123_hz_hr_wdx['bahz'] == null) {
                            ba123_hz_hr_wdx['bahz'] = [sumHZ]
                        } else {
                            ba123_hz_hr_wdx['bahz'].push(sumHZ)
                        }

                        if (this.js_tag == '11x5') {
                            // 和值尾大小， 后二和值
                            if (ba123_hz_hr_wdx['hzwdx'] == null) {
                                ba123_hz_hr_wdx['hzwdx'] = [
                                    //解析字符串，并返回一个整数
                                    parseInt(`${sumHZ}`.substr(-1))
                                ]
                                ba123_hz_hr_wdx['hrhz'] = [
                                    parseInt(ballsArr[3]) +
                                        parseInt(ballsArr[4])
                                ]
                            } else {
                                ba123_hz_hr_wdx['hzwdx'].push(
                                    parseInt(`${sumHZ}`.substr(-1))
                                )
                                ba123_hz_hr_wdx['hrhz'].push(
                                    parseInt(ballsArr[3]) +
                                        parseInt(ballsArr[4])
                                )
                            }
                        }
                    }
                }
            }
            // if (ba123_hz_hr_wdx[0] != null && ba123_hz_hr_wdx[0] != '?') {
            //     ba123_hz_hr_wdx.splice(0, 0, '?') // ？号下一期的
            // }
            return ba123_hz_hr_wdx
        },
        // 数据渲染小格子
        _scrollTableView(data) {
            // 切换清空上次
            let uls = document
                .querySelector('.value_form')
                .querySelectorAll('ul')
            for (let k = 0; k < uls.length; k++) {
                for (let n = 0; n < uls[k].querySelectorAll('li').length; n++) {
                    uls[k].querySelectorAll('li')[n].innerHTML = ''
                    uls[k].querySelectorAll('li')[n].style.color = '#494949'
                    uls[k].querySelectorAll('li')[n].id = ''
                }
            }
            let titlist = this.datalb[this.activeIndex].title
            console.log('titlist====', titlist)
            let tit = this.ba123_hz_hr_wdx[this.datalb[this.activeIndex].key] // 被点击对应的数据
            let ba745_hz_hr_wdx = []
            let ba_ov = 0,
                bahz_ov = 0
           
            if (this.js_tag == 'k3') {
                ba_ov = 4
                bahz_ov = 10
            } else if (this.js_tag == '3d') {
                ba_ov = 5
                bahz_ov = 14
            } else if (this.js_tag == 'pcdd') {
                ba_ov = 14
                bahz_ov = 14
            } else if (this.js_tag == '11x5') {
                ba_ov = 6
                bahz_ov = 28
            } else if (this.js_tag == 'ssc') {
                ba_ov = 5
                bahz_ov = 23
            } else if (this.js_tag == 'pk10') {
                ba_ov = 6
                bahz_ov = 6
            }
            if (titlist.includes('总和-大小')) {
                tit.forEach(e => {
                    ba745_hz_hr_wdx.push(e < bahz_ov ? '小' : '大')
                })
            } else if (titlist.includes('单双')) {
                tit.forEach(e => {
                    ba745_hz_hr_wdx.push(e % 2 == 0 ? '双' : '单')
                })
            } else if (titlist.includes('大小')) {
                tit.forEach(e => {
                    ba745_hz_hr_wdx.push(e < ba_ov ? '小' : '大')
                })
            } else if (titlist.includes('龙虎')) {
                tit.forEach(e => {
                    ba745_hz_hr_wdx.push(e)
                })
            }
            ba745_hz_hr_wdx.reverse()
            ba745_hz_hr_wdx.push('?')
            let arr = []
            let n1 = 1
            let n2 = 1
            let l = 1
            for (let i = 0; i < ba745_hz_hr_wdx.length; i++) {
                if (i !== 0) {
                    if (ba745_hz_hr_wdx[i] == ba745_hz_hr_wdx[i - 1]) {
                        if (arr.indexOf(n2 + ',' + (l + 1)) != -1) {
                            n2++
                        } else {
                            if (l == 5) {
                                n2++
                            } else {
                                l++
                            }
                        }
                    } else {
                        l = 1
                        n1++
                        n2 = n1
                    }
                }
                arr.push(n2 + ',' + l)
            }
            for (let j = 0; j < arr.length; j++) {
                uls[arr[j].split(',')[1] * 1 - 1].querySelectorAll('li')[
                    arr[j].split(',')[0] * 1 - 1
                ].innerHTML =
                    ba745_hz_hr_wdx[j]
                if (
                    ba745_hz_hr_wdx[j] == '双' ||
                    ba745_hz_hr_wdx[j] == '小' ||
                    ba745_hz_hr_wdx[j] == '虎'
                ) {
                    uls[arr[j].split(',')[1] * 1 - 1].querySelectorAll('li')[
                        arr[j].split(',')[0] * 1 - 1
                    ].style.color =
                        '#e33939'
                }
                if (ba745_hz_hr_wdx[j] == '?') {
                    uls[arr[j].split(',')[1] * 1 - 1].querySelectorAll('li')[
                        arr[j].split(',')[0] * 1 - 1
                    ].style.color =
                        '#fa0'
                }
                if (ba745_hz_hr_wdx[j] == '?') {
                    uls[arr[j].split(',')[1] * 1 - 1].querySelectorAll('li')[
                        arr[j].split(',')[0] * 1 - 1
                    ].id =
                        'classVal'
                }
            }
            // 设置?滚动到可视化
            window.setTimeout(() => {
                document.querySelector('.value_form').scrollLeft = 0
                document.getElementById('classVal').scrollIntoView()
            }, 80)
            // 统计个数
            let oneCont = 0, twoCont = 0
            let hmd = 0,
                hmx = 0
            if (ba745_hz_hr_wdx.length > 0) {
                ba745_hz_hr_wdx.forEach(e => {
                    if (e == '大' || e == '单' || e == '龙') {
                        oneCont += 1
                    } else if (e != '?') {
                        twoCont += 1
                    }
                    if (e == '大') {
                        hmd = e
                    } else if (e == '小') {
                        hmx = e
                    } else if (e == '单') {
                        hmd = e
                    } else if (e == '双') {
                        hmx = e
                    } else if (e == '龙') {
                        hmd = e
                    } else if (e == '虎') {
                        hmx = e
                    }
                })
            }
            console.error('oneCont==', hmd, hmx, oneCont, twoCont)
            this.ba745_hz_hr_wdx = [hmd, hmx, oneCont, twoCont]
            return [hmd, hmx, oneCont, twoCont]
        },
        // 计算数组总和
        _sumResults(ballsAr) {
            let sumBall = 0
            for (let a = 0; a < ballsAr.length; a++) {
                let ball = parseInt(ballsAr[a])
                sumBall += ball
            }
            return sumBall
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../css/resources.scss';
.papertemplateabc {
    width: 100%;
    flex: 1;
    height: calc(100% - 5.4rem);
    margin-top: poTorem(86px);
    .paper_zd {
        //双面长龙排行
        .ranking {
            width: 100%;
            .ranking_list {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                align-items: center;
                .ranking_list_xq {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    color: #494949;
                    width: 50%;
                    height: poTorem(35px);
                    font-size: poTorem(18px);
                    border-bottom: poTorem(1px) solid #ece8e8;
                    .right {
                        width: poTorem(150px);
                        display: flex;
                        justify-content: flex-start;
                        align-items: center;
                        padding-left: poTorem(15px);
                    }
                }
            }
        } // 双面路纸图
        .shortcut_button {
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            border-bottom: 0 solid #f3f3f3 !important;
            .shortcut_button_li {
                width: 28%;
                height: poTorem(28px);
                display: flex;
                justify-content: space-around;
                align-items: center;
                font-size: 1.1rem;
                color: #5f5f5f;
                margin: poTorem(7px) poTorem(10px);
                box-shadow: 0px 0px poTorem(5px) #e5e5e5;
                border-radius: poTorem(6px);
            }
            .active {
                background: #e33939;
                color: #fff;
            }
        }
    } // 表头
    .value_form_top {
        width: 94.5%;
        height: poTorem(35px);
        font-size: 1rem;
        background: #f3f3f3;
        margin: 0 2.8%;
        color: #494949;
        display: flex;
        justify-content: center;
        align-items: center;
        .value_form_top_div {
            margin-left: poTorem(10px);
        }
    } // 表格
    .value_form {
        width: 100%;
        overflow: auto;
        .value_form_aaaa {
            width: poTorem(3000px);
            margin-left: 3%;
            border-left: poTorem(1px) solid #ece8e8;
            display: flex;
            flex-wrap: nowrap;
            .value_form_cccc {
                width: poTorem(30px);
                height: poTorem(30px);
                font-size: 1rem;
                color: #494949;
                display: flex;
                justify-content: center;
                align-items: center;
                border-right: poTorem(1px) solid #ece8e8;
                border-bottom: poTorem(1px) solid #ece8e8;
            }
        }
    }
}
</style>