import UserMsg from './userMsg.vue'
import UserMsgBet from './userMsgBet.vue'
import System from './system.vue'
import MassMsg from './massMsg.vue'
import OtherBet from './massMsgBet'
import Warning from './warning'
import { mapState } from 'vuex'
export default {
  name: 'chatItem',
  props: ['data'],
  computed: {
    ...mapState(['chatRoom'])
  },
  components: { UserMsg, System, MassMsg, OtherBet, UserMsgBet, Warning },
  render() {
    console.log(this.data)
    switch (this.data.group) {
      case 'SYSTEM':
        return <System item={this.data} />
      case 'USER':
        return <UserMsg item={this.data} />
      case 'WARNING':
        return <Warning item={this.data} />
      case 'TALK_OTHER':
        return <MassMsg item={this.data} />
      case 'USER_BET':
        return <UserMsgBet item={this.data} />
      case 'OTHER_BET':
        return (
          <OtherBet
            item={this.data}
            onbet={this.chatRoom.touzhu_on}
            onFollow={item => {
              this.$emit('follow', item)
            }}
          />
        )
    }
  }
}
