import { EntityState, httpClientPool } from 'libcolla'
import * as cookie from 'tiny-cookie'
import { MasterDetailEntity } from '@/libs/masterdetail'
import {exportTable} from "@/libs/utils"
export default {
  data() {
    return {
      masterDetailEntity: new MasterDetailEntity('baseCode', 'codeDetail', 'baseCodeId'),
      kind: 'query',
      filter: "",
      mode: "list",
      queryData: {
        baseCodeId: '',
        baseCodeType: '',
        kind: '',
        name: '',
        status: ''
      },
      queryChanged: true,
      loading: false,
      pagination: {
        sortBy: '',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 0
      },
      data: [],
      selected: [],
      dlgUpload: false,
      uploadAddress: window.localStorage.getItem('peerAddress') + '/upload',
      uploadHeaders: [{ name: 'Authorization', value: 'Bearer ' + cookie.get('token') }],
      uploadFields: [{ name: 'serviceName', value: 'baseCode' }, { name: 'methodName', value: 'Insert' }],
      columns: [{name: 'id',required: false,label: '编号',align: 'left',field: 'id',sortable: true},
        { name: 'baseCodeId', align: 'left', label: '基本编码编号', field: 'baseCodeId', sortable: true },
        { name: 'baseCodeType', label: '基本编码类型', field: 'baseCodeType', sortable: true },
        { name: 'kind', label: '名称', field: 'kind' },
        { name: 'name', label: '显示名', field: 'name' },
        { name: 'status', label: '状态', field: 'status' }
      ],
      detailSelected: [],
      detailColumns: [
        {name: 'id',required: false,label: '编号',align: 'left',field: 'id',sortable: true},
        { name: 'baseCodeId', align: 'left', label: '基本编码编号', field: 'baseCodeId', sortable: true },
        { name: 'codeDetailId', label: '编码编号', field: 'codeDetailId', sortable: true },
        { name: 'label', label: '显示名', field: 'label' },
        { name: 'value', label: '值', field: 'value' },
        { name: 'serialId', label: '次序', field: 'serialId' },
        { name: 'status', label: '状态', field: 'status' },
        { name: 'parentId', label: '上级编码编号', field: 'parentId' }
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
    },
    detailCurrent() {
      if (this.detailSelected.length > 0) {
        return this.detailSelected[this.detailSelected.length - 1]
      }
      return {}
    },
    detailEntities() {
      if (this.current && this.current.details) {
        return this.current.details.filter(function (entity) {
          return entity.state !== EntityState.Deleted
        })
      } else {
        return []
      }
    }
  },
  methods: {
    onPage(props) {
      this.loading = true
      this.masterDetailEntity.masterEntity.onQuasarPage(props, this.pagination, this.query)
      this.loading = false
    },
    query() {
      this.$refs['frmQuery'].validate().then(success => {
        if (success) {
          let { orderby, from, limit, count } = this.masterDetailEntity.masterEntity.prepareQuasarPage(this.pagination, this.queryChanged)
          this.masterDetailEntity.masterEntity.find(this.queryData, orderby, from, limit, count).then(result => {
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
      this.masterDetailEntity.masterEntity.add(this.data, this.selected)
      this.kind = 'edit'
    },
    remove() {
      this.masterDetailEntity.masterEntity.remove(this.data, this.selected)
    },
    save() {
      this.masterDetailEntity.masterEntity.save(this.data)
    },
    edit() {
      this.masterDetailEntity.masterEntity.updateState(this.current, EntityState.Modified)
      this.kind = 'edit'
    },
    rowDblclick(evt, row, index) {
      if (this.selected) {
        this.selected.splice(0, this.selected.length)
      }
      this.selected.push(row)
      this.edit()
    },
    detail() {
      this.masterDetailEntity.relate(this.current, 'serialId')
      this.kind = 'detail'
    },
    addDetail() {
      let record = this.masterDetailEntity.detailEntity.add(this.current.details, this.detailSelected)
      record.baseCodeId = this.current.baseCodeId
      this.kind = 'editDetail'
    },
    removeDetail() {
      this.masterDetailEntity.detailEntity.remove(this.current.details, this.detailSelected)
    },
    saveDetail() {
      this.masterDetailEntity.detailEntity.save(this.current.details)
    },
    editDetail() {
      this.masterDetailEntity.detailEntity.updateState(this.detailCurrent, EntityState.Modified)
      this.kind = 'editDetail'
    },
    rowDblclickDetail(evt, row, index) {
      if (this.detailSelected) {
        this.detailSelected.splice(0, this.detailSelected.length)
      }
      this.detailSelected.push(row)
      this.editDetail()
    },
    upload() {

    },
    download() {

    },
    exportTable() {
      exportTable(this.data, this.columns, 'user.csv')
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
