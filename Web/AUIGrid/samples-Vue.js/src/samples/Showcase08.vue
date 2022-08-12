<template>
  <div>
    <div class="desc">
      <div>
        클라이언트에서 SQL 을 작성하면 해당 쿼리 그대로를 그리드에 출력하는 DB 그리드를 작성한
        모습입니다.
      </div>
      <div>
        쿼리를 임의로 작성하거나 아래 SQL 예문을 복사하여 붙여 넣고 "Query 실행"을 하면 해당 쿼리
        결과 대로 출력됩니다.
      </div>
      <div>
        이런 기능으로 BI 솔루션이나 웹 DB 관련 솔루션 제작을 할 수 있습니다.
      </div>
      <v-textarea
        outline
        rows="2"
        name="sqlTxt"
        label="SQL을 작성하세요"
        value="select * from grid_sample_src_list"
      ></v-textarea>
      <v-toolbar flat dense>
        <v-spacer />
        <v-btn color="success" @click="runQuery">Query 실행</v-btn>
      </v-toolbar>
      <div>
        <span>■ SQL 예문 1 : </span>select id, name, email, birth, type, position, enter_date, sex
        from grid_sample_src_list order by id
      </div>
      <div>
        <span>■ SQL 예문 2 : </span>select * from grid_sample_src_list where position='인턴'
      </div>
      <div>
        <span>■ SQL 예문 3 : </span>select id as "ID", position as "직급", name as "이름" from
        grid_sample_src_list where position='인턴'
      </div>
      <p style="margin-top:20px;">
        출력된 그리드에서 바로 수정을 하면 DB에 UPDATE 하도록 설정하였습니다.
      </p>
      <div>
        보통 그리드에서 수정, 삭제, 추가를 하면 그리드 상에서만 적용되고, 마지막에 "저장" 과 같은
        버턴을 누르면 한번에 적용시키도록 구성되어 있습니다.
      </div>
      <div>
        그러나 이 데모는 수정 완료가 된 시점(cellEditEnd 이벤트 발생 시점)에 바로 UPDATE 하도록
        구성되었습니다.
      </div>
      <div>
        Select 후 출력된 그리드에서 셀의 데이터를 수정하면 바로 DB UPDATE 로 적용됩니다.
      </div>
      <div>
        Request INFO :
        <span id="requestDesc" style="color:#b02;"></span>
      </div>

      <v-checkbox
        class="shrink mr-2"
        v-model="checkbox1"
        :label="`수정 완료 후 업데이트 성공 시 그리드에 수정된 내역 바로 지우기`"
      ></v-checkbox>
    </div>
    <AUIGrid
      ref="myGrid"
      name="showcase8"
      class="grid-wrap"
      @selectionChange="selectionChangeHandler"
      @cellEditBegin="auiCellEditingHandler"
      @cellEditEnd="auiCellEditingHandler"
      @cellEditCancel="auiCellEditingHandler"
    >
    </AUIGrid>
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
    resData : {"pk":"id","columns":[{"name":"id","orgname":"id","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"3","length":"20","charsetnr":"63","flags":"49667","type":"3","decimals":"0"},{"name":"name","orgname":"name","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"6","length":"40","charsetnr":"19","flags":"0","type":"253","decimals":"0"},{"name":"email","orgname":"email","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"27","length":"100","charsetnr":"19","flags":"0","type":"253","decimals":"0"},{"name":"birth","orgname":"birth","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"10","length":"10","charsetnr":"63","flags":"128","type":"10","decimals":"0"},{"name":"type","orgname":"type","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"7","length":"40","charsetnr":"19","flags":"0","type":"253","decimals":"0"},{"name":"position","orgname":"position","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"5","length":"40","charsetnr":"19","flags":"0","type":"253","decimals":"0"},{"name":"enter_date","orgname":"enter_date","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"10","length":"10","charsetnr":"63","flags":"128","type":"10","decimals":"0"},{"name":"sex","orgname":"sex","table":"grid_sample_src_list","orgtable":"grid_sample_src_list","def":"","db":"dbname","catalog":"def","max_length":"1","length":"11","charsetnr":"63","flags":"32768","type":"3","decimals":"0"}],"data":[{"id":"1","name":"2323","email":"abc112211@naver.com","birth":"1899-11-04","type":"정규직","position":"사장","enter_date":"2018-07-26","sex":"2"},{"id":"2","name":"233","email":"wersdf@naver.com3eere333123","birth":"1979-02-28","type":"정규직","position":"대리","enter_date":"2012-01-01","sex":"1"},{"id":"3","name":"555","email":"wersdf@naver.comwerwr3","birth":"1979-02-28","type":"정규직","position":"부장","enter_date":"2012-01-01","sex":"1"},{"id":"4","name":"223","email":"wersdf@naver.com","birth":"1979-02-28","type":"정규직","position":"이사","enter_date":"2012-01-03","sex":"1"},{"id":"5","name":"23","email":"wersdf@naver.com","birth":"1979-02-28","type":"정규직","position":"이사","enter_date":"2012-01-01","sex":"1"},{"id":"7","name":"2","email":"wersdf@naver.com","birth":"1979-02-28","type":"정규직","position":"과장","enter_date":"2012-01-01","sex":"1"},{"id":"8","name":"223","email":"wersdf@naver.com","birth":"1979-02-28","type":"정규직","position":"사원","enter_date":"2012-01-01","sex":"1"},{"id":"9","name":"2","email":"wersdf@naver.com","birth":"1979-02-28","type":"정규직","position":"이사","enter_date":"2012-01-01","sex":"1"},{"id":"10","name":"김인턴","email":"test@naver.com123a","birth":"1990-02-08","type":"계약직","position":"인턴","enter_date":"2013-02-27","sex":"1"},{"id":"245","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"사원","enter_date":"2015-01-01","sex":"1"},{"id":"259","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"인턴","enter_date":"2015-01-01","sex":"1"},{"id":"247","name":"123123","email":"email@123.net","birth":"1899-11-21","type":"계약직1","position":"부장","enter_date":"2015-01-15","sex":"1"},{"id":"248","name":"654321","email":"email@auisoft.net","birth":"1981-03-28","type":"정규직","position":"인턴","enter_date":"2015-01-01","sex":"2"},{"id":"249","name":"3456","email":"email@auisoft.net","birth":"1981-03-25","type":"계약직","position":"인턴","enter_date":"2015-01-01","sex":"1"},{"id":"254","name":"2345","email":"email@auisoft.net","birth":"1981-03-10","type":"정규직","position":"부장","enter_date":"2019-01-17","sex":"1"},{"id":"253","name":"1234","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"fgfff","enter_date":"2015-01-01","sex":"1"},{"id":"256","name":"fdfdfd","email":"email@auisoft.net","birth":"1981-03-07","type":"정규직","position":"차장","enter_date":"2015-01-01","sex":"1"},{"id":"258","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"정규직","position":"인턴","enter_date":"2015-01-01","sex":"1"},{"id":"262","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"인턴","enter_date":"2015-01-01","sex":"1"},{"id":"263","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"인턴","enter_date":"2015-01-01","sex":"1"},{"id":"264","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"인턴","enter_date":"2015-01-01","sex":"1"},{"id":"265","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"인턴","enter_date":"2015-01-01","sex":"1"},{"id":"266","name":"Name","email":"email@auisoft.net","birth":"1981-03-07","type":"계약직","position":"인턴","enter_date":"2015-01-01","sex":"1"}]},
  }),
  mounted() {
    // 초기 데이터
    this.createDynamicAUIGrid();
  },

  methods: {
    // 데이터 요청 메소드
    requestMyData() {
      alert("항상 같은 데이터인 resData로만 출력하고 있습니다.");
    },
    runQuery() {
      this.requestMyData();
    },
    // 동적으로 그리드 생성합니다.
    createDynamicAUIGrid() {
      let grid = this.$refs.myGrid;
      let result = this.resData;

      let columnInfoList = result.columns; // 칼럼 정보
      let gridData = result.data; // 실 데이터
      let pkName = result.pk; // PrimaryKey 명

      // 이전에 그리드가 생성되었다면 제거함.
      if (grid.isCreated()) {
        grid.destroy();
      }

      let columnLayoutInfo;
      if (columnInfoList && columnInfoList.length > 0) {
        columnLayoutInfo = this.getDynamicColumns(columnInfoList, pkName); //칼럼 정보를 바탕으로 칼럼 레이아웃 동적 생성
      } else {
        alert("칼럼 정보가 없어 그리드를 생성할 수 없습니다.");
        return;
      }

      if (!columnLayoutInfo || !columnLayoutInfo.columnLayout) {
        alert("칼럼 정보가 없어 그리드를 생성할 수 없습니다.");
        return;
      }

      // 그리드 속성
      let gridProps = {
        editable: true,
        onlyEnterKeyEditEnd: true,
        showStateColumn: true,
        enableUndoRedo: false,
        enableRestore: false
      };

      // rowIdField 를 PrimaryKey 와 일치 시킴
      if (columnLayoutInfo && columnLayoutInfo.rowIdField) {
        gridProps.rowIdField = columnLayoutInfo.rowIdField;
      }

      // 실제로 그리드 생성
      grid.create(columnLayoutInfo.columnLayout, gridProps);

      // 데이터 삽입
      grid.setGridData(gridData);
    },

    // 동적으로 칼럼 생성하여 반환.
    getDynamicColumns(columnInfoList, pkName) {
      let columnLayout = [];
      let column;
      let cInfo;
      let width;
      let pkField = null;
      for (let i = 0, len = columnInfoList.length; i < len; i++) {
        cInfo = columnInfoList[i];
        column = {};

        column.dataField = cInfo.orgname;
        width = Number(cInfo.max_length) * 10;
        width = Math.max(width, 80); // 기본 80 유지

        column.width = width;

        // PK 여부
        if (cInfo["orgname"] == pkName) {
          column.editable = false; //PK 칼럼 editable 불가 설정
          column.headerText = cInfo.name + "*";
          pkField = pkName; // PrimaryKey 필드명 보관
        } else {
          column.headerText = cInfo.name;
        }

        // 칼럼의 dataType 조사. 현재는 date만 조사
        if (Number(cInfo["type"]) == 10) {
          /// 10번이라면 "date" 임
          column.dataType = "date";
          column.editRenderer = {
            type: "CalendarRenderer"
          };
        }

        // 이메일 validator 추가
        if (cInfo.orgname == "email") {
          column.editRenderer = {
            type: "InputEditRenderer",
            // 에디팅 유효성 검사
            validator: function(oldValue, newValue) {
              let isValid = false;
              // eslint-disable-next-line
              let email_matcher = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/; // 이메일 체크 정규식
              if (email_matcher.test(newValue)) {
                isValid = true;
              }
              // 리턴값은 Object 이며 validate 의 값이 true 라면 패스, false 라면 message 를 띄움
              return {
                validate: isValid,
                message: "정확한 이메일 주소가 아닙니다. 다시 확인해 주세요."
              };
            }
          };
        }
        columnLayout.push(column);
      }
      return {
        rowIdField: pkField,
        columnLayout: columnLayout
      };
    },

    selectionChangeHandler(event) {
      console.log(event.type);
    },

    auiCellEditingHandler(event) {
      console.log(event.type);
    }
  }
};
</script>
<style scoped>
.desc {
  font-size: 13px;
}
.grid-wrap {
  width: 100%;
  height: 200px;
}
</style>
