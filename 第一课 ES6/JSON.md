### JSON

1. 两个方法
   1. JSON.stringify(json)，将一个json数据字符串化
   2. JSON.parse(jsonString),将一个严格的json格式的字符串，序列化为一个json数据
   ``` js
    let json = {a: 1, b: 2};
    console.log(JSON.stringify(json)) // 字符串 {"a":1,"b":2}
   ```
   ``` js 
    let jsonstr = '{"a": 1, "b": 2, "c": "hello"}';
    console.log(JSON.parse(jsonstr)); // JSON对象 {a: 1, b: 2, c: "hello"}
    // jsonstr 这个字符串必须是严格的json格式
    // '{a: 1, b: 2, c: hello}' 错误
    // '{'a': 1, 'b': 2, 'c': 'hello'}' 错误
    // '{"a": 1, "b": 2, "c": 'hello'}' 错误
   ```

2. 严格的JSON格式
   1. 只能用双引号
   2. 所有的名字都必须用引发包起来
   3. JSON布尔：必须小写的true和false
   4. JSON空：必须小写的null
   5. JSON数值：不能使用8/16进制


3. 名称简介
   1. json格式中，赋值的数据与字段名称一样时，可以省略不写；
   2. json里面有函数，函数的function关键字和冒号都可以直接省略；
   ``` js
    let name = '马云';
    let age = 18;
    let json = {
      name,
      age,
      level: 10,
      getAge () {
        console.log(this.age)
      }
    }
   ```