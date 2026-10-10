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
    +   '<div class="header-actions">'
    +     '<button class="icon-btn" id="searchToggle" type="button" aria-label="搜索" title="搜索 (Ctrl+K)">'
    +       '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/></svg>'
    +     '</button>'
    +     '<button class="lang-toggle" id="langToggle" type="button" aria-label="切换到英文">EN</button>'
    +   '</div>'
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
    +     '<p class="news-ok" id="newsOk" hidden></p>'
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

  /* ---------- 站内搜索（懒加载 search.js，Ctrl+K / 点击打开） ---------- */
  var searchBtn = document.getElementById("searchToggle");
  function openSearch() {
    if (window.YPRSearch) { window.YPRSearch.open(); }
  }
  if (searchBtn) searchBtn.addEventListener("click", openSearch);
  document.addEventListener("keydown", function (e) {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      openSearch();
    }
  });

  /* 语言按钮：英文模式下显示「中文」 */
  var langBtn = document.getElementById("langToggle");
  if (langBtn && (localStorage.getItem("ypr-lang") || "zh") === "en") {
    langBtn.textContent = "中文";
  }

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

  /* ---------- 订阅表单（真实可用） ----------
     默认通过邮件客户端向编辑部邮箱发送预填的订阅请求；
     若接入 Formspree 等表单服务，把地址填入 YPR_NEWSLETTER_ENDPOINT 即自动切换。 */
  window.YPR_NEWSLETTER_ENDPOINT = ""; // 例如 "https://formspree.io/f/xxxxxx"
  var NEWS_TO = "sduasgg2025920@163.com";

  document.addEventListener("submit", function (e) {
    if (e.target && e.target.id === "newsForm") {
      e.preventDefault();
      var form = e.target;
      var input = form.querySelector("input[type='email']");
      var email = (input && input.value || "").trim();
      var ok = document.getElementById("newsOk");
      var isEN = document.documentElement.lang === "en";
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
      if (ok) {
        ok.hidden = false;
        if (!valid) {
          ok.textContent = isEN ? "Please enter a valid email address." : "邮箱格式好像不对，请检查后重试。";
          ok.style.color = "#e08a96";
          return;
        }
      } else if (!valid) { return; }

      var endpoint = window.YPR_NEWSLETTER_ENDPOINT;
      if (endpoint) {
        ok.textContent = isEN ? "Submitting…" : "正在提交…";
        ok.style.color = "";
        fetch(endpoint, {
          method: "POST",
          headers: { "Accept": "application/json", "Content-Type": "application/json" },
          body: JSON.stringify({ email: email })
        }).then(function (r) {
          ok.textContent = r.ok
            ? (isEN ? "Subscribed! A confirmation will arrive in your inbox." : "订阅成功！确认邮件将发送到你的邮箱。")
            : (isEN ? "Something went wrong — please try again later." : "提交失败，请稍后重试或直接致信编辑部。");
          ok.style.color = "";
          if (r.ok) form.reset();
        }).catch(function () {
          ok.textContent = isEN ? "Network error — please try again later." : "网络异常，请稍后重试或直接致信编辑部。";
          ok.style.color = "#e08a96";
        });
      } else {
        var subject = isEN ? "Newsletter subscription — Youth Political Review" : "订阅通讯 — 青年政治论坛";
        var mailBody = (isEN
          ? "Please add me to the Youth Political Review newsletter.\nEmail: "
          : "请将我添加到《青年政治论坛》通讯订阅列表。\n邮箱：") + email;
        location.href = "mailto:" + NEWS_TO + "?subject=" + encodeURIComponent(subject)
          + "&body=" + encodeURIComponent(mailBody);
        ok.textContent = isEN
          ? "Your mail app has opened with a pre-filled request — press send to finish subscribing."
          : "已为你打开邮件客户端并填好订阅请求，点击发送即可完成订阅。";
        ok.style.color = "";
        form.reset();
      }
    }
  });

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById("fYear");
  if (year) year.textContent = new Date().getFullYear();
})();


/* ============================================================
   英文版文章正文（Editorial English editions, compiled by the editors）
   ============================================================ */

/* 英文正文数据（由编辑部编译） */
window.YPRBODIES = {

"editorial": "<p>This journal is born into an age routinely described as \"disordered.\" The old arguments no longer convince, and no new consensus has formed: tariffs are diplomatic language again, war has returned to the continental interior, and algorithms re-allocate attention and truth. Much commentary calls this a crisis — but a crisis, in its original sense, is a turning point: the moment when an old grammar fails and the vocabulary of the new one is not yet written.</p><p>We launch the Youth Political Review at such a moment not because we hold answers, but because we believe the list of questions must be redrawn by the generation that will live longest in the world it describes.</p><h2>I. Why a \"Forum\"</h2><p>We chose \"Forum\" deliberately, over \"Review.\" A review presumes an authoritative judge; a forum presumes an equal seat for every serious speaker. Here, IR scholars and anthropological fieldworkers, finance practitioners and museum curators, policy researchers and independent writers are invited into one circle — on a single condition: honest argument, solid evidence, and open positions.</p><p>The journal has four sections — global politics, global economy, global civilization, global governance — but we do not think the world divides neatly into four. Industrial policy is economics and politics at once; the climate bill is governance and justice; a museum vitrine sits at the border of civilization and national narrative. Sections are signposts, not walls.</p><h2>II. How We Read \"Disorder\"</h2><p>Disorder is not chaos, and it is not apocalypse. Describing the present as total collapse is rhetorical laziness; pretending all is well is a dereliction of perception. What is really underway is a long grammatical transition: the efficiency-first globalization is being rewritten by security and resilience; the one-way narrative of modernization is being corrected by plural civilizational experience; governance once monopolized by states is spilling over to cities, firms, communities and individuals.</p><blockquote><p>\"Order is not discovered; it is narrated and practiced.\"<span class=\"q-src\">— epigraph of the inaugural theme, \"Rewriting Order\"</span></p></blockquote><p>Hence our inaugural theme. The rise of the Global South is rewriting the distribution of power; the return of industrial policy is rewriting the grammar of markets; the restart of civilizational dialogue is rewriting the borders of identity; youth taking seats at negotiating tables is rewriting the temporality of politics. Four stories, one subtext: the world is being retold, and the storytellers are no longer few.</p><h2>III. Youth: Present, Not Pending</h2><p>The most common rhetorical move in public discussion is to treat the young as an object awaiting definition: \"How should youth face a broken world?\" We refuse the sentence. Young people are not the world's heirs — in time, we are its present shareholders. The climate bill is booked in our names; technical rules run through our professions; new political vocabularies are coined in our feeds.</p><p>Our position is therefore: presence. Presence as writers, as researchers, as citizens. The first act of presence is to look carefully — at data without ready conclusions, at opponents without positional reflexes, at ourselves without nostalgic filters. That is what we ask of every manuscript.</p><h2>IV. The Humility and the Ambition of a Journal</h2><p>We know a youth journal cannot change a tariff schedule or stop a war. But the texture of public life is never decided by high politics alone; it accumulates from the quality of classroom debate, the narrative choices of media, the habits of participation in one's community. Writing is itself a form of governance: turning vague resentment into clear questions, translating opposed positions into arguable propositions.</p><p>This is the first editorial, and the beginning of a long commitment. Submit, criticize, bring us what you see — a seat at this forum is always kept for a serious speaker.</p>",

"global-south-order": "<p>In the international news of 2026, one phrase is hard to avoid: the \"Global South.\" It appears in the communiqués of an expanded BRICS, in G20 family photos, and in the vocabulary of crisis diplomacy. A concept once confined to development economics has become one of the most powerful mobilizing symbols in international politics.</p><p>But symbols rise before substance does. To understand what the Global South means, we must first ask a more basic question: where did it come from, and why has it returned now?</p><h2>I. From Geography to Politics: A Concept's Century-Long Journey</h2><p>\"South\" is ancient as a compass point and modern as a political idea. Its political life began with the construction of the \"North–South problem\": at Bandung in 1955, twenty-nine newly independent Asian and African states appeared together as a bloc of non-alignment; in 1977 the Brandt Commission drew a line across the world map, dividing the globe into North and South. From then on, \"South\" meant not latitude but a shorthand for the development gap and a shared historical position.</p><blockquote><p>\"The Chinese delegation came to seek common ground, not to create division.\"<span class=\"q-src\">— Zhou Enlai, Bandung Conference, 1955</span></p></blockquote><p>After the Cold War the concept fell silent: ideological rivalry ended, and the \"end of history\" seemed to cancel the imagination of alternative orders. Its true revival came after 2022 — when most Southern states declined to take sides in the Ukraine crisis, BRICS carried out a historic expansion, and the African Union won a permanent G20 seat. The Global South completed a crucial turn: from the described object to the self-declared subject.</p><h2>II. The Material Bases: Three Awakenings</h2><p>A concept becomes popular because reality pushes it. First, the drift of economic weight: by purchasing-power parity, emerging and developing economies now exceed the advanced economies in global output, and the engine of growth has moved to the old \"South.\" Second, the consolidation of issue coalitions: on climate finance, debt restructuring and food security, Southern states found their agendas closer to each other's than to the North's — what they want is not to change camps but to rewrite rules. Third, the multiplication of platforms: from BRICS to the SCO, from the New Development Bank to regional payment arrangements, the South for the first time holds a parallel menu of options.</p><p>All three point to the same essence: the reassertion of development as a right. The Southern demand is no longer aid and accommodation, but representation, pricing power and rule-making power.</p><h2>III. Limits and Tensions: The South Is Not a Bloc</h2><p>The Global South is not a country, nor even an interest group. Structural competition within, divisions between energy exporters and the least developed on transition issues, and thin intra-South trade and investment networks all remind us: a bracket holding billions can be torn apart by its own contents.</p><p>A deeper tension lies between discourse and capability. As the Global South becomes a flag everyone claims, it risks instrumentalization: is the fight for the flag, or for the substance beneath it? Without real changes in voice within multilateral institutions, in the pricing of key commodities, in cross-border settlement networks, the \"rise of the South\" may remain a family photo.</p><h2>IV. Conclusion: The Politics of Imagination</h2><p>The international order is never only a distribution of power; it is also a competition of narratives. The most important meaning of the Global South lies not in what it has built, but in the imagination it has reopened: the world can have more than one center; rules can be written by more than one hand.</p><p>For young researchers this is precisely the field worth entering. The new order will not be finalized at any single summit; it is being slowly written, negotiation by negotiation, technical standard by technical standard, silent compromise by silent compromise. To observe it, record it, take part in it — that is why this journal was founded, and the agenda this section will keep tracking.</p>",

"climate-generational-justice": "<p>At each annual UN climate conference, one of the starkest contrasts is the age gap between the negotiators at the table and the young faces marching outside. Climate politics is completing a quiet turn: no longer a technical negotiation over energy structures and emission quotas, it has become a question of intergenerational justice — who bears the consequences, and who owns the future.</p><p>The turn is no accident. Climate change has a property that disables conventional political machinery: the timescale of decisions is counted in years; the timescale of consequences, in generations.</p><h2>I. Mismatched Time: Why Climate Is Generational by Nature</h2><p>Today's warming comes from a century of cumulative emissions; today's choices will decide sea levels, heatwaves and crop belts fifty years on. The greatest stakeholders of climate policy are therefore people not yet born and unable to vote. Representative democracy runs on four-to-five-year cycles and struggles to price the voteless: economists call it \"intertemporal discounting\"; political scientists see a \"temporal gap in representation.\"</p><p>The gap does not close by itself. But it has begun to be seen — by the generation once \"represented\" by proxy, now stepping forward.</p><h2>II. From the Gallery to the Table: Three Modes of Entry</h2><p>The first mode is street and courtroom. Beyond the global climate marches, the decisive shift is judicial: from Europe to Latin America, young plaintiffs have sued states and corporations over the rights to life and health. In 2025 the International Court of Justice issued an advisory opinion on states' climate obligations, confirming for the first time at the global legal level a framework of responsibility across generations — a process set in motion by a legal initiative of Pacific Island youth.</p><p>The second mode is a seat inside the talks. After the Paris Agreement, COPs gradually formalized the role of youth delegations; youth NGOs hold observer status, and some national delegations now include youth climate advisers — not as ornament but as procedural carriers of \"future interests.\"</p><p>The third mode is institutional design. Wales has a Future Generations Commissioner; several countries require intergenerational impact assessments for major policy. The youth demand is settling from slogan into procedure.</p><blockquote><p>\"We are not negotiating for a distant future; we are negotiating for a present that was pre-decided.\"<span class=\"q-src\">— a youth delegate outside the COP plenary (sample quotation)</span></p></blockquote><h2>III. Rebuilding the Generational Contract: From Presence to Weight</h2><p>Presence is not yet weight. What youth truly demand is to turn intergenerational fairness from preambular rhetoric into enforceable rules: tie emissions pathways to intergenerational impact assessments; deliver loss-and-damage funds to affected communities; make transition timetables accountable. The agenda after COP30 will test whether \"youth presence\" is symbolic posture or structural change.</p><p>The generational turn in climate governance teaches a more general lesson: the legitimacy of global governance ultimately rests on its attitude toward time — on whether it takes seriously those who have not yet arrived. Youth at the table is not generational conflict but a correction of political time. It is also a standing concern of this section: the craft of governing the future begins with the ethics of listening to it.</p>",

"civilizational-dialogue": "<p>In 1993 a political scientist argued in Foreign Affairs that the main axis of post-Cold War conflict would be cultural rather than ideological or economic — the \"clash of civilizations\" was born, and for thirty years it was cited, tested and contested by reality. Today the high-frequency words of the global agenda are a different set: dialogue among civilizations, mutual learning, the Global Civilization Initiative.</p><p>From clash to dialogue is more than a change of rhetoric. It is a contest between two views of civilization: are civilizations bounded entities facing off, or flowing processes that constitute one another?</p><h2>I. The Prophecy, and How It Failed</h2><p>Fairly read, the \"clash\" thesis reminded the world that the Cold War's end would not homogenize history, and that cultural identity remains a deep grammar of political mobilization. But its failure is equally instructive: the worst wars of the past three decades happened within civilizations rather than between them. To read Srebrenica, Aleppo and Kabul as instances of one fault-line logic conceals the more concrete causes — colonial legacy, geopolitical rivalry, governance failure.</p><p>The deeper flaw is methodological: the thesis presumes \"civilization\" as a unified actor, as if a billion people shared one immutable kernel and one authorized spokesman. This is precisely the \"civilizational essentialism\" historians have criticized.</p><blockquote><p>\"Civilizations die from suicide, not by murder.\"<span class=\"q-src\">— Arnold Toynbee, A Study of History</span></p></blockquote><h2>II. The Politics of Dialogue: From Idea to Mechanism</h2><p>Dialogue is not utopian. The UN established the Alliance of Civilizations two decades ago; UNESCO has long funded joint research on shared heritage; recent initiatives have moved mutual learning from seminar to diplomacy; and the successful joint World Heritage serial nominations along the Silk Roads demonstrate another possibility — civilizational narratives told by co-authors rather than owners.</p><p>What these mechanisms share is the reduction of civilization from \"subject\" to \"relation\": what matters is not what each civilization is, but what each has given the other in long encounters — papermaking westward and astronomical tables eastward, the translation movement and Europe's China fever, the Hellenized face of Buddhist art in Gandhara. The history of civilization is, nearly everywhere, a history of exchange.</p><h2>III. Beyond Binary: Three Premises of Mutual Learning</h2><p>For mutual learning to be more than a new slogan, at least three premises are needed. First, refuse essentialism: every civilization is polyphonic, with multiple traditions contesting its \"orthodoxy.\" Second, face asymmetry: dialogue occurs in the shadow of unequal power; mutual learning is not warm mutual salutation but includes hard critical self-examination. Third, land in the tangible: curricula, museum narratives, translation and publishing, co-produced film — civilizational relations grow in the concrete experience ordinary people have of each other's texts and faces.</p><p>This section has no standard answer to offer. What we want is to turn civilization from an object into a subject: not a civilization to be defined, represented or saved, but civilizations that renew themselves and complete one another. That is a scholarly position — and the posture of a youth journal.</p>",

"supply-chain-industrial-policy": "<p>If the keyword of the past forty years of the world economy was \"efficiency,\" the keyword of this decade is becoming \"security.\" Semiconductor subsidy races, critical-mineral export controls, friend-shoring and near-shoring — these intertwined practices announce a turn of eras: industrial policy, close to taboo in the Washington-consensus years, has returned to the center of global economic debate.</p><blockquote><p>\"Efficiency tells us where production is cheapest; security tells us where it is safest. When the two conflict, we are learning to pay for security.\"<span class=\"q-src\">— the author</span></p></blockquote><h2>I. From the Washington Consensus to Friend-Shoring</h2><p>To understand the turn, return to globalization's golden age. In the three decades after the Cold War, falling tariffs, the container and the information revolution let multinationals organize production for global profit maximization: chips designed in America, fabricated in East Asia, packaged in Southeast Asia, assembled in China and Vietnam. This chain perfected comparative advantage — and credited vertical specialization with much of world growth.</p><p>The cracks showed first in the pandemic: missing containers and unavailable automotive chips exposed the fragility of just-in-time. Then geopolitics turned fragility into a weapon — export controls, entity lists, secondary sanctions — and every government discovered that supply chains are not merely commercial arrangements but liabilities on the balance sheet of national security.</p><h2>II. The Three Logics of Industrial Policy</h2><p>Today's industrial-policy revival is not one phenomenon but at least three logics running at once. The security logic: re-shoring and duplicating choke-point segments, as in the vast subsidies for semiconductors and critical minerals. The green logic: climate targets require rebuilding energy and transport systems within a decade — a capital recomposition no carbon price alone can finance. The employment logic: the political pressure of shrinking middle classes has made \"manufacturing's return\" a cross-party campaign language.</p><p>The three logics are not always compatible. Security wants redundancy and dispersion; efficiency wants concentration and scale; green targets and jobs collide in old industrial regions. The practice of industrial policy is a continuous arbitration among them.</p><h2>III. Transformation, Not Decoupling: The Next Chapter of Globalization</h2><p>To call all this \"de-globalization\" is inaccurate. Total trade has not collapsed; its structure is changing: intra-regional shares are rising; \"connector countries\" — Mexico, Vietnam, Morocco, Poland — are the great beneficiaries of restructuring; services and data flows keep gaining weight; multinationals balance \"in China, for China\" against \"China plus one.\"</p><p>The more precise formulation: globalization is shifting from a single-logic (efficiency) system to one where multiple logics — efficiency, security, green, employment — compete. The result is a slower, dearer, more political world economy. For researchers, the real question is no longer the stale binary of whether industrial policy \"works,\" but: what structure of industrial governance can hold these conflicting goals together without suffocating innovation?</p><p>There is no ready answer — it belongs to those writing the next chapter.</p>",

"populism-representation": "<p>Over the past decade, from Buenos Aires to Budapest, from Washington to New Delhi, \"populism\" has been the most used and most muddled word in political commentary. Beneath the label lies an older question: when the machinery of representation decouples from the actual demands of voters, who is entitled to say \"we\"?</p><p>The deep soil of populism is not an imported ideological virus but a representational crisis within representative institutions themselves.</p><h2>I. Loosening Bonds: Where Did the Parties' Base Go?</h2><p>In the classical ideal of representative government, parties are the organized expression of society: unions, churches, farm and industry associations aggregate demands into programs and feed them into parliaments. That picture has dissolved — party membership has collapsed across established democracies, voting has shifted from class identity to issue identity, and the \"floating voter\" is the new normal of electoral politics.</p><p>Populist parties fill exactly this vacuum. Bypassing intermediary organizations, they appeal through social media and personalist leadership to an imagined homogeneous \"people,\" casting opponents as detached, corrupt \"elites.\" Their power lies not in programs but in posture: the claim to be the sole representative of the real people.</p><h2>II. Rebuilding Responsiveness: A Checklist of Democratic Experiments</h2><p>Criticizing populism is easy; answering its question is hard: how do the represented become heard again? Recent experiments offer partial clues: participatory budgeting lets residents decide part of public spending; citizens' assemblies convene randomly selected laypeople to deliberate complex questions, and have fed into constitutions and climate law in several countries; digital petitions and deliberation platforms keep lowering the cost of participation.</p><p>The common direction is to extend democracy from \"periodic authorization\" to \"continuous responsiveness.\" Representation will not die, but it must learn to coexist with more direct forms of participation. For the young this is both an academic and a practical question — after all, the generation born into the network era is the best placed to design responsive democracy.</p>",

"algorithm-polarization": "<p>In public discussion of social media and democracy, \"echo chambers,\" \"filter bubbles\" and \"fake news\" have become premises that no longer require argument — as if algorithms must produce polarization and platforms must dissolve consensus. Yet the empirical picture of recent years is far more complicated — too complicated to vindicate anyone's slogan.</p><h2>I. From the Square to the Feed: A Structural Transformation of the Public Sphere</h2><p>The ideal public sphere — cafés, salons, op-ed pages — rested on two conditions: exposure to heterogeneous views, and persuasion by argument rather than identity. Algorithmic distribution changed both: feeds are personalized by preference, and identity became the most efficient currency of transmission. Anger travels; the middle falls silent.</p><p>But polarization did not begin with the algorithm. Political science had documented hardening party identities since the television age; the algorithm attached a new engine to an old trend. To blame a complex historical process on a single technology is itself a narrative shortcut.</p><h2>II. Real and False Polarization: What the Evidence Says</h2><p>Across the literature, three findings are comparatively robust. First, algorithms do reinforce selective exposure, but most users' actual information diets are more diverse than assumed — search, family forwarding and workplace contexts all smuggle in heterogeneity. Second, the transmission advantage of emotional content comes primarily from users' sharing decisions rather than the recommender itself; changing the algorithm is easier than changing hearts. Third, the most corrosive polarization is not the divergence of opinions but of affect — treating opponents as enemies rather than compatriots — and online it is no worse than off.</p><p>For platform governance this means finer tools: transparency obligations for recommenders, user-selectable feeds, precision action against coordinated manipulation — likely more effective than blanket throttling. And for each of us the question is plainer: the quality of public discussion finally depends on whether discussants want to win, or to understand.</p>",

"dollar-system": "<p>Every few years international finance revisits the \"end of the dollar.\" What differs this time is the fuel: large-scale financial sanctions have torn a hole in the presumption of dollar neutrality. When the settlement network can become a weapon, holding dollar assets is no longer a purely commercial calculation — it includes the pricing of political risk.</p><h2>I. The Weaponization Paradox</h2><p>Monetary power is double-edged. Each use of sanctions reminds others to diversify: bilateral local-currency settlement agreements multiply, multi-CBDC bridge projects advance, regional payment arrangements go live, and central-bank gold purchases have run at historic highs for years. The absolute scale remains small, but the direction is consistent — the international monetary system is drifting from \"unipolar plus periphery\" toward \"one primary, several auxiliary.\"</p><p>The paradox: weaponization consumes both sources of dollar power at once — convenience and neutrality. The more often it is used, the stronger the incentive to replace it; yet if never used, deterrence itself evaporates.</p><h2>II. The Moats Remain: Three Thresholds for Any Challenger</h2><p>A crack is not a collapse. The history of monetary replacement says challengers must cross three thresholds. Network effects: a currency's value rises with the number of its users, and switching costs are borne by all — coordination is inherently hard. Market depth: the Treasury market remains the only pool deep enough to absorb trillions of safe-haven flows; such liquidity is not built in a day. Institutional trust: convertibility, predictable rule of law, central-bank independence — precisely the conditions that alternative candidates find slowest to build.</p><p>The realistic picture is therefore not \"the dollar's collapse\" but \"layered multipolarity\": commodity invoicing diversifies gradually, regional monetary cooperation deepens — while the top of the global financial architecture remains dollar-based for the visible future. What is worth tracking is not the slogan but the pace of erosion at the edges.</p>",

"green-transition-funds": "<p>The hardest questions at the climate table are never scientific but arithmetical: where does the money come from, who pays, and through whose accounts? The developed world's promise of $100 billion a year in climate finance has lingered in disputes over accounting and relabeling; the loss-and-damage fund, though established, remains orders of magnitude short of need.</p><h2>I. The Gap Between Promise and Delivery</h2><p>The surface problem is scarcity; the deep problem is mistrust. For many developing countries, the record of unmet climate-finance promises is litmus paper for Northern sincerity: since historical responsibility came first, transition costs should follow the principle of common but differentiated responsibilities. Within donor camps, meanwhile, every actor has its own constraints — budget approval, domestic voters, debt ceilings. Each COP's finance negotiation is the collision of these two sets of constraints.</p><h2>II. From Aid to Investment: The Evolution of Instruments</h2><p>The optimistic change is at the level of tools. Blended finance tries to lever private capital with small public tranches; debt-for-nature swaps link relief to ecological commitments; just-transition funds put workers' re-employment into the ledger; reform debates at the multilateral development banks focus on stretching their balance sheets further. Each tool has limits, but together they mark a turn: climate finance is moving from an \"aid logic\" to an \"investment logic\" — recognizing that transfers alone cannot fill the gap, and that the allocation of risk and return must be rebuilt.</p><p>The bargaining will continue. But one thing is becoming consensus: if the distribution of transition costs is perceived as unfair, the political viability of transition will collapse before any climate tipping point. Climate justice is not moral decoration; it is the load-bearing wall of policy engineering.</p>",

"silk-road-knowledge": "<p>Invoke the Silk Road and we picture camel bells, silk and spices. But fixating on commodities misses the road's most durable cargo: knowledge. Papermaking westward transformed the textual worlds of Islam and Europe; Indian numerals and astronomical tables reached the Latin world via Baghdad; Chinese pulse diagnostics, Persian ophthalmology and Greek geometry shared the bookstalls of Samarkand and Cairo.</p><h2>I. Paper Goes West, Wisdom Comes East</h2><p>The Battle of Talas in the mid-eighth century has a famous byproduct: captured Tang craftsmen brought papermaking to Samarkand, and within a century Baghdad, Damascus and Cairo had paper mills. Cheap paper scaled the translation movement: the Abbasid House of Wisdom fused Greek philosophy, Indian mathematics and Persian medicine into a new body of knowledge, which — centuries later, through Toledo and Sicily — flowed back and helped ignite Europe's scholastic revival.</p><p>The flow of knowledge was never one-way. In the Yuan dynasty, Muslim astronomers brought Islamic instruments and calendars into Chinese service; the Ming-era Huihui Yaofang preserved hundreds of formulas from centuries of Eurasian medical exchange. The Silk Road's real miracle is not who owned any invention — it is that \"invention,\" most of the time, should be written in the plural.</p><h2>II. The Creativity of the Middle Ground</h2><p>The deepest lesson of this global history of knowledge may be the value of \"middlemen.\" Sogdian merchants were the logistics and language brokers of the route; the Mongol post roads made possible both Marco Polo's and Rabban Bar Sauma's journeys; the port cities of Java and Malacca repackaged Indian religion, Chinese technology and Arab charts. The most creative zones of civilizational encounter are often not the centers but the translating, hybridizing edges.</p><p>To retell this history in a low tide of globalization is not nostalgia. It reminds us: the height of a civilization has always depended on the width of its passages — and passages are walked open, step by step, by people.</p>",

"translation-politics": "<p>Almost none of the core words with which we think about the world is \"native.\" \"Economy\" arrived through the classical phrase jingshi jimin; \"society\" came via Japanese translations into Chinese; \"democracy\" underwent a semantic reversal from \"lord of the people\" to \"the people as lord.\" Conceptual historians call this the \"travel of concepts\": every important concept is an immigrant, carries luggage across the border, and gets its boxes reopened at customs.</p><h2>I. Classic Creative Misreadings</h2><p>The most famous traveler is Yan Fu. Rendering Huxley into Tianyanlun, he smuggled Spencer's social organism into the commentary; \"natural selection and survival of the fittest\" was less a translation of evolution than a mobilizing device recast for a China in crisis. Likewise the \"boundary between group and self\" borrowed for liberty, and the utopian tint of \"wutuobang,\" echoed through a century of debate. Misreading was not translation's failure but its workshop — new concepts always land wearing old clothes.</p><h2>II. Who Owns Definition</h2><p>Conceptual travel continues, only with faster vehicles. Academic English is the hub of global knowledge production; the experience of much of the world is first translated into Anglophone concepts and then translated back — flattened in grain on each round trip. \"Governance,\" \"resilience,\" \"sustainability\" gained global reach and lost precise edges. Battles over terminological standardization — from Chinese names for technical standards to multilingual AI-ethics vocabularies — are contests over the power to define.</p><p>For a youth journal this implies a discipline: every use of a big word is a micro politics of translation. To put concepts back into their travel histories is the minimal honesty we can keep toward language.</p>",

"un-reform-multilateralism": "<p>Around its eightieth birthday the United Nations received congratulations and obituaries in equal measure. On one side, the Summit of the Future adopted the Global Digital Compact and reaffirmed multilateralism's vitality; on the other, peacekeeping missions wound down, arrears persisted, and the veto echoed through the Security Council. The gap between ideal and reality constitutes the organization's daily life.</p><h2>I. Three Crises: Representation, Finance, Execution</h2><p>The UN's predicament compresses into three crises. Representation: the Council's permanent structure freezes the power map of 1945; Africa and Latin America, home to most of humanity, hold no permanent seats, while reform talk has run for thirty years. Finance: the budget depends on a few large payers, and arrears have become a political lever. Execution: with great-power consensus broken, vaguely mandated missions in Sudan and the DR Congo are caught between security and peacebuilding.</p><p>The crises interlock: without representation there is no political will to pay or to authorize; without money and mandates, representational reform is paper decoration.</p><h2>II. A Reform Roadmap: From Enlargement to \"UN 2.0\"</h2><p>Still, announcing the death of multilateralism is premature. Three realistic tracks stand out. Security-council enlargement: even non-veto permanent seats would improve legitimacy. Fiscal diversification: reform of assessed contributions, and sharing peacebuilding finance with regional organizations and development banks. And what is called \"UN 2.0\": digital transformation of the secretariat, data capacity, and upgraded youth mechanisms — turning the organization from a forum into a platform.</p><p>For the young, the UN's paradox is an invitation: an unfinished system means seats still open to design. Multilateralism's second life will not be born in a declaration; it will be born in a new generation's use and repair of it.</p>",

"digital-governance-ai": "<p>A scenario possible in any country: a user downloads an app from a domestic store; the servers sit in a third country; the training data came from a fourth; and the recommendation algorithm, lawful in a fifth, causes real harm at home. The jurisdictional power of sovereign states is being diluted by algorithms at geometric scale.</p><h2>I. Three Misalignments: Space, Time, Capacity</h2><p>The governance deficit shows first as spatial misalignment: algorithms run point-to-point across the planet while regulators stop at customs. Then temporal misalignment: technology iterates monthly, legislation takes years — by passage, the targeted version is a museum piece. And capacity misalignment: understanding a frontier model requires computing power and expertise that many regulators possess at a thousandth of the regulated.</p><p>Stacked together, these produce the signature symptom of modern governance: rules are not absent — they lag, unable to keep up with migrating harms and organizational innovation in evasion.</p><h2>II. Three Patches</h2><p>The international response so far comes in three patches. Extraterritoriality: the EU, via the GDPR and the AI Act, exports its rules through market access — the \"Brussels effect.\" Standards first: ISO and IEEE bodies, and the network of AI safety institutes, route around political deadlock through mutual recognition of technical standards. Multistakeholderism: seats ceded to firms, academia and civil society, with soft law and best practice pioneering ahead of treaties.</p><blockquote><p>\"Where physical enforcement cannot cross borders, institutional influence becomes the new crossing.\"<span class=\"q-src\">— the author</span></p></blockquote><h2>III. The Real Exam: Making \"Keeping Up\" Institutional</h2><p>Each patch has limits: extraterritoriality fragments rules; standard-recognition settles at the lowest consensus; multistakeholderism is criticized as capture. The real exam is to institutionalize \"keeping up\": standing cross-border enforcement networks instead of case-by-case mutual assistance; regulatory sandboxes that let rules evolve with the technology's generation; mandatory algorithmic audit disclosure so third parties supplement state capacity; and for the Global South, seats and technical assistance in standards-setting — otherwise every \"global rule\" is a regional rule colonizing the rest.</p><p>Algorithms recognize no borders, but harms land on particular countries and people. Whether rules can catch up with algorithms depends on whether we are willing to build cross-border infrastructure for rules themselves — the most consequential institutional experiment of digital-age governance.</p>",

"middle-powers-alliance": "<p>For years commentators have chronicled the \"golden hour\" of the middle powers: Turkey dealing both ways between NATO and Moscow; Saudi Arabia transacting with Washington and Beijing at once; India joining the Quad while buying discounted Russian oil; Brazil writing non-alignment back into its diplomatic lexicon. On the great-power chessboard, the pieces began to move themselves.</p><h2>I. The Old Grammar: Bloc Politics</h2><p>Cold-War alliance politics had a clean grammar: join a bloc, accept protection, cede some autonomy, purchase security guarantees. Its premise was that international politics reduces to a zero-sum duel, in which choosing sides is the optimal strategy. The grammar persisted past the Cold War's end — NATO enlargement, hub-and-spoke systems, assorted \"bloc-izations\" were its extensions.</p><p>But the old grammar's costs are rising. As great-power competition spread from security to chips, rare earths, payment systems and climate technology, the bill for \"choosing sides\" became expensive and blurry: one may pick a side in security, yet cannot decouple from half the world in semiconductors, energy and food at once.</p><h2>II. The New Grammar: Issue-Based Hedging Coalitions</h2><p>What emerged is finer-grained behavior — not \"refusing to choose,\" but \"choosing issue by issue.\" The same state joins deterrence architectures on security, keeps trade open, builds autonomous backups in technology, and seeks finance on climate. An alliance is no longer one roof but a stack of separately callable contracts.</p><p>This is why middle powers suddenly price their leverage: for every card they hold there are multiple buyers. BRICS expansion, SCO growth, and the proliferation of \"minilateral\" formats are less new camps than a wholesale market of issue-based contracts.</p><blockquote><p>\"Hedging is not fence-sitting. Fence-sitting refuses to take positions; hedging takes a position on every concrete question — while refusing to bundle them all into one package.\"<span class=\"q-src\">— the author</span></p></blockquote><h2>III. The Fragility of the New Grammar</h2><p>Issue-based alliance politics has soft spots. It lacks the old bloc's crisis insurance: when real military conflict comes, \"case-by-case positioning\" may excuse everyone from acting. It amplifies opportunism: middle powers' combinations depend on great-power tolerance, and if the giants call the bluff, hedging space narrows fast. And it is morally ambiguous: without treaty constraint, the credibility of promises is a permanent question mark.</p><p>The world after the \"middle-power moment\" is therefore likely not a multipolar utopia but a noisier, more bargaining-based, less stable layered order: old blocs persist, new contracts accrete, and every actor plays several boards at once.</p><h2>IV. Coordinates for Observers</h2><p>Three indicators will tell where the new grammar is heading: middle powers' actual votes and absences in security crises; whether third-party options on critical supply chains exist and work; and whether minilateral formats accumulate institutional capacity or remain summit photos. This section will keep tracking all three.</p>",

"green-bill-who-pays": "<p>Behind every kilowatt-hour of green electricity stands a bill. The capital cost of turbines and panels, coal plants retired early, grids rebuilt, retraining budgets for combustion-engine workers — none of these costs vanishes because the goal is lofty. They move, from account to account. The question was never whether transition is expensive, but: who pays, when, and can they afford it?</p><h2>I. Three Ways to Pay, Three Politics</h2><p>The first bill lands on consumers. Carbon prices and renewable levies push up power and fuel costs, and the income-elasticity of energy spending makes this a double blow to low-income households — which is why energy transition keeps igniting street politics. Subsidies can cushion; subsidies are the same bill in fiscal disguise.</p><p>The second lands on treasuries and sovereign debt. Rich economies can borrow nearly without limit to finance transition, while many developing countries pay multiples of that rate for green investment — the core injustice of climate finance: those who most need to transform face the most expensive capital. The third lands on industry and jobs, the most invisible and most political: mining towns, steel districts and combustion-supply chains carry a fate that was \"planned for them.\"</p><blockquote><p>\"Transition is not just turning grey assets green; it is writing part of the population's balance sheet into another part's future.\"<span class=\"q-src\">— the author</span></p></blockquote><h2>II. The Bill Travels Across Borders</h2><p>Worse, the bill ignores borders. Carbon border adjustments make exporters pay importers' carbon prices; extractive mining leaves environmental costs in Southern states; loss and damage are traced up the chain of historical emissions. In the green transition's global ledger, the polluter-pays principle still lacks an enforcement mechanism.</p><p>Hence a disquieting misalignment: those who bear the heaviest share — low-income energy consumers, industrial workers, residents of vulnerable states — hold the fewest seats where transition is decided. This is an economic problem, and also the representational problem this journal debates under Global Governance.</p><h2>III. Making the Bill Visible Is Step One of Politics</h2><p>Improvement begins with making hidden bills explicit politics. Transition budgets deserve annual debate like defense budgets; just-transition clauses belong in trade treaties, not only summit declarations; MDBs must genuinely crowd in private capital rather than relabel; household compensation must arrive itemized on the bill — so that \"paying for transition\" and \"being protected from its costs\" hold at once.</p><p>Technological roadmaps for the transition are abundant; political roadmaps are scarce. The bill will be paid by someone. What deserves argument is not whether to pay, but with what fairness, by whom, and how fast. That will be a main battlefield of the decade's economic politics.</p>",

"memory-museum-narrative": "<p>The museum looks like the quietest place in town, yet it is often the loudest political site. When a artifact returns home, how a war is worded, whose name names a hall — these decisions are contested by governments, diasporas and publics. Memory has become a border: it marks where \"we\" begin and \"they\" end.</p><h2>I. The Nation on the Display Wall</h2><p>Modern museums were born alongside the nation-state. The Louvre and the British Museum told lineages of \"civilization\" — and of imperial spoils; the new states of the twentieth century completed their coming-of-age through national museums — the narrative first, the artifacts recruited after. Display walls are curated memory: to select is to exclude; behind every spotlit object stand countless others in the dark of storage.</p><p>Thus the most powerful question in museology is never \"what is this object,\" but \"why is it here — and what else is not here.\"</p><h2>II. Restitution: The Ownership of Memory</h2><p>Over the past decade restitution moved from the margins of museum ethics to the agenda of diplomacy. The progressive return of the Benin Bronzes marks the loosening of the \"universal museum\" myth; Greece still negotiates for the Parthenon sculptures; wartime loot recurs on bilateral checklists. At stake in restitution is not the physical relocation of objects but the re-registration of memory's ownership: who is entitled to tell this past?</p><p>The noteworthy trend is co-curation: return is no longer a one-time handover but long-term cooperation — joint research, rotating exhibitions, digital co-structures. Here \"memory as border\" finds its counter-example: memory can also become a bridge, if the right to tell is genuinely shared.</p><blockquote><p>\"A society's maturity lies not in what it remembers, but in how it treats what it prefers not to remember.\"<span class=\"q-src\">— the author</span></p></blockquote><h2>III. Memory in the Plural</h2><p>The trouble with national narratives is singularization: flattening a complicated history into one heroic line. The liveliest experiments in contemporary museums recover memory's plural form — letting migrant communities co-curate, setting contending testimonies side by side over disputed history, letting \"our victory\" and \"their grief\" face each other in one room. Conflicting narratives are not a curatorial failure; they are the beginning of honesty.</p><p>For the young, the museum's question is about something larger: in an age when memory is routinely mobilized as a weapon, how do we respect its weight while refusing enlistment by any single narrative? Leaving the gallery with an uncomfortable question is closer to the museum's purpose than leaving with photographs.</p>",

"cross-border-algorithm-rules": "<p>Data crosses borders, models deploy across borders, content moderation crosses borders — while rules stop at the frontier. Sovereign jurisdiction, the pride of the modern state, meets a geometric dilution when it reaches the algorithm.</p><h2>I. Three Misalignments</h2><p>The governance deficit appears as three misalignments. Space: algorithmic operation is globally distributed point-to-point; the regulator's reach ends at the customs line. Time: technology iterates in months, legislation in years — by enactment, the target version is history. Capacity: understanding a frontier model demands computing and expertise that many agencies hold at a thousandth of the regulated.</p><p>Together they yield the signature symptom: rules are not missing — they lag, chasing harms that migrate faster than the rules that would govern them.</p><h2>II. Three Patches</h2><p>Three patches are in use. Extraterritorial regulation: the EU's GDPR and AI Act convert market size into rule export — the Brussels effect. Standards first: ISO and IEEE processes and the AI-safety-institute network seek mutual recognition where diplomacy deadlocks. Multistakeholder forums: seats for firms, researchers and civil society, with soft law preceding treaties.</p><blockquote><p>\"When enforcement cannot cross borders, institutional influence becomes the new border-crossing.\"<span class=\"q-src\">— the author</span></p></blockquote><h2>III. Making \"Keeping Up\" a Institution</h2><p>Each patch has costs: extraterritoriality fragments; standards settle for the lowest common; multistakeholderism risks capture. The genuine exam is to make \"keeping up\" itself an institution: standing cross-border enforcement networks; regulatory sandboxes that keep rules in the same generation as the technology; mandatory audit disclosure that lets third-party capacity supplement state capacity; and for Global South states, seats and technical assistance in standard-setting — otherwise every \"global rule\" is a regional rule colonizing the rest.</p><p>Algorithms carry no passports, but harms land somewhere specific. Whether rules catch up with algorithms depends on whether we build the cross-border infrastructure of rules themselves — the defining institutional experiment of digital-age governance, and a standing subject of this section.</p>",

"roundtable-next-globalization": "<p><strong>Editors' note:</strong> This roundtable was conducted in writing; remarks are edited for length. Participants' names and bios are samples (replace before publication): <strong>A</strong>, doctoral researcher of international political economy, works on industrial policy; <strong>B</strong>, development economist focused on African industrialization; <strong>C</strong>, labor scholar of global supply chains; <strong>D</strong>, international lawyer at the trade–climate interface; <strong>E</strong>, science-and-technology policy researcher of digital trade.</p><h2>I. Is Globalization Really Ebbing?</h2><p><strong>A:</strong> Less an ebb than a track change. Goods-trade growth has slowed, but services, data flows and intra-regional investment keep densifying. Globalization has not vanished; its vehicle switched from containers to bandwidth and subsidy schedules.</p><p><strong>B:</strong> Let me add a Southern-hemisphere view: for many African and Southeast Asian economies, \"de-globalization\" is a luxury narrative — their industrialization needs deeper global integration. The real danger is not retreat but being thrown off while the train changes tracks.</p><h2>II. Dignity: The Missing Variable</h2><p><strong>C:</strong> For thirty years we measured globalization's success by income and missed dignity. A factory closure is not an unemployment statistic; it dissolves a community's default trust that \"tomorrow will be better.\" Populism's soil was half planted by economics, half by a dignity deficit.</p><p><strong>D:</strong> That deficit is entering legal texts. \"Just transition,\" \"loss and damage,\" \"right to development\" — these inject distributive justice into otherwise neutral trade and investment rules. The institutional competition of the next globalization will largely be about who makes dignity clauses real.</p><h2>III. Institutional Imagination for the Next Globalization</h2><p><strong>E:</strong> The digital domain will produce the new template first. Multilateral frameworks for data flows and the AI safety-institute network are attempts at \"global rules without world government.\" Their success will define this century's governance ceiling.</p><p><strong>B:</strong> Note the distributional effects of institutional innovation. Whoever drafts standards writes their preferences into the \"global.\" My bottom line is plain: the next globalization must give the least developed countries a chair where rules are made — not merely notice when rules take effect.</p><p><strong>A:</strong> One last point: the old globalization carried a default promise — growth would heal divisions automatically. We now know the promise failed. The next globalization must treat \"order\" and \"dignity\" as objectives alongside \"growth.\" That is our generation's deepest disagreement with the previous one — and the question most worth our work.</p><blockquote><p>\"The last globalization's keyword was efficiency; the next one's may be how we share its costs.\"<span class=\"q-src\">— roundtable summary</span></p></blockquote><h2>Closing</h2><p>This conversation reaches no verdict — the roundtable's point was never verdicts. \"Youth Roundtable\" will run as a standing column: each issue, one contested question, five voices from different disciplines and regions. To take a seat at the table, see our <a href=\"../submit.html\">submissions guide</a>.</p>"

};


/* ============================================================
   以下为「中英文切换」模块（原 assets/js/i18n.js，已合并）
   ============================================================ */

/* ============================================================
   《青年政治论坛》中英文切换词典
   机制：文本节点精确匹配 + 正则 + 标题链接按 href 替换。
   范围：全站界面、导航页脚、各页文案、文章标题/摘要/元信息。
   文章正文保留中文（双语学术期刊惯例），英文模式显示提示条。
   选择语言存于 localStorage("ypr-lang")，切换即刷新。
   ============================================================ */
(function () {
  "use strict";

  var LANG = localStorage.getItem("ypr-lang") || "zh";
  var btn = document.getElementById("langToggle");
  if (btn) {
    btn.addEventListener("click", function () {
      localStorage.setItem("ypr-lang", LANG === "zh" ? "en" : "zh");
      location.reload();
    });
  }
  if (LANG !== "en") return;

  /* ---------- 文章标题表（slug → 英文） ---------- */
  var TITLES = {
    "global-south-order": "The Rise of the Global South: Reimagining the International Order",
    "climate-generational-justice": "Intergenerational Justice in Climate Governance: Why Youth Are Taking a Seat at the Table",
    "civilizational-dialogue": "The Possibility of Dialogue Among Civilizations: From \"Clash\" to \"Conversation\"",
    "supply-chain-industrial-policy": "The Age of Supply-Chain Restructuring: Industrial Policy Returns and Globalization Transforms",
    "populism-representation": "Representation in the Age of Populism: Who Speaks for Whom?",
    "algorithm-polarization": "Political Polarization in the Algorithmic Age: How Social Media Reshapes Public Opinion",
    "dollar-system": "Cracks in the Dollar System: Prospects and Limits of a Multipolar Monetary Order",
    "green-transition-funds": "The Political Economy of the Green Transition: Climate Finance and the Right to Development",
    "silk-road-knowledge": "Knowledge Flows on the Silk Road: A Forgotten Global History",
    "translation-politics": "The Politics of Translation: How Meaning Travels Across Languages",
    "un-reform-multilateralism": "Multilateralism Between Ideal and Reality: The UN Reform Dilemma",
    "digital-governance-ai": "The Competition over Rules: Global Digital Governance in the Age of AI",
    "editorial": "Editorial: Reimagining Public Life in an Age of Disorder",
    "middle-powers-alliance": "After the \"Middle-Power Moment\": The New Grammar of Alliance Politics",
    "green-bill-who-pays": "Who Pays the Bill for the Green Transition?",
    "memory-museum-narrative": "When Memory Becomes a Border: National Narratives in Museums",
    "cross-border-algorithm-rules": "Algorithms Cross Borders — Can Rules Keep Up?",
    "roundtable-next-globalization": "Growth, Dignity and Order: Five Young Scholars on the Next Globalization"
  };

  /* ---------- 文章摘要表（slug → 英文） ---------- */
  var DECKS = {
    "global-south-order": "From New Delhi to Brasília, the \"Global South\" is turning from a point on the map into a force at the negotiating table. This article traces the concept's century-long journey and asks whether it can truly shape a more multipolar, more just world order.",
    "climate-generational-justice": "When the timescale of decisions and the timescale of consequences diverge, young people no longer settle for being \"represented\" — they demand a seat. Climate politics is becoming generational politics.",
    "civilizational-dialogue": "Thirty years after the \"clash of civilizations\" was prophesied, dialogue among civilizations is back on the agenda. Are civilizational boundaries fault lines of conflict, or surfaces of exchange?",
    "supply-chain-industrial-policy": "From chip acts to friend-shoring, industrial policy has returned to the heartlands of free markets. Globalization is not over — but its grammar is being rewritten, from efficiency first to security first.",
    "populism-representation": "As the bond between parties and voters loosens, \"representation\" is losing its classical meaning. The other side of the crisis of representative democracy is a wave of participatory experiments.",
    "algorithm-polarization": "Echo chambers, filter bubbles, emotional contagion — is the algorithm dissolving the shared reality on which democracy depends? The evidence is more complicated than the popular pessimism.",
    "dollar-system": "The weaponization of finance has dented the dollar's neutrality, but the road to alternatives is long. Network effects, deep capital markets and institutional trust remain the dollar's deepest moat.",
    "green-transition-funds": "The \"loss and damage\" fund is hard to land, and the gap between climate-finance promises and delivery remains vast. How the costs of transition are shared is a test of global justice.",
    "silk-road-knowledge": "What traveled the Silk Road was not only silk and spices, but star charts, medical canons and papermaking. Civilizations made each other through encounter.",
    "translation-politics": "\"Democracy,\" \"freedom,\" \"civilization\" — every familiar concept has taken a long journey across languages. Translation is never mere conversion, but the reproduction of meaning.",
    "un-reform-multilateralism": "Vetoes, funding crises, peacekeeping dilemmas — the eighty-year-old UN stands at a crossroads. For multilateralism, reform is not a choice but a matter of survival.",
    "digital-governance-ai": "AI governance has moved from \"whether to regulate\" to \"who writes the rules.\" Behind three regulatory paths lies a global contest between the right to develop and the power to set rules.",
    "editorial": "The grammar of the old order is failing; the vocabulary of the new one is not yet written. We launch this journal because we believe the task of our generation is not to wait for order to return, but to practice reimagining public life.",
    "middle-powers-alliance": "As Turkey, Saudi Arabia, India and Brazil play their hands between the great powers, hedging is replacing bloc-choosing. Alliance politics is shifting from camps to issue-by-issue coalitions.",
    "green-bill-who-pays": "The costs of climate transition never disappear; they only move. From electricity bills to sovereign debt, the bill is being quietly allocated — and the allocation is decided by politics, not accounting.",
    "memory-museum-narrative": "What is exhibited, how it is exhibited, and what is not exhibited — every wall of a museum is a site of national memory politics. When memory becomes a border, how do we tell a shared past?",
    "cross-border-algorithm-rules": "Data flows across borders, models deploy across borders, content moderation crosses borders. When algorithms run globally while rules stop at the frontier, how is the governance deficit closed?",
    "roundtable-next-globalization": "Globalization is being rewritten — but on what terms? In our inaugural roundtable, five young scholars from different disciplines and regions debate the drivers, costs and institutional imagination of the next globalization."
  };

  /* ---------- 卡片/列表摘要表（精确中文 → 英文） ---------- */
  var X = {
    "当「全球南方」从地理概念演变为政治议程，一个更具多极色彩的世界秩序叙事正在被书写——它有多坚实，又有哪些裂缝？":
      "As the Global South evolves from a geographic label into a political agenda, a more multipolar narrative of world order is being written — how solid is it, and where are the cracks?",
    "当政党与选民的纽带松动，「代表」一词正在失去它的古典含义。代议制危机的另一面，是重建回应性民主的实验。":
      "As the bond between parties and voters loosens, \"representation\" is losing its classical meaning. The other side of the crisis: experiments in responsive democracy.",
    "当政党与选民的纽带松动，「代表」一词正在失去它的古典含义。代议制危机的另一面，是公民大会、参与式预算等「回应式民主」实验的兴起。":
      "As the bond between parties and voters loosens, \"representation\" is losing its classical meaning. Citizens' assemblies and participatory budgeting are on the rise.",
    "回声室、过滤气泡、情绪传播——算法是否正在瓦解民主赖以维系的共同现实？证据比流行的悲观叙事更复杂。":
      "Echo chambers, filter bubbles, emotional contagion — is the algorithm dissolving democracy's shared reality? The evidence is more complicated than popular pessimism suggests.",
    "回声室、过滤气泡、情绪传播——算法是否正在瓦解民主赖以维系的共同现实？梳理实证研究后会发现，证据比流行的悲观叙事更复杂。":
      "Echo chambers, filter bubbles, emotional contagion — is the algorithm dissolving democracy's shared reality? A review of the evidence finds it more complicated than popular pessimism.",
    "从芯片法案到「友岸外包」，产业政策在自由市场的心脏地带强势回归。全球化并未终结，但它的语法正在被重写。":
      "From chip acts to friend-shoring, industrial policy is back at the heart of free markets. Globalization is not over — but its grammar is being rewritten.",
    "从芯片法案到「友岸外包」，产业政策在自由市场的心脏地带强势回归。全球化并未终结，但它的语法正在被重写——从效率优先到安全优先，这是一场没有蓝图的结构转型。":
      "From chip acts to friend-shoring, industrial policy is back at the heart of free markets. Globalization is being rewritten — from efficiency first to security first, a structural transformation without a blueprint.",
    "制裁武器化动摇了美元的中立性假说，但替代之路远比想象漫长。网络效应与制度信任，仍是美元的护城河。":
      "The weaponization of finance has dented the dollar's neutrality, but alternatives remain distant. Network effects and institutional trust are still the dollar's moat.",
    "制裁武器化动摇了美元的中立性假说，但替代之路远比想象漫长。网络效应、深度金融市场与制度信任，仍是美元最深的护城河。":
      "The weaponization of finance has dented the dollar's neutrality, but alternatives remain distant. Network effects, deep markets and institutional trust are still the dollar's deepest moat.",
    "「损失与损害」基金落地难，气候资金的承诺与兑现之间存在巨大鸿沟。转型的成本如何分担，考验全球正义的底线。":
      "The loss-and-damage fund is hard to land, and the gap between climate-finance promises and delivery is vast. Sharing the costs of transition is a test of global justice.",
    "「损失与损害」基金落地难，气候资金的承诺与兑现之间存在巨大鸿沟。转型的成本如何分担，考验着全球正义的底线。":
      "The loss-and-damage fund is hard to land, and the gap between climate-finance promises and delivery is vast. Sharing the costs of transition is a test of global justice.",
    "三十年前，「文明冲突论」预言了断层线战争；三十年后，文明对话重回议程。文明的边界究竟是断层线，还是接触面？":
      "Thirty years after the \"clash of civilizations\" prophesied fault-line wars, dialogue among civilizations is back on the agenda. Are civilizational boundaries fault lines, or contact surfaces?",
    "三十年前，「文明冲突论」预言了断层线战争；三十年后，文明对话重回议程。文明的边界究竟是冲突的断层线，还是互鉴的接触面？答案取决于我们如何讲述文明的故事。":
      "Thirty years after the \"clash of civilizations\" prophesied fault-line wars, dialogue among civilizations is back on the agenda. The answer depends on how we tell the story of civilizations.",
    "丝绸之路上流动的不仅是丝绸与香料，还有天文表、医药典籍与造纸术。文明在相遇中彼此成就。":
      "What traveled the Silk Road was not only silk and spices, but star charts, medical canons and papermaking. Civilizations made each other through encounter.",
    "丝绸之路上流动的不仅是丝绸与香料，还有天文表、医药典籍与造纸术。重写这段知识全球史，是为了理解文明如何在相遇中彼此成就。":
      "What traveled the Silk Road was not only silk and spices, but star charts, medical canons and papermaking — a global history of knowledge worth retelling.",
    "「民主」「自由」「文明」——这些习以为常的概念都经历了漫长的跨语言旅行。翻译从来不只是语言转换，而是意义的再生产。":
      "\"Democracy,\" \"freedom,\" \"civilization\" — every familiar concept has taken a long journey across languages. Translation is the reproduction of meaning.",
    "当决策的时间尺度与后果的时间尺度错位，青年不再满足于被「代表」，而是要求在场——气候政治正在成为代际政治。":
      "When the timescale of decisions and consequences diverge, youth demand a seat rather than representation. Climate politics is becoming generational politics.",
    "否决权、会费危机、维和困境——八十岁的联合国站在十字路口。改革不是选择，而是生存。":
      "Vetoes, funding crises, peacekeeping dilemmas — the eighty-year-old UN stands at a crossroads. Reform is not a choice but survival.",
    "否决权、会费危机、维和困境——八十岁的联合国站在十字路口。对多边主义而言，改革不是选择，而是生存。":
      "Vetoes, funding crises, peacekeeping dilemmas — the eighty-year-old UN stands at a crossroads. For multilateralism, reform is survival.",
    "AI 治理已从「是否监管」转向「谁来定规则」。三种治理路径的背后，是发展权与规则权的全球博弈。":
      "AI governance has moved from \"whether to regulate\" to \"who writes the rules.\" Behind three paths lies a global contest between development rights and rule-making power.",
    "AI 治理已从「是否监管」转向「谁来定规则」。欧盟法案、美国行政令与多利益攸关方论坛三种路径的背后，是发展权与规则权的全球博弈。":
      "AI governance has moved from \"whether to regulate\" to \"who writes the rules.\" Behind the EU, US and multistakeholder paths lies a contest between development rights and rule-making power.",
    "当土耳其、沙特、印度、巴西们在大国之间打出组合拳，「对冲」正在取代「站队」。联盟政治不再问「你站在哪一边」，而是逐案计算「这件事上我站在哪边」。":
      "As middle powers play their hands between the great powers, hedging is replacing bloc-choosing: alliances are negotiated issue by issue, not chosen once and for all.",
    "气候转型的成本不会消失，只会转移。从电价账单到主权债务，从失业矿区到受灾海岸，这笔账正在被悄悄分配——而分配的结果，取决于政治而非会计。":
      "The costs of climate transition never disappear; they only move — onto electricity bills, sovereign debt and shuttered mining towns. The allocation is decided by politics, not accounting.",
    "展览什么、怎样展览、不展览什么——博物馆的每一面展墙，都是国家记忆政治的现场。当记忆成为边界，我们如何讲述共同的过去？":
      "What is exhibited, how, and what is left out — every museum wall is a site of national memory politics. When memory becomes a border, how do we tell a shared past?",
    "数据跨境流动、模型跨境部署、内容跨境审核——当算法全球运行而规则止步国界，空间、时间与能力的三重错位，让治理赤字成为数字时代最严峻的考题。":
      "Data, models and moderation all cross borders while rules stop at the frontier. Three misalignments — of space, time and capacity — make the governance deficit the hardest test of the digital age."
  };

  /* ---------- 界面与页面文案表 ---------- */
  var T = {
    /* 顶部与导航 */
    "2026年秋季刊 · 总第1期 · 主题「秩序重构」": "Autumn 2026 · Issue No. 1 · Theme: Rewriting Order",
    "投稿指南": "Submissions",
    "联系我们": "Contact",
    "青年政治论坛": "Youth Political Review",
    "Youth Political Review": "A Bilingual Journal of Global Affairs",
    "首页": "Home",
    "关于我们": "About Us",
    "投 稿": "Submit",
    "跳至正文": "Skip to content",
    /* 板块与标签 */
    "全球政治": "Global Politics",
    "全球经济": "Global Economy",
    "全球文明": "Global Civilization",
    "全球治理": "Global Governance",
    "卷首语": "Editorial",
    "特别策划": "Special Feature",
    "创刊号 · 卷首文章": "Inaugural Issue · Editorial Feature",
    "板块头条 · 创刊号": "Section Feature · Inaugural Issue",
    "卷首语 · 编辑部": "Editorial · The Editors",
    "特别策划 · 青年圆桌": "Special Feature · Youth Roundtable",
    "国际关系": "International Relations", "政治思潮": "Political Thought", "选举与民主": "Elections & Democracy", "地区安全": "Regional Security",
    "政治经济学": "Political Economy", "国际金融": "International Finance", "发展研究": "Development Studies", "贸易与产业": "Trade & Industry",
    "思想史": "Intellectual History", "全球史": "Global History", "记忆研究": "Memory Studies", "翻译研究": "Translation Studies",
    "国际组织": "International Organizations", "气候治理": "Climate Governance", "数字治理": "Digital Governance", "全球公共品": "Global Public Goods",
    /* 页脚 */
    "栏目": "Sections", "快速链接": "Quick Links", "订阅通讯": "Newsletter",
    "一份由青年学人主笔的全球事务评论期刊。设全球政治、全球经济、全球文明、全球治理四大板块，以青年之眼观察世界秩序的变迁。":
      "A journal of global affairs written by young scholars, with four sections — politics, economy, civilization and governance — watching the changing world order through young eyes.",
    "每月一封，精选四大板块深度评论与下期预告。": "One email a month: the best of our four sections, plus a preview of the next issue.",
    "您的邮箱地址": "Your email address",
    "订 阅": "Subscribe",
    "感谢订阅！本站为演示模板，正式上线前请接入邮件服务。": "Thank you for subscribing! Connect an email service before going live.",
    "© 2026 《青年政治论坛》Youth Political Review · 保留所有权利": "© 2026 Youth Political Review. All rights reserved.",
    "编辑部来信：sduasgg2025920@163.com · 创刊号内容为示例文稿": "Editorial: sduasgg2025920@163.com · Inaugural content is sample material",
    /* 首页 */
    "「全球南方」的兴起：国际秩序重构中的想象与实践": "", // 由 TITLES 处理
    "查看全部 →": "View all →",
    "阅读全文 →": "Read more →",
    "最新一期 · LATEST ISSUE": "LATEST ISSUE",
    "2026 年秋季刊：秩序重构": "Autumn 2026: Rewriting Order",
    "创刊号聚焦「秩序重构」。国际秩序正在被重新想象：全球南方的兴起、产业政策的回归、文明对话的重启、气候治理的代际转向。四篇主打文章，四种观察世界的青年视角。":
      "The inaugural issue focuses on \"Rewriting Order\": the rise of the Global South, the return of industrial policy, the restart of civilizational dialogue, and the generational turn in climate governance. Four features, four youthful ways of seeing the world.",
    "阅读创刊号": "Read the Issue",
    "投稿下一期": "Submit to the Next Issue",
    "青年之声 · 论道天下": "Youth Voice on World Affairs",
    "YOUTH VOICE ON WORLD AFFAIRS —— 我们期待你的观察与思考": "— We look forward to your observations and reflections.",
    "查看投稿指南": "Submission Guide",
    "了解我们": "About Us",
    "最新文章": "Latest Articles",
    "继续浏览其他板块": "Continue browsing other sections",
    "全部文章": "All Articles",
    /* 返回链接与期号 */
    "← 返回「全球政治」": "← Back to Global Politics",
    "← 返回「全球经济」": "← Back to Global Economy",
    "← 返回「全球文明」": "← Back to Global Civilization",
    "← 返回「全球治理」": "← Back to Global Governance",
    "← 返回首页": "← Back to Home",
    "2026年秋季刊 · 总第1期": "Autumn 2026 · Issue No. 1",
    /* 作者与元信息 */
    "林知遥": "Lin Zhiyao", "唐清越": "Tang Qingyue", "陆望舒": "Lu Wangshu",
    "沈亦舟": "Shen Yizhou", "苏念远": "Su Nianyuan", "程一苇": "Cheng Yiwei",
    "温叙白": "Wen Xubai", "江离": "Jiang Li", "韩澈": "Han Che",
    "陈牧野": "Chen Muye", "邵闻笛": "Shao Wendi", "秦篆": "Qin Zhuan",
    "林予安": "Lin Yu'an", "周迩": "Zhou Er", "编辑部": "The Editors", "青年圆桌": "Youth Roundtable",
    "全球政治板块 · 特约主笔": "Global Politics Desk · Contributing Editor",
    "全球治理板块 · 特约主笔": "Global Governance Desk · Contributing Editor",
    "全球文明板块 · 特约主笔": "Global Civilization Desk · Contributing Editor",
    "全球经济板块 · 特约主笔": "Global Economy Desk · Contributing Editor",
    "全球政治板块 · 撰稿人": "Global Politics Desk · Contributor",
    "全球经济板块 · 撰稿人": "Global Economy Desk · Contributor",
    "全球文明板块 · 撰稿人": "Global Civilization Desk · Contributor",
    "全球治理板块 · 撰稿人": "Global Governance Desk · Contributor",
    "青年政治论坛 · 编辑部": "Youth Political Review · Editorial Board",
    "特别策划 · 常设栏目": "Special Feature · Standing Column",
    "国际关系研究者，关注全球南方与国际秩序转型。（示例作者简介，请替换为真实信息）":
      "IR researcher covering the Global South and international order. (Sample bio — replace before launch)",
    "环境政策研究者，关注气候治理与代际正义。（示例作者简介，请替换为真实信息）":
      "Environmental policy researcher covering climate governance and intergenerational justice. (Sample bio)",
    "思想史研究者，关注文明理论、帝国史与跨文化知识交流。（示例作者简介，请替换为真实信息）":
      "Intellectual historian covering civilizational theory and cross-cultural knowledge exchange. (Sample bio)",
    "国际政治经济学研究者，关注产业政策、供应链与贸易治理。（示例作者简介，请替换为真实信息）":
      "IPE researcher covering industrial policy, supply chains and trade governance. (Sample bio)",
    "政治理论研究者，关注代议制理论与民主创新实践。（示例作者简介，请替换为真实信息）":
      "Political theorist covering representation and democratic innovation. (Sample bio)",
    "计算社会科学研究者，关注舆论动力学与平台治理。（示例作者简介，请替换为真实信息）":
      "Computational social scientist covering opinion dynamics and platform governance. (Sample bio)",
    "国际金融研究者，关注货币体系、跨境支付与金融制裁。（示例作者简介，请替换为真实信息）":
      "International finance researcher covering monetary systems and financial sanctions. (Sample bio)",
    "发展经济学研究者，关注气候融资与全球发展合作。（示例作者简介，请替换为真实信息）":
      "Development economist covering climate finance and global development cooperation. (Sample bio)",
    "全球史研究者，关注欧亚知识交流与物质文化史。（示例作者简介，请替换为真实信息）":
      "Global historian covering Eurasian knowledge exchange and material culture. (Sample bio)",
    "概念史与翻译研究者，关注近代东亚概念旅行。（示例作者简介，请替换为真实信息）":
      "Conceptual historian covering concept travel in modern East Asia. (Sample bio)",
    "国际组织研究者，关注联合国系统改革与建设和平。（示例作者简介，请替换为真实信息）":
      "International organizations researcher covering UN reform and peacebuilding. (Sample bio)",
    "科技政策研究者，关注人工智能治理与数字发展权。（示例作者简介，请替换为真实信息）":
      "Science policy researcher covering AI governance and digital development rights. (Sample bio)",
    "联盟政治研究者，关注中等强国外交。（示例作者简介，请替换为真实信息）":
      "IR researcher covering alliance politics and middle-power diplomacy. (Sample bio)",
    "能源政治经济学研究者，关注气候融资与公正转型。（示例作者简介，请替换为真实信息）":
      "Energy political economist covering climate finance and just transition. (Sample bio)",
    "博物馆学与记忆研究者，关注文化遗产政治与公共史学。（示例作者简介，请替换为真实信息）":
      "Museum and memory studies researcher covering cultural heritage politics. (Sample bio)",
    "网络治理研究者，关注跨境数据流动与算法监管。（示例作者简介，请替换为真实信息）":
      "Internet governance researcher covering cross-border data flows and algorithm regulation. (Sample bio)",
    "卷首语由编辑部集体执笔，代表本刊立场。（示例署名，请替换为真实信息）":
      "Editorials are written collectively by the editorial board. (Sample byline)",
    "跨学科青年对谈栏目，每期一个争议议题，五位发言人。（示例栏目说明，请替换为真实信息）":
      "A standing cross-disciplinary conversation: one contested question, five voices per issue. (Sample description)",
    "本文仅代表作者个人观点，与本刊编辑部立场无关。": "This article represents the author's personal views only and not those of the editorial board.",
    "卷首语代表编辑部立场；其余文章仅代表作者个人观点。": "Editorials represent the board; all other articles represent only their authors.",
    "本文系《青年政治论坛》创刊号示例文章，用于展示网站版式；正式上线前请替换为真实稿件。":
      "This is a sample article of the inaugural issue, shown for layout preview; replace with final copy before launch.",
    "本文系《青年政治论坛》创刊号示例卷首语，用于展示网站版式；正式上线前请替换为编辑部审定稿。":
      "This is a sample editorial of the inaugural issue, shown for layout preview; replace with the board's final copy before launch.",
    /* 首页引文与圆桌引文 */
    "「中国代表团是来求同而不是来立异的。」——周恩来，一九五五年万隆会议发言": "",
    "「我们不是在为遥远的未来谈判，我们是在为被预先决定的现在谈判。」——一位青年代表在气候大会会场外的发言（示例引语）": "",
    "「文明死于自杀，而非他杀。」——阿诺德·汤因比，《历史研究》": "",
    /* 关于页 */
    "以青年之眼，观世界之变 —— Youth Political Review": "Seeing the changing world through young eyes — Youth Political Review",
    "《青年政治论坛》（Youth Political Review）是一份由青年学人主笔的全球事务评论期刊。我们相信：在世界秩序深刻重构的年代，青年不应只是被谈论的对象，更应成为谈论世界的人。":
      "Youth Political Review is a journal of global affairs written by young scholars. We believe that in an era when world order is being rebuilt, young people should not merely be talked about — we should be the ones talking about the world.",
    "本刊设全球政治、全球经济、全球文明、全球治理四大板块，既追踪大国博弈与制度变迁，也关注观念流动与文明对话；既面向国际关系、经济学、历史学与法学的青年研究者，也欢迎一切认真观察世界的年轻人。我们追求的不是预测下一个头条，而是为理解长期趋势提供有学理根基的青年视角。":
      "Across four sections — global politics, economy, civilization and governance — we follow great-power rivalry and institutional change as well as the movement of ideas and dialogue among civilizations. We write for young researchers in IR, economics, history and law, and for anyone who watches the world seriously. We aim not to predict the next headline, but to give theoretically grounded, youthful perspectives on long-term trends.",
    "独立判断、学理根基、建设性批评——这是我们的三条编辑立场，也是我们对每一篇稿件的要求。":
      "Independent judgment, scholarly grounding, constructive criticism — our three editorial commitments, and what we ask of every manuscript.",
    "创刊年份": "Founded", "内容板块": "Sections", "创刊号文章": "Inaugural Articles", "青年主笔": "Youth-Written",
    "我们做什么": "What We Do",
    "线上评论": "Online Review",
    "四大板块持续更新，1500–4000 字深度评论。快节奏时代的慢阅读：给复杂问题以认真的篇幅。":
      "Continuously updated across four sections: 1,500–4,000-character essays. Slow reading for a fast age — complex problems deserve serious space.",
    "主题专刊": "Quarterly Issues",
    "每季一期主题专刊，围绕「秩序重构」等核心议题集中组稿，配以完整版式设计，可在线阅读。":
      "A themed quarterly around questions like \"Rewriting Order,\" fully designed and readable online.",
    "青年对话": "Youth Dialogues",
    "学者访谈、圆桌纪要与读者社群，让讨论在场外继续发生。播客计划筹备中。":
      "Interviews, roundtable minutes and reader communities keep the conversation going beyond the page. A podcast is in the works.",
    "编辑团队": "Editorial Team",
    "以下为示例团队成员，用于展示版式；正式上线前请替换为实际名单。":
      "Team members below are samples for layout preview; replace with the actual roster before launch.",
    "主编": "Editor-in-Chief", "副主编": "Managing Editor",
    "全球政治板块编辑": "Editor, Global Politics", "全球经济板块编辑": "Editor, Global Economy",
    "全球文明板块编辑": "Editor, Global Civilization", "全球治理板块编辑": "Editor, Global Governance",
    "视觉设计": "Design Lead", "新媒体运营": "Digital & Community",
    "国际关系博士生，负责刊物整体方向与卷首语。": "IR doctoral student; steers the journal's direction and editorials.",
    "国际政治经济学方向，统筹全球经济板块。": "IPE scholar; coordinates the Global Economy section.",
    "政治理论方向，关注代议制与民主创新。": "Political theorist covering representation and democratic innovation.",
    "发展经济学方向，关注气候融资与发展合作。": "Development economist covering climate finance and development cooperation.",
    "概念史与翻译研究，关注近代东亚思想旅行。": "Conceptual historian covering idea travel in modern East Asia.",
    "国际组织研究，关注联合国系统与建设和平。": "International organizations scholar covering the UN system and peacebuilding.",
    "负责刊物视觉识别、专刊版式与网站设计。": "Leads visual identity, issue design and the website.",
    "负责社交媒体矩阵与读者社群运营。": "Runs social media and reader communities.",
    "加入我们": "Join Us",
    "编辑部长期招募编辑、译者、视觉设计与新媒体运营伙伴；同时常年开放投稿。如果你认同我们的立场，愿意和一群认真的年轻人一起做一份认真的刊物——欢迎来信。":
      "We are always looking for editors, translators, designers and community managers — and we accept submissions year-round. If you share our commitments and want to make a serious journal with serious young people, write to us.",
    "联系我们": "Contact Us",
    "投稿、合作、加入编辑部或任何建议，欢迎致信编辑部：":
      "Submissions, partnerships, join requests or any feedback — write to the editorial board:",
    "来件将在 3 个工作日内回复。": "We reply within three working days.",
    /* 投稿页 */
    "青年之声，论道天下 —— 我们期待你的观察与思考": "Youth voice on world affairs — we look forward to your observations and reflections.",
    "《青年政治论坛》是一个开放的平台。我们相信，关于世界秩序的讨论里，不应缺少年轻人的声音——不是因为年轻本身值得被听见，而是因为青年视角里藏着未来的问题意识。":
      "Youth Political Review is an open platform. Discussions of world order should not lack young voices — not because youth deserves to be heard per se, but because young perspectives carry the questions of the future.",
    "无论你是国际关系、经济学、历史学、法学方向的本科生或研究生，是青年从业者、观察者，还是一位认真关心世界的独立写作者：只要你的文章有扎实的依据、清晰的判断和诚实的论证，这里就有它的位置。":
      "Undergraduate or graduate student in IR, economics, history or law; a young practitioner, observer, or an independent writer who cares about the world — if your writing rests on solid evidence, clear judgment and honest argument, it has a place here.",
    "投稿范围": "Scope", "体例要求": "Guidelines", "投稿流程": "Process", "常见问题": "FAQ",
    "大国关系、地区安全、政治思潮与制度变迁。": "Great-power relations, regional security, political thought and institutional change.",
    "国际贸易、金融体系、产业政策与发展议题。": "International trade, financial systems, industrial policy and development.",
    "思想、宗教、艺术与知识的跨文明流动。": "Cross-civilizational flows of ideas, religions, arts and knowledge.",
    "多边机制、全球公共品与气候、数字、健康等新兴议程。": "Multilateral mechanisms, global public goods, and climate, digital and health agendas.",
    "原创首发，未在其他公开出版物或网络平台发表。": "Original and previously unpublished, in print or online.",
    "字数以 1500–4000 字为宜，深度评论与研究报告可放宽至 6000 字。": "Typically 1,500–4,000 characters; in-depth essays and reports up to 6,000.",
    "请附中文标题、200 字以内的内容提要、作者简介（可用笔名）与联系方式。": "Include a title, an abstract of 200 characters or fewer, an author bio (pen names welcome) and contact details.",
    "引用请注明出处，体例参考页下注或文末参考文献。": "Cite sources via footnotes or end references.",
    "编辑部恕不收取任何版面费；稿件刊发后赠当期电子刊。": "We charge no fees; published authors receive the current digital issue.",
    "来稿视为授权本刊以署名方式首发，并用于社交媒体推广。": "Submission implies first-publication rights under your byline and promotion on our social channels.",
    "提交稿件": "Submit", "初审": "Initial Review", "双向匿名评审": "Double-Blind Review", "修改与刊发": "Revision & Publication",
    "将稿件发送至投稿邮箱，标题注明「投稿 + 板块 + 标题」，正文使用通用文档格式。":
      "Email your manuscript with the subject \"Submission + Section + Title\", in a common document format.",
    "板块编辑在 7 个工作日内回复是否进入评审；未通过初审亦会附简短理由。":
      "Section editors reply within 7 working days; declines come with a brief reason.",
    "通过初审的稿件由两位同行评审人匿名评审，周期约两周，出具修改建议。":
      "Manuscripts passing initial review go to two anonymous referees for about two weeks, with revision notes.",
    "作者按建议修改后，编辑协助文字润色与版式设计，协商刊期后正式发布。":
      "After revision, editors help polish the text and design the layout; the piece is published on an agreed date.",
    "整个评审周期大概需要多久？": "How long does the whole review cycle take?",
    "从投稿到刊发通常 3–4 周：初审 7 个工作日，外审约两周，修改与排版约一周。时效性强的稿件可申请「快评」通道，最快 5 个工作日内刊发。":
      "Usually 3–4 weeks from submission to publication: 7 working days for initial review, about two weeks for external review, one week for revisions and layout. Time-sensitive pieces may use the fast track — as quick as 5 working days.",
    "可以一稿多投吗？": "May I submit to multiple journals at once?",
    "恕不接受。稿件在评审期间请勿另投他处；如 30 日内未收到回复，可视为未采用并自行处理。":
      "No. Please do not submit elsewhere while under review; if you hear nothing within 30 days, you may consider it declined.",
    "是否支付稿费？": "Do you pay contributor fees?",
    "现阶段以当期电子刊赠阅与采用证书致谢；编辑部正筹设稿酬制度，细则将在确定后公布。":
      "For now we thank contributors with the current digital issue and an acceptance certificate; a honorarium scheme is being prepared and will be announced.",
    "我不是政治学相关专业，可以投稿吗？": "I'm not a political science major — can I still submit?",
    "完全可以。我们更看重问题意识、证据与论证，而非作者的身份标签。来自自然科学、工程、艺术等背景的跨界观察，往往正是四大板块期待的视角。":
      "Absolutely. We care about the question, the evidence and the argument, not labels. Cross-disciplinary perspectives from science, engineering or the arts are exactly what our sections hope for.",
    /* 投稿页：定位语 / 创刊号征稿 / 体裁 / 双语要求 / 引用原创材料 / 流程 */
    "青年之声，论道天下 —— 把你的问题，带到更大的世界": "Youth voice on world affairs — bring your questions to a wider world",
    "我们寻找什么样的写作": "What We Are Looking For",
    "我们寻找观点明确、论证扎实、面向非专业读者的公共写作。请不要直接提交未经改写的课程论文或学位论文；复杂概念应被解释，而不是被术语遮蔽。":
      "We look for public writing with clear positions, solid argument, and general readers in mind. Please do not submit unrewritten course papers or theses; complex concepts should be explained, not hidden behind jargon.",
    "中英文稿件均可投稿，采用同一编辑标准。": "Submissions in both Chinese and English are welcome and held to the same editorial standard.",
    "无论你来自国际关系、经济学、历史学、法学，还是一位认真关心世界的独立写作者：只要你的文章有扎实的依据、清晰的判断和诚实的论证，这里就有它的位置。":
      "Whether you study IR, economics, history or law, or write independently about the world: if your work rests on solid evidence, clear judgment and honest argument, it has a place here.",
    "创刊号征稿 · 主题「秩序重构」": "Call for Papers · Inaugural Issue: Rewriting Order",
    "我们尤其欢迎跨地区、跨学科以及来自青年作者第一手经验的稿件。可提交完整稿件，也可先发送两至三句话的选题构想，编辑部讨论后再确认是否成稿。":
      "We especially welcome cross-regional, cross-disciplinary work and first-hand experience from young writers. Send a full draft, or pitch first with two or three sentences and we will confirm before you write.",
    "投稿板块": "Sections",
    "板块彼此独立，又相互交叉——我们鼓励跨越学科与地域边界的写作。":
      "Sections are distinct yet intersecting — we encourage writing that crosses disciplinary and regional borders.",
    "体裁与字数": "Genres & Length",
    "时事短评": "Current Commentary", "深度评论": "Long Read",
    "书评与评论文章": "Review & Review Essay", "访谈与对谈": "Interview & Conversation",
    "围绕一个正在发生的公共议题提出鲜明、可论证的判断。避免新闻复述。":
      "Make a sharp, arguable judgment on a live public issue. News recap is not commentary.",
    "解释一个结构性问题，建立清晰的因果链条，并回应可能的反对意见。":
      "Explain a structural question, build a clear causal chain, and answer likely objections.",
    "不止概述作品，更要说明它介入了什么争论、遗漏了什么问题。":
      "Go beyond summary: show what debate a work enters and what it leaves out.",
    "呈现有推进、有追问的思想交流。投稿前请取得受访者同意。":
      "Present exchanges that advance and probe. Obtain your interviewee's consent beforehand.",
    "中文 1,500–2,500 字": "1,500–2,500 characters (zh)", "中文 3,500–6,000 字": "3,500–6,000 characters (zh)",
    "中文 2,500–4,500 字": "2,500–4,500 characters (zh)", "中文不超过 6,000 字": "Up to 6,000 characters (zh)",
    "英文 800–1,200 词": "800–1,200 words (en)", "英文 1,500–2,500 词": "1,500–2,500 words (en)",
    "英文 1,000–1,800 词": "1,000–1,800 words (en)", "英文不超过 2,500 词": "Up to 2,500 words (en)",
    "中英文写作要求": "Writing Guidelines: Chinese & English",
    "中文稿件": "Chinese", "英文稿件": "English",
    "中文写作要求": "Writing in Chinese", "英文写作要求": "Writing in English",
    "接受简体或繁体中文；全文须保持字形与标点体系一致。":
      "Simplified or Traditional Chinese is accepted; keep the character form and punctuation system consistent throughout.",
    "标题建议不超过 24 个汉字；开篇应在约 150 字内明确问题与核心判断。":
      "Titles should stay within 24 characters; state the question and core judgment within roughly the first 150 characters.",
    "首次出现的人名、机构或专有名词，视需要附原文或通行译名。":
      "On first mention, attach the original or a standard translation for names, institutions and proper nouns as needed.",
    "避免堆叠成语、口号和无解释的学术术语；优先使用具体、主动的句子。":
      "Avoid piling up idioms, slogans and unexplained jargon; prefer concrete, active sentences.",
    "英式或美式英语均可，但拼写、日期和标点须全文一致。":
      "British or American English is fine, but spelling, dates and punctuation must be consistent throughout.",
    "使用句首式标题大小写；导语应在约 100 词内提出问题和核心论点。":
      "Use sentence-case headlines; raise the question and core argument within about 100 words.",
    "非英语姓名和概念可在首次出现时保留原文，并提供简短说明。":
      "Non-English names and concepts may keep their original form at first mention, with a brief gloss.",
    "面向国际读者写作，不默认读者熟悉某一国家的缩写、制度或政治语境。":
      "Write for international readers; never assume familiarity with one country's abbreviations, institutions or political context.",
    "引用、原创与提交材料": "Sources, Originality & Materials",
    "来源与引用": "Sources & Citations",
    "对事实、数据和直接引语提供来源。正文使用描述性文字链接至报刊、学术论文 DOI、机构报告或图书出版页；一般不使用脚注、尾注或作者—年份式括注。":
      "Source all facts, data and quotations. In the body, link descriptively to press coverage, DOIs, institutional reports or publisher pages; avoid footnotes, endnotes and author–year parentheticals.",
    "原创与披露": "Originality & Disclosure",
    "稿件应为作者原创，且未在其他平台同步审理。引用和改写必须清楚标明来源；涉及资助、任职、倡议组织或其他潜在利益冲突时，请主动披露。":
      "Manuscripts must be original and not under simultaneous review elsewhere. Credit all quotations and paraphrases; disclose funding, affiliations, advocacy ties or other potential conflicts of interest.",
    "提交材料": "What to Submit",
    "请提交可编辑的 DOCX 文件或共享文档链接，并附：作者姓名、80–120 字中文简介或 50–80 词英文简介、拟投板块、联系方式，以及图片来源或使用许可。请勿只发送 PDF。":
      "Send an editable DOCX or a shared-document link, with your name, a bio of 80–120 Chinese characters or 50–80 English words, intended section, contact details, and image credits or licences. Please do not send PDF only.",
    "从投稿到发表": "From Submission to Publication",
    "确认收稿": "Confirmation",
    "通常在三个工作日内确认材料是否完整。": "We confirm whether materials are complete, usually within three working days.",
    "初审": "Initial Review",
    "编辑部通常在十四日内给出采用、修改或不采用的决定。": "The editors decide — accept, revise, or decline — usually within fourteen days.",
    "共同编辑": "Joint Editing",
    "入选稿件通常经历一至两轮结构、事实与语言编辑。": "Accepted pieces usually go through one or two rounds of structural, factual and language editing.",
    "作者确认": "Author Sign-off",
    "重要修改将在发表前交由作者确认；编辑部保留标题与版式调整权。": "Major changes go back to the author before publication; the editors reserve the right to adjust titles and layout.",
    "可以先用选题构想投稿吗？": "May I pitch an idea before writing?",
    "可以。欢迎先发送两至三句话的选题构想（拟投板块、核心问题、大致论证路径），编辑部讨论后会尽快回复是否适合成稿，避免你在不合适的方向上花费过多时间。":
      "Yes. Send a two-to-three-sentence pitch (section, core question, rough line of argument); the editors will reply quickly so you don't invest in the wrong direction.",
    "英文稿件的要求和中文一样吗？": "Are the requirements the same for English pieces?",
    "编辑标准完全一致，体裁字数按英文词数计算（见上文「体裁与字数」）。英文稿另有四条写作要求：拼写体系全文一致、句首式标题大小写、导语百词内亮明论点、面向国际读者写作。":
      "The editorial standard is identical; lengths are counted in English words (see Genres & Length). English pieces add four rules: consistent spelling system, sentence-case headlines, a lede that states the argument within 100 words, and writing for international readers.",
    "恕不接受。稿件应为原创且未在其他平台同步审理；评审期间请勿另投他处。如三十日内未收到回复，可来信询问进度。":
      "No. Manuscripts must be original and not under review elsewhere; please don't submit to other outlets while we review. If you hear nothing within 30 days, write to ask about progress.",
    "确认收稿通常在三个工作日内；初审一般在十四日内给出采用、修改或不采用的决定；此后经历一至两轮编辑与作者确认，整体约四至六周刊发。时效性强的稿件可申请「快评」通道，最快十个工作日内刊发。":
      "Confirmation usually within three working days; the initial decision within fourteen; then one or two editing rounds and author sign-off — about four to six weeks in total. Time-sensitive pieces may use the fast track, published in as little as ten working days.",
    "完整稿件、选题提案与投稿咨询，请发送至编辑部：": "Send full drafts, pitches and enquiries to the editorial board:",
    "标题请注明「投稿 + 体裁 + 标题」。": "Mark your subject line: Submission + Genre + Title.",
    "现在开始": "Get Started",
    "把你的第一篇稿件寄给我们：": "Send us your first manuscript:",
    "标题请注明「投稿 + 板块 + 标题」。": "Mark your subject line: Submission + Section + Title."
  };

  /* ---------- 日期与量词正则 ---------- */
  var MONTHS = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
  var RX = [
    [/^\s*作者\s*$/, "By "],
    [/^\s*主持\s*$/, "Moderated by "],
    [/约\s*(\d+)\s*分钟阅读/, "$1 min read"],
    [/约\s*(\d+)\s*分钟/, "$1 min"],
    [/(\d{4})年(\d{1,2})月(\d{1,2})日/, function (m, y, mo, d) { return MONTHS[mo - 1] + " " + (+d) + ", " + y; }],
    [/(\d{1,2})月(\d{1,2})日/, function (m, mo, d) { return MONTHS[mo - 1] + " " + (+d); }]
  ];

  /* ---------- 执行替换 ---------- */
  document.documentElement.lang = "en";

  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1 };
  var walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode: function (n) {
      return (!SKIP[n.parentNode.nodeName] && n.nodeValue.trim()) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
    }
  });
  var nodes = [], n;
  while ((n = walker.nextNode())) nodes.push(n);
  nodes.forEach(function (node) {
    var raw = node.nodeValue, t = raw.trim();
    if (T[t] !== undefined && T[t] !== "") { node.nodeValue = T[t]; return; }
    var out = raw;
    RX.forEach(function (pair) {
      out = out.replace(pair[0], pair[1]);
    });
    node.nodeValue = out;
  });

  /* 文章标题链接按 href 统一替换（卡片、目录、相关阅读） */
  var pathSlug = (location.pathname.match(/([a-z0-9-]+)\.html$/i) || [])[1];
  document.querySelectorAll("a[href]").forEach(function (a) {
    var href = a.getAttribute("href") || "";
    var m = href.match(/([a-z0-9-]+)\.html/);
    /* 仅替换纯文本链接；包含封面图等子元素的链接不动，避免清空封面 */
    if (m && TITLES[m[1]] && a.children.length === 0) a.textContent = TITLES[m[1]];
  });

  /* 当前文章页：标题、摘要、页面标题、正文（英文版）与提示条 */
  if (pathSlug && TITLES[pathSlug]) {
    document.title = TITLES[pathSlug] + " — Youth Political Review";
    var h1 = document.querySelector(".article-head h1");
    if (h1) h1.textContent = TITLES[pathSlug];
    var deck = document.querySelector(".deck");
    if (deck && DECKS[pathSlug]) deck.textContent = DECKS[pathSlug];
    var body = document.querySelector(".article-body");
    if (body && window.YPRBODIES && window.YPRBODIES[pathSlug]) {
      var trans = document.createElement("p");
      trans.className = "en-notice no-indent";
      trans.textContent = "English edition prepared by the editors. In case of divergence, the Chinese original prevails. 本文英文版由编辑部编译，如与原文有出入，以中文原文为准。";
      body.innerHTML = window.YPRBODIES[pathSlug]
        + '<p class="orn">❖ ❖ ❖</p>'
        + '<p class="note">This is sample content of the inaugural issue, shown for layout preview; replace with final copy before launch.</p>';
      body.insertBefore(trans, body.firstChild);
    } else if (body && !document.querySelector(".en-notice")) {
      var notice = document.createElement("p");
      notice.className = "en-notice no-indent";
      notice.textContent = "Note: The interface, title and abstract of this page are shown in English; the full text remains in Chinese. 中文原文如下。";
      body.insertBefore(notice, body.firstChild);
    }
  } else {
    var pageTitle = {
      "index": "Youth Political Review — Youth Voice on World Affairs",
      "home": "Youth Political Review — Youth Voice on World Affairs",
      "section-politics": "Global Politics — Youth Political Review",
      "politics": "Global Politics — Youth Political Review",
      "section-economy": "Global Economy — Youth Political Review",
      "economy": "Global Economy — Youth Political Review",
      "section-civilization": "Global Civilization — Youth Political Review",
      "civilization": "Global Civilization — Youth Political Review",
      "section-governance": "Global Governance — Youth Political Review",
      "governance": "Global Governance — Youth Political Review",
      "about": "About Us — Youth Political Review",
      "submit": "Submissions — Youth Political Review"
    };
    var titleKey = pathSlug || document.body.getAttribute("data-page");
    if (titleKey && pageTitle[titleKey]) document.title = pageTitle[titleKey];
  }

  /* 首页专属：头条摘要、专刊横幅、圆桌栏目语 */
  var page = document.body.getAttribute("data-page");
  if (page === "home") {
    var hd = document.querySelector(".hero-deck");
    if (hd) hd.textContent = DECKS["global-south-order"];
  }
  /* 其他页面装饰性元素保持原样（印章、竖排刊名等） */

  /* 无障碍标签 */
  var st = document.getElementById("searchToggle");
  if (st) { st.setAttribute("aria-label", "Search"); st.title = "Search (Ctrl+K)"; }
  if (btn) btn.setAttribute("aria-label", "Switch to Chinese");
})();


/* ============================================================
   以下为「站内搜索」模块（原 assets/js/search.js，已合并）
   ============================================================ */

/* ============================================================
   《青年政治论坛》站内搜索
   零依赖纯前端：内置全站索引（18 篇文章 + 7 个页面），
   Ctrl+K / 头部按钮唤起，即时过滤、关键词高亮、键盘导航。
   中文/英文标题均可检索，展示语言跟随站点语言设置。
   ============================================================ */
(function () {
  "use strict";

  var ROOT = /\/articles\//.test(location.pathname) ? "../" : "";
  var EN = localStorage.getItem("ypr-lang") === "en";

  /* ---------- 全站索引 ----------
     t=中文标题  e=英文标题  g=板块(中/英)  a=作者  d=日期  u=链接  k=附加关键词 */
  var INDEX = [
    { t: "卷首语：在失序年代，重新想象公共生活", e: "Editorial: Reimagining Public Life in an Age of Disorder", g: "卷首语|Editorial", a: "编辑部", d: "2026-09-26", u: "articles/editorial.html", k: "创刊 公共生活 失序 editorial" },
    { t: "「中等强国时刻」之后：联盟政治的新语法", e: "After the Middle-Power Moment: The New Grammar of Alliance Politics", g: "全球政治|Global Politics", a: "林予安", d: "2026-10-06", u: "articles/middle-powers-alliance.html", k: "联盟 对冲 中等强国 alliance hedging turkey india" },
    { t: "绿色转型的账单，最终由谁支付？", e: "Who Pays the Bill for the Green Transition?", g: "全球经济|Global Economy", a: "Maya Chen", d: "2026-10-04", u: "articles/green-bill-who-pays.html", k: "气候 能源 公正转型 碳价 climate bill" },
    { t: "气候治理的代际正义：青年为何走上谈判桌", e: "Intergenerational Justice in Climate Governance", g: "全球治理|Global Governance", a: "唐清越", d: "2026-10-02", u: "articles/climate-generational-justice.html", k: "气候 COP 巴黎协定 代际 青年 climate youth" },
    { t: "当记忆成为边界：博物馆里的国家叙事", e: "When Memory Becomes a Border: National Narratives in Museums", g: "全球文明|Global Civilization", a: "周迩", d: "2026-10-01", u: "articles/memory-museum-narrative.html", k: "博物馆 记忆 文物返还 遗产 museum memory" },
    { t: "文明互鉴的可能：从「文明冲突论」到「文明对话」", e: "The Possibility of Dialogue Among Civilizations", g: "全球文明|Global Civilization", a: "陆望舒", d: "2026-09-30", u: "articles/civilizational-dialogue.html", k: "文明 亨廷顿 对话 互鉴 civilization dialogue" },
    { t: "算法越过国境，规则还追得上吗？", e: "Algorithms Cross Borders — Can Rules Keep Up?", g: "全球治理|Global Governance", a: "Ravi Mehta", d: "2026-09-29", u: "articles/cross-border-algorithm-rules.html", k: "算法 数据跨境 数字治理 GDPR algorithm governance" },
    { t: "「全球南方」的兴起：国际秩序重构中的想象与实践", e: "The Rise of the Global South", g: "全球政治|Global Politics", a: "林知遥", d: "2026-09-28", u: "articles/global-south-order.html", k: "全球南方 秒隆 金砖 秩序 global south brics" },
    { t: "供应链重构时代：产业政策的回归与全球化的转型", e: "The Age of Supply-Chain Restructuring", g: "全球经济|Global Economy", a: "沈亦舟", d: "2026-09-25", u: "articles/supply-chain-industrial-policy.html", k: "供应链 芯片 产业政策 友岸外包 supply chain chips" },
    { t: "多边主义的理想与现实：联合国改革的困境与出路", e: "Multilateralism Between Ideal and Reality: The UN Reform Dilemma", g: "全球治理|Global Governance", a: "邵闻笛", d: "2026-09-23", u: "articles/un-reform-multilateralism.html", k: "联合国 安理会 多边 un multilateralism" },
    { t: "民粹主义浪潮中的代议制困境：谁在代表谁？", e: "Representation in the Age of Populism", g: "全球政治|Global Politics", a: "陈牧野", d: "2026-09-21", u: "articles/populism-representation.html", k: "民粹主义 代议制 政党 选举 populism" },
    { t: "丝绸之路上的知识流动：一段被遗忘的全球史", e: "Knowledge Flows on the Silk Road", g: "全球文明|Global Civilization", a: "温叙白", d: "2026-09-19", u: "articles/silk-road-knowledge.html", k: "丝绸之路 造纸术 全球史 翻译运动 silk road" },
    { t: "美元体系的裂缝：国际货币格局多极化的前景与限度", e: "Cracks in the Dollar System", g: "全球经济|Global Economy", a: "苏念远", d: "2026-09-17", u: "articles/dollar-system.html", k: "美元 制裁 货币 多极化 dollar sanctions" },
    { t: "算法时代的政治极化：社交媒体如何重塑公共舆论", e: "Political Polarization in the Algorithmic Age", g: "全球政治|Global Politics", a: "韩澈", d: "2026-09-12", u: "articles/algorithm-polarization.html", k: "算法 极化 社交媒体 回声室 polarization" },
    { t: "规则的竞争：全球数字治理与人工智能时代的新议程", e: "The Competition over Rules: Global Digital Governance in the Age of AI", g: "全球治理|Global Governance", a: "秦篆", d: "2026-09-10", u: "articles/digital-governance-ai.html", k: "人工智能 AI 治理 数字规则 ai governance" },
    { t: "翻译的政治：概念旅行中的意义变迁", e: "The Politics of Translation", g: "全球文明|Global Civilization", a: "江离", d: "2026-09-08", u: "articles/translation-politics.html", k: "翻译 概念史 严复 天演论 translation" },
    { t: "绿色转型的政治经济学：气候资金与发展权的博弈", e: "The Political Economy of the Green Transition", g: "全球经济|Global Economy", a: "程一苇", d: "2026-09-05", u: "articles/green-transition-funds.html", k: "气候资金 损失损害 发展权 climate finance" },
    { t: "增长、尊严与秩序：五位青年学者谈下一代全球化", e: "Growth, Dignity and Order: A Youth Roundtable on the Next Globalization", g: "特别策划|Special", a: "青年圆桌", d: "2026-10-08", u: "articles/roundtable-next-globalization.html", k: "圆桌 全球化 圆桌 roundtable globalization" },
    { t: "全球政治 · 板块页", e: "Global Politics · Section", g: "页面|Page", a: "", d: "", u: "section-politics.html", k: "" },
    { t: "全球经济 · 板块页", e: "Global Economy · Section", g: "页面|Page", a: "", d: "", u: "section-economy.html", k: "" },
    { t: "全球文明 · 板块页", e: "Global Civilization · Section", g: "页面|Page", a: "", d: "", u: "section-civilization.html", k: "" },
    { t: "全球治理 · 板块页", e: "Global Governance · Section", g: "页面|Page", a: "", d: "", u: "section-governance.html", k: "" },
    { t: "关于我们", e: "About Us", g: "页面|Page", a: "", d: "", u: "about.html", k: "编辑部 团队 联系 about team" },
    { t: "投稿指南", e: "Submissions", g: "页面|Page", a: "", d: "", u: "submit.html", k: "投稿 稿件 评审 submit" }
  ];

  var I18N = {
    zh: { ph: "搜索全站文章与页面…", quick: "快捷入口", empty: "没有找到相关内容，换个关键词试试", tip: "打开/关闭", nav: "选择", open: "打开" },
    en: { ph: "Search articles and pages…", quick: "Quick links", empty: "No results — try another keyword", tip: "toggle", nav: "navigate", open: "open" }
  };
  var L = function () { return I18N[localStorage.getItem("ypr-lang") === "en" ? "en" : "zh"]; };

  var overlay, input, body, items = [], active = -1, built = false;

  function esc(s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }
  function hi(text, q) {
    if (!q) return esc(text);
    var i = text.toLowerCase().indexOf(q.toLowerCase());
    if (i < 0) return esc(text);
    return esc(text.slice(0, i)) + "<mark>" + esc(text.slice(i, i + q.length)) + "</mark>" + esc(text.slice(i + q.length));
  }

  function build() {
    if (built) return;
    built = true;
    overlay = document.createElement("div");
    overlay.className = "search-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.innerHTML = ''
      + '<div class="search-panel">'
      +   '<div class="search-head">'
      +     '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.8-3.8"/></svg>'
      +     '<input class="search-input" type="text" placeholder="' + L().ph + '" aria-label="' + L().ph + '">'
      +     '<button class="search-close" type="button" aria-label="关闭">×</button>'
      +   '</div>'
      +   '<div class="search-body"></div>'
      + '</div>';
    document.body.appendChild(overlay);
    input = overlay.querySelector(".search-input");
    body = overlay.querySelector(".search-body");

    overlay.addEventListener("click", function (e) { if (e.target === overlay) close(); });
    overlay.querySelector(".search-close").addEventListener("click", close);
    input.addEventListener("input", render);
    overlay.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { close(); }
      else if (e.key === "ArrowDown") { e.preventDefault(); move(1); }
      else if (e.key === "ArrowUp") { e.preventDefault(); move(-1); }
      else if (e.key === "Enter" && active >= 0 && items[active]) { e.preventDefault(); go(items[active]); }
    });
  }

  function quickLinks() {
    var quick = ["section-politics.html", "section-economy.html", "section-civilization.html", "section-governance.html", "articles/editorial.html", "submit.html"];
    var html = '<div class="search-hint">' + L().quick
      + ' &nbsp;<span class="search-kbd">↑↓</span> ' + L().nav
      + ' &nbsp;<span class="search-kbd">Enter</span> ' + L().open
      + ' &nbsp;<span class="search-kbd">Esc</span> ' + L().tip + '</div>';
    quick.forEach(function (u) {
      var it = INDEX.filter(function (x) { return x.u === u; })[0];
      if (!it) return;
      var meta = [it.g.split("|")[0], it.a].filter(Boolean).join(" · ");
      html += '<a class="search-item" data-url="' + it.u + '" href="' + ROOT + it.u + '">'
        + '<div class="si-title">' + esc(it.t) + '</div>'
        + '<div class="si-meta">' + esc(meta) + '</div></a>';
    });
    body.innerHTML = html;
    bindItems("");
  }

  function render() {
    var q = input.value.trim();
    if (!q) { quickLinks(); return; }
    var ql = q.toLowerCase();
    var hits = INDEX.map(function (it) {
      var score = 0;
      if (it.t.toLowerCase().indexOf(ql) >= 0) score += 10;
      if (it.e.toLowerCase().indexOf(ql) >= 0) score += 8;
      if (it.a && it.a.toLowerCase().indexOf(ql) >= 0) score += 4;
      if (it.g.toLowerCase().indexOf(ql) >= 0) score += 3;
      if (it.k && it.k.toLowerCase().indexOf(ql) >= 0) score += 2;
      return { it: it, score: score };
    }).filter(function (x) { return x.score > 0; })
      .sort(function (a, b) { return b.score - a.score || (b.it.d || "").localeCompare(a.it.d || ""); })
      .slice(0, 8);

    if (!hits.length) { body.innerHTML = '<div class="search-empty">' + L().empty + '</div>'; items = []; active = -1; return; }
    var html = "";
    hits.forEach(function (x) {
      var it = x.it;
      var title = localStorage.getItem("ypr-lang") === "en" ? (it.e || it.t) : it.t;
      var meta = [it.g.split("|")[localStorage.getItem("ypr-lang") === "en" ? 1 : 0], it.a, it.d].filter(Boolean).join(" · ");
      html += '<a class="search-item" data-url="' + it.u + '" href="' + ROOT + it.u + '">'
        + '<div class="si-title">' + hi(title, q) + '</div>'
        + '<div class="si-meta">' + esc(meta) + '</div></a>';
    });
    body.innerHTML = html;
    bindItems(q);
  }

  function bindItems() {
    items = Array.prototype.slice.call(body.querySelectorAll(".search-item"));
    active = -1;
  }

  function move(dir) {
    if (!items.length) return;
    active = (active + dir + items.length) % items.length;
    items.forEach(function (el, i) { el.classList.toggle("is-active", i === active); });
    items[active].scrollIntoView({ block: "nearest" });
  }

  function go(el) {
    close();
    location.href = el.getAttribute("href");
  }

  function open() {
    build();
    overlay.classList.add("is-open");
    input.value = "";
    input.placeholder = L().ph;
    quickLinks();
    setTimeout(function () { input.focus(); }, 30);
  }
  function close() {
    if (overlay) overlay.classList.remove("is-open");
  }

  window.YPRSearch = { open: open, close: close };
})();
