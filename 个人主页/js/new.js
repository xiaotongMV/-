			//获取元素
			var heaD = document.getElementsByClassName('header')[0];
			var h3S = heaD.getElementsByTagName('h3')[0];
			//获取内容区元素
			var seC = document.getElementsByClassName('section')[0];
			//获取导航栏的元素
			var naV = document.getElementsByClassName('nav')[0];
			//获取导航栏logo元素
			var lhome = document.getElementsByClassName('list_home')[0];
			
			
			//获取轮播图元素
			var listwf = document.getElementsByClassName('listwf')[0];			
			//获取图片元素
			var imgs = listwf.getElementsByTagName('img');
			//获取左边点击按钮
			var prev = document.getElementsByClassName('prev')[0];
			//获取右边点击按钮
			var next = document.getElementsByClassName('next')[0];			
			//获取图片圆点元素
			var photo = document.getElementsByClassName('photo')[0];
			var aS = photo.getElementsByTagName('a');
			
			//拖拽元素
			var uls = document.getElementsByClassName('uls')[0];
			
			
			//声明一个数组存储图片数据
			var arr = ['img/1.jpg','img/2.jpg','img/3.jpg','img/4.jpg'];
			//声明一个变量控制图片切换
			var n = 0;
			//声明一个开光控制运动函数的开关
			var onOff = true;
			//点击下拉三角跳转
			h3S.onclick = function(){
				if(onOff){
					onOff = false;
					move({
						obj:seC,
						attrs:{top:70},
						duration:1000,
						callBack:function(){
							naV.style.position = 'fixed';
							naV.style.zIndex = '999';
							naV.style.top = '0';
							onOff = true;
						}
					})
				}
			}
			
			//点击导航栏logo返回上层
			lhome.onclick = function(){
				if(onOff){
					onOff = false;
					naV.style.position = 'absolute';
					naV.style.zIndex = '0';
					naV.style.top = '-70px';
					move({
						obj:seC,
						attrs:{top:735},
						duration:1000,
						callBack:function(){
							onOff = true;
						}
					})
				}
			}
			
			//控制运动中不可以再次运动
			var prevs = true;
			var timer = null;
			//初始化图片
			imgs[0].src = arr[n];
			//点击左边按钮图片切换
			prev.onclick = function(){	
				if(prevs){
					prevs = false;
					n++;
					if(n>arr.length-1){
						n=0;						
					}
					imgs[1].src = arr[n];
					//2.运动，ul向左移动-640
					move({
						obj:listwf,
						attrs:{left:-1500},
						duration:3000,
						callBack:function(){
							//3.运动完，img1变成当前图片，listwf回到0，开关打开，可以再次点击运动
							imgs[0].src = arr[n];
							listwf.style.cssText = '';
							prevs = true;
						}
					})
				}
						
				
				for(var i=0;i<aS.length;i++){
					aS[i].style.backgroundPosition = 'top';
				}
				aS[n].style.backgroundPosition = 'bottom';
			}
			
			
			
			//点击右边按钮图片切换
			next.onclick = function(){
				if(prevs){
					prevs = false;
					//img2换当前
					imgs[1].src = arr[n];
					//listwf瞬间变成-1500
					listwf.style.left = '-1500px';
					n--;
					if(n<0){
						n=arr.length-1;						
					}
					imgs[0].src = arr[n];
					//运动,listwf回到0
					move({
						obj:listwf,
						attrs:{left:0},
						duration:3000,
						callBack:function(){
							//运动后，开关为true，可以再次点击运动
							prevs = true;
						}
					})	
				}
				for(var i=0;i<aS.length;i++){
						aS[i].style.backgroundPosition = 'top';
				}
				aS[n].style.backgroundPosition = 'bottom';
			}
			
			//开启一个定时器
			timer = setInterval(prev.onclick,3000);
			//移入关闭定时器
			prev.onmouseover = next.onmouseover = function(){
				clearInterval(timer);
			}
			//移出重新启动定时器
			prev.onmouseout = next.onmouseout = function(){
				timer = setInterval(prev.onclick,3000);
			}
			
			
			
			//初始化圆点颜色
			aS[0].style.backgroundPosition = 'bottom';
			//点击圆点切换图片
			for(var i=0;i<aS.length;i++){
				aS[i].index = i;
				aS[i].onclick = function(){
					for(var i=0;i<aS.length;i++){
						aS[i].style.backgroundPosition = 'top';
					}
					this.style.backgroundPosition = 'bottom';
					n = this.index;
				}
			}
			
			//拖拽图片
			function drag(obj){
				//1.元素上按下
				obj.onmousedown = function(ev){					
					ev.preventDefault();
					var disX = ev.clientX-obj.getBoundingClientRect().left;
					//var disY = ev.clientY-obj.getBoundingClientRect().top;
					//2.移动
					document.onmousemove = function(ev){
						var l = ev.clientX-disX;
						//var t = ev.clientY-disY;
						obj.style.left = l+'px';
						//obj.style.top = t+'px';	
					}
					//3.抬起
					document.onmouseup = function(){
						document.onmousemove = null;
						document.onmouseup = null;
					}
				}
			}
			drag(uls);