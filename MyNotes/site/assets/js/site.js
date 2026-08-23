/* Minimal Notes 官网脚本：语言跳转 / 复制链接 / 微信二维码浮层 / 视频兜底
   无任何外部依赖，本地双击打开也能跑 */
(function () {
  "use strict";

  /* ---- 语言下拉：选中后跳到对应语言页（相对路径，本地与线上都可用） ---- */
  var picker = document.querySelector("[data-lang-picker]");
  if (picker) {
    picker.addEventListener("change", function () {
      if (this.value) window.location.href = this.value;
    });
  }

  /* ---- 提示条 ---- */
  var toastEl = null, toastTimer = null;
  function toast(msg) {
    if (!toastEl) {
      toastEl = document.createElement("div");
      toastEl.className = "toast";
      toastEl.setAttribute("role", "status");
      document.body.appendChild(toastEl);
    }
    toastEl.textContent = msg;
    // 强制回流，保证连续点击也能重新播放淡入
    void toastEl.offsetWidth;
    toastEl.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove("is-on"); }, 2000);
  }

  /* ---- 复制链接 ----
     三层兜底：clipboard API → execCommand（file:// 和没有用户手势时还能用）→ 弹窗让人手动复制。
     clipboard API 在部分浏览器里要求「用户手势」，被拒时不能直接放弃。 */
  function legacyCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.cssText = "position:fixed;top:-999px;opacity:0";
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);   // iOS Safari 上 select() 不够
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).catch(function () {
        return legacyCopy(text) ? Promise.resolve() : Promise.reject();
      });
    }
    return legacyCopy(text) ? Promise.resolve() : Promise.reject();
  }

  /* 复制链接。小红书、Instagram、知乎、Quora 这类没有网页分享接口的平台也走这里，
     只是提示语换成「复制好了，去哪儿粘贴」 */
  Array.prototype.forEach.call(document.querySelectorAll("[data-copy]"), function (btn) {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      var url = btn.getAttribute("data-copy");
      copyText(url).then(
        function () { toast(btn.getAttribute("data-copy-ok") || "Link copied"); },
        function () { window.prompt(btn.getAttribute("data-copy-ok") || "Link", url); }
      );
    });
  });

  /* 系统分享面板（Web Share API）：手机上能直接分享到任何已安装的 App，
     包括小红书、微信、Instagram 这些没有网页分享接口的。不支持的浏览器里这个按钮不出现。 */
  if (navigator.share) {
    Array.prototype.forEach.call(document.querySelectorAll("[data-native-share]"), function (btn) {
      btn.hidden = false;
      btn.addEventListener("click", function () {
        navigator.share({
          title: btn.getAttribute("data-share-title"),
          text: btn.getAttribute("data-share-title"),
          url: btn.getAttribute("data-share-url")
        }).catch(function () { /* 用户取消了，不做任何事 */ });
      });
    });
  }

  /* ---- 微信等「扫码分享」：弹出本页二维码 ---- */
  var modal = document.querySelector("[data-qr-modal]");
  function closeModal() { if (modal) modal.classList.remove("is-open"); }
  Array.prototype.forEach.call(document.querySelectorAll("[data-qr-open]"), function (btn) {
    btn.addEventListener("click", function (e) { e.preventDefault(); if (modal) modal.classList.add("is-open"); });
  });
  if (modal) {
    modal.addEventListener("click", function (e) {
      if (e.target === modal || e.target.hasAttribute("data-qr-close")) closeModal();
    });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeModal(); });
  }

  /* ---- 演示视频：静音自动循环 ----
     部分浏览器（省电模式、后台标签页）会拦下自动播放。
     这里不挂 controls 破坏版面，改成：页面回到前台或用户第一次操作时再试一次，
     点视频本身也能手动播放。 */
  var videos = document.querySelectorAll("video[autoplay]");
  function tryPlay() {
    Array.prototype.forEach.call(videos, function (v) {
      if (!v.paused) return;
      v.muted = true;
      var p = v.play();
      if (p && typeof p.catch === "function") p.catch(function () { /* 等下一次机会 */ });
    });
  }
  Array.prototype.forEach.call(videos, function (v) {
    v.muted = true;
    v.addEventListener("click", function () { v.paused ? v.play() : v.pause(); });
  });
  tryPlay();
  document.addEventListener("visibilitychange", function () {
    if (!document.hidden) tryPlay();
  });
  ["pointerdown", "keydown", "scroll", "touchstart"].forEach(function (evt) {
    window.addEventListener(evt, tryPlay, { once: true, passive: true });
  });
})();
