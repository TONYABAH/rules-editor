import{Rules as e}from"rules-engine/src/Rules";function t(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,n(e,t)}function n(e,t){return(n=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e})(e,t)}var r=window.ace,o=r.Range,i=r.EditSession,s=r.UndoManager,a=r.require("ace/mode/text_highlight_rules").TextHighlightRules,u=r.require("ace/mode/text").Mode,l=r.require("ace/mode/folding/fold_mode").FoldMode,c=r.require("ace/token_iterator").TokenIterator,g={light:["Solarized Light","Ambience","Chrome","Textmate"],dark:["Cobalt","Merbivore Soft","Monokai","Tomorrow night blue","Twilight"]};e.init(["fr","de"]);var f=function(n){function r(t){var r;return(r=n.call(this)||this).keywords={},r.rules=new e(t,"ace/mode/kbf"),r.setLanguage(t),r}t(r,n);var o=r.prototype;return o.getRules=function(){var e=this;return{start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:/'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/},{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:/\s+/},{token:"keyword.operator",regex:/[-+%=<>*]|[~:,.&!^]/},{token:"keyword.operator",regex:"abs sign ceil floor trunc frac acos asin atan cos sin tan cosh sinh tanh exp log log10 sqrt pi".split(" ").join("|")},{token:function(t){var n=e.keywordEntries.find(function(e){return e[1].toLowerCase()===t.toLowerCase()});if(!n)return"text";switch(n[0]){case"TRUE":case"FALSE":case"YES":case"NO":return"constant.language.boolean";case"OR":case"AND":case"IF":case"ELSE":case"ELSEIF":case"THEN":return"keyword.control";case"DIGIT":case"TEXT":case"MENU":case"NUMBER":return"constant.language";default:return"keyword.other"}},regex:new RegExp(/\b\w+\b/)},{caseInsensitive:!0}],qstring:[{token:"constant.language.escape",regex:/''/},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:/``/},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]}},o.setLanguage=function(e){if(this.keywords=this.rules.getKeywords(),!this.keywords)throw new Error("Language not supported yet: "+e||"");this.keywordEntries=Object.entries(this.keywords),this.$rules=this.getRules(),this.normalizeRules()},r}(a),d=o,h=c,m={en:{foldingStartMarker:/\b^\s*(?:rule|prompt|summary)\b/i,foldingStopMarker:/\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/gi,foldingStopMenu:/\b^\s*(?:max|min|text|digit|yes\/no)\b/gi},fr:{foldingStartMarker:/\b^\s*(?:rule|prompt|summary)\b/i,foldingStopMarker:/\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/gi,foldingStopMenu:/\b^\s*(?:max|min|text|digit|yes\/no)\b/gi}},k=function(e){function n(){var t;return(t=e.call(this)||this).foldingStartMarker=m.en.foldingStartMarker,t.foldingStopMarker=m.en.foldingStopMarker,t.foldingStopMenu=m.en.foldingStopMenu,t.getFoldWidgetRange=function(e,n,r){var o=e.language,i=e.getLine(r);if(t.foldingStartMarker=m[o].foldingStartMarker,t.foldingStopMarker=m[o].foldingStopMarker,t.foldingStopMenu=m[o].foldingStopMenu,i.match(t.foldingStartMarker))for(var s={row:r,column:i.length},a=new h(e,s.row,s.column),u=a.getCurrentToken(),l=t.foldingStopMarker;u;){if(u.value.match(l)){var c=a.getCurrentTokenRow();return d.fromPoints(s,{row:u.value.match(t.foldingStopMenu)?c:c-1,column:a.getCurrentTokenColumn()})}u=a.stepForward()}return null},t}return t(n,e),n}(l);function p(e,t,n){var r;return function(){var o=this,i=arguments,s=function(){r=null,n||e.apply(o,i)},a=n&&!r;clearTimeout(r),r=setTimeout(s,t),a&&e.apply(o,i)}}var x=function(n){function r(t,r){var o;return void 0===r&&(r=!0),(o=n.call(this)||this).lineCommentStart="//",o.blockComment={start:"/*",end:"*/"},o.editor=t,o.language=t.session.language,o.$highlightRules=new f(o.language),o.$id="ace/mode/kbf",o.rules=new e(o.editor.session.language||"en",o.$id),r&&o.watch(),o}return t(r,n),r.prototype.watch=function(){var e=this;this.foldingRules=new k,this.editor.on("change",p(function(){try{var t=e.editor.getValue(),n=function(n,r){try{var o=Promise.resolve(e.rules.parse(t)).then(function(t){e.editor.session.clearAnnotations(),e.editor.session.setAnnotations(t)})}catch(e){return r(e)}return o&&o.then?o.then(void 0,r):o}(0,function(e){console.log(e)});return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},1e3))},r}(u),w=new(function(e){function n(){var t;return(t=e.call(this)||this).$rules={start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:"keyword.operator",regex:/\W[-+%=<>*]\W|\*\*|[~:,.&$]|->*?|=>/},{token:"paren.lparen",regex:/[\[(\{]/},{token:"paren.rparen",regex:/[\])\}]/},{token:"keyword",regex:/[^=]+(?:[=:])/},{token:"punctuation.operator",regex:/\?[:,;=\.]/},{caseInsensitive:!0}],qstring:[{token:"constant.language.escape",regex:/''/},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:/``/},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}],comment:[{token:"comment",regex:/\*\//,next:"start"},{defaultToken:"comment"}]},t}return t(n,e),n}(a)),v=o,y=c,S=function(e){function n(){var t;return(t=e.call(this)||this).foldingStartMarker=/^\s*\/\/[^-]+$/,t.foldingStopMarker=/^\s*--/,t.getFoldWidgetRange=function(e,n,r){var o=e.getLine(r);if(o.match(t.foldingStartMarker))for(var i={row:r,column:o.length},s=new y(e,i.row,i.column),a=s.getCurrentToken(),u=t.foldingStopMarker;a;){if(a.value.match(u)){var l=s.getCurrentTokenRow();return v.fromPoints(i,{row:l,column:s.getCurrentTokenColumn()})}a=s.stepForward()}return null},t}return t(n,e),n}(l),b=function(n){function r(t,r){var o;return void 0===r&&(r=!1),(o=n.call(this)||this).$highlightRules=o.HighlightRules=w,o.foldingRules=new S,o.editor=t,o.language=t.session.language,o.$id="ace/mode/res",o.rules=new e(o.editor.session.language||"en",o.$id),r||o.watch(),o}return t(r,n),r.prototype.watch=function(){var e=this;this.editor.on("change",p(function(){try{var t=e.editor.getValue(),n=function(n,r){try{var o=Promise.resolve(e.rules.parse(t)).then(function(t){e.editor.session.clearAnnotations(),e.editor.session.setAnnotations(t)})}catch(e){return r(e)}return o&&o.then?o.then(void 0,r):o}(0,function(e){console.log(e)});return Promise.resolve(n&&n.then?n.then(function(){}):void 0)}catch(e){return Promise.reject(e)}},1e3))},r}(u),M=new(function(){function e(){return e.instance||(e.instance=this),this.language="en",this.editors=[],this.defaults={fontSize:18,fontName:"Courier New",theme:"ace/theme/tomorrow_night_blue"},this.theme=this.defaults.theme,this.fontSize=this.defaults.fontSize,this.fontName=this.defaults.fontName,e.instance}var t,n=e.prototype;return n.setHighlightRule=function(e,t){var n=t?t.substring(t.indexOf(".")):".kbf",o=null;if(".kbf"===n)o=new x(e);else if(".res"===n)o=new b(e);else{var i=function(e){var t=e.split(".").pop(),n="ace/mode/";if(!t)return n+"text";switch(t){case"js":return n+"javascript";case"json":return n+"json"}}(t),s=r.require(i).Mode;e.session.setMode(new s)}e.session.setMode(o,function(){e.session.bgTokenizer.start(0)})},n.edit=function(e,t){void 0===t&&(t={});var n=null;if("string"==typeof e?n=document.getElementById(e)||document.querySelector(e):e&&(e.id||e.tagName)&&(n=e),!n)return console.error("Invalid container reference: "+n),null;if("object"!=typeof t)return console.error("Invalid options parameter : "+t),null;var o=null,a=new i(t.text?t.text:"");return a.language=t.language?t.language:this.language,a.setUndoManager(new s),(o=r.edit(n,Object.assign({fontSize:t.fontSize||this.fontSize,fontFamily:t.fontName||this.fontName,theme:t.theme||this.theme,showLineNumbers:!0,readOnly:!1,showGutter:!0,animatedScroll:!0,minLines:5,maxLines:"auto",selectionStyle:"row",highlightActiveLine:!0,showPrintMargin:!0},t))).data=t.data||{},o.setSession(a),o.renderer.setScrollMargin(10,10,10,10),o.$blockScrolling=Infinity,o.setOptions({scrollPastEnd:.9,autoScrollEditorIntoView:!0}),o.focus(),this.setHighlightRule(o,t.fileName),this.editors.push(o),setTimeout(function(){o.clearSelection()},0),o},n.reset=function(){this.FontSize=this.defaults.fontSize,this.FontName=this.defaults.fontName,this.Theme=this.defaults.theme},n.destroy=function(){this.editors.forEach(function(e){e.destroy(),e.container.remove()})},(t=[{key:"ThemeList",get:function(){return g}},{key:"Theme",get:function(){return this.theme},set:function(e){var t=this;if(e){var n=e&&e.toLowerCase();(this.Themes.dark.find(function(e){return e.toLowerCase()===n.toLocaleLowerCase()})||this.Themes.light.find(function(e){return e.toLowerCase()===n.toLocaleLowerCase()}))&&(this.theme="ace/theme/"+n.replace(/\s+/g,"_"),this.editors.forEach(function(e){return e.setTheme(t.theme)}))}else console.log("Theme not set")}},{key:"FontName",get:function(){return this.fontName},set:function(e){this.fontName=e}},{key:"FontSize",get:function(){return this.fontSize},set:function(e){this.fontSize=e}},{key:"Editors",get:function(){return this.editors}}])&&function(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}(e.prototype,t),e}());Object.freeze(M);export{M as default};
//# sourceMappingURL=rules-editor.esm.js.map
