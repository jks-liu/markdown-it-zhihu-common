import markdownit from "markdown-it"
import {minify} from "html-minifier"
import zhihu_common from "../src/index"
const mdit = markdownit().use(zhihu_common)


test("table", () => {
    expect(minify(mdit.render("| a | b |\n| --- | --- |\n| c | d |"), { collapseWhitespace: true })).toBe('<table data-draft-node="block" data-draft-type="table" data-size="normal"><tbody><tr><th>a</th><th>b</th></tr><tr><td>c</td><td>d</td></tr></tbody></table>');
});
