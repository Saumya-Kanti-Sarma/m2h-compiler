export interface ASTNode {
  type: string;
  content: string;
  children: ASTNode[];
}
/*
Something just like this:
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
*/