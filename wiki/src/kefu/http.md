# 1. http api

<!-- TOC -->

- [1. http api](#1-http-api)
  - [1.1. getTalkingInfoNotLogin](#11-gettalkinginfonotlogin)
  - [1.2. getTalkingInfoByLogin](#12-gettalkinginfobylogin)

<!-- /TOC -->

## 1.1. getTalkingInfoNotLogin

| key | value                  | desc     |
| --- | ---------------------- | -------- |
| ac  | getTalkingInfoNotLogin | 动作标识 |

请求格式

```json
{ "ac": "getTalkingInfoNotLogin", "client_type": 1, "edition": "v1.0.0" }
```

返回

```javascript
// 不可进入返回
{ "msg": 20030, "param": "聊天室禁止未登陆用户进入!!" }
```

## 1.2. getTalkingInfoByLogin

| key | value                 | desc |
| --- | --------------------- | ---- |
| ac  | getTalkingInfoByLogin | -    |

请求格式

```json
{
  "ac": "getTalkingInfoByLogin",
  "uid": 17780,
  "token": "18b0b6ee1eb1b2bf3876fb5afff5f902",
  "sessionkey": "0f5c2ed71b4395f9623f84a69e143d14",
  "client_type": 1,
  "edition": "v1.0.0"
}
```

返回

```javascript
{
   //  1=能投注, 0=不能投注
  touzhu_on: 0,
  //  1=有发言权限, 0=无发言权限
  talk_on: 1,
  //  vip 多少级以上可以发言( 当没有发言权限的时候会返回 >0)
  talking_vip: 0,
  //  每次发言的最低频率限制
  talk_delay: 10,
  //  1=有收发红包权限, 0=无收发红包权限
  gift_on: 1,
  //  聊天室的socket 地址 或跳转地址
  talk_url: '',
  // vip 等级
  vip: 0,
  //  用户数据
  talk_data:
    '0950070117001C131F175048503507585858424A505E50041B025048425E501A171316504850505E50061315504850031306505E5006131E192D1D1C5048435E50151B14062D1D1C5048430F'
}
// 禁止进入
{"msg":20028,"param":"èŠå¤©å®¤æš‚æ—¶æ‰“çƒŠ!è¯¦æƒ…è¯·å’¨è¯¢å®¢æœ!"}
```
