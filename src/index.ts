interface line {
  s: number;
  e: number;
}

type CommentType = "single" | "multiple" | "html" | "custom";

interface MatchItem {
  start: string;
  end: string | RegExp;
  type?: CommentType;
}

interface DetailItem {
  start: number;
  end: number;
  text: string;
  type: CommentType;
}

const matchs: MatchItem[] = [
  {
    start: "/*",
    end: /\*[\s]*?\//g,
    type: "multiple",
  },
  {
    start: "<!--",
    end: "-->",
    type: "html",
  },
  {
    start: "//",
    end: "\n",
    type: "single",
  },
];

const FILL = " ";

function discern(code: string): MatchItem | undefined {
  for (let i = 0; i < matchs.length && code.trim(); i++) {
    const current = matchs[i];
    if (!code.includes(current.start)) continue;
    if (current.start === code) {
      return current;
    }
    return discern(code.substring(0, code.length - 1));
  }
}

function findMaxLen() {
  let len = 0;
  matchs.forEach((v) => {
    const s = v.start;
    if (s.length > len) {
      len = s.length;
    }
  });
  return len;
}

export default function displaceComments(
  code: string,
  m?: MatchItem
): {
  strippedCode: string;
  detail: DetailItem[];
} {
  Array.isArray(m) &&
    matchs.push({
      ...m,
      type: "custom",
    });
  const detail: DetailItem[] = [];
  const length = findMaxLen();
  for (let i = 0; i < code.length; i++) {
    const subCode = code.substr(i, length);
    if (!subCode.trim()) {
      i += length - 1;
      continue;
    }
    const cur = discern(subCode);
    if (cur) {
      const o = {
        start:i,
        type:cur.type!
      }
      if (cur.end instanceof RegExp) {
        cur.end.lastIndex = i;
        const m = cur.end.exec(code);
        if (m) {
          const end = m.index + m[0].length;
          detail.push({
            ...o,
            end,
            text: code.substring(i, end),
          });
          i = end - 1;
        }

        continue;
      }

      const j = code.indexOf(cur.end, i + cur.end.length);
      if (j > -1) {
        const end = cur.end.length + j;
        detail.push({
          ...o,
          end: end,
          text: code.substring(i, end),
        });
        i = end - 1;
      }
    }
  }

  detail.forEach(v=>{
    code = code.replace(v.text,FILL.repeat(v.text.length))
  })

  return {
    strippedCode: code,
    detail,
  };
}
