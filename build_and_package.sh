#!/bin/bash

# 定义变量
BUILD_DIR=".next"
OUTPUT_ZIP="nextjs_build_$(date +%Y-%m-%d_%H-%M-%S).zip"

# 进行构建
echo "Building Next.js project..."
npm run build

# 检查构建是否成功
if [ -d "$BUILD_DIR" ]; then
    # 打包构建目录和其他生产文件到 ZIP 文件中
    echo "Packaging files into ${OUTPUT_ZIP}..."

    # 添加你需要的任何其他文件或目录到 zip 命令中
    zip -r $OUTPUT_ZIP $BUILD_DIR package.json package-lock.json next.config.js public pages api server.js .env.local

    # 如果你确定需要上传 node_modules，取消下面这行的注释
    # zip -r $OUTPUT_ZIP node_modules

    echo "Package created: ${OUTPUT_ZIP}"
else
    echo "Build directory not found: ${BUILD_DIR}. Build failed or incorrect build directory."
    exit 1
fi


#PORT=3002 pm2 start npm --name "yeildwise" -- run start
