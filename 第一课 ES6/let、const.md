1. var的问题：
   - 可以重复申明
   - 无法限制修改
   - 没有块级作用域（只有函数才能限制作用域）

2. let、const
    |名称|特性|
    |---|---|
    |let|不能重复申明；变量-可以修改；提升块级作用域|
    |const|不能重复申明；常量-不能修改；提升块级作用域|
3. 案例演示
   - var可以重复申明，但是let和const不能。
   - var对变量/常量可以随便修改，且变量/常量没有区分，但let/const严格区分变量/常量，且限制修改。
   - var的作用域只在函数中有效，对普通的{}没有影响；let/const对所有{}产生作用域。
    ``` javascript
      // 利用闭包解决变量污染问题 
      window.onload = function () {
        var doms = document.getElementsByTagName('input');
        for(var i = 0; i < doms.length; i++){
          (function (i) {
            doms[i].onclick = function () {
              console.log(i)
            }
          })(i)
        }
      }
    ```
    ``` javascript
      // let变量提升作用域
      window.onload = function () {
        var doms = document.getElementsByTagName('input');
        for(let i = 0; i < doms.length; i++){
          doms[i].onclick = function () {
            console.log(i)
          }
        }
      }
    ```