/**
 * Created by Administrator on 2016-11-29.
 */
function deeplink(queryString, locale) {

    var homeUrl = "http://shealth.samsung.com/";
    var baseUrl = homeUrl + "deepLink",
        intentUrl,
        gpUrl = "https://play.google.com/store/apps/details?id=com.sec.android.app.shealth",
        tencentUrl = "http://a.app.qq.com/o/simple.jsp?pkgname=com.sec.android.app.shealth",
        queryString = queryString || "",
        withIntent = "#Intent;scheme=http;action=android.intent.action.VIEW;category=android.intent.category.BROWSABLE;",
        package = "package=com.sec.android.app.shealth;end",
        userAgent = navigator.userAgent.toLowerCase(),
        visitedAt = new Date(),
        delay = 1000,
        expire = 2000,
        os,
        target;

    // OS 체크
    if (/android/i.test(userAgent)) {
        os = "android";
    } else if (/ipad|iphone|ipod/i.test(userAgent)) {
        os = "ios";
    } else {
        os = "etc";
        //여기에 지원되지 않는 환경 시 redirect 설정 추가
        //window.location.replace(homeUrl);
    }

    intentUrl = baseUrl.replace("http://", "intent://");

    if(queryString != "") intentUrl+="?"+queryString;

    switch(os) {
        case 'android': //안드로이드 일 경우
            if(locale == 'zh_CN') {
                target = intentUrl + withIntent;

                replaceTarget(target);

                setTimeout(function(){
                    if (new Date() - visitedAt < expire) {
                        window.location.replace(tencentUrl);
                    }
                }, delay);
            }else{
                target = intentUrl + withIntent + package;
/*

                if (/Chrome/i.test(userAgent)) { //크롬일 경우

                } else { //크롬 외의 브라우저

                }
*/
                replaceTarget(target);

/*
                setTimeout(function(){
                    if (new Date() - visitedAt < expire) {
                        window.location.replace(gpUrl);
                    }
                }, delay);
*/
            }
            break;
        case 'ios': // ios 일 경우
            target = homeUrl;
            replaceTarget(target);

/*
            setTimeout(function(){
                if (new Date() - visitedAt < expire) {
                    //window.location.replace(target);
                }
            }, delay);
*/
            break;
        default : //ios or android 가 아닐 경우
            target = homeUrl;
            replaceTarget(target);

            break;
    }

    $(".and_down").click(function (e) {
        e.preventDefault();

        if(target != null) replaceTarget(target);
    });

    function replaceTarget(url) {
        console.log(url);
        window.location.replace(url);
    }

/*
    var linkToStore = function() {
        var url;
        switch (os) {
            case "android" :
                if(locale == 'zh_CN') {
                    url = tencentUrl;
                }else{
                    url = gpUrl;
                }
                break;
            case "ios" :
                    url = "";
                break;
            default:
                break;
        }
    }
*/

}