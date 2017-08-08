(function(){
      var arr=[0,1,5,4,3],             // language 存储
          arr1=[200,104,204,76,89],     // maxpage存储
          page = 1,         
          btn = document.querySelectorAll(".kind>li"),
          pages = document.querySelector(".page>a").children;
          language=0,
          maxPage=arr1[0],
          obj={           //  对象，有状态，内容，状态变化，以及改变内容四个部分！！！！
              states:[0,0,0,0,0,0,1,1,1,1,0,1,1],
              content:["<",1,"...",1,page-2,page-1,page,page+1,page+2,maxPage,"...",maxPage,">"],
              change:function(num){      //状态变化,决定是否隐藏！
                    this.states[0]=1;
                    this.states[12]=1;
                    if(num==1){
                        this.states[0]=0;
                    };
                    if(num==maxPage){
                        this.states[12]=0;
                    };
                    this.states[1]=1;
                    this.states[2]=1;
                    if(num-4<0){
                        this.states[1]=0;
                        this.states[2]=0;
                    };
                    this.states[11]=1;
                    this.states[10]=1;
                    if(num+3>maxPage){
                        this.states[11]=0;
                        this.states[10]=0;
                    };
                    this.states[3]=0;
                    if(num==4){
                        this.states[1]=0;
                        this.states[2]=0;
                        this.states[3]=1;
                    };
                    this.states[9]=0;
                    if(num==maxPage-3){
                        this.states[9]=1;
                        this.states[11]=0;
                        this.states[10]=0;
                    };
                    this.states[7]=0;
                    this.states[8]=0;
                    this.states[4]=0;
                    this.states[5]=0;
                    if(num+1<=maxPage){
                        this.states[7]=1;
                    };
                    if(num+2<=maxPage){
                        this.states[8]=1;
                    };
                    if(num-1>=1){
                        this.states[5]=1;
                    };
                    if(num-2>=1){
                        this.states[4]=1;
                    };
                    for(var i=4;i<9;i++){  //   换内容
                        this.content[i]=num+i-6;
                    }
              },
              insert:function(obj){         //内容变化
                  for(var i=0;i<obj.length;i++){
                      if(this.states[i]){
                          obj[i].style.display="inline-block";
                      }else{
                          obj[i].style.display="none";
                      }
                  }
                  for(var j=0;j<5;j++){
                      obj[4+j].innerHTML=this.content[4+j];
                  }
              }
          };

          function become(language,page){           // 生成新的jsonp回调函数 script标签
              var scr = document.getElementById("script");
                        scr.remove();
                    var newSrc= document.createElement("script");
                    newSrc.id="script";
                    var a=page-1;
                    newSrc.src="https://c.y.qq.com/v8/fcg-bin/album_library?g_tk=5381&jsonpCallback=getPlaylist&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0&cmd=get_album_info&page="+a+"&pagesize=20&sort=1&language="+language+"&genre=0&year=1&pay=0&type=-1&company=-1";
                    document.body.appendChild(newSrc);
          }

            for(let i=0;i<btn.length;i++){       //音乐语言类型点击事件
                btn[i].addEventListener("click",function(){         
                    for(var j=0;j<btn.length;j++){
                        btn[j].className="";
                    }
                    this.className="focus";
                    language = arr[i];
                    page = 1;
                    maxPage =arr1[i];
                    pages[9].innerHTML= maxPage;
                    pages[11].innerHTML= maxPage;
                    obj.change(page);
                    obj.insert(pages);
                    become(language,page);
                })
            };

            for(var j=0;j<pages.length;j++){        //音乐内容页码点击事件
                switch(j){
                    case 0:{
                        pages[j].addEventListener("click",function(){
                            if(page>1){
                                 page--;
                                 obj.change(page);
                                 obj.insert(pages);
                                 become(language,page);
                            }
                        })
                    };break;
                    case pages.length-1:{
                        pages[j].addEventListener("click",function(){
                            if(page<maxPage){
                                page++;
                                obj.change(page);
                                obj.insert(pages);
                                become(language,page);
                            }
                        })
                    };break;
                    case 2:break;
                    case 10:break;
                    default:pages[j].addEventListener("click",function(){
                         page = Number(this.innerHTML);
                        obj.change(page);
                        obj.insert(pages);
                        become(language,page);
                        console.log(obj.states);
                        console.log(obj.content);
                    })

                }
            }

})()

    function getPlaylist(data){                     //jsonp回调函数
        var li=document.querySelectorAll(".content>li");
        data = data.data.albumlist;
        if(li.length>data.length){                  //已存在模板多余请求时，删除多余部分
           for(var j=data.length;j<li.length;){
                li[j].remove();
           } 
        }else{
            for(var k=0;k<li.length;k++){                           //替换
            var   img = li[k].querySelector("img"),
                  p = li[k].querySelectorAll("p");
                  img.src="http://y.gtimg.cn/music/photo_new/T002R300x300M000"+data[k].album_mid+".jpg?max_age=2592000";
                  img.alt=data[k].album_name;
                  p[0].innerHTML = data[k].album_name ;
                  p[1].innerHTML = data[k].singer_name ;
                  p[2].innerHTML = data[k].public_time ;
            }
            for(var i=li.length;i<data.length;i++){             // 已存在模板少于请求时，增加少的部分
                getTemplate(data[i]);
            }
        }
    }


     function getTemplate(obj){                            //  模板函数，生成结构
        var template = document.querySelector("#template"),
            ctx = template.content,
            img = ctx.querySelector("img"),
            p = ctx.querySelectorAll("p");
            img.src="http://y.gtimg.cn/music/photo_new/T002R300x300M000"+obj.album_mid+".jpg?max_age=2592000";
            img.alt=obj.album_name;
            p[0].innerHTML = obj.album_name ;
            p[1].innerHTML = obj.singer_name ;
            p[2].innerHTML = obj.public_time ;

            var ct = document.getElementsByClassName("content");
            var clone = document.importNode(ctx, true);
            ct[0].appendChild(clone);
    }
    
 
    
      // 隔离公用代码
    window.onload = function(){
	///设置大div的宽度自适应.
	!(function(){
			var SW = window.screen.width;///屏幕宽度.
			var SH = window.screen.height;///屏幕高度.
			var DW = document.documentElement.clientWidth;///文档宽度.
			var DH = document.documentElement.clientHeight;///文档高度.
			var OEWidth = document.getElementsByClassName("EWidth");///设置自适应宽度的class.
			if(DW <= SW * 0.87){
					for(var i = 0;i < OEWidth.length;i++){
						document.getElementsByClassName("EWidth")[i].style.width = "100%";
					};
				}else{
					for(var i = 0;i < OEWidth.length;i++){
						document.getElementsByClassName("EWidth")[i].style.width = "87%";
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
			});
		}());
	///设置大div的宽度自适应.
};





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
				Starimg.src = "./img/star.png";
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
					if((Top + starHeight) > dHeight || Left < 0 || Left > 1366){///流星大于屏幕高时,设置他的透明度为0.
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
	!function(){
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
		}();
		///顶部li效果
		!function(){
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
		}();
///设置大div的宽度自适应结束,顶部.








	///footer底部内容.
	!function(){
		var oFooter = document.getElementsByTagName("footer")[0];
//		oFooter.style.marginTop = parseInt(document.getElementsByTagName("header")[0].style.height) + 20 + "px";///距离顶部的margin值.
		oFooter.style.height = document.documentElement.clientHeight * 0.72 + "px";///设置底部footer的高度.
		var footTitle = oFooter.children[0].getElementsByTagName("h3");///设置底部三个H3的line-height值.
		for(var i = 0;i < footTitle.length;i++){
			footTitle[i].style.lineHeight = getComputedStyle(footTitle[i],false).height;
		};
	}()
	///footer底部内容.
};