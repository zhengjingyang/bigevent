// 渲染用户名和头像
function renderUserInfo() {
  $.ajax({
    url: '/my/userinfo',
    success: function (res) {
      if (res.status == 0) {
        console.log(res);
        var nickname = res.data.nickname
        var username = res.data.username
        if (nickname.length == 0) {
          $('.userinfo i').html(username)
        } else {
          $('.userinfo i').html(nickname)
        }

        if (res.data.user_pic) {
          $('.user_center img').show().attr('src', res.data.user_pic)
          $('.userinfo img').show().attr('src', res.data.user_pic)
          $('.user_center i').hide()
          $('.userinfo p').hide()
          console.log(111);
        } else {
          $('.user_center i').css('display', 'inline-block').html(res.data.username.substr(0, 1).toUpperCase())
          $('.userinfo p').show().html(res.data.username.substr(0, 1).toUpperCase())
          $('.user_center img').hide();
          $('.userinfo img').hide();
        }
      }
    }
  })
}
renderUserInfo()

// 实现退出功能
$('.quit').click(function () {
  location.href = '/login.html';
  localStorage.removeItem('token')
})