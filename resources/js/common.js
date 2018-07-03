var bodyScrollTop;

function init() {
    $(document).ready(function () {

        var $choice_ul = $(".choice_lang ul"), $arrow = $(".arrowBtn");
        var $html = $('html'), $body = $('body'), $pop2 = $('#pop-apps2'), $pop2_cont = $("#pop-content2");
        var $topbtn = $(".gotop"), $gnb = $("#gnb"), $navImg = $('.navBtn img');
        // ie
        if ((navigator.appName == 'Netscape' && navigator.userAgent.search('Trident') != -1) || (agent.indexOf("msie") != -1)) {
            $(".choice_lang_mobile").addClass("choice_lang_mobile ieversion");
            // $(".choice_lang_mobile").css("display", "none");
        }

        $(".navBtn").toggle(function () {
            $navImg.attr('src', imgPath + '/images2/drawer_hx2.png');
            $gnb.slideDown(400);
        }, function () {
            $navImg.attr('src', imgPath + '/images2/drawerx2.png');
            $gnb.slideUp(400);
        });

        // 1708 iOS 버전 런칭 추가 script
        $('#downBtn').click(function (e) {
            e.preventDefault();
            var _position = $('#footer').offset();
            $('html, body').animate({scrollTop: _position.top}, 1000);
        });

        var current = 0;
        var screenSize = $(window).width();

        $(window).resize(function () {
            screenSize = $(window).width();
            if (screenSize >= 1007) {
                current = 1;
                $gnb.show();
            }
            if (current == 1 && screenSize < 1007) {
                current = 0;
                $gnb.hide();
            }
        });
        $(window).resize();
        /*
         * 2015-04-10 Tab 이동 풋터영역
         * **************************************************************************************
         */
        $("#selectLang").click(function () {
            var arrowImg = $arrow.attr("src");
            if (arrowImg.indexOf("up") != -1) { // up
                $arrow.attr("src", imgPath + "/images2/arrow_down.png");
            } else { // down
                $arrow.attr("src", imgPath + "/images2/arrow_up.png");
            }

            $choice_ul.toggle();

            return false;
        }).focus(function () {
            $choice_ul.css({
                'display': 'inline-block;'
            });
        }).blur(function () {
            $(".choice_lang ul li:first-child a").attr('tabindex', '6').show().focus();
        }); // Select Language : 2015-04-10 선택자 수정 및
        // return 추가
        /*
         * 2015-04-10
         * **************************************************************************************
         */

        $choice_ul.mouseleave(function () {
            $arrow.attr("src", imgPath + "/images2/arrow_down.png");
            $(this).toggle();
        });

        switch (pageCode) {
            case "noticeDetail":
            case "notice":
                $gnb.find("a").eq(2).addClass("active");
                break;
            case "partner":
                $gnb.find("a").eq(1).addClass("active");
                break;
            case "intro":
            default:
                $gnb.find("a").eq(0).addClass("active");
                break;
        }

        $topbtn.click(function (e) {
            e.preventDefault();
            window.scrollTo(0, 0);
            /*
             * $("html, body").animate({ "scrollTop" : "0" });
             */
        });
        /*
         * 2015-04-10
         * **************************************************************************************
         */

        $(".choice_lang ul li:first-child a").blur(function () {
            $('.choice_lang ul li:nth-child(2) a').focus();
        });
        $(".choice_lang ul li:last-child a").blur(function () {
            $choice_ul.hide();
        }); // Tab Key Runing

        languageChangeSetting();

        // faq layer open
        $(".faqlayer").click(function () {

            $body.removeAttr("style");

            bodyScrollTop = $body.scrollTop();

            $pop2.css('background-color', '#fafafa').fadeIn().css({
                'overflow-y': 'scroll'
            });

            if (useParallax == 0) {
                $body.delay(800).css({
                    'position': 'fixed'
                });
                $html.css({
                    'overflow-y': 'hidden'
                });

            } else {
                $html.css({
                    'overflow-y': 'hidden'
                });
            }

            ga('send', 'event', 'faq_layer', 'faq');
            $pop2_cont.empty();

            $pop2_cont.load("/websvc/intro/faqLayer.do", {
                "imgResize": imgResize
            }, function () {
                // $('#pop-apps2 ul
                // li').attr('tabindex',
                // '10').show();
            });

            return false;
        });

        // email link - faq layer oepn : 2015-09-08
        if (tabs != "") {

            $body.removeAttr("style");

            bodyScrollTop = $body.scrollTop();

            $pop2.addClass('faq_bg').fadeIn().css({
                'overflow-y': 'scroll'
            });

            if (useParallax == 0) {
                $body.delay(800).css({
                    'position': 'fixed'
                });
                $html.css({
                    'overflow-y': 'hidden'
                });

            } else {
                $html.css({
                    'overflow-y': 'hidden'
                });
            }

            ga('send', 'event', 'faq_layer_open', 'faq_open');

            $pop2_cont.empty();

            $pop2_cont.load("/websvc/intro/faqLayer.do", {
                "faqcate": tabs
            }, function () {
                if (tabs == "3") {
                    selectFaq('D', '3');
                } else {
                    selectFaq('A', '1');
                }
            });
            return false;
        }

        // 2015 12 04 updated
        $('#changePolicyForm_mobile span, #changePolicyForm_mobile img').click(function () {
            $(this).parent('#changePolicyForm_mobile').children("ul").toggle();
        });
        /*
         *
         * if (expand != "") { var $pop = $('#pop-apps'), $pop_cont =
         * $("#pop-content"); $pop.removeClass('accCasebg');
         * $pop.removeClass('faq_bg'); $body.removeAttr("style");
         *
         * bodyScrollTop = $body.scrollTop();
         *
         * $pop.fadeIn().css({'overflow-y': 'scroll'}); if (useParallax == 0) {
         * $body.delay(800).css({'position': 'fixed'}); $html.css({'overflow-y':
         * 'hidden'}); } else { setTimeout(function () {
         * $html.css({'overflow-y': 'hidden'}); }, 400); }
         *
         *
         * ga('send', 'event', 'learn more', 'More');
         *
         * $pop_cont.empty(); $pop_cont.load("/websvc/intro/learnMoreView.do" ,
         * {"imgResize": 'expand'} , function () { $('#pop-apps ul
         * li').attr('tabindex', '0').show(); } ); }
         */

        if (policy != "") {
            openConditionsLayerPop('policy', '');
        }

        $(document).scroll(function () {
            $topbtn.show();
            if ($(this).scrollTop() == 0) {
                $topbtn.hide();
            } else {
                $topbtn.show();
            }
        });

    });
}

// mobile select language setting
function languageChangeSetting() {
    $("#languageChangeMobile > option[value=" + locale + "]").attr("selected", "true");

    $("#languageChangeMobile").change(function () {
        $("#languageChangeMobile option:selected").each(function () {
            var localeCode = $(this).val();
            selectLanguage(localeCode);
        });
    });
}

// select language
function selectLanguage(changeLocale) {

    var languageCode = changeLocale.substr(0, 2);
    var countyCode = changeLocale.substr(3, 4);
    var changeLang = "English_us";

    if ("zh_CN" == changeLocale) {
        changeLang = "Chinese";
    } else if ("en_US" == changeLocale) {
        changeLang = "English_us";
    } else if ("en_GB" == changeLocale) {
        changeLang = "English_uk";
    } else if ("ko_KR" == changeLocale) {
        changeLang = "Korean";
    } else if ("es_ES" == changeLocale) {
        changeLang = "Spanish";
    } else if ("fr_FR" == changeLocale) {
        changeLang = "French";
    } else if ("it_IT" == changeLocale) {
        changeLang = "Italian";
    } else if ("de_DE" == changeLocale) {
        changeLang = "German";
    } else if ("ru_RU" == changeLocale) {
        changeLang = "Russian";
    } else if ("ja_JP" == changeLocale) {
        changeLang = "Japanese";
    }

    ga('send', 'event', 'language', changeLang);

    var pgCode = (pageCode == 'noticeDetail') ? 'id' + pageId : pageCode;

    $('#cntyCd').attr('value', countyCode);
    $('#langCd').attr('value', languageCode);
    $('#pageCd').attr('value', pgCode);

    var changeLangForm = $('#changeLangForm');

    changeLangForm.attr('action', '/websvc/etc/changeLanguage.do');
    changeLangForm.submit();
}

// Conditions
function openConditionsLayerPop(requestType, _version) {

    var $html = $('html'), $body = $("body"), $conditions = $('#conditions'),
        $conditions_cont = $("#conditions-content");

    bodyScrollTop = $body.scrollTop();
    $conditions.addClass('accCasebg').fadeIn().css({
        'overflow-y': 'scroll'
    });
    if (useParallax == 0) {
        $body.delay(800).css({
            'position': 'fixed'
        });
        $html.css({
            'overflow-y': 'hidden'
        });
    } else {
        setTimeout(function () {
            $html.css({
                'overflow-y': 'hidden'
            });
        }, 400);
    }

    if (_version == "") _version = "policy_20171123";

    var sel_title = getPolicyTitle(_version);

    $conditions_cont.empty();
    $conditions_cont.load("/websvc/etc/conditionsView.do", {
        "requestType": requestType,
        "verSion": _version
    }, function () {
        $(".pclose").click(function (e) {
            e.preventDefault();
            $conditions.fadeOut();
            $body.removeAttr("style");

            if (useParallax == 0) {
                $("html, body").scrollTop(bodyScrollTop);
            }
            $html.css({
                'overflow-y': 'scroll'
            });

            bodyScrollTop = 0;

            return false;
        });
        // Popup Close Setting
    });
    $("#m_policy_title").html(sel_title);
    $("#changePolicyForm_mobile ul").attr("style", "display:none;");
    if (requestType == 'terms') {
        $(".policy_select").hide();
    } else {
        $(".policy_select").show();
    }
}

function getPolicyTitle(_version) {
    var sel_title = "";
    switch (_version) {
        case "policy_20171123":
            sel_title = "2017년 11월 23일 시행일자 기준";
            break;
        case "policy_20170706":
            sel_title = "2017년 07월 06일 시행일자 기준";
            break;
        case "policy_20170405_1":
            sel_title = "2017년 04월 05일 시행일자 기준";
            break;
        case "policy_20161213":
            sel_title = "2016년 12월 13일 시행일자 기준";
            break;
        case "policy_20161005_v4":
            sel_title = "2016년 10월 05일 시행일자 기준";
            break;
        case "policy_20160810_v4":
            sel_title = "2016년 08월 10일 시행일자 기준";
            break;
        case "policy_20160112_v4":
            sel_title = "2016년 01월 12일 시행일자 기준";
            break;
        case "policy_20150521_v4":
            sel_title = "2015년 05월 21일 시행일자 기준";
            break;
        case "policy_20140327_v4":
            sel_title = "2014년 03월 27일 시행일자 기준";
            break;
        default:
            break;
    }
    return sel_title;
}

function openConditions(requestType, _version) {

    if (_version == "") _version = "policy_20171123";
    var sel_title = getPolicyTitle(_version);
    var $conditions_cont = $("#conditions-content");

    $conditions_cont.empty();
    $conditions_cont.load("/websvc/etc/conditionsView.do", {
        "requestType": requestType,
        "verSion": _version
    }, function () {
        $(".pclose").hide();
    });
    $("#m_policy_title").html(sel_title);
    $("#changePolicyForm_mobile ul").attr("style", "display:none;");
}

function intro() {
    $(document).ready(function (){
        var $slider = $('.svc-bxslider').bxSlider({
            mode: 'horizontal',
            controls: true,
            touchEnabled: true,
			oneToOneTouch: false
        });
		
		var $slider = $('.svc-to-bxslider').bxSlider({
            mode: 'horizontal',
            controls:false,
			pager:false,
            touchEnabled:false,
			auto:true,
			speed:500,
			pause:2000,
			slideWidth : 398,
			slideMargin : 0
        });
    });
}

function notice() {
    var noticePage = 1, eventPage = 1;
    $(document).ready(function () {
        var $notices = $(".noticeArea ul"), $events = $(".eventArea ul"), $noticeMore = $(".noticeArea .moreBtn"),
            $eventMore = $(".eventArea .moreBtn");
        var alertmessage = $("#alert-message").text();

        //expireToDate();

        $noticeMore.click(function () {

            if ($noticeMore.hasClass("disabled"))
                return;

            $noticeMore.addClass("disabled");
            $("<div>").load("/websvc/intro/noticeView.do", {
                "imgResize": imgResize,
                "page": noticePage
            }, function () {
                var $this = $(this);
                $noticeMore.removeClass("disabled");
                if ($this.children("li").length > 0) {
                    $notices.append($this.html());
                    noticePage++;
                    setDisplayMoreButton($notices, $noticeMore);
                } else {
                    $noticeMore.hide();
                    alert(alertmessage);
                }
            });
        });
        $eventMore.click(function () {

            if ($eventMore.hasClass("disabled"))
                return;

            $eventMore.addClass("disabled");
            $("<div>").load("/websvc/intro/eventView.do", {
                "imgResize": imgResize,
                "page": eventPage
            }, function () {
                var $this = $(this);
                $eventMore.removeClass("disabled");
                if ($this.children("li").length > 0) {
                    $events.append($this.html());
                    eventPage++;
                    setDisplayMoreButton($events, $eventMore);
                    //expireToDate();
                } else {
                    $eventMore.hide();
                    alert(alertmessage);
                }
            });
        });

        setDisplayMoreButton($notices, $noticeMore);
        setDisplayMoreButton($events, $eventMore);

        function setDisplayMoreButton($list, $btn) {
            if ($list.children("li").length % 3 != 0) {
                $btn.hide();
            }
        }

        /*
                function expireToDate() {
                    var $link = $(".event_end > a");
                    $link.click(function(e){
                        e.preventDefault();
                    });
                }
        */
    });
}

function noticeView() {
    $(document).ready(function () {
        var top = $("#position-anchor").offset().top;
        window.scrollTo(0, top);
    });
}

function partner() {
    $(document).ready(function () {
        var $tabBtn = $(".tabArea .tabBtn > a"),
            $tabContent = $(".tabContentArea");

        $tabContent.eq(0).show();

        $tabBtn.click(function (e) {
            e.preventDefault();
            var index = $tabBtn.index(this),
                $this = $(this);

            if ($this.hasClass("on")) return;

            $tabContent.hide();
            $tabContent.eq(index).show();
            $tabBtn.removeClass("on");
            $(this).addClass("on");
        });
    });
}

/*
 function noticeDetail(key) {

 var $html = $('html'), $body = $('body'), $pop2 = $('#pop-apps2'), $pop2_cont = $("#pop-content2");

 bodyScrollTop = $body.scrollTop();

 // ga('send', 'event', 'faq_layer', 'faq');

 $pop2.css({
 'background-color': '#fafafa',
 'overflow-y': 'scroll'
 }).fadeIn();

 $pop2_cont.html('');

 $pop2_cont.load("/websvc/intro/noticeDetailView.do", {
 "imgResize": imgResize,
 "noticeKey": key
 }, function () {
 $('#noticeDetailHtmlText').imagesLoaded(function () {
 $html.css({
 'overflow-y': 'hidden'
 });

 if (useParallax == 0) {
 $body.css({
 'position': 'fixed'
 });
 }
 });
 /!*
 * if ($.browser.safari){
 * $('#noticeDetailHtmlText').imagesLoaded(function(){ $html.css({
 * 'overflow-y' : 'hidden' });
 *
 * if (useParallax == 0) { $body.css({ 'position' : 'fixed' }); }
 * $("#temp").text($("#noticeDetailHtmlText").outerHeight()); }); }else{
 *
 * $html.css({ 'overflow-y' : 'hidden' });
 *
 * if (useParallax == 0) { $body.css({ 'position' : 'fixed' }); }
 * $("#temp").text($("#noticeDetailHtmlText").outerHeight()); }
 *!/
 $(".pclose_faq").click(function (e) {

 e.preventDefault();

 $pop2.removeClass('accCasebg');
 $body.removeAttr("style");

 if (useParallax == 0) {
 $("html, body").scrollTop(bodyScrollTop);
 }
 $html.css({
 'overflow-y': 'scroll'
 });

 bodyScrollTop = 0;
 $pop2.fadeOut();
 });

 });
 }
 */
/*
 function setLayerStyle(bool) {

 var $html = $('html'), $body = $('body'), $pop2 = $('#pop-apps2'), $pop2_cont = $("#pop-content2");

 if (bool == true) {

 bodyScrollTop = $body.scrollTop();

 $html.css({
 'overflow-y': 'hidden'
 });

 if (useParallax == 0) {
 $body.css({
 'position': 'fixed'
 });
 }
 } else {

 $body.removeAttr("style");
 if (useParallax == 0) {
 $("html, body").scrollTop(bodyScrollTop);
 }

 $html.css({
 'overflow-y': 'scroll'
 });
 }
 }
 */
