
$(document).ready(function(){

	// 标签切换
	$('.js-tag').on('mouseover','li',function(){
		$(this).addClass('active').siblings('li').removeClass('active');
	});



	$('.js-datepicker').datepicker({ //添加日期选择功能  
		numberOfMonths: 1, //显示几个月  
		showButtonPanel: true, //是否显示按钮面板  
		dateFormat: 'yy-mm-dd', //日期格式  
		clearText: "清除", //清除日期的按钮名称  
		closeText: "关闭", //关闭选择框的按钮名称  
		yearSuffix: '年', //年的后缀  
		showMonthAfterYear: true, //是否把月放在年的后面   
		monthNames: ['一月', '二月', '三月', '四月', '五月', '六月', '七月', '八月', '九月', '十月', '十一月', '十二月'],
		dayNames: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
		dayNamesShort: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
		dayNamesMin: ['日', '一', '二', '三', '四', '五', '六'],
		onSelect: function(selectedDate) { //选择日期后执行的操作  
			// alert(selectedDate);  

		}
	}).datepicker('setDate',new Date());



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





