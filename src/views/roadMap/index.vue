<template>
  <div class="paper">
    <heads></heads>
    <papertemplate></papertemplate>
  </div>
</template>
<script>
import heads from './heads'
import papertemplate from './components/papertemplate'
import { mapActions, mapState } from 'vuex'
export default {
    data() {
        return {
            data: []
        }
    },
    mounted() {},
    watch: {},
    created() {},
    components: {
        heads,
        papertemplate
    },
    methods: {}
}
</script>
<style lang="scss" scoped>
@import '../../css/resources.scss';
.paper {
}
</style>
