import {EntityState} from 'libcolla'
import * as cookie from 'tiny-cookie'
import {RemoteDbEntity} from '@/libs/remotedb'
import {exportTable} from "@/libs/utils"

export default {
  data() {
    return {
      remoteDbEntity: new RemoteDbEntity('index'),
      kind: 'query',
      filter: "",
      mode: "list",
      queryData: {
        shareId: '',
        indexTime: ''
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
      uploadFields: [{name: 'serviceName', value: 'user'}, {name: 'methodName', value: 'Insert'}],
      columns: [
        {name: 'id', required: false, label: '编号', align: 'left', field: 'id', sortable: true},
        {name: 'shareId', align: 'left', label: '股票编号', field: 'shareId', sortable: true},
        {name: 'indexTime', label: '股票名', field: 'indexTime', sortable: true},
        {name: 'netProfitGrowthRate', align: 'right', label: '净利润增长率', field: 'netProfitGrowthRate'},
        {name: 'grossRevenueGrowthRate', align: 'right', label: '销售收入增长率', field: 'grossRevenueGrowthRate'},
        {name: 'returnOnNetAsset', align: 'right', label: '净资产收益率', field: 'returnOnNetAsset'},
        {name: 'grossProfitMargin', align: 'right', label: '毛利率', field: 'grossProfitMargin'},
        {name: 'netOperatingRate', align: 'right', label: '净营业率', field: 'netOperatingRate'},
        {name: 'priceEarningsRatio', align: 'right', label: '市盈率', field: 'priceEarningsRatio'},
        {name: 'netProfit', align: 'right', label: '净利润', field: 'netProfit'},
        {name: 'totalOperatingRevenue', align: 'right', label: '营业总收入', field: 'totalOperatingRevenue'},
        {name: 'basicEarningsPerShare', align: 'right', label: '每股利润', field: 'basicEarningsPerShare'},
        {name: 'growthRateOfTotalAsset', align: 'right', label: '总资产增长率', field: 'growthRateOfTotalAsset'},
        {name: 'growthRateOfOperatingProfit', align: 'right', label: '运营利润增长率', field: 'growthRateOfOperatingProfit'},
        {name: 'growthRateOfNetAsset', align: 'right', label: '净资产增长率', field: 'growthRateOfNetAsset'},
        {name: 'capitalAccumulationFundPerShare', align: 'right', label: '每股资本累积', field: 'capitalAccumulationFundPerShare'},
        {name: 'undistributedProfitPerShare', align: 'right', label: '每股未分配利润', field: 'undistributedProfitPerShare'},
        {name: 'netAssetValuePerShare', align: 'right', label: '每股净资产', field: 'netAssetValuePerShare'},
        {name: 'operatingCashFlowPerShare', align: 'right', label: '每股运营现金流', field: 'operatingCashFlowPerShare'},
        {name: 'growthOfNetCashFlowFromOperatingActivities', align: 'right', label: '运营活动净现金流增长', field: 'growthOfNetCashFlowFromOperatingActivities'},
        {name: 'deductionOfNonNetProfit', align: 'right', label: '扣非净利润', field: 'deductionOfNonNetProfit'},
        {name: 'assetLiabilityRatio', align: 'right', label: '资产负债率', field: 'assetLiabilityRatio'},
        {name: 'currentRatio', align: 'right', label: '流动比率', field: 'currentRatio'},
        {name: 'quickRatio', align: 'right', label: '速动比率', field: 'quickRatio'},
        {name: 'inventoryTurnover', align: 'right', label: '存货周转率', field: 'inventoryTurnover'},
        {name: 'turnoverOfCurrentAsset', align: 'right', label: '流动资产周转率', field: 'turnoverOfCurrentAsset'},
        {name: 'turnoverRateOfFixedAsset', align: 'right', label: '固定资产周转率', field: 'turnoverRateOfFixedAsset'},
        {name: 'turnoverOfTotalAsset', align: 'right', label: '总资产周转率', field: 'turnoverOfTotalAsset'},
        {name: 'growthRateOfCashFlowPerShare', align: 'right', label: '每股现金流增长率', field: 'growthRateOfCashFlowPerShare'},
        {name: 'costProfitMargin', align: 'right', label: '成本利润率', field: 'costProfitMargin'},
        {name: 'returnOnTotalAsset', align: 'right', label: '总资产收益率', field: 'returnOnTotalAsset'}
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
