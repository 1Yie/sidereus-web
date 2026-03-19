# ResuMind Web

ResuMind Web 是一个用于招聘初筛的简历分析前端。用户上传 PDF 简历并输入岗位描述后，页面会调用后端分析接口，返回候选人基础信息、技能标签、项目经验、岗位匹配分，以及优势、风险和面试建议。

当前仓库只包含前端应用。实际分析能力依赖外部后端服务，前端默认请求地址为 http://localhost:8000/api/v1，也可以通过环境变量覆盖。

## 功能概览

- 上传 PDF 简历并发起分析
- 输入岗位描述，生成岗位匹配结果
- 展示候选人基础信息、教育信息与技能标签
- 展示项目经验、优势分析、改进点和面试建议
- 当后端返回 cache_hit 时显示缓存命中状态
- 基于 React、Vite 和 Tailwind CSS 4 构建响应式界面

## 技术栈

- React 19
- TypeScript 5
- Vite 8
- Tailwind CSS 4
- Axios
- Lucide React
- React Compiler

## 本地开发

### 环境要求

- Node.js 20 及以上，或 Bun 1.1 及以上
- 可访问的简历分析后端接口

### 安装依赖

使用 Bun：

```bash
bun install
```

使用 npm：

```bash
npm install
```

### 启动开发环境

使用 Bun：

```bash
bun run dev
```

使用 npm：

```bash
npm run dev
```

默认开发地址：

```text
http://localhost:5173
```

### 生产构建

```bash
bun run build
```

或：

```bash
npm run build
```

### 本地预览

```bash
bun run preview
```

或：

```bash
npm run preview
```

## 环境变量

项目使用以下环境变量：

```bash
VITE_API_URL=http://localhost:8000/api/v1
```

说明：

- VITE_API_URL 是后端 API 基础地址
- 如果未提供该变量，前端会回退到 http://localhost:8000/api/v1
- 分析请求会发送到 {VITE_API_URL}/analyze

示例：

```bash
cp .env .env.local
```

然后按需修改其中的 VITE_API_URL。

## 后端接口约定

前端当前依赖如下接口：

### 发起分析

```http
POST /analyze
Content-Type: multipart/form-data
```

请求字段：

- file: PDF 简历文件
- jd: 岗位描述文本

期望响应结构：

```json
{
  "data": {
    "basic_info": {
      "name": "张三",
      "phone": "13800000000",
      "email": "zhangsan@example.com",
      "address": "杭州"
    },
    "career_summary": {
      "work_years": 5,
      "education": "本科",
      "expect_salary": "25k-35k"
    },
    "skills": ["Python", "FastAPI", "Redis"],
    "project_experience": [
      {
        "name": "智能推荐平台",
        "role": "后端工程师",
        "summary": "负责服务设计、缓存优化与部署。"
      }
    ],
    "match_score": 87,
    "analysis_report": {
      "advantages": ["项目经验完整"],
      "disadvantages": ["缺少多语言经验"],
      "suggestion": "建议重点追问系统设计与容量规划经验。"
    }
  },
  "cache_hit": true,
  "process_time": "0.42s"
}
```

## 项目结构

```text
src/
  App.tsx                     页面骨架与营销区块
  index.css                   Tailwind CSS 入口
  components/
    ResumeAnalyzer.tsx        上传、提交分析与结果展示
  types/
    index.ts                  分析结果类型定义
```

## 当前行为说明

- 未上传文件时，分析按钮不可用
- 提交分析时会清空上一轮结果并显示加载状态
- 接口调用失败时，页面会使用浏览器 alert 提示错误
- 当前前端只限制选择 PDF 文件，文件合法性校验仍应由后端负责

## 可用脚本

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

如果使用 Bun，只需将 npm run 替换为 bun run。

