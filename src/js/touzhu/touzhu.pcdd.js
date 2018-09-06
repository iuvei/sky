var tpl = [];
var pos_count = 0;

/* 显示号码色波功能  */
var balls_color = [];
balls_color['red'] = [3,6,9,12,15,18,21,24];
balls_color['blue'] = [2,5,8,11,17,20,23,26];
balls_color['green'] = [1,4,7,10,16,19,22,25];
balls_color['normal'] = [0, 13, 14, 27];

// 1 到 27  特码
tpl[0] = '<div class="line" data-value=""><div class="line_title">{line_title}</div>';
tpl[0] += '<div class="line_content">';
var text_tpl0_ball_1 = '';
for(var i = 0; i < 14; i++){
	var bgcolor = function(){
		for (var index in balls_color) {
			if (contains(balls_color[index], i)) {
				return index;
			}
		}
	}
	text_tpl0_ball_1 += '<li class="btn '+bgcolor()+'" data-value="'+i+'">'+i+'</li>';
}
tpl[0] += text_tpl0_ball_1+'</div>';
tpl[0] += '<div class="peilv_container">';
var text_tpl0_peilv_1 = '';
for(var i = 0; i < 14; i++){
	text_tpl0_peilv_1 += '<li class="peilv_box"></li>';
}
text_tpl0_peilv_1 += '</div>';
tpl[0] += text_tpl0_peilv_1+'<div class="line_content" style="margin-left:150px;">';
var text_tpl0_ball_2 = '';
for(var i = 14; i < 28; i++){
	var bgcolor = function(){
		for (var index in balls_color) {
			if (contains(balls_color[index], i)) {
				return index;
			}
		}
	}
	text_tpl0_ball_2 += '<li class="btn '+bgcolor()+'" data-value="'+i+'">'+i+'</li>';
}
text_tpl0_ball_2 += '</div>';
tpl[0] += text_tpl0_ball_2+'<div class="peilv_container">';
var text_tpl0_peilv_2 = '';
for(var i = 14; i < 28; i++){
	text_tpl0_peilv_2 += '<li class="peilv_box"></li>';
}
text_tpl0_peilv_2 += '</div>';
tpl[0] += text_tpl0_peilv_2+'</div>';

//0-27  特码包三
tpl[1] = '<div class="line" data-value=""><div class="line_title">{line_title}</div>';
var text_tpl_ball_1 = '<div class="line_content">';
for(var i = 0; i < 14; i++){
	var bgcolor = function(){
		for (var index in balls_color) {
			if (contains(balls_color[index], i)) {
				return index;
			}
		}
	}
	text_tpl_ball_1 += '<li class="btn n1 '+bgcolor()+'" data-max="3" data-value="'+i+'">'+i+'</li>';
}
tpl[1] += text_tpl_ball_1+'</div>'
var text_tpl_ball_2 = '<div class="line_content" style="margin-left:150px;">';
for(var i = 14; i < 28; i++){
	var bgcolor = function(){
		for (var index in balls_color) {
			if (contains(balls_color[index], i)) {
				return index;
			}
		}
	}
	text_tpl_ball_2 += '<li class="btn n1 '+bgcolor()+'" data-max="3" data-value="'+i+'">'+i+'</li>';
}
tpl[1] += text_tpl_ball_2+'</div></div>';

//混合
var hunhe_ballArr = ['大', '小', '单', '双', '大单', '小单', '大双', '小双', '极大', '极小'];
tpl[2] = '<div class="line" data-value=""><div class="line_title">{line_title}</div>';
tpl[2] += '<div class="line_content">';
var text_tpl2_ball = '';
for(var i = 0; i < 10; i++){
	text_tpl2_ball += '<li class="btn" style="width:55px;" data-value="'+i+'">'+hunhe_ballArr[i]+'</li>';
}
tpl[2] += text_tpl2_ball+'</div>';
tpl[2] += '<div class="peilv_container" style="padding-left:2px;">';
var text_tpl2_peilv = '';
for(var i = 0; i < 10; i++){
	text_tpl2_peilv += '<li class="peilv_box" style="width:55px; margin-left:3px; margin-right:3px;"></li>';
}
text_tpl2_peilv += '</div>';
tpl[2] += text_tpl2_peilv+'</div>';

//波色
var bs_ballArr = ['红波', '绿波', '蓝波'];
tpl[3] = '<div class="line" data-value=""><div class="line_title">{line_title}</div>';
tpl[3] += '<div class="line_content">';
var text_tpl3_ball = '';
for(var i = 0; i < 3; i++){
	text_tpl3_ball += '<li class="btn bs_'+i+'" style="width:55px;" data-value="'+i+'">'+bs_ballArr[i]+'</li>';
}
tpl[3] += text_tpl3_ball+'</div>';
tpl[3] += '<div class="peilv_container" style="padding-left:2px;">';
var text_tpl3_peilv = '';
for(var i = 0; i < 3; i++){
	text_tpl3_peilv += '<li class="peilv_box" style="width:55px; margin-left:3px; margin-right:3px;"></li>';
}
text_tpl3_peilv += '</div>';
tpl[3] += text_tpl3_peilv+'</div>';


// //豹子
tpl[4] = '<div class="line" data-value=""><div class="line_title">{line_title}</div>';
tpl[4] += '<div class="line_content">';
var text_tpl4_ball = '<li class="btn" style="width:55px;" data-value="0">豹子</li>';
tpl[4] += text_tpl4_ball+'</div>';
tpl[4] += '<div class="peilv_container" style="padding-left:2px;">';
var text_tpl4_peilv = '<li class="peilv_box" style="width:55px; margin-left:3px; margin-right:3px;"></li></div>';
tpl[4] += text_tpl4_peilv+'</div>';

//定位胆
tpl[5] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for (var i = 0; i < 10; i += 1) {
	tpl[5] += '<li class="btn" data-value="'+i+'">'+i+'</li>';
}
tpl[5] += '</div><div class="line_tools"><li class="btn" data-type="all">全</li><li class="btn" data-type="big">大</li><li class="btn" data-type="small">小</li>';
tpl[5] += '<li class="btn" data-type="signal">奇</li><li class="btn" data-type="double">偶</li><li class="btn" data-type="clear">清</li></div>';
tpl[5] += '</div>';

//定位大小单双
tpl[6] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn" data-value="0">大</li><li class="btn" data-value="1">小</li>';
tpl[6] += '<li class="btn" data-value="2">单</li><li class="btn" data-value="3">双</li></div>';
tpl[6] += '<div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>';


// ------- 投注添加规则类 ------- //
function touzhuAdd() {
	//特码 特码
	this.add_tema = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = getRandomBall(0,27)+"";
				return_obj.push({balls: balls, output: balls, jj_index:balls});				
			}
		}else{
			$(".line_content li.btn.active").each(function(){
				if(balls != ""){
					balls += " ";
					jj_index += "|";
				}
				var balls = $(this).data("value") + "";
				var jj_index = $(this).index(".touzhu_container .line li.btn");
				return_obj.push({balls: balls, output: balls, jj_index: jj_index});
			})
		}
		return return_obj;
	}

	//特码包三
	this.add_temab3 = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = getRandomBall2(0,27,3," ");
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
	//混合 混合
	this.add_hh = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = getRandomBall(0,9);
				return_obj.push({balls: balls+"", output: hunhe_ballArr[balls], jj_index: balls});
			}
		}else{
			$(".line_content li.btn.active").each(function(){
				if(balls != ""){
					balls += " ";
				}
				var balls = $(this).data("value") + "";
				var output = hunhe_ballArr[$(this).data("value")];
				return_obj.push({balls: balls, output: output, jj_index: balls});
			})
		}
		return return_obj;
	}
	//波色
	this.add_bs = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = getRandomBall(0,2);
				return_obj.push({balls: balls+"", output: bs_ballArr[balls], jj_index: balls});				
			}
		}else{
			var balls = "";
			var output = "";
			$(".line_content li.btn.active").each(function(){
				balls = $(this).data("value")+"";
				output = bs_ballArr[$(this).data("value")];
				return_obj.push({balls: balls, output: output, jj_index: balls});
			})
		}
		return return_obj;
	}
	//豹子
	this.add_bz = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i++){
				var balls = '0';
				return_obj.push({balls: balls, output: '豹子'});
			}
		}else{
			if ($(".line_content li.btn.active").length == 1) {
				var balls = "0";
				return_obj.push({balls: balls, output: '豹子'});
			}
		}
		return return_obj;
	}
	//定位胆
	this.add_dwd = function(r_count){
		var return_obj = [];
		var outputs = ['正一({0})', '正二({0})', '正三({0})'];
		if(r_count){
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0, 3)+"";
				var pos = getRandomBall(0, 2); 
				var output = outputs[pos].format(balls);
				return_obj.push({balls: Math.pow(2, pos)+ " "+balls, output: output});
			}
		}else{
			var pos = 0, k = 0, balls = "", output = "";
			$(".line_content").each(function(){
				if($(this).find("li.btn.active").length > 0){
					pos += Math.pow(2, k);
					if(balls != ""){
						balls += " ";
					}
					if(output != ""){
						output += " , ";						
					}
					var sub_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(sub_ball != ""){
							sub_ball += "|";
						}
						sub_ball += $(this).data("value");
					})
					balls += sub_ball;
					output += outputs[k].format(sub_ball);
				}
				k += 1;
			})
			return_obj.push({balls: pos+" "+balls, output: output});
		}
		return return_obj;
	}
	//定位大小单双
	this.add_dw_dxds = function(r_count){
		var return_obj = [];
		var outputs = ['正一({0})', '正二({0})', '正三({0})'];
		var shows = ['大', '小', '单', '双'];
		if(r_count){
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0, 3);
				var pos = getRandomBall(0,2);
				var output = outputs[pos].format(shows[balls]);
				return_obj.push({balls: Math.pow(2, pos)+" "+balls, output: output});
			}
		}else{
			var balls = "", pos = 0, k = 0, output = "";
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length) {
					pos += Math.pow(2, k);
					if(balls != ""){
						balls += " ";
					}
					if(output != ""){
						output += " , ";
					}
					var sub_ball = "", sub_output = "";
					$(this).find("li.btn.active").each(function(){
						if(sub_ball != ""){
							sub_ball += "|";							
						}
						if (sub_output != "") {
							sub_output += "|";
						}
						sub_ball += $(this).data("value");
						sub_output += shows[$(this).data("value")];
					})
					balls += sub_ball;
					output += outputs[k].format(sub_output);
				}
				k += 1;
			})
			return_obj.push({balls: pos + " " + balls, output: output});
		}
		return return_obj;
	}
	// 特码大小单双
	this.add_tmdxds = function (r_count) {
		var return_obj = [];
		var outputs = ['大', '小', '单', '双'];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0, 3);
				var output = outputs[balls];
				return_obj.push({balls: balls+"", output: output});
			}
		}else{
			var balls = "", output = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				if (output != "") {
					output += "|";
				}
				balls += $(this).data("value");
				output += outputs[$(this).data("value")];
			})
			return_obj.push({balls: balls, output: output});
		}
		return return_obj;
	}
	
	//END FUNC touzhuAdd
}