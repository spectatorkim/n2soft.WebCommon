<template>
  <v-app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      fixed
      app
      style="margin-top:90px;"
    >
      <v-list dense>
        <template v-for="item in items">
          <v-list-group
            v-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon="icon-alt"
          >
            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-list-tile-title>
                    {{ item.text }}
                  </v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </template>
            <v-list-tile
              v-for="(child, i) in item.children"
              :key="i"
              router
              :to="{
                name: child.href
              }"
            >
              <v-list-tile-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title>
                  {{ child.text }}
                </v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-group>
          <v-list-tile
            v-else
            :key="item.text"
            router
            :to="{
              name: item.href
            }"
            active-class="gray--text"
          >
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title>
                {{ item.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </template>
      </v-list>
    </v-navigation-drawer>

    <v-toolbar :clipped-left="$vuetify.breakpoint.lgAndUp" dark app fixed height="90">
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>

      <v-layout row>
        <v-toolbar-title class="ml-0 pr-3">
          <v-img
            :src="require('./assets/auisoft.png')"
            width="150"
            height="54"
            class="hidden-sm-and-down mt-2"
          ></v-img>
        </v-toolbar-title>
        <v-toolbar-title class="ml-0 mt-2 pr-3 pl-3">
          <span class="heading">AUIGrid 3.0 DEMO for </span>
          <v-avatar size="48px" tile class="ml-2">
            <img :src="require('./assets/vue-logo.png')" alt="Vue.js" />
          </v-avatar>
        </v-toolbar-title>
      </v-layout>

      <v-spacer></v-spacer>
      <v-btn
        color="#ee5315"
        class="hidden-sm-and-down"
        href="http://auisoft.net/dcenter.html"
        target="_blank"
        >DOWNLOAD FREE TRIAL</v-btn
      >
      <v-btn
        color="#ee5315"
        class="hidden-sm-and-down"
        href="http://auisoft.net/price.html"
        target="_blank"
        >PRICING &amp; LICENSE</v-btn
      >
    </v-toolbar>
    <v-content>
      <v-container style="max-width:1300px;">
        <router-view></router-view>
      </v-container>
    </v-content>
    <v-footer dark app class="pa-3">
      <v-spacer></v-spacer>
      <span class="white--text">Copyright &copy; 2019 AUISoft Co., Ltd.</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    drawer: null,
    items: [
      {
        icon: "home",
        text: "HOME",
        href: "home",
        model: false
      },
      {
        icon: "keyboard_arrow_up",
        "icon-alt": "keyboard_arrow_down",
        text: "????????????",
        model: true,
        children: [
          {
            text: "1. ?????? ?????? CRUD ?????????",
            href: "show01"
          },
          {
            text: "2. ???????????? ?????? ?????? ?????????",
            href: "show02"
          },
          {
            text: "3. ?????? ????????? ??????",
            href: "show03"
          },
          {
            text: "4. ????????? ?????? ??????",
            href: "show04"
          },
          {
            text: "5. ????????? ????????? ?????? ??????",
            href: "show05"
          },
          {
            text: "6. ?????? ?????? ??????",
            href: "show06"
          },
          {
            text: "7. ?????? ??????(EditingDemo)",
            href: "show07"
          },
          {
            text: "8. DB ?????????",
            href: "show08"
          },
          {
            text: "9. ?????? ????????? ????????? ?????????",
            href: "show09"
          }
        ]
      }
    ]
  })
};
</script>

<style>
html {
  overflow-y: auto !important;
  overflow-x: auto !important;
}
</style>
