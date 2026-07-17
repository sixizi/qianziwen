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
    '露': '形声（从雨，路声）', '结': '形声（从糸，吉声）', '为': '象形', '霜': '形声（从雨，相声）'
  };

  var lishuForms = {
    '张': '張', '来': '來', '昃': '', '闰': '閏', '岁': '歲', '吕': '呂', '调': '調',
    '阳': '陽', '云': '雲', '腾': '騰', '结': '結', '为': '為'
  };

  function row(label, className, glyph, description, history, background) {
    var glyphMarkup = glyph
      ? '<span class="evo-row-glyph ' + className + '">' + glyph + '</span>'
      : '';
    return '<div class="evo-row"' + (background ? ' style="background:' + background + '"' : '') + '>' +
      '<span class="evo-row-label">⚒ ' + label + '</span>' + glyphMarkup +
      '<span class="evo-row-desc">' + description + '<br><em>▸ ' + history + '</em></span>' +
      '</div>';
  }

  function evolutionMarkup(character) {
    var hasLishuForm = Object.prototype.hasOwnProperty.call(lishuForms, character);
    var lishu = hasLishuForm ? lishuForms[character] : character;
    var lishuDescription = lishu ? '波磔分明，蚕头燕尾' : '本地隶书未收此字，不用系统字体代替';
    var lishuHistory = lishu ? '东汉隶变，化圆为方' : '待补入有明确授权的隶书字形';
    return '<div class="char-section char-section--evolution">' +
      '<div class="char-section-label">六体演化</div>' +
      '<div class="char-section-content"><div class="evo-list">' +
      row('甲骨', '', '', '不以现代字形替代；待核对卜辞材料', '刀刻龟甲，字形以可靠出土材料为准', '#f5ece0') +
      row('金文', '', '', '不以现代字形替代；待核对铭文材料', '铸造青铜，笔画多见圆转与浑厚', '#e8dcc8') +
      row('小篆', '', '', '不以现代字形替代；可核对《说文》篆形', '秦统一文字后，以李斯篆法为标准', '#f2ece0') +
      row('隶书', 'evo-row-glyph-font evo-row-glyph-font--lishu', lishu, lishuDescription, lishuHistory) +
      row('楷书', 'evo-row-glyph-font evo-row-glyph-font--kaishu', character, '横平竖直，结构端正', '可参看欧阳询、颜真卿等楷法') +
      row('行书', 'evo-row-glyph-font evo-row-glyph-font--xingshu', character, '行笔连贯，收放相济', '王羲之以来，介于楷书与草书之间') +
      row('草书', 'evo-row-glyph-font evo-row-glyph-font--caoshu', character, '省笔连绵，笔势取胜', '张旭、怀素以飞动见长') +
      '</div></div></div>';
  }

  var grid = document.querySelector('.char-grid');
  if (!grid || grid.dataset.evolutionReady === 'true') return;
  grid.dataset.evolutionReady = 'true';

  var note = document.createElement('p');
  note.className = 'evo-source-note';
  note.innerHTML = '甲骨、金文与小篆仅在有可靠字典或考古材料可核实时展示字形，本页不以现代字体替代；隶书、楷书、行书、草书使用本站随附的授权书法字体，详见<a href="assets/fonts/README.md" target="_blank" rel="noopener noreferrer">字体许可与署名</a>。';
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
