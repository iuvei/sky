var tpl = [];
var pos_count = 0;
// 可重复的0-9
tpl[0] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn" data-value="0">0</li><li class="btn" data-value="1">1</li>';
tpl[0] += '<li class="btn" data-value="2">2</li><li class="btn" data-value="3">3</li><li class="btn" data-value="4">4</li><li class="btn" data-value="5">5</li>';
tpl[0] += '<li class="btn" data-value="6">6</li><li class="btn" data-value="7">7</li><li class="btn" data-value="8">8</li><li class="btn" data-value="9">9</li></div>';
tpl[0] += '<div class="line_tools"><li class="btn" data-type="all">全</li><li class="btn" data-type="big">大</li><li class="btn" data-type="small">小</li>';
tpl[0] += '<li class="btn" data-type="signal">奇</li><li class="btn" data-type="double">偶</li><li class="btn" data-type="clear">清</li></div></div>';

// 不带选位置的文本框
tpl[1] = '<div class="touzhu_container_left"><textarea class="touzhu_area" placeholder="{tip}"></textarea></div><div class="touzhu_container_right"><div class="line"><a class="touzhu_btn nodouble_btn" href="javascript:;">删除重复号</a></div>';
tpl[1] += '<div class="line"><a class="touzhu_btn upload_file" href="javascript:;">导入文件</a></div> <div class="line"><a class="touzhu_btn clear_btn" href="javascript:;">清空</a></div> </div>';
tpl[1] += '</div><div class="tiper">每一个号码之间请用竖线[|] 或者 斜杠[/] 隔开 --- 每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开</div><input class="file_upload_txt" type="file" style="display:none;" />';

// 1 到 27
tpl[2] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content line_content2"><li class="btn" data-value="0">0</li><li class="btn" data-value="1">1</li><li class="btn" data-value="2">2</li>';
tpl[2] += '<li class="btn" data-value="3">3</li><li class="btn" data-value="4">4</li><li class="btn" data-value="5">5</li><li class="btn" data-value="6">6</li><li class="btn" data-value="7">7</li>';
tpl[2] += '<li class="btn" data-value="8">8</li><li class="btn" data-value="9">9</li><li class="btn" data-value="10">10</li><li class="btn" data-value="11">11</li><li class="btn" data-value="12">12</li>';
tpl[2] += '<li class="btn" data-value="13">13</li></div><div class="line_content line_content2" style="margin-left:150px;"><li class="btn" data-value="14">14</li><li class="btn" data-value="15">15</li><li class="btn" data-value="16">16</li><li class="btn" data-value="17">17</li>';
tpl[2] += '<li class="btn" data-value="18">18</li><li class="btn" data-value="19">19</li><li class="btn" data-value="20">20</li><li class="btn" data-value="21">21</li><li class="btn" data-value="22">22</li>';
tpl[2] += '<li class="btn" data-value="23">23</li><li class="btn" data-value="24">24</li><li class="btn" data-value="25">25</li><li class="btn" data-value="26">26</li><li class="btn" data-value="27">27</li>';

// 1 到 26
tpl[3] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content line_content2"><li class="btn" data-value="1">1</li><li class="btn" data-value="2">2</li>';
tpl[3] += '<li class="btn" data-value="3">3</li><li class="btn" data-value="4">4</li><li class="btn" data-value="5">5</li><li class="btn" data-value="6">6</li><li class="btn" data-value="7">7</li>';
tpl[3] += '<li class="btn" data-value="8">8</li><li class="btn" data-value="9">9</li><li class="btn" data-value="10">10</li><li class="btn" data-value="11">11</li><li class="btn" data-value="12">12</li>';
tpl[3] += '<li class="btn" data-value="13">13</li></div><div class="line_content line_content2" style="margin-left:150px;"><li class="btn" data-value="14">14</li><li class="btn" data-value="15">15</li><li class="btn" data-value="16">16</li><li class="btn" data-value="17">17</li>';
tpl[3] += '<li class="btn" data-value="18">18</li><li class="btn" data-value="19">19</li><li class="btn" data-value="20">20</li><li class="btn" data-value="21">21</li><li class="btn" data-value="22">22</li>';
tpl[3] += '<li class="btn" data-value="23">23</li><li class="btn" data-value="24">24</li><li class="btn" data-value="25">25</li><li class="btn" data-value="26">26</li>';

// 不重复的0-9
tpl[4] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content norepeat"><li class="btn n1" data-max="1" data-value="0">0</li><li class="btn n1" data-max="1" data-value="1">1</li>';
tpl[4] += '<li class="btn n1" data-max="1" data-value="2">2</li><li class="btn n1" data-max="1" data-value="3">3</li><li class="btn n1" data-max="1" data-value="4">4</li><li class="btn n1" data-max="1" data-value="5">5</li>';
tpl[4] += '<li class="btn n1" data-max="1" data-value="6">6</li><li class="btn n1" data-max="1" data-value="7">7</li><li class="btn n1" data-max="1" data-value="8">8</li><li class="btn n1" data-max="1" data-value="9">9</li></div></div>';

// 大 小 单  双
tpl[5] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn" data-value="0">大</li><li class="btn" data-value="1">小</li>';
tpl[5] += '<li class="btn" data-value="2">单</li><li class="btn" data-value="3">双</li></div>';
tpl[5] += '<div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>';

// 顺子 豹子 对子
tpl[6] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn rect" data-value="0">豹子</li><li class="btn rect" data-value="1">顺子</li>';
tpl[6] += '<li class="btn rect" data-value="2">对子</li></div><div class="peilv_content"><li class="peilv_box" style="width:43px;margin-right:34px;"></li><li class="peilv_box" style="width:43px;margin-right:34px;"></li>';
tpl[6] += '<li class="peilv_box" style="width:43px"></li></div></div>';

// 1 到 17
tpl[7] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content line_content2"><li class="btn" data-value="1">1</li><li class="btn" data-value="2">2</li>';
tpl[7] += '<li class="btn" data-value="3">3</li><li class="btn" data-value="4">4</li><li class="btn" data-value="5">5</li><li class="btn" data-value="6">6</li><li class="btn" data-value="7">7</li>';
tpl[7] += '<li class="btn" data-value="8">8</li><li class="btn" data-value="9">9</li><li class="btn" data-value="10">10</li><li class="btn" data-value="11">11</li><li class="btn" data-value="12">12</li>';
tpl[7] += '<li class="btn" data-value="13">13</li><li class="btn" data-value="14">14</li><li class="btn" data-value="15">15</li><li class="btn" data-value="16">16</li><li class="btn" data-value="17">17</li></div></div>';

// 带选位置的文本框
tpl[8] = '<div class="touzhu_container_left"><textarea class="touzhu_area"></textarea></div><div class="touzhu_container_right"><div class="line"><a class="touzhu_btn nodouble_btn" href="javascript:;">删除重复号</a></div>';
tpl[8] += '<div class="line"><a class="touzhu_btn upload_file" href="javascript:;">导入文件</a></div> <div class="line"><a class="touzhu_btn clear_btn" href="javascript:;">清空</a></div> </div>';
tpl[8] += '</div><div class="tiper">每一个号码之间请用竖线[|] 或者 斜杠[/] 隔开 --- 每一注号码之间请用一个 空格[ ]、逗号[,] 或者 分号[;] 隔开</div><input class="file_upload_txt" type="file" style="display:none;" />';

// 0 - 18  直选
tpl[9] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content line_content2"><li class="btn" data-value="0">0</li><li class="btn" data-value="1">1</li><li class="btn" data-value="2">2</li>';
tpl[9] += '<li class="btn" data-value="3">3</li><li class="btn" data-value="4">4</li><li class="btn" data-value="5">5</li><li class="btn" data-value="6">6</li><li class="btn" data-value="7">7</li>';
tpl[9] += '<li class="btn" data-value="8">8</li><li class="btn" data-value="9">9</li></div><div class="line_content line_content2" style="margin-left:150px;"><li class="btn" data-value="10">10</li><li class="btn" data-value="11">11</li><li class="btn" data-value="12">12</li>';
tpl[9] += '<li class="btn" data-value="13">13</li><li class="btn" data-value="14">14</li><li class="btn" data-value="15">15</li><li class="btn" data-value="16">16</li><li class="btn" data-value="17">17</li><li class="btn" data-value="18">18</li></div></div>';

//tpl 直选和值
tpl[10] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content line_content2" style="margin: 0px 10px 0px 10px;"><li class="btn" data-value="0">0</li><li class="btn" data-value="1">1</li><li class="btn" data-value="2">2</li>';
tpl[10] += '<li class="btn" data-value="3">3</li><li class="btn" data-value="4">4</li><li class="btn" data-value="5">5</li><li class="btn" data-value="6">6</li><li class="btn" data-value="7">7</li>';
tpl[10] += '<li class="btn" data-value="8">8</li><li class="btn" data-value="9">9</li><li class="btn" data-value="10">10</li><li class="btn" data-value="11">11</li><li class="btn" data-value="12">12</li>';
tpl[10] += '<li class="btn" data-value="13">13</li><li class="btn" data-value="14">14</li><li class="btn" data-value="15">15</li><li class="btn" data-value="16">16</li><li class="btn" data-value="17">17</li><li class="btn" data-value="18">18</li></div></div>';

//侧妃之争 码N VS 码M  龙虎斗，切，多难听的名字  SB 99彩
tpl[11] = '<div class="line"><div class="line_title">{line_title}</div>';
tpl[11] += '<div class="line_content"><li data-value="0v1" class="btn rect">万位</li><li class="btn_text">VS</li><li class="btn rect" data-value="1v0">千位</li></div>';
tpl[11] += '<div class="line_content"><li class="btn rect" data-value="0v2">万位</li><li class="btn_text">VS</li><li class="btn rect" data-value="2v0">百位</li></div>';
tpl[11] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="0v3">万位</li><li class="btn_text">VS</li><li data-value="3v0" class="btn rect">十位</li></div>';
tpl[11] += '<div class="line_content"><li class="btn rect" data-value="0v4">万位</li><li class="btn_text">VS</li><li data-value="4v0" class="btn rect">个位</li></div>';
tpl[11] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="1v2">千位</li><li class="btn_text">VS</li><li data-value="2v1" class="btn rect">百位</li></div>';
tpl[11] += '<div class="line_content"><li class="btn rect" data-value="1v3">千位</li><li class="btn_text">VS</li><li data-value="3v1" class="btn rect">十位</li></div>';
tpl[11] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="1v4">千位</li><li class="btn_text">VS</li><li data-value="4v1" class="btn rect">个位</li></div>';
tpl[11] += '<div class="line_content"><li class="btn rect" data-value="2v3">百位</li><li class="btn_text">VS</li><li data-value="3v2" class="btn rect">十位</li></div>';
tpl[11] += '<div class="line_content" style="margin-left:150px;"><li class="btn rect" data-value="2v4">百位</li><li class="btn_text">VS</li><li data-value="4v2" class="btn rect">个位</li></div>';
tpl[11] += '<div class="line_content"><li class="btn rect" data-value="3v4">十位</li><li class="btn_text">VS</li><li data-value="4v3" class="btn rect">个位</li></div>';
tpl[11] += '</div>';

var tpl_pos = '<div class="line"><div class="line_content3"><input type="checkbox" class="cb pos_0" {0} />万位&nbsp;<input type="checkbox" class="cb pos_1" {1} />千位&nbsp;<input type="checkbox" class="cb pos_2" {2} />百位&nbsp;';
tpl_pos += '<input type="checkbox" class="cb pos_3" {3} />十位<input type="checkbox" class="cb pos_4" {4} />个位&nbsp;&nbsp;<span class="wxts">温馨提示</span>: 您选择了<span class="pos_count">0</span>个位置, 系统自动根据配置组合成<span class="fangan_count">0</span>个方案</div></div>';


// 投注添加规则类
function touzhuAdd() {

	// 五星直选复式
	this.add_5x_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	// 五星直选单式
	this.add_5x_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split("|")});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\,\;]/);
			var return_obj = [];
			for(var i = 0; i < balls.length;i++) {
				var this_balls = balls[i].split(/[\|\/]/);
				if (this_balls.length == 5) {
					return_obj.push({balls: this_balls.join("|"), output: this_balls});
				}
			}
		}
		return return_obj;
	}
	
	/* start at 2017-07-10 pm */
	
	//五星直选组合
	this.add_5x_zxzh = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	//五星 组选120
	this.add_5x_zx120 = function(r_count){
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i =0; i<r_count; i++) {
				var balls = getRandomBall2(0,9,5," ");
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	//五星 组选60
	this.add_5x_zx60 = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var temp_balls = getRandomBall2(0,9,4," ").split(" ");
				var balls1 = temp_balls[0];
				var balls2 = temp_balls[1]+"|"+temp_balls[2]+"|"+temp_balls[3];
				var balls = balls1 + " " + balls2;
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	//五星 组选30
	this.add_5x_zx30 = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var temp_balls = getRandomBall2(0,9,3," ").split(" ");
				var balls1 = temp_balls[0] + "|" + temp_balls[1];
				var balls2 = temp_balls[2];
				var balls = balls1 + " " + balls2;
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else{
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	//五星 组选20
	this.add_5x_zx20 = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var temp_balls = getRandomBall2(0,9,3," ").split(" ");
				var balls1 = temp_balls[0];
				var balls2 = temp_balls[1] + "|" + temp_balls[2];
				var balls = balls1 + " " + balls2;
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else{
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	//五星 组选10
	this.add_5x_zx10 = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else{
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	//五星 组选 5
	this.add_5x_zx5 = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else{
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	/* end at 2017-07-10 pm */
	
	// 四星 直选复式
	this.add_4x_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	// 四星直选单式
	this.add_4x_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split("|")});
			}
		} else{
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\,\;]/);
			for(var i = 0; i < balls.length;i++) {
				var res = balls[i].split(/[\|\/]/);
				if (res.length == 4) {
					return_obj.push({balls: res.join("|"), output: res});
				}
			}
		}
		return return_obj;
	}
	
	/* start at 2017-07-10 pm */
	
	//四星直选组合
	this.add_4x_zxzh = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	//四星组选24
	this.add_4x_zx24 = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1){
				var balls = getRandomBall2(0, 9, 4, " ");
				return_obj.push({balls: balls, output: balls});
			}
		} else{
			var balls = "";
			$(".line_content li.btn.active").each(function() {
				if (balls != "") {
					balls+= " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	//四星组选12
	this.add_4x_zx12 = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var temp_arr = getRandomBall2(0, 9, 3, " ").split(" ");
				var balls = temp_arr[0] + " " + temp_arr[1] + "|" + temp_arr[2];
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else{
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	//四星组选6
	this.add_4x_zx6 = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall2(0, 9, 2, " ");
				return_obj.push({balls: balls, output: balls});
			}
		} else{
			var balls = "";
			$(".line_content li.btn.active").each(function() {
				if (balls != "") {
					balls+= " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	//四星组选4
	this.add_4x_zx4 = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var balls = getRandomBall2(0, 9, 2, " ");
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else{
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	/* end at 2017-07-10 pm */
	
	// 后三 直选复式
	this.add_h3_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	// 后三 直选单式
	this.add_h3_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split("|") });
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\,\;]/);
			for(var i = 0; i < balls.length;i++) {
				var res = balls[i].split(/[\|\/]/);
				if (res.length == 3) {
					return_obj.push({balls: res.join("|"), output: res});
				}
			}
		}
		return return_obj;
	}

	// 后三 后三组合
	this.add_h3_zh = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					if (balls != "") {
						balls += " ";
					}
					var sub_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(sub_ball != ""){
							sub_ball += "|";
						}
						sub_ball += $(this).data("value");
					});
					balls += sub_ball;
				}
			});
			return_obj.push({ balls: balls, output: balls.split(" ")});
		}
		return return_obj;
	}
	
	// 后三 直选和值
	this.add_h3_zxhz = function(r_count) {
		var return_obj = [];
		if (r_count) {
			var balls = getRandomBall2(0,27,r_count, " ");
			return_obj.push({balls: balls, output: balls});
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
	
	// 后三直选跨度
	this.add_h3_zxkd = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0, 9)+"";
				return_obj.push({balls: balls, output: balls});
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
	
	// 后三 组三复式
	this.add_h3_z3fs = function(r_count) {
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
	
	// 后三 组三单式
	this.add_h3_z3ds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i< r_count; i++) {
				var ball_a = [getRandomBall(0,9),getRandomBall(0,9)];
				var r = getRandomBall(0,2);
				var balls = "";
				if (r == 0) {
					balls = ball_a[0]+"|"+ball_a[0]+"|"+ball_a[1];
				}else if (r==1) {
					balls = ball_a[0]+"|"+ball_a[1]+"|"+ball_a[1];
				}else{
					balls = ball_a[0]+"|"+ball_a[1]+"|"+ball_a[0];
				}
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var content = $(".touzhu_area").val();
			var lines = content.split(/[\s\;\,]/);
			for(var i = 0; i < lines.length; i++) {
				var res = lines[i].split(/[\|\/]/);
				if (res.length == 3) {
					return_obj.push({balls: res.join("|"), output: lines[i]});
				}
			}
		}
		return return_obj;
	}
	
	// 后三 组六复式
	this.add_h3_z6fs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i =0; i<r_count; i++) {
				var balls = getRandomBall2(0,9,3," ");
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	//  后三 组六单式
	this.add_h3_z6ds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,3,"|");
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\,\;]/);
			for (var i = 0; i < balls.length; i++) {
				var res = balls[i].split(/[\|\/]/);
				return_obj.push({balls:res.join("|"), output: balls[i]});
			}
		}
		return return_obj;
	}
	
	// 后三 混合组选
	this.add_h3_hhzx = function (r_count) {
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall2(0,9,2,"|");
				var temp = balls.split("|");
				if (temp[0] == temp[1] || temp[1] == temp[2] || temp[0] == temp[2]){
					var jj_index = 0;
				}else{
					var jj_index = 1;
				}
				return_obj.push({balls:balls, output:balls, jj_index: jj_index});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			for (var i = 0; i < balls.length; i += 1) {
				var sub_balls = balls[i].split(/[\|\/]/);
				if (sub_balls[0] == sub_balls[1] || sub_balls[0] == sub_balls[2] || sub_balls[1] == sub_balls[2]) {
					var jj_index = 0;
				} else{
					var jj_index = 1;
				}
				var output = sub_balls.join("|");
				return_obj.push({balls: sub_balls.join("|"), output: output, jj_index: jj_index});
				
			}
		}
		return return_obj;
	}
	
	// 后三 组选和值
	this.add_h3_zuxhz = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(1,26)+"";
				return_obj.push({balls:balls, output:balls});
			}
		}else{
			var balls = '';
			$(".line_content li.btn.active").each(function(){
				if (balls != '') {
					balls += ' ';
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls:balls, output:balls});
		}
		return return_obj;
	}
	
	// 后三 组选包胆
	this.add_h3_zuxbd = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = '';
			$(".line_content li.btn.active").each(function(){
				if (balls != '') {
					balls += ' ';
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls:balls, output:balls});
		}
		return return_obj;
	}
	
	// 后三 和值尾数
	this.add_h3_sumws = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output:balls});
			}
		} else {
			var balls = '';
			$(".line_content li.btn.active").each(function(){
				if (balls != '') {
					balls += ' ';
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls:balls, output:balls});
		}
		return return_obj;
	}
	
	// 后三 特殊号
	this.add_h3_tsh = function(r_count) {
		var tsh = ["豹子", "顺子", "对子"]
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var r = getRandomBall(0,2);
				return_obj.push({balls: r.toString(), output: tsh[r], jj_index: r});
			}
		}else {
			$(".line_content li.btn.active").each(function(){
				var value = $(this).data("value");
				return_obj.push({balls: value.toString(), output: tsh[value], jj_index:value});
			});
		}
		return return_obj;
	}
	
	// 前二 直选复式
	this.add_q2_zxfs = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split(" ")});
			}
		} else {
			var balls = "";
			$(".touzhu_container .line_content").each(function(){
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
	
	// 前二 直选单式
	this.add_q2_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls.split("|")});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			for (var i = 0; i < balls.length; i++) {
				var res = balls[i].split(/[\|\/]/);
				return_obj.push({balls: res.join("|"), output: res});
			}
		}
		return return_obj;
	}
	
	// 前二 直选和值
	this.add_q2_zhxhz = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,18)+"";
				return_obj.push({balls: balls, output: balls});
			}
		}else{
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls!="") {
					balls+= " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 前二 直选跨度
	this.add_q2_zxkd = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0, 9) + "";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls!="") {
					balls+= " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 前二 组选复式
	this.add_q2_zuxfs = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				return_obj.push({balls: balls, output: balls})
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function() {
				if (balls != "") {
					balls+= " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 前二 组选单式
	this.add_q2_zuxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall(0,9);
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\,\;]/);
			for(var k in balls){
				var res = balls[k].split(/[\|\/]/);
				if(res.length == 2){
					return_obj.push({balls: res.join("|"), output: balls[k]});
				}
			}
			
		}
		return return_obj;
	}
	
	// 前二 组选和值
	this.add_q2_zuxhz = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(1,17)+"";
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 前二 组选包胆
	this.add_q2_zuxbd = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i=0; i<r_count;i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 定位胆
	this.add_dwd = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var pos = ["万位({0})", "千位({0})", "百位({0})", "十位({0})", "个位({0})"];
				var balls_arr = ["?", "?", "?", "?", "?"];
				var index = getRandomBall(0,4);
				balls_arr[index] = getRandomBall(0,9)+"";
				var output = pos[index].format(balls_arr[index]);
				return_obj.push({balls: balls_arr.join(" "), output: output});
			}
		} else {
			var pos = ["万位({0})", "千位({0})", "百位({0})", "十位({0})", "个位({0})"];
			var balls = "";
			var output = "";
			var i = 0;
			$(".line_content").each(function(){
				if (balls != "") {
					balls += " ";
				}
				var sub_ball = "";
				if ($(this).find("li.btn.active").length == 0) {
					balls += "?";
				} else {
					$(this).find("li.btn.active").each(function(){
						if (sub_ball != "") {
							sub_ball+="|";
						}
						// balls += $(this).data("value");
						sub_ball+=$(this).data("value");
					});
					if (output != "") {
						output += " ";
					}
					balls += sub_ball;
					output += pos[i].format([sub_ball]);
				}
				i++;
			});
			return_obj.push({balls:balls, output: output});
		}
		return return_obj;
	}
	
	// 不定位 - 前三一码
	this.add_bdw_q31m = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 不定位 - 前三二码
	this.add_bdw_q32m = function(r_count) {
		var return_obj = [];
		if(r_count) {
			for (var i = 0; i <r_count; i++) {
				var balls = getRandomBall2(0, 9, 2, " ");
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls:balls, output: balls});
		}
		return return_obj;
	}
	
	// 不定位 - 后三一码
	this.add_bdw_h31m = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});		
		}
		return return_obj;
	}
	
	// 不定位 - 后三二码
	this.add_bdw_h32m = function(r_count) {
		var return_obj = [];
		if(r_count) {
			for (var i = 0; i <r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}		
		return return_obj;
	}
	
	// 不定位 - 前四一码
	this.add_bdw_q41m = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 不定位 - 前四二码
	this.add_bdw_q42m = function(r_count) {
		var return_obj = [];
		if(r_count) {
			for (var i = 0; i <r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}

	// 不定位 - 后四一码
	this.add_bdw_h41m = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});	
		}
		return return_obj;
	}
	
	// 不定位 - 后四二码
	this.add_bdw_h42m = function(r_count) {
		var return_obj = [];
		if(r_count) {
			for (var i = 0; i <r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
		
	// 不定位 - 五星一码
	this.add_bdw_5x1m = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});	
		}
		return return_obj;
	}
	
	// 不定位 - 五星二码
	this.add_bdw_5x2m = function(r_count) {
		var return_obj = [];
		if(r_count) {
			for (var i = 0; i <r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 不定位 - 五星三码
	this.add_bdw_5x3m = function(r_count) {
		var return_obj = [];
		if(r_count) {
			for (var i = 0; i <r_count; i++) {
				var balls = getRandomBall2(0,9,3," ");
				return_obj.push({balls: balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 前二 大小单双
	this.add_q2_dxds = function (r_count) {
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
					i++;
				}
			});
			return_obj.push({balls: balls, output: show_ball});
		}
		return return_obj;
	}
	
	// 后二 大小单双
	this.add_h2_dxds = function (r_count) {
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
					i++;
				}
			});
			return_obj.push({balls: balls, output: show_ball});
		}
		return return_obj;
	}
	
	// 前三 大小单双
	this.add_q3_dxds = function (r_count) {
		var dxds = ["大", "小", "单", "双"];
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var ball_1 = getRandomBall(0,3);
				var ball_2 = getRandomBall(0,3);
				var ball_3 = getRandomBall(0,3);
				return_obj.push({balls: ball_1+" "+ball_2+" "+ball_3, output: [ dxds[ball_1], dxds[ball_2], dxds[ball_3] ]});
			}
		} else {
			var balls = "";
			var show_ball = ["","",""];
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
					i++;
				}
			});
			return_obj.push({balls: balls, output: show_ball});
		}
		return return_obj;
	}
	
	// 后三 大小单双
	this.add_h3_dxds = function (r_count) {
		var return_obj = [];
		var dxds = ["大", "小", "单", "双"];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var ball_1 = getRandomBall(0,3);
				var ball_2 = getRandomBall(0,3);
				var ball_3 = getRandomBall(0,3);
				return_obj.push({balls: ball_1+" "+ball_2+" "+ball_3, output: [ dxds[ball_1], dxds[ball_2], dxds[ball_3] ]});
			}
		} else {
			var balls = "";
			var show_ball = ["","",""];
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
					i++;
				}
			});
			return_obj.push({balls: balls, output: show_ball});
		}
		return return_obj;
	}
	
	// 任二 直选复式
	this.add_r2_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = [getRandomBall(0,9), getRandomBall(0,9)];
				var posx = getRandPosMask(2);
				var output = getPositionStr(posx, balls);
				return_obj.push({balls: posx+" "+balls.join(" "), output: output});
			}
		} else {
			var balls = "";
			i = 0;
			var posx = 0;
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length >0) {
					if (balls != "") {
						balls += " ";
					}
					var sub_ball = "";
					$(this).find("li.btn.active").each(function(){
						if(sub_ball != ""){
							sub_ball += "|";
						}
						sub_ball += $(this).data("value");
					});
					balls += sub_ball;
					posx += Math.pow(2, i);
				}
				i++;
			});
			return_obj.push({balls: posx+" "+balls, output: getPositionStr(posx, balls.split(" "))});
		}
		return return_obj;
	}
	
	// 任二 直选单式
	this.add_r2_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = [getRandomBall(0,9), getRandomBall(0,9)];
				var posx = getRandPosMask(2);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls.join("|"), output: output});
			}
		} else {
			var content = $(".touzhu_area").val();
			var posx = getPosMask();
			var balls = content.split(/[\s\;\,]/);
			for(var i = 0; i < balls.length; i++) {
				var res = balls[i].split(/[\/\|]/);
				if (res.length == 2 && res[1] != "") {
					var output = getPositionStr2(posx, [res[0], res[1]]);
					return_obj.push({balls: posx+" "+res.join("|"), output: output});
				}
			}
		}
		return return_obj;
	}
	
	// 任二 直选和值
	this.add_r2_zxhz = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,18);
				var posx = getRandPosMask(2);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls.split(" "));
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任二 组选复式
	this.add_r2_zuxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				var posx = getRandPosMask(2);
				var output = getPositionStr2(posx, balls.split(" "));
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			var posx = getPosMask();
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var output = getPositionStr2(posx, balls.split(" "));
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任二 组选单式
	this.add_r2_zuxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,2,"|");
				var posx = getRandPosMask(2);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(" ");
			var posx = getPosMask();
			for (var i = 0; i < balls.length; i++) {
				var res = balls[i].split(/[\|\/]/);
				if (res.length == 2 && res[1] != "") {
					var output = getPositionStr2(posx,[res[0], res[1]]);
					return_obj.push({balls: posx+" "+res.join("|"), output: output});
				}
			}
		}
		return return_obj;
	}
	
	// 任二 组选和值
	this.add_r2_zuxhz = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(1,17);
				var posx = getRandPosMask(2);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls.split(" "));
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任三 直选复式
	this.add_r3_zxfs = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = [getRandomBall(0,9), getRandomBall(0,9), getRandomBall(0,9)];
				var posx = getRandPosMask(3);
				var output = getPositionStr(posx, balls);
				return_obj.push({balls: posx+" "+balls.join(" "), output: output});
			}
		} else {
			var balls = "";
			i = 0;
			var posx = 0;
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length >0) {
					if (balls != "") {
						balls += " ";
					}
					var sub_balls = '';
					$(this).find("li.btn.active").each(function(){
						if (sub_balls != "") {
							sub_balls += "|";
						}
						sub_balls += $(this).data("value");
					});
					balls += sub_balls;
					posx += Math.pow(2, i);
				}
				i++;
			});
			return_obj.push({balls: posx+" "+balls, output: getPositionStr(posx, balls.split(" "))});
		}
		return return_obj;
	}
	
	// 任三 直选单式
	this.add_r3_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for(var i=0; i<r_count;i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9);
				var posx = getRandPosMask(3);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			i = 0;
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			var posx = getPosMask();
			for (var i = 0; i < balls.length; i++) {
				var res = balls[i].split(/[\|\/]/);
				if (res.length == 3 && res[2] != "") {
					var output = getPositionStr2(posx, res);
					return_obj.push({balls: posx+" "+res.join("|"), output: output});
				}
			}
		}
		return return_obj;
	}
	
	// 任三 直选和值
	this.add_r3_zxhz = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,27);
				var posx = getRandPosMask(3);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			var i = 0;
			var posx = getPosMask();
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任三 组三复式
	this.add_r3_zu3fs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9) + " " + getRandomBall(0,9);
				var posx = getRandPosMask(3);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls:posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			var i = 0;
			var posx = getPosMask();
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任三 组三单式
	this.add_r3_zu3ds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var ball_a = [getRandomBall(0,9),getRandomBall(0,9)];
				var r = getRandomBall(0,2);
				var balls = "";
				if (r == 0) {
					balls = ball_a[0]+"|"+ball_a[0]+"|"+ball_a[1];
				}else if (r==1) {
					balls = ball_a[0]+"|"+ball_a[1]+"|"+ball_a[1];
				}else{
					balls = ball_a[0]+"|"+ball_a[1]+"|"+ball_a[0];
				}
				var posx = getRandPosMask(3);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			var posx = getPosMask();
			for(var i = 0; i < balls.length; i++){
				var res = balls[i].split(/[\|\/]/);
				if(res.length == 3 && res[2] != ""){
					var output = getPositionStr2(posx, res);
					return_obj.push({balls: posx+" "+res.join("|"), output: output});
				}
			}
		}
		return return_obj;
	}
	
	// 任三 组六复式
	this.add_r3_zu6fs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,3," ");
				var posx = getRandPosMask(3);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任三 组六单式
	this.add_r3_zu6ds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for(var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,3,"|");
				var posx = getRandPosMask(3);
				var output = getPositionStr2(posx, balls);
				return_obj.push({ balls: posx+" "+balls, output: output});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			var posx = getPosMask();
			for(var i = 0; i < balls.length; i++){
				var res = balls[i].split(/[\/\|]/);
				var output = getPositionStr2(posx, res);
				return_obj.push({balls: posx+" "+res.join("|"), output: output});
			}
		}
		return return_obj;
	}
	
	// 任三 混合组选
	this.add_r3_hhzx = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall2(0,9,2,"|");
				var posx = getRandPosMask(3);
				var temp = balls.split("|");
				if (temp[0] == temp[1] || temp[1] == temp[2] || temp[0] == temp[2]){
					var jj_index = 0;
				}else{
					var jj_index = 1;
				}
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls:posx + " " + balls, output: output, jj_index: jj_index});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			var posx = getPosMask();
			for (var i = 0; i < balls.length; i += 1) {
				var sub_balls = balls[i].split(/[\|\/]/);
				
				if (sub_balls[0] == sub_balls[1] || sub_balls[0] == sub_balls[2] || sub_balls[1] == sub_balls[2]) {
					var jj_index = 0;
				} else{
					var jj_index = 1;
				}
				
				var output = getPositionStr2(posx, sub_balls.join("|"));
				return_obj.push({balls: posx+" "+sub_balls.join("|"), output: output, jj_index: jj_index});
			}
		}
		return return_obj;
	}
	
	// 任三 组选和值
	this.add_r3_zuxhz = function (r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var ball = getRandomBall(1,26);
				var posx = getRandPosMask(3);
				var output = getPositionStr2(posx, ball);
				return_obj.push({balls: posx+" "+ball, output: output});				
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任四 直选复式
	this.add_r4_zxfs = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = [getRandomBall(0,9),getRandomBall(0,9),getRandomBall(0,9),getRandomBall(0,9)];
				var posx = getRandPosMask(4);
				var output = getPositionStr(posx, balls);
				return_obj.push({balls: posx+" "+balls.join(" "), output: output});
			}
		} else {
			var balls = [];
			var i = 0;
			var posx = 0;
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length > 0) {
					var sub_balls = "";
					$(this).find("li.btn.active").each(function(){
						if (sub_balls != "") {
							sub_balls += "|";
						}
						sub_balls += $(this).data("value");
					});
					balls[i] = sub_balls;
					posx+=Math.pow(2, i);
				}
				i++;
			});
			var output = getPositionStr(posx, balls);
			return_obj.push({balls: posx+" "+balls.join(" "), output: output});
		}
		return return_obj;
	}
	
	// 任四 直选单式
	this.add_r4_zxds = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i<r_count; i++) {
				var balls = getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9)+"|"+getRandomBall(0,9);
				var posx = getRandPosMask(4);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var content = $(".touzhu_area").val();
			var balls = content.split(/[\s\;\,]/);
			var posx = getPosMask();
			for ( var i = 0; i < balls.length; i++) {
				var res = balls[i].split(/[\/\|]/);
				if (res.length == 4) {
					var output = getPositionStr2(posx, balls[i]);
					return_obj.push({balls: posx+" "+res.join("|"), output: output});
				}
			}
		}
		return return_obj;
	}
	
	// 任四 组选24
	this.add_r4_zux24 = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,4," ");
				var posx = getRandPosMask(4);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+' '+balls, output: output});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data('value');
			});
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
//		console.log(return_obj);
		
		return return_obj;
	}
	
	// 任四 组选12
	this.add_r4_zux12 = function(r_count) {
//		console.log("组选12数据更新");
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var posx = getRandPosMask(4);
				var balls_str = getRandomBall2(0,9,3," ");
				var balls_arr = balls_str.split(" ");
				var balls = balls_arr[0] + " " + balls_arr[1] + "|" + balls_arr[2];
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			$(".line_content").each(function(){
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
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任四 组选6
	this.add_r4_zux6 = function(r_count) {
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var balls = getRandomBall2(0,9,2," ");
				var posx = getRandPosMask(4);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}
	
	// 任四 组选4
	this.add_r4_zux4 = function(r_count) {
		console.log("XXXXZX")
		var return_obj = [];
		if (r_count) {
			for(var i = 0; i < r_count; i++) {
				var balls = getRandomBall(0,9)+" "+getRandomBall(0,9);
				var posx = getRandPosMask(4);
				var output = getPositionStr2(posx, balls);
				return_obj.push({balls: posx+" "+balls, output: output});
			}
		} else {
			var balls = "";
			$(".line_content").each(function(){
				if ($(this).find("li.btn.active").length>0) {
					if (balls != "") {
						balls += " ";
					}
					var sub_balls = "";
					$(this).find("li.btn.active").each(function(){
						if (sub_balls != "") {
							sub_balls += "|";
						}
						sub_balls += $(this).data("value");
					});
					balls += sub_balls;
				}
			});
			console.log(balls);
			var posx = getPosMask();
			var output = getPositionStr2(posx, balls);
			return_obj.push({balls: posx+" "+balls, output: output});
		}
		return return_obj;
	}

	this.add_dw_dxds = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var pos = ["万位({0})", "千位({0})", "百位({0})", "十位({0})", "个位({0})"];
				var balls_arr = ["?", "?", "?", "?", "?"];
				var index = getRandomBall(0,4);
				balls_arr[index] = getRandomBall(0,3)+"";
				var pos_arr = ['大', '小', '单', '双'];
				var output = pos[index].format(pos_arr[balls_arr[index]]);
				return_obj.push({balls: balls_arr.join(" "), output: output});
			}
		} else {
			var pos = ["万位({0})", "千位({0})", "百位({0})", "十位({0})", "个位({0})"];
			var pos_arr = ['大', '小', '单', '双'];
			var balls = "";
			var output = "";
			var i = 0;
			$(".line_content").each(function(){
				if (balls != "") {
					balls += " ";
				}
				if (output != "") {
					output += " ";
				}
				var sub_ball = "", sub_output = "";
				if ($(this).find("li.btn.active").length == 0) {
					balls += "?";
				} else {
					$(this).find("li.btn.active").each(function(){
						if (sub_ball != "") {
							sub_ball+="|";
						}
						if (sub_output != "") {
							sub_output += "|";
						}
						sub_ball+=$(this).data("value");
						sub_output += pos_arr[$(this).data("value")];
					});
					balls += sub_ball;
					if (sub_output != "") {
						output += pos[i].format(sub_output);
					}
				}
				i++;
			});
			return_obj.push({balls:balls, output: output});
		}
		return return_obj;
	}

	//侧妃之争 大小PK
	this.add_cfzz = function(r_count){
		var return_obj = [];
		var outputs = ['万', '千', '百', '拾', '个'];
		if(r_count){
			for(var i = 0; i < r_count; i += 1){
				var balls = $("li.btn.rect").eq(getRandomBall(0,19)).data("value");
				output = outputs[balls[0]] + " VS " + outputs[balls[2]];
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

	//侍寝之牌
	this.add_sqzp = function(r_count){
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i++) {
				var pos = ["万位({0})", "千位({0})", "百位({0})", "十位({0})", "个位({0})"];
				var balls_arr = ["?", "?", "?", "?", "?"];
				var index = getRandomBall(0,4);
				balls_arr[index] = getRandomBall(0,9)+"";
				var output = pos[index].format(balls_arr[index]);
				return_obj.push({balls: balls_arr.join(" "), output: output});
			}
		} else {
			var pos = ["万位({0})", "千位({0})", "百位({0})", "十位({0})", "个位({0})"];
			var balls = "";
			var output = "";
			var i = 0;
			$(".line_content").each(function(){
				if (balls != "") {
					balls += " ";
				}
				var sub_ball = "";
				if ($(this).find("li.btn.active").length == 0) {
					balls += "?";
				} else {
					$(this).find("li.btn.active").each(function(){
						if (sub_ball != "") {
							sub_ball+="|";
						}
						// balls += $(this).data("value");
						sub_ball+=$(this).data("value");
					});
					if (output != "") {
						output += " ";
					}
					balls += sub_ball;
					output += pos[i].format([sub_ball]);
				}
				i++;
			});
			return_obj.push({balls:balls, output: output});
		}
		return return_obj;
	}
	
	this.add_qw_yffs = function(r_count){
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i =0; i<r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	this.add_qw_hscs = function(r_count){
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i =0; i<r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	this.add_qw_sykt = function(r_count){
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i =0; i<r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	this.add_qw_sjfc = function(r_count){
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i =0; i<r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	this.add_qw_wgfd = function(r_count){
		var return_obj = [];
		if (r_count) {
			var return_obj = [];
			for (var i =0; i<r_count; i++) {
				var balls = getRandomBall(0,9)+"";
				return_obj.push({balls:balls, output: balls});
			}
		} else {
			var balls = "";
			$(".line_content li.btn.active").each(function(){
				if (balls != "") {
					balls += " ";
				}
				balls += $(this).data("value");
			});
			return_obj.push({balls: balls, output: balls});
		}
		return return_obj;
	}
	
	// 和值大小单双
	this.add_hzdxds = function (r_count) {
		var dxds = ['大', '小', '单', '双'];
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var idx = getRandomBall(0, 3);
				return_obj.push({balls: idx.toString(), output: dxds[idx]});
			}
		}else{
			$(".line_content li.btn.active").each(function(){
				var idx = $(this).data("value");
				return_obj.push({balls: idx.toString(), output: dxds[idx]});
			});
		}
		return return_obj;
	}
	
	// 尾数大小单双
	this.add_hwdxds = function (r_count) {
		var dxds = ['大', '小', '单', '双'];
		var return_obj = [];
		if (r_count) {
			for (var i = 0; i < r_count; i += 1) {
				var idx = getRandomBall(0, 3);
				return_obj.push({balls: idx.toString(), output: dxds[idx]});
			}
		}else{
			$(".line_content li.btn.active").each(function(){
				var idx = $(this).data("value");
				return_obj.push({balls: idx.toString(), output: dxds[idx]});
			});
		}
		return return_obj;
	}

	//END CLASS
}

// 获取位置文本 格式: 万位(1) 千位(2)
var getPositionStr = function(pos, balls) {
	var position_str = ["万位({0})", "千位({0})", "百位({0})", "十位({0})", "个位({0})"];
	var output = "";
	var k = 0;
	for (var i = 0; i < 5; i++) {
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

// 获取位置文本2 格式: 万位 千位 (12)
var getPositionStr2 = function(pos, balls) {
	var position_str = ["万位", "千位", "百位", "十位", "个位"];
	var output = "";
	var k = 0;
	for (var i = 0; i < 5; i++) {
		
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

// 获取随机位置
var getRandPosMask = function(len) {
	if (len > 5) { len = 5; }
	var pos = [0,1,2,3,4];
	for (var i = 0; i < 100; i++) {
		var r1 = getRandomBall(0,4);
		var r2 = getRandomBall(0,4);
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
