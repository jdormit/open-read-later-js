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
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var pipe_1 = __webpack_require__(4);
exports.pipe = pipe_1.default;
var trace_1 = __webpack_require__(5);
exports.trace = trace_1.default;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var validator_1 = __webpack_require__(2);
var linkEntryToString = function (linkEntry) {
    return typeof linkEntry.tags === 'undefined'
        ? "url: " + linkEntry.url + "\ntitle: " + linkEntry.title
        : "url: " + linkEntry.url + "\ntitle: " + linkEntry.title + "\ntags: " + linkEntry.tags.join(', ');
};
var newReadLaterList = function () { return createReadLaterList([]); };
exports.newReadLaterList = newReadLaterList;
var createReadLaterList = function (linkEntries) {
    return ({ links: linkEntries,
        addLink: function (link) {
            var _this = this;
            return util_1.pipe(createLinkEntry, function (linkEntry) { return createReadLaterList(_this.links.concat([linkEntry])); }, validator_1.validateReadLaterList)(link);
        },
        removeLink: function (url) {
            return createReadLaterList(this.links.filter(function (link) { return link.url !== url; }));
        },
        getLink: function (url) {
            return this.links.filter(function (link) { return link.url === url; })[0];
        },
        updateLink: function (url, newLink) {
            var _this = this;
            return util_1.pipe(function (url) { return _this.links.filter(function (link) { return link.url !== url; }); }, function (otherLinks) { return [createLinkEntry(newLink)].concat(otherLinks); }, function (links) { return createReadLaterList(links); }, validator_1.validateReadLaterList)(url);
        },
        toString: function () {
            return this.links.map(linkEntryToString).join('\n---\n');
        }
    });
};
exports.createReadLaterList = createReadLaterList;
var createLinkEntry = function (_a) {
    var url = _a.url, title = _a.title, tags = _a.tags;
    return typeof tags === 'undefined' ? { url: url, title: title } : { url: url, title: title, tags: tags };
};
exports.createLinkEntry = createLinkEntry;


/***/ }),
/* 2 */
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
var util_1 = __webpack_require__(0);
var validateReadLaterList = function (readLaterList) {
    return util_1.pipe(validateUniqueUrls)(readLaterList);
};
exports.validateReadLaterList = validateReadLaterList;
var validateUniqueUrls = function (readLaterList) {
    var urlCounts = readLaterList.links.reduce(function (urlCount, linkEntry) {
        return typeof urlCount[linkEntry.url] === 'undefined' ? __assign({}, urlCount, (_a = {}, _a[linkEntry.url] = 1, _a)) : __assign({}, urlCount, (_b = {}, _b[linkEntry.url] = urlCount[linkEntry.url] + 1, _b));
        var _a, _b;
    }, {});
    var repeatedUrls = Object.keys(urlCounts).filter(function (url) { return urlCounts[url] > 1; });
    if (repeatedUrls.length > 0) {
        throw new Error("List validation failed due to non-unique urls: " + repeatedUrls);
    }
    else {
        return readLaterList;
    }
};


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var readLaterList_1 = __webpack_require__(1);
exports.newReadLaterList = readLaterList_1.newReadLaterList;
var parser_1 = __webpack_require__(6);
exports.parseReadLaterList = parser_1.parseReadLaterList;


/***/ }),
/* 4 */
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


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var trace = function (label) { return function (v) {
    var prettyV = JSON.stringify(v, null, '\t');
    console.log(label + ": " + prettyV);
    return v;
}; };
exports.default = trace;


/***/ }),
/* 6 */
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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var util_1 = __webpack_require__(0);
var readLaterList_1 = __webpack_require__(1);
var validator_1 = __webpack_require__(2);
var parseColonDelimitedFields = function (fields) {
    return fields.reduce(function (fieldsObj, field) {
        return util_1.pipe(function (f) { return /^(.+?):\s?(.+)$/.exec(f); }, function (_a) {
            var _ = _a[0], key = _a[1], val = _a[2];
            return (__assign({}, fieldsObj, (_b = {}, _b[key.trim()] = val.trim(), _b)));
            var _b;
        })(field);
    }, {});
};
var parseLinkEntry = function (linkEntryText) {
    return util_1.pipe(function (text) { return text.split('\n'); }, parseColonDelimitedFields, function (_a) {
        var tags = _a.tags, fields = __rest(_a, ["tags"]);
        return typeof tags === 'undefined' ? fields : __assign({}, fields, { tags: tags.split(',').map(function (tag) { return tag.trim(); }) });
    }, readLaterList_1.createLinkEntry)(linkEntryText);
};
var parseReadLaterList = function (readLaterText) {
    return util_1.pipe(function (text) { return text.split('---'); }, function (entries) { return entries.map(function (entry) { return entry.trim(); }); }, function (entryTexts) { return entryTexts.reduce(function (acc, entryText) { return acc.concat([parseLinkEntry(entryText)]); }, []); }, readLaterList_1.createReadLaterList, validator_1.validateReadLaterList)(readLaterText);
};
exports.parseReadLaterList = parseReadLaterList;


/***/ })
/******/ ]);
});