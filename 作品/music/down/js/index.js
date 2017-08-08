window.onload = function(){
	console.log(document.documentElement.clientWidth);
	///设置大div的宽度自适应开始,顶部.
	var LiIndex = [0];
	///流星.
	!function(){
		var oStarbox = document.getElementsByClassName("starBox")[0];///流星的父元素盒子.
		var dHeight = document.documentElement.clientHeight;///屏幕的高度.
		var dWidth = document.documentElement.clientWidth;///屏幕的宽度.
		var starHeight = parseInt(getComputedStyle(oStarbox.children[0],false).height);///流星的高度.
		var starWidth = parseInt(getComputedStyle(oStarbox.children[0],false).width);///流星的宽度.
		setInterval(function(){
			var starNum = Math.ceil(Math.random() * 2);
			for(var k = 0;k < starNum;k++){
				var Star = document.createElement("div");
				var Starimg = document.createElement("img");
				Star.className = "star";
				Star.style.top = 0;
				Starimg.src = "../img/star.png";
				Star.appendChild(Starimg);
				oStarbox.appendChild(Star);
			};
			for(var i = 0;i < oStarbox.children.length;i++){
				var initLeft = Math.floor(Math.random() * (dWidth - starWidth)) + dWidth/2;///初始left值.
				var initTop = Math.ceil(Math.random() * (dHeight - starHeight)) + starHeight;///初始top值.
				initLeft > dWidth?initLeft = dWidth - starWidth:initLeft;///流星left大于屏幕宽时,等于left等于屏幕宽减去流星的宽度.
				for(var j = 0;j < oStarbox.children.length;j++){///内判断,当流星之间的left小于流星宽度的一半时,他的left加上流星宽度的一半.
					if(Math.abs(parseInt(getComputedStyle(oStarbox.children[j],false).left) -  parseInt(getComputedStyle(oStarbox.children[i],false).left)) < starWidth/2){
						var newLeft = parseInt(getComputedStyle(oStarbox.children[j],false).left)
						oStarbox.children[j].style.left = newLeft + starWidth/2 + "px";
					};
				};
				oStarbox.children[i].style.left = initLeft + "px";///初始left值.
				oStarbox.children[i].style.top = -initTop + "px";///初始top值.
			};
		},6000);
		var Top = 0;
		var Left = 0;
		if(oStarbox.children.length){
			clearInterval(timer);///每次运行前先清除定时器.
			var timer = setInterval(function(){
				for(var i = 0;i < oStarbox.children.length;i++){///由于有多条流星,所有每次先获取该流星的left和top值,再在原有基础上自减或自增.
					Left = parseInt(getComputedStyle(oStarbox.children[i],false).left);
					Top = parseInt(getComputedStyle(oStarbox.children[i],false).top);
					Left--;
					Top++;
					oStarbox.children[i].style.top = Top + "px";
					oStarbox.children[i].style.left = Left + "px";
					if((Top + starHeight) > dHeight || Left < 0){///流星大于屏幕高时,设置他的透明度为0.
						oStarbox.children[i].style.opacity = 0;
					};
					if(getComputedStyle(oStarbox.children[i],false).opacity == "0"){///当流星的透明度为0时,删除该流星.
						oStarbox.children[i].remove();
					};
				};
			},1)
		};
	}();
	///流星结束.
	!(function(){
			var SW = window.screen.width;///屏幕宽度.
			var SH = window.screen.height;///屏幕高度.
			var DW = document.documentElement.clientWidth;///文档宽度.
			var DH = document.documentElement.clientHeight;///文档高度.
			var OHeader = document.getElementsByTagName("header")[0];
			OHeader.style.height = DH * 0.21 + "px";///设置顶部的高度.
			var OEWidth = document.getElementsByClassName("EWidth");///设置自适应宽度的class.
			var OHeaderMiddle1 = document.getElementsByClassName("headerMiddle")[0];
			OHeaderMiddle1.style.lineHeight = getComputedStyle(OHeaderMiddle1,false).height;
			document.getElementsByClassName("headerRight")[0].children[0].style.lineHeight = getComputedStyle(document.getElementsByClassName("headerMiddle")[0],false).height;
			var OHeaderRight1 = document.getElementsByClassName("headerRight")[0].getElementsByTagName("p");
			OHeaderRight1[0].children[0].style.lineHeight = getComputedStyle(OHeaderRight1[0].children[0],false).height;
			OHeaderRight1[1].children[0].style.lineHeight = getComputedStyle(OHeaderRight1[1].children[0],false).height;
			OHeaderRight1[0].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[0].children[0],false).height) * 0.9 +"px";
			OHeaderRight1[1].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[1].children[0],false).height) * 0.9 +"px";
			var OHeaderMiddle = document.getElementsByClassName("headerMiddle")[0].children[0].children;///获取顶部li.
			for(var i = 0;i < OEWidth.length;i++){//设置他的最小宽度
				document.getElementsByClassName("EWidth")[i].style.minWidth = (SW * 0.87) * 0.81 + "px";
			};
			if(DW <= SW * 0.87){
				for(var i = 0;i < OEWidth.length;i++){
					document.getElementsByClassName("EWidth")[i].style.width = "100%";
				};
			};
			window.addEventListener("resize",function(e){
				DW = document.documentElement.clientWidth;
				if(DW <= SW * 0.87){
					for(var i = 0;i < OEWidth.length;i++){
						document.getElementsByClassName("EWidth")[i].style.width = "100%";
					};
				}else{
					for(var i = 0;i < OEWidth.length;i++){
						document.getElementsByClassName("EWidth")[i].style.width = "87%";
					};
				};
				///监听窗口改变时li   ----bug 需要调整
				document.getElementsByClassName("BgGreen")[0].style.left = LiIndex[0] * parseInt(getComputedStyle(document.getElementsByClassName("headerMiddle")[0].children[0].children[0],false).width) + "px";
				OHeaderRight1[0].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[0].children[0],false).height) * 0.9 +"px";
				OHeaderRight1[1].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[1].children[0],false).height) * 0.9 +"px";
			});
		}());
		///顶部li效果
		!(function(){
			var OHeaderMiddle = document.getElementsByClassName("headerMiddle")[0].children[0].children;///获取顶部li.
			for(let i = 0;i < OHeaderMiddle.length-1;i++){
				OHeaderMiddle[i].addEventListener("mouseover",function(){
					LiIndex.push(i);
					document.getElementsByClassName("BgGreen")[0].style.left = i * parseInt(getComputedStyle(this,false).width) + "px";
				});
			};
			var OHeaderRight = document.getElementsByClassName("headerRight")[0].children;
			OHeaderRight[1].children[0].addEventListener("mouseover",function(){
				this.style.transform = "translateZ(-" + getComputedStyle(this,false).width + ") rotateY(-90deg)";
			});
			OHeaderRight[1].children[0].addEventListener("mouseout",function(){
				this.style.transform = "translateZ(0px) rotateY(0deg)";
			});
			OHeaderRight[2].children[0].addEventListener("mouseover",function(){
				this.style.transform = "translateZ(-" + getComputedStyle(this,false).height + ") rotateX(-90deg)";
			});
			OHeaderRight[2].children[0].addEventListener("mouseout",function(){
				this.style.transform = "translateZ(0px) rotateX(0deg)";
			});
			document.getElementsByTagName("nav")[0].getElementsByTagName("ul")[0].style.lineHeight = getComputedStyle(document.getElementsByTagName("nav")[0],false).height;

			///搜索框点击效果 .
			var oNav = document.getElementsByTagName("nav")[0];
			var searchdefault = true;
			oNav.children[1].children[1].addEventListener("click",function(){
				if(searchdefault){
					oNav.children[1].style.width = 30 + "%";
					oNav.children[0].style.width = 65 + "%";
					this.style.width = 10 + "%";
					this.previousElementSibling.style.display = "block";
					searchdefault = false;
				}else{
					oNav.children[1].style.width = 4 + "%";
					oNav.children[0].style.width = 95 + "%";
					this.style.width = 100 + "%";
					this.previousElementSibling.style.display = "none";
					searchdefault = true;
				};
			});
		}());
	///设置大div的宽度自适应结束,顶部.





	///footer底部内容.
	!function(){
		var oFooter = document.getElementsByTagName("footer")[0];
		oFooter.style.marginTop = parseInt(document.getElementsByTagName("header")[0].style.height) + 20 + "px";///距离顶部的margin值.
		oFooter.style.height = document.documentElement.clientHeight * 0.72 + "px";///设置底部footer的高度.
		var footTitle = oFooter.children[0].getElementsByTagName("h3");///设置底部三个H3的line-height值.
		for(var i = 0;i < footTitle.length;i++){
			footTitle[i].style.lineHeight = getComputedStyle(footTitle[i],false).height;
		};
	}()
	///footer底部内容.
};
