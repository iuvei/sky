//创建模版规则 测试
/*
 * 	有点醉了
 */
// @playlist: 玩法列表
// @game_id: 游戏ID
// @game_tag: 游戏简拼
// @js_tag: js脚本控制器 
// @post_url: 投注提交URL
function CPTouzhuObject(_playlist, _game_id, _game_tag, _js_tag, _post_url, lock_time) {

  const playlist = _playlist; // 玩法列表
  const game_id = _game_id; // 游戏ID
  const game_tag = _game_tag; // 游戏简拼
  const js_tag = _js_tag; // 规则判断的JS脚本名
  const post_url = _post_url; // 提交的URL
  const cur_qishu = 0; // 当前的期数
  const cur_play = null; // 当前选中的玩法引用
  const _CPTouzhuObject = this;
  const touzhu_list = []; // 投注列表
  const mode = 1; // 模式
  const perPrice = 2; // 单注金额
  const touzhulist_container = $(".show_box .show_box_container .show_box_content.dialog_cur_box table tbody"); // 投注池
  const slider_trigger = ".slider_trigger";
  const slider_bg = ".slider_bg";
  const setpricefunc = window.parent.setLessPrice;
  const jiangjin_list = [];
  const calc_func = new calc_zhushu_obj();
  // const max_next = 0;  //prev 存储的期数
  const is_arg = 0; //限制最大选择数量

  // 投注对象初始化
  this.init = function () {
    // _CPTouzhuObject.bindSliderEvent();
    _CPTouzhuObject.bindPageClickEvent();
    _CPTouzhuObject.CDTimer(".cdtimer_timer");
  }


  // 提交投注
  this.submitTouzhu = function (quick_list) {
    showLoading("请稍后...");

    function calcList(index, res_list, obj_list) {
      res_list = obj_list.slice(index, index + 50);
      if (res_list.length < 1) {
        return;
      }
      AjaxPost(
        post_url, {
          ac: "submitTouzhu",
          gid: game_id,
          gtag: game_tag,
          qishu: cur_qishu,
          allrate: $('#total_rate').val(), //总倍数
          is_run_balls: $("input.zhuihao_input").val(),
          is_run_stop: $("._left_checkbox").hasClass("active") ? 1 : 0,
          list: res_list
        },
        function (obj) {
          hideLoading();
          if (obj.msg > 0) {
            tipshow(obj.param);
            return;
          }

          index += 50;
          if (index >= obj_list.length) {
            hideLoading();
            toast("提交投注成功!");
            window.changeMoney(obj.data.less, 1000);
            window.getHistoryTouzhuList(); //更新投注记录
            _CPTouzhuObject.clearTouzhuList();
            return;
          }
          calcList(index, null, obj_list);
        });
    }
    if (quick_list) {
      calcList(0, null, quick_list);
    } else {
      calcList(0, null, touzhu_list);
    }

  }

  // 获取指定投注记录
  this.getTouzhuItem = function (idx) {
    for (const k in _CPTouzhuObject.touzhu_list) {
      if (touzhu_list[k].id == idx) {
        return val;
      }
    }
    return null;
  }

  // 删除指定的投注信息
  this.deconsteTouzhuItem = function (idx) {
    for (const k in touzhu_list) {
      if (touzhu_list[k].id == idx) {
        touzhu_list.splice(k, 1);
      }
    }
    $("#touzhu_item_" + idx).slideUp(200, function () {
      $(this).remove();
      if (touzhulist_container.find("tr").length == 0) {
        touzhulist_container.html('<tr><td colspan="100%">暂无投注...</td></tr>');
      }
      _CPTouzhuObject.updateAll();
    });
  }

  // 清空投注记录列表
  this.clearTouzhuList = function () {
    touzhu_list = [];
    touzhulist_container.html('<tr><td colspan="100%">暂无投注...</td></tr>');
    _CPTouzhuObject.updateAll();
  }

  // 设置模式
  this.mode = function (val) {
    if (val != undefined) {
      _CPTouzhuObject.mode = val;
    } else {
      return _CPTouzhuObject.mode;
    }
  }

  // 设置单注金额
  this.perPrice = function (val) {
    if (val != undefined) {
      _CPTouzhuObject.perprice = val;
    } else {
      return _CPTouzhuObject.perPrice;
    }
  }

  // 创建注单
  this.createNewZhudan = function (balls, static_func, showArr, jiangjin_Index) {
    if (!jiangjin_Index) {
      jiangjin_Index = 0;
    }

    if (!cur_play) {
      toast("未知的玩法");
      return;
    }
    const myobj = new Object();
    myobj.balls = balls;

    const _price_zhushu = calc_func[static_func](myobj.balls.split(/[\s\;\,]/));
    myobj.zhushu = _price_zhushu.zhushu; //注数
    myobj.price = _price_zhushu.price; //金额
    myobj.per_price = _price_zhushu.price; //暂定单注金额
    //直接输出赔率包括竖线
    if (_price_zhushu.peilv != undefined) {
      myobj.jiangjin = jiangjin_list[_price_zhushu.peilv];
    } else if (jiangjin_list.length === 2) {
      myobj.jiangjin = jiangjin_list.join("|");
    } else {
      myobj.jiangjin = jiangjin_list[jiangjin_Index];
    }

    if (myobj.zhushu == 0 || myobj.price == 0) {
      toast("您选择的号码不符合规则,请重新选择!");
      return false;
    }
    myobj.modes = mode;
    if (mode == 1) {
      myobj.mode = "元";
    } else if (mode == 0.1) {
      myobj.mode = "角";
    } else if (mode == 0.01) {
      myobj.mode = "分";
    } else {
      toast("未知的投注模式");
      return;
    }

    myobj.peilv = myobj.jiangjin;
    myobj.wanfa = cur_play.wanfa;
    myobj.playid = cur_play.playid;
    myobj.gameid = game_id;
    //		myobj.per_price = 0;
    //倍数
    myobj.beilv = 1; //默认

    // 生成一个唯一的ID
    myobj.id = Math.floor((new Date()).getTime() / 1000) + Math.floor(Math.random() * 8888 + 1000);
    myobj.qishu = cur_qishu;
    myobj.xiangqing = cur_play.balls_format.format(showArr);
    _CPTouzhuObject.addTouzhu(myobj);
  }

  this.SubmitWithOnekey = function (objs, static_func) {

    if (!cur_play) {
      tipshow("未知的玩法");
      return;
    }

    const tz_list = [];
    for (const k in objs) {
      const myobj = new Object();
      myobj.balls = objs[k].balls;
      if (!objs[k].jj_index) {
        objs[k].jj_index = 0;
      }

      const _price_zhushu = calc_func[static_func](myobj.balls.split(/[\s\;\,]/));
      myobj.zhushu = _price_zhushu.zhushu; //注数
      myobj.price = _price_zhushu.price; //金额
      myobj.per_price = _price_zhushu.price; //所谓单注金额
      //直接输出赔率包括竖线
      if (_price_zhushu.peilv != undefined) {
        myobj.jiangjin = jiangjin_list[_price_zhushu.peilv];
      } else if (jiangjin_list.length === 2) {
        myobj.jiangjin = jiangjin_list.join("|");
      } else {
        myobj.jiangjin = jiangjin_list[objs[k].jj_index];
      }

      if (myobj.zhushu == 0 || myobj.price == 0) {
        tipshow("您选择的号码不符合规则,请重新选择!");
        return false;
      }

      myobj.modes = mode;
      if (mode == 1) {
        myobj.mode = "元";
      } else if (mode == 0.1) {
        myobj.mode = "角";
      } else if (mode == 0.01) {
        myobj.mode = "分";
      } else {
        tipshow("未知的投注模式");
        return;
      }

      myobj.peilv = myobj.jiangjin;
      myobj.wanfa = cur_play.wanfa;
      myobj.playid = cur_play.playid;
      myobj.gameid = game_id;
      //倍数
      myobj.beilv = 1; //默认

      // 生成一个唯一的ID
      myobj.id = Math.floor((new Date()).getTime() / 1000) + Math.floor(Math.random() * 8888 + 1000);
      myobj.qishu = cur_qishu;
      myobj.xiangqing = cur_play.balls_format.format(objs[k].output);
      tz_list.push(myobj);
    }
    _CPTouzhuObject.submitTouzhu(tz_list);
  }


  // 添加投注池数据
  this.addTouzhu = function (_obj) {
    const _output = "<tr id='touzhu_item_{id}'> <td>{xiangqing}</td> <td>{wanfa}</td> <td>{beilv}</td> <td>{mode}</td> <td>{zhushu}</td> <td>{jiangjin}</td> <td>{price}</td> <td><div data-id='{id}' class='btn_del_list'></div></td> </tr>";
    if (touzhu_list.length == 0) {
      touzhulist_container.html(_output.format(_obj));
    } else {
      touzhulist_container.prepend(_output.format(_obj));
    }
    $("table tbody td").removeClass("active");
    $("table tbody input").removeClass("active");
    $("input.per_bet_edit").val("10");
    $("table tbody input[type=text]").val("");
    $("table tbody input[type=checkbox]").prop("checked", false);
    $("table tbody input[type=checkbox]").prop("disabled", false);
    is_arg = 0;
    touzhu_list.push(_obj);
    _CPTouzhuObject.bindDeconsteEvent();
    _CPTouzhuObject.updateAll();
  }

  // 更新投注池数据
  this.updateTouzhu = function (_obj) {
    const _output = "<tr> <td>{balls}</td> <td>{wanfa}</td> <td>{beilv}</td> <td>{mode}</td> <td>{zhushu}</td> <td>{jiangjin}</td> <td>{price}</td> </tr>";
    touzhulist_container.html("");
    for (const k in touzhu_list) {
      touzhulist_container.prepend(_output.format(touzhu_list[k]));
    }
    // 绑定删除事件
    _CPTouzhuObject.bindDeconsteEvent();
  }

  // 删除事件绑定
  this.bindDeconsteEvent = function () {
    // 删除注单
    $(".btn_del_list").unbind("click");
    $(".btn_del_list").bind("click", function () {
      const _id = $(this).data("id");
      _CPTouzhuObject.deconsteTouzhuItem(_id);
    });
  }

  // 计算返点和赔率
  this.calcOdds = function () {
    const _peilv = cur_play.play_peilv.split("|");
    jiangjin_list = [];
    for (const i = 0; i < _peilv.length; i++) {
      jiangjin_list[i] = _parseFloat(_peilv[i], 2);
    }
  }

  // 绑定其他页面事件
  this.bindPageClickEvent = function () {
    // 切换模式
    $(".mode_container .mode").click(function () {
      $(".mode_container .mode").removeClass("active");
      $(this).addClass("active");
      mode = $(this).data("val");
    });

    //快速改变单注金额事件
    $(".btn_change_price").click(function () {
      $(".btn_change_price").removeClass("active");
      $(this).addClass("active");
      const val = $(this).data("val");
      $(".per_bet_edit").val(val);
      _CPTouzhuObject.calcZhushu();
    })

    for (const i = 0; i < playlist.length; i++) {
      $(".submenu_box .menuid_" + playlist[i].menuid).append("<li data-id='" + i + "' class='btn'>" + playlist[i].playname + "</li>");
    }

    // 绑定玩法
    $(".submenu_box .btn").unbind("click");
    $(".submenu_box .btn").bind("click", function () {
      const id = $(this).data("id");
      $(".submenu_box .btn").removeClass("active");
      $(this).addClass("active");
      cur_play = playlist[id];
      jiangjin_list = cur_play.play_peilv.split("|");
      _CPTouzhuObject.createTouzhuUI(playlist[id]); // 通过该结构体来创建UI
      _CPTouzhuObject.calcOdds(); //更新赔率
      _CPTouzhuObject.calcZhushu();
    });

    // 添加注单
    $(".addZhudan").click(function () {
      if (_CPTouzhuObject.add_func[cur_play.add_func]) {
        const obj = _CPTouzhuObject.add_func[cur_play.add_func]();

        if (!obj || obj.length == 0) {
          toast("您选择的号码不符合规则,请重新选择!");
          return;
        }
        for (const k in obj) {
          _CPTouzhuObject.createNewZhudan(obj[k].balls, cur_play.static_func, obj[k].output, obj[k].jj_index);
        }
        _CPTouzhuObject.calcZhushu();
      }
    });

    // 立即投注
    $(".btn_submit_touzhu").click(function () {
      if (touzhu_list.length == 0) {
        toast("投注列表为空!请先添加注单后再提交!");
        return;
      }
      _CPTouzhuObject.submitTouzhu();
    });

    // 总倍数
    $(".setconf_rate_tools .rate_btn").click(function () {
      if ($(this).hasClass("active")) {
        return;
      }
      $(".setconf_rate_tools .rate_btn").removeClass("active");
      $(this).addClass("active");
      $("#total_rate").val($(this).data("val"));
      _CPTouzhuObject.updateAll();
    });


    $("#total_rate").keyup(function () {
      if (/^[1-9][0-9]{0,10}$/.test($(this).val())) {
        $(".rate_btn").removeClass("active");
      } else {
        $(this).val("");
      }
      _CPTouzhuObject.updateAll();
    })
    //		$("#total_rate").blur(function(){
    //			if($(this).val() == ""){
    //				$(this).val(10);
    //				$(".rate_btn").eq(0).addClass("active");
    //			}
    //		})

    // 一键投注
    $(".addQuickZhudan").click(function () {
      if (_CPTouzhuObject.add_func[cur_play.add_func]) {
        const obj = _CPTouzhuObject.add_func[cur_play.add_func]();
        if (!obj || !obj.length) {
          toast("您未选择号码,或者选择的号码不符合规则!");
          return;
        }
        $("table tbody td").removeClass("active");
        $("table tbody input").removeClass("active");
        $("input.per_bet_edit").val("10");
        $("table tbody input[type=text]").val("");
        $("table tbody input[type=checkbox]").prop("checked", false);
        $("table tbody input[type=checkbox]").prop("disabled", false);
        is_arg = 0;
        _CPTouzhuObject.SubmitWithOnekey(obj, cur_play.static_func);
        _CPTouzhuObject.calcZhushu();
      }
    });

  }

  // 绑定计算对象
  this.bindCalcObject = function (_obj) {
    _CPTouzhuObject.calc_func = _obj;
    _CPTouzhuObject.calc_func._obj = _CPTouzhuObject;
  }

  // 绑定添加注数对象
  this.bindAddObject = function (_obj) {
    _CPTouzhuObject.add_func = _obj;
    _CPTouzhuObject.add_func._obj = _CPTouzhuObject;
  }

  // 调用计算注数的函数
  this.calcZhushu = function () {
    // 调用计算注数函数
    if (_CPTouzhuObject.add_func[cur_play.add_func]) {
      const obj = _CPTouzhuObject.add_func[cur_play.add_func]();
      const zhushu = 0;
      const price = 0;
      const peilv = 0;
      const jj_index = '';
      for (const k in obj) {
        if (obj[k].balls && obj[k].balls != '') {
          const ba = obj[k].balls.split(/[\s\;\,]/);
          const _zhushu_price = calc_func[cur_play.static_func](ba);
          zhushu += _zhushu_price.zhushu;
          price += parseInt(_zhushu_price.price);
          if (_zhushu_price.peilv != undefined) {
            peilv = jiangjin_list[_zhushu_price.peilv];
            jj_index = _zhushu_price.peilv;
          }
        }
      }
      //自选不中的赔率显示
      $("#peilvBox td").removeClass('active');
      if ((jj_index + "") != "") {
        $("#peilvBox tr").eq(0).find("td").eq(parseInt(jj_index) + 1).addClass("active");
        $("#peilvBox tr").eq(1).find("td").eq(parseInt(jj_index) + 1).addClass("active");
        $("#peilv_show").html(jiangjin_list[jj_index]);
      }
      $("span.zhushu").html(zhushu);
      $("span.jine").html(price);
    }
  }

  // 更新所有控件状态
  this.updateAll = function () {
    // 获取所有金额
    const total_price = 0;
    const total_zhushu = 0;
    for (const k in touzhu_list) {
      total_price += parseFloat(touzhu_list[k].price);
      total_zhushu += parseInt(touzhu_list[k].zhushu);
    }
    const _total_rate = $("input#total_rate").val();
    if (_total_rate === "") {
      _total_rate = 1;
    } else {
      _total_rate = parseInt(_total_rate);
    }
    $("span#total_zhushu").html(total_zhushu);
    $("span#total_price").html(_parseFloat(total_price * _total_rate));
    $("span#total_calc_tip").html("(=" + total_price + "元 * " + _total_rate + "倍)");
  }

  // 创建投注UI
  this.createTouzhuUI = function () {
    const isshowpos = false;
    const text = '<div class="touzhu_box"><div class="title">' + cur_play.play_title + '<span data-content="' + cur_play.play_fanli + '" class="tip fanli"><em class="icon-fl"></em>范例</span><span data-content="' + cur_play.play_shuoming + '" class="tip shuoming"><em class="icon-zjsm"></em>中奖说明</span></div><div class="container">';
    const peilv_obj = {};
    //		console.log(jiangjin_list);
    for (const i = 0, len = jiangjin_list.length; i < len; i += 1) {
      const obj_key = 'peilv_content_' + i;
      peilv_obj[obj_key] = jiangjin_list[i];
    }
    //		console.log("创建投注UI")
    //		console.log(cur_play);
    peilv_obj.wanfa = cur_play.playname;
    peilv_obj.peilv_content = cur_play.play_peilv.split("|").join(" / ");
    text += _CPTouzhuObject.tpl_list[cur_play.tpl].format(peilv_obj);
    text += '</div></div>';
    $(".touzhu_container").html(text);
    is_arg = 0;
    _CPTouzhuObject.BindTplClickEvent(); // 绑定模版元素点击事件
    _CPTouzhuObject.updateAll(); // 更新所有数据
  }

  // 倒计时封装 --- 草 搞事情呀 2018-01-08
  this.CDTimer = function (container) {
    const _CDTimer = this;
    const _CDTip = $(".cdtimer_tip");
    const datalist = []; // 存储的期数
    const updateInt = 0; // 倒计时时钟ID
    const cur_time = 0; // 存取定义时间

    const span_qishu = $("span.curqishu");
    const cdtimer_text = '<span class="cdtime_bg">{h1}</span><span class="cdtime_bg">{h2}</span> : <span class="cdtime_bg">{m1}</span><span class="cdtime_bg">{m2}</span>';
    cdtimer_text += ' : <span class="cdtime_bg">{s1}</span><span class="cdtime_bg">{s2}</span>';

    // 初始化倒计时
    this.init = function (getBalls) {
      AjaxPost(_post_url, { ac: "getCPLogInfo", tag: game_tag }, function (obj) {
        if (obj.msg > 0) {
          // 执行封盘
          _CDTimer.stopTimer();
          return;
        }
        window.getHistoryTouzhuList(); //更新投注记录

        // 判断是否只是获取开奖号码的
        if (getBalls) {
          if (undefined === obj.data.prev || obj.data.prev[0] === undefined || obj.data.prev[0].balls == "-1" && obj.data.prev[0].balls == "") {
            // 重新获取数据
            setTimeout(function () {
              _CDTimer.init(true);
            }, 5000);
            return;
          }

          _CDTimer.updateBalls(obj.data.prev);
          return;
        }

        datalist = obj.data; // 存储数据
        cur_qishu = obj.data.next[0].qishu
        if (undefined === obj.data.prev || obj.data.prev[0] === undefined || !obj.data.prev[0].balls || obj.data.prev[0].balls === "-1" || obj.data.prev[0].balls == "") {
          setTimeout(function () {
            _CDTimer.init(true);
          }, 5000)
        }

        // 执行写入
        _CDTimer.start();
      })
    }

    this.start = function () {
      // 输出开奖号码
      _CDTimer.updateBalls(datalist.prev);

      // 存住一个标准时间
      cur_time = getTimestamp();

      // 更新时钟
      updateInt = setInterval(function () {
        _CDTimer.update();
      }, 400)

    }

    // 更新时钟
    this.update = function () {
      const delay = datalist.next[0].jiezhitime + cur_time - getTimestamp();
      if (delay > 0) {
        const cd_time = getCDTimerObj(delay);
        $(container).html(cdtimer_text.format(cd_time));
      } else {
        _CDTimer.onend();
      }
    }

    this.onend = function () {
      // 停止倒计时
      _CDTimer.stop();

      // 显示封盘
      _CDTimer.stopTimer();

      // 随机摇号
      _CDTimer.randomBalls();

      const obj = datalist.next[0];
      datalist.next.splice(0, 1);
      datalist.prev.unshift(obj);
      datalist.prev.pop();
      $(".mask_1").fadeIn(200);
      if (window._startCDFadeOutTime) {
        window._startCDFadeOutTime();
      }

      // 如果数据完成 - 重新开始
      if (datalist.next.length == 0) {
        _CDTimer.init();
        return;
      }

      // 期数变更
      span_qishu.html(datalist.next[0].qishu);
      $(".span_lastqishu").html(datalist.prev[0].qishu);
      cur_qishu = datalist.next[0].qishu;

      // 封盘结束， 开盘
      setTimeout(function () {
        _CDTip.html("已开盘，距离截止投注还有:");
        // 更新时钟
        updateInt = setInterval(function () {
          _CDTimer.update();
        }, 400)
      }, lock_time * 1000);

      // 去获取最新的开奖号码 -- 慢了一期怎么办？？
      setTimeout(function () {
        _CDTimer.init(true);
      }, 5000)

    }

    this.stop = function () {
      clearInterval(updateInt); // 清除倒计时时钟
    }

    this.randomBalls = function () {

      // 先显示一个空号来玩一下
      // 计算开奖 和 显示号码
      const balls_show = '<div class="balls_show">';
      for (const n = 0; n < 7; n++) {
        if (n === 7 - 1) {
          balls_show += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
        }
        balls_show += '<li class="balls_lhc red' + '">-</li>';
      }
      balls_show += '</div>';
      $(".lastballs_1").html(balls_show);


      /*
      if (randomInt) {
          clearInterval(randomInt);  // 清除时钟
      }

      // 确定执行随机号码
      if (_bool) {
          randomInt = setInterval(function(){
              const _random_text = '<div class="balls_show">';
              const random_bg_arr = ['red', 'blue', 'green'];
              for (const n=0;n<7;n++) {
                  const random_bg = random_bg_arr[getRandomBall(0,2)];
                  const random_ball = getRandomBall(1, 49);
                  if (n === 7 - 1) {
                      _random_text += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
                  }
                  _random_text += '<li class="balls_lhc '+random_bg+'">'+random_ball+'</li>';
              }
              _random_text += '</div>';
              $(".lastballs_1").html(_random_text);
          }, 400);
      }

      */
    }

    // 封盘样式输出
    this.stopTimer = function () {
      _CDTip.html("未开盘");
      $(container).html(cdtimer_text.format({ h1: 0, h2: 0, m1: 0, m2: 0, s1: 0, s2: 0 }));
    }

    // 输出开奖号码 - 最新一期 和 历史5期
    this.updateBalls = function (arrBalls) {

      span_qishu.html(datalist.next[0].qishu);
      if (datalist.prev[0] !== undefined) {
        $(".span_lastqishu").html(datalist.prev[0].qishu);
      }

      if (arrBalls !== undefined && arrBalls[0] !== undefined) {
        const lasted_balls = arrBalls[0].balls.split(" "); // 最新一期的开奖号码

        if (lasted_balls.length !== 0) {

          _CDTimer.randomBalls(false); // 取消随机选号

          const res_shengxiao = []; // save shengxiao arr

          // 计算开奖生肖 - 写入名称
          for (const i = 0; i < 7; i++) {
            // for (const k in return_balls.shengxiao) {
            //     if (contains(return_balls.shengxiao[k].balls, lasted_balls[i])) {
            //         res_shengxiao.push(return_balls.shengxiao[k].name);
            //         break;
            //     }
            // }
            // 临时应急措施。之后改为动态
            if (parseInt(datalist.prev[0].qishu) <= 2018016) {
              console.log("qishu" + datalist.prev[0].qishu + " 小于 2018016!!")
              res_shengxiao.push(BallToShengxiao(parseInt(lasted_balls[i]), 9))
            } else {
              console.log("qishu" + datalist.prev[0].qishu + " 大于 2018016!!")
              res_shengxiao.push(BallToShengxiao(parseInt(lasted_balls[i]), 10))
            }
          }

          // 显示生肖代码
          const shengxiao_show = '<div class="shengxiao_show">';
          for (const n = 0; n < 7; n++) {
            if (n === 7 - 1) {
              shengxiao_show += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
            }
            shengxiao_show += '<li class="balls_lhc none">' + (res_shengxiao[n] ? res_shengxiao[n] : '-') + '</li>';
          }
          shengxiao_show += '</div>';

          // 计算开奖 和 显示号码
          const balls_show = '<div class="balls_show">';
          for (const n = 0; n < 7; n++) {
            if (n === 7 - 1) {
              balls_show += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
            }
            balls_show += '<li class="balls_lhc' + ' ' + _CDTimer.configColor(lasted_balls[n]) + '">' + (lasted_balls[n] ? lasted_balls[n] : '-') + '</li>';
          }
          balls_show += '</div>';

          // 写入
          $(".lastballs_1").html("");

          $(".lastballs_1").append(balls_show + shengxiao_show);

        }

        // 写入最近五期的开奖号码
        $(".history_box_5").html("");
        for (const k in arrBalls) {
          const text = '<div class="history_item">第<span class="historyqishu">' + arrBalls[k].qishu + '</span>期:';
          const balls = [];
          if (arrBalls[k].balls && arrBalls[k].balls != "") {
            balls = arrBalls[k].balls.split(" ");
          }
          for (const n = 0; n < 7; n++) {
            text += '<li class="balls_prev_7 ' + _CDTimer.configColor(balls[n]) + '">' + (balls[n] ? balls[n] : '-') + '</li>';
          }
          text += '</div>';
          $(".history_box_5").append(text);
        }
      }
    }

    //  定义号码球颜色
    this.configColor = function (arg_balls) {
      if (!arg_balls) {
        return '';
      }
      if (contains(return_balls.color.red.balls, arg_balls)) {
        return 'red';
      }
      if (contains(return_balls.color.blue.balls, arg_balls)) {
        return 'blue';
      }
      if (contains(return_balls.color.green.balls, arg_balls)) {
        return 'green';
      }
    }


    _CDTimer.init(); // 启动倒计时

    // const list = [];
    // const timerid = 0;
    // const cur_time = 0;
    // const ballscount = 7;
    // const getOpenID = 0;  // 拉取开奖号码球的时钟ID
    // const intoStart = true;  // 刚开始进入页面
    // const randomID = 0;   // 随机号码特效的时钟
    // // const reflush = 60;
    // const span_qishu = $("span.curqishu");
    // const cdtimer_text = '<span class="cdtime_bg">{h1}</span><span class="cdtime_bg">{h2}</span> : <span class="cdtime_bg">{m1}</span><span class="cdtime_bg">{m2}</span>';
    // cdtimer_text += ' : <span class="cdtime_bg">{s1}</span><span class="cdtime_bg">{s2}</span>';
    // // const isopenning = false;
    // //初始化
    // this.init = function(pullBalls) {
    // 	AjaxPost(_post_url, {ac:"getCPLogInfo", tag: game_tag},
    // 		function(obj){
    // 			if (obj.msg==0) {
    // 				list = obj.data;
    // 			}else{
    // 				return;
    // 			}
    // 			//max_next = obj.data.next.length;
    // 			// 拉取开奖号码的
    // 			if (pullBalls) {
    // 				intoStart = false;
    // 				// 有开奖号码
    // 				if (list.prev[0].balls && list.prev[0].balls != "-1" && list.prev[0].balls != "") {
    //                    _CDTimer.initRandomBall(false);
    // 				}else{
    // 					// 没有开奖号码
    //                    _CDTimer.initRandomBall(true);
    // 				}
    //                return;
    // 			}
    //
    //            _CDTimer.stop();
    //            _CDTimer.start();
    //            window.getHistoryTouzhuList();  //更新投注记录
    //
    // 			// 是否是最新进入页面
    // 			if (intoStart) {
    // 				if (list.prev[0].balls && list.prev[0].balls != "-1" && list.prev[0].balls != "") {
    //                    intoStart = false;
    // 				} else {
    //                    // 没有最新开奖号码
    //                    _CDTimer.initRandomBall(true);
    //                    setTimeout(function(){
    //                        _CDTimer.init()
    //                    }, 5000);
    //                    return;
    // 				}
    // 			}
    // 	});
    // }
    //
    // this.initUI = function() {
    // 	// 写入期数
    // 	span_qishu.html(list.next[0].qishu);
    // 	cur_qishu = list.next[0].qishu;
    //
    // 	// 写入上一期
    // 	$(".lastballs_1").html("");
    // 	$(".span_lastqishu").html(list.prev[0].qishu);
    // 	if (list.prev[0].balls && list.prev[0].balls != "-1") {
    // 		// console.log(list.prev[0].balls)
    // 		const res_shengxiao = [];
    // 		balls = list.prev[0].balls.split(" ");
    //
    // 		// 计算开奖生肖
    // 		for (const i = 0; i < ballscount; i++) {
    // 			for (const k in return_balls.shengxiao) {
    // 				if (contains(return_balls.shengxiao[k].balls, balls[i])) {
    // 					res_shengxiao.push(return_balls.shengxiao[k].name);
    // 					break;
    // 				}
    // 			}
    // 		}
    // 		// 显示生肖代码
    // 		const shengxiao_show = '<div class="shengxiao_show">';
    // 		for (const n=0;n<ballscount;n++) {
    // 			if (n === ballscount - 1) {
    // 				shengxiao_show += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
    // 			}
    // 			shengxiao_show += '<li class="balls_lhc none">'+res_shengxiao[n]+'</li>';
    // 		}
    // 		shengxiao_show += '</div>';
    //
    // 		// 计算开奖 和 显示号码
    // 		const balls_show = '<div class="balls_show">';
    // 		for (const n=0;n<ballscount;n++) {
    // 			if (n === ballscount - 1) {
    // 				balls_show += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
    // 			}
    // 			balls_show += '<li class="balls_lhc'+' '+ configColor(balls[n]) +'">'+balls[n]+'</li>';
    // 		}
    // 		balls_show += '</div>';
    //
    // 		$(".lastballs_1").append(balls_show + shengxiao_show);
    //
    // 		$(".opening").hide();
    //        _CDTimer.initRandomBall(false)
    // 	} else {  //没有开奖号码
    // 		$(".opening").show();
    // 		isopenning = true;
    //        _CDTimer.initRandomBall(true)
    // 	}
    //
    // 	// 写入上五期
    // 	$(".lastballs_5").html("");
    // 	for(const key in list.prev) {
    // 		const text = '<div class="history_item">第<span class="historyqishu">'+list.prev[key].qishu+'</span>期:';
    // 		const balls = [];
    // 		if (list.prev[key].balls && list.prev[key].balls!="") {
    // 			balls = list.prev[key].balls.split(" ");
    // 		}
    // 		for (const n = 0; n < ballscount; n++) {
    // 			text+= '<li class="balls_prev_'+ballscount+' '+ configColor(balls[n]) +'">'+(balls[n]?balls[n]:'-')+'</li>';
    // 		}
    // 		text += '</div>';
    // 		$(".history_box_5").append(text);
    // 	}
    //
    // 	//  定义号码球颜色
    // 	function configColor(arg_balls){
    // 		if (!arg_balls) {
    // 			return '';
    // 		}
    // 		if (contains(return_balls.color.red.balls,  arg_balls)){
    // 			return 'red';
    // 		}
    // 		if (contains(return_balls.color.blue.balls, arg_balls)) {
    // 			return 'blue';
    // 		}
    // 		if (contains(return_balls.color.green.balls, arg_balls)) {
    // 			return 'green';
    // 		}
    // 	}
    //
    // }
    //
    // this.start = function() {
    // 	timerid = setInterval(function(){
    //        _CDTimer.update();
    // 	}, 400);
    //    cur_time = getTimestamp();
    // 	this.initUI();
    //
    // }
    //
    // this.stop = function() {
    // 	clearInterval(timerid);
    // }
    //
    // this.initRandomBall = function(_random){
    // 	if (_random) {
    // 		clearInterval(randomID);
    // 		randomID = setInterval(function(){
    //        	const _random_text = '<div class="balls_show">';
    //        	const random_bg_arr = ['red', 'blue', 'green'];
    //        	for (const n=0;n<ballscount;n++) {
    //        		const random_bg = random_bg_arr[getRandomBall(0,2)];
    //        		const random_ball = getRandomBall(1, 49);
    //        		if (n === ballscount - 1) {
    //        			_random_text += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
    //        		}
    //        		_random_text += '<li class="balls_lhc '+random_bg+'">'+random_ball+'</li>';
    //        	}
    //        	_random_text += '</div>';
    //        	$(".lastballs_1").html(_random_text);
    //        }, 300)
    // 	}else{
    //        clearInterval(randomID);
    //        _CDTimer.initUI();
    // 	}
    // }
    //
    // this.update = function() {
    // 	const delay = list.next[0].jiezhitime + cur_time - getTimestamp();
    // 	if (delay > 0) {
    // 		const cd_time = getCDTimerObj(delay);
    // 		$(container).html(cdtimer_text.format(cd_time));
    // 	} else {
    // 		_CDTimer.onend();
    // 	}
    //
    // 	// if (isopenning) {
    // 	// 	const _random_text = '<div class="balls_show">';
    // 	// 	const random_bg_arr = ['red', 'blue', 'green'];
    // 	// 	for (const n=0;n<ballscount;n++) {
    // 	// 		const random_bg = random_bg_arr[getRandomBall(0,2)];
    // 	// 		const random_ball = getRandomBall(1, 49);
    // 	// 		if (n === ballscount - 1) {
    // 	// 			_random_text += '<li class="balls_lhc" style="background: none; color: #898989; font-size: 24px; border: none;">+</li>';
    // 	// 		}
    // 	// 		_random_text += '<li class="balls_lhc '+random_bg+'">'+random_ball+'</li>';
    // 	// 	}
    // 	// 	_random_text += '</div>';
    // 	// 	$(".lastballs_1").html(_random_text);
    // 	// }
    // }
    //
    // this.onend = function() {
    // 	const obj = list.next[0];
    // 	list.next.splice(0, 1);
    // 	list.prev.unshift(obj);
    // 	list.prev.pop();
    // 	$(".mask_1").fadeIn(200);
    // 	if (window._startCDFadeOutTime) {
    // 		window._startCDFadeOutTime();
    // 	}
    //
    // 	this.initUI();
    //
    // 	_CDTimer.stop();  // 暂停时钟
    //
    //    _CDTimer.initRandomBall(true);  // 开启随机摇号
    //    $(".cdtimer_tip").html("未开盘");
    //    $(container).html(cdtimer_text.format({h1: 0, h2: 0, m1: 0, m2: 0, s1: 0, s2: 0}));
    //    cur_time = getTimestamp();
    //
    //    setTimeout(function(){
    //        $(".cdtimer_tip").html("已开盘，距离截止投注还有:")
    //        if (list.next.length > 0) {
    //            timerid = setInterval(function(){
    //                _CDTimer.update();
    // 			}, 400);
    //        }else{
    //            _CDTimer.init();
    //            return;
    //        }
    //
    //    }, lock_time*1000)
    //
    // 	// 启动拉取开奖数据程序 - 5秒
    // 	getOpenID = setInterval(function(){
    // 		_CDTimer.init(true);
    // 	}, 5000);
    //
    //
    // 	// reflush = 10;   // 重置为5秒 拉取一次数据 -- 10sec
    // }
    // this.init();	// 启动
  }

  // 绑定模版
  this.bindTemplate = function (tpl) {
    _CPTouzhuObject.tpl_list = tpl;
  }

  // 侦听选择号码事件
  this.BindTplClickEvent = function () {
    // 显示提示
    $(".touzhu_box .tip").unbind("mouseover");
    $(".touzhu_box .tip").bind("mouseover", function () {
      const position = $(this).width() / 2;
      const left = $(this).offset().left - 59 + position;
      const top = $(window).height() - $(this).offset().top;
      const text = '<div class="chatbox" style="left:' + left + 'px; bottom:' + top + 'px;"> <div class="chatbox_line header"></div><div class="chatbox_line content">';
      text += $(this).data("content") + '</div><div class="chatbox_line bottom"></div></div>';
      $("body").append(text);
    });

    // 隐藏提示
    $(".touzhu_box .tip").unbind("mouseout");
    $(".touzhu_box .tip").bind("mouseout", function () {
      $(".chatbox").remove();
    });

    //表格点击效果
    $("table tbody td").unbind("click");
    $("table tbody td").bind("click", function () {
      const tr_len = $(this).parent().find("td").length;
      const input_len = $(this).parent().find("input").length;
      const idx_config = $(this).parent().find("input").eq(0).parent().index();
      const idx = $(this).index();
      //			console.log('tr长度: '+tr_len)
      //			console.log('input个数: '+input_len)
      //			console.log('第一个td包含input号码位置: ' + idx_config);
      //			console.log("当前点击的单元格: " + idx);
      //			console.log("is_arg变量: " + is_arg);

      if ($(this).hasClass("active")) {
        is_arg = 0;
        $("tbody input").prop("disabled", false);
        if (idx < (idx_config + 1)) {
          for (const i = 0; i < idx_config + 1; i += 1) {
            $(this).parent().find("td").eq(i).removeClass("active");
          }
          $(this).parent().find("td").eq(idx_config).find("input[type=text]").val("");
          $(this).parent().find("td").eq(idx_config).find("input[type=checkbox]").prop("checked", false);
          $(this).parent().find("td").eq(idx_config).find("input[type=checkbox]").removeClass("active");
        } else {
          const start_index = Math.floor((idx) / (idx_config + 1));
          for (const i = start_index * (idx_config + 1); i < start_index * (idx_config + 1) + (idx_config + 1); i += 1) {
            $(this).parent().find("td").eq(i).removeClass("active")
          }
          $(this).parent().find("td").eq(start_index * (idx_config + 1) + idx_config).find("input[type=text]").val("");
          $(this).parent().find("td").eq(start_index * (idx_config + 1) + idx_config).find("input[type=checkbox]").prop("checked", false);
          $(this).parent().find("td").eq(start_index * (idx_config + 1) + idx_config).find("input[type=checkbox]").removeClass('active');
        }
      } else {
        if (is_arg > 0) { //限制最大选择数量
          return;
        }
        if (idx < (idx_config + 1)) {
          for (const i = 0; i < (idx_config + 1); i += 1) {
            $(this).parent().find("td").eq(i).addClass("active");
          }
          $(this).parent().find("td").eq(idx_config).find("input[type=text]").val($("input.per_bet_edit").val());
          $(this).parent().find("td").eq(idx_config).find("input[type=checkbox]").prop("checked", true);
          $(this).parent().find("td").eq(idx_config).find("input[type=checkbox]").addClass("active");
        } else {
          const start_index = Math.floor((idx) / (idx_config + 1));
          for (const i = start_index * (idx_config + 1); i < start_index * (idx_config + 1) + (idx_config + 1); i += 1) {
            $(this).parent().find("td").eq(i).addClass("active");
          }
          $(this).parent().find("td").eq(start_index * (idx_config + 1) + idx_config).find("input[type=text]").val($("input.per_bet_edit").val());
          $(this).parent().find("td").eq(start_index * (idx_config + 1) + idx_config).find("input[type=checkbox]").prop("checked", true);
          $(this).parent().find("td").eq(start_index * (idx_config + 1) + idx_config).find("input[type=checkbox]").addClass("active");
        }
        switch (cur_play.playid) { //限制最大选择数量
        case '8': //特肖 合肖 最大选择11个号码组合
        case '21':
          if ($(this).parents("tbody").find("input.active").length >= 11) {
            $("tbody input").prop("disabled", true);
            is_arg = 1;
          }
          break;
        case '30':
        case '31':
        case '32':
        case '32':
        case '33':
        case '34':
        case '35':
          if ($(this).parents("tbody").find("input.active").length >= 10) {
            $("tbody input").prop("disabled", true);
            is_arg = 1;
          }
          break;
        case '22':
        case '23':
        case '24':
        case '25':
        case '26':
        case '27':
        case '28':
        case '29':
          if ($(this).parents("tbody").find("input.active").length >= 6) {
            $("tbody input").prop("disabled", true);
            is_arg = 1;
          }
          break;
        }
      }
      _CPTouzhuObject.calcZhushu();
    })

    //表格输入框点击效果
    $("table tbody td input[type=text]").unbind("click");
    $("table tbody td input[type=text]").bind("click", function (event) {
      event.stopPropagation();
      if (!$(this).parent().hasClass("active")) {
        $(this).parent().click();
      }
      index_arr = []; //如果有单个改变，取消整体变值
    });

    $("table tbody td input[type=text]").bind("keyup", function (event) {
      _CPTouzhuObject.calcZhushu();
    });

    //改变预设金额
    const index_arr = []; //存贮可变更下标
    $("input.per_bet_edit").keyup(function () {
      $("table tbody td.active").each(function () {
        if ($(this).find("input").val() == "") {
          index_arr.push($(this).index("td.active"));
        }
      })
      if (/^[1-9]{1}/.test($(this).val()) == false) {
        $(this).val("");
      } else {
        const _edit_price = $("input.per_bet_edit").val();
        for (const k in index_arr) {
          $("table tbody td.active").eq(index_arr[k]).find("input").val(_edit_price);
        }
      }
      _CPTouzhuObject.calcZhushu();
    })
  }

  // 撤销投注
  this.cancelTouzhu = function (trobj) {

    const trobj_list = [];
    if (trobj) {
      trobj_list.push(trobj.parents("tr"));
    }
    const _idlist = [];

    if (!trobj) {
      //全部撤单
      $(".dialog_history_box tbody tr").each(function () {
        if ($(this).data("qishu") == cur_qishu) {
          trobj_list.push($(this));
          _idlist.push($(this).data("guid"));
        }
      });
      _idlist = _idlist.join(',');
    } else {
      //单注撤单
      _idlist = trobj.parents("tr").data("guid");
    }

    if (!_idlist || _idlist.length == 0) {
      // if (trobj) {
      // 	toast("该注单已经过了可撤销时间!");
      // }else{
      // 	toast("没有找到任何可以撤销的注单!");
      // }
      toast("没有找到任何可以撤销的注单!");
      return;
    }
    AjaxPost(post_url, { ac: "cancelTouzhu", gameid: game_id, idlist: _idlist }, function (obj) {
      if (obj.msg > 0) {
        tipshow(obj.param);
        return;
      }
      for (const k in trobj_list) {
        //trobj_list[k].remove();
        trobj_list[k].find(".history_status").html("<a style='color:#119;'>已撤单</a>");
      }
      toast("撤销成功!共获得:" + obj.data.total_price + "元金额退还!");
      if (window.changeMoney) {
        changeMoney(obj.data.now_price, 1000);
      }
    });
  }

  // 执行初始化
  _CPTouzhuObject.init();
}

// 获取随机号码
const getRandomBall = function (min, max) {
  return Math.round(Math.random() * (max - min)) + min;
}

// 获取随机号码
const getRandomBall2 = function (min, max, count, spchar) {
  const balls = [];
  for (const i = min; i <= max; i++) {
    balls.push(i);
  }
  // 洗牌
  for (const i = 0; i < 150; i++) {
    const r1 = getRandomBall(0, balls.length - 1);
    const r2 = getRandomBall(0, balls.length - 1);
    const tmp = balls[r1];
    balls[r1] = balls[r2];
    balls[r2] = tmp;
  }

  // 输出前几个
  const output = "";
  for (const i = 0; i < count; i++) {
    if (output != "") {
      output += spchar;
    }
    output += balls[i];
  }
  return output;
}

// 获取随机数
function random(min, max) {
  const r = Math.round(Math.random() * (max - min)) + min;
  return r;
}
export { CPTouzhuObject }