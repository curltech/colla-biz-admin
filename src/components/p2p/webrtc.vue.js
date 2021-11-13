import { webrtcPeerPool } from 'libcolla'

export default {
  name: 'P2pPeer',
  components: {},
  data() {
    return {
      subKind: 'default',
      address: '/ip4/192.168.1.104/tcp/5720/wss/p2p/12D3KooWG5Wfr78xSecMNeYDXmkP7vZ2YoJsqhHbCSXpBFsqiN86',
      message: 'hello',
      targetPeerId: '12D3KooWG5Wfr78xSecMNeYDXmkP7vZ2YoJsqhHbCSXpBFsqiN86',
      roomId: 'test room',
      webrtcPeer: null,
      stream: null
    }
  },
  methods: {
    connect: async function () {
      this.webrtcPeer = await webrtcPeerPool.create(this.targetPeerId,
        {
          roomId: this.roomId,
          action: 'join',
          type: 'sfu',
          identity: 'pubsub'
        })
      if (this.webrtcPeer) {
        console.info('start connecting:' + this.targetPeerId)
      }
      this.regist()
    },
    destroy: async function () {
      this.stream.stop()
      this.stream = null
    },
    send: async function () {
      await webrtcPeerPool.send(this.targetPeerId, this.message)
    },
    playUser: async function () {
      let _that = this
      navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      }).then(async (stream) => {
        _that.stream = stream
        let video1 = _that.$refs.video1
        if ('srcObject' in video1) {
          video1.srcObject = stream
        } else {
          video1.src = window.URL.createObjectURL(stream) // for older browsers
        }
        video1.play()
        await _that.webrtcPeer.addStream(stream)
      }).catch(() => { })
    },
    playDisplay: async function () {
      let _that = this
      navigator.mediaDevices.getDisplayMedia({
        video: true
      }).then(async (stream) => {
        _that.stream = stream
        let video1 = _that.$refs.video1
        if ('srcObject' in video1) {
          video1.srcObject = stream
        } else {
          video1.src = window.URL.createObjectURL(stream) // for older browsers
        }
        video1.play()
        await _that.webrtcPeer.addStream(stream)
      }).catch(() => { })
    },
    regist: function () {
      let _that = this
      webrtcPeerPool.registEvent('stream', event => {
        let stream = event.stream
        let source = event.source
        console.info('receive stream:' + source)
        var video2 = _that.$refs.video2
        if ('srcObject' in video2) {
          video2.srcObject = stream
        } else {
          video2.src = window.URL.createObjectURL(stream) // for older browsers
        }
        //video2.play()
      })
    }
  },
  watch: {

  }
}
