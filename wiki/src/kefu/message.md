# 1. message

<!-- TOC -->

- [1. message](#1-message)
  - [1.1. connsvr 连接](#11-connsvr-连接)
  - [1.2. TALK 发送](#12-talk-发送)
  - [1.3. TALK_Boardcast 接受](#13-talk_boardcast-接受)
  - [1.4. TOUZHU 自己投注](#14-touzhu-自己投注)
    - [1.4.1. 发送](#141-发送)
    - [1.4.2. 返回](#142-返回)
  - [1.5. 跟单投注-自己投注](#15-跟单投注-自己投注)
    - [1.5.1. 发送](#151-发送)
    - [1.5.2. 返回](#152-返回)
    - [1.5.3. 投注失败返回错误](#153-投注失败返回错误)
  - [1.6. boardcast 他人投注(broadcast)](#16-boardcast-他人投注broadcast)
  - [1.7. 开奖倒计时](#17-开奖倒计时)
    - [1.7.1. 返回](#171-返回)

<!-- /TOC -->

## 1.1. connsvr 连接

@desc 发起连接

| key    | value    | desc                                             |
| ------ | -------- | ------------------------------------------------ |
| action | connsvr  | 动作标识                                         |
| User   | {string} | http/getTalkingInfoNotLogin 接口返回用户加密数据 |
| Drivce | {string} | 4 端标识 PC 、IOS、WAP、Android                  |

请求格式

```json
{
  "action": "connsvr",
  "Drivce": "WAP",
  "User": "095006131E192D1D1C5048435E50151B14062D1D1C5048435E50070117001C131F1750485035075858584040505E50041B025048425E501A171316504850505E50061315504850031306500F"
}
```

返回

| key       | value      | desc                                          |
| --------- | ---------- | --------------------------------------------- |
| action    | Login_RESP | 动作标识                                      |
| User      | {string}   | 加密数据返回                                  |
| UserToken | {int}      | 根据连接服务器后返回的 UserToken 回传给服务器 |

| User-key | value    | desc                               |
| -------- | -------- | ---------------------------------- |
| talk_on  | {int}    | 1=有发言权限, 0=无发言权限         |
| gift_on  | {int}    | 1=有收发红包权限, 0=无收发红包权限 |
| username | {string} | 用户名称                           |
| vip      | {int}    | vip 等级                           |
| head     | {string} | 头像                               |
| tag      | {string} | 业主代号                           |

```javascript
{
  action: 'Login_RESP',
  Token: 'F643802AC649BCB2',
  Online: 5,
  UserToken:
    'C7WUrotyfJW8djgg2wto6ZC4bM/HH0GTQulwrc50D4Z4c2Lij+669WS6TG0pS3yfZyDcZmcHo/A3jZlVe8c9k69L6eYRmc4dmDrSV3IlefM='
}

// 消息类型错误
{"action":"Login_RESP","code":null,"status":1,"error":17302,"msg":"消息类型错误"}
{"action":"Login_RESP","status":1,"error":17701,"msg":"uid不能为空"}
```

## 1.2. TALK 发送

@desc 自己说话 消息体

发送

| key       | value    | desc                                          |
| --------- | -------- | --------------------------------------------- |
| action    | TALK     | 动作标识                                      |
| msg       | {string} | 说话内容                                      |
| code      | {string} | 前端生产唯一标识                              |
| UserToken | {string} | 根据连接服务器后返回的 UserToken 回传给服务器 |

```json
{
  "action": "TALK",
  "msg": "",
  "code": "",
  "UserToken": "C7WUrotyfJXgS71VlL1Bz"
}
```

返回

| key    | value     | desc             |
| ------ | --------- | ---------------- |
| action | TALK_RESP | 动作标识         |
| status | {int}     | 加密数据返回     |
| error  | {int}     | 错误码           |
| code   | {string}  | 前端生产唯一标识 |

```javascript
//  服务器接受成功
{
  action: 'TALK_RESP',
  UserToken: '',
  code: 'a574c8d32e5fdb4e4267100fe563ca01',
  time: '2019-01-14 20:57:53',
  status: 0,
  error: 0
}
//  UserToken服务器签名效验字段错误 error=17300
{
  action: 'TALK_RESP',
  UserToken:"",
  code:"",
  status: 1,
  error: 17300
}
//  禁止发言
{
  action: 'TALK_RESP',
  UserToken:"",
  msg:"禁止发言",
  code:"",
  status: 1,
  error: 101
}

```

## 1.3. TALK_Boardcast 接受

@desc 其他人说话 消息体

返回

```javascript
//  广播消息
{
  action: 'TALK_Boardcast',
  talker_name: 'GU***123',
  talker_head: 'logl.png',
  talker_vip: 7,
  time: '2018-12-21 15:15:15',
  msg: '哈哈哈哈',
  UserToken: '根据connsvr连接服务器后返回的UserToken回传给服务器(不可修改)'
}
```

## 1.4. TOUZHU 自己投注

@desc 自己投注

### 1.4.1. 发送

| key       | value    | desc                                          |
| --------- | -------- | --------------------------------------------- |
| action    | TOUZHU   | 动作标识                                      |
| code      | {string} | 前端生产唯一标识                              |
| UserToken | {string} | 根据连接服务器后返回的 UserToken 回传给服务器 |
| p         | {string} | 加密投注信息                                  |

```json
{
  "action": "TOUZHU",
  "code": "7bc4fc7a63b35ba7a6d40c5ed53f9919",
  "UserToken": "C7WUrotyfJXgS71VlL1BzBWl/2/itRBOyO87KMJBtzwyyDLBaGW+euQ1BzhVZFNJyKmDwdjD1HMmIB+hdKuz65g60ldyJXnz",
  "p": "DEX76742A626472654462757A7E634378626D7F62316172652A61263927392731747B7E72796348636E67722A263163787C72792A207127742E76727225202F2E2520222E75732471242F7174272176222771732431647264647E78797C726E2A24767427267120752F71742571737271272F2573722225722724752E2075722231627E732A26202F22263170767A727E732A2531667E647F622A202525272E2231737663762A4C352034263422354A31766263782A2631646378672A26317A627B637E677B722A26317178657A4862797E6662724863787C72792A504D6D4724203A437D257E5C4E5F66412F2659715E487D6E6174517F52625B465C275C5263317E6448737D2A2631617862747F72652A277447DF125FBC18E4BAF5BE048E887C2A"
}
```

<!-- -->

### 1.4.2. 返回

```javascript
{
  action: 'TOUZHU_RESP',
  time: '2019-01-14 20:59:25',
  code: '5c0d364c175db857e66e710f13a70608',
  param: 'msgok',
  data: { self: { take: 12, less: 1001122.53 } },
  UserToken: '',
  error: 0
}
```

## 1.5. 跟单投注-自己投注

与 1.4 区别就是 action 不同，加密字段中 is_dj 要赋值 2

### 1.5.1. 发送

| 参数      | 类型   | 默认值       | 说明                                          |
| --------- | ------ | ------------ | --------------------------------------------- |
| action    | String | TOUZHU_GD    | 操作                                          |
| code      | string | 随便         | 前端生产唯一标识                              |
| UserToken | string | 从接口取的值 | 根据连接服务器后返回的 UserToken 回传给服务器 |
| p         | string |              | 加密投注信息                                  |

```json
{
  "action": "TOUZHU_GD",
  "code": "7bc4fc7a63b35ba7a6d40c5ed53f9919",
  "UserToken": "C7WUrotyfJXgS71VlL1BzBWl/2/itRBOyO87KMJBtzwyyDLBaGW+euQ1BzhVZFNJyKmDwdjD1HMmIB+hdKuz65g60ldyJXnz",
  "p": "DEX76742A626472654462757A7E634378626D7F62316172652A61263927392731747B7E72796348636E67722A263163787C72792A207127742E76727225202F2E2520222E75732471242F7174272176222771732431647264647E78797C726E2A24767427267120752F71742571737271272F2573722225722724752E2075722231627E732A26202F22263170767A727E732A2531667E647F622A202525272E2231737663762A4C352034263422354A31766263782A2631646378672A26317A627B637E677B722A26317178657A4862797E6662724863787C72792A504D6D4724203A437D257E5C4E5F66412F2659715E487D6E6174517F52625B465C275C5263317E6448737D2A2631617862747F72652A277447DF125FBC18E4BAF5BE048E887C2A"
}
```

### 1.5.2. 返回

需要注意的是这里返回的 data 中没有了 self 字段
需要根据返回的 UserToken 与自己登录的聊天室 TOKEN 比对判断是否是自己的投注

```javascript
{
  action: 'TOUZHU_GDRESP',
  code: '4be8a52971dfd796dce4fde190639344',
  param: 'msgok',
  data: { take: 50, less: 1001072.53 },
  UserToken: '',
  error: 0
}
```

### 1.5.3. 投注失败返回错误

```javascript
{
  action: 'TOUZHU_GDRESP',
  code: 'fjaiugdakfewotiewrwkenk',
  error:17303
  msg: '禁止投注'
  UserToken:
    'C7WUrotyfJXgS71VlL1BzBWl/2/itRBOyO87KMJBtzwyyDLBaGW+euQ1BzhVZFNJyKmDwdjD1HMmIB+hdKuz65g60ldyJXnz'
}
```

## 1.6. boardcast 他人投注(broadcast)

@desc 广播投注

返回

```javascript
{
  action: 'Boardcast',
  param: 'msgok',
  time: '2019-01-03 08:12:10',
  data: {
    boardcast: {
      qishu: 723797,
      auto: 1,
      stop: 0,
      multiple: '1',
      list: [
        {
          playid: 14,
          per_price: 600,
          balls: '1 1',
          xiangqing: '冠军(小)',
          zhushu: 1,
          price: 600,
          wanfa: '双面盘'
        }
      ],
      tz_time: '2019-01-03 20:12:10',
      gameid: 2
    },
    vip: 0,
    username: 'te***10',
    head:
      'http://upload.bxvip588.com/qat/Uploads/user/c2874138d9876dff27075fe404d5c531.jpg',
    group: 'OTHER_BET',
    gameName: '北京PK拾'
  },
  UserToken:
    'C7WUrotyfJXgS71VlL1BzBWl/2/itRBO+yGBwUfwC4lDepp1uZWF5hZZ6Rk0TIbXUBtHvRCZYpzxKcr9Ra6dTAbHQm0zdvPr'
}

```

## 1.7. 开奖倒计时

### 1.7.1. 返回

```javascript
{
  action: 'getKjCpLog',
  getKjCpLog_List: [
    {
      js_tag: 'ssc',
      pinlv: '1分',
      qishu: 1440,
      icon: 'https://upload.bxvip588.com/fcai/Uploads/cpicon/ffssc.png?v2.4.15',
      prev: [
        {
          balls: ['3', '6', '3', '3', '5'],
          qishu: 201901141262,
          opentime: 1547470860
        }
      ],
      gameid: 33,
      tag: 'ffssc',
      game_name: '分分时时彩',
      enable: 1,
      speed: 1
    },
    {
      pinlv: '3分',
      qishu: 480,
      icon: 'https://upload.bxvip588.com/fcai/Uploads/cpicon/sfssc.png?v2.4.15',
      prev: [
        {
          balls: ['1', '9', '5', '2', '0'],
          qishu: 20190114421,
          opentime: 1547470800
        }
      ],
      gameid: 18,
      tag: 'sfssc',
      game_name: '三分时时彩',
      js_tag: 'ssc',
      enable: 1,
      speed: 1
    }
  ]
}


```
