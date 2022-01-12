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
            q-input.c-field(filled clearable v-model="queryData.security_code" :label="$t('security_code')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.security_name_abbr" :label="$t('security_name_abbr')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.qdate" :label="$t('qdate')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.ndate" :label="$t('ndate')")
      q-separator(inset)
      div(class="q-pa-md")
        q-table(flat :title="$t('Express')" :data="entities" :columns="columns" row-key="entityId" :hide-header="mode === 'grid'"
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
            q-btn.btnIcon(flat round color="primary" icon="add_circle" @click="add")
            q-btn.btnIcon(flat round color="primary" icon="create" @click="edit")
            q-btn.btnIcon(flat round color="primary" icon="remove_circle" @click="remove")
            q-btn.btnIcon(flat round color="primary" icon="save" @click="save")
            q-btn.btnIcon(flat round color="primary" icon="view_list" @click="kind='view'")
            q-btn.btnIcon(flat round color="primary" icon="cloud_download" @click="download")
            q-btn.btnIcon(flat round color="primary" icon="cloud_upload" @click="dlgUpload=true")
            q-btn.btnIcon(color="primary" flat round icon="archive" @click="exportTable")
      q-dialog(v-model="dlgUpload" position="bottom" full-width)
        q-uploader(ref="upload" :url="uploadAddress" accept=".xlsx"
          :form-fields="uploadFields" :headers="uploadHeaders")
    q-tab-panel(name="edit" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      div(class="q-pa-md")
        q-form(ref="frmEdit" class="q-col-gutter-sm row")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.security_code" :label="$t('security_code')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.security_name_abbr" :label="$t('security_name_abbr')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.qdate" :label="$t('qdate')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.ndate" :label="$t('ndate')")
    q-tab-panel(name="view" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      q-card(class="q-pa-md")
        q-card-section
          div {{ $t('Id') }} : {{ current.id }}
          div {{ $t('security_code') }} : {{ current.security_code }}
          div {{ $t('security_name_abbr') }} : {{ current.security_name_abbr }}
          div {{ $t('qdate') }} : {{ current.qdate }}
          div {{ $t('ndate') }} : {{ current.ndate }}
          div {{ $t('trade_market_code') }} : {{ current.trade_market_code }}
          div {{ $t('trade_market') }} : {{ current.trade_market }}
          div {{ $t('security_type_code') }} : {{ current.security_type_code }}
          div {{ $t('security_type') }} : {{ current.security_type }}
          div {{ $t('newest_date') }} : {{ current.newest_date }}
          div {{ $t('report_date') }} : {{ current.report_date }}
          div {{ $t('basic_eps') }} : {{ current.basic_eps }}
          div {{ $t('total_operate_income') }} : {{ current.total_operate_income }}
          div {{ $t('total_operate_income_sq') }} : {{ current.total_operate_income_sq }}
          div {{ $t('parent_net_profit') }} : {{ current.parent_net_profit }}
          div {{ $t('parent_net_profit_sq') }} : {{ current.parent_net_profit_sq }}
          div {{ $t('parent_bvps') }} : {{ current.parent_bvps }}
          div {{ $t('weight_avg_roe') }} : {{ current.weight_avg_roe }}
          div {{ $t('yoy_sales') }} : {{ current.yoy_sales }}
          div {{ $t('yoy_net_profit') }} : {{ current.yoy_net_profit }}
          div {{ $t('or_last_month') }} : {{ current.or_last_month }}
          div {{ $t('np_last_month') }} : {{ current.np_last_month }}
          div {{ $t('publish_name') }} : {{ current.publish_name }}
          div {{ $t('notice_date') }} : {{ current.notice_date }}
          div {{ $t('org_code') }} : {{ current.org_code }}
          div {{ $t('market') }} : {{ current.market }}
          div {{ $t('is_new') }} : {{ current.is_new }}
          div {{ $t('data_type') }} : {{ current.data_type }}
          div {{ $t('ei_time') }} : {{ current.ei_time }}
          div {{ $t('secu_code') }} : {{ current.secu_code }}
</template>
<script src="./express.vue.js"/>
