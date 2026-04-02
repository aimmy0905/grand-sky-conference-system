# 格兰云天会议管理系统原型 Workspace

当前项目已经拆成 4 个真正独立的前端子项目，使用 `pnpm workspace` 统一管理。

## 子项目目录

```text
apps
├── attendee    # 参会人员端
├── verifier    # 核销人员端
├── sales       # 会务销售端
└── admin       # Web 管理后台

packages
└── shared      # 共用的原型数据、渲染组件与品牌样式
```

## 安装依赖

在工作区根目录执行：

```bash
pnpm install
```

## 启动方式

在根目录可直接启动对应子项目：

```bash
pnpm dev:attendee
pnpm dev:verifier
pnpm dev:sales
pnpm dev:admin
```

默认端口：

- `attendee`: `5173`
- `verifier`: `5174`
- `sales`: `5175`
- `admin`: `5176`

也可以进入具体子项目单独运行：

```bash
cd apps/attendee
pnpm dev
```

## 构建与检查

根目录统一执行：

```bash
pnpm typecheck
pnpm build
```

这两个命令会并行校验并构建 `apps/*` 下的四个独立应用。

## 共享层说明

`packages/shared` 当前承载以下共用内容：

- `src/data/prototype.ts`
  四个端的页面清单、文案、流程说明和原型结构数据
- `src/components`
  移动端预览、后台预览、系统工作台等共用渲染组件
- `src/styles`
  品牌色、阴影、间距和全局样式

## 后续建议

- 如果下一步要做高保真，可以继续在 `packages/shared` 中抽象设计令牌和基础组件。
- 如果下一步要接接口，可以在每个 `apps/*` 中各自增加 API 层和状态管理，而不影响其它端。
- 若后续希望完全物理隔离，也可以再从当前 workspace 结构继续拆成 4 个独立仓库。
