window.onload = function() {
    //标题下划线
    let a=document.querySelector('.diarylist > li > a')
    let list=document.querySelectorAll('.diarylist li')
    list.forEach(function ( elem ,index) {
        elem.onclick = function () {
            for (let i=0 ;i<list.length; i++){
                list[i].onclick =function () {
                    for (let j =0;j<list.length;j++){
                        a.classList.remove("hot")
                    }
                    this.classList.add("hot")
                }
            }
        }
    })

    //内容缩放

    let tablist = document.querySelectorAll('.tablist > li ')
    tablist.forEach(function ( elem ,index) {
        elem.onmouseenter = function () {
            for (let i=0 ;i<tablist.length; i++){
                tablist[i].onmouseenter =function () {
                    for (let j =0;j<tablist.length;j++){
                        tablist[j].classList.remove('hot')
                    }
                    this.classList.add('hot')
                }
            }
        }
    })

    //轮播图
    let index = 0;
    let slidebtn=document.querySelectorAll('.slidebtn li')
    let rightbtn = document.querySelector('.rightbtn');
    let leftbtn = document.querySelector('.leftbtn');
    let bannerimg = document.querySelectorAll('.bannerimg li');
    let activeColor = '#ffffff', disactiveColor = '#000000'
    let w = bannerimg[0].offsetWidth
    let flag = true
    let current = 0, next = 0
    rightbtn.onclick = function () {
        if (!flag) {
            return
        }
        flag = false
        next++;
        if (next == bannerimg.length) {
            next = 0;
        }
        bannerimg[next].style.left = w + 'px'
        animate(bannerimg[current], {left: -w})
        animate(bannerimg[next], {left: 0}, function () {
            flag = true
        })
        slidebtn[current].classList.remove('hot')
        slidebtn[next].classList.add('hot')
            current = next
    }
    leftbtn.onclick = function () {
        if (!flag) {
            return
        }
        flag = false
        next--
        if (next < 0) {
            next = bannerimg.length - 1;
        }
        bannerimg[next].style.left = -w + 'px'
        animate(bannerimg[current], {left: w})
        animate(bannerimg[next], {left: 0}, function () {
            flag = true
        })
        slidebtn[current].classList.remove('hot')
        slidebtn[next].classList.add('hot')
        current = next
    }

    //轮播点

    for (var i=0;i<slidebtn.length;i++){
        slidebtn[i].onmouseenter=function(){
            this.style.backgroundColor=activeColor
        }
        slidebtn[i].onmouseleave=function(){
            this.style.backgroundColor=disactiveColor
        }
    }
    for(let i=0;i<slidebtn.length;i++){
        slidebtn[i].onclick=function () {
            next=i;
            if(i>current){
                bannerimg[next].style.left= w +'px';
                animate(bannerimg[current],{left:-w});
                animate(bannerimg[next],{left:0});
            }else if(i<current){
                bannerimg[next].style.left= -w +'px';
                animate(bannerimg[current],{left:w});
                animate(bannerimg[next],{left:0});
            }else{
                return;
            }
            // slidebtn.forEach(function(elem){
            //      elem.style.background='none';
            // });
            slidebtn[i].style.background='#ffffff';
            current=next;
        }
    }

    //    for (var i = 0; i < slidebtn.length; i++) {
 //        slidebtn[i].onclick = function () {
 //            Array.prototype.forEach.call(slidebtn, function (elem) {
 //                elem.classList.remove('hot')
 //            })
 //            bannerimg.forEach(function (ele) {
 //                ele.style.zIndex = 1
 //            });
 //            this.classList.add('hot');
 //            bannerimg[index].style.zIndex = 999;
 //        }
 //    }
 //
 //         for (var i = 0; i < slidebtn.length; i++) {
 //             slidebtn[i].onclick = function () {
 //                 slidebtn[i].rong = i
 //                 slidebtn[i].onclick = function () {
 //                     index = this.rong
 //                     Array.prototype.forEach.call(slidebtn, function (elem) {
 //                         elem.classList.remove('hot')
 //                     })
 //                 }
 //                Array.prototype.forEach.call(slidebtn, function (elem) {
 //                     elem.classList.remove('hot')
 //                 })
 //                 bannerimg.forEach(function (ele) {
 //                    ele.stylr.zIndex = 1
 //                })
 //               this.classList.add('hot')
 //                 slidebtn[index].style.zIndex = 99
 //             }
 //        }
    // }
    //  轮播图移入移出

    let slide=document.querySelector('.slide')
    let t = setInterval(rightbtn.onclick, 2000)
    slide.onmouseenter = function () {
        clearInterval(t)
    }
    slide.onmouseleave = function () {
        t = setInterval(rightbtn.onclick, 2000)
    }

//     for (var i=0 ;i<ban.length;i++){
//         ban[i].onclick =function () {
//             Array.prototype.forEach.call(ban,function (elem) {
//                 elem.classList.remove('hot')
//             })
//             bannerImg.forEach(function (ele) {
//                 ele.style.zIndex=1
//             });
//             this.classList.add('hot');
//             bannerImg[index].style.zIndex=999;
//         }
//     }
//         for (var i = 0; i < slidebtn; i++) {
//             slidebtn[i].onclick = function () {
//                 slidebtn[i].rong=i
//                 slidebtn[i].onclick=function () {
//                     index=this.rong
//                     Array.prototype.forEach.call(slidebtn,function (elem) {
//                         elem.classList.remove('hot')
//                     })
//                 }
//
//                 Array.prototype.forEach.call(slidebtn, function (elem) {
//                     elem.classList.remove('hot')
//                 })
//                 bannerimg.forEach(function (ele) {
//                     ele.stylr.zIndex = 1
//                 })
//                 this.classList.add('hot')
//                 slidebtn[index].style.zIndex = 99
//             }
//         }
// }

        //缓存加载
        let viewH = window.innerHeight;
        let imgs = document.querySelectorAll('.lazy')
        let positionArr = [];
        imgs.forEach(function (ele) {
            let parent = ele.offsetParent;
            positionArr.push(parent.offsetTop + ele.offsetTop)
        });
        window.onscroll = function () {
            let scrolltop = document.documentElement.scrollTop || document.body.scrollTop
            for (let i = 0; i < positionArr.length; i++) {
                if (scrolltop + viewH >= positionArr[i] + 50) {
                    if (!imgs[i.src]) {
                        imgs[i].src = imgs[i].getAttribute('aa')
                    }
                }
            }
        }

}