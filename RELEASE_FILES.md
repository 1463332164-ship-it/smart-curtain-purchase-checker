# 拟公开目录与批准边界

推荐仓库名：`smart-curtain-purchase-checker`。本候选目录作为仓库根目录；网页放在`docs/`。无需构建、后端或付费API。

## 发布结构

```
.gitignore
LICENSE
DATA_USE.md
README.md
RELEASE_FILES.md
RELEASE_MANIFEST.json
docs/             # 入口index.html、configuration.html、about.html、本地JS/CSS和真实截图
tests/            # 规则与UI适配器测试
portfolio/        # 中英文简介、功能、一页案例、五分钟脚本
verification/     # 测试、来源、浏览器实际记录、局限及面试说明
```

精确逐文件清单与SHA-256见[manifest](RELEASE_MANIFEST.json)，manifest自身不自哈希。只公开该候选目录，不把整个GTM工作区加入仓库。

## 必须排除

- 原始工作区dist中的旧研究面板、sample-data及24条模拟反馈数据；旧面板不属于当前成品。
- data下原始/待核数据包、全部research目录、同意记录、联系方式、会话记录（包括空白模板）。
- 工作区历史备份、内部日志、原简历、绝对本地路径、.env/API密钥、账号凭证。
- release/p2-rc1以及父工作区其他内容、P1项目、node_modules、个人工具配置。
- 厂商图片、页面全文、手册、评论原文及没有授权的用户资料。当前截图仅展示本工具。

## 公开前与公开后

1. 所有者审核候选说明与贡献边界；批准拟公开目录、拟用MIT范围、公开仓库和Pages。
2. **批准后**才创建该公开仓库，将候选根目录文件推送到选定分支。此文档不是发布授权。
3. 仓库Settings → Pages → Deploy from a branch → 选发布分支 → `/docs` → Save。
4. 等待部署完成，再核对实际站点URL及三个任务、导航和资源加载。此阶段尚未执行。
5. 当前页面标注“未发布”，上线前应改为准确发布状态，并更新README中的真实地址；禁止预填不存在的链接。

GitHub Pages允许分支的根目录或docs作为发布来源；这里选docs以分开网页和说明。参考[官方设置文档](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)。GitHub在线服务条款及可用性由其平台决定。

## 2026-10-24授权与执行

所有者已批准清单内32个文件公开发布、上述MIT边界及main/docs的Pages方案。代码仓库：https://github.com/1463332164-ship-it/smart-curtain-purchase-checker 。部署与线上验收结果见verification/ACCEPTANCE.md；此处保留发布前检查步骤作为历史流程。
