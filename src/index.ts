interface line{
  s:number;
  e:number
}

const matchs = [
  {
    start: "/*",
    reg:/\/\*[^\1]*?(\*\/)/g
  },
  {
    start: "<!--",
    reg:/\<\!\-\-[^\1]*?(\-\-\>)/g
  },
  {
    start: "//",
    reg:/\/\/[^\1]*?(\n)/g
  },
];

const FILL = " ";

function caculateNewLines(code:string,s:number):line[]{
  const res:line[] = [];
  let i = 0;
  let p = s
  code+='\n'
  while (i < code.length) {
    if (code[i] === "\n") {
      const e = s+i
      res.push({
        s: p ,
        e: s+i
      });
      p = e+1;
    }
    i++;
  }
  return res;
}

function discern(c: string,j:number, o: string) {
  let pre = j;
  for (let i = 0; i < matchs.length; i++) {
    const { start } = matchs[i];
    j = pre;
    if (start[0] === c) {
      let p = 1;
      j++;
      while (p < start.length) {
        if (o[j] !== start[p]) break;
        p++;
        j++;
      }
      if (o.substring(pre, j) === start) {
        return matchs[i];
      }
    }
  }
}

export function displaceComments(
  code: string,
  m?: {
    start: string;
    reg: RegExp
  }
): string {
  Array.isArray(m) && matchs.push(m);
  for (let i = 0; i < code.length; i++) {
    const v = code[i];
    const { reg } = discern(v, i, code) || {};
    if (reg instanceof RegExp) {
      reg.lastIndex = i - 1 > 0 ? i - 1 : 0;
      const m2 = reg.exec(code);
      if (m2) {
        const lines = caculateNewLines(m2[0], m2.index) || [];
        if (!lines.length) {
          lines.push({
            s: m2.index,
            e: reg.lastIndex
          });
        }
        lines.forEach(({ s, e }) => {
          code = code.replace(code.substring(s, e), FILL.repeat(e - s));
        });
        i = reg.lastIndex - 1;
      }
    }
  }

  return code;
}
