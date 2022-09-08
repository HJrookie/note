### AJAX -- asynchronous JavaScript and xml
是一种异步思想,现在一般指代 `网页局部刷新`
1. 创建对象.对于ie,ActiveXObject,一般的话,XMLHttpRequest
2. 设置事件,onreadystateCHange,onload  
```js
if (window.XMLHttpRequest) {// code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp = new XMLHttpRequest();
}
else {// code for IE6, IE5
    xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
}
xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
        // document.getElementById("myDiv").innerHTML = xmlhttp.responseText;
    }
}
xmlhttp.open("GET", "/ajax/test1.txt", true);
xmlhttp.send();
/*
0: 请求未初始化
1: 服务器连接已建立
2: 请求已接收
3: 请求处理中
4: 请求已完成，且响应已就绪
*/
```