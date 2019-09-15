# 使用腾讯云手写OCR API的微信小程序
 
>主要功能：识别图片形式的手写笔记并展示
 
     //appid等作为全局变量定义在了app.js里
     //使用时需将相应字段添加到app.js文件中
     globalData: {
     appid: "",
     secretid: "",
     secret: ""
      }

## 基本说明

页面为4个： "pages/pageBar/newTxt"为主页面，点击相应栏目跳转到"pages/note/noteedit"编辑页面,点击栏目右侧分享按钮跳转"pages/share/share"分享页面；点击底部"我的"，跳转"pages/pageBar/history"个人页面


## 主界面

![未能成功显示首页](photo/index.png)
 
## 识别功能

![未能成功显示识别动图](photo/main.gif)
 
## 修改存储

![未能成功显示修改存储功能](photo/save.gif)
