var tpl = [];
var pos_count = 0;

tpl[0] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
var text_tpl0 = '';
for(var i = 0; i < 10; i++){
	text_tpl0 += '<li class="btn" data-value="'+i+'">'+i+'</li>';
}
text_tpl0 += '</div><div class="line_tools"><li class="btn" data-type="all">全</li><li class="btn" data-type="big">大</li><li class="btn" data-type="small">小</li>';
text_tpl0 += '<li class="btn" data-type="signal">奇</li><li class="btn" data-type="double">偶</li><li class="btn" data-type="clear">清</li></div></div>';
tpl[0] += text_tpl0;

// 不带选位置的文本框
tpl[1] = '<div class="touzhu_container_left"><textarea class="touzhu_area"></textarea></div><div class="touzhu_container_right"><div class="line"><a class="touzhu_btn nodouble_btn" href="javascript:;">删除重复号</a></div>';
tpl[1] += '<div class="line"><a class="touzhu_btn upload_file" href="javascript:;">导入文件</a></div> <div class="line"><a class="touzhu_btn clear_btn" href="javascript:;">清空</a></div> </div>';
tpl[1] += '</div><div class="tiper">每一个号码之间请用竖线[|] 或者 斜杠[/] 隔开 --- 每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开</div><input class="file_upload_txt" type="file" style="display:none;" />';

//直选和值 0 到 27
tpl[2] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 0; i < 14; i += 1){
	tpl[2] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[2] += '</div>';

tpl[2] += '<div class="peilv_container">';
for(var i = 0; i < 14; i++){
	tpl[2] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[2] += '</div>';

tpl[2] += '<div class="line_content" style="margin-left:150px;">';
for(var i = 14; i < 28; i += 1){
	tpl[2] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[2] += '</div>';
tpl[2] += '<div class="peilv_container">';
for(var i = 0; i < 14; i++){
	tpl[2] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[2] += '</div>';
tpl[2] += '</div>';

//组三和值 1 - 26
tpl[3] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 1; i < 14; i += 1){
	tpl[3] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[3] += '</div>';

tpl[3] += '<div class="peilv_container">';
for(var i = 0; i < 13; i++){
	tpl[3] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[3] += '</div>';

tpl[3] += '<div class="line_content" style="margin-left:150px;">';
for(var i = 14; i < 27; i += 1){
	tpl[3] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[3] += '</div>';
tpl[3] += '<div class="peilv_container">';
for(var i = 0; i < 13; i++){
	tpl[3] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[3] += '</div>';
tpl[3] += '</div>';

//组六和值 3 - 24
tpl[4] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 3; i < 14; i += 1){
	tpl[4] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[4] += '</div>';

tpl[4] += '<div class="peilv_container">';
for(var i = 0; i < 11; i++){
	tpl[4] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[4] += '</div>';

tpl[4] += '<div class="line_content" style="margin-left:150px;">';
for(var i = 14; i < 25; i += 1){
	tpl[4] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[4] += '</div>';
tpl[4] += '<div class="peilv_container">';
for(var i = 0; i < 11; i++){
	tpl[4] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[4] += '</div>';
tpl[4] += '</div>';

// 大 小 单  双
tpl[5] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn" data-value="0">大</li><li class="btn" data-value="1">小</li>';
tpl[5] += '<li class="btn" data-value="2">单</li><li class="btn" data-value="3">双</li></div></div>';

//对子通选
tpl[6] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn rect" style="width:150px;" data-value="0">二同号通选</li></div></div>';

//对子单选
tpl[7] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for (var i = 0; i < 10; i += 1) {
	tpl[7] += '<li class="btn" data-value="'+i+'">'+i+''+i+'</li>';
}
tpl[7] += '</div><div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>';

//顺子通选
tpl[8] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn rect" style="width:150px;" data-value="0">顺子通选</li></div></div>';

//顺子单选
tpl[9] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 0; i < 4; i += 1){
	tpl[9] += '<li class="btn rect" data-value="'+i+'">'+i+''+(i+1)+''+(i+2)+'</li>';
}
tpl[9] += '</div><div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div><div class="line_content" style="margin-left:150px;">';
for(var i = 4; i < 8; i += 1){
	tpl[9] += '<li class="btn rect" data-value="'+i+'">'+i+''+(i+1)+''+(i+2)+'</li>';
}
tpl[9] += '</div></div>';
//豹子通选
tpl[10] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn rect" style="width:150px;" data-value="0">豹子通选</li></div></div>';

//豹子单选
tpl[11] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 0; i < 5; i += 1){
	tpl[11] += '<li class="btn rect" data-value="'+i+'">'+i+''+i+''+i+'</li>';
}
tpl[11] += '</div><div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div><div class="line_content" style="margin-left:150px;">';
for(var i = 5; i < 10; i += 1){
	tpl[11] += '<li class="btn rect" data-value="'+i+'">'+i+''+i+''+i+'</li>';
}
tpl[11] += '</div></div>';
//龙虎斗
tpl[12] = '<div class="line" data-value=""><div class="line_title">{line_title}</div>';
tpl[12] += '<div class="line_content"><li class="btn rect" data-value="0v1">百位</li><li class="btn_text">VS</li><li class="btn rect" data-value="1v0">十位</li></div>';
tpl[12] += '<div class="line_content"><li class="btn rect" data-value="0v2">百位</li><li class="btn_text">VS</li><li class="btn rect" data-value="2v0">个位</li></div>';
tpl[12] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="1v2">十位</li><li class="btn_text">VS</li><li class="btn rect" data-value="2v1">个位</li></div>';
tpl[12] += '</div>';

//定位大小单双
tpl[13] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
var dxds_text = ['大', '小', '单', '双'];
for (var i = 0; i < 4; i += 1) {
	tpl[13] += '<li class="btn" data-value="'+i+'">'+dxds_text[i]+'</li>';
}
tpl[13] += '</div><div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>';

//总大小单双
tpl[14] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
var dxds_sum_text = ['总大', '总小', '总单', '总双', '尾大', '尾小'];
for (var i = 0; i < 6; i += 1) {
	tpl[14] += '<li class="btn rect" data-value="'+i+'">'+dxds_sum_text[i]+'</li>';
}
tpl[14] += '</div><div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>';

// ------- 投注添加规则类 ------- //

function touzhuAdd() {
	//直选复式
	this.add_3x_zhxfs = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					if (balls != "") {
						balls += " ";
					}
					var child_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(child_ball != ""){
							child_ball += "|";
						}
						child_ball += $(this).data("value");
					});
					balls += child_ball;
				}
			});
			return_obj.push({balls: balls, output: balls.split(" ")});
		}
		return return_obj;
	}

	//直选单式
	this.add_3x_zhxds = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(1, 9, 3, "|");
				console.log(balls);
				
				return_obj.push({balls: balls, output: balls.split("|")});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			for (var i = 0; i < balls.length; i++) {
				return_obj.push({balls: balls[i].split(/[\|\/]/).join("|"), output: balls[i].split(/[\|\/]/)});
			}
		}
		return return_obj;
	}

	//直选和值
	this.add_3x_zhxhz  = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = getRandomBall(0,27)+"";
				return_obj.push({balls: balls, output: balls.split(" ").join("|"), jj_index: parseInt(balls)});
			}
		}else{
			$(".touzhu_container .line_content li.btn.active").each(function(){
				var balls = $(this).data("value");
				return_obj.push({balls: balls + "", output: balls + "", jj_index: balls});
			})
		}
		return return_obj;
	}

	//组三复式
	this.add_3x_zu3fs = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0, 9, 2, " ");
				return_obj.push({balls: balls, output: balls.split(" ").join("|")});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls.split(" ").join("|")});			
		}
		return return_obj;
	}

	//组六复式
	this.add_3x_zu6fs = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = getRandomBall2(0, 9, 3, " ");
				return_obj.push({balls: balls, output: balls.split(" ").join("|")});
			}
		}else{
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if(balls != ""){
					balls += " ";
				}
				balls += $(this).data("value");
			})
			return_obj.push({balls: balls, output: balls.split(" ").join("|")});
		}
		return return_obj;
	}

	//组三和值
	this.add_3x_zu3hz = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls =  getRandomBall(1,26)+"";
				return_obj.push({balls: balls, output: balls.split(" ").join("|"), jj_index: parseInt(balls) - 1});
			}
		}else{
			$(".touzhu_container .line_content li.btn.active").each(function(){
				var balls = $(this).data("value");
				return_obj.push({balls: balls + "", output: balls + "", jj_index: balls - 1});
			})
		}
		return return_obj;
	}

	//组六和值
	this.add_3x_zu6hz = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls =  getRandomBall(3,24)+"";
				return_obj.push({balls: balls, output: balls.split(" ").join("|"), jj_index: parseInt(balls) - 3});
			}
		}else{
			$(".touzhu_container .line_content li.btn.active").each(function(){
				var balls = $(this).data("value");
				return_obj.push({balls: balls + "", output: balls + "", jj_index: balls - 3});
			})
		}
		return return_obj;
	}

	//二星 直选复式
	this.add_2x_q2zhxfs = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					if (balls != "") {
						balls += " ";
					}
					var child_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(child_ball != ""){
							child_ball += "|";
						}
						child_ball += $(this).data("value");
					});
					balls += child_ball;
				}
			});
			return_obj.push({balls: balls, output: balls.split(" ")});
		}
		return return_obj;
	}

	//后二 直选复式
	this.add_2x_h2zhxfs = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					if (balls != "") {
						balls += " ";
					}
					var child_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(child_ball != ""){
							child_ball += "|";
						}
						child_ball += $(this).data("value");
					});
					balls += child_ball;
				}
			});
			return_obj.push({balls: balls, output: balls.split(" ")});
		}
		return return_obj;
	}

	//前二组选复式
	this.add_2x_q2zuxfs = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0, 9, 2, " ");
				return_obj.push({balls: balls, output: balls.split(" ").join("|")});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls.split(" ").join("|")});			
		}
		return return_obj;
	}

	//后二组选复式
	this.add_2x_h2zuxfs = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0, 9, 2, " ");
				return_obj.push({balls: balls, output: balls.split(" ").join("|")});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls.split(" ").join("|")});			
		}
		return return_obj;
	}

	//定位胆
	this.add_dwd_dwd = function(r_count){
		var return_obj = [];
		var pos = ["百位({0})", "十位({0})", "个位({0})"];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var tempsub = getRandomBall(0,9)+"";
				var i_random = Math.floor(Math.random(0,1)*3);
				switch (i_random){
					case 0:
					var balls = tempsub+" ? ?";
						break;
					case 1:
					var balls = "? "+tempsub+" ?";
						break;
					case 2:
					var balls = "? ? "+tempsub;
						break;
					default:
						break;
				}
				return_obj.push({balls:balls, output: pos[i_random].format(tempsub)});
			}
		} else {
			var balls = "";
			var output = "";
			var i = 0;
			$(".line_content").each(function(){
				if (balls != "") {
					balls += " ";
				}
				var sub_ball = "";
				var child_ball = "";
				if ($(this).find("li.btn.active").length == 0) {
					balls += "?";
				} else {
					$(this).find("li.btn.active").each(function(){
						if (sub_ball != "") {
							sub_ball+=",";
						}
						if(child_ball != ""){
							child_ball += "|";
						}
						child_ball += $(this).data("value");
						sub_ball+=$(this).data("value");
					});
					balls += child_ball;
					if (output != "") {
						output += " ";
					}
					output += pos[i].format([sub_ball]);
				}
				i++;
			});
			return_obj.push({balls:balls, output: output});
		}
		return return_obj;
	}

	//一码不定位
	this.add_bdw_1mbdw = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls: balls, output: balls});				
			}
		}else{
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if(balls != ""){
					balls += " ";
				}
				balls += $(this).data("value");
			})
			return_obj.push({balls: balls, output: balls.split(' ').join('|')});
		}
		return return_obj;
	}

	//二码不定位
	this.add_bdw_2mbdw = function(r_count){
		var return_obj = [];
		if(r_count){
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(' ').join(',')});
			}
		}else{
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if(balls != ""){
					balls += " ";
				}
				balls += $(this).data("value");
			})
			return_obj.push({balls: balls, output: balls.split(' ').join(',')});
		}
		return return_obj;
	}

	//前二大小单双
	this.add_dxds_q2dxds = function(r_count){
		var dxds = ["大", "小", "单", "双"];
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,3,2," ");
				var ba = balls.split(" ");
				return_obj.push({balls: balls, output: [dxds[ba[0]], dxds[ba[1]]]});
			}
		} else {
			var balls = "";
			var show_ball = ["",""];
			var i = 0;
			$(".line_content").each(function(){
				if($(this).find("li.btn.active").length > 0){
					if (balls != "") {
						balls += " ";
					}
					var child_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(child_ball != ""){
							child_ball += "|";
						}
						child_ball += $(this).data("value");
						show_ball[i] += dxds[$(this).data("value")];
					});
					balls += child_ball;
				}
				i++;
			});
			return_obj.push({balls: balls, output: show_ball});
		}
		return return_obj;
	}

	//后二大小单双
	this.add_dxds_h2dxds = function(r_count){
		var dxds = ["大", "小", "单", "双"];
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,3,2," ");
				var ba = balls.split(" ");
				return_obj.push({balls: balls, output: [dxds[ba[0]], dxds[ba[1]]]});
			}
		} else {
			var balls = "";
			var show_ball = ["",""];
			var i = 0;
			$(".line_content").each(function(){
				if($(this).find("li.btn.active").length > 0){
					if (balls != "") {
						balls += " ";
					}
					var child_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(child_ball != ""){
							child_ball += "|";
						}
						child_ball += $(this).data("value");
						show_ball[i] += dxds[$(this).data("value")];
					});
					balls += child_ball;
				}
				i++;
			});
			return_obj.push({balls: balls, output: show_ball});
		}
		return return_obj;
	}
	
	//对子通选
	this.add_dztx = function(r_count){
		var return_obj = [];
		if(r_count){
			for (var i = 0; i < r_count; i+= 1) {
				var balls = '0';
				return_obj.push({balls: balls, output: '对子通选'});
			}
		}else{
			if($(".line_content li.btn.active").length > 0){
				var balls = '0';
				return_obj.push({balls: balls, output: '对子通选'});
			}
		}
		return return_obj;
	}
	
	//对子单选
	this.add_dzdx = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i +=1) {
				var balls = getRandomBall(0,9)+"";
				var output = balls + "" + balls;
				return_obj.push({balls: balls, output: output});
			}
		} else{
			var balls = "", output = "";
			$(".line_content li.btn.active").each(function(){
				if(balls != ""){
					balls += " ";
				}
				if(output != ""){
					output += " , ";
				}
				balls += $(this).data("value");
				output += $(this).text();
			})
			return_obj.push({balls: balls, output: output});
		}
		return return_obj;
	}
	
	//顺子通选
	this.add_sztx = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = '0', output = '顺子通选';
				return_obj.push({balls: balls, output: output});
			}
		} else{
			var balls = '', output = '';
			if ($(".line_content .btn").hasClass("active")) {
				balls = '0'; output = '顺子通选';
			}
			return_obj.push({balls: balls, output: output});
		}
		return return_obj;
	}
	
	//顺子单选
	this.add_szdx = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0,7);
				var output = $("li.btn.rect").eq(balls).text();
				return_obj.push({balls: balls+"", output: output});
			}
		} else{
			var balls = "", output = "";
			$(".line_content li.btn.rect.active").each(function(){
				if(balls != ""){
					balls += " ";
				}
				if (output != "") {
					output += " , ";
				}
				balls += $(this).data("value");
				output += $(this).text();
			})
			return_obj.push({balls: balls, output: output});
		}
		return return_obj;
	}
	
	//豹子单选
	this.add_bzdx = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0, 9);
				var output = $("li.btn.rect").eq(balls).text();
				return_obj.push({balls: balls+"", output: output});
			}
		} else{
			var balls = "", output = "";
			$(".line_content li.btn.rect.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				if (output != "") {
					output += " , ";
				}
				balls += $(this).data("value");
				output += $(this).text();
			})
			return_obj.push({balls: balls, output: output});
		}
		return return_obj;
	}
	
	//豹子通选
	this.add_bztx = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = '0', output = '豹子通选';
				return_obj.push({balls: balls, output: output});
			}
		} else{
			if($(".line_content li.btn.rect.active").length > 0){
				var balls = "0", output = "豹子通选";
				return_obj.push({balls: balls, output: output});
			}
		}
		return return_obj;
	}
	
	//龙虎斗
	this.add_lhd = function(r_count){
		var return_obj = [];
		var outputs = ['百位', '十位', '个位'];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0, 5);
				var idx_text = $("li.btn.rect").eq(balls).data("value");
				var output = outputs[idx_text[0]]+'	VS '+outputs[idx_text[2]];
				return_obj.push({balls: balls+"", output: output});
			}
		} else{
			var balls = "", output = "";
			if($(".line_content li.btn.rect.active").length > 0){
				$(".line_content li.btn.rect.active").each(function(){
					if (balls != "") {
						balls += " ";
					}
					if (output != "") {
						output += " , ";
					}
					var sub_ball = $(this).data("value");
					balls += sub_ball;
					output +=  outputs[sub_ball[0]]+' VS '+outputs[sub_ball[2]];
				})
				return_obj.push({balls: balls, output: output});
			}
		}
		return return_obj;
	}
	
	//定位大小单双
	this.add_dw_dxds = function(r_count){
		var return_obj  = [];
		var outputs  = ['百位({0})', '十位({0})', '个位({0})'];
		var sub_text = ['大', '小', '单', '双'];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0,3);
				var k = getRandomBall(0, 2);
				var pos = Math.pow(2, k);
				return_obj.push({balls: pos+" "+balls, output: outputs[k].format(sub_text[balls])});
			}
		} else{
			var balls = '', output = '', pos = 0, k = 0;
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					pos += Math.pow(2, k);
					if (balls != '') {
						balls += " ";
					}
					if (output != "") {
						output += " , ";
					}
					var sub_ball = "", sub_output = "";
					$(this).find("li.btn.active").each(function(){
						if (sub_ball != "") {
							sub_ball += "|";
						}
						if (sub_output != "") {
							sub_output += "|";
						}
						sub_ball += $(this).data("value");
						sub_output += $(this).text();
					})
					balls += sub_ball;
					output += outputs[k].format(sub_output);
				}
				k += 1;
			})
			return_obj.push({balls: pos+" "+balls, output: output});
		}
		return return_obj;
	}
	
	//和值大小单双
	this.add_hz_dxds = function(r_count){
		var return_obj = [];
		var outputs = ['总大', '总小', '总单', '总双', '尾大', '尾小'];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0,5);
				var output = outputs[balls];
				return_obj.push({balls: balls+"", output: output});
			}
		} else{
			var balls = "", output = "";
			$(".line_content li.btn.rect.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				if (output != "") {
					output += " , "
				}
				balls += $(this).data("value");
				output += outputs[$(this).data("value")];
			})
			return_obj.push({balls: balls, output: output});
		}
		return return_obj;
	}
	

//END function touzhuAdd
}