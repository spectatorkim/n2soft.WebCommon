
(function () {

	var self = {};

	/**
	 * 페이징을 만들면서 새로 생기는 마크업에
	 * 붙여주는 클래스들을 정리해 놓음.
	 * @type {Object}
	 */
	var PAGING_CLASS = {
	
		WRAPPER : 'WEBPONENT-PAGING-WRAPPER',

		A : 'WEBPONENT-PAGING-A',

		SELECTED_A : 'WEBPONENT-PAGING-A-SELECTED',

		LEFT : 'WEBPONENT-PAGING-LEFT',

		RIGHT : 'WEBPONENT-PAGING-RIGHT',

		START : 'WEBPONENT-PAGING-START',

		END : 'WEBPONENT-PAGING-END',

		DISABLED_LEFT : 'WEBPONENT-PAGING-LEFT-DISABLED',

		DISABLED_RIGHT : 'WEBPONENT-PAGING-RIGHT-DISABLED',

		DISABLED_START : 'WEBPONENT-PAGING-START-DISABLED',

		DISABLED_END : 'WEBPONENT-PAGING-END-DISABLED',

		TOTAL_COUNT : 'WEBPONENT-PAGING-TOTAL-COUNT',

		TOTAL_COUNT_TEXT : 'WEBPONENT-PAGING-TOTAL-COUNT-TEXT',

	};

	function cloneSettingModel () {

		/**
		 * 페이징 세팅 정보를 담고 있다.
		 * @type {Object}
		 */
		var settingModel = {

			/**
			 * 페이징을 위한 세팅들
			 * @type {Object}
			 */
			option : {

				/**
				 * 한 페이지에 들어가는 row 의 개수
				 * @type {Number}
				 */
				countPerPage : null,

				/**
				 * 페이지의 개수
				 * @type {Number}
				 */
				totalPageCount : null,

				/**
				 * row 의 개수
				 * @type {Number}
				 */
				totalCount : null,

				/**
				 * 현재 렌더링 되어있는 페이지 index
				 * @type {Number}
				 */
				currentPageIndex : null,

				/**
				 * 리스트에 보여질 페이지의 개수
				 * @type {Number}
				 */
				paginationCount : null,

				/**
				 * 렌더링 되어있는 페이지 리스트의 첫번째 index
				 * @type {Number}
				 */
				startPageListIndex : null
			}

		};

		return settingModel;
	}

	function cloneMarkupModel () {

		/**
		 * 페이징을 구성하는 MARKUP정보를 가지고 있다.
		 * @type {Object}
		 */
		var markupModel = {			

			/**
			 * 페이징 WRAPPER
			 * @type {Node}
			 */
			wrapper : null,

			/**
			 * 페이지 a 태그
			 * @type {Array}
			 */
			a : [],

			/**
			 * 페이지를 왼쪽으로 이동 한다.
			 * @type {Node}
			 */
			left : null,

			/**
			 * 페이지를 오른쪽으로 이동 한다.
			 * @type {Node}
			 */
			right : null,

			/**
			 * 첫 페이지로 이동 한다.
			 * @type {Node}
			 */
			start : null,

			/**
			 * 마지막 페이지로 이동한다.
			 * @type {Node}
			 */
			end : null

		};

		return markupModel;
	}

	var EVENT = {

		/**
		 * 페이지가 선택 되었을 때 발생하는 이벤트
		 * @type {String}
		 */
		PAGE_SELECTED : 'pageSelected',

		/**
		 * 페이지 UI 가 REFRESH 되었을 때 발생하는 이벤트
		 * @type {String}
		 */
		REFRESH_PPAGING_UI : 'refreshPagingUI'

	};

	/**
	 * 페이징의 A 태그를 설정한다.
	 * @param  {paging} paging 페이징 객체
	 */
	function appendMarkUpPage (paging) {

		var wrapper = $(paging.markup.wrapper);
		var paginationCount = paging.settings.option.paginationCount;
		var totalPageCount = paging.settings.option.totalPageCount;
		var totalCount = paging.settings.option.totalCount;

		wrapper.empty();

		var startPageListIndex = paging.settings.option.startPageListIndex;

		if (totalPageCount - startPageListIndex < paginationCount) {

			paginationCount = totalPageCount - startPageListIndex;
		}

		if (totalCount != null) {

			var aTags = [];

			for ( var i = 0; i < paginationCount; i++ ) {
			
				var a = $('<a>')
					.addClass(PAGING_CLASS.A)
					.text(i + 1 + startPageListIndex)
					.data('page', i + startPageListIndex)
					.attr({
						"title": (i + startPageListIndex) + ' 페이지 이동',
						"href": '#'
					})

				a.on('click', function (e) {

					e.preventDefault();
				});

				aTags.push(a[0]);
			}

			paging.markup.a = aTags;
			
			wrapper.append(aTags);
		} else {

			var noDataSpan = $('<span style="margin-right: 10px;">')
					.text('데이터가 없습니다');

			wrapper.append(noDataSpan);
		}

		/*
			arrow 버튼 생성
		 */
		appendPagingArrow(paging);

		/*
			클릭 이벤트가 발생할 경우
		 */
		bindPagingClickEvent(paging);

		/*
			선택된 페이지의 A 태그에 클래스를 부여
		 */
		selectedPageListIndex(paging);
	}

	/**
	 * arrow 버튼을 생성한다.
	 * @param  {paging} paging 페이징 객체
	 */
	function appendPagingArrow (paging) {

		var wrapper = $(paging.markup.wrapper);

		var left = $('<input type="button">')
				.addClass(PAGING_CLASS.LEFT)
				.val("left");
		var right = $('<input type="button">')
				.addClass(PAGING_CLASS.RIGHT)
				.val("right");
		var start = $('<input type="button">')
				.addClass(PAGING_CLASS.START)
				.val("start");
		var end = $('<input type="button">')
				.addClass(PAGING_CLASS.END)
				.val("end");

		paging.markup.left = left[0];
		paging.markup.right = right[0];
		paging.markup.start = start[0];
		paging.markup.end = end[0];

		wrapper.prepend(paging.markup.left);
		wrapper.append(paging.markup.right);
		wrapper.prepend(paging.markup.start);
		wrapper.append(paging.markup.end);

		/*
			arrow 버튼에 'disabled' 속성 및 클래스를 부여한다.
		 */
		setArrowAttr(paging);
	}

	/**
	 * arrow 버튼에 'disabled' 속성 및 클래스를 부여한다.
	 * @param  {paging} paging 페이징 객체
	 */
	function setArrowAttr (paging) {

		var left = paging.markup.left;
		var right = paging.markup.right;
		var start = paging.markup.start;
		var end = paging.markup.end;

		var paginationCount = paging.settings.option.paginationCount;
		var totalPageCount = paging.settings.option.totalPageCount;
		var currentPageIndex = paging.settings.option.currentPageIndex;

		if (totalPageCount % paginationCount != 0) {
			paginationCount = totalPageCount % paginationCount;
		}

		if (totalPageCount == 0) {

			$(left).attr("disabled", true)
				.addClass(PAGING_CLASS.DISABLED_LEFT);

			$(start).attr("disabled", true)
				.addClass(PAGING_CLASS.DISABLED_START);

			$(right).attr("disabled", true)
				.addClass(PAGING_CLASS.DISABLED_RIGHT);

			$(end).attr("disabled", true)
				.addClass(PAGING_CLASS.DISABLED_END);

		} else {

			if (currentPageIndex == null) {

				currentPageIndex = 0;
			}

			if (currentPageIndex == 0) {

				$(left).attr("disabled", true)
					.addClass(PAGING_CLASS.DISABLED_LEFT);
			}

			if (0 <= currentPageIndex && currentPageIndex < 
						paging.settings.option.paginationCount) {

				$(start).attr("disabled", true)
					.addClass(PAGING_CLASS.DISABLED_START);
			}

			if (currentPageIndex == totalPageCount - 1) {

				$(right).attr("disabled", true)
					.addClass(PAGING_CLASS.DISABLED_RIGHT);
			}

			if (totalPageCount - paginationCount <= currentPageIndex) {

				$(end).attr("disabled", true)
					.addClass(PAGING_CLASS.DISABLED_END);
			}
		}
	}

	/**
	 * A 태그와 버튼에 클릭 이벤트가 발생할 경우
	 * 각각의 기능을 수행한다.
	 * @param  {paging} paging 페이징 객체
	 */
	function bindPagingClickEvent (paging) {

		var left = paging.markup.left;
		var right = paging.markup.right;
		var start = paging.markup.start;
		var end = paging.markup.end;

		var paginationCount = paging.settings.option.paginationCount;
		var totalPageCount = paging.settings.option.totalPageCount;

		var aTags = paging.markup.a;

		_.each(aTags, function (a, index, list) {

			$(a).on('click', function () {

				paging.settings.option.currentPageIndex = $(this).data('page');

				paging.event.trigger(EVENT.PAGE_SELECTED, 
						paging.settings.option.currentPageIndex);
			})
		});

		$(left).on('click', function () {

			var startPageListIndex = paging.settings.option.startPageListIndex;

			if (startPageListIndex != 0) {

				paging.settings.option.startPageListIndex 
						= startPageListIndex - paginationCount;

				paging.settings.option.currentPageIndex = startPageListIndex - 1;

			} else {

				paging.settings.option.startPageListIndex = 0;
				paging.settings.option.currentPageIndex = 0;
			}

			paging.event.trigger(EVENT.PAGE_SELECTED, 
					paging.settings.option.currentPageIndex);
		})

		$(right).on('click', function () {

			var startPageListIndex = paging.settings.option.startPageListIndex;

			if (startPageListIndex + paginationCount < totalPageCount) {
				
				paging.settings.option.startPageListIndex 
						= startPageListIndex + paginationCount;

				paging.settings.option.currentPageIndex
						= paging.settings.option.startPageListIndex;
			} else {
			
				paging.settings.option.currentPageIndex = totalPageCount - 1;
			}

			paging.event.trigger(EVENT.PAGE_SELECTED,
					paging.settings.option.currentPageIndex);
		})

		$(start).on('click', function () {

			paging.settings.option.startPageListIndex = 0;
			paging.settings.option.currentPageIndex = 0;

			paging.event.trigger(EVENT.PAGE_SELECTED, 
					paging.settings.option.currentPageIndex);
		})

		$(end).on('click', function () {

			var paginationCount = paging.settings.option.paginationCount;

			if (totalPageCount % paginationCount != 0) {
				paginationCount = totalPageCount % paginationCount;
			}

			paging.settings.option.startPageListIndex 
					= totalPageCount - paginationCount;

			paging.settings.option.currentPageIndex = totalPageCount - 1;

			paging.event.trigger(EVENT.PAGE_SELECTED, 
					paging.settings.option.currentPageIndex);
		})
	}

	/**
	 * 선택된 페이지의 A 태그에 클래스를 부여한다.
	 * @param  {paging} paging 페이징 객체
	 */
	function selectedPageListIndex (paging) {

		var index = paging.settings.option.currentPageIndex;

		if (index == null) {

			index = 0;
		}
		var startPageListIndex = paging.settings.option.startPageListIndex;
		var selectedAIndex = index - startPageListIndex;
		var selectedA = paging.markup.a[selectedAIndex];

		$(selectedA).addClass(PAGING_CLASS.SELECTED_A);
	}

	/**
	 * 페이징에 이벤트를 붙여준다.
	 * @param  {paging} paging 페이징 객체
	 */
	function bindEvents (paging) {

		paging.event.on(EVENT.PAGE_SELECTED, function (e, currentPageNumber) {

			appendMarkUpPage(paging);

			paging.settings.option.pageSelected(paging.settings.option);
		});

		paging.event.on(EVENT.REFRESH_PPAGING_UI, function (e, option) {

			var totalCnt = paging.settings.option.totalCount;

			$(paging.markup.totalCountText).find('.' + PAGING_CLASS.TOTAL_COUNT).text(totalCnt);
		});
	}

	/**
	 * 페이징을 렌더링 하기 위한 정보를
	 * paging.settings 와 paging.markup 에 매핑한다.
	 * 
	 * @param  {paging} paging  페이징 객체
	 * @param  {Node} wrapper 	페이징 DIV
	 * @param  {Object} option  페이징 옵션
	 */
	function setup (paging, wrapper, option) {

		paging.settings = cloneSettingModel();

		paging.markup = cloneMarkupModel();

		paging.settings.option = _.extend(paging.settings.option, option);

		paging.settings.option.totalPageCount 
				= Math.ceil(paging.settings.option.totalCount /
						paging.settings.option.countPerPage);

		var pagingWrapper = $('<div>').addClass(PAGING_CLASS.WRAPPER);

		paging.markup.wrapper = pagingWrapper[0];

		var totalCountText = $('<span>전체 : <span class="' + PAGING_CLASS.TOTAL_COUNT + '">0</span>건</span>').
				addClass(PAGING_CLASS.TOTAL_COUNT_TEXT);

		paging.markup.totalCountText = totalCountText[0];

		wrapper.append(pagingWrapper);

		wrapper.append(totalCountText);

		appendMarkUpPage(paging);
	}

	/**
	 * 페이징에 API를 추가한다.
	 * @param {paging} paging 페이징 객체
	 */
	function addApis (paging) {

		paging.on = function (eventName, callback) {

			paging.event.on(eventName, callback);
		};

		paging.refreshPagingUI = function (option) {

			paging.settings.option = _.extend(paging.settings.option, option);
			
			if (paging.settings.option.currentPageIndex === null) {

				paging.settings.option.currentPageIndex = 0;
				paging.settings.option.startPageListIndex = 0;	
			} else {

				var currentPageIndex = paging.settings.option.currentPageIndex;
				var paginationCount = paging.settings.option.paginationCount
				var startPageListIndex = 
						Math.floor(currentPageIndex / paginationCount) * paginationCount;

				paging.settings.option.startPageListIndex = startPageListIndex;
			}

			paging.settings.option.totalPageCount 
				= Math.ceil(paging.settings.option.totalCount /
						paging.settings.option.countPerPage);

			paging.event.trigger(EVENT.REFRESH_PPAGING_UI, paging.settings.option);

			appendMarkUpPage(paging);
		};
	}

	/**
	 * 페이징 초기화 함수
	 *
	 * @param  {jQuery} wrapper 초기화할 DIV
	 * @param  {Object} option   초기화 옵션
	 * @return {paging}          페이징 오브젝트
	 */
	self.init = function (wrapper, option) {

		var paging = {};

		paging.event = $({});

		setup(paging, wrapper, option);
		
		/*
			내부에서 사용하는 이벤트를 부여한다.
		 */
		bindEvents(paging);

		addApis(paging);

		return paging;
	};


	if (!window.webponent){
		window.webponent = {};
	}

	window.webponent.pagingUI = self;

})();