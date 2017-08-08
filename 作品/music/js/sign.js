window.onload = function() {
    // document.oncontextmenu = new Function("event.returnValue=false"); ///禁止复制.
    document.onselectstart = new Function("event.returnValue=false"); ///禁止复制.
    document.body.style.height = document.documentElement.clientHeight + "px";
    /* 左侧 */
    var oList = document.getElementsByClassName("leftFixed")[0];
    var oImg = oList.getElementsByTagName("img");
    var oImgWidth = getStyle(oImg[0], "width");
    for (var i = 0; i < oImg.length; i++) {
        oImg[i].style.height = oImgWidth * (680 / 1000) + "px";
    };
    autoWidth();
    window.addEventListener("resize", function() {
        autoWidth();
    });

    function autoWidth() { ///更新右侧的宽度.
        if (document.documentElement.clientWidth >= 1105) {
            $(".formBox")[0].style.width = document.documentElement.clientWidth - 480 + "px";
            $(".form")[0].style.margin = "auto";
            oList.parentNode.style.left = "0px";
        } else if (document.documentElement.clientWidth <= 1105 && document.documentElement.clientWidth >= 996) {
            $(".formBox")[0].style.width = "780px";
            $(".form")[0].style.margin = "auto";
            oList.parentNode.style.left = "-200px";
        } else if (document.documentElement.clientWidth < 996) {
            $(".formBox")[0].style.width = document.documentElement.clientWidth + "px";
            $(".form")[0].style.margin = "auto";
            oList.parentNode.style.left = "-480px";
        };
        if (document.documentElement.clientWidth < 600) {
            $(".formBox")[0].style.width = "600px";
            $(".form")[0].style.margin = "auto";
        }
    };

    /* 左侧轮播图 */
    ! function() {
        var i = 3;
        setInterval(bannerMove, 6000);

        function bannerMove() {
            i %= 4;
            for (var j = 0; j < $(".leftFixed li").length; j++) {
                if (j != i) {
                    $(".leftFixed li")[j].style.transition = "none";
                    $(".leftFixed li")[j].style.opacity = 1;
                    $(".leftFixed li")[j].style.zIndex = 1;
                };
            };
            $(".leftFixed li")[(i + 1) % 4].style.zIndex = 2;
            $(".leftFixed li")[i].style.zIndex = 3;
            $(".leftFixed li")[i].style.transition = "opacity 1s linear 0s";
            $(".leftFixed li")[i].style.opacity = 0;
            i++;
        };
    }()
    /* 登陆按钮 */
    for (let s = 0; s < $(".loginBox span", 0).length; s++) {
        $(".loginBox span", 0)[s].addEventListener("click", function() {
            if (s == 0 && $(".inputBox").length > 2) {
                $(".inputBox")[2].remove();
                $("form button", 0)[0].remove();
                $("form")[0].innerHTML += tel("btn");
                for (var i = 0; i < $(".inputKuang").length; i++) {
                    $(".inputKuang span", i)[0].style.display = "none";
                };
                $(".form")[0].style.height = "24rem";
                $("form button", 0)[0].innerHTML = "立即登陆";
                $("form button", 0)[0].setAttribute("data-val", "立即登陆");
                detection();
                commit();
            };
            if (s == 1 && $(".inputBox").length <= 2) {
                $("form button", 0)[0].remove();
                $("form")[0].innerHTML += tel();
                for (var i = 0; i < $(".inputKuang").length; i++) {
                    $(".inputKuang span", i)[0].style.display = "none";
                };
                $(".form")[0].style.height = "27rem";
                $("form button", 0)[0].innerHTML = "立即注册";
                $("form button", 0)[0].setAttribute("data-val", "立即注册");
                detection();
                commit();
            };
        });
    };

    function tel(btn) {
        if (btn) {
            return '<button type="submit">立即注册</button>';
        } else {
            return '<div class="inputBox"><p class="inputKuang"><input data-success="1" maxlength="11" class="floatL" type="number" placeholder="手机号码" name=""><span class="floatR"></span></p><span class="fontRed">手机号不能为空</span><p class="hint"><span><i></i>不能包括空格</span><span><i></i>长度为11个字符</span></p></div><button type="submit">立即注册</button>';
        };
    };
    /* 右侧 */
    detection();

    function detection() {
        for (let i = 0; i < $(".inputBox").length; i++) { ///input失去焦点后未写字符串的状态.
            $(".inputBox input", i)[0].addEventListener("blur", function() {
                var self = this;
                if (!this.value) {
                    this.parentNode.style.borderColor = "#FF5B5B";
                    $(".inputBox .fontRed", i)[0].style.display = "block";
                } else {
                    this.parentNode.style.borderColor = "#AAAAAA";
                };
                if (i == 0 && /\s/g.test(this.value) || !this.value) {
                    $(".inputBox .fontRed", 0)[0].innerHTML = "昵称不能为空";
                };
                if (i == 1 || i == 2) {
                    $(".inputBox .hint", i)[0].style.display = "none";
                };
                if (i == 0 && this.value && !/\s/g.test(this.value)) {
                    if ($("form button", 0)[0].getAttribute("data-val") == "立即注册") {
                        postajax.post({
                            url: "../php/sign.php",
                            stext: { name: this.value },
                            fn: function(data) {
                                if (data.reception == 1000) {
                                    $(".inputBox .fontRed", i)[0].innerHTML = "此用户已经被注册";
                                    $(".inputBox .fontRed", i)[0].style.display = "block";
                                    self.nextSibling.style.display = "none";
                                } else {
                                    self.nextSibling.style.display = "block";
                                    $(".inputBox .fontRed", i)[0].style.display = "none";
                                    self.nextSibling.style.display = "block";
                                };
                            }
                        });
                    } else {
                        if (this.value && !(/\s/g.test(this.value))) {
                            this.nextSibling.style.display = "block";
                            $(".inputBox .fontRed", i)[0].innerHTML = "用户名不能包含空格";
                            $(".inputBox .fontRed", i)[0].style.display = "none";
                        } else {
                            this.nextSibling.style.display = "none";
                            $(".inputBox .fontRed", i)[0].innerHTML = "用户名不能包含空格";
                            $(".inputBox .fontRed", i)[0].style.display = "block";
                        };
                    };
                };
                if (i == 1) {
                    var reg = /[a-zA-Z][0-9|\W]/g.test(this.value) || /[0-9][a-zA-Z|\W]/g.test(this.value) || /[\W][a-zA-Z|0-9]/g.test(this.value);
                    if (!/\s/g.test(this.value) && this.value.length > 7 && this.value.length < 17 && reg && this.value) {
                        this.nextSibling.style.display = "block";
                    } else {
                        this.nextSibling.style.display = "none";
                    };
                };
                if (i == 2) {
                    if (this.value.length == 11) {
                        this.nextSibling.style.display = "block";
                    } else {
                        this.nextSibling.style.display = "none";
                    };
                };
            });
            $(".inputBox input", i)[0].addEventListener("focus", function() {
                this.select();
                if (!this.value) {
                    this.style.borderColor = "#549DF8";
                    $(".inputBox .fontRed", i)[0].style.display = "none";
                };
                if (i == 1 || i == 2) {
                    $(".inputBox .hint", i)[0].style.display = "block";
                };
            });
            $(".inputBox input", i)[0].addEventListener("input", function() {
                if (i == 0) {
                    if (!this.value) {
                        // this.nextSibling.style.display = "none";
                    } else {
                        // this.nextSibling.style.display = "block";
                    };
                };
                if (i == 1) {
                    if (/\s/g.test(this.value)) { ///判断是否有空格.
                        $(".hint i", i - 1)[0].style.background = "url(../img/info.png) center no-repeat";
                    } else {
                        $(".hint i", i - 1)[0].style.background = "url(../img/green.png) center no-repeat";
                    };
                    if (this.value.length > 7 && this.value.length < 17) {
                        $(".hint i", i - 1)[1].style.background = "url(../img/green.png) center no-repeat";
                    } else {
                        $(".hint i", i - 1)[1].style.background = "url(../img/info.png) center no-repeat";
                    };
                    var reg = /[a-zA-Z][0-9|\W]/g.test(this.value) || /[0-9][a-zA-Z|\W]/g.test(this.value) || /[\W][a-zA-Z|0-9]/g.test(this.value);
                    if (reg) {
                        $(".hint i", i - 1)[2].style.background = "url(../img/green.png) center no-repeat";
                    } else {
                        $(".hint i", i - 1)[2].style.background = "url(../img/info.png) center no-repeat";
                    };
                } else if (i == 2) {
                    if (/\s/g.test(this.value)) { ///判断是否有空格.
                        $(".hint i", i - 1)[0].style.background = "url(../img/info.png) center no-repeat";
                    } else {
                        $(".hint i", i - 1)[0].style.background = "url(../img/green.png) center no-repeat";
                    };
                    if (this.value.length == 11) {
                        $(".hint i", i - 1)[1].style.background = "url(../img/green.png) center no-repeat";
                    } else {
                        $(".hint i", i - 1)[1].style.background = "url(../img/info.png) center no-repeat";
                    };
                };
            });
        };
    };
    commit();

    function commit() {
        $("form button")[0].addEventListener("click", function(e) {
            if (!e) var e = window.event;
            e.preventDefault();
            var sum = 0;
            var userdata = {};
            userdata.name = $("form input", 0)[0].value;
            userdata.pass = $("form input", 0)[1].value;
            if (this.getAttribute("data-val") == "立即注册") {
                for (var i = 0; i < $(".inputKuang").length; i++) {
                    if (getStyle($(".inputKuang span", i)[0], "display") == "block") {
                        sum += 1;
                    } else {
                        sum = 0;
                    };
                };
                if (sum != 3) {
                    alert("信息填写错误");
                    return false;
                };
                postajax.post({
                    url: "../php/sign.php",
                    stext: userdata,
                    fn: function(data) {
                        console.log(data);
                        if (data.reception == 1) {
                            alert("注册成功");
                            localStorage.setItem("username", userdata.name);
                            setTimeout(function() {
                                window.location.href = localStorage.getItem("url");
                            }, 2000);
                        } else {
                            alert("注册失败");
                        };
                    }
                });
            } else {
                for (var i = 0; i < $(".inputKuang").length; i++) {
                    if (getStyle($(".inputKuang span", i)[0], "display") == "block") {
                        sum += 1;
                    } else {
                        sum = 0;
                    };
                };
                if (sum != 2) {
                    alert("信息填写错误");
                    return false;
                };
                postajax.post({
                    url: "../php/login.php",
                    stext: userdata,
                    fn: function(data) {
                        if (data.reception == 1) {
                            alert("登陆成功");
                            localStorage.setItem("username", userdata.name);
                            setTimeout(function() {
                                window.location.href = localStorage.getItem("url");
                            }, 2000);
                        } else if (data.reception == 0) {
                            alert("密码错误");
                        } else if (data.reception == 1000) {
                            alert("用户不存在");
                        } else {
                            alert("未知错误");
                        };
                    }
                });
            };
        });
    };
};






function $(sendId, num) { ///获取类名,父元素的下标.
    if (!num) var num = 0;
    var reg = /^\./; ///检测是否class名.
    var reg2 = /^\#/; ///检测是否id名.
    var reg3 = /\s+[\.|\#|\w]/g;
    if (reg3.test(sendId)) {
        var reg4 = /^[\.|\#|\w](\w+)\s+[\.|\#\w](\w+)$/g;
        if (/^[\.|\#|\w](\w+)\s+(\w+)$/g.test(sendId)) {
            reg4 = /^[\.|\#|\w](\w+)\s+(\w+)$/g;
        };
        var parentIsId = /^\#\w/g.test(sendId);
        var parentIsClass = /^\.\w/g.test(sendId);
        var parentIsTag = /^\w/g.test(sendId);
        var parentClass = sendId.replace(reg4, function(index, $1, $2) {
            return $1;
        });
        var childId = /^[\#|\.\w]\w+\s+\#\w+$/g.test(sendId);
        var childClass = /^[\#|\.\w]\w+\s+\.\w+$/g.test(sendId);
        var childTag = /^[\#|\.\w]\w+\s+\w+$/g.test(sendId);
        var childName = sendId.replace(reg4, function(index, $1, $2) {
            return $2;
        });
        if (parentIsId) {
            if (childId) {
                return "禁止ID内获取ID";
            } else if (childClass) {
                return document.getElementById(parentClass).getElementsByClassName(childName);
            } else {
                var childName = sendId.replace(/^[\.|\#|\w](\w+)\s+(\w+)$/g, function(index, $1, $2) {
                    return $2;
                });
                return document.getElementById(parentClass).getElementsByTagName(childName);
            };

        } else if (parentIsClass) {
            if (childId) {
                return "禁止class内获取ID";
            } else if (childClass) {
                return document.getElementsByClassName(parentClass)[num].getElementsByClassName(childName);
            } else {
                childName = sendId.replace(/^[\.|\#|\w](\w+)\s+(\w+)$/g, function(index, $1, $2) {
                    return $2;
                });
                return document.getElementsByClassName(parentClass)[num].getElementsByTagName(childName);
            };
        } else {
            parentClass = sendId.replace(/^(\w+)\s+[\.|\#|(\w)](\w+)$/g, function(index, $1, $2) {
                return $1;
            });
            if (childId) {
                return "禁止通过获取元素来获取ID";
            } else if (childClass) {
                return document.getElementsByTagName(parentClass)[num].getElementsByClassName(childName);
            } else {
                childName = sendId.replace(/^[\.|\#|\w](\w+)\s+(\w+)$/g, function(index, $1, $2) {
                    return $2;
                });
                return document.getElementsByTagName(parentClass)[num].getElementsByTagName(childName);
            };

        };
    } else {
        if (reg.test(sendId)) {
            var getClass = sendId.replace(reg, "");
            return document.getElementsByClassName(getClass);
        } else if (reg2.test(sendId)) {
            var getId = sendId.replace(reg2, "");
            return document.getElementById(getId);
        } else {
            return document.getElementsByTagName(sendId);
        };
    };
};

function getStyle(obj, attr) {
    if (window.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    };
};