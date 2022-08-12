/*
 * 마지막 수정자 : joointhezoo@cyber-i.com
 * 마지막 수정날짜 :  18.03.27
 */
(function () {

    var productName = 'webPonent CHART 2.0';
    var productId = 'WC2';

    if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined') {

        $.ajax({
            url : '/webponent.licenseKey.js',
            dataType : 'script',
            async : false
        });

        if (typeof WEBPONENT_CHART_LICENSE_KEY === 'undefined' || WEBPONENT_CHART_LICENSE_KEY === '') {

            alert(productName + '의 라이센스키를 입력해주세요.');
            return;
        }
    }

    var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";

    function decodeStr(coded) {
        coded = decodeURIComponent(coded);
        var uncoded = "";
        var chr;
        for (var i = coded.length - 1; i >= 0; i--) {
            chr = coded.charAt(i);
            uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ?
                String.fromCharCode(65 + key.indexOf(chr) % 26) :
                chr;
        }
        return uncoded;
    }

    function appendTrialUi (wrapper) {

        wrapper = $(wrapper);

        var trialUiWrapper = $('<div class="WEBPONENT-TRIAL-UI">');

        trialUiWrapper.css({
            'position': 'absolute',
            'top': '0',
            'left': '0',
            'width': '100%',
            'height': '100%',
            'background-image': "url('data:image/png;base64,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')",
            'background-repeat': 'no-repeat',
            'background-position': 'center center',
            'z-index': '1',
            'opacity': '0.3'
        });

        wrapper.prepend(trialUiWrapper);

        wrapper.on('mouseenter', function () {

            trialUiWrapper.stop(true, true);
            trialUiWrapper.hide();
        });

        wrapper.on('mouseleave', function () {

            trialUiWrapper.stop(true, true);
            trialUiWrapper.fadeIn();
        });

        wrapper.data('check-trial-ui', setInterval(function () {

            if (wrapper.find('.WEBPONENT-TRIAL-UI').length === 0) {

                clearInterval(wrapper.data('check-trial-ui'));
                appendTrialUi(wrapper[0]);
            }
        }, 5000));
    }

    function makeLicenseObject (text) {

        var obj = {};

        var splitedArray = text.split(';');

        obj.product = splitedArray[0];
        obj.customer = splitedArray[2];
        obj.licenseType = splitedArray[3];
        obj.domains = splitedArray[5];
        obj.expireDate = splitedArray[6];

        return obj;
    }

    var TRIAL_UI = false;

    var decodedLicenseKey = decodeStr(WEBPONENT_CHART_LICENSE_KEY);

    var licenseObject = makeLicenseObject(decodedLicenseKey);

    var domain = window.location.host.toUpperCase();

    if (licenseObject.licenseType === 'TRIAL') {
/*
        if(domain.indexOf('LOCALHOST') !== 0) {
            TRIAL_UI = false;
        }

        if (new Date() > new Date(licenseObject.expireDate * 1)) {

            alert(productName + ' ' + licenseObject.licenseType + '버전의 라이센스 유효기간이 지났습니다.');
            return;
        }
*/
    } else if (licenseObject.licenseType === 'DEVELOP') {

        if (new Date() > new Date(licenseObject.expireDate * 1)) {

            TRIAL_UI = false;
        }
        /**
         licenseType ED시리즈 조건 추가(ver.150915 평다진)
         */
    } else if (licenseObject.licenseType === 'OFFICIAL' || licenseObject.licenseType === "ED001" || licenseObject.licenseType === "ED002" || licenseObject.licenseType === "ED003") {

        if(domain.indexOf('LOCALHOST') !== 0){
            TRIAL_UI = false;
        }

        var splitedDomain = licenseObject.domains.split(',');

        for (var i = 0; i < splitedDomain.length; i++) {

            var regesteredSite = splitedDomain[i];

            if (domain.indexOf(regesteredSite) > -1) {

                TRIAL_UI = false;
            }
        }
    } else if (licenseObject.product !== productId) {

        TRIAL_UI = false;

    } else {

//        alert('유효하지 않은 ' + productName + ' 라이센스입니다.');
        TRIAL_UI = false;
    }

    (function() {

        var self = {};

        var elementType = getElementType();
        var defaultFont = 'Nanum Gothic';

        /**
         * 기본으로 설정되어 있는 스타일 반환
         * @return {defaultStyles} default styles
         */
        function getDefaultStyles () {

            defaultFont = 'Nanum Gothic';
            var defaultStyles = {
                /**
                 * 전체적 위치 배경화면, 테두리 색상 지정
                 * @position {Object} :  차트의 x축, y축 위치 조정
                 * @area {Object}     :  BACKGROUND , BORDER-COLOR 설정
                 */
                layout : {
                    position : {
                        x : 0,
                        y : 0
                    },
                    area : {
                        color : '#f8f8f8',
                        border :'#c1c6cc'
                    }
                },

                /**
                 *  반지름  설정
                 * @radius {Object}	  : GAUGE CHART OBJECT'S RADIUS
                 */
                object : {
                    radius : 128
                },

                /**
                 *  치수표시판의 위치 및 스타일 설정
                 * @x {Integer}  	 : COUNTER'S POSITION X
                 * @y {Integer}  	 : COUNTER'S POSITION Y
                 * @width {Integer}  : COUNTER'S WIDTH
                 * @height {Integer} : COUNTER'S HEIGHT
                 * @radius {Integer} : COUNTER'S RADIUS
                 * @text {Object}  	 : INSIDE COUNTER FONT STYLE {font-family, font-weight , font-color}
                 * @angular {Object} : Angular guage 내 counter의  테두리, 배경 색상
                 * @multi {Object}   : Multi type시, divider(구분선)사용유무, 선색상 및 두께
                 */
                counter : {
                    x : 0 ,
                    y : 0 ,
                    width: "auto",
                    height: "auto",
                    radius : 2,
                    text : {
                        family : 'LCDMono',
                        weight : 800,
                        color:'#484b4e',
                        size : 1
                    },
                    angular : {
                        border : 'none',
                        color : 'none'
                    },
                    multi : {
                        divider : true,
                        dividerThick : 1,
                        counterInterval: 3,
                        counterBorder : '#acafb3',
                        textSize : 1
                    }
                },

                /**
                 *  AXIS STYLES
                 * @family {Object} : font-family
                 * @size {Object}   :  font-size
                 * @align {Object}  :  font-anchor ( leftside == end , rightside == start )
                 * @color {Object} : 	font-color
                 * @line {Object}   :   line-color
                 * @text {Object}   :   drawing axis number mark
                 */
                axis : {
                    block : 10 ,
                    interval : 4 ,
                    text : {
                        num : 5,
                        family: defaultFont,
                        angular : {
                            color : '#848789',
                            size : 12,
                            weight:300
                        }
                    },
                    angularBar : {
                        start : 5,
                        end_block : 22,
                        end_interval : 12,
                        color : '#8c949f'
                    },
                    dual : {
                        angle :250,
                        block: 22,
                        interval : 2,
                        text : 8,
                        textSize : 10,
                        maxAxis : 250,
                        minAxis : 0
                    }
                },

                /**
                 *  Angular gauge의 Style 변경
                 * @angle {Object}      : 차트 내 각도 설정
                 * @center {Object}     : 중심 원의 색상 및 테두리
                 * @normalArrow {Object}: normal타입의 원형게이지 차트의 화살표
                 * @multiArrow {Object} : multi타입의 원형게이지 차트의 화살표
                 * @dualArrow {Object}  : dual타입의 원형게이지 차트의 화살표
                 */
                angular : {
                    angle : 270,
                    center : {
                        color:  '#8397a6',
                        border :  '#8397a6'
                    },
                    base:{
                        color: "50-#f2f2f2-#fff-#f2f6f6",
                        border: '#6a6e72',
                        borderThick: 10
                    },
                    normalArrow : {
                        color : "#484b4e",
                        border : 'none'
                    },
                    multiArrow : {
                        color : "#484b4e",
                        border : 'none'
                    },
                    dualArrow : {
                        color : "#484b4e",
                        border : 'none'
                    }
                },

                /**
                 * Pointer 의 style 변경 (최대값, 평균값, 기준값)
                 *
                 */
                pointer : {
                    max : {
                        bar : {
                            color : '#ff625f'
                        },
                        font : {
                            size : 10,
                            position : -18,
                            family: defaultFont
                        },
                        angular :{
                            color:'#ff625f',
                            length:  -5
                        }
                    },
                    avg : {
                        bar : {
                            color : '#2bcdba'
                        },
                        font : {
                            size : 10,
                            position : -18,
                            family: defaultFont
                        },
                        angular :{
                            color:'#2bcdba',
                            length: -5
                        }
                    },
                    target : {
                        color : '#8397a6'
                    }
                }
            };
            return defaultStyles;
        }
        /**
         * 기본으로 설정되어 있는 옵션 반환
         * data 부분에 해당하는 key들은 고정이며 추가되는 부분은 자유롭게 설정한다.
         * @return {defaultOptions} default options
         */
        function getDefaultOptions() {

            var defaultOptions = {
                /*  DATA SETTING - 데이터 설정  */
                data : {
                    data : null ,
                    url : null ,			// Ajax를 통해서 데이터를 가져오고자 할경우
                    type : null ,			// json, text 형태 설정
                    reverse : false , 		// 데이터 흐름이 반대로 들어올경우
                    jsonDepth : 'output.result' ,	// json에 depth
                    format :  null,
                    use : null,			// 표현하고자 하는 데이터 key값
                    dataLen : null      // 데이터 저장 갯수
                },

                /*  USING OPTION - 옵션 사용 유무 */
                use : {
                    axis : true ,			// 눈금
                    axisText : true ,		// 치수
                    counter : true ,		// 치수표시판
                    max :true ,			    // 최대값 표시
                    avg : true ,			// 평균값 표시
                    target : false ,        // 타겟값 표시
                    toolTip : true ,		// 마우스오버 툴팁
                    animate : true ,		// 움직이는 효과
                    animateText : true,     // counter 숫자 회전판
                    resize : false ,		// 게이지 사이즈 조절
                    responsive : true 		// 반응형 유무
                },

                /*  TOOLTIP SETTING IN DETAIL- 툴팁 세부 설정  */
                toolTip : {
                    className : null ,
                    position : {
                        x : 0 ,
                        y : 0
                    },
                    func : null
                },

                /*  축의 MAX, MIN  VALUE SETTINGS - 최댓값, 최소값 설정 (DEFAULT - auto ) */
                minmax : {
                    min : 'auto' ,
                    max : 'auto'
                },

                /* 데이터의 max값, 평균값,  타겟표시값 설정 (DEFAULT - auto ) */
                pointer : {
                    max : 'auto' ,
                    avg : 'auto' ,
                    target : 0
                }

            };

            return defaultOptions;
        }

        /**
         * GAUGE 의 세팅 정보를 담고 있다.
         * @type {Object}
         */
        function cloneSettingSize(gauge,type) {

            var width = gauge.svg.width,
                height = gauge.svg.height,
                styles =  gauge.styles,
                use = gauge.options.use,
                rate = (type!=='dual')  ? 0.159 : 0.11;

            var standard =  (width > height) ? height : width,
                objWidth = standard * 0.32 ,
                objHeight = standard * 0.32 *2,
                objRadius = standard * 0.32 ,
                centerX = (width/2)+styles.layout.position.x;
            /**
             * 사용자가 CHART의 크기를 변경
             */
            if (use.resize) {
                rate = (type==='dual')  ? 0.159 : 0.11;
                centerX = centerX+5+styles.layout.position.x;
                objRadius  =  (width > height) ? standard*(styles.object.radius /448) : standard*(styles.object.radius /400);
                objWidth =objRadius;
                objHeight =objRadius*2;
            }

            var gapX =(objWidth / 2);
            var startX = (centerX - gapX);
            var endX  = (startX +  objWidth);

            var settingSize = {
                objWidth : objWidth,
                objHeight : objHeight,
                objRadius : objRadius,
                centerX :centerX,
                gapX : gapX,
                startX : startX,
                endX  : endX,
                startY:  (height  * rate )+styles.layout.position.y,
                endY : (height  * rate )+styles.layout.position.y+objHeight,
                centerY :  ( (height  * rate )+styles.layout.position.y)+(objHeight/2)
            };
            return settingSize;

        }

        function cloneSettingModel () {

            var settingModel = {
                /**
                 * 데이터와 관련된 정보를 나타낸다.
                 */
                data : [],
                wrapper : {
                    width : null
                },
                animation : []
            };
            return settingModel;
        }

        /**
         * defaultStyles 와 GAUGE 스타일을 extend 시켜준다.
         * @param  {Object} style [GAUGE 스타일]
         * @return {Object}       [extend 되어진 스타일]
         */
        function extendStyles (style) {

            var defaultStyles = getDefaultStyles();

            var styles = $.extend(true, defaultStyles, style);

            if (elementType === 'VML') {
                styles.axis.family = "Dotum";
                styles.counter.text.family = "Dotum";
            }

            return styles;
        }

        /**
         * defaultOptions 와 GAUGE 옵션을 extend 시켜준다.
         * @param  {Object} option [GAUGE 옵션]
         * @return {Object}        [extend 되어진 옵션]
         */
        function extendOptions (option) {
            var defaultOptions = getDefaultOptions();
            var options = $.extend(true, defaultOptions, option);

            if (elementType === 'VML') {
                options.use.animate =  false;
            }
            return options;
        }

        /**
         * 브라우져 환경에 따라 SVG 인지 VML 인지 구분해준다.
         * @return {String} ['SVG' or 'VML']
         */
        function getElementType () {

            var g = {doc: document, win: window};
            var elementType = (g.win.SVGAngle ||
            g.doc.implementation.hasFeature(
                "http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ?
                "SVG" : "VML");

            return elementType;
        }
        /**
         * AJAX 를 이용하여 데이터를 읽어온다.
         * @param  {Object} options [GAUGE 옵션]
         * @return {Array}         [파싱된 데이터 반환]
         */
        function loadData (options) {

            var data = [];

            if (options.data.data) {
                data = options.data.data;
            } else {
                $.ajax({
                    url : options.data.url,
                    async : false,
                    dataType : options.data.type,
                    success : function (resp) {

                        if (options.data.type === "json") {

                            data = loadJson(resp, options);

                        } else if (options.data.type === "text") {

                            data = loadText(resp, options);
                        }
                    },
                    error : function(e, a,b) {
                        console.log(e, a, b);
                    }
                });
            }

            return data;
        }

        /**
         * 데이터가 json 형식일 경우
         * options.data.jsonDepth 에 따라 해당 데이터를 반환한다.
         * @param  {Array} data    [AJAX 에 의해 호출되어진 데이터]
         * @param  {Object} options [Gauge 옵션]
         * @return {Array}         [Gauge 데이터]
         */
        function loadJson (data, options) {

            var bld_depth = options.data.jsonDepth.split('.');
            var outPut = bld_depth[0];
            var result = bld_depth[1];

            var arr = data;

            for (var i = 0; i < bld_depth.length; i++) {

                arr = arr[bld_depth[i]];
            }

            return arr;
        }

        /**
         * 데이터가 text 형식일 경우
         * '|' ,'\n' 을 기준으로 데이터를 파싱한다.
         * @param  {String} data    [AJAX 에 의해 호출되어진 데이터]
         * @param  {Object} options [Gauge 옵션]
         * @return {Array}         [Gauge 데이터]
         */
        function loadText (data, options) {

            var arr = [];
            var lineArr = data.split('\n');
            var dataTitles = [];
            var titleCheck = true;

            for ( var i = 0; i < lineArr.length; i++) {

                if (lineArr.length <= 1) {

                    continue;
                }

                var objArr = lineArr[i].split('|');

                if (titleCheck) {

                    for ( var j = objArr.length; j--;) {

                        dataTitles.unshift(trim(objArr[j]));
                    }

                    titleCheck = false;

                } else {

                    var obj = {};

                    if (objArr.length <= 1) {

                        continue;
                    }

                    $.each(objArr, function(j, item) {

                        obj[dataTitles[j]] = trim(item);
                    });

                    arr.push(obj);
                }
            }

            return arr;
        }

        function drawSvg(gauge) {

            var svgWidth = Math.floor(gauge.wrapper.width()) ;
            var svgHeight = Math.floor(gauge.wrapper.height()) ;

            gauge.svg = Raphael(gauge.wrapper[0], '100%', svgHeight);

            gauge.svg.canvas.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink');
        }

        function drawLayout(gauge){
            var paper = gauge.svg,
                styles = gauge.styles.layout,
                width = paper.width,
                height =  paper.height;

            if (elementType === "VML") {
                paper.canvas.style.background = styles.area.color;
            }

            gauge.redrawItem.background = paper.rect(0,0, '100%','100%' );
            gauge.redrawItem.background.attr({"fill": styles.area.color, "stroke":styles.area.border});

        }

        /**
         * 셋팅화면에 데이터 탭부분
         * @param {Object} gauge 객체
         */
        function setInputData(gauge){
            var putData = gauge.options.data;
            var setData = gauge.settings.data;
            var dataArr = [];
            var use = putData.use;
            var dataLen = putData.data.length;

            if( putData.dataLen ){
                if(dataLen > putData.dataLen){
                    var idx = dataLen - putData.dataLen;
                    putData.data.splice(0,idx);
                    dataLen = putData.data.length;
                }
            }

            for (var i = 0; i < dataLen; i ++ ){
                dataArr[i] = [];
                if( use == null ){
                    var putName =[];

                    for( x in putData.data[i]){
                        putName.push(x);
                    }

                    setData.push([ parseInt( putData.data[i][putName[0]] ) , parseInt( putData.data[i][putName[1]] ) ]);

                }else{
                    var useName =[];
                    if(gauge.type == 'org'){
                        useName.push(use[0]);
                    }else{
                        for( var key in use){
                            useName.push(use[key]);
                        }
                    }
                    setData.push([ parseInt(putData.data[i][useName[0]]),  parseInt( putData.data[i][useName[1]]) ] );
                }
            }

            if ( gauge.options.data.reverse ) {

                setData.reverse();
            }
        }


        /**
         * gauge 의 데이터 중 최대값,최소값,평균값 을 구한다.
         * @param {Object} gauge 객체
         */
        function setComputedData(gauge){

            var opts = gauge.options;
            var datas = gauge.settings.data;
            var dataLen = datas.length;
            var maxVal =0,  sum=0 , minVal=0;
            var findMin = [];
            for(var  i = 0 ; i < dataLen ; i++){
                var curVal = datas[i][0];
                curVal = findFloat(curVal);
                var maxNum = curVal;
                var minNum = curVal;

                if( gauge.type =='multi'){
                    var secondVal = datas[i][1];
                    maxNum =(maxNum > secondVal) ?  maxNum : secondVal;
                    minNum =(secondVal > minNum) ?  minNum : secondVal;

                }

                if(maxVal<maxNum){
                    maxVal = maxNum;
                }
                if(minVal>minNum){
                    minVal = minNum;
                }

                sum = sum + curVal;
                findMin.push(minVal);
            }
            if(opts.pointer.max ==="auto"){
                opts.pointer.max = findFloat(maxVal);

            }
            if(opts.pointer.avg ==="auto"){
                opts.pointer.avg = findFloat(sum / dataLen);
            }

            if(opts.minmax.min==="auto"){
                opts.minmax.min = findFloat(Math.min.apply(null, findMin));
            }
        }

        /**
         * 소수점 자리 대상인지를 확인
         * @param {Number} num 검사 대상
         */
        function findFloat(num) {
            if(num === undefined){
                return false;
            }
            var stringNum = num.toString();
            var idx = stringNum.indexOf('.');
            if (idx !== -1) {
                num = (idx >= (stringNum.length - 3)) ? num : dropNumber(num,-2);
            }
            return num;
        }

        /**
         * 소수점 둘쨋자리 이상의 숫자를 반올림
         * @param {Number} num  검사 대상
         * @param {Number} idx  소수점 자릿수  (둘쨋자리) = -2
         */
        function dropNumber(num,idx){
            num = parseFloat(num);
            var minus = '';
            if(num < 0) {
                minus = '-';
            }
            num = Math.abs(num);
            num =(parseInt((num + 0.5 * Math.pow(10,idx)) * 100))/100;
            var s = minus + num.toString();

            return  parseFloat(s);
        }

        /**
         * GAUGE COUNTER  :
         * @param {Object} gauge 객체
         * @param {String} type
         */
        function drawCounter(gauge,type){

            var pos = gauge.sizes;
            var counter = gauge.styles.counter;
            var paper = gauge.svg;

            var isAnimated = gauge.options.use.animate;
            var dataSet = gauge.settings.data;

            var inputData = dataSet[dataSet.length-1][0];
            var prevData = ((dataSet.length-2) >= 0 ) ? dataSet[dataSet.length-2][0] : 0;
            var secondData = (dataSet[dataSet.length-1][1] !== undefined) ? dataSet[dataSet.length-1][1] : 0;
            var secondPrev =  ((dataSet.length-2) >= 0 )? dataSet[dataSet.length-2][1] : 0;

            var rectW = (typeof counter.width === "number")? counter.width: (pos.objWidth/2),
                rectH = (typeof counter.height === "number")?  rectW / 2 + ( counter.height - (rectW / 2) ) :  (pos.objWidth*0.265),
                rectX = (pos.centerX-(rectW/2) + counter.x ),
                rectY = (pos.centerY+(rectH*0.8) + counter.y) ,
                txtX = rectX +  (rectW/2),
                txtY = rectY +  (rectH/2),
                textSize = Math.max(Math.min(pos.objRadius /  7 )) * counter.text.size;

            if(type === 'multi'){
                rectH = rectH * 0.7;
                rectY = (pos.centerY+(pos.objRadius*0.15) + counter.y);
                txtY = rectY +  (rectH/2);
                var cntInterval = counter.multi.counterInterval;
                var multiY = rectY +rectH+ cntInterval;
                var multiTxtY = txtY +rectH+cntInterval;

                var multi_font = Math.max(Math.min( pos.objRadius / 6.5 )) * counter.multi.textSize;

                /* SECOND COUNTER */
                var multiBox = paper.rect( rectX, multiY, rectW, rectH,counter.radius);
                multiBox.attr({"fill": counter.angular.color, "stroke" : counter.angular.border});
                var multiVal = paper.text(txtX ,multiTxtY, inputData);
                multiVal.attr({
                    "font-family":counter.text.family,
                    "font-size":multi_font,
                    "font-weight":counter.text.weight,
                    "fill": counter.text.color
                });
                /* SECOND COUNTER ANIMATION */
                subanimateText(secondData,secondPrev,multiVal,gauge);
                if(counter.multi.divider){
                    var dividerY = multiY-(cntInterval/2);
                    var divider = paper.path("M"+(rectX)+","+ dividerY +"L"+(rectX+rectW)+","+ dividerY )
                        .attr({'stroke': counter.multi.counterBorder , "stroke-width" : counter.multi.dividerThick});
                 }

                gauge.redrawItem.push(divider,multiBox,multiVal);

            }
            if(type === 'dual'){

                var radius = pos.objRadius;
                rectY = (pos.centerY+(radius*0.15) + counter.y);
                txtY = rectY +  (rectH/2);
                var moveY = (radius / 13 * 8 +(radius / 2));

                /* DUAL COUNTER */
                var dualBox = paper.rect( rectX, (rectY+moveY-18), rectW, rectH,counter.radius);
                dualBox.attr({"fill": counter.angular.color,"stroke" :counter.angular.border});
                var dualVal = paper.text(txtX ,(txtY+moveY-18), inputData);
                /* DUAL COUNTER ANIMATION */
                subanimateText(secondData,secondPrev,dualVal,gauge);
                dualBox.scale(0.5,0.5);
                dualVal.attr({
                    "font-family":counter.text.family,
                    "font-size":textSize/1.3,
                    "font-weight":counter.text.weight,
                    "fill":counter.text.color
                });
                gauge.redrawItem.push(dualBox,dualVal);
            }

            var counterBox = paper.rect( rectX, rectY, rectW, rectH,counter.radius)
                .attr({"fill": counter.angular.color,"stroke" : counter.angular.border});
            var curVal = paper.text(txtX, txtY, inputData);

            curVal.attr({
                "font-family":counter.text.family,
                "font-size": (textSize+10),
                "font-weight":counter.text.weight,
                "text-align" : 'center',
                "fill":counter.text.color,
                "text-decoration": 'underline'
            });
            if(isAnimated ){
                animateText(inputData,prevData,curVal,gauge);
            }else{
                if (gauge.options.data.format !== null) {
                    inputData = formatting(inputData, gauge.options.data.format);
                }

                curVal.attr({text:inputData});
            }

            gauge.redrawItem.push(counterBox,curVal);
        }

        /**GAUEGE function: animateText
         * 값 변경 애니메이션	[ COUNTER 내의 숫자 움직임 ]
         * (curVal.attr("text")) 의 값을 변경
         * @[param] :  (비교값1, 비교값2, 대상, GAUGE);
         */
        function animateText(currentVal,prevData,inputData,gauge){
            gauge.counterTimer = {};
            clearInterval(gauge.counterTimer);

            if(gauge.options.use.animateText === false){
                return false;
            }

            inputData.attr({'text' : prevData});

            var difference  = Math.floor( Math.abs(currentVal-prevData));
            var counter = 0, inputText ="", inputNum=0;
            if(currentVal !==prevData ){
                gauge.counterTimer = setInterval(function() {
                    if(currentVal < prevData) {
                        inputNum = parseInt((inputData.attr("text")))-1;
                    } else {
                        inputNum = parseInt((inputData.attr("text")))+1;
                    }

                    inputText = (gauge.options.data.format !== null) ? formatting(inputNum,gauge.options.data.format) : inputNum;
                    inputData.attr({ text: inputText } );

                    counter = counter + 1;
                    if(inputNum===currentVal || counter === difference){
                        clearInterval(gauge.counterTimer);
                    }
                }, 1000/difference);

            }
        }
        function subanimateText(currentVal,prevData,inputData,gauge){
            gauge.subcounterTimer = {};
            clearInterval(gauge.subcounterTimer);

            if(gauge.options.use.animateText === false){
                return false;
            }

            inputData.attr({'text' : prevData});

            var difference  = Math.floor( Math.abs(currentVal-prevData));
            var counter = 0, inputText ="", inputNum=0;
            if(currentVal !==prevData ){
                gauge.subcounterTimer = setInterval(function() {
                    if(currentVal < prevData) {
                        inputNum = parseInt((inputData.attr("text")))-1;
                    } else {
                        inputNum = parseInt((inputData.attr("text")))+1;
                    }

                    inputText = (gauge.options.data.format !== null) ? formatting(inputNum,gauge.options.data.format) : inputNum;
                    inputData.attr({ text: inputText } );

                    counter = counter + 1;
                    if(inputNum===currentVal || counter === difference){
                        clearInterval(gauge.subcounterTimer);
                    }
                }, 1000/difference);

            }
        }
        /**
         * 눈금의 최대범위와 최소범위 값을 설정
         * @param {Object} gauge 객체
         * 타겟값, 데이터값보다 최대값이 작거나 최소값이 크면 자동 설정
         */
        function adjustMinMax(gauge) {

            var range = gauge.options.minmax;
            var pointer = gauge.options.pointer;
            var target =parseInt(pointer.target);
            var axis= gauge.styles.axis;
            var linesCount = countLine(axis);

            /* 최소값 */
            var arr = [range.min, pointer.max, pointer.avg];
            if(gauge.options.use.target){
                arr.push(target );
            }
            range.min = Math.min.apply( null ,arr);

            if (range.min < 0) {
                range.min = (range.min % 10 === 0) ? range.min : range.min- (10 + (range.min % 10));
            } else {
                range.min = (range.min % 10 === 0) ? range.min : range.min- (range.min % 10);
            }

            if (range.max === "auto" || typeof range.max !== "number") {
                if (pointer.max === 0 && target === 0){
                    range.max = 10;
                }
                else if (pointer.max < 100 && target < 100) {
                    range.max = 100;
                } else {
                    range.max =  (target > pointer.max) ? target : (pointer.max);
                    if (range.max % linesCount !== 0) {
                        range.max = range.max + (linesCount - (range.max % linesCount));
                    }
                }
            } else if (range.max < pointer.max) {
                range.max = pointer.max;
            }

            var dataSet = gauge.settings.data;
            var inputData = dataSet[dataSet.length-1][0];

            if (inputData > range.max){
                range.max =  (10  - (inputData % 10 )) + inputData;
            }

        }

        /**
         * CHART 의 눈금 표시
         */
        function drawAxis(gauge,type){

            var pos = gauge.sizes;
            var styles = gauge.styles;
            var axis = styles.axis;
            var paper = gauge.svg;
            var bar = axis.angularBar;

            var linesCount = countLine(axis);

            var i =0,
                interval = 0,
                count = 0,
                start_x =0,
                start_y =0,
                end_x=0,
                end_y=0;

            var angle = styles.angular.angle,
                radius =pos.objRadius;

            var startAngle =90 + (360-angle)/2 ;
            var meters = paper.set();

            var blockLine = ( radius - bar.end_block ),
                intervalLine = ( radius - bar.end_interval ),
                start_bar = ( radius - bar.start );

            for(  i=0;i<linesCount+1; i++ ){

                var alpha = angle / linesCount * i,
                    a = (startAngle+ alpha) * Math.PI / 180;

                if( i %axis.interval=== 0){
                    start_x = getCos(pos, a, blockLine);
                    start_y = getSin( pos, a, blockLine);
                }
                else{
                    start_x = getCos(pos, a, intervalLine);
                    start_y = getSin(pos, a, intervalLine);
                }
                end_x = getCos(pos, a, start_bar);
                end_y = getSin(pos, a, start_bar);

                meters.push( paper.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y));

            }
            meters.attr({"stroke":bar.color});

            if(type==='dual'){

                var linesCount = countLine(axis.dual);
                var i =0,
                    interval = 0,
                    count = 0,
                    start_x =0,
                    start_y =0,
                    end_x=0,
                    end_y=0;

                var angle = axis.dual.angle;

                var startAngle =90 + (360-angle)/2 ;
                var dualMeters = paper.set();


                blockLine = blockLine / 2;
                intervalLine = (intervalLine -3)/2;
                start_bar = ((radius-(bar.start*2))/2);

                for(  i=0;i<linesCount+1; i++ ){

                    var alpha = angle / linesCount * i,
                        a = (startAngle+ alpha) * Math.PI / 180;

                    if( i %axis.dual.interval=== 0){
                        start_x = getCos(pos, a, blockLine);
                        start_y = getSin( pos, a, blockLine);
                    }
                    else{
                        start_x = getCos(pos, a, intervalLine);
                        start_y = getSin(pos, a, intervalLine);
                    }
                    end_x = getCos(pos, a, start_bar);
                    end_y = getSin(pos, a, start_bar);

                    dualMeters.push( paper.path("M"+start_x+" "+start_y+"L"+end_x+" "+end_y));

                }

                var moveY = (radius / 13 * 8 +(radius / 2)-2);
                dualMeters.attr({"stroke":bar.color}).translate( 0, moveY);

                gauge.redrawItem.push(dualMeters);
            }

            gauge.redrawItem.push(meters);
        }

        function make2Line(sX,sY,cX,cY,eX,eY){
            return "M"+sX+","+sY+"L"+cX+","+cY+"L"+eX+","+eY;
        }
        function getCos(pos,a,len){
            return  pos.centerX+(Math.cos(a)*len);
        }
        function getSin(pos,a,len){
            return (pos.centerY)+(Math.sin(a)*len);
        }
        function countLine(x){
            return  ( x.block * x.interval == 0) ? x.block : x.block * x.interval;
        }

        /**
         * CHART 의 치수 표시 (눈금 치수)
         */
        function drawTextAxis(gauge,type){
            var pos = gauge.sizes;
            var paper = gauge.svg;
            var axis = gauge.styles.axis;
            var text = axis.text;
            var bar = axis.angularBar;
            var maxAxis = gauge.options.minmax.max;
            var minAxis = gauge.options.minmax.min;
            var range = maxAxis - minAxis;

            var textVal=null;

            var angle = gauge.styles.angular.angle;
            var radius =pos.objRadius;

            var startAngle =(90 + (360-angle)/2 ), t= 0;
            var meterVal = paper.set();
            var dualMeterVal = paper.set();


            for ( i =  0 ; i < text.num ; i ++){
                textVal =Math.ceil(range/ (text.num - 1)*i);
                if (textVal%5!==0){
                    textVal = textVal+ (5-(textVal%5));
                }
                t = (startAngle +( ( angle / range)*textVal))  * Math.PI / 180;
                textVal = textVal+minAxis;
                meterVal.push( paper.text(getCos(pos, t, radius-(bar.end_block*1.75)),getSin(pos, t, radius-(bar.end_block*1.75)),textVal));
                meterVal.attr({"fill":text.angular.color,"font-size":text.angular.size,
                    "font-weight": text.angular.weight,"font-family":  text.family });
            }

            if(type==='dual'){
                var dataSet = gauge.settings.data;
                var secondData = (dataSet[dataSet.length-1][1] !== undefined) ? dataSet[dataSet.length-1][1] : 0;
                var minDualAxis = (axis.dual.minAxis < secondData )? axis.dual.minAxis :secondData ;
                var maxDualAxis = (axis.dual.maxAxis > secondData )? axis.dual.maxAxis :secondData ;
                var dualRange = maxDualAxis -minDualAxis;

                angle = axis.dual.angle;
                startAngle =90 + (360-angle)/2 ;

                var moveY = (radius / 13 * 8 +(radius / 2));
                var dualTextLength = axis.dual.text;
                for( i=0 ; i<dualTextLength; i++ ){

                    textVal =Math.ceil((dualRange /(dualTextLength-1))*i);

                    if (textVal%5!==0){
                        textVal = textVal+ (5-(textVal%5));
                    }

                    var t = (startAngle + ( (angle /dualRange)*textVal)) * Math.PI / 180;

                    dualMeterVal.push(
                        paper.text(getCos(pos, t, (radius-(bar.end_block*1.75))/2),getSin(pos, t, (radius-(bar.end_block*1.75))/2),textVal)
                            .translate(0,moveY));
                }
                dualMeterVal.attr({"fill":text.angular.color,"font-size":axis.dual.textSize,
                    "font-weight": text.angular.weight,"font-family": text.family });
                gauge.redrawItem.push(dualMeterVal);
            }
            gauge.redrawItem.push(meterVal);
        }


        /**
         * GAUEGE CHART 의 TARGET 표시
         * @param {Object}  gauge [GAUGE CHART TYPE]
         */
        function drawTarget(gauge){
            var paper = gauge.svg;
            var pos = gauge.sizes;
            var pointer = gauge.styles.pointer.target;

            var minAxis = gauge.options.minmax.min;
            var maxAxis = gauge.options.minmax.max - minAxis;
            var targetVal =   gauge.options.pointer.target - minAxis;

            var angle = gauge.styles.angular.angle;
            var targetAngle = (angle*(targetVal/maxAxis)+1) +((360 - angle ) / 2 );
            var targetCmd = make2Line(pos.centerX, (pos.endY+4), (pos.centerX-5),(pos.endY+20),  (pos.centerX+5),(pos.endY+20));

            var target =  paper.path(targetCmd);
            target.rotate(targetAngle-1, (pos.centerX), (pos.centerY));
            target.attr({"fill":pointer.color,"stroke":'none'});

            gauge.tipItems.targetPointer = target;
            gauge.redrawItem.push(target);
        }

        /**
         * 최대값 또는 평균값
         * @param {Object} gauge
         * @param {String} type ( max || avg )
         */
        function drawPointer(gauge,type){
            var paper = gauge.svg,
                pos = gauge.sizes,
                styles = gauge.styles;

            var maxAxis = gauge.options.minmax.max;
            var minAxis = gauge.options.minmax.min;
            var range = maxAxis-minAxis;
            var pointer = gauge.options.pointer;
            var angle = styles.angular.angle;
            var value = null;

            if(type === 'max'){
                value =  pointer.max - minAxis;
                styles = styles.pointer.max;
            }
            else if (type === 'avg') {
                value =  pointer.avg - minAxis;
                styles = styles.pointer.avg;
            }

            var startAngle = (360 - angle ) / 2 ;
            var pointerCmd  =  "M"+(pos.centerX)+", "+(pos.centerY)+ "L"+(pos.centerX)+","+(pos.endY+styles.angular.length),
                pointerAngle  = startAngle + (angle*(value/range)),
                labels = paper.text(pos.centerX , (pos.endY-styles.font.position),type)
                    .rotate(pointerAngle, (pos.centerX), Math.round(pos.centerY)).rotate(-pointerAngle);

            if(type ==='max' && pointer.avg== value&& gauge.options.use.avg) {
                labels.translate(0,-10);
            }
            labels.attr({'font-size': styles.font.size, 'fill': styles.angular.color , "text-anchor": "middle", 'font-family' : styles.font.family });

            var pointerPath =  paper.path(pointerCmd)
                .rotate(pointerAngle, (pos.centerX), Math.round(pos.centerY)).attr({"stroke":styles.bar.color});

            if( type === 'max'){
                gauge.tipItems.max = paper.set();
                gauge.tipItems.max.push(labels, type);
            }
            else if(type ==='avg'){
                gauge.tipItems.avg = paper.set();
                gauge.tipItems.avg.push(labels, type);
            }
            gauge.redrawItem.push(pointerPath,labels);
        }

        /**
         * 회전 애니메이션	[ USE_TYPE : Angular ]
         * @[param] :  (비교값1, 비교값2, 각도, 대상, 회전중심X, 회전중심Y);
         * 데이터를 가르키는 바늘 애니메이션
         */

        function animRotate(prevVal,curVal,obj,x,y,gauge){

            gauge.animate;
            clearInterval(gauge.animate);

            var difference  = Math.floor(Math.abs(curVal-prevVal));
            var d = difference - 1 ;

            if (obj === undefined) { return false; }

            gauge.animate = setInterval(function () {

                if(obj === undefined){ return false; }

                d = d - 1;
                if (d === -51) {
                    clearInterval(gauge.animate);
                } else {	// 흔들림 표현
                    if (curVal > prevVal) {
                        if ((d < -10 && d > -26) || (d < -35) && d > -46) {
                            obj = obj.rotate(-1, x, y);
                        } else {
                            obj = obj.rotate(1, x, y);
                        }
                    } else {
                        if ((d < -10 && d > -26) || (d < -35) && d > -45) {
                            obj = obj.rotate(1, x, y);
                        } else {
                            obj = obj.rotate(-1, x, y);
                        }
                    }
                }
            }, 1000 / (difference + 50), 'bounce');

        }

        /**
         * 회전 애니메이션	[ USE_TYPE : Angular ]
         * @[param] :  (비교값1, 비교값2, 각도, 대상, 회전중심X, 회전중심Y);
         * 데이터를 가르키는 바늘 애니메이션
         */

        function subAnimRotate(prevVal,curVal,obj,x,y,gauge){
            var tempInterval;
            gauge.animate;
            clearInterval(tempInterval);

            var difference  = Math.floor(Math.abs(curVal-prevVal));
            var d = difference - 1 ;
            if (obj === undefined) { return false; }

            tempInterval = setInterval(function () {

                if(obj === undefined){ return false; }

                d = d - 1;

                if (d === -51) {
                    clearInterval(tempInterval);
                } else {	// 흔들림 표현
                    if (curVal > prevVal) {
                        if ((d < -10 && d > -26) || (d < -35) && d > -46) {
                            obj = obj.rotate(-1, x, y);
                        } else {
                            obj = obj.rotate(1, x, y);
                        }
                    } else {
                        if ((d < -10 && d > -26) || (d < -35) && d > -45) {
                            obj = obj.rotate(1, x, y);
                        } else {
                            obj = obj.rotate(-1, x, y);
                        }
                    }
                }
            }, 1000 / (difference + 50), 'bounce');

        }


        /**
         * 기본 공통 BAISC 한 부분을 그려준다. (원형모양)
         * @param  {Object} gauge
         * @param  {String} type dual 인 겨웅 위치와 갯수를 다르게 그려야함
         */
        function drawAngular(gauge,type){
            var pos = gauge.sizes;
            var paper = gauge.svg;
            var angular = gauge.styles.angular;
            var radius =pos.objRadius;

            var angularBase = paper.circle( pos.centerX, pos.centerY, radius );

            angularBase.attr({
                'fill': angular.base.color,
                'stroke': angular.base.border,
                'stroke-width': angular.base.borderThick
            });

            gauge.tipItems.base = angularBase;

            if(type==='dual'){
                var moveY = (radius/13 * 8 +(radius/2)-2);
                var angularDualBase = paper.circle( pos.centerX, pos.centerY+moveY, radius/2 )
                    .attr({
                        'fill': angular.base.color,
                        'stroke': angular.base.border,
                        'stroke-width': angular.base.borderThick
                    });
                gauge.tipItems.dual = angularDualBase;
                gauge.redrawItem.push(angularDualBase);

            }
            gauge.redrawItem.push(angularBase);
        }

        /**
         * DRWAWING ANGULAR GAUGE'S ARROW
         * : 원형게이지 차트의 데이터 표시 바늘
         * @param  {Object} gauge
         * @param  {String} type
         */
        function drawArrow(gauge, type){

            var pos = gauge.sizes;
            var paper = gauge.svg;
            var options =  gauge.options;

            var angular = gauge.styles.angular;
            var isAnimated = options.use.animate;

            var minAxis = options.minmax.min;
            var maxAxis = options.minmax.max - minAxis;

            var dataSet = gauge.settings.data;
            var curVal = dataSet[dataSet.length-1][0]- minAxis;
            var prevVal = ((dataSet.length-2) >= 0 ) ? dataSet[dataSet.length-2][0]- minAxis : 0;
            var secondData = (dataSet[dataSet.length-1][1] !== undefined) ? dataSet[dataSet.length-1][1] : 0;
            var secondPrev =  ((dataSet.length-2) >= 0 )? dataSet[dataSet.length-2][1]: 0;

            var radius =pos.objRadius;
            var angle = angular.angle;

            var startAngle = ( 360 - angle) / 2 ,
                prevAngle = startAngle+ (angle*(prevVal/maxAxis)),
                curAngle = startAngle + (angle*(curVal/maxAxis));

            if(type==='multi'){

                secondData = secondData- minAxis;
                secondPrev = secondPrev -minAxis;

                var prevMultiAngle = startAngle+ (angle*(secondPrev/maxAxis));
                var secondAngle = startAngle + (angle*(secondData/maxAxis));
                var multiArrow = paper.path(
                        "M"+ (pos.centerX) + "," + (pos.endY-40) +
                        "L" + (pos.centerX-5.5) +","+ (pos.centerY) +
                        "L" + (pos.centerX+5.5) +","+ (pos.centerY) +
                        "L" + (pos.centerX) + "," + (pos.endY-40)
                    )
                    .attr({'fill': angular.multiArrow.color, "stroke":angular.multiArrow.border})
                    .translate("t0,-6");

                if(isAnimated){
                    multiArrow.rotate(prevMultiAngle,(pos.centerX),(pos.centerY+5));
                    subAnimRotate(prevMultiAngle, secondAngle, multiArrow, pos.centerX, (pos.centerY+5) , gauge );
                }else{
                    multiArrow.rotate(secondAngle,(pos.centerX),(pos.centerY+5));
                }

                gauge.tipItems.dual = multiArrow;
                gauge.redrawItem.push(multiArrow);
            }

            var baseArrow = paper.path(
                "M"+ (pos.centerX) + "," + (pos.endY-10) +
                "L" + (pos.centerX-5.5) +","+ (pos.centerY) +
                "L" + (pos.centerX+5.5) +","+ (pos.centerY) +
                "L" + (pos.centerX) + "," + (pos.endY-10)
            );

            if(type==="dual"){
                var dualAxis = gauge.styles.axis.dual;
                var minDualAxis = (dualAxis.minAxis < secondData )? dualAxis.minAxis :secondData ;
                var maxDualAxis = (dualAxis.maxAxis > secondData )? dualAxis.maxAxis :secondData ;
                var dualRange = maxDualAxis -minDualAxis;

                secondData = secondData- minDualAxis;
                secondPrev = secondPrev -minDualAxis;

                var dualPrevAngle = startAngle+ (angle*secondPrev/dualRange);
                var moveY = (radius/13 * 8 +(radius/2)-2);
                angle = gauge.styles.axis.dual.angle;
                startAngle = ( 360 - angle) / 2 ;
                var dualAngle = startAngle + (angle*(secondData/dualRange));
                var dualArrow = paper.path(
                    "M"+ (pos.centerX) + "," + ((pos.endY+moveY/2)) +
                    "L" + (pos.centerX-3) +","+ (pos.centerY+moveY) +
                    "L" + (pos.centerX+3) +","+ (pos.centerY+moveY) +
                    "L" + (pos.centerX) + "," + ((pos.endY+moveY/2))
                )
                    .attr({'fill': angular.dualArrow.color, "stroke":angular.dualArrow.border});

                if(isAnimated){
                    dualArrow.rotate(dualPrevAngle,(pos.centerX),((pos.centerY+moveY)+2.5));
                    subAnimRotate(dualPrevAngle, dualAngle, dualArrow, pos.centerX,((pos.centerY+moveY)+2.5), gauge);
                }else{
                    dualArrow.rotate(dualAngle,(pos.centerX),((pos.centerY+moveY)+2.5));
                }
                gauge.redrawItem.push(dualArrow);

            }
            baseArrow.attr({'fill': angular.normalArrow.color, "stroke":angular.normalArrow.border});

            if(isAnimated){
                baseArrow.rotate(prevAngle,(pos.centerX),(pos.centerY));
                animRotate((prevAngle-1),curAngle,baseArrow,(pos.centerX),(pos.centerY), gauge);
            }else{
                baseArrow.rotate(curAngle,(pos.centerX),(pos.centerY));
            }

            gauge.tipItems.data = baseArrow;
            gauge.redrawItem.push(baseArrow);

        }

        /**
         * ANGULAR GAUGE CHART CENTER
         * :: ANGULAR CHART 의 가운데 부분
         */
        function angularCenter(gauge,type){
            var pos = gauge.sizes,
                paper = gauge.svg,
                styles = gauge.styles.angular.center;

            var angCenter =  paper.circle( pos.centerX, pos.centerY, pos.objRadius*0.07 )
                .attr({
                    'fill': styles.color,
                    'stroke' : styles.border
                });
            if(type==='dual'){
                var moveY = (pos.objRadius/13 * 8 +(pos.objRadius/2))+0.5;
                var secondCenter =  paper.circle( pos.centerX, pos.centerY, pos.objRadius*0.07 )
                    .attr({
                        'fill': styles.color,
                        'stroke' : styles.border
                    })
                    .transform('t0,'+moveY).scale(0.5,0.5);
            }
            gauge.redrawItem.push(angCenter, secondCenter);
        }


        function getMousePosition (e) {
            var m = {};
            var target, rect, parent, parentRect ;
            e = e || window.event;
            if (elementType === 'VML' ) {
                target = e.target || e.srcElement;
                rect = target.getBoundingClientRect();
                parent = target.parentNode;
                parentRect = parent.getBoundingClientRect();
                m.x = e.offsetX + rect.left - parentRect.left;
                m.y = e.offsetY + rect.top - parentRect.top;
            } else {
                var appName = navigator.appName.toLowerCase();
                var userAgent = navigator.userAgent.toLowerCase();
                if (userAgent.indexOf('firefox') > - 1) { // FireFox
                    m.x = Math.round(e.layerX);
                    m.y = Math.round(e.layerY);
                } else if (appName === 'opera') { // Opera
                    target = e.target || e.srcElement;
                    rect = target.getBoundingClientRect();
                    parent = target.parentNod;
                    parentRect = parent.getBoundingClientRect();
                    m.x = e.offsetX + rect.left - parentRect.left;
                    m.y = e.offsetY + rect.top - parentRect.top;
                } else if(userAgent.indexOf('chrome') > - 1 ) { // chrome
                    m.x = Math.round(e.offsetX);
                    m.y = Math.round(e.offsetY);
                }
                else {
                    m.x = Math.round(e.clientX) ;
                    m.y = Math.round(e.clientY);
                }
            }
            return m;
        }



        /**
         * mouse move event
         */
        function mouseMoveFunc(e, _this, gauge, x) {
            var options = gauge.options;
            var toolTip = gauge.tipItems.toolTip;

            var pointerVal = gauge.options.pointer;
            var mousePosition = getMousePosition(e);

            var data = gauge.settings.data;
            if (options.toolTip.func !== null) {
                eval(options.toolTip.func)(gauge, data, toolTip);

            } else {

                var tip = "";
                switch(x){
                    case "all" :
                        tip +=  '<span>' + "- data :  "+dropNumber(data[data.length-1][0],-2) +'</span><br />';
                        tip +=  '<span>' + "- Max :  "+pointerVal.max +'</span><br />';
                        tip +=  '<span>' + "- Average :  "+pointerVal.avg  +'</span><br />';
                        break;
                    case "draw" :
                        tip +=  '<span>' + " current data : "+dropNumber(data[data.length-1],-2) +'</span><br />';
                        break;
                    case "targetPointer" :
                        tip +=   '<span>' + "target :  "+pointerVal.target +'</span><br />';
                        break;
                    case "dual" :
                        tip +=   '<span>' + "secondary data :  "+data[data.length-1][1]+'</span><br />';
                        break;
                    case "max" :
                        tip +=   '<span>' + " Max :  "+pointerVal.max+'</span><br />';
                        break;
                    case "avg" :
                        tip +=   '<span>' + " Average :  "+pointerVal.avg +'</span><br />';
                        break;
                    default :
                        tip += x;

                }

                var tipElement = '<div class="tip_data">'+ tip + '</div>';

                toolTip.html(tipElement);
            }

            var toolTipWidth = toolTip.width() / 2;
            var toolTipHeight = toolTip.height();

            toolTip.css({
                top : mousePosition.y - toolTipHeight + options.toolTip.position.y -15,
                left : mousePosition.x - toolTipWidth + options.toolTip.position.x
            });


            var appName = navigator.appName.toLowerCase();
            var userAgent = navigator.userAgent.toLowerCase();
            if(appName == "netscape" && (userAgent.indexOf('chrome') < 1 )  ){
                toolTip.css({
                    position : 'fixed'
                });
            }else{
                toolTip.css({
                    position : 'absolute'
                });

            }
            gauge.redrawItem.push(toolTip);
        }

        /**
         * gauge 에 이벤트 발생시
         * @param  {Object} gauge 객체
         */
        function itemsEvents (gauge) {

            var styles = gauge.styles;
            var options = gauge.options;

            if (!options.use.toolTip) {
                return;
            }

            // 현재 데이터 영역
            gauge.tipItems.base.mousemove(function(e) {

                gauge.tipItems.toolTip.show();
                mouseMoveFunc(e, this, gauge, "draw");

            }).mouseout(function() {

                gauge.tipItems.toolTip.hide();

            });
            //  최대값 영역
            if (options.use.max && options.toolTip.func ==null) {
                gauge.tipItems.max.mousemove( function (e) {

                    gauge.tipItems.toolTip.show();
                    mouseMoveFunc(e, this, gauge,"max");

                }).mouseout( function(){

                    gauge.tipItems.toolTip.hide();

                });
            }
            // 평균값 영역
            if (options.use.avg && options.toolTip.func ==null) {
                gauge.tipItems.avg.mousemove( function (e) {

                    gauge.tipItems.toolTip.show();
                    mouseMoveFunc(e, this, gauge,"avg");

                }).mouseout( function(){

                    gauge.tipItems.toolTip.hide();

                });
            }
            // 타겟값 영역
            if (options.use.target && options.toolTip.func ==null) {
                gauge.tipItems.targetPointer.mousemove( function (e) {

                    gauge.tipItems.toolTip.show();
                    mouseMoveFunc(e, this, gauge,"targetPointer");

                }).mouseout( function(){

                    gauge.tipItems.toolTip.hide();

                });
            }
            // dual, multi 타입일때 두번째 데이터 영역
            if(gauge.type==="dual" || gauge.type==="multi"){
                gauge.tipItems.dual.mousemove( function (e) {

                    gauge.tipItems.toolTip.show();
                    mouseMoveFunc(e, this, gauge,"dual");

                }).mouseout( function(){

                    gauge.tipItems.toolTip.hide();

                });
            }
        }



        /**
         * 툴팁 사용 시 element 를 생성 한다.
         * @param  {Object} gauge 객체
         */
        function appendToolTip (gauge) {
            var options = gauge.options;
            gauge.tipItems.toolTip = $('<div>');

            if (options.toolTip.className === null) {

                gauge.tipItems.toolTip.css({
                    "background": "#171717",
                    "color": "#fff",
                    "padding": "5px 10px",
                    "font-size" :" 12px",
                    "font-family" : "NanumGothic"
                });

            } else {

                gauge.tipItems.toolTip.attr('class', options.toolTip.className);
            }

            gauge.tipItems.toolTip.css({
                'position' : "absolute",
                'white-space': 'nowrap',
                'z-index': 100000
            });

            gauge.tipItems.toolTip.hide();

            gauge.wrapper.append(gauge.tipItems.toolTip);

        }

        /**
         * 데이터 형식 변환
         * @param  {number} num        [데이터 값]
         * @param  {String} formatType [형식 종류]
         */
        function formatting( num, formatType){
            var res = null;
            switch(formatType){
                case "prime" :
                    res = dropNumber(num);
                    break;

                case "percent" :
                    res = num + "%";
                    break;

                case "temperature" :
                    res = num + "º";
                    break;

                default :
                    res = num;

            }
            return res;
        }

        function noData (gauge) {

            var x = gauge.wrapper.width() / 2,
                y = gauge.wrapper.height() / 2,
                text = gauge.svg.text(x, y, '데이터가 로드되지 않았습니다.');

            text.attr({
                'font-family': 'dotum',
                'font-size': 12,
                fill: '#000'
            });
        }
        function drawItem(gauge,type){
            var use = gauge.options.use;

            drawAngular(gauge,type);

            if(use.axis){
                drawAxis(gauge,type);
            }
            if(use.axisText){
                drawTextAxis(gauge,type);
            }
            if(use.target){
                drawTarget(gauge);
            }
            if(use.max){
                drawPointer(gauge,"max");
            }
            if(use.avg){
                drawPointer(gauge,"avg");
            }
            if(use.counter){
                drawCounter(gauge,type);
            }

            if(use.toolTip){
                appendToolTip(gauge);
            }

            drawArrow(gauge, type);
            angularCenter(gauge,type);

        }

        function reDrawGauge (gauge, type){

            clearInterval(gauge.animate);
            clearInterval(gauge.counterTimer);

            gauge.redrawItem.remove();
            if(gauge.tipItems.toolTip){
                gauge.tipItems.toolTip.remove();
            }
            gauge.redrawItem = gauge.svg.set();
            setWrapper(gauge);
            gauge.settings = cloneSettingModel(gauge);

            // 여기서부터 스크립트 작성

            drawLayout(gauge);
            if (gauge.options.data.data === 'error' || gauge.options.data.data.length <= 0) {
                noData(gauge);

            } else {
                setInputData(gauge);
                setComputedData(gauge);
                adjustMinMax ( gauge );

                gauge.sizes = cloneSettingSize(gauge,type);

                drawItem(gauge,type);

                itemsEvents(gauge);
            }

        }

        /**
         * GAUGE 을 렌더링 하기 위한 전반적인 부분을 세팅한다.
         * @param  {Object} gauge 객체
         * @param  {Node} wrapper gauge 가 append 되는 DIV
         * @param  {Object} styles gauge 스타일
         * @param  {Object} options gauge 옵션
         * @param  {String} type gauge type
         */
        function setup (gauge, wrapper, styles, options, type) {

            gauge.wrapper = wrapper;

            gauge.wrapper.css({
                'position' : "relative"
            });

            gauge.styles = extendStyles(styles);

            gauge.options = extendOptions(options);

            gauge.options.data.data = loadData(gauge.options);

            gauge.tipItems = {};

            drawSvg(gauge);

            setWrapper(gauge);

            gauge.redrawItem = gauge.svg.set();

            gauge.settings = cloneSettingModel(gauge);

            drawLayout(gauge);
            if (gauge.options.data.data === 'error' || gauge.options.data.data.length <= 0) {
                noData(gauge);

            } else {

                setInputData(gauge);
                setComputedData(gauge);
                adjustMinMax ( gauge );

                gauge.sizes = cloneSettingSize(gauge,type);

                drawItem(gauge,type);

                itemsEvents(gauge);
            }
        }

        /**
         * GAUEGE 에 이벤트를
         * @param  {Object} wrapper 객체
         * @param  {Object} gauge 객체
         */
        function bindEvents (wrapper, gauge) {
            /**
             * gauge 를 redraw 할 때 발생하는 이벤트
             */
            gauge.event.on('reDraw', function (e, gauge) {
            });

            var waitForFinalEvent = (function () {

                var timers = {};

                return function (callback, ms, uniqueId) {

                    if (!uniqueId) {

                        uniqueId = "Don't call this twice without a uniqueId";
                    }

                    if (timers[uniqueId]) {

                        clearTimeout (timers[uniqueId]);
                    }

                    timers[uniqueId] = setTimeout(callback, ms);
                };
            })();
            /**
             * gauge 의 resize 이벤트
             */
            if (wrapper.data('resizeEventName')) {

                $(window).off(wrapper.data('resizeEventName'));
            }
            var wrapperUniqueId = getUniqueID();

            wrapper.data('resizeEventName', 'resize.' + wrapperUniqueId);

            $(window).on(wrapper.data('resizeEventName'), function () {


                var afterWrapperWidth = gauge.settings.wrapper.width;
                var beforeWrapperWidth = gauge.wrapper.width();
                var afterWrapperHeight = gauge.settings.wrapper.height;
                var beforeWrapperHeight = gauge.wrapper.height();

                if (afterWrapperWidth !== beforeWrapperWidth|| afterWrapperHeight !== beforeWrapperHeight) {
                    if (gauge.options.use.responsive) {
                        waitForFinalEvent(function() {
                            var anim = gauge.settings.animation;
                            for (var i = 0; i < anim.length; i++){
                                clearInterval(anim[i]);
                            }
                            gauge.resize();

                        }, 500, "some unique string");
                    }
                    gauge.svg.width = gauge.wrapper.width();
                    gauge.svg.height = gauge.wrapper.height();
                }
            });
        }

        function setWrapper (gauge) {
            gauge.svg.width = gauge.wrapper.width();
            gauge.svg.height = gauge.wrapper.height();
        }

        function getUniqueID () {

            return Math.random().toString(36).substr(2, 9);
        }

        /**
         * GAUEGE 에 API 를 추가한다.
         * @param  {Object} gauge 객체
         * @param  {String} type
         */
        function addApis (gauge,type){
            gauge.on = function (eventName, callback) {

                gauge.event.on(eventName, callback);
            };

            /**
             *   GAUEGE CHART 를 다시 그릴 경우 사용
             *   설정 값에 따른 셋팅
             *   BEFORE REDRAW  SETTING USER OPTIONS
             */
            gauge.reDraw = function (style, option, redraw) {
                if(style !== undefined){
                    gauge.styles = extendStyles(style);
                }
                if(option !== undefined){
                    gauge.options = extendOptions(option);
                    gauge.options.data.data = loadData(option);
                }
                if(redraw !== false){
                    reDrawGauge(gauge,type);
                }

                gauge.event.trigger('reDraw', [gauge]);
            };

            /**
             * resize
             */
            gauge.resize = function () {
                reDrawGauge(gauge,type);
            };

            /**
             * options.data.use 로 데이터가 나눠진 상태인 경우에
             * 해당 데이터의 인덱스 값을 이용해 gauge 의 데이터를 변경해 준다.
             * @param {Number} idx          data index
             */
            gauge.setData = function (idx) {

                gauge.settings.data.renderedData =
                    gauge.settings.data.dividedData[idx];

                gauge.settings.data.renderedDataIndex = idx;

                reDrawGauge(gauge,type);
            };

            /**
             * gauge 차트에 실시간으로 데이터를 입력하여 그린다.
             * @param  {Array} data         데이터
             */
            gauge.realTime = function (data) {
                gauge.options.data.data.push(data);
/*
                var idx = gauge.options.data.data.length - 1;

                gauge.setData(idx);*/

                reDrawGauge(gauge,type);

            };

            gauge.mouseMoveFunc = function(e,x,gauge,type){
                mouseMoveFunc(e, x, gauge, type);
            }
        }

        /**
         * GAUGE 초기화 함수
         * @param  {Object} wrapper gauge 가 append 되는 DIV
         * @param  {Object} styles  gauge 스타일
         * @param  {Object} options gauge 옵션
         * @param  {String} type gauge type 설정
         * @return {Object}	gauge 객체
         */
        self.init = function (wrapper, styles, options,type) {

            var gauge = {};

            gauge.event = $({});

            bindEvents(wrapper, gauge);

            if(!type){ type = "angular_normal" }

            if(type.substring(0, 7) === "angular"){
                var flag = type.lastIndexOf( "_" );
                type = type.substring(flag+1);
                gauge.type = type;
            }

            setup(gauge, wrapper, styles, options,type);

            addApis(gauge,type);

            if (TRIAL_UI) {
                appendTrialUi(wrapper);
            }

            gauge.license = licenseObject;

            wrapper[0].instance = gauge;

            return gauge;
        };

        if (!window.webponent){
            window.webponent = {};
        }
        if (!window.webponent.visual) {
            window.webponent.visual = {};
        }
        window.webponent.visual.angular = self;


    })();

})();

