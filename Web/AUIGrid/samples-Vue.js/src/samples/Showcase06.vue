<template>
  <div>
    <div class="desc">
      <v-toolbar flat>
        <v-btn dark @click="exportClick()">엑셀(xlsx)로 저장</v-btn>
        <v-btn dark @click="exportPdfClick()">PDF로 저장</v-btn>
      </v-toolbar>
      <p>
        손익을 크게 매출 수익, 원가, 경비로 보고 해당 내역을 출력한 모습입니다.
      </p>
    </div>
    <!-- AUIGrid 컴포넌트 설정 -->
    <AUIGrid ref="myGrid" name="showcase6" class="grid-wrap"> </AUIGrid>
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
    // AUIGrid 칼럼 설정
    columnLayout: [
      {
        dataField: "type0",
        headerText: "구분",
        cellMerge: true,
        style: "showcase6-my-column-strong",
        filter: {
          showIcon: true
        }
      },
      {
        dataField: "type",
        headerText: "유형",
        width: 120
      },
      {
        dataField: "p131,p132,p133,p134,p135,p136,p137,p138,p139,p1310,p1311,p1312",
        headerText: "월별 추이",
        width: 120,
        renderer: {
          type: "SparkColumnRenderer"
        }
      },
      {
        dataField: "p131",
        headerText: "'13 1월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p132",
        headerText: "'13 2월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p133",
        headerText: "'13 3월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p134",
        headerText: "'13 4월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p135",
        headerText: "'13 5월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p136",
        headerText: "'13 6월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p137",
        headerText: "'13 7월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p138",
        headerText: "'13 8월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p139",
        headerText: "'13 9월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p1310",
        headerText: "'13 10월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p1311",
        headerText: "'13 11월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      },
      {
        dataField: "p1312",
        headerText: "'13 12월",
        style: "showcase6-my-column-text-right",
        dataType: "numeric",
        formatString: "#,##0"
      }
    ],

    // 그리드 속성 정의
    auigridProps: {
      enableCellMerge: true,
      enableFilter: true,
      editable: true,
      // singleRow 선택모드
      selectionMode: "multipleCells",
      // 줄번호 칼럼 렌더러 출력 안함
      showRowNumColumn: false,
      // 체크박스 표시 렌더러 출력 안함
      showRowCheckColumn: false,
      rowStyleFunction: function(rowIndex, item) {
        if (item._mySum || item._mySum == "true") {
          return "aui-grid-row-depth2-style";
        }
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
    grid.create(this.columnLayout, this.auigridProps);

    // 초기 데이터
    this.requestMyData();
  },

  methods: {
    // 데이터 요청 메소드
    requestMyData() {
      let grid = this.$refs.myGrid;
      grid.showAjaxLoader();
      // axios 모듈을 통하여 요청합니다.
      const REQ_URL = "./data/profit.json";
      this.$http.get(REQ_URL).then(result => {
        this.gridData = result.data;
        grid.removeAjaxLoader();
      });
    },

    // 엑셀로 내보내기
    exportClick() {
      let grid = this.$refs.myGrid;
      // 내보내기 실행
      grid.exportToXlsx();
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
        fontPath: "./fonts/jejugothic-regular.ttf"
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
.showcase6-my-column-strong {
  background: #eee;
  color: #000;
  font-weight: bold;
  text-align: center;
}
.showcase6-my-column-text-right {
  text-align: right;
}
</style>
