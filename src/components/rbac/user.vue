<template lang="pug">
  q-tab-panels.bg-c-grey-1(v-model="kind" animated transition-prev="slide-right" transition-next="slide-left")
    q-tab-panel(name="query" class="q-pa-none")
      q-toolbar(class="bg-c-grey-0")
        q-toolbar-title(align="center" class="text-c-grey-10")
        q-btn.btnIcon(flat round color="primary" icon="search" @click="query")
        q-btn.btnIcon(flat round color="primary" icon="clear" @click="clear")
      div(class="q-pa-md")
        q-form(ref="frmQuery" class="q-gutter-md row items-start")
          q-input.c-field(filled clearable v-model="queryData.userName" :label="$t('UserName')")
          q-input.c-field(filled clearable v-model="queryData.status" :label="$t('Status')")
          q-input.c-field(filled clearable v-model="queryData.mobile" :label="$t('Mobile')")
          q-input.c-field(filled clearable v-model="queryData.email" :label="$t('Email')")
      q-separator(inset)
      div(class="q-pa-md")
        q-toolbar(class="bg-c-grey-1")
          q-space
          q-btn.btnIcon(flat round color="primary" icon="add_circle" @click="add")
          q-btn.btnIcon(flat round color="primary" icon="create" @click="edit")
          q-btn.btnIcon(flat round color="primary" icon="remove_circle" @click="remove")
          q-btn.btnIcon(flat round color="primary" icon="save" @click="save")
          q-btn.btnIcon(flat round color="primary" icon="view_list" @click="kind='view'")
          q-btn.btnIcon(flat round color="primary" icon="cloud_download" @click="download")
          q-btn.btnIcon(flat round color="primary" icon="cloud_upload" @click="dlgUpload=true")
        q-table(flat :title="$t('User')" :data="entities" :columns="columns" row-key="entityId"
         selection="single" :selected.sync="selected" @row-dblclick="rowDblclick"
         :pagination.sync="pagination" :loading="loading" @request="onPage")
      q-dialog(v-model="dlgUpload" position="bottom" full-width)
        q-uploader(ref="upload" :url="uploadAddress" accept=".xlsx"
        :form-fields="uploadFields" :headers="uploadHeaders")
    q-tab-panel(name="edit" class="q-pa-none")
      q-toolbar.header-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      div(class="q-pa-md")
        q-form(ref="frmEdit" class="q-gutter-md row items-start")
          q-input.c-field(filled clearable v-model="current.userName" :label="$t('UserName')")
          q-input.c-field(filled clearable v-model="current.status" :label="$t('Status')")
          q-input.c-field(filled clearable v-model="current.mobile" :label="$t('Mobile')")
          q-input.c-field(filled clearable v-model="current.email" :label="$t('Email')")
    q-tab-panel(name="view" class="q-pa-none")
      q-toolbar.header-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
      q-card(class="q-pa-md")
        q-card-section
          div {{ $t('UserName') }} : {{ current.userName }}
          div {{ $t('Status') }} : {{ current.status }}
          div {{ $t('Mobile') }} : {{ current.mobile }}
          div {{ $t('Email') }} : {{ current.email }}
 </template>
<script src="./user.vue.js" />
