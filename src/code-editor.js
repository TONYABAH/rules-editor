import { ace, EditSession, UndoManager, Themes } from "./ace-wrapper";

import Mode from "./default_mode";
import ResourceMode from "./resource_mode";
import dynamicMode from "./dynamic-mode";

export class CodeEditor {
    constructor(lang) {
        if (!CodeEditor.instance) {
            CodeEditor.instance = this;
        }
        this.language = lang || "en";
        this.editors = [];
        this.editor = null;
        this.defaults = {
            fontSize: 18,
            fontName: "Courier New",
            theme: "ace/theme/tomorrow_night_blue",
        };
        this.theme = this.defaults.theme; // 'ace/theme/tomorrow_night_blue'
        this.fontSize = this.defaults.fontSize;
        this.fontName = this.defaults.fontName;

        return CodeEditor.instance;
    }

    setHighlightRule(editor, fileName) {
        // return this.setHighlightRules(editor, mode)
        const ext = fileName
            ? fileName.substring(fileName.indexOf("."))
            : ".kbf";
        let defaultMode = null;
        if (ext === ".kbf") {
            defaultMode = new Mode(editor);
        } else if (ext === ".res") {
            defaultMode = new ResourceMode(editor);
        } else {
            const modePath = dynamicMode(fileName);
            const DynamicMode = ace.require(modePath).Mode;
            editor.session.setMode(new DynamicMode());
        }

        editor.session.setMode(defaultMode, () => {
            editor.session.bgTokenizer.start(0);
        });
    }

    edit(element, options = {}) {
        let el = null;
        if (typeof element === "string") {
            el =
                document.getElementById(element) ||
                document.querySelector(element);
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

        let editor = null;
        const session = new EditSession(options.text ? options.text : "");
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
            minLines: 20,
            maxLines: Infinity,
            selectionStyle: "row",
            highlightActiveLine: true,
            showPrintMargin: true,
            //autoScrollEditorIntoView: true,
        };

        editor = ace.edit(el, Object.assign(editorSettings, options));
        editor.data = options.data || {};
        editor.setSession(session);
        editor.renderer.setScrollMargin(10, 10, 10, 10);
        editor.$blockScrolling = Infinity;

        editor.setOptions({
            scrollPastEnd: 0.9,
            autoScrollEditorIntoView: true,
        });
        editor.focus();

        // editor.select()
        // editor.gotoLine(0)
        // editor.blur(true)
        // this.editor.session.selection.on('changeSelection', function(){});
        // this.editor.session.selection.on('changeCursor', function(){});
        this.setHighlightRule(editor, options.fileName);
        this.editors.push(editor);
        this.editor = editor;

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
        this.editors.forEach((editor) => {
            editor.destroy();
            editor.container.remove();
        });
    }
    get Text() {
        return this.editor?.getValue() || "";
    }
    set Text(val) {
        return this.editor?.setValue(val);
    }
    get ThemeList() {
        return Themes;
    }
    set Theme(val) {
        if (!val) {
            console.log("Theme not set");
            return;
        }
        let theme = val && val.toLowerCase();
        if (
            this.Themes.dark.find(
                (item) => item.toLowerCase() === theme.toLocaleLowerCase()
            ) ||
            this.Themes.light.find(
                (item) => item.toLowerCase() === theme.toLocaleLowerCase()
            )
        ) {
            this.theme = "ace/theme/" + theme.replace(/\s+/g, "_");
            this.editors.forEach((editor) => editor.setTheme(this.theme));
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
    get Editor() {
        return this.editor;
    }
    set Editor(ed) {
        this.editor = ed;
    }
}
//const instance = new CodeEditor();
//Object.freeze(instance);

/*  setHighlightRules (editor, language) {
    const lang = language || 'text'
    const session = editor.session
    editor.session.setMode('ace/mode/' + lang, function () {
    const rules = session.$mode.$highlightRules.getRules()
      for (let stateName in rules) {
        if (Object.prototype.hasOwnProperty.call(rules, stateName)) {
          rules[stateName].unshift({
            token: 'keyword',
            regex: /TITLE/,
          }, {
            token: 'constant',
            regex: /GOAL/,
          })
        }
      }
      // console.log(session.$mode)
      // force recreation of tokenizer
      session.$mode.$tokenizer = null
      session.bgTokenizer.setTokenizer(session.$mode.getTokenizer())
      // force re-highlight whole document
      session.bgTokenizer.start(0)
    })
  } */
export default CodeEditor;
