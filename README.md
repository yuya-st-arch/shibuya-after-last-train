# SHIBUYA AFTER LAST TRAIN — Claude Code Edition

終電後の渋谷を観察し、都市部材を擬態的家具プロトタイプへ変換する建築設計研究の展示用Webサイト。
Claude Code 版（編集性・映像性・展示性に振った別案）。Codex 版とは別フォルダで管理する。

## 1. 起動方法

純粋な静的サイト（HTML / CSS / JS / JSON）。サーバ無しで `index.html` を直接開くこともできるが、`file://` 直開きではブラウザの制約により `fetch()` で `data/*.json` を読めない場合がある。

その場合、`script.js` 内の最小 fallback データだけで表示されるため、Field Notes / Archive の件数は本来より少なくなる。制作確認・発表確認・GitHub Pages公開前確認は、必ず **ローカルサーバ経由** で行う。

```powershell
# Python 3
cd C:\Users\yuyag\projects\shibuya_after_last_train_web_claude
python -m http.server 5176
# → http://localhost:5176/
```

```powershell
# Node.js
npx serve .
```

JSON が fetch できなくても、`script.js` 内の FALLBACK データで表示は崩れない。ただしこれは非常用表示であり、実際の47件のField Notes、54件のArchive、8本の動画確認には `http://localhost:5176/` または GitHub Pages URL を使う。

確認時の目安：

- `http://localhost:5176/` では `data/photo_manifest.json`, `data/archive_manifest.json`, `data/site_content.json`, `data/video_manifest.json` がfetchされる。
- Field Notesは All / Featured で約40件、Prototype / Archive で12件が表示される。
- Archiveは54件が表示される。
- `file://` 直開きで件数が少ない場合は異常ではなく、fetch制約によるfallback表示。

## 2. フォルダ構成

```
shibuya_after_last_train_web_claude/
├ index.html              … 1ページ構成のメインHTML
├ style.css               … デザインシステム（黒背景・エディトリアル）
├ script.js               … manifest 読込・フィルタ・モーダル・モード
├ README.md               … このファイル
├ design_notes.md         … 参考系統と抽出ポイント
├ assets/
│  ├ photos/
│  │  ├ raw/              … 元素材から複製した全写真（229枚）
│  │  ├ selected/         … 英数字名に整理した代表写真（62枚: Featured 40 + Archive用追加 15 + 2026_new_upload_01 新規 7）
│  │  └ review_needed/    … 人による確認が必要な写真（プライバシー / 重複疑い）
│  ├ videos/
│  │  ├ raw/              … 元素材から複製した全動画（22本）
│  │  ├ selected/         … 英数字名に整理した代表動画（8本）
│  │  ├ posters/          … 動画ポスター画像置き場（ffmpeg未導入のため空）
│  │  └ review_needed/    … 人による確認が必要な動画
│  ├ maps/                … 観察マップ本番素材の差し替え先
│  ├ drawings/            … 図面・パース本番素材の差し替え先
│  ├ prototypes/          … プロトタイプ写真・模型写真の差し替え先
│  ├ ui/                  … アイコンなど予備
│  └ placeholders/        … 予備（プレースホルダー画像置き場）
└ data/
   ├ photo_manifest.json    … Field Notes 用 47件の観察・翻訳（うち 7件 = batch 2026_new_upload_01）
   ├ video_manifest.json    … 代表動画 8本の観察
   ├ archive_manifest.json  … Urban Parts Archive 用 54件 + 9カテゴリ定義（うち 7件 = batch 2026_new_upload_01）
   ├ site_content.json      … サイト本文（Hero/Concept/Timeline 他、Hero動画パス・Hero候補含む）
   ├ prototypes.json        … プロトタイプ仕様（並行運用可）
   ├ import_log.json        … 全素材の取り込みログ（batch_id 付き）
   └ _review_needed.json    … 人による確認待ち素材のメモ（顔写りやプライバシー）
```

## 3. 素材の追加方法

### 3-1. 写真を追加する

1. 元写真は **絶対に上書き・移動しない**（元フォルダ：`G:\マイドライブ\00_Yuya_HUB\05_写真_資料\椅子渋谷写真`）
2. 全枚数を `assets/photos/raw/` に新規コピー
3. 採用したいものだけ英数字名にリネームして `assets/photos/selected/` にコピー
4. `data/photo_manifest.json` に 1 件追加：

```json
{
  "original_file": "IMG_9999.JPG",
  "copied_file": "assets/photos/selected/u_fence_05.jpg",
  "category": "u_fence",
  "title": "夜の柵に並ぶ缶",
  "observation": "終電後のU字柵脇に置かれた缶が、寄りかかりと荷物置きが同時に発生する痕跡を示す。",
  "design_translation": "U字柵に小さな缶置きと荷物置き面を組み合わせ、痕跡を寸法化する。",
  "suggested_section": "Field Notes",
  "priority": 2
}
```

`priority` は `1=Hero/Featured`, `2=Featured`, `3=Archive` 程度の目安。

### 3-2. 動画を追加する

1. `assets/videos/raw/` にコピー → 採用分は `assets/videos/selected/` に英数字名でコピー
2. `data/video_manifest.json` に 1 件追加。`poster_file` は `assets/photos/selected/` の中から代表写真を指定する
3. ffmpeg が手元にあれば `ffmpeg -ss 1 -i input.mp4 -vframes 1 -q:v 2 assets/videos/posters/xxx.jpg` でポスターを生成し、`poster_file` をそちらに変更する

### 3-3. 図面・マップ・模型写真を差し替える

`data/site_content.json` の `drawings[]` で参照しているパスにファイルを置けば自動で読まれる：

| ファイル | 差し替え先 |
| --- | --- |
| `assets/maps/night_observation_map_01.jpg` | Observation Map本番 |
| `assets/drawings/transformation_diagram_01.jpg` | 変換図 |
| `assets/drawings/detail_u_fence_01.jpg` | U字柵ディテール |
| `assets/drawings/detail_pole_table_01.jpg` | ポール天板ディテール |
| `assets/drawings/main_perspective_01.jpg` | メインパース |
| `assets/prototypes/prototype_photo_01.jpg` | 原寸プロトタイプ写真 |
| `assets/prototypes/model_photo_01.jpg` | 模型写真 |

画像が無いときは Drawing セクション内で「PLACEHOLDER」枠を表示する。画像があるとプレースホルダーは自動で消える。

## 4. Urban Parts Archive

「家具化される前の都市部材たち」を集めた標本箱セクション。Field Notes（厳選観察）と Transformation（家具化の核）の間に挟まる contact sheet。

- 9カテゴリ（U-Fence / Pole・Bollard / Sign・Advertisement / Equipment Box / Road Object / Street Trace / People Staying / Night Worker / Prototype Source）でフィルタ
- カテゴリ選択時に関連する Furniture Prototype 名を上部に表示
- 各 cell クリックで観察文・翻訳・家具化候補をモーダル表示
- 写真の追加は `data/archive_manifest.json` の `items[]` に1件 push するだけ

写真追加例：
```json
{
  "original_file": "IMG_9999.JPG",
  "copied_file": "assets/photos/selected/archive_pole_06.jpg",
  "archive_category": "pole",
  "title": "夜の反射ポール",
  "observation": "...",
  "design_translation": "...",
  "related_prototype": "ポール差し込みテーブル"
}
```

## 5. Presentation Mode

右上の「Presentation」ボタン、または body にフォーカスを置いた状態で **P キー** でトグルする。
Field Notes と Urban Parts Archive、細かいUIが消え、Hero / Concept / Timeline / Map / Transformation / Prototypes / Drawings / Conclusion だけが残る講評モード。

- **A キー**：Presentation Mode 中だけ、Urban Parts Archive を一時的に再表示／非表示。素材庫を講評中に見せたい時に使用。

## 6. 公開方法（GitHub Pages / Netlify）

### GitHub Pages
```powershell
cd C:\Users\yuyag\projects\shibuya_after_last_train_web_claude
git init
git add .
git commit -m "Initial: Claude Code edition"
git branch -M main
# public repository: https://github.com/yuya-st-arch/shibuya-after-last-train
git remote add origin https://github.com/yuya-st-arch/shibuya-after-last-train.git
git push -u origin main
```
GitHub の Settings → Pages → Source = `main` / `/(root)` を選択。

公開URL:

```text
https://yuya-st-arch.github.io/shibuya-after-last-train/
```

### Netlify
- このフォルダごと drag & drop でアップロード
- ビルド設定不要（Build command: 空 / Publish directory: `.`）

どちらの場合も、`assets/` は **そのままコミット**して問題ない（個人プロジェクトかつ撮影者の権利範囲内であれば）。動画サイズが気になる場合は `assets/videos/selected/` 以下だけコミットして `raw/` は `.gitignore` するのも可。

## 7. 元素材フォルダの扱い（重要）

**`G:\マイドライブ\00_Yuya_HUB\05_写真_資料\椅子渋谷写真` は読み取り専用として扱う。**
このフォルダは Google Drive と同期している。リネーム・削除・移動を行うと同期側まで巻き戻すのが面倒になるので、常に copy のみ。
このプロジェクトフォルダ内で完結するように作業すること。

## 8. 素材の更新ワークフロー（batch import）

新しく撮影した写真・動画を取り込むときは、以下の手順を踏むと既存サイトを壊さずに更新できる。

### 8-1. バックアップ
作業前に主要ファイルをスナップショット：
```powershell
cd C:\Users\yuyag\projects\shibuya_after_last_train_web_claude
$bk = "_backup_<batch_id>"
New-Item -ItemType Directory $bk
Copy-Item -Recurse data $bk
Copy-Item index.html, style.css, script.js, README.md, design_notes.md $bk
```

### 8-2. import_log.json による差分判定
`data/import_log.json` には全ての取り込み済み素材が `batch_id` 付きで記録されている。
新しいバッチで取り込むときは、以下の判定マトリクスで分類する：

| 判定 | 条件 | 処置 | log の status |
| --- | --- | --- | --- |
| 新規 | 元素材にあって import_log に無い、name+size 一致なし | `assets/photos\|videos/raw/` にコピー | `raw_copied` |
| 重複 | name+size が既存 raw と完全一致 | スキップ | `duplicate_skipped` |
| メタデータ | ファイル名が `._*` で始まる、4096B固定 等 | スキップ | `ignored` |
| 明示的コピー | ファイル名に「 - コピー」が含まれる | スキップ | `duplicate_skipped` |
| 曖昧 | 同名で size が違う、EXIF不明、HEIC変換疑い 等 | `review_needed/` へコピー + `_review_needed.json` に記録 | `review_needed` |

判定スクリプトの実装例：`_backup_<batch_id>/_import_pipeline.py` を参照。

### 8-3. selected/ への昇格は保守的に
新規 raw 素材から `selected/` に昇格させるときは：

- **顔が大きく映る写真は必ず `review_needed/` に置く**（プライバシー）
- 友人や被写体の同意確認が取れたものだけ `selected/` へ
- 同意確認の状況は `_review_needed.json` の `suggested_action` に記録
- 動画はサイズ・長さも判断材料に（重すぎる動画はそのまま Hero に使わない）

### 8-4. manifest 更新
- `data/photo_manifest.json` … Featured Field Notes に出すなら priority 1-2、Archive のみなら priority 3
- `data/archive_manifest.json` … 9 カテゴリのいずれかに `archive_category` で振り分け
- `data/site_content.json` … `hero.video` を差し替えるなら検証してから。差し替えないなら `hero.candidates[]` に候補メモを残すだけ
- 各エントリに `added_batch: "<batch_id>"` を付ける

### 8-5. _review_needed.json の意味
`assets/.../review_needed/` に置かれた素材の一覧。各エントリに：
- `suspected_reason` （なぜ自動採用しなかったか）
- `possible_duplicate`（既存と重複の可能性）
- `suggested_action`（人がやるべき確認内容）

を記録。**サイト本体（HTML/JS）はこのファイルを参照しない**ので、ここに置いた素材が勝手に Web 表示されることはない。

## 9. 公開前のプライバシーチェック

公開前に以下を確認すること：

- [ ] selected の写真に **大きく映る顔** がないか
- [ ] **個人名・電話番号・住所・ナンバープレート** が読めるサイズで映っていないか
- [ ] 動画は **muted で autoplay** されることを確認（実装済み）
- [ ] **不要な音声** が再生されないこと
- [ ] EXIF の **位置情報** が selected/ の画像に残っていないか（公開用に書き出し直しを推奨）
- [ ] 友人や被写体の **公開許可** が取れているか
- [ ] Hero に他人を使う場合は **その旨を README** に追記する

> 現在の selected 素材は、顔が **距離・影・モーションブラー** のいずれかで識別困難なものに限定している。
> 顔が明瞭な 28 枚は `review_needed/` に隔離済み。Web には出ない。

## 10. Codex 版との関係

参考：`C:\Users\yuyag\projects\shibuya_after_last_train_web`（Codex 版・上書き禁止）。
Claude Code 版は別解釈・別UI。両方を残して比較できる構成にしている。

詳細は [`design_notes.md`](./design_notes.md) を参照。
