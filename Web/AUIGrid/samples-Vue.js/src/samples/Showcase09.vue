<template>
  <div>
    <div class="desc">
      <p>
        달력에 개별 날짜마다 목표치 달성률을 표시한 데모입니다.
      </p>
      <p>
        그리드에 출력되는 셀은 사용자 정의 렌더러(CustomRenderer)를 사용하였습니다.
      </p>
      <p>
        이와 같이 사용자가 원하는 셀 형식을 자바스크립트로 작성할 수 있습니다.
      </p>
      <div class="text-xs-center">
        <v-btn dark @click="changeData(-1)">이전 달</v-btn>
        <span v-if="formatOriginDate !== null" class="pl-3 pr-3">{{ formatOriginDate }}</span>
        <v-btn dark @click="changeData(1)">다음 달</v-btn>
      </div>
    </div>
    <!-- AUIGrid 컴포넌트 설정 -->
    <AUIGrid ref="myGrid" name="showcase9" class="grid-wrap"> </AUIGrid>
  </div>
</template>

<script>
// AUIGrid 컴포넌트
import AUIGrid from "../static/AUIGrid-Vue.js/AUIGrid.vue";

// AUIGrid 커스텀렌더러 import
import "../static/AUIGrid/renderers/AUIGrid.MyCalendarRenderer";

export default {
  components: {
    AUIGrid
  },
  data: () => ({
    // 오늘 날짜
    originDate: new Date(),

    formatOriginDate: null,

    // 그리드 칼럼 레이아웃
    columnLayout: [
      {
        dataField: "0",
        headerText: "일",
        style: "my-sunday-style",
        headerStyle: "my-sunday-style",
        renderer: {
          type: "CustomRenderer",
          jsClass: window.AUIGrid.MyCalendarRenderer
        }
      },
      {
        dataField: "1",
        headerText: "월",
        renderer: {
          type: "CustomRenderer",
          jsClass: window.AUIGrid.MyCalendarRenderer
        }
      },
      {
        dataField: "2",
        headerText: "화",
        renderer: {
          type: "CustomRenderer",
          jsClass: window.AUIGrid.MyCalendarRenderer
        }
      },
      {
        dataField: "3",
        headerText: "수",
        renderer: {
          type: "CustomRenderer",
          jsClass: window.AUIGrid.MyCalendarRenderer
        }
      },
      {
        dataField: "4",
        headerText: "목",
        renderer: {
          type: "CustomRenderer",
          jsClass: window.AUIGrid.MyCalendarRenderer
        }
      },
      {
        dataField: "5",
        headerText: "금",
        renderer: {
          type: "CustomRenderer",
          jsClass: window.AUIGrid.MyCalendarRenderer
        }
      },
      {
        dataField: "6",
        headerText: "토",
        style: "my-saturday-style",
        headerStyle: "my-saturday-style",
        renderer: {
          type: "CustomRenderer",
          jsClass: window.AUIGrid.MyCalendarRenderer
        }
      }
    ],

    // 그리드 속성 정의
    auigridProps: {
      selectionMode: "none",
      enableSorting: false,
      showRowNumColumn: false,
      enableColumnResize: false,
      //rowHeight 80으로 설정
      rowHeight: 80
    },

    // 그리드 데이터
    gridData: []
  }),

  watch: {
    // gridData 가 변경될 때 마다 이 기능이 실행됩니다.
    gridData: function() {
      let grid = this.$refs.myGrid;
      // gridData 변경 될 때 그리드에 다시 삽입
      grid.setGridData(this.gridData);
    }
  },

  mounted() {
    let grid = this.$refs.myGrid;
    // 그리드 생성
    grid.create(this.columnLayout, this.auigridProps);

    // 초기 데이터 생성
    this.gridData = this.genGridData(this.originDate);
  },

  methods: {
    genGridData() {
      let date = new Date(this.originDate);
      let thisYear = date.getFullYear();
      let thisMonth = date.getMonth() + 1; // 실제 보이는 월
      let startDay = new Date(thisYear, thisMonth - 1, 1);
      let endDay = new Date(thisYear, thisMonth, 0); // 말일
      let endCount = endDay.getDate();
      let weekArray = [];
      let data = [];
      let i;
      startDay = startDay.getDay();
      // 달력 앞의 빈 날짜들
      for (let i = 0; i < startDay; i++) {
        weekArray.push(null);
      }

      // 진짜 날짜들
      for (i = 1; i <= endCount; i++) {
        if (weekArray.length == 7) {
          data.push(weekArray);
          weekArray = [];
        }
        weekArray.push({
          date: i,
          value: Math.floor(Math.random() * 100)
        });
      }

      // 달력 마지막 주의 날짜들
      if (weekArray.length != 0) {
        data.push(weekArray);
      }
      //console.log(JSON.stringify(data));
      this.formatOriginDate = window.AUIGrid.formatDate(date, "yyyy년 mm월");
      return data;
    },

    // 데이터 변경
    changeData(direction) {
      if (Number(direction) > 0) {
        // 다음 달
        this.gridData = this.genGridData(this.originDate.setMonth(this.originDate.getMonth() + 1));
      } else {
        // 이전 달
        this.gridData = this.genGridData(this.originDate.setMonth(this.originDate.getMonth() - 1));
      }
    }
  }
};
</script>
<style scoped>
.grid-wrap {
  width: 100%;
  height: 430px;
}
</style>

<style>
/* CustomRenderer 스타일....AUIGrid.MyClientRenderer.js 에서 사용할 사용자가 정의해야 할 스타일입니다.*/
#aui-grid-wrap-showcase9 .aui-grid-renderer-custom .my-child1 {
  position: absolute;
  display: block;
  left: 4px;
  top: 4px;
  font-size: 13px;
  background: #eee;
  border: 1px solid #ddd;
  width: 20px;
  height: 20px;
  border-radius: 10px;
  font-weight: bold;
}
#aui-grid-wrap-showcase9 .aui-grid-renderer-custom .my-child2 {
  position: absolute;
  top: 4px;
  right: 4px;
  width: 20px;
  height: 20px;
  background: url(../assets/info-icon.png) 50% 50% no-repeat;
  cursor: pointer;
}
#aui-grid-wrap-showcase9 .aui-grid-renderer-custom .my-chart-base {
  /* 차트 베이스*/
  position: absolute;
  display: block;
  top: 50px;
  width: 90px;
  height: 15px;
  border: 1px solid #ccc;
  left: 10px;
}
#aui-grid-wrap-showcase9 .aui-grid-renderer-custom .my-chart {
  /* 차트 */
  display: block;
  top: 22px;
  width: 80px;
  height: 15px;
}
#aui-grid-wrap-showcase9 .aui-grid-renderer-custom .my-chart-label {
  /* 차트 텍스트 */
  position: absolute;
  display: inline;
  font-size: 18px;
  color: #000;
  top: 30px;
  left: 45px;
}
/* CustomRenderer 스타일 끝*/
#aui-grid-wrap-showcase9 .my-saturday-style {
  color: #0000ff;
}
#aui-grid-wrap-showcase9 .my-sunday-style {
  color: #ff0000;
}
</style>
