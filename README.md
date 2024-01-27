## 本地密码本应用

本地密码本应用，使用 Next.js + TypeScript + Tailwind + Prisma + MariaDB 开发。

应用由 Next Web、密钥、数据库，三部分组成。在保存关键信息时，通过【Crypto-JS + 密钥】对称加密，最终信息以加密后的形式保存到数据库中。读取时，通过【Crypto-JS + 密钥】对称解密，最终以明文形式展示。

Next Web 可以灵活的部署到任何支持 Node.js 的计算机中。密钥以文本形式保存在 U 盘中。

部署 Next Web 应用，并插入密钥即可使用。
