$(function() {
	var canvas = $("#canvas").get(0);
	var ctx = canvas.getContext("2d");
	var sep = 29.8;
	var sR = 4;
	var bR = 14.9;
	var arr={};
	
	 //空白
  kongbai = {};
	
	var $audio = $("#audio");
	var audio = $audio.get(0);

/*秒表*/
	var canvasZ = $("#canvas-z").get(0);
	var context = canvasZ.getContext("2d");

	var canvasY = $("#canvas-y").get(0);
	var contex = canvasY.getContext("2d");

	var btn = $("#btn");
	
	function Circle(x, y, r) {
		ctx.save();
		ctx.beginPath();
		ctx.arc(lam(x), lam(y), r, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
		ctx.restore();
	}

	function lam(x) {
		return(x + 0.8) * sep + 0.8;
	}

//画棋盘
	function drawQipan() {
		ctx.save();
		ctx.beginPath();
		for(var i = 0; i < 22; i++) {
			ctx.moveTo(24.5, 24.5 + i * sep);
			ctx.lineTo(620.5, 24.5 + i * sep);

			ctx.moveTo(24.5 + i * sep, 24.5);
			ctx.lineTo(24.5 + i * sep, 620.5);
		}
		ctx.closePath();
		ctx.stroke();
		ctx.restore();

		Circle(10, 10, sR);
		Circle(6, 6, sR);
		Circle(14, 6, sR);
		Circle(6, 14, sR);
		Circle(14, 14, sR);

	}

	drawQipan();

	////////棋子
	function Chessmen(x, y, color) {
		ctx.save();
		ctx.beginPath();
		ctx.translate(lam(x), lam(y));
		ctx.arc(0, 0, bR, 0, Math.PI * 2);
		var Color = ctx.createRadialGradient(-5, -5, 1.5, 0, 0, 15);
		if(color === "#000") {
			Color.addColorStop(0.1, "#dfdfdf");
			Color.addColorStop(0.2, "#eee");
			Color.addColorStop(0.3, "#7A808C");
			Color.addColorStop(0.5, "#313236");
			Color.addColorStop(1, "#000");
		} else {
			Color.addColorStop(0.1, "#fff");
			Color.addColorStop(0.2, "#dfdfdf");
			Color.addColorStop(0.3, "#C8CAD6");
			Color.addColorStop(0.5, "#C8CAD6");
			Color.addColorStop(1, "#dfdfdf");
		}
			ctx.closePath();
			ctx.fillStyle = Color;
			ctx.fill();
			ctx.restore();
			arr[m(x,y)]=color;
	}
	/*秒表*/
	//////////
	var deg = 0;

	function Second1() {
		context.save();
		
		context.translate(100, 120);
		context.beginPath();
		context.stroke();
		context.closePath();

		context.arc(0, 0, 5, 0, Math.PI * 2);
		context.rotate(Math.PI / 180 * 6 * deg);
		context.beginPath();
		context.moveTo(0, 5);
		context.lineTo(0, 20);
		context.moveTo(0, -5);
		context.lineTo(0, -60);
		context.closePath();
		context.stroke();
		context.fill();

		deg += 1;
		if(deg >= 360) {
			deg = 0;
		}
		context.restore();

	}
	
	Second1();
	
	function renderZ() {
		context.clearRect(0, 0, 200, 200);
		Second1();
	}
	
	
	function Second2() {
		contex.save();
		
		contex.translate(100, 120);
		contex.beginPath();
		contex.stroke();
		contex.closePath();

		contex.arc(0, 0, 5, 0, Math.PI * 2);

		contex.rotate(Math.PI / 180 * 6 * deg);
		contex.beginPath();
		contex.moveTo(0, 5);
		contex.lineTo(0, 20);
		contex.moveTo(0, -5);
		contex.lineTo(0, -60);
		contex.closePath();
		contex.stroke();
		contex.fill();

		deg += 1;
		if(deg >= 360) {
			deg = 0;
		}
		contex.restore();
	}
	Second2();
	function renderY() {
		contex.clearRect(0, 0, 200, 200);
		Second2();
	}
//	判断输赢
	function m(x,y){
		return x+'_'+y;
	}
	function panduan(x,y,color){
//		判断行
		var row=1; var i;
		i=1; while(arr[m(x+i,y)]===color){ row++; i++; }
		i=1; while(arr[m(x-i,y)]===color){ row++; i++; }
//		判断列
		var lie=1; 
		i=1; while(arr[m(x,y-i)]===color){ lie++; i++; }
		i=1; while(arr[m(x,y+i)]===color){ lie++; i++; }
//		判断左斜
		var zx=1; 
		i=1; while(arr[m(x+i,y+i)]===color){ zx++; i++; }
		i=1; while(arr[m(x-i,y-i)]===color){ zx++; i++; }
//		判断右斜
		var yx=1; 
		i=1; while(arr[m(x+i,y-i)]===color){ yx++; i++; }
		i=1; while(arr[m(x-i,y+i)]===color){ yx++; i++; }
		return Math.max(row,lie,zx,yx);
	}
	
chessManual=function(){
		ctx.save();
		ctx.font="16px/0    微软雅黑";
		ctx.textAlign="center";
		ctx.textBaseline="middle";
		var i = 1;
		for(var k in arr){
			var att = k.split('_');
			if(arr[k]==="#000"){
				ctx.fillStyle="#fff";
			}else{
				ctx.fillStyle="#000";
			}
			ctx.fillText(i++, lam(parseInt(att[0])), lam(parseInt(att[1])));
		}
		ctx.restore();
		$("<img>").attr("src",canvas.toDataURL()).appendTo("body");
		$("<a>").attr("href",canvas.toDataURL()).attr("download","qipu.png").appendTo("body");	
	}
  // 一开始所有的位置都是空白
 var initblank = function () {
    for (var i = 0; i < ROW; i++) {
      for (var j = 0; j < ROW; j++) {
        kongbai[ i + '-' + j ] = true;
      }
    }
  }
///*查看棋谱*/
//	var check=$("#check");
//	var btn=$("#kaishi");
//	var close = $("#close");
//	$(".btn").on("click",function(){
//		check.addClass("active");
//		chessManual();
//	});
//	close.on("click",function(){
//		check.removeClass("active");
//		redrawchess();
//	});
	/*黑白棋子*/	
	var Switch = true;
	$(canvas).on("click", function(e) {
		var x = Math.floor(e.offsetX / sep);
		var y = Math.floor(e.offsetY / sep);
		if(arr[m(x,y)]) {
			return;
		}
		if(Switch) {
			Chessmen(x, y,"#000");
			if(panduan(x,y,"#000")>=5){
				$('.yxjs').addClass('active');
				$('.yxjs p').html('黑棋赢!');
			}
//			chessManual();
		} 
		else {
			Chessmen(x, y, "#fff");
			if(panduan(x,y,"#fff")>=5){
				$('.yxjs').addClass('active');
				$('.yxjs p').html('白棋赢!');
			}
//			chessManual();
		}	
		Switch=!Switch;
		audio.play();
	});
	
	$('#jsyx').on('click',function(){
		console.log($(this))
		$('.yxjs').addClass('active');
	})
	$('.yxjs span').on('click',function(){
		$('.yxjs').removeClass('active')
	})
//	开始游戏
	$('#jmks').on('click',function(){
		$('.jr').addClass('jrdh');
	})
});