function doGet() {
  return HtmlService.createHtmlOutputFromFile('index');
}

function getCharacterData(characterId) {
  const cleanId = characterId.toString().replace(/[^0-9]/g, "");
  const url = "https://lhrpg.com/lhz/pc_status?id=" + cleanId;

  try {
    // HTML取得
    const response = UrlFetchApp.fetch(url, { "muteHttpExceptions": true });
    const html = response.getContentText();

    // <td> または <th> タグを中身ごと抽出
    const rawTags = html.match(/<(td|th)[\s\S]*?>([\s\S]*?)<\/(td|th)>/g);

    // テキスト化
    const tags = rawTags.map((tag, index) => {
      const text = tag.replace(/<[\s\S]*?>/g, "").replace(/\&nbsp;/g, " ").trim();
      // ログに「番号：中身」を出力（最初の300個くらいに絞ると見やすい）
      return text;
    });

    // --- 変数への格納セクション ---
    // ご指定のIndex番号に基づき、各変数に格納します
    const name    = tags[1];  // 名前
    const chlv    = tags[2];  // CR
    const pclv    = tags[8];  // lv
    const pcprof  = tags[12]; // 人物タグ
    const maxHp   = tags[46]; // 最大HP
    const causal  = tags[47]; // 初期因果力
    const atk     = tags[48]; // 攻撃力
    const magic   = tags[49]; // 魔力
    const heal    = tags[50]; // 回復力
    const pDef    = tags[51]; // 物理防御力
    const mDef    = tags[52]; // 魔法防御力
    const action  = tags[53]; // 行動力
    const move    = tags[54]; // 移動力
    const streng  = tags[60]; // str
    const motion  = tags[63]; // 運動
    const durab   = tags[66]; // 耐久
    const taeget  = tags[69]; // 命中pow
    const dex     = tags[74]; // dex
    const releace = tags[77]; // 解除
    const opera   = tags[80]; // 操作
    const avoid   = tags[83]; // 回避
    const pow     = tags[88]; // pow
    const dete    = tags[91]; // 知覚
    const nego    = tags[94]; // 交渉
    const regist  = tags[97]; // 抵抗
    const int     = tags[102];// int
    const info    = tags[105];// 知識
    const analy   = tags[108];// 解析

    let p = "{\"kind\":\"character\",\"data\":{\"name\":\"" + name + "\",\"externalUrl\":\"https://lhrpg.com/lhz/pc?id=" + cleanId + "\",\"status\":[{\"label\":\"HP\",\"value\":\"" + maxHp + "\",\"max\":\"" + maxHp + "\"},{\"label\":\"再生\",\"value\":\"0\"},{\"label\":\"障壁\",\"value\":\"0\"},{\"label\":\"疲労\",\"value\":\"0\"},{\"label\":\"ヘイト\",\"value\":\"0\"},{\"label\":\"因果力\",\"value\":\"" + causal + "\"}],\"initiative\":" + action + ",\"params\":[{\"label\":\"STR\",\"value\":\"" + streng + "\"},{\"label\":\"DEX\",\"value\":\"" + dex + "\"},{\"label\":\"POW\",\"value\":\""+ pow + "\"},{\"label\":\"INT\",\"value\":\"" + int + "\"}],\"faces\":[],\"x\":0,\"y\":0,\"z\":0,\"angle\":0,\"width\":4,\"height\":4,\"active\":true,\"secret\":false,\"invisible\":false,\"hideStatus\":false,\"color\":\"\",\"roomId\":null,\"commands\":\"\",\"memo\":\"" + pcprof + " " + pclv + " " + chlv + "\"}}";

    //console.log(p);
    
    return p;

  } catch (e) {
    console.error("エラー発生: " + e.toString());
    return "エラーが発生しました。ログを確認してください。";
  }
}
