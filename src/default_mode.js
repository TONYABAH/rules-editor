/* jslint esversion:8 */
import { TextMode } from './ace-wrapper'

import { Parser } from 'rules-engine-lib'
import HighlightRules from './default_highlight_rules'
import DefaultFoldMode from './default_fold'
import debounce from './debounce'
// const ace = require('ace-builds/src-noconflict/ace')
// ace.config.set('basePath', '../node_mdules/ace-builds/src-noconflict')
// const TextMode = ace.require('ace/mode/text').Mode

export default class extends TextMode {
  constructor (editor, watch = true) {
    super()
    this.lineCommentStart = '//'
    this.blockComment = { start: '/*', end: '*/' }
    this.editor = editor
    this.language = editor.session.language
    this.$highlightRules = new HighlightRules(this.language)
    // If static highlighter, do not watch for changes
    if (watch) this.watch()
  }

  watch () {
    this.foldingRules = new DefaultFoldMode()
    this.parser = new Parser(this.editor.session.language || 'en')
    this.parser.on('done', (data) => {
      this.editor.session.setAnnotations(data.errors)
    })
    this.editor.on('change', debounce(() => {
      const value = this.editor.getValue()
      this.parser.parse(value)
    }, 250))
  }
}
