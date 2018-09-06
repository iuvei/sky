let tpl = []
var pos_count = 0

// 和值
tpl[0] = '<div class="line" data-value=""><div class="line_title">{line_title}</div>'
tpl[0] += '<div class="line_content btn_ex_2"><li class="btn" data-value="3">3</li><li class="btn" data-value="4">4</li><li class="btn" data-value="5">5</li><li class="btn" data-value="6">6</li><li class="btn" data-value="7">7</li><li class="btn" data-value="8">8</li><li class="btn" data-value="9">9</li><li class="btn" data-value="10">10</li></div>'
tpl[0] += '<div class="peilv_container btn_ex_2"><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li></div>'
tpl[0] += '<div class="line_content btn_ex_2" style="margin-left:150px;"><li class="btn" data-value="11">11</li><li class="btn" data-value="12">12</li><li class="btn" data-value="13">13</li><li class="btn" data-value="14">14</li><li class="btn" data-value="15">15</li><li class="btn" data-value="16">16</li><li class="btn" data-value="17">17</li><li class="btn" data-value="18">18</li></div>'
tpl[0] += '<div class="peilv_container btn_ex_2"><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li></div>'
tpl[0] += '<div class="line_content btn_ex_3" style="margin-left:150px;"><li class="btn" data-value="19">大</li><li class="btn" data-value="20">小</li><li class="btn" data-value="21">单</li><li class="btn" data-value="22">双</li></div>'
tpl[0] += '<div class="peilv_container btn_ex_3"><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li><li class="peilv_box"></li></div>'
tpl[0] += '</div>'

//三同号通选
tpl[1] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn btn_long" data-value="0">三同号通选</li></div></div>'

//三同号单选
tpl[2] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn btn_short" data-value="1">111</li><li class="btn btn_short" data-value="2">222</li><li class="btn btn_short" data-value="3">333</li><li class="btn btn_short" data-value="4">444</li><li class="btn btn_short" data-value="5">555</li><li class="btn btn_short" data-value="6">666</li></div></div>'

//0-6 重复 胆拖专用模版  tpl3
tpl[3] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">'
var text_tpl3 = ''
for (var i = 1; i < 7; i++) {
  text_tpl3 += '<li class="btn n1 dt" data-value="' + i + '" data-max="{data_max}">' + i + '</li>'
}
tpl[3] += text_tpl3
tpl[3] += '</div></div>'

//0-6 重复  通用模版 tpl9
tpl[9] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">'
var text_tpl9 = ''
for (var i = 1; i < 7; i++) {
  text_tpl9 += '<li class="btn" data-value="' + i + '">' + i + '</li>'
}
tpl[9] += text_tpl9
tpl[9] += '</div></div>'

//三连号 通选
tpl[4] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn btn_long" data-value="0">三连号通选</li></div></div>'

//二同号复选
tpl[5] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content">'
var text_tpl5 = ''
for (var i = 1; i < 7; i++) {
  text_tpl5 += '<li class="btn" data-value="' + i + '' + i + '">' + i + '' + i + '</li>'
}
tpl[5] += text_tpl5
tpl[5] += '</div></div>'

//二不同号 单选
var text_tpl6_1 = ''
var text_tpl6_2 = ''
for (var i = 1; i < 7; i++) {
  text_tpl6_1 += '<li class="btn n1 dt" data-value="' + i + '' + i + '" data-max="5">' + i + '' + i + '</li>'
}
for (var i = 1; i < 7; i++) {
  text_tpl6_2 += '<li class="btn n1 dt" data-value="' + i + '" data-max="5">' + i + '</li>'
}
tpl[6] = '<div class="line" data-value=""><div class="line_title">同号</div><div class="line_content">'
tpl[6] += text_tpl6_1
tpl[6] += '</div></div>'
tpl[6] += '<div class="line" data-value=""><div class="line_title">不同号</div><div class="line_content">'
tpl[6] += text_tpl6_2
tpl[6] += '</div></div>'

//总大小单双
tpl[7] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn rect" data-value="0">总大</li><li class="btn rect" data-value="1">总小</li>'
tpl[7] += '<li class="btn rect" data-value="2">总单</li><li class="btn rect" data-value="3">总双</li></div>'
tpl[7] += '<div class="line_tools" style="width:120px;"><li class="btn" data-type="all">全</li><li class="btn" data-type="clear">清</li></div></div>'

// 定位大小单双
tpl[8] = '<div class="line" data-value=""><div class="line_title">{line_title}</div><div class="line_content"><li class="btn rect" data-value="0">大</li><li class="btn rect" data-value="1">小</li>'
tpl[8] += '<li class="btn rect" data-value="2">单</li><li class="btn rect" data-value="3">双</li></div>'

// var tpl_pos = "";

// 投注添加规则类
function touzhuAdd() {
	// 和值
  this.add_sum = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  var balls = getRandomBall(3, 22) + '';
  let idx = parseInt(balls) - 3
				if (balls == 19) {
  _output = '大';
} else if (balls == 20) {
  _output = '小';
} else if (balls == 21) {
  _output = '单';
} else if (balls == 22) {
  _output = '双';
}else {
  _output = balls + '';
}
  return_obj.push({ balls, output: _output, jj_index: idx })
			}
} else{
  var balls = '';
  $('.line_content li.btn.active').each(function() {
  let idx = $(this).index('.line_content li.btn')
				balls = parseInt($(this).data('value'))
				if (balls == 19) {
  _output = '大';
} else if (balls == 20) {
  _output = '小';
} else if (balls == 21) {
  _output = '单';
} else if (balls == 22) {
  _output = '双';
}else {
  _output = balls + '';
}

  return_obj.push({ balls: balls + '', output: _output, jj_index: idx })
			})
}
  return return_obj
	}

	// 三同号 通选
  this.add_3thtx = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  var balls = 0 + '';
  return_obj.push({ balls, output: '三同号通选' })
			}
}else {
  var balls = '';
  $('.line_content li.btn.active').each(function() {
  balls += $(this).data('value')
			})
  return_obj.push({ balls, output: '三同号通选' })
		}
  return return_obj
	}

	// 三同号 单选
  this.add_3thdx = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (var i = 0; i < r_count; i++) {
  var balls = getRandomBall(1, 6) + '';
  return_obj.push({ balls, output: balls + '' + balls + '' + balls })
			}
} else{
  var balls = '';
  $('.line_content li.btn.active').each(function() {
  if (balls != '') {
  balls += ' ';
}
  balls += $(this).data('value')
			})
  let output_arr = balls.split(' ')
			for (var i in output_arr) {
  output_arr[i] = output_arr[i] + '' + output_arr[i] + output_arr[i]
			}
  return_obj.push({ balls, output: output_arr.join('|') })
		}
  return return_obj
	}

	// 三不同号 标准
  this.add_3bthbz = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  var balls = getRandomBall2(1, 6, 3, ' ')
				return_obj.push({ balls, output: balls.split(' ').join('|') })
			}
}else {
  var balls = '';
  $('.line_content li.btn.active').each(function() {
  if (balls != '') {
  balls += ' ';
}
  balls += $(this).data('value')
			})
  return_obj.push({ balls, output: balls.split(' ').join('|') })
		}
  return return_obj
	}

	// 三不同号 胆拖
  this.add_3bthdt = function(r_count) {
  let return_obj = []
		if (r_count) {
			// 洗牌
  let balls_arr = [1, 2, 3, 4, 5, 6]
			for (let i = 0; i < r_count; i++) {
  for (let l = 0; l < 100; l++) {
  let k = getRandomBall(0, 5)
					var j = getRandomBall(0, 5)
					var temp = balls_arr[k]
					balls_arr[k] = balls_arr[j]
					balls_arr[j] = temp
				}
  let balls_1 = balls_arr[0] + '';
  let balls_2 = balls_arr[1] + '';
  let balls_3 = balls_arr[2] + '';
  var balls = balls_1 + ' ' + balls_2 + '|' + balls_3
				return_obj.push({ balls, output: balls.split(' ') })
			}
} else{
  var balls = '';
  $('.touzhu_container .line').each(function() {
  if ($(this).find('li.btn.active').length > 0) {
  if (balls != '') {
  balls += ' ';
}
  let child_ball = '';
  $(this).find('li.btn.active').each(function() {
  if (child_ball != '') {
  child_ball += '|';
}
  child_ball += $(this).data('value')
					})
					balls += child_ball
				}
})
			return_obj.push({ balls, output: balls.split(' ') })
		}
  return return_obj
	}

	// 三连号
  this.add_3lhtx = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  var balls = 0 + '';
  return_obj.push({ balls, output: '三连号通选' })
			}
} else{
  var balls = '';
  $('.line_content li.btn.active').each(function() {
  balls += $(this).data('value')
			})
  return_obj.push({ balls, output: '三连号通选' })
		}
  return return_obj
	}

	// 二同号 复选
  this.add_2thfx = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  var balls = getRandomBall(1, 6)
				balls += balls + '';
  return_obj.push({ balls, output: balls.split(' ').join('|') })
			}
}else {
  var balls = '';
  $('.line_content li.btn.active').each(function() {
  if (balls != '') {
  balls += ' ';
}
  balls += $(this).data('value')
			})
  return_obj.push({ balls, output: balls.split(' ').join('|') })
		}
  return return_obj
	}

	// 二同号 单选
  this.add_2thdx = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  let balls_1 = getRandomBall(1, 6) + '';
  let balls_2 = getRandomBall(1, 6) + '';
  var balls = balls_1 + balls_1 + ' ' + balls_2
				return_obj.push({ balls, output: balls.split(' ') })
			}
} else{
  var balls = '';
  $('.touzhu_container .line').each(function() {
  if (balls != '') {
  balls += ' ';
}
  let child_ball = '';
  $(this).find('li.btn.active').each(function() {
  if (child_ball != '') {
  child_ball += '|';
}
  child_ball += $(this).data('value')
				})
  balls += child_ball
			})
  return_obj.push({ balls, output: balls.split(' ') })
		}
  return return_obj
	}

	// 二不同号 标准
  this.add_2bthbz = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  var balls = getRandomBall2(1, 6, 2, ' ')
				return_obj.push({ balls, output: balls.split(' ').join('|') })
			}
} else{
  var balls = '';
  $('.line_content li.btn.active').each(function() {
  if (balls != '') {
  balls += ' ';
}
  balls += $(this).data('value')
			})
  return_obj.push({ balls, output: balls.split(' ').join('|') })
		}
  return return_obj
	}


	// 二不同号 胆拖
  this.add_2bthdt = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i++) {
  let balls_1 = getRandomBall(1, 6) + '';
  let balls_2 = getRandomBall(1, 6) + '';
  balls = balls_1 + ' ' + balls_2
				return_obj.push({ balls, output: balls.split(' ') })
			}
}else {
  var balls = '';
  $('.touzhu_container .line').each(function() {
  if ($(this).find('li.btn.active').length > 0) {
  if (balls != '') {
  balls += ' ';
}
  let child_ball = '';
  $(this).find('li.btn.active').each(function() {
  if (child_ball != '') {
  child_ball += '|';
}
  child_ball += $(this).data('value')
					})
  balls += child_ball
				}
})
  return_obj.push({ balls, output: balls.split(' ') })
		}
  return return_obj
	}

	// 任选一
  this.add_rx1m = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (let i = 0; i < r_count; i += 1) {
  var balls = getRandomBall(1, 6) + '';
  return_obj.push({ balls, output: balls })
}
}else {
  var balls = '';
  if ($('.line_content li.btn.active').length > 0) {
  $('.line_content li.btn.active').each(function() {
  if (balls != '') {
  balls += ' ';
}
  balls += $(this).data('value')
				})
  return_obj.push({ balls, output: balls.split(' ').join('|') })
			}
}
  return return_obj
	}

	// 总大小单双
  this.add_hz_dxds = function(r_count) {
  let return_obj = []
		var outputs = ['总大', '总小', '总单', '总双']
		if (r_count) {
  for (let i = 0; i < r_count; i += 1) {
  var balls = getRandomBall(0, 3)
				var output = outputs[balls]
				return_obj.push({ balls: balls + '', output })
			}
} else {
  var balls = '', output = '';
  $('.line_content li.btn.active').each(function() {
  if (balls != '') {
  balls += ' ';
}
  if (output != '') {
  output += ' , ';
}
  balls += $(this).data('value')
				output += outputs[$(this).data('value')]
			})
  return_obj.push({ balls, output })
		}
  return return_obj
	}

	// 定位大小单双
  this.add_dwdxds = function(r_count) {
  let return_obj = []
		if (r_count) {
  for (var i = 0; i < r_count; i++) {
  var pos = ['号一({0})', '号二({0})', '号三({0})']
				var balls_arr = ['?', '?', '?', '?', '?']
				var index = getRandomBall(0, 2)
				balls_arr[index] = getRandomBall(0, 3) + '';
  var output = pos[index].format(balls_arr[index])
				return_obj.push({ balls: balls_arr.join(' '), output })
			}
} else {
  var pos = ['号一({0})', '号二({0})', '号三({0})']
			var balls = '';
  var output = '';
  var i = 0
			$('.line_content').each(function() {
  if (balls != '') {
  balls += ' ';
}
  let sub_ball = '';
  let sub_output = '';
  if ($(this).find('li.btn.active').length == 0) {
  balls += '?';
} else {
  $(this).find('li.btn.active').each(function() {
  if (sub_ball != '') {
  sub_ball += '|';
}
  if (sub_output != '') {
  sub_output += '|'
}
						// balls += $(this).data("value");
  sub_ball += $(this).data('value')
						sub_output += $(this).text()
					})
					if (output != '') {
  output += ' ';
}
  balls += sub_ball
					output += pos[i].format([sub_output])
				}
  i++
			})
			return_obj.push({ balls, output })
		}
  return return_obj
	}


	// END CLASS
}