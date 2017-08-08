window.onload = function(){
	///设置分屏.
	!function(){

		var numInit = 0;///初始值.
		function getStyle(obj,attr){///获取外部样式的属性.
			if(window.currentStyle){
				return obj.currentStyle[attr];///给IE做的兼容.
			}else{
				return getComputedStyle(obj,false)[attr];///正常浏览器.
			};
		};


		function scrollScreen(obj,num,time,icon){///运动的对象,总共有几屏{max:,min}对象的方式书写,节流的时间(毫秒),指向图片的小图标,回调函数传下标.
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
					allAnimate();
				};
			};
		};


		var oBigBox = document.getElementById("bigBox");
		var oIcon = document.getElementsByTagName("nav")[0].getElementsByTagName("a");

		scrollScreen(oBigBox,{max:4,min:0},400,oIcon);///监听滚轮事件并更改分屏值.
		///设置每一屏的高度.
		for(var i = 0;i < oBigBox.children.length;i++){
			var H = document.documentElement.clientHeight || document.body.clientHeight;
			oBigBox.children[i].style.height = H + "px";
		};
		///监听窗口根据窗口大小更改每一屏的高度.
		window.addEventListener("resize",function(){
			for(var i = 0;i < oBigBox.children.length;i++){
				oBigBox.children[i].style.height = document.documentElement.clientHeight + "px";
			};
		});
	///设置分屏.
	///第一屏.
		///设置宽度.
		var OEWidth = document.getElementsByClassName("EWidth");
		for(var k = 0;k < OEWidth.length;k++){
			OEWidth[k].style.width = window.screen.width * 0.73 + "px";
			OEWidth[k].style.margin = "0 auto";
		};
		///设置钟表的跳动.
		///
		var oBigBox = document.getElementById("bigBox");
		var time = document.getElementsByClassName("watch")[0];
		var oTop = parseInt(getComputedStyle(oBigBox,false)["top"]);
		var oFoot = document.getElementsByClassName("oneScreen")[0].getElementsByTagName("footer")[0].children[0].children;
		var oSection = document.getElementsByClassName("oneScreen")[0].getElementsByTagName("section")[0].children;
		var oTextRotate = document.getElementsByClassName("oneSection")[0].getElementsByClassName("oneSectionTextBox")[0].children[0];
		var oDown = document.getElementsByClassName("oneSection")[0].getElementsByClassName("oneSectionTextBox")[0].children[1];

		oneSectionAnimate("start",0);///默认第一幅动画开始.
		///这里是点击底部banner导航跳转.
		for(let i = 0;i < oFoot.length;i++){
			oFoot[i].addEventListener("click",function(){
				if(i == 0){
					oneSectionAnimate("start",0);
				}else{
					oneSectionAnimate("end");
				};
				if(i==1){
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("twoSectionTextBox")[0].getElementsByTagName("span")[0].style.animation = "leftMove 2.4s linear 0s forwards";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("twoSectionTextBox")[0].getElementsByTagName("span")[1].style.animation = "rightMove 2.4s linear 0s forwards";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("twoSectionTextBox")[0].getElementsByTagName("p")[0].style.animation = "down 2.4s linear 0s forwards";

				}else{
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("twoSectionTextBox")[0].getElementsByTagName("span")[0].style.animation = "none";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("twoSectionTextBox")[0].getElementsByTagName("span")[1].style.animation = "none";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("twoSectionTextBox")[0].getElementsByTagName("p")[0].style.animation = "none";

				};
				if(i==2){
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("threeSectionTextBox")[0].getElementsByTagName("span")[0].style.animation = "leftMove 2.4s linear 0s forwards";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("threeSectionTextBox")[0].getElementsByTagName("span")[1].style.animation = "rightMove 2.4s linear 0s forwards";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("threeSectionTextBox")[0].getElementsByTagName("p")[0].style.animation = "down 2.4s linear 0s forwards";
				}else{
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("threeSectionTextBox")[0].getElementsByTagName("span")[0].style.animation = "none";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("threeSectionTextBox")[0].getElementsByTagName("span")[1].style.animation = "none";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("threeSectionTextBox")[0].getElementsByTagName("p")[0].style.animation = "none";

				};
				if(i==3){
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("fourSectionTextBox")[0].getElementsByTagName("span")[0].style.animation = "leftMove 2.4s linear 0s forwards";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("fourSectionTextBox")[0].getElementsByTagName("span")[1].style.animation = "rightMove 2.4s linear 0s forwards";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("fourSectionTextBox")[0].getElementsByTagName("p")[0].style.animation = "down 2.4s linear 0s forwards";

				}else{
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("fourSectionTextBox")[0].getElementsByTagName("span")[0].style.animation = "none";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("fourSectionTextBox")[0].getElementsByTagName("span")[1].style.animation = "none";
					document.getElementsByClassName("oneScreen")[0].getElementsByClassName("fourSectionTextBox")[0].getElementsByTagName("p")[0].style.animation = "none";

				};
				///点击底部的导航跳转到不同banner.
				for(var j = 0;j < oSection.length;j++){
					oSection[j].style.opacity = 0;
					oSection[j].style.zIndex = 2;
					oFoot[j].children[0].style.borderColor = "transparent";
					oFoot[j].children[0].style.opacity = ".5";
				};
				oSection[i].style.opacity = 1;
				oSection[i].style.zIndex = 3;
				this.children[0].style.borderTop = "1px solid white";
				this.children[0].style.opacity = 1;
				///点击底部的导航跳转到不同banner.
			});
		};
		///这里是点击底部banner导航跳转结束.
		var OBanner = document.getElementsByClassName("oneScreen")[0].getElementsByClassName("banner")[0];
		OBanner.style.minWidth = window.screen.width * 0.9 + "px";///这个是设置图片的最小宽度.

		function oneSectionAnimate(state,num){///第一屏第一张banner的动画 参数:判断是否开始运动,钟表的时间跳动.
			if(state == "start"){
				oTextRotate.children[0].style.animation = "leftMove 2.4s linear 0s forwards";
				oTextRotate.children[1].style.animation = "rightMove 2.4s linear 0s forwards";
				oTextRotate.children[2].style.animation = "rightMove 2.4s linear 0s forwards";

				oDown.style.animation = "down 2.4s linear 0s forwards";

				time.children[0].style.transition = "transform 2.4s cubic-bezier(.36,.2,1,1.24)";
				time.children[0].style.transform = "rotate(0deg)";
				var timer = setInterval(function(){
					num++;
					if(num < 10){
						time.children[1].innerHTML = "0" + num;
					}else if(num >= 10&&num <= 60){
						time.children[1].innerHTML = num;
					}else{
						clearInterval(timer);
					};
				},40);
			}else{
				oDown.style.animation = "none";
				oTextRotate.children[0].style.animation = "none";
				oTextRotate.children[1].style.animation = "none";
				oTextRotate.children[2].style.animation = "none";
				time.children[1].innerHTML = "0";
				time.children[0].style.transition = "none";
				time.children[0].style.transform = "rotate(-255deg)";
			};
		};
	///第二屏.
		var otwoScreen = document.getElementsByClassName("twoScreen")[0];
		var oUl = otwoScreen.getElementsByTagName("ul")[0];
		for(var i = 0;i < 21;i++){
			var cLi = document.createElement("li");
			var cImg = document.createElement("img");
			cImg.src = '../img/' + i + '.jpg';
			cLi.style.height = document.documentElement.clientHeight / 3 + "px";
			cLi.appendChild(cImg);
			oUl.appendChild(cLi);
		};
		var arr = [];
		var num = 0.1;
		var num2 = oUl.children.length/2 * 0.1;
		for(var j = 0;j < oUl.children.length/2;j++){
			num += 0.1;
			num2 += 0.1;
			arr.push(num);
			arr.push(num2);
		};
		window.addEventListener("wheel",function(){///判断滚动到底几屏,然后运行当前屏的动画,停止其他屏的动画.
			allAnimate();
		});
		function allAnimate(){///全部动画.
				if(numInit == 0){
					for(var m = 0;m < oUl.children.length;m++){///清空其它屏的动画.
						oUl.children[m].style.animation = "none";
					};
					document.getElementsByClassName("twoScreenText")[0].style.transition = "none";
					document.getElementsByClassName("twoScreenText")[0].style.opacity = 0;
					document.getElementsByClassName("twoScreenText")[0].style.transform = "scale(0)";
					threeAnimateEnd();///第三屏结束.
					fourAnimateEnd();///第四屏结束.
					fiveAnimateEnd();///第五屏结束.

					oneSectionAnimate("start",0);///开始第一屏的动画.
				}else if(numInit == 1){
					oneSectionAnimate("end");///清空其他屏的动画.
					for(var m = 0;m < oUl.children.length;m++){///开始当前屏的动画.
						if(m%2){
							oUl.children[m].style.animation = "showproduct 1s linear " + arr[m] + "s forwards";
						}else{
							oUl.children[m].style.animation = "showproduct 1s linear " + arr[m] + "s forwards";
						};
					};

					document.getElementsByClassName("twoScreenText")[0].style.transition = "transform 3s linear";
					document.getElementsByClassName("twoScreenText")[0].style.opacity = .8;
					document.getElementsByClassName("twoScreenText")[0].style.transform = "scale(1)";///.第二屏结束.
					threeAnimateEnd();///第三屏结束.
					fourAnimateEnd();///第四屏结束.
					fiveAnimateEnd();///第五屏结束.
				}else if(numInit == 2){
					oneSectionAnimate("end");///清空其他屏的动画.
					for(var m = 0;m < oUl.children.length;m++){
						oUl.children[m].style.animation = "none";
					};
					document.getElementsByClassName("twoScreenText")[0].style.transition = "none";
					document.getElementsByClassName("twoScreenText")[0].style.opacity = 0;
					document.getElementsByClassName("twoScreenText")[0].style.transform = "scale(0)";
					fourAnimateEnd();///第四屏结束.
					fiveAnimateEnd();///第五屏结束.

					threeAnimateStart();///开始当前屏的动画.
				}else if(numInit == 3){
					oneSectionAnimate("end");///清空其他屏的动画.
					for(var m = 0;m < oUl.children.length;m++){
						oUl.children[m].style.animation = "none";
					};
					document.getElementsByClassName("twoScreenText")[0].style.opacity = 0;
					document.getElementsByClassName("twoScreenText")[0].style.transform = "scale(0)";
					threeAnimateEnd();///第三屏结束.
					fiveAnimateEnd();///第五屏结束.

					fourAnimateStart();///开始当前屏动画.
				}else{
					oneSectionAnimate("end");///清空其他屏的动画.
					for(var m = 0;m < oUl.children.length;m++){
						oUl.children[m].style.animation = "none";
					};
					document.getElementsByClassName("twoScreenText")[0].style.opacity = 0;
					document.getElementsByClassName("twoScreenText")[0].style.transform = "scale(0)";
					threeAnimateEnd();///第三屏结束.
					fourAnimateEnd();///第四屏结束.

					fiveAnimateStart();
				};
			};
		function threeAnimateStart(){///第三屏动画.
			document.getElementsByClassName("threeScreen")[0].style.transition = "all 2s linear";
			document.getElementsByClassName("threeScreen")[0].style.opacity = "1";
			document.getElementsByClassName("threeScreenText")[0].style.transition = "all 2s linear";///开始当前屏的动画.
			document.getElementsByClassName("threeScreenText")[0].style.transform = "scale(1)";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].style.transition = "all 2s linear";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].style.transform = "translate(0,0)";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].getElementsByTagName("span")[1].style.transition = "all 2s linear 2.4s";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].getElementsByTagName("span")[1].style.opacity = "1";///开始当前屏的动画.
		};
		function threeAnimateEnd(){///第三屏动画结束.
			document.getElementsByClassName("threeScreen")[0].style.transition = "none";
			document.getElementsByClassName("threeScreen")[0].style.opacity = "0";
			document.getElementsByClassName("threeScreenText")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("threeScreenText")[0].style.transform = "scale(0)";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].style.transform = "translate(100%,0)";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].getElementsByTagName("span")[1].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("mobile")[0].getElementsByTagName("span")[1].style.opacity = "0";///开始当前屏的动画.
		};
		function fourAnimateStart(){///第四屏动画开始.
			document.getElementsByClassName("fourScreen")[0].style.transition = "opacity 2s linear";
			document.getElementsByClassName("fourScreen")[0].style.opacity = "1";
			document.getElementsByClassName("fourScreenText")[0].style.transition = "all 2s linear";///开始当前屏的动画.
			document.getElementsByClassName("fourScreenText")[0].style.transform = "scale(1)";///开始当前屏的动画.
			document.getElementsByClassName("fourScreenText")[0].style.opacity = "1";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].style.transition = "transform 2s linear";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].style.transform = "translate(0,0)";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].getElementsByTagName("span")[0].style.transition = "all 2s linear 2s";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].getElementsByTagName("span")[0].style.left = "-1.3rem";///.
			document.getElementsByClassName("fourMobile")[0].getElementsByTagName("span")[0].style.top = "-7rem";///.
		};
		function fourAnimateEnd(){///第四屏动画结束.
			document.getElementsByClassName("fourScreen")[0].style.transition = "none";
			document.getElementsByClassName("fourScreen")[0].style.opacity = "0";
			document.getElementsByClassName("fourScreenText")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("fourScreenText")[0].style.transform = "scale(0)";///开始当前屏的动画.
			document.getElementsByClassName("fourScreenText")[0].style.opacity = "0";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].style.transform = "translate(-100%,0)";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].getElementsByTagName("span")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("fourMobile")[0].getElementsByTagName("span")[0].style.left = "0.15rem";///.
			document.getElementsByClassName("fourMobile")[0].getElementsByTagName("span")[0].style.top = "8.5rem";///.
		};
		function fiveAnimateStart(){///第五屏动画开始.
			document.getElementsByClassName("fiveScreen")[0].style.transition = "opacity 2s linear";
			document.getElementsByClassName("fiveScreen")[0].style.opacity = 1;
			document.getElementsByClassName("fiveScreenText")[0].style.transition = "all 2s linear";///开始当前屏的动画.
			document.getElementsByClassName("fiveScreenText")[0].style.width = "45rem";///开始当前屏的动画.
			document.getElementsByClassName("fiveMobile")[0].style.transition = "transform 2s linear .2s";///开始当前屏的动画.
			document.getElementsByClassName("fiveMobile")[0].style.transform = "translate(0,0)";///开始当前屏的动画.
			document.getElementsByClassName("fiveMac")[0].style.transition = "all 2s linear 1s";///开始当前屏的动画.
			document.getElementsByClassName("fiveMac")[0].style.transform = "scale(1.2) translate(0,0)";///.
		};
		function fiveAnimateEnd(){///第五屏动画结束.
			console.log("console");
			document.getElementsByClassName("fiveScreen")[0].style.transition = "none";
			document.getElementsByClassName("fiveScreen")[0].style.opacity = 0;
			document.getElementsByClassName("fiveScreenText")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("fiveScreenText")[0].style.width = "0rem";///开始当前屏的动画.
			document.getElementsByClassName("fiveMobile")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("fiveMobile")[0].style.transform = "translate(-100%,0)";///开始当前屏的动画.
			document.getElementsByClassName("fiveMac")[0].style.transition = "none";///开始当前屏的动画.
			document.getElementsByClassName("fiveMac")[0].style.transform = "scale(1.2) translate(120%,0)";///.
		};
		window.addEventListener("resize",function(){///监听窗口改变UL往左进去.
			if(document.documentElement.clientWidth < window.screen.width){
				oUl.style.left = "-160px";
			}else{
				oUl.style.left = "-70px";
			};
		});


	}();
};
