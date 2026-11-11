// ステップ0 動作確認：A3横の新規ドキュメントに四角と文字を1つ置く（保存はしない）
#target illustrator
(function () {
  var mm = 2.834645669;
  var W = 420 * mm, H = 297 * mm;
  var doc = app.documents.add(DocumentColorSpace.RGB, W, H);
  // レイヤー：背景／図形／文字／注記（上から 注記→文字→図形→背景）
  doc.layers[0].name = "背景";
  var names = ["図形", "文字", "注記"];
  for (var i = 0; i < names.length; i++) { var L = doc.layers.add(); L.name = names[i]; }
  function rgb(r, g, b) { var c = new RGBColor(); c.red = r; c.green = g; c.blue = b; return c; }
  // 四角（図形レイヤー）top, left, width, height
  var rect = doc.layers.getByName("図形").pathItems.rectangle(H - 40 * mm, 40 * mm, 120 * mm, 60 * mm);
  rect.filled = false; rect.stroked = true; rect.strokeWidth = 1; rect.strokeColor = rgb(34, 34, 34);
  // 文字（文字レイヤー）※フォントは既定のまま。編集可能なテキスト
  var t = doc.layers.getByName("文字").textFrames.add();
  t.contents = "動作確認 test";
  t.textRange.characterAttributes.size = 24;
  t.position = [45 * mm, H - 45 * mm];
  alert("OK: A3横ドキュメントを作成しました（未保存）");
})();
