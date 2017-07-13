/*数据获取函数*/
function getDate(data){
	var hash = location.hash.substr(1).split('=');
	var Data=data;
	if(hash[0]=='p'){
	var hs=hash[1].split('_');	
	var n=1;
	fn(hs)
	function fn(arr){
		if(arr[n]){
			Data=Data[arr[n]];
			n++;
			fn(arr);
		}
	}
	}
	else{
		Data=data['0'];
	}
	return Data
}
var listfd=document.getElementById('listfd');
var breadnav=document.getElementById('breadnav');
var fileDemonstrate2=document.getElementById('fileDemonstrate2');
function fnstru2(data,parentS){
	listfd.innerHTML='';
	var str2='';
	for(var k in data){
		if(k!='maxId'){
			var li=document.createElement('li');
			var i1=document.createElement('i');
			var i2=document.createElement('i');
			var span=document.createElement('span');
			var h2=document.createElement('h2');
			h2.path=data[k].path;
			h2.onOff=true;
/*			h2.ondblclick=function(ev){
			location.hash='p='+this.path;
			}*/
			h2.onclick = function(){
				location.hash='p='+this.path;
				var next = this.nextElementSibling;
					if(next){
						if(this.onOff){
							this.children[0].className='activeicon1';
							this.children[1].className='activeicon2';
							next.style.display = 'block';
						}else{
							this.children[0].className='icon1';
							this.children[1].className='icon2';
							next.style.display = '';
						}
						this.onOff = !this.onOff;
					}
			}
			span.innerText=data[k].name;
			i2.className='icon2';
			i1.className='iconnone';			
			h2.appendChild(i1);
			h2.appendChild(i2);
			h2.appendChild(span);
			li.appendChild(h2);			
			if(data[k].child.maxId!=-1){
				i1.className='icon1';				
				var ul=document.createElement('ul');
				fnstru2(data[k].child,ul);
				li.appendChild(ul);			
			}			
		}
		parentS.appendChild(li);
	}	
}
/*右侧页面渲染*/
function fnrightcreate(Data){
	fileDemonstrate2.innerHTML='';
	for(var k in Data){
		if(k!='maxId'){		
			fileDemonstrate2.appendChild(createonefolder(Data[k].name,Data[k].path));
		}		
	}
}
/*右侧单击页面*/
var allrightBox=document.getElementById('allrightBox');
var rightmenu=document.getElementById('rightmenu');
var rightmenu2=document.getElementById('rightmenu2');
var newfolder=document.getElementById('newfolder');
newfolder.checked=true;
var arrmove=[];
var arrtouch=[];
var posrr=allrightBox.getBoundingClientRect();
allrightBox.oncontextmenu=function(ev){
	ev.preventDefault();
	rightmenu.style.display='block';
	rightmenu2.style.display='';
	var pos=allrightBox.getBoundingClientRect()
	var maxL = allrightBox.offsetWidth-rightmenu.offsetWidth;
	var maxT = allrightBox.offsetHeight-rightmenu.offsetHeight;
	var l = ev.clientX-pos.left>maxL?maxL:ev.clientX-pos.left;
	var t = ev.clientY-pos.top>maxT?maxT:ev.clientY-pos.top;
	rightmenu.style.left = l +'px';
	rightmenu.style.top = t +'px';
	var lis=rightmenu.getElementsByTagName('li');
	lis[0].onclick=function(){
		rightmenu.style.display='';
		if(newfolder.checked){
			newfolder.checked=!newfolder.checked;
			var div=document.createElement('div');
			div.className='files2';
			div.innerHTML=`<input type="checkbox" style="visibility: visible" class="flodercheck2"/>
						<i class="folderpicss"></i>
						<div class="newfileop">
							<input type="text" placeholder="请输入" class="insertname"/>										
							<a href="javascript:;" class="choseyes" id="choseyes">✔</a>
							<a href="javascript:;" class="choseno" id="choseno">✖</a>
						</div>`
			fileDemonstrate2.insertBefore(div,fileDemonstrate2.firstElementChild);
			var insertname=div.getElementsByClassName('insertname')[0];
			var as=div.getElementsByTagName('a');
			insertname.focus();
			div.onmousedown=function(ev){
				ev.cancelBubble = true;
			}
			as[0].onclick=function(){
				newfolder.checked=true;
				if(!insertname.value){
					alert('您必须输入一个名字');
				}
				else{
					Data=getDate(data);
					var newItemname=String(++Data.child.maxId);
					var obj={			
					}
					obj.name=insertname.value;
					obj.type='file';
					obj.date='2016-08-22';
					obj.child={maxId:-1};
					obj.path=Data.path+'_child_'+newItemname;
					var path=obj.path;	
					Data['child'][newItemname]=obj;
					fileDemonstrate2.removeChild(fileDemonstrate2.firstElementChild);		
					fileDemonstrate2.insertBefore(createonefolder(obj.name,obj.path),fileDemonstrate2.firstElementChild);
					allcheck();
					fnstru2(data,listfd);
				}
			}
			as[1].onclick=function(){
				newfolder.checked=true;
				fileDemonstrate2.removeChild(fileDemonstrate2.firstElementChild);
			}
		}
		else{
			alert('请您完成当前的新建操作');
		}
	}
	lis[1].onclick=function(){
		rightmenu.style.display='';
		var Data=getDate(data);
		Data=Data.child;
		fnrightcreate(Data);
	}
	lis[2].onclick=function(){
		rightmenu.style.display='';
	}
}		
/*创建一个新的文件夹*/
var shadow2 = document.getElementById('shadow2');
function createonefolder(name,path){
	var box=document.createElement('div');
	box.className='files2';
	box.checked=false;
	var input2=document.createElement('input');
	input2.type='checkbox';
	input2.className='flodercheck2';
	input2.onclick = function(){
		if(this.checked){
			box.checked = true;
		}else{
			box.checked = false;
		}
		allcheck();
	}			
		var i=document.createElement('i');
		i.className='folderpicss';
		var p=document.createElement('p');
		p.className='foldertle';			
		p.innerHTML=name;
		box.appendChild(input2);
		box.appendChild(i);
		box.appendChild(p);
		box.path=path;
		box.oncontextmenu=function(ev){
			ev.preventDefault();
			ev.cancelBubble = true;
			rightmenu2.style.display='block';
			rightmenu.style.display='';
			shadow2.style.display='';
			var pos=allrightBox.getBoundingClientRect()
			var maxL = allrightBox.offsetWidth-rightmenu.offsetWidth;
			var maxT = allrightBox.offsetHeight-rightmenu.offsetHeight;
			var l = ev.clientX-pos.left>maxL?maxL:ev.clientX-pos.left;
			var t = ev.clientY-pos.top>maxT?maxT:ev.clientY-pos.top;
			rightmenu2.style.left = l +'px';
			rightmenu2.style.top = t +'px';
			var lis=rightmenu2.getElementsByTagName('li');
			lis[1].onclick=function(){
				rightmenu2.style.display='';
				box.checked=true;
				fnrename(box);			
			}
			lis[0].onclick=function(){
				box.checked=true;
				rightmenu2.style.display='';
				var Data=getDate(data);
				deleteid=box.path.split('_').pop();
				delete Data.child[deleteid];
				fileDemonstrate2.removeChild(box);
				divs=fileDemonstrate2.getElementsByClassName('files2');
				if(divs.length==0){
					Data.child.maxId=-1;
				}
			}
		}
		box.onmouseenter = function(){
			if(!this.checked){
				this.classList.add('activebod');
			}
		}
		box.onmouseleave = function(){
			if(!this.checked){
				this.classList.remove('activebod');
			}
		}
		box.ondblclick=function(){				
			location.hash='p='+this.path;
		}
		box.onmousedown=function(ev){
			ev.cancelBubble = true;
			if(arrmove.includes(box)){
				shadow2.style.display='block'
				shadow2.style.left=ev.clientX-posrr.left-box.offsetWidth/2+'px';
				shadow2.style.top=ev.clientY-posrr.top-box.offsetHeight/2+'px';
				document.onmousemove=function(ev){
					var ol=ev.clientX-posrr.left-shadow2.offsetWidth/2
					var oy=ev.clientY-posrr.top-shadow2.offsetHeight/2	
					if(oy>posrr.height-shadow2.offsetHeight){
						oy=posrr.height-shadow2.offsetHeight;
					}
					else if(oy<0){
						oy=0;
					}
					if(ol<0){
						ol=0;
					}
					else if(ol>posrr.width-shadow2.offsetWidth){
						ol=posrr.width-shadow2.offsetWidth;
					}
					shadow2.style.left=ol+'px';
					shadow2.style.top=oy+'px';
					var divs=fileDemonstrate2.getElementsByClassName('files2');
					for(var i=0;i<arrtouch.length;i++){
						arrtouch[i].style.borderColor = '';
					}
					arrtouch = [];
					for(var i=0;i<divs.length;i++){
						if(arrmove.includes(divs[i])){
							continue;
						}
						if(duang(shadow2,divs[i])){
							arrtouch.push(divs[i])
						}
					}
						for(var i=0;i<arrtouch.length;i++){
							arrtouch[i].style.borderColor = 'blue';
						}
				}
				document.onmouseup=function(){
					if(arrtouch.length){
						var l = shadow2.offsetLeft+shadow2.offsetWidth/2;
						var t = shadow2.offsetTop+shadow2.offsetHeight/2;
						var min = 99999;
						var ele = null;
						for(var i=0;i<arrtouch.length;i++){
							var oL = arrtouch[i].offsetLeft+arrtouch[i].offsetWidth/2;
							var oT = arrtouch[i].offsetTop+arrtouch[i].offsetHeight/2;
							var d = Math.sqrt((l-oL)*(l-oL)+(t-oT)*(t-oT));
							if(min>d){
								min = d;
								ele = arrtouch[i];
							}	
						}
						movefolder(arrmove,ele)
					}
					shadow2.style.display='';
					document.onmousemove=null;
					document.onmouseup = null;
					kx();
					
				}
			}
		}
		return box;
}
function movefolder(arrmove,ele){
	var n=0;
	for(var i=0;i<arrmove.length;i++){
		 var Data=getDate(data);
		 objp=arrmove[i].path.split('_').pop();
		 elep=ele.path.split('_').pop();
		 var newItemname=String(++Data['child'][elep]['child']['maxId']);
		 Data['child'][objp]['path']=ele.path+'_child_'+newItemname;
		 Data['child'][elep]['child'][newItemname]=Data['child'][objp];
		 delete Data['child'][objp];
		 console.log(data);
	}
		var Data=getDate(data);
		Data=Data.child;
		fnrightcreate(Data);
		fnstru2(data,listfd);
}
/*重命名*/
function fnrename(obj){
	var ps=obj.getElementsByTagName('p')[0];
	var original=ps.innerText;
	if(obj.checked){
			ps.innerHTML='';
			ps.className='foldertle2';
			ps.innerHTML=`<input type="text" class="insertname" placeholder="${original}"/>										
						  <a href="javascript:;" class="choseyes" id="choseyes">✔</a>
						  <a href="javascript:;" class="choseno" id="choseno">✖</a>`
			var renameidid=obj.path.split('_').pop();
			var insertname=ps.getElementsByClassName('insertname')[0];
			insertname.focus();
			var as=ps.getElementsByTagName('a');
			as[0].onclick=function(){
				if(!insertname.value){
					insertname.value=original;
				}
				Data=getDate(data);
				Data['child'][renameidid]['name']=insertname.value;
				ps.innerHTML='';
				ps.className='foldertle';
				ps.innerHTML=insertname.value;
				fnstru2(data,listfd);
			}
			as[1].onclick=function(){
				ps.innerHTML='';
				ps.className='foldertle';
				ps.innerText=original;
				fnstru2(data,listfd);
			}
		}
}
/*面包屑导航工具*/
var breadnav=document.getElementById('breadnav');
/*<li><span>微云</span><i></i></li>*/
function breadnavset(data){
	breadnav.innerHTML='';
	var hash = location.hash.substr(1).split('=');
	var Data=data;
	if(hash[0]=='p'){
	var hs=hash[1].split('_');	
	var n=1;
	fn(hs)
	function fn(arr){
		if(arr[n]){
			Data=Data[arr[n]];
			if(arr[n]!='child'){
				var li=document.createElement('li');
				li.path=Data.path;
				li.ondblclick=function(){
					location.hash='p='+this.path;
				}
				li.innerHTML=`<span>${Data.name}</span><i></i>`;
				breadnav.appendChild(li);
			}
			n++;
			fn(arr);
		}
	}
	}
	else{
		var li=document.createElement('li');
		li.path=Data['0'].path;
		li.ondblclick=function(){
			location.hash='p='+this.path;
		}
		li.innerHTML=`<span>${Data['0'].name}</span><i></i>`
		breadnav.appendChild(li);
	}
}
var allchecked=document.getElementById('allcheck');
/*全选检测*/
function allcheck(){
	var n=0;
	var afile=fileDemonstrate2.getElementsByClassName('files2');
	for(var i=0;i<afile.length;i++){
		if(afile[i].checked){
			n++;
		}
		if(n==afile.length){
			allchecked.checked=true;
		}
		else{
			allchecked.checked=false;
		}
	}
}
/*撞击检测*/
function duang(obj1,obj2){
	var pos1 = obj1.getBoundingClientRect();
	var pos2 = obj2.getBoundingClientRect();
	if(pos1.right<pos2.left || pos1.bottom<pos2.top || pos1.left>pos2.right || pos1.top>pos2.bottom){
		return false;
	}else{
		return true;
	}
}


