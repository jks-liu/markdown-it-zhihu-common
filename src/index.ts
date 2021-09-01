/* eslint-disable node/no-unsupported-features/es-syntax */
import MarkdownIt from "markdown-it";
import zhihu from "markdown-it-zhihu"
import emoji from "markdown-it-emoji";
import md_footnotes from "markdown-it-footnote";
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
    md.core.ruler.before('inline', 'jks-github-task-lists', function (state: StateCore): boolean {
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
            // So it depends on the markdown-it-emoji plugin
            return ":ballot_box_with_check:"
        } else {
            return ":white_circle:"
        }
    })
}


///
/// Reference support
///
function reference(md: MarkdownIt) {
    // `footnote_tail` is from markdown-it-footnote
    md.core.ruler.after('footnote_tail', 'jks-reference', function (state: StateCore): boolean {
        const tokens = state.tokens;

        // 1. Get the reference list
        const ref_list = new Map<string, string>();
        for (let i = 0; i < tokens.length-2; i++) {
            if (isReferenceList(tokens, i)) {
                ref_list.set(tokens[i].meta.label as string, tokens[i+2].content)
            }
        }

        // 2. Remove the reference list
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'footnote_block_open') {
                tokens.splice(i, tokens.length - i);
                break;
            }
        }

        // 3. Save text to token
        for (let i = 0; i < tokens.length; i++) {
            if (tokens[i].type === 'inline' && tokens[i].children) {
                const children = tokens[i].children as Token[];
                for (let j = 0; j < children.length; j++) {
                    if (children[j].type === 'footnote_ref') {
                        const content = (ref_list.get(children[j].meta.label as string) || "").split(" ");
                        const site = content[0];
                        const text = content[1] || "";
                        children[j].tag = "sup";
                        children[j].attrPush(["data-text", text]);
                        children[j].attrPush(["data-url", site]);
                        children[j].attrPush(["data-draft-node", "inline"]);
                        children[j].attrPush(["data-draft-type", "reference"]);
                        children[j].attrPush(["data-numero", children[j].meta.label as string]);
                        children[j].content = `[${children[j].meta.label as string}]`;
                    }
                }
            }
        }

        // Just make the type checking happy
        return true;
    });

    // 4. Change the render
    
    md.renderer.rules.footnote_ref = function renderToken(tokens, idx) {
        let result = '';
        const token = tokens[idx];
      
        // Tight list paragraphs
        if (token.hidden) {
            return '';
        }
        
        result += "<sup";
        result += md.renderer.renderAttrs(token);
        result += `>${token.content}</sup>`;

        return result;
    }
}

function isReferenceList(tokens: Token[], i: number) {
    return tokens[i].type === 'footnote_open' &&
        tokens[i + 1].type === 'paragraph_open' &&
        tokens[i + 2].type === 'inline';
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
    // Support reference
    md.use(md_footnotes)
    reference(md)
}