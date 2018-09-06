<template>
  <div class="sousuo">
    <searchss :result="result" fullpage v-model="title"></searchss>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import searchss from './search.vue'
// 截流函数
const delay = (function() {
    let timer = 0
    return function(callback, ms) {
        clearTimeout(timer)
        timer = setTimeout(callback, ms)
    }
})()
export default {
    name: 'searchs',
    data() {
        return {
            title: '',
            result: [],
            val: ''
        }
    },
    mounted() {},
    watch: {
        // 截流函数,当用户每次点击键盘之间超过300ms就发送请求，否则不请求
        title(val) {
            if (val == '') {
                return
            } else {
                delay(() => {
                    this.getResult(val)
                }, 300)
            }
        }
    },
    components: {
        searchss
    },
    computed: {
        ...mapState({ tag: state => state.youxi.tag })
    },
    methods: {
        getResult(val) {
            this.$dialog.loading.open(' ')
            this.$ajax('request', {
                ac: 'SearchGameList',
                tag: this.tag,
                game_name: this.title
            }).then(response => {
                this.resultlist = response
                this.result = this.resultlist
                this.$dialog.loading.close()
            })
            if (!val) return []
        }
    }
}
</script>
<style lang="scss" scoped>
@import '~css/resources.scss';
.sousuo {
    margin-top: 3rem;
}
</style>
<style lang="scss">
.sousuo {
    .yd-search.yd-search-fly.yd-search-show {
        top: 3rem !important;
    }
}
</style>