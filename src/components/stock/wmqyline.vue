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
            q-input.c-field(filled clearable v-model="queryData.trade_date" :label="$t('trade_date')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.qdate" :label="$t('qdate')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.line_type" :label="$t('line_type')")
      q-separator(inset)
      div(class="q-pa-md")
        q-table(flat :title="$t('Wmqyline')" :data="entities" :columns="columns" row-key="entityId" :hide-header="mode === 'grid'"
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
            q-input.c-field(filled clearable v-model="current.ts_code" :label="$t('ts_code')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.trade_date" :label="$t('trade_date')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.qdate" :label="$t('qdate')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.ndate" :label="$t('line_type')")
    q-tab-panel(name="view" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      q-card(class="q-pa-md")
        q-card-section
          div {{ $t('Id') }} : {{ current.id }}
          div {{ $t('ts_code') }} : {{ current.ts_code }}
          div {{ $t('trade_date') }} : {{ current.trade_date }}
          div {{ $t('qdate') }} : {{ current.qdate }}
          div {{ $t('line_type') }} : {{ current.line_type }}
          div {{ $t('open') }} : {{ current.open }}
          div {{ $t('high') }} : {{ current.high }}
          div {{ $t('open') }} : {{ current.open }}
          div {{ $t('low') }} : {{ current.low }}
          div {{ $t('close') }} : {{ current.close }}
          div {{ $t('vol') }} : {{ current.vol }}
          div {{ $t('amount') }} : {{ current.amount }}
          div {{ $t('turnover') }} : {{ current.turnover }}
          div {{ $t('chg_close') }} : {{ current.chg_close }}
          div {{ $t('pct_chg_open') }} : {{ current.pct_chg_open }}
          div {{ $t('pct_chg_high') }} : {{ current.pct_chg_high }}
          div {{ $t('pct_chg_low') }} : {{ current.pct_chg_low }}
          div {{ $t('pct_chg_close') }} : {{ current.pct_chg_close }}
          div {{ $t('pct_chg_amount') }} : {{ current.pct_chg_amount }}
          div {{ $t('pct_chg_vol') }} : {{ current.pct_chg_vol }}
</template>
<script src="./wmqyline.vue.js"/>
