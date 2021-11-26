// 你能实现一下基于proxy的响应式吗？能够监听属性的删除操作？要求最终的输出如下方代码所示

function makeObservable(target) {

}

let user = {

};

user = makeObservable(user);

user.observe((action, key, value) => {
  console.log(`${action} key=${key} value=${value || ""}`)
});

user.name = "John";// SET key=name value=John
console.log(user.name);// GET key=name value=John // John
delete user.name;// DELETE key=name value=