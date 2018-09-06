const fgetPositionStr = function(pos, balls) {
  const position_str = [
    '万位({0})',
    '千位({0})',
    '百位({0})',
    '十位({0})',
    '个位({0})'
  ]
  let output = ''
  let k = 0
  for (let i = 0; i < 5; i++) {
    if ((pos & Math.pow(2, i)) > 0) {
      if (output !== '') {
        output += ' '
      }
      output += position_str[i].format(balls[k])
      k++
    }
  }
  return output
}

// 前三 
const qh = function(poss, balls) {
  this.add_q3_dxds = function(r_count) {
  const dxds = ['大', '小', '单', '双']
  const return_obj = []
  if (r_count) {
    for (var i = 0; i < r_count; i++) {
      const ball_1 = getRandomBall(0, 3)
      const ball_2 = getRandomBall(0, 3)
      const ball_3 = getRandomBall(0, 3)
      return_obj.push({
        balls: ball_1 + ' ' + ball_2 + ' ' + ball_3,
        output: [dxds[ball_1], dxds[ball_2], dxds[ball_3]],
      })
    }
  } else {
    let balls = ''
    const show_ball = ['', '', '']
    var i = 0
    $('.line_content').each(function() {
      if ($(this).find('li.btn.active').length > 0) {
        if (balls != '') {
          balls += ' '
        }
        let child_ball = ''
        $(this)
                    .find('li.btn.active')
                    .each(function() {
                      if (child_ball != '') {
                        child_ball += '|'
                      }
                      child_ball += $(this).data('value')
                      show_ball[i] += dxds[$(this).data('value')]
                    })
        balls += child_ball
        i++
      }
    })
    return_obj.push({ balls, output: show_ball })
  }
  return return_obj
}


// 后三 
  this.add_h3_dxds = function(r_count) {
    
  const return_obj = []
  const dxds = ['大', '小', '单', '双']
  if (r_count) {
    for (var i = 0; i < r_count; i++) {
      const ball_1 = getRandomBall(0, 3)
      const ball_2 = getRandomBall(0, 3)
      const ball_3 = getRandomBall(0, 3)
      return_obj.push({
        balls: ball_1 + ' ' + ball_2 + ' ' + ball_3,
        output: [dxds[ball_1], dxds[ball_2], dxds[ball_3]]
      })
    }
  } else {
    let balls = ''
    const show_ball = ['', '', '']
    var i = 0
    $('.line_content').each(function() {
      if ($(this).find('li.btn.active').length > 0) {
        if (balls != '') {
          balls += ' '
        }
        let child_ball = ''
        $(this)
          .find('li.btn.active')
            .each(function() {
              if (child_ball != '') {
                child_ball += '|'
                 }
              child_ball += $(this).data('value')
                show_ball[i] += dxds[$(this).data('value')]
                    })
        balls += child_ball
        i++
      }
    })
    return_obj.push({ balls, output: show_ball })
  },
  return return_obj
}
 }