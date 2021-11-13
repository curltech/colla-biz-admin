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
        style="width: 100%",
        filled,
        dense,
        clearable,
        v-model="message",
        placeholder="message"
      )
      p
      q-input(
        style="width: 100%",
        filled,
        dense,
        clearable,
        v-model="targetPeerId",
        placeholder="targetPeerId"
      )
      q-toolbar
        q-btn(flat, round, color="primary", icon="call", @click="connect()")
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
          icon="find_replace",
          @click="send()"
        )
        q-btn(
          flat,
          round,
          color="primary",
          icon="find_replace",
          @click="playUser()"
        )
        q-btn(
          flat,
          round,
          color="primary",
          icon="find_replace",
          @click="playDisplay()"
        )
      .q-pa-md.row.items-start.q-gutter-md
        q-card
          q-card-section
            video(
              ref="video1",
              autoplay="autoplay",
              style="width: 250px;"
            )
        q-card
          q-card-section
            video(
              ref="video2",
              autoplay="autoplay",
              style="width: 250px;"
            )
        q-card
          q-card-section
            video(
              ref="video3",
              autoplay="autoplay",
              style="width: 250px;"
            )
</template>
<script src="./webrtc.vue.js" />
