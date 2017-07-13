/*排序功能的鼠标移入移出事件*/
var sortfolder=document.getElementById('sortfolder');
var sortView=document.getElementById('sortView');
var selectView=document.getElementById('selectview');

sortfolder.onmouseenter=function(){
	sortView.style.display="block";
	selectView.classList.add("activeSortView");
}
sortView.onmouseleave=function(){
	this.style.display="none";
	selectView.classList.remove("activeSortView");
}

/*页面初始渲染*/
var Data;
Data=getDate(data);
Data=Data.child;
fnrightcreate(Data);
breadnavset(data);
fnstru2(data,listfd);
kx();

window.onhashchange=function(){
	Data=getDate(data);
	Data=Data.child;	
	fnrightcreate(Data);
	breadnavset(data);
}

/*新建文件夹*/

newfolder.onclick=function(){
	if(this.checked){
	this.checked=!this.checked;
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
	as[0].onclick=function(ev){
		ev.cancelBubble = true;
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
	as[1].onclick=function(ev){
		ev.cancelBubble = true;
		newfolder.checked=true;
		fileDemonstrate2.removeChild(fileDemonstrate2.firstElementChild);
	}
	}
	else{
		alert('请您完成当前的新建操作！')
	}
}
/*删除文件夹*/
var cancle=document.getElementById('cancle');
cancle.onclick=function(){
	var Data=getDate(data);
	var divs=fileDemonstrate2.getElementsByClassName('files2');
	for(var i=0;i<divs.length;i++){
		if(divs[i].checked){
			var deleteid=divs[i].path.split('_').pop();
			delete Data.child[deleteid];
			fileDemonstrate2.removeChild(divs[i]);
			i--;
		}
	}
	if(divs.length==0){
		allchecked.checked=false;
		Data.child.maxId=-1;
	}
	fnstru2(data,listfd);
	
}

/*重命名文件夹*/
var  rename=document.getElementById('rename');
rename.onclick=function(){
	var Data=getDate(data);	
	var divs=fileDemonstrate2.getElementsByClassName('files2');
	for(var i=0;i<divs.length;i++){
		fnrename(divs[i]);
	}
}

/*全选*/
var allchecked=document.getElementById('allcheck');
allchecked.onclick=function(){
	var afile=fileDemonstrate2.getElementsByClassName('files2');
	var n=0;
	for(var i=0;i<afile.length;i++){
		if(afile[i].checked){
			n++;
		}
	}
		if(n==afile.length){
			for(var i=0;i<afile.length;i++){
				afile[i].checked=false;		
				afile[i].getElementsByTagName('input')[0].checked=false;
				afile[i].classList.remove('activebod');
			}
		}
		else{
			for(var i=0;i<afile.length;i++){
				afile[i].checked=true;		
				afile[i].getElementsByTagName('input')[0].checked=true;
				afile[i].classList.add('activebod');
			}
		}
}


document.onclick = function(ev){
	if(ev.target.parentNode!=rightmenu){
		rightmenu.style.display = '';
	}
	if(ev.target.parentNode!=rightmenu2){
		rightmenu2.style.display = '';
	}
}
/*框选*/
function kx(){
var shadow = document.getElementById('shadow');
var nL,nT;
var onOff = false;
var allrightBox=document.getElementById('allrightBox');
var pos=allrightBox.getBoundingClientRect();
allrightBox.onmousedown = function(ev){
	ev.preventDefault();
	shadow.style.display = 'block';
	nL = ev.clientX-pos.left;
	nT = ev.clientY-pos.top;
	onOff = true;
}
document.onmousemove = function(ev){
	allcheck();
	if(onOff){
		var ol=ev.clientX;
		var oy=ev.clientY;
		if(ev.clientX<pos.left){
			ol=pos.left;
		}
		else if(ev.clientX>pos.right){
			ol=pos.right;
		}
		if(ev.clientY<pos.top){
			oy=pos.top;
		}else if(ev.clientY>pos.bottom){
			oy=pos.bottom;
		}
		var dL = ol-pos.left;
		var dT = oy-pos.top;
		var w = Math.abs(nL-dL);
		var h = Math.abs(nT-dT);
		shadow.style.width = w+'px';	
		shadow.style.height = h+'px';
		var l = nL>dL?dL:nL;
		var t = nT>dT?dT:nT;
		shadow.style.left = l+'px';
		shadow.style.top = t+'px';
		var divs=fileDemonstrate2.getElementsByClassName('files2');
		for(var i=0;i<divs.length;i++){			
			divs[i].checked=false;
			divs[i].getElementsByTagName('input')[0].checked=false;
			divs[i].classList.remove('activebod');
		}
		arrmove=[];
		var divs=fileDemonstrate2.getElementsByClassName('files2');
		for(var i=0;i<divs.length;i++){
			if(duang(shadow,divs[i])){
				divs[i].classList.add('activebod');
				divs[i].checked=true;
				divs[i].getElementsByTagName('input')[0].checked=true;
				arrmove.push(divs[i])
			}
		}
	}	
}
document.onmouseup = function(){
	shadow.style.cssText = '';
	onOff = false;
}
}