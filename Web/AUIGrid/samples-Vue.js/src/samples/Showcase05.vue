<template>
  <div>
    <div wrap class="desc">
      <v-toolbar flat>
        <v-btn dark @click="exportClick()">엑셀(xlsx)로 저장</v-btn>
        <v-btn dark @click="exportPdfClick()">PDF로 저장</v-btn>
      </v-toolbar>

      <p>
        각각의 나라에 따라 각 제품별로 판매량을 보기 위해 그룹핑을 하여 가격에 대하여 합계를 계산한
        자료입니다.
      </p>
      <p>
        일반 데이터를 받아 그리드가 그룹핑을 하고, 각 나라, 제품에 대하여 그리드에서 직접 합계를
        계산합니다.
      </p>
      <p>필터링 또는 데이터 값 수정 시 동적으로 그룹핑 합계 및 푸터 값이 변경됩니다.</p>
    </div>
    <!-- AUIGrid 컴포넌트 설정 -->
    <AUIGrid ref="myGrid" name="showcase5" class="grid-wrap"> </AUIGrid>
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
      useContextMenu: true,
      showBranchOnGrouping: false,
      enableFilter: true,
      showFooter: true,
      editable: true,
      // singleRow 선택모드
      selectionMode: "multipleCells",
      // 그룹핑 패널 사용
      useGroupingPanel: true,
      // 차례로 country, product 순으로 그룹핑을 합니다.
      // 즉, 각 나라별, 각 제품을 구매한 사용자로 그룹핑
      groupingFields: ["country", "product"],
      // 그룹핑 후 합계필드를 출력하도록 설정합니다.
      groupingSummary: {
        // 합계 필드는 price 1개에 대하여 실시 합니다.
        dataFields: ["price"]
      },
      // 최초 보여질 때 모두 열린 상태로 출력 여부
      displayTreeOpen: true,
      // 그룹핑 후 셀 병함 실행
      enableCellMerge: true,

      // 그리드 ROW 스타일 함수 정의
      rowStyleFunction: function(rowIndex, item) {
        if (item._$isGroupSumField) {
          // 그룹핑으로 만들어진 합계 필드인지 여부
          // 그룹핑을 더 많은 필드로 하여 depth 가 많아진 경우는 그에 맞게 스타일을 정의하십시오.
          // 현재 3개의 스타일이 기본으로 정의됨.(AUIGrid_style.css)
          switch (
            item._$depth // 계층형의 depth 비교 연산
          ) {
            case 2:
              return "aui-grid-row-depth1-style";
            case 3:
              return "aui-grid-row-depth2-style";
            case 4:
              return "aui-grid-row-depth3-style";
            default:
              return "aui-grid-row-depth-default-style";
          }
        }

        return null;
      }
    },
    // AUIGrid 칼럼 레이아웃
    columnLayout: [
      {
        dataField: "orderId",
        headerText: "Order ID",
        width: 140,
        filter: {
          showIcon: true,
          useExMenu: true
        }
      },
      {
        dataField: "country",
        headerText: "Country",
        width: 150,
        filter: {
          showIcon: true,
          useExMenu: true
        }
      },
      {
        dataField: "name",
        headerText: "Name",
        width: 150,
        filter: {
          showIcon: true,
          useExMenu: true
        }
      },
      {
        dataField: "product",
        headerText: "Product",
        width: 150,
        filter: {
          showIcon: true,
          useExMenu: true
        }
      },
      {
        dataField: "color",
        headerText: "Color",
        width: 150,
        filter: {
          showIcon: true,
          useExMenu: true
        }
      },
      {
        dataField: "price",
        headerText: "Price",
        dataType: "numeric",
        formatString: "#,##0",
        width: 150,
        style: "showcase5-aui-grid-my-right-style",
        filter: {
          showIcon: true,
          useExMenu: true
        }
      },
      {
        dataField: "phone",
        headerText: "Phone",
        width: 120
      },
      {
        dataField: "date",
        headerText: "Date"
      }
    ],

    // 푸터 설정
    footerObject: [
      {
        labelText: "∑",
        positionField: "#base"
      },
      {
        labelText: "총 판매액",
        positionField: "color"
      },
      {
        dataField: "price",
        positionField: "price",
        operation: "SUM",
        formatString: "#,##0",
        style: "showcase5-aui-grid-my-custom-sum-total"
      },
      {
        dataField: "price",
        positionField: "date",
        operation: "COUNT",
        style: "showcase5-aui-grid-my-custom-sum-total2"
      },
      {
        labelText: "총 판매 수=>",
        positionField: "phone",
        style: "showcase5-aui-grid-my-custom-sum-total2"
      }
    ],

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

    // 푸터 객체 세팅
    grid.setFooter(this.footerObject);

    // 초기 데이터
    this.requestMyData();
  },

  methods: {
    // 데이터 요청 메소드
    requestMyData() {
      let grid = this.$refs.myGrid;
      grid.showAjaxLoader();
      // axios 모듈을 통하여 요청합니다.
      const REQ_URL = "./data/country_phone_500.json";
      this.$http.get(REQ_URL).then(result => {
        this.gridData = result.data;
        grid.removeAjaxLoader();
      });
    },

    // 달력 아이콘 클릭하면 실제로 달력을 띄움.
    // 즉, 수정으로 진입함.
    calIconClick() {
      let grid = this.$refs.myGrid;
      grid.openInputer();
    },

    // 엑셀로 내보내기
    exportClick() {
      let grid = this.$refs.myGrid;

      // 내보내기 속성
      let exportProps = {
        // 헤더 내용
        headers: [
          {
            text: "",
            height: 20 // 첫행 빈줄
          },
          {
            text: "국가별 핸드폰 판매 통계",
            height: 40,
            style: {
              fontSize: 20,
              textAlign: "center",
              color: "#ff0000",
              fontWeight: "bold",
              underline: true,
              background: "#DAD9FF"
            }
          },
          {
            text: "",
            height: 5,
            style: {
              background: "#555555"
            } // 빈줄 색깔 경계 만듬
          }
        ],

        // 푸터 내용
        footers: [
          {
            text: "",
            height: 5,
            style: {
              background: "#555555"
            } // 빈줄 색깔 경계 만듬
          },
          {
            text: "Copyright 2019 AUISoft",
            height: 24,
            style: {
              textAlign: "right",
              fontWeight: "bold",
              color: "#ffffff",
              background: "#222222"
            }
          }
        ]
      };

      // 내보내기 실행
      grid.exportToXlsx(exportProps);
    },

    // PDF 로 내보내기
    exportPdfClick() {
      let grid = this.$refs.myGrid;

      // 완전한 HTML5 를 지원하는 브라우저에서만 PDF 저장 가능( IE=10부터 가능 )
      if (!grid.isAvailabePdf()) {
        alert("PDF 저장은 HTML5를 지원하는 최신 브라우저에서 가능합니다.(IE는 10부터 가능)");
        return;
      }

      // PDF 내보내기 속성
      let exportProps = {
        // 폰트 지정
        fontPath: "./fonts/jejugothic-regular.ttf",

        // 헤더 내용
        headers: [
          {
            text: "",
            height: 20 // 첫행 빈줄
          },
          {
            text: "국가별 핸드폰 판매 통계",
            height: 40,
            style: {
              fontSize: 20,
              textAlign: "center",
              color: "#0275BA",
              underline: true,
              background: "#DAD9FF"
            }
          },
          {
            text: "",
            height: 5,
            style: {
              background: "#555555"
            } // 빈줄 색깔 경계 만듬
          }
        ],

        // 푸터 내용
        footers: [
          {
            text: "",
            height: 5,
            style: {
              background: "#555555"
            } // 빈줄 색깔 경계 만듬
          },
          {
            text: "Copyright 2019 AUISoft",
            height: 24,
            style: {
              textAlign: "right",
              color: "#ffffff",
              background: "#222222"
            }
          }
        ]
      };
      // 내보내기 실행
      grid.exportToPdf(exportProps);
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
.showcase5-aui-grid-my-right-style {
  text-align: right;
}
/* 푸터 커스텀 summary total  스타일 */
.showcase5-aui-grid-my-custom-sum-total {
  font-weight: bold;
  color: #4374d9;
  text-align: right;
}
.showcase5-aui-grid-my-custom-sum-total2 {
  text-align: right;
}
</style>
