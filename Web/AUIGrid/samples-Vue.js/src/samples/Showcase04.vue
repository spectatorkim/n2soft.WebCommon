<template>
  <div>
    <div class="desc">
      <p>
        실시간 주식 현황(나의 관심 종목)을 구현한 데모입니다.
      </p>
      <p>
        주식은 가상의 주식으로 랜덤하게 로컬에서 0.3초 마다 거래가 이루어진 종목만 갱신하도록 설정한
        모습입니다.
      </p>
      <p>
        처음 데이터를 그리드에 삽입 한 후 그리드에 특정 행의 셀 값(현재가, 대비가, 거래량)만
        갱신하는 모습입니다.
      </p>
      <p>
        참고 : AUIGrid 가 서버와 통신하는 방법 및 속도까지 커버하지 않습니다. AUIGrid 는 단순히
        출력해 주는 역할만 할 뿐입니다. 이 데모와 같이 빠른 속도로 주식 정보를 갱신하는 것은 일반
        Ajax 통신으론 불가능합니다.
      </p>
      <p>
        만약, 웹 상에서 주식 정보를 실시간으로 빠르게 갱신하고자 한다면 웹소켓(Web Socket)으로
        구성하는 것이 최선일 것입니다.
      </p>
    </div>
    <!-- AUIGrid 컴포넌트 설정 -->
    <AUIGrid ref="myGrid" name="showcase4" class="grid-wrap"> </AUIGrid>
  </div>
</template>

<script>
// AUIGrid 컴포넌트
import AUIGrid from "../static/AUIGrid-Vue.js/AUIGrid.vue";

export default {
  components: {
    AUIGrid
  },

  data: () => ({
    // eslint-disable-next-line
    names : [ "A 전자", "B 상사", "C 철강", "D 회사", "E 통신", "F 공사", "G 주식회사", "H 인터넷", "I 식품", "J 제과", "K 연구소", "L 전자", "M 화학", "N 인터넷", "O로 통신", "P 주식회사", "Q 코스메틱", "R 청과", "S 방송", "T 자동차", "UU 엔터"],
    // eslint-disable-next-line
    prices : [ 150000, 230000, 420000,1200000,320000,100000,240000,320000,520000,820000,300000, 200000,200000,200000,200000, 200000, 200000, 200000, 200000, 200000, 200000],
    // eslint-disable-next-line
    gaps : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // eslint-disable-next-line
    volumes : [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    // 그리드 속성 정의
    auigridProps: {
      // row 를 구별짓는 유니크한 값을 갖는 필드 설정 ( 대용량인 경우 반드시 설정해야 함 )
      rowIdField: "id"
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
    grid.create(this.createLayout(), this.auigridProps);

    this.createRandomData(1000);
  },

  methods: {
    // AUIGrid 칼럼 레이아웃
    createLayout() {
      return [
        {
          dataField: "name",
          headerText: "종목명",
          width: 200
        },
        {
          dataField: "price",
          headerText: "현재가",
          width: 120,
          dataType: "numeric",
          style: "my-right-style",
          formatString: "#,##0"
        },
        {
          dataField: "gap",
          headerText: "대비",
          dataType: "numeric",
          formatString: "#,##0",
          style: "my-right-style",
          width: 120,
          renderer: {
            type: "IconRenderer",
            iconPosition: "aisle",
            iconWidth: 7, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
            iconHeight: 6,
            iconFunction: function(rowIndex, columnIndex, value, item) {
              if (item.gap < 0) return "./assets/ico_down.gif";
              else if (item.gap > 0) return "./assets/ico_up.gif";
              return "./assets/ico_flat.gif";
            }
          },
          styleFunction: function(rowIndex, columnIndex, value, headerText, item) {
            if (item.gap < 0) return "my-custom-down";
            else if (item.gap > 0) return "my-custom-up";
            return "my-custom-normal";
          }
        },
        {
          dataField: "rate",
          headerText: "등락율",
          dataType: "numeric",
          formatString: "#,##0.00",
          postfix: " %",
          style: "my-right-style",
          width: 120,
          expFunction: function(rowIndex, columnIndex, item) {
            // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
            // expFunction 의 리턴형은 항상 Number 여야 합니다.(즉, 수식만 가능)
            let oldPrice = item.price - item.gap;
            let rate = Number(((item.gap / oldPrice) * 100).toFixed(2));
            return rate;
          },
          // eslint-disable-next-line
          styleFunction: function(rowIndex, columnIndex, value, headerText, item) {
            if (item.gap < 0) return "my-custom-down";
            else if (item.gap > 0) return "my-custom-up";
            return "my-custom-normal";
          }
        },
        {
          dataField: "rateGraph",
          headerText: "등락율 그래프",
          width: 120,
          expFunction: function(rowIndex, columnIndex, item) {
            // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
            return item.rate;
          },
          renderer: {
            type: "BarRenderer",
            showLabel: false,
            min: -30,
            max: 30,
            offset: 30
          }
        },
        {
          dataField: "volume",
          headerText: "거래량",
          dataType: "numeric",
          formatString: "#,##0",
          style: "my-right-style",
          width: 120
        },
        {
          dataField: "open",
          headerText: "시가",
          dataType: "numeric",
          formatString: "#,##0",
          style: "my-right-style",
          width: 120
        },
        {
          dataField: "high",
          headerText: "고가",
          dataType: "numeric",
          formatString: "#,##0",
          style: "my-custom-up",
          expFunction: function(rowIndex, columnIndex, item) {
            // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
            return Math.max(item.high, item.price);
          },
          width: 120
        },
        {
          dataField: "low",
          headerText: "저가",
          dataType: "numeric",
          formatString: "#,##0",
          style: "my-custom-down",
          expFunction: function(rowIndex, columnIndex, item) {
            // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
            return Math.min(item.price, item.low);
          }
        }
      ];
    },

    // count 수만큼 랜덤 데이터 생성
    createRandomData() {
      let grid = this.$refs.myGrid;
      let data = [];
      let count = this.names.length;
      for (let i = 0; i < count; i++) {
        data.push({
          id: i + 1,
          name: this.names[i],
          price: this.prices[i],
          open: this.prices[i],
          high: this.prices[i],
          low: this.prices[i],
          gap: 0,
          volume: 0
        });
      }

      // AUIGrid 에 데이터 삽입합니다.
      grid.setGridData(data);

      // 0.3초 갱신
      setInterval(this.refreshRows, 300);
    },

    // 특정 행들만 갱신
    // 주식 종목 중 랜덤하게 갱신할 종목을 선택해서...랜덤하게 상승, 하락을 결정해 그리드에 반영시킴.
    refreshRows() {
      let grid = this.$refs.myGrid;
      let rows = [];
      let codes = [];
      let code;
      let gap;
      let isPlus = false;
      let index;
      let price;
      let codeCount = this.names.length; // 종목개수
      let limitGap;
      let i;
      // 랜덤 개수만큼 갱신
      let count = Math.floor(Math.random() * 10);

      for (i = 0; i < count; i++) {
        code = Math.ceil(Math.random() * codeCount);
        codes.push(code);
      }

      for (i = 0, count = codes.length; i < count; i++) {
        isPlus = Math.random() > 0.5 ? true : false; // 상승, 하락 랜덤 결정
        gap = 3000; // 호가

        if (!isPlus) {
          gap *= -1;
        }

        index = codes[i] - 1;

        price = this.prices[index];

        // 상하한 제한
        limitGap = price * 0.3;

        // 대비 값(상승 또는 하락 대비 가격)
        this.gaps[index] += gap;
        gap = this.gaps[index];

        // 상하한가인 경우
        if (Math.abs(gap) > limitGap) {
          gap = gap > 0 ? limitGap : -limitGap;
        }

        price += gap;
        this.volumes[index] += Math.floor(Math.random() * 10000); // 거래량 랜덤 누적

        // 갱신할 행들
        rows.push({
          id: codes[i], // rowIdField 로 설정한 id(중요)
          price: price, // 현재가
          gap: gap, // 대비가
          volume: this.volumes[index] // 거래량
        });
      }

      // AUIGrid 에 갱신할 행들 삽입
      // refreshRows 사용하기 전에 반드시 rowIdField 속성을 선행으로 설정해야합니다.
      if (grid) grid.refreshRows(rows, "my-refresh-row-flash-style", 200);
    }
  }
};
</script>
<style scoped>
.grid-wrap {
  width: 100%;
  height: 500px;
}
</style>

<style>
#aui-grid-wrap-showcase4 .my-right-style {
  text-align: right;
}

/* 행 갱신 시 깜빡이게 하는 스타일 */
#aui-grid-wrap-showcase4 .my-refresh-row-flash-style {
  background: #dfdfdf;
}

/* 주식 하락 색상*/
#aui-grid-wrap-showcase4 .my-custom-down {
  color: #0000ff;
  text-align: right;
}
/* 주식 상승 색상*/
#aui-grid-wrap-showcase4 .my-custom-up {
  color: #ff0000;
  text-align: right;
}
#aui-grid-wrap-showcase4 .my-custom-normal {
  color: inherit;
  text-align: right;
}

/* 바게이지 양수 음수 함께 사용되는 영역에서 음수 바 재정의*/
#aui-grid-wrap-showcase4 .aui-grid-bar-renderer-negative {
  background: #4641d9;
  border: 1px solid #4641d9;
}
/* 바게이지 양수 음수 함께 사용되는 영역에서 양수 바 재정의*/
#aui-grid-wrap-showcase4 .aui-grid-bar-renderer-positive {
  background: #df4d4d;
  border: 1px solid #df4d4d;
}
</style>
