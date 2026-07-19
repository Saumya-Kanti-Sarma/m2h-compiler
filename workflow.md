markdown -> array (split at each \n) -> AST (Abstract Syntax Tree) -> actual HTML
Example:
```code
this is a simple line
# this is h1, and this is *bold* - saumya
## this is h2, and this is **italic** 

[
  "this is a simple line",
  "# this is h1, and this is *bold* - saumya",
  "## this is h2, and this is **italic** ",
]


[
  {
    type:"paragraph",
    content:"this is a simple line",
    children:[]
  },
  {
    type:"heading1",
    content:"this is h1, and this is ",
    children:[
      {
        type:"bold",
        content:"bold",
        children:[]
      },
      {
        type:"text",
        content:"- saumya",
        children:[]
      }
    ]
  },
  {
    type:"heading2",
    content:"this is h2, and this is ",
    children:[
      {
        type:"italic",
        content:"italic",
        children:[]
      }
    ]
  }
]
```
