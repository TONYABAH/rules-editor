/* jslint esversion:8 */
import * as wrapper from './ace-wrapper'
const TextHighlightRules = wrapper.TextHighlightRules

import { Keywords } from 'rules-engine-lib'
// const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules

class HighlightRules extends TextHighlightRules {
  constructor (language) {
    super()
    this.setLanguage(language)
    this.$rules = {
      start: [
        {
          token: 'comment',
          regex: '\\/\\/.*$',
        }, {
          token: 'comment', // multi line comment
          regex: '\\/\\*',
          next: 'comment',
        }, {
          token: 'string', // character
          regex: /'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/,
        }, {
          token: 'string',
          start: '"',
          end: '"|$',
          next: [
            { token: 'constant.language.escape', regex: /\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n])/ },
            { token: 'invalid', regex: /\\./ },
          ],
        },
        { token: 'string', regex: '`', next: 'string' },
        { token: 'string', regex: '\'', next: 'qstring' },
        {
          token: 'constant.numeric', // hex
          regex: '0[xX][0-9a-fA-F]+\\b',
        }, {
          token: 'constant.numeric', // float
          regex: '[+-]?\\d+(?:(?:\\.\\d*)?(?:[eE][+-]?\\d+)?)?\\b',
        }, {
          token: 'constant.language.boolean',
          regex: '(?:true|false)\\b',
        }, {
          token: 'keyword.operator',
          regex: /\W[-+%=<>*]\W|\*\*|[~:,.&$]|->*?|=>/,
        },
        /* {
            token : "keyword",
            regex : "^\\s*#(if|else|but if|rule|title|summary|attribute|array|question|menu|digit|text)"
        }, */
        {
          token: 'punctuation.operator',
          regex: '\\?|\\:|\\,|\\;|\\.',
        }, {
          token: 'paren.lparen',
          regex: '[[({]',
        }, {
          token: 'paren.rparen',
          regex: '[\\])}]',
        }, {
          token: 'text',
          regex: '\\s+',
        }, {
          token: this.keywordMapper,
          regex: '\\b\\w+\\b',
        }, {
          caseInsensitive: true,
        },
        // this.keywordRule
      ],
      qstring: [
        { token: 'constant.language.escape', regex: '\'\'' },
        { token: 'string', regex: '\'', next: 'start' },
        { defaultToken: 'string' },
      ],
      string: [
        { token: 'constant.language.escape', regex: '``' },
        { token: 'string', regex: '`', next: 'start' },
        { defaultToken: 'string' },
      ],
      comment: [
        {
          token: 'comment', // closing comment
          regex: '\\*\\/',
          next: 'start',
        }, {
          defaultToken: 'comment',
        },
      ],
    }
    // this.embedRules(DocCommentHighlightRules, "doc-", [ DocCommentHighlightRules.getEndRule("start") ]);
    this.normalizeRules()
  }

  // Set language definition dynamically at run time
  setLanguage (language) {
    this.keywords = Keywords[language]
    if (!this.keywords) {
      throw new Error('Language not supported yet: ' + language || '')
    }
    this.keywardMap = Object.values(this.keywords).map((value) => {
      return value
    }).join(' ')

    // Default language definition
    this.keywordMapper = this.createKeywordMapper({
        keyword: this.keywardMap,
        'constant.language': 'TRUE FALSE YES NO',
        'keyword.operator': 'abs sign ceil floor trunc frac acos asin atan cos sin tan cosh sinh tanh exp log log10 sqrt pi',
    }, 'text', true, ' ')
  }
}

/* const kwds =
'NOT LIKE BETWEEN IF THEN ELSE ELSEIF AND OR MIN MAX MIN ' +
'RULE TITLE SUMMARY REM DIGIT MENU TEXT QUESTION PROMPT ' +
'IS IN INCLUDE EXCLUDE GOAL ATTRIBUTE ARRAY'
 //this.keywordRule = {
    // regex: '\\w+',
    // onMatch: function () { return 'text' }
//}
 // this.keywordRule.onMatch = this.createKeywordMapper(keymap, 'identifier')
*/

export default HighlightRules
