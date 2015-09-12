(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactAutoLayout"] = factory(require("react"));
	else
		root["ReactAutoLayout"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_6__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
	  value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	__webpack_require__(1);
	
	var _node_modulesAutolayoutDistAutolayoutMinJs = __webpack_require__(5);
	
	var _node_modulesAutolayoutDistAutolayoutMinJs2 = _interopRequireDefault(_node_modulesAutolayoutDistAutolayoutMinJs);
	
	var _react = __webpack_require__(6);
	
	var _react2 = _interopRequireDefault(_react);
	
	var listeners = {};
	var config = {};
	var configArr = [];
	var constraints = {};
	
	function invariant(cond, message) {
	  if (cond) {
	    throw new Error('Invariant Violation: ' + message);
	  }
	}
	
	function merge() {
	  var a = {};
	  Array.prototype.slice.call(arguments).forEach(function (x) {
	    for (var k in x) {
	      if (k === 'top' || k === 'left' || !x.hasOwnProperty(k)) {
	        continue;
	      }
	      a[k] = x[k];
	    }
	  });
	  return a;
	}
	
	function updateContraints(viewConfig, current) {
	  var layoutConstraints = {};
	  var subView = undefined;
	  var width = undefined;
	  var height = undefined;
	  var top = undefined;
	  var left = undefined;
	  var constrainTo = viewConfig.layouts[current.format].constrainTo.split('.');
	
	  if (viewConfig.layouts[current.format].constrainTo[0] == 'viewport' || !(constrainTo[0] in constraints)) {
	    viewConfig.view.setSize(window.innerWidth, window.innerHeight);
	  } else {
	    viewConfig.view.setSize(constraints[constrainTo[0]][constrainTo[1]].style.width, constraints[constrainTo[0]][constrainTo[1]].style.height);
	  }
	
	  layoutConstraints[viewConfig.viewName] = {};
	  layoutConstraints[viewConfig.viewName].currentFormat = current.format;
	
	  for (var subViewKey in viewConfig.view.subViews) {
	    var temp = undefined;
	    if (viewConfig.view.subViews.hasOwnProperty(subViewKey) && subViewKey[0] !== "_") {
	
	      subView = viewConfig.view.subViews[subViewKey];
	      width = subView.width;
	      height = subView.height;
	      top = subView.top;
	      left = subView.left;
	
	      temp = {
	        width: width,
	        height: height,
	        transform: 'translate3d(' + left + 'px, ' + top + 'px, 0)',
	        position: 'absolute',
	        padding: 0,
	        margin: 0
	      };
	
	      layoutConstraints[viewConfig.viewName][subViewKey] = merge({
	        style: merge(current.style, temp),
	        parentView: viewConfig.viewName,
	        _top: top,
	        _left: left,
	        format: current.format,
	        view: subViewKey });
	    }
	  };
	  return layoutConstraints;
	}
	
	function updateLayout(e, viewName, applyStyle) {
	
	  var current = undefined;
	  var styles = undefined;
	
	  for (var i = 0, l = configArr.length; i < l; i++) {
	    current = configArr[i].query(constraints, configArr[i].currentFormat);
	    styles = current.style;
	
	    if (configArr[i].currentFormat !== current.format) {
	      configArr[i].view = new _node_modulesAutolayoutDistAutolayoutMinJs2['default'].View();
	      configArr[i].view.addConstraints(configArr[i].layouts[current.format].constraints);
	    }
	    configArr[i].currentFormat = current.format;
	    configArr[i].currentStyle = current.style;
	    constraints = merge(constraints, updateContraints(configArr[i], current));
	  };
	
	  for (var k3 in listeners) {
	    if (listeners.hasOwnProperty(k3)) {
	      listeners[k3]();
	    }
	  }
	}
	
	function addVisualFormat(component, vfDescriptor) {
	  var viewName = component.props.name;
	  var current = undefined;
	
	  invariant(viewName === void 0, 'name is required!');
	  invariant(viewName in config, viewName + ' name must be unique.');
	
	  //then we add the default view to the view as constraints
	  listeners[viewName] = function () {
	    component.forceUpdate();
	  };
	
	  config[viewName] = {};
	  config[viewName].query = vfDescriptor.query;
	  config[viewName].layouts = vfDescriptor.layouts;
	  config[viewName].viewName = viewName;
	  config[viewName].view = new _node_modulesAutolayoutDistAutolayoutMinJs2['default'].View();
	
	  current = vfDescriptor.query(constraints);
	  config[viewName].currentFormat = current.format;
	  config[viewName].currentStyle = current.style;
	
	  for (var k in vfDescriptor.layouts) {
	    if (vfDescriptor.layouts.hasOwnProperty(k)) {
	      config[viewName].layouts[k].constraints = _node_modulesAutolayoutDistAutolayoutMinJs2['default'].VisualFormat.parse(vfDescriptor.layouts[k].format, { extended: true });
	    }
	  }
	
	  config[viewName].view.addConstraints(config[viewName].layouts[current.format].constraints);
	  constraints = merge(constraints, updateContraints(config[viewName], current));
	
	  configArr.push(config[viewName]);
	
	  for (var i = 0, l = configArr.length; i < l; i++) {
	    constraints = merge(constraints, updateContraints(configArr[i], {
	      format: configArr[i].currentFormat,
	      style: configArr[i].currentStyle
	    }));
	  };
	
	  updateLayout();
	}
	
	function removeVisualFormat(viewName) {
	
	  if (viewName in listeners) {
	    delete listeners[viewName];
	  }
	
	  if (viewName in constraints) {
	    delete constraints[viewName];
	  }
	
	  if (viewName in config) {
	    config[viewName].view = null;
	    delete config[viewName];
	  }
	
	  configArr = configArr.filter(function (config) {
	    return config.viewName !== viewName;
	  });
	
	  updateLayout();
	}
	
	function getContraints(viewName, view) {
	  var viewKey = !!viewName && !!view ? view.props.viewKey : void 0;
	  if (viewKey === void 0 || !(viewName in constraints) || !(viewKey in constraints[viewName])) {
	    return void 0;
	  }
	  return constraints[viewName][viewKey].style;
	}
	
	function getCurrentFormat(viewName) {
	  if (viewName === void 0 || viewName === null || !(viewName in constraints)) {
	    return void 0;
	  }
	  return constraints[viewName].currentFormat;
	}
	
	window.addEventListener('resize', updateLayout);
	
	var Layout = (function (_React$Component) {
	  _inherits(Layout, _React$Component);
	
	  function Layout(props) {
	    _classCallCheck(this, Layout);
	
	    _get(Object.getPrototypeOf(Layout.prototype), 'constructor', this).call(this, props);
	  }
	
	  _createClass(Layout, [{
	    key: 'componentWillMount',
	    value: function componentWillMount() {
	      addVisualFormat(this, {
	        query: this.props.query,
	        layouts: this.props.layout
	      });
	    }
	  }, {
	    key: 'componentWillUnmount',
	    value: function componentWillUnmount() {
	      removeVisualFormat(this.props.name);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      var viewName = this.props.name;
	      var tag = this.props.tag || 'div';
	      var newChildren = _react2['default'].Children.map(this.props.children, function (child) {
	        var constraints = getContraints(viewName, child);
	        //check to see if the element was specified in the layout.
	        if (constraints === void 0) {
	          return child;
	        }
	        if ('formatStyle' in child.props) {
	          var currentFormat = getCurrentFormat(viewName);
	          if (currentFormat !== void 0 && currentFormat in child.props.formatStyle) {
	            return _react2['default'].cloneElement(child, {
	              style: merge(child.props.style, child.props.formatStyle[currentFormat], constraints)
	            });
	          }
	        }
	        return _react2['default'].cloneElement(child, { style: merge(child.props.style, constraints) });
	      });
	      return _react2['default'].createElement(tag, null, newChildren);
	    }
	  }]);
	
	  return Layout;
	})(_react2['default'].Component);
	
	exports['default'] = Layout;
	module.exports = exports['default'];

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./node_modules/css-loader/index.js!./styles.css", function() {
				var newContent = require("!!./node_modules/css-loader/index.js!./styles.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports
	
	
	// module
	exports.push([module.id, "html {\n  box-sizing: border-box;\n}\n\nhtml, body {\n  padding: 0;\n  margin: 0;\n}\n\n*, *:before, *:after {\n  box-sizing: inherit;\n}", ""]);
	
	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	"use strict";
	
	module.exports = function () {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0;
	
	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
	
		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();
	
		var styles = listToStyles(list);
		addStylesToDom(styles, options);
	
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function createStyleElement() {
		var styleElement = document.createElement("style");
		var head = getHeadElement();
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		return styleElement;
	}
	
	function createLinkElement() {
		var linkElement = document.createElement("link");
		var head = getHeadElement();
		linkElement.rel = "stylesheet";
		head.appendChild(linkElement);
		return linkElement;
	}
	
	function addStyle(obj, options) {
		var styleElement, update, remove;
	
		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement());
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement();
			update = updateLink.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement();
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				styleElement.parentNode.removeChild(styleElement);
			};
		}
	
		update(obj);
	
		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}
	
	var replaceText = (function () {
		var textStore = [];
	
		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();
	
	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;
	
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(media) {
			styleElement.setAttribute("media", media)
		}
	
		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}
	
	function updateLink(linkElement, obj) {
		var css = obj.css;
		var media = obj.media;
		var sourceMap = obj.sourceMap;
	
		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}
	
		var blob = new Blob([css], { type: "text/css" });
	
		var oldSrc = linkElement.href;
	
		linkElement.href = URL.createObjectURL(blob);
	
		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var require;var require;/**
	* AutoLayout.js is licensed under the MIT license. If a copy of the
	* MIT-license was not distributed with this file, You can obtain one at:
	* http://opensource.org/licenses/mit-license.html.
	*
	* @author: Hein Rutjes (IjzerenHein)
	* @license MIT
	* @copyright Gloey Apps, 2015
	*
	* @library autolayout.js
	* @version 0.5.1
	*/
	"use strict";
	
	(function (f) {
	  if (true) {
	    module.exports = f();
	  } else if (typeof define === "function" && define.amd) {
	    define([], f);
	  } else {
	    var g;if (typeof window !== "undefined") {
	      g = window;
	    } else if (typeof global !== "undefined") {
	      g = global;
	    } else if (typeof self !== "undefined") {
	      g = self;
	    } else {
	      g = this;
	    }g.AutoLayout = f();
	  }
	})(function () {
	  var define, module, exports;return (function e(t, n, r) {
	    function s(o, u) {
	      if (!n[o]) {
	        if (!t[o]) {
	          var a = typeof require == "function" && require;if (!u && a) return require(o, !0);if (i) return i(o, !0);var f = new Error("Cannot find module '" + o + "'");throw (f.code = "MODULE_NOT_FOUND", f);
	        }var l = n[o] = { exports: {} };t[o][0].call(l.exports, function (e) {
	          var n = t[o][1][e];return s(n ? n : e);
	        }, l, l.exports, e, t, n, r);
	      }return n[o].exports;
	    }var i = typeof require == "function" && require;for (var o = 0; o < r.length; o++) s(r[o]);return s;
	  })({ 1: [function (require, module, exports) {
	      "use strict";function _classCallCheck(t, e) {
	        if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
	      }function _processEqualSpacer(t, e) {
	        t.equalSpacerIndex = t.equalSpacerIndex || 1;var r = "_~" + t.lineIndex + ":" + t.equalSpacerIndex + "~";t.equalSpacerIndex > 1 && t.constraints.push({ view1: "_~" + t.lineIndex + ":1~", attr1: t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, relation: t.relation.relation || Relation.EQU, view2: r, attr2: t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, priority: t.relation.priority }), t.equalSpacerIndex++, t.relation.view || t.relation.multiplier && 1 !== t.relation.multiplier ? (t.constraints.push({ view1: r, attr1: t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, relation: t.relation.relation || Relation.EQU, view2: t.relation.view, attr2: t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, priority: t.relation.priority, multiplier: t.relation.multiplier }), t.relation.multiplier = void 0) : t.relation.constant && (t.constraints.push({ view1: r, attr1: t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, relation: Relation.EQU, view2: null, attr2: Attribute.CONST, priority: t.relation.priority, constant: t.relation.constant }), t.relation.constant = void 0);for (var i = 0; i < t.prevViews.length; i++) {
	          var n = t.prevViews[i];switch (t.orientation) {case Orientation.HORIZONTAL:
	              t.prevAttr = n !== e ? Attribute.RIGHT : Attribute.LEFT, t.curAttr = Attribute.LEFT;break;case Orientation.VERTICAL:
	              t.prevAttr = n !== e ? Attribute.BOTTOM : Attribute.TOP, t.curAttr = Attribute.TOP;break;case Orientation.ZINDEX:
	              t.prevAttr = Attribute.ZINDEX, t.curAttr = Attribute.ZINDEX, t.relation.constant = n !== e ? "default" : 0;}t.constraints.push({ view1: n, attr1: t.prevAttr, relation: t.relation.relation, view2: r, attr2: t.curAttr, priority: t.relation.priority });
	        }t.prevViews = [r];
	      }function _processProportionalSpacer(t, e) {
	        t.proportionalSpacerIndex = t.proportionalSpacerIndex || 1;var r = "_-" + t.lineIndex + ":" + t.proportionalSpacerIndex + "-";t.proportionalSpacerIndex++, t.constraints.push({ view1: r, attr1: t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, relation: t.relation.relation || Relation.EQU, view2: t.relation.view, attr2: t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, priority: t.relation.priority, multiplier: t.relation.multiplier }), t.relation.multiplier = void 0;for (var i = 0; i < t.prevViews.length; i++) {
	          var n = t.prevViews[i];switch (t.orientation) {case Orientation.HORIZONTAL:
	              t.prevAttr = n !== e ? Attribute.RIGHT : Attribute.LEFT, t.curAttr = Attribute.LEFT;break;case Orientation.VERTICAL:
	              t.prevAttr = n !== e ? Attribute.BOTTOM : Attribute.TOP, t.curAttr = Attribute.TOP;break;case Orientation.ZINDEX:
	              t.prevAttr = Attribute.ZINDEX, t.curAttr = Attribute.ZINDEX, t.relation.constant = n !== e ? "default" : 0;}t.constraints.push({ view1: n, attr1: t.prevAttr, relation: t.relation.relation, view2: r, attr2: t.curAttr, priority: t.relation.priority });
	        }t.prevViews = [r];
	      }function _processStackView(t, e, r) {
	        for (var i = void 0, n = 1; 4 >= n; n *= 2) if (r.orientations & n && r.stack.orientation !== n && !(r.stack.processedOrientations & n)) {
	          r.stack.processedOrientations = r.stack.processedOrientations | n, i = i || { name: e, type: "stack" };for (var a = 0, s = r.stack.subViews.length; s > a; a++) n === Orientation.ZINDEX ? t.constraints.push({ view1: i, attr1: Attribute.ZINDEX, relation: Relation.EQU, view2: r.stack.subViews[a], attr2: Attribute.ZINDEX }) : (t.constraints.push({ view1: i, attr1: n === Orientation.VERTICAL ? Attribute.HEIGHT : Attribute.WIDTH, relation: Relation.EQU, view2: r.stack.subViews[a], attr2: n === Orientation.VERTICAL ? Attribute.HEIGHT : Attribute.WIDTH }), t.constraints.push({ view1: i, attr1: n === Orientation.VERTICAL ? Attribute.TOP : Attribute.LEFT, relation: Relation.EQU, view2: r.stack.subViews[a], attr2: n === Orientation.VERTICAL ? Attribute.TOP : Attribute.LEFT }));
	        }
	      }function _getRange(t, e) {
	        if ((e === !0 && (e = t.match(/\.\.\d+$/), e && (t = t.substring(0, t.length - e[0].length), e = parseInt(e[0].substring(2)))), !e)) return [t];var r,
	            i = t.match(/\d+$/),
	            n = [];if (i) for (t = t.substring(0, t.length - i[0].length), r = parseInt(i); e >= r; r++) n.push(t + r);else for (n.push(t), r = 2; e >= r; r++) n.push(t + r);return n;
	      }function _processCascade(t, e, r) {
	        var i = r ? r.view : null,
	            n = [],
	            a = [],
	            s = void 0;i && (e.push({ view: i }), a.push(i));for (var o = 0; o < e.length; o++) {
	          var u = e[o];if (!Array.isArray(u) && u.hasOwnProperty("view") || Array.isArray(u) && u[0].view && !u[0].relation) for (var c = Array.isArray(u) ? u : [u], l = 0; l < c.length; l++) {
	            u = c[l];for (var h = "," === u ? [] : u.view ? _getRange(u.view, u.range) : [null], p = 0; p < h.length; p++) {
	              var f = h[p];if ((a.push(f), f !== i && (n.push(f), s = t.subViews[f], s || (s = { orientations: 0 }, t.subViews[f] = s), s.orientations = s.orientations | t.orientation, s.stack && _processStackView(t, f, s)), void 0 !== t.prevViews && void 0 !== f && t.relation && "none" !== t.relation.relation)) for (var d = 0; d < t.prevViews.length; d++) {
	                var v = t.prevViews[d];switch (t.orientation) {case Orientation.HORIZONTAL:
	                    t.prevAttr = v !== i ? Attribute.RIGHT : Attribute.LEFT, t.curAttr = f !== i ? Attribute.LEFT : Attribute.RIGHT;break;case Orientation.VERTICAL:
	                    t.prevAttr = v !== i ? Attribute.BOTTOM : Attribute.TOP, t.curAttr = f !== i ? Attribute.TOP : Attribute.BOTTOM;break;case Orientation.ZINDEX:
	                    t.prevAttr = Attribute.ZINDEX, t.curAttr = Attribute.ZINDEX, t.relation.constant = v !== i ? "default" : 0;}t.constraints.push({ view1: v, attr1: t.prevAttr, relation: t.relation.relation, view2: f, attr2: t.curAttr, multiplier: t.relation.multiplier, constant: "default" !== t.relation.constant && t.relation.constant ? -t.relation.constant : t.relation.constant, priority: t.relation.priority });
	              }var A = u.constraints;if (A) for (var g = 0; g < A.length; g++) t.prevAttr = t.horizontal ? Attribute.WIDTH : Attribute.HEIGHT, t.curAttr = A[g].view || A[g].multiplier ? A[g].attribute || t.prevAttr : A[g].variable ? Attribute.VARIABLE : Attribute.CONST, t.constraints.push({ view1: f, attr1: t.prevAttr, relation: A[g].relation, view2: A[g].view, attr2: t.curAttr, multiplier: A[g].multiplier, constant: A[g].constant, priority: A[g].priority });u.cascade && _processCascade(t, u.cascade, u);
	            }
	          } else "," !== u && (t.prevViews = a, a = [], t.relation = u[0], void 0 !== t.prevViews && (t.relation.equalSpacing && _processEqualSpacer(t, i), t.relation.multiplier && _processProportionalSpacer(t, i)));
	        }if (i) {
	          if (s = t.subViews[i]) {
	            if (s.stack) {
	              var b = new Error('A stack named "' + i + '" has already been created');throw (b.column = r.$parserOffset + 1, b);
	            }
	          } else s = { orientations: t.orientation }, t.subViews[i] = s;s.stack = { orientation: t.orientation, processedOrientations: t.orientation, subViews: n }, _processStackView(t, i, s);
	        }
	      }function _getConst(t, e) {
	        var r,
	            r = new c.Variable({ value: e });return (this._solver.addConstraint(new c.StayConstraint(r, c.Strength.required, 0)), r);
	      }function _getSubView(t) {
	        return t ? t.name ? (this._subViews[t.name] = this._subViews[t.name] || new SubView({ name: t.name, solver: this._solver }), this._subViews[t.name]._type = this._subViews[t.name]._type || t.type, this._subViews[t.name]) : (this._subViews[t] = this._subViews[t] || new SubView({ name: t, solver: this._solver }), this._subViews[t]) : this._parentSubView;
	      }function _getSpacing(t) {
	        var e = 4;if (t.view1 || "left" !== t.attr1) if (t.view1 || "top" !== t.attr1) if (t.view2 || "right" !== t.attr2) if (t.view2 || "bottom" !== t.attr2) switch (t.attr1) {case "left":case "right":case "centerX":case "leading":case "trailing":
	            e = 4;break;case "zIndex":
	            e = 6;break;default:
	            e = 5;} else e = 2;else e = 1;else e = 0;else e = 3;return (this._spacingVars = this._spacingVars || new Array(7), this._spacingExpr = this._spacingExpr || new Array(7), this._spacingVars[e] || (this._spacingVars[e] = new c.Variable(), this._solver.addEditVar(this._spacingVars[e]), this._spacingExpr[e] = c.minus(0, this._spacingVars[e]), this._solver.suggestValue(this._spacingVars[e], this._spacing[e])), this._spacingExpr[e]);
	      }function _addConstraint(t) {
	        var e = void 0,
	            r = void 0 !== t.multiplier ? t.multiplier : 1,
	            i = void 0 !== t.constant ? t.constant : 0;"default" === i && (i = _getSpacing.call(this, t));var n,
	            a = _getSubView.call(this, t.view1)._getAttr(t.attr1),
	            s = void 0;t.attr2 === Attribute.CONST ? s = _getConst.call(this, void 0, t.constant) : (s = _getSubView.call(this, t.view2)._getAttr(t.attr2), 1 !== r && i ? s = c.plus(c.times(s, r), i) : i ? s = c.plus(s, i) : 1 !== r && (s = c.times(s, r)));var n = void 0 !== t.priority && t.priority < 1e3 ? new c.Strength("priority", 0, t.priority, 1e3) : defaultPriorityStrength;switch (t.relation) {case Relation.EQU:
	            e = new c.Equation(a, s, n);break;case Relation.GEQ:
	            e = new c.Inequality(a, c.GEQ, s, n);break;case Relation.LEQ:
	            e = new c.Inequality(a, c.LEQ, s, n);break;default:
	            throw "Invalid relation specified: " + t.relation;}this._solver.addConstraint(e);
	      }function _compareSpacing(t, e) {
	        if (t === e) return !0;if (!t || !e) return !1;for (var r = 0; 7 > r; r++) if (t[r] !== e[r]) return !1;return !0;
	      }var _createClass = (function () {
	        function t(t, e) {
	          for (var r = 0; r < e.length; r++) {
	            var i = e[r];i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
	          }
	        }return function (e, r, i) {
	          return (r && t(e.prototype, r), i && t(e, i), e);
	        };
	      })(),
	          c = require("cassowary/bin/c"),
	          Attribute = { CONST: "const", NOTANATTRIBUTE: "const", VARIABLE: "var", LEFT: "left", RIGHT: "right", TOP: "top", BOTTOM: "bottom", WIDTH: "width", HEIGHT: "height", CENTERX: "centerX", CENTERY: "centerY", ZINDEX: "zIndex" },
	          Relation = { LEQ: "leq", EQU: "equ", GEQ: "geq" },
	          Priority = { REQUIRED: 1e3, DEFAULTHIGH: 750, DEFAULTLOW: 250 },
	          parser = (function () {
	        function t(t, e) {
	          function r() {
	            this.constructor = t;
	          }r.prototype = e.prototype, t.prototype = new r();
	        }function e(t, e, r, i, n, a) {
	          this.message = t, this.expected = e, this.found = r, this.offset = i, this.line = n, this.column = a, this.name = "SyntaxError";
	        }function r(t) {
	          function r() {
	            return xt;
	          }function i(e) {
	            function r(e, r, i) {
	              var n, a;for (n = r; i > n; n++) a = t.charAt(n), "\n" === a ? (e.seenCR || e.line++, e.column = 1, e.seenCR = !1) : "\r" === a || "\u2028" === a || "\u2029" === a ? (e.line++, e.column = 1, e.seenCR = !0) : (e.column++, e.seenCR = !1);
	            }return (kt !== e && (kt > e && (kt = 0, Rt = { line: 1, column: 1, seenCR: !1 }), r(Rt, kt, e), kt = e), Rt);
	          }function n(t) {
	            Ft > St || (St > Ft && (Ft = St, Nt = []), Nt.push(t));
	          }function a(r, n, a) {
	            function s(t) {
	              var e = 1;for (t.sort(function (t, e) {
	                return t.description < e.description ? -1 : t.description > e.description ? 1 : 0;
	              }); e < t.length;) t[e - 1] === t[e] ? t.splice(e, 1) : e++;
	            }function o(t, e) {
	              function r(t) {
	                function e(t) {
	                  return t.charCodeAt(0).toString(16).toUpperCase();
	                }return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (t) {
	                  return "\\x0" + e(t);
	                }).replace(/[\x10-\x1F\x80-\xFF]/g, function (t) {
	                  return "\\x" + e(t);
	                }).replace(/[\u0180-\u0FFF]/g, function (t) {
	                  return "\\u0" + e(t);
	                }).replace(/[\u1080-\uFFFF]/g, function (t) {
	                  return "\\u" + e(t);
	                });
	              }var i,
	                  n,
	                  a,
	                  s = new Array(t.length);for (a = 0; a < t.length; a++) s[a] = t[a].description;return (i = t.length > 1 ? s.slice(0, -1).join(", ") + " or " + s[t.length - 1] : s[0], n = e ? '"' + r(e) + '"' : "end of input", "Expected " + i + " but " + n + " found.");
	            }var u = i(a),
	                c = a < t.length ? t.charAt(a) : null;return (null !== n && s(n), new e(null !== r ? r : o(n, c), n, c, a, u.line, u.column));
	          }function s() {
	            var e, r, i, a, s, h, p, f;if ((e = St, r = St, i = o(), i !== E ? (58 === t.charCodeAt(St) ? (a = H, St++) : (a = E, 0 === Lt && n(S)), a !== E ? (i = [i, a], r = i) : (St = r, r = m)) : (St = r, r = m), r === E && (r = O), r !== E)) if ((i = St, a = u(), a !== E ? (s = l(), s !== E ? (a = [a, s], i = a) : (St = i, i = m)) : (St = i, i = m), i === E && (i = O), i !== E)) if ((a = c(), a !== E)) {
	              for (s = [], h = St, p = l(), p !== E ? (f = c(), f !== E ? (p = [p, f], h = p) : (St = h, h = m)) : (St = h, h = m); h !== E;) s.push(h), h = St, p = l(), p !== E ? (f = c(), f !== E ? (p = [p, f], h = p) : (St = h, h = m)) : (St = h, h = m);s !== E ? (h = St, p = l(), p !== E ? (f = u(), f !== E ? (p = [p, f], h = p) : (St = h, h = m)) : (St = h, h = m), h === E && (h = O), h !== E ? (xt = e, r = x(r, i, a, s, h), e = r) : (St = e, e = m)) : (St = e, e = m);
	            } else St = e, e = m;else St = e, e = m;else St = e, e = m;return e;
	          }function o() {
	            var e, r;return (e = St, 72 === t.charCodeAt(St) ? (r = k, St++) : (r = E, 0 === Lt && n(R)), r === E && (86 === t.charCodeAt(St) ? (r = F, St++) : (r = E, 0 === Lt && n(N))), r !== E && (xt = e, r = L(r)), e = r);
	          }function u() {
	            var e, r;return (e = St, 124 === t.charCodeAt(St) ? (r = q, St++) : (r = E, 0 === Lt && n(Z)), r !== E && (xt = e, r = D()), e = r);
	          }function c() {
	            var e, r, i, a, s;return (e = St, 91 === t.charCodeAt(St) ? (r = z, St++) : (r = E, 0 === Lt && n(G)), r !== E ? (i = w(), i !== E ? (a = f(), a === E && (a = O), a !== E ? (93 === t.charCodeAt(St) ? (s = X, St++) : (s = E, 0 === Lt && n(P)), s !== E ? (xt = e, r = W(i, a), e = r) : (St = e, e = m)) : (St = e, e = m)) : (St = e, e = m)) : (St = e, e = m), e);
	          }function l() {
	            var e, r, i, a;return (e = St, 45 === t.charCodeAt(St) ? (r = Q, St++) : (r = E, 0 === Lt && n(U)), r !== E ? (i = h(), i !== E ? (45 === t.charCodeAt(St) ? (a = Q, St++) : (a = E, 0 === Lt && n(U)), a !== E ? (xt = e, r = B(i), e = r) : (St = e, e = m)) : (St = e, e = m)) : (St = e, e = m), e === E && (e = St, 45 === t.charCodeAt(St) ? (r = Q, St++) : (r = E, 0 === Lt && n(U)), r !== E && (xt = e, r = $()), e = r, e === E && (e = St, r = j, r !== E && (xt = e, r = Y()), e = r)), e);
	          }function h() {
	            var t;return (t = p(), t === E && (t = f()), t);
	          }function p() {
	            var t, e;return (t = St, e = _(), e !== E && (xt = t, e = M(e)), t = e);
	          }function f() {
	            var e, r, i, a, s, o, u;if ((e = St, 40 === t.charCodeAt(St) ? (r = J, St++) : (r = E, 0 === Lt && n(K)), r !== E)) if ((i = d(), i !== E)) {
	              for (a = [], s = St, 44 === t.charCodeAt(St) ? (o = tt, St++) : (o = E, 0 === Lt && n(et)), o !== E ? (u = d(), u !== E ? (o = [o, u], s = o) : (St = s, s = m)) : (St = s, s = m); s !== E;) a.push(s), s = St, 44 === t.charCodeAt(St) ? (o = tt, St++) : (o = E, 0 === Lt && n(et)), o !== E ? (u = d(), u !== E ? (o = [o, u], s = o) : (St = s, s = m)) : (St = s, s = m);a !== E ? (41 === t.charCodeAt(St) ? (s = rt, St++) : (s = E, 0 === Lt && n(it)), s !== E ? (xt = e, r = nt(i, a), e = r) : (St = e, e = m)) : (St = e, e = m);
	            } else St = e, e = m;else St = e, e = m;return e;
	          }function d() {
	            var e, r, i, a, s, o;return (e = St, r = v(), r === E && (r = O), r !== E ? (i = A(), i !== E ? (a = St, 64 === t.charCodeAt(St) ? (s = at, St++) : (s = E, 0 === Lt && n(st)), s !== E ? (o = g(), o !== E ? (s = [s, o], a = s) : (St = a, a = m)) : (St = a, a = m), a === E && (a = O), a !== E ? (xt = e, r = ot(r, i, a), e = r) : (St = e, e = m)) : (St = e, e = m)) : (St = e, e = m), e);
	          }function v() {
	            var e, r;return (e = St, t.substr(St, 2) === ut ? (r = ut, St += 2) : (r = E, 0 === Lt && n(ct)), r !== E && (xt = e, r = lt()), e = r, e === E && (e = St, t.substr(St, 2) === ht ? (r = ht, St += 2) : (r = E, 0 === Lt && n(pt)), r !== E && (xt = e, r = ft()), e = r, e === E && (e = St, t.substr(St, 2) === dt ? (r = dt, St += 2) : (r = E, 0 === Lt && n(vt)), r !== E && (xt = e, r = At()), e = r)), e);
	          }function A() {
	            var t;return (t = b(), t === E && (t = w()), t);
	          }function g() {
	            var e, r, i;if ((e = St, r = [], gt.test(t.charAt(St)) ? (i = t.charAt(St), St++) : (i = E, 0 === Lt && n(bt)), i !== E)) for (; i !== E;) r.push(i), gt.test(t.charAt(St)) ? (i = t.charAt(St), St++) : (i = E, 0 === Lt && n(bt));else r = m;return (r !== E && (xt = e, r = wt(r)), e = r);
	          }function b() {
	            var t, e;return (t = St, e = _(), e !== E && (xt = t, e = _t(e)), t = e);
	          }function w() {
	            var e, r, i, a, s;if ((e = St, r = St, i = [], yt.test(t.charAt(St)) ? (a = t.charAt(St), St++) : (a = E, 0 === Lt && n(Ct)), a !== E)) for (; a !== E;) i.push(a), yt.test(t.charAt(St)) ? (a = t.charAt(St), St++) : (a = E, 0 === Lt && n(Ct));else i = m;if ((i !== E && (i = t.substring(r, St)), r = i, r !== E)) {
	              for (i = St, a = [], It.test(t.charAt(St)) ? (s = t.charAt(St), St++) : (s = E, 0 === Lt && n(Et)); s !== E;) a.push(s), It.test(t.charAt(St)) ? (s = t.charAt(St), St++) : (s = E, 0 === Lt && n(Et));a !== E && (a = t.substring(i, St)), i = a, i !== E ? (xt = e, r = Tt(r, i), e = r) : (St = e, e = m);
	            } else St = e, e = m;return e;
	          }function _() {
	            var e, r, i, a, s;if ((e = St, r = [], gt.test(t.charAt(St)) ? (i = t.charAt(St), St++) : (i = E, 0 === Lt && n(bt)), i !== E)) for (; i !== E;) r.push(i), gt.test(t.charAt(St)) ? (i = t.charAt(St), St++) : (i = E, 0 === Lt && n(bt));else r = m;if (r !== E) if ((46 === t.charCodeAt(St) ? (i = Vt, St++) : (i = E, 0 === Lt && n(mt)), i !== E)) {
	              if ((a = [], gt.test(t.charAt(St)) ? (s = t.charAt(St), St++) : (s = E, 0 === Lt && n(bt)), s !== E)) for (; s !== E;) a.push(s), gt.test(t.charAt(St)) ? (s = t.charAt(St), St++) : (s = E, 0 === Lt && n(bt));else a = m;a !== E ? (xt = e, r = Ot(r, a), e = r) : (St = e, e = m);
	            } else St = e, e = m;else St = e, e = m;if (e === E) {
	              if ((e = St, r = [], gt.test(t.charAt(St)) ? (i = t.charAt(St), St++) : (i = E, 0 === Lt && n(bt)), i !== E)) for (; i !== E;) r.push(i), gt.test(t.charAt(St)) ? (i = t.charAt(St), St++) : (i = E, 0 === Lt && n(bt));else r = m;r !== E && (xt = e, r = Ht(r)), e = r;
	            }return e;
	          }function y(t) {
	            for (var e = 1; e < arguments.length; e++) for (var r in arguments[e]) t[r] = arguments[e][r];return t;
	          }var C,
	              I = arguments.length > 1 ? arguments[1] : {},
	              E = {},
	              T = { visualFormatString: s },
	              V = s,
	              m = E,
	              O = null,
	              H = ":",
	              S = { type: "literal", value: ":", description: '":"' },
	              x = function x(t, e, r, i, n) {
	            return { orientation: t ? t[0] : "horizontal", cascade: (e || []).concat([r], [].concat.apply([], i), n || []) };
	          },
	              k = "H",
	              R = { type: "literal", value: "H", description: '"H"' },
	              F = "V",
	              N = { type: "literal", value: "V", description: '"V"' },
	              L = function L(t) {
	            return "H" == t ? "horizontal" : "vertical";
	          },
	              q = "|",
	              Z = { type: "literal", value: "|", description: '"|"' },
	              D = function D() {
	            return { view: null };
	          },
	              z = "[",
	              G = { type: "literal", value: "[", description: '"["' },
	              X = "]",
	              P = { type: "literal", value: "]", description: '"]"' },
	              W = function W(t, e) {
	            return y(t, e ? { constraints: e } : {});
	          },
	              Q = "-",
	              U = { type: "literal", value: "-", description: '"-"' },
	              B = function B(t) {
	            return t;
	          },
	              $ = function $() {
	            return [{ relation: "equ", constant: "default", $parserOffset: r() }];
	          },
	              j = "",
	              Y = function Y() {
	            return [{ relation: "equ", constant: 0, $parserOffset: r() }];
	          },
	              M = function M(t) {
	            return [{ relation: "equ", constant: t, $parserOffset: r() }];
	          },
	              J = "(",
	              K = { type: "literal", value: "(", description: '"("' },
	              tt = ",",
	              et = { type: "literal", value: ",", description: '","' },
	              rt = ")",
	              it = { type: "literal", value: ")", description: '")"' },
	              nt = function nt(t, e) {
	            return [t].concat(e.map(function (t) {
	              return t[1];
	            }));
	          },
	              at = "@",
	              st = { type: "literal", value: "@", description: '"@"' },
	              ot = function ot(t, e, r) {
	            return y({ relation: "equ" }, t || {}, e, r ? r[1] : {});
	          },
	              ut = "==",
	              ct = { type: "literal", value: "==", description: '"=="' },
	              lt = function lt() {
	            return { relation: "equ", $parserOffset: r() };
	          },
	              ht = "<=",
	              pt = { type: "literal", value: "<=", description: '"<="' },
	              ft = function ft() {
	            return { relation: "leq", $parserOffset: r() };
	          },
	              dt = ">=",
	              vt = { type: "literal", value: ">=", description: '">="' },
	              At = function At() {
	            return { relation: "geq", $parserOffset: r() };
	          },
	              gt = /^[0-9]/,
	              bt = { type: "class", value: "[0-9]", description: "[0-9]" },
	              wt = function wt(t) {
	            return { priority: parseInt(t.join(""), 10) };
	          },
	              _t = function _t(t) {
	            return { constant: t };
	          },
	              yt = /^[a-zA-Z_]/,
	              Ct = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
	              It = /^[a-zA-Z0-9_]/,
	              Et = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
	              Tt = function Tt(t, e) {
	            return { view: t + e };
	          },
	              Vt = ".",
	              mt = { type: "literal", value: ".", description: '"."' },
	              Ot = function Ot(t, e) {
	            return parseFloat(t.concat(".").concat(e).join(""), 10);
	          },
	              Ht = function Ht(t) {
	            return parseInt(t.join(""), 10);
	          },
	              St = 0,
	              xt = 0,
	              kt = 0,
	              Rt = { line: 1, column: 1, seenCR: !1 },
	              Ft = 0,
	              Nt = [],
	              Lt = 0;if ("startRule" in I) {
	            if (!(I.startRule in T)) throw new Error("Can't start parsing from rule \"" + I.startRule + '".');V = T[I.startRule];
	          }if ((C = V(), C !== E && St === t.length)) return C;throw (C !== E && St < t.length && n({ type: "end", description: "end of input" }), a(null, Nt, Ft));
	        }return (t(e, Error), { SyntaxError: e, parse: r });
	      })(),
	          parserExt = (function () {
	        function t(t, e) {
	          function r() {
	            this.constructor = t;
	          }r.prototype = e.prototype, t.prototype = new r();
	        }function e(t, e, r, i, n, a) {
	          this.message = t, this.expected = e, this.found = r, this.offset = i, this.line = n, this.column = a, this.name = "SyntaxError";
	        }function r(t) {
	          function r() {
	            return Je;
	          }function i(e) {
	            function r(e, r, i) {
	              var n, a;for (n = r; i > n; n++) a = t.charAt(n), "\n" === a ? (e.seenCR || e.line++, e.column = 1, e.seenCR = !1) : "\r" === a || "\u2028" === a || "\u2029" === a ? (e.line++, e.column = 1, e.seenCR = !0) : (e.column++, e.seenCR = !1);
	            }return (Ke !== e && (Ke > e && (Ke = 0, tr = { line: 1, column: 1, seenCR: !1 }), r(tr, Ke, e), Ke = e), tr);
	          }function n(t) {
	            er > Me || (Me > er && (er = Me, rr = []), rr.push(t));
	          }function a(r, n, a) {
	            function s(t) {
	              var e = 1;for (t.sort(function (t, e) {
	                return t.description < e.description ? -1 : t.description > e.description ? 1 : 0;
	              }); e < t.length;) t[e - 1] === t[e] ? t.splice(e, 1) : e++;
	            }function o(t, e) {
	              function r(t) {
	                function e(t) {
	                  return t.charCodeAt(0).toString(16).toUpperCase();
	                }return t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (t) {
	                  return "\\x0" + e(t);
	                }).replace(/[\x10-\x1F\x80-\xFF]/g, function (t) {
	                  return "\\x" + e(t);
	                }).replace(/[\u0180-\u0FFF]/g, function (t) {
	                  return "\\u0" + e(t);
	                }).replace(/[\u1080-\uFFFF]/g, function (t) {
	                  return "\\u" + e(t);
	                });
	              }var i,
	                  n,
	                  a,
	                  s = new Array(t.length);for (a = 0; a < t.length; a++) s[a] = t[a].description;return (i = t.length > 1 ? s.slice(0, -1).join(", ") + " or " + s[t.length - 1] : s[0], n = e ? '"' + r(e) + '"' : "end of input", "Expected " + i + " but " + n + " found.");
	            }var u = i(a),
	                c = a < t.length ? t.charAt(a) : null;return (null !== n && s(n), new e(null !== r ? r : o(n, c), n, c, a, u.line, u.column));
	          }function s() {
	            var e, r, i, a, s, h, p, d;if ((e = Me, r = Me, i = o(), i !== L ? (58 === t.charCodeAt(Me) ? (a = G, Me++) : (a = L, 0 === ir && n(X)), a !== L ? (i = [i, a], r = i) : (Me = r, r = D)) : (Me = r, r = D), r === L && (r = z), r !== L)) if ((i = Me, a = c(), a !== L ? (s = f(), s !== L ? (a = [a, s], i = a) : (Me = i, i = D)) : (Me = i, i = D), i === L && (i = z), i !== L)) if ((a = l(), a !== L)) {
	              for (s = [], h = Me, p = f(), p !== L ? (d = l(), d !== L ? (p = [p, d], h = p) : (Me = h, h = D)) : (Me = h, h = D); h !== L;) s.push(h), h = Me, p = f(), p !== L ? (d = l(), d !== L ? (p = [p, d], h = p) : (Me = h, h = D)) : (Me = h, h = D);s !== L ? (h = Me, p = f(), p !== L ? (d = c(), d !== L ? (p = [p, d], h = p) : (Me = h, h = D)) : (Me = h, h = D), h === L && (h = z), h !== L ? (p = u(), p === L && (p = z), p !== L ? (Je = e, r = P(r, i, a, s, h, p), e = r) : (Me = e, e = D)) : (Me = e, e = D)) : (Me = e, e = D);
	            } else Me = e, e = D;else Me = e, e = D;else Me = e, e = D;return e;
	          }function o() {
	            var e, r;return (e = Me, t.substr(Me, 2) === W ? (r = W, Me += 2) : (r = L, 0 === ir && n(Q)), r !== L && (Je = e, r = U()), e = r, e === L && (e = Me, 72 === t.charCodeAt(Me) ? (r = B, Me++) : (r = L, 0 === ir && n($)), r !== L && (Je = e, r = j()), e = r, e === L && (e = Me, 86 === t.charCodeAt(Me) ? (r = Y, Me++) : (r = L, 0 === ir && n(M)), r !== L && (Je = e, r = J()), e = r, e === L && (e = Me, 90 === t.charCodeAt(Me) ? (r = K, Me++) : (r = L, 0 === ir && n(tt)), r !== L && (Je = e, r = et()), e = r))), e);
	          }function u() {
	            var e, r, i, a, s;for (e = Me, r = [], 32 === t.charCodeAt(Me) ? (i = rt, Me++) : (i = L, 0 === ir && n(it)); i !== L;) r.push(i), 32 === t.charCodeAt(Me) ? (i = rt, Me++) : (i = L, 0 === ir && n(it));if (r !== L) if ((t.substr(Me, 2) === nt ? (i = nt, Me += 2) : (i = L, 0 === ir && n(at)), i !== L)) {
	              for (a = [], t.length > Me ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(st)); s !== L;) a.push(s), t.length > Me ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(st));a !== L ? (r = [r, i, a], e = r) : (Me = e, e = D);
	            } else Me = e, e = D;else Me = e, e = D;return e;
	          }function c() {
	            var e, r;return (e = Me, 124 === t.charCodeAt(Me) ? (r = ot, Me++) : (r = L, 0 === ir && n(ut)), r !== L && (Je = e, r = ct()), e = r);
	          }function l() {
	            var e, r, i, a, s, o, u;if ((e = Me, 91 === t.charCodeAt(Me) ? (r = lt, Me++) : (r = L, 0 === ir && n(ht)), r !== L)) if ((i = h(), i !== L)) {
	              for (a = [], s = Me, 44 === t.charCodeAt(Me) ? (o = pt, Me++) : (o = L, 0 === ir && n(ft)), o !== L ? (u = h(), u !== L ? (o = [o, u], s = o) : (Me = s, s = D)) : (Me = s, s = D); s !== L;) a.push(s), s = Me, 44 === t.charCodeAt(Me) ? (o = pt, Me++) : (o = L, 0 === ir && n(ft)), o !== L ? (u = h(), u !== L ? (o = [o, u], s = o) : (Me = s, s = D)) : (Me = s, s = D);a !== L ? (93 === t.charCodeAt(Me) ? (s = dt, Me++) : (s = L, 0 === ir && n(vt)), s !== L ? (Je = e, r = At(i, a), e = r) : (Me = e, e = D)) : (Me = e, e = D);
	            } else Me = e, e = D;else Me = e, e = D;return e;
	          }function h() {
	            var t, e, r, i;return (t = Me, e = H(), e !== L ? (r = A(), r === L && (r = z), r !== L ? (i = p(), i === L && (i = z), i !== L ? (Je = t, e = gt(e, r, i), t = e) : (Me = t, t = D)) : (Me = t, t = D)) : (Me = t, t = D), t);
	          }function p() {
	            var e, r, i, a, s, o;if ((e = Me, 58 === t.charCodeAt(Me) ? (r = G, Me++) : (r = L, 0 === ir && n(X)), r !== L)) {
	              if ((i = [], a = Me, s = f(), s !== L ? (o = l(), o !== L ? (s = [s, o], a = s) : (Me = a, a = D)) : (Me = a, a = D), a !== L)) for (; a !== L;) i.push(a), a = Me, s = f(), s !== L ? (o = l(), o !== L ? (s = [s, o], a = s) : (Me = a, a = D)) : (Me = a, a = D);else i = D;i !== L ? (a = f(), a !== L ? (Je = e, r = bt(i, a), e = r) : (Me = e, e = D)) : (Me = e, e = D);
	            } else Me = e, e = D;return e;
	          }function f() {
	            var e, r, i, a;return (e = Me, t.substr(Me, 2) === wt ? (r = wt, Me += 2) : (r = L, 0 === ir && n(_t)), r !== L && (Je = e, r = yt()), e = r, e === L && (e = Me, 45 === t.charCodeAt(Me) ? (r = Ct, Me++) : (r = L, 0 === ir && n(It)), r !== L ? (i = d(), i !== L ? (45 === t.charCodeAt(Me) ? (a = Ct, Me++) : (a = L, 0 === ir && n(It)), a !== L ? (Je = e, r = Et(i), e = r) : (Me = e, e = D)) : (Me = e, e = D)) : (Me = e, e = D), e === L && (e = Me, 45 === t.charCodeAt(Me) ? (r = Ct, Me++) : (r = L, 0 === ir && n(It)), r !== L && (Je = e, r = Tt()), e = r, e === L && (e = Me, 126 === t.charCodeAt(Me) ? (r = Vt, Me++) : (r = L, 0 === ir && n(mt)), r !== L ? (i = b(), i !== L ? (126 === t.charCodeAt(Me) ? (a = Vt, Me++) : (a = L, 0 === ir && n(mt)), a !== L ? (Je = e, r = Et(i), e = r) : (Me = e, e = D)) : (Me = e, e = D)) : (Me = e, e = D), e === L && (e = Me, 126 === t.charCodeAt(Me) ? (r = Vt, Me++) : (r = L, 0 === ir && n(mt)), r !== L && (Je = e, r = Ot()), e = r, e === L && (e = Me, r = Ht, r !== L && (Je = e, r = St()), e = r))))), e);
	          }function d() {
	            var t;return (t = v(), t === L && (t = A()), t);
	          }function v() {
	            var t, e;return (t = Me, e = E(), e !== L && (Je = t, e = xt(e)), t = e, t === L && (t = Me, e = k(), e !== L && (Je = t, e = kt(e)), t = e), t);
	          }function A() {
	            var e, r, i, a, s, o, u;if ((e = Me, 40 === t.charCodeAt(Me) ? (r = Rt, Me++) : (r = L, 0 === ir && n(Ft)), r !== L)) if ((i = g(), i !== L)) {
	              for (a = [], s = Me, 44 === t.charCodeAt(Me) ? (o = pt, Me++) : (o = L, 0 === ir && n(ft)), o !== L ? (u = g(), u !== L ? (o = [o, u], s = o) : (Me = s, s = D)) : (Me = s, s = D); s !== L;) a.push(s), s = Me, 44 === t.charCodeAt(Me) ? (o = pt, Me++) : (o = L, 0 === ir && n(ft)), o !== L ? (u = g(), u !== L ? (o = [o, u], s = o) : (Me = s, s = D)) : (Me = s, s = D);a !== L ? (41 === t.charCodeAt(Me) ? (s = Nt, Me++) : (s = L, 0 === ir && n(Lt)), s !== L ? (Je = e, r = qt(i, a), e = r) : (Me = e, e = D)) : (Me = e, e = D);
	            } else Me = e, e = D;else Me = e, e = D;return e;
	          }function g() {
	            var e, r, i, a, s, o;return (e = Me, r = _(), r === L && (r = z), r !== L ? (i = y(), i !== L ? (a = Me, 64 === t.charCodeAt(Me) ? (s = Zt, Me++) : (s = L, 0 === ir && n(Dt)), s !== L ? (o = C(), o !== L ? (s = [s, o], a = s) : (Me = a, a = D)) : (Me = a, a = D), a === L && (a = z), a !== L ? (Je = e, r = zt(r, i, a), e = r) : (Me = e, e = D)) : (Me = e, e = D)) : (Me = e, e = D), e);
	          }function b() {
	            var e, r, i, a, s, o, u;if ((e = Me, 40 === t.charCodeAt(Me) ? (r = Rt, Me++) : (r = L, 0 === ir && n(Ft)), r !== L)) if ((i = w(), i !== L)) {
	              for (a = [], s = Me, 44 === t.charCodeAt(Me) ? (o = pt, Me++) : (o = L, 0 === ir && n(ft)), o !== L ? (u = w(), u !== L ? (o = [o, u], s = o) : (Me = s, s = D)) : (Me = s, s = D); s !== L;) a.push(s), s = Me, 44 === t.charCodeAt(Me) ? (o = pt, Me++) : (o = L, 0 === ir && n(ft)), o !== L ? (u = w(), u !== L ? (o = [o, u], s = o) : (Me = s, s = D)) : (Me = s, s = D);a !== L ? (41 === t.charCodeAt(Me) ? (s = Nt, Me++) : (s = L, 0 === ir && n(Lt)), s !== L ? (Je = e, r = qt(i, a), e = r) : (Me = e, e = D)) : (Me = e, e = D);
	            } else Me = e, e = D;else Me = e, e = D;return e;
	          }function w() {
	            var e, r, i, a, s, o;return (e = Me, r = _(), r === L && (r = z), r !== L ? (i = y(), i !== L ? (a = Me, 64 === t.charCodeAt(Me) ? (s = Zt, Me++) : (s = L, 0 === ir && n(Dt)), s !== L ? (o = C(), o !== L ? (s = [s, o], a = s) : (Me = a, a = D)) : (Me = a, a = D), a === L && (a = z), a !== L ? (Je = e, r = Gt(r, i, a), e = r) : (Me = e, e = D)) : (Me = e, e = D)) : (Me = e, e = D), e);
	          }function _() {
	            var e, r;return (e = Me, t.substr(Me, 2) === Xt ? (r = Xt, Me += 2) : (r = L, 0 === ir && n(Pt)), r !== L && (Je = e, r = Wt()), e = r, e === L && (e = Me, t.substr(Me, 2) === Qt ? (r = Qt, Me += 2) : (r = L, 0 === ir && n(Ut)), r !== L && (Je = e, r = Bt()), e = r, e === L && (e = Me, t.substr(Me, 2) === $t ? (r = $t, Me += 2) : (r = L, 0 === ir && n(jt)), r !== L && (Je = e, r = Yt()), e = r)), e);
	          }function y() {
	            var t;return (t = E(), t === L && (t = I(), t === L && (t = T())), t);
	          }function C() {
	            var e, r, i;if ((e = Me, r = [], Mt.test(t.charAt(Me)) ? (i = t.charAt(Me), Me++) : (i = L, 0 === ir && n(Jt)), i !== L)) for (; i !== L;) r.push(i), Mt.test(t.charAt(Me)) ? (i = t.charAt(Me), Me++) : (i = L, 0 === ir && n(Jt));else r = D;return (r !== L && (Je = e, r = Kt(r)), e = r);
	          }function I() {
	            var t, e;return (t = Me, e = k(), e !== L && (Je = t, e = te(e)), t = e);
	          }function E() {
	            var e, r, i;return (e = Me, r = k(), r !== L ? (37 === t.charCodeAt(Me) ? (i = ee, Me++) : (i = L, 0 === ir && n(re)), i !== L ? (Je = e, r = ie(r), e = r) : (Me = e, e = D)) : (Me = e, e = D), e);
	          }function T() {
	            var t, e, r, i, n;return (t = Me, e = S(), e !== L ? (r = V(), r === L && (r = z), r !== L ? (i = m(), i === L && (i = z), i !== L ? (n = O(), n === L && (n = z), n !== L ? (Je = t, e = ne(e, r, i, n), t = e) : (Me = t, t = D)) : (Me = t, t = D)) : (Me = t, t = D)) : (Me = t, t = D), t);
	          }function V() {
	            var e, r;return (e = Me, t.substr(Me, 5) === ae ? (r = ae, Me += 5) : (r = L, 0 === ir && n(se)), r !== L && (Je = e, r = oe()), e = r, e === L && (e = Me, t.substr(Me, 6) === ue ? (r = ue, Me += 6) : (r = L, 0 === ir && n(ce)), r !== L && (Je = e, r = le()), e = r, e === L && (e = Me, t.substr(Me, 4) === he ? (r = he, Me += 4) : (r = L, 0 === ir && n(pe)), r !== L && (Je = e, r = fe()), e = r, e === L && (e = Me, t.substr(Me, 7) === de ? (r = de, Me += 7) : (r = L, 0 === ir && n(ve)), r !== L && (Je = e, r = Ae()), e = r, e === L && (e = Me, t.substr(Me, 6) === ge ? (r = ge, Me += 6) : (r = L, 0 === ir && n(be)), r !== L && (Je = e, r = we()), e = r, e === L && (e = Me, t.substr(Me, 7) === _e ? (r = _e, Me += 7) : (r = L, 0 === ir && n(ye)), r !== L && (Je = e, r = Ce()), e = r, e === L && (e = Me, t.substr(Me, 8) === Ie ? (r = Ie, Me += 8) : (r = L, 0 === ir && n(Ee)), r !== L && (Je = e, r = Te()), e = r, e === L && (e = Me, t.substr(Me, 8) === Ve ? (r = Ve, Me += 8) : (r = L, 0 === ir && n(me)), r !== L && (Je = e, r = Oe()), e = r))))))), e);
	          }function m() {
	            var e, r, i;return (e = Me, 47 === t.charCodeAt(Me) ? (r = He, Me++) : (r = L, 0 === ir && n(Se)), r !== L ? (i = k(), i !== L ? (Je = e, r = xe(i), e = r) : (Me = e, e = D)) : (Me = e, e = D), e === L && (e = Me, 42 === t.charCodeAt(Me) ? (r = ke, Me++) : (r = L, 0 === ir && n(Re)), r !== L ? (i = k(), i !== L ? (Je = e, r = Fe(i), e = r) : (Me = e, e = D)) : (Me = e, e = D)), e);
	          }function O() {
	            var e, r, i;return (e = Me, 45 === t.charCodeAt(Me) ? (r = Ct, Me++) : (r = L, 0 === ir && n(It)), r !== L ? (i = k(), i !== L ? (Je = e, r = Ne(i), e = r) : (Me = e, e = D)) : (Me = e, e = D), e === L && (e = Me, 43 === t.charCodeAt(Me) ? (r = Le, Me++) : (r = L, 0 === ir && n(qe)), r !== L ? (i = k(), i !== L ? (Je = e, r = Fe(i), e = r) : (Me = e, e = D)) : (Me = e, e = D)), e);
	          }function H() {
	            var e, r, i, a, s;if ((e = Me, r = Me, i = [], Ze.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(De)), a !== L)) for (; a !== L;) i.push(a), Ze.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(De));else i = D;if ((i !== L && (i = t.substring(r, Me)), r = i, r !== L)) {
	              for (i = Me, a = [], ze.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Ge)); s !== L;) a.push(s), ze.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Ge));a !== L && (a = t.substring(i, Me)), i = a, i !== L ? (a = x(), a !== L ? (Je = e, r = Xe(r, i, a), e = r) : (Me = e, e = D)) : (Me = e, e = D);
	            } else Me = e, e = D;if (e === L) {
	              if ((e = Me, r = Me, i = [], Ze.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(De)), a !== L)) for (; a !== L;) i.push(a), Ze.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(De));else i = D;if ((i !== L && (i = t.substring(r, Me)), r = i, r !== L)) {
	                for (i = Me, a = [], ze.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Ge)); s !== L;) a.push(s), ze.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Ge));a !== L && (a = t.substring(i, Me)), i = a, i !== L ? (Je = e, r = Pe(r, i), e = r) : (Me = e, e = D);
	              } else Me = e, e = D;
	            }return e;
	          }function S() {
	            var e, r, i, a, s;if ((e = Me, r = Me, i = [], Ze.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(De)), a !== L)) for (; a !== L;) i.push(a), Ze.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(De));else i = D;if ((i !== L && (i = t.substring(r, Me)), r = i, r !== L)) {
	              for (i = Me, a = [], ze.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Ge)); s !== L;) a.push(s), ze.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Ge));a !== L && (a = t.substring(i, Me)), i = a, i !== L ? (Je = e, r = Pe(r, i), e = r) : (Me = e, e = D);
	            } else Me = e, e = D;return e;
	          }function x() {
	            var e, r, i, a;if ((e = Me, t.substr(Me, 2) === We ? (r = We, Me += 2) : (r = L, 0 === ir && n(Qe)), r !== L)) {
	              if ((i = [], Mt.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(Jt)), a !== L)) for (; a !== L;) i.push(a), Mt.test(t.charAt(Me)) ? (a = t.charAt(Me), Me++) : (a = L, 0 === ir && n(Jt));else i = D;i !== L ? (Je = e, r = Ue(i), e = r) : (Me = e, e = D);
	            } else Me = e, e = D;return e;
	          }function k() {
	            var e, r, i, a, s;if ((e = Me, r = [], Mt.test(t.charAt(Me)) ? (i = t.charAt(Me), Me++) : (i = L, 0 === ir && n(Jt)), i !== L)) for (; i !== L;) r.push(i), Mt.test(t.charAt(Me)) ? (i = t.charAt(Me), Me++) : (i = L, 0 === ir && n(Jt));else r = D;if (r !== L) if ((46 === t.charCodeAt(Me) ? (i = Be, Me++) : (i = L, 0 === ir && n($e)), i !== L)) {
	              if ((a = [], Mt.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Jt)), s !== L)) for (; s !== L;) a.push(s), Mt.test(t.charAt(Me)) ? (s = t.charAt(Me), Me++) : (s = L, 0 === ir && n(Jt));else a = D;a !== L ? (Je = e, r = je(r, a), e = r) : (Me = e, e = D);
	            } else Me = e, e = D;else Me = e, e = D;if (e === L) {
	              if ((e = Me, r = [], Mt.test(t.charAt(Me)) ? (i = t.charAt(Me), Me++) : (i = L, 0 === ir && n(Jt)), i !== L)) for (; i !== L;) r.push(i), Mt.test(t.charAt(Me)) ? (i = t.charAt(Me), Me++) : (i = L, 0 === ir && n(Jt));else r = D;r !== L && (Je = e, r = Ye(r)), e = r;
	            }return e;
	          }function R(t) {
	            for (var e = 1; e < arguments.length; e++) for (var r in arguments[e]) t[r] = arguments[e][r];return t;
	          }var F,
	              N = arguments.length > 1 ? arguments[1] : {},
	              L = {},
	              q = { visualFormatString: s },
	              Z = s,
	              D = L,
	              z = null,
	              G = ":",
	              X = { type: "literal", value: ":", description: '":"' },
	              P = function P(t, e, r, i, n, a) {
	            return { orientation: t ? t[0] : "horizontal", cascade: (e || []).concat(r, [].concat.apply([], i), n || []) };
	          },
	              W = "HV",
	              Q = { type: "literal", value: "HV", description: '"HV"' },
	              U = function U() {
	            return "horzvert";
	          },
	              B = "H",
	              $ = { type: "literal", value: "H", description: '"H"' },
	              j = function j() {
	            return "horizontal";
	          },
	              Y = "V",
	              M = { type: "literal", value: "V", description: '"V"' },
	              J = function J() {
	            return "vertical";
	          },
	              K = "Z",
	              tt = { type: "literal", value: "Z", description: '"Z"' },
	              et = function et() {
	            return "zIndex";
	          },
	              rt = " ",
	              it = { type: "literal", value: " ", description: '" "' },
	              nt = "//",
	              at = { type: "literal", value: "//", description: '"//"' },
	              st = { type: "any", description: "any character" },
	              ot = "|",
	              ut = { type: "literal", value: "|", description: '"|"' },
	              ct = function ct() {
	            return { view: null };
	          },
	              lt = "[",
	              ht = { type: "literal", value: "[", description: '"["' },
	              pt = ",",
	              ft = { type: "literal", value: ",", description: '","' },
	              dt = "]",
	              vt = { type: "literal", value: "]", description: '"]"' },
	              At = function At(t, e) {
	            return e.length ? [t].concat([].concat.apply([], e)) : t;
	          },
	              gt = function gt(t, e, r) {
	            return R(R(t, e ? { constraints: e } : {}), r ? { cascade: r } : {});
	          },
	              bt = function bt(t, e) {
	            return [].concat([].concat.apply([], t), [e]);
	          },
	              wt = "->",
	              _t = { type: "literal", value: "->", description: '"->"' },
	              yt = function yt() {
	            return [{ relation: "none" }];
	          },
	              Ct = "-",
	              It = { type: "literal", value: "-", description: '"-"' },
	              Et = function Et(t) {
	            return t;
	          },
	              Tt = function Tt() {
	            return [{ relation: "equ", constant: "default" }];
	          },
	              Vt = "~",
	              mt = { type: "literal", value: "~", description: '"~"' },
	              Ot = function Ot() {
	            return [{ relation: "equ", equalSpacing: !0 }];
	          },
	              Ht = "",
	              St = function St() {
	            return [{ relation: "equ", constant: 0 }];
	          },
	              xt = function xt(t) {
	            return [{ relation: "equ", multiplier: t.multiplier }];
	          },
	              kt = function kt(t) {
	            return [{ relation: "equ", constant: t }];
	          },
	              Rt = "(",
	              Ft = { type: "literal", value: "(", description: '"("' },
	              Nt = ")",
	              Lt = { type: "literal", value: ")", description: '")"' },
	              qt = function qt(t, e) {
	            return [t].concat(e.map(function (t) {
	              return t[1];
	            }));
	          },
	              Zt = "@",
	              Dt = { type: "literal", value: "@", description: '"@"' },
	              zt = function zt(t, e, r) {
	            return R({ relation: "equ" }, t || {}, e, r ? r[1] : {});
	          },
	              Gt = function Gt(t, e, r) {
	            return R({ relation: "equ", equalSpacing: !0 }, t || {}, e, r ? r[1] : {});
	          },
	              Xt = "==",
	              Pt = { type: "literal", value: "==", description: '"=="' },
	              Wt = function Wt() {
	            return { relation: "equ" };
	          },
	              Qt = "<=",
	              Ut = { type: "literal", value: "<=", description: '"<="' },
	              Bt = function Bt() {
	            return { relation: "leq" };
	          },
	              $t = ">=",
	              jt = { type: "literal", value: ">=", description: '">="' },
	              Yt = function Yt() {
	            return { relation: "geq" };
	          },
	              Mt = /^[0-9]/,
	              Jt = { type: "class", value: "[0-9]", description: "[0-9]" },
	              Kt = function Kt(t) {
	            return { priority: parseInt(t.join(""), 10) };
	          },
	              te = function te(t) {
	            return { constant: t };
	          },
	              ee = "%",
	              re = { type: "literal", value: "%", description: '"%"' },
	              ie = function ie(t) {
	            return { view: null, multiplier: t / 100 };
	          },
	              ne = function ne(t, e, r, i) {
	            return { view: t.view, attribute: e ? e : void 0, multiplier: r ? r : 1, constant: i ? i : void 0 };
	          },
	              ae = ".left",
	              se = { type: "literal", value: ".left", description: '".left"'
	          },
	              oe = function oe() {
	            return "left";
	          },
	              ue = ".right",
	              ce = { type: "literal", value: ".right", description: '".right"' },
	              le = function le() {
	            return "right";
	          },
	              he = ".top",
	              pe = { type: "literal", value: ".top", description: '".top"' },
	              fe = function fe() {
	            return "top";
	          },
	              de = ".bottom",
	              ve = { type: "literal", value: ".bottom", description: '".bottom"' },
	              Ae = function Ae() {
	            return "bottom";
	          },
	              ge = ".width",
	              be = { type: "literal", value: ".width", description: '".width"' },
	              we = function we() {
	            return "width";
	          },
	              _e = ".height",
	              ye = { type: "literal", value: ".height", description: '".height"' },
	              Ce = function Ce() {
	            return "height";
	          },
	              Ie = ".centerX",
	              Ee = { type: "literal", value: ".centerX", description: '".centerX"' },
	              Te = function Te() {
	            return "centerX";
	          },
	              Ve = ".centerY",
	              me = { type: "literal", value: ".centerY", description: '".centerY"' },
	              Oe = function Oe() {
	            return "centerY";
	          },
	              He = "/",
	              Se = { type: "literal", value: "/", description: '"/"' },
	              xe = function xe(t) {
	            return 1 / t;
	          },
	              ke = "*",
	              Re = { type: "literal", value: "*", description: '"*"' },
	              Fe = function Fe(t) {
	            return t;
	          },
	              Ne = function Ne(t) {
	            return -t;
	          },
	              Le = "+",
	              qe = { type: "literal", value: "+", description: '"+"' },
	              Ze = /^[a-zA-Z_]/,
	              De = { type: "class", value: "[a-zA-Z_]", description: "[a-zA-Z_]" },
	              ze = /^[a-zA-Z0-9_]/,
	              Ge = { type: "class", value: "[a-zA-Z0-9_]", description: "[a-zA-Z0-9_]" },
	              Xe = function Xe(t, e, i) {
	            return { view: t + e, range: i, $parserOffset: r() };
	          },
	              Pe = function Pe(t, e) {
	            return { view: t + e, $parserOffset: r() };
	          },
	              We = "..",
	              Qe = { type: "literal", value: "..", description: '".."' },
	              Ue = function Ue(t) {
	            return parseInt(t);
	          },
	              Be = ".",
	              $e = { type: "literal", value: ".", description: '"."' },
	              je = function je(t, e) {
	            return parseFloat(t.concat(".").concat(e).join(""), 10);
	          },
	              Ye = function Ye(t) {
	            return parseInt(t.join(""), 10);
	          },
	              Me = 0,
	              Je = 0,
	              Ke = 0,
	              tr = { line: 1, column: 1, seenCR: !1 },
	              er = 0,
	              rr = [],
	              ir = 0;if ("startRule" in N) {
	            if (!(N.startRule in q)) throw new Error("Can't start parsing from rule \"" + N.startRule + '".');Z = q[N.startRule];
	          }if ((F = Z(), F !== L && Me === t.length)) return F;throw (F !== L && Me < t.length && n({ type: "end", description: "end of input" }), a(null, rr, er));
	        }return (t(e, Error), { SyntaxError: e, parse: r });
	      })(),
	          Orientation = { HORIZONTAL: 1, VERTICAL: 2, ZINDEX: 4 },
	          metaInfoCategories = ["viewport", "spacing", "colors", "shapes", "widths", "heights"],
	          VisualFormat = (function () {
	        function t() {
	          _classCallCheck(this, t);
	        }return (_createClass(t, null, [{ key: "parseLine", value: function value(t, e) {
	            if (0 === t.length || e && e.extended && 0 === t.indexOf("//")) return [];var r = e && e.extended ? parserExt.parse(t) : parser.parse(t);if (e && "raw" === e.outFormat) return [r];var i = { constraints: [], lineIndex: (e ? e.lineIndex : void 0) || 1, subViews: (e ? e.subViews : void 0) || {} };switch (r.orientation) {case "horizontal":
	                i.orientation = Orientation.HORIZONTAL, i.horizontal = !0, _processCascade(i, r.cascade, null);break;case "vertical":
	                i.orientation = Orientation.VERTICAL, _processCascade(i, r.cascade, null);break;case "horzvert":
	                i.orientation = Orientation.HORIZONTAL, i.horizontal = !0, _processCascade(i, r.cascade, null), i = { constraints: i.constraints, lineIndex: i.lineIndex, subViews: i.subViews, orientation: Orientation.VERTICAL }, _processCascade(i, r.cascade, null);break;case "zIndex":
	                i.orientation = Orientation.ZINDEX, _processCascade(i, r.cascade, null);}return i.constraints;
	          } }, { key: "parse", value: function value(t, e) {
	            var r = e && e.lineSeperator ? e.lineSeperator : "\n";if (!Array.isArray(t) && t.indexOf(r) < 0) try {
	              return this.parseLine(t, e);
	            } catch (i) {
	              throw (i.source = t, i);
	            }t = Array.isArray(t) ? t : [t];var n = void 0,
	                a = [],
	                s = 0,
	                o = void 0,
	                u = { lineIndex: s, extended: e && e.extended, strict: e && void 0 !== e.strict ? e.strict : !0, outFormat: e ? e.outFormat : void 0, subViews: {} };try {
	              for (var c = 0; c < t.length; c++) {
	                n = t[c].split(r);for (var l = 0; l < n.length; l++) o = n[l], s++, u.lineIndex = s, u.strict || (o = o.trim()), (u.strict || o.length) && (a = a.concat(this.parseLine(o, u)));
	              }
	            } catch (i) {
	              throw (i.source = o, i.line = s, i);
	            }return a;
	          } }, { key: "parseMetaInfo", value: function value(t, e) {
	            var r = e && e.lineSeperator ? e.lineSeperator : "\n",
	                i = e ? e.prefix : void 0;t = Array.isArray(t) ? t : [t];for (var n, a = {}, s = 0; s < t.length; s++) for (var o = t[s].split(r), u = 0; u < o.length; u++) for (var c = o[u], l = 0; l < metaInfoCategories.length; l++) for (var h = 0; (i ? 2 : 1) > h; h++) {
	              var p = metaInfoCategories[l],
	                  f = (0 === h ? "" : i) + p;if (0 === c.indexOf("//" + f + " ")) for (var d = c.substring(3 + f.length).split(" "), v = 0; v < d.length; v++) {
	                a[p] = a[p] || {};for (var A = d[v].split(":"), g = _getRange(A[0], !0), b = 0; b < g.length; b++) a[p][g[b]] = A.length > 1 ? A[1] : "";
	              } else 0 === c.indexOf("//" + f + ":") && (a[p] = c.substring(3 + f.length));
	            }if (a.viewport) {
	              var w = a.viewport,
	                  _ = w["aspect-ratio"];_ && (_ = _.split("/"), w["aspect-ratio"] = parseInt(_[0]) / parseInt(_[1])), void 0 !== w.height && (w.height = "intrinsic" === w.height ? !0 : parseInt(w.height)), void 0 !== w.width && (w.width = "intrinsic" === w.width ? !0 : parseInt(w.width)), void 0 !== w["max-height"] && (w["max-height"] = parseInt(w["max-height"])), void 0 !== w["max-width"] && (w["max-width"] = parseInt(w["max-width"])), void 0 !== w["min-height"] && (w["min-height"] = parseInt(w["min-height"])), void 0 !== w["min-width"] && (w["min-width"] = parseInt(w["min-width"]));
	            }if (a.widths) for (n in a.widths) {
	              var y = "intrinsic" === a.widths[n] ? !0 : parseInt(a.widths[n]);a.widths[n] = y, (void 0 === y || isNaN(y)) && delete a.widths[n];
	            }if (a.heights) for (n in a.heights) {
	              var C = "intrinsic" === a.heights[n] ? !0 : parseInt(a.heights[n]);a.heights[n] = C, (void 0 === C || isNaN(C)) && delete a.heights[n];
	            }if (a.spacing) {
	              var I = JSON.parse(a.spacing);a.spacing = I, (void 0 === I || isNaN(I)) && delete a.spacing;
	            }return a;
	          } }]), t);
	      })(),
	          SubView = (function () {
	        function t(e) {
	          _classCallCheck(this, t), this._name = e.name, this._type = e.type, this._solver = e.solver, this._attr = {}, e.name || (this._attr[Attribute.LEFT] = new c.Variable(), this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.LEFT], c.Strength.required)), this._attr[Attribute.TOP] = new c.Variable(), this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.TOP], c.Strength.required)), this._attr[Attribute.ZINDEX] = new c.Variable(), this._solver.addConstraint(new c.StayConstraint(this._attr[Attribute.ZINDEX], c.Strength.required)));
	        }return (_createClass(t, [{ key: "toJSON", value: function value() {
	            return { name: this.name, left: this.left, top: this.top, width: this.width, height: this.height };
	          } }, { key: "toString", value: function value() {
	            JSON.stringify(this.toJSON(), void 0, 2);
	          } }, { key: "getValue", value: function value(t) {
	            return this._attr[t] ? this._attr[t].value() : void 0;
	          } }, { key: "_getAttr", value: function value(t) {
	            if (this._attr[t]) return this._attr[t];switch ((this._attr[t] = new c.Variable(), t)) {case Attribute.RIGHT:
	                this._getAttr(Attribute.LEFT), this._getAttr(Attribute.WIDTH), this._solver.addConstraint(new c.Equation(this._attr[t], c.plus(this._attr[Attribute.LEFT], this._attr[Attribute.WIDTH])));break;case Attribute.BOTTOM:
	                this._getAttr(Attribute.TOP), this._getAttr(Attribute.HEIGHT), this._solver.addConstraint(new c.Equation(this._attr[t], c.plus(this._attr[Attribute.TOP], this._attr[Attribute.HEIGHT])));break;case Attribute.CENTERX:
	                this._getAttr(Attribute.LEFT), this._getAttr(Attribute.WIDTH), this._solver.addConstraint(new c.Equation(this._attr[t], c.plus(this._attr[Attribute.LEFT], c.divide(this._attr[Attribute.WIDTH], 2))));break;case Attribute.CENTERY:
	                this._getAttr(Attribute.TOP), this._getAttr(Attribute.HEIGHT), this._solver.addConstraint(new c.Equation(this._attr[t], c.plus(this._attr[Attribute.TOP], c.divide(this._attr[Attribute.HEIGHT], 2))));}return this._attr[t];
	          } }, { key: "_getAttrValue", value: function value(t) {
	            return this._getAttr(t).value;
	          } }, { key: "name", get: function get() {
	            return this._name;
	          } }, { key: "left", get: function get() {
	            return this._getAttrValue(Attribute.LEFT);
	          } }, { key: "right", get: function get() {
	            return this._getAttrValue(Attribute.RIGHT);
	          } }, { key: "width", get: function get() {
	            return this._getAttrValue(Attribute.WIDTH);
	          } }, { key: "height", get: function get() {
	            return this._getAttrValue(Attribute.HEIGHT);
	          } }, { key: "intrinsicWidth", get: function get() {
	            return this._intrinsicWidth;
	          }, set: function set(t) {
	            if (void 0 !== t && t !== this._intrinsicWidth) {
	              var e = this._getAttr(Attribute.WIDTH);void 0 === this._intrinsicWidth && this._solver.addEditVar(e, new c.Strength("required", this._name ? 998 : 999, 1e3, 1e3)), this._intrinsicWidth = t, this._solver.suggestValue(e, t), this._solver.resolve();
	            }
	          } }, { key: "intrinsicHeight", get: function get() {
	            return this._intrinsicHeight;
	          }, set: function set(t) {
	            if (void 0 !== t && t !== this._intrinsicHeight) {
	              var e = this._getAttr(Attribute.HEIGHT);void 0 === this._intrinsicHeight && this._solver.addEditVar(e, new c.Strength("required", this._name ? 998 : 999, 1e3, 1e3)), this._intrinsicHeight = t, this._solver.suggestValue(e, t), this._solver.resolve();
	            }
	          } }, { key: "top", get: function get() {
	            return this._getAttrValue(Attribute.TOP);
	          } }, { key: "bottom", get: function get() {
	            return this._getAttrValue(Attribute.BOTTOM);
	          } }, { key: "centerX", get: function get() {
	            return this._getAttrValue(Attribute.CENTERX);
	          } }, { key: "centerY", get: function get() {
	            return this._getAttrValue(Attribute.CENTERY);
	          } }, { key: "zIndex", get: function get() {
	            return this._getAttrValue(Attribute.ZINDEX);
	          } }, { key: "type", get: function get() {
	            return this._type;
	          } }]), t);
	      })(),
	          defaultPriorityStrength = new c.Strength("defaultPriority", 0, 1e3, 1e3),
	          View = (function () {
	        function t(e) {
	          _classCallCheck(this, t), this._solver = new c.SimplexSolver(), this._subViews = {}, this._parentSubView = new SubView({ solver: this._solver }), this.setSpacing(e && void 0 !== e.spacing ? e.spacing : 8), e && ((void 0 !== e.width || void 0 !== e.height) && this.setSize(e.width, e.height), e.constraints && this.addConstraints(e.constraints));
	        }return (_createClass(t, [{ key: "setSize", value: function value(t, e) {
	            return (this._parentSubView.intrinsicWidth = t, this._parentSubView.intrinsicHeight = e, this);
	          } }, { key: "setSpacing", value: function value(t) {
	            switch (Array.isArray(t) ? t.length : -1) {case -1:
	                t = [t, t, t, t, t, t, 1];break;case 1:
	                t = [t[0], t[0], t[0], t[0], t[0], t[0], 1];break;case 2:
	                t = [t[1], t[0], t[1], t[0], t[0], t[1], 1];break;case 3:
	                t = [t[1], t[0], t[1], t[0], t[0], t[1], t[2]];break;case 6:
	                t = [t[0], t[1], t[2], t[3], t[4], t[5], 1];break;case 7:
	                break;default:
	                throw "Invalid spacing syntax";}if (!_compareSpacing(this._spacing, t) && (this._spacing = t, this._spacingVars)) {
	              for (var e = 0; e < this._spacingVars.length; e++) this._spacingVars[e] && this._solver.suggestValue(this._spacingVars[e], this._spacing[e]);this._solver.resolve();
	            }return this;
	          } }, { key: "addConstraint", value: function value(t) {
	            return (_addConstraint.call(this, t), this);
	          } }, { key: "addConstraints", value: function value(t) {
	            for (var e = 0; e < t.length; e++) _addConstraint.call(this, t[e]);return this;
	          } }, { key: "width", get: function get() {
	            return this._parentSubView.intrinsicWidth;
	          } }, { key: "height", get: function get() {
	            return this._parentSubView.intrinsicHeight;
	          } }, { key: "fittingWidth", get: function get() {
	            return this._parentSubView.width;
	          } }, { key: "fittingHeight", get: function get() {
	            return this._parentSubView.height;
	          } }, { key: "subViews", get: function get() {
	            return this._subViews;
	          } }]), t);
	      })(),
	          AutoLayout = { Attribute: Attribute, Relation: Relation, Priority: Priority, VisualFormat: VisualFormat, View: View, SubView: SubView };module.exports = AutoLayout;
	    }, { "cassowary/bin/c": 2 }], 2: [function (require, module, exports) {
	      (function () {
	        !(function (t) {
	          "use strict";try {
	            (function () {}).bind(t);
	          } catch (e) {
	            Object.defineProperty(Function.prototype, "bind", { value: function value(t) {
	                var e = this;return function () {
	                  return e.apply(t, arguments);
	                };
	              }, enumerable: !1, configurable: !0, writable: !0 });
	          }var n = void 0 !== t.HTMLElement,
	              i = function i(t) {
	            for (var e = null; t && t != Object.prototype;) {
	              if (t.tagName) {
	                e = t.tagName;break;
	              }t = t.prototype;
	            }return e || "div";
	          },
	              r = 1e-8,
	              s = {},
	              a = function a(_x, _x2) {
	            var _again = true;
	
	            _function: while (_again) {
	              var t = _x,
	                  e = _x2;
	              n = undefined;
	              _again = false;
	              if (t && e) {
	                if ("function" == typeof t[e]) return t[e];var n = t.prototype;if (n && "function" == typeof n[e]) return n[e];if (n !== Object.prototype && n !== Function.prototype) {
	                  if ("function" == typeof t.__super__) {
	                    _x = t.__super__;
	                    _x2 = e;
	                    _again = true;
	                    continue _function;
	                  } else {
	                    return void 0;
	                  }
	                }
	              }
	            }
	          },
	              l = t.c = { debug: !1, trace: !1, verbose: !1, traceAdded: !1, GC: !1, GEQ: 1, LEQ: 2, inherit: function inherit(e) {
	              var r = null,
	                  a = null;e["extends"] && (a = e["extends"], delete e["extends"]), e.initialize && (r = e.initialize, delete e.initialize);var l = r || function () {};Object.defineProperty(l, "__super__", { value: a ? a : Object, enumerable: !1, configurable: !0, writable: !1 }), e._t && (s[e._t] = l);var o = l.prototype = Object.create(a ? a.prototype : Object.prototype);if ((this.extend(o, e), n && a && a.prototype instanceof t.HTMLElement)) {
	                var u = l,
	                    c = i(o),
	                    h = function h(t) {
	                  return (t.__proto__ = o, u.apply(t, arguments), o.created && t.created(), o.decorate && t.decorate(), t);
	                };this.extend(o, { upgrade: h }), l = function () {
	                  return h(t.document.createElement(c));
	                }, l.prototype = o, this.extend(l, { ctor: u });
	              }return l;
	            }, extend: function extend(t, e) {
	              return (this.own(e, function (n) {
	                var i = Object.getOwnPropertyDescriptor(e, n);try {
	                  "function" == typeof i.get || "function" == typeof i.set ? Object.defineProperty(t, n, i) : "function" == typeof i.value || "_" === n.charAt(0) ? (i.writable = !0, i.configurable = !0, i.enumerable = !1, Object.defineProperty(t, n, i)) : t[n] = e[n];
	                } catch (r) {}
	              }), t);
	            }, own: function own(e, n, i) {
	              return (Object.getOwnPropertyNames(e).forEach(n, i || t), e);
	            }, traceprint: function traceprint(t) {
	              l.verbose && console.log(t);
	            }, fnenterprint: function fnenterprint(t) {
	              console.log("* " + t);
	            }, fnexitprint: function fnexitprint(t) {
	              console.log("- " + t);
	            }, assert: function assert(t, e) {
	              if (!t) throw new l.InternalError("Assertion failed: " + e);
	            }, plus: function plus(t, e) {
	              return (t instanceof l.Expression || (t = new l.Expression(t)), e instanceof l.Expression || (e = new l.Expression(e)), t.plus(e));
	            }, minus: function minus(t, e) {
	              return (t instanceof l.Expression || (t = new l.Expression(t)), e instanceof l.Expression || (e = new l.Expression(e)), t.minus(e));
	            }, times: function times(t, e) {
	              return (("number" == typeof t || t instanceof l.Variable) && (t = new l.Expression(t)), ("number" == typeof e || e instanceof l.Variable) && (e = new l.Expression(e)), t.times(e));
	            }, divide: function divide(t, e) {
	              return (("number" == typeof t || t instanceof l.Variable) && (t = new l.Expression(t)), ("number" == typeof e || e instanceof l.Variable) && (e = new l.Expression(e)), t.divide(e));
	            }, approx: function approx(t, e) {
	              if (t === e) return !0;var n, i;return (n = t instanceof l.Variable ? t.value : t, i = e instanceof l.Variable ? e.value : e, 0 == n ? r > Math.abs(i) : 0 == i ? r > Math.abs(n) : Math.abs(n - i) < Math.abs(n) * r);
	            }, _inc: (function (t) {
	              return function () {
	                return t++;
	              };
	            })(0), parseJSON: function parseJSON(t) {
	              return JSON.parse(t, function (t, e) {
	                if ("object" != typeof e || "string" != typeof e._t) return e;var n = e._t,
	                    i = s[n];if (n && i) {
	                  var r = a(i, "fromJSON");if (r) return r(e, i);
	                }return e;
	              });
	            } };"function" == typeof require && "undefined" != typeof module && "undefined" == typeof load && (t.exports = l);
	        })(this), (function (t) {
	          "use strict";var e = function e(t) {
	            var e = t.hashCode ? t.hashCode : "" + t;return e;
	          },
	              n = function n(t, e) {
	            Object.keys(t).forEach(function (n) {
	              e[n] = t[n];
	            });
	          },
	              i = {};t.HashTable = t.inherit({ initialize: function initialize() {
	              this.size = 0, this._store = {}, this._keyStrMap = {}, this._deleted = 0;
	            }, set: function set(t, n) {
	              var i = e(t);this._store.hasOwnProperty(i) || this.size++, this._store[i] = n, this._keyStrMap[i] = t;
	            }, get: function get(t) {
	              if (!this.size) return null;t = e(t);var n = this._store[t];return void 0 !== n ? this._store[t] : null;
	            }, clear: function clear() {
	              this.size = 0, this._store = {}, this._keyStrMap = {};
	            }, _compact: function _compact() {
	              var t = {};n(this._store, t), this._store = t;
	            }, _compactThreshold: 100, _perhapsCompact: function _perhapsCompact() {
	              this._size > 64 || this._deleted > this._compactThreshold && (this._compact(), this._deleted = 0);
	            }, "delete": function _delete(t) {
	              t = e(t), this._store.hasOwnProperty(t) && (this._deleted++, delete this._store[t], this.size > 0 && this.size--);
	            }, each: function each(t, e) {
	              if (this.size) {
	                this._perhapsCompact();var n = this._store,
	                    i = this._keyStrMap;Object.keys(this._store).forEach(function (r) {
	                  t.call(e || null, i[r], n[r]);
	                }, this);
	              }
	            }, escapingEach: function escapingEach(t, e) {
	              if (this.size) {
	                this._perhapsCompact();for (var n = this, r = this._store, s = this._keyStrMap, a = i, l = Object.keys(r), o = 0; l.length > o; o++) if (((function (i) {
	                  n._store.hasOwnProperty(i) && (a = t.call(e || null, s[i], r[i]));
	                })(l[o]), a)) {
	                  if (void 0 !== a.retval) return a;if (a.brk) break;
	                }
	              }
	            }, clone: function clone() {
	              var e = new t.HashTable();return (this.size && (e.size = this.size, n(this._store, e._store), n(this._keyStrMap, e._keyStrMap)), e);
	            }, equals: function equals(e) {
	              if (e === this) return !0;if (!(e instanceof t.HashTable) || e._size !== this._size) return !1;for (var n = Object.keys(this._store), i = 0; n.length > i; i++) {
	                var r = n[i];if (this._keyStrMap[r] !== e._keyStrMap[r] || this._store[r] !== e._store[r]) return !1;
	              }return !0;
	            }, toString: function toString() {
	              var t = "";return (this.each(function (e, n) {
	                t += e + " => " + n + "\n";
	              }), t);
	            } });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.HashSet = t.inherit({ _t: "c.HashSet", initialize: function initialize() {
	              this.storage = [], this.size = 0;
	            }, add: function add(t) {
	              var e = this.storage;e.indexOf(t), -1 == e.indexOf(t) && e.push(t), this.size = this.storage.length;
	            }, values: function values() {
	              return this.storage;
	            }, has: function has(t) {
	              var e = this.storage;return -1 != e.indexOf(t);
	            }, "delete": function _delete(t) {
	              var e = this.storage.indexOf(t);return -1 == e ? null : (this.storage.splice(e, 1)[0], void (this.size = this.storage.length));
	            }, clear: function clear() {
	              this.storage.length = 0;
	            }, each: function each(t, e) {
	              this.size && this.storage.forEach(t, e);
	            }, escapingEach: function escapingEach(t, e) {
	              this.size && this.storage.forEach(t, e);
	            }, toString: function toString() {
	              var t = this.size + " {",
	                  e = !0;return (this.each(function (n) {
	                e ? e = !1 : t += ", ", t += n;
	              }), t += "}\n");
	            }, toJSON: function toJSON() {
	              var t = [];return (this.each(function (e) {
	                t.push(e.toJSON());
	              }), { _t: "c.HashSet", data: t });
	            }, fromJSON: function fromJSON(e) {
	              var n = new t.HashSet();return (e.data && (n.size = e.data.length, n.storage = e.data), n);
	            } });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.Error = t.inherit(Object.defineProperties({ initialize: function initialize(t) {
	              t && (this._description = t);
	            }, _name: "c.Error", _description: "An error has occured in Cassowary", toString: function toString() {
	              return this.description;
	            } }, {
	            description: {
	              set: function set(t) {
	                this._description = t;
	              },
	              get: function get() {
	                return "(" + this._name + ") " + this._description;
	              },
	              configurable: true,
	              enumerable: true
	            },
	            message: {
	              get: function get() {
	                return this.description;
	              },
	              configurable: true,
	              enumerable: true
	            }
	          }));var e = function e(_e2, n) {
	            return t.inherit({ "extends": t.Error, initialize: function initialize() {
	                t.Error.apply(this, arguments);
	              }, _name: _e2 || "", _description: n || "" });
	          };t.ConstraintNotFound = e("c.ConstraintNotFound", "Tried to remove a constraint never added to the tableu"), t.InternalError = e("c.InternalError"), t.NonExpression = e("c.NonExpression", "The resulting expression would be non"), t.NotEnoughStays = e("c.NotEnoughStays", "There are not enough stays to give specific values to every variable"), t.RequiredFailure = e("c.RequiredFailure", "A required constraint cannot be satisfied"), t.TooDifficult = e("c.TooDifficult", "The constraints are too difficult to solve");
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";var e = 1e3;t.SymbolicWeight = t.inherit({ _t: "c.SymbolicWeight", initialize: function initialize() {
	              this.value = 0;for (var t = 1, n = arguments.length - 1; n >= 0; --n) this.value += arguments[n] * t, t *= e;
	            }, toJSON: function toJSON() {
	              return { _t: this._t, value: this.value };
	            } });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          t.Strength = t.inherit(Object.defineProperties({ initialize: function initialize(e, n, i, r) {
	              this.name = e, this.symbolicWeight = n instanceof t.SymbolicWeight ? n : new t.SymbolicWeight(n, i, r);
	            }, toString: function toString() {
	              return this.name + (this.isRequired ? "" : ":" + this.symbolicWeight);
	            } }, {
	            required: {
	              get: function get() {
	                return this === t.Strength.required;
	              },
	              configurable: true,
	              enumerable: true
	            }
	          })), t.Strength.required = new t.Strength("<Required>", 1e3, 1e3, 1e3), t.Strength.strong = new t.Strength("strong", 1, 0, 0), t.Strength.medium = new t.Strength("medium", 0, 1, 0), t.Strength.weak = new t.Strength("weak", 0, 0, 1);
	        })(this.c || ("undefined" != typeof module ? module.parent.exports.c : {})), (function (t) {
	          "use strict";t.AbstractVariable = t.inherit({ isDummy: !1, isExternal: !1, isPivotable: !1, isRestricted: !1, _init: function _init(e, n) {
	              this.hashCode = t._inc(), this.name = (n || "") + this.hashCode, e && (void 0 !== e.name && (this.name = e.name), void 0 !== e.value && (this.value = e.value), void 0 !== e.prefix && (this._prefix = e.prefix));
	            }, _prefix: "", name: "", value: 0, toJSON: function toJSON() {
	              var t = {};return (this._t && (t._t = this._t), this.name && (t.name = this.name), void 0 !== this.value && (t.value = this.value), this._prefix && (t._prefix = this._prefix), this._t && (t._t = this._t), t);
	            }, fromJSON: function fromJSON(e, n) {
	              var i = new n();return (t.extend(i, e), i);
	            }, toString: function toString() {
	              return this._prefix + "[" + this.name + ":" + this.value + "]";
	            } }), t.Variable = t.inherit({ _t: "c.Variable", "extends": t.AbstractVariable, initialize: function initialize(e) {
	              this._init(e, "v");var n = t.Variable._map;n && (n[this.name] = this);
	            }, isExternal: !0 }), t.DummyVariable = t.inherit({ _t: "c.DummyVariable", "extends": t.AbstractVariable, initialize: function initialize(t) {
	              this._init(t, "d");
	            }, isDummy: !0, isRestricted: !0, value: "dummy" }), t.ObjectiveVariable = t.inherit({ _t: "c.ObjectiveVariable", "extends": t.AbstractVariable, initialize: function initialize(t) {
	              this._init(t, "o");
	            }, value: "obj" }), t.SlackVariable = t.inherit({ _t: "c.SlackVariable", "extends": t.AbstractVariable, initialize: function initialize(t) {
	              this._init(t, "s");
	            }, isPivotable: !0, isRestricted: !0, value: "slack" });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.Point = t.inherit(Object.defineProperties({ initialize: function initialize(e, n, i) {
	              if (e instanceof t.Variable) this._x = e;else {
	                var r = { value: e };i && (r.name = "x" + i), this._x = new t.Variable(r);
	              }if (n instanceof t.Variable) this._y = n;else {
	                var s = { value: n };i && (s.name = "y" + i), this._y = new t.Variable(s);
	              }
	            }, toString: function toString() {
	              return "(" + this.x + ", " + this.y + ")";
	            } }, {
	            x: {
	              get: function get() {
	                return this._x;
	              },
	              set: function set(e) {
	                e instanceof t.Variable ? this._x = e : this._x.value = e;
	              },
	              configurable: true,
	              enumerable: true
	            },
	            y: {
	              get: function get() {
	                return this._y;
	              },
	              set: function set(e) {
	                e instanceof t.Variable ? this._y = e : this._y.value = e;
	              },
	              configurable: true,
	              enumerable: true
	            }
	          }));
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.Expression = t.inherit(Object.defineProperties({ initialize: function initialize(e, n, i) {
	              t.GC && console.log("new c.Expression"), this.constant = "number" != typeof i || isNaN(i) ? 0 : i, this.terms = new t.HashTable(), e instanceof t.AbstractVariable ? this.setVariable(e, "number" == typeof n ? n : 1) : "number" == typeof e && (isNaN(e) ? console.trace() : this.constant = e);
	            }, initializeFromHash: function initializeFromHash(e, n) {
	              return (t.verbose && (console.log("*******************************"), console.log("clone c.initializeFromHash"), console.log("*******************************")), t.GC && console.log("clone c.Expression"), this.constant = e, this.terms = n.clone(), this);
	            }, multiplyMe: function multiplyMe(t) {
	              this.constant *= t;var e = this.terms;return (e.each(function (n, i) {
	                e.set(n, i * t);
	              }), this);
	            }, clone: function clone() {
	              t.verbose && (console.log("*******************************"), console.log("clone c.Expression"), console.log("*******************************"));var e = new t.Expression();return (e.initializeFromHash(this.constant, this.terms), e);
	            }, times: function times(e) {
	              if ("number" == typeof e) return this.clone().multiplyMe(e);if (this.isConstant) return e.times(this.constant);if (e.isConstant) return this.times(e.constant);throw new t.NonExpression();
	            }, plus: function plus(e) {
	              return e instanceof t.Expression ? this.clone().addExpression(e, 1) : e instanceof t.Variable ? this.clone().addVariable(e, 1) : void 0;
	            }, minus: function minus(e) {
	              return e instanceof t.Expression ? this.clone().addExpression(e, -1) : e instanceof t.Variable ? this.clone().addVariable(e, -1) : void 0;
	            }, divide: function divide(e) {
	              if ("number" == typeof e) {
	                if (t.approx(e, 0)) throw new t.NonExpression();return this.times(1 / e);
	              }if (e instanceof t.Expression) {
	                if (!e.isConstant) throw new t.NonExpression();return this.times(1 / e.constant);
	              }
	            }, addExpression: function addExpression(e, n, i, r) {
	              return (e instanceof t.AbstractVariable && (e = new t.Expression(e), t.trace && console.log("addExpression: Had to cast a var to an expression")), n = n || 1, this.constant += n * e.constant, e.terms.each(function (t, e) {
	                this.addVariable(t, e * n, i, r);
	              }, this), this);
	            }, addVariable: function addVariable(e, n, i, r) {
	              null == n && (n = 1), t.trace && console.log("c.Expression::addVariable():", e, n);var s = this.terms.get(e);if (s) {
	                var a = s + n;0 == a || t.approx(a, 0) ? (r && r.noteRemovedVariable(e, i), this.terms["delete"](e)) : this.setVariable(e, a);
	              } else t.approx(n, 0) || (this.setVariable(e, n), r && r.noteAddedVariable(e, i));return this;
	            }, setVariable: function setVariable(t, e) {
	              return (this.terms.set(t, e), this);
	            }, anyPivotableVariable: function anyPivotableVariable() {
	              if (this.isConstant) throw new t.InternalError("anyPivotableVariable called on a constant");var e = this.terms.escapingEach(function (t) {
	                return t.isPivotable ? { retval: t } : void 0;
	              });return e && void 0 !== e.retval ? e.retval : null;
	            }, substituteOut: function substituteOut(e, n, i, r) {
	              t.trace && (t.fnenterprint("CLE:substituteOut: " + e + ", " + n + ", " + i + ", ..."), t.traceprint("this = " + this));var s = this.setVariable.bind(this),
	                  a = this.terms,
	                  l = a.get(e);a["delete"](e), this.constant += l * n.constant, n.terms.each(function (e, n) {
	                var o = a.get(e);if (o) {
	                  var u = o + l * n;t.approx(u, 0) ? (r.noteRemovedVariable(e, i), a["delete"](e)) : s(e, u);
	                } else s(e, l * n), r && r.noteAddedVariable(e, i);
	              }), t.trace && t.traceprint("Now this is " + this);
	            }, changeSubject: function changeSubject(t, e) {
	              this.setVariable(t, this.newSubject(e));
	            }, newSubject: function newSubject(e) {
	              t.trace && t.fnenterprint("newSubject:" + e);var n = 1 / this.terms.get(e);return (this.terms["delete"](e), this.multiplyMe(-n), n);
	            }, coefficientFor: function coefficientFor(t) {
	              return this.terms.get(t) || 0;
	            }, toString: function toString() {
	              var e = "",
	                  n = !1;if (!t.approx(this.constant, 0) || this.isConstant) {
	                if ((e += this.constant, this.isConstant)) return e;n = !0;
	              }return (this.terms.each(function (t, i) {
	                n && (e += " + "), e += i + "*" + t, n = !0;
	              }), e);
	            }, equals: function equals(e) {
	              return e === this ? !0 : e instanceof t.Expression && e.constant === this.constant && e.terms.equals(this.terms);
	            }, Plus: function Plus(t, e) {
	              return t.plus(e);
	            }, Minus: function Minus(t, e) {
	              return t.minus(e);
	            }, Times: function Times(t, e) {
	              return t.times(e);
	            }, Divide: function Divide(t, e) {
	              return t.divide(e);
	            } }, {
	            isConstant: {
	              get: function get() {
	                return 0 == this.terms.size;
	              },
	              configurable: true,
	              enumerable: true
	            }
	          }));
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.AbstractConstraint = t.inherit(Object.defineProperties({ initialize: function initialize(e, n) {
	              this.hashCode = t._inc(), this.strength = e || t.Strength.required, this.weight = n || 1;
	            }, isEditConstraint: !1, isInequality: !1, isStayConstraint: !1, toString: function toString() {
	              return this.strength + " {" + this.weight + "} (" + this.expression + ")";
	            } }, {
	            required: {
	              get: function get() {
	                return this.strength === t.Strength.required;
	              },
	              configurable: true,
	              enumerable: true
	            }
	          }));var e = t.AbstractConstraint.prototype.toString,
	              n = function n(e, _n, i) {
	            t.AbstractConstraint.call(this, _n || t.Strength.strong, i), this.variable = e, this.expression = new t.Expression(e, -1, e.value);
	          };t.EditConstraint = t.inherit({ "extends": t.AbstractConstraint, initialize: function initialize() {
	              n.apply(this, arguments);
	            }, isEditConstraint: !0, toString: function toString() {
	              return "edit:" + e.call(this);
	            } }), t.StayConstraint = t.inherit({ "extends": t.AbstractConstraint, initialize: function initialize() {
	              n.apply(this, arguments);
	            }, isStayConstraint: !0, toString: function toString() {
	              return "stay:" + e.call(this);
	            } });var i = t.Constraint = t.inherit({ "extends": t.AbstractConstraint, initialize: function initialize(e, n, i) {
	              t.AbstractConstraint.call(this, n, i), this.expression = e;
	            } });t.Inequality = t.inherit({ "extends": t.Constraint, _cloneOrNewCle: function _cloneOrNewCle(e) {
	              return e.clone ? e.clone() : new t.Expression(e);
	            }, initialize: function initialize(e, n, r, s, a) {
	              var l = e instanceof t.Expression,
	                  o = r instanceof t.Expression,
	                  u = e instanceof t.AbstractVariable,
	                  c = r instanceof t.AbstractVariable,
	                  h = "number" == typeof e,
	                  f = "number" == typeof r;if ((l || h) && c) {
	                var d = e,
	                    p = n,
	                    v = r,
	                    b = s,
	                    m = a;if ((i.call(this, this._cloneOrNewCle(d), b, m), p == t.LEQ)) this.expression.multiplyMe(-1), this.expression.addVariable(v);else {
	                  if (p != t.GEQ) throw new t.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(v, -1);
	                }
	              } else if (u && (o || f)) {
	                var d = r,
	                    p = n,
	                    v = e,
	                    b = s,
	                    m = a;if ((i.call(this, this._cloneOrNewCle(d), b, m), p == t.GEQ)) this.expression.multiplyMe(-1), this.expression.addVariable(v);else {
	                  if (p != t.LEQ) throw new t.InternalError("Invalid operator in c.Inequality constructor");this.expression.addVariable(v, -1);
	                }
	              } else {
	                if (l && f) {
	                  var g = e,
	                      p = n,
	                      _ = r,
	                      b = s,
	                      m = a;if ((i.call(this, this._cloneOrNewCle(g), b, m), p == t.LEQ)) this.expression.multiplyMe(-1), this.expression.addExpression(this._cloneOrNewCle(_));else {
	                    if (p != t.GEQ) throw new t.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(_), -1);
	                  }return this;
	                }if (h && o) {
	                  var g = r,
	                      p = n,
	                      _ = e,
	                      b = s,
	                      m = a;if ((i.call(this, this._cloneOrNewCle(g), b, m), p == t.GEQ)) this.expression.multiplyMe(-1), this.expression.addExpression(this._cloneOrNewCle(_));else {
	                    if (p != t.LEQ) throw new t.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(_), -1);
	                  }return this;
	                }if (l && o) {
	                  var g = e,
	                      p = n,
	                      _ = r,
	                      b = s,
	                      m = a;if ((i.call(this, this._cloneOrNewCle(_), b, m), p == t.GEQ)) this.expression.multiplyMe(-1), this.expression.addExpression(this._cloneOrNewCle(g));else {
	                    if (p != t.LEQ) throw new t.InternalError("Invalid operator in c.Inequality constructor");this.expression.addExpression(this._cloneOrNewCle(g), -1);
	                  }
	                } else {
	                  if (l) return i.call(this, e, n, r);if (n == t.GEQ) i.call(this, new t.Expression(r), s, a), this.expression.multiplyMe(-1), this.expression.addVariable(e);else {
	                    if (n != t.LEQ) throw new t.InternalError("Invalid operator in c.Inequality constructor");i.call(this, new t.Expression(r), s, a), this.expression.addVariable(e, -1);
	                  }
	                }
	              }
	            }, isInequality: !0, toString: function toString() {
	              return i.prototype.toString.call(this) + " >= 0) id: " + this.hashCode;
	            } }), t.Equation = t.inherit({ "extends": t.Constraint, initialize: function initialize(e, n, r, s) {
	              if (e instanceof t.Expression && !n || n instanceof t.Strength) i.call(this, e, n, r);else if (e instanceof t.AbstractVariable && n instanceof t.Expression) {
	                var a = e,
	                    l = n,
	                    o = r,
	                    u = s;i.call(this, l.clone(), o, u), this.expression.addVariable(a, -1);
	              } else if (e instanceof t.AbstractVariable && "number" == typeof n) {
	                var a = e,
	                    c = n,
	                    o = r,
	                    u = s;i.call(this, new t.Expression(c), o, u), this.expression.addVariable(a, -1);
	              } else if (e instanceof t.Expression && n instanceof t.AbstractVariable) {
	                var l = e,
	                    a = n,
	                    o = r,
	                    u = s;i.call(this, l.clone(), o, u), this.expression.addVariable(a, -1);
	              } else {
	                if (!(e instanceof t.Expression || e instanceof t.AbstractVariable || "number" == typeof e) || !(n instanceof t.Expression || n instanceof t.AbstractVariable || "number" == typeof n)) throw "Bad initializer to c.Equation";e = e instanceof t.Expression ? e.clone() : new t.Expression(e), n = n instanceof t.Expression ? n.clone() : new t.Expression(n), i.call(this, e, r, s), this.expression.addExpression(n, -1);
	              }t.assert(this.strength instanceof t.Strength, "_strength not set");
	            }, toString: function toString() {
	              return i.prototype.toString.call(this) + " = 0)";
	            } });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.EditInfo = t.inherit({ initialize: function initialize(t, e, n, i, r) {
	              this.constraint = t, this.editPlus = e, this.editMinus = n, this.prevEditConstant = i, this.index = r;
	            }, toString: function toString() {
	              return "<cn=" + this.constraint + ", ep=" + this.editPlus + ", em=" + this.editMinus + ", pec=" + this.prevEditConstant + ", index=" + this.index + ">";
	            } });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.Tableau = t.inherit({ initialize: function initialize() {
	              this.columns = new t.HashTable(), this.rows = new t.HashTable(), this._infeasibleRows = new t.HashSet(), this._externalRows = new t.HashSet(), this._externalParametricVars = new t.HashSet();
	            }, noteRemovedVariable: function noteRemovedVariable(e, n) {
	              t.trace && console.log("c.Tableau::noteRemovedVariable: ", e, n);var i = this.columns.get(e);n && i && i["delete"](n);
	            }, noteAddedVariable: function noteAddedVariable(t, e) {
	              e && this.insertColVar(t, e);
	            }, getInternalInfo: function getInternalInfo() {
	              var t = "Tableau Information:\n";return (t += "Rows: " + this.rows.size, t += " (= " + (this.rows.size - 1) + " constraints)", t += "\nColumns: " + this.columns.size, t += "\nInfeasible Rows: " + this._infeasibleRows.size, t += "\nExternal basic variables: " + this._externalRows.size, t += "\nExternal parametric variables: ", t += this._externalParametricVars.size, t += "\n");
	            }, toString: function toString() {
	              var t = "Tableau:\n";return (this.rows.each(function (e, n) {
	                t += e, t += " <==> ", t += n, t += "\n";
	              }), t += "\nColumns:\n", t += this.columns, t += "\nInfeasible rows: ", t += this._infeasibleRows, t += "External basic variables: ", t += this._externalRows, t += "External parametric variables: ", t += this._externalParametricVars);
	            }, insertColVar: function insertColVar(e, n) {
	              var i = this.columns.get(e);i || (i = new t.HashSet(), this.columns.set(e, i)), i.add(n);
	            }, addRow: function addRow(e, n) {
	              t.trace && t.fnenterprint("addRow: " + e + ", " + n), this.rows.set(e, n), n.terms.each(function (t) {
	                this.insertColVar(t, e), t.isExternal && this._externalParametricVars.add(t);
	              }, this), e.isExternal && this._externalRows.add(e), t.trace && t.traceprint("" + this);
	            }, removeColumn: function removeColumn(e) {
	              t.trace && t.fnenterprint("removeColumn:" + e);var n = this.columns.get(e);n ? (this.columns["delete"](e), n.each(function (t) {
	                var n = this.rows.get(t);n.terms["delete"](e);
	              }, this)) : t.trace && console.log("Could not find var", e, "in columns"), e.isExternal && (this._externalRows["delete"](e), this._externalParametricVars["delete"](e));
	            }, removeRow: function removeRow(e) {
	              t.trace && t.fnenterprint("removeRow:" + e);var n = this.rows.get(e);return (t.assert(null != n), n.terms.each(function (n) {
	                var i = this.columns.get(n);null != i && (t.trace && console.log("removing from varset:", e), i["delete"](e));
	              }, this), this._infeasibleRows["delete"](e), e.isExternal && this._externalRows["delete"](e), this.rows["delete"](e), t.trace && t.fnexitprint("returning " + n), n);
	            }, substituteOut: function substituteOut(e, n) {
	              t.trace && t.fnenterprint("substituteOut:" + e + ", " + n), t.trace && t.traceprint("" + this);var i = this.columns.get(e);i.each(function (t) {
	                var i = this.rows.get(t);i.substituteOut(e, n, t, this), t.isRestricted && 0 > i.constant && this._infeasibleRows.add(t);
	              }, this), e.isExternal && (this._externalRows.add(e), this._externalParametricVars["delete"](e)), this.columns["delete"](e);
	            }, columnsHasKey: function columnsHasKey(t) {
	              return !!this.columns.get(t);
	            } });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          var e = t.Tableau,
	              n = e.prototype,
	              i = 1e-8,
	              r = t.Strength.weak;t.SimplexSolver = t.inherit({ "extends": t.Tableau, initialize: function initialize() {
	              t.Tableau.call(this), this._stayMinusErrorVars = [], this._stayPlusErrorVars = [], this._errorVars = new t.HashTable(), this._markerVars = new t.HashTable(), this._objective = new t.ObjectiveVariable({ name: "Z" }), this._editVarMap = new t.HashTable(), this._editVarList = [], this._slackCounter = 0, this._artificialCounter = 0, this._dummyCounter = 0, this.autoSolve = !0, this._fNeedsSolving = !1, this._optimizeCount = 0, this.rows.set(this._objective, new t.Expression()), this._stkCedcns = [0], t.trace && t.traceprint("objective expr == " + this.rows.get(this._objective));
	            }, addLowerBound: function addLowerBound(e, n) {
	              var i = new t.Inequality(e, t.GEQ, new t.Expression(n));return this.addConstraint(i);
	            }, addUpperBound: function addUpperBound(e, n) {
	              var i = new t.Inequality(e, t.LEQ, new t.Expression(n));return this.addConstraint(i);
	            }, addBounds: function addBounds(t, e, n) {
	              return (this.addLowerBound(t, e), this.addUpperBound(t, n), this);
	            }, add: function add() {
	              for (var t = 0; arguments.length > t; t++) this.addConstraint(arguments[t]);return this;
	            }, addConstraint: function addConstraint(e) {
	              t.trace && t.fnenterprint("addConstraint: " + e);var n = Array(2),
	                  i = Array(1),
	                  r = this.newExpression(e, n, i);if ((i = i[0], this.tryAddingDirectly(r) || this.addWithArtificialVariable(r), this._fNeedsSolving = !0, e.isEditConstraint)) {
	                var s = this._editVarMap.size,
	                    a = n[0],
	                    l = n[1];!a instanceof t.SlackVariable && console.warn("cvEplus not a slack variable =", a), !l instanceof t.SlackVariable && console.warn("cvEminus not a slack variable =", l), t.debug && console.log("new c.EditInfo(" + e + ", " + a + ", " + l + ", " + i + ", " + s + ")");var o = new t.EditInfo(e, a, l, i, s);this._editVarMap.set(e.variable, o), this._editVarList[s] = { v: e.variable, info: o };
	              }return (this.autoSolve && (this.optimize(this._objective), this._setExternalVariables()), this);
	            }, addConstraintNoException: function addConstraintNoException(e) {
	              t.trace && t.fnenterprint("addConstraintNoException: " + e);try {
	                return (this.addConstraint(e), !0);
	              } catch (n) {
	                return !1;
	              }
	            }, addEditVar: function addEditVar(e, n) {
	              return (t.trace && t.fnenterprint("addEditVar: " + e + " @ " + n), this.addConstraint(new t.EditConstraint(e, n || t.Strength.strong)));
	            }, beginEdit: function beginEdit() {
	              return (t.assert(this._editVarMap.size > 0, "_editVarMap.size > 0"), this._infeasibleRows.clear(), this._resetStayConstants(), this._stkCedcns.push(this._editVarMap.size), this);
	            }, endEdit: function endEdit() {
	              return (t.assert(this._editVarMap.size > 0, "_editVarMap.size > 0"), this.resolve(), this._stkCedcns.pop(), this.removeEditVarsTo(this._stkCedcns[this._stkCedcns.length - 1]), this);
	            }, removeAllEditVars: function removeAllEditVars() {
	              return this.removeEditVarsTo(0);
	            }, removeEditVarsTo: function removeEditVarsTo(e) {
	              try {
	                for (var n = this._editVarList.length, i = e; n > i; i++) this._editVarList[i] && this.removeConstraint(this._editVarMap.get(this._editVarList[i].v).constraint);return (this._editVarList.length = e, t.assert(this._editVarMap.size == e, "_editVarMap.size == n"), this);
	              } catch (r) {
	                throw new t.InternalError("Constraint not found in removeEditVarsTo");
	              }
	            }, addPointStays: function addPointStays(e) {
	              return (t.trace && console.log("addPointStays", e), e.forEach(function (t, e) {
	                this.addStay(t.x, r, Math.pow(2, e)), this.addStay(t.y, r, Math.pow(2, e));
	              }, this), this);
	            }, addStay: function addStay(e, n, i) {
	              var s = new t.StayConstraint(e, n || r, i || 1);return this.addConstraint(s);
	            }, removeConstraint: function removeConstraint(t) {
	              return (this.removeConstraintInternal(t), this);
	            }, removeConstraintInternal: function removeConstraintInternal(e) {
	              t.trace && t.fnenterprint("removeConstraintInternal: " + e), t.trace && t.traceprint("" + this), this._fNeedsSolving = !0, this._resetStayConstants();var n = this.rows.get(this._objective),
	                  i = this._errorVars.get(e);t.trace && t.traceprint("eVars == " + i), null != i && i.each(function (r) {
	                var s = this.rows.get(r);null == s ? n.addVariable(r, -e.weight * e.strength.symbolicWeight.value, this._objective, this) : n.addExpression(s, -e.weight * e.strength.symbolicWeight.value, this._objective, this), t.trace && t.traceprint("now eVars == " + i);
	              }, this);var r = this._markerVars.get(e);if ((this._markerVars["delete"](e), null == r)) throw new t.InternalError("Constraint not found in removeConstraintInternal");if ((t.trace && t.traceprint("Looking to remove var " + r), null == this.rows.get(r))) {
	                var s = this.columns.get(r);t.trace && t.traceprint("Must pivot -- columns are " + s);var a = null,
	                    l = 0;s.each(function (e) {
	                  if (e.isRestricted) {
	                    var n = this.rows.get(e),
	                        i = n.coefficientFor(r);if ((t.trace && t.traceprint("Marker " + r + "'s coefficient in " + n + " is " + i), 0 > i)) {
	                      var s = -n.constant / i;(null == a || l > s || t.approx(s, l) && e.hashCode < a.hashCode) && (l = s, a = e);
	                    }
	                  }
	                }, this), null == a && (t.trace && t.traceprint("exitVar is still null"), s.each(function (t) {
	                  if (t.isRestricted) {
	                    var e = this.rows.get(t),
	                        n = e.coefficientFor(r),
	                        i = e.constant / n;(null == a || l > i) && (l = i, a = t);
	                  }
	                }, this)), null == a && (0 == s.size ? this.removeColumn(r) : s.escapingEach(function (t) {
	                  return t != this._objective ? (a = t, { brk: !0 }) : void 0;
	                }, this)), null != a && this.pivot(r, a);
	              }if ((null != this.rows.get(r) && this.removeRow(r), null != i && i.each(function (t) {
	                t != r && this.removeColumn(t);
	              }, this), e.isStayConstraint)) {
	                if (null != i) for (var o = 0; this._stayPlusErrorVars.length > o; o++) i["delete"](this._stayPlusErrorVars[o]), i["delete"](this._stayMinusErrorVars[o]);
	              } else if (e.isEditConstraint) {
	                t.assert(null != i, "eVars != null");var u = this._editVarMap.get(e.variable);this.removeColumn(u.editMinus), this._editVarMap["delete"](e.variable);
	              }return (null != i && this._errorVars["delete"](i), this.autoSolve && (this.optimize(this._objective), this._setExternalVariables()), this);
	            }, reset: function reset() {
	              throw (t.trace && t.fnenterprint("reset"), new t.InternalError("reset not implemented"));
	            }, resolveArray: function resolveArray(e) {
	              t.trace && t.fnenterprint("resolveArray" + e);var n = e.length;this._editVarMap.each(function (t, i) {
	                var r = i.index;n > r && this.suggestValue(t, e[r]);
	              }, this), this.resolve();
	            }, resolvePair: function resolvePair(t, e) {
	              this.suggestValue(this._editVarList[0].v, t), this.suggestValue(this._editVarList[1].v, e), this.resolve();
	            }, resolve: function resolve() {
	              t.trace && t.fnenterprint("resolve()"), this.dualOptimize(), this._setExternalVariables(), this._infeasibleRows.clear(), this._resetStayConstants();
	            }, suggestValue: function suggestValue(e, n) {
	              t.trace && console.log("suggestValue(" + e + ", " + n + ")");var i = this._editVarMap.get(e);if (!i) throw new t.Error("suggestValue for variable " + e + ", but var is not an edit variable");var r = n - i.prevEditConstant;return (i.prevEditConstant = n, this.deltaEditConstant(r, i.editPlus, i.editMinus), this);
	            }, solve: function solve() {
	              return (this._fNeedsSolving && (this.optimize(this._objective), this._setExternalVariables()), this);
	            }, setEditedValue: function setEditedValue(e, n) {
	              if (!this.columnsHasKey(e) && null == this.rows.get(e)) return (e.value = n, this);if (!t.approx(n, e.value)) {
	                this.addEditVar(e), this.beginEdit();try {
	                  this.suggestValue(e, n);
	                } catch (i) {
	                  throw new t.InternalError("Error in setEditedValue");
	                }this.endEdit();
	              }return this;
	            }, addVar: function addVar(e) {
	              if (!this.columnsHasKey(e) && null == this.rows.get(e)) {
	                try {
	                  this.addStay(e);
	                } catch (n) {
	                  throw new t.InternalError("Error in addVar -- required failure is impossible");
	                }t.trace && t.traceprint("added initial stay on " + e);
	              }return this;
	            }, getInternalInfo: function getInternalInfo() {
	              var t = n.getInternalInfo.call(this);return (t += "\nSolver info:\n", t += "Stay Error Variables: ", t += this._stayPlusErrorVars.length + this._stayMinusErrorVars.length, t += " (" + this._stayPlusErrorVars.length + " +, ", t += this._stayMinusErrorVars.length + " -)\n", t += "Edit Variables: " + this._editVarMap.size, t += "\n");
	            }, getDebugInfo: function getDebugInfo() {
	              return "" + this + this.getInternalInfo() + "\n";
	            }, toString: function toString() {
	              var t = n.getInternalInfo.call(this);return (t += "\n_stayPlusErrorVars: ", t += "[" + this._stayPlusErrorVars + "]", t += "\n_stayMinusErrorVars: ", t += "[" + this._stayMinusErrorVars + "]", t += "\n", t += "_editVarMap:\n" + this._editVarMap, t += "\n");
	            }, getConstraintMap: function getConstraintMap() {
	              return this._markerVars;
	            }, addWithArtificialVariable: function addWithArtificialVariable(e) {
	              t.trace && t.fnenterprint("addWithArtificialVariable: " + e);var n = new t.SlackVariable({ value: ++this._artificialCounter, prefix: "a" }),
	                  i = new t.ObjectiveVariable({ name: "az" }),
	                  r = e.clone();t.trace && t.traceprint("before addRows:\n" + this), this.addRow(i, r), this.addRow(n, e), t.trace && t.traceprint("after addRows:\n" + this), this.optimize(i);var s = this.rows.get(i);if ((t.trace && t.traceprint("azTableauRow.constant == " + s.constant), !t.approx(s.constant, 0))) throw (this.removeRow(i), this.removeColumn(n), new t.RequiredFailure());var a = this.rows.get(n);if (null != a) {
	                if (a.isConstant) return (this.removeRow(n), void this.removeRow(i));var l = a.anyPivotableVariable();this.pivot(l, n);
	              }t.assert(null == this.rows.get(n), "rowExpression(av) == null"), this.removeColumn(n), this.removeRow(i);
	            }, tryAddingDirectly: function tryAddingDirectly(e) {
	              t.trace && t.fnenterprint("tryAddingDirectly: " + e);var n = this.chooseSubject(e);return null == n ? (t.trace && t.fnexitprint("returning false"), !1) : (e.newSubject(n), this.columnsHasKey(n) && this.substituteOut(n, e), this.addRow(n, e), t.trace && t.fnexitprint("returning true"), !0);
	            }, chooseSubject: function chooseSubject(e) {
	              t.trace && t.fnenterprint("chooseSubject: " + e);var n = null,
	                  i = !1,
	                  r = !1,
	                  s = e.terms,
	                  a = s.escapingEach(function (t, e) {
	                if (i) {
	                  if (!t.isRestricted && !this.columnsHasKey(t)) return { retval: t };
	                } else if (t.isRestricted) {
	                  if (!r && !t.isDummy && 0 > e) {
	                    var s = this.columns.get(t);(null == s || 1 == s.size && this.columnsHasKey(this._objective)) && (n = t, r = !0);
	                  }
	                } else n = t, i = !0;
	              }, this);if (a && void 0 !== a.retval) return a.retval;if (null != n) return n;var l = 0,
	                  a = s.escapingEach(function (t, e) {
	                return t.isDummy ? void (this.columnsHasKey(t) || (n = t, l = e)) : { retval: null };
	              }, this);if (a && void 0 !== a.retval) return a.retval;if (!t.approx(e.constant, 0)) throw new t.RequiredFailure();return (l > 0 && e.multiplyMe(-1), n);
	            }, deltaEditConstant: function deltaEditConstant(e, n, i) {
	              t.trace && t.fnenterprint("deltaEditConstant :" + e + ", " + n + ", " + i);var r = this.rows.get(n);if (null != r) return (r.constant += e, void (0 > r.constant && this._infeasibleRows.add(n)));var s = this.rows.get(i);if (null != s) return (s.constant += -e, void (0 > s.constant && this._infeasibleRows.add(i)));var a = this.columns.get(i);a || console.log("columnVars is null -- tableau is:\n" + this), a.each(function (t) {
	                var n = this.rows.get(t),
	                    r = n.coefficientFor(i);n.constant += r * e, t.isRestricted && 0 > n.constant && this._infeasibleRows.add(t);
	              }, this);
	            }, dualOptimize: function dualOptimize() {
	              t.trace && t.fnenterprint("dualOptimize:");for (var e = this.rows.get(this._objective); this._infeasibleRows.size;) {
	                var n = this._infeasibleRows.values()[0];this._infeasibleRows["delete"](n);var i = null,
	                    r = this.rows.get(n);if (r && 0 > r.constant) {
	                  var s,
	                      a = Number.MAX_VALUE,
	                      l = r.terms;if ((l.each(function (n, r) {
	                    if (r > 0 && n.isPivotable) {
	                      var l = e.coefficientFor(n);s = l / r, (a > s || t.approx(s, a) && n.hashCode < i.hashCode) && (i = n, a = s);
	                    }
	                  }), a == Number.MAX_VALUE)) throw new t.InternalError("ratio == nil (MAX_VALUE) in dualOptimize");this.pivot(i, n);
	                }
	              }
	            }, newExpression: function newExpression(e, n, i) {
	              t.trace && (t.fnenterprint("newExpression: " + e), t.traceprint("cn.isInequality == " + e.isInequality), t.traceprint("cn.required == " + e.required));var r = e.expression,
	                  s = new t.Expression(r.constant),
	                  a = new t.SlackVariable(),
	                  l = new t.DummyVariable(),
	                  o = new t.SlackVariable(),
	                  u = new t.SlackVariable(),
	                  c = r.terms;if ((c.each(function (t, e) {
	                var n = this.rows.get(t);n ? s.addExpression(n, e) : s.addVariable(t, e);
	              }, this), e.isInequality)) {
	                if ((t.trace && t.traceprint("Inequality, adding slack"), ++this._slackCounter, a = new t.SlackVariable({ value: this._slackCounter, prefix: "s" }), s.setVariable(a, -1), this._markerVars.set(e, a), !e.required)) {
	                  ++this._slackCounter, o = new t.SlackVariable({ value: this._slackCounter, prefix: "em" }), s.setVariable(o, 1);var h = this.rows.get(this._objective);h.setVariable(o, e.strength.symbolicWeight.value * e.weight), this.insertErrorVar(e, o), this.noteAddedVariable(o, this._objective);
	                }
	              } else if (e.required) t.trace && t.traceprint("Equality, required"), ++this._dummyCounter, l = new t.DummyVariable({ value: this._dummyCounter, prefix: "d" }), s.setVariable(l, 1), this._markerVars.set(e, l), t.trace && t.traceprint("Adding dummyVar == d" + this._dummyCounter);else {
	                t.trace && t.traceprint("Equality, not required"), ++this._slackCounter, u = new t.SlackVariable({ value: this._slackCounter, prefix: "ep" }), o = new t.SlackVariable({ value: this._slackCounter, prefix: "em" }), s.setVariable(u, -1), s.setVariable(o, 1), this._markerVars.set(e, u);var h = this.rows.get(this._objective);t.trace && console.log(h);var f = e.strength.symbolicWeight.value * e.weight;0 == f && (t.trace && t.traceprint("cn == " + e), t.trace && t.traceprint("adding " + u + " and " + o + " with swCoeff == " + f)), h.setVariable(u, f), this.noteAddedVariable(u, this._objective), h.setVariable(o, f), this.noteAddedVariable(o, this._objective), this.insertErrorVar(e, o), this.insertErrorVar(e, u), e.isStayConstraint ? (this._stayPlusErrorVars.push(u), this._stayMinusErrorVars.push(o)) : e.isEditConstraint && (n[0] = u, n[1] = o, i[0] = r.constant);
	              }return (0 > s.constant && s.multiplyMe(-1), t.trace && t.fnexitprint("returning " + s), s);
	            }, optimize: function optimize(e) {
	              t.trace && t.fnenterprint("optimize: " + e), t.trace && t.traceprint("" + this), this._optimizeCount++;var n = this.rows.get(e);t.assert(null != n, "zRow != null");for (var r, s, a = null, l = null;;) {
	                if ((r = 0, s = n.terms, s.escapingEach(function (t, e) {
	                  return t.isPivotable && r > e ? (r = e, a = t, { brk: 1 }) : void 0;
	                }, this), r >= -i)) return;t.trace && console.log("entryVar:", a, "objectiveCoeff:", r);var o = Number.MAX_VALUE,
	                    u = this.columns.get(a),
	                    c = 0;if ((u.each(function (e) {
	                  if ((t.trace && t.traceprint("Checking " + e), e.isPivotable)) {
	                    var n = this.rows.get(e),
	                        i = n.coefficientFor(a);t.trace && t.traceprint("pivotable, coeff = " + i), 0 > i && (c = -n.constant / i, (o > c || t.approx(c, o) && e.hashCode < l.hashCode) && (o = c, l = e));
	                  }
	                }, this), o == Number.MAX_VALUE)) throw new t.InternalError("Objective function is unbounded in optimize");this.pivot(a, l), t.trace && t.traceprint("" + this);
	              }
	            }, pivot: function pivot(e, n) {
	              t.trace && console.log("pivot: ", e, n);var i = !1;i && console.time(" SimplexSolver::pivot"), null == e && console.warn("pivot: entryVar == null"), null == n && console.warn("pivot: exitVar == null"), i && console.time("  removeRow");var r = this.removeRow(n);i && console.timeEnd("  removeRow"), i && console.time("  changeSubject"), r.changeSubject(n, e), i && console.timeEnd("  changeSubject"), i && console.time("  substituteOut"), this.substituteOut(e, r), i && console.timeEnd("  substituteOut"), i && console.time("  addRow"), this.addRow(e, r), i && console.timeEnd("  addRow"), i && console.timeEnd(" SimplexSolver::pivot");
	            }, _resetStayConstants: function _resetStayConstants() {
	              t.trace && console.log("_resetStayConstants");for (var e = 0; this._stayPlusErrorVars.length > e; e++) {
	                var n = this.rows.get(this._stayPlusErrorVars[e]);null == n && (n = this.rows.get(this._stayMinusErrorVars[e])), null != n && (n.constant = 0);
	              }
	            }, _setExternalVariables: function _setExternalVariables() {
	              t.trace && t.fnenterprint("_setExternalVariables:"), t.trace && t.traceprint("" + this), this._externalParametricVars.each(function (e) {
	                null != this.rows.get(e) ? t.trace && console.log("Error: variable" + e + " in _externalParametricVars is basic") : e.value = 0;
	              }, this), this._externalRows.each(function (t) {
	                var e = this.rows.get(t);t.value != e.constant && (t.value = e.constant);
	              }, this), this._fNeedsSolving = !1, this.onsolved();
	            }, onsolved: function onsolved() {}, insertErrorVar: function insertErrorVar(e, n) {
	              t.trace && t.fnenterprint("insertErrorVar:" + e + ", " + n);var i = this._errorVars.get(n);i || (i = new t.HashSet(), this._errorVars.set(e, i)), i.add(n);
	            } });
	        })(this.c || module.parent.exports || {}), (function (t) {
	          "use strict";t.Timer = t.inherit({ initialize: function initialize() {
	              this.isRunning = !1, this._elapsedMs = 0;
	            }, start: function start() {
	              return (this.isRunning = !0, this._startReading = new Date(), this);
	            }, stop: function stop() {
	              return (this.isRunning = !1, this._elapsedMs += new Date() - this._startReading, this);
	            }, reset: function reset() {
	              return (this.isRunning = !1, this._elapsedMs = 0, this);
	            }, elapsedTime: function elapsedTime() {
	              return this.isRunning ? (this._elapsedMs + (new Date() - this._startReading)) / 1e3 : this._elapsedMs / 1e3;
	            } });
	        })(this.c || module.parent.exports || {}), __cassowary_parser = (function () {
	          function t(t) {
	            return '"' + t.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\x08/g, "\\b").replace(/\t/g, "\\t").replace(/\n/g, "\\n").replace(/\f/g, "\\f").replace(/\r/g, "\\r").replace(/[\x00-\x07\x0B\x0E-\x1F\x80-\uFFFF]/g, escape) + '"';
	          }var e = { parse: function parse(e, n) {
	              function i(t) {
	                H > T || (T > H && (H = T, F = []), F.push(t));
	              }function r() {
	                var t, e, n, i, r;if ((i = T, r = T, t = g(), null !== t)) {
	                  if ((n = s(), null !== n)) for (e = []; null !== n;) e.push(n), n = s();else e = null;null !== e ? (n = g(), null !== n ? t = [t, e, n] : (t = null, T = r)) : (t = null, T = r);
	                } else t = null, T = r;return (null !== t && (t = (function (t, e) {
	                  return e;
	                })(i, t[1])), null === t && (T = i), t);
	              }function s() {
	                var t, e, n, i;return (n = T, i = T, t = k(), null !== t ? (e = h(), null !== e ? t = [t, e] : (t = null, T = i)) : (t = null, T = i), null !== t && (t = (function (t, e) {
	                  return e;
	                })(n, t[0])), null === t && (T = n), t);
	              }function a() {
	                var t;return (e.length > T ? (t = e.charAt(T), T++) : (t = null, 0 === L && i("any character")), t);
	              }function l() {
	                var t;return (/^[a-zA-Z]/.test(e.charAt(T)) ? (t = e.charAt(T), T++) : (t = null, 0 === L && i("[a-zA-Z]")), null === t && (36 === e.charCodeAt(T) ? (t = "$", T++) : (t = null, 0 === L && i('"$"')), null === t && (95 === e.charCodeAt(T) ? (t = "_", T++) : (t = null, 0 === L && i('"_"')))), t);
	              }function o() {
	                var t;return (L++, /^[\t\x0B\f \xA0\uFEFF]/.test(e.charAt(T)) ? (t = e.charAt(T), T++) : (t = null, 0 === L && i("[\\t\\x0B\\f \\xA0\\uFEFF]")), L--, 0 === L && null === t && i("whitespace"), t);
	              }function u() {
	                var t;return (/^[\n\r\u2028\u2029]/.test(e.charAt(T)) ? (t = e.charAt(T), T++) : (t = null, 0 === L && i("[\\n\\r\\u2028\\u2029]")), t);
	              }function c() {
	                var t;return (L++, 10 === e.charCodeAt(T) ? (t = "\n", T++) : (t = null, 0 === L && i('"\\n"')), null === t && ("\r\n" === e.substr(T, 2) ? (t = "\r\n", T += 2) : (t = null, 0 === L && i('"\\r\\n"')), null === t && (13 === e.charCodeAt(T) ? (t = "\r", T++) : (t = null, 0 === L && i('"\\r"')), null === t && (8232 === e.charCodeAt(T) ? (t = "\u2028", T++) : (t = null, 0 === L && i("\"\\u2028\"")), null === t && (8233 === e.charCodeAt(T) ? (t = "\u2029", T++) : (t = null, 0 === L && i("\"\\u2029\"")))))), L--, 0 === L && null === t && i("end of line"), t);
	              }function h() {
	                var t, n, r;return (r = T, t = g(), null !== t ? (59 === e.charCodeAt(T) ? (n = ";", T++) : (n = null, 0 === L && i('";"')), null !== n ? t = [t, n] : (t = null, T = r)) : (t = null, T = r), null === t && (r = T, t = m(), null !== t ? (n = c(), null !== n ? t = [t, n] : (t = null, T = r)) : (t = null, T = r), null === t && (r = T, t = g(), null !== t ? (n = f(), null !== n ? t = [t, n] : (t = null, T = r)) : (t = null, T = r))), t);
	              }function f() {
	                var t, n;return (n = T, L++, e.length > T ? (t = e.charAt(T), T++) : (t = null, 0 === L && i("any character")), L--, null === t ? t = "" : (t = null, T = n), t);
	              }function d() {
	                var t;return (L++, t = p(), null === t && (t = b()), L--, 0 === L && null === t && i("comment"), t);
	              }function p() {
	                var t, n, r, s, l, o, u;if ((l = T, "/*" === e.substr(T, 2) ? (t = "/*", T += 2) : (t = null, 0 === L && i('"/*"')), null !== t)) {
	                  for (n = [], o = T, u = T, L++, "*/" === e.substr(T, 2) ? (r = "*/", T += 2) : (r = null, 0 === L && i('"*/"')), L--, null === r ? r = "" : (r = null, T = u), null !== r ? (s = a(), null !== s ? r = [r, s] : (r = null, T = o)) : (r = null, T = o); null !== r;) n.push(r), o = T, u = T, L++, "*/" === e.substr(T, 2) ? (r = "*/", T += 2) : (r = null, 0 === L && i('"*/"')), L--, null === r ? r = "" : (r = null, T = u), null !== r ? (s = a(), null !== s ? r = [r, s] : (r = null, T = o)) : (r = null, T = o);null !== n ? ("*/" === e.substr(T, 2) ? (r = "*/", T += 2) : (r = null, 0 === L && i('"*/"')), null !== r ? t = [t, n, r] : (t = null, T = l)) : (t = null, T = l);
	                } else t = null, T = l;return t;
	              }function v() {
	                var t, n, r, s, l, o, c;if ((l = T, "/*" === e.substr(T, 2) ? (t = "/*", T += 2) : (t = null, 0 === L && i('"/*"')), null !== t)) {
	                  for (n = [], o = T, c = T, L++, "*/" === e.substr(T, 2) ? (r = "*/", T += 2) : (r = null, 0 === L && i('"*/"')), null === r && (r = u()), L--, null === r ? r = "" : (r = null, T = c), null !== r ? (s = a(), null !== s ? r = [r, s] : (r = null, T = o)) : (r = null, T = o); null !== r;) n.push(r), o = T, c = T, L++, "*/" === e.substr(T, 2) ? (r = "*/", T += 2) : (r = null, 0 === L && i('"*/"')), null === r && (r = u()), L--, null === r ? r = "" : (r = null, T = c), null !== r ? (s = a(), null !== s ? r = [r, s] : (r = null, T = o)) : (r = null, T = o);null !== n ? ("*/" === e.substr(T, 2) ? (r = "*/", T += 2) : (r = null, 0 === L && i('"*/"')), null !== r ? t = [t, n, r] : (t = null, T = l)) : (t = null, T = l);
	                } else t = null, T = l;return t;
	              }function b() {
	                var t, n, r, s, l, o, c;if ((l = T, "//" === e.substr(T, 2) ? (t = "//", T += 2) : (t = null, 0 === L && i('"//"')), null !== t)) {
	                  for (n = [], o = T, c = T, L++, r = u(), L--, null === r ? r = "" : (r = null, T = c), null !== r ? (s = a(), null !== s ? r = [r, s] : (r = null, T = o)) : (r = null, T = o); null !== r;) n.push(r), o = T, c = T, L++, r = u(), L--, null === r ? r = "" : (r = null, T = c), null !== r ? (s = a(), null !== s ? r = [r, s] : (r = null, T = o)) : (r = null, T = o);null !== n ? t = [t, n] : (t = null, T = l);
	                } else t = null, T = l;return t;
	              }function m() {
	                var t, e;for (t = [], e = o(), null === e && (e = v(), null === e && (e = b())); null !== e;) t.push(e), e = o(), null === e && (e = v(), null === e && (e = b()));return t;
	              }function g() {
	                var t, e;for (t = [], e = o(), null === e && (e = c(), null === e && (e = d())); null !== e;) t.push(e), e = o(), null === e && (e = c(), null === e && (e = d()));return t;
	              }function _() {
	                var t, e;return (e = T, t = x(), null === t && (t = w()), null !== t && (t = (function (t, e) {
	                  return { type: "NumericLiteral", value: e };
	                })(e, t)), null === t && (T = e), t);
	              }function w() {
	                var t, n, r;if ((r = T, /^[0-9]/.test(e.charAt(T)) ? (n = e.charAt(T), T++) : (n = null, 0 === L && i("[0-9]")), null !== n)) for (t = []; null !== n;) t.push(n), /^[0-9]/.test(e.charAt(T)) ? (n = e.charAt(T), T++) : (n = null, 0 === L && i("[0-9]"));else t = null;return (null !== t && (t = (function (t, e) {
	                  return parseInt(e.join(""));
	                })(r, t)), null === t && (T = r), t);
	              }function x() {
	                var t, n, r, s, a;return (s = T, a = T, t = w(), null !== t ? (46 === e.charCodeAt(T) ? (n = ".", T++) : (n = null, 0 === L && i('"."')), null !== n ? (r = w(), null !== r ? t = [t, n, r] : (t = null, T = a)) : (t = null, T = a)) : (t = null, T = a), null !== t && (t = (function (t, e) {
	                  return parseFloat(e.join(""));
	                })(s, t)), null === t && (T = s), t);
	              }function E() {
	                var t, n, r, s;if ((s = T, /^[\-+]/.test(e.charAt(T)) ? (t = e.charAt(T), T++) : (t = null, 0 === L && i("[\\-+]")), t = null !== t ? t : "", null !== t)) {
	                  if ((/^[0-9]/.test(e.charAt(T)) ? (r = e.charAt(T), T++) : (r = null, 0 === L && i("[0-9]")), null !== r)) for (n = []; null !== r;) n.push(r), /^[0-9]/.test(e.charAt(T)) ? (r = e.charAt(T), T++) : (r = null, 0 === L && i("[0-9]"));else n = null;null !== n ? t = [t, n] : (t = null, T = s);
	                } else t = null, T = s;return t;
	              }function y() {
	                var t, e;return (L++, e = T, t = V(), null !== t && (t = (function (t, e) {
	                  return e;
	                })(e, t)), null === t && (T = e), L--, 0 === L && null === t && i("identifier"), t);
	              }function V() {
	                var t, e, n, r, s;if ((L++, r = T, s = T, t = l(), null !== t)) {
	                  for (e = [], n = l(); null !== n;) e.push(n), n = l();null !== e ? t = [t, e] : (t = null, T = s);
	                } else t = null, T = s;return (null !== t && (t = (function (t, e, n) {
	                  return e + n.join("");
	                })(r, t[0], t[1])), null === t && (T = r), L--, 0 === L && null === t && i("identifier"), t);
	              }function C() {
	                var t, n, r, s, a, l, o;return (l = T, t = y(), null !== t && (t = (function (t, e) {
	                  return { type: "Variable", name: e };
	                })(l, t)), null === t && (T = l), null === t && (t = _(), null === t && (l = T, o = T, 40 === e.charCodeAt(T) ? (t = "(", T++) : (t = null, 0 === L && i('"("')), null !== t ? (n = g(), null !== n ? (r = k(), null !== r ? (s = g(), null !== s ? (41 === e.charCodeAt(T) ? (a = ")", T++) : (a = null, 0 === L && i('")"')), null !== a ? t = [t, n, r, s, a] : (t = null, T = o)) : (t = null, T = o)) : (t = null, T = o)) : (t = null, T = o)) : (t = null, T = o), null !== t && (t = (function (t, e) {
	                  return e;
	                })(l, t[2])), null === t && (T = l))), t);
	              }function S() {
	                var t, e, n, i, r;return (t = C(), null === t && (i = T, r = T, t = A(), null !== t ? (e = g(), null !== e ? (n = S(), null !== n ? t = [t, e, n] : (t = null, T = r)) : (t = null, T = r)) : (t = null, T = r), null !== t && (t = (function (t, e, n) {
	                  return { type: "UnaryExpression", operator: e, expression: n };
	                })(i, t[0], t[2])), null === t && (T = i)), t);
	              }function A() {
	                var t;return (43 === e.charCodeAt(T) ? (t = "+", T++) : (t = null, 0 === L && i('"+"')), null === t && (45 === e.charCodeAt(T) ? (t = "-", T++) : (t = null, 0 === L && i('"-"')), null === t && (33 === e.charCodeAt(T) ? (t = "!", T++) : (t = null, 0 === L && i('"!"')))), t);
	              }function z() {
	                var t, e, n, i, r, s, a, l, o;if ((a = T, l = T, t = S(), null !== t)) {
	                  for (e = [], o = T, n = g(), null !== n ? (i = M(), null !== i ? (r = g(), null !== r ? (s = S(), null !== s ? n = [n, i, r, s] : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o); null !== n;) e.push(n), o = T, n = g(), null !== n ? (i = M(), null !== i ? (r = g(), null !== r ? (s = S(), null !== s ? n = [n, i, r, s] : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o);null !== e ? t = [t, e] : (t = null, T = l);
	                } else t = null, T = l;return (null !== t && (t = (function (t, e, n) {
	                  for (var i = e, r = 0; n.length > r; r++) i = { type: "MultiplicativeExpression", operator: n[r][1], left: i, right: n[r][3] };return i;
	                })(a, t[0], t[1])), null === t && (T = a), t);
	              }function M() {
	                var t;return (42 === e.charCodeAt(T) ? (t = "*", T++) : (t = null, 0 === L && i('"*"')), null === t && (47 === e.charCodeAt(T) ? (t = "/", T++) : (t = null, 0 === L && i('"/"'))), t);
	              }function O() {
	                var t, e, n, i, r, s, a, l, o;if ((a = T, l = T, t = z(), null !== t)) {
	                  for (e = [], o = T, n = g(), null !== n ? (i = j(), null !== i ? (r = g(), null !== r ? (s = z(), null !== s ? n = [n, i, r, s] : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o); null !== n;) e.push(n), o = T, n = g(), null !== n ? (i = j(), null !== i ? (r = g(), null !== r ? (s = z(), null !== s ? n = [n, i, r, s] : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o);null !== e ? t = [t, e] : (t = null, T = l);
	                } else t = null, T = l;return (null !== t && (t = (function (t, e, n) {
	                  for (var i = e, r = 0; n.length > r; r++) i = { type: "AdditiveExpression", operator: n[r][1], left: i, right: n[r][3] };return i;
	                })(a, t[0], t[1])), null === t && (T = a), t);
	              }function j() {
	                var t;return (43 === e.charCodeAt(T) ? (t = "+", T++) : (t = null, 0 === L && i('"+"')), null === t && (45 === e.charCodeAt(T) ? (t = "-", T++) : (t = null, 0 === L && i('"-"'))), t);
	              }function R() {
	                var t, e, n, i, r, s, a, l, o;if ((a = T, l = T, t = O(), null !== t)) {
	                  for (e = [], o = T, n = g(), null !== n ? (i = I(), null !== i ? (r = g(), null !== r ? (s = O(), null !== s ? n = [n, i, r, s] : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o); null !== n;) e.push(n), o = T, n = g(), null !== n ? (i = I(), null !== i ? (r = g(), null !== r ? (s = O(), null !== s ? n = [n, i, r, s] : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o)) : (n = null, T = o);null !== e ? t = [t, e] : (t = null, T = l);
	                } else t = null, T = l;return (null !== t && (t = (function (t, e, n) {
	                  for (var i = e, r = 0; n.length > r; r++) i = { type: "Inequality", operator: n[r][1], left: i, right: n[r][3] };return i;
	                })(a, t[0], t[1])), null === t && (T = a), t);
	              }function I() {
	                var t;return ("<=" === e.substr(T, 2) ? (t = "<=", T += 2) : (t = null, 0 === L && i('"<="')), null === t && (">=" === e.substr(T, 2) ? (t = ">=", T += 2) : (t = null, 0 === L && i('">="')), null === t && (60 === e.charCodeAt(T) ? (t = "<", T++) : (t = null, 0 === L && i('"<"')), null === t && (62 === e.charCodeAt(T) ? (t = ">", T++) : (t = null, 0 === L && i('">"'))))), t);
	              }function k() {
	                var t, n, r, s, a, l, o, u, c;if ((o = T, u = T, t = R(), null !== t)) {
	                  for (n = [], c = T, r = g(), null !== r ? ("==" === e.substr(T, 2) ? (s = "==", T += 2) : (s = null, 0 === L && i('"=="')), null !== s ? (a = g(), null !== a ? (l = R(), null !== l ? r = [r, s, a, l] : (r = null, T = c)) : (r = null, T = c)) : (r = null, T = c)) : (r = null, T = c); null !== r;) n.push(r), c = T, r = g(), null !== r ? ("==" === e.substr(T, 2) ? (s = "==", T += 2) : (s = null, 0 === L && i('"=="')), null !== s ? (a = g(), null !== a ? (l = R(), null !== l ? r = [r, s, a, l] : (r = null, T = c)) : (r = null, T = c)) : (r = null, T = c)) : (r = null, T = c);null !== n ? t = [t, n] : (t = null, T = u);
	                } else t = null, T = u;return (null !== t && (t = (function (t, e, n) {
	                  for (var i = e, r = 0; n.length > r; r++) i = { type: "Equality", operator: n[r][1], left: i, right: n[r][3] };return i;
	                })(o, t[0], t[1])), null === t && (T = o), t);
	              }function N(t) {
	                t.sort();for (var e = null, n = [], i = 0; t.length > i; i++) t[i] !== e && (n.push(t[i]), e = t[i]);return n;
	              }function q() {
	                for (var t = 1, n = 1, i = !1, r = 0; Math.max(T, H) > r; r++) {
	                  var s = e.charAt(r);"\n" === s ? (i || t++, n = 1, i = !1) : "\r" === s || "\u2028" === s || "\u2029" === s ? (t++, n = 1, i = !0) : (n++, i = !1);
	                }return { line: t, column: n };
	              }var P = { start: r, Statement: s, SourceCharacter: a, IdentifierStart: l, WhiteSpace: o, LineTerminator: u, LineTerminatorSequence: c, EOS: h, EOF: f, Comment: d, MultiLineComment: p, MultiLineCommentNoLineTerminator: v, SingleLineComment: b, _: m, __: g, Literal: _, Integer: w, Real: x, SignedInteger: E, Identifier: y, IdentifierName: V, PrimaryExpression: C, UnaryExpression: S, UnaryOperator: A, MultiplicativeExpression: z, MultiplicativeOperator: M, AdditiveExpression: O, AdditiveOperator: j, InequalityExpression: R, InequalityOperator: I, LinearExpression: k };if (void 0 !== n) {
	                if (void 0 === P[n]) throw Error("Invalid rule name: " + t(n) + ".");
	              } else n = "start";var T = 0,
	                  L = 0,
	                  H = 0,
	                  F = [],
	                  D = P[n]();if (null === D || T !== e.length) {
	                var Q = Math.max(T, H),
	                    W = e.length > Q ? e.charAt(Q) : null,
	                    G = q();throw new this.SyntaxError(N(F), W, Q, G.line, G.column);
	              }return D;
	            }, toSource: function toSource() {
	              return this._source;
	            } };return (e.SyntaxError = function (e, n, i, r, s) {
	            function a(e, n) {
	              var i, r;switch (e.length) {case 0:
	                  i = "end of input";break;case 1:
	                  i = e[0];break;default:
	                  i = e.slice(0, e.length - 1).join(", ") + " or " + e[e.length - 1];}return (r = n ? t(n) : "end of input", "Expected " + i + " but " + r + " found.");
	            }this.name = "SyntaxError", this.expected = e, this.found = n, this.message = a(e, n), this.offset = i, this.line = r, this.column = s;
	          }, e.SyntaxError.prototype = Error.prototype, e);
	        })();
	      }).call("undefined" != typeof module ? module.compiled = !0 && module : this);
	    }, {}] }, {}, [1])(1);
	});
	
	//# sourceMappingURL=autolayout.min.map
	/**
	* Parts Copyright (C) 2011-2012, Alex Russell (slightlyoff@chromium.org)
	* Parts Copyright (C) Copyright (C) 1998-2000 Greg J. Badros
	*
	* Use of this source code is governed by the LGPL, which can be found in the
	* COPYING.LGPL file.
	*/

/***/ },
/* 6 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-autolayout.map