// ステップ1 用：インストール済みフォント一覧をデスクトップにテキスト出力（既存ファイルは上書きしない）
#target illustrator
(function () {
  var stamp = new Date().getTime();
  var f = new File(Folder.desktop + "/illustrator_fonts_" + stamp + ".txt");
  f.encoding = "UTF-8"; f.open("w");
  f.writeln("name\tfamily\tstyle");
  for (var i = 0; i < app.textFonts.length; i++) {
    var tf = app.textFonts[i];
    f.writeln(tf.name + "\t" + tf.family + "\t" + tf.style);
  }
  f.close();
  alert(app.textFonts.length + " fonts -> " + f.fsName);
})();
