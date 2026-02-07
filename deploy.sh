#!/bin/bash

# IT运维管理平台部署脚本

set -e  # 如果任何命令失败则退出

echo "🚀 开始部署 IT运维管理平台"

# 检查是否安装了Docker
if ! [ -x "$(command -v docker)" ]; then
  echo "❌ 错误: Docker 未安装" >&2
  exit 1
fi

# 检查是否安装了Docker Compose
if ! [ -x "$(command -v docker-compose)" ]; then
  echo "❌ 错误: Docker Compose 未安装" >&2
  exit 1
fi

echo "✅ Docker 和 Docker Compose 已安装"

# 构建并启动服务
echo "🏗️  正在构建和启动服务..."
cd docker
docker-compose up -d --build

echo "⏳ 等待服务启动..."
sleep 30

# 检查服务状态
echo "🔍 检查服务状态..."
docker-compose ps

echo "✅ IT运维管理平台部署完成!"
echo ""
echo "🌐 访问地址:"
echo "   前端: http://localhost:3000"
echo "   后端API: http://localhost:5000"
echo "   健康检查: http://localhost:5000/health"
echo ""
echo "📋 默认凭据:"
echo "   用户名: admin"
echo "   密码: admin123"
echo ""
echo "🔧 管理命令:"
echo "   查看日志: docker-compose logs -f"
echo "   停止服务: docker-compose down"
echo "   重启服务: docker-compose restart"