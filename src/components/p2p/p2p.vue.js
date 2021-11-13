import { BaseEntity, myself } from 'libcolla'
import { p2pPeer } from 'libcolla'
import { chatAction } from 'libcolla'
import { config } from 'libcolla'
import { peerClientService } from 'libcolla'
import { webrtcPeerPool } from 'libcolla'
import { findClientAction } from 'libcolla'

export default {
  name: 'P2pPeer',
  components: {},
  data() {
    return {
      subKind: 'default',
      address: '/ip4/192.168.1.104/tcp/4720/ws/p2p/12D3KooWG5Wfr78xSecMNeYDXmkP7vZ2YoJsqhHbCSXpBFsqiN86',
      message: 'hello',
      targetPeerId: '12D3KooWG5Wfr78xSecMNeYDXmkP7vZ2YoJsqhHbCSXpBFsqiN86',
      p2pPeer: {
        peerId: p2pPeer.peerId.toB58String(),
        address: myself.myselfPeer.address,
        chainProtocolID: p2pPeer.chainProtocolID,
        topic: null,
        Rendezvous: null
      },
      peerStore: {
        peers: []
      },
      connection: {
        peers: []
      },
      webrtcPeer: null
    }
  },
  methods: {
    refreshPeerStore: function () {
      this.peerStore.peers = []
      for (let [peerIdString, peer] of p2pPeer.peerStore.peers.entries()) {
        this.peerStore.peers.push({
          id: peerIdString,
          addresses: peer.addresses,
          metadata: peer.metadata,
          protocols: peer.protocols
        })
      }
    },
    refreshConnection: function () {
      this.connection.peers = []
      for (const [peerId, connections] of p2pPeer.connections) {
        for (const connection of connections) {
          this.connection.peers.push({
            peerId: peerId,
            remoteAddr: connection.remoteAddr.toString()
          })
        }
      }
    },
    dial: async function () {
      let conn = await p2pPeer.dial(this.address)
      console.info(conn)
    },
    hangUp: async function () {
      let conn = await p2pPeer.hangUp(this.address)
      console.info(conn)
    },
    dialProtocol: async function () {
      let pipe = await p2pPeer.dialProtocol(this.address, p2pPeer.chainProtocolId)
      console.info(pipe)
    },
    ping: async function () {
      let t = await p2pPeer.ping(this.address)
      console.info(t)
    },
    chat: async function () {
      await chatAction.chat(this.address, this.message, this.targetPeerId)
    },
    putPeerClient: async function () {
      await peerClientService.putPeerClient(config.appParams.connectPeerId[0], 'Up')
    },
    connect: async function () {
      this.webrtcPeer = await webrtcPeerPool.create(this.targetPeerId)
    },
    destroy: async function () {
      await this.webrtcPeer.destroy('')
    },
    findClient: async function () {
      let peerClients = await peerClientService.getPeerClient(null, '12D3KooWAamZrQPcApcWGbyAoS6vSyoZJQLEd8W4T68brc6HS2oi', '13609619603')
      console.info(peerClients)
    }
  },
  watch: {

  }
}
