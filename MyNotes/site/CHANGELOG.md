# v4.0.0 — 2026-08-23

001 美式英语 + 002 简体中文。v2、v3 原样保留，未改动。

## 1. 网页文案回到 v2 那套（不再照抄 App Store）

v3 把页面每一句都对齐了商店文案和截图上印的字，读起来像商店页的复制品。
v4 改回 v2 的写法：**网页有自己的表达**，更适合落地页。

RTF **只用来取一样东西**——左上角的品牌名，也就是「名称：」下一行里破折号前那段：

| 语言 | RTF 里的商店名称 | 取出的品牌名 |
|---|---|---|
| en-US | Minimal Notes – Quick Notepad | **Minimal Notes** |
| zh-Hans | 极简备忘 - 随手记录 日常待办 高效记入 快捷记事本 | **极简备忘** |

品牌名取出来后会自动填进标题、正文、FAQ、页脚、JSON-LD 里所有 `{brand}` 占位符，
所以换语言时这些地方不用逐处改。构建日志会打印取到的品牌名和对应的商店名，便于核对。

## 2. 分享按钮图标 + 文字都显示

v3 的侧栏为了塞下 17 个平台改成了纯图标网格。v4 改回**图标在左、文字在右**，
侧栏加宽到 138px，条目多时栏内滚动，17 个平台全部平铺出来、名称全部可见，
不藏进「更多」。窄屏仍是带文字的横滑胶囊。

侧栏出现的断点相应从 1200px 右移到 1240px（880 内容 + 两侧各 168px 才放得下带文字的栏）。

分享平台清单与 v3 一致（英文 17 个 / 中文 11 个），其余语言的清单等做到那一版时再逐个检索。

## 3. 站点地址改到隐私政策仓库下

不再使用 `cpe-group-admin.github.io` 根目录。新地址：

```
https://cpe-group-admin.github.io/MyNotes-privacy/site/
                                              /site/en/
                                              /site/zh/
```

- 隐私政策页 `https://cpe-group-admin.github.io/MyNotes-privacy/` **原样不动**
  （它就是那个仓库根目录的 index.html，宣传页放进 `site/` 子目录，两者不冲突）
- 根目录的 `app-ads.txt` **原样不动**，本版不再产出它 —— 它必须待在域名根目录，
  而本站在子目录下
- 分享链接、二维码、canonical、hreflang、og:url、sitemap 全部写死新地址；
  二维码已按新地址重新生成
- 页脚「隐私政策」链接指向 `https://cpe-group-admin.github.io/MyNotes-privacy/`

## 4. 页脚不出现开发者姓名

全站（含 meta、JSON-LD）grep 确认零残留，署名统一用品牌名。

## 全平台实测结果

两种语言 × 6 档屏幕，逐项自动校验，全部通过：

| 宽度 | 机型 | 左右固定栏 | 正文内分享行 | 底部下载条 | 横向溢出 |
|---|---|---|---|---|---|
| 375 | iPhone SE | 收起 | 显示 | 显示 | 无 |
| 768 | iPad 竖 | 收起 | 显示 | 收起 | 无 |
| 1024 | iPad Pro | 收起 | 显示 | 收起 | 无 |
| 1280×720 | 笔记本 | 固定显示 | 收起 | 收起 | 无 |
| 1440 | 桌面 | 固定显示 | 收起 | 收起 | 无 |
| 1920 | 大屏 | 固定显示 | 收起 | 收起 | 无 |

同时校验：**每个分享按钮的图标和文字都渲染出来且宽度非 0**、侧栏不压内容也不出视口、
跨页大图接缝 0px、演示视频静音循环且未挂 controls、图片零加载失败、顶栏吸顶、
语言下拉不溢出、tab 标题以品牌名开头、手机端触摸目标 ≥40px、
canonical/hreflang/og/复制链接/分享地址全部指向新站点地址、5 处 App Store 链接一致。

用**真实点击**（非合成事件）验证：微信二维码浮层可开可关、小红书复制并弹出定制提示
「链接已复制，去小红书发笔记时粘贴」、演示视频自动播放。控制台无报错。


---

## v4.1.0 — 铺满 15 种语言

001～015 全部上线。002 简体中文与 001 美式英语作为翻译底本，其余 13 种在此之上
按各自语言的实际用法调整，而不是逐字直译。

| # | 路径 | 语言 | hreflang | 分享入口 | 主要平台 |
|---|---|---|---|---|---|
| 01 | `/en/` | English (US) | en | 17 | X、Facebook、Reddit、Pinterest、Threads、Bluesky、Tumblr、LinkedIn、 |
| 02 | `/zh/` | 简体中文 | zh-Hans | 11 | 微信、微博、豆瓣、百度贴吧、QQ空间、QQ好友、邮件 |
| 03 | `/ja/` | 日本語 | ja | 14 | X、LINE、Facebook、はてなブックマーク、Threads、Pinterest、Bluesky、Tumblr、T |
| 04 | `/en-gb/` | English (UK) | en-GB | 17 | X、Facebook、Reddit、Pinterest、Threads、Bluesky、Tumblr、LinkedIn、 |
| 05 | `/de/` | Deutsch | de | 14 | WhatsApp、Facebook、X、Threads、LinkedIn、Telegram、Reddit、Pintere |
| 06 | `/fr/` | Français | fr | 13 | WhatsApp、Facebook、X、Threads、LinkedIn、Telegram、Reddit、Pintere |
| 07 | `/es-mx/` | Español (México) | es-MX | 13 | WhatsApp、Facebook、X、Threads、Telegram、LinkedIn、Reddit、Pintere |
| 08 | `/pt-br/` | Português (BR) | pt-BR | 13 | WhatsApp、Facebook、X、Telegram、Threads、Reddit、Pinterest、Linked |
| 09 | `/hi/` | हिन्दी | hi | 14 | WhatsApp、Facebook、X、Telegram、Reddit、Pinterest、LinkedIn、Threa |
| 10 | `/zh-hant/` | 繁體中文 | zh-Hant | 12 | LINE、Facebook、Threads、X、WhatsApp、Telegram、電子郵件 |
| 11 | `/ko/` | 한국어 | ko | 13 | 카카오스토리、네이버 블로그、네이버 밴드、X、Facebook、Threads、Telegram、메일 |
| 12 | `/it/` | Italiano | it | 13 | WhatsApp、Facebook、X、Threads、Telegram、LinkedIn、Reddit、Pintere |
| 13 | `/es/` | Español (España) | es | 13 | WhatsApp、Facebook、X、Threads、Telegram、LinkedIn、Reddit、Pintere |
| 14 | `/ru/` | Русский | ru | 11 | Telegram、ВКонтакте、Одноклассники、WhatsApp、X、LiveJournal、Почт |
| 15 | `/en-au/` | English (AU) | en-AU | 17 | X、Facebook、Reddit、Pinterest、Threads、Bluesky、Tumblr、LinkedIn、 |

### 翻译怎么做的

先按英语／简体中文底本翻译，再逐语言对照三处校准：

1. **人称与语气**沿用该语言截图里已有的惯例，不另起一套 —— 德语用 du（`Schreib bunt`）、
   法语用 vous（`Ouvrez et écrivez`）、意/西用 tu/tú（`Apri e scrivi`／`Ábrela y escribe`）、
   日语敬体、韩语존댓말、印地语用 आप。这样网页和截图读起来是同一个人写的。
2. **地区用词**逐条区分，不做简单的字符替换：
   - 英式／澳式用 colour（与其截图一致），美式用 color
   - 繁体按台湾用语重写：關鍵字、篩選、資料庫、設定、複製連結、應用程式
   - es-MX 与 es-ES 分开：negritas／negrita、regresa／vuelve、Configuración／Ajustes
   - 印地语保留 नोट्स、ऐप、डार्क मोड 这类通行外来词，全盘梵语化反而不自然
3. **避免歧义或让人不适的说法**：不写「无广告」（App 内含广告模块）、不写星级、
   韩语句子刻意避开品牌名后接助词（换名时「은/는」不会出错）。

### 各地区的分享平台

按地区实际排行配置，端点全部实测存活：

- 日本：X、LINE、はてなブックマーク（兴趣社群）、note（图文社区，复制链接）
- 台湾/香港：LINE、Facebook、Threads、Dcard（生活风格社群）、PTT（兴趣论坛）、WhatsApp
- 韩国：카카오톡（复制链接）、카카오스토리、네이버 블로그／밴드／카페
- 俄罗斯：Telegram、ВКонтакте、Одноклассники、LiveJournal、Пикабу（兴趣社群）
- 印度：WhatsApp、ShareChat（本地语言社群）、Quora（问答）
- 欧洲/拉美：WhatsApp 为主，加 Threads、Reddit、Pinterest、Bluesky

没有网页分享接口的平台（小红书、知乎、Instagram、Quora、抖音类）一律不做假链接，
改成复制链接 + 该平台的定制提示；手机上另有系统分享面板兜底。

### 排版修正

15 种语言的 h1 在 hero 左栏实测行数后，把会多折行的 4 条改短（ja、zh-Hant、es、es-MX、pt-BR），
现在 **15 种语言的大标题都是整齐的两行**，没有缩字号。

### 根目录跳转补了同语族兜底

pt-PT 这类没有精确匹配的语言，之前会掉到英文；现在先找同语族（pt → pt-BR）再兜英文。

### 实测结果

**15 种语言 × 5 档屏幕 = 75 个组合，全部通过。** 用同源 iframe 矩阵在
375 / 768 / 1280 / 1440 / 1920 下逐页校验：固定栏位置与不压内容、无横向溢出、
图片零失败、视频静音循环且未挂 controls、顶栏吸顶、15 项语言下拉不溢出顶栏、
品牌名与下拉不重叠、标题以品牌名开头、h1 行数、分享按钮**图标和文字都渲染且宽度非 0**、
跨页大图接缝 0px、手机端触摸目标 ≥40px。

另有文件层面的自检脚本 `build/check.py`：占位符残留、资源缺失、hreflang 是否闭合、
分享按钮数量、**非英文页是否还留着英文底本的句子**、开发者姓名残留。
15 种语言语言切换下拉的 15 个目标逐个 HEAD 请求确认返回 200。

---

## v4.2.0 — 站点搬到 cpe-group-admin.github.io/MyNotes/site/

### 为什么改

App Store 后台填的营销网址是 `https://cpe-group-admin.github.io/`，
所以站点回到这个主域名下，放在 `MyNotes/site/`。
隐私政策仍在 `MyNotes-privacy` 仓库，本次一字未动，页脚链接继续指过去。

| 位置 | 之前 | 现在 |
|---|---|---|
| 仓库 | `MyNotes-privacy` | `cpe-group-admin.github.io`（主页仓库） |
| 站点地址 | `…/MyNotes-privacy/site/` | `…/MyNotes/site/` |
| 域名根 `/` | 404 | 语言转发页 |
| `app-ads.txt` | 根目录 | **根目录，未改动** |

### 新增：域名根目录的转发页

`https://cpe-group-admin.github.io/` 之前返回 404 —— 那个仓库里只有 `app-ads.txt`，
没有首页。**只把网页放进子目录并不会让根目录不再 404**，而营销网址填的正是根目录。

所以构建多产出一个 `root/` 目录（`index.html` + `robots.txt` + `.nojekyll`），
放进仓库根目录。转发页与站点入口是同一份代码、同一套语言判定，只差一个路径前缀；
它标了 `noindex,follow`，收录的仍然只有 `/MyNotes/site/` 下的真页面。

`root/` 里**不含** `app-ads.txt`，`check.py` 专门检查这一点，
杜绝「整目录覆盖时把广告文件冲掉」。

### 顺带修好的两处

**1. 二维码会跟着地址走了。** 各语言页的二维码里编的是该页网址，
但 `./build.sh pages` 这条快速通道以前只重出 HTML，改地址后二维码还指着老地方。
现在 `pages` 也会重出二维码（约 1 秒）。
本次 16 张二维码已用 CoreImage 逐张解码验证，全部指向新地址。

**2. 语言判定补了地区对照表。** 原来「去掉地区码取母语言」的泛用回退
会把西班牙语系和英语系送错门。现加一张地区表先行指路：

```
es-AR/CL/CO/PE/VE/US… → es-mx      （拉美西语，不再落到西班牙版）
en-IE/ZA/IN/SG/MY/HK  → en-gb
en-NZ                 → en-au
pt-PT                 → pt-br
```

浏览器实测 27 个地区标签，全部落到预期语言。

### 实测

- 本机搭出与上线完全一致的目录结构（根目录 `app-ads.txt` + 转发页 + `MyNotes/site/`），
  11 条路径全部 200；根目录访问自动跳到 `/MyNotes/site/en/`，图片零失败、无横向溢出。
- `check.py` 扩了 6 项根目录检查（转发页存在、15 种语言齐全、路径前缀、noindex、
  sitemap 地址、以及**不得生成 app-ads.txt**），15 种语言全部通过。
