import MarkdownParser from "./markdownParser.js";
import MarkdownRenderer from "./markdownRenderer.js";


export default class Transpiler {

    transpile(markdown: string): string {

        const lines = markdown.split("\n");

        const parser = new MarkdownParser();

        const ast = parser.parse(lines);

        const renderer = new MarkdownRenderer();

        return renderer.render(ast);

    }

}