// 加载form
var form = layui.form

$('.link_register').click(function () {
  $('.form_login').hide();
  $('.form_register').show();
})
$('.link_login').click(function () {
  $('.form_login').show();
  $('.form_register').hide();
})
// 自定义表单验证规则
form.verify({
  username: function (value, item) { //value：表单的值、item：表单的DOM对象
    if (!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)) {
      return '用户名不能有特殊字符';
    }
    if (/(^\_)|(\__)|(\_+$)/.test(value)) {
      return '用户名首尾不能出现下划线\'_\'';
    }
    if (/^\d+\d+\d$/.test(value)) {
      return '用户名不能全为数字';
    }
  },
  changdu: [/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, '密码至少包含 数字和英文，长度6-20'],
  same: function (val) {
    var pwd = $('.pwd').val();
    if (pwd != val) {
      return '两次密码不一致'
    }
  }
});

// 登录功能
$('.form_login').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  // console.log(data);
  $.ajax({
    type: 'POST',
    url: 'http://ajax.frontend.itheima.net/api/login',
    data: data,
    success: function (res) {
      layer.msg(res.message)
      if (res.status === 0) {
        // console.log(res);
        localStorage.setItem('token', res.token)
        location.href = '/index.html'
        $('.form_login')[0].reset();
      }
    }
  })
})


//注册功能
$('.form_register').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: 'http://ajax.frontend.itheima.net/api/reguser',
    data: data,
    success: function (res) {
      layer.msg(res.message);
      if (res.status == 0) {
        console.log(res);

        $('.form_register')[0].reset();
        $('.link_login').click();
      }
    }
  })
})