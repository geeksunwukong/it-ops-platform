# IT运维管理平台 API文档

## 认证

### 用户注册
- **URL**: `/api/auth/register`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **响应**:
  ```json
  {
    "message": "User created successfully",
    "token": "jwt_token",
    "user": {
      "id": "number",
      "username": "string",
      "email": "string"
    }
  }
  ```

### 用户登录
- **URL**: `/api/auth/login`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **响应**:
  ```json
  {
    "message": "Login successful",
    "token": "jwt_token",
    "user": {
      "id": "number",
      "username": "string",
      "email": "string"
    }
  }
  ```

## 资产管理

### 获取所有资产
- **URL**: `/api/assets`
- **方法**: `GET`
- **查询参数**:
  - `page`: 页码 (默认: 1)
  - `limit`: 每页数量 (默认: 10)
  - `type`: 资产类型 (可选)
- **响应**:
  ```json
  {
    "assets": "[Asset]",
    "totalPages": "number",
    "currentPage": "number",
    "totalAssets": "number"
  }
  ```

### 搜索资产
- **URL**: `/api/assets/search`
- **方法**: `GET`
- **查询参数**:
  - `query`: 搜索关键词
- **响应**:
  ```json
  {
    "assets": "[Asset]"
  }
  ```

### 获取单个资产
- **URL**: `/api/assets/:id`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "asset": "Asset"
  }
  ```

### 创建资产
- **URL**: `/api/assets`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "name": "string",
    "hostname": "string",
    "type": "string",
    "status": "string",
    "ipAddress": "string",
    "description": "string",
    "location": "string",
    "ownerId": "number"
  }
  ```
- **响应**:
  ```json
  {
    "message": "Asset created successfully",
    "asset": "Asset"
  }
  ```

### 更新资产
- **URL**: `/api/assets/:id`
- **方法**: `PUT`
- **请求体**:
  ```json
  {
    "name": "string",
    "hostname": "string",
    "type": "string",
    "status": "string",
    "ipAddress": "string",
    "description": "string",
    "location": "string",
    "ownerId": "number"
  }
  ```
- **响应**:
  ```json
  {
    "message": "Asset updated successfully",
    "asset": "Asset"
  }
  ```

### 删除资产
- **URL**: `/api/assets/:id`
- **方法**: `DELETE`
- **响应**:
  ```json
  {
    "message": "Asset deleted successfully"
  }
  ```

## 监控系统

### 获取服务器指标
- **URL**: `/api/monitoring/server-metrics`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "metrics": "[ServerMetric]"
  }
  ```

### 获取网络指标
- **URL**: `/api/monitoring/network-metrics`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "metrics": "[NetworkMetric]"
  }
  ```

### 获取告警
- **URL**: `/api/monitoring/alerts`
- **方法**: `GET`
- **查询参数**:
  - `resolved`: 是否已解决 (true/false)
  - `severity`: 告警级别 (info, warning, critical)
- **响应**:
  ```json
  {
    "alerts": "[Alert]"
  }
  ```

### 创建告警
- **URL**: `/api/monitoring/alerts`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "title": "string",
    "description": "string",
    "severity": "string",
    "serverId": "number"
  }
  ```
- **响应**:
  ```json
  {
    "message": "Alert created successfully",
    "alert": "Alert"
  }
  ```

### 获取系统健康状态
- **URL**: `/api/monitoring/health`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "overallStatus": "string",
    "checks": {
      "database": "string",
      "redis": "string",
      "api": "string",
      "storage": "string"
    },
    "timestamp": "Date",
    "uptime": "number"
  }
  ```

## 自动化运维

### 获取所有任务
- **URL**: `/api/automation`
- **方法**: `GET`
- **查询参数**:
  - `status`: 任务状态 (active, inactive)
- **响应**:
  ```json
  {
    "tasks": "[Task]"
  }
  ```

### 获取定时任务
- **URL**: `/api/automation/scheduled`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "tasks": "[Task]"
  }
  ```

### 获取单个任务
- **URL**: `/api/automation/:id`
- **方法**: `GET`
- **响应**:
  ```json
  {
    "task": "Task"
  }
  ```

### 创建任务
- **URL**: `/api/automation`
- **方法**: `POST`
- **请求体**:
  ```json
  {
    "name": "string",
    "description": "string",
    "schedule": "string",
    "status": "string"
  }
  ```
- **响应**:
  ```json
  {
    "message": "Task created successfully",
    "task": "Task"
  }
  ```

### 更新任务
- **URL**: `/api/automation/:id`
- **方法**: `PUT`
- **请求体**:
  ```json
  {
    "name": "string",
    "description": "string",
    "schedule": "string",
    "status": "string"
  }
  ```
- **响应**:
  ```json
  {
    "message": "Task updated successfully",
    "task": "Task"
  }
  ```

### 删除任务
- **URL**: `/api/automation/:id`
- **方法**: `DELETE`
- **响应**:
  ```json
  {
    "message": "Task deleted successfully"
  }
  ```

### 立即执行任务
- **URL**: `/api/automation/:id/run`
- **方法**: `POST`
- **响应**:
  ```json
  {
    "message": "Task executed successfully",
    "task": "Task"
  }
  ```

## 数据模型

### Asset
- `id`: number
- `name`: string
- `hostname`: string
- `type`: enum ('server', 'workstation', 'laptop', 'switch', 'router', 'firewall', 'printer', 'other')
- `status`: enum ('active', 'inactive', 'maintenance', 'retired')
- `ipAddress`: string
- `description`: string
- `location`: string
- `ownerId`: number
- `specifications`: object
- `createdAt`: Date
- `updatedAt`: Date

### ServerMetric
- `id`: number
- `serverName`: string
- `cpuUsage`: number
- `memoryUsage`: number
- `diskUsage`: number
- `networkIn`: number
- `networkOut`: number
- `status`: string
- `lastUpdated`: Date

### Alert
- `id`: number
- `title`: string
- `description`: string
- `severity`: string
- `serverId`: number
- `timestamp`: Date
- `resolved`: boolean

### Task
- `id`: number
- `name`: string
- `description`: string
- `schedule`: string
- `status`: string
- `lastRun`: Date
- `nextRun`: Date
- `createdAt`: Date
- `updatedAt`: Date