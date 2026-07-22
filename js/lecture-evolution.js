(function () {
  'use strict';

  var sixKinds = {
    '日': '象形', '月': '象形', '盈': '会意（从皿、夃）', '昃': '会意（从日、仄）',
    '辰': '象形', '宿': '会意（从宀、人、百）', '列': '会意（从歹、刀）', '张': '形声（从弓，长声）',
    '寒': '会意（从宀、茻、人）', '来': '象形', '暑': '形声（从日，者声）', '往': '会意（从彳、主）',
    '秋': '会意（从禾、火）', '收': '会意（从丩、攴）', '冬': '象形', '藏': '形声（从艸，臧声）',
    '闰': '会意（门内有王）', '余': '象形', '成': '会意', '岁': '形声（从山，夕声）',
    '律': '形声（从彳，聿声）', '吕': '象形', '调': '形声（从言，周声）', '阳': '形声（从阜，昜声）',
    '云': '象形', '腾': '形声（从马，朕声）', '致': '会意（从至、攴）', '雨': '象形',
    '露': '形声（从雨，路声）', '结': '形声（从糸，吉声）', '为': '象形', '霜': '形声（从雨，相声）',
    '金': '会意', '生': '象形', '丽': '会意', '水': '象形', '玉': '象形', '出': '会意', '昆': '会意', '冈': '象形',
    '剑': '形声（从刃，佥声）', '号': '会意', '巨': '象形', '阙': '形声（从门，厥声）', '珠': '形声（从王，朱声）', '称': '形声（从禾，尔声）', '夜': '形声（从夕，亦声）', '光': '会意',
    '果': '象形', '珍': '形声（从王，㐱声）', '李': '会意（从木、子）', '柰': '会意（从木、示）', '菜': '形声（从艸，采声）', '重': '会意', '芥': '形声（从艸，介声）', '姜': '形声（从女，羊声）',
    '海': '形声（从水，每声）', '咸': '会意', '河': '形声（从水，可声）', '淡': '形声（从水，炎声）', '鳞': '形声（从鱼，粦声）', '潜': '形声（从水，朁声）', '羽': '象形', '翔': '形声（从羽，羊声）',
    '龙': '象形', '师': '会意', '火': '象形', '帝': '象形', '鸟': '象形', '官': '会意', '人': '象形', '皇': '会意（从白、王）',
    '始': '形声（从女，台声）', '制': '会意', '文': '象形', '字': '会意（从宀、子）', '乃': '象形', '服': '会意', '衣': '象形', '裳': '形声（从衣，尚声）',
    '推': '形声（从手，隹声）', '位': '会意（从人、立）', '让': '形声（从言，上声）', '国': '会意', '有': '会意', '虞': '形声', '陶': '形声（从阜，匋声）', '唐': '形声',
    '吊': '象形', '民': '象形', '伐': '会意（从人、戈）', '罪': '形声', '周': '会意', '发': '会意', '殷': '会意', '汤': '形声（从水，昜声）',
    '坐': '会意（从人、土）', '朝': '会意', '问': '形声（从门，口声）', '道': '形声（从辵，首声）', '垂': '象形', '拱': '会意（从手、共）', '平': '象形', '章': '会意（从立、早）',
    '爱': '会意', '育': '会意', '黎': '形声', '首': '象形', '臣': '象形', '伏': '会意（从人、犬）', '戎': '会意（从十、戈）', '羌': '会意（从羊、人）',
    '遐': '形声（从辵，叚声）', '迩': '形声（从辵，尔声）', '一': '指事', '体': '会意（从人、本）', '率': '象形', '宾': '会意', '归': '会意', '王': '象形',
    '鸣': '会意（从口、鸟）', '凤': '象形', '在': '会意（从才、土）', '树': '形声（从木，对声）', '白': '象形', '驹': '形声（从马，句声）', '食': '会意', '场': '形声（从土，昜声）',
    '化': '会意（从人、匕）', '被': '形声（从衣，皮声）', '草': '形声（从艸，早声）', '木': '象形', '赖': '形声（从贝，剌声）', '及': '会意', '万': '象形', '方': '象形',
    '盖': '形声', '此': '会意（从止、匕）', '身': '象形', '髮': '形声（从髟，犮声）', '四': '象形', '大': '象形', '五': '指事', '常': '形声（从巾，尚声）',
    '恭': '会意（从共、心）', '惟': '形声（从心，隹声）', '鞠': '形声（从革，匊声）', '养': '形声（从食，羊声）', '岂': '象形', '敢': '会意', '毁': '会意', '伤': '形声（从人，昜声）',
    '女': '象形', '慕': '形声', '贞': '会意（从卜、贝）', '絜': '会意', '男': '会意（从田、力）', '效': '形声（从攴，交声）', '才': '象形', '良': '会意',
    '知': '会意（从矢、口）', '过': '形声（从辵，呙声）', '必': '指事', '改': '会意（从己、攴）', '得': '会意', '能': '象形', '莫': '会意', '忘': '会意（从亡、心）',
    '罔': '象形', '谈': '形声（从言，炎声）', '彼': '形声（从彳，皮声）', '短': '形声（从矢，豆声）', '靡': '形声', '恃': '形声（从心，寺声）', '己': '象形', '长': '象形',
    '信': '会意（从人、言）', '使': '形声（从人，吏声）', '可': '会意', '覆': '形声（从覀，复声）', '器': '会意', '欲': '形声（从欠，谷声）', '难': '形声（从隹，又声）', '量': '会意（从日、里）',
    '墨': '会意（从黑、土）', '悲': '会意（从非、心）', '丝': '象形', '染': '会意（从水、木、九）', '诗': '形声（从言，寺声）', '赞': '形声（从贝，兟声）', '羔': '会意（从羊、火）', '羊': '象形'
  };

  var lishuForms = {
    '张': '張', '来': '來', '昃': '', '闰': '閏', '岁': '歲', '吕': '呂', '调': '調',
    '阳': '陽', '云': '雲', '腾': '騰', '结': '結', '为': '為',
    '丽': '麗', '冈': '岡', '剑': '劍', '号': '號', '阙': '', '称': '稱', '鳞': '鱗', '潜': '潛',
    '龙': '龍', '师': '師', '鸟': '鳥', '让': '讓', '国': '國', '发': '發', '汤': '湯', '问': '問', '爱': '愛', '柰': '',
    '迩': '邇', '体': '體', '宾': '賓', '归': '歸', '鸣': '鳴', '凤': '鳳', '树': '樹', '驹': '駒', '场': '場',
    '赖': '賴', '万': '萬', '盖': '蓋', '养': '養', '岂': '豈', '毁': '毀', '伤': '傷', '贞': '貞', '过': '過',
    '谈': '談', '长': '長', '难': '難', '丝': '絲', '诗': '詩', '赞': '贊', '絜': '潔'
  };

  var kaishuForms = { '絜': '絜' };
  var xingshuForms = { '絜': '洁', '髮': '发' };
  var caoshuForms = { '絜': '洁', '髮': '发' };

  var ctextForms = {
    '张': '張', '来': '來', '闰': '閏', '岁': '歲', '吕': '呂', '调': '調',
    '阳': '陽', '云': '雲', '腾': '騰', '结': '結', '为': '為',
    '丽': '麗', '冈': '岡', '剑': '劍', '号': '號', '阙': '闕', '称': '稱', '鳞': '鱗', '潜': '潛',
    '龙': '龍', '师': '師', '鸟': '鳥', '让': '讓', '国': '國', '发': '發', '汤': '湯', '问': '問', '爱': '愛',
    '迩': '邇', '体': '體', '宾': '賓', '归': '歸', '鸣': '鳴', '凤': '鳳', '树': '樹', '驹': '駒', '场': '場',
    '赖': '賴', '万': '萬', '盖': '蓋', '养': '養', '岂': '豈', '毁': '毀', '伤': '傷', '贞': '貞', '过': '過',
    '谈': '談', '长': '長', '难': '難', '丝': '絲', '诗': '詩', '赞': '贊'
  };

  var ancientAvailability = {
    jiagu: '日月昃辰宿来往秋冬余成岁律吕阳雨为生水玉出光果柰咸河羽龙帝火鸟官人文乃服衣伐周朝问首臣戎羌一率王归宾在凤鸣白食化木万及方此身大五女男效才良必得莫己长可量丝羊',
    jin: '日月辰宿寒来往冬余成岁吕阳雨为生水金丽玉出昆冈巨夜光果李柰重姜海咸羽龙师鸟帝官皇人始制字文乃服衣国有陶虞唐吊民伐周发殷汤朝道平章首臣伏戎羌一归率宾王鸣凤在食驹白木化及万方盖此四身发大五惟岂敢毁女慕贞男效才良过知必改得能忘莫己长使可覆器量难丝羔羊',
    seal: '日月盈昃辰宿列张寒来暑往秋收冬藏闰余成岁律吕调阳云腾致雨露结为霜金生丽水玉出昆冈剑号阙巨珠称夜光果珍李柰菜姜重芥海咸河淡鳞潜翔羽龙帝火师鸟官皇人始字制文乃服衣裳推位让国有虞陶唐民伐罪发周殷汤坐朝问道垂拱平章爱育首黎臣伏戎羌体一遐迩王归宾率在鸣树凤白场驹食被木化草赖及万方盖此髮身四大五常恭惟鞠养岂敢毁伤女慕贞絜男效才良过知必改能得莫忘罔谈彼靡短恃己长信使可覆器欲难量墨悲丝诗染羔赞羊'
  };

  function row(label, className, glyph, description, history, background) {
    var glyphMarkup = glyph
      ? className
        ? '<span class="evo-row-glyph ' + className + '">' + glyph + '</span>'
        : glyph
      : '';
    return '<div class="evo-row"' + (background ? ' style="background:' + background + '"' : '') + '>' +
      '<span class="evo-row-label">⚒ ' + label + '</span>' + glyphMarkup +
      '<span class="evo-row-desc">' + description + '<br><em>▸ ' + history + '</em></span>' +
      '</div>';
  }

  function ancientGlyph(stage, character, label) {
    if (ancientAvailability[stage].indexOf(character) === -1) return '';
    var form = ctextForms[character] || character;
    var code = form.codePointAt(0).toString(16);
    var href = 'https://ctext.org/dictionary.pl?char=' + encodeURIComponent(form) + '&if=gb';
    var src = 'https://ctext.org/font/' + stage + '/' + code + '.gif';
    return '<a class="evo-row-glyph-link" href="' + href + '" target="_blank" rel="noopener noreferrer">' +
      '<img class="evo-row-glyph evo-row-glyph-image" src="' + src + '" alt="' + character + '的' + label + '字形"></a>';
  }

  function scriptForm(forms, character) {
    return Object.prototype.hasOwnProperty.call(forms, character) ? forms[character] : character;
  }

  function evolutionMarkup(character) {
    var hasLishuForm = Object.prototype.hasOwnProperty.call(lishuForms, character);
    var lishu = hasLishuForm ? lishuForms[character] : character;
    var kaishu = scriptForm(kaishuForms, character);
    var xingshu = scriptForm(xingshuForms, character);
    var caoshu = scriptForm(caoshuForms, character);
    var lishuDescription = lishu ? '波磔分明，蚕头燕尾' : '本地隶书未收此字，不用系统字体代替';
    var lishuHistory = lishu ? '东汉隶变，化圆为方' : '待补入有明确授权的隶书字形';
    var jiagu = ancientGlyph('jiagu', character, '甲骨文');
    var jin = ancientGlyph('jin', character, '金文');
    var seal = ancientGlyph('seal', character, '小篆');
    return '<div class="char-section char-section--evolution">' +
      '<div class="char-section-label">六体演化</div>' +
      '<div class="char-section-content"><div class="evo-list">' +
      row('甲骨', '', jiagu, jiagu ? '卜辞字形，点击核对原始条目' : '未见可靠卜辞字形收录', '刀刻龟甲，字形以可靠出土材料为准', '#f5ece0') +
      row('金文', '', jin, jin ? '青铜铭文字形，点击核对原始条目' : '未见可靠金文字形收录', '铸造青铜，笔画多见圆转与浑厚', '#e8dcc8') +
      row('小篆', '', seal, '《说文》小篆字形，点击核对原始条目', '秦统一文字后，以李斯篆法为标准', '#f2ece0') +
      row('隶书', 'evo-row-glyph-font evo-row-glyph-font--lishu', lishu, lishuDescription, lishuHistory) +
      row('楷书', 'evo-row-glyph-font evo-row-glyph-font--kaishu', kaishu, '横平竖直，结构端正', '可参看欧阳询、颜真卿等楷法') +
      row('行书', 'evo-row-glyph-font evo-row-glyph-font--xingshu', xingshu, '行笔连贯，收放相济', '王羲之以来，介于楷书与草书之间') +
      row('草书', 'evo-row-glyph-font evo-row-glyph-font--caoshu', caoshu, '省笔连绵，笔势取胜', '张旭、怀素以飞动见长') +
      '</div></div></div>';
  }

  var grid = document.querySelector('.char-grid');
  if (!grid || grid.dataset.evolutionReady === 'true') return;
  grid.dataset.evolutionReady = 'true';

  var note = document.createElement('p');
  note.className = 'evo-source-note';
  note.innerHTML = '甲骨、金文与小篆字形仅在可靠字典或考古材料有收录时展示，点击可核对<a href="https://ctext.org/" target="_blank" rel="noopener noreferrer">中国哲学书电子化计划</a>；未收录时保留说明，不以现代字体替代。隶书、楷书、行书、草书使用本站随附的授权书法字体，详见<a href="assets/fonts/README.md" target="_blank" rel="noopener noreferrer">字体许可与署名</a>。';
  grid.parentNode.insertBefore(note, grid);

  grid.querySelectorAll('.char-card').forEach(function (card) {
    var display = card.querySelector('.char-display');
    var meta = card.querySelector('.char-meta');
    var firstSection = card.querySelector('.char-section');
    if (!display || !meta || !firstSection) return;

    var character = display.textContent.trim();
    var kind = document.createElement('span');
    kind.className = 'char-six';
    kind.textContent = '六书：' + (sixKinds[character] || '待考');
    meta.appendChild(kind);

    firstSection.insertAdjacentHTML('beforebegin', evolutionMarkup(character));
  });
}());
