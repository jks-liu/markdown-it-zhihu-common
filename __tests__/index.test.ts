import markdownit from "markdown-it"
import zhihu_common from "../src/index"
import pretty from "pretty"
const mdit = markdownit().use(zhihu_common)

function testmd(name:string, md: string, html: string) {
    test(name, () => {
        expect(pretty(mdit.render(md), {ocd: true})).toBe(pretty(html, {ocd: true}))
    })
}

testmd("table", `
| a | b |
| --- | --- |
| c | d |
`, `
<table data-draft-node="block" data-draft-type="table" data-size="normal">
  <tbody>
    <tr>
      <th>a</th>
      <th>b</th>
    </tr>
    <tr>
      <td>c</td>
      <td>d</td>
    </tr>
  </tbody>
</table>
`)

testmd("taskList", `
- [ ] a
  * [x] b
`, `
<ul>
    <li>⚪a
        <ul>
            <li>☑️b</li>
        </ul>
    </li>
</ul>
`)

testmd("reference", `
[^1] [^2]

[^1]: https://baidu.com 百度 baidu
[^2]: https://google.com Google
`, `
<p><sup
  data-text="百度 baidu"
  data-url="https://baidu.com"
  data-draft-node="inline"
  data-draft-type="reference"
  data-numero="1"
  >[1]</sup
> <sup
  data-text="Google"
  data-url="https://google.com"
  data-draft-node="inline"
  data-draft-type="reference"
  data-numero="2"
  >[2]</sup
></p>
`)

testmd("linkCard", `[![zhihu-link-card:文字](http://pic.link)](http://target.link)`, `
<p><a
  href="http://target.link"
  data-draft-node="block"
  data-draft-type="link-card"
  data-image="http://pic.link"
  data-image-width="640"
  data-image-height="480"
  >文字</a
></p>
`)
