import jui from '../main.js';

export default {
    name: "chart.widget.legend",
    extend: "chart.widget.core",
    component: function() {
        var _ = jui.include("util.base");
        var WIDTH = 17, HEIGHT = 13, PADDING = 5, RADIUS = 5.5, RATIO = 1.2, POINT = 2;

        var LegendWidget = function(chart, axis, widget) {
            var columns = [];
            var colorIndex = {};

            function getIndexArray(brush) {
                var list = [ 0 ];

                if(_.typeCheck("array", brush)) {
                    list = brush;
                } else if(_.typeCheck("integer", brush)) {
                    list = [ brush ];
                }

                return list;
            }

            function getBrushAll() {
                var list = getIndexArray(widget.brush),
                    result = [];

                for(var i = 0; i < list.length; i++) {
                    result[i] = chart.get("brush", list[i]);
                }

                return result;
            }

            function setLegendStatus(brush) {
                if(!widget.filter) return;

                if(!columns[brush.index]) {
                    columns[brush.index] = {};
                }

                for(var i = 0; i < brush.target.length; i++) {
                    columns[brush.index][brush.target[i]] = true;
                }
            }

            function changeTargetOption(brushList) {
                var target = [],
                    colors = [],
                    index = brushList[0].index;

                for(var key in columns[index]) {
                    if(columns[index][key]) {
                        target.push(key);
                        colors.push(colorIndex[key]);
                    }
                }

                for(var i = 0; i < brushList.length; i++) {
                    chart.updateBrush(brushList[i].index, {
                        target: target,
                        colors: colors
                    });
                }

                // ?????? ???????????? ??????????????? ????????? ??????
                if(!chart.isRender()) {
                    chart.render();
                }

                chart.setCache(`legend_target`, target);
                chart.emit("legend.filter", [ target ]);
            }

            this.getLegendIcon = function(brush) {
                var arr = [],
                    data = brush.target,
                    count = data.length;

                for(var i = 0; i < count; i++) {
                    var group = chart.svg.group(),
                        target = brush.target[i],
                        text = target,
                        color = chart.color(i, widget.colors || brush.colors);

                    // ?????? ????????? ??????
                    colorIndex[target] = color;

                    // ?????? ??? ?????? ??????
                    if(_.typeCheck("function", widget.format)) {
                        text = this.format(target);
                    }

                    // ????????? ?????? ?????????
                    var rect = chart.svg.getTextSize(text, {
                        fontSize : chart.theme('legendFontSize')
                    });

                    if(widget.filter) {
                        group.append(chart.svg.line({
                            x1: 0,
                            x2: WIDTH,
                            y1: -(RADIUS / 2),
                            y2: -(RADIUS / 2),
                            stroke: color,
                            "stroke-width": HEIGHT,
                            "stroke-linecap": "round"
                        }));

                        group.append(chart.svg.circle({
                            cx : WIDTH,
                            cy : -(RADIUS / 2),
                            r : RADIUS,
                            fill : chart.theme("legendSwitchCircleColor")
                        }));

                        group.append(chart.text({
                            x : WIDTH + (PADDING * 2),
                            y : 0,
                            "font-size" : chart.theme("legendFontSize"),
                            "fill" : chart.theme("legendFontColor"),
                            "text-anchor" : "start"
                        }, text));

                        arr.push({
                            icon : group,
                            width : WIDTH + rect.width + (PADDING * 2.5),
                            height : HEIGHT + (PADDING / 2)
                        });

                        (function(key, element) {
                            element.attr({
                                cursor: "pointer"
                            });

                            element.on("click", function(e) {
                                if(columns[brush.index][key]) {
                                    element.get(0).attr({ stroke: chart.theme("legendSwitchDisableColor") });
                                    element.get(2).attr({ fill: chart.theme("legendSwitchDisableColor") });
                                    element.get(1).attr({ cx: 0 });
                                    columns[brush.index][key] = false;
                                } else {
                                    element.get(0).attr({ stroke: colorIndex[key] });
                                    element.get(2).attr({ fill: chart.theme("legendFontColor") });
                                    element.get(1).attr({ cx: WIDTH });
                                    columns[brush.index][key] = true;
                                }

                                changeTargetOption((widget.brushSync) ? getBrushAll() : [ brush ]);
                            });
                        })(target, group);
                    } else {
                        var size = chart.theme("legendFontSize");

                        if(widget.icon != null) {
                            var icon = _.typeCheck("function", widget.icon) ? widget.icon.apply(chart, [ target ]) : widget.icon;

                            group.append(chart.text({
                                x: 0,
                                y: POINT,
                                "font-size": size,
                                "fill": color
                            }, icon));
                        } else {
                            group.append(chart.svg.circle({
                                cx : size / 2,
                                cy : -POINT,
                                r : size / 2,
                                fill : color
                            }));
                        }

                        group.append(chart.text({
                            x : size * RATIO,
                            y : 0,
                            "font-size" : size,
                            "fill" : chart.theme("legendFontColor"),
                            "text-anchor" : "start"
                        }, text));

                        arr.push({
                            icon : group,
                            width : size + rect.width + (PADDING * 2),
                            height : HEIGHT + (PADDING / 2)
                        });
                    }
                }

                return arr;
            }

            this.draw = function() {
                var group = chart.svg.group();

                var x = 0,
                    y = 0,
                    total_width = 0,
                    total_height = 0,
                    max_width = 0,
                    max_height = 0,
                    brushes = getIndexArray(widget.brush);

                var total_widthes = [];

                for(var i = 0; i < brushes.length; i++) {
                    var index = brushes[i];

                    // brushSync??? true??? ??????, ????????? ?????????
                    if(widget.brushSync && i > 0) continue;

                    var brush = chart.get("brush", index),
                        arr = this.getLegendIcon(brush);

                    for(var k = 0; k < arr.length; k++) {
                        group.append(arr[k].icon);
                        arr[k].icon.translate(x, y);

                        if (widget.orient == "bottom" || widget.orient == "top") {

                            if (x + arr[k].width > chart.area("x2")) {
                                x = 0;
                                y += arr[k].height;
                                max_height += arr[k].height;
                                arr[k].icon.translate(x, y); // HERE
                                total_widthes.push(total_width);
                                total_width = 0;
                            }

                            // @thanks to canelia04
                            x += arr[k].width + (PADDING * 2.5);
                            total_width += arr[k].width + (PADDING * 2.5);

                            if (max_height < arr[k].height) {
                                max_height = arr[k].height;
                            }
                        } else {
                            y += arr[k].height;
                            total_height += arr[k].height;

                            if (max_width < arr[k].width) {
                                max_width = arr[k].width;
                            }
                        }
                    }

                    if (total_width > 0) {
                        total_widthes.push(total_width);
                    }

                    if (total_widthes.length > 0) {
                        total_width = Math.max.apply(Math, total_widthes);
                    }

                    setLegendStatus(brush);
                }

                // legend ??????  ??????
                if (widget.orient == "bottom" || widget.orient == "top") {
                    var y = ((widget.orient == "bottom") ?
                        chart.area("y2") + chart.padding("bottom") - max_height :
                        chart.area("y") - chart.padding("top")) + PADDING;

                    if (widget.align == "start") {
                        x = chart.area("x");
                    } else if (widget.align == "center") {
                        x = chart.area("x") + (chart.area("width")/2 - total_width / 2);
                    } else if (widget.align == "end") {
                        x = chart.area("x2") - total_width;
                    }
                } else {
                    var x = ((widget.orient == "left") ?
                        chart.area("x") - chart.padding("left") :
                        chart.area("x2") + chart.padding("right") - max_width) + PADDING;

                    if (widget.align == "start") {
                        y = chart.area("y");
                    } else if (widget.align == "center") {
                        y = chart.area("y") + (chart.area("height") / 2 - total_height / 2);
                    } else if (widget.align == "end") {
                        y = chart.area("y2") - total_height;
                    }
                }

                group.translate(Math.floor(x) + widget.dx, Math.floor(y) + widget.dy);

                return group;
            }
        }

        LegendWidget.setup = function() {
            return {
                /** @cfg {"bottom"/"top"/"left"/"right" } Sets the location where the label is displayed (top, bottom). */
                orient: "bottom",
                /** @cfg {"start"/"center"/"end" } Aligns the label (center, start, end). */
                align: "center", // or start, end
                /** @cfg {Boolean} [filter=false] Performs filtering so that only label(s) selected by the brush can be shown. */
                filter: false,
                /** @cfg {Function/String} [icon=null]   */
                icon: null,
                /** @cfg {Number} [dx=0] Moves the x coordinate by a set value from the location where the chart is drawn.  */
                dx: 0,
                /** @cfg {Number} [dy=0] Moves the y coordinate by a set value from the location where the chart is drawn. */
                dy: 0,
                /** @cfg {Array} [colors=null]   */
                colors: null,
                /** @cfg {Boolean} [brushSync=false] Applies all brushes equally when using a filter function. */
                brushSync: false,
                /** @cfg {Number/Array} [brush=0] Specifies a brush index for which a widget is used. */
                brush: 0,
                /** @cfg {Function} [format=null] Sets the format of the key that is displayed on the legend. */
                format: null
            };
        }

        /**
         * @event legend_filter
         * Event that occurs when the filter function of the legend widget is activated. (real name ``` legend.filter ```)
         * @param {String} target The selected data field.
         */

        return LegendWidget;
    }
}