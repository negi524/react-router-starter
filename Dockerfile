FROM node:25-slim AS base
RUN apt-get update -y && \ 
  apt-get install -y openssl && \
  apt-get install -y wget

# pnpmの設定
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN wget -qO- https://get.pnpm.io/install.sh | ENV="$HOME/.shrc" SHELL="$(which sh)" sh -

# ビルド用イメージ
FROM base AS builder

WORKDIR /app

COPY . .

RUN pnpm i --frozen-lockfile && \
  pnpm run build

# 実行用イメージ
FROM base

WORKDIR /app

# ビルドの成果物をコピー
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/build ./build
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

ENTRYPOINT [ "pnpm", "run", "start" ]
