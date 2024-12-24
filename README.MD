## 安装和运行    node版本: 16.20(我当前使用的版本)
    1、 npm install  下载依赖
    2、 npm run dev  运行项目

```

# 配置文件说明
    1、数据库配置
        

```markdown
BaseProject/express
    .config                 # 配置文件目录
    logs                    # 日志文件目录
        combined.log        # 组合日志文件
        error.log           # 错误日志文件
        http.log            # HTTP 请求日志文件
    src                     # 源代码目录
        commons               # 工具模块
            asyncWrap.ts    # 异步包装工具
            redis               # 缓存模块
                RedisIndex      # redis 主文件、放一些配置之类的
        index.ts            # 入口文件
        config              # 配置模块
            config.ts       # 配置管理
            database.ts     # 数据库连接配置
            redis.ts        # Redis 连接配置
            swagger.ts      # Swagger 配置
        errors              # 错误处理模块
            customError.ts  # 自定义错误类
        logger              # 日志模块
            index.ts        # 日志配置
        middlewares         # 中间件模块
            corsMiddleware.ts     # CORS 中间件
            errorHandler.ts       # 错误处理中间件
            helmet.ts             # 安全头中间件
            index.ts              # 中间件初始化
            loggerHandler.ts      # 日志中间件
            rateLimit.ts          # 请求限流中间件
            requestParser.ts      # 请求解析中间件
            swagger.ts            # Swagger 中间件
        models              # 数据模型、存放 BotUser 之类的一些对象
        controller              # 路由模块
            index.ts        # 路由初始化
        types               # 类型定义
        services    # 接口实现层
        
    .env                    # 环境变量文件
    .eslintrc.js            # ESLint 配置文件
    docker-compose.yaml     # Docker Compose 配置文件
    package-lock.json       # 锁定依赖版本的文件
    package.json            # 项目依赖和脚本配置文件
    README.md               # 项目说明文件
    tsconfig.json           # TypeScript 配置文件
```
sharp兼容问题解决
```
npm install --platform=win32 --arch=x64 sharp
```