import { TextMode } from './ace-wrapper'
// import { ResParser as Parser } from './engine-wrapper'
// import { rules as Rule } from './engine-wrapper'
import debounce from './debounce'
import HighlightRules from './resource_highlight_rules'
import DefaultFoldMode from './resource_fold'
// const ace = require('ace-builds/src-noconflict/ace')
// const TextMode = ace.require('ace/mode/text').Mode

const compile = debounce((editor, parser) => {
  const value = editor.getValue()
  parser.compile(value)
}, 400)

export default class extends TextMode {
  constructor (editor, onlyHighlight = false) {
    super()
    this.$highlightRules = this.HighlightRules = HighlightRules
    this.foldingRules = new DefaultFoldMode()
    this.editor = editor
    this.language = editor.session.language
    this.$id = "ace/mode/res"
    // If static highlighter, do not watch for changes
    if (!onlyHighlight) this.watch()
  }

  watch () {
    this.parser = new Parser(this.editor.session.language || 'en')
    // this.parser.on('done', (errors) => {
    // this.editor.session.setAnnotations(errors)
    // })
    this.editor.on('change', debounce(() => {
      // compile(this.editor, this.parser)
      const value = this.editor.getValue()
      try {
        const errors = this.rules.parse(value)
        this.editor.session.setAnnotations(errors)
      } catch (e) {
        // this.editor.session.setAnnotations(errors)
        console.log(e)
      }
    }, 250))
  }
}
