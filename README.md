# displace-comments
提取文本中的注释，并将注释替换为等价的空格

# 支持的注释

- html注释
- JavaScript单行、多行注释和注解

# 安装
```js
npm i displace-comments
```

# 使用
```ts
interface IdisplaceComments{
  (code:string,m?:{
    start: string;
    end: string | RegExp;
    type?: "single" | "multiple" | "html" | "custom";
  }):{
    strippedCode: string;
    detail: DetailItem[];
  }
}
import displaceComments from 'displace-comments'
const code = ''
displaceComments(code[,options])
```
# 示例
见test.js的执行结果

## License
MIT