<template>
  <div>
    <div wrap class="desc">
      <v-toolbar flat>
        <v-btn dark @click="exportClick()">엑셀(xlsx)로 저장</v-btn>
        <v-btn dark @click="exportPdfClick()">PDF로 저장</v-btn>
      </v-toolbar>
      <p>
        마케팅 예산을 계층 구조로 출력한 모습입니다. ( 계층구조 데이터 표현 )
      </p>
      <p>
        추세를 나타내는 스파크 라인은 합계에 해당되는 행(Row)에만 선택적으로 그리도록 설정한
        모습입니다.
      </p>
    </div>
    <!-- AUIGrid 컴포넌트 설정 -->
    <AUIGrid ref="myGrid" name="showcase3" class="grid-wrap"> </AUIGrid>
  </div>
</template>

<script>
// AUIGrid 컴포넌트
import AUIGrid from "../static/AUIGrid-Vue.js/AUIGrid.vue";
// 엑셀, PDF 다운로드를 브라우저에서 처리하기 위한 file-saver
import "file-saver";
// AUIGrid PDF 처리 모듈
import "../static/AUIGrid.pdfkit/AUIGrid.pdfkit.js";

export default {
  components: {
    AUIGrid
  },

  data: () => ({
    // 그리드 속성 정의
    auigridProps: {
      enableFilter: true,
      useContextMenu: true,
      showVerticalGridLines: false,
      fixedColumnCount: 1,
      fixedRowCount: 2,
      // 최초 보여질 때 모두 열린 상태로 출력 여부
      displayTreeOpen: true,
      // 체크박스 사용 안함
      showRowCheckColumn: false,
      showRowNumColumn: false,
      // 그리드 ROW 스타일 함수 정의
      rowStyleFunction: function(rowIndex, item) {
        if (item._isMySum) {
          // 데이터 작성 시 Sum Row 는 _isMySum 을 추가시켜놓음 ( 데이터 참고 )
          // 그룹핑을 더 많은 필드로 하여 depth 가 많아진 경우는 그에 맞게 스타일을 정의하십시오.
          // 현재 3개의 스타일이 기본으로 정의됨.(AUIGrid_style.css)
          switch (
            item._$depth // 계층형의 depth 비교 연산
          ) {
            case 1:
              return "aui-grid-row-depth1-style";
            case 2:
              return "aui-grid-row-depth2-style";
            case 3:
              return "aui-grid-row-depth3-style";
            default:
              return "aui-grid-row-depth-default-style";
          }
        }

        return null;
      }
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
    // 초기 데이터
    this.requestMyData();
  },

  methods: {
    // AUIGrid 칼럼 레이아웃
    createLayout() {
      return [
        {
          dataField: "title",
          headerText: " ",
          width: 280
        },
        {
          dataField: "m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12",
          headerText: "추 세",
          headerTooltip: {
            show: true,
            tooltipHtml: "합계 행에 대하여 1월에서 12월 간 추세를 나타냅니다."
          },
          renderer: {
            type: "SparkLineRenderer",
            markLowValue: true,
            renderingField: "_isMySum" // 데이터에서 _isMySum 필드의 값이 true 인 경우만 스파크 그림
          },
          width: 120
        },
        {
          headerText: "2014 상반기",
          children: [
            {
              dataField: "m1",
              headerText: "1월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m2",
              headerText: "2월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m3",
              headerText: "3월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m4",
              headerText: "4월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m5",
              headerText: "5월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m6",
              headerText: "6월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            }
          ]
        },
        {
          headerText: "2014 하반기",
          children: [
            {
              dataField: "m7",
              headerText: "7월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m8",
              headerText: "8월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m9",
              headerText: "9월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m10",
              headerText: "10월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m11",
              headerText: "11월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            },
            {
              dataField: "m12",
              headerText: "12월",
              width: 60,
              dataType: "numeric",
              formatString: "#,##0",
              style: "showcase3-my-column-text-right"
            }
          ]
        },
        {
          headerText: "합계",
          dataField: "mySumCol", // 해당 칼럼에 출력 시키는 값은 dataField 가 아닌 해당 row 의 m1~m12의  합을 labelFunction() 으로 출력시킴
          dataType: "numeric",
          style: "showcase3-strong-cells",
          labelFunction: function(rowIndex, columnIndex, labelText, headerText, item) {
            if (!item._$isBranch) {
              let sum = 0;
              let c_value;
              for (let i = 1; i <= 12; i++) {
                c_value = Number(item["m" + i]);
                if (!isNaN(c_value)) sum += c_value;
              }
              if (isNaN(sum)) return "";
              else return window.AUIGrid.formatNumber(sum, "#,##0.00");
            }
            return "";
          }
        }
      ];
    },

    // 데이터 요청 메소드
    requestMyData() {
      let grid = this.$refs.myGrid;
      grid.showAjaxLoader();
      // axios 모듈을 통하여 요청합니다.
      const REQ_URL = "./data/chanel_marketing.json";
      this.$http.get(REQ_URL).then(result => {
        this.gridData = result.data;
        grid.removeAjaxLoader();
      });
    },

    // 엑셀로 내보내기
    exportClick() {
      let grid = this.$refs.myGrid;
      // 내보내기 실행
      grid.exportToXlsx({
        isRowStyleFront: false
      });
    },

    // PDF 로 내보내기
    exportPdfClick() {
      let grid = this.$refs.myGrid;

      // 완전한 HTML5 를 지원하는 브라우저에서만 PDF 저장 가능( IE=10부터 가능 )
      if (!grid.isAvailabePdf()) {
        alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
        return;
      }

      // 내보내기 실행
      grid.exportToPdf({
        // 폰트 경로 지정
        fontPath: "./fonts/jejugothic-regular.ttf",
        isRowStyleFront: false
      });
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
.showcase3-strong-cells {
  text-align: right;
  font-weight: bold;
  color: #2f9d27;
}
.showcase3-my-column-text-right {
  text-align: right;
}
</style>
