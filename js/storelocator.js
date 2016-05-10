'use strict';
$(document).ready(function() {
  $(document).foundation();
});

// localforage
!function(){var e,r,n,t;!function(){var o={},i={};e=function(e,r,n){o[e]={deps:r,callback:n}},t=n=r=function(e){function n(r){if("."!==r.charAt(0))return r;for(var n=r.split("/"),t=e.split("/").slice(0,-1),o=0,i=n.length;i>o;o++){var u=n[o];if(".."===u)t.pop();else{if("."===u)continue;t.push(u)}}return t.join("/")}if(t._eak_seen=o,i[e])return i[e];if(i[e]={},!o[e])throw new Error("Could not find module "+e);for(var u,a=o[e],c=a.deps,s=a.callback,f=[],l=0,d=c.length;d>l;l++)f.push("exports"===c[l]?u={}:r(n(c[l])));var h=s.apply(this,f);return i[e]=u||h}}(),e("promise/all",["./utils","exports"],function(e,r){"use strict";function n(e){var r=this;if(!t(e))throw new TypeError("You must pass an array to all.");return new r(function(r,n){function t(e){return function(r){i(e,r)}}function i(e,n){a[e]=n,0===--c&&r(a)}var u,a=[],c=e.length;0===c&&r([]);for(var s=0;s<e.length;s++)u=e[s],u&&o(u.then)?u.then(t(s),n):i(s,u)})}var t=e.isArray,o=e.isFunction;r.all=n}),e("promise/asap",["exports"],function(e){"use strict";function r(){return function(){process.nextTick(o)}}function n(){var e=0,r=new c(o),n=document.createTextNode("");return r.observe(n,{characterData:!0}),function(){n.data=e=++e%2}}function t(){return function(){s.setTimeout(o,1)}}function o(){for(var e=0;e<f.length;e++){var r=f[e],n=r[0],t=r[1];n(t)}f=[]}function i(e,r){var n=f.push([e,r]);1===n&&u()}var u,a="undefined"!=typeof window?window:{},c=a.MutationObserver||a.WebKitMutationObserver,s="undefined"!=typeof global?global:void 0===this?window:this,f=[];u="undefined"!=typeof process&&"[object process]"==={}.toString.call(process)?r():c?n():t(),e.asap=i}),e("promise/config",["exports"],function(e){"use strict";function r(e,r){return 2!==arguments.length?n[e]:void(n[e]=r)}var n={instrument:!1};e.config=n,e.configure=r}),e("promise/polyfill",["./promise","./utils","exports"],function(e,r,n){"use strict";function t(){var e;e="undefined"!=typeof global?global:"undefined"!=typeof window&&window.document?window:self;var r="Promise"in e&&"resolve"in e.Promise&&"reject"in e.Promise&&"all"in e.Promise&&"race"in e.Promise&&function(){var r;return new e.Promise(function(e){r=e}),i(r)}();r||(e.Promise=o)}var o=e.Promise,i=r.isFunction;n.polyfill=t}),e("promise/promise",["./config","./utils","./all","./race","./resolve","./reject","./asap","exports"],function(e,r,n,t,o,i,u,a){"use strict";function c(e){if(!S(e))throw new TypeError("You must pass a resolver function as the first argument to the promise constructor");if(!(this instanceof c))throw new TypeError("Failed to construct 'Promise': Please use the 'new' operator, this object constructor cannot be called as a function.");this._subscribers=[],s(e,this)}function s(e,r){function n(e){y(r,e)}function t(e){p(r,e)}try{e(n,t)}catch(o){t(o)}}function f(e,r,n,t){var o,i,u,a,c=S(n);if(c)try{o=n(t),u=!0}catch(s){a=!0,i=s}else o=t,u=!0;h(r,o)||(c&&u?y(r,o):a?p(r,i):e===N?y(r,o):e===D&&p(r,o))}function l(e,r,n,t){var o=e._subscribers,i=o.length;o[i]=r,o[i+N]=n,o[i+D]=t}function d(e,r){for(var n,t,o=e._subscribers,i=e._detail,u=0;u<o.length;u+=3)n=o[u],t=o[u+r],f(r,n,t,i);e._subscribers=null}function h(e,r){var n,t=null;try{if(e===r)throw new TypeError("A promises callback cannot return that same promise.");if(b(r)&&(t=r.then,S(t)))return t.call(r,function(t){return n?!0:(n=!0,void(r!==t?y(e,t):v(e,t)))},function(r){return n?!0:(n=!0,void p(e,r))}),!0}catch(o){return n?!0:(p(e,o),!0)}return!1}function y(e,r){e===r?v(e,r):h(e,r)||v(e,r)}function v(e,r){e._state===O&&(e._state=j,e._detail=r,w.async(m,e))}function p(e,r){e._state===O&&(e._state=j,e._detail=r,w.async(g,e))}function m(e){d(e,e._state=N)}function g(e){d(e,e._state=D)}var w=e.config,b=(e.configure,r.objectOrFunction),S=r.isFunction,E=(r.now,n.all),A=t.race,_=o.resolve,I=i.reject,x=u.asap;w.async=x;var O=void 0,j=0,N=1,D=2;c.prototype={constructor:c,_state:void 0,_detail:void 0,_subscribers:void 0,then:function(e,r){var n=this,t=new this.constructor(function(){});if(this._state){var o=arguments;w.async(function(){f(n._state,t,o[n._state-1],n._detail)})}else l(this,t,e,r);return t},"catch":function(e){return this.then(null,e)}},c.all=E,c.race=A,c.resolve=_,c.reject=I,a.Promise=c}),e("promise/race",["./utils","exports"],function(e,r){"use strict";function n(e){var r=this;if(!t(e))throw new TypeError("You must pass an array to race.");return new r(function(r,n){for(var t,o=0;o<e.length;o++)t=e[o],t&&"function"==typeof t.then?t.then(r,n):r(t)})}var t=e.isArray;r.race=n}),e("promise/reject",["exports"],function(e){"use strict";function r(e){var r=this;return new r(function(r,n){n(e)})}e.reject=r}),e("promise/resolve",["exports"],function(e){"use strict";function r(e){if(e&&"object"==typeof e&&e.constructor===this)return e;var r=this;return new r(function(r){r(e)})}e.resolve=r}),e("promise/utils",["exports"],function(e){"use strict";function r(e){return n(e)||"object"==typeof e&&null!==e}function n(e){return"function"==typeof e}function t(e){return"[object Array]"===Object.prototype.toString.call(e)}var o=Date.now||function(){return(new Date).getTime()};e.objectOrFunction=r,e.isFunction=n,e.isArray=t,e.now=o}),r("promise/polyfill").polyfill()}(),function(){"use strict";function e(e){if(e)for(var r in e)l[r]=e[r];return new s(function(e,r){var n=d.open(l.name,l.version);n.onerror=function(){r(n.error)},n.onupgradeneeded=function(){n.result.createObjectStore(l.storeName)},n.onsuccess=function(){f=n.result,e()}})}function r(e,r){var n=this;return new s(function(t,o){n.ready().then(function(){var n=f.transaction(l.storeName,"readonly").objectStore(l.storeName),i=n.get(e);i.onsuccess=function(){var e=i.result;void 0===e&&(e=null),c(r,e),t(e)},i.onerror=function(){r&&r(null,i.error),o(i.error)}},o)})}function n(e,r,n){var t=this;return new s(function(o,i){t.ready().then(function(){var t=f.transaction(l.storeName,"readwrite").objectStore(l.storeName);null===r&&(r=void 0);var u=t.put(r,e);u.onsuccess=function(){void 0===r&&(r=null),c(n,r),o(r)},u.onerror=function(){n&&n(null,u.error),i(u.error)}},i)})}function t(e,r){var n=this;return new s(function(t,o){n.ready().then(function(){var n=f.transaction(l.storeName,"readwrite").objectStore(l.storeName),i=n["delete"](e);i.onsuccess=function(){c(r),t()},i.onerror=function(){r&&r(i.error),o(i.error)},i.onabort=function(e){var n=e.target.error;"QuotaExceededError"===n&&(r&&r(n),o(n))}},o)})}function o(e){var r=this;return new s(function(n,t){r.ready().then(function(){var r=f.transaction(l.storeName,"readwrite").objectStore(l.storeName),o=r.clear();o.onsuccess=function(){c(e),n()},o.onerror=function(){e&&e(null,o.error),t(o.error)}},t)})}function i(e){var r=this;return new s(function(n,t){r.ready().then(function(){var r=f.transaction(l.storeName,"readonly").objectStore(l.storeName),o=r.count();o.onsuccess=function(){e&&e(o.result),n(o.result)},o.onerror=function(){e&&e(null,o.error),t(o.error)}},t)})}function u(e,r){var n=this;return new s(function(t,o){return 0>e?(r&&r(null),void t(null)):void n.ready().then(function(){var n=f.transaction(l.storeName,"readonly").objectStore(l.storeName),i=!1,u=n.openCursor();u.onsuccess=function(){var n=u.result;return n?void(0===e?(r&&r(n.key),t(n.key)):i?(r&&r(n.key),t(n.key)):(i=!0,n.advance(e))):(r&&r(null),void t(null))},u.onerror=function(){r&&r(null,u.error),o(u.error)}},o)})}function a(e){var r=this;return new s(function(n,t){r.ready().then(function(){var r=f.transaction(l.storeName,"readonly").objectStore(l.storeName),o=r.openCursor(),i=[];o.onsuccess=function(){var r=o.result;return r?(i.push(r.key),void r["continue"]()):(e&&e(i),void n(i))},o.onerror=function(){e&&e(null,o.error),t(o.error)}},t)})}function c(e,r){return e?setTimeout(function(){return e(r)},0):void 0}var s="undefined"!=typeof module&&module.exports?require("promise"):this.Promise,f=null,l={},d=d||this.indexedDB||this.webkitIndexedDB||this.mozIndexedDB||this.OIndexedDB||this.msIndexedDB;if(d){var h={_driver:"asyncStorage",_initStorage:e,getItem:r,setItem:n,removeItem:t,clear:o,length:i,key:u,keys:a};"function"==typeof define&&define.amd?define("asyncStorage",function(){return h}):"undefined"!=typeof module&&module.exports?module.exports=h:this.asyncStorage=h}}.call(this),function(){"use strict";function e(e){if(e)for(var r in e)d[r]=e[r];return l=d.name+"/",h.resolve()}function r(e){var r=this;return new h(function(n,t){r.ready().then(function(){y.clear(),e&&e(),n()},t)})}function n(e,r){var n=this;return new h(function(t,o){n.ready().then(function(){try{var n=y.getItem(l+e);n&&(n=a(n)),r&&r(n),t(n)}catch(i){r&&r(null,i),o(i)}},o)})}function t(e,r){var n=this;return new h(function(t,o){n.ready().then(function(){var n;try{n=y.key(e)}catch(o){n=null}n&&(n=n.substring(l.length)),r&&r(n),t(n)},o)})}function o(e){var r=this;return new h(function(n,t){r.ready().then(function(){for(var r=y.length,t=[],o=0;r>o;o++)t.push(y.key(o).substring(l.length));e&&e(t),n(t)},t)})}function i(e){var r=this;return new h(function(n,t){r.ready().then(function(){var r=y.length;e&&e(r),n(r)},t)})}function u(e,r){var n=this;return new h(function(t,o){n.ready().then(function(){y.removeItem(l+e),r&&r(),t()},o)})}function a(e){if(e.substring(0,m)!==p)return JSON.parse(e);for(var r=e.substring(N),n=e.substring(m,N),t=new ArrayBuffer(2*r.length),o=new Uint16Array(t),i=r.length-1;i>=0;i--)o[i]=r.charCodeAt(i);switch(n){case g:return t;case w:return new Blob([t]);case b:return new Int8Array(t);case S:return new Uint8Array(t);case E:return new Uint8ClampedArray(t);case A:return new Int16Array(t);case I:return new Uint16Array(t);case _:return new Int32Array(t);case x:return new Uint32Array(t);case O:return new Float32Array(t);case j:return new Float64Array(t);default:throw new Error("Unkown type: "+n)}}function c(e){var r="",n=new Uint16Array(e);try{r=String.fromCharCode.apply(null,n)}catch(t){for(var o=0;o<n.length;o++)r+=String.fromCharCode(n[o])}return r}function s(e,r){var n="";if(e&&(n=e.toString()),e&&("[object ArrayBuffer]"===e.toString()||e.buffer&&"[object ArrayBuffer]"===e.buffer.toString())){var t,o=p;e instanceof ArrayBuffer?(t=e,o+=g):(t=e.buffer,"[object Int8Array]"===n?o+=b:"[object Uint8Array]"===n?o+=S:"[object Uint8ClampedArray]"===n?o+=E:"[object Int16Array]"===n?o+=A:"[object Uint16Array]"===n?o+=I:"[object Int32Array]"===n?o+=_:"[object Uint32Array]"===n?o+=x:"[object Float32Array]"===n?o+=O:"[object Float64Array]"===n?o+=j:r(new Error("Failed to get type for BinaryArray"))),r(o+c(t))}else if("[object Blob]"===n){var i=new FileReader;i.onload=function(){var e=c(this.result);r(p+w+e)},i.readAsArrayBuffer(e)}else try{r(JSON.stringify(e))}catch(u){this.console&&this.console.error&&this.console.error("Couldn't convert value into a JSON string: ",e),r(null,u)}}function f(e,r,n){var t=this;return new h(function(o,i){t.ready().then(function(){void 0===r&&(r=null);var t=r;s(r,function(r,u){if(u)n&&n(null,u),i(u);else{try{y.setItem(l+e,r)}catch(a){("QuotaExceededError"===a.name||"NS_ERROR_DOM_QUOTA_REACHED"===a.name)&&(n&&n(null,a),i(a))}n&&n(t),o(t)}})},i)})}var l="",d={},h="undefined"!=typeof module&&module.exports?require("promise"):this.Promise,y=null;try{if(!(this.localStorage&&"setItem"in this.localStorage))return;y=this.localStorage}catch(v){return}var p="__lfsc__:",m=p.length,g="arbf",w="blob",b="si08",S="ui08",E="uic8",A="si16",_="si32",I="ur16",x="ui32",O="fl32",j="fl64",N=m+g.length,D={_driver:"localStorageWrapper",_initStorage:e,getItem:n,setItem:f,removeItem:u,clear:r,length:i,key:t,keys:o};"function"==typeof define&&define.amd?define("localStorageWrapper",function(){return D}):"undefined"!=typeof module&&module.exports?module.exports=D:this.localStorageWrapper=D}.call(this),function(){"use strict";function e(e){var r=this;if(e)for(var n in e)v[n]="string"!=typeof e[n]?e[n].toString():e[n];return new d(function(e,n){try{y=h(v.name,v.version,v.description,v.size)}catch(t){return r.setDriver("localStorageWrapper").then(e,n)}y.transaction(function(r){r.executeSql("CREATE TABLE IF NOT EXISTS "+v.storeName+" (id INTEGER PRIMARY KEY, key unique, value)",[],function(){e()},function(e,r){n(r)})})})}function r(e,r){var n=this;return new d(function(t,o){n.ready().then(function(){y.transaction(function(n){n.executeSql("SELECT * FROM "+v.storeName+" WHERE key = ? LIMIT 1",[e],function(e,n){var o=n.rows.length?n.rows.item(0).value:null;o&&(o=s(o)),r&&r(o),t(o)},function(e,n){r&&r(null,n),o(n)})})},o)})}function n(e,r,n){var t=this;return new d(function(o,i){t.ready().then(function(){void 0===r&&(r=null);var t=r;f(r,function(r,u){u?i(u):y.transaction(function(u){u.executeSql("INSERT OR REPLACE INTO "+v.storeName+" (key, value) VALUES (?, ?)",[e,r],function(){n&&n(t),o(t)},function(e,r){n&&n(null,r),i(r)})},function(e){e.code===e.QUOTA_ERR&&(n&&n(null,e),i(e))})})},i)})}function t(e,r){var n=this;return new d(function(t,o){n.ready().then(function(){y.transaction(function(n){n.executeSql("DELETE FROM "+v.storeName+" WHERE key = ?",[e],function(){r&&r(),t()},function(e,n){r&&r(n),o(n)})})},o)})}function o(e){var r=this;return new d(function(n,t){r.ready().then(function(){y.transaction(function(r){r.executeSql("DELETE FROM "+v.storeName,[],function(){e&&e(),n()},function(r,n){e&&e(n),t(n)})})},t)})}function i(e){var r=this;return new d(function(n,t){r.ready().then(function(){y.transaction(function(r){r.executeSql("SELECT COUNT(key) as c FROM "+v.storeName,[],function(r,t){var o=t.rows.item(0).c;e&&e(o),n(o)},function(r,n){e&&e(null,n),t(n)})})},t)})}function u(e,r){var n=this;return new d(function(t,o){n.ready().then(function(){y.transaction(function(n){n.executeSql("SELECT key FROM "+v.storeName+" WHERE id = ? LIMIT 1",[e+1],function(e,n){var o=n.rows.length?n.rows.item(0).key:null;r&&r(o),t(o)},function(e,n){r&&r(null,n),o(n)})})},o)})}function a(e){var r=this;return new d(function(n,t){r.ready().then(function(){y.transaction(function(r){r.executeSql("SELECT key FROM "+v.storeName,[],function(r,t){for(var o=t.rows.length,i=[],u=0;o>u;u++)i.push(t.rows.item(u).key);e&&e(i),n(i)},function(r,n){e&&e(null,n),t(n)})})},t)})}function c(e){var r,n=new Uint8Array(e),t="";for(r=0;r<n.length;r+=3)t+=l[n[r]>>2],t+=l[(3&n[r])<<4|n[r+1]>>4],t+=l[(15&n[r+1])<<2|n[r+2]>>6],t+=l[63&n[r+2]];return n.length%3===2?t=t.substring(0,t.length-1)+"=":n.length%3===1&&(t=t.substring(0,t.length-2)+"=="),t}function s(e){if(e.substring(0,m)!==p)return JSON.parse(e);var r,n,t,o,i,u=e.substring(N),a=e.substring(m,N),c=.75*u.length,s=u.length,f=0;"="===u[u.length-1]&&(c--,"="===u[u.length-2]&&c--);var d=new ArrayBuffer(c),h=new Uint8Array(d);for(r=0;s>r;r+=4)n=l.indexOf(u[r]),t=l.indexOf(u[r+1]),o=l.indexOf(u[r+2]),i=l.indexOf(u[r+3]),h[f++]=n<<2|t>>4,h[f++]=(15&t)<<4|o>>2,h[f++]=(3&o)<<6|63&i;switch(a){case g:return d;case w:return new Blob([d]);case b:return new Int8Array(d);case S:return new Uint8Array(d);case E:return new Uint8ClampedArray(d);case A:return new Int16Array(d);case I:return new Uint16Array(d);case _:return new Int32Array(d);case x:return new Uint32Array(d);case O:return new Float32Array(d);case j:return new Float64Array(d);default:throw new Error("Unkown type: "+a)}}function f(e,r){var n="";if(e&&(n=e.toString()),e&&("[object ArrayBuffer]"===e.toString()||e.buffer&&"[object ArrayBuffer]"===e.buffer.toString())){var t,o=p;e instanceof ArrayBuffer?(t=e,o+=g):(t=e.buffer,"[object Int8Array]"===n?o+=b:"[object Uint8Array]"===n?o+=S:"[object Uint8ClampedArray]"===n?o+=E:"[object Int16Array]"===n?o+=A:"[object Uint16Array]"===n?o+=I:"[object Int32Array]"===n?o+=_:"[object Uint32Array]"===n?o+=x:"[object Float32Array]"===n?o+=O:"[object Float64Array]"===n?o+=j:r(new Error("Failed to get type for BinaryArray"))),r(o+c(t))}else if("[object Blob]"===n){var i=new FileReader;i.onload=function(){var e=c(this.result);r(p+w+e)},i.readAsArrayBuffer(e)}else try{r(JSON.stringify(e))}catch(u){this.console&&this.console.error&&this.console.error("Couldn't convert value into a JSON string: ",e),r(null,u)}}var l="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",d="undefined"!=typeof module&&module.exports?require("promise"):this.Promise,h=this.openDatabase,y=null,v={},p="__lfsc__:",m=p.length,g="arbf",w="blob",b="si08",S="ui08",E="uic8",A="si16",_="si32",I="ur16",x="ui32",O="fl32",j="fl64",N=m+g.length;if(h){var D={_driver:"webSQLStorage",_initStorage:e,getItem:r,setItem:n,removeItem:t,clear:o,length:i,key:u,keys:a};"function"==typeof define&&define.amd?define("webSQLStorage",function(){return D}):"undefined"!=typeof module&&module.exports?module.exports=D:this.webSQLStorage=D}}.call(this),function(){"use strict";function e(e){s[e]=function(){var r=arguments;return s.ready().then(function(){return s[e].apply(s,r)})}}var r="undefined"!=typeof module&&module.exports?require("promise"):this.Promise,n={INDEXEDDB:"asyncStorage",LOCALSTORAGE:"localStorageWrapper",WEBSQL:"webSQLStorage"},t=[n.INDEXEDDB,n.WEBSQL,n.LOCALSTORAGE],o=["clear","getItem","key","keys","length","removeItem","setItem"],i={DEFINE:1,EXPORT:2,WINDOW:3},u=i.WINDOW;"function"==typeof define&&define.amd?u=i.DEFINE:"undefined"!=typeof module&&module.exports&&(u=i.EXPORT);for(var a=function(e){var r=r||e.indexedDB||e.webkitIndexedDB||e.mozIndexedDB||e.OIndexedDB||e.msIndexedDB,t={};return t[n.WEBSQL]=!!e.openDatabase,t[n.INDEXEDDB]=!(!r||"function"!=typeof r.open||null!==r.open("_localforage_spec_test",1).onupgradeneeded),t[n.LOCALSTORAGE]=!!function(){try{return localStorage&&"function"==typeof localStorage.setItem}catch(e){return!1}}(),t}(this),c=this,s={INDEXEDDB:n.INDEXEDDB,LOCALSTORAGE:n.LOCALSTORAGE,WEBSQL:n.WEBSQL,_config:{description:"",name:"localforage",size:4980736,storeName:"keyvaluepairs",version:1},_driverSet:null,_ready:!1,config:function(e){if("object"==typeof e){if(this._ready)return new Error("Can't call config() after localforage has been used.");for(var r in e)this._config[r]=e[r];return!0}return"string"==typeof e?this._config[e]:this._config},driver:function(){return this._driver||null},ready:function(e){var n=new r(function(e,r){s._driverSet.then(function(){null===s._ready&&(s._ready=s._initStorage(s._config)),s._ready.then(e,r)},r)});return n.then(e,e),n},setDriver:function(e,n,t){var o=this;return"string"==typeof e&&(e=[e]),this._driverSet=new r(function(a,s){var f=o._getFirstSupportedDriver(e);if(!f){var l=new Error("No available storage method found.");return o._driverSet=r.reject(l),t&&t(l),void s(l)}if(o._ready=null,u===i.DEFINE)return void require([f],function(e){o._extend(e),n&&n(),a()});if(u===i.EXPORT){var d;switch(f){case o.INDEXEDDB:d=require("./drivers/indexeddb");break;case o.LOCALSTORAGE:d=require("./drivers/localstorage");break;case o.WEBSQL:d=require("./drivers/websql")}o._extend(d)}else o._extend(c[f]);n&&n(),a()}),this._driverSet},supports:function(e){return!!a[e]},_extend:function(e){for(var r in e)e.hasOwnProperty(r)&&(this[r]=e[r])},_getFirstSupportedDriver:function(e){var r=Array.isArray||function(e){return"[object Array]"===Object.prototype.toString.call(e)};if(e&&r(e))for(var n=0;n<e.length;n++){var t=e[n];if(this.supports(t))return t}return null}},f=0;f<o.length;f++)e(o[f]);s.setDriver(t),window.localforage=s}.call(this);
// spin
!function(t,i){t.Spinner=i()}(this,function(){"use strict";function t(t,i){var e,o=document.createElement(t||"div");for(e in i)o[e]=i[e];return o}function i(t){for(var i=1,e=arguments.length;e>i;i++)t.appendChild(arguments[i]);return t}function e(t,i,e,o){var n=["opacity",i,~~(100*t),e,o].join("-"),r=.01+e/o*100,s=Math.max(1-(1-t)/i*(100-r),t),a=c.substring(0,c.indexOf("Animation")).toLowerCase(),l=a&&"-"+a+"-"||"";return u[n]||(p.insertRule("@"+l+"keyframes "+n+"{0%{opacity:"+s+"}"+r+"%{opacity:"+t+"}"+(r+.01)+"%{opacity:1}"+(r+i)%100+"%{opacity:"+t+"}100%{opacity:"+s+"}}",p.cssRules.length),u[n]=1),n}function o(t,i){var e,o,n=t.style;for(i=i.charAt(0).toUpperCase()+i.slice(1),o=0;o<d.length;o++)if(e=d[o]+i,void 0!==n[e])return e;return void 0!==n[i]?i:void 0}function n(t,i){for(var e in i)t.style[o(t,e)||e]=i[e];return t}function r(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var o in e)void 0===t[o]&&(t[o]=e[o])}return t}function s(t,i){return"string"==typeof t?t:t[i%t.length]}function a(t){this.opts=r(t||{},a.defaults,f)}function l(){function e(i,e){return t("<"+i+' xmlns="urn:schemas-microsoft.com:vml" class="spin-vml">',e)}p.addRule(".spin-vml","behavior:url(#default#VML)"),a.prototype.lines=function(t,o){function r(){return n(e("group",{coordsize:d+" "+d,coordorigin:-c+" "+-c}),{width:d,height:d})}function a(t,a,l){i(p,i(n(r(),{rotation:360/o.lines*t+"deg",left:~~a}),i(n(e("roundrect",{arcsize:o.corners}),{width:c,height:o.width,left:o.radius,top:-o.width>>1,filter:l}),e("fill",{color:s(o.color,t),opacity:o.opacity}),e("stroke",{opacity:0}))))}var l,c=o.length+o.width,d=2*c,u=2*-(o.width+o.length)+"px",p=n(r(),{position:"absolute",top:u,left:u});if(o.shadow)for(l=1;l<=o.lines;l++)a(l,-2,"progid:DXImageTransform.Microsoft.Blur(pixelradius=2,makeshadow=1,shadowopacity=.3)");for(l=1;l<=o.lines;l++)a(l);return i(t,p)},a.prototype.opacity=function(t,i,e,o){var n=t.firstChild;o=o.shadow&&o.lines||0,n&&i+o<n.childNodes.length&&(n=n.childNodes[i+o],n=n&&n.firstChild,n=n&&n.firstChild,n&&(n.opacity=e))}}var c,d=["webkit","Moz","ms","O"],u={},p=function(){var e=t("style",{type:"text/css"});return i(document.getElementsByTagName("head")[0],e),e.sheet||e.styleSheet}(),f={lines:12,length:7,width:5,radius:10,rotate:0,corners:1,color:"#000",direction:1,speed:1,trail:100,opacity:.25,fps:20,zIndex:2e9,className:"spinner",top:"50%",left:"50%",position:"absolute"};a.defaults={},r(a.prototype,{spin:function(i){this.stop();{var e=this,o=e.opts,r=e.el=n(t(0,{className:o.className}),{position:o.position,width:0,zIndex:o.zIndex});o.radius+o.length+o.width}if(n(r,{left:o.left,top:o.top}),i&&i.insertBefore(r,i.firstChild||null),r.setAttribute("role","progressbar"),e.lines(r,e.opts),!c){var s,a=0,l=(o.lines-1)*(1-o.direction)/2,d=o.fps,u=d/o.speed,p=(1-o.opacity)/(u*o.trail/100),f=u/o.lines;!function h(){a++;for(var t=0;t<o.lines;t++)s=Math.max(1-(a+(o.lines-t)*f)%u*p,o.opacity),e.opacity(r,t*o.direction+l,s,o);e.timeout=e.el&&setTimeout(h,~~(1e3/d))}()}return e},stop:function(){var t=this.el;return t&&(clearTimeout(this.timeout),t.parentNode&&t.parentNode.removeChild(t),this.el=void 0),this},lines:function(o,r){function a(i,e){return n(t(),{position:"absolute",width:r.length+r.width+"px",height:r.width+"px",background:i,boxShadow:e,transformOrigin:"left",transform:"rotate("+~~(360/r.lines*d+r.rotate)+"deg) translate("+r.radius+"px,0)",borderRadius:(r.corners*r.width>>1)+"px"})}for(var l,d=0,u=(r.lines-1)*(1-r.direction)/2;d<r.lines;d++)l=n(t(),{position:"absolute",top:1+~(r.width/2)+"px",transform:r.hwaccel?"translate3d(0,0,0)":"",opacity:r.opacity,animation:c&&e(r.opacity,r.trail,u+d*r.direction,r.lines)+" "+1/r.speed+"s linear infinite"}),r.shadow&&i(l,n(a("#000","0 0 4px #000"),{top:"2px"})),i(o,i(l,a(s(r.color,d),"0 0 1px rgba(0,0,0,.1)")));return o},opacity:function(t,i,e){i<t.childNodes.length&&(t.childNodes[i].style.opacity=e)}});var h=n(t("group"),{behavior:"url(#default#VML)"});return!o(h,"transform")&&h.adj?l():c=o(h,"animation"),a});

(function($, window, document, undefined) {

  // sprintf
  var sprintf=(function(){function a(d){return Object.prototype.toString.call(d).slice(8,-1).toLowerCase()}function b(e,f){for(var d=[];f>0;d[--f]=e){}return d.join("")}var c=function(){if(!c.cache.hasOwnProperty(arguments[0])){c.cache[arguments[0]]=c.parse(arguments[0])}return c.format.call(null,c.cache[arguments[0]],arguments)};c.format=function(m,l){var q=1,o=m.length,g="",r,d=[],h,f,j,e,n,p;for(h=0;h<o;h++){g=a(m[h]);if(g==="string"){d.push(m[h])}else{if(g==="array"){j=m[h];if(j[2]){r=l[q];for(f=0;f<j[2].length;f++){if(!r.hasOwnProperty(j[2][f])){throw (sprintf('[sprintf] property "%s" does not exist',j[2][f]))}r=r[j[2][f]]}}else{if(j[1]){r=l[j[1]]}else{r=l[q++]}}if(/[^s]/.test(j[8])&&(a(r)!="number")){throw (sprintf("[sprintf] expecting number but found %s",a(r)))}switch(j[8]){case"b":r=r.toString(2);break;case"c":r=String.fromCharCode(r);break;case"d":r=parseInt(r,10);break;case"e":r=j[7]?r.toExponential(j[7]):r.toExponential();break;case"f":r=j[7]?parseFloat(r).toFixed(j[7]):parseFloat(r);break;case"o":r=r.toString(8);break;case"s":r=((r=String(r))&&j[7]?r.substring(0,j[7]):r);break;case"u":r=Math.abs(r);break;case"x":r=r.toString(16);break;case"X":r=r.toString(16).toUpperCase();break}r=(/[def]/.test(j[8])&&j[3]&&r>=0?"+"+r:r);n=j[4]?j[4]=="0"?"0":j[4].charAt(1):" ";p=j[6]-String(r).length;e=j[6]?b(n,p):"";d.push(j[5]?r+e:e+r)}}}return d.join("")};c.cache={};c.parse=function(d){var g=d,h=[],j=[],i=0;while(g){if((h=/^[^\x25]+/.exec(g))!==null){j.push(h[0])}else{if((h=/^\x25{2}/.exec(g))!==null){j.push("%")}else{if((h=/^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(g))!==null){if(h[2]){i|=1;var k=[],f=h[2],e=[];if((e=/^([a-z_][a-z_\d]*)/i.exec(f))!==null){k.push(e[1]);while((f=f.substring(e[0].length))!==""){if((e=/^\.([a-z_][a-z_\d]*)/i.exec(f))!==null){k.push(e[1])}else{if((e=/^\[(\d+)\]/.exec(f))!==null){k.push(e[1])}else{throw ("[sprintf] huh?")}}}}else{throw ("[sprintf] huh?")}h[2]=k}else{i|=2}if(i===3){throw ("[sprintf] mixing positional and named placeholders is not (yet) supported")}j.push(h)}else{throw ("[sprintf] huh?")}}}g=g.substring(h[0].length)}return j};return c})();var vsprintf=function(b,a){console.log(a);console.log(b);a.unshift(b);return sprintf.apply(null,a)};
  // xml to object
  function xml2Obj(f){var b="";if(f.attributes&&f.attributes.length>0){var e;b={};b["@attributes"]={};for(var d=0;d<f.attributes.length;d++){e=f.attributes.item(d);b["@attributes"][e.nodeName]=e.nodeValue}}if(f.hasChildNodes()){var c,h,g;if(b===""){b={}}for(var a=0;a<f.childNodes.length;a++){g=f.childNodes.item(a);if((g.nodeType&7)===1){c=g.nodeName;h=xml2Obj(g);if(b.hasOwnProperty(c)){if(b[c].constructor!==Array){b[c]=[b[c]]}b[c].push(h)}else{b[c]=h}}else{if((g.nodeType-1|1)===3){c="@content";h=g.nodeType===3?g.nodeValue.replace(/^\s+|\s+$/g,""):g.nodeValue;if(b.hasOwnProperty(c)){b[c]+=h}else{if(g.nodeType===4||h!==""){b=h}}}}}}return(b)};
  // XDR for IE9
  if ( window.XDomainRequest ) {
    $.ajaxTransport(function( s ) {
      if ( s.crossDomain && s.async ) {
        if ( s.timeout ) {
          s.xdrTimeout = s.timeout;
          delete s.timeout;
        }
        var xdr;
        return {
          send: function( _, complete ) {
            function callback( status, statusText, responses, responseHeaders ) {
              xdr.onload = xdr.onerror = xdr.ontimeout = $.noop;
              xdr = undefined;
              complete( status, statusText, responses, responseHeaders );
            }
            xdr = new XDomainRequest();

            if(s.dataType){
                var headerThroughUriParameters = "header_Accept=" + encodeURIComponent(s.dataType);
                s.url = s.url + (s.url.indexOf("?") === -1 ? "?" : "&" ) + headerThroughUriParameters;
            }
            xdr.open( s.type, s.url );
            xdr.onload = function(e1, e2) {
              callback( 200, "OK", { text: xdr.responseText }, "Content-Type: " + xdr.contentType );
            };
            xdr.onerror = function(e) {
                console.error(JSON.stringify(e));
              callback( 404, "Not Found" );
            };
            if ( s.xdrTimeout ) {
              xdr.ontimeout = function() {
                callback( 0, "timeout" );
              };
              xdr.timeout = s.xdrTimeout;
            }
            xdr.send( ( s.hasContent && s.data ) || null );
          },
          abort: function() {
            if ( xdr ) {
              xdr.onerror = $.noop();
              xdr.abort();
            }
          }
        };
      }
    });
  }
  var obj,
      location,
      map,
      geocoder = new google.maps.Geocoder(),
      tmpls = { request: '<?xml version="1.0" encoding="UTF-8"?><Request xmlns="http://sw.horizonhobby.com/DealerServices/Schemas/DealerService_XPCIDocument_1_0_2.xsd" xmlns:mstns="http://sw.horizonhobby.com/DealerServices/Schemas/DealerService_XPCIDocument_1_0_2.xsd" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:codegen="urn:schemas-microsoft-com:xml-msprop" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://sw.horizonhobby.com/DealerServices/Schemas/DealerService_XPCIDocument_1_0_2.xsd C:\DealerService_XPCIDocument_1_0_2.xsd"><TransactionReference><AccessRequest><AccessLicenseNumber>584a5e41-7fa8-4cff-b4bd-2a8197581e47</AccessLicenseNumber><UserId>visualdevelopers@horizonhobby.com</UserId><Password>B34uyg3484gK</Password></AccessRequest><XpciVersion>1.0.2</XpciVersion></TransactionReference>%(RequestParams)s</Request>',
        params: {
          postal_code: '<GetDealersRequest><PostalCodeRadiusSearch><PostalCode>%(PostalCode)s</PostalCode><WithInRadius>%(WithInRadius)s</WithInRadius><OnlineStoresOnly>%(OnlineStoresOnly)s</OnlineStoresOnly><HCPDealersOnly>%(HCPDealersOnly)s</HCPDealersOnly><IncludeBrandSalesInfo>%(IncludeBrandSalesInfo)s</IncludeBrandSalesInfo><BrandCode>%(BrandCode)s</BrandCode></PostalCodeRadiusSearch></GetDealersRequest>',
          us_city: '<GetDealersRequest><USCityStateSearch><City>%(City)s</City><StateAbbr>%(StateAbbr)s</StateAbbr><OnlineStoresOnly>%(OnlineStoresOnly)s</OnlineStoresOnly><HCPDealersOnly>%(HCPDealersOnly)s</HCPDealersOnly><IncludeBrandSalesInfo>%(IncludeBrandSalesInfo)s</IncludeBrandSalesInfo><BrandCode>%(BrandCode)s</BrandCode></USCityStateSearch></GetDealersRequest>',
          int_city: '<GetDealersRequest><InternationalSearch><Country>%(Country)s</Country><OnlineStoresOnly>%(OnlineStoresOnly)s</OnlineStoresOnly><HCPDealersOnly>%(HCPDealersOnly)s</HCPDealersOnly><IncludeBrandSalesInfo>%(IncludeBrandSalesInfo)s</IncludeBrandSalesInfo><BrandCode>%(BrandCode)s</BrandCode></InternationalSearch></GetDealersRequest>',
          ltln_radius: '<GetDealersRequest><LatLngRadiusSearch><Lat>%(Lat)s</Lat><Lng>%(Lng)s</Lng><WithInRadius>%(WithInRadius)s</WithInRadius><OnlineStoresOnly>%(OnlineStoresOnly)s</OnlineStoresOnly><HCPDealersOnly>%(HCPDealersOnly)s</HCPDealersOnly><IncludeBrandSalesInfo>%(IncludeBrandSalesInfo)s</IncludeBrandSalesInfo><BrandCode>%(BrandCode)s</BrandCode></LatLngRadiusSearch></GetDealersRequest>',
          country_list: '<GetInternationalCountryListRequest><BrandCode>%(BrandCode)s</BrandCode></GetInternationalCountryListRequest>',
          dealer_profile: '<GetDealerProfileRequest><DealerGUID>%(DealerGUID)s</DealerGUID></GetDealerProfileRequest>'
        },
        info: {
          us_address: '<p>%(AddressLine1)s<br />%(AddressLine2)s%(City)s, %(StateAbbr)s %(PostalCode)s %(CountryCode)s<br />%(Phone1)s</p>',
          int_address: '<p>%(AddressLine1)s<br />%(AddressLine2)s%(City)s, %(PostalCode)s %(CountryCode)s<br />%(Phone1)s</p>',
          dir: '<a target="_new" href="http://maps.google.com/maps?daddr=%(AddressLine1)s %(AddressLine2)s,+%(City)s,+%(StateAbbr)s+%(PostalCode)s">Get Directions</a>',
          hcp_info: '<dl class="tabs" data-tab><dd class="active"><a href="#locator-info-1">Store Info</a></dd><dd><a href="#locator-info-2">Store Hours</a></dd><dd><a href="#locator-info-3">Brands We Carry</a></dd></dl><div style="height: 270px; width: 334px;"><div class="tabs-content"><div class="content active" id="locator-info-1">%(image)s<h6>%(title)s</h6>%(address)s %(distance)s %(dir)s</div><div class="content" id="locator-info-2">%(hours)s%(tour)s</div><div class="content" id="locator-info-3">%(brands)s</div></div></div>',
          gen_info: '<div style="height: 304px; width: 222px;"><img style="float: right;" src="%(icon)s"/><h6>%(title)s</h6>%(address)s %(email)s %(brands_head)s %(brands)s<br>%(distance)s %(dir)s</div>',
          hours: '<table><tr><td>Monday: </td><td>%(mon)s</td></tr><tr><td>Truesday: </td><td>%(tues)s</td></tr><tr><td>Wednesday: </td><td>%(wed)s</td></tr><tr><td>Thursday: </td><td>%(thurs)s</td></tr><tr><td>Friday: </td><td>%(fri)s</td></tr><tr><td>Saturday: </td><td>%(sat)s</td></tr><tr><td>Sunday: </td><td>%(sun)s</td></tr></table>'
        }
      };

  if (navigator.geolocation) {
    $('.locate-me').show();
  }
  $('.locate-me').on('click', function(e) {
    var el = this,
        locator = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6MzQ0NkE5N0IwMUMxMTFFMkJCOEJBNDIyMkI0RDBBMDMiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6MzQ0NkE5N0MwMUMxMTFFMkJCOEJBNDIyMkI0RDBBMDMiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDozNDQ2QTk3OTAxQzExMUUyQkI4QkE0MjIyQjREMEEwMyIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDozNDQ2QTk3QTAxQzExMUUyQkI4QkE0MjIyQjREMEEwMyIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Ph9/KSIAAAE4SURBVHjaXNI/KIVRGMdxXpLyp/wJA4MYTGSQ3FJEyJ8ki5Hh3m4Go3uVojeDlNXfwUBSMlAmgyJGShnJpgyoGync7vep36nT+9Tnfc953/Oc87znvPlhGOYpijGKJGJ6VoA7bOMEGXsY6GUFNnGMFlzjBZdowJ7UuaQirGMaRxjDIA4wpL61J7GFkkIufZjBORKuBKJa93vEYWOnLDlQwgdWvQSLG6/9gxW8YtaSuvCkGf04jfQf8YB2W7Icv5jXDt6q1Bq8YUS7aVXU49+S3mUNX97MlvCnFd2q3WgKNHMzOiLljEf6rWiz8Za0qxIXdF4uYl67DMuoxYYlXemcBnCIfg2ybyhFr85pAvs4s2/KYkn1p9GJZ1RpExrV3kHKNs39Rt9YRI92rlLst7nAMObwaYNzAgwA9whD/Cq6ETwAAAAASUVORK5CYII=',
        loading = 'data:image/gif;base64,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',
        valid = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAYAAABy6+R8AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyJpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMC1jMDYxIDY0LjE0MDk0OSwgMjAxMC8xMi8wNy0xMDo1NzowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNS4xIFdpbmRvd3MiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDBGQUMzMUEwMUMyMTFFMkI3MERBMDU3MzM1RTZFNzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDBGQUMzMUIwMUMyMTFFMkI3MERBMDU3MzM1RTZFNzkiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpEMEZBQzMxODAxQzIxMUUyQjcwREEwNTczMzVFNkU3OSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDpEMEZBQzMxOTAxQzIxMUUyQjcwREEwNTczMzVFNkU3OSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PtXaIbIAAADZSURBVHjaYvz//z8DqYCFGEW7b7XKAakuIJ7sqlZ9lJGQTUANTEBqEhBnA/EuII5nIULDZCDOggq5AXEkE5ICUQIaQGApEM9mgiooBFJngbQ3lM8IpKagaVgGxAlAP31h3HWzJRXImQWV+ArEUUBsD8RFSBqWg/wC1PAbFnpPgPgzEPMCMTcQb0Tz2nKoDb9hAkxAznYgHQzEH7GEBUhDIlDNL2RBsJ+AgruBVCiaxmVQDT/RTUKJJ2AAuEJN3w110k+scQHShIyBAZMCxFro4siYkZy0BxBgAMmWb+z4zos1AAAAAElFTkSuQmCC';
    el.src = loading;
    navigator.geolocation.getCurrentPosition(function(res) {
      var latlng = new google.maps.LatLng(res.coords.latitude, res.coords.longitude);
      geocoder.geocode({
        'latLng' : latlng
      }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          //console.log(results);
          el.src = valid;
          $('#locator-address').val(results[0].formatted_address);
          location = results[0];
        } else {
          $('#locator-address').attr({invalid: true}).val("Geocode was not successful for the following reason: " + status);
        }
      });
    }, function(msg) {
      //console.log(msg);
      el.src = locator;
      $('#locator-address').attr({invalid: true}).val("Sorry, we could not locate you.");
    });
  })

  $('.locator-form').on('submit', function(e) {
    obj = {};
    e.preventDefault();
    if ($('#locator-address').val() == '') {
      alert('please enter address')
    } else {
        if(typeof location === 'object' && location.formatted_address === $('#locator-address').val()){
          sendXML(location);
        }else{
          geocoder.geocode({
            'address' : $('#locator-address').val()
          }, function(results, status) {
            if (status == google.maps.GeocoderStatus.OK) {
              //console.log('results', results)
              $(results[0].address_components).each(function() {
                results[0][this.types[0]] = this.short_name || this.long_name;
              });

              if(!results[0].postal_code){
                //console.log('no postal code, re-geocoding based on lat/lng', results[0])
                var latlng = new google.maps.LatLng(results[0].geometry.location.lat(), results[0].geometry.location.lng());
                geocoder.geocode({
                  'latLng' : latlng
                }, function(res, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                    //console.log('results: ', res)
                    sendXML(res[0])
                  } else {
                    alert("Geocode was not successful for the following reason: " + status);
                  }
                });
              } else {
                sendXML(results[0])
              }
            } else {
              alert("Geocode was not successful for the following reason: " + status);
            }
        });
      }
    }
  });

  $('.locator-int-form').on('submit', function(e) {
    obj = {};
    e.preventDefault();
    geocoder.geocode({
      'address' : $('#locator-country').val(),
      'region' : $('#locator-country').val(),
      componentRestrictions : {
        country : $('#locator-country').val()
      }
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        results[0]['International'] = true;
        sendXML(results[0]);
        //console.log('results: ', results[0])
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  });

  (function getCountries() {
    localforage.getItem('CountryListTimeStamp', function(data) {
      if (data) {
        var now = Math.round(new Date().getTime() / 1000);
        if ((now - (data)) >= 86400) {
          //console.log('time to make the doughnuts')
          getFreshCountries()
        } else {
          //console.log('doughnuts are still fresh')
          localforage.getItem('CountryList', function(data) {
            if (data) {
              $(data).each(function() {
                $('#locator-country').append($('<option />').val(this.CountryCode).text(this.CountryName));
              });
            } else {
              getFreshCountries();
            }
          });
        }
      } else {
        getFreshCountries();
      }
    });
  }()) // self executing


  function getFreshCountries(){
    var o = {
      BrandCode: 'HORIZON'
    }
    o['RequestParams'] = sprintf(tmpls.params.country_list, o);
    //$.support.cors = true;
    $.ajax({
      url : serviceUrl,
      processData : false,
      crossDomain : true,
      type : "POST",
      data : sprintf(tmpls.request, o),
      success : function(x,y,z) {
        var data = xml2Obj((new DOMParser()).parseFromString(z.responseText, "text/xml"));
        data = data.Response.GetInternationalCountryListResponse.Country;
        localforage.setItem('CountryListTimeStamp', Math.round(new Date().getTime() / 1000));
        localforage.setItem('CountryList', data, function(){
          $(data).each(function(){
            $('#locator-country').append($('<option />').val(this.CountryCode).text(this.CountryName));
          });
        });
        //console.log(data);
      },
      error : function(err) {
        console.log('getFreshCountries error: ', err.statusText);
      }
    });
  }

  function sendXML(obj) {
    var opts = {
      lines: 9,
      length: 24,
      width: 10, // The line thickness
      radius: 47, // The radius of the inner circle
      corners: 0.7, // Corner roundness (0..1)
      rotate: 40, // The rotation offset
      direction: 1, // 1: clockwise, -1: counterclockwise
      color: '#83A4B4',
      speed: 0.7, // Rounds per second
      trail: 50, // Afterglow percentage
      shadow: false,
      hwaccel: false, // Whether to use hardware acceleration
      className: 'spinner', // The CSS class to assign to the spinner
      zIndex: 2e9, // The z-index (defaults to 2000000000)
      top: '50%', // Top position relative to parent in px
      left: '50%' // Left position relative to parent in px
    };
    var target = document.querySelector('.tabs-content');
    var spinner = new Spinner(opts).spin(target);
    //console.log(obj);
    // this will make the address_components types available on the first level to test against
    $(obj.address_components).each(function() {
      obj[this.types[0]] = this.short_name || this.long_name;
    })

    $.extend(true, obj, {
      StateAbbr: obj.administrative_area_level_1 || '',
      City: obj.locality || '',
      PostalCode : obj.postal_code || '',
      WithInRadius : $('#locator-radius').val(),
      OnlineStoresOnly : false,
      HCPDealersOnly : $("#locator-hcp").is(':checked') ? true : false,
      IncludeBrandSalesInfo : true,
      BrandCode : $('#locator-brand').val() || '',
      International: obj.International || false,
      Country: obj.country || '',
      Tmpl: tmpls.info.us_address,
      zoom: radiusToZoom($('#locator-radius').val()) || 8,
      Lat: obj.geometry.location.lat(),
      Lng: obj.geometry.location.lng()
    });


    if(obj.International){
      obj.RequestParams = sprintf(tmpls.params.int_city, obj);
      obj.zoom = radiusToZoom(800);
      obj.Tmpl = tmpls.info.int_address
    }else if(obj.PostalCode !== ''){
      obj.RequestParams = sprintf(tmpls.params.ltln_radius, obj);
    } else {
      obj.RequestParams = sprintf(tmpls.params.us_city, obj);
    }


    $.ajax({
      url : serviceUrl,
      processData : false,
      crossDomain : true,
      type : "POST",
      data : sprintf(tmpls.request, obj),
      success : function(x,y,z) {
        var o = [];
        o['pt'] = [];
        o['obj'] = obj;
        var data = xml2Obj((new DOMParser()).parseFromString(z.responseText, "text/xml"));
        data = data.Response.GetDealersResponse.Dealer;
        //console.log('dealers: ', data);
        var i = 1, tls = [], hcpIcon = 'data:image/png;base64,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';
        $(data).each(function() {
          var brands = '';
          if(this.Lat === undefined || this.Lng === undefined || tls.indexOf(this.DealerGUID) > -1)
            return;
          var c = this.IsHCPDealer == 'true' ? 'ffd520' : 'FE7569'; // Marker color
          if(this.DealerBrandSale){
            brands += '<div class="prop-logo">';
            $(this.DealerBrandSale).each(function(){
              if(this.BrandCode === 'XXX' || this.BrandCode === 'AGN') return;
              brands += '<a title="'+this.BrandName+'" href="'+this.WebURL+'" target="_blank"><img src="http://s7d5.scene7.com/is/image/horizonhobby/'+this.BrandCode+'_Logo_Normalized?hei=26"> </a> ' //<span class="'+this.BrandCode+'"></span>
            });
            brands += '</div>';
          }
          this.AddressLine2 = this.AddressLine2 !== '' ? this.AddressLine2 + '<br />' : '';
          o.pt.push({
            id: this.DealerNumber,
            isHCP: this.IsHCPDealer === 'true',
            lat : this.Lat,
            lng : this.Lng,
            title : this.DealerNameTitle,
            brands_head: brands !== '' ? 'Brands we carry:<br />' : '',
            brands: brands,
            address : sprintf(obj.Tmpl, this),
            dir: !obj.International ? sprintf(tmpls.info.dir, this) : '',
            distance: this.Distance ? '<span style="float:right;">' +  parseFloat(this.Distance).toFixed(2) + 'mi.</span>' : '',
            email: (obj.International && this.Email) ? '<p><a href="mailto:' + this.Email + '">Email Us</a></p>' : '', // per Jamie - only international
            link : (false && this.WebURL) ? '<div class="g-link">Visit us <a href="' + this.WebURL + '" target="_blank">here</a></div>' : '', // per Jamie - never show the link
            icon : this.IsHCPDealer == 'true' ? hcpIcon : 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=' + parseInt(i) + '|' + c,
            func: this.IsHCPDealer == 'true' ? 'prepend' : 'append',
            tour: (this.DealerURL && this.DealerURL[0].URLDesc !== '')?'<p class="tour-link"><a href="'+this.DealerURL[0].URLDesc+'">See Our Google Tour</a></p>':'',
            image: (this.DealerURL && this.DealerURL[1].URLDesc !== '')?'<img style="float:right; width: 50%; margin-right: -30px;" src="'+this.DealerURL[1].URLDesc.replace(/ /g, '')+'&wid=160" alt="Store Image" />':'<img style="float:right;" src="'+hcpIcon+'" alt="HCP Icon" />',
            hours: (this.DealerStoreHour && this.DealerStoreHour[0].StoreHourDesc !== '')?sprintf(tmpls.info.hours, {mon: this.DealerStoreHour[0].StoreHourDesc, tues: this.DealerStoreHour[1].StoreHourDesc, wed: this.DealerStoreHour[2].StoreHourDesc, thurs: this.DealerStoreHour[3].StoreHourDesc, fri: this.DealerStoreHour[4].StoreHourDesc, sat: this.DealerStoreHour[5].StoreHourDesc, sun: this.DealerStoreHour[6].StoreHourDesc}):'<p>Call ' + this.Phone1 + ' for Details</p>'
          })

          tls.push(this.DealerGUID);
          i++;
        });
        spinner.stop();
        setMap(o);
      },
      error : function(err) {
        console.log('sendXML error: ', err.statusText);
      }
    });
  }

  function setMap(o) {
    var marker, infowindow = new google.maps.InfoWindow({
      maxWidth : 400
    });

    $('.gmap').fadeIn('slow');
    $('.d-text').hide();
    $('.glist').empty();
    $('html,body').animate({ scrollTop: $('#map-canvas').offset().top },
      {
        duration: 'slow',
        easing: 'swing',
        complete: function () {
        }
      }
    );
    var mapOptions = {
      zoom : o.obj.zoom,
      center : new google.maps.LatLng(o.obj.geometry.location.lat(), o.obj.geometry.location.lng()),
      mapTypeControl: false,
      navigationControlOptions: {
          style: google.maps.NavigationControlStyle.SMALL
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    window.map = map;
    $.each(o.pt, function() {
      //console.log('on map',this)
      var o = this;
      var marker = new google.maps.Marker({
        position : new google.maps.LatLng(o.lat, o.lng),
        animation : google.maps.Animation.DROP,
        map : map,
        title : o.title,
        icon : o.icon,
        html : o.isHCP ? sprintf(tmpls.info.hcp_info, o) : sprintf(tmpls.info.gen_info, o)
      });
      google.maps.event.addListener(marker, 'click', function() {
        if (infowindow)
          infowindow.close();
        infowindow.setContent(this.html);
        infowindow.open(map, this);
        google.maps.event.addListener(infowindow,'closeclick', function(){$('.gdn_highlight').removeClass('gdn_highlight');})
        $('.gdn_highlight').removeClass('gdn_highlight');
        $('.gdn_' + o.id).addClass('gdn_highlight');
        $('#map-canvas').foundation();
      });
      // build our glist
      $('.glist')[o.func]($('<div class="large-3 columns gdn_' + o.id + '">'+ sprintf(tmpls.info.gen_info, o) +'</div>').on('click', function(e){
        if (infowindow)
          infowindow.close();
        infowindow.setContent(marker.html);
        infowindow.open(map, marker);
        $('.gdn_highlight').removeClass('gdn_highlight');
        $(this).addClass('gdn_highlight');
        $('#map-canvas').foundation();
      }))
    });

  }

  function radiusToZoom(radius) {
    return Math.round(14 - Math.log(radius) / Math.LN2);
  }

}(window.jQuery, window, document))

$(document).ready(function(){
  if(location.hash != ''){
    if(location.hash == '#international'){
      $('[href="#locator-panel-2"]').click();
    }else if(location.hash == '#hcp-only'){
      $('#locator-hcp').attr('checked', 'checked');
    }
  }
});
