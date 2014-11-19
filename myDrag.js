
/*组件层*/
function Drag(config){
	this.config = {
		handler: null,
		container: document.documentElement || document.body,
		limit: true,
		onStart: function(){},
		onMove: function(){},
		onEnd: function(){}
	}
	for(var c in config){
		this.config[c] = config[c];
		console.log(this.config.onStart);
	}
}

Drag.prototype = {
	init: function(){
		var that = this;
		this.config.handler.onmousedown = function(e){
			that.startDrag(e);
		};
		this.renderUI();
	},
	renderUI: function(){
		this.config.handler.style.position = "absolute";
	},
	startDrag: function(e){
		var e = window.e || e;
		console.log(e);
		var that = this;
		//鼠标在obj内部的位置
		this.mX = e.clientX - this.config.handler.offsetLeft;
		this.mY = e.clientY - this.config.handler.offsetTop;



		this.config.onStart();
		document.onmousemove = function(e){
			that.moveDrag(e);
		};
		document.onmouseup = function(){
			that.stopDrag();
		}
	},
	moveDrag: function(e){
		var e = window.e || e;
		this.newL = e.clientX - this.mX;
		this.newT = e.clientY - this.mY;
		this.config.handler.style.left = this.newL + "px";
		this.config.handler.style.top = this.newT + "px";
		this.config.onMove();
	},
	stopDrag: function(){
		this.config.onEnd();
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

  /*应用层*/
	var obj = document.getElementById('obj');
	var dragObj = new Drag({
		handler: obj,
		onStart: function(){
			console.log("onStart");
			this.originBg = this.handler.style.background;
			this.handler.style.background = "#000";
		},
		onMove: function(){
			console.log("I'm moving!!!");
		},
		onEnd: function(){
			console.log("stop it!");
			this.handler.style.background = this.originBg;
		}
	}).init();
