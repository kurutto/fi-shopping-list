# ER 図

## Fridge Inventory APP データベース

```mermaid
---
title: "常備品管理ができる買い物リストアプリ"
---
erDiagram

    users ||--|{ accounts : ""
    users ||--|{ credentials : ""
    users ||--|{ user_fridge : ""
    users ||--o{ shopping_lists : ""
    fridges ||--|{ user_fridge : ""
    inventories ||--o{ purchases : ""
    users ||--|{ purchases : ""
    fridges ||--o{ purchases : ""
    fridges ||--o{ inventories : ""
    fridges ||--o{ shopping_lists : ""

    accounts {
        string id PK "ID"
        string user_id FK "ユーザーID:users.id"
        string type "タイプ"
        string provider "プロバイダー"
        string provider_account_id "プロバイダーアカウントID"
        string refresh_token "リフレッシュトークン（null許容）"
        string access_token "アクセストークン（null許容）"
        datetime expires_at "有効期限（null許容）"
        string token_type "アクセストークンの種類（null許容）"
        string scope "スコープ（null許容）"
        string id_token "ID トークン（null許容）"
        string session_state "セッションの状態（null許容）"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    users {
        string id PK "ID"
        string name "名前（null許容）"
        string email "メールアドレス（null許容）"
        datetime email_verified "認証日時（null許容）"
        string image "イメージ画像（null許容）"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    credentials{
        string id PK "ID"
        string user_id FK "ユーザーID:users.id"
        string hashed_password "ハッシュ化パスワード"
        datetime email_verified "認証日時"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    user_fridge{
        string user_id FK "ユーザーID:users.id"
        string fridge_id FK "冷蔵庫ID:fridges.id"
    }
    fridges {
        string id PK "ID"
        string name "名前"
        string description "説明（null許容）"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    inventories {
        string id PK "ID"
        string fridge_id FK "冷蔵庫ID:fridges.id"
        string name "品名"
        string kana "カナ"
        int remaining "残数"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    purchases {
        string id PK "ID"
        string user_id FK "ユーザーID:users.id"
        string fridge_id FK "冷蔵庫ID:fridges.id"
        string inventory_id FK "在庫ID:inventories.id（null許容）"
        string name "商品名"
        int category "カテゴリー（null許容）"
        datetime purchase_date "購入日"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
    shopping_lists {
        string id PK "ID"
        string fridge_id FK "冷蔵庫ID:fridges.id"
        string user_id FK "ユーザーID:users.id"
        string name "品名"
        int amount "数量"
        datetime due_date "期限日（null許容）"
        datetime created_at "作成日時"
        datetime updated_at "更新日時"
    }
```
