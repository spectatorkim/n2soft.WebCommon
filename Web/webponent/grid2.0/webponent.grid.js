(function ($, undefined) {
	var productName = "webPonent GRID2.0";
	var productId = "WG2";
	if (typeof WEBPONENT_GRID_LICENSE_KEY === "undefined") {
		$.ajax({ url: "/webponent.licenseKey.js", dataType: "script", async: false });
		if (typeof WEBPONENT_GRID_LICENSE_KEY === "undefined" || WEBPONENT_GRID_LICENSE_KEY === "") {
			alert(productName + "의 라이센스키를 입력해주세요.");
			return;
		}
	}
	var key = "SXGWLZPDOKFIVUHJYTQBNMACERxswgzldpkoifuvjhtybqmncare";
	function decodeStr(coded) {
		coded = decodeURIComponent(coded); var uncoded = ""; var chr; for (var i = coded.length - 1; i >= 0; i--) {
			chr = coded.charAt(i);
			uncoded += (chr >= "a" && chr <= "z" || chr >= "A" && chr <= "Z") ? String.fromCharCode(65 + key.indexOf(chr) % 26) : chr;
		} return uncoded;
	}
	function appendTrialUi(wrapper) {
		var wrapper = $(wrapper); var trialUiWrapper = $('<div class="WEBPONENT-TRIAL-UI">'); trialUiWrapper.css({ position: "absolute", top: "0", left: "0", width: "100%", height: "100%", "background-image": "url('data:image/png;base64,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')", "background-repeat": "no-repeat", "background-position": "center center", "z-index": "1", opacity: "0.3" }); var img = $('<img src="/WEB-APP/webponent/grid2.0/img/webponent.png"/>'); trialUiWrapper.append(img); wrapper.prepend(trialUiWrapper); wrapper.on("mouseenter", function () { trialUiWrapper.stop(true, true); trialUiWrapper.hide(); }); wrapper.on("mouseleave", function () { trialUiWrapper.stop(true, true); trialUiWrapper.fadeIn(); }); wrapper.data("check-trial-ui", setInterval(function () {
			if (wrapper.find(".WEBPONENT-TRIAL-UI").length === 0) {
				clearInterval(wrapper.data("check-trial-ui"));
				appendTrialUi(wrapper[0]);
			}
		}, 5000));
	}
	function makeLicenseObject(text) { var obj = {}; var splitedArray = text.split(";"); obj.product = splitedArray[0]; obj.customer = splitedArray[2]; obj.licenseType = splitedArray[3]; obj.domains = splitedArray[5]; obj.expireDate = splitedArray[6]; return obj; }
	var TRIAL_UI = false;
	var decodedLicenseKey = decodeStr(WEBPONENT_GRID_LICENSE_KEY);
	var licenseObject = makeLicenseObject(decodedLicenseKey);
	if (licenseObject.licenseType === "TRIAL") {
		TRIAL_UI = false;
/*		if (new Date() > new Date(licenseObject.expireDate * 1)) {
			alert(productName + " " + licenseObject.licenseType + "버전의 라이센스 유효기간이 지났습니다.");
			return;
		}*/
	}
	else {
		if (licenseObject.licenseType === "DEVELOP") {
			if (new Date() > new Date(licenseObject.expireDate * 1)) {
				TRIAL_UI = true;
			}
		}
		else {
			if (licenseObject.licenseType === "OFFICIAL" || licenseObject.licenseType === "ED001" || licenseObject.licenseType === "ED002" || licenseObject.licenseType === "ED003") {
				var domain = window.location.host.toUpperCase();
				TRIAL_UI = true;
				var splitedDomain = licenseObject.domains.split(",");
				for (var i = 0; i < splitedDomain.length; i++) {
					var regesteredSite = splitedDomain[i];
					if (domain.indexOf(regesteredSite) > -1) {
						TRIAL_UI = false;
					}
				}
			}
			else {
				if (licenseObject.product !== productId) {
					TRIAL_UI = true;
				}
				else {
					alert("유효하지 않은 " + productName + " 라이센스입니다.");
					TRIAL_UI = true;
				}
			}
		}
	}
	(function () {
		var self = {};
		var GRID_CLASS = self.GRID_CLASS = { PLATFORM: { WINDOWS: "CI-GRID-ON-WINDOWS", MAC: "CI-GRID-ON-MAC", LINUX: "CI-GRID-ON-LINUX" }, MOBILE: "CI-GRID-ON-MOBILE", AREA: "CI-GRID-AREA", WRAPPER: "CI-GRID-WRAPPER", MAIN: { WRAPPER: "CI-GRID-MAIN-WRAPPER", HEADER: { WRAPPER: "CI-GRID-HEADER-WRAPPER", SCROLLER: "CI-GRID-HEADER-SCROLLER", INNER: "CI-GRID-HEADER-INNER", TABLE: "CI-GRID-HEADER-TABLE", TABLE_THEAD: "CI-GRID-HEADER-TABLE-THEAD", TABLE_TBODY: "CI-GRID-HEADER-TABLE-TBODY" }, BODY: { WRAPPER: "CI-GRID-BODY-WRAPPER", SCROLLER: "CI-GRID-BODY-SCROLLER", INNER: "CI-GRID-BODY-INNER", TABLE: "CI-GRID-BODY-TABLE", TABLE_THEAD: "CI-GRID-BODY-TABLE-THEAD", TABLE_THEAD_CELL: "CI-GRID-BODY-TABLE-THEAD-CELL", TABLE_TBODY: "CI-GRID-BODY-TABLE-TBODY", CAPTION: "CI-GRID-BODY-CAPTION" } }, FIXED: { WRAPPER: "CI-GRID-FIXED-WRAPPER", HEADER: { WRAPPER: "CI-GRID-FIXED-HEADER-WRAPPER", SCROLLER: "CI-GRID-FIXED-HEADER-SCROLLER", INNER: "CI-GRID-FIXED-HEADER-INNER", TABLE: "CI-GRID-FIXED-HEADER-TABLE" }, BODY: { WRAPPER: "CI-GRID-FIXED-BODY-WRAPPER", SCROLLER: "CI-GRID-FIXED-BODY-SCROLLER", INNER: "CI-GRID-FIXED-BODY-INNER", TABLE: "CI-GRID-FIXED-BODY-TABLE" } }, DESIGN: { FIXED: { INNER_BORDER: "CI-GRID-FIXED-INNER-BORDER" }, BORDER: { BOTTOM: "CI-GRID-BORDER-BOTTOM", RIGHT: "CI-GRID-BORDER-RIGHT", FIXED: "CI-GRID-BORDER-FIXED" }, RECT: { RIGHT_TOP: "CI-GRID-RECT-RIGHT-TOP" }, SCROLL_INDI: { VERTICAL: "CI-GRID-MOBILE-SCROLL-INDI-VERTICAL", HORIZONTAL: "CI-GRID-MOBILE-SCROLL-INDI-HORIZONTAL" } }, STYLE: { EVEN: "CI-GRID-EVEN", ODD: "CI-GRID-ODD", CELL_DISPLAY_NONE: "CI-GRID-CELL-NONE", CELL_HIDDEN: "CI-GRID-CELL-HIDDEN", ALIGN_LEFT: "CI-GRID-ALIGN-LEFT", ALIGN_CENTER: "CI-GRID-ALIGN-CENTER", ALIGN_RIGHT: "CI-GRID-ALIGN-RIGHT", CELL_LAST: "CI-GRID-CELL-LAST" }, FUNCTIONAL: { HEADER: { TITLE: "CI-GRID-HEADER-TITLE", MICELINOUS: "CI-GRID-HEADER-MICELINOUS" }, RESIZE: { WRAPPER: "CI-GRID-RESIZER", INNER: "CI-GRID-RESIZER-INNER", HELPER: "CI-GRID-RESIZER-HELPER" }, FREEZE: { SCROLLER: "CI-FREEZE-SCROLLER", INNER: "CI-FREEZE-SCROLLER-INNER", INDICATOR_LEFT: "CI-FREEZE-INDICATOR-LEFT", INDICATOR_RIGHT: "CI-FREEZE-INDICATOR-RIGHT" }, PAGING: { WRAPPER: "CI-GRID-PAGING", A: "CI-GRID-PAGING-A", SELECTED_A: "CI-GRID-PAGING-A-SELECTED", LEFT: "CI-GRID-PAGING-LEFT", RIGHT: "CI-GRID-PAGING-RIGHT", START: "CI-GRID-PAGING-START", END: "CI-GRID-PAGING-END", DISABLED_LEFT: "CI-GRID-PAGING-LEFT-DISABLED", DISABLED_RIGHT: "CI-GRID-PAGING-RIGHT-DISABLED", DISABLED_START: "CI-GRID-PAGING-START-DISABLED", DISABLED_END: "CI-GRID-PAGING-END-DISABLED", TOTAL_COUNT: "WEBPONENT-PAGING-TOTAL-COUNT", TOTAL_COUNT_TEXT: "WEBPONENT-PAGING-TOTAL-COUNT-TEXT" }, SORTING: { SORTER: "CI-GRID-SORTER", NONE: "CI-GRID-SORTER-NONE", DESC: "CI-GRID-SORTER-DESC", ASC: "CI-GRID-SORTER-ASC" }, GROUPING_INDI: "CI-GRID-GROUPING-INDI", ROW_SELECTED: "CI-GRID-ROW-SELECTED", FOCUS_ESCAPER: "CI-GRID-FOCUS-ESCAPER", FOCUS_ESCAPER_SHOWN: "CI-GRID-FOCUS-ESCAPER-SHOWN" } };
		function cloneMarkupModel() { var markupModel = { area: null, wrapper: null, main: { wrapper: null, header: { wrapper: null, scroller: null, inner: null, table: null, thead: null }, body: { wrapper: null, scroller: null, inner: null, table: null, thead: null, tbody: null, caption: null, nothing: null } }, design: { border: { bottom: null, right: null, fixed: null }, rect: { rightTop: null } }, functional: { resizers: [], mainBodyHeighter: null, freezeScroller: null, freezeScrollerInner: null, freezeIndicatorLeft: null, freezeIndicatorRight: null, paging: { wrapper: null, a: [], left: null, right: null, start: null, end: null, totalCountText: null }, checkBox: { cellType: null, cellWidth: "50px", align: "center" } } }; return markupModel; }
		function cloneSettingModel() { var settingModel = { nowRendering: [], filtering: { conditions: {} }, sorting: { conditions: [] }, table: { markup: null, thead: null, tbody: null }, template: { orginal: null, markup: null, thead: null, tbody: null, fixedThead: null, fixedTbody: null, mainRow: null, mainRowTemplate: null }, option: { width: null, height: null, id: null, classes: null, callbacks: { rowRendered: [] }, rowSelectable: false, checkBox: null, autoResizing: true, virtualScrollDefaultHeight: 400, resizable: true, sortable: true, sortingMessage: { none: "이 컬럼을 소트하려면 클릭해 주세요.\n(쉬프트키를 누르면서 클릭하면 멀티소팅이 됩니다.)" }, background: false, boostLoad: false, numberOfBoostLoadRow: 100, arrowSensibility: 50, fixedScrollAdjustment: 0, updateCallback: true, preventDefaultScroll: false, baseAlign: "left", niceScroll: false, niceScrollOption: {}, nothingTr: false, nothingTrText: "데이터가 없습니다.", virtualScrollUsable: true, mobileFixWidth: null }, scrollBarWidth: null, scrollerInnerWidth: null, freezeScrollerInnerWidth: null, headerRowCount: null, headerMaxLevel: null, bodyRowCount: null, columns: [], rows: [], defferedRendering: { limit: 200, alpha: 2, renderingCountPerView: null, viewHeight: null, currentViewIndex: null, renderingStartRowIndex: null, renderingEndRowIndex: null, currentTableTop: 0, scrollMaxSizeY: 0, scrollRelativeY: 0 }, freezeScroll: { currentViewIndex: null }, usePaging: false, paging: { countPerPage: null, totalPageCount: null, currentPageIndex: null, paginationCount: null, startPageListIndex: null, usingMarkUp: false, animate: null, fixedHeight: false }, grouping: { groups: [] }, trHeight: null, platform: null, mobile: false, ieVersion: null, rowKey: null, dataByKey: {}, rowByKey: {} }; return settingModel; }
		function cloneColumnModel() { var columnModel = { index: null, label: null, level: null, header: null, copiedHeader: null, name: null, bind: null, displayingWidth: null, width: null, minWidth: null, cells: null, parentColumn: null, childColumns: null, colspan: null, rowspan: null, visibility: "visible", align: "left", fixed: false, sorter: null, sortedType: "none", grouping: { groupNumber: null, indexInGroup: null, groupMemberCount: null, nextMemberColumn: null }, micelinous: null, sortable: true, sortType: null, originalOffsetLeft: null }; return columnModel; }
		function cloneRowModel() { var rowModel = { visibility: true, checked: false, selected: false }; return rowModel; }
		var EVENT = self.EVENT = { HEADER_RENDRED: "headerRendered", BEFORE_RENDER_DATA: "beforeRenderData", DATA_RENDERED: "dataRendered", COLUMN_RESIZED: "columnResized", ROW_RENDERED: "rowRendered", BEFORE_APPENDING_ROW: "beforeAppendingRow", ROW_APPENDED: "rowAppended", BEFORE_CACHING_ROW: "beforeCachingRow", ROW_CACHED: "rowCached", SCROLL: "scroll", RESIZED: "resized", UPDATED: "updated", WINDOW_RESIZED: "windowResized" };
		function getjQueryElementByName(context, name) {
			var element = $(); var elements = context.find("*"); for (var i = 0, elementLen = elements.length; i < elementLen; i++) {
				var localElement = elements.eq(i);
				if (localElement.attr("data-name") === name || localElement.attr("name") === name) {
					element = localElement;
					break;
				}
			} return element;
		}
		function getFixedColumnCount(grid) {
			var count = -1; var columns = _.filter(grid.settings.columns, function (column) { return column.level === 0; }); _.each(columns, function (column, index, list) {
				if (column.fixed === true) {
					count = index;
				}
			}); return count;
		}
		function checkFixedColumn(grid) {
			var fixed = _.find(grid.settings.columns, function (column) { return column.fixed; }); if (fixed) {
				return true;
			}
			else {
				return false;
			}
		}
		function setup(grid, table, template, option) {
		grid.settings = cloneSettingModel(); initialzeSettingModel(grid.settings); grid.markup = cloneMarkupModel(); grid.settings.option = _.extend(grid.settings.option, option); grid.settings.table.markup = table; if (!template.is(table)) {
			grid.settings.table.thead = table.find("thead");
			grid.settings.table.tbody = table.find("tbody");
		} template[0].innerHtml = $.trim(template.html()); var html = template.html(); var re = new RegExp("<img[^>]*src="); var matches = html.match(re); if (matches != null && matches.length) {
			var cloneMatches = matches.slice();
			for (var i = 0; i < matches.length; i++) {
				matches[i] = matches[i].replace("src", "data-webponent-src");
			}
			for (var i = 0; i < matches.length; i++) {
				html = html.replace(cloneMatches[i], matches[i]);
			}
		} grid.settings.template.original = template.clone(); var parsedTemplate = $(html); grid.settings.template.markup = parsedTemplate; var templateThead = parsedTemplate.find("thead"); templateThead.find("[parent]").each(function () { var element = $(this); var parent = element.attr("parent"); element.removeAttr("parent"); element.attr("data-parent", parent); }); grid.settings.template.thead = templateThead; var trCount = grid.settings.template.thead.find("tr").length; grid.settings.headerRowCount = trCount; grid.settings.headerMaxLevel = trCount - 1; grid.settings.template.tbody = parsedTemplate.find("tbody"); var rowKeyCell = grid.settings.template.tbody.find("[data-key]"); if (rowKeyCell.length > 0) {
			grid.settings.rowKey = grid.settings.template.tbody.find("[data-key]").attr("name");
		} grid.settings.bodyRowCount = grid.settings.template.tbody.find("tr").length; if (grid.settings.option.checkBox !== null) {
			var inputName = "CI_GRID_CHECKBOX", cellType = grid.settings.option.checkBox.cellType, cellWidth = grid.settings.option.checkBox.cellWidth, align = grid.settings.option.checkBox.align;
			var checkBox = $("<input>");
			checkBox.attr({ type: "checkbox", name: inputName });
			var headerCell = $("<th>");
			headerCell.attr({ name: inputName + "_CONTAINER", "data-name": inputName + "_CONTAINER", width: cellWidth, align: align }).html(checkBox.clone());
			headerCell.addClass(inputName + "_CONTAINER");
			grid.settings.template.thead.find("tr:first-child").prepend(headerCell);
			var bodyCell = $("<" + cellType + ">");
			bodyCell.attr({ name: inputName + "_CONTAINER", "data-name": inputName + "_CONTAINER", width: cellWidth, align: align }).html(checkBox.clone());
			grid.settings.template.tbody.find("tr").prepend(bodyCell);
		} var gridArea = $("<div>").addClass(GRID_CLASS.AREA); grid.markup.area = gridArea[0]; var platform = grid.settings.platform; if (platform === "windows") {
			gridArea.addClass(GRID_CLASS.PLATFORM.WINDOWS);
		}
			else {
				if (platform === "mac") {
					gridArea.addClass(GRID_CLASS.PLATFORM.MAC);
				}
				else {
					if (platform === "linux") {
						gridArea.addClass(GRID_CLASS.PLATFORM.LINUX);
					}
				}
			} if (grid.settings.mobile) {
				gridArea.addClass(GRID_CLASS.MOBILE);
			} grid.markup.area.grid = grid; grid.markup.area.instance = grid; var wrapper = $("<div>").addClass(GRID_CLASS.WRAPPER); grid.markup.wrapper = wrapper[0]; var mainWrapper = $("<div>").addClass(GRID_CLASS.MAIN.WRAPPER); grid.markup.main.wrapper = mainWrapper[0]; var headerWrapper = $("<div>").addClass(GRID_CLASS.MAIN.HEADER.WRAPPER); grid.markup.main.header.wrapper = headerWrapper[0]; var headerScroller = $("<div>").addClass(GRID_CLASS.MAIN.HEADER.SCROLLER); grid.markup.main.header.scroller = headerScroller[0]; var headerInner = $("<div>").addClass(GRID_CLASS.MAIN.HEADER.INNER); grid.markup.main.header.inner = headerInner[0]; var headerTable = $("<table>").addClass(GRID_CLASS.MAIN.HEADER.TABLE).attr("aria-hidden", "true"); grid.markup.main.header.table = headerTable[0]; var headerTableThead = $("<thead>").addClass(GRID_CLASS.MAIN.HEADER.TABLE_THEAD); grid.markup.main.header.thead = headerTableThead[0]; var bodyWrapper = $("<div>").addClass(GRID_CLASS.MAIN.BODY.WRAPPER); grid.markup.main.body.wrapper = bodyWrapper[0]; var bodyScroller = $("<div>").addClass(GRID_CLASS.MAIN.BODY.SCROLLER); grid.markup.main.body.scroller = bodyScroller[0]; var bodyInner = $("<div>").addClass(GRID_CLASS.MAIN.BODY.INNER); grid.markup.main.body.inner = bodyInner[0]; var bodyTable = $("<table>").addClass(GRID_CLASS.MAIN.BODY.TABLE); grid.markup.main.body.table = bodyTable[0]; var bodyTableThead = $("<thead>").addClass(GRID_CLASS.MAIN.BODY.TABLE_THEAD); grid.markup.main.body.thead = bodyTableThead[0]; var bodyTableBody = $("<tbody>").addClass(GRID_CLASS.MAIN.BODY.TABLE_TBODY); grid.markup.main.body.tbody = bodyTableBody[0]; var caption = parsedTemplate.find("caption"); caption.addClass(GRID_CLASS.MAIN.BODY.CAPTION); grid.markup.main.body.caption = caption[0]; var freezeScroller = $("<div>").addClass(GRID_CLASS.FUNCTIONAL.FREEZE.SCROLLER); grid.markup.functional.freezeScroller = freezeScroller[0]; var freezeIndicatorLeft = $("<div>").addClass(GRID_CLASS.FUNCTIONAL.FREEZE.INDICATOR_LEFT); grid.markup.functional.freezeIndicatorLeft = freezeIndicatorLeft[0]; var freezeIndicatorRight = $("<div>").addClass(GRID_CLASS.FUNCTIONAL.FREEZE.INDICATOR_RIGHT); grid.markup.functional.freezeIndicatorRight = freezeIndicatorRight[0]; var freezeScrollerInner = $("<div>").addClass(GRID_CLASS.FUNCTIONAL.FREEZE.INNER); grid.markup.functional.freezeScrollerInner = freezeScrollerInner[0]; var pageWrapper = $("<div>").addClass(GRID_CLASS.FUNCTIONAL.PAGING.WRAPPER); grid.markup.functional.pageWrapper = pageWrapper[0]; var rightBorder = $("<div>").addClass(GRID_CLASS.DESIGN.BORDER.RIGHT); grid.markup.design.border.right = rightBorder[0]; var rightTopRect = $("<div>").addClass(GRID_CLASS.DESIGN.RECT.RIGHT_TOP); grid.markup.design.rect.rightTop = rightTopRect[0]; var trs = grid.settings.template.thead.find("tr"); grid.settings.template.thead.find("th, td").each(function (idx) { var column = cloneColumnModel(); var headCell = $(this); var trIndex = trs.index(headCell.closest("tr")); column = setColumnInfo(grid, column, headCell, option, idx, trIndex); grid.settings.columns.push(column); }); if (checkFixedColumn(grid)) {
				var checkBoxColumn = getColumn(grid, "CI_GRID_CHECKBOX_CONTAINER");
				if (checkBoxColumn) {
					checkBoxColumn.fixed = true;
				}
			} var mkup = grid.settings.template.markup; mkup = $(mkup[mkup.length - 1]); var settingHeight = parseInt(mkup.attr("height"), 10); if (_.isNaN(settingHeight)) {
				settingHeight = "auto";
			} grid.settings.option.height = settingHeight; grid.settings.option.width = grid.settings.template.markup.attr("width"); parseCallBacksFromOption(grid);
		}
		function parseCallBacksFromOption(grid) {
			var option = grid.settings.option; var rowRenderedCallback = option.rowRendered; if (_.isFunction(rowRenderedCallback)) {
				grid.settings.option.callbacks.rowRendered.push(rowRenderedCallback);
			}
		}
		function getDataModelFromDom(grid, dom) {
			var dataModel = []; var templateBody = grid.settings.template.tbody; var cells = templateBody.find("th, td"); var bindInfo = []; cells.each(function () { var cell = $(this); bindInfo.push(cell.attr("bind")); }); var bindInfoSize = bindInfo.length; var domCells = $(dom).find("th, td"); var domCellsSize = domCells.length; var dataModelIdx = -1; for (var i = 0; i < domCellsSize; i++) {
				var bindInfoIdx = i % bindInfoSize;
				if (bindInfoIdx === 0) {
					dataModelIdx++;
					dataModel[dataModelIdx] = {};
				}
				var data = $.trim(domCells.eq(i).text());
				dataModel[dataModelIdx][bindInfo[bindInfoIdx]] = data;
			} dom = null; return dataModel;
		}
		function getDataModelFromArray(grid, array) {
			var dataModel = []; var templateBody = grid.settings.template.tbody; var cells = templateBody.find("th, td"); var bindInfo = []; cells.each(function () { var cell = $(this); bindInfo.push(cell.attr("bind")); }); for (var i = 0, end = array.length; i < end; i++) {
				var o = {};
				for (var j = 0, jEnd = bindInfo.length; j < jEnd; j++) {
					o[bindInfo[j]] = array[i][j];
				}
				dataModel.push(o);
			} array = null; return dataModel;
		}
		function renderHeader(grid) {
			var headerThead = grid.settings.template.thead.clone(); var bodyThead = headerThead.clone(); var ht = headerThead.html().replace(/\<th/g, "<td").replace(/\<\/th/g, "</td"); headerThead = headerThead.html(ht); bodyThead.find("th, td").addClass(GRID_CLASS.MAIN.BODY.TABLE_THEAD_CELL); var columns = grid.settings.columns; registDomToColumnModel(grid, columns, headerThead, bodyThead); _.each(columns, function (column, index, list) { var header = $(column.header); header.wrapInner('<span class="' + GRID_CLASS.FUNCTIONAL.HEADER.TITLE + '"/>'); var micelinous = $('<div class="' + GRID_CLASS.FUNCTIONAL.HEADER.MICELINOUS + '">'); header.append(micelinous); column.micelinous = micelinous[0]; header.wrapInner('<div style="position:relative; display: table; width: 100%;">'); }); var headerRowCount = grid.settings.headerRowCount; var bodyRowCount = grid.settings.bodyRowCount; var removeStop = headerRowCount - bodyRowCount; for (var trIndex = 0; trIndex < headerRowCount - removeStop; trIndex++) {
				var row = bodyThead.find("tr").eq(trIndex);
				row.find("[data-origin]").remove();
			} for (var trIndex = 0; trIndex < removeStop; trIndex++) {
				bodyThead.find("tr").eq(0).remove();
			} renderColumnWidth(grid); renderScrollInnerWidth(grid); renderHeaderScrollerWidth(grid); $(grid.markup.main.header.thead).remove(); $(grid.markup.main.body.thead).remove(); headerThead.addClass(GRID_CLASS.MAIN.HEADER.TABLE_THEAD); bodyThead.addClass(GRID_CLASS.MAIN.BODY.TABLE_THEAD); $(grid.markup.main.header.table).append(headerThead); $(grid.markup.main.body.table).prepend(bodyThead); grid.markup.main.header.thead = headerThead[0]; grid.markup.main.body.thead = bodyThead[0]; var headerTheadTr = headerThead.find("tr"); headerTheadTr.each(function () {
				var tr = $(this); if (tr.find("th, td").length === 0) {
					headerTheadTr.css("display", "block");
				}
			}); grid.event.trigger(EVENT.HEADER_RENDRED, [grid]);
		}
		function reLayoutHeader(grid) { renderColumnWidth(grid, true); renderScrollInnerWidth(grid); renderHeaderScrollerWidth(grid); renderColumnResizer(grid); renderGridHeightAndWidth(grid); }
		function setHeaderHeight(grid) { var columns = grid.settings.columns; var baseColumn = _.find(columns, function (column) { return column.rowspan === 1 && column.visibility === "visible"; }); var baseHeight = $(baseColumn.header).outerHeight(true); var thead = $(grid.markup.main.header.thead); var trs = thead.find("tr"); trs.each(function () { var tr = $(this); tr.css({ height: baseHeight, "max-height": baseHeight }); }); }
		function getColspanCountInSameLevel(sameLevelColumns, targetColumn) {
			var colspanCount = 0; var checked = false; _.each(sameLevelColumns, function (column, index, list) {
				if (column.name === targetColumn.name) {
					checked = true;
				} if (!checked) {
					colspanCount += column.colspan;
				}
			}); return colspanCount;
		}
		function getPreviousColspanCount(columns, targetColumn) {
			var targetColumnLevel = targetColumn.level; var sameLevelColumns = _.filter(columns, function (column) { return column.level === targetColumnLevel; }); var colspanCount = getColspanCountInSameLevel(sameLevelColumns, targetColumn); var upLevelColspanCount = 0; for (var currentLevel = 0; currentLevel < targetColumnLevel; currentLevel++) {
				var upLevelColumns = _.filter(columns, function (column) { return column.level === currentLevel; });
				_.each(upLevelColumns, function (column, index, list) {
					if (column.rowspan > 1) {
						var count = getColspanCountInSameLevel(upLevelColumns, column);
						if (count <= colspanCount) {
							upLevelColspanCount += (count + column.colspan);
						}
					}
				});
			} return colspanCount + upLevelColspanCount;
		}
		function registDomToColumnModel(grid, columns, headerThead, bodyThead) {
			_.each(columns, function (column, index, list) {
				var columnName = column.name; var header = getjQueryElementByName(headerThead, columnName); column.header = header[0]; var copiedHeader = getjQueryElementByName(bodyThead, columnName); column.copiedHeader = copiedHeader[0]; column.childColumns = []; var parent = header.attr("data-parent"); if (parent) {
					var parentColumn = _.find(columns, function (column) { return column.name === parent; });
					column.parentColumn = parentColumn;
					parentColumn.childColumns.push(column);
					if (parentColumn.fixed) {
						column.fixed = true;
					}
				}
			}); _.each(columns, function (column, index, list) {
				if (grid.settings.bodyRowCount === 1) {
					if (column.rowspan > 1) {
						for (var rowspanCount = 1; rowspanCount < column.rowspan; rowspanCount++) {
							var wantedTr = bodyThead.find("tr").eq(column.level + rowspanCount);
							var shadowTh = $("<th>");
							var scopeAttr = $(column.header).attr("scope");
							if (scopeAttr) {
								shadowTh.attr("scope", scopeAttr);
							}
							shadowTh.attr("data-origin", column.name);
							shadowTh.attr("data-name", column.name);
							shadowTh.addClass(GRID_CLASS.MAIN.BODY.TABLE_THEAD_CELL);
							shadowTh.text(column.label);
							wantedTr.append(shadowTh);
							column.copiedHeader = shadowTh[0];
						}
					}
				}
			});
		}
		function renderFixedLayout(grid) { var freezeScroller = $(grid.markup.functional.freezeScroller); var bodyScrollerInner = $(grid.markup.main.body.inner); bodyScrollerInner.addClass(GRID_CLASS.DESIGN.FIXED.INNER_BORDER); grid.settings.freezeScroll.currentViewIndex = 0; freezeScroller.scrollLeft(0); unBindFixedFreezeScrollerEvent(grid); renderFreezeScroller(grid); setTimeout(function () { freezeScroller.off("scroll.fx"); bindFixedFreezeScrollerEvent(grid); }, 0); }
		function renderFreezeScroller(grid) {
			var scrollBarWidth = getScrollBarWidth(grid); var bodyScroller = $(grid.markup.main.body.scroller); var fixedWidth = getFixedWidth(grid); var freezeScroller = $(grid.markup.functional.freezeScroller); var overflowY = freezeScroller.css("overflow-y"); var freezeScrollerWidth = bodyScroller.outerWidth() + scrollBarWidth - fixedWidth; if (overflowY === "hidden") {
				freezeScrollerWidth -= scrollBarWidth;
			} freezeScroller.width(freezeScrollerWidth).height(bodyScroller.outerHeight() + scrollBarWidth).css({ top: getHeaderHeight(grid), left: fixedWidth + "px", "overflow-x": (grid.settings.option.niceScroll) ? "hidden" : "scroll" });
		}
		function renderFreezeScrollerInnerWidth(grid) {
			var freezeScrollerInner = $(grid.markup.functional.freezeScrollerInner); if (checkFixedColumn(grid)) {
				var fixedFreezeScrollerWidth = calculateFixedFreezeScrollerInnerWidth(grid);
				grid.settings.freezeScrollerInnerWidth = fixedFreezeScrollerWidth;
				freezeScrollerInner.width(grid.settings.freezeScrollerInnerWidth);
			}
			else {
				grid.settings.freezeScrollerInnerWidth = grid.settings.scrollerInnerWidth;
				freezeScrollerInner.width(grid.settings.freezeScrollerInnerWidth);
			}
		}
		function getChildColumnWidthSum(column) {
			var width = 0; var childColumns = column.childColumns; if (childColumns.length > 0) {
				_.each(childColumns, function (childColumn) { width += getChildColumnWidthSum(childColumn); });
			}
			else {
				width += column.width;
			} return width;
		}
		function calculateFixedFreezeScrollerInnerWidth(grid) {
			var width = 0; var columns = grid.settings.columns; _.each(grid.settings.columns, function (column, index, list) {
				if (column.visibility !== "hidden" && !column.fixed && column.level === 0) {
					var widthSum = getChildColumnWidthSum(column);
					width += widthSum;
				}
			}); var columnCount = 0; for (var i = columns.length - 1; i >= 0; i--) {
				if (columns[i].visibility !== "hidden") {
					width += columns[i].width;
					columnCount++;
				}
				if (columnCount === 1) {
					break;
				}
			} return width;
		}
		function bindFixedFreezeScrollerEvent(grid) { var freezeScroller = $(grid.markup.functional.freezeScroller); freezeScroller.on("scroll.ffx", function () { setColumnVisibilityWhenFixedLayoutScrolling(grid); }); }
		function setColumnVisibilityWhenFixedLayoutScrolling(grid) {
			var scrollLeft = grid.markup.functional.freezeScroller.scrollLeft; if (scrollLeft == grid.preScrollLeft) {
				return;
			} var abs = Math.abs(scrollLeft - grid.preScrollLeft); if (abs < 2) {
				return;
			} grid.preScrollLeft = scrollLeft; var columns = grid.columns4FixedScroll; if (columns == null) {
				columns = [];
				var maxLevel = grid.settings.headerMaxLevel;
				if (grid.settings.bodyRowCount > 1) {
					maxLevel = 0;
				}
				var filteredColumns = _.filter(grid.settings.columns, function (column) {
					var f = false; if (column.fixed === false && column.level === maxLevel) {
						f = true;
					} if (column.fixed === false && (column.level + column.rowspan - 1) === maxLevel) {
						f = true;
					} return f;
				});
				var bodyHeaderCells = $(grid.markup.main.body.thead).find("th, td");
				var fixedColumnCount = getFixedColumnCount(grid);
				bodyHeaderCells.each(function (i) {
					if (i > fixedColumnCount) {
						var copiedHeader = $(this);
						var wantedColumn = null;
						var wantedColumnIndex = null;
						for (var j = 0, jLen = filteredColumns.length; j < jLen; j++) {
							if (copiedHeader.is($(filteredColumns[j].copiedHeader))) {
								wantedColumn = filteredColumns.splice(j, 1)[0];
								columns.push(wantedColumn);
								break;
							}
						}
					}
				});
				grid.columns4FixedScroll = columns;
			} var widthSum = 0; var newViewIndex = null; var ignoreCount = grid.settings.option.fixedScrollAdjustment; for (var i = 0, end = columns.length - ignoreCount; i < end; i++) {
				if (columns[i].visibility !== "hidden") {
					widthSum += parseInt(columns[i].displayingWidth);
				}
				if (widthSum > scrollLeft) {
					newViewIndex = i;
					if (scrollLeft < 15) {
						newViewIndex = -1;
					}
					break;
				}
			} if (_.isUndefined(grid.lastViewIndex) || grid.lastViewIndex < 0) {
				var leftWidthSum = 0;
				var scrollBodyWidth = parseInt(grid.markup.functional.freezeScroller.style.width) - getScrollBarWidth(grid);
				for (var i = columns.length - 1; i >= 0; i--) {
					var w;
					if (columns[i].visibility !== "hidden") {
						if (!_.isUndefined(columns[i].displayingWidthTmp)) {
							w = parseInt(columns[i].displayingWidthTmp);
						}
						else {
							w = columns[i].width;
							if (w == null) {
								w = parseInt(columns[i].displayingWidth);
							}
						}
						leftWidthSum += w;
					}
					if (leftWidthSum > scrollBodyWidth) {
						grid.scrollBodyWidth = scrollBodyWidth;
						grid.lastViewIndex = i;
						grid.firstViewColumnWidth = w - (leftWidthSum - scrollBodyWidth);
						if (grid.firstViewColumnWidth < 20) {
							grid.lastViewIndex = i + 1;
							grid.firstViewColumnWidth = columns[grid.lastViewIndex].width + grid.firstViewColumnWidth;
						}
						break;
					}
				}
			} if (newViewIndex > grid.lastViewIndex) {
				newViewIndex = grid.lastViewIndex;
			} var currentViewIndex = grid.settings.freezeScroll.currentViewIndex; if (newViewIndex == grid.preNewViewIndex) {
				return;
			}
			else {
				grid.preNewViewIndex = newViewIndex;
			} if (newViewIndex !== null) {
				var hideStart = 0;
				var hideEnd = hideStart + newViewIndex;
				var targetColumn = null;
				var parentColumn = null;
				for (var j = hideStart, jEnd = columns.length; j < jEnd; j++) {
					targetColumn = columns[j];
					parentColumn = targetColumn.parentColumn;
					if (j == grid.lastViewIndex) {
						if (j == hideEnd) {
							if (!targetColumn.adjustedWidth) {
								targetColumn.displayingWidthTmp = targetColumn.displayingWidth;
								targetColumn.displayingWidth = grid.firstViewColumnWidth + "px";
								targetColumn.width = grid.firstViewColumnWidth;
								targetColumn.adjustedWidth = true;
							}
						}
						else {
							if (targetColumn.adjustedWidth) {
								targetColumn.width = targetColumn.displayingWidthTmp;
								targetColumn.displayingWidth = targetColumn.displayingWidthTmp;
								targetColumn.adjustedWidth = false;
							}
						}
					}
					if (targetColumn.visibility !== "hidden") {
						var parentHide = false;
						if (j < hideEnd) {
							targetColumn.visibility = "temporarilyHidden";
							parentHide = true;
						}
						else {
							targetColumn.visibility = "visible";
						}
						if (parentColumn !== null) {
							setParentColumnWidthAndColspan(parentColumn, parentHide);
						}
					}
				}
				grid.settings.freezeScroll.currentViewIndex = newViewIndex;
				renderColumnWidth(grid, true);
				renderScrollInnerWidth(grid);
				renderHeaderScrollerWidth(grid);
				renderColumnResizer(grid);
				if (grid.settings.ieVersion != null && grid.settings.ieVersion <= 8) {
					var tbody = $(grid.markup.main.body.tbody);
					var focusedRow = tbody.children().filter(":focus");
					if (focusedRow.length > 0) {
						var detachedRows = tbody.children().detach();
						tbody.append(detachedRows);
						focusedRow.focus();
					}
					else {
						grid.renderRows();
					}
					deBugColumnResizingBug(grid.settings.columns[0]);
				}
			}
		}
		function getParentColunmWidth(childColumns) {
			var width = 0; _.each(childColumns, function (childColumn, index, list) {
				if (childColumn.visibility === "visible") {
					width += parseInt(childColumn.width);
				}
			}); return width;
		}
		function getParentColumnColspanCount(childColumns) {
			var count = 0; _.each(childColumns, function (childColumn) {
				if (childColumn.visibility === "visible") {
					count += childColumn.colspan;
				}
			}); return count;
		}
		function setParentColumnWidthAndColspan(parentColumn, hide) {
			var childColumns = parentColumn.childColumns; var parentColumnWidth = getParentColunmWidth(childColumns); parentColumn.displayingWidth = parentColumnWidth; parentColumn.width = parentColumnWidth; var parentColspanCount = getParentColumnColspanCount(childColumns); parentColumn.colspan = parentColspanCount; parentColumn.header.setAttribute("colspan", parentColspanCount); if (hide) {
				if (parentColspanCount === 0) {
					parentColumn.visibility = "temporarilyHidden";
				}
			}
			else {
				if (parentColspanCount > 0) {
					parentColumn.visibility = "visible";
				}
			} if (parentColumn.parentColumn !== null) {
				setParentColumnWidthAndColspan(parentColumn.parentColumn, hide);
			}
		}
		function deBugColumnResizingBug(column) {
			var columnWidth = column.width; var copiedHeader = column.copiedHeader; if (copiedHeader) {
				copiedHeader.style.width = columnWidth + 1 + "px";
				copiedHeader.style.width = columnWidth + "px";
			}
		}
		function unBindFixedFreezeScrollerEvent(grid) { var freezeScroller = $(grid.markup.functional.freezeScroller); freezeScroller.off("scroll.ffx"); }
		function destroyFixedLayout(grid) { var freezeScroller = $(grid.markup.functional.freezeScroller); var bodyScrollerInner = $(grid.markup.main.body.inner); bodyScrollerInner.removeClass(GRID_CLASS.DESIGN.FIXED.INNER_BORDER); grid.settings.freezeScroll.currentViewIndex = 0; freezeScroller.scrollLeft(0); unBindFixedFreezeScrollerEvent(grid); bindFreezeScrollXEvent(grid); var columns = grid.settings.columns; _.each(columns, function (column, index, list) { column.fixed = false; }); reLayoutHeader(grid); }
		function unbindYscrollEvents(grid) { $(grid.markup.main.body.scroller).off("scroll.y"); $(grid.markup.fixed.body.scroller).off("mousewheel.y"); }
		function getFixedWidth(grid) {
			var width = 0; var columns = _.filter(grid.settings.columns, function (column) { return column.level === 0; }); _.each(columns, function (column, index, list) {
				if (column.fixed) {
					width += column.width;
				}
			}); return width;
		}
		function setRowTemplates(grid) { var mainRow = getRowTemplate(grid, grid.settings.template.tbody, grid.settings.columns); grid.settings.template.mainRow = mainRow; grid.settings.template.mainRowTemplate = getRowHtmlTemplate(grid, mainRow); }
		function clearRows(grid, arg1, arg2, arg3) {
			var mainBody = grid.markup.main.body.tbody; var notMultiRow = true; if (grid.settings.bodyRowCount > 1) {
				notMultiRow = false;
			} if (!_.isNumber(arg1)) {
				var i = mainBody.childNodes.length;
				while (i--) {
					mainBody.removeChild(mainBody.lastChild);
				}
				if (arg1 === true) {
					grid.data = [];
					grid.rows = [];
					grid.rowIndex = [];
					grid.settings.rows = [];
					grid.settings.nowRendering = [];
					calculateShowingRowIndex(grid);
					renderRowsByCachedRows(grid);
					grid.settings.defferedRendering.currentViewIndex = 0;
					grid.settings.defferedRendering.renderingStartRowIndex = null;
					grid.settings.defferedRendering.renderingEndRowIndex = null;
					grid.settings.dataByKey = {};
					grid.settings.rowByKey = {};
				}
			}
			else {
				if (_.isNumber(arg1) && _.isUndefined(arg2)) {
					grid.data.splice(arg1, 1);
					grid.rows.splice(arg1, 1);
					grid.rowIndex.splice(arg1, 1);
					grid.settings.rows.splice(arg1, 1);
					if (notMultiRow) {
						for (var i = arg1; i < grid.rows.length; i++) {
							grid.rowIndex[i] = i;
							grid.rows[i].index = i;
						}
					}
					else {
						for (var i = arg1; i < grid.rows.length; i++) {
							grid.rowIndex[i] = i;
							grid.rows[i].each(function () { this.index = i; });
						}
					}
					if (!grid.settings.usePaging) {
						calculateShowingRowIndex(grid);
					}
					renderRowsByCachedRows(grid);
					if (checkNeedsForVirtualScroll(grid)) {
						makeVirtualScroll(grid);
					}
					if (grid.data.length === 0) {
						grid.settings.defferedRendering.renderingStartRowIndex = null;
						grid.settings.defferedRendering.renderingEndRowIndex = null;
						clearRows(grid);
					}
					else {
						calculateShowingRowIndex(grid);
						var countPerPage = grid.settings.paging.countPerPage;
						var startIndex = 0 * countPerPage;
						var endIndex = startIndex + (countPerPage - 1);
						if (endIndex > grid.rowIndex.length) {
							grid.settings.defferedRendering.renderingStartRowIndex = startIndex;
							grid.settings.defferedRendering.renderingEndRowIndex = endIndex;
						}
						else {
							grid.settings.defferedRendering.renderingStartRowIndex = null;
							grid.settings.defferedRendering.renderingEndRowIndex = null;
						}
					}
				}
				else {
					if (_.isNumber(arg1) && _.isNumber(arg2)) {
						grid.data.splice(arg1, arg2 - arg1);
						grid.rows.splice(arg1, arg2 - arg1);
						grid.rowIndex.splice(arg1, arg2 - arg1);
						grid.settings.rows.splice(arg1, arg2 - arg1);
						if (notMultiRow) {
							for (var j = arg1; j < grid.rows.length; j++) {
								grid.rowIndex[j] = j;
								grid.rows[j].index = j;
							}
						}
						else {
							for (var j = arg1; j < grid.rows.length; j++) {
								grid.rowIndex[j] = j;
								grid.rows[j].each(function () { this.index = j; });
							}
						}
						if (checkNeedsForVirtualScroll(grid)) {
							calculateShowingRowIndex(grid);
						}
						while (mainBody.firstChild) {
							mainBody.removeChild(mainBody.firstChild);
						}
						renderRowsByCachedRows(grid);
						if (checkNeedsForVirtualScroll(grid)) {
							makeVirtualScroll(grid);
						}
						if (grid.data.length === 0) {
							grid.settings.defferedRendering.renderingStartRowIndex = null;
							grid.settings.defferedRendering.renderingEndRowIndex = null;
							clearRows(grid);
						}
					}
				}
			}
		}
		function checkNeedsForVirtualScroll(grid) { return !grid.settings.usePaging && grid.data.length > grid.settings.defferedRendering.limit && grid.settings.option.virtualScrollUsable; }
		function cachingRows(grid, data, appendOrPrepend, appendOrPrependIndex) {
			grid.event.trigger(EVENT.BEFORE_CACHING_ROW, [grid]); var mainRow = grid.settings.template.mainRow; var mainRowTemplate = grid.settings.template.mainRowTemplate; var rows = []; var rowModels = []; var rowIndex = []; var baseDataLength = grid.data.length; var dataLength = data.length; var notMultiRow = true; if (grid.settings.bodyRowCount > 1) {
				notMultiRow = false;
			} var rowString = null; var row = null; var currentData = null; var rowKey = grid.settings.rowKey; var dataByKey = grid.settings.dataByKey; var rowByKey = grid.settings.rowByKey; if (notMultiRow) {
				var wrapper = document.createElement("div");
				var rowHTML = "";
				for (var i = 0; i < dataLength; i++) {
					rowString = mainRowTemplate(data[i]);
					rowHTML += rowString;
				}
				if (grid.settings.ieVersion != null && grid.settings.ieVersion <= 8) {
					rowHTML = rowHTML.replace(eval("/value= /gi"), 'value="" ');
				}
				rowHTML = rowHTML.replace(/data-webponent-src/gi, "src");
				wrapper.innerHTML = "<table><tbody>" + rowHTML + "</tbody></table>";
				var trs = wrapper.getElementsByTagName("tr");
				for (var i = 0; i < dataLength; i++) {
					row = trs[i];
					rows.push(row);
					currentData = data[i];
					var rowModel = cloneRowModel();
					row.rowModel = rowModel;
					row.data = currentData;
					var rowKeyValue = currentData[rowKey];
					row.rowKey = rowKeyValue;
					dataByKey[rowKeyValue] = currentData;
					rowByKey[rowKeyValue] = row;
					rowModels.push(rowModel);
					var index = baseDataLength + i;
					row.index = index;
					rowIndex.push(index);
					grid.event.trigger(EVENT.ROW_RENDERED, [row, currentData, index]);
				}
				wrapper = null;
			}
			else {
				for (var i = 0; i < dataLength; i++) {
					var html = mainRowTemplate(data[i]);
					html = html.replace(/data-webponent-src/gi, "src");
					row = $($.trim(html));
					rows.push(row);
					currentData = data[i];
					var rowModel = cloneRowModel();
					rowModels.push(rowModel);
					var index = baseDataLength + i;
					rowIndex.push(index);
					var rowKeyValue = currentData[rowKey];
					row.each(function () { var tr = this; tr.data = data[i]; tr.index = index; tr.rowModel = rowModel; row.rowKey = rowKeyValue; });
					dataByKey[rowKeyValue] = currentData;
					rowByKey[rowKeyValue] = row;
					grid.event.trigger(EVENT.ROW_RENDERED, [row, data[i], index]);
				}
			} if (_.isUndefined(appendOrPrependIndex)) {
				if (appendOrPrepend !== "prepend") {
					grid.data.push.apply(grid.data, data);
					grid.rows.push.apply(grid.rows, rows);
					grid.settings.rows.push.apply(grid.settings.rows, rowModels);
					grid.rowIndex.push.apply(grid.rowIndex, rowIndex);
				}
				else {
					data.push.apply(data, grid.data);
					grid.data = data;
					rows.push.apply(rows, grid.rows);
					grid.rows = rows;
					rowModels.push.apply(rowModels, grid.settings.rows);
					grid.settings.rows = rowModels;
					rowIndex.push.apply(rowIndex, grid.rowIndex);
					grid.rowIndex = rowIndex;
				}
			}
			else {
				var factor = appendOrPrependIndex;
				if (appendOrPrepend !== "prepend") {
					factor++;
				}
				grid.data.splice.apply(grid.data, [factor, 0].concat(data));
				grid.rows.splice.apply(grid.rows, [factor, 0].concat(rows));
				grid.settings.rows.splice.apply(grid.settings.rows, [factor, 0].concat(rowModels));
				grid.rowIndex.splice.apply(grid.rowIndex, [factor, 0].concat(rowIndex));
			} grid.settings.nowRendering = grid.rows; if (notMultiRow) {
				for (var i = 0; i < grid.rows.length; i++) {
					grid.rowIndex[i] = i;
					grid.rows[i].index = i;
				}
			}
			else {
				for (var i = 0; i < grid.rows.length; i++) {
					grid.rowIndex[i] = i;
					grid.rows[i].each(function () { this.index = i; });
				}
			} grid.event.trigger(EVENT.ROW_CACHED, [grid]);
		}
		function renderRowsByCachedRows(grid, pass, arg) {
			if (pass !== true) {
				grid.event.trigger(EVENT.BEFORE_RENDER_DATA, [grid]);
			} var renderingRows = grid.settings.nowRendering; var renderingStartIndex = 0; var renderingEndIndex = renderingRows.length; var defferedRendering = false; if (renderingRows.length > 0 && grid.settings.defferedRendering.renderingStartRowIndex !== null && grid.settings.defferedRendering.renderingEndRowIndex !== null) {
				defferedRendering = true;
				renderingStartIndex = grid.settings.defferedRendering.renderingStartRowIndex;
				renderingEndIndex = grid.settings.defferedRendering.renderingEndRowIndex + 1;
			} if (defferedRendering) {
				clearRows(grid);
			} var mainBodyTableBody = grid.markup.main.body.tbody; var notMultiRow = true; if (grid.settings.bodyRowCount > 1) {
				notMultiRow = false;
			} if (renderingEndIndex > grid.data.length) {
				renderingEndIndex = grid.data.length;
			} if (notMultiRow) {
				for (var i = renderingStartIndex; i < renderingEndIndex; i++) {
					var row = renderingRows[i];
					if (!row) {
						break;
					}
					var jRow = $(row);
					jRow.removeClass(GRID_CLASS.STYLE.EVEN + " " + GRID_CLASS.STYLE.ODD);
					if (i % 2 === 0) {
						jRow.addClass(GRID_CLASS.STYLE.EVEN);
					}
					else {
						jRow.addClass(GRID_CLASS.STYLE.ODD);
					}
					mainBodyTableBody.appendChild(row);
				}
			}
			else {
				var $mainBodyTableBody = $(mainBodyTableBody);
				for (var i = renderingStartIndex; i < renderingEndIndex; i++) {
					var jRow = renderingRows[i];
					if (!jRow) {
						break;
					}
					jRow.removeClass(GRID_CLASS.STYLE.EVEN + " " + GRID_CLASS.STYLE.ODD);
					if (i % 2 === 0) {
						jRow.addClass(GRID_CLASS.STYLE.EVEN);
					}
					else {
						jRow.addClass(GRID_CLASS.STYLE.ODD);
					}
					$mainBodyTableBody.append(jRow);
				}
			} afterDataRendered(grid); grid.event.trigger(EVENT.DATA_RENDERED);
		}
		function getRowTemplate(grid, template, columns) {
			var templateRows = template.find("tr"); var row = templateRows.clone(); _.each(columns, function (column, index, list) {
				var cell = getjQueryElementByName(row, column.name); if (!(cell.is("td") || cell.is("th"))) {
					cell = cell.closest("td");
				} if (column.align === "center") {
					cell.addClass(GRID_CLASS.STYLE.ALIGN_CENTER);
				}
				else {
					if (column.align === "right") {
						cell.addClass(GRID_CLASS.STYLE.ALIGN_RIGHT);
					}
					else {
						if (column.align === "left") {
							cell.addClass(GRID_CLASS.STYLE.ALIGN_LEFT);
						}
					}
				}
			}); return row;
		}
		function getRowHtmlTemplate(grid, row) {
			var clone = row.clone(); clone.find("[bind]").each(function () {
				var elem = $(this); var bind = elem.attr("bind"); if (elem.children().is('[name="CI_GRID_CHECKBOX"]')) { }
				else {
					if (elem.is("input")) {
						elem.attr("value", "{{" + bind + "}}");
					}
					else {
						elem.text("{{" + bind + "}}");
					}
				} elem.removeAttr("bind"); var name = elem.attr("name"); elem.removeAttr("name"); elem.attr("data-name", name);
			}); var templateSettings = { interpolate: /\{\{(.+?)\}\}/g }; var htmlString = ""; for (var i = 0; i < grid.settings.bodyRowCount; i++) {
				clone.eq(i).find("th, td").filter(":last").addClass(GRID_CLASS.STYLE.CELL_LAST);
				var string = clone.eq(i).get(0).outerHTML;
				htmlString = htmlString + string;
			} return _.template(_.unescape(htmlString), null, templateSettings);
		}
		function setColumnInfo(grid, column, headCell, option, idx, trIndex) {
		column.index = idx; var headCellName = headCell.attr("name"); headCell.attr("data-name", headCellName); headCell.removeAttr("name"); var cell = getjQueryElementByName(grid.settings.template.tbody, headCellName); var bind = cell.attr("bind"); if (bind) {
			column.bind = bind;
		}
		else {
			column.bind = headCellName;
		} column.level = trIndex; column.name = headCellName; column.label = $.trim(headCell.text()); var displayingWidth = headCell.attr("width"); if (displayingWidth) {
			column.displayingWidth = displayingWidth;
		}
			else {
				column.displayingWidth = "*";
			} headCell.removeAttr("width"); var minWidth = headCell.attr("min-width"); if (minWidth) {
				column.minWidth = parseInt(minWidth);
				headCell.removeAttr("min-width");
			} var colspan = headCell.attr("colspan"); if (colspan) {
				column.colspan = parseInt(headCell.attr("colspan"), 10);
			}
			else {
				column.colspan = 1;
			} var rowspan = headCell.attr("rowspan"); if (rowspan) {
				column.rowspan = parseInt(headCell.attr("rowspan"), 10);
			}
			else {
				column.rowspan = 1;
			} var visibility = headCell.attr("visibility"); if (visibility === "hidden") {
				column.visibility = "hidden";
			} if (option) {
				var baseAlign = _.has(option, "baseAlign") ? option.baseAlign : false;
				if (baseAlign) {
					column.align = baseAlign;
				}
			} var align = headCell.attr("align"); if (align) {
				column.align = align;
				headCell.removeAttr("align");
			} var fixed = headCell.attr("fixed"); if (fixed === "fixed") {
				column.fixed = true;
				headCell.removeAttr("fixed");
			} var sortable = headCell.attr("sortable"); if (sortable) {
				if (sortable === "true") {
					column.sortable = true;
				}
				else {
					if (sortable === "false") {
						column.sortable = false;
					}
				}
				headCell.removeAttr("sortable");
			} var sortType = headCell.attr("sort-type"); if (sortType) {
				column.sortType = sortType;
				headCell.removeAttr("sort-type");
			} var def = headCell.attr("default"); if (def) {
				if (def === "true") {
					column.elevenTree = true;
				}
				else {
					if (def === "false") {
						column.elevenTree = false;
					}
				}
				headCell.removeAttr("default");
			} return column;
		}
		function renderLayout(grid) {
			var table = grid.settings.table.markup;
			var gridArea = $(grid.markup.area);
			if (grid.settings.option.id !== null) {
				gridArea.attr("id", grid.settings.option.id);
			}
			if (grid.settings.option.classes !== null) {
				gridArea.addClass(grid.settings.option.classes);
			}
			if (grid.settings.option.width !== null) {
				gridArea.css("width", grid.settings.option.width);
			}
			var wrapper = $(grid.markup.wrapper);
			wrapper.css({ "padding-right": getScrollBarWidth(grid) });
			table.before(gridArea);
			gridArea.append(wrapper);
			table.remove();
			var mainWrapper = $(grid.markup.main.wrapper);
			mainWrapper.css({ overflow: "hidden", position: "relative", "z-index": 3 });
			var headerWrapper = $(grid.markup.main.header.wrapper);
			var headerScroller = $(grid.markup.main.header.scroller);
			headerScroller.css({ overflow: "hidden" });
			var headerInner = $(grid.markup.main.header.inner);
			headerInner.css({ position: "relative" });
			var headerTable = $(grid.markup.main.header.table);
			var bodyWrapper = $(grid.markup.main.body.wrapper);
			var bodyScroller = $(grid.markup.main.body.scroller);
			bodyScroller.css({ "overflow-y": "hidden", "overflow-x": "hidden", position: "relative" });
			var bodyInner = $(grid.markup.main.body.inner);
			bodyInner.css({ position: "relative", "min-height": "1px" });
			var bodyTable = $(grid.markup.main.body.table);
			bodyTable.css("z-index", "1");
			headerInner.append(headerTable);
			headerScroller.append(headerInner);
			headerWrapper.append(headerScroller);
			mainWrapper.append(headerWrapper);
			bodyTable.prepend(grid.markup.main.body.caption);
			bodyTable.append(grid.markup.main.body.tbody);
			bodyInner.append(bodyTable);
			bodyScroller.append(bodyInner);
			bodyWrapper.append(bodyScroller);
			mainWrapper.append(bodyWrapper);
			wrapper.append(mainWrapper);
			var freezeScroller = $(grid.markup.functional.freezeScroller);
			freezeScroller.css({ position: "absolute", top: 0, left: 0, "z-index": 2, "overflow-y": "scroll" });
			if (navigator.appVersion.indexOf("MSIE 9.") !== -1) {
				freezeScroller.css({ "padding-right": getScrollBarWidth(grid), "padding-bottom": getScrollBarWidth(grid) });
			}
			var freezeScrollerInner = $(grid.markup.functional.freezeScrollerInner);
			freezeScrollerInner.css({ "min-height": "1px" });
			freezeScroller.append(freezeScrollerInner);
			var freezeIndicatorLeft = $(grid.markup.functional.freezeIndicatorLeft);
			var freezeIndicatorRight = $(grid.markup.functional.freezeIndicatorRight);
			gridArea.append(freezeIndicatorLeft);
			gridArea.append(freezeIndicatorRight);
			wrapper.append(freezeScroller);
			if (getScrollBarWidth(grid) > 0) {
				var rightTopRect = $(grid.markup.design.rect.rightTop);
				rightTopRect.css({ position: "absolute", top: 0, right: 0, "z-index": 4 });
				wrapper.append(rightTopRect);
			}
			if (getScrollBarWidth(grid) > 0) {
				renderScrollBorderRight(grid);
			}
			renderHeader(grid);
			setRowTemplates(grid);
			var bodyThead = $(grid.markup.main.body.thead);
			var mainRow = $(grid.settings.template.mainRow);
			mainRow.filter("tr").each(function (i) { var mainRowTr = $(this); var bodyTheadRow = bodyThead.find("tr").eq(i); mainRowTr.children().each(function () { var cell = $(this); var cellName = cell.attr("name"); var bodyTheadRowCell = getjQueryElementByName(bodyTheadRow, cellName); bodyTheadRow.append(bodyTheadRowCell); }); });
			if (grid.settings.option.paging !== undefined) {
				setPageLayout(grid);
			}
			else {
				grid.settings.usePaging = false;
			}
		}
		function setPageLayout(grid) {
			grid.settings.usePaging = true; $(grid.markup.design.border.right).remove(); $(grid.markup.design.rect.rightTop).remove(); grid.settings.paging.countPerPage = grid.settings.option.paging.countPerPage; grid.settings.paging.paginationCount = grid.settings.option.paging.paginationCount; var container = $(grid.markup.area); var pageWrapper = $(grid.markup.functional.pageWrapper); container.append(pageWrapper); var countPerPage = grid.settings.paging.countPerPage; var gridHeight = null; var settingFixedHeight = grid.settings.option.paging.fixedHeight; if (!settingFixedHeight) {
				gridHeight = (getTrHeight(grid) * grid.settings.bodyRowCount) * countPerPage + getHeaderHeight(grid);
				if (grid.settings.scrollerInnerWidth > $(grid.markup.main.body.wrapper).width()) {
					gridHeight += getScrollBarWidth(grid);
				}
			} renderGridHeightAndWidth(grid, gridHeight, null); var startIndex = 0 * countPerPage; var endIndex = startIndex + (countPerPage - 1); renderColumnResizer(grid); grid.settings.defferedRendering.renderingStartRowIndex = startIndex; grid.settings.defferedRendering.renderingEndRowIndex = endIndex; if (grid.settings.option.paging.freezeScrollerY === "hide") {
				hideFreezeScrollerY(grid);
			} renderColumnWidth(grid, true); renderScrollInnerWidth(grid); renderHeaderScrollerWidth(grid);
		}
		function hideFreezeScrollerY(grid) { var wrapper = $(grid.markup.wrapper); var headerScroller = $(grid.markup.main.header.scroller); var freezeScroller = $(grid.markup.functional.freezeScroller); wrapper.css({ "padding-right": 0 }); headerScroller.css({ width: wrapper.width() }); freezeScroller.css({ "overflow-y": "hidden" }); }
		function setPageList(grid) { appendMarkUpPage(grid); selectedPageListIndex(grid); }
		function appendMarkUpPage(grid) {
			var wrapper = $(grid.markup.functional.pageWrapper); var paginationCount = grid.settings.paging.paginationCount; var startPageListIndex = grid.settings.paging.startPageListIndex; var totalPageCount = grid.settings.paging.totalPageCount; wrapper.children().remove(); if (totalPageCount - startPageListIndex < paginationCount) {
				paginationCount = totalPageCount - startPageListIndex;
			} if (totalPageCount !== null && grid.data.length !== 0) {
				var aTags = [];
				for (var i = 0; i < paginationCount; i++) {
					var a = $("<a>").addClass(GRID_CLASS.FUNCTIONAL.PAGING.A).text(i + 1 + startPageListIndex).data("page", i + startPageListIndex).attr({ title: (i + startPageListIndex + 1) + " 페이지 이동", href: "#" });
					a.on("click", function (e) { e.preventDefault(); });
					aTags.push(a[0]);
				}
				grid.markup.functional.paging.a = aTags;
				wrapper.append(aTags);
			}
			else {
				var noDataSpan = $("<span>").text("데이터가 없습니다");
				wrapper.append(noDataSpan);
			} appendPagingArrow(grid); bindPagingEvent(grid);
		}
		function appendPagingArrow(grid) { var wrapper = $(grid.markup.functional.pageWrapper); var left = $('<input type="button">').addClass(GRID_CLASS.FUNCTIONAL.PAGING.LEFT).val("이전 " + grid.settings.paging.paginationCount + "페이지"); var right = $('<input type="button">').addClass(GRID_CLASS.FUNCTIONAL.PAGING.RIGHT).val("다음 " + grid.settings.paging.paginationCount + "페이지"); var start = $('<input type="button">').addClass(GRID_CLASS.FUNCTIONAL.PAGING.START).val("처음페이지"); var end = $('<input type="button">').addClass(GRID_CLASS.FUNCTIONAL.PAGING.END).val("마지막페이지"); wrapper.prepend(left[0]); wrapper.append(right[0]); wrapper.prepend(start[0]); wrapper.append(end[0]); var totalCountText = $('<span>전체 : <span class="' + GRID_CLASS.FUNCTIONAL.PAGING.TOTAL_COUNT + '">' + grid.data.length + "</span>건</span>").addClass(GRID_CLASS.FUNCTIONAL.PAGING.TOTAL_COUNT_TEXT); wrapper.append(totalCountText); grid.markup.functional.paging.left = left[0]; grid.markup.functional.paging.right = right[0]; grid.markup.functional.paging.start = start[0]; grid.markup.functional.paging.end = end[0]; setArrowAttr(grid); }
		function setArrowAttr(grid) {
			var left = grid.markup.functional.paging.left; var right = grid.markup.functional.paging.right; var start = grid.markup.functional.paging.start; var end = grid.markup.functional.paging.end; var paginationCount = grid.settings.paging.paginationCount; var totalPageCount = grid.settings.paging.totalPageCount; var currentPageIndex = grid.settings.paging.currentPageIndex; if (totalPageCount % paginationCount != 0) {
				paginationCount = totalPageCount % paginationCount;
			} if (totalPageCount == null || grid.data.length == 0) {
				$(left).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_LEFT);
				$(right).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_RIGHT);
				$(start).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_START);
				$(end).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_END);
			}
			else {
				if (currentPageIndex === null) {
					currentPageIndex = 0;
				}
				if (currentPageIndex === 0) {
					$(left).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_LEFT);
				}
				if (0 <= currentPageIndex && currentPageIndex < grid.settings.paging.paginationCount) {
					$(start).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_START);
				}
				if (currentPageIndex == totalPageCount - 1) {
					$(right).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_RIGHT);
				}
				if (totalPageCount - paginationCount <= currentPageIndex) {
					$(end).attr("disabled", true).addClass(GRID_CLASS.FUNCTIONAL.PAGING.DISABLED_END);
				}
			}
		}
		function bindPagingEvent(grid) {
			var left = grid.markup.functional.paging.left; var right = grid.markup.functional.paging.right; var start = grid.markup.functional.paging.start; var end = grid.markup.functional.paging.end; var paginationCount = grid.settings.paging.paginationCount; var totalPageCount = grid.settings.paging.totalPageCount; var aTags = grid.markup.functional.paging.a; _.each(aTags, function (a, index, list) { $(a).on("click", function () { grid.settings.paging.currentPageIndex = $(this).data("page"); grid.renderingPage(grid.settings.paging.currentPageIndex); }); }); $(left).on("click", function () {
				var startPageListIndex = grid.settings.paging.startPageListIndex; if (startPageListIndex !== 0 && startPageListIndex !== null) {
					grid.settings.paging.startPageListIndex = startPageListIndex - paginationCount;
					grid.settings.paging.currentPageIndex = startPageListIndex - 1;
				}
				else {
					grid.settings.paging.startPageListIndex = 0;
					grid.settings.paging.currentPageIndex = 0;
				} grid.renderingPage(grid.settings.paging.currentPageIndex);
			}); $(right).on("click", function () {
				var startPageListIndex = grid.settings.paging.startPageListIndex; if (startPageListIndex + paginationCount < totalPageCount) {
					grid.settings.paging.startPageListIndex = startPageListIndex + paginationCount;
					grid.settings.paging.currentPageIndex = grid.settings.paging.startPageListIndex;
				}
				else {
					grid.settings.paging.currentPageIndex = totalPageCount - 1;
				} grid.renderingPage(grid.settings.paging.currentPageIndex);
			}); $(start).on("click", function () { grid.settings.paging.startPageListIndex = 0; grid.settings.paging.currentPageIndex = 0; grid.renderingPage(grid.settings.paging.currentPageIndex); }); $(end).on("click", function () {
				var paginationCount = grid.settings.paging.paginationCount; if (totalPageCount % paginationCount != 0) {
					paginationCount = totalPageCount % paginationCount;
				} grid.settings.paging.startPageListIndex = totalPageCount - paginationCount; grid.settings.paging.currentPageIndex = totalPageCount - 1; grid.renderingPage(totalPageCount - 1);
			});
		}
		function cubePageAnimation(grid) {
			clearInterval(grid.settings.paging.animate); var wrapper = $(grid.markup.main.body.wrapper); var wrapperParent = wrapper.parent(); var beforeWrapper = grid.beforeBodyWrapper; var beforePageIndex = grid.settings.paging.beforePageIndex; var currentPageIndex = grid.settings.paging.currentPageIndex; var rotateY = null; var beforeWrapperRotateY = 0; wrapperParent.append(beforeWrapper); wrapperParent.css({ position: "relative", perspective: "3000px", "transform-style": "preserve-3d" }); beforeWrapper.css({ position: "relative", "margin-top": -wrapper.height() }); if (!grid.settings.paging.beforePageIndex) {
				beforePageIndex = 0;
			} if (beforePageIndex < currentPageIndex) {
				rotateY = 90;
			}
			else {
				if (beforePageIndex > currentPageIndex) {
					rotateY = -90;
				}
			} wrapper.css({ position: "relative", transform: "rotate3d(0, 1, 0, " + rotateY + "deg)" }); function animate3D() {
				if (beforePageIndex < currentPageIndex) {
					rotateY -= 10;
					beforeWrapperRotateY -= 10;
					if (rotateY <= 0) { }
					else {
						setTimeout(function () { animate3D(); }, 17);
					}
				}
				else {
					if (beforePageIndex > currentPageIndex) {
						rotateY += 10;
						beforeWrapperRotateY += 10;
						if (rotateY >= 0) { }
						else {
							setTimeout(function () { animate3D(); }, 17);
						}
					}
				} wrapper.css({ transform: "rotate3d(0, 1, 0, " + rotateY + "deg)" }); beforeWrapper.css({ transform: "rotate3d(0, 1, 0, " + beforeWrapperRotateY + "deg)" });
			} animate3D(); grid.settings.paging.beforePageIndex = currentPageIndex;
		}
		function slidePageAnimation(grid) {
			var body = $(".CI-GRID-MAIN-WRAPPER"); var bodyWrapper = $(grid.markup.main.body.wrapper); var beforePageIndex = grid.settings.paging.beforePageIndex; var currentPageIndex = grid.settings.paging.currentPageIndex; bodyWrapper.hide(); if (!grid.settings.paging.beforePageIndex) {
				beforePageIndex = 0;
			} if (beforePageIndex < currentPageIndex) {
				bodyWrapper.show("drop", { direction: "right" }, 200);
			}
			else {
				if (beforePageIndex > currentPageIndex) {
					bodyWrapper.show("drop", { direction: "left" }, 200);
				}
				else {
					bodyWrapper.show("shake", { times: 2 }, 200);
				}
			} grid.settings.paging.beforePageIndex = currentPageIndex;
		}
		function selectedPageListIndex(grid) {
			var currentPageIndex = grid.settings.paging.currentPageIndex; if (currentPageIndex == null) {
				currentPageIndex = 0;
			} var startPageListIndex = grid.settings.paging.startPageListIndex; var selectedAIndex = currentPageIndex - startPageListIndex; var aTags = grid.markup.functional.paging.a; var selectedA = aTags[selectedAIndex]; $(selectedA).addClass(GRID_CLASS.FUNCTIONAL.PAGING.SELECTED_A);
		}
		function setTotalPageCount(grid) { var countPerPage = grid.settings.paging.countPerPage; var dataLength = grid.data.length; var totalPageCount = Math.ceil(dataLength / countPerPage); grid.settings.paging.totalPageCount = totalPageCount; }
		function bindFreezeScrollXEvent(grid) { var freezeScroller = $(grid.markup.functional.freezeScroller); var headerScroller = $(grid.markup.main.header.scroller); var bodyScroller = $(grid.markup.main.body.scroller); freezeScroller.on("scroll.fx", function () { var scrollLeft = $(this).scrollLeft(); headerScroller.scrollLeft(scrollLeft); bodyScroller.scrollLeft(scrollLeft); }); }
		function bindMarkupEvents(grid) {
			if (grid.settings.option.autoResize !== false) {
				var lazyResize = _.debounce(function () { grid.event.trigger(EVENT.WINDOW_RESIZED, [grid]); resize(grid); }, 50);
				$(window).on("resize.grid", function () { lazyResize(); });
			} var freezeScroller = $(grid.markup.functional.freezeScroller); var bodyScroller = $(grid.markup.main.body.scroller); bindFreezeScrollXEvent(grid); freezeScroller.on("scroll.fy", function () { var scrollTop = $(this).scrollTop(); bodyScroller.scrollTop(scrollTop); }); bodyScroller.on("mousewheel.y", function (e) {
				if (e.deltaX === 0) {
					var scrollTop = freezeScroller.scrollTop();
					e.preventDefault();
					if (scrollTop === 0) {
						scrollTop = null;
					}
					freezeScroller.data("prev-top", scrollTop);
					freezeScroller.scrollTop(scrollTop - e.deltaY * 100);
				}
			}); freezeScroller.on("scroll", function () { var data = [grid, freezeScroller.scrollTop(), freezeScroller.scrollLeft()]; grid.event.trigger(EVENT.SCROLL, data); }); grid.event.on(EVENT.ROW_APPENDED, function () { resize(grid); }); if (grid.settings.mobile) {
				grid.event.on(EVENT.BEFORE_APPENDING_ROW, function () { var view = grid.markup.main.body.scroller; unBindTouchScrollEvent(grid, view); var freezeScroller = grid.markup.functional.freezeScroller; freezeScroller.scrollTop = 0; freezeScroller.scrollLeft = 0; });
				grid.event.on(EVENT.ROW_APPENDED, function () { bindXYTouchScrollEvent(grid); });
			} if (grid.settings.option.checkBox !== null) {
				var checkAllCheckBox = $(getColumn(grid, "CI_GRID_CHECKBOX_CONTAINER").header).find('[type="checkbox"]');
				checkAllCheckBox.on("change", function () {
					var markup = $(getColumnNodes(grid, "CI_GRID_CHECKBOX_CONTAINER")).find('[name="CI_GRID_CHECKBOX"]'); var rowModels = grid.settings.rows; if (checkAllCheckBox[0].checked) {
						markup.prop("checked", true);
						_.each(rowModels, function (rowModel) { rowModel.checked = true; });
					}
					else {
						markup.prop("checked", false);
						_.each(rowModels, function (rowModel) { rowModel.checked = false; });
					}
				});
				var mainBodyTbody = $(grid.markup.main.body.tbody);
				mainBodyTbody.on("change", '[name="CI_GRID_CHECKBOX"]', function () { var visibleRowsArray = _.filter(grid.settings.rows, function (rowObject) { return rowObject.visibility; }); var idx = $(mainBodyTbody[0]).find('[name="CI_GRID_CHECKBOX"]').index($(this)); idx = idx + grid.settings.defferedRendering.renderingStartRowIndex; visibleRowsArray[idx].checked = $(this).prop("checked"); });
			} if (grid.settings.option.rowSelectable === true) {
				var mainBodyTbody = $(grid.markup.main.body.tbody);
				var firstClickIndex = -1;
				mainBodyTbody.on("mousedown", "tr", function (e) {
					if (e.shiftKey) {
						mainBodyTbody.on("selectstart.gridbody", function (e) { e.preventDefault(); });
					} var rowModels = grid.settings.rows, gridRows = grid.rows; var clickIdx = this.index; if (e.ctrlKey) {
						if (rowModels[clickIdx].selected) {
							$(gridRows[clickIdx]).removeClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
							rowModels[clickIdx].selected = false;
						}
						else {
							$(gridRows[clickIdx]).addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
							rowModels[clickIdx].selected = true;
						}
					}
					else {
						if (e.shiftKey) {
							if (firstClickIndex > clickIdx) {
								var temp = firstClickIndex;
								firstClickIndex = clickIdx;
								clickIdx = temp;
							}
							for (var i = firstClickIndex; i <= clickIdx; i++) {
								if (!rowModels[i].visibility) {
									continue;
								}
								$(gridRows[i]).removeClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED).addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
								rowModels[i].selected = true;
							}
						}
						else {
							var clickTr = $(this).closest("tr");
							var isSelected = clickTr.hasClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
							$.each(gridRows, function (idx, item) { $(item).removeClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED); });
							var whereRows = _.where(rowModels, { selected: true });
							$.each(whereRows, function (index, value) { value.selected = false; });
							if (!isSelected) {
								var row = clickTr, rowNext = clickTr.next(), rowPrev = clickTr.prev();
								var rowOdd = clickTr.hasClass("CI-GRID-ODD");
								var rowOddNext = clickTr.next().hasClass("CI-GRID-ODD");
								row.addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
								if (grid.settings.bodyRowCount === 2) {
									if (rowOdd) {
										if (rowOddNext) {
											rowNext.addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
										}
										else {
											rowPrev.addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
										}
									}
									else {
										if (rowOddNext) {
											rowPrev.addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
										}
										else {
											rowNext.addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
										}
									}
								}
								rowModels[clickIdx].selected = true;
							}
						}
					} if (!e.shiftKey) {
						firstClickIndex = clickIdx;
					}
				}).on("mouseup", function (e) { mainBodyTbody.off("selectstart.gridbody"); });
			} if (grid.settings.bodyRowCount === 2) {
				var mainBodyTbody = $(grid.markup.main.body.tbody);
				var addedClassName = "row-hover-background-color";
				mainBodyTbody.on("mouseenter", "tr", function () {
					var row = $(this), rowNext = $(this).next(), rowPrev = $(this).prev(); var rowOdd = $(this).hasClass("CI-GRID-ODD"); var rowOddNext = $(this).next().hasClass("CI-GRID-ODD"); row.addClass(addedClassName); if (rowOdd) {
						if (rowOddNext) {
							rowNext.addClass(addedClassName);
						}
						else {
							rowPrev.addClass(addedClassName);
						}
					}
					else {
						if (rowOddNext) {
							rowPrev.addClass(addedClassName);
						}
						else {
							rowNext.addClass(addedClassName);
						}
					}
				}).on("mouseleave", "tr", function () { var row = $(this), rowNext = $(this).next(), rowPrev = $(this).prev(); row.removeClass(addedClassName); rowNext.removeClass(addedClassName); rowPrev.removeClass(addedClassName); });
			}
			else {
				if (grid.settings.bodyRowCount === 1) {
					var mainBodyTbody = $(grid.markup.main.body.tbody);
					var addedClassName = "row-hover-background-color";
					mainBodyTbody.on("mouseenter", "tr", function () { var row = $(this); row.addClass(addedClassName); }).on("mouseleave", "tr", function () { var row = $(this); row.removeClass(addedClassName); });
				}
			}
		}
		function bindXYTouchScrollEvent(grid) {
			var view = grid.markup.main.body.scroller; var freezeScroller = grid.markup.functional.freezeScroller; var freezeScrollerInner = grid.markup.functional.freezeScrollerInner; if (!grid.settings.usePaging) {
				bindTouchScrollEvent("y", grid, view, freezeScroller, freezeScrollerInner);
			} bindTouchScrollEvent("x", grid, view, freezeScroller, freezeScrollerInner);
		}
		function bindTouchScrollEvent(axis, grid, view, wrapper, inner) {
			(function (axis, grid, view, wrapper, inner) {
				var indicator, indiStart, relative, clientPoint, indicatorSize, min, max, offset, reference, pressed, xform, velocity, frame, timestamp, ticker, amplitude, target, timeConstant, scrollCallBack, startX, startY, endX, endY, dragDirection; var xIndiOrigin = parseInt(getComputedStyle(wrapper).left, 10); function position(e) {
					if (e.targetTouches && (e.targetTouches.length >= 1)) {
						return e.targetTouches[0][clientPoint];
					} return e[clientPoint];
				} function scrollY(offset) { relative = grid.settings.defferedRendering.scrollRelativeY; wrapper.scrollTop = offset; indicator.style[xform] = "translateY(" + (offset * relative) + "px)"; } function scrollX(offset) { wrapper.scrollLeft = offset; indicator.style[xform] = "translateX(" + (offset * relative) + "px)"; } function scroll(pos) {
					if (axis === "y") {
						max = grid.settings.defferedRendering.scrollMaxSizeY;
					} offset = (pos > max) ? max : (pos < min) ? min : pos; scrollCallBack(offset);
				} function track() { var now, elapsed, delta, v; now = Date.now(); elapsed = now - timestamp; timestamp = now; delta = offset - frame; frame = offset; v = 1000 * delta / (1 + elapsed); velocity = 0.8 * v + 0.2 * velocity; } function autoScroll() {
					var elapsed, delta; if (amplitude) {
						elapsed = Date.now() - timestamp;
						delta = -amplitude * Math.exp(-elapsed / timeConstant);
						if (delta > 0.5 || delta < -0.5) {
							scroll(target + delta);
							requestAnimationFrame(autoScroll);
						}
						else {
							scroll(target);
						}
					}
				} function tap(e) { pressed = true; reference = position(e); velocity = amplitude = 0; frame = offset; timestamp = Date.now(); clearInterval(ticker); ticker = setInterval(track, 100); var touch = e.touches[0]; startX = touch.pageX; startY = touch.pageY; return false; } var prevOffset = null; function drag(e) {
					var point, delta; if (pressed) {
						point = position(e);
						delta = reference - point;
						reference = point;
						scroll(offset + delta);
					} if (prevOffset !== wrapper.scrollTop) {
						e.preventDefault();
						e.stopPropagation();
					} var touch = e.touches[0]; endX = touch.pageX; endY = touch.pageY; if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
						dragDirection = "x";
						e.preventDefault();
					}
					else {
						dragDirection = "y";
					} startX = null; startY = null; prevOffset = wrapper.scrollTop; return false;
				} function release(e) {
					pressed = false; clearInterval(ticker); if (velocity > 10 || velocity < -10) {
						amplitude = 0.8 * velocity;
						target = Math.round(offset + amplitude);
						timestamp = Date.now();
						requestAnimationFrame(autoScroll);
					} return false;
				} if (typeof window.ontouchstart !== "undefined") {
					view.addEventListener("touchstart", tap);
					view.addEventListener("touchmove", drag);
					view.addEventListener("touchend", release);
				} var indicator = document.createElement("div"); grid.markup.wrapper.appendChild(indicator); if ($(grid.markup.wrapper).has("." + GRID_CLASS.DESIGN.SCROLL_INDI.HORIZONTAL) && axis === "x") {
					$(grid.markup.wrapper).find("." + GRID_CLASS.DESIGN.SCROLL_INDI.HORIZONTAL).remove();
				} if ($(grid.markup.wrapper).has("." + GRID_CLASS.DESIGN.SCROLL_INDI.VERTICAL) && axis === "y") {
					$(grid.markup.wrapper).find("." + GRID_CLASS.DESIGN.SCROLL_INDI.VERTICAL).remove();
				} if (axis === "x") {
					scrollCallBack = scrollX;
					clientPoint = "clientX";
					offset = min = 0;
					pressed = false;
					timeConstant = 325;
					indiStart = 0;
					max = parseInt(getComputedStyle(inner).width, 10) - parseInt(getComputedStyle(wrapper).width, 10);
					indicator.setAttribute("class", GRID_CLASS.DESIGN.SCROLL_INDI.HORIZONTAL);
					indicatorSize = parseInt(getComputedStyle(indicator).width, 10) + parseInt(getComputedStyle(indicator).marginLeft, 10) + parseInt(getComputedStyle(indicator).marginRight, 10);
					relative = (parseInt(getComputedStyle(wrapper).width, 10) - indicatorSize) / max;
					indicator.style.left = xIndiOrigin + "px";
					if (parseInt(getComputedStyle(wrapper).width, 10) / parseInt(getComputedStyle(inner).width, 10) >= 1) {
						indicator.style.display = "none";
					}
				}
				else {
					if (axis === "y") {
						scrollCallBack = scrollY;
						clientPoint = "clientY";
						offset = min = 0;
						pressed = false;
						timeConstant = 325;
						max = parseInt(getComputedStyle(inner).height, 10) - parseInt(getComputedStyle(view).height, 10);
						grid.settings.defferedRendering.scrollMaxSizeY = max;
						indiStart = parseInt(getComputedStyle(grid.markup.main.header.wrapper).height, 10);
						indicator.setAttribute("class", GRID_CLASS.DESIGN.SCROLL_INDI.VERTICAL);
						indicator.style.top = getComputedStyle(grid.markup.main.header.wrapper).height;
						indicatorSize = parseInt(getComputedStyle(indicator).height, 10) + parseInt(getComputedStyle(indicator).marginTop, 10) + parseInt(getComputedStyle(indicator).marginBottom, 10);
						relative = ((parseInt(getComputedStyle(wrapper).height, 10)) - indicatorSize) / max;
						grid.settings.defferedRendering.scrollRelativeY = relative;
						if (parseInt(getComputedStyle(wrapper).height, 10) / parseInt(getComputedStyle(inner).height, 10) >= 1) {
							indicator.style.display = "none";
						}
					}
				} if (grid.settings.mobile && grid.settings.option.niceScroll) {
					indicator.style.display = "none";
				} xform = "transform";["webkit", "Moz", "O", "ms"].every(function (prefix) {
					var e = prefix + "Transform"; if (typeof view.style[e] !== "undefined") {
						xform = e;
						return false;
					} return true;
				});
			})(axis, grid, view, wrapper, inner);
		}
		function unBindTouchScrollEvent(grid, view) { $(grid.markup.wrapper).find("." + GRID_CLASS.DESIGN.SCROLL_INDI.HORIZONTAL).remove(); $(grid.markup.wrapper).find("." + GRID_CLASS.DESIGN.SCROLL_INDI.VERTICAL).remove(); }
		function renderHeaderScrollerWidth(grid) { var mainWrapper = $(grid.markup.main.wrapper); var headerScroller = $(grid.markup.main.header.scroller); headerScroller.outerWidth(mainWrapper.width()); }
		function renderScrollBorderRight(grid) {
			if (getScrollBarWidth(grid) === 0) {
				return;
			} var rightBorder = $(grid.markup.design.border.right); rightBorder.css({ position: "absolute", top: 0, bottom: 0, right: getScrollBarWidth(grid), "z-index": 3 }); $(grid.markup.wrapper).append(rightBorder);
		}
		function renderScrollBorderBottom(grid) {
			if (getScrollBarWidth(grid) === 0) {
				return;
			} var bottomBorder = $("<div>").addClass(GRID_CLASS.DESIGN.BORDER.BOTTOM); bottomBorder.css({ position: "absolute", left: 0, right: 0, bottom: getScrollBarWidth(grid), "z-index": 3 }); $(grid.markup.wrapper).append(bottomBorder); grid.markup.design.border.bottom = bottomBorder[0];
		}
		function renderGridHeightAndWidth(grid, height, width) {
			var settingHeight = grid.settings.option.height; if (height) {
				settingHeight = height;
				grid.settings.option.height = settingHeight;
			} var settingWidth = grid.settings.option.width; if (width) {
				settingWidth = width;
				grid.settings.option.width = settingWidth;
			} var area = $(grid.markup.area); area.outerWidth(settingWidth, true); renderHeaderScrollerWidth(grid); var scrollBarWidth = getScrollBarWidth(grid); var bodyScroller = $(grid.markup.main.body.scroller); var freezeScroller = $(grid.markup.functional.freezeScroller); var freezeScrollerInner = $(grid.markup.functional.freezeScrollerInner); var hasScroll = false; if (grid.settings.scrollerInnerWidth > $(grid.markup.main.body.wrapper).width()) {
				hasScroll = true;
			} if (checkFixedColumn(grid) && grid.settings.freezeScroll.currentViewIndex > 0) {
				hasScroll = true;
			} if (hasScroll) {
				$(grid.markup.wrapper).css({ "padding-bottom": scrollBarWidth });
				var bodyScrollerHeight = settingHeight - getHeaderHeight(grid) - scrollBarWidth;
				bodyScroller.height(bodyScrollerHeight);
				if (grid.markup.design.border.bottom === null) {
					renderScrollBorderBottom(grid);
				}
			}
			else {
				$(grid.markup.wrapper).css({ "padding-bottom": 0 });
				var bodyScrollerHeight = settingHeight - getHeaderHeight(grid);
				bodyScroller.height(bodyScrollerHeight);
				$(grid.markup.design.border.bottom).remove();
				grid.markup.design.border.bottom = null;
			} var rightTopRect = $(grid.markup.design.rect.rightTop); rightTopRect.css({ width: (scrollBarWidth + 1) + "px", height: getHeaderHeight(grid) + "px" }); renderFreezeScroller(grid); renderFreezeScrollerInnerWidth(grid); grid.event.trigger(EVENT.RESIZED, [grid, settingWidth, settingHeight]);
		}
		function getHeaderHeight(grid) { return $(grid.markup.main.header.wrapper).height(); }
		function setGridWidth(grid, width) { renderGridHeightAndWidth(grid, null, width); reLayoutHeader(grid); }
		function renderColumnResizer(grid) {
			if (grid.settings.option.resizable === false) {
				return;
			} var currentResizers = grid.markup.functional.resizers; if (currentResizers !== null) {
				_.each(currentResizers, function (resizer, index, list) { $(resizer).remove(); });
				grid.markup.functional.resizers = null;
			} var gridWrapper = $(grid.markup.wrapper); var gridHeaderInner = $(grid.markup.main.header.inner); var columns = grid.settings.columns; var fixedColumnCount = getFixedColumnCount(grid); var resizers = []; _.each(columns, function (column, index, list) {
				if (column.childColumns.length === 0 && column.visibility == "visible") {
					var columnHeader = $(column.header);
					var headerPosition = columnHeader.position();
					if (fixedColumnCount === index) {
						$(grid.markup.design.border.fixed).remove();
						var fixedBorder = $("<div>").addClass(GRID_CLASS.DESIGN.BORDER.FIXED);
						var fixedBorderHeight = grid.markup.main.wrapper.clientHeight - getHeaderHeight(grid);
						gridWrapper.append(fixedBorder);
						fixedBorder.css({ top: getHeaderHeight(grid), left: headerPosition.left + column.width - fixedBorder.width(), height: fixedBorderHeight });
						$(grid.markup.functional.freezeIndicatorLeft).css({ left: headerPosition.left + column.width });
						grid.markup.design.border.fixed = fixedBorder[0];
					}
					var resizer = $("<div>").addClass(GRID_CLASS.FUNCTIONAL.RESIZE.WRAPPER);
					gridHeaderInner.append(resizer);
					var resizerWidth = resizer.width();
					resizer.css({ top: headerPosition.top, left: headerPosition.left + column.width - resizerWidth / 2, height: columnHeader.outerHeight() });
					resizer.draggable({
						cursor: "e-resize", axis: "x", helper: function () { var helper = $("<div>").addClass(GRID_CLASS.FUNCTIONAL.RESIZE.HELPER); var helperHeight = grid.markup.main.wrapper.clientHeight - resizer.position().top; helper.css({ height: helperHeight, top: resizer.position().top }); gridWrapper.append(helper); return helper; }, stop: function (event, ui) {
							_.each(columns, function (column) { column.displayingWidth = column.width; }); var originalLeft = ui.originalPosition.left; var currentLeft = ui.position.left; var distance = currentLeft - originalLeft; var paddingTotal = parseInt($(column.header).css("padding-left"), 10) + parseInt($(column.header).css("padding-right"), 10); if (!paddingTotal) {
								paddingTotal = 20;
							} if (column.width + distance < paddingTotal) {
								distance = -1 * (column.width - paddingTotal);
							} recursivelyAdjustingColumnWidth(column, distance); renderColumnWidth(grid, true); renderScrollInnerWidth(grid); renderHeaderScrollerWidth(grid); deBugColumnResizingBug(column); grid.event.trigger(EVENT.COLUMN_RESIZED, [grid, column, distance]);
						}
					});
					resizers.push(resizer[0]);
				}
			}); grid.markup.functional.resizers = resizers;
		}
		function recursivelyAdjustingColumnWidth(column, distance) {
		column.displayingWidth = column.width + distance; column.width = column.width + distance; var parentColumn = column.parentColumn; if (parentColumn !== null) {
			recursivelyAdjustingColumnWidth(parentColumn, distance);
		}
		}
		function getScrollBarWidth(grid) {
			if (grid.settings.scrollBarWidth !== null) {
				return grid.settings.scrollBarWidth;
			} if (grid.settings.mobile) {
				grid.settings.scrollBarWidth = 0;
				return 0;
			} if (grid.settings.option.niceScroll) {
				grid.settings.scrollBarWidth = 0;
				return 0;
			} var platform = grid.settings.platform; var outer = document.createElement("div"); if (platform === "windows") {
				outer.className = GRID_CLASS.PLATFORM.WINDOWS;
			}
			else {
				if (platform === "mac") {
					outer.className = GRID_CLASS.PLATFORM.MAC;
				}
				else {
					if (platform === "linux") {
						outer.className = GRID_CLASS.PLATFORM.LINUX;
					}
				}
			} outer.style.width = "100px"; outer.style.msOverflowStyle = "scrollbar"; document.body.appendChild(outer); var widthNoScroll = outer.offsetWidth; outer.style.overflow = "scroll"; var inner = document.createElement("div"); inner.style.width = "100%"; outer.appendChild(inner); var widthWithScroll = inner.offsetWidth; outer.parentNode.removeChild(outer); var scrollBarWidth = widthNoScroll - widthWithScroll; grid.settings.scrollBarWidth = scrollBarWidth; return scrollBarWidth;
		}
		function renderColumnWidth(grid, outerWidth, parentColumn) {
			var columns = null; var parentWidth = null; if (!parentColumn) {
				parentWidth = grid.markup.main.wrapper.clientWidth;
				if (grid.settings.mobile && grid.settings.option.mobileFixWidth != null) {
					parentWidth = parseFloat(grid.settings.option.mobileFixWidth);
				}
				columns = _.filter(grid.settings.columns, function (column) { return column.level === 0; });
			}
			else {
				columns = parentColumn.childColumns;
				parentWidth = parentColumn.width;
				if (parentColumn.visibility !== "visible") {
					parentWidth = 0;
				}
			} var allAuto = true; var allPercent = true; _.each(columns, function (column, index, list) {
				if (column.displayingWidth !== "*") {
					allAuto = false;
				} if ((column.displayingWidth + "").indexOf("%") < 0) {
					allPercent = false;
				} if (column.displayingWidth !== "*" && (column.displayingWidth + "").indexOf("%") < 0) {
					column.width = parseFloat(column.displayingWidth);
				}
			}); if (allAuto) {
				var visibleColumns = _.filter(columns, function (column) { return column.visibility === "visible"; });
				var colspanCount = 0;
				_.each(visibleColumns, function (column, index, list) { colspanCount += column.colspan; });
				var percent = 1 / colspanCount;
				var length = visibleColumns.length;
				_.each(visibleColumns, function (column, index, list) {
					if (index < length - 1) {
						column.width = Math.round(parentWidth * percent * column.colspan);
					}
					else {
						var w = 0;
						_.each(visibleColumns, function (column, index, list) {
							if (index < length - 1) {
								w += column.width;
							}
							else {
								column.width = Math.round(parentWidth - w);
							}
						});
					}
				});
			}
			else {
				if (allPercent) {
					var length = columns.length;
					var widthSum = 0;
					_.each(columns, function (column, index, list) {
						var ratio = parseFloat(column.displayingWidth) / 100; if (index < length - 1) {
							column.width = Math.round(parentWidth * ratio);
							widthSum = widthSum + column.width;
						}
						else {
							var width = $(grid.markup.main.wrapper).width() - widthSum;
							column.width = width;
						}
					});
				}
				else {
					var autoWidthColumns = _.filter(columns, function (column) { return column.displayingWidth === "*" && column.visibility === "visible"; });
					var percentWidthColumns = _.filter(columns, function (column) { return ((column.displayingWidth + "").indexOf("%") > -1) && column.visibility === "visible"; });
					if (autoWidthColumns.length > 0 || percentWidthColumns.length > 0) {
						var noneAutoColumnWidthSum = 0;
						_.each(columns, function (column, index, list) {
							if (column.displayingWidth !== "*" && (column.displayingWidth + "").indexOf("%") < 0 && column.visibility === "visible") {
								noneAutoColumnWidthSum += column.width;
							}
						});
						var gap = parentWidth - noneAutoColumnWidthSum;
						var percentWidthTotal = 0;
						_.each(percentWidthColumns, function (column, index, list) { var ratio = parseFloat(column.displayingWidth) / 100; column.width = Math.round(gap * ratio); percentWidthTotal += column.width; });
						gap -= percentWidthTotal;
						var autoWidthTotal = 0;
						_.each(autoWidthColumns, function (column, indexs, list) {
						column.width = Math.round(gap / autoWidthColumns.length); if (indexs < autoWidthColumns.length - 1) {
							autoWidthTotal += column.width;
						}
						else {
							column.width = gap - autoWidthTotal;
						}
						});
					}
				}
			} _.each(columns, function (column, index, list) {
				if (column.minWidth !== null) {
					if (column.width < column.minWidth) {
						column.width = column.minWidth;
					}
				}
			}); var length = columns.length; _.each(columns, function (column, index, list) {
				var width = column.width; var header = $(column.header); var copiedHeader = $(column.copiedHeader); copiedHeader.attr("colspan", column.colspan); if (column.visibility === "hidden" || column.visibility === "temporarilyHidden") {
					header.css({ width: 0, "max-width": 0, "min-width": 0 }).addClass(GRID_CLASS.STYLE.CELL_DISPLAY_NONE);
					copiedHeader.css({ width: 0, "max-width": 0, "min-width": 0 }).addClass(GRID_CLASS.STYLE.CELL_HIDDEN);
				}
				else {
					if (column.visibility === "visualyHidden") {
						header.css({ width: 0, "max-width": 0, "min-width": 0 }).addClass(GRID_CLASS.STYLE.CELL_HIDDEN);
						copiedHeader.css({ width: 0, "max-width": 0, "min-width": 0 }).addClass(GRID_CLASS.STYLE.CELL_HIDDEN);
					}
					else {
						header.removeClass(GRID_CLASS.STYLE.CELL_DISPLAY_NONE);
						copiedHeader.removeClass(GRID_CLASS.STYLE.CELL_DISPLAY_NONE);
						header.removeClass(GRID_CLASS.STYLE.CELL_HIDDEN);
						copiedHeader.removeClass(GRID_CLASS.STYLE.CELL_HIDDEN);
					}
				} if (column.visibility === "visible") {
					var paddingLeft = parseFloat(header.css("padding-left"));
					var paddingRight = parseFloat(header.css("padding-right"));
					var borderLeft = parseFloat(header.css("border-left"));
					var borderRight = parseFloat(header.css("border-right"));
					var paddingWithBorder = paddingLeft + paddingRight + borderRight + borderLeft;
					if (column.width <= paddingWithBorder) {
						column.width = paddingWithBorder;
						width = paddingWithBorder;
					}
					header.css({ width: width, "min-width": width, "max-width": width });
					copiedHeader.css({ width: width, "min-width": width, "max-width": width });
					if (outerWidth === true) {
						header.outerWidth(width);
						copiedHeader.outerWidth(width);
					}
					else { }
				}
			}); _.each(columns, function (column, index, list) {
				if (column.childColumns.length > 0) {
					renderColumnWidth(grid, true, column);
				}
			});
		}
		function renderScrollInnerWidth(grid) {
			var scrollerInnerWidth = 0; var columns = grid.settings.columns; _.each(columns, function (column, index, list) {
				if (column.level === 0 && column.visibility == "visible") {
					scrollerInnerWidth += column.width;
				}
			}); $(grid.markup.main.header.inner).width(scrollerInnerWidth); $(grid.markup.main.body.inner).width(scrollerInnerWidth); grid.settings.scrollerInnerWidth = scrollerInnerWidth; if (grid.settings.mobile && grid.settings.option.mobileFixWidth != null) {
				var scrollerWidth = parseFloat(grid.settings.option.mobileFixWidth);
				$(grid.markup.main.header.inner).width(scrollerWidth);
				$(grid.markup.main.body.inner).width(scrollerWidth);
				grid.settings.scrollerInnerWidth = scrollerWidth;
			}
		}
		function getColumn(grid, id) {
			var column = null; if (typeof id === "string") {
				column = _.find(grid.settings.columns, function (column) { return column.name == id; });
			}
			else {
				if (typeof id === "number") {
					column = grid.settings.columns[id];
				}
			} return column;
		}
		function makeVirtualScroll(grid) {
			var vsh = getTrHeight(grid) * grid.settings.nowRendering.length; if (grid.markup.functional.mainBodyHeighter === null) {
				var divForScrollHeight = $("<div>");
				divForScrollHeight.css({ position: "absolute", top: 0, left: 0, width: "1px", height: vsh });
				var mainBodyInner = $(grid.markup.main.body.inner);
				var mainBodyHeighter = divForScrollHeight.clone();
				mainBodyInner.prepend(mainBodyHeighter);
				grid.markup.functional.mainBodyHeighter = mainBodyHeighter[0];
				$(grid.markup.main.body.table).css({ position: "absolute" });
				var freezeScroller = $(grid.markup.functional.freezeScroller);
				var bodyScroller = $(grid.markup.main.body.scroller);
				freezeScroller.on("scroll.fy", function (e) {
					var scrollTop = freezeScroller.scrollTop(); bodyScroller.scrollTop(scrollTop); var nowViewIndex = parseInt(scrollTop / grid.settings.defferedRendering.viewHeight); var currentViewIndex = grid.settings.defferedRendering.currentViewIndex; if (nowViewIndex !== currentViewIndex) {
						renderRowsByCachedRows(grid, false, false);
					}
				});
			} vsh = vsh + "px"; grid.markup.main.body.inner.style.height = vsh; grid.markup.functional.mainBodyHeighter.style.height = vsh; grid.markup.functional.freezeScrollerInner.style.height = vsh; var currentViewIndex = grid.settings.defferedRendering.currentViewIndex; var viewHeight = grid.settings.defferedRendering.viewHeight; var top = viewHeight * currentViewIndex; if (currentViewIndex > 0) {
				top = top - viewHeight;
			} grid.markup.main.body.table.style.top = top + "px"; grid.settings.defferedRendering.currentTableTop = top;
		}
		function syncFreezeScrollerHeigthWithBodyScrollerHeight(grid) {
			$(grid.markup.main.body.table).css({ position: "relative" }); var settingHeight = grid.settings.option.height; var bodyTableBody = $(grid.markup.main.body.tbody); var freezeScrollerInner = $(grid.markup.functional.freezeScrollerInner); var bodyTableHeight = bodyTableBody.height(); if (settingHeight === "auto") {
				$(grid.markup.functional.freezeScroller).height(bodyTableHeight + getScrollBarWidth(grid));
			} freezeScrollerInner.height(bodyTableHeight);
		}
		function getTrHeight(grid) {
			var checkedHeight = grid.settings.trHeight; if (checkedHeight && checkedHeight > 0) {
				return checkedHeight;
			} var mainBodyTableTbody = $(grid.markup.main.body.tbody); var firstTr = mainBodyTableTbody.find(":first-child"); var flag = false; if (firstTr.length === 0) {
				firstTr = $("<tr><td>&nbsp</td></tr>");
				mainBodyTableTbody.append(firstTr);
				flag = true;
			} var trHeight = firstTr.height(); if (typeof firstTr[0].getBoundingClientRect === "function") {
				var rect = firstTr[0].getBoundingClientRect();
				if (rect.height) {
					trHeight = rect.height;
				}
			} if (flag) {
				firstTr.remove();
			} var trCount = $(grid.markup.main.header.thead).find("TR").length; grid.settings.trHeight = trHeight; return trHeight;
		}
		function calculateShowingRowIndex(grid) {
			var alpha = grid.settings.defferedRendering.alpha; var trHeight = getTrHeight(grid); var viewHeight = $(grid.markup.functional.freezeScroller).outerHeight(true); var renderingCountPerView = alpha * parseInt(viewHeight / trHeight); grid.settings.defferedRendering.renderingCountPerView = renderingCountPerView; var viewHeight = trHeight * renderingCountPerView; grid.settings.defferedRendering.viewHeight = viewHeight; var scrollTop = grid.markup.main.body.scroller.scrollTop; var currentViewIndex = parseInt(scrollTop / viewHeight); grid.settings.defferedRendering.currentViewIndex = currentViewIndex; var startRowIndex = renderingCountPerView * currentViewIndex; var endRowIndex = renderingCountPerView * (currentViewIndex + 1) - 1; if (currentViewIndex === 0) {
				endRowIndex = endRowIndex + renderingCountPerView;
			}
			else {
				startRowIndex = startRowIndex - renderingCountPerView;
				endRowIndex = endRowIndex + renderingCountPerView;
			} if (endRowIndex > grid.data.length - 1) {
				endRowIndex = grid.data.length - 1;
			} grid.settings.defferedRendering.renderingStartRowIndex = startRowIndex; grid.settings.defferedRendering.renderingEndRowIndex = endRowIndex;
		}
		function checkInsertedRowType(row) {
			if (!row || row.length === 0) {
				return "Invalid";
			} if (_.isArray(row)) {
				if (_.isArray(row[0])) {
					return "aa";
				}
				else {
					if (_.isObject(row[0])) {
						return "ao";
					}
				}
			}
			else {
				return "dom";
			}
		}
		function checkParamType(obj) {
			if ((!obj || obj.length === 0) && obj !== 0) {
				return "unValid";
			} if (_.isArray(obj)) {
				obj = obj[0];
			} if (_.isNumber(obj)) {
				return "number";
			}
			else {
				if ($(obj)[0].nodeName.toLowerCase() === "tr") {
					return "dom";
				}
			} return "unValid";
		}
		function sortColumn(grid, columnName, type, multi) {
			var currentSortingCondition = grid.settings.sorting.conditions; var conditon = { columnName: columnName, type: type }; if (multi !== true) {
				grid.settings.sorting.conditions = [];
				grid.settings.sorting.conditions.push(conditon);
			}
			else {
				var idx = -1;
				_.each(currentSortingCondition, function (currentConditon, index, list) {
					if (currentConditon.columnName === columnName) {
						idx = index;
					}
				});
				if (idx > -1) {
					currentSortingCondition.splice(idx, 1);
				}
				grid.settings.sorting.conditions.push(conditon);
			} reOrderDataAndCachedRows(grid, type); renderRowsByCachedRows(grid);
		}
		var firstBy = (function () { function extend(f) { f.thenBy = tb; return f; } function tb(y) { var x = this; return extend(function (a, b) { return x(a, b) || y(a, b); }); } return extend; })();
		function getComparator(interator, compare) {
			if (interator === null) {
				return firstBy(compare);
			}
			else {
				return interator.thenBy(compare);
			}
		}
		function reOrderDataAndCachedRows(grid, type) {
			var data = grid.data; var rows = grid.rows; var rowIndex = grid.rowIndex; var rowModels = grid.settings.rows; var zipped = []; for (var i = 0, end = data.length; i < end; i++) {
				zipped.push({ rowIndex: rowIndex[i], data: data[i], row: rows[i], rowModel: rowModels[i] });
			} var sortingConditions = grid.settings.sorting.conditions; var sortingIterator = null; _.each(sortingConditions, function (condition, index, list) {
				var columnName = condition.columnName; var type = condition.type; var compare = null; var compareNumberAsc = function (v1, v2) { return v1.data[columnName] - v2.data[columnName]; }; var compareNumberDesc = function (v1, v2) { return v2.data[columnName] - v1.data[columnName]; }; var compareStringAsc = function (v1, v2) {
					if (v1.data[columnName] > v2.data[columnName]) {
						return 1;
					}
					else {
						if (v1.data[columnName] < v2.data[columnName]) {
							return -1;
						}
						else {
							return 0;
						}
					}
				}; var compareStringDesc = function (v1, v2) {
					if (v2.data[columnName] > v1.data[columnName]) {
						return 1;
					}
					else {
						if (v2.data[columnName] < v1.data[columnName]) {
							return -1;
						}
						else {
							return 0;
						}
					}
				}; var compareStringNumberAsc = function (v1, v2) { return Number((v1.data[columnName] + "").replace(/\.|\,|%/g, "")) - Number((v2.data[columnName] + "").replace(/\.|\,|%/g, "")); }; var compareStringNumberDesc = function (v1, v2) { return Number((v2.data[columnName] + "").replace(/\.|\,|%/g, "")) - Number((v1.data[columnName] + "").replace(/\.|\,|%/g, "")); }; var firstData = zipped[0].data[columnName]; var firstDataType = typeof firstData; if (!_.isNumber(firstData) && !_.isNaN(Number((firstData + "").replace(/\.|\,|%/g, "")))) {
					firstDataType = "stringNumber";
				} if (!_.isNaN(Number(firstData))) {
					firstDataType = "number";
				} var columnModelDefinedSortType = getColumn(grid, columnName).sortType; if (columnModelDefinedSortType !== null) {
					if (columnModelDefinedSortType === "number") {
						firstDataType = "stringNumber";
					}
				} if (firstData === "") {
					firstDataType = "string";
				} if (firstDataType == "number" && type == "asc") {
					compare = compareNumberAsc;
				}
				else {
					if (firstDataType == "number" && type == "desc") {
						compare = compareNumberDesc;
					}
					else {
						if (firstDataType == "string" && type == "asc") {
							compare = compareStringAsc;
						}
						else {
							if (firstDataType == "string" && type == "desc") {
								compare = compareStringDesc;
							}
							else {
								if (firstDataType == "stringNumber" && type == "asc") {
									compare = compareStringNumberAsc;
								}
								else {
									if (firstDataType == "stringNumber" && type == "desc") {
										compare = compareStringNumberDesc;
									}
								}
							}
						}
					}
				} sortingIterator = getComparator(sortingIterator, compare);
			}); sortingIterator = getComparator(sortingIterator, function (v1, v2) { return v1.rowIndex - v2.rowIndex; }); var sortedZip = zipped.sort(sortingIterator); for (var i = 0, end = sortedZip.length; i < end; i++) {
				grid.rowIndex[i] = sortedZip[i].rowIndex;
				grid.data[i] = sortedZip[i].data;
				grid.rows[i] = sortedZip[i].row;
				grid.settings.rows[i] = sortedZip[i].rowModel;
			} var newNowRendering = []; rows = grid.rows; rowModels = grid.settings.rows; _.each(rowModels, function (rowModel, index, list) {
				if (rowModel.visibility === true) {
					newNowRendering.push(rows[index]);
				}
			}); grid.settings.nowRendering = newNowRendering;
		}
		function filterColumn(grid, columnName, keyword) {
			var conditions = grid.settings.filtering.conditions; conditions[columnName] = keyword; var data = grid.data; var rows = grid.rows; var rowModels = grid.settings.rows; var newNowRendering = []; if (_.size(conditions) === 1 && _.keys(conditions)[0] === "null") {
				_.each(data, function (oneData, index, list) {
					var value = ""; _.each(oneData, function (oneValue, key, map) { value += " " + oneValue; }); if (value.indexOf(keyword) != -1) {
						newNowRendering.push(rows[index]);
						rowModels[index].visibility = true;
					}
					else {
						rowModels[index].visibility = false;
					}
				});
			}
			else {
				var keysWillPickUp = [];
				_.each(conditions, function (condition, key, map) {
					if (key !== null) {
						keysWillPickUp.push(key);
					}
				});
				_.each(data, function (oneData, index, list) {
					var valid = true; _.each(keysWillPickUp, function (key, index, list) {
						if ((oneData[key] + "").indexOf(conditions[key]) < 0) {
							valid = false;
						}
					}); if (valid === true) {
						newNowRendering.push(rows[index]);
						rowModels[index].visibility = true;
					}
					else {
						rowModels[index].visibility = false;
					}
				});
			} grid.settings.nowRendering = newNowRendering; clearRows(grid); scrollTop(grid, 0); renderRowsByCachedRows(grid);
		}
		function getColumnNodes(grid, columnName) {
			var rows = grid.rows; var columnNodes = []; for (var i = 0, end = rows.length; i < end; i++) {
				var cell = $(rows[i]).find("[data-name=" + columnName + "]")[0];
				columnNodes.push(cell);
			} return columnNodes;
		}
		function makeSortingUI(grid) {
			var columns = grid.settings.columns; _.each(columns, function (column, index, list) {
				if (column.childColumns.length < 2 && column.name !== "CI_GRID_CHECKBOX_CONTAINER" && column.colspan === 1 && column.sortable) {
					var sorter = $('<a href="#"/>').addClass(GRID_CLASS.FUNCTIONAL.SORTING.SORTER).addClass(GRID_CLASS.FUNCTIONAL.SORTING.NONE).attr("title", grid.settings.option.sortingMessage.none);
					sorter.on("click", function (e) { e.preventDefault(); e.stopPropagation(); });
					sorter.html("&#8597;");
					column.sorter = sorter[0];
					$(column.micelinous).append(sorter);
				}
			}); bindSortingEvent(grid);
		}
		function scrollToColumn(grid, column) { var left = column.originalOffsetLeft; var fixedWidth = getFixedWidth(grid); scrollLeft(grid, left - fixedWidth); }
		function bindSortingEvent(grid) {
			var columns = grid.settings.columns; var havingSorterColumns = _.filter(columns, function (column) { return column.sorter !== null; }); _.each(havingSorterColumns, function (column, index) {
				var $sorter = $(column.sorter); $sorter.on("click", function (e) {
					e.stopPropagation(); if (grid.data.length === 0) {
						return;
					} var multi = false; if (e.shiftKey) {
						multi = true;
					}
					else {
						resetSorterUi(grid, $sorter);
					} var sortedType = column.sortedType; var sortKey = column.bind; if (sortedType == "none") {
						$sorter.removeClass(GRID_CLASS.FUNCTIONAL.SORTING.NONE);
						$sorter.addClass(GRID_CLASS.FUNCTIONAL.SORTING.DESC);
						$sorter.html("&#8595");
						sortColumn(grid, sortKey, "desc", multi);
						column.sortedType = "desc";
					}
					else {
						if (sortedType == "desc") {
							$sorter.removeClass(GRID_CLASS.FUNCTIONAL.SORTING.DESC);
							$sorter.addClass(GRID_CLASS.FUNCTIONAL.SORTING.ASC);
							$sorter.html("&#8593");
							sortColumn(grid, sortKey, "asc", multi);
							column.sortedType = "asc";
						}
						else {
							if (sortedType == "asc") {
								$sorter.removeClass(GRID_CLASS.FUNCTIONAL.SORTING.ASC);
								$sorter.addClass(GRID_CLASS.FUNCTIONAL.SORTING.DESC);
								$sorter.html("&#8595");
								sortColumn(grid, sortKey, "desc", multi);
								column.sortedType = "desc";
							}
						}
					}
				});
			});
		}
		function unBindSortingEvent(grid) {
			var columns = grid.settings.columns; _.each(columns, function (column, index, list) {
				var sorter = column.sorter; if (sorter !== null) {
					var $sorter = $(sorter);
					$sorter.off("click");
				}
			});
		}
		function resetSorterUi(grid, excludedSorter) {
			var columns = grid.settings.columns; _.each(columns, function (column, index, list) {
				var sorter = column.sorter; if (sorter !== null) {
					var $sorter = $(sorter);
					if (!$sorter.is(excludedSorter)) {
						$sorter.removeClass(GRID_CLASS.FUNCTIONAL.SORTING.DESC);
						$sorter.removeClass(GRID_CLASS.FUNCTIONAL.SORTING.ASC);
						$sorter.addClass(GRID_CLASS.FUNCTIONAL.SORTING.NONE);
						column.sortedType = "none";
						$sorter.html("&#8597");
					}
				}
			});
		}
		function reRenderHeaderAndBody(grid) { clearRows(grid); grid.rows = []; grid.rowIndex = []; grid.settings.rows = []; var tmpData = grid.data.splice(0, grid.data.length); renderHeader(grid); cachingRows(grid, tmpData); renderRowsByCachedRows(grid); }
		function getColumnNames(grid) { var columns = grid.settings.columns; var columnNameArray = []; _.each(columns, function (column, index, list) { columnNameArray.push(column.name); }); return columnNameArray; }
		function getColumnIndex(grid, columnName) {
			var columns = grid.settings.columns; var columnsLength = columns.length; var columnIndex = -1; for (var i = 0; i < columnsLength; i++) {
				if (columns[i].name === columnName) {
					columnIndex = i;
					break;
				}
			} return columnIndex;
		}
		function swapDom(targetDom, newDom) { var t = targetDom.parentNode.insertBefore(document.createTextNode(""), targetDom); newDom.parentNode.insertBefore(targetDom, newDom); t.parentNode.insertBefore(newDom, t); t.parentNode.removeChild(t); }
		function swapTemplates(grid, columnName, anotherColumnName) {
			var columns = grid.settings.columns; var targetColumnIdx = getColumnIndex(grid, columnName); var newColumnIdx = getColumnIndex(grid, anotherColumnName); if (targetColumnIdx === -1 || newColumnIdx === -1) {
				return false;
			} if (targetColumnIdx === anotherColumnName) {
				return true;
			} var tempColumn = columns[targetColumnIdx]; columns[targetColumnIdx] = columns[newColumnIdx]; columns[newColumnIdx] = tempColumn; var headerTemplate = grid.settings.template.thead; var targetHeaderDom = getjQueryElementByName(headerTemplate, columnName); var newHeaderDom = getjQueryElementByName(headerTemplate, anotherColumnName); swapDom(targetHeaderDom[0], newHeaderDom[0]); var bodyTemplate = grid.settings.template.tbody; var targetRowDom = getjQueryElementByName(bodyTemplate, columnName); var newRowDom = getjQueryElementByName(bodyTemplate, anotherColumnName); swapDom(targetRowDom[0], newRowDom[0]); return true;
		}
		function groupColumns(grid, groups) {
			if (groups) {
				grid.settings.grouping.groups = groups;
			}
			else {
				groups = grid.settings.grouping.groups;
			} var columns = grid.settings.columns; _.each(columns, function (column, index, list) { column.grouping.groupNumber = null; column.grouping.indexInGroup = null; column.grouping.groupMemberCount = null; column.grouping.nextMemberColumn = null; }); _.each(groups, function (group, index, list) {
				var groupMemberCount = group.length; var memberColumns = []; _.each(group, function (columnName) { var column = getColumn(grid, columnName); memberColumns.push(column); }); if (groupMemberCount > 1) {
					_.each(memberColumns, function (column, memberIdx, columnList) {
						var groupingIndicator = $("<span>").addClass(GRID_CLASS.FUNCTIONAL.GROUPING_INDI); var groupigHelpMessage = "이 컬럼은 그룹화 되어 있습니다.\n그룹화 되어있는 다른 컬럼을 보시려면 클릭하세요."; groupingIndicator.attr("title", groupigHelpMessage); groupingIndicator.html("&#9776;"); $(column.micelinous).prepend(groupingIndicator); column.grouping.groupNumber = index; column.grouping.indexInGroup = memberIdx; column.grouping.groupMemberCount = groupMemberCount; var nextMemberIndex = memberIdx + 1; if (nextMemberIndex === groupMemberCount) {
							nextMemberIndex = 0;
						} column.grouping.nextMemberColumn = memberColumns[nextMemberIndex]; if (memberIdx !== 0) {
							column.visibility = "hidden";
							setChildColumnVisibility(column, "hidden");
						} $(column.header).on("click.groupRotate", function () { setColumnVisibility(grid, column, "visualyHidden"); setColumnVisibility(grid, column.grouping.nextMemberColumn, true); });
					});
				}
			}); reLayoutHeader(grid);
		}
		function setChildColumnVisibility(column, visibilityString) {
			var childColumns = column.childColumns;
			_.each(childColumns, function (childColumn) {
			childColumn.visibility = visibilityString; if (childColumn.childColumns.length > 0) {
				setChildColumnVisibility(childColumn, visibilityString);
			}
			});
		}
		function setColumnVisibility(grid, column, visibility) {
			var visibilityString = null; if (typeof visibility === "string") {
				visibilityString = visibility;
			}
			else {
				if (visibility === true) {
					visibilityString = "visible";
				}
				else {
					visibilityString = "hidden";
				}
			} column.visibility = visibilityString; setChildColumnVisibility(column, visibilityString); renderColumnWidth(grid, true); renderScrollInnerWidth(grid); renderHeaderScrollerWidth(grid); grid.event.trigger(EVENT.COLUMN_RESIZED, [grid, column]);
		}
		function resize(grid) {
		grid.lastViewIndex = -1; grid.markup.functional.freezeScroller.scrollLeft = 0; renderGridHeightAndWidth(grid); reLayoutHeader(grid); var freezeScrollerInner = $(grid.markup.functional.freezeScrollerInner); var bodyScrollerInner = $(grid.markup.main.body.inner); freezeScrollerInner.height(bodyScrollerInner.height()); if (grid.settings.option.niceScroll) {
			$(grid.markup.functional.freezeScroller).getNiceScroll().resize();
		} if (grid.settings.mobile) {
			unBindTouchScrollEvent(grid, grid.markup.main.body.scroller);
			bindXYTouchScrollEvent(grid);
		}
		}
		function renderBackgroundTable(grid) {
			var bodyInner = $(grid.markup.main.body.inner); var backgroundTable = bodyInner.find("[data-background-table]"); if (backgroundTable.length > 0) {
				backgroundTable.remove();
			} var bodyTable = $(grid.markup.main.body.table); backgroundTable = bodyTable.clone(); var backgroundTableBody = backgroundTable.find("tbody"); backgroundTableBody.children().remove(); backgroundTable.removeAttr("style"); backgroundTable.attr("data-background-table", ""); backgroundTable.css({ position: "absolute", "z-index": 0, top: 0 }); bodyInner.append(backgroundTable); var scroller = $(grid.markup.main.body.scroller); var scrollerHeight = $(scroller).height(); var numberOfTr = Math.ceil(scrollerHeight / getTrHeight(grid)); var mainRow = grid.settings.template.mainRow; var mainRowClone = mainRow.clone(); mainRowClone.find("th, td").html("&nbsp;"); for (var i = 0; i < numberOfTr; i++) {
				var backgroundRow = mainRowClone.clone();
				if (i % 2 === 0) {
					backgroundRow.addClass(GRID_CLASS.STYLE.EVEN);
				}
				else {
					backgroundRow.addClass(GRID_CLASS.STYLE.ODD);
				}
				backgroundTableBody.append(backgroundRow);
			}
		}
		function setMsg(grid, option) {
			$(grid.markup.area).find(".msgBoxBgDefault").remove(); $(grid.markup.area).find(".msgBoxDefault").remove(); if (!option) {
				option = {};
			} var msgBoxBg = $('<div class="msgBoxBgDefault"></div>'); var msgBox = $('<div class="msgBoxDefault"><p class="msgPDefault">No data</p></div>'); if (option.msgBoxClassName) {
				msgBox.addClass(option.msgBoxClassName);
			} if (option.msgClassName) {
				msgBox.find("p.msgPDefault").addClass(option.msgClassName);
			} if (option.msgTextValue || option.msgTextValue === "") {
				msgBox.find(".msgPDefault").text(option.msgTextValue);
			} $(grid.markup.area).append(msgBoxBg); $(grid.markup.area).append(msgBox);
		}
		function removeMsg(grid) { $(grid.markup.area).find(".msgBoxBgDefault").remove(); $(grid.markup.area).find(".msgBoxDefault").remove(); }
		function addRows(grid, row, appendOrPrepend, appendOrPrependIndex) {
			nothingTrAppend(grid, row); grid.event.trigger(EVENT.BEFORE_APPENDING_ROW, [row]); var rowType = checkInsertedRowType(row); var dataModel = null; if (rowType === "Invalid") {
				return "Do nothing because of Empty Row or Invalid Row Type";
			}
			else {
				if (rowType === "ao") {
					dataModel = row;
				}
				else {
					if (rowType === "aa") {
						dataModel = getDataModelFromArray(grid, row);
					}
					else {
						if (rowType === "dom") {
							dataModel = getDataModelFromDom(grid, row);
						}
					}
				}
			} var boosted = grid.settings.option.boostLoad; var sliceLength = grid.settings.option.numberOfBoostLoadRow; if (boosted && dataModel.length > sliceLength) {
				var sliceCount = Math.ceil(dataModel.length / sliceLength);
				var currentSliced = 1;
				grid.event.on(EVENT.ROW_CACHED + ".DEFERED", function (e, grid) {
					if (currentSliced < sliceCount) {
						setTimeout(function () { currentSliced++; var slicedDataModel = dataModel.splice(0, sliceLength); cachingRows(grid, slicedDataModel, appendOrPrepend, appendOrPrependIndex); makeVirtualScroll(grid); }, 10);
					}
					else {
						grid.event.off(EVENT.ROW_CACHED + ".DEFERED");
						grid.event.trigger(EVENT.ROW_APPENDED, [grid]);
					}
				});
				var slicedDataModel = dataModel.splice(0, sliceLength);
				cachingAndRenderRows(grid, slicedDataModel, appendOrPrepend, appendOrPrependIndex);
			}
			else {
				cachingAndRenderRows(grid, dataModel, appendOrPrepend, appendOrPrependIndex);
			} grid.event.trigger(EVENT.ROW_APPENDED, [grid]);
		}
		function cachingAndRenderRows(grid, dataModel, appendOrPrepend, appendOrPrependIndex) { cachingRows(grid, dataModel, appendOrPrepend, appendOrPrependIndex); renderRowsByCachedRows(grid); }
		function scrollTop(grid, position) {
			var freezeScroller = $(grid.markup.functional.freezeScroller); if (_.isUndefined(position)) {
				return freezeScroller.scrollTop();
			} freezeScroller.scrollTop(position);
		}
		function scrollLeft(grid, position) {
			var freezeScroller = $(grid.markup.functional.freezeScroller); if (_.isUndefined(position)) {
				return freezeScroller.scrollLeft();
			} freezeScroller.scrollLeft(position);
		}
		function getRealIndex(grid, index) { return _.indexOf(grid.rowIndex, index); }
		function setFixedToAllChildrenColumn(column) {
			if (column.childColumns.length > 0) {
				_.each(column.childColumns, function (child) { child.fixed = true; setFixedToAllChildrenColumn(child); });
			}
			else {
				return;
			}
		}
		function addApis(grid) {
		grid.getColumnNames = function () { return getColumnNames(grid); }; grid.on = function (eventName, callback) { grid.event.on(eventName, callback); }; grid.setColumnWidth = function (columnName, width) { _.each(grid.settings.columns, function (column) { column.displayingWidth = column.width; }); var column = getColumn(grid, columnName); column.displayingWidth = width; renderColumnWidth(grid, true); renderScrollInnerWidth(grid); renderHeaderScrollerWidth(grid); grid.event.trigger(EVENT.COLUMN_RESIZED, [grid, column]); }; grid.setColumnVisibility = function (columnName, visibility) {
			if (typeof columnName == "string") {
				var column = getColumn(grid, columnName);
				setColumnVisibility(grid, column, visibility);
			}
			else {
				if (_.isArray(columnName)) {
					for (var i = 0, ic = columnName.length; i < ic; i++) {
						var column = getColumn(grid, columnName[i]);
						setColumnVisibility(grid, column, visibility);
					}
				}
			}
		}; grid.setFixedColumn = function (idx) {
			var columns = grid.settings.columns; var columnLength = columns.length; var fixedColumns = []; for (var i = 0; i < columnLength; i++) {
				if (i <= idx) {
					columns[i].fixed = true;
					fixedColumns.push(columns[i]);
				}
				else {
					columns[i].fixed = false;
				}
			} _.each(fixedColumns, function (fixedColumn) { setFixedToAllChildrenColumn(fixedColumn); }); renderFixedLayout(grid); renderColumnResizer(grid); renderFreezeScrollerInnerWidth(grid); return "0~" + idx + " columns are successfully fixed.";
		}; grid.destroyFixedColumn = function () { destroyFixedLayout(grid); return "Fixed columns are destroyed successfully."; }; grid.appendRow = function (row, index) { addRows(grid, row, "append", index); }; grid.setMsg = function (option) { setMsg(grid, option); }; grid.removeMsg = function () { removeMsg(grid); }; grid.prependRow = function (row, index) { addRows(grid, row, "prepend", index); }; grid.removeRow = function (rowOrStart, end) {
			grid.markup.main.body.table.style.top = 0; if (rowOrStart === false) {
				clearRows(grid);
			} if (_.isUndefined(rowOrStart)) {
				var rowCount = grid.data.length;
				clearRows(grid, true);
				if (grid.settings.usePaging) {
					grid.settings.paging.currentPageIndex = 0;
					grid.settings.paging.startPageListIndex = 0;
					grid.renderingPage(0);
				}
				return "All " + rowCount + " rows and data are both removed.";
			}
			else {
				if (_.isNumber(rowOrStart) && _.isUndefined(end)) {
					clearRows(grid, rowOrStart);
				}
				else {
					if (_.isNumber(rowOrStart) && _.isNumber(end)) {
						clearRows(grid, rowOrStart, end);
					}
				}
			}
		}; grid.getColumn = function (columnName) { var columnNodes = getColumnNodes(grid, columnName); return columnNodes; }; grid.getColumnData = function (columnName) {
			var data = grid.data; var array = []; for (var i = 0, end = data.length; i < end; i++) {
				array.push(data[i][columnName]);
			} return array;
		}; grid.getColumnInfo = function (columnName) { return getColumn(grid, columnName); }; grid.getRow = function (start, end) {
			if (_.isUndefined(start)) {
				return grid.rows;
			} if (_.isNumber(start) && _.isUndefined(end)) {
				return grid.rows[start];
			} if (_.isNumber(start) && _.isNumber(end)) {
				return grid.rows.slice(start, end);
			}
		}; grid.getData = function (start, end) {
			if (_.isUndefined(start)) {
				return grid.data;
			} if (_.isNumber(start) && _.isUndefined(end)) {
				return grid.data[start];
			} if (_.isNumber(start) && _.isNumber(end)) {
				return grid.data.slice(start, end);
			}
		}; grid.selectRow = function (param) {
			var paramType = checkParamType(param); if (paramType === "unValid") {
				return;
			} var rowModels = grid.settings.rows, gridRows = grid.rows; var indexArray = [], indexCount = 0; var visibleRowsArray = _.filter(rowModels, function (rowObject) {
				if (rowObject.visibility) {
					indexArray.push(indexCount);
					indexCount++;
					return rowObject.visibility;
				}
				else {
					indexCount++;
				}
			}); if (!_.isArray(param)) {
				param = [param];
			} if (paramType === "number") {
				for (var i = 0, end = param.length; i < end; i++) {
					var rowIndex = param[i];
					visibleRowsArray[rowIndex].selected = true;
					$(gridRows[indexArray[rowIndex]]).removeClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED).addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
				}
			}
			else {
				$.each(param, function (idx, value) {
					var rowIndex = $(gridRows).index(value); for (var i = 0, end = visibleRowsArray.length; i < end; i++) {
						if (indexArray[i] === rowIndex) {
							rowIndex = i;
							break;
						}
					} visibleRowsArray[rowIndex].checked = true; $(gridRows[indexArray[rowIndex]]).removeClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED).addClass(GRID_CLASS.FUNCTIONAL.ROW_SELECTED);
				});
			} return "Completed " + param + " Selected.";
		}; grid.getSelectedRow = function () {
			var array = []; var rows = grid.rows, rowModels = grid.settings.rows; for (var i = 0, end = rowModels.length; i < end; i++) {
				if (rowModels[i].selected) {
					var row = rows[getRealIndex(grid, i)];
					array.push(row);
				}
			} return array;
		}; grid.getSelectedRowData = function () {
			var data = grid.data, rowModels = grid.settings.rows; var array = []; for (var i = 0, end = rowModels.length; i < end; i++) {
				if (rowModels[i].selected) {
					array.push(data[getRealIndex(grid, i)]);
				}
			} return array;
		}; grid.checkRow = function (param) {
			var paramType = checkParamType(param); if (paramType === "unValid") {
				return;
			} var rowModels = grid.settings.rows, gridRows = grid.rows; var indexArray = [], indexCount = 0; var columns = getColumnNodes(grid, "CI_GRID_CHECKBOX_CONTAINER"); var visibleRowsArray = _.filter(rowModels, function (rowObject) {
				if (rowObject.visibility) {
					indexArray.push(indexCount);
					indexCount++;
					return rowObject.visibility;
				}
				else {
					indexCount++;
				}
			}); if (!_.isArray(param)) {
				param = [param];
			} if (paramType === "number") {
				for (var i = 0, end = param.length; i < end; i++) {
					var column = columns[param[i]];
					$(column).find('[name="CI_GRID_CHECKBOX"]').prop("checked", true);
					visibleRowsArray[param[i]].checked = true;
				}
			}
			else {
				var checkbox = $(param).find('[name="CI_GRID_CHECKBOX"]');
				checkbox.prop("checked", true);
				$.each(param, function (idx, value) {
					var rowIndex = $(gridRows).index(value); for (var i = 0, end = visibleRowsArray.length; i < end; i++) {
						if (indexArray[i] === rowIndex) {
							rowIndex = i;
							break;
						}
					} visibleRowsArray[rowIndex].checked = true;
				});
			} return "Completed " + param + " Checked.";
		}; grid.getCheckedRow = function () {
			var array = []; var rows = grid.rows, rowModels = grid.settings.rows; for (var i = 0, end = rowModels.length; i < end; i++) {
				if (rowModels[i].checked) {
					var row = rows[i];
					array.push(row);
				}
			} return array;
		}; grid.getCheckedRowData = function () {
			var data = grid.data, rowModels = grid.settings.rows; var array = []; for (var i = 0, end = rowModels.length; i < end; i++) {
				if (rowModels[i].checked) {
					array.push(data[i]);
				}
			} return array;
		}; grid.sortColumn = function (columnName, type) {
			if (typeof columnName === "string") {
				if (!type) {
					type = "desc";
				}
				if (type === "desc" || type === "asc") {
					sortColumn(grid, getColumn(grid, columnName).bind, type);
				}
				else {
					return "Invalid sorted type. We do nothing.";
				}
			}
			else {
				var isFirst = false;
				_.each(columnName, function (value, key) { var column = getColumn(grid, key); column.sortedType = value === "desc" ? "asc" : "desc"; var shiftClick = jQuery.Event("click"); shiftClick.shiftKey = isFirst; $(column.sorter).trigger(shiftClick); isFirst = true; });
			}
		}; grid.search = function (keyword) {
			if (keyword === "" || _.isUndefined(keyword)) {
				grid.resetFiltering();
			}
			else {
				if (typeof keyword == "string") {
					filterColumn(grid, null, keyword);
				}
				else {
					return "Invalid search type. Grid do nothing.";
				}
			}
		}; grid.filterColumn = function (dataName, keyword) { filterColumn(grid, dataName, keyword); }; grid.resetFiltering = function () { grid.settings.nowRendering = grid.rows; grid.settings.filtering.conditions = {}; var rowModels = grid.settings.rows; _.each(rowModels, function (rowModel, index, list) { rowModel.visibility = true; }); renderRowsByCachedRows(grid); }; grid.renderRows = function () {
			var rows = grid.rows; var rowModels = grid.settings.rows; var newNowRendering = []; _.each(rowModels, function (rowModel, index, list) {
				if (rowModel.visibility === true) {
					newNowRendering.push(rows[index]);
				}
			}); grid.settings.nowRendering = newNowRendering; renderRowsByCachedRows(grid);
		}; grid.setGridHeight = function (height) {
			if (!height || !_.isNumber(height)) {
				return "Wrong argument. Grid do nothing.";
			} renderGridHeightAndWidth(grid, height, null); renderRowsByCachedRows(grid);
		}; grid.setGridWidth = function (width) { setGridWidth(grid, width); }; grid.renderingPage = function (idx) {
			var countPerPage = grid.settings.paging.countPerPage; var startIndex = idx * countPerPage; var endIndex = startIndex + (countPerPage - 1); grid.settings.paging.currentPageIndex = idx; grid.settings.defferedRendering.renderingStartRowIndex = startIndex; grid.settings.defferedRendering.renderingEndRowIndex = endIndex; if (!grid.settings.option.paging.animate) {
				renderRowsByCachedRows(grid);
			}
			else {
				if (grid.settings.option.paging.animate == "basic") {
					renderRowsByCachedRows(grid);
					slidePageAnimation(grid);
				}
				else {
					if (grid.settings.option.paging.animate == "3D") {
						$(".BEFORE-BODY-WRAPPER").remove();
						var bodyWrapper = $(grid.markup.main.body.wrapper);
						bodyWrapper.removeClass().addClass("CI-GRID-BODY-WRAPPER");
						grid.beforeBodyWrapper = bodyWrapper.clone().addClass("BEFORE-BODY-WRAPPER");
						renderRowsByCachedRows(grid);
						cubePageAnimation(grid);
					}
				}
			}
		}; grid.makePageList = function () { grid.settings.paging.usingMarkUp = true; setPageList(grid); }; grid.setPageLayout = function (option) {
			if (option) {
				grid.settings.option.paging = option;
				setPageLayout(grid);
			}
		}; grid.destroy = function () {
			if (grid.settings.option.niceScroll) {
				$(grid.markup.functional.freezeScroller).getNiceScroll().remove();
			} grid.data = null; grid.rows = null; grid.rowIndex = null; grid.markup.area.grid = null; $(grid.markup.area).remove(); grid = null;
		}; grid.resize = function () { resize(grid); }; grid.releaseScroll = function (direction) {
			if (direction != "horizontal") {
				grid.settings.option.virtualScrollUsable = false;
			} if (direction != "vertical" && direction != "horizontal") {
				destroyFixedLayout(grid);
			} grid.settings.defferedRendering.renderingStartRowIndex = 0; grid.settings.defferedRendering.renderingEndRowIndex = grid.settings.nowRendering.length - 1; renderRowsByCachedRows(grid, true); if (direction === "vertical") {
				$(grid.markup.functional.freezeScroller).css({ height: "auto", "overflow-y": "hidden" });
				$(grid.markup.design.border.right).remove();
				$(grid.markup.design.border.bottom).remove();
				$(grid.markup.design.rect.rightTop).remove();
				$(grid.markup.wrapper).css("padding-right", 0);
				$(grid.markup.main.header.scroller).css("width", "auto");
				$(grid.markup.main.header.inner).css("width", "auto");
				$(grid.markup.main.body.scroller).css("height", "auto");
				$(grid.markup.main.body.inner).css({ width: "auto", height: "auto" });
			}
			else {
				if (direction === "horizontal") {
					$(grid.markup.area).width(grid.settings.scrollerInnerWidth);
					$(grid.markup.design.border.bottom).remove();
					$(grid.markup.wrapper).css("padding-bottom", 0);
					$(grid.markup.main.header.scroller).css("width", "auto");
					$(grid.markup.main.header.inner).css("width", "auto");
					$(grid.markup.main.body.inner).css("width", "auto");
					$(grid.markup.area).css("width", "auto");
				}
				else {
					$(grid.markup.area).width(grid.settings.scrollerInnerWidth);
					$(grid.markup.design.border.right).remove();
					$(grid.markup.design.border.bottom).remove();
					$(grid.markup.design.rect.rightTop).remove();
					$(grid.markup.wrapper).css("padding", 0);
					$(grid.markup.main.header.scroller).css("width", "auto");
					$(grid.markup.main.header.inner).css("width", "auto");
					$(grid.markup.main.body.scroller).css("height", "auto");
					$(grid.markup.main.body.inner).css({ width: "auto", height: "auto" });
					$(grid.markup.area).css("width", "auto");
				}
			} var allAuto = true; _.each(grid.settings.columns, function (column, index, list) {
				if (column.displayingWidth !== "*") {
					allAuto = false;
				}
			}); var reRenderColumnWidth = false; _.each(grid.settings.columns, function (column, index, list) {
				if (column.displayingWidth == "*" && !allAuto) {
					$(column.header).css({ width: "auto", "min-width": "auto", "max-width": "none" });
					$(column.copiedHeader).css({ width: "auto", "min-width": "auto", "max-width": "none" });
					reRenderColumnWidth = true;
				}
				else {
					if (column.displayingWidth.indexOf("px") > -1) {
						var maxWidth = $(column.header).css("max-width");
						$(column.header).css({ width: maxWidth, "max-width": maxWidth, "min-width": maxWidth });
						$(column.copiedHeader).css({ width: maxWidth, "max-width": maxWidth, "min-width": maxWidth });
					}
					else {
						reRenderColumnWidth = true;
					}
				} if (column.visibility == "hidden") {
					$(column.header).css({ width: 0, "max-width": 0 }).addClass(GRID_CLASS.STYLE.CELL_DISPLAY_NONE);
					$(column.copiedHeader).css({ width: 0 });
				}
			}); if (direction !== "horizontal") {
				grid.settings.option.height = "auto";
			} if (reRenderColumnWidth) {
				renderColumnWidth(grid);
			} $(grid.markup.main.body.scroller).off("mousewheel.y"); $(grid.markup.area).find("." + GRID_CLASS.FUNCTIONAL.FOCUS_ESCAPER).remove(); $(grid.markup.area).off(); $(grid.markup.main.body.table).off("keydown", ":tabbable"); $(window).trigger("resize.grid");
		}; grid.setColumnLabel = function (columnName, newLabel) { var column = getColumn(grid, columnName); column.label = newLabel; var header = column.header; var title = $(header).find("." + GRID_CLASS.FUNCTIONAL.HEADER.TITLE); title.text(newLabel); var copiedHeader = column.copiedHeader; var copiedTitle = $(copiedHeader); copiedTitle.text(newLabel); }; grid.getColumnLabel = function (columnName) { var column = getColumn(grid, columnName); return column.label; }; grid.swapColumn = function (columnName, anotherColumnName) {
			var success = swapTemplates(grid, columnName, anotherColumnName); if (success) {
				setRowTemplates(grid);
				reRenderHeaderAndBody(grid);
			}
			else {
				return columnName + "또는 " + anotherColumnName + "이라는 컬럼이 없습니다.";
			}
		}; grid.setColumnOrder = function (columnNameArray) {
			var columns = grid.settings.columns; var success = true; _.each(columnNameArray, function (columnName, index, list) {
				var targetColumnName = columns[index].name; var flag = swapTemplates(grid, targetColumnName, columnName); if (flag === false) {
					success = false;
				}
			}); if (success) {
				setRowTemplates(grid);
				reRenderHeaderAndBody(grid);
			}
			else {
				return "올바른 컬럼이름들이 담긴 배열을 넣어주세요.";
			}
		}; grid.groupColumns = function (group) { groupColumns(grid, group); }; grid.swapRow = function (movingRowIdx, targetRowIdx) { var tempTargetRow = grid.data[targetRowIdx]; grid.data[targetRowIdx] = grid.data[movingRowIdx]; grid.data[movingRowIdx] = tempTargetRow; var tempRowModel = grid.settings.rows[targetRowIdx]; grid.settings.rows[targetRowIdx] = grid.settings.rows[movingRowIdx]; grid.settings.rows[movingRowIdx] = tempRowModel; var tempRendering = grid.settings.nowRendering[targetRowIdx]; grid.settings.nowRendering[targetRowIdx] = grid.settings.nowRendering[movingRowIdx]; grid.settings.nowRendering[movingRowIdx] = tempRendering; renderRowsByCachedRows(grid); }; grid.rerender = function () { reRenderHeaderAndBody(grid); }; grid.scrollTop = function (position) { return scrollTop(grid, position); }; grid.scrollLeft = function (position) { return scrollLeft(grid, position); }; grid.updateNode = function (rowkey, nodes) { var tr = $(grid.settings.rowByKey[rowkey]); _.each(nodes, function (node, nodeKey) { var td = tr.find("[data-name=" + nodeKey + "]"); td.html(node); }); }; grid.updateData = function (rowKey, data) {
			var rowData = grid.settings.dataByKey[rowKey]; _.extend(rowData, data); if (grid.settings.option.updateCallback) {
				grid.event.trigger(EVENT.UPDATED, [rowKey, data, rowData]);
			}
		}; grid.setRowVisibility = function (index, showOrHide) {
			var rowModels = grid.settings.rows; var rowModel = null; if (_.isArray(index)) {
				_.each(index, function (i) { rowModel = rowModels[i]; rowModel.visibility = showOrHide; });
				clearRows(grid, false);
				grid.renderRows();
			}
			else {
				if (_.isNumber(index)) {
					rowModel = rowModels[index];
					rowModel.visibility = showOrHide;
					clearRows(grid, false);
					grid.renderRows();
				}
				else {
					return "Error Please input valid row Index";
				}
			}
		}; grid.resetMobileScrollY = function () { var view = grid.markup.main.body.scroller; var freezeScroller = grid.markup.functional.freezeScroller; var freezeScrollerInner = grid.markup.functional.freezeScrollerInner; var defferedRendering = grid.settings.defferedRendering; defferedRendering.scrollMaxSizeY = parseInt(getComputedStyle(freezeScrollerInner).height, 10) - parseInt(getComputedStyle(view).height, 10); var indicator = $(grid.markup.wrapper).find(".CI-GRID-MOBILE-SCROLL-INDI-VERTICAL")[0]; var indicatorSize = parseInt(getComputedStyle(indicator).height, 10) + parseInt(getComputedStyle(indicator).marginTop, 10) + parseInt(getComputedStyle(indicator).marginBottom, 10); defferedRendering.scrollRelativeY = ((parseInt(getComputedStyle(freezeScroller).height, 10)) - indicatorSize) / defferedRendering.scrollMaxSizeY; };
		}
		function bindEvents(grid) {
			grid.event.on(EVENT.HEADER_RENDRED, function (e, grid) {
				setHeaderHeight(grid); renderGridHeightAndWidth(grid); renderColumnResizer(grid); getTrHeight(grid); if (grid.settings.option.sortable !== false) {
					makeSortingUI(grid);
				} if (checkFixedColumn(grid)) {
					renderFixedLayout(grid);
				}
			}); grid.event.on(EVENT.COLUMN_RESIZED, function (e, grid, column, distance) {
			grid.lastViewIndex = -1; renderColumnResizer(grid); renderGridHeightAndWidth(grid); if (grid.settings.option.niceScroll) {
				$(grid.markup.functional.freezeScroller).getNiceScroll().resize();
			}
			}); grid.event.on(EVENT.BEFORE_RENDER_DATA, function (e, grid) {
				if (grid.data.length > grid.settings.defferedRendering.limit && !grid.settings.usePaging) {
					if (grid.settings.option.height === "auto") {
						var virtualScrollDefaultHeight = grid.settings.option.virtualScrollDefaultHeight;
						renderGridHeightAndWidth(grid, virtualScrollDefaultHeight);
						grid.settings.option.height = virtualScrollDefaultHeight;
					}
					calculateShowingRowIndex(grid);
				}
				else {
					if (grid.settings.usePaging) {
						setTotalPageCount(grid);
						if (grid.settings.paging.usingMarkUp == true) {
							grid.makePageList();
						}
					}
				}
			}); grid.event.on(EVENT.ROW_RENDERED, function (e, row, data, index) { var rowRenderedCallbacks = grid.settings.option.callbacks.rowRendered; _.each(rowRenderedCallbacks, function (callback) { callback(row, data, index); }); }); grid.event.on(EVENT.RESIZED, function (e, grid, width, height) { if (grid.settings.option.background === true) { } }); grid.event.on(EVENT.WINDOW_RESIZED, function (e, grid) { });
		}
		function afterDataRendered(grid) {
			if (grid.data.length > grid.settings.defferedRendering.limit && !grid.settings.usePaging && grid.settings.option.virtualScrollUsable) {
				makeVirtualScroll(grid);
			}
			else {
				syncFreezeScrollerHeigthWithBodyScrollerHeight(grid);
			}
		}
		function setColumnsOriginalOffsetLeft(grid) { var columns = grid.settings.columns; _.each(columns, function (column) { var header = column.header; column.originalOffsetLeft = header.offsetLeft; }); }
		function makeAccessible(grid) {
			var gridBlured = true; var escaper = $('<a href="#">그리드에서 빠져나오시려면 ESC키를 눌러주세요.</a>'); escaper.addClass(GRID_CLASS.FUNCTIONAL.FOCUS_ESCAPER); var area = $(grid.markup.area); var escaperShowingTimer = null; function showEscaper(notAutoHide) { escaper.addClass(GRID_CLASS.FUNCTIONAL.FOCUS_ESCAPER_SHOWN); } escaper.on("click", function (e) { e.preventDefault(); }); escaper.on("blur", function (e) { clearInterval(escaperShowingTimer); escaper.removeClass(GRID_CLASS.FUNCTIONAL.FOCUS_ESCAPER_SHOWN); gridBlured = true; }); escaper.on("keydown", function (e) {
				var key = e.which; var shiftKey = e.shiftKey; if (key === 9 && shiftKey) {
					area.focus();
					setTimeout(function () { scrollTop(grid, 100000); scrollLeft(grid, 0); }, 0);
				}
			}); var freezeScroller = $(grid.markup.functional.freezeScroller); var delta = grid.settings.option.arrowSensibility; area.on("keydown", function (e) {
				var key = e.which; if (key === 27) {
					showEscaper(true);
					escaper.focus();
				} if (key < 37 || key > 40) {
					return;
				} var freezeScrollerLeft = freezeScroller.scrollLeft(); var freezeScrollerTop = freezeScroller.scrollTop(); if (key === 37) {
					freezeScroller.scrollLeft(freezeScrollerLeft - delta);
				}
				else {
					if (key === 38) {
						freezeScroller.scrollTop(freezeScrollerTop - delta);
					}
					else {
						if (key === 39) {
							freezeScroller.scrollLeft(freezeScrollerLeft + delta);
						}
						else {
							if (key === 40) {
								freezeScroller.scrollTop(freezeScrollerTop + delta);
							}
						}
					}
				}
			}); area.on("mousedown", function (e) {
				if (e.target.tagName === "INPUT" || e.target.tagName === "SELECT" || e.target.tagName === "BUTTON") { }
				else {
					e.preventDefault();
					area.data("clicked", true);
				} area.addClass("CI-GRID-CLICKED");
			}); area.on("mouseup", function (e) { area.data("clicked", false); }); area.on("focus", function (e) {
				gridBlured = false; if (area.data("clicked")) {
					return;
				}
				else {
					area.removeClass("CI-GRID-CLICKED");
				} showEscaper();
			}); area.append(escaper); var headerWrapper = $(grid.markup.main.header.wrapper); var headerScroller = $(grid.markup.main.header.scroller); if (checkFixedColumn(grid)) {
				headerScroller.on("scroll", function () { headerScroller.scrollLeft(0); });
			} var headerTabbable = []; setColumnsOriginalOffsetLeft(grid); var columns = grid.settings.columns; _.each(columns, function (column) {
				var header = $(column.header); var tabbable = header.find(":tabbable"); if (tabbable.length > 0) {
					tabbable.each(function (index) { headerTabbable.push({ tabbable: $(this), column: column }); });
				}
			}); _.each(headerTabbable, function (tabbableInfo, index) {
				var tabbable = tabbableInfo.tabbable; var column = tabbableInfo.column; tabbable.on("keydown", function (e) {
					var key = e.which; var shiftKey = e.shiftKey; if (key === 9 && !shiftKey) {
						var nextTabbableInfo = headerTabbable[index + 1];
						if (nextTabbableInfo) {
							e.preventDefault();
							scrollToColumn(grid, nextTabbableInfo.column);
							setTimeout(function () { nextTabbableInfo.tabbable.focus(); }, 0);
						}
					}
					else {
						if (key === 9 && shiftKey) {
							var previousTabbableInfo = headerTabbable[index - 1];
							if (previousTabbableInfo) {
								e.preventDefault();
								scrollToColumn(grid, previousTabbableInfo.column);
								setTimeout(function () { previousTabbableInfo.tabbable.focus(); }, 0);
							}
						}
					}
				});
			}); var lastHeaderTabbable = _.last(headerTabbable); if (lastHeaderTabbable) {
				lastHeaderTabbable.tabbable.on("keydown", function (e) {
					var key = e.which; var shiftKey = e.shiftKey; if (key === 9 && !shiftKey) {
						if (grid.markup.area.hasAttribute("tabindex")) {
							e.preventDefault();
						}
						scrollTop(grid, 0);
						scrollLeft(grid, 0);
						setTimeout(function () { var tbody = $(grid.markup.main.body.tbody); var firstTr = tbody.find(":first-child"); var tbodyTabbable = tbody.find(":tabbable"); tbodyTabbable.eq(0).focus(); }, 0);
						if (grid.data.length === 0) {
							showEscaper();
							escaper.focus();
						}
					}
				});
			} var bodyTable = $(grid.markup.main.body.table); var lastTime = new Date(); bodyTable.on("keydown", ":tabbable", function (e) {
				var tabbable = $(this); var key = e.which; var shiftKey = e.shiftKey; var upPress = key === 38; var downPress = key === 40; var shiftTabPress = key === 9 && shiftKey; var tabPress = key === 9 && !shiftKey; if (tabbable.is("tr")) {
					var nowTime = new Date();
					if (nowTime - lastTime < 50) {
						e.preventDefault();
						e.stopPropagation();
						return;
					}
					lastTime = nowTime;
					var childTabbable = tabbable.find(":tabbable");
					if (upPress || shiftTabPress) {
						var prevTr = tabbable.prev();
						if (prevTr.length > 0) {
							e.preventDefault();
							e.stopPropagation();
							var scrollTop = freezeScroller.scrollTop() - getTrHeight(grid);
							freezeScroller.scrollTop(scrollTop);
							setTimeout(function () { prevTr.focus(); }, 0);
						}
					}
					else {
						if (downPress || tabPress) {
							if (childTabbable.length > 0 && !downPress) {
								e.preventDefault();
								childTabbable.eq(0).focus();
								return;
							}
							var nextTr = tabbable.next();
							if (nextTr.length > 0) {
								e.preventDefault();
								e.stopPropagation();
								var scrollTop = freezeScroller.scrollTop() + getTrHeight(grid);
								freezeScroller.scrollTop(scrollTop);
								setTimeout(function () { nextTr.focus(); }, 0);
							}
						}
					}
				}
				else {
					if (shiftTabPress || tabPress) {
						var nowTime = new Date();
						if (nowTime - lastTime < 50) {
							e.preventDefault();
							e.stopPropagation();
							return;
						}
						lastTime = nowTime;
						e.stopPropagation();
						var tr = tabbable.closest("tr");
						var tabbableInTr = tr.find(":tabbable");
						var tabbableIndex = tabbableInTr.index(tabbable);
						if (shiftTabPress) {
							if (tabbableIndex > 0) {
								var prevTabbable = tabbableInTr.eq(tabbableIndex - 1);
								e.preventDefault();
								var prev = prevTabbable.closest("td, th");
								var bindName = prev.attr("data-name");
								var prevColumn = _.filter(columns, function (column) { return column.bind === bindName; });
								if (prevColumn.length === 0) {
									var name = prev.attr("name");
									prevColumn = _.filter(columns, function (column) { return column.name === name; });
								}
								scrollToColumn(grid, prevColumn[0]);
								setTimeout(function () { prevTabbable.focus(); }, 0);
							}
							else {
								var prevTr = tr.prev();
								if (prevTr.length > 0) {
									scrollLeft(grid, 0);
									var scrollTop = freezeScroller.scrollTop() - getTrHeight(grid);
									freezeScroller.scrollTop(scrollTop);
									setTimeout(function () { prevTr.focus(); }, 0);
								}
							}
						}
						else {
							if (tabPress) {
								var nextTabbable = tabbableInTr.eq(tabbableIndex + 1);
								if (nextTabbable.length > 0) {
									e.preventDefault();
									var next = nextTabbable.closest("td, th");
									var bindName = next.attr("data-name");
									var nextColumn = _.filter(columns, function (column) { return column.bind === bindName; });
									if (nextColumn.length === 0) {
										var name = next.attr("name");
										nextColumn = _.filter(columns, function (column) { return column.name === name; });
									}
									scrollToColumn(grid, nextColumn[0]);
									setTimeout(function () { nextTabbable.focus(); }, 0);
								}
								else {
									var nextTr = tr.next();
									if (nextTr.length > 0) {
										scrollLeft(grid, 0);
										var scrollTop = freezeScroller.scrollTop() + getTrHeight(grid);
										freezeScroller.scrollTop(scrollTop);
										setTimeout(function () { nextTr.focus(); }, 0);
									}
								}
							}
						}
					}
				}
			}); bodyTable.on("focus", ":tabbable", function (e) {
				if (gridBlured) { } var tabbable = $(this); if (tabbable.is("tr")) {
					return;
				}
			});
		}
		function nothingTrAppend(grid, row) {
			if (grid.markup.main.body.nothing != null) {
				$(grid.markup.main.body.nothing).remove();
			} if (row && row.length > 0 || grid.settings.option.nothingTr != true) {
				return;
			} var tr = $("<tr>"), td = $("<td>"); td.attr({ colspan: grid.settings.columns.length }).css({ "text-align": "center" }).text(grid.settings.option.nothingTrText); tr.append(td); grid.markup.main.body.nothing = tr[0]; $(grid.markup.main.body.tbody).append(grid.markup.main.body.nothing);
		}
		self.init = function (table, template, option) {
			if (!template) {
				template = table;
			} var grid = {}; grid.data = []; grid.rows = []; grid.rowIndex = []; grid.event = $({}); bindEvents(grid); setup(grid, table, template, option); renderLayout(grid); bindMarkupEvents(grid); addApis(grid); if (grid.settings.table.tbody !== null) {
				grid.appendRow(grid.settings.table.tbody.html());
			} if (!grid.settings.mobile) {
				makeAccessible(grid);
			} if (grid.settings.option.niceScroll) {
				if (!_.has(grid.settings.option.niceScrollOption, "zindex")) {
					grid.settings.option.niceScrollOption.zindex = 4;
				}
				grid.settings.option.niceScrollOption.wrapper = $(grid.markup.wrapper);
				setTimeout(function () { $(grid.markup.functional.freezeScroller).niceScroll(grid.settings.option.niceScrollOption); }, 0);
			} if (TRIAL_UI) {
				appendTrialUi(grid.markup.area);
			} grid.license = licenseObject; return grid;
		};
		self.getGrids = function () { var gridWrappers = $("." + GRID_CLASS.AREA + ""); var grids = []; gridWrappers.each(function () { grids.push(this.grid); }); return grids; };
		function initialzeSettingModel(settingModel) {
			var platform = navigator && navigator.platform || ""; if (platform.indexOf("Win") > -1) {
				settingModel.platform = "windows";
			}
			else {
				if (platform.indexOf("Mac") > -1) {
					settingModel.platform = "mac";
				}
				else {
					if (platform.indexOf("Linux") > -1) {
						settingModel.platform = "linux";
					}
				}
			} var mobileDevices = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i; if (mobileDevices.test(navigator.userAgent) || mobileDevices.test(navigator.platform)) {
				settingModel.mobile = true;
			} if (navigator.appName == "Microsoft Internet Explorer") {
				var ua = navigator.userAgent;
				var re = new RegExp("MSIE ([0-9]{1,}[.0-9]{0,})");
				if (re.exec(ua) != null) {
					re = parseFloat(RegExp.$1);
				}
				if (re <= 8) {
					settingModel.ieVersion = re;
				}
			}
		}
		if (!window.webponent) {
			window.webponent = {};
		}
		window.webponent.grid = self;
	})();
})(jQuery);
