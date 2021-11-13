<template lang="pug">
  q-tab-panels.bg-c-grey-1(v-model="kind" animated transition-prev="slide-right" transition-next="slide-left")
    q-tab-panel(name="query" class="q-pa-none")
      q-toolbar(class="bg-c-grey-0")
        q-toolbar-title(align="center" class="text-c-grey-10")
        q-btn.btnIcon(flat round color="primary" icon="search" @click="query")
        q-btn.btnIcon(flat round color="primary" icon="find_in_page" @click="findPeer")
        q-btn.btnIcon(flat round color="primary" icon="find_replace" @click="listPeers")
        q-btn.btnIcon(flat round color="primary" icon="explore" @click="nearestPeers")
        q-btn.btnIcon(flat round color="primary" icon="clear" @click="clear")
        q-btn.btnIcon(flat round color="primary" icon="build" @click="kind='exec'")
      div(class="q-pa-md")
        q-form(ref="frmQuery" class="q-gutter-md row items-start")
          q-input.c-field(filled clearable v-model="queryData.peerId" :label="$t('PeerId')")
          q-input.c-field(filled clearable v-model="queryData.addr" :label="$t('Addr')")
          q-input.c-field(filled clearable v-model="queryData.key" :label="$t('Key')")
      q-separator(inset)
      q-card(flat class="q-pa-md")
        q-card-section
          div {{ $t('PeerId') }} : {{ host.peerId }}
          div {{ $t('Addrs') }} : 
            div(v-for="addr in host.addrs") {{ addr }}
          div {{ $t('PubKey') }} : {{ host.pubKey }}
          div {{ $t('Protocols') }} : 
            div(v-for="protocol in host.protocols") {{ protocol }}
      q-separator(inset)
      div(class="q-pa-md")
        q-card(v-for="peer in host.peers" flat class="q-pa-md")
          q-card-section
            div {{ $t('PeerId') }} : {{ peer.peerId }}
            div {{ $t('Addrs') }} : 
              div(v-for="addr in peer.addrs") {{ addr }}
            div {{ $t('PubKey') }} : {{ peer.pubKey }}
            div {{ $t('Protocols') }} : 
              div(v-for="protocol in peer.protocols") {{ protocol }}
        q-card(v-for="routingTable in host.routingTables" flat class="q-pa-md")
          q-card-section
            div {{ $t('PeerId') }} : {{ routingTable.peerId }}
            div {{ $t('Addrs') }} : 
              div(v-for="addr in routingTable.addrs") {{ addr }}
            div {{ $t('PubKey') }} : {{ routingTable.pubKey }}
            div {{ $t('Protocols') }} : 
              div(v-for="protocol in routingTable.protocols") {{ protocol }}
    q-tab-panel(name="exec" class="q-pa-none")
      q-toolbar(class="bg-c-grey-1")
        q-btn.btnIcon(flat round dense icon="arrow_back" @click="kind='query'")
        q-toolbar-title(align="center" class="text-c-grey-10")
        q-btn.btnIcon(flat round color="primary" icon="call" @click="connect")
        q-btn.btnIcon(flat round color="primary" icon="speaker_phone" @click="ping")
        q-btn.btnIcon(flat round color="primary" icon="chat" @click="chat")
        q-btn.btnIcon(flat round color="primary" icon="cell_wifi" @click="chainPing")
        q-btn.btnIcon(flat round color="primary" icon="cloud_download" @click="getValue")
      div(class="q-pa-md")
        q-form(ref="frmExec" class="q-gutter-md row items-start")
          q-input.c-field(filled clearable v-model="execData.peerId" :label="$t('PeerId')")
          q-input.c-field(filled clearable v-model="execData.addr" :label="$t('Addr')")
          q-input.c-field(filled clearable v-model="execData.key" :label="$t('Key')")
          q-input.c-field(filled clearable v-model="execData.value" :label="$t('Value')")
      div(class="q-pa-md")
        q-card(flat class="q-pa-md")
          q-card-section
            div {{ $t('Start') }} : {{ result.start }}
            div {{ $t('Interval') }} : {{ result.interval }}
            div {{ $t('Value') }} : {{ result.value }}
 </template>
<script src="./dht.vue.js" />
