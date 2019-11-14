/**
 * 网站管理后台路由
 */
const Express = require('express');
const router = Express.Router();

/**
 * 后台路由守卫
 */
router.use((req, res, next)=> {
  console.log('session数据 守卫', req.session.user);
  if (req.session.user && req.session.user.id) {
    // 存在登录状态
    next();
  } else {
    // 没有登录状态
    return res.redirect(303, '/');
  }
});


/**
 * 渲染后台首页模板  /admin/
 */
router.get('/', (req, res) => {
  
  return res.render('admin/index', { userinfo: req.session.user });
});


/**
 * 登出
 */
router.all('/out', (req, res) => {
  // req.session.destroy();
  req.session.user = null;
  return res.redirect('/');
});


module.exports = router;