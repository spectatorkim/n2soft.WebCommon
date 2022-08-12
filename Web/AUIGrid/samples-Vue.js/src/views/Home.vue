<template>
  <v-container>
    <v-layout text-xs-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3">
          AUIGrid for Vue.js
        </h1>
        <p class="subheading font-weight-regular">
          자바스크립트 프레임워크 중 하나인 Vue.js 에서 AUIGrid 를 어떻게 사용 할 수 있는지를
          보여주는 데모입니다.
        </p>
        <p>
          AUIGrid 의 상세 기능에 대한 데모를 보고자 한다면
          <a href="http://www.auisoft.net/demo/auigrid">여기</a>를 클릭하세요.
        </p>
      </v-flex>
      <v-flex xs12 mb-5>
        <v-layout row>
          <v-flex xs12 sm6 offset-sm3>
            <p>
              본 데모는 다음 환경에서 제작되었습니다.
            </p>
            <v-card flat>
              <v-list two-line>
                <template v-for="(item, index) in items">
                  <v-subheader v-if="item.header" :key="item.header">
                    {{ item.header }}
                  </v-subheader>

                  <v-divider v-else-if="item.divider" :key="index" :inset="item.inset"></v-divider>

                  <v-list-tile v-else :key="item.title">
                    <v-list-tile-avatar>
                      <v-icon>adjust</v-icon>
                    </v-list-tile-avatar>
                    <v-list-tile-content>
                      <v-list-tile-title v-html="item.title"></v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
              </v-list>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs12 mb-5>
        <h2 class="headline font-weight-bold mb-3">
          HOW TO CODE
        </h2>
        <p class="subheading font-weight-regular">
          Vue CLI 환경에서 다음처럼 코딩하여 AUIGrid 사용이 가능합니다.
        </p>
      </v-flex>
      <v-flex mb-5 xs12>
        <v-img
          :src="`./assets/auigrid-vue-home.png`"
          class="grey lighten-2"
          max-width="607"
          style="margin:0 auto;"
        >
          <template v-slot:placeholder>
            <v-layout fill-height align-center justify-center ma-0>
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-layout>
          </template>
        </v-img>
      </v-flex>
      <v-flex mb-4>
        <v-btn
          block
          href="http://auisoft.net/demo/auigrid/index.html"
          target="_blank"
          >일반 Javascript 환경의 데모 보러 가기</v-btn
        >
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      items: [
        {
          title: "Node.js - v10.9.0"
        },
        {
          divider: true,
          inset: true
        },
        {
          title: "NPM - v6.2.0"
        },
        {
          divider: true,
          inset: true
        },
        {
          title: "Vue CLI - v3.6.3"
        }
      ]
    };
  }
};
</script>
