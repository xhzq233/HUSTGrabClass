// ==UserScript==
// @name         dddd
// @namespace    xhz
// @version      0.1
// @author       xhz.xiahou@gmail.com
// @match        http://wsxk.hust.edu.cn/zxqstudentcourse/courseorclassroom.action*
// @icon         https://www.google.com/s2/favicons?domain=hust.edu.cn
// @grant    unsafeWindow
// ==/UserScript==
var xuanke="音乐"
function sleep (time) {
    return new Promise((resolve) => setTimeout(resolve, time));
}
function aa (iframe) {
    var idoc=(iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document
    // waitForKeyElements ('[id="kcmc"]', jNd => {jNd.val("音乐")}, true);
    idoc.getElementById("kcmc").value=xuanke;
    idoc.querySelector(".searchstyle").firstElementChild.lastElementChild.click();

    sleep(200).then(()=>{
        iframe=document.querySelector("iframe");
        idoc=(iframe.contentDocument) ? iframe.contentDocument : iframe.contentWindow.document;
        var target=idoc.getElementsByClassName("tablelist");
        if (target==null) reload();
        if (target.length > 0){
            for (let i = 0; i < target.length; ++i) {
                var str=target[i].cells[9].innerText;
                str = str.toString().replace(/\s*/g,"");
                str = str.split('/');
                if (!target[i].cells[2].innerText.includes(xuanke)){console.log("error "+target[i].cells[2].innerText);reload();}

                if (Number(str[0])!=Number(str[1])){

                    var iframe1=document.getElementById("state_content").firstElementChild
                    var iwin= iframe1.contentWindow

                    iwin.confirm = function(msg){ console.log(msg);return true;};
                    target[i].lastElementChild.lastElementChild.click()
                }else{
                    sleep(800).then(()=>{
                        //window.location.reload();
                        reload();
                    })
                }
            }
        }else{
            alert("no targets!")
            reload();
        }


    })
}
function reload(){
    window.location.href="http://wsxk.hust.edu.cn/zxqstudentcourse/courseorclassroom.action"
}
// @require  http://ajax.googleapis.com/ajax/libs/jquery/2.1.0/jquery.min.js
// @require  https://gist.github.com/raw/2625891/waitForKeyElements.js
// @grant    GM_addStyle
 //var xuefen=target[i].cells[4].innerText.split('/')[1];
                    //var what2=target[i].cells[2].innerHTML;
                    //var bianhao=what2.split('=\'+')[1];
                    //bianhao=bianhao.split(')')[0];
//console.log(target[i],target[i].lastElementChild.lastElementChild.id,str[0],str[1],target[i].cells[2].innerText,xuefen,bianhao)
                    //idoc.selectKT=function () {
                    //    idoc.getElementById("ktbh").value=target[i].lastElementChild.lastElementChild.id;
                    //    idoc.getElementById("ktrl").value=str[0];
                    //     idoc.getElementById("ktrs").value=str[1];
                    //    idoc.getElementById("kcmc1").value=target[i].cells[2].innerText;
                    //   idoc.getElementById("kczxf").value=xuefen;
                    //    idoc.getElementById("kcbh").value=bianhao;
                    //    idoc.form.submit();
                    //    return true
                    //}
(function() {
    //字符串匹配，匹配到正确页面
    var str=RegExp('http://wsxk.hust.edu.cn/zxqstudentcourse/courseorclassroom.action','g');
    var idoc=document;
    while(!str.test(idoc.URL)){
        alert("error "+idoc.URL);
        idoc=idoc.getElementById("state_content").firstElementChild.concontentDocument;
    }
    idoc.getElementById('timeslot').click();
    sleep(300).then(()=>{
        var iframe=idoc.querySelector("iframe");
        iframe.onload=aa(iframe)
    })
    sleep(10000).then(()=>{
        reload();
    })
})();
