$.fn.extend({
	slides: function(opts) {

		opts = jQuery.extend({name:'slides',speed:300,start:0,auto:true,interval:5000}, opts || {});//默认参数
		
		return this.each(function(){

			var data = [];


			var $this = $(this);
			$this.find('li').each(function(){
				var width,left,title, $this = $(this);
				
				if( !$this.attr('src')){
					title = $this.find('img').attr('alt');
				}else{
					title = $this.attr('alt');
					$('<a/>').attr('href',$this.attr('href')).html('<img src="'+$this.attr('src')+'" alt="'+title+'"/>').appendTo($this);
					$this.removeAttr('href src alt');
				}

				width = $this.width();
				left  = $this.position().left;

				data.push({left:left,width:width,title:title});
			
			});

			
			var idx = opts.start;
			var interval = false;
			var size = data.length;
			var ul =  $this.find('ul');

			var alt = $('<div/>').addClass(opts.name+'_alt').html(data[opts.start].title).appendTo($this);
			var crl = $('<div/>').addClass(opts.name+'_crl').html('123456789'.substr(0,size).replace(/(\d)/g,"<b>$1</b>")).appendTo($this).children('b').eq(opts.start).addClass('on').end();
			ul.find('li').eq(0).clone().appendTo(ul);

			//动画	
			var play = function(){
				idx ++;
				ul.stop();
				if(idx>=size){
					ul.animate({left:-data[idx-1].left - data[idx-1].width},opts.speed,function(){ul.css('left',0);});
					idx = 0;
					
				}else{
					ul.animate({left:-data[idx].left},opts.speed);
				}
				alt.html(data[idx].title);
				crl.removeClass('on').eq(idx).addClass('on');
			}

			if(opts.auto){
				interval = setInterval(play,opts.interval);
			}

			$this.on({mouseenter:function(){
				if(interval) clearInterval(interval);
			},mouseleave:function(){
				if(opts.auto) interval = setInterval(play,opts.interval);
			}});


			crl.on('mouseenter',function(){
				idx = crl.index($(this)) -1;
				play();
			})

		});
	}
});

$(document).ready(function() {

	
	
	// 加入收藏
	$('.js_setcollect').on('click',function(){
		var url = window.location.href;
		var title = document.title;
		try {
			window.external.addFavorite(url, title);
		}catch (e) {
			try {
				window.sidebar.addPanel(title, url, "");
			}catch (e) {
				alert("请使用Ctrl+D进行添加");
			}
		}
		return false;
	});


	// 设为首页
	$('.js_sethome').on('click',function(){

		try {
			document.body.style.behavior = 'url(#default#homepage)';
			document.body.setHomePage(window.location.href);
		} catch (e) {
			if (window.netscape) {
				try {
					netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
				} catch (e) {
					alert("抱歉！您的浏览器不支持直接设为首页。请在浏览器地址栏输入'about:config'并回车然后将[signed.applets.codebase_principal_support]设置为'true'，点击'加入收藏'后忽略安全提示，即可设置成功。");
				}
			} else {
				alert('抱歉，您的浏览器不支持自动设置首页, 请使用浏览器菜单手动设置!');
			}
		}
	
		return false;
	});



	// 标签切换
	$('.count').add('.articles').add('.mt4').on('mouseover','li',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
	});




	// banner缓存
	$('.banner_slide').slides({name:'slide',interval:5000,speed:500});



	// 底部合作伙伴
	$('.foot_friend').each(function(){

		var idx = 0;
		var speed = 200;
		var $this = $(this);
		var box = $this.children('div')
		var img = $this.find('img');
		var size = img.length;
		img.eq(0).clone().appendTo(box);


		var play = function(){
			idx ++;
			box.stop();
			if(idx>=size){
				box.animate({left:-img.eq(idx-1).position().left - img.eq(idx-1).width()},speed,function(){box.css('left',0);});
				idx = 0;
			}else{
				box.animate({left:-img.eq(idx).position().left},speed);
			}
		}

		var interval = setInterval(play,5000);

		$this.on('click','i',function(){
			clearInterval(interval);
			play();
			interval = setInterval(play,5000);
			return false;
		});


	})


});