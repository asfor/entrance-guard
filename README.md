# graduation-design

> My graduation project

## 安装

1. 确保你已经安装了 [Node.js](http://nodejs.org/) 和 [mongoDB](https://www.mongodb.com/)
2. 下载 Github 仓库 (`git clone https://github.com/asfor/graduation-design.git`)
3. 运行 `npm install` 来安装 npm 依赖包
4. 使用 `npm install -g webpack webpack-dev-server` 全局安装 webpack 与 webpack 开发服务器
5. 在 mongoDB 的根目录下运行 `bin/mongod` 来开启 mongoDB
6. 现在，你可以进行以下操作：

``` bash
# 打开地址为 localhost:8080 的前端开发服务器（热加载）
npm run dev-client

# 打开地址为 localhost:3000 的后端开发服务器（文件修改后自动重启）
npm run dev-server

# 将前端内容打包置入后端环境
webpack
```

## 更新日志

> 有什么更新写在这下面

2016.12.10 原有的想法问题太多了，两边的数据库互相依赖，导致很难继续下去，受到 flux 的启发，想到了全新的架构，单向数据流果然好使，哈哈哈哈……

2016.12.11 基本流程都写出来了，只是向 PC 端提供的 API 还没有测试完，今天就先到这里，接下来把前端对接上，那基本就完工了

2016.12.12 今天有两节课，偷了点懒，到晚上才把接口测完，修了修接口的 BUG，补了补 README 内容。明天没课，把客户端也测一下，然后再写写文档，就收工

## 吐槽一下

这个数据库设计的真的不好（PS: 不是我设计的，我只是在原有基础上扩展），冗余度太高了，第三范式都没达到，还有其他好多地方就不一一吐槽了。总之，为了保持两端表一致，用的我心好累，希望大家以后引以为戒，数据库千万不能将就着设计将就着用。