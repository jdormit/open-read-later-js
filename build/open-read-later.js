(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["openReadLater"] = factory();
	else
		root["openReadLater"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
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
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || Object.assign || function(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(1);
var createLinkEntry = function (_a) {
    var url = _a.url, title = _a.title, tags = _a.tags;
    return ({ url: url, title: title, tags: tags });
};
var parseColonDelimitedFields = function (fields) {
    return fields.reduce(function (fieldsObj, field) {
        return util_1.pipe(function (f) { return /^(.+):\s?(.+)$/.exec(f); }, function (_a) {
            var key = _a[0], val = _a[1];
            return (__assign((_b = {}, _b[key] = val, _b), fieldsObj));
            var _b;
        })(field);
    }, {});
};
// TODO handle tags parsing
var parseLinkEntry = function (linkEntryText) {
    return util_1.pipe(function (text) { return text.split('\n'); }, parseColonDelimitedFields, function (_a) {
        var url = _a.url, title = _a.title, tags = _a.tags;
        return createLinkEntry({ url: url, title: title, tags: tags });
    })(linkEntryText);
};
var createReadLaterList = function () {
    var linkEntries = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        linkEntries[_i] = arguments[_i];
    }
    return ({ links: linkEntries });
};
exports.createReadLaterList = createReadLaterList;
var parseReadLaterList = function (readLaterText) {
    return util_1.pipe(function (text) { return text.split('---'); }, function (entries) { return entries.map(function (entry) { return entry.trim(); }); }, parseReadLaterListEntries, createReadLaterList)(readLaterText);
};
var parseReadLaterListEntries = function (entryTexts) { return function (entries) {
    if (entryTexts.length === 0) {
        return entries;
    }
    else {
        var first = entryTexts[0], rest = entryTexts.slice(1);
        return parseReadLaterListEntries(rest)(entries.concat([parseLinkEntry(first)]));
    }
}; };


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pipe_1 = __webpack_require__(2);
exports.pipe = pipe_1.default;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pipe = function () {
    var funcs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        funcs[_i] = arguments[_i];
    }
    return function (x) { return funcs.reduce(function (y, f) { return f(y); }, x); };
};
exports.default = pipe;


/***/ })
/******/ ]);
});