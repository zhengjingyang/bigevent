var form = layui.form;
// ---------------------获取分类渲染页面---------------------
function renderCate() {
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status == 0) {
        var html = template('tpl-cate', res);
        $('select[name=cate_id]').html(html);
        form.render();
      }
    }
  })
}
renderCate();

// ---------------------初始化富文本编辑器---------------------
initEditor();

// ---------------------实现基本的剪裁效果---------------------
// 1. 初始化图片裁剪器
var $image = $('#image');
// 2. 裁剪选项
var options = {
  appectRatio: 400 / 280,//类型：Number，默认值NaN。设置剪裁容器的比例
  preview: '.img-preview',//添加额外的元素（容器）的预览。注意：最大宽度是剪裁容器的初始化宽度,最大高度是剪裁容器的初始化高度
  autoCropArea: 0.8 //默认值0.8（图片的80%）。0-1之间的数值，定义自动剪裁区域的大小。
}
// 3. 初始化裁剪区域
$image.cropper(options);

// ---------------------修改封面---------------------
$('button:contains("选择封面")').click(function () {
  $('input[type=file]').click()
})
$('input[type=file]').change(function (e) {
  var file = e.target.files[0]; //获取文件对象
  var imgUrl = URL.createObjectURL(file); // 创建临时url
  //    销毁旧的裁剪区域   设置新的图片路径      重新初始化裁剪区域
  $image.cropper('destroy').attr('src', imgUrl).cropper(options)
})

var art_state = '已发布';
$('button:contains("存为草稿")').click(function () {
  art_state = '草稿';
})

// 为表单绑定submit提交事件
$('#form-pub').on('submit', function (e) {
  e.preventDefault();
  var fd = new FormData(this);
  fd.append('state', art_state);
  // fd.forEach(function (v, k) {
  //   console.log(k, v);
  // })
  // 将裁剪之后的图片 输出为文件
  $image.cropper('getCroppedCanvas', { //创建一个画布
    width: 400,
    height: 280
  }).toBlob(function (blob) { // 将canvas画布上的内退 转化为文件对象
    // 得到文件对象之后 进行后续的操作
    fd.append('cover_img', blob);

    //发起ajax请求
    pubArt(fd);
  })

  function pubArt(fd) {
    $.ajax({
      type: 'POST',
      url: 'my/article/add',
      data: fd,
      contentType: false,
      processData: false,
      success: function (res) {
        layer.msg(res.message)
        if (res.status == 0) {
          location.href = '/article/list.html'
        }
      }
    })
  }
})
