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

const render(key, val){
  console.log(`SET key=${key} val=${val}`)
}

const defineReactive = (obj, key, value) => {
  // 如果obj还是Object，则继续去遍历，深层遍历，递归
  reactive(obj)
  Object.defineProperty(obj, key, {
    get() {
      return val
    },
    set(newVal) {
      if (newVal === val) {
        // 数据相同，输出重复
        val = "重复"
      } else {
        val = newVal
      }

      render(key, val)
    }
  })
}

const reactive = (obj) => {

  if (typeof (obj) === "Object") {
    for (const key in obj) {
      defineReactive(obj, key, obj[key])
    }
  }
}

const data = {
  a: 1,
  b: 2,
  c: {
    c1: 3,
    c2: {
      c4: 4
    }
  },
  d: 5
}

reactive(data)
// 那Vue对于数组类型是怎么处理的？你能简单的那模拟一下对于数组方法的监听吗？要求最终输出如下方代码所示：

const render = (action, ...args) => {
  console.log(`Action = ${action},args=${args.join(",")} `)
};

// 对于重写的数组方法，首先是要获取到它本来的方法，并保存一份
const arrPrototype = Array.prototype;
// 创建一个新的数组原型
const newArrPrototype = Object.create(arrPrototype);

// 遍历，修改新的数组原型数组上的每一个方法，就是赋值
["push", "pop", "shift", "unshift", "sort", "splice", "reverse"].forEach((methodName) => {
  // 先去执行数组原有的方法，不去更改this，哪个数组执行方法，就指向哪个
  newArrPrototype[methodName] = function () {
    console.log("------", this, ...arguments);//[1,2,3,4],指向的是操作的数组
    // 就是一个赋值操作，将执行到的方法赋值给新定义的原型上
    arrPrototype[methodName].call(this, ...arguments)
    // 触发渲染
    render(methodName, ...arguments)
  }
});

const reactive = (obj) => {
  // 判断是否是数组
  if (Array.isArray(obj)) {
    // 就把定义的新的原型指向obj.__proto__
    obj.__proto__ = newArrPrototype
  }
};

const data = [1, 2, 3, 4];
reactive(data);

data.push(5) // Action = push,args=5
data.splice(0, 2) // Action = splice, args=0,2





