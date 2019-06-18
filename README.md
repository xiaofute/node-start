# node-start

## resultFul API
 > 该框架中采用了express web框架实现定义路由表执行不同的http请求

 ### 安装        
 ```
 # express
 npm install express --save

 # 中间件 处理 JSON, Raw, Text 和 URL 编码的数据
 npm install body-parser --save
 ```
 ### 定义路由表
 > routes/index.js中定义所有的路由表，在app.js中定义

 - 定义路由表，对应调用不同的invoke操作
 - 使用swagger jsdoc注释，生成swagger ui

### 引入swagger-ui
```
// swagger ui
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// 配置swaggerUi 页面路由地址
app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

```
### 启动服务
> bin/www

- 通过express对象创建http sever

## nodemon
>nodemon是一种工具，通过在检测到目录中的文件更改时自动重新启动节点应用程序,达到热加载的效果

### 安装
```
npm install --save-dev nodemon
```

### 配置文件
[nodemon官网](https://github.com/remy/nodemon#nodemon)
在项目根目录下创建`nodemon.json`文件，配置文件具体说明

#### 配置参数
- `ext` : 指定默认文件的后缀，参数是一个字符串，每个后缀之间用空格分隔，默认支持 js coffee litcoffee
- `script` : 指定监视的文件，这个一般是指定项目入口的 js 文件
- `watch` : 这里指定监视的文件夹或文件，是一个数组，每个参数是目录或文件
- `env` : 运行环境 development 是开发环境，production 是生产环境，port 是端口号
- `restartable` : 指定重启的命令，是一个字符串，默认是 'rs'
- `ignore` : 忽略监视的文件或文件夹，默认忽略的文件有：.git, node_modules, bower_components, .sass-cache
- `verbose` : 是否输出重启的详细信息，值是一个布尔值，true 是打印详细信息，false 是不打印

### eg

```
{
  "restartable": "rs",
  "ignore": [
      ".git",
      ".svn",
      "node_modules/**/node_modules"
  ],
  "verbose": true,
  "execMap": {
      "js": "node --harmony"
  },
  "watch": [

  ],
  "env": {
      "NODE_ENV": "development"
  },
  "ext": "js json"
}
```
### 启动命令
1. 将命令配置在`package.json`文件中(nodemon未安装在全局)
```
  "dev":"nodemon ./bin/www",
```
2. 启动命令
```
  npm run dev
```

## user
### 建库
1. 执行`user.sql`,初始化建表

### 数据库配置
数据库的配置文件在`config/config.db.js`中，可在该文件中配置连接数据库的基本信息
```
module.exports = {
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'node-start'
};
```