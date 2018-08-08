window.onload = function() {
    waterfall('main', 'box');
    var dataInt = { "data": [{ "src": '1.jpg' }, { "src": '2.jpg' }, { "src": '3.jpg' }, { "src": '4.jpg' }] }
    window.onscroll = function() {
        // 是否具备滚动加载条件
        if (checkScrollSlide()) {
            var oParent = document.getElementById('main');
            // 将数据块渲染到当前页面的尾部
            for (let i = 0; i < dataInt.data.length; i++) {
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = 'images/' + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box')
        }
    }
};
// 是否具备滚动加载条件
function checkScrollSlide() {
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent, 'box');
    // 最后一张图片中部是否到底部
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length - 1].offsetHeight / 2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    // 当前浏览器高度距离
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return (lastBoxH > screenTop + height) ? true : false;
}

function waterfall(parent, box) {
    // 将main下的所有class为box的元素取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    // 计算整个页面中显示的列数（页面的宽度/box的宽度）
    var oBoxW = oBoxs[0].offsetWidth; //获取元素的宽度
    var cols = Math.floor(document.documentElement.clientWidth / oBoxW); //页面的宽度/一个盒子的宽度
    // 设置main的宽度
    oParent.style.cssText = "width:" + oBoxW * cols + 'px; margin: 0 auto';
    var hArr = []; //存放每一列高度数组
    for (let i = 0, len = oBoxs.length; i < len; i++) {
        if (i < cols) {
            hArr.push(oBoxs[i].offsetHeight);
        } else {
            var minH = Math.min.apply(null, hArr);
            var index = getMinhIndex(hArr, minH); //求出下一张图片要连在哪张图片索引
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            // oBoxs[i].style.left = oBoxW * index + 'px';
            oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
            hArr[index] += oBoxs[i].offsetHeight;
        }
    }
}

function getMinhIndex(arr, val) {
    for (var i in arr) {
        if (arr[i] === val) {
            return i;
        }
    }
}
// 根据class获取元素
function getByClass(parent, className) {
    var boxArr = new Array(), //用来存储获取到的所有class为box的元素
        oElements = parent.getElementsByTagName('*');
    for (let i = 0, len = oElements.length; i < len; i++) {
        if (oElements[i].className === className) {
            boxArr.push(oElements[i]);
        }
    }
    return boxArr;
}