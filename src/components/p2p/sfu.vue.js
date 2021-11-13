import { ionSfuClientPool } from 'libcolla'

export default {
  name: 'P2pPeer',
  components: {},
  data() {
    return {
      subKind: 'default',
      address: '/dns4/localhost/tcp/5720/wss/p2p/12D3KooWG5Wfr78xSecMNeYDXmkP7vZ2YoJsqhHbCSXpBFsqiN86',
      message: 'hello',
      targetPeerId: '12D3KooWG5Wfr78xSecMNeYDXmkP7vZ2YoJsqhHbCSXpBFsqiN86',
      roomId: 'test room',
      ionSfuClient: null,
      localStream: null,
      remoteStreams: []
    }
  },
  methods: {
    join: async function () {
      this.ionSfuClient = await ionSfuClientPool.create(this.targetPeerId,
        {
          roomId: this.roomId,
          type: 'join'
        })
      if (this.ionSfuClientPool) {
        console.info('start connecting:' + this.targetPeerId)
      }
      this.regist()
    },
    destroy: async function () {
      this.localStream.stop()
      this.localStream = null
    },
    send: async function () {
      await ionSfuClientPool.send(this.targetPeerId, this.message)
    },
    playUser: async function () {
      let _that = this
      this.ionSfuClient.getUserMedia({
        video: true,
        audio: true
      }).then((stream) => {
        _that.localStream = stream
        let video0 = _that.$refs.video0
        video0.srcObject = stream
        video0.autoplay = true
        video0.controls = true
        video0.muted = true
        _that.ionSfuClient.publish(stream)
      }).catch(console.error)
    },
    playDisplay: async function () {
      let _that = this
      this.ionSfuClient.getDisplayMedia({
        video: true
      }).then((stream) => {
        _that.localStream = stream
        let video0 = _that.$refs.video0
        video0.srcObject = stream
        video0.autoplay = true
        video0.controls = true
        video0.muted = true
        _that.ionSfuClient.publish(stream)
      }).catch(console.error)
    },
    regist: function () {
      let _that = this
      this.ionSfuClient.ontrack((track, stream) => {
        console.log('got track', track.id, 'for stream', stream.id)
        for (let remoteStream of _that.remoteStreams) {
          if (remoteStream.id === stream.id) {
            return
          }
        }
        _that.remoteStreams.push(stream)
        if (track.kind === 'video') {
          track.onunmute = () => {
            let video = _that.$refs['video' + _that.remoteStreams.length]
            if (video) {
              video.srcObject = stream
              video.autoplay = true
              video.muted = true
              track.onremovetrack = () => { }
            }
          }
        }
      })
    }
  },
  watch: {

  }
}
