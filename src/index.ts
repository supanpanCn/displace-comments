

const matchs = [{
  start:'/*',
  end:'*/'
},{
  start:'<!--',
  end:'-->'
},{
  start:'//',
  end:'\n'
}]

const FILL = ' '

function discern(c:string,o:string,j:number){
  let pre = j
  for(let i = 0 ; i< matchs.length ; i++){
    const {start} = matchs[i]
    j = pre
    if(start[0] === c){
      let p = 1
      j++
      while(p<start.length){
        if(o[j] !== start[p]) break
        p++
        j++
      }
      if(o.substring(pre,j) === start){
        return matchs[i]
      }
    }
  }
}

export function extraCodeBlock(params: {
  code: string;
  start: string;
  end: string;
  extraCallback: (s: number, e: number, code: string) => void;
}) {
  let { code, start, end, extraCallback } = params;
  let range: string[] = [];
  let current = 0;
  const pos: any = {
    s: undefined,
    e: undefined,
  };
  const _reset = (isP?:boolean)=>{
    current = 0;
    range = [];
    if(isP){
      pos.s = undefined;
      pos.e = undefined;
    }
  }
  const _diff = (v: string, tar: string,i:number,isDiscern?:boolean) => {
    
    let shouldGuss = false
    for(let k = 0 ; k < matchs.length ; k++){
      if(matchs[k].start[0] === v){
        shouldGuss = true
        break
      }
    }

    if(isDiscern || shouldGuss){
      const cern = discern(v,code,i)
      if(cern){
        start = cern.start
        end = cern.end
      }
    }

    if (v === tar[current]) {
      current++
      range.push(v);
    } else {
      _reset();
    }
  };
  for (let i = 0; i < code.length; i++) {
    if(!pos.s){
      _diff(code[i], start,i,true);
      if (range.join("") !== start) continue;
      pos.s =  i - start.length + 1
      _reset();
      continue
    }
    
    _diff(code[i], end,i);
    if (range.join("") === end) {
      pos.e = i;
      if (typeof extraCallback === 'function') {
        extraCallback(pos.s, pos.e, code);
      }
      _reset(true)
    }
  }
}

export default function stripComments(code:string,m?:{
  start:string;
  end:string;
}):string{
  Array.isArray(m) && matchs.push(m) 
  extraCodeBlock({
    start:matchs[0].start,
    end:matchs[0].end,
    code,
    extraCallback:(s,e)=>{
      code = code.replace(code.substring(s,e),FILL.repeat(e-s))
    }
  })
  return code
}