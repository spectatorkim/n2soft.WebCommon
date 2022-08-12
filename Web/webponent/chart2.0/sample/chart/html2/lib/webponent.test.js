
	$(document).ready(function() {
		$('.ctrlBox').append('<button type="button" class="btn_small"><span>small</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_default"><span>normal</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_full"><span>full</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_basic"><span>BASIC</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_black"><span>BLACK</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_access"><span>ACCESSIBILITY</span></button>');

		$('.ctrlBox').append('<button type="button" class="btn_normal"><span>NORMAL</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_abnormal"><span>ABNORMAL</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_other"><span>OTHER</span></button>');

		$('.ctrlBox').append('<button type="button" class="btn_show"><span>SHOW</span></button>');
		$('.ctrlBox').append('<button type="button" class="btn_hide"><span>HIDE</span></button>');

		$('.ctrlBox').append('<button type="button" class="btn_export"><span>EXPORT</span></button>');

		//$('.ctrlBox').append('<button type="button" class="btn_pub">pub</button>');

		$('.ctrlBox').on('click','.btn_small', function(){
			$('.chart').css('width', 300);
			chart.resize();
		});

		$('.ctrlBox').on('click','.btn_default', function(){
			$('.chart').css('width', 600);
			chart.resize();
		});

		$('.ctrlBox').on('click','.btn_full', function(){
			$('.chart').css('width', '100%');
			chart.resize();
		});


		$('.ctrlBox').on('click','.btn_basic', function(){
			styles = webponent.chart.styles.BASIC;
			try {
				onChangeStyle(styles, chart.getSeries(), 'basic');
			}catch(e) {}
			chart.reDraw(null, styles);
		});

		$('.ctrlBox').on('click','.btn_black', function(){
			styles = webponent.chart.styles.BLACK;
			try {
				onChangeStyle(styles, chart.getSeries(), 'black');
			}catch(e) {}
			chart.reDraw(null, styles);
		});

		$('.ctrlBox').on('click','.btn_access', function(){
			styles = webponent.chart.styles.ACCESSIBILITY;
			try {
				onChangeStyle(styles, chart.getSeries(), 'accessibility');
			}catch(e) {}

			chart.reDraw(null, styles);
		});

		// 데이터 정상 버튼
		$('.ctrlBox').on('click','.btn_normal', function(){
			$('.chart').empty();
			try {
				onChangeStyle(styles);
			}catch(e) {}
			options.data.data = normalData;
			chart = webponent.chart.init($('.chart'), options, styles, series);
		});
		// 데이터 비정상 버튼
		$('.ctrlBox').on('click','.btn_abnormal', function(){
			chart.reDraw(abnormalData);
		});
		// 데이터 다른거 버튼
		$('.ctrlBox').on('click','.btn_other', function(){

			chart.reDraw(normalData,styles,series2);
		});
		
		// 보이기 버튼
		$('.ctrlBox').on('click','.btn_show', function(){
			$('.chart').show();	
			chart.resize();		
		});
		// 숨기기 버튼
		$('.ctrlBox').on('click','.btn_hide', function(){
			$('.chart').hide();			
		});
		// 내보내기 버튼
		$('.ctrlBox').on('click','.btn_export', function(){
			var width = $('.chart').width();
			var height = $('.chart').height();
			chart.getSVG({
			log: false,
			width: width,
			height: height
		});


		});
	});

// 데이터 정상
var normalData = [
                  { Date: '20140101', Mprc: 14000, Hiprc: 15000, Lprc: 12000, Cprc: 13000 ,prc: 1000  ,updn: 10000 ,"cost1": "100","cost2": "20","cost3": "100","cost4": "20", 'up': 20000, 'down': '-20,000', 'open':'58100', 'high': '59500', 'low': '57900', 'close': '59400', 'minus': -10000, 'plus':0},
                  { Date: '20140102', Mprc: 13000, Hiprc: 19000, Lprc: 11000, Cprc: 17000 ,prc: 10000 ,updn: 5000 ,"cost1": "100","cost2": "30","cost3": "50","cost4": "-50", 'up': 20000, 'down': '-20,000', 'open':'59700', 'high': '59800', 'low': '57600', 'close': '58600', 'minus': 0, 'plus':20000},
                  { Date: '20140103', Mprc: 25000, Hiprc: 29000, Lprc: 23000, Cprc: 27000 ,prc: 2000 ,updn: -5000 ,"cost1": "100","cost2": "50","cost3": "100","cost4": "60", 'up': 20000, 'down': '-20,000', 'open':'60400', 'high': '61200', 'low': '58400', 'close': '59200', 'minus': -10000, 'plus':0},
                  { Date: '20140104', Mprc: 13000, Hiprc: 15000, Lprc: 11000, Cprc: 12500 ,prc: 10000 ,updn: 10000 ,"cost1": "100","cost2": "40","cost3": "-100","cost4": "-30", 'up': 20000, 'down': '-20,000', 'open':'60200', 'high': '61000', 'low': '60000', 'close': '60700', 'minus': -10000, 'plus':20000},
                  { Date: '20140105', Mprc: 20000, Hiprc: 21000, Lprc: 17000, Cprc: 17000 ,prc: 13000 ,updn: -7000 ,"cost1": "100","cost2": "10","cost3": "80","cost4": "10", 'up': 20000, 'down': '-20,000', 'open':'60600', 'high': '60800', 'low': '59800', 'close': '60700', 'minus': -10000, 'plus':20000},
                  { Date: '20140106', Mprc: 17000, Hiprc: 19000, Lprc: 16000, Cprc: 18500 ,prc: 9000 ,updn: 3000 ,"cost1": "100","cost2": "20","cost3": "50","cost4": "20", 'up': 20000, 'down': '-20,000', 'open':'61000', 'high': '61300', 'low': '60500', 'close': '60900', 'minus': -10000, 'plus':20000},
                  { Date: '20140107', Mprc: 23000, Hiprc: 25000, Lprc: 21000, Cprc: 22500 ,prc: 10000 ,updn: 10000 ,"cost1": "100","cost2": "40","cost3": "-100","cost4": "-30", 'up': 20000, 'down': '-20,000', 'open':'61000', 'high': '61300', 'low': '60500', 'close': '60900', 'minus': -10000, 'plus':20000},
                  { Date: '20140108', Mprc: 20000, Hiprc: 21000, Lprc: 17000, Cprc: 20500 ,prc: 11000 ,updn: -7000 ,"cost1": "100","cost2": "10","cost3": "80","cost4": "10", 'up': 20000, 'down': '-20,000', 'open':'61000', 'high': '61300', 'low': '60500', 'close': '60900', 'minus': -10000, 'plus':20000}
                ];
// 데이터 다른거(사용안함.)
var abnormalDatax = [
                    { Date: '20140101', Mprc: 10000 ,prc: 1000  ,updn: 10000 ,"cost1": "100","cost2": "20","cost3": "100","cost4": "60",   'open':'58100', 'high': '59500', 'low': '57900', 'close': '59400', "bullet1": "100",  "bullet2": "50"},
                    { Date: '20140102', Mprc: 2000 ,prc: 10000 ,updn: 5000 ,"cost1": "100","cost2": "30","cost3": "-100","cost4": "-50",   'open':'59700', 'high': '59800', 'low': '57600', 'close': '58600', "bullet1": "-100", "bullet2": "-50"},
                    { Date: '20140103', Mprc: 25000 ,prc: 2000 ,updn: -5000 ,"cost1": "100","cost2": "50","cost3": "100","cost4": "60",    'open':'60400', 'high': '61200', 'low': '58400', 'close': '59200', "bullet1": "100",  "bullet2": "50"},
                    { Date: '20140104', Mprc: 10000 ,prc: 20000 ,updn: 10000 ,"cost1": "100","cost2": "40","cost3": "-100","cost4": "-30", 'open':'60200', 'high': '61000', 'low': '60000', 'close': '60700', "bullet1": "100",  "bullet2": "50"},
                    { Date: '20140105', Mprc: 20000 ,prc: 13000 ,updn: -7000 ,"cost1": "100","cost2": "10","cost3": "100","cost4": "10",   'open':'60600', 'high': '60800', 'low': '59800', 'close': '60700', "bullet1": "100",  "bullet2": "50"},
                    { Date: '20140106', Mprc: 17000 ,prc: 23000 ,updn: 3000 ,"cost1": "100","cost2": "20","cost3": "100","cost4": "20",    'open':'61000', 'high': '61300', 'low': '60500', 'close': '60900', "bullet1": "-100", "bullet2": "-30"}
                ];
// 데이터 비정상
var abnormalData = [
                    { Date: '20140101', Mprc: 0, prc: 1000 ,updn: 10000 ,"cost1": "100","cost2": "20","cost3": "100","cost4": "20", 	'open':'58100', 'high': '59500', 'low': '57900', 'close': '59400', "bullet1": "100",  "bullet2": "50", 'minus': -10000, 'plus':10000},
                    { Date: '20140102', Mprc: 1, prc: 1000 ,updn: 0 ,"cost1": "100","cost2": "20","cost3": "140","cost4": "20", 		'open':'a', 'high': '59800', 'low': 'a', 'close': '58600', "bullet1": "a", "bullet2": "-50", 'minus': -10000, 'plus':10000},
                    { Date: '20140103', Mprc: 15000, prc: 'a' ,updn: "a" ,"cost1": "200","cost2": "20","cost3": "50","cost4": "20", 	'open':'60400', 'high': '61200', 'low': '58400', 'close': '59200', "bullet1": "100",  "bullet2": "50", 'minus': -10000, 'plus':10000},
                    { Date: '20140104', Mprc: 'a', prc: 1000 ,updn: 10000 ,"cost1": "0","cost2": "20","cost3": "0","cost4": "20", 		'open':'60200', 'high': '61000', 'low': '60000', 'close': 'a', "bullet1": "100",  "bullet2": "50", 'minus': -10000, 'plus':10000},
                    { Date: '20140105', Mprc: 5000, prc: 1000 ,updn: 10000 ,"cost1": "100","cost2": "20","cost3": "-100","cost4": "20", 'open':'60600', 'high': '60800', 'low': '59800', 'close': '60700', "bullet1": "100",  "bullet2": "50", 'minus': -10000, 'plus':10000},
                    { Date: '20140106', Mprc: 9000, prc: 1000 ,updn: 10000 ,"cost1": "100","cost2": "20","cost3": "100","cost4": "20", 	'open':'61000', 'high': '61300', 'low': '60500', 'close': '60900', "bullet1": "-100", "bullet2": "-30", 'minus': -10000, 'plus':10000}
                ];

var xaxis_all_view_column = [
				{ Date: '국채', Mprc: 10000 },
				{ Date: '지방채', Mprc: 20000 },
				{ Date: '특수채', Mprc: 15000 },
				{ Date: '통안증권', Mprc: 30000 },
				{ Date: '은행채', Mprc: 5000 },
				{ Date: '기타금융채', Mprc: 5000 },
				{ Date: '회사채(공모무보증)', Mprc: 5000 },
				{ Date: '은행채(공모보증)', Mprc: 5000 },
				{ Date: 'ABS', Mprc: 5000 },
				{ Date: '전체', Mprc: 5000 }
			];