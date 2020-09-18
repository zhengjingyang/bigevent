// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function (options) {
  // 在发起真正的 Ajax 请求之前，统一拼接请求的根路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url
  // options.url = 'http://mrzheng.club:3007' + options.url


  // 设置请求头
  if (options.url.includes('/my/')) {
    options.headers = {
      Authorization: localStorage.getItem('token')
    };
    // 服务器响应客户端 无论成功还是失败 都会执行complete回调函数
    options.complete = function (xhr) {
      // console.log(xhr);
      // 在complete回调函数中 可以使用xhr.responseJSON拿到服务器响应回来的数据
      if (xhr.responseJSON.status === 1 && xhr.responseJSON.message === '身份认证失败！') {
        localStorage.removeItem('token')
        location.href = '/login.html'
      }
    }
  }
})
