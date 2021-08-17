/* jslint esversion:8 */
import * as wrapper from './ace-wrapper'
const TextHighlightRules = wrapper.TextHighlightRules

import epicRules from './engine-wrapper'
// console.log(Keywords)
class HighlightRules extends TextHighlightRules {
  constructor (language) {
    super()
    this.keywords = {}
    this.setLanguage(language)
  }
  getRules () {
    return {
      start: [
        {
          token: 'comment',
          regex: /\/\/.*$/,
        }, {
          token: 'comment', // multi line comment
          regex: /\/\*/,
          next: 'comment',
        }, {
          token: 'string', // character
          regex: /'(?:.|\\(:?u[\da-fA-F]+|x[\da-fA-F]+|[tbrf'"n]))?'/,
        }, 
        { token: 'string', regex: '`', next: 'string' },
        { token: 'string', regex: '\'', next: 'qstring' },
        {
          token: 'constant.numeric', // hex
          regex: '0[xX][0-9a-fA-F]+\\b',
        }, {
          token: 'constant.numeric', // float
          regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/,
        },
        {
          token: 'punctuation.operator',
          regex: /\?|\:|\,|\;|\./,
        }, {
          token: 'paren.lparen',
          regex: '[[({]',
        }, {
          token: 'paren.rparen',
          regex: '[\\])}]',
        }, {
          token: 'text',
          regex: /\s+/,
        }, {
            token: 'keyword.operator',
            regex: /[-+%=<>*]|[~:,.&!^]/,
        }, {
          token: 'keyword.operator',
          regex: 'abs sign ceil floor trunc frac acos asin atan cos sin tan cosh sinh tanh exp log log10 sqrt pi'.split(' ').join('|'),
        }, {
          token: (value) => {
            const found = this.keywordEntries.find(entry => {
              return entry[1].toLowerCase() === value.toLowerCase()
            })
            if (found) {
              switch (found[0]) {
                case 'TRUE': case 'FALSE': case 'YES': case 'NO': 
                  return 'constant.language.boolean'
                case 'OR': case 'AND':
                case 'IF': case 'ELSE': case 'ELSEIF': case 'THEN':
                  return 'keyword.control'
                case 'DIGIT': case 'TEXT': case 'MENU': case 'NUMBER':
                  return 'constant.language'
                default:
                  return 'keyword.other'
              }
            } else {
              return 'text'
            }
          },
          regex: new RegExp(/\b\w+\b/)
        }, {
          caseInsensitive: true,
        },
        // this.keywordRule
      ],
      qstring: [
        { token: 'constant.language.escape', regex: /''/ },
        { token: 'string', regex: '\'', next: 'start' },
        { defaultToken: 'string' },
      ],
      string: [
        { token: 'constant.language.escape', regex: /``/ },
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
  }
  // Set language definition dynamically at run time
  setLanguage (language) {
    const r = epicRules(language, ['fr', 'de'])
    this.keywords = r.getKeywords()
    if (!this.keywords) {
      throw new Error('Language not supported yet: ' + language || '')
    }
    this.keywordEntries = Object.entries(this.keywords)
    this.$rules = this.getRules()
    this.normalizeRules()
    // this.embedRules(DocCommentHighlightRules, "doc-", [ DocCommentHighlightRules.getEndRule("start") ]);
  }
}

export default HighlightRules
