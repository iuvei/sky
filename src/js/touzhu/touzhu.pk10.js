var tpl = [];
var pos_count = 0;
// 可重复的0-9
tpl[0] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn" data-value="01">01</li><li class="btn" data-value="02">02</li>';
tpl[0] += '<li class="btn" data-value="03">03</li><li class="btn" data-value="04">04</li><li class="btn" data-value="05">05</li><li class="btn" data-value="06">06</li>';
tpl[0] += '<li class="btn" data-value="07">07</li><li class="btn" data-value="08">08</li><li class="btn" data-value="09">09</li><li class="btn" data-value="10">10</li></div>';
tpl[0] += '<div class="line_tools"><li class="btn" data-type="all">全</li><li class="btn" data-type="big">大</li><li class="btn" data-type="small">小</li>';
tpl[0] += '<li class="btn" data-type="signal">奇</li><li class="btn" data-type="double">偶</li><li class="btn" data-type="clear">清</li></div></div>';

// 不带选位置的文本框
tpl[1] = '<div class="touzhu_container_left"><textarea class="touzhu_area" placeholder="{tip}"></textarea></div><div class="touzhu_container_right"><div class="line"><a class="touzhu_btn nodouble_btn" href="javascript:;">删除重复号</a></div>';
tpl[1] += '<div class="line"><a class="touzhu_btn upload_file" href="javascript:;">导入文件</a></div> <div class="line"><a class="touzhu_btn clear_btn" href="javascript:;">清空</a></div> </div>';
tpl[1] += '</div><div class="tiper">每一个号码之间请用竖线[|] 或者 斜杠[/] 隔开 --- 每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开</div><input class="file_upload_txt" type="file" style="display:none;" />';

// 终于写到代码了，啊。。春天在哪里？ 前二和值
tpl[2] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 3; i < 12; i += 1){
	tpl[2] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[2] += '</div>';

tpl[2] += '<div class="peilv_container">';
for(var i = 0; i < 9; i++){
	tpl[2] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[2] += '</div>';

tpl[2] += '<div class="line_content" style="margin-left:150px;">';
for(var i = 12; i < 20; i += 1){
	tpl[2] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[2] += '</div>';
tpl[2] += '<div class="peilv_container">';
for(var i = 0; i < 8; i++){
	tpl[2] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[2] += '</div>';
tpl[2] += '</div>';

//前三和值
tpl[3] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 6; i < 18; i += 1){
	tpl[3] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[3] += '</div>';

tpl[3] += '<div class="peilv_container">';
for(var i = 0; i < 12; i++){
	tpl[3] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[3] += '</div>';

tpl[3] += '<div class="line_content" style="margin-left:150px;">';
for(var i = 18; i < 28; i += 1){
	tpl[3] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[3] += '</div>';
tpl[3] += '<div class="peilv_container">';
for(var i = 0; i < 10; i++){
	tpl[3] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[3] += '</div>';
tpl[3] += '</div>';

// 终于写到代码了，啊。。春天在哪里？ 前四和值
tpl[4] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">';
for(var i = 10; i < 22; i += 1){
	tpl[4] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[4] += '</div>';

tpl[4] += '<div class="peilv_container">';
for(var i = 0; i < 12; i++){
	tpl[4] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[4] += '</div>';

tpl[4] += '<div class="line_content" style="margin-left:150px;">';
for(var i = 22; i < 34; i += 1){
	tpl[4] += '<li class="btn" data-value="'+i+'" style="width: 39px;">'+i+'</li>';
}
tpl[4] += '</div>';
tpl[4] += '<div class="peilv_container">';
for(var i = 0; i < 12; i++){
	tpl[4] += '<li class="peilv_box" style="width: 43px;"></li>';
}
tpl[4] += '</div>';
tpl[4] += '</div>';

//定位大小单双
tpl[5] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn" data-value="0">大</li><li class="btn" data-value="1">小</li>';
tpl[5] += '<li class="btn" data-value="2">单</li><li class="btn" data-value="3">双</li></div>';
tpl[5] += '<div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>';

//前三 总特选
tpl[6] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn rect" data-value="0">全大</li><li class="btn rect" data-value="1">全小</li>';
tpl[6] += '<li class="btn rect" data-value="2">全单</li><li class="btn rect" data-value="3">全双</li></div>';
tpl[6] += '<div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>';

//龙虎斗
tpl[7] = '<div class="line"><div class="line_title">{line_title}</div>';
tpl[7] += '<div class="line_content"><li data-value="0v1" class="btn rect">冠军</li><li class="btn_text">VS</li><li class="btn rect" data-value="1v0">亚军</li></div>';
tpl[7] += '<div class="line_content"><li class="btn rect" data-value="0v2">冠军</li><li class="btn_text">VS</li><li class="btn rect" data-value="2v0">季军</li></div>';
tpl[7] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="0v3">冠军</li><li class="btn_text">VS</li><li data-value="3v0" class="btn rect">四名</li></div>';
tpl[7] += '<div class="line_content"><li class="btn rect" data-value="0v4">冠军</li><li class="btn_text">VS</li><li data-value="4v0" class="btn rect">五名</li></div>';
tpl[7] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="1v2">亚军</li><li class="btn_text">VS</li><li data-value="2v1" class="btn rect">季军</li></div>';
tpl[7] += '<div class="line_content"><li class="btn rect" data-value="1v3">亚军</li><li class="btn_text">VS</li><li data-value="3v1" class="btn rect">四名</li></div>';
tpl[7] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="1v4">亚军</li><li class="btn_text">VS</li><li data-value="4v1" class="btn rect">五名</li></div>';
tpl[7] += '<div class="line_content"><li class="btn rect" data-value="2v3">季军</li><li class="btn_text">VS</li><li data-value="3v2" class="btn rect">四名</li></div>';
tpl[7] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="2v4">季军</li><li class="btn_text">VS</li><li data-value="4v2" class="btn rect">五名</li></div>';
tpl[7] += '<div class="line_content"><li class="btn rect" data-value="3v4">四名</li><li class="btn_text">VS</li><li data-value="4v3" class="btn rect">五名</li></div>';
tpl[7] += '</div>';

tpl_pos = '';


// 投注添加规则类
function touzhuAdd() {
	var self = this;
	
	// 前一 直选复式
	this.add_q1_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(1,10)+"";
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls!="") {
					balls+=" ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 前二 直选复式
	this.add_q2_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var index = getRandomBall2(0,9,2, "");
				var balls = $('.line_content').eq(0).find("li.btn").eq(index[0]).data("value");
				balls += " " + $('.line_content').eq(1).find("li.btn").eq(index[1]).data("value");
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					if (balls != "") {
						balls += " ";
					}
					var subballs = "";
					$(this).find("li.btn.active").each(function(){
						if (subballs != "") {
							subballs += "|";
						}
						subballs += $(this).data("value");
					});
					balls += subballs;
				}
			});
			return_obj.push({balls: balls, output: balls.split(" ")});
		}
		return return_obj;
	}
	
	// 前二 直选单式 ~~~暂时没做
	this.add_q2_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(1,10,2,"|");
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
	
	// 前三 直选复式
	this.add_q3_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var index = getRandomBall2(0,9,3, "");
				var balls = $('.line_content').eq(0).find("li.btn").eq(index[0]).data("value");
				balls += " " + $('.line_content').eq(1).find("li.btn").eq(index[1]).data("value");
				balls += " " + $('.line_content').eq(2).find("li.btn").eq(index[2]).data("value");
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					var subballs = "";
					$(this).find("li.btn.active").each(function(){
						if (subballs != "") {
							subballs += "|";
						}
						subballs += $(this).data("value");
					});
					if (balls != "") {
						balls += " ";
					}
					balls += subballs;
				}
			});
			return_obj.push({balls: balls, output: balls.split(" ")});
		}
		return return_obj;
	}
	
	// 前三 直选单式 ~~~~暂时没做
	this.add_q3_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(1, 10, 3, "|");
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
	
	// 定位胆
	this.add_dwd = function(r_count) {
		var return_obj = [];
		if (r_count) {
			var ba = [];
			for(var i = 0; i< r_count; i++) {
				var posx = getRandPosMask(1);	// 取得一个随机位置
				var balls = getRandomBall(1,10);	// 取得一个随机号码
				var output = getPositionStr(posx, [balls]);	// 取得一个随机结果
				return_obj.push({balls: posx+" "+balls, output: output});
			}
			
		} else {
			var balls = "";
			var posx = 0;
			var i = 0;
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					posx += Math.pow(2, i);
					if (balls != "") {
						balls += " ";
					}
					var subballs = "";
					$(this).find("li.btn.active").each(function(){
						if (subballs != "") {
							subballs += "|";
						}
						subballs += $(this).data("value");
					});
					balls += subballs;
				}
				i++;
			});
			var output = getPositionStr(posx, balls.split(" "));
			return_obj.push({balls: posx+" "+balls, output});
		}
		return return_obj;
	}

	//前二和值
	this.add_q2_hz = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i += 1){
				var balls = getRandomBall(3,19)+"";
				return_obj.push({balls: balls, output: balls, jj_index: parseInt(balls) - 3});
			}
		}else{
			$(".line_content").each(function(){
				if($(this).find("li.btn.active").length > 0){
					$(this).find("li.btn.active").each(function(){
						if(balls != ""){
							balls += " ";
						}
						var balls = $(this).data("value");
						return_obj.push({balls: balls + "", output: balls + "", jj_index: parseInt(balls) - 3});
					})
				}
			})
		}
		return return_obj;
	}

	this.add_q3_hz = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i += 1){
				var balls = getRandomBall(6,27)+"";
				return_obj.push({balls: balls, output: balls, jj_index: parseInt(balls) - 6});
			}
		}else{
			$(".line_content").each(function(){
				if($(this).find("li.btn.active").length > 0){
					$(this).find("li.btn.active").each(function(){
						if(balls != ""){
							balls += " ";
						}
						var balls = $(this).data("value");
						return_obj.push({balls: balls + "", output: balls + "", jj_index: parseInt(balls) - 6});
					})
				}
			})
		}
		return return_obj;
	}

	//前四和值
	this.add_q4_hz = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i += 1){
				var balls = getRandomBall(10,33)+"";
				return_obj.push({balls: balls, output: balls, jj_index: parseInt(balls) - 10});
			}
		}else{
			$(".line_content").each(function(){
				if($(this).find("li.btn.active").length > 0){
					$(this).find("li.btn.active").each(function(){
						if(balls != ""){
							balls += " ";
						}
						var balls = $(this).data("value");
						return_obj.push({balls: balls + "", output: balls + "", jj_index: parseInt(balls) - 10});
					})
				}
			})
		}
		return return_obj;
	}

	//定位大小单双
	this.add_all_dxds = function(r_count){
		var return_obj = [];
		if(r_count){
			for(var i = 0; i < r_count; i += 1){
				var balls = getRandomBall(0,3);
				var pos = getRandPosMask(1);
				var output = getPositionStr_dxds(pos, balls);
				return_obj.push({balls: pos+" "+balls, output: output});
			}
		}else{
			var balls = "";
			var output = "";
			var pos = 0;
			var k = 0;
			$(".line_content").each(function(){
				if($(this).find("li.btn.active").length > 0){
					if(balls != ""){
						balls += " ";
					}
					var subballs = "";
					var output_ball = "";
					pos += Math.pow(2, k);

					$(this).find("li.btn.active").each(function(){
						if(subballs != ""){
							subballs += "|";
						}
						subballs += $(this).data("value");
						output_ball += getPositionStr_dxds(Math.pow(2, k), $(this).data("value")) + " ";
					})
					output += output_ball;
					balls += subballs;
				}
				k++;
			})
			return_obj.push({balls: pos+" "+balls, output: output});
		}
		return return_obj;
	}

	//前三大小单双
	this.add_q3_dxds = function(r_count){
		var return_obj = [];
		var outputs = ['大', '小', '单', '双'];
		if (r_count) {
			for(var i = 0; i < r_count; i += 1){
				var balls = getRandomBall(0,3);
				var output = outputs[balls];
				return_obj.push({balls: balls+"", output: output});
			}
		} else{
			var balls = "";
			output = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				if(output != ""){
					output += " , ";
				}
				balls += $(this).data("value");
				output += outputs[$(this).data("value")];
			})
			return_obj.push({balls: balls, output: output});
		}		
		return return_obj;
	}

	this.add_q3_qtx = function(r_count){
		var return_obj = [];
		var outputs = ['全大', '全小', '全单', '全双'];
		if(r_count){
			for(var i = 0; i < r_count; i += 1){
				var balls = getRandomBall(0,3);
				var output = outputs[balls];
				return_obj.push({balls: balls+"", output: output});
			}
		}else{
			var balls = "";
			var output = "";
			if($(".line_content li.btn.active").length > 0){
				$(".line_content li.btn.active").each(function(){
					if(balls != ""){
						balls += " ";
					}
					if(output != ""){
						output += ",";
					}
					balls += $(this).data("value");
					output += outputs[$(this).data("value")];
				})
				return_obj.push({balls: balls, output: output});
			}
		}
		return return_obj;
	}

	//龙虎斗
	this.add_whjx = function(r_count){
		var return_obj = [];
		var outputs = ['冠', '亚', '季', '四', '五'];
		if(r_count){
			for(var i = 0; i < r_count; i += 1){
				var balls = $("li.btn.rect").eq(getRandomBall(0,19)).data("value");
				output =  outputs[balls[0]] + " VS " + outputs[balls[2]];
				return_obj.push({balls: balls, output: output});
			}
		}else{
			var balls = "";
			var output = "";
			$("li.btn.rect.active").each(function(){
				if(balls != ""){
					balls += " ";
				}
				if(output != ""){
					output += " , ";
				}
				balls += $(this).data("value");
				output += outputs[$(this).data("value")[0]] + " VS " + outputs[$(this).data("value")[2]];
			})
			return_obj.push({balls: balls, output: output});
		}
		return return_obj;
	}
	//END CLASS
}

// 获取位置文本 格式: 万位(1) 千位(2)
var getPositionStr = function(pos, balls) {
	var position_str = ["第一名({0})", "第二名({0})", "第三名({0})", "第四名({0})", "第五名({0})", "第六名({0})", "第七名({0})", "第八名({0})", "第九名({0})", "第十名({0})"];
	var output = "";
	var k = 0;
	for (var i = 0; i < 10; i++) {
		if ((pos & Math.pow(2,i)) > 0) {
			if (output != "") {
				output += " ";
			}
			output += position_str[i].format(balls[k]);
			k++;
		}
	}
	return output;
}

// 获取位置文本 格式: 万位(1) 千位(2)
var getPositionStr_dxds = function(pos, balls) {
	var position_str = ["第一名({0})", "第二名({0})", "第三名({0})", "第四名({0})", "第五名({0})", "第六名({0})", "第七名({0})", "第八名({0})", "第九名({0})", "第十名({0})"];
	var outputs = ['大', '小', '单', '双'];
	var output = "";
	//var k = 0;
	for (var i = 0; i < 10; i++) {
		if ((pos & Math.pow(2,i)) > 0) {
			if (output != "") {
				output += " ";
			}
			output += position_str[i].format(outputs[balls]);
			//k++;
		}
	}
	return output;
}

// 获取位置文本2 格式: 万位 千位 (12)
var getPositionStr2 = function(pos, balls) {
	var position_str = ["第一名", "第二名", "第三名", "第四名", "第五名", "第六名", "第七名", "第八名", "第九名", "第十名"];
	var output = "";
	var k = 0;
	for (var i = 0; i < 10; i++) {
		
		if ((pos & Math.pow(2,i)) > 0) {
			if (output != "") {
				output += " ";
			}
			output += position_str[i];
			k++;
		}
	}
	return output+"("+balls+")";
}

// 
var getRandPosMask = function(len) {
	if (len > 10) { len = 10; }
	var pos = [0,1,2,3,4,5,6,7,8,9];
	for (var i = 0; i < 100; i++) {
		var r1 = getRandomBall(0,9);
		var r2 = getRandomBall(0,9);
		var tmp = pos[r1];
		pos[r1] = pos[r2];
		pos[r2] = tmp;
	}
	var posx = 0;
	for (var i = 0; i < len; i++) {
		posx += Math.pow(2, pos[i]);
	}
	return posx;
}

