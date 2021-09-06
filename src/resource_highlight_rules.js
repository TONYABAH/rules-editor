/* jslint esversion:8 */
import * as wrapper from "./ace-wrapper";
const { TextHighlightRules } = wrapper;
// const TextHighlightRules = ace.require('ace/mode/text_highlight_rules').TextHighlightRules

class HighlightRules extends TextHighlightRules {
    constructor() {
        super();
        this.$rules = {
            start: [
                {
                    token: "comment",
                    regex: /\/\/.*$/,
                },
                {
                    token: "comment", // multi line comment
                    regex: /\/\*/,
                    next: "comment",
                },
                { token: "string", regex: "`", next: "string" },
                { token: "string", regex: "'", next: "qstring" },
                {
                    token: "constant.numeric", // hex
                    regex: /0[xX][0-9a-fA-F]+\b/,
                },
                {
                    token: "constant.numeric", // float
                    regex: /[+-]?\d+(?:(?:\.\d*)?(?:[eE][+-]?\d+)?)?\b/,
                },
                {
                    token: "keyword.operator",
                    regex: /\W[-+%=<>*]\W|\*\*|[~:,.&$]|->*?|=>/,
                },
                {
                    token: "paren.lparen",
                    regex: /[\[(\{]/,
                },
                {
                    token: "paren.rparen",
                    regex: /[\])\}]/,
                },

                {
                    token: "keyword",
                    regex: /[^=]+(?:[=:])/,
                },
                {
                    token: "punctuation.operator",
                    regex: /\?[:,;=\.]/,
                },
                {
                    caseInsensitive: true,
                },
            ],
            qstring: [
                { token: "constant.language.escape", regex: /''/ },
                { token: "string", regex: "'", next: "start" },
                { defaultToken: "string" },
            ],
            string: [
                { token: "constant.language.escape", regex: /``/ },
                { token: "string", regex: "`", next: "start" },
                { defaultToken: "string" },
            ],
            comment: [
                {
                    token: "comment", // closing comment
                    regex: /\*\//,
                    next: "start",
                },
                {
                    defaultToken: "comment",
                },
            ],
        };
    }
}
// "variable.language": "this",
// "constant.language": "TRUE FALSE NULL SPACE",
export default new HighlightRules();
