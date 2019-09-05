### Promise - 承诺

1. 同步/异步
   1. 同步和异步，无论如何，做事情的时候都是只有一条流水线（单线程），同步和异步的差别就在于这条流水线上各个流程的执行顺序不同.
   2. 异步运行机制如下：
      * 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
      * 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
       * 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
       * 主线程不断重复上面的第三步。
   3. 异步在同一时间线上可以执行多个操作。
   4. 同步在同一时间线上只能执行一个操作。
   5. Promise---消除异步操作
      * 用同步的方式书写异步的代码
   6. Promise只是一种函数的封装，并没有改变回调函数的运行机制。
   7. Promise为开发者提供的便利。
   8. Promise.all(),Promise.race()

``` js
// 回调函数的异步
  $.ajax({url: 'text.txt', function () {
    $.ajax({url: 'text1.txt', function () {
      $.ajax({url: 'text2.txt', function () {
        $.ajax({url: 'text3.txt', function () {
          // 无限回调
        }})
      }})
    }})
  }})
```

``` js 
  // 同步代码 每一步执行完了，再执行下一步
  let data1 = ajax({url:'text1.txt'});
  let data2 = ajax({url:'text2.txt'});
  let data3 = ajax({url:'text3.txt'});
  let data4 = ajax({url:'text4.txt'});
  // 响应时间长，或者直接奔溃
```

``` js 
  let p = new Promise((resolve, reject) => {
    if (true) {
      // 成功
      resolve()
    } else {
      // 失败
      reject()
    }
  })
  p.then(() => {
    // 处理成功
  }, () => {
    // 处理失败
  })

  let p = new Promise((resolve, reject) => {
    $.ajax({
      url: 'data/arr.json',
      dataType: 'json',
      success (data) {
        resolve(data)
      },
      error (error) {
        reject(error)
      }
    })
  })
  p.then(data => {
    console.log('成功了', data)
  }, err => {
    console.log('失败了', err)
  })
```

``` js 
  function createP (url) {
    return new Promise((resolve, reject) => {
      $.ajax({
        url,
        dataType: 'json',
        success (data) {
          resolve(data)
        },
        error (error) {
          reject(error)
        }
      })
    })
  }
  Promise.all([
    createP('data/arr.json'),
    createP('data/json.json')
  ]).then(data => {
    console.log('成功了', data)
  }).catch(err => {
    console.log('失败了', err)
  })
```

``` js 
  // 高版本jQuery 中的 ajax 有Promise版本
  $.ajax({
    url: 'data/arr.json',
    dataType: 'json'
  }).then(data => {
    console.log('成功了', data)
  }).catch(err => {
    console.log('失败了', err)
  })
```

``` js 
  Promise.all([
    $.ajax({ url: 'data/arr.json', dataType: 'json' }),
    $.ajax({ url: 'data/json.json', dataType: 'json' })
  ]).then(data => {
    console.log('成功了', data)
  }).catch(err => {
    console.log('失败了', err)
  })
```