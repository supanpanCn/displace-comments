const t = require('./dist/index')

const code = `<!-- 这是登录组件  -->
    <div>
        登录
    </div>
    <!-- 这是登录组件  --><!-- 这是登录组件  -->
    <!-- 这是登录组件  -->
</template>

// 123
//4
/*
5
*/

/**
         * 1
        */



// gelixian

/**
 * 扩展路由信息
 * @unrouter {boolean} true 启用unrouter
 * @name {string} AutoRouter 设置路由名称
 * @alias {string} aliasName 设置路由别名
 * @redirect {string} /redirectUrl 设置路由重定向
 * @auth {array} ["a","b","c"] 设置路由权限
 * @customKey {object} {
 *  isLogin:true,
 *  a:1
 * } 其他信息
 */

/**
 * 123
 */

`
const res = t.default(code)

console.log(res)