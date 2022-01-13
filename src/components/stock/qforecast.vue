<template lang="pug">
  q-tab-panels.bg-c-grey-1(v-model="kind" animated transition-prev="slide-right" transition-next="slide-left")
    q-tab-panel(name="query" class="q-pa-none")
      q-toolbar(class="bg-c-grey-0")
        q-toolbar-title(align="center" class="text-c-grey-10")
        q-btn.btnIcon(flat round color="primary" icon="search" @click="query")
        q-btn.btnIcon(flat round color="primary" icon="clear" @click="clear")
      div(class="q-pa-md")
        q-form(ref="frmQuery" class="row q-col-gutter-sm")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.ts_code" :label="$t('ts_code')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.security_name_abbr" :label="$t('security_name')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.qdate" :label="$t('qdate')")
      q-separator(inset)
      div(class="q-pa-md")
        q-table(flat :title="$t('QForecast')" :data="data" :columns="columns" row-key="id" :hide-header="mode === 'grid'"
          :grid="mode=='grid'" selection="single" :selected.sync="selected" @row-dblclick="rowDblclick"
          :pagination.sync="pagination" :loading="loading" @request="onPage")
          template(v-slot:top-right="props")
            q-input(outlined dense debounce="300" v-model="filter" placeholder="Search")
              template(v-slot:append)
                q-icon(name="search")
            q-btn(color="primary" flat round dense :icon="mode === 'grid' ? 'grid_on' : 'list'"
              @click="mode = mode === 'grid' ? 'list' : 'grid'; separator = mode === 'grid' ? 'none' : 'horizontal'"
              v-if="!props.inFullscreen")
              q-tooltip(:disable="$q.platform.is.mobile" v-close-popup) {{mode==='grid' ? 'List' : 'Grid'}}
            q-btn.btnIcon(flat round color="primary" icon="view_list" @click="kind='view'")
            q-btn.btnIcon(flat round color="primary" icon="chart" @click="kind='chart'")
            q-btn.btnIcon(flat round color="primary" icon="cloud_download" @click="download")
            q-btn.btnIcon(color="primary" flat round icon="archive" @click="exportTable")
    q-tab-panel(name="view" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      q-card(class="q-pa-md")
        q-card-section
          div {{ $t('ts_code') }} : {{ current.ts_code }}
          div {{ $t('security_name') }} : {{ current.security_name }}
          div {{ $t('qdate') }} : {{ current.qdate }}
          div {{ $t('ndate') }} : {{ current.ndate }}
          div {{ $t('share_number') }} : {{ current.share_number }}
          div {{ $t('basic_eps') }} : {{ current.basic_eps }}
          div {{ $t('high') }} : {{ current.high }}
          div {{ $t('close') }} : {{ current.close }}
          div {{ $t('ep') }} : {{ current.ep }}
          div {{ $t('pct_chg_high') }} : {{ current.pct_chg_high }}
          div {{ $t('pct_chg_close') }} : {{ current.pct_chg_close }}
          div {{ $t('weight_avg_roe') }} : {{ current.weight_avg_roe }}
          div {{ $t('gross_profit_margin') }} : {{ current.gross_profit_margin }}
          div {{ $t('parent_net_profit') }} : {{ current.parent_net_profit }}
          div {{ $t('yoy_sales') }} : {{ current.yoy_sales }}
          div {{ $t('yoy_dedu_np') }} : {{ current.yoy_dedu_np }}
          div {{ $t('or_last_month') }} : {{ current.or_last_month }}
          div {{ $t('np_last_month') }} : {{ current.np_last_month }}
          div {{ $t('cfps') }} : {{ current.cfps }}
          div {{ $t('dividend_yield_ratio') }} : {{ current.dividend_yield_ratio }}
    q-tab-panel(name="chart" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
        q-btn.btnIcon(flat round color="primary" icon="cloud_download" @click="showChart")
      div(id="lineChart" class="q-pa-md" style="width: 100%;height:400px;")
</template>
<script src="./qforecast.vue.js"/>
