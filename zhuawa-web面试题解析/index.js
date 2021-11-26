// // 来简单实现一个响应式函数？能对一个对象内的所有key添加响应式特性？要求最终的输出如下方代码所示

// // 首先，先写结构，
// // 结构中，随后输出为：
// const render = (key, val) => {
//   console.log(`SET key=${key} val=${val}`)
// }

// // 响应数据的方法
// const defineReactive = (obj, key, val) => {
//   reactive(val)
//   Object.defineProperty(obj, key, {
//     get() {
//       return val
//     },
//     set(newVal) {
//       // 重复数据，输出不同
//       if (val === newVal) {
//         val = "重复"
//       } else {
//         val = newVal
//       }

//       render(key, val)
//     }
//   })

// }

// // 然后，对于reactive方法来说，写判断逻辑
// const reactive = (obj) => {

//   // 首先，判断此obj是否为对象，这可以作为一个递归的终止条件
//   // 这种可能是一个函数或者数组，可以简单写成这样
//   if (typeof obj === "object") {
//     // 然后对其进行遍历
//     for (const key in obj) {
//       // 然后定义一个去响应数据的方法
//       defineReactive(obj, key, obj[key])
//     }
//   }
// }

// const data = {
//   a: 1,
//   b: 2,
//   c: {
//     c1: {
//       cc: 4
//     },
//     c2: 5
//   }

// }
// reactive(data)


// // 要求，
// data.a = 2 //SET key=a val=2
// data.c.c1.cc = 5 //SET key=cc val=5
// data.c.c2 = 5 // SET key=c2 val="重复"


// 那Vue对于数组类型是怎么处理的？你能简单的那模拟一下对于数组方法的监听吗？要求最终输出如下方代码所示：

const render = () => {

}

const reactive = (obj) => {

}

const data = [1, 2, 3, 4]

reactive(data)






