import type { ASTNode } from "./types.js";

export default class MarkdownParser {
  parse(lines: string[]): ASTNode[] {
    const ast: ASTNode[] = [];
    for (const line of lines) {
      ast.push(this.parseLine(line));
    }
    return ast;
  }

  private parseLine(line: string): ASTNode {
    if (line.startsWith("# ")) {
      return {
        type: "heading1",
        content: line.substring(2),
        children: []
      };
    }

    if (line.startsWith("## ")) {
      return {
        type: "heading2",
        content: line.substring(3),
        children: []
      };
    }

    if (line.startsWith("### ")) {
      return {
        type: "heading3",
        content: line.substring(4),
        children: []
      };
    }
    return {
      type: "paragraph",
      content: line,
      children: []
    };

  }

}