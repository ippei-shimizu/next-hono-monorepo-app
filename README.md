# next-hono-monorepo-app

## Setup

## Migration

```bash
$ cd apps/server
```

schema.tsに基づき、マイグレーションファイル生成

```bash
$ pnpm run db:generate
```

データベースに変更を適用

```bash
$ pnpm run db:migrate
```

データベース管理インターフェース

```bash
$ pnpm run db:studio
```
