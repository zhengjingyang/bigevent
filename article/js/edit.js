var form = layui.form;
var id = location.search.substr(4)

// 初始化裁剪区
var $image = $('#image');
options = {
  aspectRatio: 400 / 280,
  autoCropArea: 1,
  preview: '.img-preview'
};
$image.cropper(options);


//渲染文章类别
function initCate() {
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status == 0) {
        var html = template('tpl-cate', res);
        $('select[name=cate_id]').html(html);
        form.render();
        $.ajax({
          url: '/my/article/' + id,
          success: function (res) {
            if (res.status == 0) {
              console.log(res.data);
              form.val('form_edit', res.data)
              // ---------------------初始化富文本编辑器---------------------
              initEditor();
              // 更换图片
              $image.cropper('destroy').attr('src', 'http://ajax.frontend.itheima.net' + res.data.cover_img).cropper(options)
            }
          }
        })
      }
    }
  })
}
initCate()

$('button:contains("选择封面")').click(function () {
  $('input[type=file]').click()
})
$('input[type=file]').change(function (e) {
  var file = e.target.files[0];
  var imgUrl = URL.createObjectURL(file);
  $image.cropper('destroy').attr('src', imgUrl).cropper(options);
})


var art_state = '已发布';
$('button:contains("存为草稿")').click(function (e) {
  art_state = '草稿'
})

$('#form-pub').on('submit', function (e) {
  e.preventDefault();
  var fd = new FormData(this);
  fd.append('state', art_state);
  fd.append('Id', id)
  $image
    .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
      width: 400,
      height: 280
    })
    .toBlob(function (blob) {       // 将 Canvas 画布上的内容，转化为文件对象
      // 得到文件对象后，进行后续的操作
      fd.append('cover_img', blob);
      ArtPub(fd)
      // console.log(fd);
    })
})

function ArtPub(fd) {
  $.ajax({
    type: 'POST',
    url: '/my/article/edit',
    data: fd,
    contentType: false,
    processData: false,
    success: function (res) {
      layer.msg(res.message);
      if (res.status == 0) {
        location.href = '/article/list.html'
      }
    }
  })
}







