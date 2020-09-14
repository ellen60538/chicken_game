$(document).ready(function () {
    $('#welcome').modal('show');
    pause();
})
// $(document).ready(function(){
//     $('#upgradeModal').modal('show');
//     pause();
// })

var frog = document.getElementById("frog");
var car = document.getElementsByClassName("car"); // car是個陣列
var grade = 1;
var speed = 1;
var flagMoveFrog = true;
var flagPlay = false;
var time = 1500;
var carHeigh = 65;
document.getElementById("grade").innerText = grade;


var creating = setInterval(createCar, ((Math.random() * 2000) + time)) //初始2-4秒生成car
function createCar() {
    var para = document.createElement("div");                   //生成div
    var att = document.createAttribute("class");                //生成屬性class
    var carIndex = Math.ceil(Math.random() * 15);
    att.value = 'car c' + carIndex;                             //屬性的值是'car c[i]'(car引用自css)
    para.setAttributeNode(att);                                 //把div掛上car這個class
    var element = document.getElementById("road");              //找到元素#road
    element.appendChild(para);                                  //將生成的div放進#road裡
    var carVer = Math.ceil(Math.random() * 8);                  //隨機取車道 1-8
    var carHor = Math.round(Math.random());                     //隨機出現0,1(car從左邊或右邊出現)

    var i = 0;
    para.style.top = carVer * carHeigh + 'px';
    switch (carHor) {
        case 0:
            para.style.left = '-80px';
            break;
        case 1:
            para.style.left = '999px';
            break;
    }
    while (i < car.length) {
        var carLeft = parseInt(getComputedStyle(car[i]).getPropertyValue('left'));
        var carTop = parseInt(getComputedStyle(car[i]).getPropertyValue('top'));
        if (carTop == carVer * carHeigh) {
            if (carLeft % 2 == 0) {
                para.style.left = '-80px';
            }
            else {
                para.style.left = '899px';
            }
            i = car.length;
        }
        else
            i = i + 1;
    }
}

//判斷car[i]與frog是否發生碰撞
function check() {
    var frogTop = parseInt(getComputedStyle(frog).getPropertyValue('top'));
    var frogLeft = parseInt(getComputedStyle(frog).getPropertyValue('left'));
    var frogLeftW = parseInt(getComputedStyle(frog).getPropertyValue('left')) + parseInt(getComputedStyle(frog).getPropertyValue('width'));

    for (var i = 0; i < car.length; i++) {
        var carTop = parseInt(getComputedStyle(car[i]).getPropertyValue('top'));
        var carLeft = parseInt(getComputedStyle(car[i]).getPropertyValue('left'));
        var carLeftW = parseInt(getComputedStyle(car[i]).getPropertyValue('left')) + parseInt(getComputedStyle(car[i]).getPropertyValue('width'));

        if ((carTop == frogTop) &&
            ((frogLeft > carLeft && frogLeft < carLeftW) || (frogLeftW > carLeft && frogLeftW < carLeftW))) {
            $('#gameoverModal').modal();
            pause();
            // restart() ;
        }
    }
    if (frogTop == 0) {
        pause();
        flagPlay = false;
        grade = grade + 1;
        $('#upgradeModal').modal();
        document.getElementById("grade1").innerText = grade;
        setTimeout(upgrade, 3000)
    }
}

//upgrade : frog回到初始位置、速度*1.2、
function upgrade() {
    $('#upgradeModal').modal('hide');
    frog.style.left = '50%';
    frog.style.top = '585px';
    for (i = car.length - 1; i >= 0; i--) {     // 從最後一輛車開始移除
        car[i].remove();
    }
    switch (grade % 3) {
        case 2:
            time = time * 0.8;
            break;
        case 0:
            speed = speed * 1.2;
            break;
        case 1:
            time = time * 0.8;
            speed = speed * 1.2;
            break;
    }
    moving = setInterval(moveCar, 100);
    creating = setInterval(createCar, (Math.random() * 2000) + time);
    flagMoveFrog = true;
    console.log('升級!!');
    console.log(grade);
    console.log(speed);
    console.log(time);
    document.getElementById("grade").innerText = grade;

}

// 暫停鍵(按所有功能鍵、升級下一關前 需要呼叫暫停功能)
function pause() {
    clearInterval(moving);
    clearInterval(creating);
    flagMoveFrog = false;
    console.log('暫停');
    flagPlay = true;
}

// 繼續鍵
function play() {
    if (flagPlay) {
        moving = setInterval(moveCar, 100);
        creating = setInterval(createCar, (Math.random() * 2000) + time);
        flagMoveFrog = true;
        flagPlay = false;
        console.log('繼續');
    }
    else
        console.log('無效!');
}

// 重新開始
function restart() {
    grade = 1;
    frog.style.left = '50%';
    frog.style.top = '585px';
    frog.style.transform = "rotateX(0deg)";
    for (i = car.length - 1; i >= 0; i--) {
        car[i].remove();
    }
    speed = 1;
    time = 2000;
    clearInterval(moving);
    clearInterval(creating);
    moving = setInterval(moveCar, 100);
    creating = setInterval(createCar, (Math.random() * 2000) + time);
    flagMoveFrog = true;
    console.log('從頭開始');
    document.getElementById("grade").innerText = grade;

}



// 撰寫讓 #frog 移動的方法
function moveFrog(myEvent) {
    var fs = window.getComputedStyle(frog);
    var frogTop = fs.getPropertyValue('top');
    var frogLeft = fs.getPropertyValue('left');
    if (flagMoveFrog) {
        switch (myEvent.keyCode) {
            case 37:    //左
                if (parseInt(frogLeft) >= 10) {
                    frog.style.left = (parseInt(frogLeft) - carHeigh) + "px";
                    frog.style.transform = "rotateY(0deg)";
                }
                break;
            case 38:    //上
                if (parseInt(frogTop) >= 10) {
                    frog.style.top = (parseInt(frogTop) - carHeigh) + "px";
                    frog.style.transform = "rotateX(0deg)";
                }
                break;
            case 39:    //右
                if (parseInt(frogLeft) < 800) {
                    frog.style.left = (parseInt(frogLeft) + carHeigh) + "px";
                    frog.style.transform = "rotateY(180deg)";
                }
                break;
            case 40:    //下
                if (parseInt(frogTop) < 500) {
                    frog.style.top = (parseInt(frogTop) + carHeigh) + "px";
                    frog.style.transform = "rotateX(180deg)";
                }
                break;
        }
        check();
    }
    switch (myEvent.keyCode) {
        case 32:
            pause();
            break;
        case 13:
            play();
            break;
    }
}

var moving = setInterval(moveCar, 100);
function moveCar() {
    for (i = car.length - 1; i >= 0; i--) {
        //判定car從左邊或右邊出現、transform、前進方向
        //每次執行皆重新擷取car[i].style.left 再加減 10px
        if (parseInt(car[i].style.left) % 2 == 0) {
            car[i].style.left = (parseInt(getComputedStyle(car[i]).getPropertyValue('left')) + 2 * Math.round(5 * speed)) + 'px';
            car[i].style.transform = "rotateY(0deg)";
        }
        else {
            car[i].style.left = (parseInt(getComputedStyle(car[i]).getPropertyValue('left')) - 2 * Math.round(5 * speed)) + 'px';
            car[i].style.transform = "rotateY(180deg)";
        }

        //超出範圍後移除元素
        if (parseInt(getComputedStyle(car[i]).getPropertyValue('left')) > 900 ||
            parseInt(getComputedStyle(car[i]).getPropertyValue('left')) < -100) {
            car[i].remove();
        }
        check();
    }
}



