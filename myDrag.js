
/*组件层*/
function Drag(config){
	this.config = {
		handler: null,
		container: document.documentElement || document.body,
		isLimit: true,
		onStart: function(){},
		onMove: function(){},
		onEnd: function(){}
	}
	for(var c in config){
		this.config[c] = config[c];

	}

	this.init.apply(this, arguments);
}

Drag.prototype = {
	init: function(){
		var that = this;
		this.maxL = Math.max(this.config.container.clientWidth, this.config.container.scrollWidth) - this.config.handler.offsetWidth;
		this.maxT = Math.max(this.config.container.clientHeight, this.config.container.scrollHeight) - this.config.handler.offsetHeight;

		this.config.handler.onmousedown = function(e){
			that.startDrag(e);
		};

		this.renderUI();
	},
	renderUI: function(){
		var that = this;
		this.config.handler.style.position = "absolute";
		/*防止窗口影响*/
		window.onresize = function(){
			that.maxL = Math.max(that.config.container.clientWidth, that.config.container.scrollWidth) - that.config.handler.offsetWidth;
			that.maxT = Math.max(that.config.container.clientHeight, that.config.container.scrollHeight) - that.config.handler.offsetHeight;
		}
	},
	startDrag: function(e){
		var e = window.e || e;

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
		var newL = e.clientX - this.mX;
		var newT = e.clientY - this.mY;

		/*这里是limit限制*/
		this.config.isLimit &&(
			newL < 0 && (newL = 0),
			newT < 0 && (newT = 0),
			newL > this.maxL && (newL = this.maxL),
			newT > this.maxT && (newT = this.maxT)
		)
		/*move*/
		this.config.handler.style.left = newL + "px";
		this.config.handler.style.top = newT + "px";
		this.config.onMove();
	},
	stopDrag: function(){
		this.config.onEnd();
		document.onmousemove = null;
		document.onmouseup = null;
	}
}

