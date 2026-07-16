# 千字文讲座 - 旁注格式开发规范

## 项目概述

一个基于静态 HTML 的《千字文》逐字精讲讲座网站，共 125 讲 + 来历篇，部署于 GitHub Pages（https://sixizi.github.io/qianziwen/）。

## 技术约束

- 纯静态 HTML + CSS + 少量 JS，无构建工具
- 不依赖任何外部 Web 字体（Google Fonts 等不可靠，跨域/网络问题）
- 不依赖 SVG 内嵌绘制古文字形（人工绘制不准确且工作量大）
- 系统字体链：`"Noto Serif SC", "Songti SC", "STSong", "SimSun", "宋体", serif`
- 必须在 Windows/macOS/Linux/iOS/Android 全平台正常渲染

## 目录结构

```
qianziwen/
├── index.html              # 总目录页，125 讲列表
├── origin.html             # 来历篇（含完整的旁注侧栏模板）
├── lecture-001.html ... lecture-125.html  # 各讲
├── css/
│   └── style.css
├── js/
│   └── nav.js
├── .gitignore
└── README.md
```

## 页面布局：anno-layout（旁注双栏格式）

这是 **必须使用** 的页面布局，参考 `origin.html`：

```html
<div class="anno-layout">

  <!-- 导航栏 -->
  <div class="navbar-wrap">
    <div class="navbar">
      <a href="lecture-001.html">← 第1讲</a>
      <span class="nav-center">千字文讲座 · <span class="nav-current">第2讲 / 125讲</span></span>
      <a href="lecture-003.html">第3讲 →</a>
    </div>
  </div>

  <!-- 主内容区 -->
  <div class="anno-main">
    <!-- hero（讲题） -->
    <div class="hero">
      <div class="hero-text">日月盈昃，辰宿列张</div>
      <div class="hero-pinyin">rì yuè yíng zè，chén xiù liè zhāng</div>
      <div class="hero-meta">第2讲</div>
      <div class="hero-divider"></div>
    </div>

    <!-- 句意通释 -->
    <div class="card">
      <div class="card-title">句意通释</div>
      <div class="interpretation">
        <div class="translation">白话翻译文字</div>
        <div class="deep-meaning">
          <p>深度解读段落...</p>
        </div>
      </div>
    </div>

    <!-- 逐字精讲（含六体演化） -->
    <div class="card">
      <div class="card-title">逐字精讲</div>
      <div class="char-grid">
        <!-- 每个字一个 char-card，见下方「六体演化」章节 -->
      </div>
    </div>

    <!-- 文化拓展 -->
    <div class="card">
      <div class="card-title">文化拓展</div>
      <div class="culture-section">
        <h3>小标题</h3>
        <p>段落内容...</p>
        <div class="culture-quote">
          引用文字<span class="source">出处</span>
        </div>
      </div>
    </div>

    <!-- 思辨讨论 -->
    <div class="card">
      <div class="card-title">思辨讨论</div>
      <div class="discussion">
        <ol>
          <li>问题1</li>
          <li>问题2</li>
        </ol>
      </div>
    </div>

    <!-- 翻页导航 -->
    <div class="page-nav">
      <a href="lecture-001.html"><span class="nav-label">上一讲</span>第1讲</a>
      <a href="index.html"><span class="nav-label">返回目录</span>总目录</a>
      <a href="lecture-003.html"><span class="nav-label">下一讲</span>第3讲</a>
    </div>
  </div><!-- anno-main -->

  <!-- ==== 术语注解侧栏 ==== -->
  <aside class="anno-sidebar" id="anno-sidebar">
    <div class="anno-sidebar-title">术语注解</div>

    <div class="anno-card" id="anno-N">
      <div class="anno-card-head">
        <span class="anno-card-num">N</span>
        <span class="anno-card-term">术语名</span>
        <span class="anno-card-py">pīn yīn</span>
      </div>
      <div class="anno-card-body">
        注解内容。<strong>重点</strong>用 strong 标签。
      </div>
    </div>
    <!-- 更多 anno-card ... -->
  </aside>

</div><!-- anno-layout -->

<!-- anno-ref 点击行为 JS -->
<script>
document.querySelectorAll('.anno-ref').forEach(function(ref) {
  ref.addEventListener('click', function(e) {
    e.preventDefault();
    var target = this.getAttribute('href').slice(1);
    var card = document.getElementById(target);
    if (card) {
      document.querySelectorAll('.anno-card.targeted').forEach(function(c) {
        c.classList.remove('targeted');
      });
      card.classList.add('targeted');
      card.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
});
</script>
<script src="js/nav.js"></script>
```

## 旁注（anno-ref）规则

1. 在正文（deep-meaning、culture-section）中，首次提到一个术语时，在其后添加 `<a class="anno-ref" href="#anno-N">N</a>`
2. 编号 N 对应侧栏 `<div class="anno-card" id="anno-N">`
3. 侧栏注解卡片必须按 N 从小到大排序
4. 每个 anno-card 包含：编号、术语名、拼音、释义（用 `<strong>` 标注关键词）
5. 注解内容要涵盖中国文化背景——经典出处、历史人物、哲学概念、考古发现
6. **不要在 char-grid（逐字精讲）区域内放 anno-ref**——逐字精讲区只放一个固定的 ref "#anno-3" 指向《说文解字》

## 六体演化（逐字精讲核心板块）

### 设计原则

**古文字阶段不展示字形**：甲骨文、金文、小篆没有标准 Unicode 字符，任何用宋体/黑体/楷体替代的方案都是错误和不诚实的。这三个阶段只用文字描述。

**隶变之后才展示字形**：隶书、楷书、行草可以用现代宋体字正确表示，正常展示即可。

### HTML 模板（每个字一个 char-card）

```html
<div class="char-card">
  <div class="char-header">
    <span class="char-display">天</span>
    <span class="char-meta">
      <strong>tiān</strong>
      <span class="char-six">六书：象形 → 指事</span>
    </span>
  </div>
  <div class="char-section">
    <div class="char-section-label">六体演化</div>
    <div class="char-section-content">
      <div class="evo-list">

        <!-- 甲骨文：只有描述，无字形，浅褐底色 -->
        <div class="evo-row" style="background:#f5ece0">
          <span class="evo-row-label">⚒ 甲骨</span>
          <span class="evo-row-desc">象人形突出头部<br><em>▸ 以人体为参照造字，头上有天</em></span>
        </div>

        <!-- 金文：只有描述，无字形，古铜底色 -->
        <div class="evo-row" style="background:#e8dcc8">
          <span class="evo-row-label">⚒ 金文</span>
          <span class="evo-row-desc">头顶加横笔强调天穹<br><em>▸ 字形趋于圆润，铸于青铜器</em></span>
        </div>

        <!-- 小篆：只有描述，无字形，淡米底色 -->
        <div class="evo-row" style="background:#f2ece0">
          <span class="evo-row-label">⚒ 小篆</span>
          <span class="evo-row-desc">从「一」「大」，线条匀称<br><em>▸ 李斯统一六国文字后的标准篆法</em></span>
        </div>

        <!-- 隶书：展示字形 -->
        <div class="evo-row">
          <span class="evo-row-label">⚒ 隶书</span>
          <span class="evo-row-glyph">天</span>
          <span class="evo-row-desc">波磔分明，蚕头燕尾<br><em>▸ 东汉隶变，化圆为方</em></span>
        </div>

        <!-- 楷书：展示字形 -->
        <div class="evo-row">
          <span class="evo-row-label">⚒ 楷书</span>
          <span class="evo-row-glyph">天</span>
          <span class="evo-row-desc">横平竖直，结构端正<br><em>▸ 沿用至今，千年不变</em></span>
        </div>

        <!-- 行草：展示字形 -->
        <div class="evo-row">
          <span class="evo-row-label">⚒ 行草</span>
          <span class="evo-row-glyph">天</span>
          <span class="evo-row-desc">兰亭序首字，俯仰生姿<br><em>▸ 天下第一行书</em></span>
        </div>

      </div>
    </div>
  </div>
  <div class="char-section">
    <div class="char-section-label">说文</div>
    <div class="char-section-content">
      <a class="anno-ref" href="#anno-3">3</a>《说文解字》：「天，颠也。至高无上，从一大。」
    </div>
  </div>
</div>
```

### 六书标注

每个字的 `char-six` 中标注六书分类：
- 象形：字形象实物（如日、月、山、水）
- 指事：抽象符号示意（如上、下、本、末）
- 会意：两个以上字合并出新意（如武=止+戈，信=人+言）
- 形声：形旁+声旁（大部分汉字，如「地」从土也声）

演进关系用箭头表示，如「象形 → 指事」。

### 描述文字要求

- 第一行：该阶段字形的最显著特征（10-15 字）
- `<em>` 行：该阶段的关键历史文化信息或书法名家参考
- 甲骨文阶段提到「刀刻」「龟甲」
- 金文阶段提到「青铜」「铸造」
- 小篆阶段提到「李斯」「秦统一文字」
- 隶书阶段提到「隶变」「蚕头燕尾」
- 楷书阶段提到具体名家（如颜真卿/柳公权/欧阳询/赵孟頫）
- 行草阶段提到具体名家（如王羲之/怀素/张旭/米芾/王铎/智永）

### CSS 样式（evo-list）

```css
.evo-list {
  display: flex;
  flex-direction: column;
  border: 1px solid var(--border);
  border-radius: 8px;
  overflow: hidden;
}
.evo-row {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 10px 14px;
  border-bottom: 1px solid var(--border);
  min-height: 48px;
}
.evo-row:last-child { border-bottom: none; }
.evo-row-label {
  font-family: var(--sans);
  font-size: 12px; font-weight: 600; color: var(--accent);
  min-width: 60px; white-space: nowrap; flex-shrink: 0;
}
.evo-row-glyph {
  font-family: var(--serif);
  font-size: 30px; font-weight: 700; color: #111;
  min-width: 44px; text-align: center; flex-shrink: 0; line-height: 1;
}
.evo-row-desc {
  font-size: 12.5px; color: var(--text-light); line-height: 1.65;
  flex: 1;
}
.evo-row-desc em {
  display: block; font-size: 11px; color: var(--gold);
  font-style: normal; margin-top: 2px;
}
```

### 古文字底色约定

| 阶段 | 背景色 | 语义 |
|------|--------|------|
| 甲骨文 | `#f5ece0` | 龟甲兽骨的暖褐 |
| 金文 | `#e8dcc8` | 青铜器锈蚀后的古铜 |
| 小篆 | `#f2ece0` | 竹简绢帛的淡米 |
| 隶书/楷书/行草 | 无背景（继承白色卡片） | 纸上书写 |

## 侧栏注解内容要求

每讲的侧栏注解应尽量丰富中国文化内容，涵盖：

1. **经典典籍**：出处、作者、成书年代、内容概述
2. **历史人物**：生卒年、身份、代表作、历史地位
3. **神话传说**：出处、情节、文化影响
4. **哲学概念**：起源、核心主张、代表人物
5. **制度民俗**：起源、运作方式、后世演变
6. **考古文物**：出土地点、年代、历史意义

每条注解 80-150 字，包含至少一个 `<strong>` 关键词。

## 字符编码要求

- 不使用 Unicode 私用区（PUA）字符，如 `𛃖`（可能显示为空格或乱码）
- 不使用 CJK 扩展 B/C/D 区的罕见字符（如 `𠀑` `𤣥` `㝢` `㣙`），这类字符在多数系统字体中缺失
- 仅使用 CJK 基本区和扩展 A 区的常用字符
- "—"（U+2014 EM DASH）可用于表示缺失的甲骨文字形

## 提交规范

- 使用描述性 commit message
- 每次提交前确保 `<div>` 开闭标签完全平衡
- 每次修改后运行验证脚本：

```bash
python3 -c "
with open('lecture-NNN.html') as f:
    c = f.read()
assert c.count('<div ') == c.count('</div>'), 'div mismatch!'
print('OK')
"
```

## 已完成的讲座

- origin.html（来历篇）：完整实现旁注双栏格式，可作为模板参考
- lecture-001.html ~ lecture-020.html：已完成 anno-layout 转换 + 侧栏注解 + 六体演化
- lecture-021.html ~ lecture-125.html：简单的单栏格式，**未添加**旁注和六体演化

## 待办

- [ ] lecture-021 ~ lecture-125 加上 anno-layout 旁注格式
- [ ] lecture-002 ~ lecture-020 六体演化板块加入（当前可参考 lecture-001.html）
- [ ] 所有 char-card 加入六书标注
- [ ] 手机端响应式测试和优化
