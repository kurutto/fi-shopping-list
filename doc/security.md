# 🛡️ Security Guidelines for This Next.js Project

このドキュメントは、Next.js アプリケーション全体におけるセキュリティ設計方針をまとめたものです。  
当プロジェクトは **NextAuth** を中心に、**CSRF / XSS / セキュリティヘッダー / CSP** の対策を標準的かつ保守的に実装しています。

---

## 1. 認証と CSRF 対策（NextAuth）

### 方針

- 認証は **NextAuth.js** を使用。
- クライアント・サーバーが **同一オリジンで動作** しているため、  
  **NextAuth 内部の CSRF トークン自動検証機能**により CSRF 攻撃を防止。

### NextAuth の CSRF 保護の仕組み

- サインイン / サインアウト / セッション更新時に CSRF トークンを自動生成・検証。
- トークンは短期間で更新され、HTTP-only Cookie に保存されるため安全。
- 別オリジンからのリクエストは CSRF トークン検証で自動的に拒否されます。

### middleware が不要な理由

- NextAuth が CSRF・セッション管理を全て行うため、  
  **独自 CSRF チェックや middleware による Origin/Referer 検証は不要**。
- 認証が必要な API ルートでは `getServerSession()` / `getToken()` を使うだけで十分。

---

## 2. 入力バリデーション（React Hook Form + Zod）

### 方針

- クライアント側：React Hook Form + zodResolver
- サーバー側：同じ Zod スキーマで再検証

### メリット

- フロントで UX を向上させつつ、改ざんされたリクエストはサーバー側で確実に拒否。
- Zod によるスキーマ検証は XSS やインジェクションに繋がる入力を遮断。

---

## 3. HTTP セキュリティヘッダー（`next.config.ts`）

### 方針

Next.js の `headers()` 機能を使用し、全ルートへセキュリティ関連ヘッダーを付与しています。

### 主なヘッダーと目的

| ヘッダー名                                           | 説明                                                     |
| ---------------------------------------------------- | -------------------------------------------------------- |
| **X-Frame-Options: DENY**                            | クリックジャッキング防止（外部 iframe 埋め込み禁止）     |
| **X-Content-Type-Options: nosniff**                  | MIME タイプ偽装を防止                                    |
| **Referrer-Policy: strict-origin-when-cross-origin** | 不必要なリファラ送信を制限                               |
| **Permissions-Policy**                               | カメラ・マイク・位置情報などへのアクセスを無効化         |
| **Strict-Transport-Security**                        | HTTPS を強制（HSTS）                                     |
| **Content-Security-Policy (CSP)**                    | リソース読み込み元の制御による XSS・インジェクション対策 |

---

## 4. Content-Security-Policy（CSP）

### 現在の設定内容

```ts
default-src 'self';
    script-src 'self' ${
      process.env.NODE_ENV === "development" ? "'unsafe-eval' 'unsafe-inline'" : ""
    }  https://accounts.google.com https://apis.google.com https://oauth2.googleapis.com https://www.googleapis.com;
    style-src 'self' 'unsafe-inline';
    font-src 'self';
    img-src 'self' blob: data:;
    object-src 'none';
    connect-src 'self';
    base-uri 'self';
    frame-ancestors 'none';
```

### 各ディレクティブの意味

| ディレクティブ                                                                                                                   | 許可範囲                               | 説明                                                    |
| -------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------- | ------------------------------------------------------- |
| `default-src 'self'`                                                                                                             | 同一オリジンのみ                       | 基本的なリソース読み込み                                |
| `script-src 'self' https://accounts.google.com https://apis.google.com https://oauth2.googleapis.com https://www.googleapis.com` | 自オリジン + Google OAuth 関連ドメイン | Google ログインに必要なスクリプトのみ許可。             |
| `style-src 'self' 'unsafe-inline'`                                                                                               | 同一オリジン＋インライン               | Tailwind 等に対応                                       |
| `img-src 'self' data:`                                                                                                           | 自サイト＋ base64                      | 安全な画像限定                                          |
| `object-src 'none'`                                                                                                              | すべて禁止                             | Flash などの旧式オブジェクトを完全排除                  |
| `connect-src 'self'`                                                                                                             | 同一オリジンのみ                       | 外部 API 通信は不可（※OpenAI はサーバー経由のため不要） |
| `base-uri 'self'`                                                                                                                | 自オリジンのみ                         | <base> タグの悪用によるリンク改ざんを防止               |
| `frame-ancestors 'none'`                                                                                                         | iframe 不可                            | クリックジャッキング防止                                |

### 備考（重要）

- OpenAI SDK は **サーバーサイドでのみ使用** しているため、  
  `connect-src https://api.openai.com;` は **不要**。

---

## 5. まとめ

| 項目                 | 実装状況                   | 説明                  |
| -------------------- | -------------------------- | --------------------- |
| 認証・CSRF           | ✅ NextAuth による自動処理 | middleware 不要       |
| 入力検証             | ✅ RHF + Zod               | 改ざんリクエスト防止  |
| XSS 対策             | ✅ CSP + `nosniff` + Zod   | スクリプト注入防止    |
| クリックジャッキング | ✅ `X-Frame-Options: DENY` | iframe 埋め込み禁止   |
| HTTPS 強制           | ✅ HSTS                    | セキュア通信を固定    |
| 外部通信制御         | ✅ `connect-src 'self'`    | OpenAI はサーバー経由 |
