<template lang="pug">
div
  q-tab-panels.bg-c-grey-1(
    v-model="subKind",
    animated,
    transition-prev="slide-right",
    transition-next="slide-left"
  )
    q-tab-panel.q-pa-none(name="default")
      q-list
        q-item
          q-item-section
            q-item-label {{ p2pPeer.peerId }}
            q-item-label {{ p2pPeer.address }}
            q-item-label {{ p2pPeer.chainProtocolID }}
      q-btn(
        flat,
        round,
        color="primary",
        icon="find_replace",
        @click="refreshPeerStore()"
      )
      q-list
        div peerStore
        q-item(
          clickable,
          v-ripple,
          v-for="(peer, index) in peerStore.peers",
          :key="index"
        )
          q-item-section
            q-item-label {{ peer.id }}
            q-item-label {{ peer.addresses }}
      q-btn(
        flat,
        round,
        color="primary",
        icon="find_in_page",
        @click="refreshConnection()"
      )
      q-list
        div connection
        q-item(
          clickable,
          v-ripple,
          v-for="(peer, index) in connection.peers",
          :key="index"
        )
          q-item-section
            q-item-label {{ peer.peerId }}
            q-item-label {{ peer.remoteAddr }}
        q-input(
          style="width:100%",
          filled,
          dense,
          clearable,
          v-model="address",
          placeholder="address"
        )
      q-toolbar
        q-btn(flat, round, color="primary", icon="call", @click="dial()")
        q-btn(
          flat,
          round,
          color="primary",
          icon="speaker_phone",
          @click="dialProtocol()"
        )
        q-btn(flat, round, color="primary", icon="call_end", @click="hangUp()")
        q-btn(flat, round, color="primary", icon="cell_wifi", @click="ping()")
      q-input(
        style="width:100%",
        filled,
        dense,
        clearable,
        v-model="message",
        placeholder="message"
      )
      p
      q-input(
        style="width:100%",
        filled,
        dense,
        clearable,
        v-model="targetPeerId",
        placeholder="targetPeerId"
      )
      q-toolbar
        q-btn(flat, round, color="primary", icon="chat", @click="chat()")
        q-btn(
          flat,
          round,
          color="primary",
          icon="cloud_upload",
          @click="putPeerClient()"
        )
        q-btn(
          flat,
          round,
          color="primary",
          icon="call",
          @click="connect()"
        )
        q-btn(
          flat,
          round,
          color="primary",
          icon="call_end",
          @click="destroy()"
        )
        q-btn(
          flat,
          round,
          color="primary",
          icon="call",
          @click="findClient()"
        )
</template>
<script src="./p2p.vue.js" />
