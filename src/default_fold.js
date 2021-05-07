/* jslint esversion:6 */
import * as wrapper from './ace-wrapper'
const {
  Range,
  BaseFoldMode,
  TokenIterator,
} = wrapper
// ace.config.set('basePath', '../node_mdules/ace-builds/src-noconflict')
// ace.config.set('basePath', '../lib/ace-builds/src-noconflict')
// require('ace-builds/webpack-resolver')
// const Range = ace.Range
// const BaseFoldMode = ace.require('ace/mode/folding/fold_mode').FoldMode
// const TokenIterator = ace.require('ace/token_iterator').TokenIterator
const fold = {
  en: {
    foldingStartMarker: /\b^\s*(?:rule|prompt|summary)\b/i,
    foldingStopMarker: /\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/ig,
    foldingStopMenu: /\b^\s*(?:max|min|text|digit|yes\/no)\b/ig,
  },
  fr: {
    foldingStartMarker: /\b^\s*(?:rule|prompt|summary)\b/i,
    foldingStopMarker: /\b^\s*(?:prompt|rule|max|min|text|digit|yes\/no)\b/ig,
    foldingStopMenu: /\b^\s*(?:max|min|text|digit|yes\/no)\b/ig,
  },
}

export default class extends BaseFoldMode {
  constructor () {
    super()
    // regular expressions that identify starting and stopping points
    this.foldingStartMarker = fold.en.foldingStartMarker
    this.foldingStopMarker = fold.en.foldingStopMarker
    this.foldingStopMenu = fold.en.foldingStopMenu

    this.getFoldWidgetRange = (session, _foldStyle, row) => {
      const lang = session.language
      var line = session.getLine(row)
      switch (lang) {
      default:
        this.foldingStartMarker = fold[lang].foldingStartMarker // /\b^\s*(?:rule|prompt|summary|if|then|else)\b/;
        this.foldingStopMarker = fold[lang].foldingStopMarker /// \b^\s*(?:rule|prompt)\b/;
        this.foldingStopMenu = fold[lang].foldingStopMenu
      }
      var matchStart = line.match(this.foldingStartMarker)
      if (matchStart) {
        // var i = matchStart.index;
        // if (match[0]) {
        var position = { row: row, column: line.length }
        var iterator = new TokenIterator(session, position.row, position.column)
        var token = iterator.getCurrentToken()
        var seek = this.foldingStopMarker

        while (token) {
          if (token.value.match(seek)) {
            const currentRow = iterator.getCurrentTokenRow()
            return Range.fromPoints(position, {
              row: token.value.match(this.foldingStopMenu) ? currentRow : currentRow - 1,
              column: iterator.getCurrentTokenColumn(),
            })
          }
          token = iterator.stepForward()
        }
        // }
      }
      // test each line, and return a range of segments to collapse
      return null
    }
  }
}
