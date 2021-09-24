<template  lang="pug">
q-layout.bg-c-grey-1(view="hHh lpR fFf")
  q-header.bg-primary.text-c-grey-0.q-py-xs(height-hint="58")
    q-toolbar
      q-btn(
        flat,
        dense,
        round,
        @click="leftDrawerOpen = !leftDrawerOpen",
        aria-label="Menu",
        icon="menu"
      )
      q-btn.q-ml-xs(flat, no-caps, no-wrap, v-if="$q.screen.gt.xs")
        q-icon(name="play_arrow", size="28px")
      q-toolbar-title.text-weight-bold(shrink) CurlTech Admin
      q-space
      .row.no-wrap
        q-input.c-field.bg-white(
          style="width: 55%",
          dense,
          filled,
          v-model="search",
          placeholder="Search"
        )
        q-btn(
          color="primary",
          no-caps,
          flat,
          text-color="c-grey-0",
          icon="search",
          unelevated
        )
      q-space
      .q-gutter-sm.row.items-center.no-wrap
      q-btn(
        round,
        dense,
        flat,
        color="primary",
        text-color="c-grey-0",
        icon="video_call",
        v-if="$q.screen.gt.sm"
      )
        q-tooltip Create a video or post
      q-btn(
        round,
        dense,
        flat,
        color="primary",
        text-color="c-grey-0",
        icon="apps",
        v-if="$q.screen.gt.sm"
      )
        q-tooltip Apps
      q-btn(
        round,
        dense,
        flat,
        color="primary",
        text-color="c-grey-0",
        icon="message",
        v-if="$q.screen.gt.sm"
      )
        q-tooltip Messages
      q-btn(
        round,
        dense,
        flat,
        color="primary",
        text-color="c-grey-0",
        icon="notifications"
      )
        q-badge(color="red", text-color="white", floating) 2
        q-tooltip Notifications
      q-btn(round, flat, color="primary", text-color="c-grey-0")
        q-avatar(size="26px")
          img(src="https://cdn.quasar.dev/img/boy-avatar.png")
        q-tooltip Account
  q-drawer(
    v-model="leftDrawerOpen",
    show-if-above,
    bordered,
    content-class="c-bg-grey-2",
    :width="240"
  )
    q-scroll-area.fit
      q-list(padding)
        q-item(v-for="app in apps", :key="app.name", v-ripple, clickable)
          q-menu(
            auto-close,
            square,
            fit,
            transition-show="scale",
            transition-hide="scale",
            anchor="center right",
            self="top left"
          )
            q-card.bg-c-grey-1.text-c-grey-9(v-for="module in app.children")
              q-card-actions
                q-btn(
                  flat,
                  no-caps,
                  v-for="func in module.children",
                  @click="openFunction(func)"
                ) {{ func.name }}
          q-item-section(avatar)
            q-icon(color="grey", :name="app.icon")
          q-item-section
            q-item-label {{ app.name }}
        q-separator.q-my-md
  q-page-container
    q-tabs(
      v-model="tab",
      align="left",
      active-color="primary",
      indicator-color="primary",
      dense,
      inline-label,
      shrink,
      stretch
    )
      q-tab(v-for="tab in tabs", :key="tab.name", v-bind="tab")
    keep-alive(include="basecode")
      router-view
</template>
<script src="./workspace.vue.js" />
<style lang="stylus" src="../css/index.styl"/>