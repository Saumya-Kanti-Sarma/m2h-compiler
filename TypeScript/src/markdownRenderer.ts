import type { ASTNode } from "./types.js";
export default class MarkdownRenderer {
  render(ast: ASTNode[]): string {
    let html = "";
    for (const node of ast) {
      html += this.renderNode(node);
    }
    return html;

  }

  private renderNode(node: ASTNode): string {
    switch (node.type) {
      case "heading1":
        return `<div><h1>${node.content}</h1></div>`;
      case "heading2":
        return `<div><h2>${node.content}</h2></div>`;
      case "heading3":
        return `<div><h3>${node.content}</h3></div>`;
      default:
        return `<div><p>${node.content}</p></div>`;

    }

  }

}