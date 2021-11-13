import { Websocket, websocketPool } from 'libcolla'

export default {
  name: 'Websocket',
  components: {},
  data() {
    return {
      subKind: 'default',
      address: 'wss://localhost:9090/websocket',
      message: 'hello',
      websocket: null
    }
  },
  methods: {
    send: async function () {
      let msg=''
      for (let i=0;i<250000;++i){
        msg=msg+'hello1234567890hello'
      }
      console.info('current timestamp:'+new Date())
      await this.websocket.send(msg)
    },
    connect: async function () {
      this.websocket = await websocketPool.get(this.address)
    }
  },
  watch: {

  }
}
