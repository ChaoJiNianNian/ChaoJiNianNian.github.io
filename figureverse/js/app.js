'use strict';

/* ================================================================
 * 模玩集市 FIGUREVERSE · 前端应用
 * ================================================================ */

/* ---------- 工具 ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const fmt = (n) => Number(n).toLocaleString('zh-CN');
const rand = (a, b) => a + Math.floor(Math.random() * (b - a + 1));
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

/* ---------- 图标 ---------- */
const ICONS = {
  search: '<circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>',
  compass: '<circle cx="12" cy="12" r="9"/><path d="m15.5 8.5-2 5-5 2 2-5z"/>',
  community: '<path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8z"/>',
  megaphone: '<path d="m3 11 18-8-8 18-2.5-7.5z"/><path d="M3 11 21 3"/>',
  shield: '<path d="M12 22s8-3.5 8-10V5l-8-3-8 3v7c0 6.5 8 10 8 10z"/><path d="m9 12 2 2 4-4"/>',
  chat: '<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22z"/>',
  box: '<path d="M6 2h12l4 6-10 14L2 8z"/><path d="M2 8h20"/><path d="M9 8 8 2M15 8l1-6"/>',
  heart: '<path d="M19 14c1.5-1.4 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3.4 1-4.5 2.5C10.9 4 9.3 3 7.5 3A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.1 3 5.5l7 7z"/>',
  bell: '<path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>',
  wallet: '<rect x="2" y="6" width="20" height="13" rx="3"/><path d="M16 12.5h.01"/><path d="M2 10h20"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  send: '<path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/>',
  camera: '<path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/>',
  star: '<path d="m12 2 3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  flame: '<path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z"/>',
  award: '<circle cx="12" cy="8" r="6"/><path d="M15.5 13 17 22l-5-3-5 3 1.5-9"/>',
  bag: '<path d="M6 2h12l2 18H4z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
  eye: '<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/>',
  thumbs: '<path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88z"/>',
  user: '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
  upload: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><path d="m17 8-5-5-5 5"/><path d="M12 3v12"/>',
  tag: '<path d="M12 2H2v10l9.3 9.3a2 2 0 0 0 2.8 0l7.2-7.2a2 2 0 0 0 0-2.8z"/><circle cx="7" cy="7" r="1.5"/>',
  home: '<path d="m3 10 9-8 9 8"/><path d="M5 8v13h14V8"/>',
  sparkle: '<path d="M12 3l1.9 5.6L19.5 10l-5.6 1.9L12 17.5l-1.9-5.6L4.5 10l5.6-1.4z"/>',
  lock: '<rect x="4" y="11" width="16" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  gem: '<path d="M6 3h12l4 6-10 13L2 9z"/><path d="M2 9h20M9 3l3 6 3-6M12 22 9 9M15 9l-3 13"/>',
};

function icon(name, size = 18) {
  return `<svg class="ic" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg>`;
}

/* ---------- 全局状态 ---------- */
const state = {
  view: 'market',
  category: '全部',
  sort: '综合',
  condition: '全部',
  certOnly: false,
  query: '',
  postTab: '推荐',
  favs: new Set(['p1', 'p5']),
  likes: new Set(),
  activeChat: 0,
  userName: '模玩星人',
  orders: [],
  postedProducts: [],
  postedPosts: [],
  postedWants: [],
  escrowStep: 0,
};

/* ================================================================
 * 示例数据
 * ================================================================ */
const PRODUCTS = [
  { id: 'p1', name: '初音未来 V4X 1/7 手办', series: 'VOCALOID', cat: '手办', price: 1280, orig: 1599, cond: '全新未拆', cert: '已鉴定', art: 'twin', palette: ['#22d3ee', '#a78bfa', '#f0abfc'], seller: '秋叶原仓鼠', level: '皇冠卖家', rating: 4.98, sales: 342, likes: 812, tags: ['日版', '带特典', '可小刀'], ship: '东京 → 上海', time: '2小时前', featured: true },
  { id: 'p2', name: '明日方舟 阿米娅 粘土人 全可动', series: '明日方舟', cat: '粘土人', price: 268, orig: 329, cond: '仅拆检', cert: '待鉴定', art: 'cat', palette: ['#fb923c', '#f472b6', '#fde68a'], seller: '胶佬阿伟', level: '钻石卖家', rating: 4.92, sales: 158, likes: 231, tags: ['国行', '配件全', '顺丰包邮'], ship: '广州 → 全国', time: '5小时前' },
  { id: 'p3', name: '鬼灭之刃 灶门炭治郎 1/8 燃烧ver', series: '鬼灭之刃', cat: '手办', price: 458, orig: 520, cond: '九成新', cert: '已鉴定', art: 'sword', palette: ['#34d399', '#0ea5a4', '#fbbf24'], seller: '模玩小仓库', level: '皇冠卖家', rating: 4.95, sales: 96, likes: 154, tags: ['日版', '有盒说'], ship: '上海', time: '昨天' },
  { id: 'p4', name: '魔女之旅 伊蕾娜 1/7 星月夜', series: '魔女之旅', cat: '手办', price: 899, orig: 1080, cond: '全新未拆', cert: '已鉴定', art: 'witch', palette: ['#a78bfa', '#7c5cff', '#f0abfc'], seller: '二次元老张', level: '金牌卖家', rating: 4.88, sales: 64, likes: 402, tags: ['日版', '特典挂画', '慢出'], ship: '杭州', time: '3天前' },
  { id: 'p5', name: 'FGO 贞德Alter 1/7 黑贞', series: 'Fate', cat: '手办', price: 1560, orig: 1750, cond: '仅拆检', cert: '已鉴定', art: 'knight', palette: ['#fb7185', '#7c5cff', '#f472b6'], seller: '未拆箱的夏天', level: '皇冠卖家', rating: 4.99, sales: 47, likes: 620, tags: ['日版', '无瑕疵', '已鉴定'], ship: '北京', time: '1天前', featured: true },
  { id: 'p6', name: '兔女郎 拉姆 1/4 蕾丝ver', series: 'RE:0', cat: '手办', price: 2199, orig: 2480, cond: '九成新', cert: '待鉴定', art: 'bunny', palette: ['#f43f5e', '#fb7185', '#fda4af'], seller: '胶佬阿伟', level: '钻石卖家', rating: 4.92, sales: 21, likes: 388, tags: ['限定', '带盒', '仅售同城'], ship: '广州', time: '2天前' },
  { id: 'p7', name: '高达 RX-0 独角兽 完美形态 PG', series: '高达', cat: '周边', price: 1380, orig: 1500, cond: '全新未拆', cert: '已鉴定', art: 'mecha', palette: ['#38bdf8', '#6366f1', '#7ce5f5'], seller: '胶佬阿伟', level: '钻石卖家', rating: 4.92, sales: 128, likes: 265, tags: ['万代正版', '未拼装', '可验货'], ship: '广州 → 全国', time: '4小时前' },
  { id: 'p8', name: '学园偶像 穗乃果 一番赏 A赏', series: 'LL!', cat: '一番赏', price: 98, orig: 120, cond: '全新未拆', cert: '待鉴定', art: 'school', palette: ['#fbbf24', '#fb923c', '#fff3bf'], seller: '咸鱼翻身中', level: '银牌卖家', rating: 4.76, sales: 512, likes: 96, tags: ['盲盒', '保A赏', '现货'], ship: '深圳', time: '30分钟前' },
  { id: 'p9', name: '初音未来 一番赏2024 B赏 双人', series: 'VOCALOID', cat: '一番赏', price: 328, orig: 399, cond: '仅拆检', cert: '已鉴定', art: 'twin', palette: ['#f0abfc', '#f472b6', '#fff3bf'], seller: '峡谷收藏家', level: '金牌卖家', rating: 4.9, sales: 204, likes: 176, tags: ['现货', '拍下48h发'], ship: '成都', time: '6小时前' },
  { id: 'p10', name: '明日方舟 斯卡蒂 泳装 1/7', series: '明日方舟', cat: '手办', price: 1100, orig: 1290, cond: '九成新', cert: '已鉴定', art: 'cat', palette: ['#2dd4bf', '#0ea5e9', '#a5f3fc'], seller: '模玩小仓库', level: '皇冠卖家', rating: 4.95, sales: 38, likes: 291, tags: ['日版', '无盒', '可视频验货'], ship: '上海', time: '4天前' },
  { id: 'p11', name: '原神 雷电将军 1/7 雷光', series: '原神', cat: '手办', price: 1690, orig: 1890, cond: '全新未拆', cert: '待鉴定', art: 'knight', palette: ['#a78bfa', '#c084fc', '#fde68a'], seller: '未拆箱的夏天', level: '皇冠卖家', rating: 4.99, sales: 29, likes: 540, tags: ['国行', '首批特典', '包鉴定费'], ship: '北京', time: '8小时前', featured: true },
  { id: 'p12', name: '缘之空 春日野穹 1/7 浴衣', series: '缘之空', cat: '手办', price: 760, orig: 880, cond: '展示品', cert: '已鉴定', art: 'twin', palette: ['#e2e8f0', '#94a3b8', '#f8fafc'], seller: '峡谷收藏家', level: '金牌卖家', rating: 4.9, sales: 83, likes: 310, tags: ['有盒', '瑕疵已标注'], ship: '成都', time: '5天前' },
];

const POSTS = [
  { id: 'post1', author: '秋叶原仓鼠', level: '皇冠', tag: '晒图', tagCls: 'tag-pink', time: '28分钟前', title: '入坑三年，晒晒我的初音全系列墙柜！', desc: '从第一只景品到现在，终于把初音的正比例基本收齐了。柜子加了RGB灯带，晚上看效果绝了。想问下大家防潮和除尘都是怎么做的？', art: 'twin', palette: ['#22d3ee', '#a78bfa', '#f0abfc'], likes: 342, comments: 87, views: '2.1w' },
  { id: 'post2', author: '胶佬阿伟', level: '钻石', tag: '教程', tagCls: 'tag-cyan', time: '1小时前', title: '手办保养防氧化指南（建议收藏）', desc: '1. 避光陈列，UV灯尽量别照；2. 透明展示盒里放硅胶干燥剂；3. 塑料件氧化变黄可用双氧水+阳光翻新（需谨慎）；4. 关节松动用关节加固液……欢迎补充。', art: 'school', palette: ['#38bdf8', '#6366f1', '#7ce5f5'], likes: 1280, comments: 236, views: '8.7w' },
  { id: 'post3', author: '未拆箱的夏天', level: '皇冠', tag: '讨论', tagCls: 'tag-amber', time: '3小时前', title: '现在买手办，你们还看「厂牌」吗？', desc: '最近发现同价位不同厂牌做工差距真的很大，有些小厂细节甚至吊打大厂。大家买的时候会优先看厂牌、原型师还是直接看实物图？理性讨论。', art: 'cat', palette: ['#fb923c', '#f472b6', '#fde68a'], likes: 511, comments: 178, views: '3.4w' },
  { id: 'post4', author: '峡谷收藏家', level: '金牌', tag: '开箱', tagCls: 'tag-green', time: '5小时前', title: '雷电将军 1/7 开箱，品控超出预期', desc: '等了半年终于到了。整体涂装干净，脸相很还原，底座特效件透光效果拉满。顺手拍了细节图，供想入的朋友参考～', art: 'knight', palette: ['#a78bfa', '#c084fc', '#fde68a'], likes: 288, comments: 64, views: '1.9w' },
  { id: 'post5', author: '二次元老张', level: '金牌', tag: '求助', tagCls: 'tag-red', time: '8小时前', title: '求助：收来的手办中奖了，卖家不认怎么办？', desc: '通过平台担保交易收了一只景品，拆盒后发现脚部有溢色。已按流程申请平台介入并寄去鉴定，目前等结果中。提醒大家大额交易一定走担保和鉴定！', art: 'sword', palette: ['#34d399', '#0ea5a4', '#fbbf24'], likes: 156, comments: 92, views: '9.6k' },
  { id: 'post6', author: '咸鱼翻身中', level: '银牌', tag: '晒图', tagCls: 'tag-pink', time: '昨天', title: '一番赏抽到A赏啦！欧气分享', desc: '本来只是想试试水，结果第一发就是A赏初音！当场和旁边的小哥换了B赏双人。分享一下欧气，接好运！', art: 'twin', palette: ['#f0abfc', '#f472b6', '#fff3bf'], likes: 902, comments: 143, views: '5.2w' },
];

const WANTS = [
  { id: 'w1', title: '求购 初音未来 V4X 1/7 全新未拆', budget: '¥1200 - 1400', author: '初音脑残粉', time: '12分钟前', offers: 5, desc: '全新未拆优先，日版国行均可，带鉴定证书更好。价格可谈，走平台担保！', tags: ['日版优先', '可走担保'], cat: '手办' },
  { id: 'w2', title: '求购 明日方舟 阿米娅 粘土人', budget: '¥200 - 280', author: '博士本博', time: '1小时前', offers: 8, desc: '国行带盒说，瑕疵不太严重就行，主要放柜子里展示。', tags: ['国行', '瑕疵可接受'], cat: '粘土人' },
  { id: 'w3', title: '求购 独角兽高达 PG 完美形态', budget: '¥1250 - 1380', author: 'MG党叛变中', time: '3小时前', offers: 3, desc: '全新未拼装，盒说齐全，走担保交易，可承担鉴定费。', tags: ['未拼装', '担保交易'], cat: '周边' },
  { id: 'w4', title: '求购 黑贞德 Alter 1/7', budget: '¥1300 - 1600', author: '御主一号', time: '昨天', offers: 12, desc: '日版优先，只要已鉴定或愿意走平台鉴定的，面交也可（上海）。', tags: ['已鉴定', '上海面交'], cat: '手办' },
  { id: 'w5', title: '收一番赏 初音2024 A/B赏', budget: '¥300 - 380', author: '盲盒勇士', time: '昨天', offers: 4, desc: 'A赏B赏都要，全配无损，价格好商量，长期收。', tags: ['长期收', '全配'], cat: '一番赏' },
  { id: 'w6', title: '求购 兔女郎 拉姆 1/4', budget: '¥1800 - 2100', author: '蕾姆单推人', time: '2天前', offers: 6, desc: '给朋友收的生日礼物，一定要全新或者仅拆检无瑕疵，带盒。', tags: ['生日礼物', '全新优先'], cat: '手办' },
];

const CHATS = [
  { id: 'c0', name: '秋叶原仓鼠', level: '皇冠卖家', online: true, unread: 2, last: '这款还能小刀吗？', avatar: ['#22d3ee', '#7c5cff'], msgs: [
    { me: false, text: '你好，在的～ 想问下初音V4X还在吗？', time: '14:02' },
    { me: true, text: '在的，全新未拆，已经过平台鉴定了', time: '14:05' },
    { me: false, text: '太好了，这款还能小刀吗？', time: '14:08' },
  ]},
  { id: 'c1', name: '胶佬阿伟', level: '钻石卖家', online: true, unread: 0, last: '阿米娅可以包个鉴定费', avatar: ['#fb923c', '#f472b6'], msgs: [
    { me: true, text: '阿米娅那个配件都齐吗？', time: '昨天' },
    { me: false, text: '配件全的，可以视频验货', time: '昨天' },
    { me: false, text: '阿米娅可以包个鉴定费', time: '昨天' },
  ]},
  { id: 'c2', name: '鉴定中心客服', level: '官方', online: true, unread: 1, last: '您的鉴定单已受理，预计48小时出证', avatar: ['#34d399', '#22d3ee'], msgs: [
    { me: false, text: '您好，您的鉴定申请已受理', time: '10:20' },
    { me: false, text: '您的鉴定单已受理，预计48小时出证', time: '10:21' },
  ]},
  { id: 'c3', name: '未拆箱的夏天', level: '皇冠卖家', online: false, unread: 0, last: '黑贞全新没有了，仅拆检可以吗', avatar: ['#fb7185', '#7c5cff'], msgs: [
    { me: false, text: '你好，黑贞那款还在的', time: '昨天' },
    { me: true, text: '有没有全新未拆的？', time: '昨天' },
    { me: false, text: '黑贞全新没有了，仅拆检可以吗', time: '昨天' },
  ]},
  { id: 'c4', name: '模玩小仓库', level: '皇冠卖家', online: true, unread: 0, last: '炭治郎已发货，单号SF1234567890', avatar: ['#34d399', '#0ea5a4'], msgs: [
    { me: false, text: '炭治郎已发货，单号SF1234567890', time: '09:12' },
  ]},
  { id: 'c5', name: '二次元老张', level: '金牌卖家', online: false, unread: 0, last: '伊蕾娜走担保的话我可以包邮', avatar: ['#a78bfa', '#7c5cff'], msgs: [
    { me: false, text: '伊蕾娜那款品相很好，放心入', time: '周一' },
    { me: false, text: '伊蕾娜走担保的话我可以包邮', time: '周一' },
  ]},
];

const NOTICES = [
  { icon: '🛡', title: '鉴定完成通知', desc: '您寄送的「初音未来 V4X」鉴定通过，证书已生成。', time: '10分钟前' },
  { icon: '💰', title: '货款已托管', desc: '订单 #FV20260807012 买家已付款，货款已进入平台托管。', time: '32分钟前' },
  { icon: '📦', title: '物流更新', desc: '「炭治郎 燃烧ver」已到达【上海转运中心】。', time: '1小时前' },
  { icon: '💬', title: '收到新消息', desc: '秋叶原仓鼠 回复了您的聊天。', time: '2小时前' },
];

const HOT_TOPICS = [
  { title: '手办防氧化翻新指南', count: '8.7w' },
  { title: '2026下半年 新品手办推荐', count: '5.2w' },
  { title: '厂牌品控红黑榜', count: '3.9w' },
  { title: '一番赏改价风波讨论', count: '3.4w' },
  { title: '柜子灯光布置方案征集', count: '2.8w' },
  { title: '鉴定收费该不该平台化？', count: '2.1w' },
];

const CERT_FEED = [
  { icon: '✓', name: '初音未来 V4X', result: '鉴定通过 · 正品', time: '12分钟前' },
  { icon: '✓', name: '黑贞德 Alter 1/7', result: '鉴定通过 · 正品', time: '46分钟前' },
  { icon: '!', name: '某景品 溢色件', result: '非正品 · 已拦截交易', time: '2小时前' },
  { icon: '✓', name: '独角兽高达 PG', result: '鉴定通过 · 正品', time: '3小时前' },
];

const TAGS = ['初音未来', '一番赏', '粘土人', 'GK', '雕像', '景品', '手办保养', '开箱', '出坑回血', '防氧化', '改装', '展示柜'];

const ANNOUNCEMENTS = [
  { text: '<b>担保交易新规</b>：8月1日起单笔≥500元订单强制走平台担保', time: '08-05' },
  { text: '<b>鉴定中心升级</b>：新增视频直播鉴定，当日可出证', time: '08-03' },
  { text: '<b>社区公约 v3.0</b> 已上线，恶意抬价将被限流', time: '07-28' },
];

const DEALS = [
  '初音未来 V4X 1/7', '¥1,280', '已成交',
  '阿米娅 粘土人', '¥268', '已托管',
  '黑贞德 1/7', '¥1,560', '已鉴定',
  '独角兽高达 PG', '¥1,380', '运输中',
  '一番赏 B赏 双人', '¥328', '已成交',
  '伊蕾娜 1/7 星月夜', '¥899', '已托管',
];

const ORDERS_SEED = [
  { id: 'FV20260807001', name: '初音未来 V4X 1/7 手办', price: 1280, status: '托管中', statusCls: 'st-hold', art: 'twin', palette: ['#22d3ee', '#a78bfa', '#f0abfc'], time: '08-07 10:32' },
  { id: 'FV20260805002', name: '明日方舟 阿米娅 粘土人', price: 268, status: '鉴定中', statusCls: 'st-auth', art: 'cat', palette: ['#fb923c', '#f472b6', '#fde68a'], time: '08-05 15:10' },
  { id: 'FV20260802003', name: '高达 RX-0 独角兽 PG', price: 1380, status: '运输中', statusCls: 'st-shipping', art: 'mecha', palette: ['#38bdf8', '#6366f1', '#7ce5f5'], time: '08-02 09:44' },
  { id: 'FV20260728004', name: '春日野穹 1/7 浴衣', price: 760, status: '已完成', statusCls: 'st-done', art: 'twin', palette: ['#e2e8f0', '#94a3b8', '#f8fafc'], time: '07-28 20:16' },
];

/* ================================================================
 * SVG 商品视觉
 * ================================================================ */
const SIL = '#0a0d1a';

function uid(id) { return 'g' + String(id).replace(/[^a-zA-Z0-9]/g, ''); }

function starField(seed) {
  let s = '';
  for (let i = 0; i < 26; i++) {
    const x = (i * 53 + seed * 7) % 316 + 2;
    const y = (i * 97 + seed * 13) % 190 + 6;
    const r = 0.8 + (i % 3) * 0.5;
    const o = 0.18 + ((i * 37) % 60) / 100;
    if (i % 6 === 0) {
      s += `<path d="M${x} ${y - 4} L${x + 1.2} ${y - 1.2} L${x + 4} ${y} L${x + 1.2} ${y + 1.2} L${x} ${y + 4} L${x - 1.2} ${y + 1.2} L${x - 4} ${y} L${x - 1.2} ${y - 1.2} Z" fill="#fff" opacity="${o + 0.2}"/>`;
    } else {
      s += `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${o}"/>`;
    }
  }
  return s;
}

function baseBits(c1) {
  return `
    <g fill="${SIL}" stroke="${c1}" stroke-width="1.6" stroke-linejoin="round">
      <circle cx="160" cy="108" r="30"/>
      <rect x="153" y="134" width="14" height="12" rx="5"/>
      <path d="M138 146 C138 134 150 128 160 128 C170 128 182 134 182 146 L178 192 C168 200 152 200 142 192 Z"/>
      <path d="M140 146 C128 154 124 168 127 182" fill="none" stroke-width="11" stroke-linecap="round"/>
      <path d="M180 146 C192 154 196 168 193 182" fill="none" stroke-width="11" stroke-linecap="round"/>
      <path d="M147 192 C147 204 149 211 151 217" fill="none" stroke-width="11" stroke-linecap="round"/>
      <path d="M173 192 C173 204 171 211 169 217" fill="none" stroke-width="11" stroke-linecap="round"/>
      <ellipse cx="160" cy="226" rx="52" ry="10"/>
      <rect x="136" y="223" width="48" height="11" rx="6"/>
    </g>`;
}

function faceBits(c1, glowId) {
  return `
    <circle cx="149" cy="112" r="3.2" fill="${c1}" filter="url(#${glowId})"/>
    <circle cx="171" cy="112" r="3.2" fill="${c1}" filter="url(#${glowId})"/>
    <ellipse cx="143" cy="124" rx="5.5" ry="3" fill="#fb7185" opacity=".35"/>
    <ellipse cx="177" cy="124" rx="5.5" ry="3" fill="#fb7185" opacity=".35"/>`;
}

function FIGURES(type, c1, c2, c3) {
  const g = uid(type + c1 + c2 + c3);
  const glow = `f${g}`;
  let extra = '';
  let aura = '';
  let ground = `<ellipse cx="160" cy="228" rx="58" ry="11" fill="${c1}" opacity=".13" filter="url(#${glow})"/>`;

  switch (type) {
    case 'twin':
      extra = `
        <path d="M126 82 C96 76 86 96 92 126 C96 148 104 160 112 176 C108 146 110 116 126 100 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M194 82 C224 76 234 96 228 126 C224 148 216 160 208 176 C212 146 210 116 194 100 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M132 102 Q145 88 160 90 Q175 88 188 102 Q182 82 160 80 Q138 82 132 102 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M139 86 Q146 70 156 72 M181 86 Q174 70 164 72" fill="none" stroke="${c1}" stroke-width="3" stroke-linecap="round"/>`;
      aura = `<ellipse cx="160" cy="130" rx="86" ry="78" fill="${c3}" opacity=".10" filter="url(#${glow})"/>`;
      break;
    case 'cat':
      extra = `
        <path d="M138 86 L126 58 L148 74 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M182 86 L194 58 L172 74 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M190 152 Q208 162 205 180" fill="none" stroke="${SIL}" stroke-width="9" stroke-linecap="round"/>
        <path d="M190 152 Q208 162 205 180" fill="none" stroke="${c1}" stroke-width="1.4" stroke-linecap="round"/>
        <path d="M134 104 Q160 92 186 104" fill="none" stroke="${SIL}" stroke-width="8" stroke-linecap="round"/>
        <path d="M134 104 Q160 92 186 104" fill="none" stroke="${c1}" stroke-width="1.4" stroke-linecap="round"/>`;
      aura = `<ellipse cx="160" cy="132" rx="84" ry="76" fill="${c2}" opacity=".12" filter="url(#${glow})"/>`;
      break;
    case 'sword':
      extra = `
        <path d="M133 102 Q128 74 142 62 Q151 84 160 76 Q169 84 178 62 Q192 74 187 102 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M204 148 L182 96" fill="none" stroke="${c1}" stroke-width="5" stroke-linecap="round"/>
        <path d="M180 96 L188 92 M182 96 L179 104" fill="none" stroke="${c3}" stroke-width="3" stroke-linecap="round"/>`;
      aura = `<ellipse cx="160" cy="126" rx="80" ry="70" fill="${c2}" opacity=".14" filter="url(#${glow})"/>`;
      break;
    case 'witch':
      extra = `
        <path d="M126 94 Q160 50 194 94 Q184 74 160 74 Q136 74 126 94 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6" stroke-linejoin="round"/>
        <ellipse cx="160" cy="94" rx="36" ry="8" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M166 196 L206 168" fill="none" stroke="#8b5e34" stroke-width="6" stroke-linecap="round"/>
        <path d="M198 172 L210 166 M204 177 L216 171 M208 182 L220 176" stroke="${c3}" stroke-width="3" stroke-linecap="round"/>
        <path d="M160 88 L160 84 M157 85 L163 85" stroke="${c3}" stroke-width="1.6" stroke-linecap="round"/>`;
      aura = `<ellipse cx="160" cy="130" rx="84" ry="76" fill="${c1}" opacity=".12" filter="url(#${glow})"/>`;
      break;
    case 'knight':
      extra = `
        <path d="M130 102 Q130 70 160 70 Q190 70 190 102 L185 118 Q160 132 135 118 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M142 132 Q160 148 178 132 L184 196 Q160 210 136 196 Z" fill="${SIL}" opacity=".92" stroke="${c1}" stroke-width="1.6"/>
        <path d="M160 78 L160 52" stroke="${c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M152 58 L168 58" stroke="${c3}" stroke-width="3" stroke-linecap="round"/>`;
      aura = `<ellipse cx="160" cy="132" rx="82" ry="80" fill="${c2}" opacity=".13" filter="url(#${glow})"/>`;
      break;
    case 'bunny':
      extra = `
        <path d="M145 82 Q142 44 155 40 Q166 58 160 84 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M175 82 Q178 44 165 40 Q154 58 160 84 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <ellipse cx="160" cy="172" rx="36" ry="26" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M128 166 C116 158 112 148 114 138 M192 166 C204 158 208 148 206 138" fill="none" stroke="${c1}" stroke-width="3" stroke-linecap="round"/>
        <path d="M160 88 L160 82 M157 85 L163 85" stroke="${c3}" stroke-width="1.6" stroke-linecap="round"/>`;
      aura = `<ellipse cx="160" cy="130" rx="82" ry="74" fill="${c1}" opacity=".14" filter="url(#${glow})"/>`;
      break;
    case 'mecha':
      extra = `
        <polygon points="138,96 160,76 182,96 176,118 144,118" fill="${SIL}" stroke="${c1}" stroke-width="1.6" stroke-linejoin="round"/>
        <path d="M150 106 L156 112 M164 104 L158 110" stroke="${c3}" stroke-width="2" stroke-linecap="round"/>
        <path d="M160 76 L160 58" stroke="${c1}" stroke-width="3" stroke-linecap="round"/>
        <circle cx="160" cy="120" r="4" fill="${c3}" filter="url(#${glow})"/>
        <circle cx="136" cy="136" r="9" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <circle cx="184" cy="136" r="9" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>`;
      aura = `<ellipse cx="160" cy="128" rx="84" ry="72" fill="${c2}" opacity=".15" filter="url(#${glow})"/>`;
      break;
    case 'school':
      extra = `
        <circle cx="138" cy="76" r="12" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <circle cx="182" cy="76" r="12" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M134 106 Q160 94 186 106 L182 122 Q160 112 138 122 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <path d="M144 186 L176 186 L184 208 L136 208 Z" fill="${SIL}" stroke="${c1}" stroke-width="1.6"/>
        <circle cx="139" cy="74" r="3" fill="${c3}" opacity=".9"/>
        <circle cx="181" cy="74" r="3" fill="${c3}" opacity=".9"/>`;
      aura = `<ellipse cx="160" cy="130" rx="82" ry="72" fill="${c2}" opacity=".12" filter="url(#${glow})"/>`;
      break;
    default:
      extra = '';
  }

  return `
    <defs>
      <filter id="${glow}" x="-60%" y="-60%" width="220%" height="220%"><feGaussianBlur stdDeviation="10"/></filter>
    </defs>
    ${aura}
    ${ground}
    ${baseBits(c1)}
    ${extra}
    ${faceBits(c1, glow)}`;
}

function productArt(item) {
  const id = uid(item.id);
  const [c1, c2, c3] = item.palette;
  const artId = uid(item.id + item.art);
  const seed = item.id.charCodeAt(1) || 3;
  return `<svg viewBox="0 0 320 320" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
    <defs>
      <linearGradient id="bg${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="${c1}" stop-opacity=".48"/>
        <stop offset=".45" stop-color="${c2}" stop-opacity=".26"/>
        <stop offset="1" stop-color="#070810" stop-opacity="1"/>
      </linearGradient>
      <radialGradient id="halo${id}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="${c3}" stop-opacity=".7"/>
        <stop offset=".55" stop-color="${c2}" stop-opacity=".28"/>
        <stop offset="1" stop-color="${c2}" stop-opacity="0"/>
      </radialGradient>
      <linearGradient id="body${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="${c3}"/>
        <stop offset="1" stop-color="${c2}"/>
      </linearGradient>
    </defs>
    <rect width="320" height="320" fill="url(#bg${id})"/>
    <circle cx="160" cy="150" r="125" fill="url(#halo${id})"/>
    ${starField(seed)}
    ${FIGURES(item.art, c1, c2, c3).replace('defs></defs>', '')}
    <rect width="320" height="320" fill="none" stroke="rgba(255,255,255,.05)"/>
  </svg>`;
}

/* 简化场景版（帖子配图用） */
function sceneArt(type, palette) {
  return productArt({ id: 's' + type + (palette[0] || ''), art: type, palette });
}

/* ================================================================
 * 视图渲染
 * ================================================================ */
const CATS = ['全部', '手办', '景品', '雕像', '粘土人', '一番赏', 'GK', '周边'];
const SORTS = ['综合', '最新', '价格升', '价格降', '热度'];
const CONDS = ['全部', '全新未拆', '仅拆检', '九成新', '展示品'];

function certBadge(item) {
  return item.cert === '已鉴定'
    ? `<span class="badge-cert">已鉴定</span>`
    : `<span class="badge-cert badge-wait">未鉴定</span>`;
}

function condBadge(item) {
  return `<span class="badge-cert badge-cond">${item.cond}</span>`;
}

function productCard(p) {
  const liked = state.favs.has(p.id);
  return `
  <article class="product-card reveal" data-id="${p.id}">
    <div class="p-art">
      ${productArt(p)}
      <div class="p-badges">${certBadge(p)}${p.cond === '全新未拆' ? '<span class="badge-cert badge-new">新品</span>' : ''}</div>
      <button class="p-fav ${liked ? 'on' : ''}" data-fav="${p.id}" aria-label="收藏">
        ${icon('heart', 16)}
      </button>
    </div>
    <div class="p-info">
      <div class="p-seller">
        <span class="avatar avatar-sm" style="--a1:${p.palette[0]};--a2:${p.palette[1]}">${p.seller[0]}</span>
        <span>${p.seller}</span><span class="lv">${p.level}</span>
        <span style="margin-left:auto;color:var(--cyan)">★${p.rating}</span>
      </div>
      <h3 class="p-name">${p.name}</h3>
      <div class="p-tags">${p.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}</div>
      <div class="p-bottom">
        <div class="p-price"><b>${p.price.toLocaleString('zh-CN')}</b>${p.orig ? `<s>¥${p.orig}</s>` : ''}</div>
        <div class="p-meta"><span class="sold">已售 ${p.sales}</span><br>${p.ship} · ${p.time}</div>
      </div>
    </div>
  </article>`;
}

function renderRail() {
  $('#hotList').innerHTML = HOT_TOPICS.map(t => `<li><span class="hot-title">${t.title}</span><span class="hot-count">${t.count}</span></li>`).join('');
  $('#certFeed').innerHTML = CERT_FEED.map(c => `
    <div class="cert-item">
      <span class="c-seal">${c.icon}</span>
      <div><b>${c.name}</b><p>${c.result}</p></div>
      <span class="c-time">${c.time}</span>
    </div>`).join('');
  $('#tagCloud').innerHTML = TAGS.map(t => `<span class="t" data-tag="${t}"># ${t}</span>`).join('');
  $('#noticeFeed').innerHTML = ANNOUNCEMENTS.map(a => `<div class="nf">${a.text}<time>${a.time}</time></div>`).join('');
  $$('#tagCloud .t').forEach(el => el.addEventListener('click', () => {
    state.view = 'market';
    state.category = '全部';
    state.query = el.dataset.tag.replace('# ', '');
    location.hash = 'market';
  }));
}

function renderHero() {
  const h1 = PRODUCTS[0], h2 = PRODUCTS[4], h3 = PRODUCTS[8];
  return `
  <section class="hero reveal">
    <div class="hero-bg"><span class="hb hb1"></span><span class="hb hb2"></span><span class="hb hb3"></span></div>
    <div class="hero-inner">
      <div>
        <span class="hero-badge">✦ 第三方鉴定 · 资金托管 · 假一赔三</span>
        <h1>让每一件手办<br>找到<span class="grad">懂它的人</span></h1>
        <p class="sub">模玩集市是专注手办模型的交易与社区平台。出坑回血、求购捡漏、开箱晒柜、权威鉴定，一站式搞定。</p>
        <div class="hero-cta">
          <button class="btn btn-primary btn-lg" data-goto="market">${icon('compass', 17)} 去逛逛</button>
          <button class="btn btn-soft btn-lg" id="heroPublish">${icon('plus', 17)} 发布宝贝</button>
        </div>
        <div class="hero-stats">
          <div class="hs"><b data-count="12847">0</b><span>在售宝贝</span></div>
          <div class="hs"><b data-count="96320">0</b><span>累计成交</span></div>
          <div class="hs"><b data-count="100" data-suffix="%">0</b><span>担保覆盖</span></div>
          <div class="hs"><b data-count="328660">0</b><span>社区玩家</span></div>
        </div>
      </div>
      <div class="hero-stage">
        <div class="hero-glow"></div>
        <div class="hero-figure f1">${productArt(h1)}</div>
        <div class="hero-figure f2">${productArt(h2)}</div>
        <div class="hero-figure f3">${productArt(h3)}</div>
      </div>
    </div>
  </section>`;
}

function renderTrust() {
  const items = [
    [icon('lock', 18), '担保交易', '平台托管资金，确认收货才放款'],
    [icon('shield', 18), '权威鉴定', '官方鉴定中心，正品保障'],
    [icon('award', 18), '假一赔三', '鉴定为假，平台先行赔付'],
    [icon('user', 18), '实名交易', '实名认证，全程可追溯'],
  ];
  return `<div class="trust-strip">${items.map(([i, b, s]) => `
    <div class="trust-item reveal"><span class="t-ic">${i}</span><div><b>${b}</b><span>${s}</span></div></div>`).join('')}</div>`;
}

function renderMarquee() {
  const items = [];
  for (let i = 0; i < 2; i++) {
    DEALS.forEach((d, idx) => {
      items.push(idx % 3 === 0
        ? `<span>⚡ <b>${d}</b> 以 <span class="mq-price">${DEALS[idx + 1]}</span> ${DEALS[idx + 2]}</span>`
        : '');
    });
  }
  return `<div class="marquee"><span class="mq-label"></span><div class="marquee-track">${items.filter(Boolean).join('')}${items.filter(Boolean).join('')}</div></div>`;
}

function renderMarket() {
  const catChips = CATS.map(c => `<button class="chip ${state.category === c ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
  const sortSel = SORTS.map(s => `<option ${state.sort === s ? 'selected' : ''}>${s}</option>`).join('');
  const condSel = CONDS.map(c => `<option ${state.condition === c ? 'selected' : ''}>${c}</option>`).join('');

  let list = PRODUCTS.filter(p => {
    const okCat = state.category === '全部' || p.cat === state.category;
    const okCond = state.condition === '全部' || p.cond === state.condition;
    const okCert = !state.certOnly || p.cert === '已鉴定';
    const q = state.query.trim().toLowerCase();
    const okQ = !q || (p.name + p.series + p.tags.join('') + p.seller).toLowerCase().includes(q);
    return okCat && okCond && okCert && okQ;
  });

  if (state.sort === '最新') list = [...list].sort((a, b) => a.time.localeCompare(b.time));
  if (state.sort === '价格升') list = [...list].sort((a, b) => a.price - b.price);
  if (state.sort === '价格降') list = [...list].sort((a, b) => b.price - a.price);
  if (state.sort === '热度') list = [...list].sort((a, b) => b.likes - a.likes);

  const grid = list.length
    ? `<div class="product-grid">${list.map(productCard).join('')}</div>`
    : `<div class="empty"><div class="e-ic">🫥</div><b>没有找到匹配的宝贝</b>换个关键词或筛选条件试试吧</div>`;

  return `
    <div class="view" data-view="market">
      ${renderHero()}
      ${renderTrust()}
      ${renderMarquee()}

      <div class="section-head">
        <div><h2>发现市场</h2><div class="sub">按分类、价格、品相精准筛选 · ${list.length} 件宝贝</div></div>
        <button class="btn btn-ghost btn-sm" id="refreshBtn">${icon('sparkle', 14)} 随机刷新</button>
      </div>

      <div class="filter-bar glass">
        <div class="filter-chips">${catChips}</div>
        <div class="filter-right">
          <label class="switch-row">
            <input type="checkbox" id="certOnly" ${state.certOnly ? 'checked' : ''}>
            <span class="switch"></span>
            仅看已鉴定
          </label>
          <span class="select-wrap"><select id="sortSel">${sortSel}</select></span>
          <span class="select-wrap"><select id="condSel">${condSel}</select></span>
        </div>
      </div>

      ${grid}

      <div class="section-head">
        <div><h2>求购大厅</h2><div class="sub">有人正在找这些宝贝，说不定你有</div></div>
        <a class="more" href="#wanted" data-nav="wanted">进入求购大厅 →</a>
      </div>
      <div class="want-grid">
        ${WANTS.slice(0, 3).map(wantCard).join('')}
      </div>
    </div>`;
}

function wantCard(w) {
  return `
  <div class="want-card reveal" data-want="${w.id}">
    <div class="want-head"><h3 class="want-title">${w.title}</h3><span class="want-price">${w.budget}</span></div>
    <p class="want-desc">${w.desc}</p>
    <div class="want-tags">${w.tags.map(t => `<span class="tag tag-cyan">${t}</span>`).join('')}</div>
    <div class="want-foot">
      <span class="avatar avatar-sm" style="--a1:#22d3ee;--a2:#7c5cff">${w.author[0]}</span>
      <div class="wf-info"><b>${w.author}</b> · ${w.time}<br>已有 ${w.offers} 人出价</div>
      <button class="btn btn-primary btn-sm" data-offer="${w.id}">我来出</button>
    </div>
  </div>`;
}

function postCard(p) {
  const liked = state.likes.has(p.id);
  return `
  <article class="post-card reveal" data-id="${p.id}">
    <div class="post-head">
      <span class="avatar avatar-md" style="--a1:${p.palette[0]};--a2:${p.palette[1]}">${p.author[0]}</span>
      <div class="post-author">
        <b>${p.author}</b>
        <div class="pa-sub"><span class="tag ${p.tagCls}">${p.tag}</span><span>${p.level}玩家</span><span>·</span><span>${p.time}</span></div>
      </div>
      <button class="btn btn-ghost btn-sm" style="margin-left:auto" data-follow>+ 关注</button>
    </div>
    <div class="post-body">
      <h3 class="post-title">${p.title}</h3>
      <p class="post-desc">${p.desc}</p>
      ${p.art ? `<div class="post-img">${sceneArt(p.art, p.palette)}</div>` : ''}
    </div>
    <div class="post-actions">
      <button class="act-btn ${liked ? 'liked' : ''}" data-plike="${p.id}">${icon('thumbs', 14)} <span>${fmt(p.likes + (liked ? 1 : 0))}</span></button>
      <button class="act-btn" data-pcomment="${p.id}">${icon('community', 14)} <span>${p.comments}</span></button>
      <button class="act-btn" data-pshare="${p.id}">${icon('send', 14)} 分享</button>
      <button class="act-btn" style="margin-left:auto;color:var(--text3)">${icon('eye', 14)} ${p.views} 浏览</button>
    </div>
  </article>`;
}

function renderCommunity() {
  const tabs = ['推荐', '最新', '晒图', '讨论', '开箱'];
  let list = [...POSTS];
  if (state.postTab === '最新') list = [...POSTS].reverse();
  if (['晒图', '讨论', '开箱'].includes(state.postTab)) {
    const tagMap = { 晒图: '晒图', 讨论: '讨论', 开箱: '开箱' };
    list = POSTS.filter(p => p.tag === tagMap[state.postTab]);
  }
  return `
  <div class="view" data-view="community">
    <div class="section-head" style="margin-top:0">
      <div><h2>社区广场</h2><div class="sub">晒图、交流、科普，和 32 万玩家一起玩</div></div>
      <button class="btn btn-primary" data-publish-post>${icon('plus', 16)} 发帖</button>
    </div>
    <div class="tab-bar glass" style="padding:8px;border-radius:16px;margin-bottom:16px">
      ${tabs.map(t => `<button class="tab ${state.postTab === t ? 'active' : ''}" data-tab="${t}">${t}</button>`).join('')}
    </div>
    <div class="feed">${list.map(postCard).join('')}</div>
  </div>`;
}

function renderWanted() {
  return `
  <div class="view" data-view="wanted">
    <div class="section-head" style="margin-top:0">
      <div><h2>求购大厅</h2><div class="sub">发布你的心愿单，让卖家主动找到你</div></div>
      <button class="btn btn-primary" data-publish-want>${icon('plus', 16)} 发布求购</button>
    </div>
    <div class="trust-strip" style="grid-template-columns:repeat(3,1fr)">
      <div class="trust-item"><span class="t-ic">${icon('flame', 18)}</span><div><b>328</b><span>正在求购</span></div></div>
      <div class="trust-item"><span class="t-ic">${icon('plus', 18)}</span><div><b>42</b><span>今日新增</span></div></div>
      <div class="trust-item"><span class="t-ic">${icon('check', 18)}</span><div><b>68%</b><span>本周成交率</span></div></div>
    </div>
    <div class="want-grid" style="margin-top:18px">${WANTS.map(wantCard).join('')}</div>
  </div>`;
}

function renderAuth() {
  const tiers = [
    { name: '标准鉴定', dur: '3-5 个工作日', price: '29', hot: false, feats: ['高清图 + 细节检测', '官网可查电子证书', '支持买家查询', '假货全额赔付'] },
    { name: '加急鉴定', dur: '24 小时内出证', price: '69', hot: true, feats: ['标准鉴定全部权益', '当日优先检测通道', '双人复核交叉验证', '平台专属加急标识'] },
    { name: '视频直播鉴定', dur: '在线 1v1 实时', price: '199', hot: false, feats: ['专家全程视频讲解', '边看边问实时答疑', '完整录像留存', '交易双方共同在线'] },
  ];
  return `
  <div class="view" data-view="auth">
    <div class="auth-hero reveal">
      <span class="ah-shield">${icon('shield', 36)}</span>
      <div>
        <h2>第三方权威鉴定中心</h2>
        <p>平台作为独立第三方收费鉴定，联合资深玩家与专业机构双重把关。鉴定为假，交易直接拦截，货款原路退回。</p>
      </div>
      <div class="auth-stats">
        <div><b data-count="128700">0</b><span>累计鉴定</span></div>
        <div><b data-count="48">0</b><span>平均出证(h)</span></div>
        <div><b data-count="99.2" data-decimal="1">0</b><span>好评率 %</span></div>
      </div>
    </div>

    <div class="section-head"><div><h2>鉴定服务</h2><div class="sub">按需选择，价格透明，平台先行赔付</div></div></div>
    <div class="tier-grid">
      ${tiers.map(t => `
        <div class="tier ${t.hot ? 'hot-tier' : ''} reveal">
          ${t.hot ? '<span class="t-pop">最受欢迎</span>' : ''}
          <h3>${t.name}</h3>
          <div class="t-dur">${t.dur}</div>
          <div class="t-price">${t.price}<span>/ 件</span></div>
          <ul>${t.feats.map(f => `<li>${f}</li>`).join('')}</ul>
          <button class="btn ${t.hot ? 'btn-primary' : 'btn-soft'} w-full" data-cert-tier="${t.name}">立即申请</button>
        </div>`).join('')}
    </div>

    <div class="section-head"><div><h2>鉴定流程</h2><div class="sub">从提交到出证，全程可追踪</div></div></div>
    <div class="glass" style="border-radius:20px;padding:26px 18px">
      <div class="step-flow">
        ${['在线提交', '寄送/自送', '专家检测', '出具证书', '交易保障'].map((s, i) => `
          <div class="step"><div class="s-num">${i + 1}</div><b>${s}</b><span>${['填写鉴定单并支付费用', '按地址寄送，全程保价', '双人复核 + 细节拍照', '电子证书同步至订单', '假货拦截，货款退回'][i]}</span></div>`).join('')}
      </div>
    </div>

    <div class="section-head"><div><h2>鉴定证书样例</h2><div class="sub">官方电子证书，防伪可查</div></div></div>
    <div class="cert-demo reveal">
      <div>
        <div class="cd-title">FIGUREVERSE 官方鉴定证书</div>
        <div class="cd-id">NO. FV-2026-08-071286</div>
        <div class="cd-row"><span>鉴定对象</span><b>初音未来 V4X 1/7 手办</b></div>
        <div class="cd-row"><span>送鉴人</span><b>秋叶原仓鼠</b></div>
        <div class="cd-row"><span>鉴定结论</span><b style="color:#7fe8c0">正品 · 通过</b></div>
        <div class="cd-row"><span>鉴定方式</span><b>实物 + 高清影像双复核</b></div>
        <div class="cd-row"><span>出证时间</span><b>2026-08-07 10:26</b></div>
      </div>
      <div class="cd-seal-wrap">
        <div class="cd-seal"><div class="inner"><b>正品</b><span>FIGUERVERSE</span></div></div>
      </div>
    </div>
  </div>`;
}

function renderChat() {
  const c = CHATS[state.activeChat];
  const contacts = CHATS.map((ct, i) => `
    <div class="contact ${i === state.activeChat ? 'active' : ''}" data-contact="${i}">
      <span class="avatar avatar-md" style="--a1:${ct.avatar[0]};--a2:${ct.avatar[1]}">${ct.name[0]}</span>
      <div class="c-info"><b>${ct.name} <span class="lv" style="font-size:10px">${ct.level}</span></b><p>${ct.last}</p></div>
      <div class="c-side">
        <time>${ct.msgs[ct.msgs.length - 1].time}</time>
        ${ct.unread ? `<span class="c-unread">${ct.unread}</span>` : ''}
      </div>
    </div>`).join('');

  const msgs = c.msgs.map(m => `
    <div class="msg ${m.me ? 'me' : ''}">
      ${m.me ? '' : `<span class="avatar avatar-sm" style="--a1:${c.avatar[0]};--a2:${c.avatar[1]}">${c.name[0]}</span>`}
      <div>
        <div class="m-bubble">${m.text}</div>
        <div class="m-time">${m.time}</div>
      </div>
    </div>`).join('');

  return `
  <div class="view" data-view="chat">
    <div class="chat-wrap glass">
      <div class="chat-contacts">
        <div class="chat-search">
          <input type="text" id="chatSearch" placeholder="搜索联系人…">
        </div>
        <div class="contact-list">${contacts}</div>
      </div>
      <div class="conv">
        <div class="conv-head">
          <span class="avatar avatar-md" style="--a1:${c.avatar[0]};--a2:${c.avatar[1]}">${c.name[0]}</span>
          <div class="ch-info"><b>${c.name}</b><span>${c.level} · 在线</span></div>
          <div class="ch-actions">
            <button class="icon-btn" title="发起担保交易">${icon('shield', 17)}</button>
            <button class="icon-btn" title="查看对方资料">${icon('user', 17)}</button>
          </div>
        </div>
        <div class="msg-list" id="msgList">${msgs}<div id="typingSlot"></div></div>
        <div class="conv-input">
          <div class="emoji-row">
            <button data-emoji="😄">😄</button><button data-emoji="👍">👍</button><button data-emoji="🥺">🥺</button><button data-emoji="🔥">🔥</button><button data-emoji="🎁">🎁</button>
          </div>
          <textarea id="chatInput" rows="1" placeholder="输入消息，Enter 发送（Shift+Enter 换行）"></textarea>
          <button class="btn btn-primary" id="sendBtn">${icon('send', 16)} 发送</button>
        </div>
      </div>
    </div>
  </div>`;
}

function renderOrders() {
  const list = [...ORDERS_SEED, ...state.orders];
  const rows = list.length ? list.map(o => `
    <div class="order-card reveal">
      <div class="order-thumb">${productArt({ id: o.id, art: o.art, palette: o.palette })}</div>
      <div class="order-main">
        <b>${o.name}</b>
        <div class="o-sub">订单号 ${o.id} · ${o.time}</div>
      </div>
      <div class="order-price">
        <b>¥${o.price.toLocaleString('zh-CN')}</b>
        <div><span class="order-status ${o.statusCls}">${o.status}</span></div>
      </div>
      <button class="btn btn-soft btn-sm" data-order-view>查看详情</button>
    </div>`).join('')
    : `<div class="empty"><div class="e-ic">📦</div><b>还没有订单</b>去市场逛逛，看中喜欢的就下手吧</div>`;
  return `
  <div class="view" data-view="orders">
    <div class="section-head" style="margin-top:0">
      <div><h2>我的订单</h2><div class="sub">所有订单均受平台担保保护</div></div>
      <div class="filter-right">
        <span class="select-wrap"><select id="orderFilter"><option>全部订单</option><option>托管中</option><option>鉴定中</option><option>运输中</option><option>已完成</option></select></span>
      </div>
    </div>
    <div id="orderList">${rows}</div>
  </div>`;
}

function renderFavs() {
  const list = PRODUCTS.filter(p => state.favs.has(p.id));
  return `
  <div class="view" data-view="favs">
    <div class="section-head" style="margin-top:0">
      <div><h2>我的收藏</h2><div class="sub">${list.length} 件心仪宝贝，降价会提醒你</div></div>
    </div>
    ${list.length ? `<div class="product-grid">${list.map(productCard).join('')}</div>` : `<div class="empty"><div class="e-ic">💖</div><b>收藏夹空空的</b>看到心动的宝贝点右上角小心心收藏</div>`}
  </div>`;
}

/* ---------- 视图路由器 ---------- */
const VIEWS = {
  market: renderMarket,
  community: renderCommunity,
  wanted: renderWanted,
  auth: renderAuth,
  chat: renderChat,
  orders: renderOrders,
  favs: renderFavs,
};

function setNav(view) {
  $$('.side-item').forEach(a => a.classList.toggle('active', a.dataset.nav === view));
  $$('.mobile-nav a').forEach(a => a.classList.toggle('active', a.dataset.nav === view));
}

function render() {
  const fn = VIEWS[state.view] || renderMarket;
  $('#view').innerHTML = fn();
  setNav(state.view);
  window.scrollTo({ top: 0 });
  bindView();
  observeReveal();
  runCounters();
}

function router() {
  const h = (location.hash || '#market').replace('#', '');
  if (VIEWS[h]) state.view = h;
  render();
}

/* ================================================================
 * 弹窗 / Toast
 * ================================================================ */
function openModal(html, size = 'm-md') {
  $('#modalRoot').innerHTML = `
    <div class="modal-mask" id="mask">
      <div class="modal ${size}" role="dialog" aria-modal="true">
        ${html}
      </div>
    </div>`;
  $('#mask').addEventListener('click', (e) => { if (e.target.id === 'mask') closeModal(); });
  bindModal();
}

function closeModal() { $('#modalRoot').innerHTML = ''; }

function toast(msg, type = 'success', title) {
  const icons = { success: '✓', error: '✕', info: 'ℹ' };
  const el = document.createElement('div');
  el.className = `toast ${type}`;
  el.innerHTML = `<span class="t-ic" style="font-weight:800">${icons[type] || '✓'}</span><div>${title ? `<b style="display:block">${title}</b>` : ''}${msg}</div>`;
  $('#toastRoot').appendChild(el);
  setTimeout(() => {
    el.classList.add('out');
    setTimeout(() => el.remove(), 320);
  }, 3200);
}

/* ================================================================
 * 商品详情 / 担保交易
 * ================================================================ */
function openDetail(p) {
  const escrowFee = Math.round(p.price * 0.01);
  const certFee = p.cert === '已鉴定' ? 0 : 69;
  const total = p.price + certFee;
  const saved = p.orig ? p.orig - p.price : 0;
  openModal(`
    <button class="modal-close" data-close>${icon('close', 18)}</button>
    <div class="m-body" style="padding:26px">
      <div class="detail-grid">
        <div class="detail-art">${productArt(p)}</div>
        <div class="detail-info">
          <div style="display:flex;gap:7px;flex-wrap:wrap;margin-bottom:10px">${certBadge(p)}${condBadge(p)}<span class="tag tag-cyan">${p.cat}</span></div>
          <h2>${p.name}</h2>
          <div class="detail-tags">${p.tags.map(t => `<span class="tag">${t}</span>`).join('')}</div>
          <div class="detail-price-row">
            <span class="dp">${p.price.toLocaleString('zh-CN')}</span>
            ${p.orig ? `<s>¥${p.orig.toLocaleString('zh-CN')}</s>` : ''}
            ${saved ? `<span class="dp-save">省 ¥${saved} · 立省 ${Math.round(saved / p.orig * 100)}%</span>` : ''}
          </div>
          <div class="info-lines">
            <div class="il"><span>系列 / 作品</span><b>${p.series}</b></div>
            <div class="il"><span>品相</span><b>${p.cond}</b></div>
            <div class="il"><span>鉴定状态</span><b style="color:${p.cert === '已鉴定' ? '#7fe8c0' : '#ffd98a'}">${p.cert === '已鉴定' ? '已鉴定 · 证书编号 FV-2026-0' + (1280 + Number(p.id.slice(1))) : '未鉴定 · 可申请平台鉴定（¥69）'}</b></div>
            <div class="il"><span>发货地</span><b>${p.ship}</b></div>
            <div class="il"><span>累计售出</span><b>${p.sales} 件</b></div>
          </div>
          <div class="seller-row">
            <span class="avatar avatar-lg" style="--a1:${p.palette[0]};--a2:${p.palette[1]}">${p.seller[0]}</span>
            <div class="sr-info">
              <b>${p.seller} <span class="lv">${p.level}</span></b>
              <p>好评率 ${p.rating * 20}% · 实名认证 · 保证金 ¥2,000</p>
            </div>
            <button class="btn btn-ghost btn-sm" data-contact-seller="${p.seller}">联系卖家</button>
          </div>
          <div class="escrow-note">
            ${icon('shield', 17)}
            <div><b>平台担保保障</b>：付款后货款由平台托管，卖家发货、您确认收货无误后货款才放款；经鉴定为假，平台先行赔付。</div>
          </div>
          <div class="detail-cta">
            <button class="btn btn-primary btn-lg" style="flex:1" data-buy="${p.id}">${icon('bag', 18)} 立即购买</button>
            <button class="btn btn-soft btn-lg" data-fav2="${p.id}">${icon('heart', 18)} 收藏</button>
          </div>
        </div>
      </div>
    </div>`, 'm-lg');
}

function openEscrow(p) {
  const certFee = p.cert === '已鉴定' ? 0 : 69;
  const escrowFee = Math.round(p.price * 0.01);
  const total = p.price + certFee;
  let step = 0;
  const steps = [
    ['买家付款', '货款由平台托管，卖家暂不可见'],
    ['卖家发货', '卖家按担保规则打包发货'],
    ['收货确认', '您确认无误后点击放款'],
    ['完成交易', '货款打给卖家，交易评价开启'],
  ];
  const renderStep = () => {
    const flow = steps.map((s, i) => `
      <div class="ef-step ${i < step ? 'done' : ''} ${i === step ? 'active' : ''}">
        <div class="ef-num">${i < step ? '✓' : i + 1}</div>
        <div class="ef-body"><b>${s[0]}</b><p>${s[1]}</p></div>
      </div>`).join('');
    const btnText = ['确认下单，货款进入平台托管', '等待卖家发货（模拟）', '确认收货并放款', '完成'];
    const act = step >= 3
      ? `<div style="text-align:center;padding-top:6px"><span style="color:#7fe8c0;font-weight:700">🎉 交易完成，评价已开启</span></div>`
      : `<button class="btn btn-primary btn-lg w-full" id="escrowNext">${btnText[step]}</button>`;
    $('#escrowFlow').innerHTML = flow;
    $('#escrowActions').innerHTML = act;
    const btn = $('#escrowNext');
    if (btn) btn.addEventListener('click', advance);
  };
  const advance = () => {
    step++;
    if (step === 1) toast('下单成功，货款已进入平台托管，卖家已收到发货通知', 'info', '担保交易');
    if (step === 2) toast('卖家已发货（模拟顺丰 SF7788990011）', 'info', '物流更新');
    if (step === 3) {
      state.orders.unshift({
        id: 'FV' + Date.now().toString().slice(-10),
        name: p.name, price: p.price, status: '已完成', statusCls: 'st-done',
        art: p.art, palette: p.palette, time: '刚刚',
      });
      toast(`已放款给卖家，交易完成。感谢使用担保交易！`, 'success', '交易完成');
      setTimeout(() => { closeModal(); }, 900);
    }
    renderStep();
  };
  openModal(`
    <button class="modal-close" data-close>${icon('close', 18)}</button>
    <div class="m-body">
      <div class="m-title">担保交易流程</div>
      <div class="m-sub">资金托管 · 验货放款 · 假一赔三</div>
      <div class="escrow-flow" id="escrowFlow"></div>
      <div class="escrow-sum">
        <div class="es-row"><span>商品</span><b>${p.name}</b></div>
        <div class="es-row"><span>商品金额</span><b>¥${p.price.toLocaleString('zh-CN')}</b></div>
        <div class="es-row"><span>鉴定费${certFee ? '（下单时自动送鉴）' : '（已包含）'}</span><b>${certFee ? '¥' + certFee : '¥0'}</b></div>
        <div class="es-row"><span>担保服务费（1%）</span><b>¥${escrowFee}</b></div>
        <div class="es-row total"><span>合计（买家实付）</span><b>${(total + escrowFee).toLocaleString('zh-CN')}</b></div>
      </div>
      <div id="escrowActions" style="margin-top:18px"></div>
      <p style="font-size:11px;color:var(--text3);margin-top:12px;text-align:center">确认收货前款项始终由平台托管；如鉴定为假，货款全额退回并触发赔付。</p>
    </div>`, 'm-md');
  renderStep();
}

/* ================================================================
 * 发布 / 求购 / 帖子
 * ================================================================ */
function openPublishModal(type = 'product') {
  let segType = type;
  const segs = [
    ['product', '发布商品'], ['want', '发布求购'], ['post', '发布帖子'],
  ];
  const forms = {
    product: `
      <div class="field"><label>宝贝标题</label><input id="fTitle" placeholder="例如：初音未来 V4X 1/7 全新未拆"></div>
      <div class="field-row">
        <div class="field"><label>分类</label><select id="fCat">${CATS.slice(1).map(c => `<option>${c}</option>`).join('')}</select></div>
        <div class="field"><label>品相</label><select id="fCond">${CONDS.slice(1).map(c => `<option>${c}</option>`).join('')}</select></div>
      </div>
      <div class="field-row">
        <div class="field"><label>售价（¥）</label><input id="fPrice" type="number" min="1" placeholder="0"></div>
        <div class="field"><label>原价（¥，可选）</label><input id="fOrig" type="number" min="1" placeholder="0"></div>
      </div>
      <div class="field"><label>描述</label><textarea id="fDesc" placeholder="成色、瑕疵、版本、配件情况写得越清楚越好…"></textarea></div>
      <div class="field-row">
        <div class="field"><label>是否送平台鉴定</label><select id="fCert"><option>送鉴定（推荐，¥69）</option><option>不送鉴定</option></select></div>
        <div class="field"><label>发货地</label><input id="fShip" placeholder="上海"></div>
      </div>
      <div class="field"><label>宝贝图片</label>
        <div class="upload-zone" id="pubUpload"><div class="u-ic">📸</div><b>点击上传实物照片</b><p>支持 jpg / png，建议多角度拍摄</p><input type="file" accept="image/*"></div>
      </div>`,
    want: `
      <div class="field"><label>求购标题</label><input id="fWTitle" placeholder="例如：求购 初音未来 V4X 1/7 全新未拆"></div>
      <div class="field-row">
        <div class="field"><label>预算下限（¥）</label><input id="fWLow" type="number" placeholder="1200"></div>
        <div class="field"><label>预算上限（¥）</label><input id="fWHigh" type="number" placeholder="1400"></div>
      </div>
      <div class="field"><label>补充说明</label><textarea id="fWDesc" placeholder="全新优先？瑕疵可接受？面交还是快递？"></textarea></div>
      <div class="field"><label>偏好标签</label><input id="fWTag" placeholder="日版, 可走担保, 包鉴定"></div>`,
    post: `
      <div class="field"><label>帖子标题</label><input id="fPTitle" placeholder="起一个吸引人的标题"></div>
      <div class="field"><label>板块</label><select id="fPTag"><option>晒图</option><option>讨论</option><option>求助</option><option>开箱</option></select></div>
      <div class="field"><label>内容</label><textarea id="fPDesc" style="min-height:140px" placeholder="分享你的收藏故事、求助问题或经验心得…"></textarea></div>
      <div class="field"><label>配图</label>
        <div class="upload-zone" id="pubUpload"><div class="u-ic">🖼</div><b>点击上传图片</b><p>可选，最多 9 张</p><input type="file" accept="image/*"></div>
      </div>`,
  };
  const body = (t) => `<div class="m-body">
    <button class="modal-close" data-close>${icon('close', 18)}</button>
    <div class="m-title">发布内容</div>
    <div class="m-sub">平台自动识别违禁品与侵权行为，请如实描述</div>
    <div class="seg">${segs.map(([k, label]) => `<button class="${k === t ? 'active' : ''}" data-seg="${k}">${label}</button>`).join('')}</div>
    ${forms[t]}
    <button class="btn btn-primary btn-lg w-full" id="publishSubmit">${icon('send', 16)} 立即发布</button>
  </div>`;

  const mount = () => {
    openModal(body(segType), 'm-md');
    bindPublishModal(segType);
    bindSegButtons();
  };
  const bindSegButtons = () => {
    $$('#modalRoot [data-seg]').forEach(b => b.addEventListener('click', () => {
      segType = b.dataset.seg;
      $('#modalRoot .m-body').outerHTML = body(segType);
      bindModal();
      bindPublishModal(segType);
      bindSegButtons();
    }));
  };
  mount();
}

function bindPublishModal(type) {
  $$('#modalRoot .upload-zone').forEach(z => {
    z.addEventListener('click', () => z.querySelector('input').click());
    z.addEventListener('dragover', (e) => { e.preventDefault(); z.classList.add('drag'); });
    z.addEventListener('dragleave', () => z.classList.remove('drag'));
    z.addEventListener('drop', (e) => { e.preventDefault(); z.classList.remove('drag'); z.querySelector('b').textContent = '已添加 1 张图片 ✓'; });
    z.querySelector('input').addEventListener('change', () => { z.querySelector('b').textContent = '已添加 1 张图片 ✓'; });
  });
  const submit = $('#publishSubmit');
  if (submit) submit.addEventListener('click', () => {
    if (type === 'product') {
      const title = $('#fTitle').value.trim();
      const price = Number($('#fPrice').value);
      if (!title || !price) return toast('请填写标题和售价', 'error');
      const palettes = [['#22d3ee', '#a78bfa', '#f0abfc'], ['#f472b6', '#a78bfa', '#fbcfe8'], ['#34d399', '#0ea5a4', '#fbbf24'], ['#fb923c', '#f472b6', '#fde68a'], ['#38bdf8', '#6366f1', '#7ce5f5']];
      const arts = ['twin', 'cat', 'sword', 'witch', 'knight', 'bunny', 'mecha', 'school'];
      const np = {
        id: 'new' + Date.now(), name: title, series: '玩家发布', cat: $('#fCat').value,
        price, orig: Number($('#fOrig').value) || 0,
        cond: $('#fCond').value, cert: $('#fCert').value.startsWith('送') ? '待鉴定' : '待鉴定',
        art: pick(arts), palette: pick(palettes), seller: state.userName, level: '新晋卖家',
        rating: 5.0, sales: 0, likes: 0, tags: ['新发布', '担保交易'], ship: $('#fShip').value || '全国', time: '刚刚',
      };
      PRODUCTS.unshift(np);
      toast('发布成功！已上架到市场，等待有缘人', 'success', '商品已发布');
      closeModal(); state.view = 'market'; render();
      setTimeout(() => openDetail(np), 350);
    } else if (type === 'want') {
      const title = $('#fWTitle').value.trim();
      const low = $('#fWLow').value || '0';
      const high = $('#fWHigh').value || '0';
      if (!title) return toast('请填写求购标题', 'error');
      WANTS.unshift({
        id: 'w' + Date.now(), title, budget: `¥${low} - ${high}`,
        author: state.userName, time: '刚刚', offers: 0,
        desc: $('#fWDesc').value.trim() || '诚意求购，价格可谈，走平台担保。',
        tags: ($('#fWTag').value || '可走担保').split(',').map(s => s.trim()).filter(Boolean), cat: '手办',
      });
      toast('求购已发布，卖家看到后会主动联系你', 'success', '发布成功');
      closeModal(); state.view = 'wanted'; render();
    } else {
      const title = $('#fPTitle').value.trim();
      if (!title) return toast('请填写帖子标题', 'error');
      const palettes = [['#22d3ee', '#a78bfa', '#f0abfc'], ['#fb923c', '#f472b6', '#fde68a'], ['#a78bfa', '#7c5cff', '#f0abfc'], ['#34d399', '#0ea5a4', '#fbbf24']];
      POSTS.unshift({
        id: 'post' + Date.now(), author: state.userName, level: '新晋', tag: $('#fPTag').value,
        tagCls: 'tag-cyan', time: '刚刚', title,
        desc: $('#fPDesc').value.trim() || '分享我的收藏故事…', art: pick(['twin', 'cat', 'school', 'sword']),
        palette: pick(palettes), likes: 0, comments: 0, views: '0',
      });
      toast('帖子已发布到社区', 'success', '发布成功');
      closeModal(); state.view = 'community'; render();
    }
  });
}

/* ================================================================
 * 鉴定申请
 * ================================================================ */
function openCertModal(tier) {
  openModal(`
    <button class="modal-close" data-close>${icon('close', 18)}</button>
    <div class="m-body" id="certBody">
      <div class="m-title">${tier}申请</div>
      <div class="m-sub">请上传待鉴定手办的实物照片，建议包含整体、脸相、底座细节</div>
      <div class="field"><label>鉴定单号</label><input value="FV-AUTO-${rand(1000, 9999)}" readonly style="opacity:.75"></div>
      <div class="field"><label>宝贝名称</label><input id="certName" placeholder="例如：初音未来 V4X 1/7"></div>
      <div class="field"><label>实物照片</label>
        <div class="upload-zone" id="certUpload">
          <div class="u-ic">📷</div><b>点击上传或拖拽照片</b><p>支持 jpg / png / webp，最多 9 张</p>
          <input type="file" accept="image/*" multiple>
        </div>
      </div>
      <div class="progress-wrap" id="certProgress" hidden>
        <div class="progress-bar"><i id="certBar"></i></div>
        <div class="progress-txt"><span id="certStatus">正在上传照片…</span><span id="certPct">0%</span></div>
      </div>
      <button class="btn btn-primary btn-lg w-full" id="certSubmit">${icon('shield', 17)} 提交鉴定申请</button>
      <p style="font-size:11px;color:var(--text3);margin-top:12px;text-align:center">提交即代表同意《鉴定服务协议》，鉴定期间商品由平台暂存保管。</p>
    </div>`, 'm-md');

  const zone = $('#certUpload');
  const fileInput = zone.querySelector('input');
  const startUpload = () => {
    zone.style.display = 'none';
    $('#certProgress').hidden = false;
    let p = 0;
    const statuses = ['正在上传照片…', 'AI 初步筛查异常…', '资深鉴定师复核细节…', '比对官方涂装数据…', '生成鉴定报告…'];
    const timer = setInterval(() => {
      p += rand(7, 16);
      if (p >= 100) {
        p = 100; clearInterval(timer);
        $('#certBar').style.width = '100%';
        $('#certPct').textContent = '100%';
        $('#certStatus').textContent = '鉴定通过 ✓';
        setTimeout(() => {
          const name = $('#certName').value.trim() || '手办模型';
          CERT_FEED.unshift({ icon: '✓', name, result: '鉴定通过 · 正品', time: '刚刚' });
          renderRail();
          $('#certBody').innerHTML = `
            <div style="text-align:center;padding:18px 0 8px">
              <div style="width:82px;height:82px;margin:0 auto 18px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:38px;background:rgba(52,211,153,.14);border:2px solid rgba(52,211,153,.55);box-shadow:0 0 34px rgba(52,211,153,.4)">✓</div>
              <div class="m-title">鉴定完成</div>
              <div class="m-sub">${name} · 鉴定结论：正品 · 通过</div>
              <div class="escrow-sum" style="text-align:left;margin:18px 0">
                <div class="es-row"><span>证书编号</span><b style="color:#7ce5f5">FV-CERT-${rand(100000, 999999)}</b></div>
                <div class="es-row"><span>鉴定师</span><b>资深鉴定师 · 编号 A-07</b></div>
                <div class="es-row"><span>出证时间</span><b>${new Date().toLocaleString('zh-CN')}</b></div>
                <div class="es-row"><span>防伪</span><b style="color:#7fe8c0">官网可查 · 动态水印</b></div>
              </div>
              <button class="btn btn-primary btn-lg w-full" data-close>完成</button>
            </div>`;
          toast('鉴定通过，证书已生成并同步至订单', 'success', '鉴定完成');
          bindModal();
        }, 600);
      } else {
        $('#certBar').style.width = p + '%';
        $('#certPct').textContent = p + '%';
        $('#certStatus').textContent = statuses[Math.min(statuses.length - 1, Math.floor(p / 25))];
      }
    }, 260);
  };
  zone.addEventListener('click', () => fileInput.click());
  zone.addEventListener('dragover', (e) => { e.preventDefault(); zone.classList.add('drag'); });
  zone.addEventListener('dragleave', () => zone.classList.remove('drag'));
  zone.addEventListener('drop', (e) => { e.preventDefault(); zone.classList.remove('drag'); startUpload(); });
  fileInput.addEventListener('change', startUpload);
  $('#certSubmit').addEventListener('click', () => {
    if (!$('#certName').value.trim()) return toast('请填写宝贝名称', 'error');
    startUpload();
  });
}

/* ================================================================
 * 登录
 * ================================================================ */
function openLoginModal() {
  openModal(`
    <button class="modal-close" data-close>${icon('close', 18)}</button>
    <div class="m-body">
      <div class="login-hero">
        <div class="lh-ic">🎎</div>
        <h2>登录模玩集市</h2>
        <p>实名认证保障交易安全 · 支持微信 / QQ / 手机号</p>
      </div>
      <div class="field" style="margin-top:18px"><label>昵称（演示）</label><input id="loginName" placeholder="输入你的昵称" maxlength="12"></div>
      <div class="quick-logins">
        <button class="ql" data-name="初音十级学者"><span class="q-ic">🎤</span>初音十级学者</button>
        <button class="ql" data-name="胶佬不烂尾"><span class="q-ic">🤖</span>胶佬不烂尾</button>
        <button class="ql" data-name="出坑回血中"><span class="q-ic">💸</span>出坑回血中</button>
      </div>
      <button class="btn btn-primary btn-lg w-full" id="loginGo" style="margin-top:16px">登录 / 注册</button>
      <p style="font-size:11px;color:var(--text3);text-align:center;margin-top:12px">登录即代表同意《用户协议》与《社区公约》</p>
    </div>`, 'm-sm');
  const go = (name) => {
    state.userName = name || $('#loginName').value.trim() || '模玩星人';
    $('#upName').textContent = state.userName;
    toast(`欢迎回来，${state.userName}！`, 'success', '登录成功');
    closeModal();
  };
  $('#loginGo').addEventListener('click', () => go());
  $$('.ql').forEach(b => b.addEventListener('click', () => go(b.dataset.name)));
  $('#loginName').addEventListener('keydown', (e) => { if (e.key === 'Enter') go(); });
}

/* ================================================================
 * 聊天
 * ================================================================ */
function sendChat(text) {
  if (!text.trim()) return;
  const c = CHATS[state.activeChat];
  c.msgs.push({ me: true, text: text.trim(), time: '现在' });
  c.last = text.trim();
  const list = $('#msgList');
  const bubble = document.createElement('div');
  bubble.className = 'msg me';
  bubble.innerHTML = `<div><div class="m-bubble">${esc(text.trim())}</div><div class="m-time">现在</div></div>`;
  list.insertBefore(bubble, $('#typingSlot'));
  $('#chatInput').value = '';
  list.scrollTop = list.scrollHeight;
  c.unread = 0;
  showTyping(c, list);
}

function showTyping(c, list) {
  $('#typingSlot').innerHTML = `<div class="msg"><span class="avatar avatar-sm" style="--a1:${c.avatar[0]};--a2:${c.avatar[1]}">${c.name[0]}</span><div class="typing"><i></i><i></i><i></i></div></div>`;
  list.scrollTop = list.scrollHeight;
  setTimeout(() => {
    $('#typingSlot').innerHTML = '';
    const replies = [
      '好的，我看到了！',
      '可以走平台担保交易吗？',
      '稍等，我拍几张细节图给你～',
      '价格好商量，可以小刀 😄',
      '这款已经有不少人问了，要尽快决定哦',
    ];
    const reply = pick(replies);
    c.msgs.push({ me: false, text: reply, time: '现在' });
    c.last = reply;
    const el = document.createElement('div');
    el.className = 'msg';
    el.innerHTML = `<span class="avatar avatar-sm" style="--a1:${c.avatar[0]};--a2:${c.avatar[1]}">${c.name[0]}</span><div><div class="m-bubble">${reply}</div><div class="m-time">现在</div></div>`;
    list.insertBefore(el, $('#typingSlot'));
    list.scrollTop = list.scrollHeight;
  }, 1400);
}

/* ================================================================
 * 事件绑定
 * ================================================================ */
function bindModal() {
  $$('#modalRoot [data-close]').forEach(b => b.addEventListener('click', closeModal));
  $$('#modalRoot [data-buy]').forEach(b => b.addEventListener('click', (e) => {
    e.stopPropagation();
    const p = PRODUCTS.find(x => x.id === b.dataset.buy);
    closeModal();
    setTimeout(() => openEscrow(p), 120);
  }));
  $$('#modalRoot [data-fav2]').forEach(b => b.addEventListener('click', (e) => {
    e.stopPropagation();
    const p = PRODUCTS.find(x => x.id === b.dataset.fav2);
    state.favs.has(p.id) ? state.favs.delete(p.id) : state.favs.add(p.id);
    b.innerHTML = icon('heart', 18) + ' ' + (state.favs.has(p.id) ? '已收藏' : '收藏');
    toast(state.favs.has(p.id) ? '已加入收藏夹，降价会提醒你' : '已取消收藏', 'info');
  }));
  $$('#modalRoot [data-contact-seller]').forEach(b => b.addEventListener('click', () => {
    closeModal();
    const idx = CHATS.findIndex(c => c.name === b.dataset.contactSeller);
    if (idx >= 0) state.activeChat = idx;
    location.hash = 'chat';
  }));
}

function bindView() {
  const v = $('#view');

  // 市场
  $$('.chip[data-cat]', v).forEach(c => c.addEventListener('click', () => {
    state.category = c.dataset.cat; render();
  }));
  const sortSel = $('#sortSel', v);
  if (sortSel) sortSel.addEventListener('change', () => { state.sort = sortSel.value; render(); });
  const condSel = $('#condSel', v);
  if (condSel) condSel.addEventListener('change', () => { state.condition = condSel.value; render(); });
  const certOnly = $('#certOnly', v);
  if (certOnly) certOnly.addEventListener('change', () => { state.certOnly = certOnly.checked; render(); });
  const refreshBtn = $('#refreshBtn', v);
  if (refreshBtn) refreshBtn.addEventListener('click', () => {
    toast('已为你刷新一批推荐宝贝', 'info');
    state.sort = '综合';
    PRODUCTS.push(PRODUCTS.shift());
    render();
  });

  // 商品卡
  $$('.product-card', v).forEach(card => card.addEventListener('click', (e) => {
    if (e.target.closest('.p-fav')) return;
    const p = PRODUCTS.find(x => x.id === card.dataset.id);
    if (p) openDetail(p);
  }));
  $$('.p-fav', v).forEach(btn => btn.addEventListener('click', (e) => {
    e.stopPropagation();
    const id = btn.dataset.fav;
    const was = state.favs.has(id);
    was ? state.favs.delete(id) : state.favs.add(id);
    btn.classList.toggle('on', !was);
    toast(!was ? '已收藏 ♥' : '已取消收藏', 'info');
    if (state.view === 'favs' && was) {
      const card = btn.closest('.product-card');
      if (card) {
        card.style.transition = 'opacity .25s ease, transform .25s ease';
        card.style.opacity = '0';
        card.style.transform = 'scale(.95)';
        setTimeout(() => render(), 280);
      }
    }
  }));

  // 求购
  $$('[data-offer]', v).forEach(b => b.addEventListener('click', () => {
    const w = WANTS.find(x => x.id === b.dataset.offer);
    openModal(`
      <button class="modal-close" data-close>${icon('close', 18)}</button>
      <div class="m-body">
        <div class="m-title">向求购者报价</div>
        <div class="m-sub">${w.title}</div>
        <div class="escrow-sum" style="margin-bottom:16px">
          <div class="es-row"><span>求购预算</span><b style="color:#7ce5f5">${w.budget}</b></div>
          <div class="es-row"><span>求购者</span><b>${w.author}</b></div>
        </div>
        <div class="field"><label>我的报价（¥）</label><input id="offerPrice" type="number" placeholder="例如 1250"></div>
        <div class="field"><label>备注</label><textarea id="offerNote" placeholder="品相、版本、是否包鉴定…"></textarea></div>
        <button class="btn btn-primary btn-lg w-full" id="offerGo">${icon('send', 16)} 发送报价</button>
      </div>`, 'm-sm');
    $('#offerGo').addEventListener('click', () => {
      const price = $('#offerPrice').value;
      if (!price) return toast('请填写报价金额', 'error');
      w.offers++;
      toast(`报价 ¥${Number(price).toLocaleString('zh-CN')} 已发送，等待求购者回复`, 'success', '报价成功');
      closeModal();
    });
  }));

  // 社区
  $$('.tab[data-tab]', v).forEach(t => t.addEventListener('click', () => { state.postTab = t.dataset.tab; render(); }));
  $$('[data-plike]', v).forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.plike;
    const liked = state.likes.has(id);
    liked ? state.likes.delete(id) : state.likes.add(id);
    b.classList.toggle('liked', !liked);
    b.querySelector('span').textContent = fmt((POSTS.find(p => p.id === id)?.likes || 0) + (liked ? 0 : 1));
  }));
  $$('[data-pcomment]', v).forEach(b => b.addEventListener('click', () => toast('评论区功能演示：这里会展开楼中楼讨论', 'info')));
  $$('[data-pshare]', v).forEach(b => b.addEventListener('click', () => toast('链接已复制，快去分享给胶友吧', 'success')));
  $$('[data-follow]', v).forEach(b => b.addEventListener('click', () => { b.textContent = '✓ 已关注'; toast('关注成功，TA 的发帖会优先展示', 'success'); }));
  $$('.post-title', v).forEach(t => t.addEventListener('click', () => toast('帖子详情页（演示）：完整内容与评论', 'info')));

  // 发布按钮
  $$('[data-publish-post]', v).forEach(b => b.addEventListener('click', () => openPublishModal('post')));
  $$('[data-publish-want]', v).forEach(b => b.addEventListener('click', () => openPublishModal('want')));

  // 聊天
  $$('.contact[data-contact]', v).forEach(c => c.addEventListener('click', () => {
    state.activeChat = Number(c.dataset.contact);
    render();
  }));
  const chatInput = $('#chatInput', v);
  if (chatInput) {
    const send = $('#sendBtn');
    send.addEventListener('click', () => sendChat(chatInput.value));
    chatInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendChat(chatInput.value); }
    });
    $$('.emoji-row button', v).forEach(b => b.addEventListener('click', () => { chatInput.value += b.dataset.emoji; chatInput.focus(); }));
  }
  const chatSearch = $('#chatSearch', v);
  if (chatSearch) chatSearch.addEventListener('input', () => {
    const q = chatSearch.value.trim().toLowerCase();
    $$('.contact', v).forEach(c => {
      const name = CHATS[Number(c.dataset.contact)].name.toLowerCase();
      c.style.display = name.includes(q) ? '' : 'none';
    });
  });

  // 订单
  $$('[data-order-view]', v).forEach(b => b.addEventListener('click', () => toast('订单详情（演示）：可查看物流、鉴定报告与售后入口', 'info')));

  // 鉴定
  $$('[data-cert-tier]', v).forEach(b => b.addEventListener('click', () => openCertModal(b.dataset.certTier)));
  $$('#heroPublish', v).forEach(b => b.addEventListener('click', () => openPublishModal('product')));
  $$('[data-goto]', v).forEach(b => b.addEventListener('click', () => {
    const target = $('#view .section-head');
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));
}

function bindGlobal() {
  // 导航
  $$('[data-nav]').forEach(a => a.addEventListener('click', () => {
    state.view = a.dataset.nav;
    render();
  }));
  // 路由
  window.addEventListener('hashchange', router);
  // 顶栏
  $('#publishBtn').addEventListener('click', () => openPublishModal('product'));
  const bell = $('#bellBtn'), notice = $('#noticePanel');
  bell.addEventListener('click', (e) => {
    e.stopPropagation();
    notice.hidden = !notice.hidden;
    $('#userPanel').hidden = true;
  });
  $('#noticeList').innerHTML = NOTICES.map(n => `
    <div class="notice-item">
      <span class="n-ic">${n.icon}</span>
      <div style="min-width:0"><b>${n.title}</b><p>${n.desc}</p><time>${n.time}</time></div>
    </div>`).join('');
  $('#noticeClear').addEventListener('click', () => {
    $$('.notice-item', notice).forEach(el => el.style.opacity = '.4');
    const dot = bell.querySelector('.dot');
    if (dot) dot.remove();
    toast('已全部标记为已读', 'info');
  });
  const userBtn = $('#userBtn'), userPanel = $('#userPanel');
  userBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    userPanel.hidden = !userPanel.hidden;
    notice.hidden = true;
  });
  $('#loginBtn').addEventListener('click', () => { userPanel.hidden = true; openLoginModal(); });
  $('#walletBtn').addEventListener('click', () => toast('钱包余额 ¥1,286.00（演示）', 'info', '我的钱包'));
  document.addEventListener('click', () => { notice.hidden = true; userPanel.hidden = true; });

  // 全局搜索
  const search = $('#globalSearch');
  const doSearch = (q) => {
    state.query = q;
    state.view = 'market';
    location.hash = 'market';
    render();
  };
  search.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') doSearch(search.value);
  });
  $$('.hot-search button').forEach(b => b.addEventListener('click', () => {
    search.value = b.dataset.q;
    doSearch(b.dataset.q);
  }));

  // 关闭弹窗快捷键
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

/* ================================================================
 * 动效
 * ================================================================ */
function observeReveal() {
  const els = $$('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting) { en.target.classList.add('in'); io.unobserve(en.target); }
    });
  }, { threshold: 0.08 });
  els.forEach(el => io.observe(el));
}

function runCounters() {
  $$('[data-count]').forEach(el => {
    const target = Number(el.dataset.count);
    const decimal = Number(el.dataset.decimal || 0);
    const suffix = el.dataset.suffix || '';
    const dur = 1300;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - p, 3);
      const val = (target * ease).toFixed(decimal);
      el.textContent = Number(val).toLocaleString('zh-CN') + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  });
}

/* ================================================================
 * 初始化
 * ================================================================ */
function init() {
  state.orders = [];
  renderRail();
  bindGlobal();
  router();
}

document.addEventListener('DOMContentLoaded', init);
