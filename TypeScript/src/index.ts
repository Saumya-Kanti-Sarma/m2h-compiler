import Transpiler from "./transpiler.js";


const transpiler = new Transpiler();
const html = transpiler.transpile(`
# Hello
## World
This is a paragraph
##### I think I am in *Love*
`);

console.log(html);

`
<div>
 <p></p>
</div>
<div>
  <h1>Hello</h1>
</div>
<div>
  <h2>World</h2>
</div>
<div>
  <p>This is a paragraph</p>
</div>
<div> 
  <p>##### I think I am in *Love*</p>
</div>
<div>
  <p></p>
</div>
`