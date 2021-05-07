/* jslint esversion:6 */
import * as wrapper from './ace-wrapper'
const {
  Range,
  BaseFoldMode,
  TokenIterator,
} = wrapper

// const Range = ace.Range
// const BaseFoldMode = ace.require('ace/mode/folding/fold_mode').FoldMode
// const TokenIterator = ace.require('ace/token_iterator').TokenIterator

export default class extends BaseFoldMode {
  constructor () {
    super()
    // regular expressions that identify starting and stopping points
    this.foldingStartMarker = /^\s*\/\/[^-]+$/
    this.foldingStopMarker = /^\s*--/

    this.getFoldWidgetRange = (session, _foldStyle, row) => {
      var line = session.getLine(row)
      var matchStart = line.match(this.foldingStartMarker)
      if (matchStart) {
        var position = { row: row, column: line.length }
        var iterator = new TokenIterator(session, position.row, position.column)
        var token = iterator.getCurrentToken()
        var seek = this.foldingStopMarker

        while (token) {
          if (token.value.match(seek)) {
            const currentRow = iterator.getCurrentTokenRow()
            return Range.fromPoints(position, {
              row: currentRow,
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
