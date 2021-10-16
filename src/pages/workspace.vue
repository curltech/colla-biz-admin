<template lang="pug">
  q-layout.bg-c-grey-1(view="lHh LpR lFf" ':style'="layoutStyle")
    q-header.text-c-grey-10(bordered ':class'="$q.dark.isActive ? 'header_dark' : 'header_normal'")
      q-toolbar
        q-btn(
          flat,
          dense,
          round,
          color="primary",
          text-color="white",
          @click="leftDrawerOpen = !leftDrawerOpen",
          aria-label="Menu",
          icon="menu",
          class="q-mr-sm"
        )
        q-toolbar-title.text-white.text-weight-bold(shrink) CurlTech Admin
        q-space
        .row.no-wrap
          q-input(outlined debounce="300"
            dense,
            v-model="search",
            placeholder="Search"
          )
            template(v-slot:append)
              q-btn(
                no-caps,
                flat,
                icon="search",
                unelevated
              )
        q-space
        .q-gutter-sm.row.items-center.no-wrap
        q-btn(flat round icon="photo" color="primary" text-color="white", @click="changeBackground")
        q-btn(
          class="q-mr-xs"
          flat
          round
          color="primary",
          text-color="white",
          @click="$q.dark.toggle()"
          :icon="$q.dark.isActive ? 'nights_stay' : 'wb_sunny'")
        q-btn(round dense flat color="primary" text-color="white", :icon="$q.fullscreen.isActive ? 'fullscreen_exit' : 'fullscreen'"
          @click="$q.fullscreen.toggle()"
          v-if="$q.screen.gt.sm")
        q-btn(
          round,
          dense,
          flat,
          color="primary"
          text-color="white",
          icon="message",
          v-if="$q.screen.gt.sm"
        )
          q-tooltip Messages
        q-btn(
          round,
          dense,
          flat,
          color="primary"
          text-color="white",
          icon="notifications"
        )
          q-badge(color="red", text-color="white", floating) 2
          q-tooltip Notifications
        q-btn(round, flat, color="primary", text-color="white")
          q-avatar(size="26px")
            img(src="https://cdn.quasar.dev/img/boy-avatar.png")
          q-tooltip Account
    q-drawer(
      v-model="leftDrawerOpen",
      show-if-above,
      side="left"
    )
      div(class="full-height" :class="$q.dark.isActive ? 'drawer_dark' : 'drawer_normal'")
        q-scroll-area(style="height:100%;")
          q-list(padding)
            q-item(active-class="tab-active" to="/rbac/user" exact
              class="q-ma-sm navigation-item" clickable v-ripple)
              q-item-section(avatar)
                q-icon(name="person")
              q-item-section 用户
            q-item(active-class="tab-active" to="/basecode/basecode" exact
            class="q-ma-sm navigation-item" clickable v-ripple)
              q-item-section(avatar)
                q-icon(name="code")
              q-item-section 基本编码
            q-item(active-class="tab-active" to="/stock/share" exact
            class="q-ma-sm navigation-item" clickable v-ripple)
              q-item-section(avatar)
                q-icon(name="stock")
              q-item-section 股票
            q-item(active-class="tab-active" to="/stock/shareIndex" exact
            class="q-ma-sm navigation-item" clickable v-ripple)
              q-item-section(avatar)
                q-icon(name="dashboard")
              q-item-section 股票指标
    q-page-container
      q-page.grad(class="row no-wrap")
        div(class="col")
          div(class="full-height")
            q-scroll-area(class="col q-pr-none full-height" visible)
              router-view
</template>
<script src="./workspace.vue.js"/>
<style lang="stylus" src="../css/index.styl"/>
