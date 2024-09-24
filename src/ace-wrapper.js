
import ace from "ace-builds/src-noconflict/ace";
//const ace = window.ace
const { Range, EditSession, UndoManager } = ace;
//const { Range, EditSession, UndoManager } = ace
import "ace-builds/src-noconflict/theme-cobalt.js";
import "ace-builds/src-noconflict/theme-merbivore_soft.js";
import "ace-builds/src-noconflict/theme-monokai.js";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue.js";
import "ace-builds/src-noconflict/theme-twilight.js";
import "ace-builds/src-noconflict/theme-solarized_light.js";
import "ace-builds/src-noconflict/theme-ambiance.js";
import "ace-builds/src-noconflict/theme-chrome.js";
import "ace-builds/src-noconflict/theme-textmate.js";
import "ace-builds/webpack-resolver";
const path = "ace-builds/src-noconflict/";
ace.config.set("basePath", path);
const TextHighlightRules = ace.require(
    "ace/mode/text_highlight_rules"
).TextHighlightRules;

const TextMode = ace.require("ace/mode/text").Mode;
const BaseFoldMode = ace.require("ace/mode/folding/fold_mode").FoldMode;
const TokenIterator = ace.require("ace/token_iterator").TokenIterator;
// console.log(TextMode);
// const JSONMode = ace.require("ace/mode/json").Mode;
const Themes = {
    light: ["Solarized Light", "Ambience", "Chrome", "Textmate"],
    dark: [
        "Cobalt",
        "Merbivore Soft",
        "Monokai",
        "Tomorrow night blue",
        "Twilight",
    ],
    // default: ace.require('ace/theme/ambiance'),
};

// import modes that you want to include into your main bundle
// import 'ace-builds/src-noconflict/mode-javascript'
// import webpack resolver to dynamically load modes, you need to install file-loader for this to work!
// import 'ace-builds/webpack-resolver'

// if you want to allow dynamic loading of only a few modules use setModuleUrl for each of them manually
// import jsWorkerUrl from 'file-loader!../../build/src-noconflict/worker-javascript';
// ace.config.setModuleUrl('ace/mode/javascript_worker', jsWorkerUrl)

// import {Mode as JSMode} from '../../build/src-noconflict/mode-javascript'
// editor.setMode( new JSMode())

// const EditSession = ace.EsitSession //ace.require('ace/edit_session').EditSession
// const UndoManager = ace.UndoManager //ace.require('ace/undomanager').UndoManager
// const BaseFoldMode = ace.require('ace/mode/folding/fold_mode').FoldMode
// const TokenIterator = ace.require('ace/token_iterator').TokenIterator

// const TextMode = require('ace-builds/src-noconflict/mode-text').Mode
// import * as TextNode from 'ace-builds/src-noconflict/mode-text'

export {
    ace,
    Range,
    EditSession,
    UndoManager,
    BaseFoldMode,
    TokenIterator,
    TextHighlightRules,
    TextMode,
    // JSONMode,
    Themes,
};
