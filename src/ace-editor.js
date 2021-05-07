import {
  ace,
  EditSession,
  UndoManager,
  Themes,
} from './ace-wrapper'

import Mode from './default_mode'
import ResourceMode from './resource_mode'

class AceEditor {
  constructor () {
    if (!AceEditor.instance) {
      AceEditor.instance = this
    }
    this.language = 'en'
    this.editors = []
    this.theme = null

    return AceEditor.instance
  }

  setHighlightRule (editor, mode) {
    let defaultMode = null
    if (mode !== 'res') {
      defaultMode = new Mode(editor)
    } else {
      defaultMode = new ResourceMode(editor)
    }
    editor.session.setMode(defaultMode)
    editor.session.bgTokenizer.start(0)
  }

  edit (element, options = {}) {
    let el = null
    if (typeof element === 'string') {
      if (document.getElementById(element)) {
        el = document.getElementById(element)
      } else if (document.querySelector(element)) {
        el = document.querySelector(element)
      }
    } else if (element && (element.id || element.tagName)) {
      el = element
    }
    if (!el) {
      console.error('Invalid container reference: ' + el)
      return null
    }
    if (typeof options !== 'object') {
      console.error('Invalid options parameter : ' + options)
      return null
    }
    let editor = null
    const session = new EditSession(options.text || '')
    session.language = options.language ? options.language : this.language
    session.setUndoManager(new UndoManager())
    
    const editorSettings = {
      fontSize: 18,
      fontFamily: 'Courier New',
      showLineNumbers: true,
      readOnly: false,
      showGutter: true,
      animatedScroll: true,
      minLines: 5,
      maxLines: undefined,
      selectionStyle: 'row',
      highlightActiveLine: true,
      showPrintMargin: true,
      theme: 'ace/theme/twilight',
    }
    editor = ace.edit(el, Object.assign(editorSettings, options) )
    editor.data = options.data || {}
    editor.setSession(session)
    editor.renderer.setScrollMargin(10, 10, 10, 10);
    editor.$blockScrolling = Infinity
    editor.setOptions({
      scrollPastEnd: 0.9,
      autoScrollEditorIntoView: true,
    })
    editor.focus()
    // editor.select()
    // editor.gotoLine(0)
    // editor.blur(true)
    // this.editor.session.selection.on('changeSelection', function(){});
    // this.editor.session.selection.on('changeCursor', function(){});
    this.setHighlightRule(editor, options.mode)
    this.editors.push(editor)
    setTimeout(() => {
      // let sel = editor.selection
      // sel.clearSelection()
      editor.clearSelection()
    }, 0)
   
    return editor
  }

  reset () {
    this.editors.forEach((editor) => {
      editor.destroy()
    })
  }
  get ThemeList () {
    return Themes
  }
  set Theme (val) {
    if (Themes.dark[val] || Themes.light[val]) {
      this.theme = 'ace/theme/' + val;
      this.editors.forEach(editor => editor.setTheme(this.theme))
    }
  }
  get Theme () {
    return this.theme
  }

  get Editors () {
    return this.editors
  }
}
const instance = new AceEditor()
Object.freeze(instance)

export default instance
