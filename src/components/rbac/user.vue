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
            q-input.c-field(filled clearable v-model="queryData.userId" :label="$t('UserId')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.userName" :label="$t('UserName')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.mobile" :label="$t('Mobile')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.email" :label="$t('Email')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="queryData.status" :label="$t('Status')")
      q-separator(inset)
      div(class="q-pa-md")
        q-table(flat :title="$t('User')" :data="entities" :columns="columns" row-key="entityId" :hide-header="mode === 'grid'"
          :grid="mode=='grid'" selection="single" :selected.sync="selected" @row-dblclick="rowDblclick"
          :pagination.sync="pagination" :loading="loading" @request="onPage")
          template(v-slot:top-right="props")
            q-input(outlined dense debounce="300" v-model="filter" placeholder="Search")
              template(v-slot:append)
                q-icon(name="search")
            q-btn(color="primary" flat round dense :icon="mode === 'grid' ? 'list' : 'grid_on'"
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
            q-input.c-field(filled clearable v-model="current.userId" :label="$t('UserId')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.userName" :label="$t('UserName')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.mobile" :label="$t('Mobile')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.email" :label="$t('Email')")
          div(class="col-4")
            q-input.c-field(filled clearable v-model="current.status" :label="$t('Status')")
    q-tab-panel(name="view" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      q-card(class="q-pa-md")
        q-card-section
          div {{ $t('Id') }} : {{ current.id }}
          div {{ $t('UserId') }} : {{ current.userId }}
          div {{ $t('UserName') }} : {{ current.userName }}
          div {{ $t('Status') }} : {{ current.status }}
          div {{ $t('Mobile') }} : {{ current.mobile }}
          div {{ $t('Email') }} : {{ current.email }}
</template>
<script src="./user.vue.js"/>
