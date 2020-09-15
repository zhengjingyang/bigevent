// 获取基本信息 数据回填
function getInfo() {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      if (res.status == 0) {
        // console.log(res);
        $('input[name = username]').val(res.data.username)
        $('input[name = nickname]').val(res.data.nickname)
        $('input[name = email]').val(res.data.email)
        $('input[name = id]').val(res.data.id)
      }
    }
  })
}
getInfo();

// 修改信息
// $('button:contains("提交修改")').click(function () {
//   console.log(11);
// })
$('.layui-form').on('submit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  // console.log(data);
  $.ajax({
    type: 'POST',
    url: '/my/userinfo',
    data: data,
    success: function (res) {
      layer.msg(res.message)
      if (res.status == 0) {
        // console.log(res);
        // 调用父页面中的方法，重新渲染用户的头像和用户的信息
        window.parent.renderUserInfo()
      }
    }
  })
})
