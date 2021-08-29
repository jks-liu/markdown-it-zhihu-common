/* eslint-disable node/no-unsupported-features/es-syntax */
import MarkdownIt from "markdown-it";
import zhihu from "markdown-it-zhihu"
import emoji from "markdown-it-emoji";
import StateCore from "markdown-it/lib/rules_core/state_core";
import Token from "markdown-it/lib/token";


/// 
/// Table support
///
function table(md: MarkdownIt) {
    md.renderer.rules.table_open = function() {
        return '<table data-draft-node="block" data-draft-type="table" data-size="normal">';
    }
    md.renderer.rules.table_close = function() {
        return '</table>';
    }
    md.renderer.rules.thead_open = function() { return '<tbody>'; }
    md.renderer.rules.thead_close = function() { return ''; }
    md.renderer.rules.tbody_open = function() { return ''; }
    md.renderer.rules.tbody_close = function() { return '</tbody>'; }
}

///
/// Task list support
///
// Inspired by https://github.git/revin/markdown-it-task-lists
// Because it is not supported by zhihu, rewrite sth.
function taskList(md: MarkdownIt) {
    md.core.ruler.before('inline', 'github-task-lists', function (state: StateCore): boolean {
        const tokens = state.tokens;
        for (let i = 2; i < tokens.length; i++) {
            if (isTodoItem(tokens, i)) {
                todoify(tokens[i]);
            }
        }

        // Just make the type checking happy
        return true;
    });
}

function isTodoItem(tokens: Token[], i: number) {
    return tokens[i].type === 'inline' &&
        tokens[i - 1].type === 'paragraph_open' &&
        tokens[i - 2].type === 'list_item_open';
}

function todoify(token: Token) {
    token.content = token.content.replace(/^\[([ xX])\] /, function (match) {
        if (match.match(/[xX]/)) {
            return ":ballot_box_with_check:"
        } else {
            return ":white_circle:"
        }
    })
}


///
/// Exported plugin
///
export default function zhihu_common(md: MarkdownIt): void {
    // Support math equation
    md.use(zhihu)
    // Support emoji
    md.use(emoji)
    // Support table
    table(md)
    // Support task list
    taskList(md)
}