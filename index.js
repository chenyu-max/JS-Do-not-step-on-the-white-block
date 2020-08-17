var go = document.getElementById('go');
var main = document.getElementById('main');
var again = document.getElementById('again');
var colors = ['red', 'blue', 'green', 'yellow', 'lime', 'cyan', 'purple', 'aqua', 'gold', 'pink', 'black', 'maroon', 'fuchsia'];
var speed = 5,
    num = 0,
    flag = true,
    timer = null;

function clickSatrt() {
    again.style.display = 'none';
    go.addEventListener('click', function () {
        go.style.display = 'none';
        move();
    })
}
clickSatrt();

// 实现运动  ， 判断游戏是否结束
function move() {
    clearInterval(timer); // 事先清楚定时器，以免不必要的定时器累加
    timer = setInterval(function () {
        var step = parseInt(main.offsetTop) + speed;
        main.style.top = step + 'px';
        if (parseInt(main.offsetTop) >= 0) {
            main.style.top = '-150px';
            createDiv();
        }
        var len = main.childNodes.length;
        if (len >= 6) {
            for (var i = 0; i < 4; i++) {
                // console.log(main.childNodes[len - 1].childNodes[i]);
                // 注意 在main div下，不要留有空白，因为使用的是childNodes，会读取到文本节点等
                if (main.childNodes[len - 1].childNodes[i].className != '') {
                    gameOver();
                }
            }
            main.removeChild(main.childNodes[len - 1]);
        }
    }, 20);
    bindEvent();
}
// 创建行和列
// 每调用一次createDiv  就添加一行
function createDiv() {
    var oDiv = document.createElement('div');
    var index = Math.floor(Math.random() * 4), // 取0~4的随机整数  floor  向下取整
        index1 = Math.floor(Math.random() * 13);
    oDiv.setAttribute('class', 'row');
    for (var i = 0; i < 4; i++) {
        var iDiv = document.createElement('div');
        oDiv.appendChild(iDiv);
    }
    if (main.childNodes.length == 0) {
        main.appendChild(oDiv);
    } else {
        main.insertBefore(oDiv, main.childNodes[0]);
    }
    var clickDiv = main.childNodes[0].childNodes[index];
    clickDiv.className = 'check';
    clickDiv.style.backgroundColor = colors[index1];
}

// 游戏开始，点击方块  判断游戏是否结束
function bindEvent() {
    main.addEventListener('click', function (e) {
        if (flag) {
            var tar = e.target;
            if (tar.className == 'check') {
                tar.style.backgroundColor = '#bbb';
                tar.classList.remove('check');
                num++;
            }
            if (tar.className != 'check' && tar.style.backgroundColor == '') {
                gameOver();
            }
            if (num % 10 == 0) {
                speed++;
                // 加速
            }
        }
    })
}

function gameOver() {
    alert('游戏结束，得分为：' + num);
    clearInterval(timer);
    flag = false;
    again.style.display = 'block';
}

again.onclick = function () {
    location.reload();
    // 刷新页面
}