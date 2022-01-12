import {EntityState, httpClientPool} from 'libcolla'
import * as cookie from 'tiny-cookie'
import {exportTable} from "@/libs/utils"
import * as echarts from 'echarts'

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
      columns: [
        {name: 'id', align: 'left', label: '编号', field: 'id', sortable: true},
        {name: 'ts_code', align: 'left', label: '股票编号', field: 'ts_code', sortable: true},
        {name: 'security_name', label: '股票名', field: 'security_name', sortable: true},
        {name: 'qdate', align: 'left', label: '业绩季度', field: 'qdate', sortable: true},
        {name: 'basic_eps', align: 'right', label: '每股盈利', field: 'basic_eps'},
        {name: 'close', align: 'right', label: '收盘价', field: 'close'},
        {name: 'ep', label: '盈利/价格', field: 'ep', sortable: true},
        {name: 'yoy_dedu_np', align: 'right', label: '扣非净利润同比增长(%)', field: 'yoy_dedu_np'},
        {name: 'np_last_month', align: 'right', label: '净利润季度环比增长(%)', field: 'np_last_month'},
      ]
    }
  },
  computed: {
    current() {
      if (this.selected.length > 0) {
        return this.selected[this.selected.length - 1]
      }
      return {}
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
        if (success && this.queryData.ts_code!=='') {
          return httpClientPool.httpClient.send('/wmqyline/FindQPerformance', this.queryData).then((response) => {
            const result = response.data
            if (result) {
              this.data = result
            } else {
              this.data = []
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
    rowDblclick(evt, row, index) {
      if (this.selected) {
        this.selected.splice(0, this.selected.length)
      }
      this.selected.push(row)
    },
    upload() {

    },
    download() {

    },
    exportTable() {
      exportTable(this.data, this.columns, 'performance.csv')
    },
    showChart(){
      let lineDom = document.getElementById('lineChart')
      let lineChart = echarts.init(lineDom)

      // 指定图表的配置项和数据
      let lineOption = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        dataset: {
          source: this.data
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [{
          type: 'line',
          encode: {
            x: 'qdate',
            y: 'close'
          }
        },{
          type: 'line',
          encode: {
            x: 'qdate',
            y: 'ep'
          }
        },{
          type: 'line',
          encode: {
            x: 'qdate',
            y: 'yoy_dedu_np'
          }
        },]
      };

      // 使用刚指定的配置项和数据显示图表。
      lineChart.setOption(lineOption);

      let scatterDom = document.getElementById('scatterChart')
      let scatterChart = echarts.init(scatterDom)

      // 指定图表的配置项和数据
      let scatterOption = {
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        legend: {
          data:['销量']
        },
        dataset: {
          source: this.data
        },
        xAxis: {type: 'category'},
        yAxis: {},
        series: [{
          type: 'scatter',
          encode: {
            x: 'ep',
            y: 'yoy_dedu_np'
          }
        }]
      };

      // 使用刚指定的配置项和数据显示图表。
      scatterChart.setOption(scatterOption);
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
