/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 98869:
/***/ (function(module, exports) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* @license
Papa Parse
v5.5.3
https://github.com/mholt/PapaParse
License: MIT
*/((e,t)=>{ true?!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (t),
		__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
		(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
		__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__)):0;})(this,function r(){var n="undefined"!=typeof self?self:"undefined"!=typeof window?window:void 0!==n?n:{};var d,s=!n.document&&!!n.postMessage,a=n.IS_PAPA_WORKER||!1,o={},h=0,v={};function u(e){this._handle=null,this._finished=!1,this._completed=!1,this._halted=!1,this._input=null,this._baseIndex=0,this._partialLine="",this._rowCount=0,this._start=0,this._nextChunk=null,this.isFirstChunk=!0,this._completeResults={data:[],errors:[],meta:{}},function(e){var t=b(e);t.chunkSize=parseInt(t.chunkSize),e.step||e.chunk||(t.chunkSize=null);this._handle=new i(t),(this._handle.streamer=this)._config=t;}.call(this,e),this.parseChunk=function(t,e){var i=parseInt(this._config.skipFirstNLines)||0;if(this.isFirstChunk&&0<i){let e=this._config.newline;e||(r=this._config.quoteChar||'"',e=this._handle.guessLineEndings(t,r)),t=[...t.split(e).slice(i)].join(e);}this.isFirstChunk&&U(this._config.beforeFirstChunk)&&void 0!==(r=this._config.beforeFirstChunk(t))&&(t=r),this.isFirstChunk=!1,this._halted=!1;var i=this._partialLine+t,r=(this._partialLine="",this._handle.parse(i,this._baseIndex,!this._finished));if(!this._handle.paused()&&!this._handle.aborted()){t=r.meta.cursor,i=(this._finished||(this._partialLine=i.substring(t-this._baseIndex),this._baseIndex=t),r&&r.data&&(this._rowCount+=r.data.length),this._finished||this._config.preview&&this._rowCount>=this._config.preview);if(a)n.postMessage({results:r,workerId:v.WORKER_ID,finished:i});else if(U(this._config.chunk)&&!e){if(this._config.chunk(r,this._handle),this._handle.paused()||this._handle.aborted())return void(this._halted=!0);this._completeResults=r=void 0;}return this._config.step||this._config.chunk||(this._completeResults.data=this._completeResults.data.concat(r.data),this._completeResults.errors=this._completeResults.errors.concat(r.errors),this._completeResults.meta=r.meta),this._completed||!i||!U(this._config.complete)||r&&r.meta.aborted||(this._config.complete(this._completeResults,this._input),this._completed=!0),i||r&&r.meta.paused||this._nextChunk(),r;}this._halted=!0;},this._sendError=function(e){U(this._config.error)?this._config.error(e):a&&this._config.error&&n.postMessage({workerId:v.WORKER_ID,error:e,finished:!1});};}function f(e){var r;(e=e||{}).chunkSize||(e.chunkSize=v.RemoteChunkSize),u.call(this,e),this._nextChunk=s?function(){this._readChunk(),this._chunkLoaded();}:function(){this._readChunk();},this.stream=function(e){this._input=e,this._nextChunk();},this._readChunk=function(){if(this._finished)this._chunkLoaded();else{if(r=new XMLHttpRequest(),this._config.withCredentials&&(r.withCredentials=this._config.withCredentials),s||(r.onload=y(this._chunkLoaded,this),r.onerror=y(this._chunkError,this)),r.open(this._config.downloadRequestBody?"POST":"GET",this._input,!s),this._config.downloadRequestHeaders){var e,t=this._config.downloadRequestHeaders;for(e in t)r.setRequestHeader(e,t[e]);}var i;this._config.chunkSize&&(i=this._start+this._config.chunkSize-1,r.setRequestHeader("Range","bytes="+this._start+"-"+i));try{r.send(this._config.downloadRequestBody);}catch(e){this._chunkError(e.message);}s&&0===r.status&&this._chunkError();}},this._chunkLoaded=function(){4===r.readyState&&(r.status<200||400<=r.status?this._chunkError():(this._start+=this._config.chunkSize||r.responseText.length,this._finished=!this._config.chunkSize||this._start>=(e=>null!==(e=e.getResponseHeader("Content-Range"))?parseInt(e.substring(e.lastIndexOf("/")+1)):-1)(r),this.parseChunk(r.responseText)));},this._chunkError=function(e){e=r.statusText||e;this._sendError(new Error(e));};}function l(e){(e=e||{}).chunkSize||(e.chunkSize=v.LocalChunkSize),u.call(this,e);var i,r,n="undefined"!=typeof FileReader;this.stream=function(e){this._input=e,r=e.slice||e.webkitSlice||e.mozSlice,n?((i=new FileReader()).onload=y(this._chunkLoaded,this),i.onerror=y(this._chunkError,this)):i=new FileReaderSync(),this._nextChunk();},this._nextChunk=function(){this._finished||this._config.preview&&!(this._rowCount<this._config.preview)||this._readChunk();},this._readChunk=function(){var e=this._input,t=(this._config.chunkSize&&(t=Math.min(this._start+this._config.chunkSize,this._input.size),e=r.call(e,this._start,t)),i.readAsText(e,this._config.encoding));n||this._chunkLoaded({target:{result:t}});},this._chunkLoaded=function(e){this._start+=this._config.chunkSize,this._finished=!this._config.chunkSize||this._start>=this._input.size,this.parseChunk(e.target.result);},this._chunkError=function(){this._sendError(i.error);};}function c(e){var i;u.call(this,e=e||{}),this.stream=function(e){return i=e,this._nextChunk();},this._nextChunk=function(){var e,t;if(!this._finished)return e=this._config.chunkSize,i=e?(t=i.substring(0,e),i.substring(e)):(t=i,""),this._finished=!i,this.parseChunk(t);};}function p(e){u.call(this,e=e||{});var t=[],i=!0,r=!1;this.pause=function(){u.prototype.pause.apply(this,arguments),this._input.pause();},this.resume=function(){u.prototype.resume.apply(this,arguments),this._input.resume();},this.stream=function(e){this._input=e,this._input.on("data",this._streamData),this._input.on("end",this._streamEnd),this._input.on("error",this._streamError);},this._checkIsFinished=function(){r&&1===t.length&&(this._finished=!0);},this._nextChunk=function(){this._checkIsFinished(),t.length?this.parseChunk(t.shift()):i=!0;},this._streamData=y(function(e){try{t.push("string"==typeof e?e:e.toString(this._config.encoding)),i&&(i=!1,this._checkIsFinished(),this.parseChunk(t.shift()));}catch(e){this._streamError(e);}},this),this._streamError=y(function(e){this._streamCleanUp(),this._sendError(e);},this),this._streamEnd=y(function(){this._streamCleanUp(),r=!0,this._streamData("");},this),this._streamCleanUp=y(function(){this._input.removeListener("data",this._streamData),this._input.removeListener("end",this._streamEnd),this._input.removeListener("error",this._streamError);},this);}function i(m){var n,s,a,t,o=Math.pow(2,53),h=-o,u=/^\s*-?(\d+\.?|\.\d+|\d+\.\d+)([eE][-+]?\d+)?\s*$/,d=/^((\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d\.\d+([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z))|(\d{4}-[01]\d-[0-3]\dT[0-2]\d:[0-5]\d([+-][0-2]\d:[0-5]\d|Z)))$/,i=this,r=0,f=0,l=!1,e=!1,c=[],p={data:[],errors:[],meta:{}};function y(e){return"greedy"===m.skipEmptyLines?""===e.join("").trim():1===e.length&&0===e[0].length;}function g(){if(p&&a&&(k("Delimiter","UndetectableDelimiter","Unable to auto-detect delimiting character; defaulted to '"+v.DefaultDelimiter+"'"),a=!1),m.skipEmptyLines&&(p.data=p.data.filter(function(e){return!y(e);})),_()){if(p)if(Array.isArray(p.data[0])){for(var e=0;_()&&e<p.data.length;e++)p.data[e].forEach(t);p.data.splice(0,1);}else p.data.forEach(t);function t(e,t){U(m.transformHeader)&&(e=m.transformHeader(e,t)),c.push(e);}}function i(e,t){for(var i=m.header?{}:[],r=0;r<e.length;r++){var n=r,s=e[r],s=((e,t)=>(e=>(m.dynamicTypingFunction&&void 0===m.dynamicTyping[e]&&(m.dynamicTyping[e]=m.dynamicTypingFunction(e)),!0===(m.dynamicTyping[e]||m.dynamicTyping)))(e)?"true"===t||"TRUE"===t||"false"!==t&&"FALSE"!==t&&((e=>{if(u.test(e)){e=parseFloat(e);if(h<e&&e<o)return 1;}})(t)?parseFloat(t):d.test(t)?new Date(t):""===t?null:t):t)(n=m.header?r>=c.length?"__parsed_extra":c[r]:n,s=m.transform?m.transform(s,n):s);"__parsed_extra"===n?(i[n]=i[n]||[],i[n].push(s)):i[n]=s;}return m.header&&(r>c.length?k("FieldMismatch","TooManyFields","Too many fields: expected "+c.length+" fields but parsed "+r,f+t):r<c.length&&k("FieldMismatch","TooFewFields","Too few fields: expected "+c.length+" fields but parsed "+r,f+t)),i;}var r;p&&(m.header||m.dynamicTyping||m.transform)&&(r=1,!p.data.length||Array.isArray(p.data[0])?(p.data=p.data.map(i),r=p.data.length):p.data=i(p.data,0),m.header&&p.meta&&(p.meta.fields=c),f+=r);}function _(){return m.header&&0===c.length;}function k(e,t,i,r){e={type:e,code:t,message:i};void 0!==r&&(e.row=r),p.errors.push(e);}U(m.step)&&(t=m.step,m.step=function(e){p=e,_()?g():(g(),0!==p.data.length&&(r+=e.data.length,m.preview&&r>m.preview?s.abort():(p.data=p.data[0],t(p,i))));}),this.parse=function(e,t,i){var r=m.quoteChar||'"',r=(m.newline||(m.newline=this.guessLineEndings(e,r)),a=!1,m.delimiter?U(m.delimiter)&&(m.delimiter=m.delimiter(e),p.meta.delimiter=m.delimiter):((r=((e,t,i,r,n)=>{var s,a,o,h;n=n||[",","\t","|",";",v.RECORD_SEP,v.UNIT_SEP];for(var u=0;u<n.length;u++){for(var d,f=n[u],l=0,c=0,p=0,g=(o=void 0,new E({comments:r,delimiter:f,newline:t,preview:10}).parse(e)),_=0;_<g.data.length;_++)i&&y(g.data[_])?p++:(d=g.data[_].length,c+=d,void 0===o?o=d:0<d&&(l+=Math.abs(d-o),o=d));0<g.data.length&&(c/=g.data.length-p),(void 0===a||l<=a)&&(void 0===h||h<c)&&1.99<c&&(a=l,s=f,h=c);}return{successful:!!(m.delimiter=s),bestDelimiter:s};})(e,m.newline,m.skipEmptyLines,m.comments,m.delimitersToGuess)).successful?m.delimiter=r.bestDelimiter:(a=!0,m.delimiter=v.DefaultDelimiter),p.meta.delimiter=m.delimiter),b(m));return m.preview&&m.header&&r.preview++,n=e,s=new E(r),p=s.parse(n,t,i),g(),l?{meta:{paused:!0}}:p||{meta:{paused:!1}};},this.paused=function(){return l;},this.pause=function(){l=!0,s.abort(),n=U(m.chunk)?"":n.substring(s.getCharIndex());},this.resume=function(){i.streamer._halted?(l=!1,i.streamer.parseChunk(n,!0)):setTimeout(i.resume,3);},this.aborted=function(){return e;},this.abort=function(){e=!0,s.abort(),p.meta.aborted=!0,U(m.complete)&&m.complete(p),n="";},this.guessLineEndings=function(e,t){e=e.substring(0,1048576);var t=new RegExp(P(t)+"([^]*?)"+P(t),"gm"),i=(e=e.replace(t,"")).split("\r"),t=e.split("\n"),e=1<t.length&&t[0].length<i[0].length;if(1===i.length||e)return"\n";for(var r=0,n=0;n<i.length;n++)"\n"===i[n][0]&&r++;return r>=i.length/2?"\r\n":"\r";};}function P(e){return e.replace(/[.*+?^${}()|[\]\\]/g,"\\$&");}function E(C){var S=(C=C||{}).delimiter,O=C.newline,x=C.comments,I=C.step,A=C.preview,T=C.fastMode,D=null,L=!1,F=null==C.quoteChar?'"':C.quoteChar,j=F;if(void 0!==C.escapeChar&&(j=C.escapeChar),("string"!=typeof S||-1<v.BAD_DELIMITERS.indexOf(S))&&(S=","),x===S)throw new Error("Comment character same as delimiter");!0===x?x="#":("string"!=typeof x||-1<v.BAD_DELIMITERS.indexOf(x))&&(x=!1),"\n"!==O&&"\r"!==O&&"\r\n"!==O&&(O="\n");var z=0,M=!1;this.parse=function(i,t,r){if("string"!=typeof i)throw new Error("Input must be a string");var n=i.length,e=S.length,s=O.length,a=x.length,o=U(I),h=[],u=[],d=[],f=z=0;if(!i)return w();if(T||!1!==T&&-1===i.indexOf(F)){for(var l=i.split(O),c=0;c<l.length;c++){if(d=l[c],z+=d.length,c!==l.length-1)z+=O.length;else if(r)return w();if(!x||d.substring(0,a)!==x){if(o){if(h=[],k(d.split(S)),R(),M)return w();}else k(d.split(S));if(A&&A<=c)return h=h.slice(0,A),w(!0);}}return w();}for(var p=i.indexOf(S,z),g=i.indexOf(O,z),_=new RegExp(P(j)+P(F),"g"),m=i.indexOf(F,z);;)if(i[z]===F)for(m=z,z++;;){if(-1===(m=i.indexOf(F,m+1)))return r||u.push({type:"Quotes",code:"MissingQuotes",message:"Quoted field unterminated",row:h.length,index:z}),E();if(m===n-1)return E(i.substring(z,m).replace(_,F));if(F===j&&i[m+1]===j)m++;else if(F===j||0===m||i[m-1]!==j){-1!==p&&p<m+1&&(p=i.indexOf(S,m+1));var y=v(-1===(g=-1!==g&&g<m+1?i.indexOf(O,m+1):g)?p:Math.min(p,g));if(i.substr(m+1+y,e)===S){d.push(i.substring(z,m).replace(_,F)),i[z=m+1+y+e]!==F&&(m=i.indexOf(F,z)),p=i.indexOf(S,z),g=i.indexOf(O,z);break;}y=v(g);if(i.substring(m+1+y,m+1+y+s)===O){if(d.push(i.substring(z,m).replace(_,F)),b(m+1+y+s),p=i.indexOf(S,z),m=i.indexOf(F,z),o&&(R(),M))return w();if(A&&h.length>=A)return w(!0);break;}u.push({type:"Quotes",code:"InvalidQuotes",message:"Trailing quote on quoted field is malformed",row:h.length,index:z}),m++;}}else if(x&&0===d.length&&i.substring(z,z+a)===x){if(-1===g)return w();z=g+s,g=i.indexOf(O,z),p=i.indexOf(S,z);}else if(-1!==p&&(p<g||-1===g))d.push(i.substring(z,p)),z=p+e,p=i.indexOf(S,z);else{if(-1===g)break;if(d.push(i.substring(z,g)),b(g+s),o&&(R(),M))return w();if(A&&h.length>=A)return w(!0);}return E();function k(e){h.push(e),f=z;}function v(e){var t=0;return t=-1!==e&&(e=i.substring(m+1,e))&&""===e.trim()?e.length:t;}function E(e){return r||(void 0===e&&(e=i.substring(z)),d.push(e),z=n,k(d),o&&R()),w();}function b(e){z=e,k(d),d=[],g=i.indexOf(O,z);}function w(e){if(C.header&&!t&&h.length&&!L){var s=h[0],a=Object.create(null),o=new Set(s);let n=!1;for(let r=0;r<s.length;r++){let i=s[r];if(a[i=U(C.transformHeader)?C.transformHeader(i,r):i]){let e,t=a[i];for(;e=i+"_"+t,t++,o.has(e););o.add(e),s[r]=e,a[i]++,n=!0,(D=null===D?{}:D)[e]=i;}else a[i]=1,s[r]=i;o.add(i);}n&&console.warn("Duplicate headers found and renamed."),L=!0;}return{data:h,errors:u,meta:{delimiter:S,linebreak:O,aborted:M,truncated:!!e,cursor:f+(t||0),renamedHeaders:D}};}function R(){I(w()),h=[],u=[];}},this.abort=function(){M=!0;},this.getCharIndex=function(){return z;};}function g(e){var t=e.data,i=o[t.workerId],r=!1;if(t.error)i.userError(t.error,t.file);else if(t.results&&t.results.data){var n={abort:function(){r=!0,_(t.workerId,{data:[],errors:[],meta:{aborted:!0}});},pause:m,resume:m};if(U(i.userStep)){for(var s=0;s<t.results.data.length&&(i.userStep({data:t.results.data[s],errors:t.results.errors,meta:t.results.meta},n),!r);s++);delete t.results;}else U(i.userChunk)&&(i.userChunk(t.results,n,t.file),delete t.results);}t.finished&&!r&&_(t.workerId,t.results);}function _(e,t){var i=o[e];U(i.userComplete)&&i.userComplete(t),i.terminate(),delete o[e];}function m(){throw new Error("Not implemented.");}function b(e){if("object"!=typeof e||null===e)return e;var t,i=Array.isArray(e)?[]:{};for(t in e)i[t]=b(e[t]);return i;}function y(e,t){return function(){e.apply(t,arguments);};}function U(e){return"function"==typeof e;}return v.parse=function(e,t){var i=(t=t||{}).dynamicTyping||!1;U(i)&&(t.dynamicTypingFunction=i,i={});if(t.dynamicTyping=i,t.transform=!!U(t.transform)&&t.transform,!t.worker||!v.WORKERS_SUPPORTED)return i=null,v.NODE_STREAM_INPUT,"string"==typeof e?(e=(e=>65279!==e.charCodeAt(0)?e:e.slice(1))(e),i=new(t.download?f:c)(t)):!0===e.readable&&U(e.read)&&U(e.on)?i=new p(t):(n.File&&e instanceof File||e instanceof Object)&&(i=new l(t)),i.stream(e);(i=(()=>{var e;return!!v.WORKERS_SUPPORTED&&(e=(()=>{var e=n.URL||n.webkitURL||null,t=r.toString();return v.BLOB_URL||(v.BLOB_URL=e.createObjectURL(new Blob(["var global = (function() { if (typeof self !== 'undefined') { return self; } if (typeof window !== 'undefined') { return window; } if (typeof global !== 'undefined') { return global; } return {}; })(); global.IS_PAPA_WORKER=true; ","(",t,")();"],{type:"text/javascript"})));})(),(e=new n.Worker(e)).onmessage=g,e.id=h++,o[e.id]=e);})()).userStep=t.step,i.userChunk=t.chunk,i.userComplete=t.complete,i.userError=t.error,t.step=U(t.step),t.chunk=U(t.chunk),t.complete=U(t.complete),t.error=U(t.error),delete t.worker,i.postMessage({input:e,config:t,workerId:i.id});},v.unparse=function(e,t){var n=!1,_=!0,m=",",y="\r\n",s='"',a=s+s,i=!1,r=null,o=!1,h=((()=>{if("object"==typeof t){if("string"!=typeof t.delimiter||v.BAD_DELIMITERS.filter(function(e){return-1!==t.delimiter.indexOf(e);}).length||(m=t.delimiter),"boolean"!=typeof t.quotes&&"function"!=typeof t.quotes&&!Array.isArray(t.quotes)||(n=t.quotes),"boolean"!=typeof t.skipEmptyLines&&"string"!=typeof t.skipEmptyLines||(i=t.skipEmptyLines),"string"==typeof t.newline&&(y=t.newline),"string"==typeof t.quoteChar&&(s=t.quoteChar),"boolean"==typeof t.header&&(_=t.header),Array.isArray(t.columns)){if(0===t.columns.length)throw new Error("Option columns is empty");r=t.columns;}void 0!==t.escapeChar&&(a=t.escapeChar+s),t.escapeFormulae instanceof RegExp?o=t.escapeFormulae:"boolean"==typeof t.escapeFormulae&&t.escapeFormulae&&(o=/^[=+\-@\t\r].*$/);}})(),new RegExp(P(s),"g"));"string"==typeof e&&(e=JSON.parse(e));if(Array.isArray(e)){if(!e.length||Array.isArray(e[0]))return u(null,e,i);if("object"==typeof e[0])return u(r||Object.keys(e[0]),e,i);}else if("object"==typeof e)return"string"==typeof e.data&&(e.data=JSON.parse(e.data)),Array.isArray(e.data)&&(e.fields||(e.fields=e.meta&&e.meta.fields||r),e.fields||(e.fields=Array.isArray(e.data[0])?e.fields:"object"==typeof e.data[0]?Object.keys(e.data[0]):[]),Array.isArray(e.data[0])||"object"==typeof e.data[0]||(e.data=[e.data])),u(e.fields||[],e.data||[],i);throw new Error("Unable to serialize unrecognized input");function u(e,t,i){var r="",n=("string"==typeof e&&(e=JSON.parse(e)),"string"==typeof t&&(t=JSON.parse(t)),Array.isArray(e)&&0<e.length),s=!Array.isArray(t[0]);if(n&&_){for(var a=0;a<e.length;a++)0<a&&(r+=m),r+=k(e[a],a);0<t.length&&(r+=y);}for(var o=0;o<t.length;o++){var h=(n?e:t[o]).length,u=!1,d=n?0===Object.keys(t[o]).length:0===t[o].length;if(i&&!n&&(u="greedy"===i?""===t[o].join("").trim():1===t[o].length&&0===t[o][0].length),"greedy"===i&&n){for(var f=[],l=0;l<h;l++){var c=s?e[l]:l;f.push(t[o][c]);}u=""===f.join("").trim();}if(!u){for(var p=0;p<h;p++){0<p&&!d&&(r+=m);var g=n&&s?e[p]:p;r+=k(t[o][g],p);}o<t.length-1&&(!i||0<h&&!d)&&(r+=y);}}return r;}function k(e,t){var i,r;return null==e?"":e.constructor===Date?JSON.stringify(e).slice(1,25):(r=!1,o&&"string"==typeof e&&o.test(e)&&(e="'"+e,r=!0),i=e.toString().replace(h,a),(r=r||!0===n||"function"==typeof n&&n(e,t)||Array.isArray(n)&&n[t]||((e,t)=>{for(var i=0;i<t.length;i++)if(-1<e.indexOf(t[i]))return!0;return!1;})(i,v.BAD_DELIMITERS)||-1<i.indexOf(m)||" "===i.charAt(0)||" "===i.charAt(i.length-1))?s+i+s:i);}},v.RECORD_SEP=String.fromCharCode(30),v.UNIT_SEP=String.fromCharCode(31),v.BYTE_ORDER_MARK="\ufeff",v.BAD_DELIMITERS=["\r","\n",'"',v.BYTE_ORDER_MARK],v.WORKERS_SUPPORTED=!s&&!!n.Worker,v.NODE_STREAM_INPUT=1,v.LocalChunkSize=10485760,v.RemoteChunkSize=5242880,v.DefaultDelimiter=",",v.Parser=E,v.ParserHandle=i,v.NetworkStreamer=f,v.FileStreamer=l,v.StringStreamer=c,v.ReadableStreamStreamer=p,n.jQuery&&((d=n.jQuery).fn.parse=function(o){var i=o.config||{},h=[];return this.each(function(e){if(!("INPUT"===d(this).prop("tagName").toUpperCase()&&"file"===d(this).attr("type").toLowerCase()&&n.FileReader)||!this.files||0===this.files.length)return!0;for(var t=0;t<this.files.length;t++)h.push({file:this.files[t],inputElem:this,instanceConfig:d.extend({},i)});}),e(),this;function e(){if(0===h.length)U(o.complete)&&o.complete();else{var e,t,i,r,n=h[0];if(U(o.before)){var s=o.before(n.file,n.inputElem);if("object"==typeof s){if("abort"===s.action)return e="AbortError",t=n.file,i=n.inputElem,r=s.reason,void(U(o.error)&&o.error({name:e},t,i,r));if("skip"===s.action)return void u();"object"==typeof s.config&&(n.instanceConfig=d.extend(n.instanceConfig,s.config));}else if("skip"===s)return void u();}var a=n.instanceConfig.complete;n.instanceConfig.complete=function(e){U(a)&&a(e,n.file,n.inputElem),u();},v.parse(n.file,n.instanceConfig);}}function u(){h.splice(0,1),e();}}),a&&(n.onmessage=function(e){e=e.data;void 0===v.WORKER_ID&&e&&(v.WORKER_ID=e.workerId);"string"==typeof e.input?n.postMessage({workerId:v.WORKER_ID,results:v.parse(e.input,e.config),finished:!0}):(n.File&&e.input instanceof File||e.input instanceof Object)&&(e=v.parse(e.input,e.config))&&n.postMessage({workerId:v.WORKER_ID,results:e,finished:!0});}),(f.prototype=Object.create(u.prototype)).constructor=f,(l.prototype=Object.create(u.prototype)).constructor=l,(c.prototype=Object.create(c.prototype)).constructor=c,(p.prototype=Object.create(u.prototype)).constructor=p,v;});

/***/ }),

/***/ 90495:
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be in strict mode.
!function() {
"use strict";

;// ../../libs/common/src/autofill/constants/match-patterns.ts
const CardExpiryDateDelimiters = ["/", "-", ".", " "];
// `CardExpiryDateDelimiters` is not intended solely for regex consumption,
// so we need to format it here
const ExpiryDateDelimitersPattern = "\\" +
    CardExpiryDateDelimiters.join("\\")
        // replace space character with the regex whitespace character class
        .replace(" ", "s");
const MonthPattern = "(([1]{1}[0-2]{1})|(0?[1-9]{1}))";
// Because we're dealing with expiry dates, we assume the year will be in current or next century (as of 2024)
const ExpiryFullYearPattern = "2[0-1]{1}\\d{2}";
const DelimiterPatternExpression = new RegExp(`[${ExpiryDateDelimitersPattern}]`, "g");
const IrrelevantExpiryCharactersPatternExpression = new RegExp(
// "nor digits" to ensure numbers are removed from guidance pattern, which aren't covered by ^\w
`[^\\d${ExpiryDateDelimitersPattern}]`, "g");
const MonthPatternExpression = new RegExp(`^${MonthPattern}$`);
const ExpiryFullYearPatternExpression = new RegExp(`^${ExpiryFullYearPattern}$`);

;// ../../libs/common/src/autofill/constants/index.ts
const TYPE_CHECK = {
    FUNCTION: "function",
    NUMBER: "number",
    STRING: "string",
};
const EVENTS = {
    CHANGE: "change",
    INPUT: "input",
    KEYDOWN: "keydown",
    KEYPRESS: "keypress",
    KEYUP: "keyup",
    BLUR: "blur",
    CLICK: "click",
    FOCUS: "focus",
    FOCUSIN: "focusin",
    FOCUSOUT: "focusout",
    SCROLL: "scroll",
    RESIZE: "resize",
    DOMCONTENTLOADED: "DOMContentLoaded",
    LOAD: "load",
    MESSAGE: "message",
    VISIBILITYCHANGE: "visibilitychange",
    MOUSEENTER: "mouseenter",
    MOUSELEAVE: "mouseleave",
    MOUSEUP: "mouseup",
    MOUSEOUT: "mouseout",
    SUBMIT: "submit",
};
/**
 * HTML attributes observed by the MutationObserver for autofill form/field tracking.
 * If you need to observe a new attribute, add it here.
 */
const AUTOFILL_ATTRIBUTES = {
    ACTION: "action",
    ARIA_DESCRIBEDBY: "aria-describedby",
    ARIA_DISABLED: "aria-disabled",
    ARIA_HASPOPUP: "aria-haspopup",
    ARIA_HIDDEN: "aria-hidden",
    ARIA_LABEL: "aria-label",
    ARIA_LABELLEDBY: "aria-labelledby",
    AUTOCOMPLETE: "autocomplete",
    AUTOCOMPLETE_TYPE: "autocompletetype",
    X_AUTOCOMPLETE_TYPE: "x-autocompletetype",
    CHECKED: "checked",
    // CLASS intentionally omitted because it can cause a callback storm on dynamic pages.
    DATA_LABEL: "data-label",
    DATA_STRIPE: "data-stripe",
    DISABLED: "disabled",
    ID: "id",
    MAXLENGTH: "maxlength",
    METHOD: "method",
    NAME: "name",
    PLACEHOLDER: "placeholder",
    POPOVER: "popover",
    POPOVERTARGET: "popovertarget",
    POPOVERTARGETACTION: "popovertargetaction",
    READONLY: "readonly",
    REL: "rel",
    TABINDEX: "tabindex",
    TITLE: "title",
    TYPE: "type",
};
const ClearClipboardDelay = {
    Never: "never",
    TenSeconds: "tenSeconds",
    TwentySeconds: "twentySeconds",
    ThirtySeconds: "thirtySeconds",
    OneMinute: "oneMinute",
    TwoMinutes: "twoMinutes",
    FiveMinutes: "fiveMinutes",
};
/* Ids for context menu items and messaging events */
const AUTOFILL_CARD_ID = "autofill-card";
const AUTOFILL_ID = "autofill";
const SHOW_AUTOFILL_BUTTON = "show-autofill-button";
const AUTOFILL_IDENTITY_ID = "autofill-identity";
const AUTOFILL_TRIAGE_ID = "autofill-triage";
const COPY_IDENTIFIER_ID = "copy-identifier";
const COPY_PASSWORD_ID = "copy-password";
const COPY_USERNAME_ID = "copy-username";
const COPY_VERIFICATION_CODE_ID = "copy-totp";
const CREATE_CARD_ID = "create-card";
const CREATE_IDENTITY_ID = "create-identity";
const CREATE_LOGIN_ID = "create-login";
const GENERATE_PASSWORD_ID = "generate-password";
const NOOP_COMMAND_SUFFIX = "noop";
const ROOT_ID = "root";
const SEPARATOR_ID = "separator";
const UPDATE_PASSWORD = "update-password";
const NOTIFICATION_BAR_LIFESPAN_MS = 150000; // 150 seconds
const AUTOFILL_OVERLAY_HANDLE_REPOSITION = "autofill-overlay-handle-reposition-event";
const AUTOFILL_OVERLAY_HANDLE_SCROLL = "autofill-overlay-handle-scroll-event";
const UPDATE_PASSKEYS_HEADINGS_ON_SCROLL = "update-passkeys-headings-on-scroll";
const AUTOFILL_TRIGGER_FORM_FIELD_SUBMIT = "autofill-trigger-form-field-submit";
const AutofillOverlayVisibility = {
    Off: 0,
    OnButtonClick: 1,
    OnFieldFocus: 2,
};
const BrowserClientVendors = {
    Chrome: "Chrome",
    Firefox: "Firefox",
    Opera: "Opera",
    Edge: "Edge",
    Vivaldi: "Vivaldi",
    Unknown: "Unknown",
};
const BrowserShortcutsUris = {
    Chrome: "chrome://extensions/shortcuts",
    Firefox: "https://bitwarden.com/help/keyboard-shortcuts",
    Opera: "opera://extensions/shortcuts",
    Edge: "edge://extensions/shortcuts",
    Vivaldi: "vivaldi://extensions/shortcuts",
    Unknown: "https://bitwarden.com/help/keyboard-shortcuts",
};
const DisablePasswordManagerUris = {
    Chrome: "chrome://password-manager/settings",
    Firefox: "https://bitwarden.com/help/disable-browser-autofill/",
    Opera: "opera://settings/autofill",
    Edge: "edge://settings/autofill/passwords/settings",
    Vivaldi: "vivaldi://settings/autofill",
    Unknown: "https://bitwarden.com/help/disable-browser-autofill/",
};
const ExtensionCommand = {
    AutofillCommand: "autofill_cmd",
    AutofillCard: "autofill_card",
    AutofillIdentity: "autofill_identity",
    AutofillLogin: "autofill_login",
    OpenAutofillOverlay: "open_autofill_overlay",
    GeneratePassword: "generate_password",
    OpenPopup: "open_popup",
    LockVault: "lock_vault",
    NoopCommand: "noop",
};
const CLEAR_NOTIFICATION_LOGIN_DATA_DURATION = (/* unused pure expression or super */ null && (60 * 1000)); // 1 minute
const MAX_DEEP_QUERY_RECURSION_DEPTH = 4;
const DEEP_QUERY_SELECTOR_COMBINATOR = ">>>";
// this list is derived from the `attachShadow` candidate elements list
// https://developer.mozilla.org/en-US/docs/Web/API/Element/attachShadow
const SHADOW_ROOT_CANDIDATE_NODE_NAMES = Object.freeze(new Set([
    "ARTICLE",
    "ASIDE",
    "BLOCKQUOTE",
    "BODY",
    "DIV",
    "FOOTER",
    "H1",
    "H2",
    "H3",
    "H4",
    "H5",
    "H6",
    "HEADER",
    "MAIN",
    "NAV",
    "P",
    "SECTION",
    "SPAN",
]));
/**
 * Field keys for targeting rules. These MUST match the `fieldKey` enum in
 * the Forms Map schema.
 */
const AutofillTargetingRuleTypes = {
    // Authentication
    username: "username",
    password: "password",
    newPassword: "newPassword",
    oneTimeCode: "oneTimeCode",
    // Name
    fullName: "fullName",
    honorificPrefix: "honorificPrefix",
    firstName: "firstName",
    middleName: "middleName",
    lastName: "lastName",
    honorificSuffix: "honorificSuffix",
    // Contact
    email: "email",
    phone: "phone",
    phoneCountryCode: "phoneCountryCode",
    phoneAreaCode: "phoneAreaCode",
    phoneLocal: "phoneLocal",
    phoneExtension: "phoneExtension",
    organization: "organization",
    // Address
    streetAddress: "streetAddress",
    addressLine1: "addressLine1",
    addressLine2: "addressLine2",
    addressLine3: "addressLine3",
    addressLevel1: "addressLevel1",
    addressLevel2: "addressLevel2",
    addressLevel3: "addressLevel3",
    addressLevel4: "addressLevel4",
    postalCode: "postalCode",
    country: "country",
    // Birthdate
    birthdate: "birthdate",
    birthdateDay: "birthdateDay",
    birthdateMonth: "birthdateMonth",
    birthdateYear: "birthdateYear",
    // Payment card
    cardholderName: "cardholderName",
    cardNumber: "cardNumber",
    cardExpirationDate: "cardExpirationDate",
    cardExpirationMonth: "cardExpirationMonth",
    cardExpirationYear: "cardExpirationYear",
    cardCvv: "cardCvv",
    cardType: "cardType",
    // Consent
    consentTerms: "consentTerms",
    consentPrivacy: "consentPrivacy",
    consentUser: "consentUser",
    // Search
    searchTerm: "searchTerm",
};
const FormPurposeCategories = {
    AccountCreation: "account-creation",
    AccountLogin: "account-login",
    AccountRecovery: "account-recovery",
    AccountUpdate: "account-update",
    Address: "address",
    Identity: "identity",
    PaymentCard: "payment-card",
    Search: "search",
    Signup: "signup",
};


;// ../../node_modules/tslib/tslib.es6.mjs
/******************************************************************************
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
***************************************************************************** *//* global Reflect, Promise, SuppressedError, Symbol, Iterator */var extendStatics=function(d,b){extendStatics=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(d,b){d.__proto__=b;}||function(d,b){for(var p in b)if(Object.prototype.hasOwnProperty.call(b,p))d[p]=b[p];};return extendStatics(d,b);};function __extends(d,b){if(typeof b!=="function"&&b!==null)throw new TypeError("Class extends value "+String(b)+" is not a constructor or null");extendStatics(d,b);function __(){this.constructor=d;}d.prototype=b===null?Object.create(b):(__.prototype=b.prototype,new __());}var __assign=function(){__assign=Object.assign||function __assign(t){for(var s,i=1,n=arguments.length;i<n;i++){s=arguments[i];for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p))t[p]=s[p];}return t;};return __assign.apply(this,arguments);};function __rest(s,e){var t={};for(var p in s)if(Object.prototype.hasOwnProperty.call(s,p)&&e.indexOf(p)<0)t[p]=s[p];if(s!=null&&typeof Object.getOwnPropertySymbols==="function")for(var i=0,p=Object.getOwnPropertySymbols(s);i<p.length;i++){if(e.indexOf(p[i])<0&&Object.prototype.propertyIsEnumerable.call(s,p[i]))t[p[i]]=s[p[i]];}return t;}function __decorate(decorators,target,key,desc){var c=arguments.length,r=c<3?target:desc===null?desc=Object.getOwnPropertyDescriptor(target,key):desc,d;if(typeof Reflect==="object"&&typeof Reflect.decorate==="function")r=Reflect.decorate(decorators,target,key,desc);else for(var i=decorators.length-1;i>=0;i--)if(d=decorators[i])r=(c<3?d(r):c>3?d(target,key,r):d(target,key))||r;return c>3&&r&&Object.defineProperty(target,key,r),r;}function __param(paramIndex,decorator){return function(target,key){decorator(target,key,paramIndex);};}function __esDecorate(ctor,descriptorIn,decorators,contextIn,initializers,extraInitializers){function accept(f){if(f!==void 0&&typeof f!=="function")throw new TypeError("Function expected");return f;}var kind=contextIn.kind,key=kind==="getter"?"get":kind==="setter"?"set":"value";var target=!descriptorIn&&ctor?contextIn["static"]?ctor:ctor.prototype:null;var descriptor=descriptorIn||(target?Object.getOwnPropertyDescriptor(target,contextIn.name):{});var _,done=false;for(var i=decorators.length-1;i>=0;i--){var context={};for(var p in contextIn)context[p]=p==="access"?{}:contextIn[p];for(var p in contextIn.access)context.access[p]=contextIn.access[p];context.addInitializer=function(f){if(done)throw new TypeError("Cannot add initializers after decoration has completed");extraInitializers.push(accept(f||null));};var result=(0,decorators[i])(kind==="accessor"?{get:descriptor.get,set:descriptor.set}:descriptor[key],context);if(kind==="accessor"){if(result===void 0)continue;if(result===null||typeof result!=="object")throw new TypeError("Object expected");if(_=accept(result.get))descriptor.get=_;if(_=accept(result.set))descriptor.set=_;if(_=accept(result.init))initializers.unshift(_);}else if(_=accept(result)){if(kind==="field")initializers.unshift(_);else descriptor[key]=_;}}if(target)Object.defineProperty(target,contextIn.name,descriptor);done=true;};function __runInitializers(thisArg,initializers,value){var useValue=arguments.length>2;for(var i=0;i<initializers.length;i++){value=useValue?initializers[i].call(thisArg,value):initializers[i].call(thisArg);}return useValue?value:void 0;};function __propKey(x){return typeof x==="symbol"?x:"".concat(x);};function __setFunctionName(f,name,prefix){if(typeof name==="symbol")name=name.description?"[".concat(name.description,"]"):"";return Object.defineProperty(f,"name",{configurable:true,value:prefix?"".concat(prefix," ",name):name});};function __metadata(metadataKey,metadataValue){if(typeof Reflect==="object"&&typeof Reflect.metadata==="function")return Reflect.metadata(metadataKey,metadataValue);}function __awaiter(thisArg,_arguments,P,generator){function adopt(value){return value instanceof P?value:new P(function(resolve){resolve(value);});}return new(P||(P=Promise))(function(resolve,reject){function fulfilled(value){try{step(generator.next(value));}catch(e){reject(e);}}function rejected(value){try{step(generator["throw"](value));}catch(e){reject(e);}}function step(result){result.done?resolve(result.value):adopt(result.value).then(fulfilled,rejected);}step((generator=generator.apply(thisArg,_arguments||[])).next());});}function __generator(thisArg,body){var _={label:0,sent:function(){if(t[0]&1)throw t[1];return t[1];},trys:[],ops:[]},f,y,t,g=Object.create((typeof Iterator==="function"?Iterator:Object).prototype);return g.next=verb(0),g["throw"]=verb(1),g["return"]=verb(2),typeof Symbol==="function"&&(g[Symbol.iterator]=function(){return this;}),g;function verb(n){return function(v){return step([n,v]);};}function step(op){if(f)throw new TypeError("Generator is already executing.");while(g&&(g=0,op[0]&&(_=0)),_)try{if(f=1,y&&(t=op[0]&2?y["return"]:op[0]?y["throw"]||((t=y["return"])&&t.call(y),0):y.next)&&!(t=t.call(y,op[1])).done)return t;if(y=0,t)op=[op[0]&2,t.value];switch(op[0]){case 0:case 1:t=op;break;case 4:_.label++;return{value:op[1],done:false};case 5:_.label++;y=op[1];op=[0];continue;case 7:op=_.ops.pop();_.trys.pop();continue;default:if(!(t=_.trys,t=t.length>0&&t[t.length-1])&&(op[0]===6||op[0]===2)){_=0;continue;}if(op[0]===3&&(!t||op[1]>t[0]&&op[1]<t[3])){_.label=op[1];break;}if(op[0]===6&&_.label<t[1]){_.label=t[1];t=op;break;}if(t&&_.label<t[2]){_.label=t[2];_.ops.push(op);break;}if(t[2])_.ops.pop();_.trys.pop();continue;}op=body.call(thisArg,_);}catch(e){op=[6,e];y=0;}finally{f=t=0;}if(op[0]&5)throw op[1];return{value:op[0]?op[1]:void 0,done:true};}}var __createBinding=Object.create?function(o,m,k,k2){if(k2===undefined)k2=k;var desc=Object.getOwnPropertyDescriptor(m,k);if(!desc||("get"in desc?!m.__esModule:desc.writable||desc.configurable)){desc={enumerable:true,get:function(){return m[k];}};}Object.defineProperty(o,k2,desc);}:function(o,m,k,k2){if(k2===undefined)k2=k;o[k2]=m[k];};function __exportStar(m,o){for(var p in m)if(p!=="default"&&!Object.prototype.hasOwnProperty.call(o,p))__createBinding(o,m,p);}function __values(o){var s=typeof Symbol==="function"&&Symbol.iterator,m=s&&o[s],i=0;if(m)return m.call(o);if(o&&typeof o.length==="number")return{next:function(){if(o&&i>=o.length)o=void 0;return{value:o&&o[i++],done:!o};}};throw new TypeError(s?"Object is not iterable.":"Symbol.iterator is not defined.");}function __read(o,n){var m=typeof Symbol==="function"&&o[Symbol.iterator];if(!m)return o;var i=m.call(o),r,ar=[],e;try{while((n===void 0||n-->0)&&!(r=i.next()).done)ar.push(r.value);}catch(error){e={error:error};}finally{try{if(r&&!r.done&&(m=i["return"]))m.call(i);}finally{if(e)throw e.error;}}return ar;}/** @deprecated */function __spread(){for(var ar=[],i=0;i<arguments.length;i++)ar=ar.concat(__read(arguments[i]));return ar;}/** @deprecated */function __spreadArrays(){for(var s=0,i=0,il=arguments.length;i<il;i++)s+=arguments[i].length;for(var r=Array(s),k=0,i=0;i<il;i++)for(var a=arguments[i],j=0,jl=a.length;j<jl;j++,k++)r[k]=a[j];return r;}function __spreadArray(to,from,pack){if(pack||arguments.length===2)for(var i=0,l=from.length,ar;i<l;i++){if(ar||!(i in from)){if(!ar)ar=Array.prototype.slice.call(from,0,i);ar[i]=from[i];}}return to.concat(ar||Array.prototype.slice.call(from));}function __await(v){return this instanceof __await?(this.v=v,this):new __await(v);}function __asyncGenerator(thisArg,_arguments,generator){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var g=generator.apply(thisArg,_arguments||[]),i,q=[];return i=Object.create((typeof AsyncIterator==="function"?AsyncIterator:Object).prototype),verb("next"),verb("throw"),verb("return",awaitReturn),i[Symbol.asyncIterator]=function(){return this;},i;function awaitReturn(f){return function(v){return Promise.resolve(v).then(f,reject);};}function verb(n,f){if(g[n]){i[n]=function(v){return new Promise(function(a,b){q.push([n,v,a,b])>1||resume(n,v);});};if(f)i[n]=f(i[n]);}}function resume(n,v){try{step(g[n](v));}catch(e){settle(q[0][3],e);}}function step(r){r.value instanceof __await?Promise.resolve(r.value.v).then(fulfill,reject):settle(q[0][2],r);}function fulfill(value){resume("next",value);}function reject(value){resume("throw",value);}function settle(f,v){if(f(v),q.shift(),q.length)resume(q[0][0],q[0][1]);}}function __asyncDelegator(o){var i,p;return i={},verb("next"),verb("throw",function(e){throw e;}),verb("return"),i[Symbol.iterator]=function(){return this;},i;function verb(n,f){i[n]=o[n]?function(v){return(p=!p)?{value:__await(o[n](v)),done:false}:f?f(v):v;}:f;}}function __asyncValues(o){if(!Symbol.asyncIterator)throw new TypeError("Symbol.asyncIterator is not defined.");var m=o[Symbol.asyncIterator],i;return m?m.call(o):(o=typeof __values==="function"?__values(o):o[Symbol.iterator](),i={},verb("next"),verb("throw"),verb("return"),i[Symbol.asyncIterator]=function(){return this;},i);function verb(n){i[n]=o[n]&&function(v){return new Promise(function(resolve,reject){v=o[n](v),settle(resolve,reject,v.done,v.value);});};}function settle(resolve,reject,d,v){Promise.resolve(v).then(function(v){resolve({value:v,done:d});},reject);}}function __makeTemplateObject(cooked,raw){if(Object.defineProperty){Object.defineProperty(cooked,"raw",{value:raw});}else{cooked.raw=raw;}return cooked;};var __setModuleDefault=Object.create?function(o,v){Object.defineProperty(o,"default",{enumerable:true,value:v});}:function(o,v){o["default"]=v;};var ownKeys=function(o){ownKeys=Object.getOwnPropertyNames||function(o){var ar=[];for(var k in o)if(Object.prototype.hasOwnProperty.call(o,k))ar[ar.length]=k;return ar;};return ownKeys(o);};function __importStar(mod){if(mod&&mod.__esModule)return mod;var result={};if(mod!=null)for(var k=ownKeys(mod),i=0;i<k.length;i++)if(k[i]!=="default")__createBinding(result,mod,k[i]);__setModuleDefault(result,mod);return result;}function __importDefault(mod){return mod&&mod.__esModule?mod:{default:mod};}function __classPrivateFieldGet(receiver,state,kind,f){if(kind==="a"&&!f)throw new TypeError("Private accessor was defined without a getter");if(typeof state==="function"?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot read private member from an object whose class did not declare it");return kind==="m"?f:kind==="a"?f.call(receiver):f?f.value:state.get(receiver);}function __classPrivateFieldSet(receiver,state,value,kind,f){if(kind==="m")throw new TypeError("Private method is not writable");if(kind==="a"&&!f)throw new TypeError("Private accessor was defined without a setter");if(typeof state==="function"?receiver!==state||!f:!state.has(receiver))throw new TypeError("Cannot write private member to an object whose class did not declare it");return kind==="a"?f.call(receiver,value):f?f.value=value:state.set(receiver,value),value;}function __classPrivateFieldIn(state,receiver){if(receiver===null||typeof receiver!=="object"&&typeof receiver!=="function")throw new TypeError("Cannot use 'in' operator on non-object");return typeof state==="function"?receiver===state:state.has(receiver);}function __addDisposableResource(env,value,async){if(value!==null&&value!==void 0){if(typeof value!=="object"&&typeof value!=="function")throw new TypeError("Object expected.");var dispose,inner;if(async){if(!Symbol.asyncDispose)throw new TypeError("Symbol.asyncDispose is not defined.");dispose=value[Symbol.asyncDispose];}if(dispose===void 0){if(!Symbol.dispose)throw new TypeError("Symbol.dispose is not defined.");dispose=value[Symbol.dispose];if(async)inner=dispose;}if(typeof dispose!=="function")throw new TypeError("Object not disposable.");if(inner)dispose=function(){try{inner.call(this);}catch(e){return Promise.reject(e);}};env.stack.push({value:value,dispose:dispose,async:async});}else if(async){env.stack.push({async:true});}return value;}var _SuppressedError=typeof SuppressedError==="function"?SuppressedError:function(error,suppressed,message){var e=new Error(message);return e.name="SuppressedError",e.error=error,e.suppressed=suppressed,e;};function __disposeResources(env){function fail(e){env.error=env.hasError?new _SuppressedError(e,env.error,"An error was suppressed during disposal."):e;env.hasError=true;}var r,s=0;function next(){while(r=env.stack.pop()){try{if(!r.async&&s===1)return s=0,env.stack.push(r),Promise.resolve().then(next);if(r.dispose){var result=r.dispose.call(r.value);if(r.async)return s|=2,Promise.resolve(result).then(next,function(e){fail(e);return next();});}else s|=1;}catch(e){fail(e);}}if(s===1)return env.hasError?Promise.reject(env.error):Promise.resolve();if(env.hasError)throw env.error;}return next();}function __rewriteRelativeImportExtension(path,preserveJsx){if(typeof path==="string"&&/^\.\.?\//.test(path)){return path.replace(/\.(tsx)$|((?:\.d)?)((?:\.[^./]+?)?)\.([cm]?)ts$/i,function(m,tsx,d,ext,cm){return tsx?preserveJsx?".jsx":".js":d&&(!ext||!cm)?m:d+ext+"."+cm.toLowerCase()+"js";});}return path;}/* harmony default export */ var tslib_es6 = ({__extends,__assign,__rest,__decorate,__param,__esDecorate,__runInitializers,__propKey,__setFunctionName,__metadata,__awaiter,__generator,__createBinding,__exportStar,__values,__read,__spread,__spreadArrays,__spreadArray,__await,__asyncGenerator,__asyncDelegator,__asyncValues,__makeTemplateObject,__importStar,__importDefault,__classPrivateFieldGet,__classPrivateFieldSet,__classPrivateFieldIn,__addDisposableResource,__disposeResources,__rewriteRelativeImportExtension});
;// ../../node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value){return typeof value==='function';}
;// ../../node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl){var _super=function(instance){Error.call(instance);instance.stack=new Error().stack;};var ctorFunc=createImpl(_super);ctorFunc.prototype=Object.create(Error.prototype);ctorFunc.prototype.constructor=ctorFunc;return ctorFunc;}
;// ../../node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError=createErrorClass(function(_super){return function UnsubscriptionErrorImpl(errors){_super(this);this.message=errors?errors.length+" errors occurred during unsubscription:\n"+errors.map(function(err,i){return i+1+") "+err.toString();}).join('\n  '):'';this.name='UnsubscriptionError';this.errors=errors;};});
;// ../../node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr,item){if(arr){var index=arr.indexOf(item);0<=index&&arr.splice(index,1);}}
;// ../../node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription=function(){function Subscription(initialTeardown){this.initialTeardown=initialTeardown;this.closed=false;this._parentage=null;this._finalizers=null;}Subscription.prototype.unsubscribe=function(){var e_1,_a,e_2,_b;var errors;if(!this.closed){this.closed=true;var _parentage=this._parentage;if(_parentage){this._parentage=null;if(Array.isArray(_parentage)){try{for(var _parentage_1=__values(_parentage),_parentage_1_1=_parentage_1.next();!_parentage_1_1.done;_parentage_1_1=_parentage_1.next()){var parent_1=_parentage_1_1.value;parent_1.remove(this);}}catch(e_1_1){e_1={error:e_1_1};}finally{try{if(_parentage_1_1&&!_parentage_1_1.done&&(_a=_parentage_1.return))_a.call(_parentage_1);}finally{if(e_1)throw e_1.error;}}}else{_parentage.remove(this);}}var initialFinalizer=this.initialTeardown;if(isFunction(initialFinalizer)){try{initialFinalizer();}catch(e){errors=e instanceof UnsubscriptionError?e.errors:[e];}}var _finalizers=this._finalizers;if(_finalizers){this._finalizers=null;try{for(var _finalizers_1=__values(_finalizers),_finalizers_1_1=_finalizers_1.next();!_finalizers_1_1.done;_finalizers_1_1=_finalizers_1.next()){var finalizer=_finalizers_1_1.value;try{execFinalizer(finalizer);}catch(err){errors=errors!==null&&errors!==void 0?errors:[];if(err instanceof UnsubscriptionError){errors=__spreadArray(__spreadArray([],__read(errors)),__read(err.errors));}else{errors.push(err);}}}}catch(e_2_1){e_2={error:e_2_1};}finally{try{if(_finalizers_1_1&&!_finalizers_1_1.done&&(_b=_finalizers_1.return))_b.call(_finalizers_1);}finally{if(e_2)throw e_2.error;}}}if(errors){throw new UnsubscriptionError(errors);}}};Subscription.prototype.add=function(teardown){var _a;if(teardown&&teardown!==this){if(this.closed){execFinalizer(teardown);}else{if(teardown instanceof Subscription){if(teardown.closed||teardown._hasParent(this)){return;}teardown._addParent(this);}(this._finalizers=(_a=this._finalizers)!==null&&_a!==void 0?_a:[]).push(teardown);}}};Subscription.prototype._hasParent=function(parent){var _parentage=this._parentage;return _parentage===parent||Array.isArray(_parentage)&&_parentage.includes(parent);};Subscription.prototype._addParent=function(parent){var _parentage=this._parentage;this._parentage=Array.isArray(_parentage)?(_parentage.push(parent),_parentage):_parentage?[_parentage,parent]:parent;};Subscription.prototype._removeParent=function(parent){var _parentage=this._parentage;if(_parentage===parent){this._parentage=null;}else if(Array.isArray(_parentage)){arrRemove(_parentage,parent);}};Subscription.prototype.remove=function(teardown){var _finalizers=this._finalizers;_finalizers&&arrRemove(_finalizers,teardown);if(teardown instanceof Subscription){teardown._removeParent(this);}};Subscription.EMPTY=function(){var empty=new Subscription();empty.closed=true;return empty;}();return Subscription;}();var EMPTY_SUBSCRIPTION=Subscription.EMPTY;function isSubscription(value){return value instanceof Subscription||value&&'closed'in value&&isFunction(value.remove)&&isFunction(value.add)&&isFunction(value.unsubscribe);}function execFinalizer(finalizer){if(isFunction(finalizer)){finalizer();}else{finalizer.unsubscribe();}}
;// ../../node_modules/rxjs/dist/esm5/internal/config.js
var config={onUnhandledError:null,onStoppedNotification:null,Promise:undefined,useDeprecatedSynchronousErrorHandling:false,useDeprecatedNextContext:false};
;// ../../node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider={setTimeout:function(handler,timeout){var args=[];for(var _i=2;_i<arguments.length;_i++){args[_i-2]=arguments[_i];}var delegate=timeoutProvider.delegate;if(delegate===null||delegate===void 0?void 0:delegate.setTimeout){return delegate.setTimeout.apply(delegate,__spreadArray([handler,timeout],__read(args)));}return setTimeout.apply(void 0,__spreadArray([handler,timeout],__read(args)));},clearTimeout:function(handle){var delegate=timeoutProvider.delegate;return((delegate===null||delegate===void 0?void 0:delegate.clearTimeout)||clearTimeout)(handle);},delegate:undefined};
;// ../../node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err){timeoutProvider.setTimeout(function(){var onUnhandledError=config.onUnhandledError;if(onUnhandledError){onUnhandledError(err);}else{throw err;}});}
;// ../../node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop(){}
;// ../../node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION=function(){return createNotification('C',undefined,undefined);}();function errorNotification(error){return createNotification('E',undefined,error);}function nextNotification(value){return createNotification('N',value,undefined);}function createNotification(kind,value,error){return{kind:kind,value:value,error:error};}
;// ../../node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context=null;function errorContext(cb){if(config.useDeprecatedSynchronousErrorHandling){var isRoot=!context;if(isRoot){context={errorThrown:false,error:null};}cb();if(isRoot){var _a=context,errorThrown=_a.errorThrown,error=_a.error;context=null;if(errorThrown){throw error;}}}else{cb();}}function captureError(err){if(config.useDeprecatedSynchronousErrorHandling&&context){context.errorThrown=true;context.error=err;}}
;// ../../node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber=function(_super){__extends(Subscriber,_super);function Subscriber(destination){var _this=_super.call(this)||this;_this.isStopped=false;if(destination){_this.destination=destination;if(isSubscription(destination)){destination.add(_this);}}else{_this.destination=EMPTY_OBSERVER;}return _this;}Subscriber.create=function(next,error,complete){return new SafeSubscriber(next,error,complete);};Subscriber.prototype.next=function(value){if(this.isStopped){handleStoppedNotification(nextNotification(value),this);}else{this._next(value);}};Subscriber.prototype.error=function(err){if(this.isStopped){handleStoppedNotification(errorNotification(err),this);}else{this.isStopped=true;this._error(err);}};Subscriber.prototype.complete=function(){if(this.isStopped){handleStoppedNotification(COMPLETE_NOTIFICATION,this);}else{this.isStopped=true;this._complete();}};Subscriber.prototype.unsubscribe=function(){if(!this.closed){this.isStopped=true;_super.prototype.unsubscribe.call(this);this.destination=null;}};Subscriber.prototype._next=function(value){this.destination.next(value);};Subscriber.prototype._error=function(err){try{this.destination.error(err);}finally{this.unsubscribe();}};Subscriber.prototype._complete=function(){try{this.destination.complete();}finally{this.unsubscribe();}};return Subscriber;}(Subscription);var _bind=Function.prototype.bind;function bind(fn,thisArg){return _bind.call(fn,thisArg);}var ConsumerObserver=function(){function ConsumerObserver(partialObserver){this.partialObserver=partialObserver;}ConsumerObserver.prototype.next=function(value){var partialObserver=this.partialObserver;if(partialObserver.next){try{partialObserver.next(value);}catch(error){handleUnhandledError(error);}}};ConsumerObserver.prototype.error=function(err){var partialObserver=this.partialObserver;if(partialObserver.error){try{partialObserver.error(err);}catch(error){handleUnhandledError(error);}}else{handleUnhandledError(err);}};ConsumerObserver.prototype.complete=function(){var partialObserver=this.partialObserver;if(partialObserver.complete){try{partialObserver.complete();}catch(error){handleUnhandledError(error);}}};return ConsumerObserver;}();var SafeSubscriber=function(_super){__extends(SafeSubscriber,_super);function SafeSubscriber(observerOrNext,error,complete){var _this=_super.call(this)||this;var partialObserver;if(isFunction(observerOrNext)||!observerOrNext){partialObserver={next:observerOrNext!==null&&observerOrNext!==void 0?observerOrNext:undefined,error:error!==null&&error!==void 0?error:undefined,complete:complete!==null&&complete!==void 0?complete:undefined};}else{var context_1;if(_this&&config.useDeprecatedNextContext){context_1=Object.create(observerOrNext);context_1.unsubscribe=function(){return _this.unsubscribe();};partialObserver={next:observerOrNext.next&&bind(observerOrNext.next,context_1),error:observerOrNext.error&&bind(observerOrNext.error,context_1),complete:observerOrNext.complete&&bind(observerOrNext.complete,context_1)};}else{partialObserver=observerOrNext;}}_this.destination=new ConsumerObserver(partialObserver);return _this;}return SafeSubscriber;}(Subscriber);function handleUnhandledError(error){if(config.useDeprecatedSynchronousErrorHandling){captureError(error);}else{reportUnhandledError(error);}}function defaultErrorHandler(err){throw err;}function handleStoppedNotification(notification,subscriber){var onStoppedNotification=config.onStoppedNotification;onStoppedNotification&&timeoutProvider.setTimeout(function(){return onStoppedNotification(notification,subscriber);});}var EMPTY_OBSERVER={closed:true,next:noop,error:defaultErrorHandler,complete:noop};
;// ../../node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable=function(){return typeof Symbol==='function'&&Symbol.observable||'@@observable';}();
;// ../../node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x){return x;}
;// ../../node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipe(){var fns=[];for(var _i=0;_i<arguments.length;_i++){fns[_i]=arguments[_i];}return pipeFromArray(fns);}function pipeFromArray(fns){if(fns.length===0){return identity;}if(fns.length===1){return fns[0];}return function piped(input){return fns.reduce(function(prev,fn){return fn(prev);},input);};}
;// ../../node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable=function(){function Observable(subscribe){if(subscribe){this._subscribe=subscribe;}}Observable.prototype.lift=function(operator){var observable=new Observable();observable.source=this;observable.operator=operator;return observable;};Observable.prototype.subscribe=function(observerOrNext,error,complete){var _this=this;var subscriber=isSubscriber(observerOrNext)?observerOrNext:new SafeSubscriber(observerOrNext,error,complete);errorContext(function(){var _a=_this,operator=_a.operator,source=_a.source;subscriber.add(operator?operator.call(subscriber,source):source?_this._subscribe(subscriber):_this._trySubscribe(subscriber));});return subscriber;};Observable.prototype._trySubscribe=function(sink){try{return this._subscribe(sink);}catch(err){sink.error(err);}};Observable.prototype.forEach=function(next,promiseCtor){var _this=this;promiseCtor=getPromiseCtor(promiseCtor);return new promiseCtor(function(resolve,reject){var subscriber=new SafeSubscriber({next:function(value){try{next(value);}catch(err){reject(err);subscriber.unsubscribe();}},error:reject,complete:resolve});_this.subscribe(subscriber);});};Observable.prototype._subscribe=function(subscriber){var _a;return(_a=this.source)===null||_a===void 0?void 0:_a.subscribe(subscriber);};Observable.prototype[observable]=function(){return this;};Observable.prototype.pipe=function(){var operations=[];for(var _i=0;_i<arguments.length;_i++){operations[_i]=arguments[_i];}return pipeFromArray(operations)(this);};Observable.prototype.toPromise=function(promiseCtor){var _this=this;promiseCtor=getPromiseCtor(promiseCtor);return new promiseCtor(function(resolve,reject){var value;_this.subscribe(function(x){return value=x;},function(err){return reject(err);},function(){return resolve(value);});});};Observable.create=function(subscribe){return new Observable(subscribe);};return Observable;}();function getPromiseCtor(promiseCtor){var _a;return(_a=promiseCtor!==null&&promiseCtor!==void 0?promiseCtor:config.Promise)!==null&&_a!==void 0?_a:Promise;}function isObserver(value){return value&&isFunction(value.next)&&isFunction(value.error)&&isFunction(value.complete);}function isSubscriber(value){return value&&value instanceof Subscriber||isObserver(value)&&isSubscription(value);}
;// ../../libs/client-type/src/index.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var ClientType;
(function (ClientType) {
    ClientType["Web"] = "web";
    ClientType["Browser"] = "browser";
    ClientType["Desktop"] = "desktop";
    // Mobile = "mobile",
    ClientType["Cli"] = "cli";
    // DirectoryConnector = "connector",
})(ClientType || (ClientType = {}));

;// ../../libs/common/src/enums/client-type.enum.ts


;// ../../libs/common/src/enums/device-type.enum.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var DeviceType;
(function (DeviceType) {
    DeviceType[DeviceType["Android"] = 0] = "Android";
    DeviceType[DeviceType["iOS"] = 1] = "iOS";
    DeviceType[DeviceType["ChromeExtension"] = 2] = "ChromeExtension";
    DeviceType[DeviceType["FirefoxExtension"] = 3] = "FirefoxExtension";
    DeviceType[DeviceType["OperaExtension"] = 4] = "OperaExtension";
    DeviceType[DeviceType["EdgeExtension"] = 5] = "EdgeExtension";
    DeviceType[DeviceType["WindowsDesktop"] = 6] = "WindowsDesktop";
    DeviceType[DeviceType["MacOsDesktop"] = 7] = "MacOsDesktop";
    DeviceType[DeviceType["LinuxDesktop"] = 8] = "LinuxDesktop";
    DeviceType[DeviceType["ChromeBrowser"] = 9] = "ChromeBrowser";
    DeviceType[DeviceType["FirefoxBrowser"] = 10] = "FirefoxBrowser";
    DeviceType[DeviceType["OperaBrowser"] = 11] = "OperaBrowser";
    DeviceType[DeviceType["EdgeBrowser"] = 12] = "EdgeBrowser";
    DeviceType[DeviceType["IEBrowser"] = 13] = "IEBrowser";
    DeviceType[DeviceType["UnknownBrowser"] = 14] = "UnknownBrowser";
    DeviceType[DeviceType["AndroidAmazon"] = 15] = "AndroidAmazon";
    DeviceType[DeviceType["UWP"] = 16] = "UWP";
    DeviceType[DeviceType["SafariBrowser"] = 17] = "SafariBrowser";
    DeviceType[DeviceType["VivaldiBrowser"] = 18] = "VivaldiBrowser";
    DeviceType[DeviceType["VivaldiExtension"] = 19] = "VivaldiExtension";
    DeviceType[DeviceType["SafariExtension"] = 20] = "SafariExtension";
    DeviceType[DeviceType["SDK"] = 21] = "SDK";
    DeviceType[DeviceType["Server"] = 22] = "Server";
    DeviceType[DeviceType["WindowsCLI"] = 23] = "WindowsCLI";
    DeviceType[DeviceType["MacOsCLI"] = 24] = "MacOsCLI";
    DeviceType[DeviceType["LinuxCLI"] = 25] = "LinuxCLI";
    DeviceType[DeviceType["DuckDuckGoBrowser"] = 26] = "DuckDuckGoBrowser";
})(DeviceType || (DeviceType = {}));
const DeviceTypeMetadata = {
    [DeviceType.Android]: { category: "mobile", platform: "Android" },
    [DeviceType.iOS]: { category: "mobile", platform: "iOS" },
    [DeviceType.AndroidAmazon]: { category: "mobile", platform: "Amazon" },
    [DeviceType.ChromeExtension]: { category: "extension", platform: "Chrome" },
    [DeviceType.FirefoxExtension]: { category: "extension", platform: "Firefox" },
    [DeviceType.OperaExtension]: { category: "extension", platform: "Opera" },
    [DeviceType.EdgeExtension]: { category: "extension", platform: "Edge" },
    [DeviceType.VivaldiExtension]: { category: "extension", platform: "Vivaldi" },
    [DeviceType.SafariExtension]: { category: "extension", platform: "Safari" },
    [DeviceType.ChromeBrowser]: { category: "webApp", platform: "Chrome" },
    [DeviceType.FirefoxBrowser]: { category: "webApp", platform: "Firefox" },
    [DeviceType.OperaBrowser]: { category: "webApp", platform: "Opera" },
    [DeviceType.EdgeBrowser]: { category: "webApp", platform: "Edge" },
    [DeviceType.IEBrowser]: { category: "webApp", platform: "IE" },
    [DeviceType.SafariBrowser]: { category: "webApp", platform: "Safari" },
    [DeviceType.VivaldiBrowser]: { category: "webApp", platform: "Vivaldi" },
    [DeviceType.DuckDuckGoBrowser]: { category: "webApp", platform: "DuckDuckGo" },
    [DeviceType.UnknownBrowser]: { category: "webApp", platform: "Unknown" },
    [DeviceType.WindowsDesktop]: { category: "desktop", platform: "Windows" },
    [DeviceType.MacOsDesktop]: { category: "desktop", platform: "macOS" },
    [DeviceType.LinuxDesktop]: { category: "desktop", platform: "Linux" },
    [DeviceType.UWP]: { category: "desktop", platform: "Windows UWP" },
    [DeviceType.WindowsCLI]: { category: "cli", platform: "Windows" },
    [DeviceType.MacOsCLI]: { category: "cli", platform: "macOS" },
    [DeviceType.LinuxCLI]: { category: "cli", platform: "Linux" },
    [DeviceType.SDK]: { category: "sdk", platform: "" },
    [DeviceType.Server]: { category: "server", platform: "" },
};

;// ../../libs/common/src/enums/http-status-code.enum.ts
/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 *
 * @see {@link https://en.wikipedia.org/wiki/List_of_HTTP_status_codes}
 * src: https://gist.github.com/RWOverdijk/6cef816cfdf5722228e01cc05fd4b094
 */
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var HttpStatusCode;
(function (HttpStatusCode) {
    /**
     * The server has received the request headers and the client should proceed to send the request body
     * (in the case of a request for which a body needs to be sent; for example, a POST request).
     * Sending a large request body to a server after a request has been rejected for inappropriate headers would be inefficient.
     * To have a server check the request's headers, a client must send Expect: 100-continue as a header in its initial request
     * and receive a 100 Continue status code in response before sending the body. The response 417 Expectation Failed indicates the request should not be continued.
     */
    HttpStatusCode[HttpStatusCode["Continue"] = 100] = "Continue";
    /**
     * The requester has asked the server to switch protocols and the server has agreed to do so.
     */
    HttpStatusCode[HttpStatusCode["SwitchingProtocols"] = 101] = "SwitchingProtocols";
    /**
     * A WebDAV request may contain many sub-requests involving file operations, requiring a long time to complete the request.
     * This code indicates that the server has received and is processing the request, but no response is available yet.
     * This prevents the client from timing out and assuming the request was lost.
     */
    HttpStatusCode[HttpStatusCode["Processing"] = 102] = "Processing";
    // **********************************************************************************************************
    // 200s - SUCCESS
    // **********************************************************************************************************
    /**
     * Standard response for successful HTTP requests.
     * The actual response will depend on the request method used.
     * In a GET request, the response will contain an entity corresponding to the requested resource.
     * In a POST request, the response will contain an entity describing or containing the result of the action.
     */
    HttpStatusCode[HttpStatusCode["Ok"] = 200] = "Ok";
    /**
     * The request has been fulfilled, resulting in the creation of a new resource.
     */
    HttpStatusCode[HttpStatusCode["Created"] = 201] = "Created";
    /**
     * The request has been accepted for processing, but the processing has not been completed.
     * The request might or might not be eventually acted upon, and may be disallowed when processing occurs.
     */
    HttpStatusCode[HttpStatusCode["Accepted"] = 202] = "Accepted";
    /**
     * SINCE HTTP/1.1
     * The server is a transforming proxy that received a 200 OK from its origin,
     * but is returning a modified version of the origin's response.
     */
    HttpStatusCode[HttpStatusCode["NonAuthoritativeInformation"] = 203] = "NonAuthoritativeInformation";
    /**
     * The server successfully processed the request and is not returning any content.
     */
    HttpStatusCode[HttpStatusCode["NoContent"] = 204] = "NoContent";
    /**
     * The server successfully processed the request, but is not returning any content.
     * Unlike a 204 response, this response requires that the requester reset the document view.
     */
    HttpStatusCode[HttpStatusCode["ResetContent"] = 205] = "ResetContent";
    /**
     * The server is delivering only part of the resource (byte serving) due to a range header sent by the client.
     * The range header is used by HTTP clients to enable resuming of interrupted downloads,
     * or split a download into multiple simultaneous streams.
     */
    HttpStatusCode[HttpStatusCode["PartialContent"] = 206] = "PartialContent";
    /**
     * The message body that follows is an XML message and can contain a number of separate response codes,
     * depending on how many sub-requests were made.
     */
    HttpStatusCode[HttpStatusCode["MultiStatus"] = 207] = "MultiStatus";
    /**
     * The members of a DAV binding have already been enumerated in a preceding part of the (multistatus) response,
     * and are not being included again.
     */
    HttpStatusCode[HttpStatusCode["AlreadyReported"] = 208] = "AlreadyReported";
    /**
     * The server has fulfilled a request for the resource,
     * and the response is a representation of the result of one or more instance-manipulations applied to the current instance.
     */
    HttpStatusCode[HttpStatusCode["ImUsed"] = 226] = "ImUsed";
    // **********************************************************************************************************
    // 300s - Redirections
    // **********************************************************************************************************
    /**
     * Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation).
     * For example, this code could be used to present multiple video format options,
     * to list files with different filename extensions, or to suggest word-sense disambiguation.
     */
    HttpStatusCode[HttpStatusCode["MultipleChoices"] = 300] = "MultipleChoices";
    /**
     * This and all future requests should be directed to the given URI.
     */
    HttpStatusCode[HttpStatusCode["MovedPermanently"] = 301] = "MovedPermanently";
    /**
     * This is an example of industry practice contradicting the standard.
     * The HTTP/1.0 specification (RFC 1945) required the client to perform a temporary redirect
     * (the original describing phrase was "Moved Temporarily"), but popular browsers implemented 302
     * with the functionality of a 303 See Other. Therefore, HTTP/1.1 added status codes 303 and 307
     * to distinguish between the two behaviours. However, some Web applications and frameworks
     * use the 302 status code as if it were the 303.
     */
    HttpStatusCode[HttpStatusCode["Found"] = 302] = "Found";
    /**
     * SINCE HTTP/1.1
     * The response to the request can be found under another URI using a GET method.
     * When received in response to a POST (or PUT/DELETE), the client should presume that
     * the server has received the data and should issue a redirect with a separate GET message.
     */
    HttpStatusCode[HttpStatusCode["SeeOther"] = 303] = "SeeOther";
    /**
     * Indicates that the resource has not been modified since the version specified by the request headers If-Modified-Since or If-None-Match.
     * In such case, there is no need to retransmit the resource since the client still has a previously-downloaded copy.
     */
    HttpStatusCode[HttpStatusCode["NotModified"] = 304] = "NotModified";
    /**
     * SINCE HTTP/1.1
     * The requested resource is available only through a proxy, the address for which is provided in the response.
     * Many HTTP clients (such as Mozilla and Internet Explorer) do not correctly handle responses with this status code, primarily for security reasons.
     */
    HttpStatusCode[HttpStatusCode["UseProxy"] = 305] = "UseProxy";
    /**
     * No longer used. Originally meant "Subsequent requests should use the specified proxy."
     */
    HttpStatusCode[HttpStatusCode["SwitchProxy"] = 306] = "SwitchProxy";
    /**
     * SINCE HTTP/1.1
     * In this case, the request should be repeated with another URI; however, future requests should still use the original URI.
     * In contrast to how 302 was historically implemented, the request method is not allowed to be changed when reissuing the original request.
     * For example, a POST request should be repeated using another POST request.
     */
    HttpStatusCode[HttpStatusCode["TemporaryRedirect"] = 307] = "TemporaryRedirect";
    /**
     * The request and all future requests should be repeated using another URI.
     * 307 and 308 parallel the behaviors of 302 and 301, but do not allow the HTTP method to change.
     * So, for example, submitting a form to a permanently redirected resource may continue smoothly.
     */
    HttpStatusCode[HttpStatusCode["PermanentRedirect"] = 308] = "PermanentRedirect";
    // **********************************************************************************************************
    // 400s - Client / User messed up
    // **********************************************************************************************************
    /**
     * The server cannot or will not process the request due to an apparent client error
     * (e.g., malformed request syntax, too large size, invalid request message framing, or deceptive request routing).
     */
    HttpStatusCode[HttpStatusCode["BadRequest"] = 400] = "BadRequest";
    /**
     * Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet
     * been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the
     * requested resource. See Basic access authentication and Digest access authentication. 401 semantically means
     * "unauthenticated",i.e. the user does not have the necessary credentials.
     */
    HttpStatusCode[HttpStatusCode["Unauthorized"] = 401] = "Unauthorized";
    /**
     * Reserved for future use. The original intention was that this code might be used as part of some form of digital
     * cash or micro payment scheme, but that has not happened, and this code is not usually used.
     * Google Developers API uses this status if a particular developer has exceeded the daily limit on requests.
     */
    HttpStatusCode[HttpStatusCode["PaymentRequired"] = 402] = "PaymentRequired";
    /**
     * The request was valid, but the server is refusing action.
     * The user might not have the necessary permissions for a resource.
     */
    HttpStatusCode[HttpStatusCode["Forbidden"] = 403] = "Forbidden";
    /**
     * The requested resource could not be found but may be available in the future.
     * Subsequent requests by the client are permissible.
     */
    HttpStatusCode[HttpStatusCode["NotFound"] = 404] = "NotFound";
    /**
     * A request method is not supported for the requested resource;
     * for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
     */
    HttpStatusCode[HttpStatusCode["MethodNotAllowed"] = 405] = "MethodNotAllowed";
    /**
     * The requested resource is capable of generating only content not acceptable according to the Accept headers sent in the request.
     */
    HttpStatusCode[HttpStatusCode["NotAcceptable"] = 406] = "NotAcceptable";
    /**
     * The client must first authenticate itself with the proxy.
     */
    HttpStatusCode[HttpStatusCode["ProxyAuthenticationRequired"] = 407] = "ProxyAuthenticationRequired";
    /**
     * The server timed out waiting for the request.
     * According to HTTP specifications:
     * "The client did not produce a request within the time that the server was prepared to wait. The client MAY repeat the request without modifications at any later time."
     */
    HttpStatusCode[HttpStatusCode["RequestTimeout"] = 408] = "RequestTimeout";
    /**
     * Indicates that the request could not be processed because of conflict in the request,
     * such as an edit conflict between multiple simultaneous updates.
     */
    HttpStatusCode[HttpStatusCode["Conflict"] = 409] = "Conflict";
    /**
     * Indicates that the resource requested is no longer available and will not be available again.
     * This should be used when a resource has been intentionally removed and the resource should be purged.
     * Upon receiving a 410 status code, the client should not request the resource in the future.
     * Clients such as search engines should remove the resource from their indices.
     * Most use cases do not require clients and search engines to purge the resource, and a "404 Not Found" may be used instead.
     */
    HttpStatusCode[HttpStatusCode["Gone"] = 410] = "Gone";
    /**
     * The request did not specify the length of its content, which is required by the requested resource.
     */
    HttpStatusCode[HttpStatusCode["LengthRequired"] = 411] = "LengthRequired";
    /**
     * The server does not meet one of the preconditions that the requester put on the request.
     */
    HttpStatusCode[HttpStatusCode["PreconditionFailed"] = 412] = "PreconditionFailed";
    /**
     * The request is larger than the server is willing or able to process. Previously called "Request Entity Too Large".
     */
    HttpStatusCode[HttpStatusCode["PayloadTooLarge"] = 413] = "PayloadTooLarge";
    /**
     * The URI provided was too long for the server to process. Often the result of too much data being encoded as a query-string of a GET request,
     * in which case it should be converted to a POST request.
     * Called "Request-URI Too Long" previously.
     */
    HttpStatusCode[HttpStatusCode["UriTooLong"] = 414] = "UriTooLong";
    /**
     * The request entity has a media type which the server or resource does not support.
     * For example, the client uploads an image as image/svg+xml, but the server requires that images use a different format.
     */
    HttpStatusCode[HttpStatusCode["UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    /**
     * The client has asked for a portion of the file (byte serving), but the server cannot supply that portion.
     * For example, if the client asked for a part of the file that lies beyond the end of the file.
     * Called "Requested Range Not Satisfiable" previously.
     */
    HttpStatusCode[HttpStatusCode["RangeNotSatisfiable"] = 416] = "RangeNotSatisfiable";
    /**
     * The server cannot meet the requirements of the Expect request-header field.
     */
    HttpStatusCode[HttpStatusCode["ExpectationFailed"] = 417] = "ExpectationFailed";
    /**
     * This code was defined in 1998 as one of the traditional IETF April Fools' jokes, in RFC 2324, Hyper Text Coffee Pot Control Protocol,
     * and is not expected to be implemented by actual HTTP servers. The RFC specifies this code should be returned by
     * teapots requested to brew coffee. This HTTP status is used as an Easter egg in some websites, including Google.com.
     */
    HttpStatusCode[HttpStatusCode["IAmATeapot"] = 418] = "IAmATeapot";
    /**
     * The request was directed at a server that is not able to produce a response (for example because a connection reuse).
     */
    HttpStatusCode[HttpStatusCode["MisdirectedRequest"] = 421] = "MisdirectedRequest";
    /**
     * The request was well-formed but was unable to be followed due to semantic errors.
     */
    HttpStatusCode[HttpStatusCode["UnprocessableEntity"] = 422] = "UnprocessableEntity";
    /**
     * The resource that is being accessed is locked.
     */
    HttpStatusCode[HttpStatusCode["Locked"] = 423] = "Locked";
    /**
     * The request failed due to failure of a previous request (e.g., a PROPPATCH).
     */
    HttpStatusCode[HttpStatusCode["FailedDependency"] = 424] = "FailedDependency";
    /**
     * The client should switch to a different protocol such as TLS/1.0, given in the Upgrade header field.
     */
    HttpStatusCode[HttpStatusCode["UpgradeRequired"] = 426] = "UpgradeRequired";
    /**
     * The origin server requires the request to be conditional.
     * Intended to prevent "the 'lost update' problem, where a client
     * GETs a resource's state, modifies it, and PUTs it back to the server,
     * when meanwhile a third party has modified the state on the server, leading to a conflict."
     */
    HttpStatusCode[HttpStatusCode["PreconditionRequired"] = 428] = "PreconditionRequired";
    /**
     * The user has sent too many requests in a given amount of time. Intended for use with rate-limiting schemes.
     */
    HttpStatusCode[HttpStatusCode["TooManyRequests"] = 429] = "TooManyRequests";
    /**
     * The server is unwilling to process the request because either an individual header field,
     * or all the header fields collectively, are too large.
     */
    HttpStatusCode[HttpStatusCode["RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    /**
     * A server operator has received a legal demand to deny access to a resource or to a set of resources
     * that includes the requested resource. The code 451 was chosen as a reference to the novel Fahrenheit 451.
     */
    HttpStatusCode[HttpStatusCode["UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    // **********************************************************************************************************
    // 500s - Server messed up
    // **********************************************************************************************************
    /**
     * A generic error message, given when an unexpected condition was encountered and no more specific message is suitable.
     */
    HttpStatusCode[HttpStatusCode["InternalServerError"] = 500] = "InternalServerError";
    /**
     * The server either does not recognize the request method, or it lacks the ability to fulfill the request.
     * Usually this implies future availability (e.g., a new feature of a web-service API).
     */
    HttpStatusCode[HttpStatusCode["NotImplemented"] = 501] = "NotImplemented";
    /**
     * The server was acting as a gateway or proxy and received an invalid response from the upstream server.
     */
    HttpStatusCode[HttpStatusCode["BadGateway"] = 502] = "BadGateway";
    /**
     * The server is currently unavailable (because it is overloaded or down for maintenance).
     * Generally, this is a temporary state.
     */
    HttpStatusCode[HttpStatusCode["ServiceUnavailable"] = 503] = "ServiceUnavailable";
    /**
     * The server was acting as a gateway or proxy and did not receive a timely response from the upstream server.
     */
    HttpStatusCode[HttpStatusCode["GatewayTimeout"] = 504] = "GatewayTimeout";
    /**
     * The server does not support the HTTP protocol version used in the request
     */
    HttpStatusCode[HttpStatusCode["HttpVersionNotSupported"] = 505] = "HttpVersionNotSupported";
    /**
     * Transparent content negotiation for the request results in a circular reference.
     */
    HttpStatusCode[HttpStatusCode["VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    /**
     * The server is unable to store the representation needed to complete the request.
     */
    HttpStatusCode[HttpStatusCode["InsufficientStorage"] = 507] = "InsufficientStorage";
    /**
     * The server detected an infinite loop while processing the request.
     */
    HttpStatusCode[HttpStatusCode["LoopDetected"] = 508] = "LoopDetected";
    /**
     * Further extensions to the request are required for the server to fulfill it.
     */
    HttpStatusCode[HttpStatusCode["NotExtended"] = 510] = "NotExtended";
    /**
     * The client needs to authenticate to gain network access.
     * Intended for use by intercepting proxies used to control access to the network (e.g., "captive portals" used
     * to require agreement to Terms of Service before granting full Internet access via a Wi-Fi hotspot).
     */
    HttpStatusCode[HttpStatusCode["NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(HttpStatusCode || (HttpStatusCode = {}));

;// ../../libs/common/src/enums/integration-type.enum.ts
const IntegrationType = Object.freeze({
    Integration: "integration",
    SDK: "sdk",
    SSO: "sso",
    SCIM: "scim",
    BWDC: "bwdc",
    EVENT: "event",
    DEVICE: "device",
});

;// ../../libs/common/src/enums/native-messaging-version.enum.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var NativeMessagingVersion;
(function (NativeMessagingVersion) {
    NativeMessagingVersion[NativeMessagingVersion["One"] = 1] = "One";
    NativeMessagingVersion[NativeMessagingVersion["Latest"] = 1] = "Latest";
})(NativeMessagingVersion || (NativeMessagingVersion = {}));

;// ../../libs/common/src/enums/notification-type.enum.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var NotificationType;
(function (NotificationType) {
    NotificationType[NotificationType["SyncCipherUpdate"] = 0] = "SyncCipherUpdate";
    NotificationType[NotificationType["SyncCipherCreate"] = 1] = "SyncCipherCreate";
    NotificationType[NotificationType["SyncLoginDelete"] = 2] = "SyncLoginDelete";
    NotificationType[NotificationType["SyncFolderDelete"] = 3] = "SyncFolderDelete";
    NotificationType[NotificationType["SyncCiphers"] = 4] = "SyncCiphers";
    NotificationType[NotificationType["SyncVault"] = 5] = "SyncVault";
    NotificationType[NotificationType["SyncOrgKeys"] = 6] = "SyncOrgKeys";
    NotificationType[NotificationType["SyncFolderCreate"] = 7] = "SyncFolderCreate";
    NotificationType[NotificationType["SyncFolderUpdate"] = 8] = "SyncFolderUpdate";
    NotificationType[NotificationType["SyncCipherDelete"] = 9] = "SyncCipherDelete";
    NotificationType[NotificationType["SyncSettings"] = 10] = "SyncSettings";
    NotificationType[NotificationType["LogOut"] = 11] = "LogOut";
    NotificationType[NotificationType["SyncSendCreate"] = 12] = "SyncSendCreate";
    NotificationType[NotificationType["SyncSendUpdate"] = 13] = "SyncSendUpdate";
    NotificationType[NotificationType["SyncSendDelete"] = 14] = "SyncSendDelete";
    NotificationType[NotificationType["AuthRequest"] = 15] = "AuthRequest";
    NotificationType[NotificationType["AuthRequestResponse"] = 16] = "AuthRequestResponse";
    NotificationType[NotificationType["SyncOrganizations"] = 17] = "SyncOrganizations";
    NotificationType[NotificationType["SyncOrganizationStatusChanged"] = 18] = "SyncOrganizationStatusChanged";
    NotificationType[NotificationType["SyncOrganizationCollectionSettingChanged"] = 19] = "SyncOrganizationCollectionSettingChanged";
    NotificationType[NotificationType["Notification"] = 20] = "Notification";
    NotificationType[NotificationType["NotificationStatus"] = 21] = "NotificationStatus";
    NotificationType[NotificationType["RefreshSecurityTasks"] = 22] = "RefreshSecurityTasks";
    NotificationType[NotificationType["OrganizationBankAccountVerified"] = 23] = "OrganizationBankAccountVerified";
    NotificationType[NotificationType["ProviderBankAccountVerified"] = 24] = "ProviderBankAccountVerified";
    NotificationType[NotificationType["SyncPolicy"] = 25] = "SyncPolicy";
    NotificationType[NotificationType["AutoConfirmMember"] = 26] = "AutoConfirmMember";
    NotificationType[NotificationType["PremiumStatusChanged"] = 27] = "PremiumStatusChanged";
})(NotificationType || (NotificationType = {}));

;// ../../libs/common/src/enums/push-notification-logout-reason.enum.ts
const PushNotificationLogOutReasonType = Object.freeze({
    KdfChange: 0,
    KeyRotation: 1,
});

;// ../../libs/common/src/enums/index.ts








;// ../../libs/platform/src/services/browser-service.ts
function isBrowserSafariApi() {
    return (navigator.userAgent.indexOf(" Safari/") !== -1 &&
        navigator.userAgent.indexOf(" Chrome/") === -1 &&
        navigator.userAgent.indexOf(" Chromium/") === -1);
}

;// ../../libs/scheduling/src/scheduled-task-name.enum.ts
const ScheduledTaskNames = {
    generatePasswordClearClipboardTimeout: "generatePasswordClearClipboardTimeout",
    systemClearClipboardTimeout: "systemClearClipboardTimeout",
    loginStrategySessionTimeout: "loginStrategySessionTimeout",
    notificationsReconnectTimeout: "notificationsReconnectTimeout",
    fido2ClientAbortTimeout: "fido2ClientAbortTimeout",
    scheduleNextSyncInterval: "scheduleNextSyncInterval",
    eventUploadsInterval: "eventUploadsInterval",
    vaultTimeoutCheckInterval: "vaultTimeoutCheckInterval",
    clearPopupViewCache: "clearPopupViewCache",
    targetingRulesUpdate: "targetingRulesUpdate",
    phishingDomainUpdate: "phishingDomainUpdate",
};

;// ../../libs/scheduling/src/task-scheduler.service.ts
/* unused harmony import specifier */ var asyncScheduler;
// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore

/**
 * Creates a RXJS scheduler based on a {@link TaskSchedulerService}.
 *
 * @description This API defers to `TaskSchedulerService` to schedule a task to be ran
 * in the future but the task that is ran is NOT the remainder of your RXJS pipeline. The
 * task you want ran must instead be registered in a location reachable on a service worker
 * startup (on browser). An example of an acceptable location is the constructor of a service
 * you know is created in `MainBackground`. Uses of this API in other clients _can_ have the
 * `registerTaskHandler` call in more places, but in order to have it work across clients
 * it is recommended to register it according to the rules of browser.
 *
 * @link https://rxjs.dev/guide/scheduler#using-schedulers
 *
 * @example
 * ```ts
 * class MyService {
 *   constructor(messageListener: MessageListener, taskScheduler: TaskSchedulerService) {
 *    // VERY IMPORTANT!
 *    this.taskSchedulerService.registerTaskHandler(SchedulerTaskNames.myTaskName, async () => {
 *      await this.runEvent();
 *    });
 *
 *     messageListener.messages$(MY_MESSAGE).pipe(
 *        debounceTime(
 *          10 * 1000,
 *          toScheduler(taskScheduler, ShedulerTaskNames.myTaskName),
 *        ),
 *        switchMap(() => this.runEvent()),
 *     )
 *   }
 * }
 * ```
 *
 * @param taskScheduler The task scheduler service to use to schedule RXJS work.
 * @param taskName The name of the task that the handler should be registered and scheduled based on.
 * @returns A SchedulerLike object that can be passed in to RXJS operators like `delay` and `timeout`.
 */
function toScheduler(taskScheduler, taskName) {
    return new TaskSchedulerSheduler(taskScheduler, taskName);
}
class TaskSchedulerSheduler {
    constructor(taskSchedulerService, taskName) {
        this.taskSchedulerService = taskSchedulerService;
        this.taskName = taskName;
    }
    schedule(work, delay, state) {
        return this.taskSchedulerService.setTimeout(this.taskName, delay !== null && delay !== void 0 ? delay : 0);
    }
    now() {
        return asyncScheduler.now();
    }
}
class TaskSchedulerService {
}

;// ../../libs/scheduling/src/default-task-scheduler.service.ts
var default_task_scheduler_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


class DefaultTaskSchedulerService extends TaskSchedulerService {
    constructor(logService) {
        super();
        this.logService = logService;
        this.taskHandlers = new Map();
    }
    /**
     * Sets a timeout and returns the timeout id.
     *
     * @param taskName - The name of the task. Unused in the base implementation.
     * @param delayInMs - The delay in milliseconds.
     */
    setTimeout(taskName, delayInMs) {
        this.validateRegisteredTask(taskName);
        const timeoutHandle = globalThis.setTimeout(() => this.triggerTask(taskName), delayInMs);
        return new Subscription(() => globalThis.clearTimeout(timeoutHandle));
    }
    /**
     * Sets an interval and returns the interval id.
     *
     * @param taskName - The name of the task. Unused in the base implementation.
     * @param intervalInMs - The interval in milliseconds.
     * @param _initialDelayInMs - The initial delay in milliseconds. Unused in the base implementation.
     */
    setInterval(taskName, intervalInMs, _initialDelayInMs) {
        this.validateRegisteredTask(taskName);
        const intervalHandle = globalThis.setInterval(() => this.triggerTask(taskName), intervalInMs);
        return new Subscription(() => globalThis.clearInterval(intervalHandle));
    }
    /**
     * Registers a task handler.
     *
     * @param taskName - The name of the task.
     * @param handler - The task handler.
     */
    registerTaskHandler(taskName, handler) {
        const existingHandler = this.taskHandlers.get(taskName);
        if (existingHandler) {
            this.logService.warning(`Task handler for ${taskName} already exists. Overwriting.`);
            this.unregisterTaskHandler(taskName);
        }
        this.taskHandlers.set(taskName, handler);
    }
    /**
     * Unregisters a task handler.
     *
     * @param taskName - The name of the task.
     */
    unregisterTaskHandler(taskName) {
        this.taskHandlers.delete(taskName);
    }
    /**
     * Triggers a task.
     *
     * @param taskName - The name of the task.
     * @param _periodInMinutes - The period in minutes. Unused in the base implementation.
     */
    triggerTask(taskName, _periodInMinutes) {
        return default_task_scheduler_service_awaiter(this, void 0, void 0, function* () {
            const handler = this.taskHandlers.get(taskName);
            if (handler) {
                handler();
            }
        });
    }
    /**
     * Validates that a task handler is registered.
     *
     * @param taskName - The name of the task.
     */
    validateRegisteredTask(taskName) {
        if (!this.taskHandlers.has(taskName)) {
            throw new Error(`Task handler for ${taskName} not registered. Unable to schedule task.`);
        }
    }
}

;// ../../libs/scheduling/src/index.ts




;// ../../libs/common/src/platform/scheduling/index.ts


;// ../../libs/platform/src/background-sync/background-sync.service.ts
/* unused harmony import specifier */ var background_sync_service_ScheduledTaskNames;

/**
 * The default interval between background syncs.
 * 300,000ms = 5 minutes
 */
const DEFAULT_SYNC_INTERVAL_MS = 300000;
/**
 * Service responsible for registering and managing background synchronization for the browser extension.
 * Handles scheduling of periodic sync operations using the task scheduler infrastructure.
 */
class BackgroundSyncService {
    /**
     * Creates a new instance of BackgroundSyncService.
     * @param taskSchedulerService - Service that handles scheduling and execution of periodic tasks
     */
    constructor(taskSchedulerService) {
        this.taskSchedulerService = taskSchedulerService;
    }
    /**
     * Registers a callback function to be executed when the sync interval task is triggered.
     * This associates the sync task name with the provided callback in the task scheduler.
     *
     * @param syncCallback - The function to execute when the sync task is triggered
     */
    register(syncCallback) {
        this.taskSchedulerService.registerTaskHandler(background_sync_service_ScheduledTaskNames.scheduleNextSyncInterval, syncCallback);
    }
    /**
     * Initializes the background sync service by scheduling the sync interval task.
     * This sets up a recurring timer that triggers the registered sync callback at regular intervals.
     *
     * @param intervalMs - The interval in milliseconds between sync operations (defaults to 300000ms/5 minutes)
     */
    init(intervalMs = DEFAULT_SYNC_INTERVAL_MS) {
        intervalMs = intervalMs < 1 ? DEFAULT_SYNC_INTERVAL_MS : intervalMs;
        this.taskSchedulerService.setInterval(background_sync_service_ScheduledTaskNames.scheduleNextSyncInterval, intervalMs);
    }
}

;// ../../libs/platform/src/background-sync/index.ts


;// ../../libs/platform/src/util.ts
function toURL(input) {
    if (input instanceof URL) {
        return input;
    }
    try {
        return new URL(input);
    }
    catch (_a) {
        return null;
    }
}
function effectiveOrigin(url) {
    // The URL spec returns "null" for .origin on non-special schemes
    // (e.g. chrome-extension://) so we build the origin from protocol + host instead.
    // An empty host means no meaningful origin can be compared (file:, data:, etc.).
    if (!url.host) {
        return null;
    }
    return `${url.protocol}//${url.host}`;
}
/**
 * Compares two URLs to determine whether the suspect URL originates from the
 * same host as the canonical URL.
 *
 * Both arguments accept either a string or an existing {@link URL} object.
 *
 * Returns `false` when:
 * - Either argument cannot be parsed as a valid URL
 * - Either URL has no host (e.g. `file:`, `data:` schemes), since URLs without
 *   a meaningful host cannot be distinguished by origin
 *
 * @param canonical - The reference URL whose origin acts as the baseline.
 * @param suspect - The URL being tested against the canonical origin.
 * @returns `true` if both URLs share the same scheme, host, and port; `false` otherwise.
 */
function urlOriginsMatch(canonical, suspect) {
    const canonicalUrl = toURL(canonical);
    const suspectUrl = toURL(suspect);
    if (!canonicalUrl || !suspectUrl) {
        return false;
    }
    const canonicalOrigin = effectiveOrigin(canonicalUrl);
    const suspectOrigin = effectiveOrigin(suspectUrl);
    // Safari sends the extension GUID in uppercase while the canonical URL is lowercase,
    // Normalize both to lowercase and trim trailing slashes to avoid browser specific issues.
    const normalizedCanonicalOrigin = canonicalOrigin === null || canonicalOrigin === void 0 ? void 0 : canonicalOrigin.replace(/\/$/, "").toLowerCase();
    const normalizedSuspectOrigin = suspectOrigin === null || suspectOrigin === void 0 ? void 0 : suspectOrigin.replace(/\/$/, "").toLowerCase();
    if (!normalizedCanonicalOrigin || !normalizedSuspectOrigin) {
        return false;
    }
    return normalizedCanonicalOrigin === normalizedSuspectOrigin;
}

;// ../../libs/platform/src/index.ts




;// ./src/browser/safariApp.ts

class SafariApp {
    static sendMessageToApp(command, data = null, resolveNow = false) {
        if (!BrowserApi.isSafariApi) {
            return Promise.resolve(null);
        }
        return new Promise((resolve) => {
            const now = new Date();
            const messageId = now.getTime().toString() + "_" + Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
            browser.runtime.sendNativeMessage("com.bitwarden.desktop", {
                id: messageId,
                command: command,
                data: data,
                responseData: null,
            }, (response) => {
                resolve(response);
            });
        });
    }
}

;// ../../libs/logging/src/log-level.ts
// FIXME: update to use a const object instead of a typescript enum
// eslint-disable-next-line @bitwarden/platform/no-enums
var LogLevel;
(function (LogLevel) {
    LogLevel[LogLevel["Debug"] = 0] = "Debug";
    LogLevel[LogLevel["Info"] = 1] = "Info";
    LogLevel[LogLevel["Warning"] = 2] = "Warning";
    LogLevel[LogLevel["Error"] = 3] = "Error";
})(LogLevel || (LogLevel = {}));

;// ../../libs/logging/src/console-log.service.ts

class ConsoleLogService {
    constructor(isDev, filter = null) {
        this.isDev = isDev;
        this.filter = filter;
        this.timersMap = new Map();
    }
    debug(message, ...optionalParams) {
        if (!this.isDev) {
            return;
        }
        this.write(LogLevel.Debug, message, ...optionalParams);
    }
    info(message, ...optionalParams) {
        this.write(LogLevel.Info, message, ...optionalParams);
    }
    warning(message, ...optionalParams) {
        this.write(LogLevel.Warning, message, ...optionalParams);
    }
    error(message, ...optionalParams) {
        this.write(LogLevel.Error, message, ...optionalParams);
    }
    write(level, message, ...optionalParams) {
        if (this.filter != null && this.filter(level)) {
            return;
        }
        switch (level) {
            case LogLevel.Debug:
                // eslint-disable-next-line
                console.log(message, ...optionalParams);
                break;
            case LogLevel.Info:
                // eslint-disable-next-line
                console.log(message, ...optionalParams);
                break;
            case LogLevel.Warning:
                // eslint-disable-next-line
                console.warn(message, ...optionalParams);
                break;
            case LogLevel.Error:
                // eslint-disable-next-line
                console.error(message, ...optionalParams);
                break;
            default:
                break;
        }
    }
    measure(start, trackGroup, track, name, properties) {
        const measureName = `[${track}]: ${name}`;
        const measure = performance.measure(measureName, {
            start: start,
            detail: {
                devtools: {
                    dataType: "track-entry",
                    track,
                    trackGroup,
                    properties,
                },
            },
        });
        this.info(`${measureName} took ${measure.duration}`, properties);
        return measure;
    }
    mark(name) {
        const mark = performance.mark(name, {
            detail: {
                devtools: {
                    dataType: "marker",
                },
            },
        });
        this.info(mark.name, new Date().toISOString());
        return mark;
    }
}

;// ../../libs/logging/src/flight-recorder.ts
/* unused harmony import specifier */ var FlightRecorderClient;
var flight_recorder_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

/**
 * Framework-agnostic wrapper around the SDK's {@link FlightRecorderClient}.
 *
 * The underlying WASM must be loaded before the client can be used. Callers
 * provide a `sdkReady` promise (typically `SdkLoadService.Ready`) that resolves
 * once the SDK is initialized. The client is lazily created on first access.
 */
class FlightRecorder {
    /**
     * @param sdkReady - A promise that resolves when the SDK WASM has been loaded
     *   and initialized. Pass `SdkLoadService.Ready` in DI-enabled contexts.
     */
    constructor(sdkReady) {
        this.sdkReady = sdkReady;
    }
    /**
     * Read all events currently in the flight recorder buffer.
     */
    read() {
        return flight_recorder_awaiter(this, void 0, void 0, function* () {
            const client = yield this.getClient();
            return client.read();
        });
    }
    /**
     * Get the current event count without reading event contents.
     */
    count() {
        return flight_recorder_awaiter(this, void 0, void 0, function* () {
            const client = yield this.getClient();
            return client.count();
        });
    }
    getClient() {
        if (this.clientPromise == null) {
            this.clientPromise = this.sdkReady.then(() => new FlightRecorderClient());
        }
        return this.clientPromise;
    }
}

// EXTERNAL MODULE: ../../node_modules/papaparse/papaparse.min.js
var papaparse_min = __webpack_require__(98869);
;// ../../libs/logging/src/flight-recorder-export.ts
/* unused harmony import specifier */ var papa;

const CSV_COLUMNS = (/* unused pure expression or super */ null && (["timestamp", "level", "target", "message", "fields"]));
/**
 * Build a CSV download payload for {@link FlightRecorderEvent}s.
 *
 * Returns a `fileName` of the form `Bitwarden-diagnostic-report-YYYY-MM-DD.csv`
 * and a CSV-encoded `blobData` ready to pass to `FileDownloadService.download`.
 *
 * @param events The events to encode.
 * @param date The date used for the filename. Defaults to `new Date()`.
 */
function buildFlightRecorderCsvExport(events, date = new Date()) {
    const rows = events.map((e) => ({
        timestamp: new Date(e.timestamp).toISOString(),
        level: e.level,
        target: e.target,
        message: e.message,
        fields: JSON.stringify(e.fields),
    }));
    const blobData = papa.unparse(rows, {
        columns: [...CSV_COLUMNS],
        header: true,
    });
    const datePart = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
    const fileName = `Bitwarden-diagnostic-report-${datePart}.csv`;
    return { fileName, blobData };
}

;// ../../libs/logging/src/index.ts






;// ../../libs/common/src/platform/services/console-log.service.ts


;// ./src/platform/services/browser-clipboard.service.ts
var browser_clipboard_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};

class BrowserClipboardService {
    /**
     * Copies the given text to the user's clipboard.
     *
     * @param globalContext - The global window context.
     * @param text - The text to copy.
     */
    static copy(globalContext, text) {
        return browser_clipboard_service_awaiter(this, void 0, void 0, function* () {
            if (!BrowserClipboardService.isClipboardApiSupported(globalContext, "writeText")) {
                this.useLegacyCopyMethod(globalContext, text);
                return;
            }
            try {
                yield globalContext.navigator.clipboard.writeText(text);
            }
            catch (error) {
                BrowserClipboardService.consoleLogService.debug(`Error copying to clipboard using the clipboard API, attempting legacy method: ${error}`);
                this.useLegacyCopyMethod(globalContext, text);
            }
        });
    }
    /**
     * Reads the user's clipboard and returns the text.
     *
     * @param globalContext - The global window context.
     */
    static read(globalContext) {
        return browser_clipboard_service_awaiter(this, void 0, void 0, function* () {
            if (!BrowserClipboardService.isClipboardApiSupported(globalContext, "readText")) {
                return this.useLegacyReadMethod(globalContext);
            }
            try {
                return yield globalContext.navigator.clipboard.readText();
            }
            catch (error) {
                BrowserClipboardService.consoleLogService.debug(`Error reading from clipboard using the clipboard API, attempting legacy method: ${error}`);
                return this.useLegacyReadMethod(globalContext);
            }
        });
    }
    /**
     * Copies the given text to the user's clipboard using the legacy `execCommand` method. This
     * method is used as a fallback when the clipboard API is not supported or fails.
     *
     * @param globalContext - The global window context.
     * @param text - The text to copy.
     */
    static useLegacyCopyMethod(globalContext, text) {
        if (!BrowserClipboardService.isLegacyClipboardMethodSupported(globalContext, "copy")) {
            BrowserClipboardService.consoleLogService.warning("Legacy copy method not supported");
            return;
        }
        const textareaElement = globalContext.document.createElement("textarea");
        textareaElement.textContent = !text ? " " : text;
        textareaElement.style.position = "fixed";
        globalContext.document.body.appendChild(textareaElement);
        textareaElement.select();
        try {
            const success = globalContext.document.execCommand("copy");
            if (!success) {
                BrowserClipboardService.consoleLogService.warning("execCommand('copy') returned false");
            }
        }
        catch (error) {
            BrowserClipboardService.consoleLogService.warning(`Error writing to clipboard: ${error}`);
        }
        finally {
            globalContext.document.body.removeChild(textareaElement);
        }
    }
    /**
     * Reads the user's clipboard using the legacy `execCommand` method. This method is used as a
     * fallback when the clipboard API is not supported or fails.
     *
     * @param globalContext - The global window context.
     */
    static useLegacyReadMethod(globalContext) {
        if (!BrowserClipboardService.isLegacyClipboardMethodSupported(globalContext, "paste")) {
            BrowserClipboardService.consoleLogService.warning("Legacy paste method not supported");
            return "";
        }
        const textareaElement = globalContext.document.createElement("textarea");
        textareaElement.style.position = "fixed";
        globalContext.document.body.appendChild(textareaElement);
        textareaElement.focus();
        try {
            return globalContext.document.execCommand("paste") ? textareaElement.value : "";
        }
        catch (error) {
            BrowserClipboardService.consoleLogService.warning(`Error reading from clipboard: ${error}`);
        }
        finally {
            globalContext.document.body.removeChild(textareaElement);
        }
        return "";
    }
    /**
     * Checks if the clipboard API is supported in the current environment.
     *
     * @param globalContext - The global window context.
     * @param method - The clipboard API method to check for support.
     */
    static isClipboardApiSupported(globalContext, method) {
        return "clipboard" in globalContext.navigator && method in globalContext.navigator.clipboard;
    }
    /**
     * Checks if the legacy clipboard method is supported in the current environment.
     *
     * @param globalContext - The global window context.
     * @param method - The legacy clipboard method to check for support.
     */
    static isLegacyClipboardMethodSupported(globalContext, method) {
        return ("queryCommandSupported" in globalContext.document &&
            globalContext.document.queryCommandSupported(method));
    }
}
BrowserClipboardService.consoleLogService = new ConsoleLogService(false);
/* harmony default export */ var browser_clipboard_service = (BrowserClipboardService);

;// ./src/platform/services/platform-utils/browser-platform-utils.service.ts
var browser_platform_utils_service_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore





class BrowserPlatformUtilsService {
    constructor(clipboardWriteCallback, globalContext, offscreenDocumentService) {
        this.clipboardWriteCallback = clipboardWriteCallback;
        this.globalContext = globalContext;
        this.offscreenDocumentService = offscreenDocumentService;
    }
    static getDevice(globalContext) {
        if (this.deviceCache) {
            return this.deviceCache;
        }
        // ORDERING MATTERS HERE
        // Ordered from most specific to least specific. We try to discern the greatest detail
        // for the type of extension the user is on by checking specific cases first and as we go down
        // the list we hope to catch all by the most generic clients they could be on.
        if (BrowserPlatformUtilsService.isFirefox()) {
            this.deviceCache = DeviceType.FirefoxExtension;
        }
        else if (BrowserPlatformUtilsService.isOpera(globalContext)) {
            this.deviceCache = DeviceType.OperaExtension;
        }
        else if (BrowserPlatformUtilsService.isEdge()) {
            this.deviceCache = DeviceType.EdgeExtension;
        }
        else if (BrowserPlatformUtilsService.isVivaldi()) {
            this.deviceCache = DeviceType.VivaldiExtension;
        }
        else if (BrowserPlatformUtilsService.isChrome(globalContext)) {
            this.deviceCache = DeviceType.ChromeExtension;
        }
        else if (BrowserPlatformUtilsService.isSafari(globalContext)) {
            this.deviceCache = DeviceType.SafariExtension;
        }
        return this.deviceCache;
    }
    getDevice() {
        return BrowserPlatformUtilsService.getDevice(this.globalContext);
    }
    getDeviceString() {
        const device = DeviceType[this.getDevice()].toLowerCase();
        return device.replace("extension", "");
    }
    getClientType() {
        return ClientType.Browser;
    }
    static isFirefox() {
        return (navigator.userAgent.indexOf(" Firefox/") !== -1 ||
            navigator.userAgent.indexOf(" Gecko/") !== -1);
    }
    isFirefox() {
        return this.getDevice() === DeviceType.FirefoxExtension;
    }
    static isChrome(globalContext) {
        return globalContext.chrome && navigator.userAgent.indexOf(" Chrome/") !== -1;
    }
    isChrome() {
        return this.getDevice() === DeviceType.ChromeExtension;
    }
    static isEdge() {
        return navigator.userAgent.indexOf(" Edg/") !== -1;
    }
    isEdge() {
        return this.getDevice() === DeviceType.EdgeExtension;
    }
    static isOpera(globalContext) {
        var _a;
        return (!!((_a = globalContext.opr) === null || _a === void 0 ? void 0 : _a.addons) ||
            !!globalContext.opera ||
            navigator.userAgent.indexOf(" OPR/") >= 0);
    }
    isOpera() {
        return this.getDevice() === DeviceType.OperaExtension;
    }
    static isVivaldi() {
        return navigator.userAgent.indexOf(" Vivaldi/") !== -1;
    }
    isVivaldi() {
        return this.getDevice() === DeviceType.VivaldiExtension;
    }
    static isSafari(globalContext) {
        // Opera masquerades as Safari, so make sure we're not there first
        return (!BrowserPlatformUtilsService.isOpera(globalContext) &&
            navigator.userAgent.indexOf(" Safari/") !== -1);
    }
    static safariVersion() {
        var _a;
        return (_a = navigator.userAgent.match("Version/([0-9.]*)")) === null || _a === void 0 ? void 0 : _a[1];
    }
    isSafari() {
        return this.getDevice() === DeviceType.SafariExtension;
    }
    isChromium() {
        return this.isChrome() || this.isEdge() || this.isOpera() || this.isVivaldi();
    }
    /**
     * Safari previous to version 16.1 had a bug which caused artifacts on hover in large extension popups.
     * https://bugs.webkit.org/show_bug.cgi?id=218704
     */
    static shouldApplySafariHeightFix(globalContext) {
        var _a;
        if (BrowserPlatformUtilsService.getDevice(globalContext) !== DeviceType.SafariExtension) {
            return false;
        }
        const version = BrowserPlatformUtilsService.safariVersion();
        const parts = (_a = version === null || version === void 0 ? void 0 : version.split(".")) === null || _a === void 0 ? void 0 : _a.map((v) => Number(v));
        return (parts === null || parts === void 0 ? void 0 : parts[0]) < 16 || ((parts === null || parts === void 0 ? void 0 : parts[0]) === 16 && (parts === null || parts === void 0 ? void 0 : parts[1]) === 0);
    }
    isIE() {
        return false;
    }
    isMacAppStore() {
        return false;
    }
    isPopupOpen() {
        return browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
            return BrowserApi.isPopupOpen();
        });
    }
    isAnyViewFocused() {
        return browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
            return BrowserApi.isAnyViewFocused();
        });
    }
    lockTimeout() {
        return null;
    }
    launchUri(uri, options) {
        // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        BrowserApi.createNewTab(uri, options && options.extensionPage === true);
    }
    getApplicationVersion() {
        var _a;
        const manifest = chrome.runtime.getManifest();
        return Promise.resolve((_a = manifest.version_name) !== null && _a !== void 0 ? _a : manifest.version);
    }
    getApplicationVersionNumber() {
        const manifest = chrome.runtime.getManifest();
        return Promise.resolve(manifest.version.split(RegExp("[+|-]"))[0].trim());
    }
    supportsWebAuthn(win) {
        return typeof PublicKeyCredential !== "undefined";
    }
    supportsDuo() {
        return true;
    }
    supportsAutofill() {
        return true;
    }
    supportsFileDownloads() {
        return false;
    }
    isDev() {
        return "production" === "development";
    }
    isSelfHost() {
        return false;
    }
    /**
     * Copies the passed text to the clipboard. For Safari, this will use
     * the native messaging API to send the text to the Bitwarden app. If
     * the extension is using manifest v3 and the calling context does not
     * have direct DOM access (e.g. a service worker), the offscreen document
     * API will be used to copy the text to the clipboard. Otherwise, the
     * browser's clipboard API will be used directly, which requires a focused
     * document with a user gesture (e.g. the popup).
     *
     * @param text - The text to copy to the clipboard.
     * @param options - Options for the clipboard operation.
     */
    copyToClipboard(text, options) {
        const windowContext = (options === null || options === void 0 ? void 0 : options.window) || this.globalContext;
        const clearing = Boolean(options === null || options === void 0 ? void 0 : options.clearing);
        const clearMs = (options === null || options === void 0 ? void 0 : options.clearMs) || null;
        const handleClipboardWriteCallback = () => {
            if (!clearing && this.clipboardWriteCallback != null) {
                this.clipboardWriteCallback(text, clearMs);
            }
        };
        if (this.isSafari()) {
            void SafariApp.sendMessageToApp("copyToClipboard", text).then(handleClipboardWriteCallback);
            return;
        }
        if (this.isChrome() && text === "") {
            text = "\u0000";
        }
        if (BrowserApi.isManifestVersion(3) &&
            this.offscreenDocumentService.offscreenApiSupported() &&
            typeof windowContext.document === "undefined") {
            void this.triggerOffscreenCopyToClipboard(text).then(handleClipboardWriteCallback);
            return;
        }
        void browser_clipboard_service.copy(windowContext, text).then(handleClipboardWriteCallback);
    }
    /**
     * Reads the text from the clipboard. For Safari, this will use the
     * native messaging API to request the text from the Bitwarden app. If
     * the extension is using manifest v3 and the calling context does not
     * have direct DOM access (e.g. a service worker), the offscreen document
     * API will be used to read the text from the clipboard. Otherwise, the
     * browser's clipboard API will be used directly.
     *
     * @param options - Options for the clipboard operation.
     */
    readFromClipboard(options) {
        return browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
            const windowContext = (options === null || options === void 0 ? void 0 : options.window) || this.globalContext;
            if (this.isSafari()) {
                return yield SafariApp.sendMessageToApp("readFromClipboard");
            }
            if (BrowserApi.isManifestVersion(3) &&
                this.offscreenDocumentService.offscreenApiSupported() &&
                typeof windowContext.document === "undefined") {
                return yield this.triggerOffscreenReadFromClipboard();
            }
            return yield browser_clipboard_service.read(windowContext);
        });
    }
    supportsSecureStorage() {
        return false;
    }
    getAutofillKeyboardShortcut() {
        return browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
            let autofillCommand;
            // You can not change the command in Safari or obtain it programmatically
            if (this.isSafari()) {
                autofillCommand = "Cmd+Shift+L";
            }
            else if (this.isFirefox()) {
                autofillCommand = (yield browser.commands.getAll()).find((c) => c.name === ExtensionCommand.AutofillLogin).shortcut;
                // Firefox is returning Ctrl instead of Cmd for the modifier key on macOS if
                // the command is the default one set on installation.
                if ((yield browser.runtime.getPlatformInfo()).os === "mac" &&
                    autofillCommand === "Ctrl+Shift+L") {
                    autofillCommand = "Cmd+Shift+L";
                }
            }
            else {
                yield new Promise((resolve) => chrome.commands.getAll((c) => resolve((autofillCommand = c.find((c) => c.name === ExtensionCommand.AutofillLogin).shortcut))));
            }
            return autofillCommand;
        });
    }
    packageType() {
        return browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
            switch (this.getDevice()) {
                case DeviceType.ChromeExtension:
                    return "Chrome Extension";
                case DeviceType.FirefoxExtension:
                    return "Firefox Extension";
                case DeviceType.OperaExtension:
                    return "Opera Extension";
                case DeviceType.EdgeExtension:
                    return "Edge Extension";
                case DeviceType.VivaldiExtension:
                    return "Vivaldi Extension";
                case DeviceType.SafariExtension:
                    return "Safari Extension";
                default:
                    return "Unknown Browser Extension";
            }
        });
    }
    /**
     * Triggers the offscreen document API to copy the text to the clipboard.
     */
    triggerOffscreenCopyToClipboard(text) {
        return browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
            yield this.offscreenDocumentService.withDocument([chrome.offscreen.Reason.CLIPBOARD], "Write text to the clipboard.", () => browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
                yield BrowserApi.sendMessageWithResponse("offscreenCopyToClipboard", { text });
            }));
        });
    }
    /**
     * Triggers the offscreen document API to read the text from the clipboard.
     */
    triggerOffscreenReadFromClipboard() {
        return browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
            const response = yield this.offscreenDocumentService.withDocument([chrome.offscreen.Reason.CLIPBOARD], "Read text from the clipboard.", () => browser_platform_utils_service_awaiter(this, void 0, void 0, function* () {
                return yield BrowserApi.sendMessageWithResponse("offscreenReadFromClipboard");
            }));
            if (typeof response === "string") {
                return response;
            }
            return "";
        });
    }
}
BrowserPlatformUtilsService.deviceCache = null;

;// ./src/platform/browser/browser-api.register-content-scripts-polyfill.ts
var browser_api_register_content_scripts_polyfill_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore
/**
 * MIT License
 *
 * Copyright (c) Federico Brigante <me@fregante.com> (https://fregante.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 *
 * @see https://github.com/fregante/content-scripts-register-polyfill
 * @version 4.0.2
 */


let registerContentScripts;
function registerContentScriptsPolyfill(contentScriptOptions, callback) {
    return browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () {
        if (!registerContentScripts) {
            registerContentScripts = buildRegisterContentScriptsPolyfill();
        }
        return registerContentScripts(contentScriptOptions, callback);
    });
}
function buildRegisterContentScriptsPolyfill() {
    var _a, _b;
    const logService = new ConsoleLogService(false);
    const chromeProxy = globalThis.chrome && NestedProxy(globalThis.chrome);
    const patternValidationRegex = /^(https?|wss?|file|ftp|\*):\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^file:\/\/\/.*$|^resource:\/\/(\*|\*\.[^*/]+|[^*/]+)\/.*$|^about:/;
    const isFirefox = (_a = globalThis.navigator) === null || _a === void 0 ? void 0 : _a.userAgent.includes("Firefox/");
    const gotScripting = Boolean((_b = globalThis.chrome) === null || _b === void 0 ? void 0 : _b.scripting);
    const gotNavigation = typeof chrome === "object" && "webNavigation" in chrome;
    function NestedProxy(target) {
        return new Proxy(target, {
            get(target, prop) {
                if (!target[prop]) {
                    return;
                }
                if (typeof target[prop] !== "function") {
                    return NestedProxy(target[prop]);
                }
                return (...arguments_) => new Promise((resolve, reject) => {
                    target[prop](...arguments_, (result) => {
                        if (chrome.runtime.lastError) {
                            reject(new Error(chrome.runtime.lastError.message));
                        }
                        else {
                            resolve(result);
                        }
                    });
                });
            },
        });
    }
    function assertValidPattern(matchPattern) {
        if (!isValidPattern(matchPattern)) {
            throw new Error(`${matchPattern} is an invalid pattern, it must match ${String(patternValidationRegex)}`);
        }
    }
    function isValidPattern(matchPattern) {
        return matchPattern === "<all_urls>" || patternValidationRegex.test(matchPattern);
    }
    function getRawPatternRegex(matchPattern) {
        assertValidPattern(matchPattern);
        let [, protocol, host = "", pathname] = matchPattern.split(/(^[^:]+:[/][/])([^/]+)?/);
        protocol = protocol
            .replace("*", isFirefox ? "(https?|wss?)" : "https?")
            .replaceAll(/[/]/g, "[/]");
        if (host === "*") {
            host = "[^/]+";
        }
        else if (host) {
            host = host
                .replace(/^[*][.]/, "([^/]+.)*")
                .replaceAll(/[.]/g, "[.]")
                .replace(/[*]$/, "[^.]+");
        }
        pathname = pathname
            .replaceAll(/[/]/g, "[/]")
            .replaceAll(/[.]/g, "[.]")
            .replaceAll(/[*]/g, ".*");
        return "^" + protocol + host + "(" + pathname + ")?$";
    }
    function patternToRegex(...matchPatterns) {
        if (matchPatterns.length === 0) {
            return /$./;
        }
        if (matchPatterns.includes("<all_urls>")) {
            // <all_urls> regex
            return /^(https?|file|ftp):[/]+/;
        }
        if (matchPatterns.includes("*://*/*")) {
            // all stars regex
            return isFirefox ? /^(https?|wss?):[/][/][^/]+([/].*)?$/ : /^https?:[/][/][^/]+([/].*)?$/;
        }
        return new RegExp(matchPatterns.map((x) => getRawPatternRegex(x)).join("|"));
    }
    function castAllFramesTarget(target) {
        if (typeof target === "object") {
            return Object.assign(Object.assign({}, target), { allFrames: false });
        }
        return {
            tabId: target,
            frameId: undefined,
            allFrames: true,
        };
    }
    function castArray(possibleArray) {
        if (Array.isArray(possibleArray)) {
            return possibleArray;
        }
        return [possibleArray];
    }
    function createTarget(tabId, frameId, allFrames) {
        if (frameId === undefined) {
            return {
                tabId,
                frameIds: undefined,
                allFrames: allFrames,
            };
        }
        else {
            return {
                tabId,
                frameIds: [frameId],
                allFrames: undefined,
            };
        }
    }
    function insertCSS(_a) {
        return browser_api_register_content_scripts_polyfill_awaiter(this, arguments, void 0, function* ({ tabId, frameId, files, allFrames, matchAboutBlank, runAt, }, { ignoreTargetErrors } = {}) {
            const everyInsertion = Promise.all(files.map((content) => browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () {
                if (typeof content === "string") {
                    content = { file: content };
                }
                if (gotScripting) {
                    if ("file" in content) {
                        return chrome.scripting.insertCSS({
                            target: createTarget(tabId, frameId, allFrames),
                            files: [content.file],
                        });
                    }
                    else {
                        return chrome.scripting.insertCSS({
                            target: createTarget(tabId, frameId, allFrames),
                            css: content.code,
                        });
                    }
                }
                return chromeProxy.tabs.insertCSS(tabId, Object.assign(Object.assign({}, content), { matchAboutBlank,
                    allFrames,
                    frameId, runAt: runAt !== null && runAt !== void 0 ? runAt : "document_start" }));
            })));
            if (ignoreTargetErrors) {
                yield catchTargetInjectionErrors(everyInsertion);
            }
            else {
                yield everyInsertion;
            }
        });
    }
    function assertNoCode(files) {
        if (files.some((content) => "code" in content)) {
            throw new Error("chrome.scripting does not support injecting strings of `code`");
        }
    }
    function executeScript(_a) {
        return browser_api_register_content_scripts_polyfill_awaiter(this, arguments, void 0, function* ({ tabId, frameId, files, allFrames, matchAboutBlank, runAt, }, { ignoreTargetErrors } = {}) {
            const normalizedFiles = files.map((file) => (typeof file === "string" ? { file } : file));
            if (gotScripting) {
                assertNoCode(normalizedFiles);
                const injection = chrome.scripting.executeScript({
                    target: createTarget(tabId, frameId, allFrames),
                    files: normalizedFiles.map(({ file }) => file),
                });
                if (ignoreTargetErrors) {
                    yield catchTargetInjectionErrors(injection);
                }
                else {
                    yield injection;
                }
                return;
            }
            const executions = [];
            for (const content of normalizedFiles) {
                if ("code" in content) {
                    yield executions.at(-1);
                }
                executions.push(chromeProxy.tabs.executeScript(tabId, Object.assign(Object.assign({}, content), { matchAboutBlank,
                    allFrames,
                    frameId,
                    runAt })));
            }
            if (ignoreTargetErrors) {
                yield catchTargetInjectionErrors(Promise.all(executions));
            }
            else {
                yield Promise.all(executions);
            }
        });
    }
    function injectContentScript(where_1, scripts_1) {
        return browser_api_register_content_scripts_polyfill_awaiter(this, arguments, void 0, function* (where, scripts, options = {}) {
            const targets = castArray(where);
            yield Promise.all(targets.map((target) => browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () { return injectContentScriptInSpecificTarget(castAllFramesTarget(target), scripts, options); })));
        });
    }
    function injectContentScriptInSpecificTarget(_a, scripts_1) {
        return browser_api_register_content_scripts_polyfill_awaiter(this, arguments, void 0, function* ({ frameId, tabId, allFrames }, scripts, options = {}) {
            const injections = castArray(scripts).flatMap((script) => {
                var _a, _b, _c, _d, _e, _f;
                return [
                    insertCSS({
                        tabId,
                        frameId,
                        allFrames,
                        files: (_a = script.css) !== null && _a !== void 0 ? _a : [],
                        matchAboutBlank: (_b = script.matchAboutBlank) !== null && _b !== void 0 ? _b : script.match_about_blank,
                        runAt: (_c = script.runAt) !== null && _c !== void 0 ? _c : script.run_at,
                    }, options),
                    executeScript({
                        tabId,
                        frameId,
                        allFrames,
                        files: (_d = script.js) !== null && _d !== void 0 ? _d : [],
                        matchAboutBlank: (_e = script.matchAboutBlank) !== null && _e !== void 0 ? _e : script.match_about_blank,
                        runAt: (_f = script.runAt) !== null && _f !== void 0 ? _f : script.run_at,
                    }, options),
                ];
            });
            yield Promise.all(injections);
        });
    }
    function catchTargetInjectionErrors(promise) {
        return browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () {
            try {
                yield promise;
            }
            catch (error) {
                const targetErrors = /^No frame with id \d+ in tab \d+.$|^No tab with id: \d+.$|^The tab was closed.$|^The frame was removed.$/;
                if (!targetErrors.test(error === null || error === void 0 ? void 0 : error.message)) {
                    throw error;
                }
            }
        });
    }
    function isOriginPermitted(url) {
        return browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () {
            return chromeProxy.permissions.contains({
                origins: [new URL(url).origin + "/*"],
            });
        });
    }
    return (contentScriptOptions, callback) => browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () {
        const { js = [], css = [], matchAboutBlank, matches = [], excludeMatches, runAt, } = contentScriptOptions;
        let { allFrames } = contentScriptOptions;
        if (gotNavigation) {
            allFrames = false;
        }
        else if (allFrames) {
            logService.warning("`allFrames: true` requires the `webNavigation` permission to work correctly: https://github.com/fregante/content-scripts-register-polyfill#permissions");
        }
        if (matches.length === 0) {
            throw new Error("Type error for parameter contentScriptOptions (Error processing matches: Array requires at least 1 items; you have 0) for contentScripts.register.");
        }
        yield Promise.all(matches.map((pattern) => browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () {
            if (!(yield chromeProxy.permissions.contains({ origins: [pattern] }))) {
                throw new Error(`Permission denied to register a content script for ${pattern}`);
            }
        })));
        const matchesRegex = patternToRegex(...matches);
        const excludeMatchesRegex = patternToRegex(...(excludeMatches !== null && excludeMatches !== void 0 ? excludeMatches : []));
        const inject = (url_1, tabId_1, ...args_1) => browser_api_register_content_scripts_polyfill_awaiter(this, [url_1, tabId_1, ...args_1], void 0, function* (url, tabId, frameId = 0) {
            if (!matchesRegex.test(url) ||
                excludeMatchesRegex.test(url) ||
                !(yield isOriginPermitted(url))) {
                return;
            }
            yield injectContentScript({ tabId, frameId }, { css, js, matchAboutBlank, runAt }, { ignoreTargetErrors: true });
        });
        const tabListener = (tabId_1, _a, _b) => browser_api_register_content_scripts_polyfill_awaiter(this, [tabId_1, _a, _b], void 0, function* (tabId, { status }, { url }) {
            if (status === "loading" && url) {
                void inject(url, tabId);
            }
        });
        const navListener = (_a) => browser_api_register_content_scripts_polyfill_awaiter(this, [_a], void 0, function* ({ tabId, frameId, url, }) {
            void inject(url, tabId, frameId);
        });
        if (gotNavigation) {
            BrowserApi.addListener(chrome.webNavigation.onCommitted, navListener);
        }
        else {
            BrowserApi.addListener(chrome.tabs.onUpdated, tabListener);
        }
        const registeredContentScript = {
            unregister() {
                return browser_api_register_content_scripts_polyfill_awaiter(this, void 0, void 0, function* () {
                    if (gotNavigation) {
                        chrome.webNavigation.onCommitted.removeListener(navListener);
                    }
                    else {
                        chrome.tabs.onUpdated.removeListener(tabListener);
                    }
                });
            },
        };
        if (typeof callback === "function") {
            callback(registeredContentScript);
        }
        return registeredContentScript;
    });
}

;// ./src/platform/browser/extension-install-type.ts
const ExtensionInstallType = Object.freeze({
    Admin: "admin",
    Development: "development",
    Normal: "normal",
    Sideload: "sideload",
    Other: "other",
    Unknown: "unknown",
});

;// ./src/platform/browser/browser-api.ts
var browser_api_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// FIXME: Update this file to be type safe and remove this and next line
// @ts-strict-ignore







class BrowserApi {
    static get manifestVersion() {
        return chrome.runtime.getManifest().manifest_version;
    }
    /**
     * Determines if the extension manifest version is the given version.
     *
     * @param expectedVersion - The expected manifest version to check against.
     */
    static isManifestVersion(expectedVersion) {
        return BrowserApi.manifestVersion === expectedVersion;
    }
    /**
     * Returns how this extension was installed on the current browser. Use
     * {@link ExtensionInstallType.Admin} to detect enterprise-policy installs and
     * {@link ExtensionInstallType.Sideload} to detect extensions installed by other software
     * on the machine.
     *
     * `management.getSelf()` is the only `chrome.management` method that does
     * not require the "management" manifest permission.
     */
    static getInstallType() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                if (BrowserApi.isWebExtensionsApi) {
                    const info = yield browser.management.getSelf();
                    return (_a = info === null || info === void 0 ? void 0 : info.installType) !== null && _a !== void 0 ? _a : ExtensionInstallType.Unknown;
                }
                else if (BrowserApi.isChromeApi) {
                    const info = yield chrome.management.getSelf();
                    return (_b = info === null || info === void 0 ? void 0 : info.installType) !== null && _b !== void 0 ? _b : ExtensionInstallType.Unknown;
                }
            }
            catch (_c) {
                // management API not available on this browser (e.g. older Safari)
            }
            return ExtensionInstallType.Unknown;
        });
    }
    /**
     * Returns `true` if the message sender appears to originate from within this extension.
     *
     * Returns `false` when:
     * - `sender` is absent or has no `origin` property
     * - The extension's own URL cannot be determined at runtime
     * - The sender's origin does not match the extension's origin (compared by scheme, host, and port;
     *   senders without a host such as `file:` or `data:` URLs are always rejected)
     * - The message comes from a sub-frame rather than the top-level frame
     *
     * Note: this is a best-effort check that relies on the browser correctly populating `sender.origin`.
     *
     * @param sender - The message sender to validate. `undefined` or a sender without `origin` returns `false`.
     * @param logger - Optional logger; rejections are reported at `warning` level, acceptance at `info`.
     * @returns `true` if the sender appears to be internal to the extension; `false` otherwise.
     */
    static senderIsInternal(sender, logger) {
        var _a;
        if (!(sender === null || sender === void 0 ? void 0 : sender.origin)) {
            logger === null || logger === void 0 ? void 0 : logger.warning("[BrowserApi] Message sender has no origin");
            return false;
        }
        // Empty path yields the extension's base URL; coalesce to empty string so the guard below fires on a missing runtime.
        const extensionUrl = (_a = BrowserApi.getRuntimeURL("")) !== null && _a !== void 0 ? _a : "";
        if (!extensionUrl) {
            logger === null || logger === void 0 ? void 0 : logger.warning("[BrowserApi] Unable to determine extension URL");
            return false;
        }
        if (!urlOriginsMatch(extensionUrl, sender.origin)) {
            logger === null || logger === void 0 ? void 0 : logger.warning(`[BrowserApi] Message sender origin (${sender.origin}) does not match extension URL (${extensionUrl})`);
            return false;
        }
        // frameId is absent for popups, so use an 'in' check rather than direct comparison.
        if ("frameId" in sender && sender.frameId !== 0) {
            logger === null || logger === void 0 ? void 0 : logger.warning("[BrowserApi] Message sender is not from the top-level frame");
            return false;
        }
        logger === null || logger === void 0 ? void 0 : logger.info("[BrowserApi] Message sender appears to be internal");
        return true;
    }
    /**
     * Gets all open browser windows, including their tabs.
     *
     * @returns A promise that resolves to an array of browser windows.
     */
    static getWindows() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.windows.getAll({ populate: true }, resolve));
        });
    }
    /**
     * Gets the current window or the window with the given id.
     *
     * @param windowId - The id of the window to get. If not provided, the current window is returned.
     */
    static getWindow(windowId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (!windowId) {
                return BrowserApi.getCurrentWindow();
            }
            return yield BrowserApi.getWindowById(windowId);
        });
    }
    /**
     * Gets the currently active browser window.
     */
    static getCurrentWindow() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.windows.getCurrent({ populate: true }, resolve));
        });
    }
    /**
     * Gets the window with the given id.
     *
     * @param windowId - The id of the window to get.
     */
    static getWindowById(windowId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.windows.get(windowId, { populate: true }, resolve));
        });
    }
    static createWindow(options) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                chrome.windows.create(options, (newWindow) => browser_api_awaiter(this, void 0, void 0, function* () {
                    if (!BrowserApi.isSafariApi) {
                        return resolve(newWindow);
                    }
                    // Safari doesn't close the default extension popup when a new window is created so we need to
                    // manually trigger the close by focusing the main window after the new window is created
                    const allWindows = yield new Promise((resolve) => {
                        chrome.windows.getAll({ windowTypes: ["normal"] }, (windows) => resolve(windows));
                    });
                    const mainWindow = allWindows.find((window) => window.id !== newWindow.id);
                    // No main window found, resolve the new window
                    if (mainWindow == null || !mainWindow.id) {
                        return resolve(newWindow);
                    }
                    // Focus the main window to close the extension popup
                    chrome.windows.update(mainWindow.id, { focused: true }, () => {
                        // Refocus the newly created window
                        chrome.windows.update(newWindow.id, { focused: true }, () => {
                            resolve(newWindow);
                        });
                    });
                }));
            });
        });
    }
    /**
     * Removes the window with the given id.
     *
     * @param windowId - The id of the window to remove.
     */
    static removeWindow(windowId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.windows.remove(windowId, () => resolve()));
        });
    }
    /**
     * Updates the properties of the window with the given id.
     *
     * @param windowId - The id of the window to update.
     * @param options - The window properties to update.
     */
    static updateWindowProperties(windowId, options) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.windows.update(windowId, options, () => {
                resolve();
            }));
        });
    }
    /**
     * Focuses the window with the given id.
     *
     * @param windowId - The id of the window to focus.
     */
    static focusWindow(windowId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            yield BrowserApi.updateWindowProperties(windowId, { focused: true });
        });
    }
    static getTabFromCurrentWindowId() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return yield BrowserApi.tabsQueryFirstCurrentWindowForSafari({
                active: true,
                windowId: chrome.windows.WINDOW_ID_CURRENT,
            });
        });
    }
    static getBrowserClientVendor(clientWindow) {
        const device = BrowserPlatformUtilsService.getDevice(clientWindow);
        switch (device) {
            case DeviceType.ChromeExtension:
            case DeviceType.ChromeBrowser:
                return BrowserClientVendors.Chrome;
            case DeviceType.OperaExtension:
            case DeviceType.OperaBrowser:
                return BrowserClientVendors.Opera;
            case DeviceType.EdgeExtension:
            case DeviceType.EdgeBrowser:
                return BrowserClientVendors.Edge;
            case DeviceType.VivaldiExtension:
            case DeviceType.VivaldiBrowser:
                return BrowserClientVendors.Vivaldi;
            case DeviceType.FirefoxExtension:
            case DeviceType.FirefoxBrowser:
                return BrowserClientVendors.Firefox;
            default:
                return BrowserClientVendors.Unknown;
        }
    }
    /**
     * Gets the tab with the given id.
     *
     * @param tabId - The id of the tab to get.
     */
    static getTab(tabId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (!tabId) {
                return null;
            }
            if (BrowserApi.isManifestVersion(3)) {
                return yield chrome.tabs.get(tabId);
            }
            return new Promise((resolve) => chrome.tabs.get(tabId, (tab) => {
                resolve(tab);
            }));
        });
    }
    static getTabFromCurrentWindow() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return yield BrowserApi.tabsQueryFirstCurrentWindowForSafari({
                active: true,
                currentWindow: true,
            });
        });
    }
    static getActiveTabs() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return yield BrowserApi.tabsQuery({
                active: true,
            });
        });
    }
    /**
     * Fetch the currently open browser tab
     */
    static getCurrentTab() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (BrowserApi.isManifestVersion(3)) {
                return yield chrome.tabs.getCurrent();
            }
            return new Promise((resolve) => chrome.tabs.getCurrent((tab) => {
                resolve(tab);
            }));
        });
    }
    /**
     * Closes a browser tab with the given id
     *
     * @param tabId The id of the tab to close
     */
    static closeTab(tabId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (tabId) {
                if (BrowserApi.isWebExtensionsApi) {
                    yield browser.tabs.remove(tabId).catch((error) => {
                        throw new Error("[BrowserApi] Failed to remove current tab: " + error.message);
                    });
                }
                else if (BrowserApi.isChromeApi) {
                    yield chrome.tabs.remove(tabId).catch((error) => {
                        throw new Error("[BrowserApi] Failed to remove current tab: " + error.message);
                    });
                }
            }
        });
    }
    /**
     * Navigates a browser tab to the given URL
     *
     * @param tabId The id of the tab to navigate
     * @param url The URL to navigate to
     */
    static navigateTabToUrl(tabId, url) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (tabId) {
                if (BrowserApi.isWebExtensionsApi) {
                    yield browser.tabs.update(tabId, { url: url.href }).catch((error) => {
                        throw new Error("Failed to navigate tab to URL: " + error.message);
                    });
                }
                else if (BrowserApi.isChromeApi) {
                    chrome.tabs.update(tabId, { url: url.href }, () => {
                        if (chrome.runtime.lastError) {
                            throw new Error("Failed to navigate tab to URL: " + chrome.runtime.lastError.message);
                        }
                    });
                }
            }
        });
    }
    static tabsQuery(options) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => {
                chrome.tabs.query(options, (tabs) => {
                    resolve(tabs);
                });
            });
        });
    }
    static tabsQueryFirst(options) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            const tabs = yield BrowserApi.tabsQuery(options);
            if (tabs.length > 0) {
                return tabs[0];
            }
            return null;
        });
    }
    /**
     * Drop-in replacement for {@link BrowserApi.tabsQueryFirst}.
     *
     * Safari sometimes returns >1 tabs unexpectedly even when
     * specifying a `windowId` or `currentWindow: true` query option.
     *
     * For all of these calls,
     * ```
     * await chrome.tabs.query({active: true, currentWindow: true})
     * await chrome.tabs.query({active: true, windowId: chrome.windows.WINDOW_ID_CURRENT})
     * await chrome.tabs.query({active: true, windowId: 10})
     * ```
     *
     * Safari could return:
     * ```
     * [
     *   {windowId: 2, pinned: true, title: "Incorrect tab in another window", …},
     *   {windowId: 10, title: "Correct tab in foreground", …},
     * ]
     * ```
     *
     * This function captures the current window ID manually before running the query,
     * then finds and returns the tab with the matching window ID.
     *
     * See the `SafariTabsQuery` tests in `browser-api.spec.ts`.
     *
     * This workaround can be removed when Safari fixes this bug.
     */
    static tabsQueryFirstCurrentWindowForSafari(options) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            var _a;
            if (!BrowserApi.isSafariApi) {
                return yield BrowserApi.tabsQueryFirst(options);
            }
            const currentWindowId = (yield BrowserApi.getCurrentWindow()).id;
            const tabs = yield BrowserApi.tabsQuery(options);
            if (tabs.length <= 1 || currentWindowId == null) {
                return tabs[0];
            }
            return (_a = tabs.find((t) => t.windowId === currentWindowId)) !== null && _a !== void 0 ? _a : tabs[0];
        });
    }
    static tabSendMessageData(tab, command, data = null) {
        const obj = {
            command: command,
        };
        if (data != null) {
            obj.data = data;
        }
        return BrowserApi.tabSendMessage(tab, obj);
    }
    static tabSendMessage(tab_1, obj_1) {
        return browser_api_awaiter(this, arguments, void 0, function* (tab, obj, options = null, rejectOnError = false) {
            if (!tab || !tab.id) {
                return;
            }
            return new Promise((resolve, reject) => {
                chrome.tabs.sendMessage(tab.id, obj, options, (response) => {
                    if (chrome.runtime.lastError && rejectOnError) {
                        // Some error happened
                        reject();
                    }
                    resolve(response);
                });
            });
        });
    }
    static sendTabsMessage(tabId, message, options, responseCallback) {
        chrome.tabs.sendMessage(tabId, message, options, responseCallback);
    }
    static getRuntimeURL(path) {
        if (BrowserApi.isWebExtensionsApi) {
            return browser.runtime.getURL(path);
        }
        else if (BrowserApi.isChromeApi) {
            return chrome.runtime.getURL(path);
        }
    }
    static onWindowCreated(callback) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            // FIXME: Make sure that is does not cause a memory leak in Safari or use BrowserApi.AddListener
            // and test that it doesn't break.
            // eslint-disable-next-line no-restricted-syntax
            return chrome.windows.onCreated.addListener(callback);
        });
    }
    /**
     * Gets the background page for the extension. This method is
     * not valid within manifest v3 background service workers. As
     * a result, it will return null when called from that context.
     */
    static getBackgroundPage() {
        if (typeof chrome.extension.getBackgroundPage === "undefined") {
            return null;
        }
        return chrome.extension.getBackgroundPage();
    }
    /**
     * Accepts a window object and determines if it is
     * associated with the background page of the extension.
     *
     * @param window - The window to check.
     */
    static isBackgroundPage(window) {
        return typeof window !== "undefined" && window === BrowserApi.getBackgroundPage();
    }
    /**
     * Gets the extension views that match the given properties. This method is not
     * available within background service worker. As a result, it will return an
     * empty array when called from that context.
     *
     * @param fetchProperties - The properties used to filter extension views.
     */
    static getExtensionViews(fetchProperties) {
        if (typeof chrome.extension.getViews === "undefined") {
            return [];
        }
        return chrome.extension.getViews(fetchProperties);
    }
    /**
     * Returns true if the vault popup is currently open.
     *
     * Uses `chrome.runtime.getContexts()` on MV3 (Chrome/Edge),
     * and falls back to `chrome.extension.getViews()` for MV2 (Firefox) and Safari.
     */
    static isPopupOpen() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (typeof chrome.runtime.getContexts === "function" &&
                BrowserApi.isManifestVersion(3)) {
                const contexts = yield chrome.runtime.getContexts({});
                return contexts.some((context) => context.contextType === "POPUP");
            }
            // MV2/Safari — background page can use getExtensionViews
            return BrowserApi.getExtensionViews({ type: "popup" }).length > 0;
        });
    }
    /**
     * Returns true if the toolbar popup or any popout window is currently open.
     *
     * Used to gate `chrome.runtime.reload()` so it doesn't fire while a popout is mid-teardown.
     * Popouts are classified as `TAB` contexts (not `POPUP`) by `chrome.runtime.getContexts`,
     * so they're identified by `uilocation=popout` in their documentUrl.
     */
    static isAnyPopupOrPopoutOpen() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (typeof chrome.runtime.getContexts === "function" &&
                BrowserApi.isManifestVersion(3)) {
                const contexts = yield chrome.runtime.getContexts({});
                return contexts.some((context) => {
                    var _a;
                    return context.contextType === "POPUP" ||
                        (context.contextType === "TAB" && ((_a = context.documentUrl) === null || _a === void 0 ? void 0 : _a.includes("uilocation=popout")));
                });
            }
            // MV2/Safari — background page can use getExtensionViews
            if (BrowserApi.getExtensionViews({ type: "popup" }).length > 0) {
                return true;
            }
            return BrowserApi.getExtensionViews({ type: "tab" }).some((v) => v.location.href.includes("uilocation=popout"));
        });
    }
    /**
     * Returns true if any extension view is currently active/focused.
     *
     * - Main popup: always considered focused (auto-closes on blur).
     * - Sidebar: always considered focused (always visible).
     * - Popout windows: only focused if the window is currently focused.
     *
     * Uses `chrome.runtime.getContexts()` on MV3 (Chrome/Edge),
     * and falls back to `chrome.extension.getViews()` for MV2 (Firefox) and Safari.
     *
     * NOTE: The `getContexts` path is restricted to MV3. Firefox MV2's persistent
     * background page is classified as a "POPUP" context by `runtime.getContexts()`,
     * which would cause `isAnyViewFocused` to permanently return true and block vault
     * timeout. The `getExtensionViews` path only returns actually-visible views.
     */
    static isAnyViewFocused() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (typeof chrome.runtime.getContexts === "function" &&
                BrowserApi.isManifestVersion(3)) {
                const contexts = yield chrome.runtime.getContexts({});
                if (contexts.some((c) => c.contextType === "POPUP" || c.contextType === "SIDE_PANEL")) {
                    return true;
                }
                const tabs = contexts.filter((c) => { var _a; return c.contextType === "TAB" && ((_a = c.documentUrl) === null || _a === void 0 ? void 0 : _a.includes("uilocation=popout")); });
                for (const context of tabs) {
                    const win = yield BrowserApi.getWindowById(context.windowId);
                    if (win === null || win === void 0 ? void 0 : win.focused) {
                        return true;
                    }
                }
                return false;
            }
            // MV2/Safari — background page can use getExtensionViews
            if (BrowserApi.getExtensionViews({ type: "popup" }).length > 0) {
                return true;
            }
            return BrowserApi.getExtensionViews({ type: "tab" }).some((v) => v.location.href.includes("uilocation=sidebar") ||
                (v.location.href.includes("uilocation=popout") && v.document.hasFocus()));
        });
    }
    static createNewTab(url, active = true) {
        return new Promise((resolve) => chrome.tabs.create({ url: url, active: active }, (tab) => resolve(tab)));
    }
    /**
     * Gathers the details for a specified sub-frame of a tab.
     *
     * @param details - The details of the frame to get.
     */
    static getFrameDetails(details) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.webNavigation.getFrame(details, resolve));
        });
    }
    /**
     * Gets all frames associated with a tab.
     *
     * @param tabId - The id of the tab to get the frames for.
     */
    static getAllFrameDetails(tabId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.webNavigation.getAllFrames({ tabId }, resolve));
        });
    }
    static messageListener(name, callback) {
        BrowserApi.addListener(chrome.runtime.onMessage, callback);
    }
    static messageListener$() {
        return new Observable((subscriber) => {
            const handler = (message) => {
                subscriber.next(message);
            };
            BrowserApi.addListener(chrome.runtime.onMessage, handler);
            return () => BrowserApi.removeListener(chrome.runtime.onMessage, handler);
        });
    }
    static storageChangeListener(callback) {
        BrowserApi.addListener(chrome.storage.onChanged, callback);
    }
    /**
     * Adds a callback to the given chrome event in a cross-browser platform manner.
     *
     * **Important:** All event listeners in the browser extension popup context must
     * use this instead of the native APIs to handle unsubscribing from Safari properly.
     *
     * @param event - The event in which to add the listener to.
     * @param callback - The callback you want registered onto the event.
     */
    static addListener(event, callback) {
        event.addListener(callback);
        if (BrowserApi.isSafariApi && !BrowserApi.isBackgroundPage(self)) {
            BrowserApi.trackedChromeEventListeners.push([event, callback]);
            BrowserApi.setupUnloadListeners();
        }
    }
    /**
     * Removes a callback from the given chrome event in a cross-browser platform manner.
     * @param event - The event in which to remove the listener from.
     * @param callback - The callback you want removed from the event.
     */
    // Chrome's Event.removeListener expects callback args as `any[]` to align with its internal event typings.
    static removeListener(event, callback) {
        event.removeListener(callback);
        if (BrowserApi.isSafariApi && !BrowserApi.isBackgroundPage(self)) {
            const index = BrowserApi.trackedChromeEventListeners.findIndex(([_event, eventListener]) => {
                return eventListener == callback;
            });
            if (index !== -1) {
                BrowserApi.trackedChromeEventListeners.splice(index, 1);
            }
        }
    }
    // Setup the event to destroy all the listeners when the popup gets unloaded in Safari, otherwise we get a memory leak
    static setupUnloadListeners() {
        // The MDN recommend using 'visibilitychange' but that event is fired any time the popup window is obscured as well
        // 'pagehide' works just like 'unload' but is compatible with the back/forward cache, so we prefer using that one
        self.addEventListener("pagehide", () => {
            for (const [event, callback] of BrowserApi.trackedChromeEventListeners) {
                event.removeListener(callback);
            }
        });
    }
    /**
     * Whether the Chrome Side Panel API is available (Chrome 114+).
     */
    static get isSidePanelApiSupported() {
        return typeof chrome !== "undefined" && typeof chrome.sidePanel !== "undefined";
    }
    /**
     * Opens the extension's side panel for a specific tab.
     * Must be called in response to a user gesture (context menu click qualifies).
     */
    static openSidePanel(options) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (!BrowserApi.isSidePanelApiSupported) {
                return;
            }
            yield chrome.sidePanel.open({ tabId: options.tabId });
        });
    }
    /**
     * Sets the side panel options (path, enabled state), optionally scoped to a tab.
     */
    static setSidePanelOptions(options) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (!BrowserApi.isSidePanelApiSupported) {
                return;
            }
            yield chrome.sidePanel.setOptions(options);
        });
    }
    static sendMessage(subscriber, arg = {}) {
        const message = Object.assign({}, { command: subscriber }, arg);
        return chrome.runtime.sendMessage(message);
    }
    static sendMessageWithResponse(subscriber, arg = {}) {
        const message = Object.assign({}, { command: subscriber }, arg);
        return new Promise((resolve) => chrome.runtime.sendMessage(message, resolve));
    }
    static focusTab(tabId) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            chrome.tabs.update(tabId, { active: true, highlighted: true });
        });
    }
    static closePopup(win) {
        if (BrowserApi.isWebExtensionsApi && BrowserApi.isFirefoxOnAndroid) {
            // Reactivating the active tab dismisses the popup tab. The promise final
            // condition is only called if the popup wasn't already dismissed (future proofing).
            // ref: https://bugzilla.mozilla.org/show_bug.cgi?id=1433604
            // FIXME: Verify that this floating promise is intentional. If it is, add an explanatory comment and ensure there is proper error handling.
            // eslint-disable-next-line @typescript-eslint/no-floating-promises
            browser.tabs.update({ active: true }).finally(win.close);
        }
        else {
            win.close();
        }
    }
    static gaFilter() {
        return "production" !== "production";
    }
    static getUILanguage() {
        return chrome.i18n.getUILanguage();
    }
    /**
     * Handles reloading the extension using the underlying functionality exposed by the browser API.
     */
    static reloadExtension() {
        // If we do `chrome.runtime.reload` on safari they will send an onInstalled reason of install
        // and that prompts us to show a new tab, this apparently doesn't happen on sideloaded
        // extensions and only shows itself production scenarios. See: https://bitwarden.atlassian.net/browse/PM-12298
        if (this.isSafariApi) {
            return self.location.reload();
        }
        return chrome.runtime.reload();
    }
    /**
     * Reloads all open extension views, except the background page. Will also
     * skip reloading the current window location if exemptCurrentHref is true.
     *
     * @param exemptCurrentHref - Whether to exempt the current window location from the reload.
     */
    static reloadOpenWindows(exemptCurrentHref = false) {
        const views = BrowserApi.getExtensionViews();
        if (!views.length) {
            return;
        }
        const currentHref = self.location.href;
        views
            .filter((w) => w.location.href != null && !w.location.href.includes("background.html"))
            .filter((w) => !exemptCurrentHref || w.location.href !== currentHref)
            .forEach((w) => w.location.reload());
    }
    static connectNative(application) {
        if (BrowserApi.isWebExtensionsApi) {
            return browser.runtime.connectNative(application);
        }
        else if (BrowserApi.isChromeApi) {
            return chrome.runtime.connectNative(application);
        }
    }
    static requestPermission(permission) {
        if (BrowserApi.isWebExtensionsApi) {
            return browser.permissions.request(permission);
        }
        return new Promise((resolve) => {
            chrome.permissions.request(permission, resolve);
        });
    }
    /**
     * Checks if the user has provided the given permissions to the extension.
     *
     * @param permissions - The permissions to check.
     */
    static permissionsGranted(permissions) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve) => chrome.permissions.contains({ permissions }, (result) => resolve(result)));
        });
    }
    static getPlatformInfo() {
        if (BrowserApi.isWebExtensionsApi) {
            return browser.runtime.getPlatformInfo();
        }
        return new Promise((resolve) => {
            chrome.runtime.getPlatformInfo(resolve);
        });
    }
    /**
     * Returns the supported BrowserAction API based on the manifest version.
     */
    static getBrowserAction() {
        return BrowserApi.isManifestVersion(3) ? chrome.action : chrome.browserAction;
    }
    static getSidebarAction(win) {
        var _a;
        const deviceType = BrowserPlatformUtilsService.getDevice(win);
        if (deviceType === DeviceType.FirefoxExtension) {
            return browser.sidebarAction;
        }
        if (deviceType === DeviceType.OperaExtension) {
            return (_a = win.opr) === null || _a === void 0 ? void 0 : _a.sidebarAction;
        }
        return null;
    }
    static captureVisibleTab() {
        return new Promise((resolve) => {
            chrome.tabs.captureVisibleTab(null, { format: "png" }, resolve);
        });
    }
    /**
     * Extension API helper method used to execute a script in a tab.
     *
     * @see https://developer.chrome.com/docs/extensions/reference/tabs/#method-executeScript
     * @param tabId - The id of the tab to execute the script in.
     * @param details {@link "InjectDetails" https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/extensionTypes/InjectDetails}
     * @param scriptingApiDetails {@link "ExecutionWorld" https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/scripting/ExecutionWorld}
     */
    static executeScriptInTab(tabId, details, scriptingApiDetails) {
        if (BrowserApi.isManifestVersion(3)) {
            let target;
            if (typeof details.frameId === "number") {
                target = { tabId, frameIds: [details.frameId] };
            }
            else if (details.allFrames) {
                target = { tabId, allFrames: true };
            }
            else {
                target = { tabId };
            }
            return chrome.scripting.executeScript({
                target,
                files: details.file ? [details.file] : null,
                injectImmediately: details.runAt === "document_start",
                world: (scriptingApiDetails === null || scriptingApiDetails === void 0 ? void 0 : scriptingApiDetails.world) || chrome.scripting.ExecutionWorld.ISOLATED,
            });
        }
        return new Promise((resolve) => {
            chrome.tabs.executeScript(tabId, details, (result) => {
                resolve(result);
            });
        });
    }
    /**
     * Executes a self-contained function in the given tab and returns its result from the top frame.
     * The function is serialized for injection, so it must not close over outer-scope variables.
     *
     * @param tabId - The id of the tab to execute the function in.
     * @param func - The function to inject.
     */
    static executeFunctionInTab(tabId, func) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            var _a;
            if (BrowserApi.isManifestVersion(3)) {
                const results = yield chrome.scripting.executeScript({
                    target: { tabId },
                    func,
                });
                return (_a = results === null || results === void 0 ? void 0 : results[0]) === null || _a === void 0 ? void 0 : _a.result;
            }
            // MV2 has no `func` parameter, so serialize the function source and inject it as code.
            return new Promise((resolve) => {
                chrome.tabs.executeScript(tabId, { code: `(${func.toString()})()` }, (results) => resolve(results === null || results === void 0 ? void 0 : results[0]));
            });
        });
    }
    /**
     * Identifies if the browser autofill settings are overridden by the extension.
     */
    static browserAutofillSettingsOverridden() {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            if (!(yield BrowserApi.permissionsGranted(["privacy"]))) {
                return false;
            }
            const checkOverrideStatus = (details) => details.levelOfControl === "controlled_by_this_extension" && !details.value;
            const passwordSavingOverridden = yield new Promise((resolve) => chrome.privacy.services.passwordSavingEnabled.get({}, (details) => resolve(checkOverrideStatus(details))));
            if (BrowserApi.isFirefox) {
                return passwordSavingOverridden;
            }
            const autofillAddressOverridden = yield new Promise((resolve) => chrome.privacy.services.autofillAddressEnabled.get({}, (details) => resolve(checkOverrideStatus(details))));
            const autofillCreditCardOverridden = yield new Promise((resolve) => chrome.privacy.services.autofillCreditCardEnabled.get({}, (details) => resolve(checkOverrideStatus(details))));
            return autofillAddressOverridden && autofillCreditCardOverridden && passwordSavingOverridden;
        });
    }
    /**
     * Updates the browser autofill settings to the given value.
     *
     * @param value - Determines whether to enable or disable the autofill settings.
     */
    static updateDefaultBrowserAutofillSettings(value) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c;
            if (BrowserApi.isFirefox) {
                if (BrowserApi.isWebExtensionsApi) {
                    yield ((_c = (_b = (_a = browser.privacy) === null || _a === void 0 ? void 0 : _a.services) === null || _b === void 0 ? void 0 : _b.passwordSavingEnabled) === null || _c === void 0 ? void 0 : _c.set({ value }));
                }
                else {
                    yield chrome.privacy.services.passwordSavingEnabled.set({ value });
                }
                return;
            }
            yield chrome.privacy.services.autofillAddressEnabled.set({ value });
            yield chrome.privacy.services.autofillCreditCardEnabled.set({ value });
            yield chrome.privacy.services.passwordSavingEnabled.set({ value });
        });
    }
    /**
     * Handles registration of static content scripts within manifest v2.
     *
     * @param contentScriptOptions - Details of the registered content scripts
     */
    static registerContentScriptsMv2(contentScriptOptions) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            var _a;
            if (typeof browser !== "undefined" && !!((_a = browser.contentScripts) === null || _a === void 0 ? void 0 : _a.register)) {
                return yield browser.contentScripts.register(contentScriptOptions);
            }
            return yield registerContentScriptsPolyfill(contentScriptOptions);
        });
    }
    /**
     * Handles registration of static content scripts within manifest v3.
     *
     * @param scripts - Details of the registered content scripts
     */
    static registerContentScriptsMv3(scripts) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            yield chrome.scripting.registerContentScripts(scripts);
        });
    }
    /**
     * Handles unregistering of static content scripts within manifest v3.
     *
     * @param filter - Optional filter to unregister content scripts. Passing an empty object will unregister all content scripts.
     */
    static unregisterContentScriptsMv3(filter) {
        return browser_api_awaiter(this, void 0, void 0, function* () {
            yield chrome.scripting.unregisterContentScripts(filter);
        });
    }
}
BrowserApi.isWebExtensionsApi = typeof browser !== "undefined";
BrowserApi.isSafariApi = isBrowserSafariApi();
BrowserApi.isChromeApi = !BrowserApi.isSafariApi && typeof chrome !== "undefined";
BrowserApi.isFirefoxOnAndroid = navigator.userAgent.indexOf("Firefox/") !== -1 && navigator.userAgent.indexOf("Android") !== -1;
BrowserApi.isFirefox = navigator.userAgent.indexOf("Firefox/") !== -1;
// Keep track of all the events registered in a Safari popup so we can remove
// them when the popup gets unloaded, otherwise we cause a memory leak
BrowserApi.trackedChromeEventListeners = [];

;// ./src/autofill/enums/autofill-port.enum.ts
const AutofillPort = {
    InjectedScript: "autofill-injected-script-port",
};


;// ./src/autofill/utils/index.ts
/* unused harmony import specifier */ var utils_AUTOFILL_ATTRIBUTES;
/* unused harmony import specifier */ var utils_AutofillPort;
var utils_awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};


/**
 * Generates a random string of characters.
 *
 * @param length - The length of the random string to generate.
 */
function generateRandomChars(length) {
    const chars = "abcdefghijklmnopqrstuvwxyz";
    const randomChars = [];
    const randomBytes = new Uint8Array(length);
    globalThis.crypto.getRandomValues(randomBytes);
    for (let byteIndex = 0; byteIndex < randomBytes.length; byteIndex++) {
        const byte = randomBytes[byteIndex];
        randomChars.push(chars[byte % chars.length]);
    }
    return randomChars.join("");
}
/**
 * Polyfills the requestIdleCallback API with a setTimeout fallback.
 *
 * @param callback - The callback function to run when the browser is idle.
 * @param options - The options to pass to the requestIdleCallback function.
 */
function requestIdleCallbackPolyfill(callback, options) {
    if ("requestIdleCallback" in globalThis) {
        return globalThis.requestIdleCallback(() => callback(), options);
    }
    return globalThis.setTimeout(() => callback(), 1);
}
/**
 * Polyfills the cancelIdleCallback API with a clearTimeout fallback.
 *
 * @param id - The ID of the idle callback to cancel.
 */
function cancelIdleCallbackPolyfill(id) {
    if ("cancelIdleCallback" in globalThis) {
        return globalThis.cancelIdleCallback(id);
    }
    return globalThis.clearTimeout(id);
}
/**
 * Generates a random string of characters that formatted as a custom element name.
 */
function generateRandomCustomElementName() {
    const length = Math.floor(Math.random() * 5) + 8; // Between 8 and 12 characters
    const numHyphens = Math.min(Math.max(Math.floor(Math.random() * 4), 1), length - 1); // At least 1, maximum of 3 hyphens
    const hyphenIndices = [];
    while (hyphenIndices.length < numHyphens) {
        const index = Math.floor(Math.random() * (length - 1)) + 1;
        if (!hyphenIndices.includes(index)) {
            hyphenIndices.push(index);
        }
    }
    hyphenIndices.sort((a, b) => a - b);
    let randomString = "";
    let prevIndex = 0;
    for (let index = 0; index < hyphenIndices.length; index++) {
        const hyphenIndex = hyphenIndices[index];
        randomString = randomString + generateRandomChars(hyphenIndex - prevIndex) + "-";
        prevIndex = hyphenIndex;
    }
    randomString += generateRandomChars(length - prevIndex);
    return randomString;
}
/**
 * Builds a DOM element from an SVG string.
 *
 * @param svgString - The SVG string to build the DOM element from.
 * @param ariaHidden - Determines whether the SVG should be hidden from screen readers.
 */
function buildSvgDomElement(svgString, ariaHidden = true) {
    const domParser = new DOMParser();
    const svgDom = domParser.parseFromString(svgString, "image/svg+xml");
    const domElement = svgDom.documentElement;
    domElement.setAttribute("aria-hidden", `${ariaHidden}`);
    return domElement;
}
/**
 * Sends a message to the extension.
 *
 * @param command - The command to send.
 * @param options - The options to send with the command.
 */
function sendExtensionMessage(command_1) {
    return utils_awaiter(this, arguments, void 0, function* (command, options = {}) {
        if (typeof browser !== "undefined" &&
            typeof browser.runtime !== "undefined" &&
            typeof browser.runtime.sendMessage !== "undefined") {
            return browser.runtime.sendMessage(Object.assign({ command }, options));
        }
        return new Promise((resolve) => chrome.runtime.sendMessage(Object.assign({ command }, options), (response) => {
            if (chrome.runtime.lastError) {
                resolve(null);
            }
            resolve(response);
        }));
    });
}
/**
 * Sets CSS styles on an element.
 *
 * @param element - The element to set the styles on.
 * @param styles - The styles to set on the element.
 * @param priority - Determines whether the styles should be set as important.
 */
function setElementStyles(element, styles, priority) {
    if (!element || !styles || !Object.keys(styles).length) {
        return;
    }
    for (const styleProperty in styles) {
        const styleValue = styles[styleProperty];
        if (styleValue !== undefined) {
            element.style.setProperty(styleProperty.replace(/([a-z])([A-Z])/g, "$1-$2"), // Convert camelCase to kebab-case
            styleValue, priority ? "important" : undefined);
        }
    }
}
/**
 * Sets up a long-lived connection with the extension background
 * and triggers an onDisconnect event if the extension context
 * is invalidated.
 *
 * @param callback - Callback export function to run when the extension disconnects
 */
function setupExtensionDisconnectAction(callback) {
    const port = chrome.runtime.connect({ name: utils_AutofillPort.InjectedScript });
    const onDisconnectCallback = (disconnectedPort) => {
        callback(disconnectedPort);
        port.onDisconnect.removeListener(onDisconnectCallback);
    };
    port.onDisconnect.addListener(onDisconnectCallback);
}
/**
 * Handles setup of the extension disconnect action for the autofill init class
 * in both instances where the overlay might or might not be initialized.
 *
 * @param windowContext - The global window context
 */
function setupAutofillInitDisconnectAction(windowContext) {
    const bitwardenAutofillInit = windowContext.bitwardenAutofillInit;
    if (!bitwardenAutofillInit) {
        return;
    }
    const onDisconnectCallback = () => {
        bitwardenAutofillInit.destroy();
        delete windowContext.bitwardenAutofillInit;
    };
    setupExtensionDisconnectAction(onDisconnectCallback);
}
/**
 * Identifies whether an element is a fillable form field.
 * This is determined by whether the element is a form field and not a span.
 *
 * @param formFieldElement - The form field element to check.
 */
function elementIsFillableFormField(formFieldElement) {
    return !elementIsSpanElement(formFieldElement);
}
/**
 * Identifies whether an element is an instance of a specific tag name.
 *
 * @param element - The element to check.
 * @param tagName -  The tag name to check against.
 */
function elementIsInstanceOf(element, tagName) {
    return nodeIsElement(element) && element.tagName.toLowerCase() === tagName;
}
/**
 * Identifies whether an element is a span element.
 *
 * @param element - The element to check.
 */
function elementIsSpanElement(element) {
    return elementIsInstanceOf(element, "span");
}
/**
 * Identifies whether an element is an input field.
 *
 * @param element - The element to check.
 */
function elementIsInputElement(element) {
    return elementIsInstanceOf(element, "input");
}
/**
 * Identifies whether an element is a select field.
 *
 * @param element - The element to check.
 */
function elementIsSelectElement(element) {
    return elementIsInstanceOf(element, "select");
}
/**
 * Identifies whether an element is a textarea field.
 *
 * @param element - The element to check.
 */
function elementIsTextAreaElement(element) {
    return elementIsInstanceOf(element, "textarea");
}
/**
 * Identifies whether an element is a form element.
 *
 * @param element - The element to check.
 */
function elementIsFormElement(element) {
    return elementIsInstanceOf(element, "form");
}
/**
 * Identifies whether an element is a label element.
 *
 * @param element - The element to check.
 */
function elementIsLabelElement(element) {
    return elementIsInstanceOf(element, "label");
}
/**
 * Identifies whether an element is a description details `dd` element.
 *
 * @param element - The element to check.
 */
function elementIsDescriptionDetailsElement(element) {
    return elementIsInstanceOf(element, "dd");
}
/**
 * Identifies whether an element is a description term `dt` element.
 *
 * @param element - The element to check.
 */
function elementIsDescriptionTermElement(element) {
    return elementIsInstanceOf(element, "dt");
}
/**
 * Identifies whether a node is an HTML element.
 *
 * @param node - The node to check.
 */
function nodeIsElement(node) {
    if (!node) {
        return false;
    }
    return (node === null || node === void 0 ? void 0 : node.nodeType) === Node.ELEMENT_NODE;
}
function elementIsTypeSubmitElement(element) {
    return getPropertyOrAttribute(element, "type") === "submit";
}
function elementIsButtonElement(element) {
    return (elementIsInstanceOf(element, "button") ||
        getPropertyOrAttribute(element, "type") === "button");
}
function elementIsAnchorElement(element) {
    return elementIsInstanceOf(element, "a");
}
/**
 * Returns a boolean representing the attribute value of an element.
 *
 * @param element
 * @param attributeName
 * @param checkString
 */
function getAttributeBoolean(element, attributeName, checkString = false) {
    if (checkString) {
        return getPropertyOrAttribute(element, attributeName) === "true";
    }
    return Boolean(getPropertyOrAttribute(element, attributeName));
}
/**
 * Checks if a form field element is currently readonly or disabled.
 *
 * @param formFieldElement - The form field element to evaluate.
 * @param autofillFieldData - Optional cached autofill metadata for readonly or disabled state.
 */
function isReadonlyOrDisabledFormFieldElement(formFieldElement, autofillFieldData) {
    const readOnlyByProperty = (elementIsInputElement(formFieldElement) || elementIsTextAreaElement(formFieldElement)) &&
        formFieldElement.readOnly;
    return (getAttributeBoolean(formFieldElement, utils_AUTOFILL_ATTRIBUTES.DISABLED) ||
        readOnlyByProperty ||
        getAttributeBoolean(formFieldElement, "aria-readonly", true) ||
        (autofillFieldData === null || autofillFieldData === void 0 ? void 0 : autofillFieldData.readonly) === true ||
        (autofillFieldData === null || autofillFieldData === void 0 ? void 0 : autofillFieldData.disabled) === true);
}
/**
 * Get the value of a property or attribute from a FormFieldElement.
 *
 * @param element
 * @param attributeName
 */
function getPropertyOrAttribute(element, attributeName) {
    var _a;
    if (attributeName in element) {
        return (_a = element[attributeName]) !== null && _a !== void 0 ? _a : null;
    }
    return element.getAttribute(attributeName);
}
/**
 * Throttles a callback function to run at most once every `limit` milliseconds.
 *
 * @param callback - The callback function to throttle (must return void).
 * @param limit - The time in milliseconds to throttle the callback.
 */
function throttle(callback, limit) {
    let waitingDelay = false;
    return function (...args) {
        if (waitingDelay) {
            return;
        }
        callback.apply(this, args);
        waitingDelay = true;
        globalThis.setTimeout(() => (waitingDelay = false), limit);
    };
}
/**
 * Debounces a callback function to run after a delay of `delay` milliseconds.
 *
 * @param callback - The callback function to debounce.
 * @param delay - The time in milliseconds to debounce the callback.
 * @param immediate - Determines whether the callback should run immediately.
 */
function debounce(callback, delay, immediate) {
    let timeout = null;
    return function (...args) {
        const callImmediately = !!immediate && !timeout;
        if (timeout) {
            globalThis.clearTimeout(timeout);
        }
        timeout = globalThis.setTimeout(() => {
            timeout = null;
            if (!callImmediately) {
                callback.apply(this, args);
            }
        }, delay);
        if (callImmediately) {
            callback.apply(this, args);
        }
    };
}
/**
 * Generates the origin and subdomain match patterns for the URL.
 *
 * @param url - The URL of the tab
 */
function generateDomainMatchPatterns(url) {
    try {
        const extensionUrlPattern = /^(chrome|chrome-extension|moz-extension|safari-web-extension):\/\/\/?/;
        if (extensionUrlPattern.test(url)) {
            return [];
        }
        // Add protocol to URL if it is missing to allow for parsing the hostname correctly
        const urlPattern = /^(https?|file):\/\/\/?/;
        if (!urlPattern.test(url)) {
            url = `https://${url}`;
        }
        let protocolGlob = "*://";
        if (url.startsWith("file:///")) {
            protocolGlob = "*:///"; // File URLs require three slashes to be a valid match pattern
        }
        const parsedUrl = new URL(url);
        const originMatchPattern = `${protocolGlob}${parsedUrl.hostname}/*`;
        const splitHost = parsedUrl.hostname.split(".");
        const domain = splitHost.slice(-2).join(".");
        const subDomainMatchPattern = `${protocolGlob}*.${domain}/*`;
        return [originMatchPattern, subDomainMatchPattern];
    }
    catch (_a) {
        return [];
    }
}
/**
 * Determines if the status code of the web response is invalid. An invalid status code is
 * any status code that is not in the 200-299 range.
 *
 * @param statusCode - The status code of the web response
 */
function isInvalidResponseStatusCode(statusCode) {
    return statusCode < 200 || statusCode >= 300;
}
/**
 * Determines if the current context is within a sandboxed iframe.
 */
function currentlyInSandboxedIframe() {
    var _a, _b;
    if (String(self.origin).toLowerCase() === "null" || globalThis.location.hostname === "") {
        return true;
    }
    const sandbox = (_b = (_a = globalThis.frameElement) === null || _a === void 0 ? void 0 : _a.getAttribute) === null || _b === void 0 ? void 0 : _b.call(_a, "sandbox");
    // No frameElement or sandbox attribute means not sandboxed
    if (sandbox === null || sandbox === undefined) {
        return false;
    }
    // An empty string means fully sandboxed
    if (sandbox === "") {
        return true;
    }
    const tokens = new Set(sandbox.toLowerCase().split(" "));
    return !["allow-scripts", "allow-same-origin"].every((token) => tokens.has(token));
}
/**
 * This object allows us to map a special character to a key name. The key name is used
 * in gathering the i18n translation of the written version of the special character.
 */
const specialCharacterToKeyMap = {
    " ": "spaceCharacterDescriptor",
    "~": "tildeCharacterDescriptor",
    "`": "backtickCharacterDescriptor",
    "!": "exclamationCharacterDescriptor",
    "@": "atSignCharacterDescriptor",
    "#": "hashSignCharacterDescriptor",
    $: "dollarSignCharacterDescriptor",
    "%": "percentSignCharacterDescriptor",
    "^": "caretCharacterDescriptor",
    "&": "ampersandCharacterDescriptor",
    "*": "asteriskCharacterDescriptor",
    "(": "parenLeftCharacterDescriptor",
    ")": "parenRightCharacterDescriptor",
    "-": "hyphenCharacterDescriptor",
    _: "underscoreCharacterDescriptor",
    "+": "plusCharacterDescriptor",
    "=": "equalsCharacterDescriptor",
    "{": "braceLeftCharacterDescriptor",
    "}": "braceRightCharacterDescriptor",
    "[": "bracketLeftCharacterDescriptor",
    "]": "bracketRightCharacterDescriptor",
    "|": "pipeCharacterDescriptor",
    "\\": "backSlashCharacterDescriptor",
    ":": "colonCharacterDescriptor",
    ";": "semicolonCharacterDescriptor",
    '"': "doubleQuoteCharacterDescriptor",
    "'": "singleQuoteCharacterDescriptor",
    "<": "lessThanCharacterDescriptor",
    ">": "greaterThanCharacterDescriptor",
    ",": "commaCharacterDescriptor",
    ".": "periodCharacterDescriptor",
    "?": "questionCharacterDescriptor",
    "/": "forwardSlashCharacterDescriptor",
};
/**
 * Determines if the current rect values are not all 0.
 */
function rectHasSize(rect) {
    if (rect.right > 0 && rect.left > 0 && rect.top > 0 && rect.bottom > 0) {
        return true;
    }
    return false;
}
/**
 * Checks if all the values corresponding to the specified keys in an object are null.
 * If no keys are specified, checks all keys in the object.
 *
 * @param obj - The object to check.
 * @param keys - An optional array of keys to check in the object. Defaults to all keys.
 * @returns Returns true if all values for the specified keys (or all keys if none are provided) are null; otherwise, false.
 */
function areKeyValuesNull(obj, keys) {
    const keysToCheck = keys && keys.length > 0 ? keys : Object.keys(obj);
    return keysToCheck.every((key) => obj[key] == null);
}
/**
 * Validates the shape of `subFrameData` and rejects any payload that carries a
 * `url`. This is the *receive*-side counterpart to the *send*-side
 * `SubFrameOffsetWindowMessageData` type: that type stops our own code from
 * constructing a leaky payload at compile time, but any frame can post arbitrary
 * data, so inbound messages must be validated at runtime before they are trusted.
 *
 * @param value - The untrusted `data` property of the window message event.
 */
function isSubFramePositioningMessageData(value) {
    if (typeof value !== "object" || value === null || !("subFrameData" in value)) {
        return false;
    }
    const { subFrameData } = value;
    if (typeof subFrameData !== "object" || subFrameData === null || "url" in subFrameData) {
        return false;
    }
    // Number.isFinite (not `typeof === "number"`) so NaN/Infinity are rejected: a
    // non-finite subFrameDepth would defeat the MAX_SUB_FRAME_DEPTH relay guard.
    const candidate = subFrameData;
    return (Number.isFinite(candidate.top) &&
        Number.isFinite(candidate.left) &&
        Number.isFinite(candidate.subFrameDepth) &&
        (candidate.frameId === undefined || Number.isFinite(candidate.frameId)) &&
        (candidate.parentFrameIds === undefined ||
            (Array.isArray(candidate.parentFrameIds) &&
                candidate.parentFrameIds.every((id) => Number.isFinite(id)))));
}

;// ./src/autofill/overlay/inline-menu/pages/menu-container/autofill-inline-menu-container.ts



/**
 * Allowlist of commands that can be sent to the background script.
 */
const ALLOWED_BG_COMMANDS = new Set([
    "addNewVaultItem",
    "autofillInlineMenuBlurred",
    "autofillInlineMenuButtonClicked",
    "checkAutofillInlineMenuButtonFocused",
    "checkInlineMenuButtonFocused",
    "fillAutofillInlineMenuCipher",
    "fillGeneratedPassword",
    "redirectAutofillInlineMenuFocusOut",
    "refreshGeneratedPassword",
    "refreshOverlayCiphers",
    "triggerDelayedAutofillInlineMenuClosure",
    "updateAutofillInlineMenuColorScheme",
    "updateAutofillInlineMenuListHeight",
    "unlockVault",
    "viewSelectedCipher",
]);
class AutofillInlineMenuContainer {
    constructor() {
        var _a;
        this.setElementStyles = setElementStyles;
        this.port = null;
        this.isInitialized = false;
        this.iframeStyles = {
            all: "initial",
            position: "fixed",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            display: "block",
            zIndex: "2147483647",
            lineHeight: "0",
            overflow: "hidden",
            visibility: "visible",
            clipPath: "none",
            pointerEvents: "auto",
            margin: "0",
            padding: "0",
            colorScheme: "normal",
        };
        this.defaultIframeAttributes = {
            src: "",
            title: "",
            sandbox: "allow-scripts",
            credentialless: "",
            allowtransparency: "true",
            tabIndex: "-1",
        };
        this.windowMessageHandlers = {
            initAutofillInlineMenuButton: (message) => this.handleInitInlineMenuIframe(message),
            initAutofillInlineMenuList: (message) => this.handleInitInlineMenuIframe(message),
        };
        /**
         * Sets up the port message listener for the inline menu page.
         *
         * @param message - The message containing the port name.
         */
        this.setupPortMessageListener = (message) => {
            this.port = chrome.runtime.connect({ name: this.portName });
            const initMessage = Object.assign(Object.assign({}, message), { token: this.token });
            this.postMessageToInlineMenuPageUnsafe(initMessage);
        };
        /**
         * Handles window messages, routing them to the appropriate handler.
         *
         * @param event - The message event.
         */
        this.handleWindowMessage = (event) => {
            const message = event.data;
            if (!(message === null || message === void 0 ? void 0 : message.command)) {
                return;
            }
            if (this.isForeignWindowMessage(event)) {
                return;
            }
            if (this.windowMessageHandlers[message.command]) {
                // only accept init messages from extension origin or parent window
                if ((message.command === "initAutofillInlineMenuButton" ||
                    message.command === "initAutofillInlineMenuList") &&
                    !this.isMessageFromExtensionOrigin(event) &&
                    !this.isMessageFromParentWindow(event)) {
                    return;
                }
                this.windowMessageHandlers[message.command](message);
                return;
            }
            if (this.isMessageFromParentWindow(event)) {
                // messages from parent window are trusted and forwarded to iframe
                this.postMessageToInlineMenuPage(message);
                return;
            }
            // messages from iframe to background require object identity verification with a contentWindow check and token auth
            if (this.isMessageFromInlineMenuPageIframe(event)) {
                if (this.isValidSessionToken(message)) {
                    this.postMessageToBackground(message);
                }
                return;
            }
        };
        this.token = generateRandomChars(32);
        this.extensionOrigin = (_a = BrowserApi.getRuntimeURL("")) === null || _a === void 0 ? void 0 : _a.slice(0, -1);
        globalThis.addEventListener("message", this.handleWindowMessage);
    }
    /**
     * Handles initialization of the iframe used to display the inline menu.
     *
     * @param message - The message containing the iframe url and page title.
     */
    handleInitInlineMenuIframe(message) {
        if (this.isInitialized) {
            return;
        }
        const expectedOrigin = message.extensionOrigin || this.extensionOrigin;
        if (!this.isExtensionUrlWithOrigin(message.iframeUrl, expectedOrigin)) {
            return;
        }
        if (message.styleSheetUrl && !this.isExtensionUrlWithOrigin(message.styleSheetUrl)) {
            return;
        }
        this.defaultIframeAttributes.src = message.iframeUrl;
        this.defaultIframeAttributes.title = message.pageTitle;
        this.portName = message.portName;
        this.isInitialized = true;
        this.inlineMenuPageIframe = globalThis.document.createElement("iframe");
        this.setElementStyles(this.inlineMenuPageIframe, this.iframeStyles, true);
        for (const [attribute, value] of Object.entries(this.defaultIframeAttributes)) {
            this.inlineMenuPageIframe.setAttribute(attribute, value);
        }
        const handleInlineMenuPageIframeLoad = () => {
            this.inlineMenuPageIframe.removeEventListener(EVENTS.LOAD, handleInlineMenuPageIframeLoad);
            this.setupPortMessageListener(message);
        };
        this.inlineMenuPageIframe.addEventListener(EVENTS.LOAD, handleInlineMenuPageIframeLoad);
        globalThis.document.body.appendChild(this.inlineMenuPageIframe);
    }
    /**
     * Validates that a URL uses an extension protocol and matches the expected extension origin.
     * If no expectedOrigin is provided, validates against the URL's own origin.
     *
     * @param url - The URL to validate.
     */
    isExtensionUrlWithOrigin(url, expectedOrigin) {
        if (!url) {
            return false;
        }
        try {
            const urlObj = new URL(url);
            const extensionProtocols = new Set([
                "chrome-extension:",
                "moz-extension:",
                "safari-web-extension:",
            ]);
            const isExtensionProtocol = extensionProtocols.has(urlObj.protocol);
            if (!isExtensionProtocol) {
                return false;
            }
            const originToValidate = expectedOrigin !== null && expectedOrigin !== void 0 ? expectedOrigin : urlObj.origin;
            return urlObj.origin === originToValidate || urlObj.href.startsWith(originToValidate + "/");
        }
        catch (_a) {
            return false;
        }
    }
    /**
     * Posts a message to the inline menu page iframe.
     *
     * @param message - The message to post.
     */
    postMessageToInlineMenuPage(message) {
        var _a;
        if ((_a = this.inlineMenuPageIframe) === null || _a === void 0 ? void 0 : _a.contentWindow) {
            const messageWithToken = Object.assign(Object.assign({}, message), { token: this.token });
            this.postMessageToInlineMenuPageUnsafe(messageWithToken);
        }
    }
    /**
     * Posts a message to the inline menu page iframe without token validation.
     *
     * UNSAFE: Bypasses token authentication and sends raw messages. Only use internally
     * when sending trusted messages (e.g., initialization) or when token validation
     * would create circular dependencies. External callers should use postMessageToInlineMenuPage().
     *
     * @param message - The message to post.
     */
    postMessageToInlineMenuPageUnsafe(message) {
        var _a;
        if ((_a = this.inlineMenuPageIframe) === null || _a === void 0 ? void 0 : _a.contentWindow) {
            this.inlineMenuPageIframe.contentWindow.postMessage(message, "*");
        }
    }
    /**
     * Posts a message from the inline menu iframe to the background script.
     *
     * @param message - The message to post.
     */
    postMessageToBackground(message) {
        if (!this.port) {
            return;
        }
        if (message.command && !ALLOWED_BG_COMMANDS.has(message.command)) {
            return;
        }
        this.port.postMessage(message);
    }
    /**
     * Identifies if the message is from a foreign window. A foreign window message is
     * considered as any message that does not have a portKey, is not from the parent window,
     * or is not from the inline menu page iframe.
     *
     * @param event - The message event.
     */
    isForeignWindowMessage(event) {
        var _a;
        if (!((_a = event.data) === null || _a === void 0 ? void 0 : _a.portKey)) {
            return true;
        }
        if (this.isMessageFromParentWindow(event)) {
            return false;
        }
        return !this.isMessageFromInlineMenuPageIframe(event);
    }
    /**
     * Identifies if the message is from the parent window.
     *
     * @param event - The message event.
     */
    isMessageFromParentWindow(event) {
        return globalThis.parent === event.source;
    }
    /**
     * Identifies if the message is from the inline menu page iframe.
     *
     * @param event - The message event.
     */
    isMessageFromInlineMenuPageIframe(event) {
        if (!this.inlineMenuPageIframe) {
            return false;
        }
        // only trust the specific iframe we created
        return this.inlineMenuPageIframe.contentWindow === event.source;
    }
    /**
     * Validates that the message contains a valid session token.
     * The session token is generated when the container is created and is refreshed
     * every time the inline menu container is recreated.
     *
     */
    isValidSessionToken(message) {
        if (!this.token || !(message === null || message === void 0 ? void 0 : message.token) || !(message === null || message === void 0 ? void 0 : message.token.length)) {
            return false;
        }
        return message.token === this.token;
    }
    /**
     * Validates that a message event originates from the extension.
     *
     * @param event - The message event to validate.
     * @returns True if the message is from the extension origin.
     */
    isMessageFromExtensionOrigin(event) {
        try {
            if (event.origin === "null") {
                return false;
            }
            return event.origin === this.extensionOrigin;
        }
        catch (_a) {
            return false;
        }
    }
}

;// ./src/autofill/overlay/inline-menu/pages/menu-container/bootstrap-autofill-inline-menu-container.ts
// FIXME: Remove when updating file. Eslint update
// eslint-disable-next-line @typescript-eslint/no-require-imports
__webpack_require__(90495);

(() => new AutofillInlineMenuContainer())();

}();
/******/ })()
;