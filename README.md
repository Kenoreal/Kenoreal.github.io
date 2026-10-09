# 《青年政治论坛》Youth Political Review — 官方网站

一份由青年学人主笔的全球事务评论期刊网站，设计参考《牛津政治评论》（Oxford Political Review）的杂志式布局，以中文为主、中英双语标识。

## 页面结构

```
├── index.html                  首页（头条 + 次推荐 + 四大板块 + 最新一期 + 投稿召唤）
├── section-politics.html       全球政治（板块色：蓝）
├── section-economy.html        全球经济（板块色：绿）
├── section-civilization.html   全球文明（板块色：赭）
├── section-governance.html     全球治理（板块色：紫）
├── about.html                  关于我们（使命 / 数据 / 内容线 / 编辑团队 / 联系）
├── submit.html                 投稿指南（范围 / 体例 / 流程 / FAQ）
├── articles/                   18 篇示例文章页（含卷首语、青年圆桌与四大板块文章）
├── assets/
│   ├── css/style.css           全站样式（设计令牌、封面系统、响应式）
│   └── js/main.js              共享脚本：导航页脚注入、移动菜单、阅读进度条
└── favicon.svg                 网站图标（绯红印章「青」）
```

## 本地预览

- 最简单：双击 `index.html` 直接在浏览器打开（全站零依赖，离线可用）。
- 推荐：用任意静态服务器预览，例如 VS Code 的 Live Server 插件，或
  `python -m http.server 8000` / `npx serve`（如有安装）。

## 如何维护内容

### 改导航 / 页脚 / 期刊信息
导航与页脚由 `assets/js/main.js` 统一注入全站，改一处即全站生效：
- 导航条目：脚本顶部 `NAV` 数组；
- 顶栏「2026年秋季刊 · 总第1期」字样：脚本中 `headerHtml`；
- 页脚简介与链接：脚本中 `footerHtml`。

### 新增一篇文章
1. 复制 `articles/` 下任意一篇 HTML（长文可复制 `global-south-order.html`，中篇复制 `dollar-system.html`）；
2. 修改标题、摘要（`<meta>` 与 `deck`）、作者、日期、正文与「相关阅读」链接；
3. 封面是纯 CSS 生成：改 `.cover` 上的 `data-char`（板块汉字：政/经/文/治）、`p-*` 图案类
   （p-diag/p-grid/p-dots/p-rings/p-rays/p-cross）与内联渐变色 `--ca/--cb` 即可；
4. 在对应 `section-*.html` 的列表和 `index.html` 对应板块卡片中加入新文章入口。

### 替换示例内容
所有文章、作者、团队成员与邮箱均为**示例占位**（文中已标注），上线前请逐一替换：
- 投稿/联系邮箱为编辑部邮箱 `sduasgg2025920@163.com`（如需更换，见 `about.html`、`submit.html` 与 `assets/js/main.js` 页脚）；
- 编辑团队名单在 `about.html`；
- 页脚底部「演示模板」提示语在 `assets/js/main.js`。

## 修改设计

全站颜色、字体、间距集中在 `assets/css/style.css` 顶部的 `:root` 设计令牌：
- 主色 `--navy`（牛津蓝）、点缀色 `--crimson`（学术绯红）；
- 四大板块色 `--sec-politics / --sec-economy / --sec-civilization / --sec-governance` 及对应浅色 tint；
- 字体优先使用思源宋体/思源黑体（若本机安装），否则回退到系统宋体/微软雅黑；
  联网环境会异步加载 Google Fonts（Noto Serif SC / Noto Sans SC），不阻塞页面。

## 部署

纯静态站点，任何静态托管均可直接部署：GitHub Pages、Vercel、Netlify、Cloudflare Pages，
或国内对象存储 + CDN。上传整个目录即可，无需构建步骤。
（面向国内公众提供服务前，请按平台要求完成 ICP 备案并在页脚补充备案号。）
