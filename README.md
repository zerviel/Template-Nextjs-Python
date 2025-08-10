# Next.js/Python template

## 基本構成

```bash
  frontend: Next.js(ver.= 14.2.5)
  backend: Python/FastAPI(ver.= 3.12)
  db: postgresql
```

## 環境設定

以下のコマンドを実行していく：

```bash
  git clone https://github.com/zerviel/nextjs-python-template.git
  cd nextjs-python-template
  mkdir .env
  vi .env
```

`.env` に以下を記述する：

```bash
POSTGRES_USER=${your_postgres_user}
POSTGRES_PASSWORD=${your_postgres_password}
POSTGRES_DB=${your_postgres_db}
```

その他、`docker-compose.yml` のコンテナ名とポート番号など必要に応じて変更する。

