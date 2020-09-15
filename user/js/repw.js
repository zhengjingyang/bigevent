var form = layui.form;
// 自定义规则
form.verify({
  changdu: [/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,20}$/, '密码至少包含 数字和英文，长度6-20'],
  same: function (val) {
    var pwd = $('input[name=oldPwd]').val();
    if (pwd == val) {
      return '新旧密码不能相同'
    }
  },
  repwd: function (val) {
    var pwd = $('input[name=newPwd]').val();
    if (pwd !== val) {
      return '两次密码不一致'
    }
  }
})

$('form').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/my/updatepwd',
    data: data,
    success: function (res) {
      layer.msg(res.message);
      if (res.status == 0) {
        // console.log(res);
        $('form')[0].reset();
      }
    }
  })
})
