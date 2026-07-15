// 千字文讲座 - 导航辅助
document.addEventListener('DOMContentLoaded', function() {
  // 键盘左右翻页
  document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft' && window.prevUrl) {
      window.location.href = window.prevUrl;
    }
    if (e.key === 'ArrowRight' && window.nextUrl) {
      window.location.href = window.nextUrl;
    }
  });

  // 目录搜索
  var searchBox = document.getElementById('search-input');
  if (searchBox) {
    searchBox.addEventListener('input', function() {
      var keyword = this.value.trim().toLowerCase();
      var links = document.querySelectorAll('.lecture-link');
      links.forEach(function(link) {
        var text = link.textContent.toLowerCase();
        link.style.display = text.indexOf(keyword) !== -1 ? '' : 'none';
      });
    });
  }

  // 进度记忆
  var currentPath = window.location.pathname;
  if (currentPath.indexOf('lecture-') !== -1) {
    localStorage.setItem('qzw-last-lecture', currentPath);
  }

  // 回到上次阅读位置
  var resumeBtn = document.getElementById('resume-btn');
  if (resumeBtn) {
    var last = localStorage.getItem('qzw-last-lecture');
    if (last) {
      resumeBtn.href = last;
      resumeBtn.style.display = '';
    }
  }
});
