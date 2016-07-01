// window.onload=function() {
// 	var lv=$(".lv-box")[0]
// 	var box=$(".lv-photos",lv)[0]
// 	var img=$("img",box)
// 	var iw=parseInt(getStyle(img[0],"width"))
// 	var btn=$(".btn",lv)[0]
// 	var btnL=$(".btnL",btn)[0]
// 	var btnR=$(".btnR",btn)[0]
// 	var flag=true;
// 	var t=setInterval(moveL,2000)

// 	lv.onmouseover=function(){
//         clearInterval(t);
//         animate(btn,{opacity:1})
// 	}
// 	lv.onmouseout=function(){
// 		t=setInterval(moveR,1000)
// 		animate(btn,{opacity:0})
// 	}
// 	btnL.onclick=function(){
// 		if(flag){
// 			flag=false;
// 			moveR();
// 		}		
// 	}
// 	btnR.onclick=function(){
// 		if(flag){
// 			flag=false;
// 			moveL();
// 		}		
// 	}
// 	  function moveL(){
//         animate(box,{left:-iw},function(){
//         var first=firstChild(box)
//         box.appendChild(first)
//         box.style.left=0
//         flag=true;
//          })
// 	  }
// 	  function moveR(){
// 	  	var first=firstChild(box)
// 	  	var last=lastChild(box)
// 	  	box.insertBefore(last,first)
// 	  	box.style.left=-iw+"px"
// 	  	animate(box,{left:0},function(){
// 	  		flag=true;
// 	  	})
// 	  }


// // 无缝轮播
// // var banner=$(".banner-inner")[0]
// // var lis=$("li",banner)
// // var as=$("a",banner)
// // var len=as.length
// // var btn=(".btn",banner)
// // var btnL=(".btnL",banner)[0]
// // var btnR=(".btnR",banner)[0]
// // // var iw=parseInt(getstyle(as[0],"width"))
// // var flag1=true;
// // var next=0;
// // var index=0;
// // for(var i=0;i<len;i++){
// //   if(i==0){
// //      // animate(as[0],{left:0})
// //      animate(lis[0],{background:"red"})
// //      continue;
// //   }
// //   animate(as[i],{left:1330})
// //   animate(lis[i],{background:"#262626"})

// // }
// // var t=setInterval(move1R,1000)

// // function move1R() {
// //   next++
// //   if(next==len){
// //     next=0
// //   }
// //   // 按钮
// //   animate(lis[index],{background:"#262626"})
// //   animate(lis[next],{background:"red"})
// //   // 下一张就位
// //   as[next].style.left=1330+"px"
// //    // 当前张离开
// //   animate(as[index],{left:-1330})
// //   // 下一张显示
// //   animate(as[next],{left:0},function(){flag1=true})
// //   index=next;
// // }
// // function move1L(){
// //   next--;
// //   if(next<0){
// //     next=len-1;
// //   }
// //    // 按钮
// //    animate(lis[index],{background:"#262626"})
// //    animate(lis[next],{background:"red"})
// //   // 下一张就位
// //   as[next].style.left=-1330+"px"
// //    // 当前张离开
// //   animate(as[index],{left:1330})
// //   // 下一张显示
// //   animate(as[next],{left:0},function(){flag1=true})
// //   index=next;
// // }
// //  banner.onmouseover=function(){
// //   clearInterval(t)
// //  }
// //  banner.onmouseout=function(){
// //   t=setInterval(move1R,1000)
// //  }
//  // for (var i = 0; i < len; i++) {
//  //     lis[i].index=i;
//  //     lis[i].onclick=function(){
//  //        if(index==this.index)
//  //        return;
//  //        for(var j=0;j<as.length;j++){ 
//  //             animate(lis[j],{background:"#ccc"});
//  //        }
//  //        animate(lis[this.index],{background:"red"});
//  //        if(this.index>index){
//  //          as[this.index].style.left=740+"px";
//  //          animate(as[index],{left:-740});
//  //          animate(as[this.index],{left:0});
//  //          index=this.index;
//  //        }else if(this.index<index){
//  //          as[this.index].style.left=-740+"px";
//  //          animate(as[index],{left:740});
//  //          animate(as[this.index],{left:0});
//  //          index=this.index; 
//  //        }
//  //     }
//  //  }
//  // btnR.onclick=function(){
//  //    if(flag1){
//  //      flag1=false;
//  //      move1R();
//  //    }
//  //  }
//  //  btnL.onclick=function(){
//  //    if(flag1){
//  //      flag1=false;
//  //      move1L();
//  //    }
//  //  }


// }

$(function(){
			var bw=$('.banner-inner').width();
			var index=0;
			var next=0;
			var box=$('a',$('.banner-inner')[0])
			var flag=true;
			//初始状态
		 	box.css({'left':bw}).eq(0).css({"left":0})
			box.eq(0).addClass('hot');
			//轮播核心
			var t=setInterval(moveL,2000);
			//鼠标悬停
			$('.banner').hover(function(){
				clearInterval(t);
			},function(){
				 t=setInterval(moveL,2000);
			})
			//轮播点对应图出现
			$('a',$('.btn')[0]).hover(function(){
				var num=$(this).index();
				box.eq(num).css({'left':bw});
				box.eq(index).animate({'left':-bw});
				box.eq(num).animate({'left':0});
				$('a',$('.btn')[0]).eq(index).removeClass('hot');
				$('a',$('.btn')[0]).eq(num).addClass('hot');
				next=num;
				index=num;

			},function(){
				
			})
//点击左右移动按钮
		$('.zz1').click(function(){
			clearInterval(t);
			if(flag){
			moveL();
			flag=false;
			}
		})
		$('.zz2').click(function(){	
			clearInterval(t);
			if(flag){
			moveR();
			flag=false;
			}
		})
			function moveL(){
				next++;
				if (next==box.length) {
					next=0;
				}
				box.eq(next).css({'left':bw});
				box.eq(index).animate({'left':-bw});
				box.eq(next).animate({'left':0},function(){flag=true});
				$('a',$('.btn')[0]).eq(index).removeClass('hot');
				$('a',$('.btn')[0]).eq(next).addClass('hot');
				index=next;

			}

			function moveR(){
				next--;
				if (next<0) {
					next=box.length-1;
				}
				box.eq(next).css({'left':-bw});
				box.eq(index).animate({'left':bw});
				box.eq(next).animate({'left':0},function(){flag=true});
				$('a',$('.btn')[0]).eq(index).removeClass('hot');
				$('a',$('.btn')[0]).eq(next).addClass('hot');
				index=next;

			}

		})

