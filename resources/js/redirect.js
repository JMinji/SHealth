/******************************
 # domain check redirection
 *******************************/
var fullurl = window.location.href;
var checkProtocol = window.location.protocol;
var checkHost = window.location.host;
var checkPathName = window.location.pathname;
var checkSearch = window.location.search;
var matchUrls = ['landingweb-stg.test.samsunghealth.com'];
for (var i = 0, e = matchUrls.length; i < e; i++) {
    if (matchUrls[i] == checkHost) {
        var changeUrl = checkProtocol + "//landingweb-stg.samsunghealth.com" + checkPathName + checkSearch;
        window.location.replace(changeUrl);
    }
}
/*
var matchUrls = ['shealth.samsung.com', 'www.samsunghealth.com', 'samsunghealth.com'];
for (var i = 0, e = matchUrls.length; i < e; i++) {
    if (matchUrls[i] == checkHost) {
        var changeUrl = checkProtocol + "//health.apps.samsung.com" + checkPathName + checkSearch;
        window.location.replace(changeUrl);
    }
}
*/