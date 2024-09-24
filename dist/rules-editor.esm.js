import e,{Range as t,EditSession as n,UndoManager as r}from"ace-builds/src-noconflict/ace.js";import"ace-builds/src-noconflict/theme-cobalt.js";import"ace-builds/src-noconflict/theme-merbivore_soft.js";import"ace-builds/src-noconflict/theme-monokai.js";import"ace-builds/src-noconflict/theme-tomorrow_night_blue.js";import"ace-builds/src-noconflict/theme-twilight.js";import"ace-builds/src-noconflict/theme-solarized_light.js";import"ace-builds/src-noconflict/theme-ambiance.js";import"ace-builds/src-noconflict/theme-chrome.js";import"ace-builds/src-noconflict/theme-textmate.js";import"ace-builds/webpack-resolver";import{Rules as o}from"rules-engine";function i(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,s(e,t)}function s(e,t){return(s=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}e.config.set("basePath","ace-builds/src-noconflict/");var a=e.require("ace/mode/text_highlight_rules").TextHighlightRules,c=e.require("ace/mode/text").Mode,u=e.require("ace/mode/folding/fold_mode").FoldMode,l=e.require("ace/token_iterator").TokenIterator,g={light:["Solarized Light","Ambience","Chrome","Textmate"],dark:["Cobalt","Merbivore Soft","Monokai","Tomorrow night blue","Twilight"]};o.init(["fr","de"]);var f=function(e){function t(t){var n;return(n=e.call(this)||this).keywords={},n.rules=new o(t,"ace/mode/kbf"),n.setLanguage(t),n}i(t,e);var n=t.prototype;return n.getRules=function(){var e=this;return{start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:/'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/},{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:/\s+/},{token:"keyword.operator",regex:/[-+%=<>*]|[~:,.&!^]/},{token:"keyword.operator",regex:"abs sign ceil floor trunc frac acos asin atan cos sin tan cosh sinh tanh exp log log10 sqrt pi".split(" ").join("|")},{token:function(t){var n=e.keywordEntries.find(function(e){return e[1].toLowerCase()===t.toLowerCase()});if(!n)return"text";switch(n[0]){case"TRUE":case"FALSE":case"YES":case"NO":return"constant.language.boolean";case"OR":case"AND":case"IF":case"ELSE":case"ELSEIF":case"THEN":return"keyword.control";case"DIGIT":case"TEXT":case"MENU":case"NUMBER":return"constant.language";default:return"keyword.other"}},regex:new RegExp(/\b\w+\b/)},{caseInsensitive:!0}],qstring:[{token:"constant.language.escape",regex:/''/},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:/``/},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]}},n.setLanguage=function(e){if(this.keywords=this.rules.getKeywords(),!this.keywords)throw new Error("Language not supported yet: "+e||"");this.keywordEntries=Object.entries(this.keywords),this.$rules=this.getRules(),this.normalizeRules()},t}(a),h=t,d=l,m={en:{foldingStartMarker:/\b^\s*(?:rule|prompt|summary)\b/i,foldingStopMarker:/\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/gi,foldingStopMenu:/\b^\s*(?:max|min|text|digit|yes\/no)\b/gi},fr:{foldingStartMarker:/\b^\s*(?:rule|prompt|summary)\b/i,foldingStopMarker:/\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/gi,foldingStopMenu:/\b^\s*(?:max|min|text|digit|yes\/no)\b/gi}},p=function(e){function t(){var t;return(t=e.call(this)||this).foldingStartMarker=m.en.foldingStartMarker,t.foldingStopMarker=m.en.foldingStopMarker,t.foldingStopMenu=m.en.foldingStopMenu,t.getFoldWidgetRange=function(e,n,r){var o=e.language,i=e.getLine(r);if(t.foldingStartMarker=m[o].foldingStartMarker,t.foldingStopMarker=m[o].foldingStopMarker,t.foldingStopMenu=m[o].foldingStopMenu,i.match(t.foldingStartMarker))for(var s={row:r,column:i.length},a=new d(e,s.row,s.column),c=a.getCurrentToken(),u=t.foldingStopMarker;c;){if(c.value.match(u)){var l=a.getCurrentTokenRow();return h.fromPoints(s,{row:c.value.match(t.foldingStopMenu)?l:l-1,column:a.getCurrentTokenColumn()})}c=a.stepForward()}return null},t}return i(t,e),t}(u);function k(e,t,n){var r;return function(){var o=this,i=arguments,s=function(){r=null,n||e.apply(o,i)},a=n&&!r;clearTimeout(r),r=setTimeout(s,t),a&&e.apply(o,i)}}var x=function(e){function t(t,n){var r;return void 0===n&&(n=!0),(r=e.call(this)||this).lineCommentStart="//",r.blockComment={start:"/*",end:"*/"},r.editor=t,r.language=t.session.language,r.$highlightRules=new f(r.language),r.$id="ace/mode/kbf",r.rules=new o(r.editor.session.language||"en",r.$id),n&&r.watch(),r}return i(t,e),t.prototype.watch=function(){var e=this;this.foldingRules=new p,this.editor.on("change",k(function(){try{var t=e.editor.getValue(),n=function(n,r){try{var o=Promise.resolve(e.rules.parse(t)).then(function(t){e.editor.session.clearAnnotations(),e.editor.session.setAnnotations(t)})}catch(e){return r(e)}return o&&o.then?o.then(void 0,r):o}(0,function(e){console.log(e)});return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},1e3))},t}(c),w=new(function(e){function t(){var t;return(t=e.call(this)||this).$rules={start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:"keyword.operator",regex:/\W[-+%=<>*]\W|\*\*|[~:,.&$]|->*?|=>/},{token:"paren.lparen",regex:/[\[(\{]/},{token:"paren.rparen",regex:/[\])\}]/},{token:"keyword",regex:/[^=]+(?:[=:])/},{token:"punctuation.operator",regex:/\?[:,;=\.]/},{caseInsensitive:!0}],qstring:[{token:"constant.language.escape",regex:/''/},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:/``/},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}],comment:[{token:"comment",regex:/\*\//,next:"start"},{defaultToken:"comment"}]},t}return i(t,e),t}(a)),b=t,v=l,y=function(e){function t(){var t;return(t=e.call(this)||this).foldingStartMarker=/^\s*\/\/[^-]+$/,t.foldingStopMarker=/^\s*--/,t.getFoldWidgetRange=function(e,n,r){var o=e.getLine(r);if(o.match(t.foldingStartMarker))for(var i={row:r,column:o.length},s=new v(e,i.row,i.column),a=s.getCurrentToken(),c=t.foldingStopMarker;a;){if(a.value.match(c)){var u=s.getCurrentTokenRow();return b.fromPoints(i,{row:u,column:s.getCurrentTokenColumn()})}a=s.stepForward()}return null},t}return i(t,e),t}(u),S=function(e){function t(t,n){var r;return void 0===n&&(n=!1),(r=e.call(this)||this).$highlightRules=r.HighlightRules=w,r.foldingRules=new y,r.editor=t,r.language=t.session.language,r.$id="ace/mode/res",r.rules=new o(r.editor.session.language||"en",r.$id),n||r.watch(),r}return i(t,e),t.prototype.watch=function(){var e=this;this.editor.on("change",k(function(){try{var t=e.editor.getValue(),n=function(n,r){try{var o=Promise.resolve(e.rules.parse(t)).then(function(t){e.editor.session.clearAnnotations(),e.editor.session.setAnnotations(t)})}catch(e){return r(e)}return o&&o.then?o.then(void 0,r):o}(0,function(e){console.log(e)});return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},1e3))},t}(c),M=new(function(){function t(){return t.instance||(t.instance=this),this.language="en",this.editors=[],this.defaults={fontSize:18,fontName:"Courier New",theme:"ace/theme/tomorrow_night_blue"},this.theme=this.defaults.theme,this.fontSize=this.defaults.fontSize,this.fontName=this.defaults.fontName,t.instance}var o,i=t.prototype;return i.setHighlightRule=function(t,n){var r=n?n.substring(n.indexOf(".")):".kbf",o=null;if(".kbf"===r)o=new x(t);else if(".res"===r)o=new S(t);else{var i=function(e){var t=e.split(".").pop(),n="ace/mode/";if(!t)return n+"text";switch(t){case"js":return n+"javascript";case"json":return n+"json"}}(n),s=e.require(i).Mode;t.session.setMode(new s)}t.session.setMode(o,function(){t.session.bgTokenizer.start(0)})},i.edit=function(t,o){void 0===o&&(o={});var i=null;if("string"==typeof t?i=document.getElementById(t)||document.querySelector(t):t&&(t.id||t.tagName)&&(i=t),!i)return console.error("Invalid container reference: "+i),null;if("object"!=typeof o)return console.error("Invalid options parameter : "+o),null;var s=null,a=new n(o.text?o.text:"");return a.language=o.language?o.language:this.language,a.setUndoManager(new r),(s=e.edit(i,Object.assign({fontSize:o.fontSize||this.fontSize,fontFamily:o.fontName||this.fontName,theme:o.theme||this.theme,showLineNumbers:!0,readOnly:!1,showGutter:!0,animatedScroll:!0,minLines:5,maxLines:"auto",selectionStyle:"row",highlightActiveLine:!0,showPrintMargin:!0},o))).data=o.data||{},s.setSession(a),s.renderer.setScrollMargin(10,10,10,10),s.$blockScrolling=Infinity,s.setOptions({scrollPastEnd:.9,autoScrollEditorIntoView:!0}),s.focus(),this.setHighlightRule(s,o.fileName),this.editors.push(s),setTimeout(function(){s.clearSelection()},0),s},i.reset=function(){this.FontSize=this.defaults.fontSize,this.FontName=this.defaults.fontName,this.Theme=this.defaults.theme},i.destroy=function(){this.editors.forEach(function(e){e.destroy(),e.container.remove()})},(o=[{key:"ThemeList",get:function(){return g}},{key:"Theme",get:function(){return this.theme},set:function(e){var t=this;if(e){var n=e&&e.toLowerCase();(this.Themes.dark.find(function(e){return e.toLowerCase()===n.toLocaleLowerCase()})||this.Themes.light.find(function(e){return e.toLowerCase()===n.toLocaleLowerCase()}))&&(this.theme="ace/theme/"+n.replace(/\s+/g,"_"),this.editors.forEach(function(e){return e.setTheme(t.theme)}))}else console.log("Theme not set")}},{key:"FontName",get:function(){return this.fontName},set:function(e){this.fontName=e}},{key:"FontSize",get:function(){return this.fontSize},set:function(e){this.fontSize=e}},{key:"Editors",get:function(){return this.editors}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(t.prototype,o),t}());Object.freeze(M);export{M as default};
//# sourceMappingURL=rules-editor.esm.js.map
