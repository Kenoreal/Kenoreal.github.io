/* ============================================================
   《青年政治论坛》全站共享脚本
   功能：注入顶部导航与页脚 / 移动端菜单 / 滚动状态 /
         文章页阅读进度条 / 卡片滚动显现 / 订阅表单（演示）
   说明：公共页眉页脚集中在此维护，改一处即全站生效。
   ============================================================ */
(function () {
  "use strict";

  /* 标记 JS 可用：滚动显现动画只在本类存在时生效（无 JS 时内容全部可见） */
  document.documentElement.classList.add("js");

  /* 文章页位于 /articles/ 子目录，需要回退一级 */
  var ROOT = /\/articles\//.test(location.pathname) ? "../" : "";

  var NAV = [
    { id: "home",         cn: "首页",     href: "index.html" },
    { id: "politics",     cn: "全球政治", href: "section-politics.html" },
    { id: "economy",      cn: "全球经济", href: "section-economy.html" },
    { id: "civilization", cn: "全球文明", href: "section-civilization.html" },
    { id: "governance",   cn: "全球治理", href: "section-governance.html" },
    { id: "about",        cn: "关于我们", href: "about.html" }
  ];

  function sealSvg(size) {
    return '<svg class="seal" width="' + size + '" height="' + size + '" viewBox="0 0 64 64" aria-hidden="true">'
      + '<rect width="64" height="64" rx="7" fill="#a6192e"/>'
      + '<text x="32" y="46" font-size="37" fill="#ffffff" text-anchor="middle" '
      + 'font-family="\'Noto Serif SC\',\'Songti SC\',\'SimSun\',serif" font-weight="700">青</text>'
      + "</svg>";
  }

  /* ---------- 顶部通栏 + 站点页眉 ---------- */
  var headerHtml = ''
    + '<div class="topbar"><div class="container topbar-in">'
    +   '<span>2026年秋季刊 · 总第1期 · 主题「秩序重构」</span>'
    +   '<span class="topbar-links">'
    +     '<a href="' + ROOT + 'submit.html">投稿指南</a>'
    +     '<a href="' + ROOT + 'about.html#contact">联系我们</a>'
    +   '</span>'
    + '</div></div>'
    + '<header class="site-header"><div class="container header-in">'
    +   '<a class="brand" href="' + ROOT + 'index.html" aria-label="青年政治论坛 首页">'
    +     sealSvg(42)
    +     '<span class="brand-word"><span class="brand-cn">青年政治论坛</span><br>'
    +     '<span class="brand-en">Youth Political Review</span></span>'
    +   '</a>'
    +   '<button class="nav-toggle" id="navToggle" aria-expanded="false" aria-controls="mainNav" aria-label="打开菜单">'
    +     '<span></span><span></span><span></span>'
    +   '</button>'
    +   '<nav class="main-nav" id="mainNav" aria-label="主导航">'
    +     NAV.map(function (item) {
        return '<a href="' + ROOT + item.href + '" data-nav="' + item.id + '">' + item.cn + "</a>";
      }).join("")
    +     '<a class="nav-cta" href="' + ROOT + 'submit.html"><span class="btn btn--crimson">投 稿</span></a>'
    +   '</nav>'
    + '</div></header>';

  /* ---------- 页脚 ---------- */
  var footerHtml = ''
    + '<footer class="site-footer">'
    + '<div class="container footer-main">'
    +   '<div class="footer-brand">'
    +     '<a class="brand" href="' + ROOT + 'index.html">' + sealSvg(38)
    +     '<span class="brand-word"><span class="brand-cn">青年政治论坛</span><br>'
    +     '<span class="brand-en">Youth Political Review</span></span></a>'
    +     '<p>一份由青年学人主笔的全球事务评论期刊。设全球政治、全球经济、全球文明、全球治理四大板块，以青年之眼观察世界秩序的变迁。</p>'
    +   '</div>'
    +   '<nav aria-label="栏目导航"><h4>栏目</h4><ul class="footer-links">'
    +     '<li><a href="' + ROOT + 'section-politics.html">全球政治</a></li>'
    +     '<li><a href="' + ROOT + 'section-economy.html">全球经济</a></li>'
    +     '<li><a href="' + ROOT + 'section-civilization.html">全球文明</a></li>'
    +     '<li><a href="' + ROOT + 'section-governance.html">全球治理</a></li>'
    +   '</ul></nav>'
    +   '<nav aria-label="快速链接"><h4>快速链接</h4><ul class="footer-links">'
    +     '<li><a href="' + ROOT + 'about.html">关于我们</a></li>'
    +     '<li><a href="' + ROOT + 'about.html#team">编辑团队</a></li>'
    +     '<li><a href="' + ROOT + 'submit.html">投稿指南</a></li>'
    +     '<li><a href="' + ROOT + 'about.html#contact">联系方式</a></li>'
    +   '</ul></nav>'
    +   '<div class="footer-news" id="newsletter"><h4>订阅通讯</h4>'
    +     '<p>每月一封，精选四大板块深度评论与下期预告。</p>'
    +     '<form class="news-form" id="newsForm">'
    +       '<input type="email" required placeholder="您的邮箱地址" aria-label="邮箱地址">'
    +       '<button type="submit">订 阅</button>'
    +     '</form>'
    +     '<p class="news-ok" id="newsOk" hidden>感谢订阅！本站为演示模板，正式上线前请接入邮件服务。</p>'
    +   '</div>'
    + '</div>'
    + '<div class="container"><div class="footer-bottom">'
    +   '<span>© <span id="fYear">2026</span> 《青年政治论坛》Youth Political Review · 保留所有权利</span>'
    +   '<span>编辑部来信：<a href="mailto:sduasgg2025920@163.com" style="color:#8fa0bd">sduasgg2025920@163.com</a> · 创刊号内容为示例文稿</span>'
    + '</div></div>'
    + '</footer>';

  /* ---------- 注入 ---------- */
  function inject(id, html) {
    var el = document.getElementById(id);
    if (el) el.innerHTML = html;
  }
  inject("site-chrome-top", headerHtml);
  inject("site-chrome-footer", footerHtml);

  /* ---------- 跳至正文（无障碍） ---------- */
  var mainEl = document.querySelector("main");
  if (mainEl && !mainEl.id) mainEl.id = "main";
  var skip = document.createElement("a");
  skip.className = "skip-link";
  skip.href = "#main";
  skip.textContent = "跳至正文";
  document.body.insertBefore(skip, document.body.firstChild);

  /* ---------- 返回顶部按钮 ---------- */
  var topBtn = document.createElement("button");
  topBtn.className = "to-top";
  topBtn.type = "button";
  topBtn.setAttribute("aria-label", "返回顶部");
  topBtn.innerHTML = "↑";
  topBtn.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
  document.body.appendChild(topBtn);
  window.addEventListener("scroll", function () {
    topBtn.classList.toggle("is-show", window.scrollY > 600);
  }, { passive: true });

  /* ---------- 当前页导航高亮 ---------- */
  var page = document.body.getAttribute("data-page");
  var current = document.querySelector(".main-nav a[data-nav='" + page + "']");
  if (current) current.classList.add("is-active");

  /* ---------- 移动端菜单 ---------- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("mainNav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "关闭菜单" : "打开菜单");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* ---------- 页眉滚动阴影 ---------- */
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  /* ---------- 文章页阅读进度条 ---------- */
  if (document.body.getAttribute("data-template") === "article") {
    var bar = document.createElement("div");
    bar.className = "progress";
    document.body.appendChild(bar);
    window.addEventListener("scroll", function () {
      var h = document.documentElement;
      var max = h.scrollHeight - h.clientHeight;
      bar.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    }, { passive: true });
  }

  /* ---------- 卡片滚动显现 ---------- */
  var reveals = document.querySelectorAll(".reveal");
  function revealAll() {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  }
  if ("IntersectionObserver" in window && reveals.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "120px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
    /* 兜底：3 秒后仍未显现的元素直接显示（覆盖打印/截图/极端场景） */
    window.setTimeout(revealAll, 3000);
  } else {
    revealAll();
  }

  /* ---------- 订阅表单（演示） ---------- */
  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "newsForm") {
      e.preventDefault();
      var ok = document.getElementById("newsOk");
      if (ok) ok.hidden = false;
      e.target.reset();
    }
  });

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById("fYear");
  if (year) year.textContent = new Date().getFullYear();
})();
