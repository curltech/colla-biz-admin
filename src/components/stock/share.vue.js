import {EntityState} from 'libcolla'
import * as cookie from 'tiny-cookie'
import {RemoteDbEntity} from '@/libs/remotedb'
import {exportTable} from "@/libs/utils"

export default {
  data() {
    return {
      remoteDbEntity: new RemoteDbEntity('share'),
      kind: 'query',
      filter: "",
      mode: "list",
      queryData: {
        ts_code: '',
        name: '',
        industry: ''
      },
      queryChanged: true,
      loading: false,
      pagination: {
        sortBy: 'tscode',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 0
      },
      data: [],
      selected: [],
      dlgUpload: false,
      uploadAddress: window.localStorage.getItem('peerAddress') + '/upload',
      uploadHeaders: [{name: 'Authorization', value: 'Bearer ' + cookie.get('token')}],
      uploadFields: [{name: 'serviceName', value: 'share'}, {name: 'methodName', value: 'Insert'}],
      columns: [
        {name: 'id', required: false, label: '编号', align: 'left', field: 'id', sortable: true},
        {name: 'ts_code', align: 'left', label: '股票编号', field: 'ts_code', sortable: true},
        {name: 'name', label: '股票名', field: 'name', sortable: true},
        {name: 'industry', label: '行业', field: 'industry'}
      ]
    }
  },
  computed: {
    current() {
      if (this.selected.length > 0) {
        return this.selected[this.selected.length - 1]
      }
      return {}
    },
    entities() {
      return this.data.filter(function (entity) {
        return entity.state !== EntityState.Deleted
      })
    }
  },
  methods: {
    onPage(props) {
      this.loading = true
      this.remoteDbEntity.onQuasarPage(props, this.pagination, this.query)
      this.loading = false
    },
    query() {
      this.$refs['frmQuery'].validate().then(success => {
        if (success) {
          let {orderby, from, limit, count} = this.remoteDbEntity.prepareQuasarPage(this.pagination, this.queryChanged)
          this.remoteDbEntity.find(this.queryData, orderby, from, limit, count).then(result => {
            if (result) {
              this.data = result.data
              if (result.count) {
                this.pagination.rowsNumber = result.count
              }
              this.queryChanged = false
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
    add() {
      this.remoteDbEntity.add(this.data, this.selected)
      this.kind = 'edit'
    },
    remove() {
      this.remoteDbEntity.remove(this.data, this.selected)
    },
    save() {
      this.remoteDbEntity.save(this.data)
    },
    edit() {
      this.remoteDbEntity.updateState(this.current, EntityState.Modified)
      this.kind = 'edit'
    },
    rowDblclick(evt, row, index) {
      if (this.selected) {
        this.selected.splice(0, this.selected.length)
      }
      this.selected.push(row)
      this.edit()
    },
    upload() {

    },
    download() {

    },
    exportTable() {
      exportTable(this.data, this.columns, 'share.csv')
    }
  },
  mounted() {

  },
  created() {

  },
  watch: {
    queryData: {
      handler(newName, oldName) {
        this.queryChanged = true
      },
      deep: true
    }
  }
}
