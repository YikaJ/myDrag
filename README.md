######myDrag
=====

#####>>my first widget in Github
####>>>>（拖拽库） 
-----


###API(以下均为默认值)
  handler: null    // 必填，指定哪个元素可以进行拖动
  container: document.documentElement || document.body    //指定包裹空间（可用于限制拖拽范围），可以不填
  limit: true    //是否需要范围限制
  onStart: function(){}    //自定义开始拖动事件
  onMove: function(){}    //自定义拖动时的事件
  onEnd: function(){}    //自定义结束拖动事件



