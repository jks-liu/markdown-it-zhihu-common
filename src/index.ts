/* eslint-disable node/no-unsupported-features/es-syntax */
import zhihu from "markdown-it-zhihu"

function table(md: any) {
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

export default function zhihu_common(md: any) {
    // Support math equation
    md.use(zhihu)
    // Support table
    table(md)
}