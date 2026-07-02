let str = `# this is h1, and this is *bold* - saumya
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

`
function compile() {
  // step 01: break the string into lines
  const strArray = str.split("\n");
  let inUL = false;
  let inOL = false;

  // console.log(strArray);
  const stage1Compilation: string[] = [];
  for (const line of strArray) {

    // Close UL
    if (inUL && !line.startsWith("- ")) {
      stage1Compilation.push("</ul>");
      inUL = false;
    }

    // Close OL
    if (inOL && !/^\d+\.\s/.test(line)) {
      stage1Compilation.push("</ol>");
      inOL = false;
    }

    // Now process the line
    if (line === "---") {
      stage1Compilation.push("<hr>");
    }

    else if (line.startsWith("- ")) {
      if (!inUL) {
        stage1Compilation.push("<ul>");
        inUL = true;
      }
      stage1Compilation.push(`<li>${line.slice(2)}</li>`);
    }

    else if (/^\d+\.\s/.test(line)) {
      if (!inOL) {
        stage1Compilation.push("<ol>");
        inOL = true;
      }
      stage1Compilation.push(`<li>${line.replace(/^\d+\.\s/, "")}</li>`);
    }

    else {
      stage1Compilation.push(`<div>${line}</div>`);
    }
  }
  console.log(stage1Compilation);
}
compile();