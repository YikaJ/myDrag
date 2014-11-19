myDrag
=====

   my first widget in Github
（拖拽库） 
-----


###API(以下均为默认值)
  handler: null    // 必填，指定哪个元素可以进行拖动<br>
  container: document.documentElement || document.body    //指定包裹空间（可用于限制拖拽范围），可以不填<br>
  limit: true    //是否需要范围限制<br>
  onStart: function(){}    //自定义开始拖动事件<br>
  onMove: function(){}    //自定义拖动时的事件<br>
  onEnd: function(){}    //自定义结束拖动事件<br>



