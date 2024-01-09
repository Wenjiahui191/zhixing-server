module.exports = {
  apps: [
    {
      name: "blog-server",
      script: "./bin/www",
      env: {
        NODE_ENV: "production",
      },
      watch: true,
      ignore_watch: [
        // 不用监听的文件
        "node_modules",
        "logs",
      ],
      instances: "1",
      error_file: "./logs/error.log", // 错误日志文件
      out_file: "./logs/out.log", // 正常日志文件
      merge_logs: true, // 设置追加日志而不是新建日志
      log_date_format: "YYYY-MM-DD HH:mm:ss", // 指定日志文件的时间格式
    },
  ],
};
