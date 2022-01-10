import {EntityState} from 'libcolla'
import * as cookie from 'tiny-cookie'
import {RemoteDbEntity} from '@/libs/remotedb'
import {exportTable} from "@/libs/utils"

export default {
  data() {
    return {
      remoteDbEntity: new RemoteDbEntity('performance'),
      kind: 'query',
      filter: "",
      mode: "list",
      queryData: {
        security_code: '',
        security_name_abbr: '',
        qdate: '',
        ndate: ''
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
      uploadHeaders: [{name: 'Authorization', value: 'Bearer ' + cookie.get('token')}],
      uploadFields: [{name: 'serviceName', value: 'performance'}, {name: 'methodName', value: 'Insert'}],
      columns: [
        {name: 'id', required: false, label: '编号', align: 'left', field: 'id', sortable: true},
        {name: 'security_code', align: 'left', label: '股票编号', field: 'security_code', sortable: true},
        {name: 'security_name_abbr', label: '股票名', field: 'security_name_abbr', sortable: true},
        {name: 'qdate', align: 'left', label: '业绩季度', field: 'qdate', sortable: true},
        {name: 'ndate', label: '通知季度', field: 'ndate', sortable: true},
        {name: 'basic_eps', align: 'right', label: '每股收益', field: 'basic_eps'},
        {name: 'deduct_basic_eps', align: 'right', label: '每股扣非收益', field: 'deduct_basic_eps'},
        {name: 'total_operate_income', align: 'right', label: '营收', field: 'total_operate_income'},
        {name: 'parent_net_profit', align: 'right', label: '归母净利润', field: 'parent_net_profit'},
        {name: 'weight_avg_roe', align: 'right', label: '净资产收益率', field: 'weight_avg_roe'},
        {name: 'yoy_sales', align: 'right', label: '营业收入季度环比增长(%)', field: 'yoy_sales'},
        {name: 'yoy_dedu_np', align: 'right', label: '扣非净利润同比增长(%)', field: 'yoy_dedu_np'},
        {name: 'bps', align: 'right', label: '每股净资产', field: 'bps'},
        {name: 'cfps', align: 'right', label: '每股经营现金流量(元)', field: 'cfps'},
        {name: 'grossprofit_margin', align: 'right', label: '销售毛利率(%)', field: 'grossprofit_margin'},
        {name: 'or_last_month', align: 'right', label: '营业收入季度环比增长(%)', field: 'or_last_month'},
        {name: 'np_last_month', align: 'right', label: '净利润季度环比增长(%)', field: 'np_last_month'},
        {name: 'dividend_yield_ratio', align: 'right', label: '股息率', field: 'dividend_yield_ratio'},
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
      exportTable(this.data, this.columns, 'performance.csv')
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
