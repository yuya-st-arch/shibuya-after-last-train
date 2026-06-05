/* =====================================================
   SHIBUYA AFTER LAST TRAIN — Claude Code Edition
   ===================================================== */

(function () {
  "use strict";

  /* ---------------- Fallback data ---------------- */
  const FALLBACK_CONTENT = {
    site: {
      title: "SHIBUYA AFTER LAST TRAIN",
      subtitle: "終電後の渋谷をリビング化する擬態的都市家具"
    },
    concept: {
      panels: [
        {
          label: "Day / 11:00",
          title: "広告・商業・観光のレイヤー",
          text: "昼の渋谷は広告塔、店舗ファサード、案内サインが視線と動線をコントロールし、購買と通過のための都市として動く。"
        },
        {
          label: "Last Train / 00:30",
          title: "鉄道による移動可能性の遮断",
          text: "終電後、駅と都市をつないでいた移動の連続が一度切れ、人は街路に投げ出される。"
        },
        {
          label: "Night / 02:00",
          title: "擬態と起動",
          text: "夜間の行為を観察し、昼は都市設備に擬態し、夜は身体を受け止める家具群として設計する。"
        }
      ]
    },
    timeline: [
      { time: "00:30", label: "終電後", text: "鉄道による移動可能性が一度切れ、駅前の人流が滞留に変わる。" },
      { time: "01:00", label: "路上滞留", text: "壁際、段差、車止め、U字柵に身体が分散して定着し始める。" },
      { time: "02:00", label: "クラブ帰り",  text: "通行が減り、酔いを冷ます、誰かを待つ、スマホを見るための一人の時間が街路を満たす。" },
      { time: "03:00", label: "清掃・搬入", text: "ナイトワーカーが設備箱、看板下、シャッター前を作業の足場として読み替える。" },
      { time: "04:00", label: "始発待ち", text: "駅周辺に小さな群れが点在し、座る・立つ・寄りかかるが入れ替わる。" },
      { time: "05:00", label: "都市が昼へ戻る", text: "広告と通行のレイヤーが再起動し、夜の痕跡は設備の表面に吸収されていく。" }
    ],
    map: {
      legend: [
        { key: "stay",   color: "var(--legend-stay)",  label: "人の滞留",         note: "始発待ち・路上滞留・休憩" },
        { key: "site",   color: "var(--legend-site)",  label: "家具設置候補",     note: "観察に基づくプロトタイプ配置地点" },
        { key: "used",   color: "var(--legend-used)",  label: "座られる都市部材", note: "U字柵・縁石・設備箱・看板脚部" },
        { key: "worker", color: "var(--legend-work)",  label: "夜間労働・搬入",   note: "清掃・搬入・警備の作業領域" }
      ]
    },
    transformation: [
      {
        id: "u_fence", object: "U字柵", object_role: "通行制御 / 自転車駐輪境界",
        behaviors: ["寄りかかる", "荷物を置く", "短い会話"],
        prototype: "U字柵ハックチェア / 差し込みテーブル",
        design_intent: "柵に差し込む座面と背当てを設計し、通行制御の部材を一時的な家具へ反転させる。"
      },
      {
        id: "pole", object: "車止めポール", object_role: "車両進入抑止 / 路面の垂直要素",
        behaviors: ["缶を置く", "立ち止まる", "スマホを見る"],
        prototype: "ポール差し込みテーブル",
        design_intent: "柱に被せる小さな天板を作り、立ったまま休む身体の支点を作る。"
      },
      {
        id: "sign", object: "看板 / サイン", object_role: "情報・広告・案内",
        behaviors: ["壁際に寄る", "視線を外す", "酔いを冷ます"],
        prototype: "寄りかかりサイン",
        design_intent: "広告面の背面に身体を逃がす厚みを与え、サインと家具を同じ部材に重ねる。"
      },
      {
        id: "equipment", object: "設備箱", object_role: "電源・配管・設備カバー",
        behaviors: ["道具を置く", "短く休む"],
        prototype: "ナイトワーカー腰掛け",
        design_intent: "設備箱に擬態した腰掛けを作り、清掃員・警備員・搬入スタッフの短時間滞在を支える。"
      },
      {
        id: "road_object", object: "道路上の小物・痕跡", object_role: "缶・ボトル・コーン・置き袋",
        behaviors: ["一時的に置く", "拾う", "残す"],
        prototype: "夜間公共性センサー家具",
        design_intent: "夜間に現れる痕跡を寸法化し、置く・拾う・残すを許容する薄い置き面として都市に重ねる。"
      }
    ],
    prototypes: [
      { number: "01", name: "寄りかかりサイン", target_object: "看板・広告面・案内サイン",
        behaviors: "酔いを冷ます / スマホを見る / 視線を外す / 短く寄りかかる",
        time: "23:30 – 04:00", location: "店舗ファサード前 / 路地入り口 / 駅前広場の外側",
        material: "鋼板 + 半透明アクリル + ステッカー下地",
        intent: "昼は看板や広告面に見える。夜は一人で酔いを冷ましたり、スマホを見たり、短く寄りかかるための面になる。",
        photo: "assets/photos/selected/prototype_01.jpg" },
      { number: "02", name: "始発待ちベンチ看板", target_object: "案内サイン / 広告下地",
        behaviors: "始発を待つ / 短く座る / 視線を駅へ向ける",
        time: "03:30 – 05:30", location: "駅周辺の歩道 / バス停近接 / 横断歩道脇",
        material: "アルミフレーム + 耐候木 + 反射シート",
        intent: "昼は案内サインや広告下地に見える。夜は短時間だけ座れる始発待ちの家具になる。",
        photo: "assets/photos/selected/prototype_03.jpg" },
      { number: "03", name: "ナイトワーカー腰掛け", target_object: "設備箱 / 看板下地",
        behaviors: "短く座る / 道具を置く / 待機する",
        time: "22:00 – 06:00", location: "店舗裏 / 設備脇 / 搬入動線の余白",
        material: "塗装鋼板 + 防滑天板 + 道具掛けフック",
        intent: "昼は設備箱や看板下地に見える。夜は清掃員、警備員、搬入スタッフが短く腰掛けたり道具を置いたりできる。",
        photo: "assets/photos/selected/night_worker_03.jpg" },
      { number: "04", name: "ポール差し込みテーブル", target_object: "車止め / 円柱ポール",
        behaviors: "缶やスマホを置く / 立ち止まる / 短く話す",
        time: "23:00 – 04:30", location: "歩道のポール群 / 自販機脇 / 路地交差点",
        material: "曲げ鋼板 + ゴム緩衝材 + 反射エッジ",
        intent: "道路にある円柱ポールや車止めに被せる小さな天板。缶、スマホ、荷物を置き、立ち止まりの行為を支える。",
        photo: "assets/photos/selected/pole_01.jpg" },
      { number: "05", name: "U字柵ハックチェア", target_object: "U字柵 / ガードレール",
        behaviors: "寄りかかる / 短く座る / 会話する / 荷物を置く",
        time: "00:00 – 05:00", location: "歩道のU字柵 / 駐輪境界 / 駅前広場の縁",
        material: "鋼パイプ + 耐候合板 + 結束金物",
        intent: "自転車や人の流れを制御するU字柵に、差し込み式の座面や寄りかかり面を加える。",
        photo: "assets/photos/selected/u_fence_01.jpg" }
    ],
    drawings: [
      { label: "Observation Map",        file: "assets/maps/night_observation_map_01.jpg",        note: "終電後の観察ルートと家具設置候補を重ねた地図", size: "wide" },
      { label: "Transformation Diagram", file: "assets/drawings/transformation_diagram_01.jpg", note: "都市部材 → 行為 → 家具プロトタイプの変換図" },
      { label: "Main Perspective",       file: "assets/drawings/main_perspective_01.jpg",       note: "夜の渋谷に家具群が起動するメインパース", size: "wide" },
      { label: "U-Fence Detail",         file: "assets/drawings/detail_u_fence_01.jpg",         note: "U字柵への差し込み座面ディテール" },
      { label: "Pole Table Detail",      file: "assets/drawings/detail_pole_table_01.jpg",      note: "ポール被せ天板のディテール" },
      { label: "Prototype Photo",        file: "assets/prototypes/prototype_photo_01.jpg",      note: "原寸プロトタイプの撮影写真", size: "tall" },
      { label: "Model Photo",            file: "assets/prototypes/model_photo_01.jpg",          note: "1/20スケール模型の撮影写真", size: "tall" }
    ],
    conclusion: {
      body: "終電後の渋谷に現れる一時的な公共性を浮かび上がらせる観測装置である。\n昼は都市設備に擬態し、夜は身体を受け止める。\nその切り替わりの中に、広告都市としての渋谷とは別の、もう一つの渋谷が立ち上がる。"
    }
  };

  const FALLBACK_ARCHIVE = {
    intro: "ここは、完成された家具ではなく、家具になる前の都市の断片を集めた標本箱である。",
    categories: [
      { key: "all",          label: "All",                  ja: "全て" },
      { key: "u_fence",      label: "U-Fence",              ja: "U字柵",         related_prototype: "U字柵ハックチェア" },
      { key: "pole",         label: "Pole / Bollard",       ja: "車止め・標識柱",  related_prototype: "ポール差し込みテーブル" },
      { key: "sign",         label: "Sign / Advertisement", ja: "看板・広告",     related_prototype: "寄りかかりサイン" },
      { key: "equipment",    label: "Equipment Box",        ja: "設備箱",         related_prototype: "ナイトワーカー腰掛け" },
      { key: "road_object",  label: "Road Object",          ja: "路上の小物",     related_prototype: "ポール差し込みテーブル / 夜間公共性センサー家具" },
      { key: "street_trace", label: "Street Trace",         ja: "路上の痕跡",     related_prototype: "夜間公共性センサー家具 / 始発待ちベンチ看板" },
      { key: "people_stay",  label: "People Staying",       ja: "滞留する身体",   related_prototype: "全プロトタイプ（行為の根拠）" },
      { key: "night_worker", label: "Night Worker",         ja: "夜間労働",       related_prototype: "ナイトワーカー腰掛け" },
      { key: "prototype",    label: "Prototype Source",     ja: "原型試行",       related_prototype: "始発待ちベンチ看板 / 寄りかかりサイン" }
    ],
    items: []
  };

  const FALLBACK_PHOTOS = [
    {
      original_file: "hero_01.jpg", copied_file: "assets/photos/selected/hero_01.jpg",
      category: "hero", title: "109前、ステージ化する広告塔",
      observation: "終電後の109前は、巨大な広告塔と仮設足場が無人の舞台装置のように立ち上がる。",
      design_translation: "広告都市の表層に擬態しつつ、夜だけ身体の起点として機能する家具を配置する。",
      priority: 1
    },
    {
      original_file: "prototype_hero_new_02.jpg", copied_file: "assets/photos/selected/prototype_hero_new_02.jpg",
      category: "prototype", title: "通り過ぎる車と静止する身体",
      observation: "車のヘッドライトが流れる交差点で、プロトタイプに座る身体だけが街路の中で静止しているように見える。",
      design_translation: "夜間の街路速度に対して、短時間だけ身体を止める小さな家具の有効性を示す。",
      priority: 1
    },
    {
      original_file: "prototype_hero_new_01.jpg", copied_file: "assets/photos/selected/prototype_hero_new_01.jpg",
      category: "prototype", title: "交差点の柱に背を預ける",
      observation: "ステッカーが貼り重ねられた柱の前に椅子を差し込むと、人通りの少ない夜の街路に小さな観測点が生まれる。",
      design_translation: "既存の垂直部材を背後の拠り所として読み替え、ポールや柱まわりの家具化へ接続する。",
      priority: 1
    },
    {
      original_file: "u_fence_01.jpg", copied_file: "assets/photos/selected/u_fence_01.jpg",
      category: "u_fence", title: "壁際に連続するU字柵",
      observation: "U字柵は本来、人や自転車の動きを制御する道路設備だが、夜間には寄りかかりや荷物置きの下地として読み替えられる。",
      design_translation: "U字柵に差し込む小さな天板や背当てを設計し、短時間の会話や始発待ちを支える都市家具へ変換する。",
      priority: 2
    }
  ];
  const FALLBACK_VIDEOS = [];

  /* ---------------- Helpers ---------------- */
  const $  = (sel, root) => (root || document).querySelector(sel);
  const $$ = (sel, root) => Array.from((root || document).querySelectorAll(sel));

  const CATEGORY_LABEL = {
    hero: "Hero",
    night_street: "Night Street",
    u_fence: "U-Fence",
    pole: "Pole",
    sign: "Sign",
    equipment: "Equipment",
    road_object: "Road Object",
    street_trace: "Street Trace",
    people_stay: "People Stay",
    night_worker: "Night Worker",
    prototype: "Prototype",
    map: "Map",
    drawing: "Drawing",
    video_ambience: "Video / Ambience",
    video_street: "Video / Street",
    video_movement: "Video / Movement"
  };

  function el(tag, props, children) {
    const node = document.createElement(tag);
    if (props) {
      Object.keys(props).forEach(k => {
        const v = props[k];
        if (k === "class") node.className = v;
        else if (k === "html") node.innerHTML = v;
        else if (k === "text") node.textContent = v;
        else if (k === "dataset") {
          Object.keys(v).forEach(dk => { node.dataset[dk] = v[dk]; });
        }
        else if (k.startsWith("on") && typeof v === "function") {
          node.addEventListener(k.slice(2).toLowerCase(), v);
        }
        else if (v != null) node.setAttribute(k, v);
      });
    }
    if (children) {
      children.forEach(c => {
        if (c == null) return;
        node.appendChild(typeof c === "string" ? document.createTextNode(c) : c);
      });
    }
    return node;
  }

  async function loadJSON(path, fallback) {
    try {
      const res = await fetch(path, { cache: "no-store" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      return await res.json();
    } catch (e) {
      console.warn("[manifest] fallback used for", path, e.message);
      return fallback;
    }
  }

  /* ---------------- Render: concept ---------------- */
  function renderConcept(panels) {
    const root = $("#concept-grid");
    if (!root) return;
    root.innerHTML = "";
    panels.forEach((p, i) => {
      const card = el("article", { class: "concept-card reveal" + (i ? " delay-" + i : "") }, [
        el("span", { class: "corner", text: String(i + 1).padStart(2, "0") }),
        el("span", { class: "label", text: p.label }),
        el("h3", { text: p.title }),
        el("p", { text: p.text })
      ]);
      root.appendChild(card);
    });
  }

  /* ---------------- Render: timeline ---------------- */
  function renderTimeline(items) {
    const rail = $("#timeline-rail");
    if (!rail) return;
    rail.innerHTML = "";
    items.forEach((it, i) => {
      const card = el("article", { class: "tl-card reveal" }, [
        el("span", { class: "tl-no", text: "T." + String(i + 1).padStart(2, "0") }),
        el("span", { class: "tl-time", text: it.time }),
        el("h3", { class: "tl-label", text: it.label }),
        el("p", { text: it.text })
      ]);
      rail.appendChild(card);
    });
  }

  /* ---------------- Render: map nodes + legend ---------------- */
  function renderMap(legend) {
    const legendBox = $("#map-legend");
    if (legendBox) {
      legendBox.innerHTML = "";
      legend.forEach(l => {
        const row = el("div", { class: "legend-row" }, [
          el("span", { class: "legend-swatch", style: "background:" + l.color + ";color:" + l.color }),
          el("div", {}, [
            el("span", { class: "legend-label", text: l.label }),
            el("span", { class: "legend-note", text: l.note })
          ])
        ]);
        legendBox.appendChild(row);
      });
    }

    const nodesG = $("#map-nodes");
    if (!nodesG) return;
    const NODES = [
      { x: 560, y: 410, k: "stay" },
      { x: 640, y: 460, k: "site" },
      { x: 460, y: 360, k: "used" },
      { x: 780, y: 380, k: "worker" },
      { x: 360, y: 500, k: "stay" },
      { x: 740, y: 260, k: "site" },
      { x: 880, y: 480, k: "stay" },
      { x: 520, y: 240, k: "worker" },
      { x: 320, y: 240, k: "used" },
      { x: 660, y: 540, k: "site" },
      { x: 980, y: 320, k: "used" },
      { x: 220, y: 460, k: "worker" },
      { x: 440, y: 620, k: "stay" },
      { x: 820, y: 600, k: "site" }
    ];
    const map = {
      stay: "var(--legend-stay)",
      site: "var(--legend-site)",
      used: "var(--legend-used)",
      worker: "var(--legend-work)"
    };
    nodesG.innerHTML = "";
    NODES.forEach(n => {
      const halo = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      halo.setAttribute("cx", n.x); halo.setAttribute("cy", n.y);
      halo.setAttribute("r", 14);
      halo.setAttribute("fill", map[n.k]);
      halo.setAttribute("class", "halo");
      halo.style.color = map[n.k];
      nodesG.appendChild(halo);

      const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      c.setAttribute("cx", n.x); c.setAttribute("cy", n.y);
      c.setAttribute("r", 5);
      c.setAttribute("fill", map[n.k]);
      c.setAttribute("stroke", "rgba(0,0,0,0.6)");
      c.setAttribute("stroke-width", "1");
      nodesG.appendChild(c);
    });
  }

  /* ---------------- Render: field notes ---------------- */
  let _allItems = [];     // photos + videos merged
  let _filterCat = "all";
  let _view = "featured"; // "featured" | "archive"

  function isVideoItem(item) {
    return /^assets\/videos\//.test(item.copied_file || "");
  }

  function renderFieldControls(items) {
    const row = $("#filter-row");
    if (!row) return;
    row.innerHTML = "";
    const counts = {};
    items.forEach(i => {
      const c = i.category || "other";
      counts[c] = (counts[c] || 0) + 1;
    });

    const cats = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);

    const all = el("button", {
      type: "button",
      class: "filter-btn is-active",
      dataset: { cat: "all" }
    }, [
      document.createTextNode("All"),
      el("span", { class: "cnt", text: String(items.length) })
    ]);
    row.appendChild(all);

    cats.forEach(c => {
      const btn = el("button", {
        type: "button",
        class: "filter-btn",
        dataset: { cat: c }
      }, [
        document.createTextNode(CATEGORY_LABEL[c] || c),
        el("span", { class: "cnt", text: String(counts[c]) })
      ]);
      row.appendChild(btn);
    });

    row.addEventListener("click", e => {
      const t = e.target.closest(".filter-btn");
      if (!t) return;
      $$(".filter-btn", row).forEach(b => b.classList.toggle("is-active", b === t));
      _filterCat = t.dataset.cat;
      renderField();
    });

    $$(".view-btn").forEach(b => {
      b.addEventListener("click", () => {
        $$(".view-btn").forEach(o => o.classList.toggle("is-active", o === b));
        _view = b.dataset.view;
        renderField();
      });
    });
  }

  function renderField() {
    const grid = $("#field-grid");
    const emp = $("#field-empty");
    const count = $("#field-count");
    if (!grid) return;
    grid.innerHTML = "";

    const filtered = _allItems.filter(i => {
      if (i.category === "hero") return false;          // skip hero from field
      if (_filterCat !== "all" && i.category !== _filterCat) return false;
      if (_view === "featured" && (i.priority || 99) > 2) return false;
      return true;
    });

    if (count) {
      const modeLabel = _view === "featured" ? "featured" : "archive";
      const protoNote = _filterCat === "prototype" ? " · prototype field frames" : "";
      count.textContent = filtered.length + " items / " + modeLabel + protoNote;
    }
    if (emp) emp.hidden = filtered.length !== 0;
    if (!filtered.length) return;

    filtered.forEach((it, idx) => {
      const variant = idx % 7 === 0 ? "is-wide" : (idx % 5 === 0 ? "is-tall" : "");
      const isVid = isVideoItem(it);

      const media = el("div", { class: "field-media" });
      if (isVid) {
        const poster = it.poster_file || "assets/photos/selected/hero_01.jpg";
        const img = el("img", { src: poster, alt: it.title || "", loading: "lazy" });
        media.appendChild(img);
        const play = el("div", { class: "play" }, [
          el("span", { html: "<svg viewBox='0 0 24 24' width='12' height='12' aria-hidden='true'><path d='M7 5 L19 12 L7 19 Z' fill='currentColor'/></svg>" })
        ]);
        media.appendChild(play);
      } else {
        const img = el("img", { src: it.copied_file, alt: it.title || "", loading: "lazy" });
        img.addEventListener("error", () => { img.style.opacity = "0.3"; });
        media.appendChild(img);
      }

      const card = el("article", {
        class: "field-card reveal " + variant,
        dataset: { idx: String(_allItems.indexOf(it)) }
      }, [
        media,
        el("div", { class: "field-meta" }, [
          el("span", { class: "field-cat", text: CATEGORY_LABEL[it.category] || it.category }),
          el("span", { text: String(idx + 1).padStart(2, "0") + " / " + String(filtered.length).padStart(2, "0") })
        ]),
        el("h4", { text: it.title || "Untitled" }),
        el("p", { class: "field-obs", text: it.observation || "" })
      ]);

      card.addEventListener("click", () => openModal(it));
      grid.appendChild(card);
    });

    observeReveals();
  }

  /* ---------------- Render: Urban Parts Archive ---------------- */
  let _archive = { intro: "", categories: [], items: [] };
  let _archiveFilter = "all";

  function renderArchive() {
    const intro = $("#archive-intro");
    if (intro) intro.textContent = _archive.intro || "";

    const filterRoot = $("#archive-filter");
    if (filterRoot) {
      filterRoot.innerHTML = "";
      // count per cat
      const counts = {};
      _archive.items.forEach(it => {
        const k = it.archive_category || "other";
        counts[k] = (counts[k] || 0) + 1;
      });
      _archive.categories.forEach(cat => {
        const n = cat.key === "all" ? _archive.items.length : (counts[cat.key] || 0);
        if (cat.key !== "all" && n === 0) return; // skip empty
        const btn = el("button", {
          type: "button",
          class: "arc-filter" + (cat.key === _archiveFilter ? " is-active" : ""),
          dataset: { cat: cat.key },
          "aria-pressed": cat.key === _archiveFilter ? "true" : "false"
        }, [
          document.createTextNode(cat.label),
          cat.ja ? el("span", { class: "ja", text: cat.ja }) : null,
          el("span", { class: "cnt", text: String(n) })
        ]);
        filterRoot.appendChild(btn);
      });
      filterRoot.addEventListener("click", e => {
        const t = e.target.closest("button.arc-filter");
        if (!t) return;
        _archiveFilter = t.dataset.cat;
        $$(".arc-filter", filterRoot).forEach(b => {
          const on = b === t;
          b.classList.toggle("is-active", on);
          b.setAttribute("aria-pressed", on ? "true" : "false");
        });
        renderArchiveSheet();
      });
    }
    renderArchiveSheet();
  }

  function renderArchiveSheet() {
    const sheet = $("#archive-sheet");
    const emp = $("#archive-empty");
    const countLabel = $("#archive-count");
    const relLabel = $("#archive-related");
    if (!sheet) return;
    sheet.innerHTML = "";

    const items = _archive.items.filter(it =>
      _archiveFilter === "all" || it.archive_category === _archiveFilter
    );

    if (countLabel) {
      countLabel.textContent = String(items.length).padStart(3, "0") + " specimens · " + _archive.items.length + " total in archive";
    }

    if (relLabel) {
      if (_archiveFilter === "all") {
        relLabel.textContent = "9 categories · 5 prototypes";
        relLabel.classList.remove("is-hidden");
      } else {
        const cat = _archive.categories.find(c => c.key === _archiveFilter);
        if (cat && cat.related_prototype) {
          relLabel.textContent = cat.related_prototype;
          relLabel.classList.remove("is-hidden");
        } else {
          relLabel.classList.add("is-hidden");
        }
      }
    }

    if (emp) emp.hidden = items.length !== 0;
    if (!items.length) return;

    items.forEach((it, i) => {
      const num = String(i + 1).padStart(3, "0");
      const catLabel = (_archive.categories.find(c => c.key === it.archive_category) || {}).label || it.archive_category || "—";
      const proto = it.related_prototype || "";

      const media = el("div", { class: "a-media" }, [
        (function () {
          const img = document.createElement("img");
          img.src = it.copied_file;
          img.alt = it.title || "";
          img.loading = "lazy";
          img.decoding = "async";
          img.addEventListener("error", () => { img.style.opacity = "0.25"; });
          return img;
        })()
      ]);

      const card = el("article", {
        class: "archive-cell reveal",
        tabindex: "0",
        role: "button",
        "aria-label": (it.title || "specimen") + " — クリックで詳細"
      }, [
        el("span", { class: "a-num", text: "SP." + num }),
        media,
        el("h4", { class: "a-title", text: it.title || "" }),
        el("div", { class: "a-strip" }, [
          el("span", { class: "a-cat", text: catLabel }),
          el("span", { class: "a-proto", text: proto.length > 18 ? proto.slice(0, 17) + "…" : proto })
        ])
      ]);

      card.addEventListener("click", () => openArchiveModal(it));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openArchiveModal(it);
        }
      });
      sheet.appendChild(card);
    });

    observeReveals();
  }

  function openArchiveModal(item) {
    // augment with related_prototype field and reuse main modal
    const it = Object.assign({}, item, {
      category: item.archive_category || item.category,
      design_translation: item.design_translation || "",
      _related_prototype: item.related_prototype || ""
    });
    openModal(it);
  }

  /* ---------------- Render: transformation ---------------- */
  function renderTransformation(rows) {
    const root = $("#trans-list");
    if (!root) return;
    root.innerHTML = "";
    rows.forEach((r, i) => {
      const row = el("article", { class: "trans-row reveal" }, [
        el("div", { class: "trans-no", text: String(i + 1).padStart(2, "0") }),
        el("div", { class: "trans-block" }, [
          el("span", { class: "b-label", text: "Urban Object" }),
          el("h3", { text: r.object }),
          el("p", { text: r.object_role })
        ]),
        el("div", { class: "trans-arrow", html: "<svg viewBox='0 0 32 12' width='32' height='12'><path d='M0 6 H28 M22 1 L28 6 L22 11' fill='none' stroke='currentColor' stroke-width='1.4'/></svg>" }),
        el("div", { class: "trans-block" }, [
          el("span", { class: "b-label", text: "Observed Behavior" }),
          (function () {
            const ul = document.createElement("ul");
            r.behaviors.forEach(b => {
              const li = document.createElement("li");
              li.textContent = b;
              ul.appendChild(li);
            });
            return ul;
          })()
        ]),
        el("div", { class: "trans-arrow", html: "<svg viewBox='0 0 32 12' width='32' height='12'><path d='M0 6 H28 M22 1 L28 6 L22 11' fill='none' stroke='currentColor' stroke-width='1.4'/></svg>" }),
        el("div", { class: "trans-block" }, [
          el("span", { class: "b-label", text: "Furniture Prototype" }),
          el("h3", { text: r.prototype }),
          el("p", { text: r.design_intent })
        ])
      ]);
      row.classList.add("is-proto");
      root.appendChild(row);
    });
  }

  /* ---------------- Render: prototypes ---------------- */
  function renderPrototypeEvidence(photos, hero) {
    const root = $("#proto-evidence");
    if (!root) return;

    const heroCandidateImages = new Set(((hero && hero.candidates) || []).map(c => c.image));
    const prototypePhotos = photos
      .filter(p => p.category === "prototype")
      .filter(p => heroCandidateImages.has(p.copied_file) || /_new_/.test(p.copied_file || ""))
      .sort((a, b) => {
        const ah = heroCandidateImages.has(a.copied_file) ? 0 : 1;
        const bh = heroCandidateImages.has(b.copied_file) ? 0 : 1;
        return ah - bh || ((a.priority || 9) - (b.priority || 9));
      })
      .slice(0, 7);

    if (!prototypePhotos.length) {
      root.hidden = true;
      return;
    }

    root.hidden = false;
    root.innerHTML = "";

    const intro = el("div", { class: "proto-evidence-head reveal" }, [
      el("span", { text: "New Prototype Field Frames" }),
      el("p", { text: "2026-05-27 shootから選定された、顔が明確に判別されにくい試作検証写真。Hero動画を壊さず、試作が街で起動した瞬間をここに集約する。" })
    ]);
    root.appendChild(intro);

    const rail = el("div", { class: "proto-evidence-rail" });
    prototypePhotos.forEach((p, i) => {
      const note = ((hero && hero.candidates) || []).find(c => c.image === p.copied_file);
      const card = el("article", {
        class: "proto-evidence-card reveal" + (heroCandidateImages.has(p.copied_file) ? " is-hero-candidate" : ""),
        dataset: { idx: String(_allItems.indexOf(p)) },
        tabindex: "0"
      }, [
        el("div", { class: "proto-evidence-media" }, [
          el("img", { src: p.copied_file, alt: p.title || "", loading: "lazy" })
        ]),
        el("div", { class: "proto-evidence-copy" }, [
          el("span", { text: "PF." + String(i + 1).padStart(2, "0") + (heroCandidateImages.has(p.copied_file) ? " / HERO CANDIDATE" : "") }),
          el("h3", { text: p.title || "Prototype field frame" }),
          el("p", { text: note ? note.note : (p.design_translation || p.observation || "") })
        ])
      ]);
      card.addEventListener("click", () => openModal(p));
      card.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openModal(p);
        }
      });
      rail.appendChild(card);
    });
    root.appendChild(rail);
  }

  function renderPrototypes(items) {
    const root = $("#proto-list");
    if (!root) return;
    root.innerHTML = "";
    items.forEach((p, i) => {
      const photo = el("div", { class: "proto-photo" }, [
        el("span", { class: "ph-label", text: "PHOTO · " + p.number })
      ]);
      if (p.photo) {
        const img = el("img", { src: p.photo, alt: p.name || "", loading: "lazy" });
        img.addEventListener("error", () => { img.remove(); });
        photo.insertBefore(img, photo.firstChild);
      }

      const card = el("article", { class: "proto-card reveal" }, [
        el("div", { class: "proto-visual" }, [
          photo,
          el("div", { class: "proto-drawing", text: "DRAWING SLOT · " + p.number + " · 後で差し替え" })
        ]),
        el("div", { class: "proto-body" }, [
          el("div", { class: "proto-head" }, [
            el("span", { class: "pn", text: p.number }),
            el("h3", { text: p.name })
          ]),
          el("p", { class: "proto-intent", text: p.intent }),
          (function () {
            const dl = el("dl", { class: "proto-specs" });
            const specs = [
              ["対象都市部材", p.target_object],
              ["支える行為", p.behaviors],
              ["時間帯", p.time],
              ["想定設置場所", p.location],
              ["想定素材", p.material],
              ["状態", "PROTOTYPE / 仮"]
            ];
            specs.forEach(([k, v]) => {
              const w = el("div", {}, [
                el("dt", { text: k }),
                el("dd", { text: v || "—" })
              ]);
              dl.appendChild(w);
            });
            return dl;
          })()
        ])
      ]);
      root.appendChild(card);
    });
  }

  /* ---------------- Render: Design Works (07B) ---------------- */
  const FALLBACK_WORKS = { meta: {}, works: [] };

  function buildWorkFigure(src, caption, alt, opts) {
    opts = opts || {};
    const fig = el("figure", { class: "work-figure" + (opts.detail ? " work-figure--detail" : "") });
    const img = document.createElement("img");
    img.src = src;
    img.alt = alt || caption || "";
    img.loading = "lazy";
    img.decoding = "async";
    fig.appendChild(img);
    if (caption) fig.appendChild(el("figcaption", { text: caption }));
    return { fig: fig, img: img };
  }

  // Hide the #works section entirely if no card is currently visible.
  function reconcileWorksVisibility() {
    const root = $("#works-list");
    const sec = $("#works");
    if (!root || !sec) return;
    const anyVisible = $$(".work-card", root).some(c => c.style.display !== "none");
    sec.style.display = anyVisible ? "" : "none";
  }

  function renderWorks(data) {
    const root = $("#works-list");
    const sec = $("#works");
    if (!root) return;

    // Completeness gate: only publish works that are explicitly visible AND
    // have a real main image path. No placeholders / "coming soon" are shown.
    const works = ((data && data.works) || []).filter(w =>
      w && w.visible !== false && !w.image_pending && !!w.image
    );

    if (!works.length) {
      if (sec) sec.style.display = "none";
      return;
    }
    if (sec) sec.style.display = "";

    // section head text from meta (optional override)
    if (data.meta) {
      if (data.meta.kicker) { const n = $("#works-no"); if (n) n.textContent = data.meta.kicker; }
      if (data.meta.heading) { const h = $("#works-h"); if (h) h.textContent = data.meta.heading; }
      if (data.meta.lead) { const l = $("#works-lead"); if (l) l.textContent = data.meta.lead; }
    }

    root.innerHTML = "";
    works.forEach(w => {
      // visual column: main figure (+ optional detail figure)
      const visual = el("div", { class: "work-visual" });
      const cardImgs = [];
      const main = buildWorkFigure(w.image, w.image_caption, w.image_alt, {});
      visual.appendChild(main.fig);
      cardImgs.push(main.img);
      if (w.detail_image) {
        const det = buildWorkFigure(w.detail_image, w.detail_caption, w.detail_alt, { detail: true });
        visual.appendChild(det.fig);
        cardImgs.push(det.img);
      }

      // body column
      const body = el("div", { class: "work-body" });
      body.appendChild(el("div", { class: "work-head" }, [
        el("span", { class: "work-num", text: w.number || "" }),
        el("div", { class: "work-titles" }, [
          el("h3", { text: w.title || "" }),
          w.subtitle ? el("span", { class: "work-sub", text: w.subtitle }) : null
        ])
      ]));
      if (w.summary) body.appendChild(el("p", { class: "work-summary", text: w.summary }));
      if (w.specs && w.specs.length) {
        const dl = el("dl", { class: "work-specs" });
        w.specs.forEach(pair => {
          dl.appendChild(el("dt", { text: pair[0] }));
          dl.appendChild(el("dd", { text: pair[1] }));
        });
        body.appendChild(dl);
      }
      if (w.keywords && w.keywords.length) {
        const kw = el("div", { class: "work-keywords" });
        w.keywords.forEach(k => kw.appendChild(el("span", { class: "work-kw", text: k })));
        body.appendChild(kw);
      }

      const card = el("article", { class: "work-card reveal", dataset: { work: w.id || "" } }, [
        visual, body
      ]);

      // Runtime safety net: if any required image fails to load (missing file),
      // hide the whole card so an incomplete work never appears.
      cardImgs.forEach(im => {
        im.addEventListener("error", () => {
          card.style.display = "none";
          reconcileWorksVisibility();
        });
      });

      root.appendChild(card);
    });

    observeReveals();
    reconcileWorksVisibility();
  }

  /* ---------------- Render: drawings ---------------- */
  function renderDrawings(items) {
    const root = $("#drawing-grid");
    if (!root) return;
    root.innerHTML = "";
    items.forEach((d, i) => {
      const cls = "drawing-cell reveal" + (d.size === "wide" ? " is-wide" : d.size === "tall" ? " is-tall" : "");
      const cell = el("article", { class: cls }, [
        el("div", { class: "drawing-ph" }, [
          el("div", { class: "top" }, [
            el("span", { text: "DWG · " + String(i + 1).padStart(2, "0") }),
            el("span", { text: "PLACEHOLDER" })
          ]),
          el("div", { class: "crosshair", text: d.file.split("/").pop() }),
          el("div", { class: "bottom", text: d.label + " — " + d.note })
        ])
      ]);
      root.appendChild(cell);
    });
  }

  /* ---------------- Modal ---------------- */
  function openModal(item) {
    const modal = $("#modal");
    if (!modal) return;
    const media = $("#modal-media");
    media.innerHTML = "";
    if (isVideoItem(item)) {
      const v = document.createElement("video");
      v.src = item.copied_file;
      v.controls = true; v.autoplay = true; v.muted = true; v.playsInline = true; v.loop = true;
      if (item.poster_file) v.poster = item.poster_file;
      media.appendChild(v);
    } else {
      const img = document.createElement("img");
      img.src = item.copied_file; img.alt = item.title || "";
      media.appendChild(img);
    }
    $("#modal-cat").textContent = (CATEGORY_LABEL[item.category] || item.category || "—").toUpperCase();
    $("#modal-title").textContent = item.title || "—";
    $("#modal-obs").textContent = item.observation || "";
    $("#modal-trans").textContent = item.design_translation || (isVideoItem(item) ? (item.duration_note || "—") : "—");
    const protoBox = $("#modal-proto");
    const protoName = $("#modal-proto-name");
    if (protoBox && protoName) {
      if (item._related_prototype) {
        protoName.textContent = item._related_prototype;
        protoBox.hidden = false;
      } else {
        protoBox.hidden = true;
      }
    }
    modal.hidden = false;
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    const modal = $("#modal");
    if (!modal) return;
    modal.hidden = true;
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    const media = $("#modal-media");
    if (media) {
      const v = media.querySelector("video");
      if (v) { try { v.pause(); } catch (e) {} }
      media.innerHTML = "";
    }
  }

  function bindModal() {
    document.addEventListener("click", e => {
      if (e.target.matches("[data-close]") || e.target.closest("[data-close]")) closeModal();
    });
    document.addEventListener("keydown", e => {
      if (e.key === "Escape") closeModal();
    });
  }

  /* ---------------- Reveal ---------------- */
  let _io;
  function observeReveals() {
    if (!("IntersectionObserver" in window)) {
      $$(".reveal").forEach(n => n.classList.add("is-in"));
      return;
    }
    if (!_io) {
      _io = new IntersectionObserver(entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            _io.unobserve(e.target);
          }
        });
      }, { rootMargin: "-8% 0px", threshold: 0.05 });
    }
    $$(".reveal:not(.is-in)").forEach(n => _io.observe(n));
  }

  /* ---------------- Clock (scroll-driven) ---------------- */
  function bindClock() {
    const clock = $("#clock");
    if (!clock) return;
    const start = 0.5;   // 00:30 in hours since midnight
    const end = 5.0;     // 05:00
    function update() {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const ratio = total > 0 ? Math.min(1, Math.max(0, h.scrollTop / total)) : 0;
      const t = start + (end - start) * ratio;
      const hr = Math.floor(t);
      const mn = Math.floor((t - hr) * 60);
      clock.textContent = String(hr).padStart(2, "0") + ":" + String(mn).padStart(2, "0");
    }
    let raf;
    window.addEventListener("scroll", () => {
      if (raf) return;
      raf = requestAnimationFrame(() => { raf = null; update(); });
    }, { passive: true });
    update();
  }

  /* ---------------- Section nav highlight ---------------- */
  function bindNavHighlight() {
    const links = $$(".index-nav a[href^='#']");
    if (!links.length) return;
    const map = new Map();
    links.forEach(a => {
      const id = a.getAttribute("href").slice(1);
      const sec = document.getElementById(id);
      if (sec) map.set(sec, a);
    });
    if (!("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.remove("is-current"));
          const link = map.get(e.target);
          if (link) link.classList.add("is-current");
        }
      });
    }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });
    map.forEach((_, sec) => io.observe(sec));
  }

  /* ---------------- Board mode header ---------------- */
  function bindBoardMode() {
    const hero = $("#hero");
    if (!hero) return;
    let raf;
    function update() {
      const threshold = hero.offsetHeight * 0.78;
      document.body.classList.toggle("board-mode", window.scrollY > threshold);
    }
    const requestUpdate = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = null;
        update();
      });
    };
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);
    update();
  }

  /* ---------------- Presentation mode ---------------- */
  function bindPresentation() {
    const btn = $("#presentation-toggle");
    if (!btn) return;
    btn.addEventListener("click", () => {
      const on = document.body.classList.toggle("presentation");
      btn.setAttribute("aria-pressed", on ? "true" : "false");
      btn.querySelector(".dot").style.background = on ? "var(--accent)" : "";
    });
    document.addEventListener("keydown", e => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const tag = (document.activeElement && document.activeElement.tagName) || "BODY";
      if (tag !== "BODY" && tag !== "A" && tag !== "BUTTON") return;
      const k = (e.key || "").toLowerCase();
      if (k === "p") btn.click();
      else if (k === "a") {
        // In Presentation Mode: toggle archive visibility
        if (document.body.classList.contains("presentation")) {
          document.body.classList.toggle("archive-on");
          e.preventDefault();
        }
      }
    });
  }

  /* ---------------- Hero video resilience ---------------- */
  function bindHeroVideo(hero) {
    const v = $("#hero-video");
    if (!v) return;
    if (hero) {
      if (hero.video) {
        const src = v.querySelector("source");
        if (src && src.getAttribute("src") !== hero.video) {
          src.setAttribute("src", hero.video);
          try { v.load(); } catch (e) {}
        }
      }
      if (hero.poster) {
        v.setAttribute("poster", hero.poster);
        const fb = $(".hero-fallback");
        if (fb) fb.setAttribute("src", hero.poster);
      }
    }
    v.muted = true; v.playsInline = true; v.loop = true;
    v.setAttribute("muted", "");
    v.setAttribute("playsinline", "");
    v.setAttribute("loop", "");
    v.addEventListener("error", () => { v.classList.add("is-broken"); });
    v.addEventListener("loadeddata", () => { v.play().catch(() => {}); });
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      try { v.pause(); } catch (e) {}
      v.classList.add("is-broken");
    }
  }

  /* ---------------- Back to top ---------------- */
  function bindBackTop() {
    const btn = $("#back-top");
    if (!btn) return;
    btn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
    window.addEventListener("scroll", () => {
      btn.classList.toggle("is-visible", window.scrollY > 600);
    }, { passive: true });
  }

  /* ---------------- Conclusion text ---------------- */
  function renderConclusion(text) {
    const node = $("#conclusion-body");
    if (node) node.textContent = text;
  }

  /* ---------------- 05B / Classification Matrix ---------------- */
  const FALLBACK_CLASSIFICATION = {
    meta: { title: "13 Urban Parts × 7 Night Behaviors", status: "photo-evidence-backed hypothesis v2", subtitle: "写真根拠付き仮説 v2" },
    behaviors: [
      { id: "wait", label: "待つ" }, { id: "sit", label: "座る" },
      { id: "nap", label: "仮眠" }, { id: "work", label: "働く" },
      { id: "alert", label: "警戒" }, { id: "eat", label: "食べる" },
      { id: "cool_down", label: "酔い冷まし" }
    ],
    legend: [
      { mark: "◎", label: "写真根拠が強い主候補" },
      { mark: "○", label: "成立しやすい" },
      { mark: "△", label: "条件付き／追加観察必要" },
      { mark: "×", label: "不向き／禁止条件" }
    ],
    display_order: ["P07","P01","P05","P13","P10","P09","P03","P04","P02","P06","P08","P12","P11"],
    furniture_palette: ["TARP PERCH","BOLT LEANER","SIGN BENCH","FOLDING FRAME","TARP SHELTER"],
    parts: [],
    matrix: {},
    conversion_priority: [],
    furniture_mappings: [],
    design_break: {
      label: "Research → Design",
      kicker: "ここから設計",
      lead: "行為をそのまま家具にするのではなく、既存の都市部材に擬態させる。"
    }
  };

  let _cls = FALLBACK_CLASSIFICATION;
  let _clsFilter = { behavior: "all", evidence: "all", furniture: "all" };

  function renderClassification(data) {
    if (!data || !data.parts || !data.parts.length) {
      const sec = $("#classification");
      if (sec) sec.style.display = "none";
      return;
    }
    _cls = data;

    // status badge
    const statusEl = $("#cls-status");
    if (statusEl) {
      statusEl.textContent = (data.meta && (data.meta.subtitle || data.meta.status)) || "";
    }

    // legend
    const legendRoot = $("#cls-legend");
    if (legendRoot) {
      legendRoot.innerHTML = "";
      (data.legend || []).forEach(l => {
        const item = el("span", { class: "cls-legend-item", dataset: { mark: l.mark } }, [
          el("span", { class: "cls-legend-mark", text: l.mark }),
          el("span", { text: l.label })
        ]);
        legendRoot.appendChild(item);
      });
    }

    // filters
    renderClsFilters();

    // matrix
    renderClsMatrix();

    // priority list
    renderClsPriority();

    // detail close
    const det = $("#cls-detail");
    if (det) {
      det.addEventListener("click", e => {
        if (e.target.matches("[data-cls-close]")) {
          det.hidden = true;
          $$(".cls-cell.is-focused").forEach(c => c.classList.remove("is-focused"));
        }
      });
    }
  }

  function renderClsFilters() {
    const beh = $("#cls-filter-behavior");
    if (beh) {
      beh.innerHTML = "";
      [{ id: "all", label: "All" }].concat(_cls.behaviors || []).forEach(b => {
        const btn = el("button", {
          type: "button",
          class: "cls-chip" + (b.id === _clsFilter.behavior ? " is-active" : ""),
          dataset: { v: b.id }
        }, [document.createTextNode(b.label)]);
        btn.addEventListener("click", () => { _clsFilter.behavior = b.id; applyClsFilters(); });
        beh.appendChild(btn);
      });
    }

    const ev = $("#cls-filter-evidence");
    if (ev) {
      ev.innerHTML = "";
      const evOpts = [
        { id: "all",    label: "All" },
        { id: "strong", label: "強" },
        { id: "medium", label: "中" },
        { id: "weak",   label: "弱" }
      ];
      evOpts.forEach(o => {
        const btn = el("button", {
          type: "button",
          class: "cls-chip" + (o.id === _clsFilter.evidence ? " is-active" : ""),
          dataset: { v: o.id }
        }, [document.createTextNode(o.label)]);
        btn.addEventListener("click", () => { _clsFilter.evidence = o.id; applyClsFilters(); });
        ev.appendChild(btn);
      });
    }

    const fu = $("#cls-filter-furniture");
    if (fu) {
      fu.innerHTML = "";
      [{ id: "all", label: "All" }].concat(
        (_cls.furniture_palette || []).map(n => ({ id: n, label: n }))
      ).forEach(o => {
        const btn = el("button", {
          type: "button",
          class: "cls-chip" + (o.id === _clsFilter.furniture ? " is-active" : ""),
          dataset: { v: o.id }
        }, [document.createTextNode(o.label)]);
        btn.addEventListener("click", () => { _clsFilter.furniture = o.id; applyClsFilters(); });
        fu.appendChild(btn);
      });
    }
  }

  function renderClsMatrix() {
    const head = $("#cls-matrix-head");
    const body = $("#cls-matrix-body");
    if (!head || !body) return;

    head.innerHTML = "";
    head.appendChild(el("th", { class: "cls-th-id", text: "Urban Part" }));
    (_cls.behaviors || []).forEach(b => {
      head.appendChild(el("th", { dataset: { behavior: b.id }, text: b.label }));
    });

    body.innerHTML = "";
    const partsById = Object.fromEntries((_cls.parts || []).map(p => [p.id, p]));
    const order = _cls.display_order && _cls.display_order.length
      ? _cls.display_order
      : (_cls.parts || []).map(p => p.id);
    const anchorPart = ((_cls.conversion_priority || []).find(x => x.is_anchor) || {}).part_id;

    order.forEach(pid => {
      const part = partsById[pid];
      if (!part) return;
      const tr = document.createElement("tr");
      tr.dataset.part = pid;
      tr.dataset.evidence = part.evidence_strength || "";
      tr.dataset.furniture = (part.furniture_candidates || []).join("|");
      if (pid === anchorPart) tr.classList.add("is-anchor");
      if ((part.design_potential || "").indexOf("prohibited") === 0) tr.classList.add("is-prohibited");

      const th = document.createElement("th");
      th.scope = "row";
      th.appendChild(el("span", { class: "cls-part-id", text: part.id }));
      th.appendChild(document.createTextNode(part.label));
      tr.appendChild(th);

      (_cls.behaviors || []).forEach(b => {
        const cell = ((_cls.matrix || {})[pid] || {})[b.id] || { mark: "—", reason: "" };
        const td = document.createElement("td");
        td.className = "cls-cell";
        td.dataset.part = pid;
        td.dataset.behavior = b.id;
        td.dataset.mark = cell.mark;
        td.dataset.reason = cell.reason || "";
        td.textContent = cell.mark;
        td.setAttribute("aria-label",
          `${part.label} × ${b.label}: ${cell.mark} ${cell.reason || ""}`);
        td.tabIndex = 0;
        td.addEventListener("click", () => openClsDetail(part, b, cell, td));
        td.addEventListener("keydown", e => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            openClsDetail(part, b, cell, td);
          }
        });
        tr.appendChild(td);
      });
      body.appendChild(tr);
    });

    applyClsFilters();
  }

  function applyClsFilters() {
    // chip active states
    [["behavior", "#cls-filter-behavior"], ["evidence", "#cls-filter-evidence"], ["furniture", "#cls-filter-furniture"]]
      .forEach(([k, sel]) => {
        $$(`${sel} .cls-chip`).forEach(b => {
          b.classList.toggle("is-active", b.dataset.v === _clsFilter[k]);
        });
      });

    const fBehavior = _clsFilter.behavior;
    const fEvidence = _clsFilter.evidence;
    const fFurniture = _clsFilter.furniture;

    // rows
    $$("#cls-matrix-body tr").forEach(tr => {
      const evOk = fEvidence === "all" || tr.dataset.evidence === fEvidence;
      const fuOk = fFurniture === "all" || (tr.dataset.furniture || "").split("|").indexOf(fFurniture) !== -1;
      tr.style.display = (evOk && fuOk) ? "" : "none";
    });

    // cell dimming by behavior column
    $$("#cls-matrix-body .cls-cell").forEach(td => {
      const ok = fBehavior === "all" || td.dataset.behavior === fBehavior;
      td.classList.toggle("is-dim", !ok);
    });

    // header column dim
    $$("#cls-matrix-head th[data-behavior]").forEach(th => {
      const ok = fBehavior === "all" || th.dataset.behavior === fBehavior;
      th.style.opacity = ok ? "1" : "0.35";
    });
  }

  function openClsDetail(part, behavior, cell, cellEl) {
    const det = $("#cls-detail");
    if (!det) return;
    $$(".cls-cell.is-focused").forEach(c => c.classList.remove("is-focused"));
    if (cellEl) cellEl.classList.add("is-focused");

    const markMap = Object.fromEntries(((_cls.legend) || []).map(l => [l.mark, l.label]));
    $("#cls-detail-meta").textContent = `${part.id} · ${part.label} × ${behavior.label}`;
    $("#cls-detail-title").textContent = part.label + " × " + behavior.label;
    $("#cls-detail-mark").textContent = cell.mark;
    $("#cls-detail-mark-label").textContent = markMap[cell.mark] || "";
    $("#cls-detail-reason").textContent = cell.reason || "—";

    const extra = $("#cls-detail-extra");
    if (extra) {
      extra.innerHTML = "";
      const rows = [
        ["Evidence", part.evidence_strength || "—"],
        ["Strongest", part.strongest_behavior || "—"],
        ["Furniture", (part.furniture_candidates || []).join(" / ") || "—"],
        ["Design Potential", part.design_potential || "—"]
      ];
      if (part.priority_note) rows.push(["Note", part.priority_note]);
      if (part.do_not && part.do_not.length) rows.push(["Do not", part.do_not.join(" / ")]);
      rows.forEach(([k, v]) => {
        extra.appendChild(el("dt", { text: k }));
        extra.appendChild(el("dd", { text: v }));
      });
    }
    det.hidden = false;
  }

  function renderClsPriority() {
    const root = $("#cls-priority-list");
    if (!root) return;
    root.innerHTML = "";
    const partsById = Object.fromEntries((_cls.parts || []).map(p => [p.id, p]));
    (_cls.conversion_priority || []).forEach(p => {
      const part = partsById[p.part_id] || { label: p.part_id };
      const li = document.createElement("li");
      li.className = "cls-priority-item" + (p.is_anchor ? " is-anchor" : "");
      li.appendChild(el("span", { class: "cls-priority-rank", text: "Priority " + String(p.priority).padStart(2, "0") + " · " + p.part_id }));
      li.appendChild(el("p", { class: "cls-priority-name", text: part.label }));
      li.appendChild(el("p", { class: "cls-priority-logic", text: p.logic || "" }));
      const fur = el("div", { class: "cls-priority-fur" });
      (p.furniture_candidates || []).forEach(name => {
        fur.appendChild(el("span", { class: "cls-priority-tag", text: name }));
      });
      li.appendChild(fur);
      li.addEventListener("click", () => {
        const sec = $("#classification");
        if (sec) sec.scrollIntoView({ behavior: "smooth", block: "start" });
        const row = document.querySelector(`#cls-matrix-body tr[data-part="${p.part_id}"]`);
        if (row) row.scrollIntoView({ behavior: "smooth", block: "center" });
      });
      root.appendChild(li);
    });
  }

  /* ---------------- Init ---------------- */
  /* ---------------- Section visibility (hide incomplete sections) ---------------- */
  // Data-driven: site_content.json "hidden_sections": ["prototypes","drawings"].
  // Hides the section element, its index-nav link, and keeps it hidden in
  // Presentation Mode (inline display:none wins). Reversible via the JSON.
  function applyHiddenSections(ids) {
    (ids || []).forEach(id => {
      const sec = document.getElementById(id);
      if (sec) sec.style.display = "none";
      $$('.index-nav a[href="#' + id + '"]').forEach(a => { a.style.display = "none"; });
    });
  }

  async function init() {
    const [content, photos, videos, archive, classification, works] = await Promise.all([
      loadJSON("data/site_content.json", FALLBACK_CONTENT),
      loadJSON("data/photo_manifest.json", FALLBACK_PHOTOS),
      loadJSON("data/video_manifest.json", FALLBACK_VIDEOS),
      loadJSON("data/archive_manifest.json", FALLBACK_ARCHIVE),
      loadJSON("data/classification.json", FALLBACK_CLASSIFICATION),
      loadJSON("data/works.json", FALLBACK_WORKS)
    ]);

    bindHeroVideo(content.hero || {});

    renderConcept((content.concept && content.concept.panels) || FALLBACK_CONTENT.concept.panels);
    renderTimeline(content.timeline || FALLBACK_CONTENT.timeline);
    renderMap((content.map && content.map.legend) || FALLBACK_CONTENT.map.legend);
    renderTransformation(content.transformation || FALLBACK_CONTENT.transformation);
    renderPrototypeEvidence(photos, content.hero || {});
    renderPrototypes(content.prototypes || FALLBACK_CONTENT.prototypes);
    renderWorks(works && works.works ? works : FALLBACK_WORKS);
    renderDrawings(content.drawings || FALLBACK_CONTENT.drawings);
    renderConclusion((content.conclusion && content.conclusion.body) || FALLBACK_CONTENT.conclusion.body);

    _allItems = [].concat(photos, videos);
    renderFieldControls(_allItems);
    renderField();

    _archive = archive && archive.items ? archive : FALLBACK_ARCHIVE;
    renderArchive();

    renderClassification(classification);

    bindModal();
    bindClock();
    bindNavHighlight();
    bindBoardMode();
    bindPresentation();
    bindBackTop();

    // Hide sections whose materials are not ready (prototypes / drawings).
    // Defaults to hiding both even under fallback content.
    applyHiddenSections(content.hidden_sections || ["prototypes", "drawings"]);

    observeReveals();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
