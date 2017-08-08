function getStyle(obj,attr){
			if(window.currentStyle){
				return obj.currentStyle[attr];
			}else{
				return getComputedStyle(obj,false)[attr];
			};
		}

window.scroll = function (obj,num,time,direction,aside){
	var numInit = 0,
	    timelock = false;
	window.addEventListener("wheel",function(e){
		if(direction=="down" || direction=="up"){
			var w = document.documentElement.clientHeight || document.body.clientHeight;
			var attr="top";
		}else if(direction=="left" || direction =="right"){
			var w = document.documentElement.clientWidth || document.body.clientWidth;
			var attr="left";
		}else{
			throw new Error("未设置方向");
		}
		
		if(!e)var e = window.event;
		if(timelock){
			return false;
		};
		timelock = true;
		setTimeout(function(){
			timelock = false;
		},time)
		if(e.deltaY >= 0){
			numInit++;
			if(numInit >= num-1){
				numInit = num-1;
			};
		}else{
			numInit--;
			if(numInit <= 0){
				numInit = 0;
			};
		};
		obj["style"][attr] = -w * numInit + "px";
		for(var j=0;j<aside.children.length;j++){
			aside.children[j].className="";
			aside.children[numInit].className="focus";
		}
		var screen = document.querySelectorAll(".screen");
		switch(numInit){
			case 0:{
				screen[0].children[0].style.transform="scale(1)";
				screen[0].children[1].style.transform="scale(1)";
				screen[0].children[2].style.transform="scale(1)";
				setTimeout(function(){
					screen[0].children[2].style.animation="s1-small 1s linear infinite";
			},3000);
				screen[1].children[0].style.transform="";
				screen[1].children[1].style.transform="";
			};break;
			case 1:{
				screen[0].children[0].style.transform="";
				screen[0].children[1].style.transform="";
				screen[0].children[2].style.transform="";
				screen[0].children[2].style.animation="";
				screen[1].children[0].style.transform="translateY(0)";
				screen[1].children[1].style.transform="translateY(0)";
				screen[2].children[0].style.animation="";
				screen[2].children[1].style.animation="";
				screen[2].children[0].style.transform="translateX(100%) skewX(0)";
				screen[2].children[1].style.transform="translateX(100%) skewX(0)";
				screen[2].children[0].style.opacity="0";
				screen[2].children[1].style.opacity="0";
			};break;
			case 2:{
				screen[1].children[0].style.transform="";
				screen[1].children[1].style.transform="";
				screen[2].children[0].style.animation="lightSpeedIn 2s ease-out 1 2s";
				screen[2].children[1].style.animation="lightSpeedIn 2s ease-out 1 2s";
				screen[3].children[0].style.animation="";
				screen[3].children[1].style.animation="";
				screen[3].children[0].style.transform="rotateZ(-200deg)";
				screen[3].children[1].style.transform="rotateZ(-200deg)";
				screen[3].children[0].style.opacity="0";
				screen[3].children[1].style.opacity="0";	
				setTimeout(function(){
					screen[2].children[0].style.transform="translateX(0) skewX(0)";
					screen[2].children[1].style.transform="translateX(0) skewX(0)";
					screen[2].children[0].style.opacity="1";
					screen[2].children[1].style.opacity="1";	
					screen[2].children[0].style.animation="s3-big 2s linear infinite";
					screen[2].children[1].style.animation="s3-big 2s linear infinite";	
			},3500);
			};break;
			case 3:{
				screen[2].children[0].style.animation="";
				screen[2].children[1].style.animation="";
				screen[2].children[0].style.transform="translateX(100%) skewX(0)";
				screen[2].children[1].style.transform="translateX(100%) skewX(0)";
				screen[2].children[0].style.opacity="0";
				screen[2].children[1].style.opacity="0";
				screen[3].children[0].style.animation="rotateIn 2s ease-out 1 2s";
				screen[3].children[1].style.animation="rotateIn 2s ease-out 1 2s";
				screen[4].children[0].style.transform="scale3d(.1, .1, .1) translate3d(0, 1000px, 0)";
				screen[4].children[1].style.transform="scale3d(.1, .1, .1) translate3d(0, 1000px, 0)";
				screen[4].children[0].style.opacity="0";
				screen[4].children[1].style.opacity="0";	
				screen[4].children[0].style.animation="";
				screen[4].children[1].style.animation="";
				setTimeout(function(){
					screen[3].children[0].style.transform="none";
					screen[3].children[1].style.transform="none";
					screen[3].children[0].style.opacity="1";
					screen[3].children[1].style.opacity="1";	
					screen[3].children[0].style.animation="s4-flash 2s linear infinite";
					screen[3].children[1].style.animation="s4-flash 2s linear infinite";	 
			},3500);
			};break;
			case 4:{
				screen[3].children[0].style.animation="";
				screen[3].children[1].style.animation="";
				screen[3].children[0].style.transform="rotateZ(-200deg)";
				screen[3].children[1].style.transform="rotateZ(-200deg)";
				screen[3].children[0].style.opacity="0";
				screen[3].children[1].style.opacity="0";
				screen[4].children[0].style.animation="zoomInUp 2s ease-out 1 2s";
				screen[4].children[1].style.animation="zoomInUp 2s ease-out 1 2s";
				setTimeout(function(){
					screen[4].children[0].style.transform="scale3d(1, 1, 1) translate3d(0, 0, 0)";
					screen[4].children[1].style.transform="scale3d(1, 1, 1) translate3d(0, 0, 0)";
					screen[4].children[0].style.opacity="1";
					screen[4].children[1].style.opacity="1";	
					screen[4].children[0].style.animation="pulse 2s linear infinite";
					screen[4].children[1].style.animation="pulse 2s linear infinite";	 
			},4000);
			};break;
		}
	});
};
		
		var box=document.getElementById("box"),	
			aside=document.querySelector("aside"),
            nav=document.querySelectorAll("nav>ul>li");
		var screen = document.querySelectorAll(".screen");
		
		window.addEventListener("load",function(){
			screen[0].children[0].style.transform="scale(1)";
			screen[0].children[1].style.transform="scale(1)";
			screen[0].children[2].style.transform="scale(1)";
			setTimeout(function(){
				screen[0].children[2].style.animation="s1-small 1s linear infinite";
			},3000)
		});


        /*        屏幕的宽度的适应与调整 （start）          */
		(function(){
			for(var i=0;i < box.children.length;i++){
				var h=document.documentElement.clientHeight || document.body.clientHeight,
					w=document.documentElement.clientWidth || document.body.clientWidth;
				box.children[i].style.height=h + "px";
				box.children[i].style.width=w + "px";
				box.style.width=w*5 + "px";
				box.style.height=h + "px";
			};
		})();
		window.addEventListener("resize",function(){
			for(var i=0;i < box.children.length;i++){
				var h=document.documentElement.clientHeight || document.body.clientHeight,
					w=document.documentElement.clientWidth || document.body.clientWidth;
				box.children[i].style.height=h + "px";
				box.children[i].style.width=w + "px";
				box.style.width=w*5 + "px";
				box.style.height=h + "px";
			};
		})
        /*        屏幕的宽度的适应与调整 （end）          */


        /*              屏幕滚动监听（调用函数）         */
		scroll(box,5,1000,"left",aside);
        /*              屏幕滚动监听（调用函数） end    */


        /*       nav 点击事件的函数                  */
        (function(){
            for(var i=1;i<nav.length;i++){
                nav[i].addEventListener("click",function(){
                    console.log(1);
                    for(var j=1;j<nav.length;j++){
                        nav[j].className="";
                    }
                    this.className="nav-focus";
                })
            }
        })();

		var logo=document.querySelector(".logo");
		logo.addEventListener("click",function(){
			window.location.href="index.html";
		})