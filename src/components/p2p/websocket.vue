<template lang="pug">
div
  q-tab-panels.bg-c-grey-1(
    v-model="subKind",
    animated,
    transition-prev="slide-right",
    transition-next="slide-left"
  )
    q-tab-panel.q-pa-none(name="default")
      q-input(
        style="width:100%",
        filled,
        dense,
        clearable,
        v-model="address",
        placeholder="address"
      )
      p
      q-input(
        style="width:100%",
        filled,
        dense,
        clearable,
        v-model="message",
        placeholder="message"
      )
      q-toolbar
        q-btn(flat, round, color="primary", icon="link", @click="connect()")
        q-btn(flat, round, color="primary", icon="chat", @click="send()")
      q-uploader(
        url="https://localhost:9090/upload"
        label="Upload files"
        square
        flat
        bordered
        style="max-width: 300px"
      )
</template>
<script src="./websocket.vue.js" />
