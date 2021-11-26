// 那Vue对于数组类型是怎么处理的？你能简单的那模拟一下对于数组方法的监听吗？要求最终输出如下方代码所示：

const render = (action, ...args) => {
  console.log(`Action = ${action},args=${args.join(",")}`)
}

// Vue把数组重写，那我们就效仿重写，那么就要把原有的拿到，并且保存下来
const arrPrototype = Array.prototype;//保存数组的原型，原型对像上
const newArrPrototype = Object.create(arrPrototype);//创建一个新的数组原型

// 遍历，修改新的数组原型对象上的每一个方法，就是一个简单的赋值
["push", "pop", "shift", "unshift", "sort", "splice", "reverse"].forEach((methodName) => {
  newArrPrototype[methodName] = function () {
    // 先去执行原有数组的方法,不去更改this指向，哪个数组来执行的方法就指向哪个
    arrPrototype[methodName].call(this, ...arguments)
    // 触发渲染
    render(methodName, ...arguments)
  }
})


const reactive = (obj) => {
  // 如果是数组
  if (Array.isArray(obj)) {
    // 把新定义的原型对象指向obj.__proto__，更改原型，指向新的原型
    obj.__proto__ = newArrPrototype
  }
}

const data = [1, 2, 3, 4]
reactive(data)

data.push(5) // Action = push,args=5
data.splice(0, 2) // Action = splice, args=0,2