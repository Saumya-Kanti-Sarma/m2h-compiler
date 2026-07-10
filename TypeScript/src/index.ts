let str = `
# this is h1, and this is *bold* - saumya
## this is h2, and this is **italic**
### this is h3, and this is *bold* and **italic**
#### this is h4, and this is ***both***
##### this is h5, and this is __underline__
---
- apple
- mango
- banana
---
1. Saumya
2. Roshan
3. Susanti
4. Abi
**Bold Text**
*Italic Text*
***Bold and Italic***
__underline text__
> This is a quote.
[Google](https://google.com)
![Alt Text](image.png)

## hello
`

function compile() {
  // step 01: break the string into lines
  const strArray = str.split("\n");
  let inUL = false;
  let inOL = false;
  let inBlockquote = false;
  const NUMBERIC_REG_EXPRESSION = /^\d+\.\s/; // !/^\d+\.\s/ this is called a regular expression (regExpression) and the particular code here checks for all digits (suggested by GPT)

  const stage1Compilation: string[] = [];

  for (const line of strArray) {
    // Handle empty lines
    if (line.trim() === "") {
      stage1Compilation.push("<div></div>")
      if (inUL) {
        stage1Compilation.push("</ul></div>");
        inUL = false;
      }
      if (inOL) {
        stage1Compilation.push("</ol></div>");
        inOL = false;
      }
      if (inBlockquote) {
        stage1Compilation.push("</blockquote></div>");
        inBlockquote = false;
      }
      continue;
    }

    // Close UL if line doesn't start with "- "
    if (inUL && !line.startsWith("- ")) {
      stage1Compilation.push("</ul></div>");
      inUL = false;
    }
    // Close OL if line doesn't start with number.
    if (inOL && !NUMBERIC_REG_EXPRESSION.test(line)) {
      stage1Compilation.push("</ol></div>");
      inOL = false;
    }

    // Close Blockquote if line doesn't start with "> "
    if (inBlockquote && !line.startsWith("> ")) {
      stage1Compilation.push("</blockquote></div>");
      inBlockquote = false;
    }

    // Process the line
    if (line === "---") {
      stage1Compilation.push("<hr>");
    }

    else if (line.startsWith("> ")) {
      if (!inBlockquote) {
        stage1Compilation.push("<div><blockquote>");
        inBlockquote = true;
      }
      // Process inline markdown in quote content
      const content = line.slice(2);
      stage1Compilation.push(processInlineMarkdown(content));
    }

    else if (line.startsWith("- ")) {
      if (!inUL) {
        stage1Compilation.push("<div><ul>");
        inUL = true;
      }
      const content = line.slice(2);
      stage1Compilation.push(`<li>${processInlineMarkdown(content)}</li>`);
    }

    else if (NUMBERIC_REG_EXPRESSION.test(line)) {
      if (!inOL) {
        stage1Compilation.push("<div><ol>");
        inOL = true;
      }
      const content = line.replace(NUMBERIC_REG_EXPRESSION, "");
      stage1Compilation.push(`<li>${processInlineMarkdown(content)}</li>`);
    }

    else if (line.startsWith("#")) {
      // Process headers
      const headerMatch: any = line.match(/^(#{1,6})\s(.+)/);
      if (headerMatch) {
        const level = headerMatch[1].length;
        const content = headerMatch[2];
        stage1Compilation.push(`<div><h${level}>${processInlineMarkdown(content)}</h${level}></div>`);
      }
    }

    else {
      // Regular text with inline markdown
      stage1Compilation.push(`<div>${processInlineMarkdown(line)}</div>`);
    }
  }

  // Close any open tags at the end
  if (inUL) {
    stage1Compilation.push("</ul></div>");
  }
  if (inOL) {
    stage1Compilation.push("</ol></div>");
  }
  if (inBlockquote) {
    stage1Compilation.push("</blockquote></div>");
  }

  console.log(stage1Compilation);
  return stage1Compilation.join("\n");
}

//process inline markdown
function processInlineMarkdown(text: string): string {
  let result = text;

  // Process images: ![Alt Text](image.png)
  result = result.replace(/!\[([^\]]*)\]\(([^)]*)\)/g, (_, alt, src) => {
    return `<div><img src="${src}" alt="${alt}"></div>`;
  });

  // Process links: [Google](https://google.com)
  result = result.replace(/\[([^\]]*)\]\(([^)]*)\)/g, (_, text, url) => {
    return `<div><a href="${url}">${text}</a></div>`;
  });

  // Process bold and italic combinations
  // ***bold and italic***
  result = result.replace(/\*\*\*(.*?)\*\*\*/g, (_, content) => {
    return `<b><i>${content}</i></b>`;
  });

  // **italic**
  result = result.replace(/\*\*(.*?)\*\*/g, (_, content) => {
    return `<i>${content}</i>`;
  });

  // *bold*
  result = result.replace(/\*(.*?)\*/g, (_, content) => {
    return `<b>${content}</b>`;
  });

  // __underline__
  result = result.replace(/__(.*?)__/g, (_, content) => {
    return `<u>${content}</u>`;
  });

  return result;
}

compile();