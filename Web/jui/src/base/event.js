import $ from "jquery"
import jui from "./base.js"
import manager from "./manager.js"
import collection from "./collection.js"
import core from "./core.js"

jui.use(manager, collection, core);

export default {
    name: "event",
    extend: "core",
    component: function () {
        const _ = jui.include("util.base");
        const UIManager = jui.include("manager");
        const UICollection = jui.include("collection");

        const DOMEventListener = function() {
            let list = [];

            function settingEventAnimation(e) {
                let pfx = [ "webkit", "moz", "MS", "o", "" ];

                for (let p = 0; p < pfx.length; p++) {
                    let type = e.type;

                    if (!pfx[p]) type = type.toLowerCase();
                    $(e.target).on(pfx[p] + type, e.callback);
                }

                list.push(e);
            }

            function settingEvent(e) {
                if (e.callback && !e.children) {
                    $(e.target).on(e.type, e.callback);
                } else {
                    $(e.target).on(e.type, e.children, e.callback);
                }

                list.push(e);
            }

            function settingEventTouch(e) {
                if (e.callback && !e.children) {
                    $(e.target).on(getEventTouchType(e.type), e.callback);
                } else {
                    $(e.target).on(getEventTouchType(e.type), e.children, e.callback);
                }

                list.push(e);
            }

            function getEventTouchType(type) {
                return {
                    "click": "touchstart",
                    "dblclick": "touchend",
                    "mousedown": "touchstart",
                    "mousemove": "touchmove",
                    "mouseup": "touchend"
                }[type];
            }

            this.add = function (args) {
                let e = { target: args[0], type: args[1] };

                if (_.typeCheck("function", args[2])) {
                    e = $.extend(e, { callback: args[2] });
                } else if (_.typeCheck("string", args[2])) {
                    e = $.extend(e, { children: args[2], callback: args[3] });
                }

                let eventTypes = _.typeCheck("array", e.type) ? e.type : [ e.type ];

                for (let i = 0; i < eventTypes.length; i++) {
                    e.type = eventTypes[i]

                    if (e.type.toLowerCase().indexOf("animation") != -1)
                        settingEventAnimation(e);
                    else {
                        // body, window, document ???????????? ????????? ????????? ??????
                        if (e.target != "body" && e.target != window && e.target != document) {
                            $(e.target).off(e.type);
                        }

                        if (_.isTouch) {
                            settingEventTouch(e);
                        } else {
                            settingEvent(e);
                        }
                    }
                }
            }

            this.trigger = function (selector, type) {
                $(selector).trigger((_.isTouch) ? getEventTouchType(type) : type);
            }

            this.get = function (index) {
                return list[index];
            }

            this.getAll = function () {
                return list;
            }

            this.size = function () {
                return list.length;
            }
        }

        /**
         * @class event
         * Later the jquery dependency should be removed.
         *
         * @alias UIEvent
         * @extends core
         * @requires jquery
         * @requires util.base
         * @requires manager
         * @requires collection
         * @deprecated
         */
        let UIEvent = function () {

            /**
             * @method find
             * Get the child element of the root element
             *
             * @param {String/HTMLElement} Selector
             * @returns {*|jQuery}
             */
            this.find = function(selector) {
                return $(this.root).find(selector);
            }

            /**
             * @method addEvent
             * Defines a browser event of a DOM element
             *
             * @param {String/HTMLElement} selector
             * @param {String} type Dom event type
             * @param {Function} callback
             */
            this.addEvent = function() {
                this.listen.add(arguments);
            }

            /**
             * @method addTrigger
             * Generates an applicable event to a DOM element
             *
             * @param {String/HTMLElement} Selector
             * @param {String} Dom event type
             */
            this.addTrigger = function(selector, type) {
                this.listen.trigger(selector, type);
            }

            /**
             * @method destroy
             * Removes all events set in a UI obejct and the DOM element
             *
             */
            this.destroy = function() {
                for (let i = 0; i < this.listen.size(); i++) {
                    let obj = this.listen.get(i);
                    $(obj.target).off(obj.type);
                }

                // ????????? ????????? ??????????????? ??????
                if(this.__proto__) {
                    for (let key in this.__proto__) {
                        delete this.__proto__[key];
                    }
                }
            }
        }

        UIEvent.build = function(UI) {

            return function(selector, options) {
                let list = [],
                    $root = $(selector || "<div />");

                $root.each(function (index) {
                    list[index] = jui.createUIObject(UI, $root.selector, index, this, options, function(mainObj, opts) {
                        /** @property {Object} listen Dom events */
                        mainObj.init.prototype.listen = new DOMEventListener();

                        $("script").each(function (i) {
                            if (selector == $(this).data("jui") || selector == $(this).data("vo") || selector instanceof HTMLElement) {
                                let tplName = $(this).data("tpl");

                                if (tplName == "") {
                                    throw new Error("JUI_CRITICAL_ERR: 'data-tpl' property is required");
                                }

                                opts.tpl[tplName] = $(this).html();
                            }
                        });
                    });
                });

                UIManager.add(new UICollection(UI.type, selector, options, list));

                if(list.length == 0) {
                    return null;
                } else if(list.length == 1) {
                    return list[0];
                }

                return list;
            }
        }

        UIEvent.init = function(UI) {
            let uiObj = null;

            if(typeof(UI) === "object") {
                uiObj = UIEvent.build(UI);
                UIManager.addClass({ type: UI.type, "class": uiObj });
            }

            return uiObj;
        }

        return UIEvent;
    }
}