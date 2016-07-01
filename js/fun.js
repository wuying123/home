
/*兼容性*/
/*
	getClass(className)
	获取指定的类名
	className  指定的类名
	range 指定的范围
	如果传入范围，就是指定的范围
	如果不传入范围，就是document
*/
/*function getClass(className,range){
	// 设置范围
	var range=range?range:document;
	// 判断浏览器
	if(document.getElementsByClassName){
		// w3c
		return range.getElementsByClassName(className);
	}else{
		// ie6~8
		// arr 保存指定的className对象
		// 获取所有的元素
		var all=range.getElementsByTagName("*");
		// 挑选指定的元素
		var arr=[];
		for(var i=0;i<all.length;i++){
			if(all[i].className==className){
				arr.push(all[i]);
			}
		}
		// 挑选完毕。将数组输出
		return arr;

	}
}*/




function getClass(className,range){
	// 设置范围
	var range=range?range:document;
	// 判断浏览器
	if(document.getElementsByClassName){
		// w3c
		return range.getElementsByClassName(className);
	}else{
		// ie6~8
		// arr 保存指定的className对象
		// 获取所有的元素
		var all=range.getElementsByTagName("*");
		// 挑选指定的元素
		var arr=[];
		for(var i=0;i<all.length;i++){
			// 函数：判断当前元素的className是否包含指定的className
			if(checkClass(all[i].className,className)){
				arr.push(all[i]);
			}
		}
		// 挑选完毕。将数组输出
		return arr;

	}
}

function checkClass(obj,className){
	// 检查obj里面是否包含className
	// obj one two
	// className  "one"
	var arr=obj.split(" ");
	for(var i=0;i<arr.length;i++){
		if(arr[i]==className){
			return true;

		}
	}
	return false;
}




/* 
	getContent(obj,[val])
	获取或者设置对象的文本
	obj 指定的对象
	val 要设置的内容
*/
function getContent(obj,val){
	if(obj.innerText){
		if(val==undefined){
			return obj.innerText;
		}else{
			obj.innerText=val;
		}
	}else{
		if(val==undefined){
			return obj.textContent;
		}else{
			obj.textContent=val;
		}
	}
}

/*
	getStyle(obj,attr)
	获取指定元素的样式
	obj 指定的元素
	attr 指定的样式
*/
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,null)[attr];
	}
}



/*
	$("")
	.one 获取类名
	#one 获取id
	div 获取标签
*/

function $(selecter,ranges){
	if(typeof selecter=="string"){
		var ranges=ranges?ranges:document;
		if(selecter.charAt(0)=="."){
			return getClass(selecter.slice(1),ranges);
		}
		else if(selecter.charAt(0)=="#"){
			return document.getElementById(selecter.slice(1));
		}
		else if(/^[a-z][a-z1-6]{0,10}$/.test(selecter)){
			return ranges.getElementsByTagName(selecter);
		}
		else if(/^<[a-z][a-z1-6]{0,10}>$/.test(selecter)){
			return ranges.createElement(selecter.slice(1,-1));
		}
	}
	else if(typeof selecter=="function"){
		addEvent(window,"load",selecter) 
	}
}



 	function getChilds(obj,type){
      		var objs=obj.childNodes
      		var newArr=[]
      		var type=type?type:false;
      		if(type==true){
      			for (var i = 0; i <objs.length; i++) {
      			if(objs[i].nodeType==1||(objs[i].nodeType==3&&!(/^\s+$/.text(objs[i].nodeValue)))){
                    newArr.push(objs[i])
      			}
      		}
      		}
      		if(type==false){
	      		for (var i = 0; i <objs.length; i++) {
	      			if(objs[i].nodeType==1){
	                    newArr.push(objs[i])
	      			}
	      		}
	      	}	
      		return newArr;
      	}

      	
	    function firstChild(obj){
	      		return getChilds(obj)[0]
	    }

	    function lastChild(obj){
	      		var length=getChilds(obj).length;
	      		return getChilds(obj)[length-1]
	    }

      	// function lastChild(obj,num){
      	// 	var length=getChilds(obj).length;
      	// 	if(num>=length){
      	// 		return error;
      	// 	}
      	// 	return getChilds(obj)[num]
      	// }	



        function getNext(obj){
            var next=obj.nextSibling;
            if(next==null){
                return false;
            }
            while((next.nodeType==3&&/^\s+$/.text(next.nodeValue))||next.nodeType==8){
                next=next.nextSibling
                if(next==null){
                return false;
                }
            }
            return next;
        }


        function insertAfter(newobj,obj,type){
            var parent=obj.parentNode
            var type=type?type:false;
            var pos=getNext(obj,type)
            if(!pos){
                  pos.appendChild(newobj)
            }
            else{
              parent.insertBefore(newobj,pos)
            }
        }



// }

    function animate(obj,attr,end,speed){
        var t=setInterval(function(){
        var width=parseInt(getStyle(obj,attr));
        width+=speed;
        if(width>=end){
          clearInterval(t);
        }
        obj.style[attr]=width+"px";
        },50)
    }


function addEvent(obj,type,fn){
	if(obj.attachEvent){
		obj.attachEvent("on"+type,fn)
	}
	else{
		obj.addEventListener(type,fn,false)
	}
}


function removeEvent(obj,type,fn){
	if(obj.attachEvent){
		obj.detachEvent("on"+type,fn)
	}
	else{
		obj.removeEventListener(type,fn,false)
	}
}


function offset(obj){
	var result={left:0,top:0}
	var arr=[];
	arr.push(obj)
	var parent=obj.parentNode;
	while(parent.nodeName!="BODY"){
		if(getStyle(parent,"position")=="relative"||getStyle(parent,"position")=="absolute"){
			arr.push(parent)
		}
		parent=parent.parentNode;
	}
	
	for (var i = 0; i < arr.length; i++) {
		var leftw=parseInt(getStyle(arr[i],"borderLeftWidth"))
		leftw=leftw?leftw:0;
		var topw=parseInt(getStyle(arr[i],"borderTopWidth"))
		topw=topw?topw:0;
		if(i==0){
			leftw=0
			topw=0
		}
		result.left+=arr[i].offsetLeft+leftw;
		result.top+=arr[i].offsetTop+topw;	
  }
    return result;
}

// mouseWheel(obj,downFn,upFn)
// 给obj添加滚轮事件
// 向下执行 downFn
// 向上执行 upFn

function mouseWheel(obj,downFn,upFn){
   if(document.attachEvent){
	obj.attachEvent("onmousewheel",scrollFn); //IE、 opera
	}
	else if(obj.addEventListener){

	obj.addEventListener("mousewheel",scrollFn,false);
	//chrome,safari -webkit-
	obj.addEventListener("DOMMouseScroll",scrollFn,false);
	//firefox -moz-
	}
	function scrollFn(e){
		var ev=e||window.event;
		if (ev.preventDefault){
            ev.preventDefault(); //阻止默认浏览器动作(W3C)
        }
        else{
            ev.returnValue = false;//IE中阻止函数器默认动作的
        }
		var direct=ev.detail||ev.wheelDelta;
		if(direct==-120||direct==3){
			downFn()
		}	
		if(direct==120||direct==-3){
			upFn()
		}
	    
    }
}   