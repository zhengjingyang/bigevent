var laypage = layui.laypage;

//执行一个laypage实例
laypage.render({
  elem: 'page', //注意，这里的 test1 是 ID，不用加 # 号
  count: 50, //数据总数，从服务端得到
  limit: 2,//每页显示的条数
  limits: [2, 5, 10],
  curr: 1,//起始页
  layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
});

// 获取文章列表
function getlist() {
  $.ajax({
    url: '/my/article/list',
    data: { pagenum: 1, pagesize: 2 },
    success: function (res) {
      if (res.status == 0) {
        console.log(res);
      }
    }
  })
}
getlist()