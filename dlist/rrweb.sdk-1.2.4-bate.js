/* eslint-disable */

/* rrwebsdk-modules : IE Polyfill  */
(function(){
    //if (!window.ActiveXObject) return;
    if (typeof Object.assign != 'function') {
        // Must be writable: true, enumerable: false, configurable: true
        Object.defineProperty(Object, "assign", {
            value: function assign(target, varArgs) { // .length of function is 2
            'use strict';
            if (target == null) { // TypeError if undefined or null
                throw new TypeError('Cannot convert undefined or null to object');
            }
            let to = Object(target);
            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) { // Skip over if undefined or null
                for (let nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                    to[nextKey] = nextSource[nextKey];
                    }
                }
                }
            }
            return to;
            },
            writable: true,
            configurable: true
        });
    }
    if (!Array.from) {
        Array.from = (function () {
            var toStr = Object.prototype.toString;
            var isCallable = function (fn) {
            return typeof fn === 'function' || toStr.call(fn) === '[object Function]';
            };
            var toInteger = function (value) {
            var number = Number(value);
            if (isNaN(number)) { return 0; }
            if (number === 0 || !isFinite(number)) { return number; }
            return (number > 0 ? 1 : -1) * Math.floor(Math.abs(number));
            };
            var maxSafeInteger = Math.pow(2, 53) - 1;
            var toLength = function (value) {
            var len = toInteger(value);
            return Math.min(Math.max(len, 0), maxSafeInteger);
            };

            // The length property of the from method is 1.
            return function from(arrayLike/*, mapFn, thisArg */) {
                // 1. Let C be the this value.
                var C = this;

                // 2. Let items be ToObject(arrayLike).
                var items = Object(arrayLike);

                // 3. ReturnIfAbrupt(items).
                if (arrayLike == null) {
                    throw new TypeError("Array.from requires an array-like object - not null or undefined");
                }

                // 4. If mapfn is undefined, then let mapping be false.
                var mapFn = arguments.length > 1 ? arguments[1] : void undefined;
                var T;
                if (typeof mapFn !== 'undefined') {
                    // 5. else
                    // 5. a If IsCallable(mapfn) is false, throw a TypeError exception.
                    if (!isCallable(mapFn)) {
                    throw new TypeError('Array.from: when provided, the second argument must be a function');
                    }

                    // 5. b. If thisArg was supplied, let T be thisArg; else let T be undefined.
                    if (arguments.length > 2) {
                    T = arguments[2];
                    }
                }

                // 10. Let lenValue be Get(items, "length").
                // 11. Let len be ToLength(lenValue).
                var len = toLength(items.length);

                // 13. If IsConstructor(C) is true, then
                // 13. a. Let A be the result of calling the [[Construct]] internal method 
                // of C with an argument list containing the single item len.
                // 14. a. Else, Let A be ArrayCreate(len).
                var A = isCallable(C) ? Object(new C(len)) : new Array(len);

                // 16. Let k be 0.
                var k = 0;
                // 17. Repeat, while k < len… (also steps a - h)
                var kValue;
                while (k < len) {
                    kValue = items[k];
                    if (mapFn) {
                    A[k] = typeof T === 'undefined' ? mapFn(kValue, k) : mapFn.call(T, kValue, k);
                    } else {
                    A[k] = kValue;
                    }
                    k += 1;
                }
                // 18. Let putStatus be Put(A, "length", len, true).
                A.length = len;
                // 20. Return A.
                return A;
            };
        }());
    }
    if (!Array.prototype.find) {
        Object.defineProperty(Array.prototype, 'find', {
            value: function(predicate) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If IsCallable(predicate) is false, throw a TypeError exception.
            if (typeof predicate !== 'function') {
                throw new TypeError('predicate must be a function');
            }

            // 4. If thisArg was supplied, let T be thisArg; else let T be undefined.
            var thisArg = arguments[1];

            // 5. Let k be 0.
            var k = 0;

            // 6. Repeat, while k < len
            while (k < len) {
                // a. Let Pk be ! ToString(k).
                // b. Let kValue be ? Get(O, Pk).
                // c. Let testResult be ToBoolean(? Call(predicate, T, « kValue, k, O »)).
                // d. If testResult is true, return kValue.
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o)) {
                return kValue;
                }
                // e. Increase k by 1.
                k++;
            }

            // 7. Return undefined.
            return undefined;
            }
        });
    }
    Number.isNaN = Number.isNaN || function(value) {
        return typeof value === "number" && isNaN(value);
    }
    if (!String.prototype.endsWith) {
        String.prototype.endsWith = function(search, this_len) {
            if (this_len === undefined || this_len > this.length) {
                this_len = this.length;
            }
            return this.substring(this_len - search.length, this_len) === search;
        };
    }
})();
/*
 * 补充原生方法
*/



/* rrwebsdk-modules : IOS-Wechat Polyfill  */
(function(){
    var pt; var f = e => typeof window.onshow == 'function' && window.onshow();
    if (/iPhone|iPod|iPad/i.test(navigator.userAgent)){ window.setInterval(e=>{ var nt=Math.floor(new Date().getTime()/1000);
    if (typeof pt == 'number' && nt - pt > 1) f(); pt = nt; }, 1000); }
    if (document.readyState==="complete" || (document.readyState !== "loading" && !document.documentElement.doScroll) ) f();
    else document.addEventListener("DOMContentLoaded", f);
})();
/*
 * iphone机型判定
*/




/* rrwebsdk-modules : core  */
var rrweb=function(e){"use strict";
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */var t,n=function(){return(n=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)};function r(e){var t="function"==typeof Symbol&&Symbol.iterator,n=t&&e[t],r=0;if(n)return n.call(e);if(e&&"number"==typeof e.length)return{next:function(){return e&&r>=e.length&&(e=void 0),{value:e&&e[r++],done:!e}}};throw new TypeError(t?"Object is not iterable.":"Symbol.iterator is not defined.")}function o(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),a=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)a.push(r.value)}catch(e){o={error:e}}finally{try{r&&!r.done&&(n=i.return)&&n.call(i)}finally{if(o)throw o.error}}return a}function i(){for(var e=[],t=0;t<arguments.length;t++)e=e.concat(o(arguments[t]));return e}!function(e){e[e.Document=0]="Document",e[e.DocumentType=1]="DocumentType",e[e.Element=2]="Element",e[e.Text=3]="Text",e[e.CDATA=4]="CDATA",e[e.Comment=5]="Comment"}(t||(t={}));var a=1,s=RegExp("[^a-z1-6-_]");function l(e){try{var t=e.rules||e.cssRules;return t?Array.from(t).map(c).join(""):null}catch(e){return null}}function c(e){return function(e){return"styleSheet"in e}(e)?l(e.styleSheet)||"":e.cssText}var u=/url\((?:(')([^']*)'|(")([^"]*)"|([^)]*))\)/gm,d=/^(?!www\.|(?:http|ftp)s?:\/\/|[A-Za-z]:\\|\/\/).*/,p=/^(data:)([^,]*),(.*)/i;function f(e,t){return(e||"").replace(u,(function(e,n,r,o,i,a){var s,l=r||i||a,c=n||o||"";if(!l)return e;if(!d.test(l))return"url("+c+l+c+")";if(p.test(l))return"url("+c+l+c+")";if("/"===l[0])return"url("+c+(((s=t).indexOf("//")>-1?s.split("/").slice(0,3).join("/"):s.split("/")[0]).split("?")[0]+l)+c+")";var u=t.split("/"),f=l.split("/");u.pop();for(var h=0,m=f;h<m.length;h++){var v=m[h];"."!==v&&(".."===v?u.pop():u.push(v))}return"url("+c+u.join("/")+c+")"}))}function h(e,t){if(!t||""===t.trim())return t;var n=e.createElement("a");return n.href=t,n.href}function m(e,t,n){return"src"===t||"href"===t&&n?h(e,n):"srcset"===t&&n?function(e,t){return""===t.trim()?t:t.split(",").map((function(t){var n=t.trimLeft().trimRight().split(" ");return 2===n.length?h(e,n[0])+" "+n[1]:1===n.length?""+h(e,n[0]):""})).join(", ")}(e,n):"style"===t&&n?f(n,location.href):n}function v(e,n){var r,o=n.doc,i=n.blockClass,a=n.blockSelector,c=n.inlineStylesheet,u=n.maskInputOptions,d=void 0===u?{}:u,p=n.recordCanvas;switch(e.nodeType){case e.DOCUMENT_NODE:return{type:t.Document,childNodes:[]};case e.DOCUMENT_TYPE_NODE:return{type:t.DocumentType,name:e.name,publicId:e.publicId,systemId:e.systemId};case e.ELEMENT_NODE:for(var h=function(e,t,n){if("string"==typeof t){if(e.classList.contains(t))return!0}else e.classList.forEach((function(e){if(t.test(e))return!0}));return!!n&&e.matches(n)}(e,i,a),v=function(e){var t=e.toLowerCase().trim();return s.test(t)?"div":t}(e.tagName),y={},g=0,b=Array.from(e.attributes);g<b.length;g++){var S=b[g],E=S.name,w=S.value;y[E]=m(o,E,w)}if("link"===v&&c){var T,x=Array.from(o.styleSheets).find((function(t){return t.href===e.href}));(T=l(x))&&(delete y.rel,delete y.href,y._cssText=f(T,x.href))}if("style"===v&&e.sheet&&!(e.innerText||e.textContent||"").trim().length)(T=l(e.sheet))&&(y._cssText=f(T,location.href));if("input"===v||"textarea"===v||"select"===v){w=e.value;"radio"!==y.type&&"checkbox"!==y.type&&"submit"!==y.type&&"button"!==y.type&&w?y.value=d[y.type]||d[v]?"*".repeat(w.length):w:e.checked&&(y.checked=e.checked)}if("option"===v){var C=e.parentElement;y.value===C.value&&(y.selected=e.selected)}if("canvas"===v&&p&&(y.rr_dataURL=e.toDataURL()),"audio"!==v&&"video"!==v||(y.rr_mediaState=e.paused?"paused":"played"),e.scrollLeft&&(y.rr_scrollLeft=e.scrollLeft),e.scrollTop&&(y.rr_scrollTop=e.scrollTop),h){var I=e.getBoundingClientRect(),M=I.width,k=I.height;y={class:y.class,rr_width:M+"px",rr_height:k+"px"}}return{type:t.Element,tagName:v,attributes:y,childNodes:[],isSVG:(r=e,"svg"===r.tagName||r instanceof SVGElement||void 0),needBlock:h};case e.TEXT_NODE:var N=e.parentNode&&e.parentNode.tagName,_=e.textContent,O="STYLE"===N||void 0;return O&&_&&(_=f(_,location.href)),"SCRIPT"===N&&(_="SCRIPT_PLACEHOLDER"),{type:t.Text,textContent:_||"",isStyle:O};case e.CDATA_SECTION_NODE:return{type:t.CDATA,textContent:""};case e.COMMENT_NODE:return{type:t.Comment,textContent:e.textContent||""};default:return!1}}function y(e){return void 0===e?"":e.toLowerCase()}function g(e,n){var r,o=n.doc,i=n.map,s=n.blockClass,l=n.blockSelector,c=n.skipChild,u=void 0!==c&&c,d=n.inlineStylesheet,p=void 0===d||d,f=n.maskInputOptions,h=void 0===f?{}:f,m=n.slimDOMOptions,b=n.recordCanvas,S=void 0!==b&&b,E=n.preserveWhiteSpace,w=void 0===E||E,T=v(e,{doc:o,blockClass:s,blockSelector:l,inlineStylesheet:p,maskInputOptions:h,recordCanvas:S});if(!T)return console.warn(e,"not serialized"),null;r="__sn"in e?e.__sn.id:!function(e,n){if(n.comment&&e.type===t.Comment)return!0;if(e.type===t.Element){if(n.script&&("script"===e.tagName||"link"===e.tagName&&"preload"===e.attributes.rel&&"script"===e.attributes.as))return!0;if(n.headFavicon&&("link"===e.tagName&&"shortcut icon"===e.attributes.rel||"meta"===e.tagName&&(y(e.attributes.name).match(/^msapplication-tile(image|color)$/)||"application-name"===y(e.attributes.name)||"icon"===y(e.attributes.rel)||"apple-touch-icon"===y(e.attributes.rel)||"shortcut icon"===y(e.attributes.rel))))return!0;if("meta"===e.tagName){if(n.headMetaDescKeywords&&y(e.attributes.name).match(/^description|keywords$/))return!0;if(n.headMetaSocial&&(y(e.attributes.property).match(/^(og|twitter|fb):/)||y(e.attributes.name).match(/^(og|twitter):/)||"pinterest"===y(e.attributes.name)))return!0;if(n.headMetaRobots&&("robots"===y(e.attributes.name)||"googlebot"===y(e.attributes.name)||"bingbot"===y(e.attributes.name)))return!0;if(n.headMetaHttpEquiv&&void 0!==e.attributes["http-equiv"])return!0;if(n.headMetaAuthorship&&("author"===y(e.attributes.name)||"generator"===y(e.attributes.name)||"framework"===y(e.attributes.name)||"publisher"===y(e.attributes.name)||"progid"===y(e.attributes.name)||y(e.attributes.property).match(/^article:/)||y(e.attributes.property).match(/^product:/)))return!0;if(n.headMetaVerification&&("google-site-verification"===y(e.attributes.name)||"yandex-verification"===y(e.attributes.name)||"csrf-token"===y(e.attributes.name)||"p:domain_verify"===y(e.attributes.name)||"verify-v1"===y(e.attributes.name)||"verification"===y(e.attributes.name)||"shopify-checkout-api-token"===y(e.attributes.name)))return!0}}return!1}(T,m)&&(w||T.type!==t.Text||T.isStyle||T.textContent.replace(/^\s+|\s+$/gm,"").length)?a++:-2;var x=Object.assign(T,{id:r});if(e.__sn=x,-2===r)return null;i[r]=e;var C=!u;if(x.type===t.Element&&(C=C&&!x.needBlock,delete x.needBlock),(x.type===t.Document||x.type===t.Element)&&C){m.headWhitespace&&T.type===t.Element&&"head"===T.tagName&&(w=!1);for(var I=0,M=Array.from(e.childNodes);I<M.length;I++){var k=g(M[I],{doc:o,map:i,blockClass:s,blockSelector:l,skipChild:u,inlineStylesheet:p,maskInputOptions:h,slimDOMOptions:m,recordCanvas:S,preserveWhiteSpace:w});k&&x.childNodes.push(k)}}return x}var b=/\/\*[^*]*\*+([^/*][^*]*\*+)*\//g;function S(e,t){void 0===t&&(t={});var n=1,r=1;function o(e){var t=e.match(/\n/g);t&&(n+=t.length);var o=e.lastIndexOf("\n");r=-1===o?r+e.length:e.length-o}function i(){var e={line:n,column:r};return function(t){return t.position=new a(e),f(),t}}var a=function(e){this.start=e,this.end={line:n,column:r},this.source=t.source};a.prototype.content=e;var s=[];function l(o){var i=new Error(t.source+":"+n+":"+r+": "+o);if(i.reason=o,i.filename=t.source,i.line=n,i.column=r,i.source=e,!t.silent)throw i;s.push(i)}function c(){return p(/^{\s*/)}function u(){return p(/^}/)}function d(){var t,n=[];for(f(),h(n);e.length&&"}"!==e.charAt(0)&&(t=M()||k());)!1!==t&&(n.push(t),h(n));return n}function p(t){var n=t.exec(e);if(n){var r=n[0];return o(r),e=e.slice(r.length),n}}function f(){p(/^\s*/)}function h(e){var t;for(void 0===e&&(e=[]);t=m();)!1!==t&&e.push(t),t=m();return e}function m(){var t=i();if("/"===e.charAt(0)&&"*"===e.charAt(1)){for(var n=2;""!==e.charAt(n)&&("*"!==e.charAt(n)||"/"!==e.charAt(n+1));)++n;if(n+=2,""===e.charAt(n-1))return l("End of comment missing");var a=e.slice(2,n-2);return r+=2,o(a),e=e.slice(n),r+=2,t({type:"comment",comment:a})}}function v(){var e=p(/^([^{]+)/);if(e)return E(e[0]).replace(/\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*\/+/g,"").replace(/"(?:\\"|[^"])*"|'(?:\\'|[^'])*'/g,(function(e){return e.replace(/,/g,"‌")})).split(/\s*(?![^(]*\)),\s*/).map((function(e){return e.replace(/\u200C/g,",")}))}function y(){var e=i(),t=p(/^(\*?[-#\/\*\\\w]+(\[[0-9a-z_-]+\])?)\s*/);if(t){var n=E(t[0]);if(!p(/^:\s*/))return l("property missing ':'");var r=p(/^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^\)]*?\)|[^};])+)/),o=e({type:"declaration",property:n.replace(b,""),value:r?E(r[0]).replace(b,""):""});return p(/^[;\s]*/),o}}function g(){var e,t=[];if(!c())return l("missing '{'");for(h(t);e=y();)!1!==e&&(t.push(e),h(t)),e=y();return u()?t:l("missing '}'")}function S(){for(var e,t=[],n=i();e=p(/^((\d+\.\d+|\.\d+|\d+)%?|[a-z]+)\s*/);)t.push(e[1]),p(/^,\s*/);if(t.length)return n({type:"keyframe",values:t,declarations:g()})}var w,T=I("import"),x=I("charset"),C=I("namespace");function I(e){var t=new RegExp("^@"+e+"\\s*([^;]+);");return function(){var n=i(),r=p(t);if(r){var o={type:e};return o[e]=r[1].trim(),n(o)}}}function M(){if("@"===e[0])return function(){var e=i(),t=p(/^@([-\w]+)?keyframes\s*/);if(t){var n=t[1];if(!(t=p(/^([-\w]+)\s*/)))return l("@keyframes missing name");var r,o=t[1];if(!c())return l("@keyframes missing '{'");for(var a=h();r=S();)a.push(r),a=a.concat(h());return u()?e({type:"keyframes",name:o,vendor:n,keyframes:a}):l("@keyframes missing '}'")}}()||function(){var e=i(),t=p(/^@media *([^{]+)/);if(t){var n=E(t[1]);if(!c())return l("@media missing '{'");var r=h().concat(d());return u()?e({type:"media",media:n,rules:r}):l("@media missing '}'")}}()||function(){var e=i(),t=p(/^@custom-media\s+(--[^\s]+)\s*([^{;]+);/);if(t)return e({type:"custom-media",name:E(t[1]),media:E(t[2])})}()||function(){var e=i(),t=p(/^@supports *([^{]+)/);if(t){var n=E(t[1]);if(!c())return l("@supports missing '{'");var r=h().concat(d());return u()?e({type:"supports",supports:n,rules:r}):l("@supports missing '}'")}}()||T()||x()||C()||function(){var e=i(),t=p(/^@([-\w]+)?document *([^{]+)/);if(t){var n=E(t[1]),r=E(t[2]);if(!c())return l("@document missing '{'");var o=h().concat(d());return u()?e({type:"document",document:r,vendor:n,rules:o}):l("@document missing '}'")}}()||function(){var e=i();if(p(/^@page */)){var t=v()||[];if(!c())return l("@page missing '{'");for(var n,r=h();n=y();)r.push(n),r=r.concat(h());return u()?e({type:"page",selectors:t,declarations:r}):l("@page missing '}'")}}()||function(){var e=i();if(p(/^@host\s*/)){if(!c())return l("@host missing '{'");var t=h().concat(d());return u()?e({type:"host",rules:t}):l("@host missing '}'")}}()||function(){var e=i();if(p(/^@font-face\s*/)){if(!c())return l("@font-face missing '{'");for(var t,n=h();t=y();)n.push(t),n=n.concat(h());return u()?e({type:"font-face",declarations:n}):l("@font-face missing '}'")}}()}function k(){var e=i(),t=v();return t?(h(),e({type:"rule",selectors:t,declarations:g()})):l("selector missing")}return function e(t,n){for(var r=t&&"string"==typeof t.type,o=r?t:n,i=0,a=Object.keys(t);i<a.length;i++){var s=a[i],l=t[s];Array.isArray(l)?l.forEach((function(t){e(t,o)})):l&&"object"==typeof l&&e(l,o)}r&&Object.defineProperty(t,"parent",{configurable:!0,writable:!0,enumerable:!1,value:n||null});return t}((w=d(),{type:"stylesheet",stylesheet:{source:t.source,rules:w,parsingErrors:s}}))}function E(e){return e?e.replace(/^\s+|\s+$/g,""):""}var w={script:"noscript",altglyph:"altGlyph",altglyphdef:"altGlyphDef",altglyphitem:"altGlyphItem",animatecolor:"animateColor",animatemotion:"animateMotion",animatetransform:"animateTransform",clippath:"clipPath",feblend:"feBlend",fecolormatrix:"feColorMatrix",fecomponenttransfer:"feComponentTransfer",fecomposite:"feComposite",feconvolvematrix:"feConvolveMatrix",fediffuselighting:"feDiffuseLighting",fedisplacementmap:"feDisplacementMap",fedistantlight:"feDistantLight",fedropshadow:"feDropShadow",feflood:"feFlood",fefunca:"feFuncA",fefuncb:"feFuncB",fefuncg:"feFuncG",fefuncr:"feFuncR",fegaussianblur:"feGaussianBlur",feimage:"feImage",femerge:"feMerge",femergenode:"feMergeNode",femorphology:"feMorphology",feoffset:"feOffset",fepointlight:"fePointLight",fespecularlighting:"feSpecularLighting",fespotlight:"feSpotLight",fetile:"feTile",feturbulence:"feTurbulence",foreignobject:"foreignObject",glyphref:"glyphRef",lineargradient:"linearGradient",radialgradient:"radialGradient"};var T,x,C,I,M,k=/([^\\]):hover/g;function N(e){var t=S(e,{silent:!0});return t.stylesheet?(t.stylesheet.rules.forEach((function(t){"selectors"in t&&(t.selectors||[]).forEach((function(t){if(k.test(t)){var n=t.replace(k,"$1.\\:hover");e=e.replace(t,t+", "+n)}}))})),e):e}function _(e,n){var r=n.doc,o=n.hackCss;switch(e.type){case t.Document:return r.implementation.createDocument(null,"",null);case t.DocumentType:return r.implementation.createDocumentType(e.name||"html",e.publicId,e.systemId);case t.Element:var i,a=function(e){var t=w[e.tagName]?w[e.tagName]:e.tagName;return"link"===t&&e.attributes._cssText&&(t="style"),t}(e);i=e.isSVG?r.createElementNS("http://www.w3.org/2000/svg",a):r.createElement(a);var s=function(t){if(!e.attributes.hasOwnProperty(t))return"continue";var n=e.attributes[t];if(n="boolean"==typeof n||"number"==typeof n?"":n,t.startsWith("rr_")){if("canvas"===a&&"rr_dataURL"===t){var s=document.createElement("img");s.src=n,s.onload=function(){var e=i.getContext("2d");e&&e.drawImage(s,0,0,s.width,s.height)}}if("rr_width"===t&&(i.style.width=n),"rr_height"===t&&(i.style.height=n),"rr_mediaState"===t)switch(n){case"played":i.play();case"paused":i.pause()}}else{var l="textarea"===a&&"value"===t,c="style"===a&&"_cssText"===t;if(c&&o&&(n=N(n)),l||c){for(var u=r.createTextNode(n),d=0,p=Array.from(i.childNodes);d<p.length;d++){var f=p[d];f.nodeType===i.TEXT_NODE&&i.removeChild(f)}return i.appendChild(u),"continue"}if("iframe"===a&&"src"===t)return"continue";try{e.isSVG&&"xlink:href"===t?i.setAttributeNS("http://www.w3.org/1999/xlink",t,n):"onload"===t||"onclick"===t||"onmouse"===t.substring(0,7)?i.setAttribute("_"+t,n):i.setAttribute(t,n)}catch(e){}}};for(var l in e.attributes)s(l);return i;case t.Text:return r.createTextNode(e.isStyle&&o?N(e.textContent):e.textContent);case t.CDATA:return r.createCDATASection(e.textContent);case t.Comment:return r.createComment(e.textContent);default:return null}}function O(e,n){var r=n.doc,o=n.map,i=n.skipChild,a=void 0!==i&&i,s=n.hackCss,l=void 0===s||s,c=_(e,{doc:r,hackCss:l});if(!c)return null;if(e.type===t.Document&&(r.close(),r.open(),c=r),c.__sn=e,o[e.id]=c,(e.type===t.Document||e.type===t.Element)&&!a)for(var u=0,d=e.childNodes;u<d.length;u++){var p=d[u],f=O(p,{doc:r,map:o,skipChild:!1,hackCss:l});f?c.appendChild(f):console.warn("Failed to rebuild",p)}return c}function D(e,n){var r=n.doc,o=n.onVisit,i=n.hackCss,a={},s=O(e,{doc:r,map:a,skipChild:!1,hackCss:void 0===i||i});return function(e,t){for(var n in e)e[n]&&(r=e[n],t(r));var r}(a,(function(e){o&&o(e),function(e){var n=e.__sn;if(n.type===t.Element){var r=e;for(var o in n.attributes)if(n.attributes.hasOwnProperty(o)&&o.startsWith("rr_")){var i=n.attributes[o];"rr_scrollLeft"===o&&(r.scrollLeft=i),"rr_scrollTop"===o&&(r.scrollTop=i)}}}(e)})),[s,a]}function R(e,t,n){void 0===n&&(n=document);var r={capture:!0,passive:!0};return n.addEventListener(e,t,r),function(){return n.removeEventListener(e,t,r)}}(T=e.EventType||(e.EventType={}))[T.DomContentLoaded=0]="DomContentLoaded",T[T.Load=1]="Load",T[T.FullSnapshot=2]="FullSnapshot",T[T.IncrementalSnapshot=3]="IncrementalSnapshot",T[T.Meta=4]="Meta",T[T.Custom=5]="Custom",(x=e.IncrementalSource||(e.IncrementalSource={}))[x.Mutation=0]="Mutation",x[x.MouseMove=1]="MouseMove",x[x.MouseInteraction=2]="MouseInteraction",x[x.Scroll=3]="Scroll",x[x.ViewportResize=4]="ViewportResize",x[x.Input=5]="Input",x[x.TouchMove=6]="TouchMove",x[x.MediaInteraction=7]="MediaInteraction",x[x.StyleSheetRule=8]="StyleSheetRule",x[x.CanvasMutation=9]="CanvasMutation",x[x.Font=10]="Font",(C=e.MouseInteractions||(e.MouseInteractions={}))[C.MouseUp=0]="MouseUp",C[C.MouseDown=1]="MouseDown",C[C.Click=2]="Click",C[C.ContextMenu=3]="ContextMenu",C[C.DblClick=4]="DblClick",C[C.Focus=5]="Focus",C[C.Blur=6]="Blur",C[C.TouchStart=7]="TouchStart",C[C.TouchMove_Departed=8]="TouchMove_Departed",C[C.TouchEnd=9]="TouchEnd",function(e){e[e.Play=0]="Play",e[e.Pause=1]="Pause"}(I||(I={})),(M=e.ReplayerEvents||(e.ReplayerEvents={})).Start="start",M.Pause="pause",M.Resume="resume",M.Resize="resize",M.Finish="finish",M.FullsnapshotRebuilded="fullsnapshot-rebuilded",M.LoadStylesheetStart="load-stylesheet-start",M.LoadStylesheetEnd="load-stylesheet-end",M.SkipStart="skip-start",M.SkipEnd="skip-end",M.MouseInteraction="mouse-interaction",M.EventCast="event-cast",M.CustomEvent="custom-event",M.Flush="flush",M.StateChange="state-change";var A={map:{},getId:function(e){return e.__sn?e.__sn.id:-1},getNode:function(e){return A.map[e]||null},removeNodeFromMap:function(e){var t=e.__sn&&e.__sn.id;delete A.map[t],e.childNodes&&e.childNodes.forEach((function(e){return A.removeNodeFromMap(e)}))},has:function(e){return A.map.hasOwnProperty(e)}};function L(e,t,n){void 0===n&&(n={});var r=null,o=0;return function(i){var a=Date.now();o||!1!==n.leading||(o=a);var s=t-(a-o),l=this,c=arguments;s<=0||s>t?(r&&(window.clearTimeout(r),r=null),o=a,e.apply(l,c)):r||!1===n.trailing||(r=window.setTimeout((function(){o=!1===n.leading?0:Date.now(),r=null,e.apply(l,c)}),s))}}function F(e,t,n,r,o){void 0===o&&(o=window);var i=o.Object.getOwnPropertyDescriptor(e,t);return o.Object.defineProperty(e,t,r?n:{set:function(e){var t=this;setTimeout((function(){n.set.call(t,e)}),0),i&&i.set&&i.set.call(this,e)}}),function(){return F(e,t,i||{},!0)}}function P(e,t,n){try{if(!(t in e))return function(){};var r=e[t],o=n(r);return"function"==typeof o&&(o.prototype=o.prototype||{},Object.defineProperties(o,{__rrweb_original__:{enumerable:!1,value:r}})),e[t]=o,function(){e[t]=r}}catch(e){return function(){}}}function z(){return window.innerHeight||document.documentElement&&document.documentElement.clientHeight||document.body&&document.body.clientHeight}function j(){return window.innerWidth||document.documentElement&&document.documentElement.clientWidth||document.body&&document.body.clientWidth}function V(e,t){if(!e)return!1;if(e.nodeType===e.ELEMENT_NODE){var n=!1;return"string"==typeof t?n=e.classList.contains(t):e.classList.forEach((function(e){t.test(e)&&(n=!0)})),n||V(e.parentNode,t)}return e.nodeType,e.TEXT_NODE,V(e.parentNode,t)}function B(e){return"__sn"in e&&-2===e.__sn.id}function W(e){var t=A.getId(e);return!A.has(t)||(!e.parentNode||e.parentNode.nodeType!==e.DOCUMENT_NODE)&&(!e.parentNode||W(e.parentNode))}function U(e){return Boolean(e.changedTouches)}function H(e){void 0===e&&(e=window),"NodeList"in e&&!e.NodeList.prototype.forEach&&(e.NodeList.prototype.forEach=Array.prototype.forEach),"DOMTokenList"in e&&!e.DOMTokenList.prototype.forEach&&(e.DOMTokenList.prototype.forEach=Array.prototype.forEach)}function X(t){switch(t.type){case e.EventType.DomContentLoaded:case e.EventType.Load:case e.EventType.Custom:return!1;case e.EventType.FullSnapshot:case e.EventType.Meta:return!0}switch(t.data.source){case e.IncrementalSource.MouseMove:case e.IncrementalSource.MouseInteraction:case e.IncrementalSource.TouchMove:case e.IncrementalSource.MediaInteraction:return!1;case e.IncrementalSource.ViewportResize:case e.IncrementalSource.StyleSheetRule:case e.IncrementalSource.Scroll:case e.IncrementalSource.Input:return!0}return!0}var Y=function(){function t(){this.reset()}return t.prototype.add=function(e){var t=this.indexes.get(e.parentId),n={id:e.node.id,mutation:e,children:[],texts:[],attributes:[]};t?(n.parent=t,t.children[n.id]=n):this.tree[n.id]=n,this.indexes.set(n.id,n)},t.prototype.remove=function(e){var t=this,n=this.indexes.get(e.parentId),r=this.indexes.get(e.id),o=function(e){t.removeIdSet.add(e);var n=A.getNode(e);null==n||n.childNodes.forEach((function(e){"__sn"in e&&o(e.__sn.id)}))},i=function(n){t.removeIdSet.add(n.id),Object.values(n.children).forEach((function(e){return i(e)}));var r=t.indexes.get(n.id);if(r){var o=r.parent;o&&(delete r.parent,delete o.children[r.id],t.indexes.delete(e.id))}};r?n?(delete r.parent,delete n.children[r.id],this.indexes.delete(e.id),i(r)):(delete this.tree[r.id],this.indexes.delete(r.id),i(r)):(this.removeNodeMutations.push(e),o(e.id))},t.prototype.text=function(e){var t=this.indexes.get(e.id);t?t.texts.push(e):this.textMutations.push(e)},t.prototype.attribute=function(e){var t=this.indexes.get(e.id);t?t.attributes.push(e):this.attributeMutations.push(e)},t.prototype.scroll=function(e){this.scrollMap.set(e.id,e)},t.prototype.input=function(e){this.inputMap.set(e.id,e)},t.prototype.flush=function(){var t,n,o,i,a=this,s=this.tree,l=this.removeNodeMutations,c=this.textMutations,u=this.attributeMutations,d={source:e.IncrementalSource.Mutation,removes:l,texts:c,attributes:u,adds:[]},p=function(e,t){t&&a.removeIdSet.add(e.id),d.texts=d.texts.concat(t?[]:e.texts).filter((function(e){return!a.removeIdSet.has(e.id)})),d.attributes=d.attributes.concat(t?[]:e.attributes).filter((function(e){return!a.removeIdSet.has(e.id)})),a.removeIdSet.has(e.id)||a.removeIdSet.has(e.mutation.parentId)||t?Object.values(e.children).forEach((function(e){return p(e,!0)})):(d.adds.push(e.mutation),e.children&&Object.values(e.children).forEach((function(e){return p(e,!1)})))};Object.values(s).forEach((function(e){return p(e,!1)}));try{for(var f=r(this.scrollMap.keys()),h=f.next();!h.done;h=f.next()){var m=h.value;this.removeIdSet.has(m)&&this.scrollMap.delete(m)}}catch(e){t={error:e}}finally{try{h&&!h.done&&(n=f.return)&&n.call(f)}finally{if(t)throw t.error}}try{for(var v=r(this.inputMap.keys()),y=v.next();!y.done;y=v.next()){m=y.value;this.removeIdSet.has(m)&&this.inputMap.delete(m)}}catch(e){o={error:e}}finally{try{y&&!y.done&&(i=v.return)&&i.call(v)}finally{if(o)throw o.error}}var g=new Map(this.scrollMap),b=new Map(this.inputMap);return this.reset(),{mutationData:d,scrollMap:g,inputMap:b}},t.prototype.reset=function(){this.tree=[],this.indexes=new Map,this.removeNodeMutations=[],this.textMutations=[],this.attributeMutations=[],this.removeIdSet=new Set,this.scrollMap=new Map,this.inputMap=new Map},t}();function q(e){var t,n,o={},i=function(e,t){var n={value:e,parent:t,children:[]};return o[e.node.id]=n,n},a=[];try{for(var s=r(e),l=s.next();!l.done;l=s.next()){var c=l.value,u=c.nextId,d=c.parentId;if(u&&u in o){var p=o[u];if(p.parent){var f=p.parent.children.indexOf(p);p.parent.children.splice(f,0,i(c,p.parent))}else{f=a.indexOf(p);a.splice(f,0,i(c,null))}}else if(d in o){var h=o[d];h.children.push(i(c,h))}else a.push(i(c,null))}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=s.return)&&n.call(s)}finally{if(t)throw t.error}}return a}function G(e,t){t(e.value);for(var n=e.children.length-1;n>=0;n--)G(e.children[n],t)}var K=Object.freeze({__proto__:null,on:R,mirror:A,throttle:L,hookSetter:F,patch:P,getWindowHeight:z,getWindowWidth:j,isBlocked:V,isIgnored:B,isAncestorRemoved:W,isTouchEvent:U,polyfill:H,needCastInSyncMode:X,TreeIndex:Y,queueToResolveTrees:q,iterateResolveTree:G});function $(e){return"__ln"in e}var J=function(){function e(){this.length=0,this.head=null}return e.prototype.get=function(e){if(e>=this.length)throw new Error("Position outside of list range");for(var t=this.head,n=0;n<e;n++)t=(null==t?void 0:t.next)||null;return t},e.prototype.addNode=function(e){var t={value:e,previous:null,next:null};if(e.__ln=t,e.previousSibling&&$(e.previousSibling)){var n=e.previousSibling.__ln.next;t.next=n,t.previous=e.previousSibling.__ln,e.previousSibling.__ln.next=t,n&&(n.previous=t)}else if(e.nextSibling&&$(e.nextSibling)){n=e.nextSibling.__ln.previous;t.previous=n,t.next=e.nextSibling.__ln,e.nextSibling.__ln.previous=t,n&&(n.next=t)}else this.head&&(this.head.previous=t),t.next=this.head,this.head=t;this.length++},e.prototype.removeNode=function(e){var t=e.__ln;this.head&&(t.previous?(t.previous.next=t.next,t.next&&(t.next.previous=t.previous)):(this.head=t.next,this.head&&(this.head.previous=null)),e.__ln&&delete e.__ln,this.length--)},e}(),Z=function(e,t){return e+"@"+t};function Q(e){return"__sn"in e}function ee(e,t){e.delete(t),t.childNodes.forEach((function(t){return ee(e,t)}))}function te(e,t){var n=t.parentNode;if(!n)return!1;var r=A.getId(n);return!!e.some((function(e){return e.id===r}))||te(e,n)}function ne(e,t){var n=t.parentNode;return!!n&&(!!e.has(n)||ne(e,n))}var re=new(function(){function e(){var e=this;this.frozen=!1,this.texts=[],this.attributes=[],this.removes=[],this.mapRemoves=[],this.movedMap={},this.addedSet=new Set,this.movedSet=new Set,this.droppedSet=new Set,this.processMutations=function(t){t.forEach(e.processMutation),e.frozen||e.emit()},this.emit=function(){for(var t,n,o,i,a=[],s=new J,l=function(t){for(var n=t,r=-2;-2===r;)r=(n=n&&n.nextSibling)&&A.getId(n);return-1===r&&V(t.nextSibling,e.blockClass)&&(r=null),r},c=function(t){if(t.parentNode){var n=A.getId(t.parentNode),r=l(t);if(-1===n||-1===r)return s.addNode(t);var o=g(t,{doc:document,map:A.map,blockClass:e.blockClass,blockSelector:e.blockSelector,skipChild:!0,inlineStylesheet:e.inlineStylesheet,maskInputOptions:e.maskInputOptions,slimDOMOptions:e.slimDOMOptions,recordCanvas:e.recordCanvas});o&&a.push({parentId:n,nextId:r,node:o})}};e.mapRemoves.length;)A.removeNodeFromMap(e.mapRemoves.shift());try{for(var u=r(e.movedSet),d=u.next();!d.done;d=u.next()){var p=d.value;te(e.removes,p)&&!e.movedSet.has(p.parentNode)||c(p)}}catch(e){t={error:e}}finally{try{d&&!d.done&&(n=u.return)&&n.call(u)}finally{if(t)throw t.error}}try{for(var f=r(e.addedSet),h=f.next();!h.done;h=f.next()){p=h.value;ne(e.droppedSet,p)||te(e.removes,p)?ne(e.movedSet,p)?c(p):e.droppedSet.add(p):c(p)}}catch(e){o={error:e}}finally{try{h&&!h.done&&(i=f.return)&&i.call(f)}finally{if(o)throw o.error}}for(var m=null;s.length;){var v=null;if(m){var y=A.getId(m.value.parentNode),b=l(m.value);-1!==y&&-1!==b&&(v=m)}if(!v)for(var S=s.length-1;S>=0;S--){var E=s.get(S);y=A.getId(E.value.parentNode),b=l(E.value);if(-1!==y&&-1!==b){v=E;break}}if(!v)break;m=v.previous,s.removeNode(v.value),c(v.value)}var w={texts:e.texts.map((function(e){return{id:A.getId(e.node),value:e.value}})).filter((function(e){return A.has(e.id)})),attributes:e.attributes.map((function(e){return{id:A.getId(e.node),attributes:e.attributes}})).filter((function(e){return A.has(e.id)})),removes:e.removes,adds:a};(w.texts.length||w.attributes.length||w.removes.length||w.adds.length)&&(e.texts=[],e.attributes=[],e.removes=[],e.addedSet=new Set,e.movedSet=new Set,e.droppedSet=new Set,e.movedMap={},e.emissionCallback(w))},this.processMutation=function(t){if(!B(t.target))switch(t.type){case"characterData":var n=t.target.textContent;V(t.target,e.blockClass)||n===t.oldValue||e.texts.push({value:n,node:t.target});break;case"attributes":n=t.target.getAttribute(t.attributeName);if(V(t.target,e.blockClass)||n===t.oldValue)return;var r=e.attributes.find((function(e){return e.node===t.target}));r||(r={node:t.target,attributes:{}},e.attributes.push(r)),r.attributes[t.attributeName]=m(document,t.attributeName,n);break;case"childList":t.addedNodes.forEach((function(n){return e.genAdds(n,t.target)})),t.removedNodes.forEach((function(n){var r=A.getId(n),o=A.getId(t.target);V(n,e.blockClass)||V(t.target,e.blockClass)||B(n)||(e.addedSet.has(n)?(ee(e.addedSet,n),e.droppedSet.add(n)):e.addedSet.has(t.target)&&-1===r||W(t.target)||(e.movedSet.has(n)&&e.movedMap[Z(r,o)]?ee(e.movedSet,n):e.removes.push({parentId:o,id:r})),e.mapRemoves.push(n))}))}},this.genAdds=function(t,n){if(!V(t,e.blockClass)){if(Q(t)){if(B(t))return;e.movedSet.add(t);var r=null;n&&Q(n)&&(r=n.__sn.id),r&&(e.movedMap[Z(t.__sn.id,r)]=!0)}else e.addedSet.add(t),e.droppedSet.delete(t);t.childNodes.forEach((function(t){return e.genAdds(t)}))}}}return e.prototype.init=function(e,t,n,r,o,i,a){this.blockClass=t,this.blockSelector=n,this.inlineStylesheet=r,this.maskInputOptions=o,this.recordCanvas=i,this.slimDOMOptions=a,this.emissionCallback=e},e.prototype.freeze=function(){this.frozen=!0},e.prototype.unfreeze=function(){this.frozen=!1},e.prototype.isFrozen=function(){return this.frozen},e}());function oe(t,n,r){if(!1===r.mouseInteraction)return function(){};var o=!0===r.mouseInteraction||void 0===r.mouseInteraction?{}:r.mouseInteraction,i=[];return Object.keys(e.MouseInteractions).filter((function(e){return Number.isNaN(Number(e))&&!e.endsWith("_Departed")&&!1!==o[e]})).forEach((function(r){var o=r.toLowerCase(),a=function(r){return function(o){if(!V(o.target,n)){var i=A.getId(o.target),a=U(o)?o.changedTouches[0]:o,s=a.clientX,l=a.clientY;t({type:e.MouseInteractions[r],id:i,x:s,y:l})}}}(r);i.push(R(o,a))})),function(){i.forEach((function(e){return e()}))}}var ie,ae=["INPUT","TEXTAREA","SELECT"],se=new WeakMap;function le(t,o){void 0===o&&(o={}),function(e,t){var n=e.mutationCb,r=e.mousemoveCb,o=e.mouseInteractionCb,a=e.scrollCb,s=e.viewportResizeCb,l=e.inputCb,c=e.mediaInteractionCb,u=e.styleSheetRuleCb,d=e.canvasMutationCb,p=e.fontCb;e.mutationCb=function(){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];t.mutation&&t.mutation.apply(t,i(e)),n.apply(void 0,i(e))},e.mousemoveCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.mousemove&&t.mousemove.apply(t,i(e)),r.apply(void 0,i(e))},e.mouseInteractionCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.mouseInteraction&&t.mouseInteraction.apply(t,i(e)),o.apply(void 0,i(e))},e.scrollCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.scroll&&t.scroll.apply(t,i(e)),a.apply(void 0,i(e))},e.viewportResizeCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.viewportResize&&t.viewportResize.apply(t,i(e)),s.apply(void 0,i(e))},e.inputCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.input&&t.input.apply(t,i(e)),l.apply(void 0,i(e))},e.mediaInteractionCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.mediaInteaction&&t.mediaInteaction.apply(t,i(e)),c.apply(void 0,i(e))},e.styleSheetRuleCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.styleSheetRule&&t.styleSheetRule.apply(t,i(e)),u.apply(void 0,i(e))},e.canvasMutationCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.canvasMutation&&t.canvasMutation.apply(t,i(e)),d.apply(void 0,i(e))},e.fontCb=function(){for(var e=[],n=0;n<arguments.length;n++)e[n]=arguments[n];t.font&&t.font.apply(t,i(e)),p.apply(void 0,i(e))}}(t,o);var a,s,l=function(e,t,n,r,o,i,a){re.init(e,t,n,r,o,i,a);var s=new MutationObserver(re.processMutations.bind(re));return s.observe(document,{attributes:!0,attributeOldValue:!0,characterData:!0,characterDataOldValue:!0,childList:!0,subtree:!0}),s}(t.mutationCb,t.blockClass,t.blockSelector,t.inlineStylesheet,t.maskInputOptions,t.recordCanvas,t.slimDOMOptions),c=function(t,n){if(!1===n.mousemove)return function(){};var r,o="number"==typeof n.mousemove?n.mousemove:50,i=[],a=L((function(n){var o=Date.now()-r;t(i.map((function(e){return e.timeOffset-=o,e})),n?e.IncrementalSource.TouchMove:e.IncrementalSource.MouseMove),i=[],r=null}),500),s=L((function(e){var t=e.target,n=U(e)?e.changedTouches[0]:e,o=n.clientX,s=n.clientY;r||(r=Date.now()),i.push({x:o,y:s,id:A.getId(t),timeOffset:Date.now()-r}),a(U(e))}),o,{trailing:!1}),l=[R("mousemove",s),R("touchmove",s)];return function(){l.forEach((function(e){return e()}))}}(t.mousemoveCb,t.sampling),u=oe(t.mouseInteractionCb,t.blockClass,t.sampling),d=(a=t.scrollCb,s=t.blockClass,R("scroll",L((function(e){if(e.target&&!V(e.target,s)){var t=A.getId(e.target);if(e.target===document){var n=document.scrollingElement||document.documentElement;a({id:t,x:n.scrollLeft,y:n.scrollTop})}else a({id:t,x:e.target.scrollLeft,y:e.target.scrollTop})}}),t.sampling.scroll||100))),p=function(e){return R("resize",L((function(){var t=z(),n=j();e({width:Number(n),height:Number(t)})}),200),window)}(t.viewportResizeCb),f=function(e,t,r,o,a,s){function l(e){var n=e.target;if(n&&n.tagName&&!(ae.indexOf(n.tagName)<0)&&!V(n,t)){var i=n.type;if("password"!==i&&!n.classList.contains(r)){var s=n.value,l=!1;"radio"===i||"checkbox"===i?l=n.checked:(o[n.tagName.toLowerCase()]||o[i])&&(s=a?a(s):"*".repeat(s.length)),c(n,{text:s,isChecked:l});var u=n.name;"radio"===i&&u&&l&&document.querySelectorAll('input[type="radio"][name="'+u+'"]').forEach((function(e){e!==n&&c(e,{text:e.value,isChecked:!l})}))}}}function c(t,r){var o=se.get(t);if(!o||o.text!==r.text||o.isChecked!==r.isChecked){se.set(t,r);var i=A.getId(t);e(n(n({},r),{id:i}))}}var u=("last"===s.input?["change"]:["input","change"]).map((function(e){return R(e,l)})),d=Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,"value"),p=[[HTMLInputElement.prototype,"value"],[HTMLInputElement.prototype,"checked"],[HTMLSelectElement.prototype,"value"],[HTMLTextAreaElement.prototype,"value"],[HTMLSelectElement.prototype,"selectedIndex"]];return d&&d.set&&u.push.apply(u,i(p.map((function(e){return F(e[0],e[1],{set:function(){l({target:this})}})})))),function(){u.forEach((function(e){return e()}))}}(t.inputCb,t.blockClass,t.ignoreClass,t.maskInputOptions,t.maskInputFn,t.sampling),h=function(e,t){var n=function(n){return function(r){var o=r.target;o&&!V(o,t)&&e({type:"play"===n?I.Play:I.Pause,id:A.getId(o)})}},r=[R("play",n("play")),R("pause",n("pause"))];return function(){r.forEach((function(e){return e()}))}}(t.mediaInteractionCb,t.blockClass),m=function(e){var t=CSSStyleSheet.prototype.insertRule;CSSStyleSheet.prototype.insertRule=function(n,r){var o=A.getId(this.ownerNode);return-1!==o&&e({id:o,adds:[{rule:n,index:r}]}),t.apply(this,arguments)};var n=CSSStyleSheet.prototype.deleteRule;return CSSStyleSheet.prototype.deleteRule=function(t){var r=A.getId(this.ownerNode);return-1!==r&&e({id:r,removes:[{index:t}]}),n.apply(this,arguments)},function(){CSSStyleSheet.prototype.insertRule=t,CSSStyleSheet.prototype.deleteRule=n}}(t.styleSheetRuleCb),v=t.recordCanvas?function(e,t){var n,o,a=Object.getOwnPropertyNames(CanvasRenderingContext2D.prototype),s=[],l=function(n){try{if("function"!=typeof CanvasRenderingContext2D.prototype[n])return"continue";var r=P(CanvasRenderingContext2D.prototype,n,(function(r){return function(){for(var o=this,a=[],s=0;s<arguments.length;s++)a[s]=arguments[s];return V(this.canvas,t)||setTimeout((function(){var t=i(a);"drawImage"===n&&t[0]&&t[0]instanceof HTMLCanvasElement&&(t[0]=t[0].toDataURL()),e({id:A.getId(o.canvas),property:n,args:t})}),0),r.apply(this,a)}}));s.push(r)}catch(t){var o=F(CanvasRenderingContext2D.prototype,n,{set:function(t){e({id:A.getId(this.canvas),property:n,args:[t],setter:!0})}});s.push(o)}};try{for(var c=r(a),u=c.next();!u.done;u=c.next()){l(u.value)}}catch(e){n={error:e}}finally{try{u&&!u.done&&(o=c.return)&&o.call(c)}finally{if(n)throw n.error}}return function(){s.forEach((function(e){return e()}))}}(t.canvasMutationCb,t.blockClass):function(){},y=t.collectFonts?function(e){var t=[],n=new WeakMap,r=FontFace;window.FontFace=function(e,t,o){var i=new r(e,t,o);return n.set(i,{family:e,buffer:"string"!=typeof t,descriptors:o,fontSource:"string"==typeof t?t:JSON.stringify(Array.from(new Uint8Array(t)))}),i};var o=P(document.fonts,"add",(function(t){return function(r){return setTimeout((function(){var t=n.get(r);t&&(e(t),n.delete(r))}),0),t.apply(this,[r])}}));return t.push((function(){window.FonFace=r})),t.push(o),function(){t.forEach((function(e){return e()}))}}(t.fontCb):function(){};return function(){l.disconnect(),c(),u(),d(),p(),f(),h(),m(),v(),y()}}function ce(e){return n(n({},e),{timestamp:Date.now()})}function ue(t){void 0===t&&(t={});var r=t.emit,i=t.checkoutEveryNms,a=t.checkoutEveryNth,s=t.blockClass,l=void 0===s?"rr-block":s,c=t.blockSelector,u=void 0===c?null:c,d=t.ignoreClass,p=void 0===d?"rr-ignore":d,f=t.inlineStylesheet,h=void 0===f||f,m=t.maskAllInputs,v=t.maskInputOptions,y=t.slimDOMOptions,b=t.maskInputFn,S=t.hooks,E=t.packFn,w=t.sampling,T=void 0===w?{}:w,x=t.mousemoveWait,C=t.recordCanvas,I=void 0!==C&&C,M=t.collectFonts,k=void 0!==M&&M;if(!r)throw new Error("emit function is required");void 0!==x&&void 0===T.mousemove&&(T.mousemove=x);var N,_=!0===m?{color:!0,date:!0,"datetime-local":!0,email:!0,month:!0,number:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0,textarea:!0,select:!0}:void 0!==v?v:{},O=!0===y||"all"===y?{script:!0,comment:!0,headFavicon:!0,headWhitespace:!0,headMetaSocial:!0,headMetaRobots:!0,headMetaHttpEquiv:!0,headMetaVerification:!0,headMetaAuthorship:"all"===y,headMetaDescKeywords:"all"===y}:y||{};H();var D=0;function L(t){var n,r,i,a;void 0===t&&(t=!1),ie(ce({type:e.EventType.Meta,data:{href:window.location.href,width:j(),height:z()}}),t);var s=re.isFrozen();re.freeze();var c=o(function(e,t){var n=t||{},r=n.blockClass,o=void 0===r?"rr-block":r,i=n.inlineStylesheet,a=void 0===i||i,s=n.recordCanvas,l=void 0!==s&&s,c=n.blockSelector,u=void 0===c?null:c,d=n.maskAllInputs,p=void 0!==d&&d,f=n.slimDOM,h=void 0!==f&&f,m={};return[g(e,{doc:e,map:m,blockClass:o,blockSelector:u,skipChild:!1,inlineStylesheet:a,maskInputOptions:!0===p?{color:!0,date:!0,"datetime-local":!0,email:!0,month:!0,number:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0,textarea:!0,select:!0}:!1===p?{}:p,slimDOMOptions:!0===h||"all"===h?{script:!0,comment:!0,headFavicon:!0,headWhitespace:!0,headMetaDescKeywords:"all"===h,headMetaSocial:!0,headMetaRobots:!0,headMetaHttpEquiv:!0,headMetaAuthorship:!0,headMetaVerification:!0}:!1===h?{}:h,recordCanvas:l}),m]}(document,{blockClass:l,blockSelector:u,inlineStylesheet:h,maskAllInputs:_,slimDOM:O,recordCanvas:I}),2),d=c[0],p=c[1];if(!d)return console.warn("Failed to snapshot the document");A.map=p,ie(ce({type:e.EventType.FullSnapshot,data:{node:d,initialOffset:{left:void 0!==window.pageXOffset?window.pageXOffset:(null===document||void 0===document?void 0:document.documentElement.scrollLeft)||(null===(r=null===(n=null===document||void 0===document?void 0:document.body)||void 0===n?void 0:n.parentElement)||void 0===r?void 0:r.scrollLeft)||(null===document||void 0===document?void 0:document.body.scrollLeft)||0,top:void 0!==window.pageYOffset?window.pageYOffset:(null===document||void 0===document?void 0:document.documentElement.scrollTop)||(null===(a=null===(i=null===document||void 0===document?void 0:document.body)||void 0===i?void 0:i.parentElement)||void 0===a?void 0:a.scrollTop)||(null===document||void 0===document?void 0:document.body.scrollTop)||0}}})),s||(re.emit(),re.unfreeze())}ie=function(t,n){if(!re.isFrozen()||t.type===e.EventType.FullSnapshot||t.type===e.EventType.IncrementalSnapshot&&t.data.source===e.IncrementalSource.Mutation||(re.emit(),re.unfreeze()),r(E?E(t):t,n),t.type===e.EventType.FullSnapshot)N=t,D=0;else if(t.type===e.EventType.IncrementalSnapshot){D++;var o=a&&D>=a,s=i&&t.timestamp-N.timestamp>i;(o||s)&&L(!0)}};try{var F=[];F.push(R("DOMContentLoaded",(function(){ie(ce({type:e.EventType.DomContentLoaded,data:{}}))})));var P=function(){L(),F.push(le({mutationCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.Mutation},t)}))},mousemoveCb:function(t,n){return ie(ce({type:e.EventType.IncrementalSnapshot,data:{source:n,positions:t}}))},mouseInteractionCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.MouseInteraction},t)}))},scrollCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.Scroll},t)}))},viewportResizeCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.ViewportResize},t)}))},inputCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.Input},t)}))},mediaInteractionCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.MediaInteraction},t)}))},styleSheetRuleCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.StyleSheetRule},t)}))},canvasMutationCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.CanvasMutation},t)}))},fontCb:function(t){return ie(ce({type:e.EventType.IncrementalSnapshot,data:n({source:e.IncrementalSource.Font},t)}))},blockClass:l,blockSelector:u,ignoreClass:p,maskInputOptions:_,maskInputFn:b,inlineStylesheet:h,sampling:T,recordCanvas:I,collectFonts:k,slimDOMOptions:O},S))};return"interactive"===document.readyState||"complete"===document.readyState?P():F.push(R("load",(function(){ie(ce({type:e.EventType.Load,data:{}})),P()}),window)),function(){F.forEach((function(e){return e()}))}}catch(e){console.warn(e)}}function de(e){return e=e||Object.create(null),{on:function(t,n){(e[t]||(e[t]=[])).push(n)},off:function(t,n){e[t]&&e[t].splice(e[t].indexOf(n)>>>0,1)},emit:function(t,n){(e[t]||[]).slice().map((function(e){e(n)})),(e["*"]||[]).slice().map((function(e){e(t,n)}))}}}ue.addCustomEvent=function(t,n){if(!ie)throw new Error("please add custom event after start recording");ie(ce({type:e.EventType.Custom,data:{tag:t,payload:n}}))},ue.freezePage=function(){re.freeze()};var pe=Object.freeze({__proto__:null,default:de});function fe(e,t){if(void 0===e&&(e=window),void 0===t&&(t=document),!("scrollBehavior"in t.documentElement.style)||!0===e.__forceSmoothScrollPolyfill__){var n,r=e.HTMLElement||e.Element,o={scroll:e.scroll||e.scrollTo,scrollBy:e.scrollBy,elementScroll:r.prototype.scroll||s,scrollIntoView:r.prototype.scrollIntoView},i=e.performance&&e.performance.now?e.performance.now.bind(e.performance):Date.now,a=(n=e.navigator.userAgent,new RegExp(["MSIE ","Trident/","Edge/"].join("|")).test(n)?1:0);e.scroll=e.scrollTo=function(){void 0!==arguments[0]&&(!0!==l(arguments[0])?h.call(e,t.body,void 0!==arguments[0].left?~~arguments[0].left:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?~~arguments[0].top:e.scrollY||e.pageYOffset):o.scroll.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:e.scrollX||e.pageXOffset,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:e.scrollY||e.pageYOffset))},e.scrollBy=function(){void 0!==arguments[0]&&(l(arguments[0])?o.scrollBy.call(e,void 0!==arguments[0].left?arguments[0].left:"object"!=typeof arguments[0]?arguments[0]:0,void 0!==arguments[0].top?arguments[0].top:void 0!==arguments[1]?arguments[1]:0):h.call(e,t.body,~~arguments[0].left+(e.scrollX||e.pageXOffset),~~arguments[0].top+(e.scrollY||e.pageYOffset)))},r.prototype.scroll=r.prototype.scrollTo=function(){if(void 0!==arguments[0])if(!0!==l(arguments[0])){var e=arguments[0].left,t=arguments[0].top;h.call(this,this,void 0===e?this.scrollLeft:~~e,void 0===t?this.scrollTop:~~t)}else{if("number"==typeof arguments[0]&&void 0===arguments[1])throw new SyntaxError("Value could not be converted");o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left:"object"!=typeof arguments[0]?~~arguments[0]:this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top:void 0!==arguments[1]?~~arguments[1]:this.scrollTop)}},r.prototype.scrollBy=function(){void 0!==arguments[0]&&(!0!==l(arguments[0])?this.scroll({left:~~arguments[0].left+this.scrollLeft,top:~~arguments[0].top+this.scrollTop,behavior:arguments[0].behavior}):o.elementScroll.call(this,void 0!==arguments[0].left?~~arguments[0].left+this.scrollLeft:~~arguments[0]+this.scrollLeft,void 0!==arguments[0].top?~~arguments[0].top+this.scrollTop:~~arguments[1]+this.scrollTop))},r.prototype.scrollIntoView=function(){if(!0!==l(arguments[0])){var n=p(this),r=n.getBoundingClientRect(),i=this.getBoundingClientRect();n!==t.body?(h.call(this,n,n.scrollLeft+i.left-r.left,n.scrollTop+i.top-r.top),"fixed"!==e.getComputedStyle(n).position&&e.scrollBy({left:r.left,top:r.top,behavior:"smooth"})):e.scrollBy({left:i.left,top:i.top,behavior:"smooth"})}else o.scrollIntoView.call(this,void 0===arguments[0]||arguments[0])}}function s(e,t){this.scrollLeft=e,this.scrollTop=t}function l(e){if(null===e||"object"!=typeof e||void 0===e.behavior||"auto"===e.behavior||"instant"===e.behavior)return!0;if("object"==typeof e&&"smooth"===e.behavior)return!1;throw new TypeError("behavior member of ScrollOptions "+e.behavior+" is not a valid value for enumeration ScrollBehavior.")}function c(e,t){return"Y"===t?e.clientHeight+a<e.scrollHeight:"X"===t?e.clientWidth+a<e.scrollWidth:void 0}function u(t,n){var r=e.getComputedStyle(t,null)["overflow"+n];return"auto"===r||"scroll"===r}function d(e){var t=c(e,"Y")&&u(e,"Y"),n=c(e,"X")&&u(e,"X");return t||n}function p(e){for(;e!==t.body&&!1===d(e);)e=e.parentNode||e.host;return e}function f(t){var n,r,o,a,s=(i()-t.startTime)/468;a=s=s>1?1:s,n=.5*(1-Math.cos(Math.PI*a)),r=t.startX+(t.x-t.startX)*n,o=t.startY+(t.y-t.startY)*n,t.method.call(t.scrollable,r,o),r===t.x&&o===t.y||e.requestAnimationFrame(f.bind(e,t))}function h(n,r,a){var l,c,u,d,p=i();n===t.body?(l=e,c=e.scrollX||e.pageXOffset,u=e.scrollY||e.pageYOffset,d=o.scroll):(l=n,c=n.scrollLeft,u=n.scrollTop,d=s),f({scrollable:l,method:d,startTime:p,startX:c,startY:u,x:r,y:a})}}var he,me=function(){function e(e,t){void 0===e&&(e=[]),this.timeOffset=0,this.raf=null,this.actions=e,this.speed=t}return e.prototype.addAction=function(e){var t=this.findActionIndex(e);this.actions.splice(t,0,e)},e.prototype.addActions=function(e){var t;(t=this.actions).push.apply(t,i(e))},e.prototype.start=function(){this.actions.sort((function(e,t){return e.delay-t.delay})),this.timeOffset=0;var e=performance.now(),t=this.actions,n=this;this.raf=requestAnimationFrame((function r(o){for(n.timeOffset+=(o-e)*n.speed,e=o;t.length;){var i=t[0];if(!(n.timeOffset>=i.delay))break;t.shift(),i.doAction()}(t.length>0||n.liveMode)&&(n.raf=requestAnimationFrame(r))}))},e.prototype.clear=function(){this.raf&&(cancelAnimationFrame(this.raf),this.raf=null),this.actions.length=0},e.prototype.setSpeed=function(e){this.speed=e},e.prototype.toggleLiveMode=function(e){this.liveMode=e},e.prototype.isActive=function(){return null!==this.raf},e.prototype.findActionIndex=function(e){for(var t=0,n=this.actions.length-1;t<=n;){var r=Math.floor((t+n)/2);if(this.actions[r].delay<e.delay)t=r+1;else{if(!(this.actions[r].delay>e.delay))return r;n=r-1}}return t},e}();function ve(t,n){if(t.type===e.EventType.IncrementalSnapshot&&t.data.source===e.IncrementalSource.MouseMove){var r=t.data.positions[0].timeOffset,o=t.timestamp+r;return t.delay=o-n,o-n}return t.delay=t.timestamp-n,t.delay}
/*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */!function(e){e[e.NotStarted=0]="NotStarted",e[e.Running=1]="Running",e[e.Stopped=2]="Stopped"}(he||(he={}));var ye={type:"xstate.init"};function ge(e){return void 0===e?[]:[].concat(e)}function be(e){return{type:"xstate.assign",assignment:e}}function Se(e,t){return"string"==typeof(e="string"==typeof e&&t&&t[e]?t[e]:e)?{type:e}:"function"==typeof e?{type:e.name,exec:e}:e}function Ee(e){return function(t){return e===t}}function we(e){return"string"==typeof e?{type:e}:e}function Te(e,t){return{value:e,context:t,actions:[],changed:!1,matches:Ee(e)}}function xe(e,t){void 0===t&&(t={});var n={config:e,_options:t,initialState:{value:e.initial,actions:ge(e.states[e.initial].entry).map((function(e){return Se(e,t.actions)})),context:e.context,matches:Ee(e.initial)},transition:function(t,r){var o,i,a="string"==typeof t?{value:t,context:e.context}:t,s=a.value,l=a.context,c=we(r),u=e.states[s];if(u.on){var d=ge(u.on[c.type]),p=function(t){if(void 0===t)return{value:Te(s,l)};var r="string"==typeof t?{target:t}:t,o=r.target,i=void 0===o?s:o,a=r.actions,d=void 0===a?[]:a,p=r.cond,f=l;if((void 0===p?function(){return!0}:p)(l,c)){var h=e.states[i],m=!1,v=[].concat(u.exit,d,h.entry).filter((function(e){return e})).map((function(e){return Se(e,n._options.actions)})).filter((function(e){if("xstate.assign"===e.type){m=!0;var t=Object.assign({},f);return"function"==typeof e.assignment?t=e.assignment(f,c):Object.keys(e.assignment).forEach((function(n){t[n]="function"==typeof e.assignment[n]?e.assignment[n](f,c):e.assignment[n]})),f=t,!1}return!0}));return{value:{value:i,context:f,actions:v,changed:i!==s||v.length>0||m,matches:Ee(i)}}}};try{for(var f=function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}}(d),h=f.next();!h.done;h=f.next()){var m=p(h.value);if("object"==typeof m)return m.value}}catch(e){o={error:e}}finally{try{h&&!h.done&&(i=f.return)&&i.call(f)}finally{if(o)throw o.error}}}return Te(s,l)}};return n}var Ce=function(e,t){return e.actions.forEach((function(n){var r=n.exec;return r&&r(e.context,t)}))};function Ie(e){var t=e.initialState,n=he.NotStarted,r=new Set,o={_machine:e,send:function(o){n===he.Running&&(t=e.transition(t,o),Ce(t,we(o)),r.forEach((function(e){return e(t)})))},subscribe:function(e){return r.add(e),e(t),{unsubscribe:function(){return r.delete(e)}}},start:function(r){if(r){var i="object"==typeof r?r:{context:e.config.context,value:r};t={value:i.value,actions:[],context:i.context,matches:Ee(i.value)}}return n=he.Running,Ce(t,ye),o},stop:function(){return n=he.Stopped,r.clear(),o},get state(){return t},get status(){return n}};return o}function Me(t,o){var i=o.getCastFn,a=o.emitter;return Ie(xe({id:"player",context:t,initial:"paused",states:{playing:{on:{PAUSE:{target:"paused",actions:["pause"]},CAST_EVENT:{target:"playing",actions:"castEvent"},END:{target:"paused",actions:["resetLastPlayedEvent","pause"]},ADD_EVENT:{target:"playing",actions:["addEvent"]}}},paused:{on:{PLAY:{target:"playing",actions:["recordTimeOffset","play"]},CAST_EVENT:{target:"paused",actions:"castEvent"},TO_LIVE:{target:"live",actions:["startLive"]},ADD_EVENT:{target:"paused",actions:["addEvent"]}}},live:{on:{ADD_EVENT:{target:"live",actions:["addEvent"]},CAST_EVENT:{target:"live",actions:["castEvent"]}}}}},{actions:{castEvent:be({lastPlayedEvent:function(e,t){return"CAST_EVENT"===t.type?t.payload.event:e.lastPlayedEvent}}),recordTimeOffset:be((function(e,t){var r=e.timeOffset;return"payload"in t&&"timeOffset"in t.payload&&(r=t.payload.timeOffset),n(n({},e),{timeOffset:r,baselineTime:e.events[0].timestamp+r})})),play:function(t){var n,o,s,l,c,u=t.timer,d=t.events,p=t.baselineTime,f=t.lastPlayedEvent;u.clear();try{for(var h=r(d),m=h.next();!m.done;m=h.next()){ve(m.value,p)}}catch(e){n={error:e}}finally{try{m&&!m.done&&(o=h.return)&&o.call(h)}finally{if(n)throw n.error}}var v=function(t,n){for(var r=t.length-1;r>=0;r--){var o=t[r];if(o.type===e.EventType.Meta&&o.timestamp<=n)return t.slice(r)}return t}(d,p),y=new Array,g=function(t){var n=null==f?void 0:f.timestamp;if((null==f?void 0:f.type)===e.EventType.IncrementalSnapshot&&f.data.source===e.IncrementalSource.MouseMove&&(n=f.timestamp+(null===(c=f.data.positions[0])||void 0===c?void 0:c.timeOffset)),n&&n<p&&(t.timestamp<=n||t===f))return"continue";var r=t.timestamp<p;if(r&&!X(t))return"continue";var o=i(t,r);r?o():y.push({doAction:function(){o(),a.emit(e.ReplayerEvents.EventCast,t)},delay:t.delay})};try{for(var b=r(v),S=b.next();!S.done;S=b.next()){g(S.value)}}catch(e){s={error:e}}finally{try{S&&!S.done&&(l=b.return)&&l.call(b)}finally{if(s)throw s.error}}a.emit(e.ReplayerEvents.Flush),u.addActions(y),u.start()},pause:function(e){e.timer.clear()},resetLastPlayedEvent:be((function(e){return n(n({},e),{lastPlayedEvent:null})})),startLive:be({baselineTime:function(e,t){return e.timer.toggleLiveMode(!0),e.timer.start(),"TO_LIVE"===t.type&&t.payload.baselineTime?t.payload.baselineTime:Date.now()}}),addEvent:be((function(t,r){var o=t.baselineTime,s=t.timer,l=t.events;if("ADD_EVENT"===r.type){var c=r.payload.event;ve(c,o),l.push(c);var u=c.timestamp<o,d=i(c,u);u?d():(s.addAction({doAction:function(){d(),a.emit(e.ReplayerEvents.EventCast,c)},delay:c.delay}),s.isActive()||s.start())}return n(n({},t),{events:l})}))}}))}var ke=de||pe,Ne={duration:500,lineCap:"round",lineWidth:3,strokeStyle:"red"},_e=function(){function a(n,i){var a=this;if(this.mouseTail=null,this.tailPositions=[],this.emitter=ke(),this.legacy_missingNodeRetryMap={},this.imageMap=new Map,!(null==i?void 0:i.liveMode)&&n.length<2)throw new Error("Replayer need at least 2 events.");var s={speed:1,root:document.body,loadTimeout:0,skipInactive:!1,showWarning:!0,showDebug:!1,blockClass:"rr-block",liveMode:!1,insertStyleRules:[],triggerFocus:!0,UNSAFE_replayCanvas:!1,pauseAnimation:!0,mouseTail:Ne};this.config=Object.assign({},s,i),this.handleResize=this.handleResize.bind(this),this.getCastFn=this.getCastFn.bind(this),this.emitter.on(e.ReplayerEvents.Resize,this.handleResize),this.setupDom(),this.treeIndex=new Y,this.fragmentParentMap=new Map,this.elementStateMap=new Map,this.emitter.on(e.ReplayerEvents.Flush,(function(){var e,n,i,s,l,c,u=a.treeIndex.flush(),d=u.scrollMap,p=u.inputMap;try{for(var f=r(a.fragmentParentMap.entries()),h=f.next();!h.done;h=f.next()){var m=o(h.value,2),v=m[0],y=m[1];A.map[y.__sn.id]=y,y.__sn.type===t.Element&&"textarea"===y.__sn.tagName&&v.textContent&&(y.value=v.textContent),y.appendChild(v),a.restoreState(y)}}catch(t){e={error:t}}finally{try{h&&!h.done&&(n=f.return)&&n.call(f)}finally{if(e)throw e.error}}a.fragmentParentMap.clear(),a.elementStateMap.clear();try{for(var g=r(d.values()),b=g.next();!b.done;b=g.next()){var S=b.value;a.applyScroll(S)}}catch(e){i={error:e}}finally{try{b&&!b.done&&(s=g.return)&&s.call(g)}finally{if(i)throw i.error}}try{for(var E=r(p.values()),w=E.next();!w.done;w=E.next()){S=w.value;a.applyInput(S)}}catch(e){l={error:e}}finally{try{w&&!w.done&&(c=E.return)&&c.call(E)}finally{if(l)throw l.error}}}));var l=new me([],(null==i?void 0:i.speed)||s.speed);this.service=Me({events:n.map((function(e){return i&&i.unpackFn?i.unpackFn(e):e})),timer:l,timeOffset:0,baselineTime:0,lastPlayedEvent:null},{getCastFn:this.getCastFn,emitter:this.emitter}),this.service.start(),this.service.subscribe((function(t){a.emitter.emit(e.ReplayerEvents.StateChange,{player:t})})),this.speedService=Ie(xe({id:"speed",context:{normalSpeed:-1,timer:l},initial:"normal",states:{normal:{on:{FAST_FORWARD:{target:"skipping",actions:["recordSpeed","setSpeed"]},SET_SPEED:{target:"normal",actions:["setSpeed"]}}},skipping:{on:{BACK_TO_NORMAL:{target:"normal",actions:["restoreSpeed"]},SET_SPEED:{target:"normal",actions:["setSpeed"]}}}}},{actions:{setSpeed:function(e,t){"payload"in t&&e.timer.setSpeed(t.payload.speed)},recordSpeed:be({normalSpeed:function(e){return e.timer.speed}}),restoreSpeed:function(e){e.timer.setSpeed(e.normalSpeed)}}})),this.speedService.start(),this.speedService.subscribe((function(t){a.emitter.emit(e.ReplayerEvents.StateChange,{speed:t})}));var c=this.service.state.context.events.find((function(t){return t.type===e.EventType.Meta})),u=this.service.state.context.events.find((function(t){return t.type===e.EventType.FullSnapshot}));if(c){var d=c.data,p=d.width,f=d.height;setTimeout((function(){a.emitter.emit(e.ReplayerEvents.Resize,{width:p,height:f})}),0)}u&&setTimeout((function(){a.rebuildFullSnapshot(u)}),1)}return Object.defineProperty(a.prototype,"timer",{get:function(){return this.service.state.context.timer},enumerable:!1,configurable:!0}),a.prototype.on=function(e,t){return this.emitter.on(e,t),this},a.prototype.setConfig=function(e){var t=this;Object.keys(e).forEach((function(n){t.config[n]=e[n]})),this.config.skipInactive||this.backToNormal(),void 0!==e.speed&&this.speedService.send({type:"SET_SPEED",payload:{speed:e.speed}}),void 0!==e.mouseTail&&(!1===e.mouseTail?this.mouseTail&&(this.mouseTail.style.display="none"):(this.mouseTail||(this.mouseTail=document.createElement("canvas"),this.mouseTail.width=Number.parseFloat(this.iframe.width),this.mouseTail.height=Number.parseFloat(this.iframe.height),this.mouseTail.classList.add("replayer-mouse-tail"),this.wrapper.insertBefore(this.mouseTail,this.iframe)),this.mouseTail.style.display="inherit"))},a.prototype.getMetaData=function(){var e=this.service.state.context.events[0],t=this.service.state.context.events[this.service.state.context.events.length-1];return{startTime:e.timestamp,endTime:t.timestamp,totalTime:t.timestamp-e.timestamp}},a.prototype.getCurrentTime=function(){return this.timer.timeOffset+this.getTimeOffset()},a.prototype.getTimeOffset=function(){var e=this.service.state.context;return e.baselineTime-e.events[0].timestamp},a.prototype.play=function(t){var n;void 0===t&&(t=0),this.service.state.matches("paused")||this.service.send({type:"PAUSE"}),this.service.send({type:"PLAY",payload:{timeOffset:t}}),null===(n=this.iframe.contentDocument)||void 0===n||n.getElementsByTagName("html")[0].classList.remove("rrweb-paused"),this.emitter.emit(e.ReplayerEvents.Start)},a.prototype.pause=function(t){var n;void 0===t&&this.service.state.matches("playing")&&this.service.send({type:"PAUSE"}),"number"==typeof t&&(this.play(t),this.service.send({type:"PAUSE"})),null===(n=this.iframe.contentDocument)||void 0===n||n.getElementsByTagName("html")[0].classList.add("rrweb-paused"),this.emitter.emit(e.ReplayerEvents.Pause)},a.prototype.resume=function(t){void 0===t&&(t=0),console.warn("The 'resume' will be departed in 1.0. Please use 'play' method which has the same interface."),this.play(t),this.emitter.emit(e.ReplayerEvents.Resume)},a.prototype.startLive=function(e){this.service.send({type:"TO_LIVE",payload:{baselineTime:e}})},a.prototype.addEvent=function(e){var t=this,n=this.config.unpackFn?this.config.unpackFn(e):e;Promise.resolve().then((function(){return t.service.send({type:"ADD_EVENT",payload:{event:n}})}))},a.prototype.enableInteract=function(){this.iframe.setAttribute("scrolling","auto"),this.iframe.style.pointerEvents="auto"},a.prototype.disableInteract=function(){this.iframe.setAttribute("scrolling","no"),this.iframe.style.pointerEvents="none"},a.prototype.setupDom=function(){this.wrapper=document.createElement("div"),this.wrapper.classList.add("replayer-wrapper"),this.config.root.appendChild(this.wrapper),this.mouse=document.createElement("div"),this.mouse.classList.add("replayer-mouse"),this.wrapper.appendChild(this.mouse),!1!==this.config.mouseTail&&(this.mouseTail=document.createElement("canvas"),this.mouseTail.classList.add("replayer-mouse-tail"),this.mouseTail.style.display="inherit",this.wrapper.appendChild(this.mouseTail)),this.iframe=document.createElement("iframe");var e=["allow-same-origin"];this.config.UNSAFE_replayCanvas&&e.push("allow-scripts"),this.iframe.style.display="none",this.iframe.setAttribute("sandbox",e.join(" ")),this.disableInteract(),this.wrapper.appendChild(this.iframe),this.iframe.contentWindow&&this.iframe.contentDocument&&(fe(this.iframe.contentWindow,this.iframe.contentDocument),H(this.iframe.contentWindow))},a.prototype.handleResize=function(e){var t,n;this.iframe.style.display="inherit";try{for(var o=r([this.mouseTail,this.iframe]),i=o.next();!i.done;i=o.next()){var a=i.value;a&&(a.setAttribute("width",String(e.width)),a.setAttribute("height",String(e.height)))}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}},a.prototype.getCastFn=function(t,n){var o,i=this;switch(void 0===n&&(n=!1),t.type){case e.EventType.DomContentLoaded:case e.EventType.Load:break;case e.EventType.Custom:o=function(){i.emitter.emit(e.ReplayerEvents.CustomEvent,t)};break;case e.EventType.Meta:o=function(){return i.emitter.emit(e.ReplayerEvents.Resize,{width:t.data.width,height:t.data.height})};break;case e.EventType.FullSnapshot:o=function(){i.rebuildFullSnapshot(t,n),i.iframe.contentWindow.scrollTo(t.data.initialOffset)};break;case e.EventType.IncrementalSnapshot:o=function(){var o,a;if(i.applyIncremental(t,n),!n&&(t===i.nextUserInteractionEvent&&(i.nextUserInteractionEvent=null,i.backToNormal()),i.config.skipInactive&&!i.nextUserInteractionEvent)){try{for(var s=r(i.service.state.context.events),l=s.next();!l.done;l=s.next()){var c=l.value;if(!(c.timestamp<=t.timestamp)&&i.isUserInteraction(c)){c.delay-t.delay>1e4*i.speedService.state.context.timer.speed&&(i.nextUserInteractionEvent=c);break}}}catch(e){o={error:e}}finally{try{l&&!l.done&&(a=s.return)&&a.call(s)}finally{if(o)throw o.error}}if(i.nextUserInteractionEvent){var u=i.nextUserInteractionEvent.delay-t.delay,d={speed:Math.min(Math.round(u/5e3),360)};i.speedService.send({type:"FAST_FORWARD",payload:d}),i.emitter.emit(e.ReplayerEvents.SkipStart,d)}}}}return function(){if(o&&o(),i.service.send({type:"CAST_EVENT",payload:{event:t}}),t===i.service.state.context.events[i.service.state.context.events.length-1]){var n=function(){i.backToNormal(),i.service.send("END"),i.emitter.emit(e.ReplayerEvents.Finish)};t.type===e.EventType.IncrementalSnapshot&&t.data.source===e.IncrementalSource.MouseMove&&t.data.positions.length?setTimeout((function(){n()}),Math.max(0,-t.data.positions[0].timeOffset)):n()}}},a.prototype.rebuildFullSnapshot=function(t,n){if(void 0===n&&(n=!1),!this.iframe.contentDocument)return console.warn("Looks like your replayer has been destroyed.");Object.keys(this.legacy_missingNodeRetryMap).length&&console.warn("Found unresolved missing node map",this.legacy_missingNodeRetryMap),this.legacy_missingNodeRetryMap={},A.map=D(t.data.node,{doc:this.iframe.contentDocument})[1];var r=document.createElement("style"),o=this.iframe.contentDocument,i=o.documentElement,a=o.head;i.insertBefore(r,a);var s,l=(s=this.config.blockClass,["iframe, ."+s+" { background: #ccc }","noscript { display: none !important; }"]).concat(this.config.insertStyleRules);this.config.pauseAnimation&&l.push("html.rrweb-paused * { animation-play-state: paused !important; }"),this.service.state.matches("playing")||this.iframe.contentDocument.getElementsByTagName("html")[0].classList.add("rrweb-paused");for(var c=0;c<l.length;c++)r.sheet.insertRule(l[c],c);this.emitter.emit(e.ReplayerEvents.FullsnapshotRebuilded,t),n||this.waitForStylesheetLoad(),this.config.UNSAFE_replayCanvas&&this.preloadAllImages()},a.prototype.waitForStylesheetLoad=function(){var t,n=this,r=null===(t=this.iframe.contentDocument)||void 0===t?void 0:t.head;if(r){var o,i=new Set,a=this.service.state,s=function(){a=n.service.state};this.emitter.on(e.ReplayerEvents.Start,s),this.emitter.on(e.ReplayerEvents.Pause,s);var l=function(){n.emitter.off(e.ReplayerEvents.Start,s),n.emitter.off(e.ReplayerEvents.Pause,s)};r.querySelectorAll('link[rel="stylesheet"]').forEach((function(t){t.sheet||(i.add(t),t.addEventListener("load",(function(){i.delete(t),0===i.size&&-1!==o&&(a.matches("playing")&&n.play(n.getCurrentTime()),n.emitter.emit(e.ReplayerEvents.LoadStylesheetEnd),o&&window.clearTimeout(o),l())})))})),i.size>0&&(this.service.send({type:"PAUSE"}),this.emitter.emit(e.ReplayerEvents.LoadStylesheetStart),o=window.setTimeout((function(){a.matches("playing")&&n.play(n.getCurrentTime()),o=-1,l()}),this.config.loadTimeout))}},a.prototype.preloadAllImages=function(){var t,n,o=this,i=this.service.state,a=function(){i=o.service.state};this.emitter.on(e.ReplayerEvents.Start,a),this.emitter.on(e.ReplayerEvents.Pause,a);var s=0,l=0;try{for(var c=r(this.service.state.context.events),u=c.next();!u.done;u=c.next()){var d=u.value;if(d.type===e.EventType.IncrementalSnapshot&&d.data.source===e.IncrementalSource.CanvasMutation&&"drawImage"===d.data.property&&"string"==typeof d.data.args[0]&&!this.imageMap.has(d)){s++;var p=document.createElement("img");p.src=d.data.args[0],this.imageMap.set(d,p),p.onload=function(){++l===s&&(i.matches("playing")&&o.play(o.getCurrentTime()),o.emitter.off(e.ReplayerEvents.Start,a),o.emitter.off(e.ReplayerEvents.Pause,a))}}}}catch(e){t={error:e}}finally{try{u&&!u.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}s!==l&&this.service.send({type:"PAUSE"})},a.prototype.applyIncremental=function(t,n){var r,o,i=this,a=t.data;switch(a.source){case e.IncrementalSource.Mutation:n&&(a.adds.forEach((function(e){return i.treeIndex.add(e)})),a.texts.forEach((function(e){return i.treeIndex.text(e)})),a.attributes.forEach((function(e){return i.treeIndex.attribute(e)})),a.removes.forEach((function(e){return i.treeIndex.remove(e)}))),this.applyMutation(a,n);break;case e.IncrementalSource.MouseMove:if(n){var s=a.positions[a.positions.length-1];this.moveAndHover(a,s.x,s.y,s.id)}else a.positions.forEach((function(e){var n={doAction:function(){i.moveAndHover(a,e.x,e.y,e.id)},delay:e.timeOffset+t.timestamp-i.service.state.context.baselineTime};i.timer.addAction(n)})),this.timer.addAction({doAction:function(){},delay:t.delay-(null===(r=a.positions[0])||void 0===r?void 0:r.timeOffset)});break;case e.IncrementalSource.MouseInteraction:if(-1===a.id)break;var l=new Event(e.MouseInteractions[a.type].toLowerCase());if(!(y=A.getNode(a.id)))return this.debugNodeNotFound(a,a.id);this.emitter.emit(e.ReplayerEvents.MouseInteraction,{type:a.type,target:y});var c=this.config.triggerFocus;switch(a.type){case e.MouseInteractions.Blur:"blur"in y&&y.blur();break;case e.MouseInteractions.Focus:c&&y.focus&&y.focus({preventScroll:!0});break;case e.MouseInteractions.Click:case e.MouseInteractions.TouchStart:case e.MouseInteractions.TouchEnd:n||(this.moveAndHover(a,a.x,a.y,a.id),this.mouse.classList.remove("active"),this.mouse.offsetWidth,this.mouse.classList.add("active"));break;default:y.dispatchEvent(l)}break;case e.IncrementalSource.Scroll:if(-1===a.id)break;if(n){this.treeIndex.scroll(a);break}this.applyScroll(a);break;case e.IncrementalSource.ViewportResize:this.emitter.emit(e.ReplayerEvents.Resize,{width:a.width,height:a.height});break;case e.IncrementalSource.Input:if(-1===a.id)break;if(n){this.treeIndex.input(a);break}this.applyInput(a);break;case e.IncrementalSource.MediaInteraction:if(!(y=A.getNode(a.id)))return this.debugNodeNotFound(a,a.id);var u=y;try{a.type===I.Pause&&u.pause(),a.type===I.Play&&(u.readyState>=HTMLMediaElement.HAVE_CURRENT_DATA?u.play():u.addEventListener("canplay",(function(){u.play()})))}catch(e){this.config.showWarning&&console.warn("Failed to replay media interactions: "+(e.message||e))}break;case e.IncrementalSource.StyleSheetRule:if(!(y=A.getNode(a.id)))return this.debugNodeNotFound(a,a.id);var d=y,p=y.parentNode,f=this.fragmentParentMap.has(p),h=void 0;if(f){var m=this.fragmentParentMap.get(y.parentNode);h=document.createTextNode(""),p.replaceChild(h,y),m.appendChild(y)}var v=d.sheet;a.adds&&a.adds.forEach((function(e){var t=e.rule,n=e.index,r=void 0===n?void 0:Math.min(n,v.rules.length);try{v.insertRule(t,r)}catch(e){}})),a.removes&&a.removes.forEach((function(e){var t=e.index;try{v.deleteRule(t)}catch(e){}})),f&&h&&p.replaceChild(y,h);break;case e.IncrementalSource.CanvasMutation:if(!this.config.UNSAFE_replayCanvas)return;var y;if(!(y=A.getNode(a.id)))return this.debugNodeNotFound(a,a.id);try{var g=y.getContext("2d");if(a.setter)return void(g[a.property]=a.args[0]);var b=g[a.property];if("drawImage"===a.property&&"string"==typeof a.args[0]){var S=this.imageMap.get(t);a.args[0]=S,b.apply(g,a.args)}else b.apply(g,a.args)}catch(e){this.warnCanvasMutationFailed(a,a.id,e)}break;case e.IncrementalSource.Font:try{var E=new FontFace(a.family,a.buffer?new Uint8Array(JSON.parse(a.fontSource)):a.fontSource,a.descriptors);null===(o=this.iframe.contentDocument)||void 0===o||o.fonts.add(E)}catch(e){this.config.showWarning&&console.warn(e)}}},a.prototype.applyMutation=function(e,t){var o,i,a=this;e.removes.forEach((function(t){var n=A.getNode(t.id);if(!n)return a.warnNodeNotFound(e,t.id);var r=A.getNode(t.parentId);if(!r)return a.warnNodeNotFound(e,t.parentId);if(A.removeNodeFromMap(n),r){var o=a.fragmentParentMap.get(r);if(o&&o.contains(n))o.removeChild(n);else if(a.fragmentParentMap.has(n)){var i=a.fragmentParentMap.get(n);r.removeChild(i),a.fragmentParentMap.delete(n)}else r.removeChild(n)}}));var s=n({},this.legacy_missingNodeRetryMap),l=[];var c=function(e){if(!a.iframe.contentDocument)return console.warn("Looks like your replayer has been destroyed.");var n=A.getNode(e.parentId);if(!n)return l.push(e);var r=null;if(a.iframe.contentDocument.contains?r=a.iframe.contentDocument.contains(n):a.iframe.contentDocument.body.contains&&(r=a.iframe.contentDocument.body.contains(n)),t&&r){var o=document.createDocumentFragment();for(A.map[e.parentId]=o,a.fragmentParentMap.set(o,n),a.storeState(n);n.firstChild;)o.appendChild(n.firstChild);n=o}var i=null,c=null;if(e.previousId&&(i=A.getNode(e.previousId)),e.nextId&&(c=A.getNode(e.nextId)),function(e){var t=null;return e.nextId&&(t=A.getNode(e.nextId)),null!==e.nextId&&void 0!==e.nextId&&-1!==e.nextId&&!t}(e))return l.push(e);var u=O(e.node,{doc:a.iframe.contentDocument,map:A.map,skipChild:!0,hackCss:!0});-1!==e.previousId&&-1!==e.nextId?(i&&i.nextSibling&&i.nextSibling.parentNode?n.insertBefore(u,i.nextSibling):c&&c.parentNode?n.contains(c)?n.insertBefore(u,c):n.insertBefore(u,null):n.appendChild(u),(e.previousId||e.nextId)&&a.legacy_resolveMissingNode(s,n,u,e)):s[e.node.id]={node:u,mutation:e}};e.adds.forEach((function(e){c(e)}));for(var u=Date.now();l.length;){var d=q(l);if(l.length=0,Date.now()-u>500){this.warn("Timeout in the loop, please check the resolve tree data:",d);break}try{for(var p=(o=void 0,r(d)),f=p.next();!f.done;f=p.next()){var h=f.value;A.getNode(h.value.parentId)?G(h,(function(e){c(e)})):this.debug("Drop resolve tree since there is no parent for the root node.",h)}}catch(e){o={error:e}}finally{try{f&&!f.done&&(i=p.return)&&i.call(p)}finally{if(o)throw o.error}}}Object.keys(s).length&&Object.assign(this.legacy_missingNodeRetryMap,s),e.texts.forEach((function(t){var n=A.getNode(t.id);if(!n)return a.warnNodeNotFound(e,t.id);a.fragmentParentMap.has(n)&&(n=a.fragmentParentMap.get(n)),n.textContent=t.value})),e.attributes.forEach((function(t){var n=A.getNode(t.id);if(!n)return a.warnNodeNotFound(e,t.id);for(var r in a.fragmentParentMap.has(n)&&(n=a.fragmentParentMap.get(n)),t.attributes)if("string"==typeof r){var o=t.attributes[r];try{null!==o?n.setAttribute(r,o):n.removeAttribute(r)}catch(e){a.config.showWarning&&console.warn("An error occurred may due to the checkout feature.",e)}}}))},a.prototype.applyScroll=function(e){var t=A.getNode(e.id);if(!t)return this.debugNodeNotFound(e,e.id);if(t===this.iframe.contentDocument)this.iframe.contentWindow.scrollTo({top:e.y,left:e.x,behavior:"smooth"});else try{t.scrollTop=e.y,t.scrollLeft=e.x}catch(e){}},a.prototype.applyInput=function(e){var t=A.getNode(e.id);if(!t)return this.debugNodeNotFound(e,e.id);try{t.checked=e.isChecked,t.value=e.text}catch(e){}},a.prototype.legacy_resolveMissingNode=function(e,t,n,r){var o=r.previousId,i=r.nextId,a=o&&e[o],s=i&&e[i];if(a){var l=a,c=l.node,u=l.mutation;t.insertBefore(c,n),delete e[u.node.id],delete this.legacy_missingNodeRetryMap[u.node.id],(u.previousId||u.nextId)&&this.legacy_resolveMissingNode(e,t,c,u)}if(s){var d=s;c=d.node,u=d.mutation;t.insertBefore(c,n.nextSibling),delete e[u.node.id],delete this.legacy_missingNodeRetryMap[u.node.id],(u.previousId||u.nextId)&&this.legacy_resolveMissingNode(e,t,c,u)}},a.prototype.moveAndHover=function(e,t,n,r){this.mouse.style.left=t+"px",this.mouse.style.top=n+"px",this.drawMouseTail({x:t,y:n});var o=A.getNode(r);if(!o)return this.debugNodeNotFound(e,r);this.hoverElements(o)},a.prototype.drawMouseTail=function(e){var t=this;if(this.mouseTail){var n=!0===this.config.mouseTail?Ne:Object.assign({},Ne,this.config.mouseTail),r=n.lineCap,o=n.lineWidth,i=n.strokeStyle,a=n.duration,s=function(){if(t.mouseTail){var e=t.mouseTail.getContext("2d");e&&t.tailPositions.length&&(e.clearRect(0,0,t.mouseTail.width,t.mouseTail.height),e.beginPath(),e.lineWidth=o,e.lineCap=r,e.strokeStyle=i,e.moveTo(t.tailPositions[0].x,t.tailPositions[0].y),t.tailPositions.forEach((function(t){return e.lineTo(t.x,t.y)})),e.stroke())}};this.tailPositions.push(e),s(),setTimeout((function(){t.tailPositions=t.tailPositions.filter((function(t){return t!==e})),s()}),a)}},a.prototype.hoverElements=function(e){var t;null===(t=this.iframe.contentDocument)||void 0===t||t.querySelectorAll(".\\:hover").forEach((function(e){e.classList.remove(":hover")}));for(var n=e;n;)n.classList&&n.classList.add(":hover"),n=n.parentElement},a.prototype.isUserInteraction=function(t){return t.type===e.EventType.IncrementalSnapshot&&(t.data.source>e.IncrementalSource.Mutation&&t.data.source<=e.IncrementalSource.Input)},a.prototype.backToNormal=function(){this.nextUserInteractionEvent=null,this.speedService.state.matches("normal")||(this.speedService.send({type:"BACK_TO_NORMAL"}),this.emitter.emit(e.ReplayerEvents.SkipEnd,{speed:this.speedService.state.context.normalSpeed}))},a.prototype.storeState=function(e){var t,n;if(e&&e.nodeType===e.ELEMENT_NODE){var o=e;(o.scrollLeft||o.scrollTop)&&this.elementStateMap.set(e,{scroll:[o.scrollLeft,o.scrollTop]});var i=o.children;try{for(var a=r(Array.from(i)),s=a.next();!s.done;s=a.next()){var l=s.value;this.storeState(l)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=a.return)&&n.call(a)}finally{if(t)throw t.error}}}},a.prototype.restoreState=function(e){var t,n;if(e.nodeType===e.ELEMENT_NODE){var o=e;if(this.elementStateMap.has(e)){var i=this.elementStateMap.get(e);i.scroll&&(o.scrollLeft=i.scroll[0],o.scrollTop=i.scroll[1]),this.elementStateMap.delete(e)}var a=o.children;try{for(var s=r(Array.from(a)),l=s.next();!l.done;l=s.next()){var c=l.value;this.restoreState(c)}}catch(e){t={error:e}}finally{try{l&&!l.done&&(n=s.return)&&n.call(s)}finally{if(t)throw t.error}}}},a.prototype.warnNodeNotFound=function(e,t){this.warn("Node with id '"+t+"' not found in",e)},a.prototype.warnCanvasMutationFailed=function(e,t,n){this.warn("Has error on update canvas '"+t+"'",e,n)},a.prototype.debugNodeNotFound=function(e,t){this.debug("[replayer]","Node with id '"+t+"' not found in",e)},a.prototype.warn=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.config.showWarning&&console.warn.apply(console,i(["[replayer]"],e))},a.prototype.debug=function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t];this.config.showDebug&&console.log.apply(console,i(["[replayer]"],e))},a}(),Oe=ue.addCustomEvent,De=ue.freezePage;return e.Replayer=_e,e.addCustomEvent=Oe,e.freezePage=De,e.mirror=A,e.record=ue,e.utils=K,Object.defineProperty(e,"__esModule",{value:!0}),e}({});
/*
 * rrwebJS 本体原生代码结束
*/

/* rrwebsdk-modules : api  */

var rrwebSDK = (function(factory) {

    var trace = function(i) { console.log('rrwebSDK : ', i); };
    trace('init ...');
    if (typeof module === 'object' && typeof module.exports === 'object') {
        trace('init ... module mode ...');
        module.exports = factory(trace, rrweb);
    }
    trace('init ... ok');
    return factory(trace, rrweb);
    }(function(trace, rrweb) {

    return function(options) {

        var status = {
            timer : null,
            events : [],
            stop : true,
            debug : false,
            rrwebStop : null,
        };

        var config = {
            reportUrl : 'https://www.yunbaoxiao.com.cn/recall',
            reportTimes : 3,
            reportTimeout : 0,
            notSupportInfo : '浏览器版本过低，需要 IE11+ 以上版本。',
            notSupportEvent : null,
            sameOriginMerger : false,
            signatureMode : 1,
        };

        var cache = {
            recallCode : '',
            busCode: '',
            goodsCode: '',
            goodsVersion: '',
        }

        var _debug = function(i) {
            if (status.debug) console.log('rrwebSDK : ', i);
        }

        var _shieldvconsole = function() {
            var vconsole = document.getElementById('__vconsole');
            if(!vconsole) return;
            if(!vconsole.classList.contains('rr-block')) {
                vconsole.classList.add('rr-block');
                vconsole.classList.add('rr-ignore');
                trace('vconsole shield.');
            }
        }

        var _cache = function(a) {
            var c = window.sessionStorage, k = 'rrwebsdk_cache';
            switch(a) {
                case undefined: return JSON.parse(c.getItem(k)) || cache;
                case null: c.removeItem(k); break;
                default: c.setItem(k, JSON.stringify(cache));
            }
        }

        var _report = function(callback) {
            _shieldvconsole();
            _debug('report ...');
            if (!status.events.length) {
                trace('report ... ignore');
                if (typeof callback == 'function') callback(true);
                return;
            }
            var events = [].concat(status.events); status.events = [];
            var data = JSON.parse(JSON.stringify(cache));
            data.events = JSON.stringify({ events: events });
            _debug(data);
            var body = '';
            for(var k in data) {
                body += '&'+k+'='+encodeURIComponent(data[k]);
            }
            body = body.substring(1);
            var url = config.reportUrl+'/api/events/report.shtml';
            var xhr = new XMLHttpRequest()
            xhr.open('POST', url, true);
            xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
            xhr.onreadystatechange = function() {
                if(xhr.readyState == 4) {
                    if(xhr.status == 200) {
                        trace('report ... ok (' + JSON.parse(xhr.responseText || '{}').message + ')');
                        if (typeof callback == 'function') callback(true);
                    }else{
                        trace('report ... error (' + xhr.status + ')');
                        status.events = [].concat(events, status.events);
                        if (typeof callback == 'function') callback(false);
                    }
                }
            }
            if (config.reportTimeout) {
                xhr.timeout = config.reportTimeout * 1000;
            }
            xhr.send(body);
        }

        var _start = function() {
            if (!status.stop) return;
            status.stop = false;
            status.rrwebStop = rrweb.record({
                emit : function(event) {
                    if (status.stop) _debug('rr ... miss');
                    else {
                        _debug('rr ... +1 ' + JSON.stringify(event));
                        status.events.push(event);
                    }
                },
            });
            status.timer = setInterval(_report, config.reportTimes * 1000);
            _report();
        }

        var _stop = function(callback, methodName) {
            status.stop = true;
            if(typeof status.rrwebStop == 'function') status.rrwebStop();
            clearInterval(status.timer);
            if(methodName) _report(function(state) {
                if (state && methodName == 'stop') _cache(null);
                if (typeof callback == 'function') callback(state);
                trace(methodName + ' ... ' + (state ? 'ok' : 'error'));
            });
        }

        var _token = function(a) {
            if (a == 'encode') {
                _debug('token encode ...');
                return 'rrwebsdk_token=' + JSON.stringify(cache).replace(/"/g,'@').replace(/:/g,'-').replace(/,/g,'_').replace(/[{}]/g,'')
            }
            if (a == 'decode') {
                _debug('token decode ...');
                var vars = window.location.search.substring(1).split("&");
                var rrwebsdk_token = '';
                for (var i=0; i<vars.length; i++) {
                    var pair = vars[i].split("=");
                    if(pair[0] == 'rrwebsdk_token') { rrwebsdk_token = pair[1]; break; }
                }
                _debug('token decode ... : ' + (rrwebsdk_token || 'null'));
                if (rrwebsdk_token) {
                    var token = JSON.parse('{' + rrwebsdk_token.replace(/@/g,'"').replace(/-/g,':').replace(/_/g,',') + '}');
                    for(var k in cache) { if (Object.keys(token).indexOf(k) < 0) return false; }
                    return token;
                }
                return false;
            }
        }

        this.report = function(data) {
            var crucial = [
                'goodsCode',    //产品编码
                'goodsVersion', //产品版本
                'busCode',      //业务编码
            ];
            var order = [
                'goodsName',    //产品名称
                'orderNo',      //订单号
                'policyNo',     //保单号
                'applicantName',//投保人名
                'idNo',         //投保证件
                'origin',       //来源
            ];
            var c = false, u = {};
            for(var k in data) {
                if (crucial.indexOf(k) >= 0) { cache[k] = data[k]; c=1; }
                if (crucial.concat(order).indexOf(k) >= 0) u[k] = data[k];
            }
            if (c) _cache(true);
            if (JSON.stringify(u) != '{}') status.events.push({ type:'_customer_variable_', data:u});
        };


        this.start = function(data) {
            trace('start ...');
            if (!status.stop) {
                trace('start ... error (已在录制中，若要开始一个新的录制，请先使用 stop() 停止旧的录制)');
                return;
            }
            cache.recallCode = 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/x/g, function() {return '0123456789abcdef'.charAt(Math.floor(Math.random() * 16))});
            if (data && data.constructor == Object && data.goodsCode) {
                if(data.busCode == undefined) data.busCode='';
                this.report(data);
            } else {
                _cache(true);
            }
            setTimeout(_start, 777);
            trace('start ... ok');
        }

        this.stop = function(callback){
            trace('stop ...');
            _stop(callback, 'stop');
        };

        this.leaveReport = function(callback) {
            trace('leaveReport ...');
            if (status.stop) {
                trace('leaveReport ... error (未在录制中)');
                return;
            }
            _stop(callback, 'leaveReport');
        }

        this.restoreReport = function() {
            trace('restoreReport ...');
            if (!status.stop) {
                trace('restoreReport ... error (已在录制中)');
                return;
            }
            if (!cache.recallCode) {
                var token = _token('decode');
                if (token) {
                    cache = token;
                    _cache(true);
                } else {
                    trace('restoreReport ... error (回溯码不存在，无法继续录制)');
                    return;
                }
            }
            setTimeout(_start, 777);
            trace('restoreReport ... ok');
        };

        this.open = function(url) {
            trace('open ...');
            var s = url.indexOf('?') < 0 ? '?' : '&';
            window.location.href = url + s + _token('encode');
        };

        this.static = function(selector) {
            if (!selector) return;
            var images = selector.constructor == Array ? selector : [selector];
            images.forEach(function(v){
                var img = document.querySelector(v);
                if (!img) return;
                img.onload = function(){
                    if (this.src.substring(0,10) == 'data:image') return;
                    var canvas = document.createElement("canvas");
                    canvas.width = this.width;
                    canvas.height = this.height;
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this, 0, 0, this.width, this.height);
                    var dataURL = canvas.toDataURL("image/png");
                    this.src = dataURL;
                }
                img.onload();
            })
        }

        this.debug = function(onoff) {
            trace('debug ...');
            status.debug = !!onoff;
            trace('debug ... ' + (status.debug ? 'on' : 'off'));
        };

        this.config = function(n, v) {
            if (!config.hasOwnProperty(n)) return;
            if (v == undefined) return config[n];
            config[n] = v;
        }

        this.version = function() {
            var v = '1.2.4 bate';
            trace('version ' + v);
            return v;
        }

        trace('instantiate ...');
        if (options) {
            for (var k in config) {
                if(options[k] !== undefined) config[k] = options[k];
            }
        }
        if (!window.MutationObserver) {
            if (config.notSupportEvent) {
                config.notSupportEvent();
            } else {
                alert(config.notSupportInfo);
                window.history.back();
            }
            trace('instantiate ... error');
            return;
        }
        window.__rrwebsdk_config = config;
        cache = _cache();
        _shieldvconsole();
        trace('instantiate ... ok');

    };
}));
//export default rrwebSDK;