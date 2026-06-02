# Design Notes — Claude Code Edition

このファイルは、Claude Code 版がどのような系統を参考にし、どこを抽出して、Codex 版とどう差別化したかを記録するためのもの。

## 1. 方向性（ひとことで）

Codex 版が**editorial portfolio**寄りなら、Claude Code 版は**観測ステーション・編集アーカイブ**寄り。
渋谷の終電後を「映像と注釈で記録する観察インターフェース」として組み、講評時に Presentation Mode へ切り替えるだけで成立するように作っている。

## 2. 参考にした系統と、抽出した観点

> 直接的な丸コピーはしない。系統としての参照のみ。

| 系統 | 抽出した観点 |
| --- | --- |
| 建築・写真集（El Croquis / Lars Müller / a+u） | 圧倒的な余白、章番号、章ごとの強いタイポ |
| Research Archive（CCA / Het Nieuwe Instituut / Drawing Matter） | 観察と図面と注釈の「3層構造」、メタデータの可視化 |
| 美術館展覧会サイト（Serpentine / Vitra Design Museum / 21_21 DESIGN SIGHT） | Hero の覚悟、章タイトルのスケール、Conclusion を写真ではなく言葉で締める |
| ジャーナル系（Real Review / Pin-up / Apollo Architectural） | 引用とキャプションのフォントコントラスト（sans + serif + mono） |
| ARCHIGRAM / Superstudio など60-70年代研究紙 | 「観測ステーション」風のフレーム枠、コーナーマーク、フィルム素材感 |
| 映像/ドキュメンタリーUI（Field Recordings系 / Pitchfork features） | ループ動画 hero、スクロール連動の時計表示、scanline 質感 |
| AKQA / Resn / Active Theory のヘッダー類 | 上部固定の Index（章番号 + 名前）、左上のステータスドット |

## 3. 具体的な抽出ポイント

- **黒背景 + 暖色アクセント（オレンジ #ff5b3a）**：夜の街灯と看板光の温度を取り込み、Codex 版より「夜の温度」を強めた
- **3種のフォントを役割で使い分け**：
  - `Inter` … 章タイトル・UI（情報密度）
  - `Noto Serif JP` … 観察文・本文（呼吸）
  - `JetBrains Mono` … メタデータ・章番号・時計（観測ログ感）
- **Hero に動画背景**：終電後の空気を最初の一画面で示す。動画が読めない環境では同じフレーミングの静止画にフォールバック
- **scanline + grain**：CRTモニタ／フィルム的なテクスチャを薄く重ねて、AI生成画像っぽさを消す
- **章番号 `01 / Concept` 形式**：研究レポートと展示の中間語り口
- **スクロール連動の時計（右上 00:30 → 05:00）**：「夜を読む」というテーマを UI で内蔵
- **Timeline は横スクロールのスナップカード**：時間軸を一気に俯瞰させる
- **Observation Map は SVG ベース**：本番素材が来るまで耐える抽象化。凡例（4色）は別パネルに完全分離
- **Field Notes は dense grid + variant**：7枚に1つ wide、5枚に1つ tall のリズムで紙面感を出す
- **Transformation は 6 カラムの「Object → Behavior → Prototype」帯**：研究→設計の翻訳を一行で読み切らせる
- **Prototype カードは spec sheet**：仕様（対象部材・行為・時間帯・場所・素材）を `<dl>` で列挙、左右に図面 slot
- **Presentation Mode で Field Notes / Filters / 細部 UI を非表示**：講評で読ませたい順序だけ残る

## 4. 避けたこと

- 写真をただ並べるグリッド（→ variant grid + メタデータで救う）
- アニメーションでごまかす表現（→ scanline / grain / pulse dot 程度の質感に絞る）
- 装飾アイコン・絵文字（→ SVG の矢印・コーナーマークのみ）
- AI 生成画像の使用（→ 抽象 SVG プレースホルダーで対応）
- 文字を詰めすぎる（→ 各章の lead を最大60ch、display-h は 17em max-width で留める）
- 大きすぎる JS フレームワーク（→ 純粋 JS、依存ゼロ）

## 4-b. Urban Parts Archive（v2 追加）

Codex 版の「分類された写真アーカイブ」性を取り込みつつ、Claude 版の世界観を壊さないように設計したセクション。

- 配置：**Field Notes（厳選観察）** → **Urban Parts Archive（標本箱）** → **Transformation（家具化）**
  - Field Notes は強い観察カードを 12〜18件
  - Archive は contact sheet 的に 47件を一覧（小タイル + ホバーでタイトル + 下部にカテゴリと家具化候補）
  - Transformation がその両者から抽出された設計の核
- 9カテゴリのチップ式フィルター（U-Fence / Pole / Sign / Equipment / Road Object / Street Trace / People Staying / Night Worker / Prototype Source）
- カテゴリ選択時、上部に **関連するプロトタイプ名**（例：U-Fence → U字柵ハックチェア）を表示
- 各 cell クリックで開くモーダルに **「この部材から考えられる家具化」** スロットを追加（アクセントカラーの帯）
- 黒背景 + grain + コーナーマーク 2 + 角の見出しは Claude 版の流儀のまま
- Presentation Mode では archive はデフォルト非表示。**A キー**で講評中に呼び出せる

manifest 構造：
- 既存 `data/photo_manifest.json`（Field Notes 用）はそのまま
- 新規 `data/archive_manifest.json` に Codex の分類情報＋ `related_prototype` を統合
- Codex 版 36 件 + Claude 版で追加した 15 件 + 4 件追加観察 = 47 件

Hero 動画は `site_content.json` の `hero.video` / `hero.poster` から指定する構造に変更（差し替え容易）。プライバシー考慮で `brightness 0.45 / blur 0.4px` まで暗くした。

## 5. Codex 版との差分（要点）

| 項目 | Codex 版 | Claude Code 版 |
| --- | --- | --- |
| Hero | 写真背景、テキスト中心 | 動画背景＋scanline、観察ステーション風メタ |
| ナビ | 上部リンクのみ | 章番号付き Index、scroll-spy で現在章を強調 |
| 時計 | なし | 右上にスクロール連動 00:30 → 05:00 |
| Concept | 3パネル（Day / Last Train / Night） | 同じ構造だが title をシリアル化し、コーナーに通し番号 |
| Timeline | 縦並び | 横スクロール snap、各カードに `T.01` ID |
| Map | 写真ベース + 凡例 | SVG 抽象マップ + 動くノード halo + 凡例 |
| Field Notes | 写真主体グリッド | 写真+動画統合、カテゴリフィルタ、variant grid |
| Transformation | パネル形式 | 6カラム row 帯（Object → Behavior → Prototype） |
| Prototype | カード | spec sheet 型、図面 slot 内蔵 |
| Drawings | サムネイル並び | wide/tall mixed grid + 観測ログ風プレースホルダー |
| Mode | Presentation toggle あり | 同上、加えて `P` キーで切替 |
| 質感 | クリーンな editorial | film grain + scanline + フレーム枠 |

## 5-b. batch 2026_new_upload_01 で強くなった点

- **「実際に作られたプロトタイプ椅子」の写真が 7 枚加わった**ことで、本サイトが概念モックではなく、現地で検証された研究であることが視覚的に裏付けられる
- Archive の `prototype` カテゴリが **5 → 12 件** に倍増。「都市部材 → 試作家具 → 観察」の往復が見える厚みになった
- Hero 候補が 3 枚生まれた（`prototype_hero_new_01.jpg / _02 / _03`）。いずれも：
  - 渋谷の主要交差点・中央街の夜景に小さな身体（プロトタイプに座る人）が定位された風景
  - 距離と影で個人特定性が低い
  - 文字（タイトル）が乗っても読める余白がある
- 現 Hero 動画（`video_ambience_01.mp4`）は**そのまま維持**。新 Hero 候補は `site_content.json > hero.candidates[]` にメモとして格納し、今後判断する
- 顔が明瞭な 28 枚は `assets/photos/review_needed/` に隔離し、`_review_needed.json` に保留理由を記録。サイト本体は参照しないため、誤って公開される心配がない
- 取り込みパイプラインを `_backup_2026_new_upload_01/_import_pipeline.py` と `_curate_selected.py` として残した。次回 batch_id だけ書き換えれば再利用できる

## 5-c. 次回 batch の差し替え候補

- 上記 28 枚の中から、顔をぼかす・トリミングする・本人の同意を取るなどして再判定したものを `selected/` へ昇格
- 1/20 模型の撮影 → `assets/prototypes/model_photo_01.jpg`
- A3 縮尺の Observation Map 本番 → `assets/maps/night_observation_map_01.jpg`
- Transformation Diagram 完成版 → `assets/drawings/transformation_diagram_01.jpg`
- Hero を `prototype_hero_new_02.jpg` ベースの動画 / 静止画に差し替えるか判断

## 6. 残された未確定事項

- 本番図面（Observation Map / 変換図 / ディテール / メインパース）はプレースホルダー
- 模型・原寸プロトタイプの写真はまだ撮影前 → `prototype_*.jpg` で代用中
- Hero 動画は仮として `video_ambience_01.mp4` を採用。最終的には「109前の動画」を再撮影して差し替える想定
- 動画ポスター画像は ffmpeg 未導入のため空。後で生成して `assets/videos/posters/` に置く

差し替え方法は [README.md](./README.md) 参照。
