const md = `
# this is h1
## this is h2
### this is h3
#### this is h4
##### this is h5
`
function convertToArray(md: string) {
  const arr = md.split("\n");
  return arr;
}

function compileLineByLine(md: string[]) {
  const output = [];
  // applying h1-h5 logic
  for (const line of md) {
    if (line.includes("##### ")) {
      output.push(`<h5>${line.replace("##### ", "")}</h5>`);
    }
    else if (line.includes("#### ")) {
      output.push(`<h4>${line.replace("#### ", "")}</h4>`);
    }
    else if (line.includes("### ")) {
      output.push(`<h3>${line.replace("### ", "")}</h3>`);
    }
    else if (line.includes("## ")) {
      output.push(`<h2>${line.replaceAll("## ", "")}</h2>`);
    }
    else if (line.includes("# ")) {
      output.push(`<h1>${line.replace("# ", "")}</h1>`);
    }
  }
  console.log(output);
}
