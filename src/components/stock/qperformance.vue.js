import {EntityState, httpClientPool} from 'libcolla'
import * as cookie from 'tiny-cookie'
import {exportTable} from "@/libs/utils"

export default {
  data() {
    return {
      kind: 'query',
      filter: "",
      mode: "list",
      queryData: {
        ts_code: '',
        security_name: '',
        qdate: ''
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
        {name: 'ts_code', align: 'left', label: '股票编号', field: 'ts_code', sortable: true},
        {name: 'security_name', label: '股票名', field: 'security_name', sortable: true},
        {name: 'qdate', align: 'left', label: '业绩季度', field: 'qdate', sortable: true},
        {name: 'ep', label: '市盈率', field: 'ep', sortable: true},
        {name: 'share_number', align: 'right', label: '股数', field: 'share_number'},
        {name: 'high', align: 'right', label: '最高价', field: 'high'},
        {name: 'close', align: 'right', label: '收盘价', field: 'close'},
        {name: 'pct_chg_high', align: 'right', label: '最高价变化', field: 'pct_chg_high'},
        {name: 'pct_chg_close', align: 'right', label: '收盘价变化', field: 'pct_chg_close'},
        {name: 'weight_avg_roe', align: 'right', label: '净资产收益率', field: 'weight_avg_roe'},
        {name: 'gross_profit_margin', align: 'right', label: '销售毛利率(%)', field: 'gross_profit_margin'},
        {name: 'parent_net_profit', align: 'right', label: '归母净利润', field: 'parent_net_profit'},
        {name: 'basic_eps', align: 'right', label: '每股收益', field: 'basic_eps'},
        {name: 'yoy_sales', align: 'right', label: '营业收入季度环比增长(%)', field: 'yoy_sales'},
        {name: 'yoy_dedu_np', align: 'right', label: '扣非净利润同比增长(%)', field: 'yoy_dedu_np'},
        {name: 'or_last_month', align: 'right', label: '营业收入季度环比增长(%)', field: 'or_last_month'},
        {name: 'np_last_month', align: 'right', label: '净利润季度环比增长(%)', field: 'np_last_month'},
        {name: 'cfps', align: 'right', label: '每股经营现金流量(元)', field: 'cfps'},
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
          return httpClientPool.httpClient.send('/wmqyLine/FindQPerformance', this.queryData).then((response) => {
            const result = response.data
            if (result) {
              this.data = result.data
            }

            return result
          }).catch((error) => {
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
