
 window.scrollScreen = function (obj,num,time,icon){//运动的对象,总共有几屏{max:,min}对象的方式书写,节流的时间(毫秒),指向图片的小图标.
	var numInit = 0;///初始值.
	var timelock = false;///锁.
	var H = document.documentElement.clientHeight;///获取屏幕的高度.
	window.addEventListener("wheel",function(e){
		if(!e)var e = window.event;
		if(timelock){///截流.
			return false;
		};
		timelock = true;///默认为false,当运动一次后为true,time毫秒后解锁.
		setTimeout(function(){///取消截流.
			timelock = false;
		},time)
		if(e.deltaY >= 0){///判断滚动的方向.
			numInit++;///正方向每滚动一次,值自增一.
			if(numInit >= num.max){
				numInit = num.max;///超过最大值时,值等于最大值.
			};
		}else{
			numInit--;///正方向每滚动一次,值自减一低过最小值时,值等于最小值
			if(numInit <= num.min){
				numInit = num.min;
			};
		};
		for(var i = 0;i < icon.length;i++){
			icon[i].classList.remove("iconBg");///清空所有小图标的类名.
		};
		icon[numInit].classList.add("iconBg");///设置i对应小图标的类名.
		obj.style.top = -H * numInit + "px";///给盒子赋值.
	});
	/* ----------这段是监听浏览器窗口大小改变时,高度重新赋值,每一屏的top值也要随之更改-------------- */
	window.addEventListener("resize",function(){
		H = document.documentElement.clientHeight;///获取屏幕的高度.
		obj.style.top = -H * numInit + "px";
	});
	/* ----------这段是监听浏览器窗口大小改变时,高度重新赋值,每一屏的top值也要随之更改-------------- */

	for(let j = 0;j < icon.length;j++){///点击右侧导航的图标时跳转并重新给numInit赋值.
		icon[j].onclick = function(){
			for(var k = 0;k < icon.length;k++){
				icon[k].classList.remove("iconBg");
			};
			icon[j].classList.add("iconBg");
			numInit = j;
			obj.style.top = -H * j + "px";
		};
	};
	function getStyle(obj,attr){///获取外部样式的属性.
		if(window.currentStyle){
			return obj.currentStyle[attr];///给IE做的兼容.
		}else{
			return getComputedStyle(obj,false)[attr];///正常浏览器.
		};
	}
};
