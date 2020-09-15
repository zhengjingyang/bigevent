// 获取分类列表
function getList() {
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status == 0) {
        // console.log(res);
        var html = template('tpl_list', res);
        $('tbody').html(html)
      }
    }
  })
}
getList();
// 添加类别
var addIndex = null;
$('.add').click(function () {
  addIndex = layer.open({
    type: 1,
    content: $('#tpl_add').html(),//这里content是一个普通的String
    title: '添加文章分类',
    area: ['500px', '250px']
  });
})
$('body').on('submit', '.form_add', function (e) {
  e.preventDefault();
  var data = $(this).serialize()
  // console.log(data);
  $.ajax({
    type: 'POST',
    url: '/my/article/addcates',
    data: data,
    success: function (res) {
      if (res.status === 0) {
        // console.log(res);
        getList();
        layer.close(addIndex)
      }
    }
  })
})
// 删除类别
$('body').on('click', '.layui-btn-danger', function () {
  var id = $(this).attr('data-id');
  layer.confirm('确定删除吗?', { icon: 3, title: '提示' }, function (index) {
    //do something
    $.ajax({
      url: '/my/article/deletecate/' + id,
      success: function (res) {
        layer.msg(res.message)
        if (res.status == 0) {
          getList();
        }
      }
    })
    layer.close(index);
  });
})
// 编辑文章类别
var editIndex = null;
$('body').on('click', '.edit_btn', function () {
  var id = $(this).attr('data-id')
  editIndex = layer.open({
    type: 1,
    content: $('#tpl_edit').html(), //这里content是一个普通的String
    title: '修改文章分类',
    area: ['500px', '250px']
  });
  // 数据回填
  $.ajax({
    url: '/my/article/cates/' + id,
    success: function (res) {
      console.log(res);
      $('.form_edit input[name = name]').val(res.data.name)
      $('.form_edit input[name = alias]').val(res.data.alias)
      $('.form_edit input[name = Id]').val(res.data.Id)
    }
  })
})
// 编辑文章
$('body').on('submit', '.form_edit', function (e) {
  e.preventDefault();
  var data = $(this).serialize();
  $.ajax({
    type: 'POST',
    url: '/my/article/updatecate',
    data: data,
    success: function (res) {
      if (res.status == 0) {
        getList();
        layer.close(editIndex)
      }
    }
  })
})