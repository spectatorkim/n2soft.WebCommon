<template>
  <div v-bind:id="id"></div>
</template>
<script>
/* eslint-disable */

/** 
 * AUIGrid-Vue.js v0.9
 * AUIGrid v3.0.7.20190722 for Vue.js
 * Copyright © 2014-2019 AUISoft Co., Ltd. 
 * www.auisoft.net
 */
    // 프로젝트 경로에 맞게 바꾸세요
    import '../AUIGrid/AUIGrid.js';
    import '../AUIGrid/AUIGridLicense.js';
    import '../AUIGrid/AUIGrid_style.css';

    // 이 아래 소스는 절대 수정하지 마세요.
    let _self;
    export default {
        props: {
            name: {
                type: String,
                default: null
            },
            autoResize: {
                type: Boolean,
                default: true
            },
            resizeDelayTime: {
                type: Number,
                default: 300
            }
        },
        data: () => ({
            timerId : null
        }),
        created: function () {
            _self = window.AUIGrid;
            this.id = "aui-grid-wrap-" + (this.name === null ? this._uid : this.name);
            this.pid = '#' + this.id;
        },
        beforeDestroy: function() {
            this.__resetGlobalReisze();
            if(_self.isCreated(this.pid)) _self.destroy(this.pid);

        },
        methods : {
            create(columnLayout, props) {
                _self.create(this.pid, columnLayout, props);
                this.__setupEvents();
                this.__setupGlobalReisze();
                return this.pid;
            },
            __setupEvents() {
                let n;
                const that = this;
                const events = ["addColumn", "addRow", "addRowFinish", "addTreeColumn", 
                "cellClick", "cellDoubleClick", "cellEditCancel", "cellEditEnd",
                 "cellLongTap", "columnStateChange", "dropCancel", "dropEnd", "filtering", 
                 "footerClick", "footerDoubleClick", "grouping", "hScrollChange", "notFound", 
                 "pageChange", "pageRowCountChange", "pasteEnd", "removeColumn", "removeRow",
                 "removeSoftRows", "rowAllChkClick", "rowCheckClick", "selectionChange", "ready",
                 "sorting", "treeLazyRequest", "treeOpenChange", "undoRedoChange", "updateRow", "updateRows",
                 "vScrollChange"];
                const invokers = ["beforeInsertRow", "beforeRemoveColumn", 
                "beforeRemoveRow", "beforeRemoveSoftRows", "cellEditBegin",
                "cellEditEndBefore", "contextMenu", "dragBegin", "dropEndBefore",
                "headerClick", "keyDown", "pasteBegin", "rowNumCellClick",
                "rowStateCellClick", "selectionConstraint"];
                
                for(n in events) {
                     if(that._events[events[n]]) {
                        _self.bind(this.pid, events[n], function(e){
                            that.$emit(e.type,e);
                        });
                     }
                }
                for(n in invokers) {
                    if(that._events[invokers[n]]) {
                        _self.bind(this.pid, invokers[n], function(e){
                            return that.__invoke(e.type, e);
                        });
                    }
                }
            },
            __invoke(n, e) {
                const that = this;
                if(that._events[n] && typeof that._events[n][0] == "function") {
                    return that._events[n][0](e);
                }
            },
            __setupGlobalReisze() {
                if(!this.autoResize) return;
                if(typeof window.orientation !== "undefined") {
                    window.addEventListener("orientationchange", this.__globalResizeHandler);
                } else {
                    window.addEventListener("resize", this.__globalResizeHandler); 
                }
            },
            __resetGlobalReisze() {
                if(!this.autoResize) return;
                if(typeof window.orientation !== "undefined") {
                    window.removeEventListener("orientationchange", this.__globalResizeHandler);
                } else {
                    window.removeEventListener("resize", this.__globalResizeHandler);                    
                }
            },
            __globalResizeHandler() {
                let that = this;
                if(that.timerId !== null) {
                    clearTimeout(that.timerId);
                }
                that.timerId = setTimeout(function() {
                    if(_self.isCreated(that.pid)) {
                        _self.resize(that.pid);
                    }
                },that.resizeDelayTime);
            },
            addCheckedRowsByIds(ids) {return _self.addCheckedRowsByIds.call(_self,this.pid,arguments[0]);},
            addCheckedRowsByValue(dataField, value) {return _self.addCheckedRowsByValue.call(_self,this.pid,arguments[0],arguments[1]);},
            addColumn(cItems, position) {return _self.addColumn.call(_self,this.pid,arguments[0],arguments[1]);},
            addRow(items, rowIndex) {return _self.addRow.call(_self,this.pid,arguments[0],arguments[1]);},
            addTreeColumn(cItems, parentDataField, position) {return _self.addTreeColumn.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            addTreeRow(item, parentRowId, position) {return _self.addTreeRow.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            addUncheckedRowsByIds(ids) {return _self.addUncheckedRowsByIds.call(_self,this.pid,arguments[0]);},
            addUncheckedRowsByValue(dataField, value) {return _self.addUncheckedRowsByValue.call(_self,this.pid,arguments[0],arguments[1]);},
            appendData(items) {return _self.appendData.call(_self,this.pid,arguments[0]);},
            bind(name, func) {return _self.bind.call(_self,this.pid,arguments[0],arguments[1]);},
            changeColumnLayout(newLayout) {return _self.changeColumnLayout.call(_self,this.pid,arguments[0]);},
            changeFooterLayout(newLayout) {return _self.changeFooterLayout.call(_self,this.pid,arguments[0]);},
            clearFilter(dataField) {return _self.clearFilter.call(_self,this.pid,arguments[0]);},
            clearFilterAll() {_self.clearFilterAll.call(_self,this.pid);},
            clearGridData() {_self.clearGridData.call(_self,this.pid);},
            clearSelection(mode) {_self.clearSelection.call(_self,this.pid,arguments[0]);},
            clearSortingAll() {_self.clearSortingAll.call(_self,this.pid);},
            clearUndoRedoStack() {_self.clearUndoRedoStack.call(_self,this.pid);},
            closeFilterLayer() {_self.closeFilterLayer.call(_self,this.pid);},
            collapseAll() {_self.collapseAll.call(_self,this.pid);},
            destroy() {_self.destroy.call(_self,this.pid);},
            expandAll() {_self.expandAll.call(_self,this.pid);},
            expandItemByRowId(rowId, open, recursive) {return _self.expandItemByRowId.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            exportAsCsv(props) {_self.exportAsCsv.call(_self,this.pid,arguments[0]);},
            exportAsJson(keyValueMode, props) {_self.exportAsJson.call(_self,this.pid,arguments[0],arguments[1]);},
            exportAsObject(keyValueMode) {return _self.exportAsObject.call(_self,this.pid,arguments[0]);},
            exportAsPdf(props) {_self.exportAsPdf.call(_self,this.pid,arguments[0]);},
            exportAsTxt(props) {_self.exportAsTxt.call(_self,this.pid,arguments[0]);},
            exportAsXlsx(exportWithStyle, props) {_self.exportAsXlsx.call(_self,this.pid,arguments[0],arguments[1]);},
            exportAsXml(props) {_self.exportAsXml.call(_self,this.pid,arguments[0]);},
            exportToCsv(props) {_self.exportToCsv.call(_self,this.pid,arguments[0]);},
            exportToJson(keyValueMode, props) {_self.exportToJson.call(_self,this.pid,arguments[0],arguments[1]);},
            exportToObject(keyValueMode) {return _self.exportToObject.call(_self,this.pid,arguments[0]);},
            exportToPdf(props) {_self.exportToPdf.call(_self,this.pid,arguments[0]);},
            exportToTxt(props) {_self.exportToTxt.call(_self,this.pid,arguments[0]);},
            exportToXlsx(exportWithStyle, props) {_self.exportToXlsx.call(_self,this.pid,arguments[0],arguments[1]);},
            exportToXlsxMulti(subGridIds, props) {_self.exportToXlsxMulti.call(_self,this.pid,arguments[0],arguments[1]);},
            exportToXml(props) {_self.exportToXml.call(_self,this.pid,arguments[0]);},
            forceEditingComplete(value, cancel) {return _self.forceEditingComplete.call(_self,this.pid,arguments[0],arguments[1]);},
            formatDate(value, formatString) {return _self.formatDate.call(_self,this.pid,arguments[0]);},
            formatNumber(value, formatString, rounding) {return _self.formatNumber.call(_self,this.pid,arguments[0],arguments[1]);},
            getActiveGrid() {return _self.getActiveGrid.call(_self,this.pid);},
            getAddedColumnFields() {return _self.getAddedColumnFields.call(_self,this.pid);},
            getAddedRowItems() {return _self.getAddedRowItems.call(_self,this.pid);},
            getAscendantsByRowId(rowId) {return _self.getAscendantsByRowId.call(_self,this.pid,arguments[0]);},
            getCellFormatValue(rowIndex, dataField) {return _self.getCellFormatValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getCellFormattedValue(rowIndex, dataField) {return _self.getCellFormattedValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getCellValue(rowIndex, dataField) {return _self.getCellValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getCheckedRowItems() {return _self.getCheckedRowItems.call(_self,this.pid);},
            getCheckedRowItemsAll() {return _self.getCheckedRowItemsAll.call(_self,this.pid);},
            getColumnCount() {return _self.getColumnCount.call(_self,this.pid);},
            getColumnDistinctValues(dataField, total) {return _self.getColumnDistinctValues.call(_self,this.pid,arguments[0],arguments[1]);},
            getColumnIndexByDataField(dataField) {return _self.getColumnIndexByDataField.call(_self,this.pid,arguments[0]);},
            getColumnInfoList() {return _self.getColumnInfoList.call(_self,this.pid);},
            getColumnItemByDataField(dataField) {return _self.getColumnItemByDataField.call(_self,this.pid,arguments[0]);},
            getColumnLayout() {return _self.getColumnLayout.call(_self,this.pid);},
            getColumnValues(dataField, total) {return _self.getColumnValues.call(_self,this.pid,arguments[0],arguments[1]);},
            getCreatedGridAll() {return _self.getCreatedGridAll.call(_self,this.pid);},
            getDataFieldByColumnIndex(idx) {return _self.getDataFieldByColumnIndex.call(_self,this.pid,arguments[0]);},
            getDepthByRowId(rowId) {return _self.getDepthByRowId.call(_self,this.pid,arguments[0]);},
            getDescendantsByRowId(rowId) {return _self.getDescendantsByRowId.call(_self,this.pid,arguments[0]);},
            getEditedRowColumnItems() {return _self.getEditedRowColumnItems.call(_self,this.pid);},
            getEditedRowItems() {return _self.getEditedRowItems.call(_self,this.pid);},
            getFitColumnSizeList(fitToGrid) {return _self.getFitColumnSizeList.call(_self,this.pid,arguments[0]);},
            getFooterData() {return _self.getFooterData.call(_self,this.pid);},
            getFooterFormatValueByDataField(posField) {return _self.getFooterFormatValueByDataField.call(_self,this.pid,arguments[0]);},
            getFooterLayout() {return _self.getFooterLayout.call(_self,this.pid);},
            getFooterValueByDataField(posField) {return _self.getFooterValueByDataField.call(_self,this.pid,arguments[0]);},
            getGridData() {return _self.getGridData.call(_self,this.pid);},
            getHiddenColumnDataFields() {return _self.getHiddenColumnDataFields.call(_self,this.pid);},
            getHiddenColumnIndexes() {return _self.getHiddenColumnIndexes.call(_self,this.pid);},
            getInitCellValue(rowId, dataField) {return _self.getInitCellValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getInitValueItem(rowId) {return _self.getInitValueItem.call(_self,this.pid,arguments[0]);},
            getItemByRowId(rowIdValue) {return _self.getItemByRowId.call(_self,this.pid,arguments[0]);},
            getItemByRowIndex(rowIndex) {return _self.getItemByRowIndex.call(_self,this.pid,arguments[0]);},
            getItemsByValue(dataField, value) {return _self.getItemsByValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getMergeEndRowIndex(rowIndex, columnIndex) {return _self.getMergeEndRowIndex.call(_self,this.pid,arguments[0],arguments[1]);},
            getMergeStartRowIndex(rowIndex, columnIndex) {return _self.getMergeStartRowIndex.call(_self,this.pid,arguments[0],arguments[1]);},
            getOrgCellValue(uid, dataField) {return _self.getOrgCellValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getOrgGridData() {return _self.getOrgGridData.call(_self,this.pid);},
            getOrgValueItem(uids) {return _self.getOrgValueItem.call(_self,this.pid,arguments[0]);},
            getParentItemByRowId(rowId) {return _self.getParentItemByRowId.call(_self,this.pid,arguments[0]);},
            getProp(name) {return _self.getProp.call(_self,this.pid,arguments[0]);},
            getProperty(name) {return _self.getProperty.call(_self,this.pid,arguments[0]);},
            getRemovedColumnFields() {return _self.getRemovedColumnFields.call(_self,this.pid);},
            getRemovedItems(includeAdded) {return _self.getRemovedItems.call(_self,this.pid,arguments[0]);},
            getRemovedNewItems() {return _self.getRemovedNewItems.call(_self,this.pid);},
            getRowCount() {return _self.getRowCount.call(_self,this.pid);},
            getRowIndexesByValue(dataField, values) {return _self.getRowIndexesByValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getRowPosition() {return _self.getRowPosition.call(_self,this.pid);},
            getRowsByValue(dataField, values) {return _self.getRowsByValue.call(_self,this.pid,arguments[0],arguments[1]);},
            getSelectedIndex() {return _self.getSelectedIndex.call(_self,this.pid);},
            getSelectedItems() {return _self.getSelectedItems.call(_self,this.pid);},
            getSelectedRows() {return _self.getSelectedRows.call(_self,this.pid);},
            getSelectedText() {return _self.getSelectedText.call(_self,this.pid);},
            getTreeFlatData() {return _self.getTreeFlatData.call(_self,this.pid);},
            getTreeGridData() {return _self.getTreeGridData.call(_self,this.pid);},
            getTreeTotalDepth() {return _self.getTreeTotalDepth.call(_self,this.pid);},
            hideColumnByDataField(dataField) {return _self.hideColumnByDataField.call(_self,this.pid,arguments[0]);},
            indentTreeDepth() {_self.indentTreeDepth.call(_self,this.pid);},
            indexToRowId(rowIndex) {return _self.indexToRowId.call(_self,this.pid,arguments[0]);},
            isAddedById(uid) {return _self.isAddedById.call(_self,this.pid,arguments[0]);},
            isAvailabePdf() {return _self.isAvailabePdf.call(_self,this.pid);},
            isAvailableLocalDownload() {return _self.isAvailableLocalDownload.call(_self,this.pid);},
            isCheckedRowById(id) {return _self.isCheckedRowById.call(_self,this.pid,arguments[0]);},
            isCreated() {return _self.isCreated.call(_self,this.pid);},
            isEditedById(uid) {return _self.isEditedById.call(_self,this.pid,arguments[0]);},
            isEditedCell(uid, dataField) {return _self.isEditedCell.call(_self,this.pid,arguments[0],arguments[1]);},
            isFilteredGrid() {return _self.isFilteredGrid.call(_self,this.pid);},
            isItemBranchByRowId(rowId) {return _self.isItemBranchByRowId.call(_self,this.pid,arguments[0]);},
            isItemOpenByRowId(rowId) {return _self.isItemOpenByRowId.call(_self,this.pid,arguments[0]);},
            isItemVisibleByRowId(rowId) {return _self.isItemVisibleByRowId.call(_self,this.pid,arguments[0]);},
            isMergedCell(rowIndex, columnIndex) {return _self.isMergedCell.call(_self,this.pid,arguments[0],arguments[1]);},
            isOpenFilterLayer() {return _self.isOpenFilterLayer.call(_self,this.pid);},
            isRemovedById(uid) {return _self.isRemovedById.call(_self,this.pid,arguments[0]);},
            isSortedGrid() {return _self.isSortedGrid.call(_self,this.pid);},
            isTreeGrid() {return _self.isTreeGrid.call(_self,this.pid);},
            isUniqueValue(dataField, value) {return _self.isUniqueValue.call(_self,this.pid,arguments[0],arguments[1]);},
            movePageTo(pageNum, maintainVScroll, maintainHScroll) {return _self.movePageTo.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            moveRows2Down() {return _self.moveRows2Down.call(_self,this.pid);},
            moveRows2Up() {return _self.moveRows2Up.call(_self,this.pid);},
            moveRowsToDown() {return _self.moveRowsToDown.call(_self,this.pid);},
            moveRowsToUp() {return _self.moveRowsToUp.call(_self,this.pid);},
            openFilterLayer(dataField) {return _self.openFilterLayer.call(_self,this.pid,arguments[0]);},
            openInputer() {return _self.openInputer.call(_self,this.pid);},
            outdentTreeDepth() {_self.outdentTreeDepth.call(_self,this.pid);},
            redo() {_self.redo.call(_self,this.pid);},
            redoable() {return _self.redoable.call(_self,this.pid);},
            refresh() {_self.refresh.call(_self,this.pid);},
            refreshRows(items, style, flashTime) {return _self.refreshRows.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            removeAjaxLoader() {_self.removeAjaxLoader.call(_self,this.pid);},
            removeCheckedRows() {return _self.removeCheckedRows.call(_self,this.pid);},
            removeColumn(columnIndex) {_self.removeColumn.call(_self,this.pid,arguments[0]);},
            removeInfoMessage() {_self.removeInfoMessage.call(_self,this.pid);},
            removeRow(rowIndex) {return _self.removeRow.call(_self,this.pid,arguments[0]);},
            removeRowByRowId(rowIds) {return _self.removeRowByRowId.call(_self,this.pid,arguments[0]);},
            removeSoftRows(ids) {return _self.removeSoftRows.call(_self,this.pid,arguments[0]);},
            removeToastMessage() {_self.removeToastMessage.call(_self,this.pid);},
            resetUpdatedColumns(opts) {_self.resetUpdatedColumns.call(_self,this.pid);},
            resetUpdatedItemById(rowId, flag) {_self.resetUpdatedItemById.call(_self,this.pid,arguments[0],arguments[1]);},
            resetUpdatedItems(flag) {_self.resetUpdatedItems.call(_self,this.pid,arguments[0]);},
            resize(w, h) {_self.resize.call(_self,this.pid,arguments[0],arguments[1]);},
            restoreEditedCells(cells) {_self.restoreEditedCells.call(_self,this.pid,arguments[0]);},
            restoreEditedRows(rowIndex) {_self.restoreEditedRows.call(_self,this.pid,arguments[0]);},
            restoreSoftRows(flag) {return _self.restoreSoftRows.call(_self,this.pid,arguments[0]);},
            rowIdToIndex(rowId) {return _self.rowIdToIndex.call(_self,this.pid,arguments[0]);},
            search(dataField, term, opts) {return _self.search.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            searchAll(term, opts) {return _self.searchAll.call(_self,this.pid,arguments[0],arguments[1]);},
            selectRowsByRowId(rowIds) {return _self.selectRowsByRowId.call(_self,this.pid,arguments[0]);},
            setAllCheckedRows(check) {_self.setAllCheckedRows.call(_self,this.pid,arguments[0]);},
            setCellMerge(flag) {_self.setCellMerge.call(_self,this.pid,arguments[0]);},
            setCellValue(rowIndex, dataField, value) {return _self.setCellValue.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            setCheckedRowsByIds(ids) {return _self.setCheckedRowsByIds.call(_self,this.pid,arguments[0]);},
            setCheckedRowsByValue(dataField, value) {return _self.setCheckedRowsByValue.call(_self,this.pid,arguments[0],arguments[1]);},
            setColumnChildOrder(dataFieldOrders) {_self.setColumnChildOrder.call(_self,this.pid,arguments[0]);},
            setColumnOrder(dataFieldOrders) {_self.setColumnOrder.call(_self,this.pid,arguments[0]);},
            setColumnProp(columnIndex, obj) {_self.setColumnProp.call(_self,this.pid,arguments[0],arguments[1]);},
            setColumnPropByDataField(dataField, obj) {_self.setColumnPropByDataField.call(_self,this.pid,arguments[0],arguments[1]);},
            setColumnSizeList(value) {return _self.setColumnSizeList.call(_self,this.pid,arguments[0]);},
            setCsvGridData(gridData, isSimple) {return _self.setCsvGridData.call(_self,this.pid,arguments[0],arguments[1]);},
            setEditingInputValue(value) {return _self.setEditingInputValue.call(_self,this.pid,arguments[0]);},
            setFilter(dataField, func) {return _self.setFilter.call(_self,this.pid,arguments[0],arguments[1]);},
            setFilterByValues(dataField, values) {return _self.setFilterByValues.call(_self,this.pid,arguments[0],arguments[1]);},
            setFixedColumnCount(value) {_self.setFixedColumnCount.call(_self,this.pid,arguments[0]);},
            setFixedRowCount(value) {_self.setFixedRowCount.call(_self,this.pid,arguments[0]);},
            setFocus() {_self.setFocus.call(_self,this.pid);},
            setFooter(footerData) {return _self.setFooter.call(_self,this.pid,arguments[0]);},
            setGridData(gridData) {return _self.setGridData.call(_self,this.pid,arguments[0]);},
            setGroupBy(groupingFields, summaryProps) {return _self.setGroupBy.call(_self,this.pid,arguments[0],arguments[1]);},
            setHScrollPosition(columnIndex) {return _self.setHScrollPosition.call(_self,this.pid,arguments[0]);},
            setHScrollPositionByPx(px) {return _self.setHScrollPositionByPx.call(_self,this.pid,arguments[0]);},
            setHeaderRendererProp(columnIndex, obj) {_self.setHeaderRendererProp.call(_self,this.pid,arguments[0],arguments[1]);},
            setInfoMessage(msgHTML) {_self.setInfoMessage.call(_self,this.pid,arguments[0]);},
            setPageRowCount(count) {_self.setPageRowCount.call(_self,this.pid,arguments[0]);},
            setProp(obj, value) {_self.setProp.call(_self,this.pid,arguments[0],arguments[1]);},
            setProperty(obj, value) {return _self.setProperty.call(_self,this.pid,arguments[0],arguments[1]);},
            setRendererProp(columnIndex, obj) {_self.setRendererProp.call(_self,this.pid,arguments[0],arguments[1]);},
            setRowPosition(rowPosition) {return _self.setRowPosition.call(_self,this.pid,arguments[0]);},
            setSelectionAll() {_self.setSelectionAll.call(_self,this.pid);},
            setSelectionBlock(sr, er, sc, ec) {_self.setSelectionBlock.call(_self,this.pid,arguments[0],arguments[1],arguments[2],arguments[3]);},
            setSelectionByIndex(rowIndex, columnIndex) {return _self.setSelectionByIndex.call(_self,this.pid,arguments[0],arguments[1]);},
            setSelectionColumn(startColIdx, endColIdx) {return _self.setSelectionColumn.call(_self,this.pid,arguments[0],arguments[1]);},
            setSelectionMode(mode) {return _self.setSelectionMode.call(_self,this.pid,arguments[0]);},
            setSorting(sortingInfoArr, onlyLastDepthSorting) {return _self.setSorting.call(_self,this.pid,arguments[0],arguments[1]);},
            setXmlGridData(gridData, selector) {return _self.setXmlGridData.call(_self,this.pid,arguments[0],arguments[1]);},
            showAjaxLoader() {_self.showAjaxLoader.call(_self,this.pid);},
            showAllColumns() {_self.showAllColumns.call(_self,this.pid);},
            showColumnByDataField(dataField) {return _self.showColumnByDataField.call(_self,this.pid,arguments[0]);},
            showInfoMessage(msgHTML) {_self.showInfoMessage.call(_self,this.pid,arguments[0]);},
            showItemsOnDepth(depth) {return _self.showItemsOnDepth.call(_self,this.pid,arguments[0]);},
            showToastMessage(rowIndex, columnIndex, msg) {return _self.showToastMessage.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            unbind(name, func) {return _self.unbind.call(_self,this.pid,arguments[0],arguments[1]);},
            undo() {_self.undo.call(_self,this.pid);},
            undoable() {return _self.undoable.call(_self,this.pid);},
            update() {_self.update.call(_self,this.pid);},
            updateAllToValue(dataField, value) {return _self.updateAllToValue.call(_self,this.pid,arguments[0],arguments[1]);},
            updateGrouping() {_self.updateGrouping.call(_self,this.pid);},
            updateRow(item, rowIndex, isMarkEdited) {return _self.updateRow.call(_self,this.pid,arguments[0],arguments[1],arguments[2]);},
            updateRowBlockToValue(start, end, dataField, value) {_self.updateRowBlockToValue.call(_self,this.pid,arguments[0],arguments[1],arguments[2],arguments[3]);},
            updateRowsById(items, isMarkEdited) {return _self.updateRowsById.call(_self,this.pid,arguments[0],arguments[1]);},
            validateChangedGridData(dataFields, msg) {return _self.validateChangedGridData.call(_self,this.pid,arguments[0],arguments[1]);},
            validateGridData(fields, msg) {return _self.validateGridData.call(_self,this.pid,arguments[0],arguments[1]);}
        }
    }
</script>