import { Rules } from 'rules-engine/src/Rules';

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;

  _setPrototypeOf(subClass, superClass);
}

function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}

// import ace from "ace-builds";
var ace = window.ace; // import { Range, EditSession, UndoManager } from "ace-builds";

var Range$2 = ace.Range,
    EditSession = ace.EditSession,
    UndoManager = ace.UndoManager;
/*import "ace-builds/src-noconflict/theme-cobalt.js";
import "ace-builds/src-noconflict/theme-merbivore_soft.js";
import "ace-builds/src-noconflict/theme-monokai.js";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue.js";
import "ace-builds/src-noconflict/theme-twilight.js";
import "ace-builds/src-noconflict/theme-solarized_light.js";
import "ace-builds/src-noconflict/theme-ambiance.js";
import "ace-builds/src-noconflict/theme-chrome.js";
import "ace-builds/src-noconflict/theme-textmate.js";
import "ace-builds/webpack-resolver";
const path = "ace-builds/src-noconflict/";
ace.config.set("basePath", path);*/

var TextHighlightRules$2 = ace.require("ace/mode/text_highlight_rules").TextHighlightRules;

var TextMode = ace.require("ace/mode/text").Mode;

var BaseFoldMode$2 = ace.require("ace/mode/folding/fold_mode").FoldMode;

var TokenIterator$2 = ace.require("ace/token_iterator").TokenIterator; // console.log(TextMode);
// const JSONMode = ace.require("ace/mode/json").Mode;


var Themes = {
  light: ["Solarized Light", "Ambience", "Chrome", "Textmate"],
  dark: ["Cobalt", "Merbivore Soft", "Monokai", "Tomorrow night blue", "Twilight"] // default: ace.require('ace/theme/ambiance'),

}; // import modes that you want to include into your main bundle

// import { ResParser, Parser, Keywords } from 'rules-engine'
Rules.init(["fr", "de"]);

var TextHighlightRules$1 = TextHighlightRules$2; // var rules = null;

var mode = "ace/mode/kbf";

var HighlightRules$2 = /*#__PURE__*/function (_TextHighlightRules) {
  _inheritsLoose(HighlightRules, _TextHighlightRules);

  function HighlightRules(language) {
    var _this;

    _this = _TextHighlightRules.call(this) || this;
    _this.keywords = {};
    _this.rules = new Rules(language, mode);

    _this.setLanguage(language);

    return _this;
  }

  var _proto = HighlightRules.prototype;

  _proto.getRules = function getRules() {
    var _this2 = this;

    return {
      start: [{
        token: "comment",
        regex: /\/\/.*$/
      }, {
        token: "comment",
        // multi line comment
        regex: /\/\*/,
        next: "comment"
      }, {
        token: "string",
        // character
        regex: /'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/
      }, {
        token: "string",
        regex: "`",
        next: "string"
      }, {
        token: "string",
        regex: "'",
        next: "qstring"
      }, {
        token: "constant.numeric",
        // hex
        regex: "0[xX][0-9a-fA-F]+\\b"
      }, {
        token: "constant.numeric",
        // float
        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
      }, {
        token: "punctuation.operator",
        regex: /\?|\:|\,|\;|\./
      }, {
        token: "paren.lparen",
        regex: "[[({]"
      }, {
        token: "paren.rparen",
        regex: "[\\])}]"
      }, {
        token: "text",
        regex: /\s+/
      }, {
        token: "keyword.operator",
        regex: /[-+%=<>*]|[~:,.&!^]/
      }, {
        token: "keyword.operator",
        regex: "abs sign ceil floor trunc frac acos asin atan cos sin tan cosh sinh tanh exp log log10 sqrt pi".split(" ").join("|")
      }, {
        token: function token(value) {
          var found = _this2.keywordEntries.find(function (entry) {
            return entry[1].toLowerCase() === value.toLowerCase();
          });

          if (found) {
            switch (found[0]) {
              case "TRUE":
              case "FALSE":
              case "YES":
              case "NO":
                return "constant.language.boolean";

              case "OR":
              case "AND":
              case "IF":
              case "ELSE":
              case "ELSEIF":
              case "THEN":
                return "keyword.control";

              case "DIGIT":
              case "TEXT":
              case "MENU":
              case "NUMBER":
                return "constant.language";

              default:
                return "keyword.other";
            }
          } else {
            return "text";
          }
        },
        regex: new RegExp(/\b\w+\b/)
      }, {
        caseInsensitive: true
      } // this.keywordRule
      ],
      qstring: [{
        token: "constant.language.escape",
        regex: /''/
      }, {
        token: "string",
        regex: "'",
        next: "start"
      }, {
        defaultToken: "string"
      }],
      string: [{
        token: "constant.language.escape",
        regex: /``/
      }, {
        token: "string",
        regex: "`",
        next: "start"
      }, {
        defaultToken: "string"
      }],
      comment: [{
        token: "comment",
        // closing comment
        regex: "\\*\\/",
        next: "start"
      }, {
        defaultToken: "comment"
      }]
    };
  } // Set language definition dynamically at run time
  ;

  _proto.setLanguage = function setLanguage(language) {
    this.keywords = this.rules.getKeywords();

    if (!this.keywords) {
      throw new Error("Language not supported yet: " + language || "");
    }

    this.keywordEntries = Object.entries(this.keywords);
    this.$rules = this.getRules();
    this.normalizeRules(); // this.embedRules(DocCommentHighlightRules, "doc-", [ DocCommentHighlightRules.getEndRule("start") ]);
  };

  return HighlightRules;
}(TextHighlightRules$1);

var Range$1 = Range$2,
    BaseFoldMode$1 = BaseFoldMode$2,
    TokenIterator$1 = TokenIterator$2; // ace.config.set('basePath', '../node_mdules/ace-builds/src-noconflict')
// ace.config.set('basePath', '../lib/ace-builds/src-noconflict')
// require('ace-builds/webpack-resolver')
// const Range = ace.Range
// const BaseFoldMode = ace.require('ace/mode/folding/fold_mode').FoldMode
// const TokenIterator = ace.require('ace/token_iterator').TokenIterator

var fold = {
  en: {
    foldingStartMarker: /\b^\s*(?:rule|prompt|summary)\b/i,
    foldingStopMarker: /\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/ig,
    foldingStopMenu: /\b^\s*(?:max|min|text|digit|yes\/no)\b/ig
  },
  fr: {
    foldingStartMarker: /\b^\s*(?:rule|prompt|summary)\b/i,
    foldingStopMarker: /\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/ig,
    foldingStopMenu: /\b^\s*(?:max|min|text|digit|yes\/no)\b/ig
  }
};

var _default$3 = /*#__PURE__*/function (_BaseFoldMode) {
  _inheritsLoose(_default, _BaseFoldMode);

  function _default() {
    var _this;

    _this = _BaseFoldMode.call(this) || this; // regular expressions that identify starting and stopping points

    _this.foldingStartMarker = fold.en.foldingStartMarker;
    _this.foldingStopMarker = fold.en.foldingStopMarker;
    _this.foldingStopMenu = fold.en.foldingStopMenu;

    _this.getFoldWidgetRange = function (session, _foldStyle, row) {
      var lang = session.language;
      var line = session.getLine(row);

      switch (lang) {
        default:
          _this.foldingStartMarker = fold[lang].foldingStartMarker; // /\b^\s*(?:rule|prompt|summary|if|then|else)\b/;

          _this.foldingStopMarker = fold[lang].foldingStopMarker; /// \b^\s*(?:rule|prompt)\b/;

          _this.foldingStopMenu = fold[lang].foldingStopMenu;
      }

      var matchStart = line.match(_this.foldingStartMarker);

      if (matchStart) {
        // var i = matchStart.index;
        // if (match[0]) {
        var position = {
          row: row,
          column: line.length
        };
        var iterator = new TokenIterator$1(session, position.row, position.column);
        var token = iterator.getCurrentToken();
        var seek = _this.foldingStopMarker;

        while (token) {
          if (token.value.match(seek)) {
            var currentRow = iterator.getCurrentTokenRow();
            return Range$1.fromPoints(position, {
              row: token.value.match(_this.foldingStopMenu) ? currentRow : currentRow - 1,
              column: iterator.getCurrentTokenColumn()
            });
          }

          token = iterator.stepForward();
        } // }

      } // test each line, and return a range of segments to collapse


      return null;
    };

    return _this;
  }

  return _default;
}(BaseFoldMode$1);

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this;
    var args = arguments;

    var later = function later() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };

    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}
/* Usage
var myEfficientFn = debounce(function() {
	// All the taxing stuff you do
}, 250);

window.addEventListener('resize', myEfficientFn);
*/

// ace.config.set('basePath', '../node_mdules/ace-builds/src-noconflict')
// const TextMode = ace.require('ace/mode/text').Mode

function _catch$1(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var _default$2 = /*#__PURE__*/function (_TextMode) {
  _inheritsLoose(_default, _TextMode);

  function _default(editor, watch) {
    var _this;

    if (watch === void 0) {
      watch = true;
    }

    _this = _TextMode.call(this) || this;
    _this.lineCommentStart = "//";
    _this.blockComment = {
      start: "/*",
      end: "*/"
    };
    _this.editor = editor;
    _this.language = editor.session.language;
    _this.$highlightRules = new HighlightRules$2(_this.language); // If static highlighter, do not watch for changes

    _this.$id = "ace/mode/kbf";
    _this.rules = new Rules(_this.editor.session.language || "en", _this.$id);
    if (watch) _this.watch();
    return _this;
  }

  var _proto = _default.prototype;

  _proto.watch = function watch() {
    var _this2 = this;

    this.foldingRules = new _default$3();
    this.editor.on("change", debounce(function () {
      try {
        var value = _this2.editor.getValue();

        var _temp2 = _catch$1(function () {
          return Promise.resolve(_this2.rules.parse(value)).then(function (errors) {
            _this2.editor.session.clearAnnotations();

            _this2.editor.session.setAnnotations(errors);
          });
        }, function (e) {
          // this.editor.session.setAnnotations(errors)
          console.log(e);
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    }, 1000));
  };

  return _default;
}(TextMode);

var TextHighlightRules = TextHighlightRules$2; // const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules

var HighlightRules = /*#__PURE__*/function (_TextHighlightRules) {
  _inheritsLoose(HighlightRules, _TextHighlightRules);

  function HighlightRules() {
    var _this;

    _this = _TextHighlightRules.call(this) || this;
    _this.$rules = {
      start: [{
        token: "comment",
        regex: /\/\/.*$/
      }, {
        token: "comment",
        // multi line comment
        regex: /\/\*/,
        next: "comment"
      }, {
        token: "string",
        regex: "`",
        next: "string"
      }, {
        token: "string",
        regex: "'",
        next: "qstring"
      }, {
        token: "constant.numeric",
        // hex
        regex: /0[xX][0-9a-fA-F]+\b/
      }, {
        token: "constant.numeric",
        // float
        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
      }, {
        token: "keyword.operator",
        regex: /\W[-+%=<>*]\W|\*\*|[~:,.&$]|->*?|=>/
      }, {
        token: "paren.lparen",
        regex: /[\[(\{]/
      }, {
        token: "paren.rparen",
        regex: /[\])\}]/
      }, {
        token: "keyword",
        regex: /[^=]+(?:[=:])/
      }, {
        token: "punctuation.operator",
        regex: /\?[:,;=\.]/
      }, {
        caseInsensitive: true
      }],
      qstring: [{
        token: "constant.language.escape",
        regex: /''/
      }, {
        token: "string",
        regex: "'",
        next: "start"
      }, {
        defaultToken: "string"
      }],
      string: [{
        token: "constant.language.escape",
        regex: /``/
      }, {
        token: "string",
        regex: "`",
        next: "start"
      }, {
        defaultToken: "string"
      }],
      comment: [{
        token: "comment",
        // closing comment
        regex: /\*\//,
        next: "start"
      }, {
        defaultToken: "comment"
      }]
    };
    return _this;
  }

  return HighlightRules;
}(TextHighlightRules); // "variable.language": "this",
// "constant.language": "TRUE FALSE NULL SPACE",


var HighlightRules$1 = new HighlightRules();

var Range = Range$2,
    BaseFoldMode = BaseFoldMode$2,
    TokenIterator = TokenIterator$2; // const Range = ace.Range
// const BaseFoldMode = ace.require('ace/mode/folding/fold_mode').FoldMode
// const TokenIterator = ace.require('ace/token_iterator').TokenIterator

var _default$1 = /*#__PURE__*/function (_BaseFoldMode) {
  _inheritsLoose(_default, _BaseFoldMode);

  function _default() {
    var _this;

    _this = _BaseFoldMode.call(this) || this; // regular expressions that identify starting and stopping points

    _this.foldingStartMarker = /^\s*\/\/[^-]+$/;
    _this.foldingStopMarker = /^\s*--/;

    _this.getFoldWidgetRange = function (session, _foldStyle, row) {
      var line = session.getLine(row);
      var matchStart = line.match(_this.foldingStartMarker);

      if (matchStart) {
        var position = {
          row: row,
          column: line.length
        };
        var iterator = new TokenIterator(session, position.row, position.column);
        var token = iterator.getCurrentToken();
        var seek = _this.foldingStopMarker;

        while (token) {
          if (token.value.match(seek)) {
            var currentRow = iterator.getCurrentTokenRow();
            return Range.fromPoints(position, {
              row: currentRow,
              column: iterator.getCurrentTokenColumn()
            });
          }

          token = iterator.stepForward();
        } // }

      } // test each line, and return a range of segments to collapse


      return null;
    };

    return _this;
  }

  return _default;
}(BaseFoldMode);

// const TextMode = ace.require('ace/mode/text').Mode

function _catch(body, recover) {
  try {
    var result = body();
  } catch (e) {
    return recover(e);
  }

  if (result && result.then) {
    return result.then(void 0, recover);
  }

  return result;
}

var _default = /*#__PURE__*/function (_TextMode) {
  _inheritsLoose(_default, _TextMode);

  function _default(editor, onlyHighlight) {
    var _this;

    if (onlyHighlight === void 0) {
      onlyHighlight = false;
    }

    _this = _TextMode.call(this) || this;
    _this.$highlightRules = _this.HighlightRules = HighlightRules$1;
    _this.foldingRules = new _default$1();
    _this.editor = editor;
    _this.language = editor.session.language;
    _this.$id = "ace/mode/res";
    _this.rules = new Rules(_this.editor.session.language || "en", _this.$id); // If static highlighter, do not watch for changes

    if (!onlyHighlight) _this.watch();
    return _this;
  }

  var _proto = _default.prototype;

  _proto.watch = function watch() {
    var _this2 = this;

    // this.parser = new Parser(this.editor.session.language || 'en')
    // this.parser.on('done', (errors) => {
    // this.editor.session.setAnnotations(errors)
    // })
    this.editor.on("change", debounce(function () {
      try {
        var value = _this2.editor.getValue();

        var _temp2 = _catch(function () {
          return Promise.resolve(_this2.rules.parse(value)).then(function (errors) {
            _this2.editor.session.clearAnnotations();

            _this2.editor.session.setAnnotations(errors);
          });
        }, function (e) {
          // this.editor.session.setAnnotations(errors)
          console.log(e);
        });

        return Promise.resolve(_temp2 && _temp2.then ? _temp2.then(function () {}) : void 0);
      } catch (e) {
        return Promise.reject(e);
      }
    }, 1000));
  };

  return _default;
}(TextMode);

function autoImplementedMode(filename) {
  var ext = filename.split('.').pop();
  var prefix = "ace/mode/";

  if (!ext) {
    return prefix + "text";
  }
  /**
   *  Functional, but inefficient if you want to write it by yourself ....
   */


  switch (ext) {
    case "js":
      return prefix + "javascript";

    case "json":
      return prefix + "json";
  }
} // var filename = "myfile.js"

var CodeEditor = /*#__PURE__*/function () {
  function CodeEditor() {
    if (!CodeEditor.instance) {
      CodeEditor.instance = this;
    }

    this.language = "en";
    this.editors = [];
    this.defaults = {
      fontSize: 18,
      fontName: "Courier New",
      theme: "ace/theme/tomorrow_night_blue"
    };
    this.theme = this.defaults.theme; // 'ace/theme/tomorrow_night_blue'

    this.fontSize = this.defaults.fontSize;
    this.fontName = this.defaults.fontName;
    return CodeEditor.instance;
  }

  var _proto = CodeEditor.prototype;

  _proto.setHighlightRule = function setHighlightRule(editor, fileName) {
    // return this.setHighlightRules(editor, mode)
    var ext = fileName ? fileName.substring(fileName.indexOf(".")) : ".kbf";
    var defaultMode = null;

    if (ext === ".kbf") {
      defaultMode = new _default$2(editor);
    } else if (ext === ".res") {
      defaultMode = new _default(editor);
    } else {
      var modePath = autoImplementedMode(fileName);

      var DynamicMode = ace.require(modePath).Mode;

      editor.session.setMode(new DynamicMode());
    }

    editor.session.setMode(defaultMode, function () {
      editor.session.bgTokenizer.start(0);
    });
  };

  _proto.edit = function edit(element, options) {
    if (options === void 0) {
      options = {};
    }

    var el = null;

    if (typeof element === "string") {
      el = document.getElementById(element) || document.querySelector(element);
    } else if (element && (element.id || element.tagName)) {
      el = element;
    }

    if (!el) {
      console.error("Invalid container reference: " + el);
      return null;
    }

    if (typeof options !== "object") {
      console.error("Invalid options parameter : " + options);
      return null;
    }

    var editor = null;
    var session = new EditSession(options.text ? options.text : "");
    session.language = options.language ? options.language : this.language;
    session.setUndoManager(new UndoManager());
    var editorSettings = {
      fontSize: options.fontSize || this.fontSize,
      fontFamily: options.fontName || this.fontName,
      theme: options.theme || this.theme,
      showLineNumbers: true,
      readOnly: false,
      showGutter: true,
      animatedScroll: true,
      minLines: 5,
      maxLines: 'auto',
      selectionStyle: "row",
      highlightActiveLine: true,
      showPrintMargin: true
    };
    editor = ace.edit(el, Object.assign(editorSettings, options));
    editor.data = options.data || {};
    editor.setSession(session);
    editor.renderer.setScrollMargin(10, 10, 10, 10);
    editor.$blockScrolling = Infinity;
    editor.setOptions({
      scrollPastEnd: 0.9,
      autoScrollEditorIntoView: true
    });
    editor.focus(); // editor.select()
    // editor.gotoLine(0)
    // editor.blur(true)
    // this.editor.session.selection.on('changeSelection', function(){});
    // this.editor.session.selection.on('changeCursor', function(){});

    this.setHighlightRule(editor, options.fileName);
    this.editors.push(editor);
    setTimeout(function () {
      // let sel = editor.selection
      // sel.clearSelection()
      editor.clearSelection();
    }, 0);
    return editor;
  };

  _proto.reset = function reset() {
    this.FontSize = this.defaults.fontSize;
    this.FontName = this.defaults.fontName;
    this.Theme = this.defaults.theme;
  };

  _proto.destroy = function destroy() {
    this.editors.forEach(function (editor) {
      editor.destroy();
      editor.container.remove();
    });
  };

  _createClass(CodeEditor, [{
    key: "ThemeList",
    get: function get() {
      return Themes;
    }
  }, {
    key: "Theme",
    get: function get() {
      return this.theme;
    },
    set: function set(val) {
      var _this = this;

      if (!val) {
        console.log("Theme not set");
        return;
      }

      var theme = val && val.toLowerCase();

      if (this.Themes.dark.find(function (item) {
        return item.toLowerCase() === theme.toLocaleLowerCase();
      }) || this.Themes.light.find(function (item) {
        return item.toLowerCase() === theme.toLocaleLowerCase();
      })) {
        this.theme = "ace/theme/" + theme.replace(/\s+/g, "_");
        this.editors.forEach(function (editor) {
          return editor.setTheme(_this.theme);
        });
      }
    }
  }, {
    key: "FontName",
    get: function get() {
      return this.fontName;
    },
    set: function set(value) {
      this.fontName = value;
    }
  }, {
    key: "FontSize",
    get: function get() {
      return this.fontSize;
    },
    set: function set(value) {
      this.fontSize = value;
    }
  }, {
    key: "Editors",
    get: function get() {
      return this.editors;
    }
  }]);

  return CodeEditor;
}();

var instance = new CodeEditor();
Object.freeze(instance);

/* eslint-disable */

export { instance as default };
//# sourceMappingURL=rules-editor.esm.js.map
