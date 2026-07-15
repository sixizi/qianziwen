#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""千字文讲座 HTML 生成器"""

import os
import html

OUTPUT_DIR = os.path.dirname(os.path.abspath(__file__))

def gen_char_card(c):
    fields = []
    if c.get("origin"):
        fields.append(f'<div class="char-section"><div class="char-section-label">字形源流</div><div class="char-section-content">{html.escape(c["origin"])}</div></div>')
    if c.get("primary"):
        fields.append(f'<div class="char-section"><div class="char-section-label">本义</div><div class="char-section-content">{html.escape(c["primary"])}</div></div>')
    if c.get("extended"):
        fields.append(f'<div class="char-section"><div class="char-section-label">引申义</div><div class="char-section-content">{html.escape(c["extended"])}</div></div>')
    if c.get("usage"):
        fields.append(f'<div class="char-section"><div class="char-section-label">常用词与成语</div><div class="char-section-content">{html.escape(c["usage"])}</div></div>')
    return f'''<div class="char-card">
<div class="char-header"><span class="char-display">{c["char"]}</span><span class="char-meta"><strong>{c["pinyin"]}</strong></span></div>
{"".join(fields)}
</div>'''

def gen_culture(sections):
    parts = []
    for s in sections:
        parts.append(f'<h3>{html.escape(s["title"])}</h3>')
        parts.append(s["content"])
    return "".join(parts)

def gen_discussion(items):
    lis = "".join(f"<li>{html.escape(q)}</li>" for q in items)
    return f'<ol>{lis}</ol>'

def gen_html(lec, prev_num, next_num, total=125):
    num = lec["num"]
    prev_link = f'lecture-{prev_num:03d}.html' if prev_num > 0 else 'index.html'
    next_link = f'lecture-{next_num:03d}.html' if next_num <= total else 'index.html'
    prev_label = f'第{prev_num}讲' if prev_num > 0 else '目录'
    next_label = f'第{next_num}讲' if next_num <= total else '目录'

    char_cards = "".join(gen_char_card(c) for c in lec["chars"])
    culture_html = gen_culture(lec["culture_sections"])
    discussion_html = gen_discussion(lec["discussion"])

    return f'''<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>千字文讲座 · 第{num}讲 · {lec["text"]}</title>
<link rel="stylesheet" href="css/style.css">
</head>
<body>
<script>window.prevUrl="{prev_link}";window.nextUrl="{next_link}";</script>
<div class="navbar">
<a href="{prev_link}">← 上一讲</a>
<span class="nav-center">千字文讲座 · <span class="nav-current">第{num}讲 / {total}讲</span></span>
<a href="{next_link}">下一讲 →</a>
</div>
<div class="container">
<div class="hero">
<div class="hero-text">{lec["text"]}</div>
<div class="hero-pinyin">{lec["pinyin"]}</div>
<div class="hero-meta">第{num}讲</div>
<div class="hero-divider"></div>
</div>

<div class="card">
<div class="card-title">句意通释</div>
<div class="interpretation">
<div class="translation">{lec["translation"]}</div>
<div class="deep-meaning">{lec["deep_meaning"]}</div>
</div>
</div>

<div class="card">
<div class="card-title">逐字精讲</div>
<div class="char-grid">{char_cards}</div>
</div>

<div class="card">
<div class="card-title">文化拓展</div>
<div class="culture-section">{culture_html}</div>
</div>

<div class="card">
<div class="card-title">思辨讨论</div>
<div class="discussion">{discussion_html}</div>
</div>

<div class="page-nav">
<a href="{prev_link}"><span class="nav-label">上一讲</span>{prev_label}</a>
<a href="index.html"><span class="nav-label">返回目录</span>总目录</a>
<a href="{next_link}"><span class="nav-label">下一讲</span>{next_label}</a>
</div>
</div>
<script src="js/nav.js"></script>
</body>
</html>'''


def generate_all(lectures):
    total = len(lectures)
    for i, lec in enumerate(lectures):
        prev_num = lec["num"] - 1
        next_num = lec["num"] + 1
        html_content = gen_html(lec, prev_num, next_num, total)
        filename = f'lecture-{lec["num"]:03d}.html'
        filepath = os.path.join(OUTPUT_DIR, filename)
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(html_content)
        print(f'  generated: {filename}')
    print(f'Done: {total} lectures generated.')


if __name__ == '__main__':
    from data import LECTURES
    generate_all(LECTURES)
