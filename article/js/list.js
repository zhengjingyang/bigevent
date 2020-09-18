var laypage = layui.laypage;
var form = layui.form;

// 渲染分页
function renderPage(total) {
  //执行一个laypage实例 
  laypage.render({
    elem: 'page', //注意，这里的 page 是 ID，不用加 # 号
    count: total, //数据总数，从服务端得到
    limit: q.pagesize,//每页显示的条数
    limits: [2, 5, 10],
    curr: q.pagenum,//起始页
    layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
    // jump 它是切换分页时的回调函数。切换页码时，会触发这个函数;laypage.render首次调用也会触发这个函数
    jump: function (obj, first) {
      // laypage.render首次调用时first=true；切换页码时first=undefined
      // console.log(obj, first);
      if (first == undefined) {
        // 修改ajax参数
        q.pagenum = obj.curr;
        q.pagesize = obj.limit;
        getlist();
      }
    }
  });
}
// 定义一个查询的参数对象
var q = {
  pagenum: 1, //页码值,默认请求第一页的数据
  pagesize: 2, //每页显示几条数据 默认每页显示2条
  cate_id: '',//文章分类的Id
  status: '' //文章的发布状态
}
// ----------------------获取文章列表------------------------
function getlist() {
  $.ajax({
    url: '/my/article/list',
    data: q,
    success: function (res) {
      if (res.status == 0) {
        // console.log(res);
        var html = template('tpl-list', res);
        $('tbody').html(html)

        renderPage(res.total)
      }
    }
  })
}
getlist()
// 美化时间格式的过滤器
template.defaults.imports.dataFormat = function (date) {
  var d = new Date(date);
  var Y = d.getFullYear();
  var M = addZero(d.getMonth() + 1);
  var D = addZero(d.getDate());
  var hh = addZero(d.getHours());
  var mm = addZero(d.getMinutes());
  var ss = addZero(d.getMinutes());
  return Y + '-' + M + '-' + D + ' ' + hh + ':' + mm + ':' + ss
}
function addZero(a) {
  return a < 10 ? '0' + a : a
}

// ----------------------获取分类----------------
function cate() {
  $.ajax({
    url: '/my/article/cates',
    success: function (res) {
      if (res.status == 0) {
        var html = template('tpl-cate', res);
        $('select[name=cate_id]').html(html)
        form.render('select'); //刷新select选择框渲染
      }
    }
  })
}
cate();

// ------------------------实现筛选功能----------------
$('.form_filter').submit(function (e) {
  e.preventDefault();
  q.cate_id = $('select[name=cate_id]').val();
  q.state = $('select[name=state]').val()
  // console.log(q);
  getlist()
})

// 删除功能
$('tbody').on('click', '.layui-btn-danger', function () {
  // 获取删除按钮的个数 几个删除按钮就是几条数据
  var len = $('.layui-btn-danger').length;
  // console.log(len);
  var id = $(this).attr('data-id');
  layer.confirm('确认要删除吗?', { icon: 3, title: '提示' }, function (index) {
    //do something
    $.ajax({
      url: '/my/article/delete/' + id,
      success: function (res) {
        layer.msg(res.message);
        if (res.status == 0) {
          // 当数据删除完成之后 需要判断页面还有几条数据 如果页面没有数据了 让页码减一
          if (len == 1) {
            // 如果len的值等于1 证明删除之后 页面就没有数据了
            // 页码值最小为1 如果页码值不为1 页面没有数据之后就自动减一 
            q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
          }
          getlist();
        }
      }
    })

    layer.close(index);
  });
})


