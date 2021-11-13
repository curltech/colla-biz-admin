import { EntityState } from 'libcolla'
import * as cookie from 'tiny-cookie'
import { dht } from '@/libs/dht'
export default {
  data() {
    return {
      kind: 'query',
      queryData: {
        peerId: null,
        addr: null,
        key: null
      },
      execData: {
        peerId: null,
        addr: null,
        key: null,
        value: null
      },
      host: {
        peerId: null,
        addrs: null,
        pubKey: null,
        protocols: null,
        peers: [],
        routingTables: []
      },
      result: {
        start: null,
        interval: null,
        value: null
      },
      columns: [
        {
          name: 'peerId',
          required: true,
          label: '编号',
          align: 'left',
          field: 'peerId',
          sortable: true
        },
        { name: 'addrs', align: 'left', label: '地址', field: 'addrs' },
        { name: 'pubKey', label: '公钥', field: 'pubKey' },
        { name: 'protocols', label: '协议', field: 'protocols' },
        { name: 'status', label: '状态', field: 'status' }
      ]
    }
  },
  computed: {
  },
  methods: {
    query() {
      let _that = this
      this.$refs['frmQuery'].validate().then(success => {
        if (success) {
          dht.host().then(result => {
            if (result) {
              _that.host.peerId = result.peerId
              _that.host.addrs = result.addrs
              _that.host.pubKey = result.pubKey
              _that.host.protocols = result.protocols
              _that.host.peers = result.peers
            }
          }).catch(error => {
            console.error(error)
          })
        }
      })
    },
    clear() {
      this.queryData = {}
    },
    findPeer() {
      let _that = this
      this.$refs['frmQuery'].validate().then(success => {
        if (success) {
          dht.findPeer().then(result => {
            if (result) {
              _that.host = result
            }
          }).catch(error => {
            console.error(error)
          })
        }
      })
    },
    listPeers() {
      let _that = this
      this.$refs['frmQuery'].validate().then(success => {
        if (success) {
          dht.listPeers().then(result => {
            if (result) {
              for (let data of result) {
                _that.host.routingTables.push(data)
              }
            }
          }).catch(error => {
            console.error(error)
          })
        }
      })
    },
    nearestPeers() {
      let _that = this
      this.$refs['frmQuery'].validate().then(success => {
        if (success) {
          dht.nearestPeers(_that.queryData.peerId).then(result => {
            if (result) {
              _that.host.routingTables.clear()
              for (let data of result) {
                _that.host.routingTables.push(data)
              }
            }
          }).catch(error => {
            console.error(error)
          })
        }
      })
    },
    connect() {
      let _that = this
      this.$refs['frmExec'].validate().then(success => {
        if (success) {
          let param = { PeerId: _that.execData.peerId, Addr: _that.execData.addr }
          dht.connect(param.PeerId, param.Addr).then(result => {
            if (result) {
              _that.result.start = result.start
              _that.result.interval = result.interval
              _that.result.value = result.value
            }
          }).catch(error => {
            _that.result.start = 0
            _that.result.interval = 0
            _that.result.value = error
          })
        }
      })
    },
    ping() {
      let _that = this
      this.$refs['frmExec'].validate().then(success => {
        if (success) {
          let param = { PeerId: _that.execData.peerId, Addr: _that.execData.addr }
          dht.ping(param.PeerId).then(result => {
            if (result) {
              _that.result.start = result.start
              _that.result.interval = result.interval
              _that.result.value = result.value
            }
          }).catch(error => {
            _that.result.start = 0
            _that.result.interval = 0
            _that.result.value = error
          })
        }
      })
    },
    chat() {
      let _that = this
      this.$refs['frmExec'].validate().then(success => {
        if (success) {
          let param = { PeerId: _that.execData.peerId, Value: _that.execData.value }
          dht.chat(param.PeerId, param.Value).then(result => {
            if (result) {
              _that.result.start = result.start
              _that.result.interval = result.interval
              _that.result.value = result.value
            }
          }).catch(error => {
            _that.result.start = 0
            _that.result.interval = 0
            _that.result.value = error
          })
        }
      })
    },
    chainPing() {
      let _that = this
      this.$refs['frmExec'].validate().then(success => {
        if (success) {
          let param = { PeerId: _that.execData.peerId, Addr: _that.execData.addr }
          dht.chainPing(param.PeerId).then(result => {
            if (result) {
              _that.result.start = result.start
              _that.result.interval = result.interval
              _that.result.value = result.value
            }
          }).catch(error => {
            _that.result.start = 0
            _that.result.interval = 0
            _that.result.value = error
          })
        }
      })
    },
    getValue() {

    }
  },
  mounted() {

  },
  created() {

  },
  watch: {
  }
}
