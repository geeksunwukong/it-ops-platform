# IT运维管理平台启动指南

## 一键启动

### 使用部署脚本
```bash
# 给予执行权限
chmod +x deploy.sh

# 运行部署脚本
./deploy.sh
```

脚本将自动完成以下步骤：
1. 检查Docker和Docker Compose是否已安装
2. 清理之前的容器（如果存在）
3. 构建前端和后端镜像
4. 启动PostgreSQL数据库
5. 启动Redis缓存
6. 初始化数据库表和默认用户
7. 启动后端API服务
8. 启动前端Web服务

## 服务架构

### 容器组成
- **frontend**: Nginx托管的React前端应用 (端口: 3000)
- **backend**: Node.js Express后端API (端口: 5000)
- **postgres**: PostgreSQL数据库 (端口: 5432)
- **redis**: Redis缓存 (端口: 6379)

### 数据流
```
用户请求 -> Nginx (3000) -> API请求代理到 -> Express (5000) -> PostgreSQL/Redis
```

## 访问服务

### Web界面
- 前端地址: http://localhost:3000
- API健康检查: http://localhost:5000/health

### 默认用户
- 用户名: admin
- 邮箱: admin@it-ops-platform.local
- 密码: admin123

## 管理命令

### 查看服务状态
```bash
cd docker
docker-compose ps
```

### 查看日志
```bash
# 查看所有服务日志
docker-compose logs -f

# 查看特定服务日志
docker-compose logs -f backend
docker-compose logs -f frontend
```

### 停止服务
```bash
cd docker
docker-compose down
```

### 重启服务
```bash
cd docker
docker-compose restart
```

### 重建并重启
```bash
cd docker
docker-compose down
docker-compose up -d --build
```

## 数据持久化

- 数据库存储在 `postgres_data` 卷中
- Redis数据存储在 `redis_data` 卷中
- 数据在容器重启后会保留

## 故障排除

### 如果遇到端口冲突
检查是否有其他服务占用了3000、5000、5432或6379端口：
```bash
netstat -tulpn | grep :3000
netstat -tulpn | grep :5000
netstat -tulpn | grep :5432
netstat -tulpn | grep :6379
```

### 如果服务启动失败
检查日志找出问题：
```bash
docker-compose logs backend
docker-compose logs postgres
```

### 清理数据卷（警告：这将删除所有数据）
```bash
docker-compose down -v
```