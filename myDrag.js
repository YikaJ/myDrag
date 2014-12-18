
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

	//初始化
	this.init();
}

Drag.prototype = {
	init: function(){
		var that = this;
		this.maxL = Math.max(this.config.container.offsetWidth, this.config.container.clientWidth) - this.config.handler.offsetWidth;
		this.maxT = Math.max(this.config.container.offsetHeight, this.config.container.clientHeight) - this.config.handler.offsetHeight;
		this.config.handler.onmousedown = function(e){
			that.startDrag(e);
		};
		/*UI初始化 */
		this.renderUI();

		/*防止窗口影响*/
		window.onresize = function(){
			that.maxL = Math.max(that.config.container.offsetWidth, that.config.container.clientWidth) - that.config.handler.offsetWidth;
			that.maxT = Math.max(that.config.container.offsetHeight, that.config.container.clientHeight) - that.config.handler.offsetHeight;
		}
	},
	renderUI: function(){
		var that = this;
		this.config.handler.style.position = "absolute";
	},
	startDrag: function(e){
		var e = e || window.event;

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
		var e = e || window.event;
		var that = this;

		this.newL = e.clientX - this.mX;
		this.newT = e.clientY - this.mY;
		var newL = this.newL;
		var newT = this.newT;

		/*这里是limit限制*/
		this.config.isLimit &&(
			newL < 0 && (newL = 0),
			newT < 0 && (newT = 0),
			newL > this.maxL && (newL = this.maxL),
			newT > this.maxT && (newT = this.maxT)
		)
		/*实现move*/
		this.config.handler.style.left = newL + "px";
		this.config.handler.style.top = newT + "px";
		/*自定义的onMove函数*/
		this.config.onMove();
	},
	stopDrag: function(){
		this.newL = 0;
		this.newT = 0;
		this.config.onEnd();

		document.onmousemove = null;
		document.onmouseup = null;
	}
}

