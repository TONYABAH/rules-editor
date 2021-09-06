import{Rules as e}from"rules-engine/src/Rules";const t=window.ace,{Range:n,EditSession:o,UndoManager:r}=t,s=t.require("ace/mode/text_highlight_rules").TextHighlightRules,i=t.require("ace/mode/text").Mode,a=t.require("ace/mode/folding/fold_mode").FoldMode,g=t.require("ace/token_iterator").TokenIterator,l={light:["Solarized Light","Ambience","Chrome","Textmate"],dark:["Cobalt","Merbivore Soft","Monokai","Tomorrow night blue","Twilight"]};var c={__proto__:null,ace:t,Range:n,EditSession:o,UndoManager:r,BaseFoldMode:a,TokenIterator:g,TextHighlightRules:s,TextMode:i,Themes:l};e.init(["fr","de"]);const u=s;class h extends u{constructor(t){super(),this.keywords={},this.rules=new e(t,"ace/mode/kbf"),this.setLanguage(t)}getRules(){return{start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:/'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/},{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"constant.numeric",regex:"0[xX][0-9a-fA-F]+\\b"},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:"punctuation.operator",regex:/\?|\:|\,|\;|\./},{token:"paren.lparen",regex:"[[({]"},{token:"paren.rparen",regex:"[\\])}]"},{token:"text",regex:/\s+/},{token:"keyword.operator",regex:/[-+%=<>*]|[~:,.&!^]/},{token:"keyword.operator",regex:"abs sign ceil floor trunc frac acos asin atan cos sin tan cosh sinh tanh exp log log10 sqrt pi".split(" ").join("|")},{token:e=>{const t=this.keywordEntries.find(t=>t[1].toLowerCase()===e.toLowerCase());if(!t)return"text";switch(t[0]){case"TRUE":case"FALSE":case"YES":case"NO":return"constant.language.boolean";case"OR":case"AND":case"IF":case"ELSE":case"ELSEIF":case"THEN":return"keyword.control";case"DIGIT":case"TEXT":case"MENU":case"NUMBER":return"constant.language";default:return"keyword.other"}},regex:new RegExp(/\b\w+\b/)},{caseInsensitive:!0}],qstring:[{token:"constant.language.escape",regex:/''/},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:/``/},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}],comment:[{token:"comment",regex:"\\*\\/",next:"start"},{defaultToken:"comment"}]}}setLanguage(e){if(this.keywords=this.rules.getKeywords(),!this.keywords)throw new Error("Language not supported yet: "+e||"");this.keywordEntries=Object.entries(this.keywords),this.$rules=this.getRules(),this.normalizeRules()}}const{Range:d,BaseFoldMode:m,TokenIterator:f}=c,k={en:{foldingStartMarker:/\b^\s*(?:rule|prompt|summary)\b/i,foldingStopMarker:/\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/gi,foldingStopMenu:/\b^\s*(?:max|min|text|digit|yes\/no)\b/gi},fr:{foldingStartMarker:/\b^\s*(?:rule|prompt|summary)\b/i,foldingStopMarker:/\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/gi,foldingStopMenu:/\b^\s*(?:max|min|text|digit|yes\/no)\b/gi}};class x extends m{constructor(){super(),this.foldingStartMarker=k.en.foldingStartMarker,this.foldingStopMarker=k.en.foldingStopMarker,this.foldingStopMenu=k.en.foldingStopMenu,this.getFoldWidgetRange=(e,t,n)=>{const o=e.language;var r=e.getLine(n);if(this.foldingStartMarker=k[o].foldingStartMarker,this.foldingStopMarker=k[o].foldingStopMarker,this.foldingStopMenu=k[o].foldingStopMenu,r.match(this.foldingStartMarker))for(var s={row:n,column:r.length},i=new f(e,s.row,s.column),a=i.getCurrentToken(),g=this.foldingStopMarker;a;){if(a.value.match(g)){const e=i.getCurrentTokenRow();return d.fromPoints(s,{row:a.value.match(this.foldingStopMenu)?e:e-1,column:i.getCurrentTokenColumn()})}a=i.stepForward()}return null}}}function p(e,t,n){var o;return function(){var r=this,s=arguments,i=function(){o=null,n||e.apply(r,s)},a=n&&!o;clearTimeout(o),o=setTimeout(i,t),a&&e.apply(r,s)}}class w extends i{constructor(t,n=!0){super(),this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.editor=t,this.language=t.session.language,this.$highlightRules=new h(this.language),this.$id="ace/mode/kbf",this.rules=new e(this.editor.session.language||"en",this.$id),n&&this.watch()}watch(){var e=this;this.foldingRules=new x,this.editor.on("change",p(async function(){const t=e.editor.getValue();try{const n=await e.rules.parse(t);e.editor.session.clearAnnotations(),e.editor.session.setAnnotations(n)}catch(e){console.log(e)}},1e3))}}const{TextHighlightRules:S}=c;var M=new class extends S{constructor(){super(),this.$rules={start:[{token:"comment",regex:/\/\/.*$/},{token:"comment",regex:/\/\*/,next:"comment"},{token:"string",regex:"`",next:"string"},{token:"string",regex:"'",next:"qstring"},{token:"constant.numeric",regex:/0[xX][0-9a-fA-F]+\b/},{token:"constant.numeric",regex:/[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/},{token:"keyword.operator",regex:/\W[-+%=<>*]\W|\*\*|[~:,.&$]|->*?|=>/},{token:"paren.lparen",regex:/[\[(\{]/},{token:"paren.rparen",regex:/[\])\}]/},{token:"keyword",regex:/[^=]+(?:[=:])/},{token:"punctuation.operator",regex:/\?[:,;=\.]/},{caseInsensitive:!0}],qstring:[{token:"constant.language.escape",regex:/''/},{token:"string",regex:"'",next:"start"},{defaultToken:"string"}],string:[{token:"constant.language.escape",regex:/``/},{token:"string",regex:"`",next:"start"},{defaultToken:"string"}],comment:[{token:"comment",regex:/\*\//,next:"start"},{defaultToken:"comment"}]}}};const{Range:T,BaseFoldMode:b,TokenIterator:y}=c;class R extends b{constructor(){super(),this.foldingStartMarker=/^\s*\/\/[^-]+$/,this.foldingStopMarker=/^\s*--/,this.getFoldWidgetRange=(e,t,n)=>{var o=e.getLine(n);if(o.match(this.foldingStartMarker))for(var r={row:n,column:o.length},s=new y(e,r.row,r.column),i=s.getCurrentToken(),a=this.foldingStopMarker;i;){if(i.value.match(a)){const e=s.getCurrentTokenRow();return T.fromPoints(r,{row:e,column:s.getCurrentTokenColumn()})}i=s.stepForward()}return null}}}class E extends i{constructor(t,n=!1){super(),this.$highlightRules=this.HighlightRules=M,this.foldingRules=new R,this.editor=t,this.language=t.session.language,this.$id="ace/mode/res",this.rules=new e(this.editor.session.language||"en",this.$id),n||this.watch()}watch(){var e=this;this.editor.on("change",p(async function(){const t=e.editor.getValue();try{const n=await e.rules.parse(t);e.editor.session.clearAnnotations(),e.editor.session.setAnnotations(n)}catch(e){console.log(e)}},1e3))}}class v{constructor(){return v.instance||(v.instance=this),this.language="en",this.editors=[],this.defaults={fontSize:18,fontName:"Courier New",theme:"ace/theme/tomorrow_night_blue"},this.theme=this.defaults.theme,this.fontSize=this.defaults.fontSize,this.fontName=this.defaults.fontName,v.instance}setHighlightRule(e,n){const o=n?n.substring(n.indexOf(".")):".kbf";let r=null;if(".kbf"===o)r=new w(e);else if(".res"===o)r=new E(e);else{const o=function(e){var t=e.split(".").pop(),n="ace/mode/";if(!t)return n+"text";switch(t){case"js":return n+"javascript";case"json":return n+"json"}}(n),r=t.require(o).Mode;e.session.setMode(new r)}e.session.setMode(r,()=>{e.session.bgTokenizer.start(0)})}edit(e,n={}){let s=null;if("string"==typeof e?s=document.getElementById(e)||document.querySelector(e):e&&(e.id||e.tagName)&&(s=e),!s)return console.error("Invalid container reference: "+s),null;if("object"!=typeof n)return console.error("Invalid options parameter : "+n),null;let i=null;const a=new o(n.text?n.text:"");return a.language=n.language?n.language:this.language,a.setUndoManager(new r),i=t.edit(s,Object.assign({fontSize:n.fontSize||this.fontSize,fontFamily:n.fontName||this.fontName,theme:n.theme||this.theme,showLineNumbers:!0,readOnly:!1,showGutter:!0,animatedScroll:!0,minLines:5,maxLines:"auto",selectionStyle:"row",highlightActiveLine:!0,showPrintMargin:!0},n)),i.data=n.data||{},i.setSession(a),i.renderer.setScrollMargin(10,10,10,10),i.$blockScrolling=Infinity,i.setOptions({scrollPastEnd:.9,autoScrollEditorIntoView:!0}),i.focus(),this.setHighlightRule(i,n.fileName),this.editors.push(i),setTimeout(()=>{i.clearSelection()},0),i}reset(){this.FontSize=this.defaults.fontSize,this.FontName=this.defaults.fontName,this.Theme=this.defaults.theme}destroy(){this.editors.forEach(e=>{e.destroy(),e.container.remove()})}get ThemeList(){return l}set Theme(e){if(!e)return void console.log("Theme not set");let t=e&&e.toLowerCase();(this.Themes.dark.find(e=>e.toLowerCase()===t.toLocaleLowerCase())||this.Themes.light.find(e=>e.toLowerCase()===t.toLocaleLowerCase()))&&(this.theme="ace/theme/"+t.replace(/\s+/g,"_"),this.editors.forEach(e=>e.setTheme(this.theme)))}get Theme(){return this.theme}get FontName(){return this.fontName}set FontName(e){this.fontName=e}get FontSize(){return this.fontSize}set FontSize(e){this.fontSize=e}get Editors(){return this.editors}}const L=new v;Object.freeze(L);export{L as default};
//# sourceMappingURL=rules-editor.js.map