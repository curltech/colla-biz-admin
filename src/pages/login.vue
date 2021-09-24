<template lang="pug">
  q-layout#layout(':style'="layoutStyle")
    q-page-container
      div(class="q-pa-md")
        q-card.grad(v-if="subKind==='default'" class="fixed-center q-pa-md" style="width: 400px")
          q-toolbar.loginToolbar(class="q-pa-none" style="margin-top: auto; margin-bottom: auto")
            q-btn(flat round icon="photo" color="primary" @click="changeBackground")
            q-space
            q-btn(flat icon="person_add" color="primary" @click="subKind='register'")
          q-form(ref="frmLogin" @submit="login" class="q-gutter-md q-pa-md")
            q-input.c-field(filled clearable v-model="loginData.connectAddress" lazy-rules :rules="[val => val && val.length > 0 || $t('Please input connectAddress')]" :label="$t('connectAddress')")
            q-select.c-field(:label="$t('Language')" filled v-model="loginData.language" emit-value map-options :options="languageOptions")
            q-input.c-field(filled clearable v-model="loginData.credential" :label="$t('Credential')")
            q-input.c-field(filled clearable v-model="loginData.password" type="password" :label="$t('Password')" lazy-rules)
            div
              q-btn(style="width:100%;" type="submit" color="primary" unelevated :label="$t('Login')" no-caps)
              q-btn(style="width:100%;" no-caps flat :label="$t('Reset')" type="reset" color="primary")
        q-card.grad(v-if="subKind==='register'" flat class="fixed-center q-pa-md" style="width: 400px")
          q-toolbar.loginToolbar(class="q-pa-none" style="margin-top: auto; margin-bottom: auto")
            q-btn(flat round icon="keyboard_arrow_left" @click="subKind = 'default'")
            q-space
          q-form(ref="frmRegister" @submit="register" class="q-pa-none")
            q-input.c-field(filled clearable v-model="registData.name" lazy-rules :rules="[val => val && val.length > 0 || $t('Please input Name')]" :label="$t('UserName')")
            q-input.c-field(filled clearable v-model="registData.nickName" lazy-rules :rules="[val => val && val.length > 0 || $t('Please input NickName')]" :label="$t('NickName')")
            q-input.c-field(filled clearable v-model="registData.mobile" lazy-rules :rules="[val => val && val.length > 0 || $t('Please input Mobile')]" :label="$t('Mobile')")
            q-input.c-field(filled clearable v-model="registData.email" lazy-rules :rules="[val => val && val.length > 0 || $t('Please input Email')]" :label="$t('Email')")
            q-input.c-field(type="password" filled clearable v-model="registData.password" lazy-rules :rules="[val => val && val.length > 0 || $t('Please input Password')]" :label="$t('Password')")
            q-input.c-field(type="password" filled clearable v-model="registData.confirmPassword" lazy-rules :rules="[val => val && val.length > 0 || $t('Please input ConfirmPassword')]" :label="$t('ConfirmPassword')")
            q-btn(style="width:100%;" type="submit" unelevated color="primary" :label="$t('Register')" no-caps)
</template>
<script src="./login.vue.js" />
<style lang="stylus" src="../css/login.styl"/>
