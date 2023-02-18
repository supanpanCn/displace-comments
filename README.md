# strip-comments
Strip comments from code string

# Installation
```js
npm i strip-comments
```

# Usage
```ts
import stripComments from 'strip-comments'
const code = ''
stripComments(code)
```
# Example
> input
```text
<template>
  这是tg路由
  <!-- 
    html多行注释
   -->
  <button @click="handleLogin">to login</button>
</template>
<!-- html单行 -->
<script setup lang="ts">

// js单行
/**
 * @autoRouter {true} 测试一下
 * @auth {aasa,tg} 路由权限的等待 
 */

// import {
//   reactive
// } from 'vue'

import {ref} from 'vue'

/*
  js多行
*/




import { useRouter } from 'vue-router'  

// 

const r = useRouter()
const handleLogin = ()=>{
  r.push({
    name:'loginnnn'
  })
}

/** */

/* */

</script>
```
> output
```text
<template>
  这是tg路由
       
            
      
  <button @click="handleLogin">to login</button>
</template>
               
<script setup lang="ts">

       
   
                          
                           
   

           
             
               

import {ref} from 'vue'



  
      
  


     



import { useRouter } from 'vue-router'  



const r = useRouter()
const handleLogin = ()=>{
  r.push({
    name:'loginnnn'
  })
}

      

     

</script>
```


## License
MIT