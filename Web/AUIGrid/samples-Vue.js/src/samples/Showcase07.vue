<template>
  <div>
    <div>
      <p>
        실제 DB에 저장, 수정 삭제 하는 Master-Details 데모입니다.(더블 클릭 또는 바로 키입력으로
        수정 가능)
      </p>
      <v-toolbar flat dense>
        <v-spacer />
        <div>
          <v-btn dark small @click="insertRow2MasterGrid">직원 추가</v-btn>
          <v-btn dark small @click="removeRowMasterGrid">선택 삭제</v-btn>
          <v-btn dark small @click="updateMasterData">DB 저장</v-btn>
          <v-btn dark small @click="requestMasterData">Refresh</v-btn>
        </div>
      </v-toolbar>
    </div>
    <!-- AUIGrid 마스터 컴포넌트 설정 -->
    <AUIGrid
      ref="masterGrid"
      name="showcase7-master"
      @selectionChange="selectionChangeHandler"
      @cellEditEndBefore="cellEditEndBeforeHandler"
    ></AUIGrid>
    <div>
      <v-toolbar flat dense>
        <span v-if="curName != ''">직원 : {{ curName }} 실적</span>
        <v-spacer />
        <div>
          <v-btn dark small @click="updateDetailData">DB 저장</v-btn>
          <v-btn dark small @click="requestDetailData">Refresh</v-btn>
        </div>
      </v-toolbar>
    </div>
    <!-- AUIGrid 디테일 컴포넌트 설정 -->
    <AUIGrid ref="detailGrid" name="showcase7-detail"> </AUIGrid>
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
    // Details 데이터 요청 지연 타임아웃
    timerId: null,
    // 마스터 그리드에서 선택된 행의 ID 보관
    curId: null,
    // 마스터 그리드에서 선택된 행의 ID 직원 이름
    curName: "",
    // AUIGrid 칼럼 설정
    columnLayoutMaster: [
      {
        dataField: "type",
        headerText: "구분",
        width: 140,
        renderer: {
          type: "IconRenderer",
          iconPosition: "aisle",
          iconWidth: 20, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
          iconHeight: 20,
          iconTableRef: {
            // icon 값 참조할 테이블 레퍼런스
            정규직: "./assets/green_circle.png",
            default: "./assets/gray_circle.png"
          }
        },
        editRenderer: {
          type: "DropDownListRenderer",
          list: ["정규직", "계약직"]
        }
      },
      {
        dataField: "position",
        headerText: "직급",
        editRenderer: {
          type: "DropDownListRenderer",
          list: ["사장", "이사", "부장", "차장", "과장", "대리", "사원", "인턴"]
        },
        width: 120
      },
      {
        dataField: "name",
        headerText: "직원명",
        style: "my_left_style",
        renderer: {
          type: "IconRenderer",
          iconPosition: "aisle",
          iconWidth: 20, // icon 가로 사이즈, 지정하지 않으면 24로 기본값 적용됨
          iconHeight: 20,
          iconFunction: function(rowIndex, columnIndex, value, item) {
            let sex = item.sex;
            if (sex == 1) {
              // 남자
              return "./assets/office_man.png";
            } else if (sex == 2) {
              // 여자
              return "./assets/office_female.png";
            }
            return "./assets/ico_flat.gif"; // 기본
          }
        },
        width: 140
      },
      {
        dataField: "birth",
        headerText: "생년월일",
        dataType: "date",
        formatString: "yyyy. mm. dd.",
        editRenderer: {
          type: "CalendarRenderer",
          onlyCalendar: true
        },
        width: 140
      },
      {
        dataField: "sex",
        headerText: "성별",
        editRenderer: {
          type: "DropDownListRenderer",
          list: [1, 2],
          labelFunction: function(rowIndex, columnIndex, value) {
            // 실 DB 데이터는 1, 2로 정해짐
            let valueNumber = Number(value);
            // 1인 경우 남자, 2인 경우 여자
            if (valueNumber == 1) return "남";
            else return "여";
          }
        },
        labelFunction: function(rowIndex, columnIndex, value, headerText, item) {
          // 실 DB 데이터는 1, 2로 정해짐
          // 1인 경우 남자, 2인 경우 여자
          if (item.sex == 1) return "남";
          else return "여";
        },
        width: 100
      },
      {
        dataField: "age", // 직접적인 데이터필드 사용 안함
        headerText: "나이",
        width: 100,
        editable: false, // 나이는 자동 계산됨.
        headerTooltip: {
          show: true,
          tooltipHtml: "나이는 생년월일에 맞게 자동 계산됨"
        },
        expFunction: function(rowIndex, columnIndex, item) {
          // 여기서 실제로 출력할 값을 계산해서 리턴시킴.
          if (item && item.birth) {
            let birth = item.birth;
            let birthDate = new Date(birth);
            let age = new Date().getFullYear() - birthDate.getFullYear();
            return age;
          }
          return 0;
        }
      },
      {
        dataField: "enterDate",
        headerText: "입사시기",
        dataType: "date",
        formatString: "yyyy년 mm월",
        editRenderer: {
          type: "CalendarRenderer",
          onlyCalendar: true,
          onlyMonthMode: true // 일 단위 달력이 아닌 월 단위 달력 출력
        },
        width: 120
      },
      {
        dataField: "email",
        headerText: "E-Mail",
        editRenderer: {
          type: "InputEditRenderer",

          // 에디팅 유효성 검사
          validator: function(oldValue, newValue) {
            let isValid = false;
            // eslint-disable-next-line
            const email_matcher = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // 이메일 체크 정규식

            if (email_matcher.test(newValue)) {
              isValid = true;
            }
            // 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
            return {
              validate: isValid,
              message: "정확한 이메일 주소가 아닙니다. 다시 확인해 주세요."
            };
          }
        }
      }
    ],

    // 마스터 그리드 속성 정의
    gridPropsMaster: {
      selectionMode: "singleRow",
      rowIdField: "id",
      editable: true,
      showStateColumn: true,
      showRowCheckColumn: false,
      skipReadonlyColumns: true, // 읽기 전용 칼럼은 건너 띄기
      wrapSelectionMove: true, // 칼럼 끝에서 오른쪽 이동 시 다음 행, 처음 칼럼으로 이동할지 여부
      enterKeyColumnBase: true // 엔터키가 옆 칼럼으로 이동할지 여부
    },

    // 디테일 그리드 속성 설정
    gridPropsDetail: {
      editable: true,
      rowIdField: "1",
      selectionMode: "multipleCells",
      showRowCheckColumn: false,
      showRowNumColumn: false,
      fixedColumnCount: 1,
      enterKeyColumnBase: true, // 엔터키가 옆 칼럼으로 이동할지 여부
      enableFilter: true // 필터 사용
    },

    // 그리드 데이터
    gridDataMaster: [],

    // 디테일 그리드 데이터
    // eslint-disable-next-line
    gridDataDeatil: null
  }),

  watch: {
    // gridDataMaster 가 변경될 때 마다 이 기능이 실행됩니다.
    gridDataMaster: function() {
      const grid = this.$refs.masterGrid;
      // gridData 변경 될 때 그리드에 다시 삽입
      grid.setGridData(this.gridDataMaster);
    },
    gridDataDeatil: function() {
      const grid = this.$refs.detailGrid;
      // gridData 변경 될 때 그리드에 다시 삽입
      grid.setGridData(this.gridDataDeatil);
    }
  },

  mounted() {
    const grid = this.$refs.masterGrid;
    const detailGrid = this.$refs.detailGrid;
    // 마스터 그리드 생성
    grid.create(this.columnLayoutMaster, this.gridPropsMaster);
    // 디테일 그리드 생성
    detailGrid.create(this.columnLayoutDeatil(), this.gridPropsDetail);

    // 마스터 그리드 데이터 요청
    this.requestMasterData();

    // 디테일 그리드 초기 빈 데이터
    this.gridDataDeatil = [];
  },

  methods: {
    columnLayoutDeatil() {
      // AUIGrid 칼럼 설정
      let columnLayout = [];

      // 디테일 그리드 날짜 칼럼 정의
      columnLayout.push({
        dataField: "1",
        headerText: "년월",
        dataType: "date",
        formatString: "yyyy년 mm월",
        width: 100
      });

      for (let i = 2; i <= 32; i++) {
        // 1일 ~ 31일까지
        columnLayout.push({
          dataField: i,
          headerText: i - 1,
          dataType: "numeric",
          editRenderer: {
            type: "InputEditRenderer",
            onlyNumeric: true, // 0~9만 입력가능
            allowPoint: false, // 소수점( . ) 도 허용할지 여부
            allowNegative: false, // 마이너스 부호(-) 허용 여부
            textAlign: "right", // 오른쪽 정렬로 입력되도록 설정
            autoThousandSeparator: true // 천단위 구분자 삽입 여부
          },
          width: 40,
          filter: {
            enable: false
          }, // 날짜만 필터링 하기 때문에 퍼포먼스를 위해 1~31일 칼럼은 필터 사용 안함 설정
          styleFunction: function(rowIndex, columnIndex, value) {
            // 스타일 함수
            let numVal = Number(value);
            if (isNaN(numVal)) return "mycustom-default";
            else if (value >= 10) return "mycustom-high";
            else if (value >= 5) return "mycustom-low";
            return "mycustom-default";
          }
        });
      }
      return columnLayout;
    },

    // 마스터 그리드 데이터 요청
    requestMasterData() {
      // eslint-disable-next-line
      this.gridDataMaster = [{"id":"1","name":"2323","email":"abc112211@naver.com","birth":"1899\/11\/04","type":"정규직","position":"사장","enterDate":"2018\/07\/26","sex":"2"},{"id":"2","name":"233","email":"wersdf@naver.com3eere333123","birth":"1979\/02\/28","type":"정규직","position":"대리","enterDate":"2012\/01\/01","sex":"1"},{"id":"3","name":"555","email":"wersdf@naver.comwerwr3","birth":"1979\/02\/28","type":"정규직","position":"부장","enterDate":"2012\/01\/01","sex":"1"},{"id":"4","name":"223","email":"wersdf@naver.com","birth":"1979\/02\/28","type":"정규직","position":"이사","enterDate":"2012\/01\/03","sex":"1"},{"id":"5","name":"23","email":"wersdf@naver.com","birth":"1979\/02\/28","type":"정규직","position":"이사","enterDate":"2012\/01\/01","sex":"1"},{"id":"7","name":"2","email":"wersdf@naver.com","birth":"1979\/02\/28","type":"정규직","position":"과장","enterDate":"2012\/01\/01","sex":"1"},{"id":"8","name":"223","email":"wersdf@naver.com","birth":"1979\/02\/28","type":"정규직","position":"사원","enterDate":"2012\/01\/01","sex":"1"},{"id":"9","name":"2","email":"wersdf@naver.com","birth":"1979\/02\/28","type":"정규직","position":"이사","enterDate":"2012\/01\/01","sex":"1"},{"id":"10","name":"김인턴","email":"test@naver.com123a","birth":"1990\/02\/08","type":"계약직","position":"인턴","enterDate":"2013\/02\/27","sex":"1"},{"id":"245","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"사원","enterDate":"2015\/01\/01","sex":"1"},{"id":"247","name":"123123","email":"email@123.net","birth":"1899\/11\/21","type":"계약직1","position":"부장","enterDate":"2015\/01\/15","sex":"1"},{"id":"248","name":"654321","email":"email@auisoft.net","birth":"1981\/03\/28","type":"정규직","position":"인턴","enterDate":"2015\/01\/01","sex":"2"},{"id":"249","name":"3456","email":"email@auisoft.net","birth":"1981\/03\/25","type":"계약직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"},{"id":"253","name":"1234","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"fgfff","enterDate":"2015\/01\/01","sex":"1"},{"id":"254","name":"2345","email":"email@auisoft.net","birth":"1981\/03\/10","type":"정규직","position":"부장","enterDate":"2019\/01\/17","sex":"1"},{"id":"256","name":"fdfdfd","email":"email@auisoft.net","birth":"1981\/03\/07","type":"정규직","position":"차장","enterDate":"2015\/01\/01","sex":"1"},{"id":"258","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"정규직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"},{"id":"259","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"},{"id":"262","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"},{"id":"263","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"},{"id":"264","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"},{"id":"265","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"},{"id":"266","name":"Name","email":"email@auisoft.net","birth":"1981\/03\/07","type":"계약직","position":"인턴","enterDate":"2015\/01\/01","sex":"1"}];

      /*let grid = this.$refs.masterGrid;
      grid.showAjaxLoader();
      // axios 모듈을 통하여 요청합니다.
      const REQ_URL = "마스터 그리드 URL";
      this.$http.get(REQ_URL).then(result => {
        this.gridDataMaster = result.data;
        grid.removeAjaxLoader();
      });*/
    },

    // 디테일 그리드 데이터 요청
    requestDetailData() {
      // eslint-disable-next-line
      this.gridDataDeatil = [[4,"2014\/12\/01",10,10,0,10,3,213,0,12,7989,7,4,2,3,4,5,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,"2014\/11\/01",10,10,9,9,77,111,11,9,0,9,9,0,7,7,10000,7,10,10,0,10,0,0,0,12,0,7,0,0,0,0,0],[4,"2014\/10\/01",10,10,9,9,12,10,1,10,10,4,20,4,4,20,4,10,10,10,9,9,0,9,9,9,9,9,9,9,7,7,7],[4,"2014\/09\/01",10,10,10,1,10,0,9,9,9,10,0,0,7,7,7,7,10,10,9,9,9,10,10,10,10,0,1,1,0,0,0],[4,"2014\/08\/01",0,0,3,3,3,3,3,3,3,3,0,0,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2],[4,"2014\/07\/01",0,10,0,0,0,0,10,9,0,33,7,7,7,7,0,7,0,0,10,10,0,0,0,9,9,0,9,9,0,0,0],[4,"2014\/06\/01",0,10,6,6,6,6,0,0,44,0,0,22,0,0,0,0,0,10,0,0,0,0,0,0,0,7,7,7,7,7,0],[4,"2014\/05\/01",0,7,7,7,7,0,0,0,0,0,7,7,7,7,7,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,"2014\/04\/01",0,0,0,55,5,55,9,9,9,10,7,0,0,0,7,7,0,10,10,10,10,0,0,0,0,0,7,7,7,7,7],[4,"2014\/03\/01",0,0,10,10,10,0,10,0,10,0,7,7,7,7,7,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0],[4,"2014\/02\/01",0,0,10,10,0,10,10,10,0,0,0,7,0,0,0,0,0,0,10,10,10,10,0,0,0,0,0,7,7,7,7],[4,"2014\/01\/01",1,2,10,10,9,9,0,9,9,9,9,9,9,9,7,7,7,7,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,"2013\/12\/01",0,0,10,10,9,9,9,10,10,10,10,0,1,1,0,10,10,0,10,0,0,0,12,0,7,0,0,0,0,0,7],[4,"2013\/11\/01",0,0,10,10,10,0,10,0,0,0,0,0,0,0,7,10,10,9,9,0,9,9,9,9,9,9,9,7,7,7,7],[4,"2013\/10\/01",0,0,0,0,10,10,0,0,0,9,9,0,9,9,0,10,10,9,9,9,10,10,10,10,0,1,1,0,0,0,7],[4,"2013\/09\/01",0,0,0,10,0,0,0,0,0,0,0,7,7,7,7,10,10,10,0,10,0,0,0,0,0,0,0,7,7,7,7],[4,"2013\/08\/01",0,0,0,10,0,0,0,9,9,9,10,0,0,0,0,0,0,10,10,0,0,0,9,9,0,9,9,0,0,0,7],[4,"2013\/07\/01",0,0,0,10,10,10,10,10,0,10,0,0,7,7,7,0,10,0,0,0,0,0,0,0,7,7,7,7,7,0,7],[4,"2013\/06\/01",0,10,10,0,10,0,0,10,10,0,0,0,0,0,0,0,10,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,"2013\/05\/01",0,10,10,9,9,0,9,9,9,9,9,9,9,9,9,10,10,10,10,10,0,0,0,0,0,7,7,7,7,7,0],[4,"2013\/04\/01",0,10,10,9,9,9,10,10,10,10,0,1,10,0,10,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,"2013\/03\/01",0,10,10,10,0,10,0,0,0,0,0,0,10,10,0,0,7,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[4,"2013\/02\/01",0,0,0,10,10,0,0,9,9,9,10,9,9,0,0,0,7,0,0,0,10,10,0,10,0,0,0,12,0,7,0],[4,"2013\/01\/01",0,0,10,0,0,0,0,10,0,10,0,7,7,7,7,0,7,0,0,0,10,10,9,9,0,9,9,9,9,9,9]]
      /*
      let grid = this.$refs.detailGrid;
      grid.showAjaxLoader();

      // axios 모듈을 통하여 요청합니다.
      const REQ_URL = "디테일 그리드 URL";
      this.$http.get(REQ_URL).then(result => {
        this.gridDataDetail = result.data;
        grid.removeAjaxLoader();
      });*/
    },

    // 마스터 그리드 데이터 저장
    updateMasterData() {
      let grid = this.$refs.masterGrid;
      let addedRowItems = grid.getAddedRowItems(); // 추가된 행 아이템들(배열)
      let editedRowItems = grid.getEditedRowItems(); // 수정된 행 아이템들(배열) (수정되지 않은 칼럼들의 값도 가지고 있음)
      //let editedRowItems = grid.getEditedRowColumnItems(); // 수정된 행 중 진짜 수정된 칼럼의 dataField 만 추려낸 아이템들(배열)
      let removedRowItems = grid.getRemovedItems(); // 삭제된 행 아이템들(배열)
      let data = {};
      if (addedRowItems.length > 0) {
        data.add = addedRowItems;
      }
      if (editedRowItems.length > 0) {
        data.update = editedRowItems;
      }
      if (removedRowItems.length > 0) {
        data.remove = removedRowItems;
      }
      if (data.add || data.update || data.remove) {
        alert("저장 로직 작성하세요");
      } else {
        alert("추가, 수정, 삭제된 행이 없습니다.");
      }
    },

    // 디테일 그리드 데이터 저장
    updateDetailData() {
      alert("저장 로직 작성하세요");
    },

    // 마스터 그리드에 1행 추가
    insertRow2MasterGrid() {
      let item = {
        name: "Name",
        email: "email@auisoft.net",
        birth: "1981/03/07",
        type: "계약직",
        position: "인턴",
        enterDate: "2015/01/01",
        sex: 1
      };
      let grid = this.$refs.masterGrid;
      grid.addRow(item, "last"); // 최하단에 행 추가
    },

    // 마스터 그리드 선택 행 삭제
    removeRowMasterGrid() {
      const grid = this.$refs.masterGrid;
      let items = grid.getSelectedItems();
      if (items[0] && Number(items[0].item.id) <= 10) {
        alert("데모용으로 현재 행은 삭제 불가능합니다. 10번 행 아래 데이터만 삭제 가능합니다.");
        return;
      }
      grid.removeRow("selectedIndex"); // 선택행 삭제
    },

    // 셀 수정 전 확인 하기
    cellEditEndBeforeHandler(event) {
      let value = event.value;
      let oldValue = event.oldValue;
      let dataField = event.dataField;
      let birth;
      let enterDate;

      if (dataField == "birth" || dataField == "enterDate") {
        if (dataField == "birth") {
          let date = new Date(value);
          if (date.getFullYear() < 1920) {
            alert("1920년 이후를 선택하십시오.");
            return oldValue;
          }
          birth = date;
          enterDate = new Date(event.item.enterDate);
        }
        if (dataField == "enterDate") {
          birth = new Date(event.item.birth);
          enterDate = new Date(value);
        }

        if (birth.getTime() >= enterDate.getTime()) {
          alert("입사 날짜와 생년월일 입력 간에 오류가 있습니다.");
          return oldValue;
        }
      }
      return value;
    },

    // 마스터 그리드선택 변경 이벤트 핸들러
    // 마스터 그리드에서 행을 선택한 경우 해당 행의 고객 ID(custId) 에 맞는
    // 데이터를 요청하여 디테일 그리드에 표시합니다.
    selectionChangeHandler(event) {
      const that = this;
      // 200ms 보다 빠르게 그리드 선택자가 변경된다면 데이터 요청 안함
      if (this.timerId !== null) {
        clearTimeout(this.timerId);
      }

      this.timerId = setTimeout(function() {
        let primeCell = event.primeCell;
        let rowItem = primeCell.item; // 행 아이템들

        that.curId = rowItem.id; // 선택된 직원 id, 이름 보관
        that.curName = rowItem.name;

        // 디테일 정보 표시
        console.log("직원 : " + rowItem.name + " 실적");

        // rowId 에 맞는 디테일 데이터 요청 후 디테일 그리드에 삽입
        that.requestDetailData();
      }, 200); // 현재 200ms 민감도....환경에 맞게 조절하세요.
    }
  }
};
</script>
<style scoped>
#aui-grid-wrap-showcase7-master {
  width: 100%;
  height: 300px;
}
#aui-grid-wrap-showcase7-detail {
  width: 100%;
  height: 300px;
}
</style>

<style>
#aui-grid-wrap-showcase7-master .my_left_style {
  text-align: left;
}
/* 디테일 그리드 동적 셀 1 */
#aui-grid-wrap-showcase7-detail .mycustom-high {
  background: #53c14b;
  color: #000;
}
/* 디테일 그리드 동적 셀 2 */
#aui-grid-wrap-showcase7-detail .mycustom-low {
  background: #fff29e;
  color: #000;
}
/* 디테일 그리드 동적 셀 디폴트 */
#aui-grid-wrap-showcase7-detail .mycustom-default {
  background: rgba(0, 0, 0, 0);
}
</style>
