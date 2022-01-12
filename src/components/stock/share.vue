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
            q-input.c-field(filled clearable v-model="queryData.name" :label="$t('Name')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.industry" :label="$t('Industry')")
      q-separator(inset)
      div(class="q-pa-md")
        q-table(flat :title="$t('Share')" :data="entities" :columns="columns" row-key="entityId" :hide-header="mode === 'grid'"
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
            q-input.c-field(filled clearable v-model="current.id" :label="$t('id')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.ts_code" :label="$t('ts_code')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.name" :label="$t('Name')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.industry" :label="$t('Industry')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.symbol" :label="$t('symbol')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.area" :label="$t('area')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.fullname" :label="$t('fullname')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.enname" :label="$t('enname')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.market" :label="$t('market')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.exchange" :label="$t('exchange')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.curr_type" :label="$t('curr_type')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.list_status" :label="$t('list_status')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.list_date" :label="$t('list_date')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.delist_date" :label="$t('delist_date')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.is_hs" :label="$t('is_hs')")
    q-tab-panel(name="view" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      q-card(class="q-pa-md")
        q-card-section
          div {{ $t('Id') }} : {{ current.id }}
          div {{ $t('ts_code') }} : {{ current.ts_code }}
          div {{ $t('Name') }} : {{ current.name }}
          div {{ $t('Industry') }} : {{ current.industry }}
          div {{ $t('symbol') }} : {{ current.symbol }}
          div {{ $t('area') }} : {{ current.area }}
          div {{ $t('fullname') }} : {{ current.fullname }}
          div {{ $t('enname') }} : {{ current.enname }}
          div {{ $t('market') }} : {{ current.market }}
          div {{ $t('exchange') }} : {{ current.exchange }}
          div {{ $t('curr_type') }} : {{ current.curr_type }}
          div {{ $t('list_status') }} : {{ current.list_status }}
          div {{ $t('list_date') }} : {{ current.list_date }}
          div {{ $t('delist_date') }} : {{ current.delist_date }}
          div {{ $t('is_hs') }} : {{ current.is_hs }}
</template>
<script src="./share.vue.js"/>
