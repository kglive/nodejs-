
// 模块弹窗函数
/***
 * json ={
 *    message: '提示的消息内容',
 *    type: '消息类型', // success,warning,error,info,
 *    duration: 3000, // 弹窗持续时间，为0时不自动消失
 * }
 * callback 回调函数
 */
function messageBox ({ message, type, duration }, callback) {
  type = type || 'info';
  if (!duration) {
    duration = duration === 0 ? 0 : 3000
  }
  let html = `
    <div id="alert" class="message message--${type}" style="top: -50px; z-index: 2000;">
      <i class="message__icon icon-${type}"></i>
      <p class="message__content">${message}</p>
      <i class="message__closeBtn icon-close">×</i>
    </div>`;
  $("body").append(html);
  let fadeIn = function (fadeInTime) {
    return new Promise(resolve => {
      $("#alert").stop().animate({
        top: '20px'
      }, fadeInTime, () => { resolve() })
    })
  }
  fadeIn(300).then(() => {
    return new Promise(resolve => {
      if (Math.abs(duration)) {
        // 自动退出
        setTimeout(() => {
          $("#alert").stop().animate({
            top: '-50px'
          }, 300, () => {
            $("#alert").remove()
            resolve()
          })
        }, Number(duration))
      } else {
        // 点击手动退出
        $('body').on('click', '#alert .message__closeBtn', () => {
          $("#alert").stop().animate({
            top: '-50px',
            opacity: 0
          }, 300, () => {
            $("#alert").remove()
            resolve()
          })
        })
      }
    })
  }).then(() => {
    callback && callback()
  })
}