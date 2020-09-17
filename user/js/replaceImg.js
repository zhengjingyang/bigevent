// 1. 获取裁剪区域的dom
var $img = $('#image');
// 2. 配置选项
const options = {
  aspectRatio: 1, //纵横比
  preview: '.img-preview', // 指定预览区域
}
// 3. 创建裁剪区域
$img.cropper(options);

// -------------------------给上传按钮注册点击事件-------------------------
$('button:contains("上传")').click(function () {
  // console.log(111);
  $('input[type=file]').click()
})

// -------------------------文件域内容改变时 创建临时的url 更换裁剪区域的图片-------------------------
$('input[type=file]').change(function (e) {
  // console.log(e);
  // 获取文件列表
  var filesList = e.target.files;
  // 获取选择的文件对象
  var file = filesList[0];
  if (filesList.length == 0) {
    return layer.msg('请选择图片')
  }
  // 创建图片的临时路径
  var imgUrl = URL.createObjectURL(file);
  // 重新初始化裁剪区 
  //   销毁旧的剪裁区    设置新的图片路径    重新初始化剪裁区域   
  $img.cropper('destroy').attr('src', imgUrl).cropper(options);
})

// -------------------------为确定按钮绑定点击事件-------------------------
$('button:contains("确定")').click(function () {
  // 拿到用户裁剪之后的头像
  var dataURL = $img.cropper('getCroppedCanvas', {
    // 创建一个画布
    width: 100,
    height: 100
  }).toDataURL('image/png')// 将画布上的内容转换为base64格式的图片

  $.ajax({
    type: 'POST',
    url: '/my/update/avatar',
    data: { avatar: dataURL },
    success: function (res) {
      layer.msg(res.message)
      if (res.status == 0) {
        // console.log(res);
        window.parent.renderUserInfo();
      }
    }
  })
})