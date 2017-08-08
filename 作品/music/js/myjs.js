window.onload = function() {

    document.onselectstart = new Function("event.returnValue=false"); ///禁止复制.
    /* 获取登录信息 */
    if (localStorage.getItem("username") != undefined) {
        // $(".headerRight a", 0)[0].innerHTML = localStorage.getItem("username");
        $(".headerRight a", 0)[0].setAttribute("data-val", localStorage.getItem("username"));
    }
    // console.log(document.documentElement.clientWidth);
    ///设置大div的宽度自适应开始,顶部.
    var LiIndex = [0];
    ///流星.
    ! function() {
        var oStarbox = document.getElementsByClassName("starBox")[0]; ///流星的父元素盒子.
        var dHeight = document.documentElement.clientHeight; ///屏幕的高度.
        var dWidth = document.documentElement.clientWidth; ///屏幕的宽度.
        var starHeight = parseInt(getComputedStyle(oStarbox.children[0], false).height); ///流星的高度.
        var starWidth = parseInt(getComputedStyle(oStarbox.children[0], false).width); ///流星的宽度.
        setInterval(function() {
            var starNum = Math.ceil(Math.random() * 5);
            for (var k = 0; k < starNum; k++) {
                var Star = document.createElement("div");
                var Starimg = document.createElement("img");
                Star.className = "star";
                Star.style.top = 0;
                Starimg.src = "./img/star.png";
                Star.appendChild(Starimg);
                oStarbox.appendChild(Star);
            };
            for (var i = 0; i < oStarbox.children.length; i++) {
                var initLeft = Math.floor(Math.random() * (dWidth - starWidth)) + dWidth / 2; ///初始left值.
                var initTop = Math.ceil(Math.random() * (dHeight - starHeight)) + starHeight; ///初始top值.
                initLeft > dWidth ? initLeft = dWidth - starWidth : initLeft; ///流星left大于屏幕宽时,等于left等于屏幕宽减去流星的宽度.
                for (var j = 0; j < oStarbox.children.length; j++) { ///内判断,当流星之间的left小于流星宽度的一半时,他的left加上流星宽度的一半.
                    if (Math.abs(parseInt(getComputedStyle(oStarbox.children[j], false).left) - parseInt(getComputedStyle(oStarbox.children[i], false).left)) < starWidth ) {
                        var newLeft = parseInt(getComputedStyle(oStarbox.children[j], false).left)
                        oStarbox.children[j].style.left = newLeft + starWidth / 2 + "px";
                    };
                };
                oStarbox.children[i].style.left = initLeft + "px"; ///初始left值.
                oStarbox.children[i].style.top = -initTop + "px"; ///初始top值.
            };
        }, 5000);
        var Top = 0;
        var Left = 0;
        if (oStarbox.children.length) {
            clearInterval(timer); ///每次运行前先清除定时器.
            var timer = setInterval(function() {
                for (var i = 0; i < oStarbox.children.length; i++) { ///由于有多条流星,所有每次先获取该流星的left和top值,再在原有基础上自减或自增.
                    Left = parseInt(getComputedStyle(oStarbox.children[i], false).left);
                    Top = parseInt(getComputedStyle(oStarbox.children[i], false).top);
                    Left--;
                    Top++;
                    oStarbox.children[i].style.top = Top + "px";
                    oStarbox.children[i].style.left = Left + "px";
                    if ((Top + starHeight) > dHeight || Left < 0 || Left > 1366) { ///流星大于屏幕高时,设置他的透明度为0.
                        oStarbox.children[i].style.opacity = 0;
                    };
                    if (getComputedStyle(oStarbox.children[i], false).opacity == "0") { ///当流星的透明度为0时,删除该流星.
                        oStarbox.children[i].remove();
                    };
                };
            }, 1)
        };
    }();
    ///流星结束.

    /* 点击登录按钮 */
	$(".headerRight a",0)[0].addEventListener("click",function(){
        var Boo = this.getAttribute("data-val");
		if(Boo == "登陆"){
			return ;
		};
		localStorage.setItem("url",window.location.href);
		window.location.href = "sign.html";
	});
	/**/

    ! function() {
        var SW = window.screen.width; ///屏幕宽度.
        var SH = window.screen.height; ///屏幕高度.
        var DW = document.documentElement.clientWidth; ///文档宽度.
        var DH = document.documentElement.clientHeight; ///文档高度.
        var OHeader = document.getElementsByTagName("header")[0];
        OHeader.style.height = DH * 0.21 + "px"; ///设置顶部的高度.
        var OEWidth = document.getElementsByClassName("EWidth"); ///设置自适应宽度的class.
        var OHeaderMiddle1 = document.getElementsByClassName("headerMiddle")[0];
        OHeaderMiddle1.style.lineHeight = getComputedStyle(OHeaderMiddle1, false).height;
        document.getElementsByClassName("headerRight")[0].children[0].style.lineHeight = getComputedStyle(document.getElementsByClassName("headerMiddle")[0], false).height;
        var OHeaderRight1 = document.getElementsByClassName("headerRight")[0].getElementsByTagName("p");
        OHeaderRight1[0].children[0].style.lineHeight = getComputedStyle(OHeaderRight1[0].children[0], false).height;
        OHeaderRight1[1].children[0].style.lineHeight = getComputedStyle(OHeaderRight1[1].children[0], false).height;
        OHeaderRight1[0].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[0].children[0], false).height) * 0.9 + "px";
        OHeaderRight1[1].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[1].children[0], false).height) * 0.9 + "px";
        var OHeaderMiddle = document.getElementsByClassName("headerMiddle")[0].children[0].children; ///获取顶部li.
        for (var i = 0; i < OEWidth.length; i++) { //设置他的最小宽度
            document.getElementsByClassName("EWidth")[i].style.minWidth = (SW * 0.87) * 0.81 + "px";
        };
        if (DW <= SW * 0.87) {
            for (var i = 0; i < OEWidth.length; i++) {
                document.getElementsByClassName("EWidth")[i].style.width = "100%";
            };
        };
        window.addEventListener("resize", function(e) {
            DW = document.documentElement.clientWidth;
            if (DW <= SW * 0.87) {
                for (var i = 0; i < OEWidth.length; i++) {
                    document.getElementsByClassName("EWidth")[i].style.width = "100%";
                };
            } else {
                for (var i = 0; i < OEWidth.length; i++) {
                    document.getElementsByClassName("EWidth")[i].style.width = "87%";
                };
            };
            ///监听窗口改变时li   ----bug 需要调整
            document.getElementsByClassName("BgGreen")[0].style.left = LiIndex[0] * parseInt(getComputedStyle(document.getElementsByClassName("headerMiddle")[0].children[0].children[0], false).width) + "px";
            OHeaderRight1[0].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[0].children[0], false).height) * 0.9 + "px";
            OHeaderRight1[1].children[0].style.marginTop = parseInt(getComputedStyle(OHeaderRight1[1].children[0], false).height) * 0.9 + "px";
        });
    }();
    ///顶部li效果
    ! function() {
        var OHeaderMiddle = document.getElementsByClassName("headerMiddle")[0].children[0].children; ///获取顶部li.
        for (let i = 0; i < OHeaderMiddle.length - 1; i++) {
            OHeaderMiddle[i].addEventListener("mouseover", function() {
                LiIndex.push(i);
                document.getElementsByClassName("BgGreen")[0].style.left = i * parseInt(getComputedStyle(this, false).width) + "px";
            });
        };
        var OHeaderRight = document.getElementsByClassName("headerRight")[0].children;
        OHeaderRight[1].children[0].addEventListener("mouseover", function() {
            this.style.transform = "translateZ(-" + getComputedStyle(this, false).width + ") rotateY(-90deg)";
        });
        OHeaderRight[1].children[0].addEventListener("mouseout", function() {
            this.style.transform = "translateZ(0px) rotateY(0deg)";
        });
        OHeaderRight[2].children[0].addEventListener("mouseover", function() {
            this.style.transform = "translateZ(-" + getComputedStyle(this, false).height + ") rotateX(-90deg)";
        });
        OHeaderRight[2].children[0].addEventListener("mouseout", function() {
            this.style.transform = "translateZ(0px) rotateX(0deg)";
        });
        document.getElementsByTagName("nav")[0].getElementsByTagName("ul")[0].style.lineHeight = getComputedStyle(document.getElementsByTagName("nav")[0], false).height;

        ///搜索框点击效果 .
        var oNav = document.getElementsByTagName("nav")[0];
        var searchdefault = true;
        oNav.children[1].children[1].addEventListener("click", function() {
            if (searchdefault) {
                oNav.children[1].style.width = 30 + "%";
                oNav.children[0].style.width = 65 + "%";
                this.style.width = 10 + "%";
                this.previousElementSibling.style.display = "block";
                searchdefault = false;
            } else {
                oNav.children[1].style.width = 4 + "%";
                oNav.children[0].style.width = 95 + "%";
                this.style.width = 100 + "%";
                this.previousElementSibling.style.display = "none";
                searchdefault = true;
            };
        });
    }();
    ///设置大div的宽度自适应结束,顶部.

    //main_banner开始:
    ! function() {
        var i = 0;
        var banner1Ul = document.querySelector('.main_banner>ul');
        var banner1Li = document.querySelectorAll('.main_banner>ul>li');
        var move = function() {
            if (i >= 5) {
                clearInterval(timer);
                banner1Ul.style = "animation: zhuan 21s linear infinite";
            }
            banner1Li[i].style = "transform:rotateY(" + i * 60 + "deg) translateZ(300px)";
            i++;
        }
        var timer = setInterval(move, 1000);
    }()
    //main_banner结束

    //banner2开始：
    ! function() {
        var banner2Ul = document.querySelector(".banner2>ul");
        var banner2Li = document.querySelectorAll(".banner2>ul>li");
        for (var j = 0; j < banner2Li.length; j++) {
            banner2Li[j].addEventListener("mouseleave", function() {
                for (var i = 0; i < banner2Li.length; i++) {
                    banner2Li[i].style.left = 5 + 15 * i + "%";
                }
            })
            banner2Li[j].index = j;
            banner2Li[j].addEventListener("mouseover", function() {
                var indexs = this.index;
                for (var i = 0; i < banner2Li.length; i++) {
                    if (i <= indexs) {
                        banner2Li[i].style.left = 5 + 8 * i + "%";
                    } else {
                        banner2Li[i].style.left = 47 + 8 * i + "%";
                    }
                }
            })
        }
    }()

    //banner2结束



    //排行榜开始：
    var oli = document.querySelectorAll(".music-rank-main>li");

    oli[0].addEventListener("mouseenter", function() {
        this.childNodes[1].style.animation = "falled1 1s 1";
        this.childNodes[1].style.boxShadow = "0 0 20px 5px white inset";
        this.childNodes[1].style.transformOrigin = " 0 100%";
    })
    oli[0].addEventListener("mouseleave", function() {
        this.childNodes[1].style.animation = "";
        this.childNodes[1].style.boxShadow = "";
    })
    oli[1].addEventListener("mouseenter", function() {
        this.childNodes[1].style.animation = "falled2 1s 1";
        this.childNodes[1].style.boxShadow = "0 0 20px 5px white inset";
        this.childNodes[1].style.transformOrigin = " 0 0";
    })
    oli[1].addEventListener("mouseleave", function() {
        this.childNodes[1].style.animation = "";
        this.childNodes[1].style.boxShadow = "";
    })
    oli[2].addEventListener("mouseenter", function() {
        this.childNodes[1].style.animation = "falled3 1s 1";
        this.childNodes[1].style.boxShadow = "0 0 20px 5px white inset";
        this.childNodes[1].style.transformOrigin = " 100% 0";
    })
    oli[2].addEventListener("mouseleave", function() {
        this.childNodes[1].style.animation = "";
        this.childNodes[1].style.boxShadow = "";
    })
    oli[3].addEventListener("mouseenter", function() {
        this.childNodes[1].style.animation = "falled4 1s 1";
        this.childNodes[1].style.boxShadow = "0 0 20px 5px white inset";
        this.childNodes[1].style.transformOrigin = " 0 0";
    })
    oli[3].addEventListener("mouseleave", function() {
        this.childNodes[1].style.animation = "";
        this.childNodes[1].style.boxShadow = "";
    })


    //排行榜结束

    //banner3开始：
    ! function() {
        var banner3_page = document.querySelector(".banner3_page");
        var banner3_li = document.querySelectorAll(".banner3 li");
        var flag = true;
        banner3_page.addEventListener("click", function() {
            if (flag) {
                for (var i = 0; i < 8; i++) {
                    if (i >= 4) {
                        banner3_li[i].style.transform = "scale(0.01) rotateZ(" + i % 4 * 90 + "deg)";
                        banner3_li[i].style.opacity = 0;
                    } else {
                        banner3_li[i].style.transform = "scale(1) rotateZ(" + i % 4 * 90 + "deg)";
                        banner3_li[i].style.opacity = 1;
                    }
                }
                flag = false;
            } else {
                for (var i = 0; i < 8; i++) {
                    if (i < 4) {
                        banner3_li[i].style.transform = "scale(0.01) rotateZ(" + i % 4 * 90 + "deg)";
                        banner3_li[i].style.opacity = 0;
                    } else {
                        banner3_li[i].style.transform = "scale(1) rotateZ(" + i % 4 * 90 + "deg)";
                        banner3_li[i].style.opacity = 1;
                    }
                }
                flag = true;
            }
        })
        for (var d = 0; d < banner3_li.length; d++) {
            banner3_li[d].index = d;
            banner3_li[d].addEventListener("mouseover", function() {
                this.style.transform = "rotateZ(0deg)"
            });
            banner3_li[d].addEventListener("mouseout", function() {
                this.style.transform = "rotateZ(" + this.index % 4 * 90 + "deg)";
            })
        }
    }();
    //banner3结束	

    //mv开始：
    (function() {
        var oli = document.querySelectorAll(".mv-kind-main>li"),
            select = document.querySelectorAll(".mv-kind>li"),
            arr = {
                0: [{
                        url: "./img/all/0.jpg",
                        content: "曾经守候"
                    },
                    {
                        url: "./img/all/1.jpg",
                        content: "桃花诺"
                    },
                    {
                        url: "./img/all/2.jpg",
                        content: "屋檐下的浪漫"
                    },
                    {
                        url: "./img/all/3.jpg",
                        content: "悟空"
                    },
                    {
                        url: "./img/all/4.jpg",
                        content: "最后一次"
                    },
                    {
                        url: "./img/all/5.jpg",
                        content: "清白之年 "
                    },
                    {
                        url: "./img/all/6.jpg",
                        content: "给自己的信"
                    },
                    {
                        url: "./img/all/7.jpg",
                        content: "子夜歌"
                    }
                ],
                1: [{
                        url: "./img/east/0.jpg",
                        content: "凉凉"
                    },
                    {
                        url: "./img/east/1.jpg",
                        content: "望"
                    },
                    {
                        url: "./img/east/2.jpg",
                        content: "最后一秒"
                    },
                    {
                        url: "./img/east/3.jpg",
                        content: "曾经守候"
                    },
                    {
                        url: "./img/east/4.jpg",
                        content: "最后一次"
                    },
                    {
                        url: "./img/east/5.jpg",
                        content: "屋檐下的浪漫"
                    },
                    {
                        url: "./img/east/6.jpg",
                        content: "何以修仙"
                    },
                    {
                        url: "./img/east/7.jpg",
                        content: "给自己的信"
                    }
                ],
                2: [{
                        url: "./img/west/0.jpg",
                        content: "Speak To A Girl"
                    },
                    {
                        url: "./img/west/1.jpg",
                        content: "Periscope"
                    },
                    {
                        url: "./img/west/2.jpg",
                        content: "桜色ダイアリー "
                    },
                    {
                        url: "./img/west/3.jpg",
                        content: "Love Sick"
                    },
                    {
                        url: "./img/west/4.jpg",
                        content: "願いごとの持ち腐れ"
                    },
                    {
                        url: "./img/west/5.jpg",
                        content: "#いいね！"
                    },
                    {
                        url: "./img/west/6.jpg",
                        content: "Tired"
                    },
                    {
                        url: "./img/west/7.jpg",
                        content: "LONELY"
                    }
                ]
            };
        for (let j = 0; j < select.length; j++) {
            select[j].addEventListener("click", function() {
                for (var i = 0; i < select.length; i++) {
                    select[i].children[0].className = "";
                }
                select[j].children[0].className = "focuson";
                inputMv(arr, j);
            })
        }

        function inputMv(arr, kind) {
            for (var i = 0; i < oli.length; i++) {
                oli[i].style.background = "url(" + arr[kind][i].url + ")";
                oli[i].children[0].innerHTML = arr[kind][i].content;
            };
        }
        inputMv(arr, "0");
    })()
    //mv结束

    ///footer底部内容.
    ! function() {
        var oFooter = document.getElementsByTagName("footer")[0];
        //		oFooter.style.marginTop = parseInt(document.getElementsByTagName("header")[0].style.height) + 20 + "px";///距离顶部的margin值.
        oFooter.style.height = document.documentElement.clientHeight * 0.72 + "px"; ///设置底部footer的高度.
        var footTitle = oFooter.children[0].getElementsByTagName("h3"); ///设置底部三个H3的line-height值.
        for (var i = 0; i < footTitle.length; i++) {
            footTitle[i].style.lineHeight = getComputedStyle(footTitle[i], false).height;
        };
    }()
    ///footer底部内容.


};