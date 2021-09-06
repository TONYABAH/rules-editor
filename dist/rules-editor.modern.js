import ace, { Range as Range$2, EditSession, UndoManager } from 'ace-builds';
import 'ace-builds/src-noconflict/theme-cobalt.js';
import 'ace-builds/src-noconflict/theme-merbivore_soft.js';
import 'ace-builds/src-noconflict/theme-monokai.js';
import 'ace-builds/src-noconflict/theme-tomorrow_night_blue.js';
import 'ace-builds/src-noconflict/theme-twilight.js';
import 'ace-builds/src-noconflict/theme-solarized_light.js';
import 'ace-builds/src-noconflict/theme-ambiance.js';
import 'ace-builds/src-noconflict/theme-chrome.js';
import 'ace-builds/src-noconflict/theme-textmate.js';
import { Rules } from 'rules-engine';

require('ace-builds/webpack-resolver'); // const path = 'ace-builds/src-noconflict/'
// ace.config.set('basePath', path)


const TextHighlightRules$2 = ace.require('ace/mode/text_highlight_rules').TextHighlightRules;

const BaseFoldMode$2 = ace.require('ace/mode/folding/fold_mode').FoldMode;

const TokenIterator$2 = ace.require('ace/token_iterator').TokenIterator;

const TextMode = ace.require('ace/mode/text').Mode;

const Themes = {
  light: ['Solarized Light', 'Ambience', 'Chrome', 'Textmate'],
  dark: ['Cobalt', 'Merbivore Soft', 'Monokai', 'Tomorrow night blue', 'Twilight'] // default: ace.require('ace/theme/ambiance'),

}; // import modes that you want to include into your main bundle

var wrapper = {
  __proto__: null,
  ace: ace,
  Range: Range$2,
  EditSession: EditSession,
  UndoManager: UndoManager,
  BaseFoldMode: BaseFoldMode$2,
  TokenIterator: TokenIterator$2,
  TextHighlightRules: TextHighlightRules$2,
  TextMode: TextMode,
  Themes: Themes
};

/* jslint esversion:8 */
const TextHighlightRules$1 = TextHighlightRules$2;

class HighlightRules$2 extends TextHighlightRules$1 {
  constructor(language) {
    super();
    this.keywords = {};
    this.setLanguage(language);
  }

  getRules() {
    return {
      start: [{
        token: 'comment',
        regex: /\/\/.*$/
      }, {
        token: 'comment',
        // multi line comment
        regex: /\/\*/,
        next: 'comment'
      }, {
        token: 'string',
        // character
        regex: /'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/
      }, {
        token: 'string',
        regex: '`',
        next: 'string'
      }, {
        token: 'string',
        regex: '\'',
        next: 'qstring'
      }, {
        token: 'constant.numeric',
        // hex
        regex: '0[xX][0-9a-fA-F]+\\b'
      }, {
        token: 'constant.numeric',
        // float
        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
      }, {
        token: 'punctuation.operator',
        regex: /\?|\:|\,|\;|\./
      }, {
        token: 'paren.lparen',
        regex: '[[({]'
      }, {
        token: 'paren.rparen',
        regex: '[\\])}]'
      }, {
        token: 'text',
        regex: /\s+/
      }, {
        token: 'keyword.operator',
        regex: /[-+%=<>*]|[~:,.&!^]/
      }, {
        token: 'keyword.operator',
        regex: 'abs sign ceil floor trunc frac acos asin atan cos sin tan cosh sinh tanh exp log log10 sqrt pi'.split(' ').join('|')
      }, {
        token: value => {
          const found = this.keywordEntries.find(entry => {
            return entry[1].toLowerCase() === value.toLowerCase();
          });

          if (found) {
            switch (found[0]) {
              case 'TRUE':
              case 'FALSE':
              case 'YES':
              case 'NO':
                return 'constant.language.boolean';

              case 'OR':
              case 'AND':
              case 'IF':
              case 'ELSE':
              case 'ELSEIF':
              case 'THEN':
                return 'keyword.control';

              case 'DIGIT':
              case 'TEXT':
              case 'MENU':
              case 'NUMBER':
                return 'constant.language';

              default:
                return 'keyword.other';
            }
          } else {
            return 'text';
          }
        },
        regex: new RegExp(/\b\w+\b/)
      }, {
        caseInsensitive: true
      } // this.keywordRule
      ],
      qstring: [{
        token: 'constant.language.escape',
        regex: /''/
      }, {
        token: 'string',
        regex: '\'',
        next: 'start'
      }, {
        defaultToken: 'string'
      }],
      string: [{
        token: 'constant.language.escape',
        regex: /``/
      }, {
        token: 'string',
        regex: '`',
        next: 'start'
      }, {
        defaultToken: 'string'
      }],
      comment: [{
        token: 'comment',
        // closing comment
        regex: '\\*\\/',
        next: 'start'
      }, {
        defaultToken: 'comment'
      }]
    };
  } // Set language definition dynamically at run time


  setLanguage(language) {
    const r = Rules(language, ['fr', 'de']);
    this.keywords = r.getKeywords();

    if (!this.keywords) {
      throw new Error('Language not supported yet: ' + language || '');
    }

    this.keywordEntries = Object.entries(this.keywords);
    this.$rules = this.getRules();
    this.normalizeRules(); // this.embedRules(DocCommentHighlightRules, "doc-", [ DocCommentHighlightRules.getEndRule("start") ]);
  }

}

/* jslint esversion:6 */
const {
  Range: Range$1,
  BaseFoldMode: BaseFoldMode$1,
  TokenIterator: TokenIterator$1
} = wrapper; // ace.config.set('basePath', '../node_mdules/ace-builds/src-noconflict')
// ace.config.set('basePath', '../lib/ace-builds/src-noconflict')
// require('ace-builds/webpack-resolver')
// const Range = ace.Range
// const BaseFoldMode = ace.require('ace/mode/folding/fold_mode').FoldMode
// const TokenIterator = ace.require('ace/token_iterator').TokenIterator

const fold = {
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
class DefaultFoldMode$1 extends BaseFoldMode$1 {
  constructor() {
    super(); // regular expressions that identify starting and stopping points

    this.foldingStartMarker = fold.en.foldingStartMarker;
    this.foldingStopMarker = fold.en.foldingStopMarker;
    this.foldingStopMenu = fold.en.foldingStopMenu;

    this.getFoldWidgetRange = (session, _foldStyle, row) => {
      const lang = session.language;
      var line = session.getLine(row);

      switch (lang) {
        default:
          this.foldingStartMarker = fold[lang].foldingStartMarker; // /\b^\s*(?:rule|prompt|summary|if|then|else)\b/;

          this.foldingStopMarker = fold[lang].foldingStopMarker; /// \b^\s*(?:rule|prompt)\b/;

          this.foldingStopMenu = fold[lang].foldingStopMenu;
      }

      var matchStart = line.match(this.foldingStartMarker);

      if (matchStart) {
        // var i = matchStart.index;
        // if (match[0]) {
        var position = {
          row: row,
          column: line.length
        };
        var iterator = new TokenIterator$1(session, position.row, position.column);
        var token = iterator.getCurrentToken();
        var seek = this.foldingStopMarker;

        while (token) {
          if (token.value.match(seek)) {
            const currentRow = iterator.getCurrentTokenRow();
            return Range$1.fromPoints(position, {
              row: token.value.match(this.foldingStopMenu) ? currentRow : currentRow - 1,
              column: iterator.getCurrentTokenColumn()
            });
          }

          token = iterator.stepForward();
        } // }

      } // test each line, and return a range of segments to collapse


      return null;
    };
  }

}

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

/* jslint esversion:8 */
// ace.config.set('basePath', '../node_mdules/ace-builds/src-noconflict')
// const TextMode = ace.require('ace/mode/text').Mode

class Mode extends TextMode {
  constructor(editor, watch = true) {
    super();
    this.lineCommentStart = '//';
    this.blockComment = {
      start: '/*',
      end: '*/'
    };
    this.editor = editor;
    this.language = editor.session.language;
    this.$highlightRules = new HighlightRules$2(this.language); // If static highlighter, do not watch for changes

    this.$id = "ace/mode/kbf";
    if (watch) this.watch();
  }

  watch() {
    var _this = this;

    this.foldingRules = new DefaultFoldMode$1();
    this.rules = Rules(this.editor.session.language || 'en', ['fr', 'de']); // this.parser = new Parser(this.editor.session.language || 'en')
    // this.parser.on('done', (data) => {
    // this.editor.session.setAnnotations(data.errors)
    // })

    this.editor.on('change', debounce(async function () {
      const value = _this.editor.getValue();

      try {
        const errors = await _this.rules.parse(value);

        _this.editor.session.setAnnotations(errors);
      } catch (e) {
        // this.editor.session.setAnnotations(errors)
        console.log(e);
      }
    }, 250));
  }

}

/* jslint esversion:8 */
const {
  TextHighlightRules
} = wrapper; // const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules

class HighlightRules extends TextHighlightRules {
  constructor() {
    super();
    this.$rules = {
      start: [{
        token: 'comment',
        regex: /\/\/.*$/
      }, {
        token: 'comment',
        // multi line comment
        regex: /\/\*/,
        next: 'comment'
      }, {
        token: 'constant.numeric',
        // hex
        regex: /0[xX][0-9a-fA-F]+\b/
      }, {
        token: 'constant.numeric',
        // float
        regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/
      }, {
        token: 'keyword.operator',
        regex: /\W[-+%=<>*]\W|\*\*|[~:,.&$]|->*?|=>/
      }, {
        token: 'punctuation.operator',
        regex: /\?|:|,|;|\./
      }, {
        token: 'paren.lparen',
        regex: /[[({]/
      }, {
        token: 'paren.rparen',
        regex: /[\])}]/
      }, {
        token: 'identifier',
        regex: /=[^=]+$/
      }, {
        token: 'keyword',
        regex: /[^=]+=/
      }, {
        caseInsensitive: true
      }],
      comment: [{
        token: 'comment',
        // closing comment
        regex: /\*\//,
        next: 'start'
      }, {
        defaultToken: 'comment'
      }]
    };
  }

} // "variable.language": "this",
// "constant.language": "TRUE FALSE NULL SPACE",


var HighlightRules$1 = new HighlightRules();

/* jslint esversion:6 */
const {
  Range,
  BaseFoldMode,
  TokenIterator
} = wrapper; // const Range = ace.Range
// const BaseFoldMode = ace.require('ace/mode/folding/fold_mode').FoldMode
// const TokenIterator = ace.require('ace/token_iterator').TokenIterator

class DefaultFoldMode extends BaseFoldMode {
  constructor() {
    super(); // regular expressions that identify starting and stopping points

    this.foldingStartMarker = /^\s*\/\/[^-]+$/;
    this.foldingStopMarker = /^\s*--/;

    this.getFoldWidgetRange = (session, _foldStyle, row) => {
      var line = session.getLine(row);
      var matchStart = line.match(this.foldingStartMarker);

      if (matchStart) {
        var position = {
          row: row,
          column: line.length
        };
        var iterator = new TokenIterator(session, position.row, position.column);
        var token = iterator.getCurrentToken();
        var seek = this.foldingStopMarker;

        while (token) {
          if (token.value.match(seek)) {
            const currentRow = iterator.getCurrentTokenRow();
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
  }

}

class ResourceMode extends TextMode {
  constructor(editor, onlyHighlight = false) {
    super();
    this.$highlightRules = this.HighlightRules = HighlightRules$1;
    this.foldingRules = new DefaultFoldMode();
    this.editor = editor;
    this.language = editor.session.language;
    this.$id = "ace/mode/res"; // If static highlighter, do not watch for changes

    if (!onlyHighlight) this.watch();
  }

  watch() {
    this.parser = new Parser(this.editor.session.language || 'en'); // this.parser.on('done', (errors) => {
    // this.editor.session.setAnnotations(errors)
    // })

    this.editor.on('change', debounce(() => {
      // compile(this.editor, this.parser)
      const value = this.editor.getValue();

      try {
        const errors = this.rules.parse(value);
        this.editor.session.setAnnotations(errors);
      } catch (e) {
        // this.editor.session.setAnnotations(errors)
        console.log(e);
      }
    }, 250));
  }

}

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

    case "cs":
      return prefix + "csharp";

    case "php":
      return prefix + "php";

    case "rb":
      return prefix + "ruby";

    case "json":
      return prefix + "json";
  }
} // var filename = "myfile.js"

class CodeEditor {
  constructor() {
    if (!CodeEditor.instance) {
      CodeEditor.instance = this;
    }

    this.language = 'en';
    this.editors = [];
    this.defaults = {
      fontSize: 18,
      fontName: 'Courier New',
      theme: 'ace/theme/tomorrow_night_blue'
    };
    this.theme = this.defaults.theme; // 'ace/theme/tomorrow_night_blue'

    this.fontSize = this.defaults.fontSize;
    this.fontName = this.defaults.fontName;
    return CodeEditor.instance;
  }

  setHighlightRule(editor, ext) {
    // return this.setHighlightRules(editor, mode)
    let defaultMode = null;

    if (ext === '.kbf') {
      defaultMode = new Mode(editor);
    } else if (ext === '.res') {
      defaultMode = new ResourceMode(editor);
    } else {
      defaultMode = autoImplementedMode(ext);
    }

    editor.session.setMode(defaultMode, () => {
      editor.session.bgTokenizer.start(0);
    });
  }

  edit(element, options = {}) {
    let el = null;

    if (typeof element === 'string') {
      if (document.getElementById(element)) {
        el = document.getElementById(element);
      } else if (document.querySelector(element)) {
        el = document.querySelector(element);
      }
    } else if (element && (element.id || element.tagName)) {
      el = element;
    }

    if (!el) {
      console.error('Invalid container reference: ' + el);
      return null;
    }

    if (typeof options !== 'object') {
      console.error('Invalid options parameter : ' + options);
      return null;
    }

    let editor = null;
    const session = new EditSession(options.text || '');
    session.language = options.language ? options.language : this.language;
    session.setUndoManager(new UndoManager());
    const editorSettings = {
      fontSize: options.fontSize || this.fontSize,
      fontFamily: options.fontName || this.fontName,
      theme: options.theme || this.theme,
      showLineNumbers: true,
      readOnly: false,
      showGutter: true,
      animatedScroll: true,
      minLines: 5,
      maxLines: undefined,
      selectionStyle: 'row',
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

    this.setHighlightRule(editor, options.mode);
    this.editors.push(editor);
    setTimeout(() => {
      // let sel = editor.selection
      // sel.clearSelection()
      editor.clearSelection();
    }, 0);
    return editor;
  }

  reset() {
    this.FontSize = this.defaults.fontSize;
    this.FontName = this.defaults.fontName;
    this.Theme = this.defaults.theme;
  }

  destroy() {
    this.editors.forEach(editor => {
      editor.destroy();
    });
  }

  get ThemeList() {
    return Themes;
  }

  set Theme(val) {
    if (!val) {
      console.log('Theme not set');
      return;
    }

    let theme = val && val.toLowerCase();

    if (this.Themes.dark.find(item => item.toLowerCase() === theme.toLocaleLowerCase()) || this.Themes.light.find(item => item.toLowerCase() === theme.toLocaleLowerCase())) {
      this.theme = 'ace/theme/' + theme.replace(/\s+/g, '_');
      this.editors.forEach(editor => editor.setTheme(this.theme));
    }
  }

  get Theme() {
    return this.theme;
  }

  get FontName() {
    return this.fontName;
  }

  set FontName(value) {
    this.fontName = value;
  }

  get FontSize() {
    return this.fontSize;
  }

  set FontSize(value) {
    this.fontSize = value;
  }

  get Editors() {
    return this.editors;
  }

}

const instance = new CodeEditor();
Object.freeze(instance);

/* eslint-disable */

export default instance;
//# sourceMappingURL=rules-editor.modern.js.map
