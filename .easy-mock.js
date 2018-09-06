module.exports = {
  output: "api",
  template: "axios",
  projects: [
    {
      id: "5a34e96cb3739f4feec6e961",
      name: "user", // 生成到 api/user 目录下。
      black: [
        "/sds" // 排除 query 接口
      ]
    }
  ]
};