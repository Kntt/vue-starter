## 项目简介

基于 vue官方template创建，项目改进：

- 增加版本控制脚本```version.js```，控制发布版本
- 增加mock配置， 方便前后端分离开发
- 使用```husky```，处理precommit，保证提交前代码lint，eslint可以根据个人或团队规范自行制定
- 移动端，扩展了flexible.js, 配合px2rem 使用rem适配[需要请查看mobile-app分支]

## 目录结构

```
├── README.md                       项目介绍
├── build                           webpack构建配置（修改了dev-server文件， 增加mock配置）
├── config                          构建配置参数 （修改了build参数， 不同的版本会构建在```dist/{version}```目录， 保留最近的5个版本）
├── index.html
├── mock                            mock文件夹
│   └── hello.js                          基于 express 的接口格式
├── package.json                    项目文件，依赖管理
├── src                             源码文件夹
│   ├── App.vue                     根组件
│   ├── assets                      资源目录，会被wabpack构建
│   ├── components                  组件目录
│   ├── main.js                     入口js文件
│   ├── router                      路由配置目录
│   ├── utils                       项目中用到的工具函数
│   └── views                       逻辑页面文件夹
│       └── HelloWorld.vue
├── static                          静态资源文件夹， 不会被webpack构建，会直接复制
├── test                            单元测试文件夹
│   └── unit                        
│       ├── index.js                入口js
│       ├── karma.conf.js           karma配置
│       └── specs                   测试用例文件夹
├── version.js                      项目版本管理脚本， 运行后小版本自增
└── yarn.lock
```

## 环境安装

本项目依赖 node.js， 使用前先安装 node.js 和 cnpm（显著提升依赖包的下载速度）。

    建议使用cnpm或者yarn

## 快速开始

```bash
    git clone https://github.com/hanan198501/vue-spa-template.git 
    cd vue-spa-template
    cnpm install
    npm run dev
```

## 命令列表：

```bash
    #开启本地开发服务器，监控项目文件的变化，实时构建并自动刷新浏览器，浏览器访问 http://localhost:8081
    npm run dev

    #使用生产环境配置构建项目，构建好的文件会输出到 "dist" 目录，
    npm run build

    #提交前运行，检查代码规范，（husky会自动触发，根据需要可以手动处理）
    npm run lint

    #发布新版本
    npm run publish

    #运行单元测试
    npm run unit
```

## 接口 mock

前后端分离后，定义好接口信息，前端通过 mock 的方式，即可开始编码，无需等待后端接口 ready。
项目开发服务器基于 express 搭建的，我们已经在 dev-server 中添加了接口 mock 功能。
开发时，接口的 mock 数据统一放在 mock 目录下，每个文件内如下：

```javascript
    module.exports = {
      // 接口地址
      api: '/api/hello',
    
      // 返回数据 参考http://expressjs.com/zh-cn/4x/api.html
      response: function (req, res) {
        res.json({
            status: 200,
            statusText: 'success',
            body: []
        });
      }
    }
```

## 单元测试

可以为每个组件编写单元测试，放在 `test/unit/specs` 目录下面, 单元测试用例的目录结构建议和测试的文件保持一致（相对于src），每个测试用例文件名以 `.spec.js`结尾。
执行 `npm run unit` 时会遍历所有的 `spec.js` 文件，产出测试报告在 `test/unit/coverage` 目录。


## 联调方式

联调的时候，只需通过 proxy 参数运行 dev 脚本即可，所有 mock 目录下定义的接口将会转发到 proxy 参数指定的机器：

    # 127.0.0.1:8081 为后端机器的环境地址
    npm run dev --proxy=127.0.0.1:8081

这样，mock 目录下的接口 /api/hello，将会转发到 127.0.0.1:8081/api/hello

## 相关资源

- vue.js 官网：[https://vuejs.org/](https://vuejs.org/)
- vue-router 文档：[http://router.vuejs.org/zh-cn/index.html/](http://router.vuejs.org/zh-cn/index.html)
- vuex 文档：[http://vuex.vuejs.org/](http://vuex.vuejs.org/)
- webpack 文档：[https://webpack.github.io/docs/](https://webpack.github.io/docs/)
- mocha 文档: [http://mochajs.org/](http://mochajs.org/)
- express 中文官网：[http://expressjs.com/zh-cn/](http://expressjs.com/zh-cn/) 
