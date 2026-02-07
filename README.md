# IT运维管理平台

一个现代化的IT运维管理平台，用于监控、管理和自动化IT基础设施。

## 项目特性

- **资产管理**: 服务器、工作站、网络设备等IT资产的统一管理
- **实时监控**: 服务器状态、网络性能、应用健康检查
- **自动化运维**: 部署脚本、批量操作、定时任务
- **用户管理**: 角色权限控制、访问日志
- **响应式界面**: 适配桌面和移动设备

## 技术栈

### 前端
- React 18
- TypeScript
- TailwindCSS
- React Router

### 后端
- Node.js
- Express
- TypeScript
- PostgreSQL
- Sequelize ORM
- Redis
- JWT (身份验证)

### 部署
- Docker
- Docker Compose

## 快速开始

### 环境要求
- Docker & Docker Compose

### 一键部署 (推荐)

1. 克隆项目
```bash
git clone <repository-url>
cd it-ops-platform
```

2. 使用部署脚本一键启动
```bash
chmod +x deploy.sh
./deploy.sh
```

### 手动部署

1. 克隆项目
```bash
git clone <repository-url>
cd it-ops-platform
```

2. 使用Docker Compose启动所有服务
```bash
cd docker
docker-compose up -d --build
```

服务将在以下端口运行:
- 前端: http://localhost:3000
- 后端API: http://localhost:5000
- PostgreSQL: localhost:5432
- Redis: localhost:6379

## API 文档

### 认证
- `POST /api/auth/register` - 用户注册
- `POST /api/auth/login` - 用户登录
- `POST /api/auth/logout` - 用户登出
- `GET /api/auth/profile` - 获取用户资料

### 资产管理
- `GET /api/assets` - 获取所有资产
- `GET /api/assets/search` - 搜索资产
- `GET /api/assets/:id` - 获取单个资产
- `POST /api/assets` - 创建资产
- `PUT /api/assets/:id` - 更新资产
- `DELETE /api/assets/:id` - 删除资产

## 项目结构

```
it-ops-platform/
├── frontend/                 # 前端代码
│   ├── src/
│   │   ├── components/      # React组件
│   │   ├── pages/          # 页面组件
│   │   ├── hooks/          # 自定义hooks
│   │   ├── services/       # API服务
│   │   └── utils/          # 工具函数
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── backend/                  # 后端代码
│   ├── src/
│   │   ├── controllers/    # 控制器
│   │   ├── models/         # 数据模型
│   │   ├── routes/         # 路由
│   │   ├── middleware/     # 中间件
│   │   ├── services/       # 业务逻辑
│   │   └── utils/          # 工具函数
│   ├── package.json
│   └── tsconfig.json
├── docker/
│   ├── docker-compose.yml
│   ├── Dockerfile.frontend
│   └── Dockerfile.backend
└── README.md
```

## 当前进度

- [x] 项目架构搭建
- [x] 用户认证系统
- [x] 资产管理系统
- [x] 监控系统
- [x] 自动化运维系统
- [x] 数据库模型
- [x] API路由
- [x] 前端基础页面
- [x] Docker容器化部署
- [ ] 事件管理系统
- [ ] 高级安全功能
- [ ] 完整的测试套件

## 贡献

欢迎提交Issue和Pull Request来帮助改进此项目。

## 许可证

MIT