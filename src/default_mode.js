/* jslint esversion:8 */
import { TextMode } from "./ace-wrapper";

import Rules from "./engine-wrapper";
import HighlightRules from "./default_highlight_rules";
import DefaultFoldMode from "./default_fold";
import debounce from "./debounce";
// const ace = require('ace-builds/src-noconflict/ace')
// ace.config.set('basePath', '../node_mdules/ace-builds/src-noconflict')
// const TextMode = ace.require('ace/mode/text').Mode

export default class extends TextMode {
    constructor(editor, watch = true) {
        super();
        this.lineCommentStart = "//";
        this.blockComment = { start: "/*", end: "*/" };
        this.editor = editor;
        this.language = editor.session.language;
        this.$highlightRules = new HighlightRules(this.language);
        // If static highlighter, do not watch for changes
        this.$id = "ace/mode/kbf";
        this.rules = new Rules(this.editor.session.language || "en", this.$id);
        if (watch) this.watch();
    }

    watch() {
        this.foldingRules = new DefaultFoldMode();
        this.editor.on(
            "change",
            debounce(async () => {
                const value = this.editor.getValue();
                try {
                    const errors = await this.rules.parse(value);
                    this.editor.session.clearAnnotations();
                    this.editor.session.setAnnotations(errors);
                } catch (e) {
                    // this.editor.session.setAnnotations(errors)
                    console.log(e);
                }
            }, 1000)
        );
    }
}
