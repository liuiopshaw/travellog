// 旅记 TravelLog — Mock Data v3
// Images: LoremFlickr keyword-matched + Picsum for variety
// Cache bust: ?v=3 timestamp

const V = '3';

// Image generator — each destination gets matching keywords
function img(kw: string): string { return `https://loremflickr.com/600/400/${kw}?v=${V}`; }
function psm(id: number): string { return `https://picsum.photos/id/${id}/600/400`; }
function avt(id: number): string { return psm(1000 + id); } // picsum as avatar placeholder

export interface MockUser { id: string; username: string; avatar: string; bio: string; phone?: string; email?: string; }
export interface MockCategory { id: string; name: string; icon: string; }
export interface MockBanner { id: string; title: string; image: string; linkType: 'content' | 'url'; linkValue: string; }
export interface MockContent {
  id: string; title: string; description: string; content: string;
  category: { id: string; name: string }; region: string; location: string;
  latitude: number; longitude: number; coverImage: string; images: string[];
  rating: number; price: number; openTime: string; phone: string;
  tags: string[]; viewCount: number; likeCount: number; favCount: number; commentCount: number;
  author: MockUser; isFavorited: boolean; isLiked: boolean; createdAt: string;
}
export interface MockComment {
  id: string; user: MockUser; content: string; likeCount: number; isLiked: boolean;
  createdAt: string; replies: MockComment[];
}
export interface MockNotification {
  id: string; type: 'comment'|'like'|'system'; title: string; content: string;
  relatedId: string|null; isRead: boolean; createdAt: string;
}

export const mockUsers: MockUser[] = [
  { id:'u-01', username:'旅行达人老张', avatar:avt(1), bio:'走遍中国34个省' },
  { id:'u-02', username:'背包客小明',     avatar:avt(2), bio:'背包十年' },
  { id:'u-03', username:'摄影爱好者Lily',  avatar:avt(3), bio:'用镜头记录世界' },
  { id:'u-04', username:'美食探店小王',    avatar:avt(4), bio:'遍寻天下美食' },
  { id:'u-05', username:'户外探险阿杰',    avatar:avt(5), bio:'热爱雪山沙漠' },
  { id:'u-06', username:'文艺小清新七七',  avatar:avt(6), bio:'偏爱古镇咖啡馆' },
  { id:'u-07', username:'自驾游老司机',    avatar:avt(7), bio:'自驾绕地球五圈' },
  { id:'u-08', username:'海岛控阿花',      avatar:avt(8), bio:'海岛精神故乡' },
];

export const mockCategories: MockCategory[] = [
  { id:'cat-001', name:'自然风光', icon:'leaf-outline' },
  { id:'cat-002', name:'历史古迹', icon:'business-outline' },
  { id:'cat-003', name:'美食探店', icon:'restaurant-outline' },
  { id:'cat-004', name:'城市漫步', icon:'walk-outline' },
  { id:'cat-005', name:'海岛度假', icon:'umbrella-outline' },
];

export const mockBanners: MockBanner[] = [
  { id:'bn-001', title:'最美江南古镇', image:img('ancient,town,china'), linkType:'content', linkValue:'c-001' },
  { id:'bn-002', title:'三亚海景推荐', image:img('beach,ocean,tropical'), linkType:'content', linkValue:'c-060' },
  { id:'bn-003', title:'川西自驾攻略', image:img('mountain,snow,road'), linkType:'content', linkValue:'c-005' },
  { id:'bn-004', title:'云南民俗体验', image:img('yunnan,ethnic,china'), linkType:'url', linkValue:'/search?keyword=云南' },
];

export const mockContents: MockContent[] = [
  // ── 自然风光 (3) ──
  {
    id:'c-001', title:'九寨沟 — 人间仙境的水之盛宴',
    description:'五花海、诺日朗瀑布、五彩池...九寨沟的水是世间最美的蓝绿色',
    content:'<p>九寨沟位于四川省阿坝藏族羌族自治州。秋季（10月中下旬）是最美时节，彩林与碧水交相辉映。</p>',
    category:{id:'cat-001',name:'自然风光'},
    region:'四川省', location:'阿坝藏族羌族自治州九寨沟县',
    latitude:33.263, longitude:103.918,
    coverImage:img('mountain,lake,china,landscape'),
    images:[img('turquoise,lake,mountain'), img('waterfall,nature,china'), img('forest,lake,autumn')],
    rating:4.9, price:169, openTime:'07:30-17:00', phone:'0837-7739777',
    tags:['世界遗产','秋色','湖泊','瀑布'],
    viewCount:56800, likeCount:8900, favCount:3200, commentCount:4,
    author:mockUsers[0], isFavorited:true, isLiked:false, createdAt:'2026-05-15',
  },
  {
    id:'c-002', title:'黄山 — 五岳归来不看山',
    description:'奇松、怪石、云海、温泉，黄山四绝名不虚传',
    content:'<p>黄山以奇松、怪石、云海、温泉四绝闻名。光明顶看日出、西海大峡谷徒步。</p>',
    category:{id:'cat-001',name:'自然风光'},
    region:'安徽省', location:'黄山市黄山区',
    latitude:30.134, longitude:118.165,
    coverImage:img('mountain,mist,sunrise'),
    images:[img('granite,peak,clouds')],
    rating:4.8, price:190, openTime:'06:30-16:30', phone:'0559-5562111',
    tags:['世界遗产','云海','日出','奇松'],
    viewCount:45200, likeCount:7600, favCount:2800, commentCount:2,
    author:mockUsers[1], isFavorited:false, isLiked:true, createdAt:'2026-05-12',
  },
  {
    id:'c-003', title:'张家界 — 阿凡达取景地',
    description:'三千奇峰、八百秀水，阿凡达悬浮山灵感来源',
    content:'<p>张家界国家森林公园以石英砂岩峰林地貌闻名，是《阿凡达》悬浮山的灵感来源。</p>',
    category:{id:'cat-001',name:'自然风光'},
    region:'湖南省', location:'张家界市武陵源区',
    latitude:29.328, longitude:110.416,
    coverImage:img('sandstone,pillar,mountain'),
    images:[img('cliff,forest,mist')],
    rating:4.7, price:228, openTime:'08:00-18:00', phone:'0744-5718002',
    tags:['世界遗产','山峰','雾凇'],
    viewCount:39800, likeCount:6200, favCount:2100, commentCount:0,
    author:mockUsers[2], isFavorited:false, isLiked:false, createdAt:'2026-05-10',
  },
  // ── 历史古迹 (2) ──
  {
    id:'c-015', title:'故宫 — 六百年皇城',
    description:'世界上现存规模最大、保存最完整的木质结构古建筑群',
    content:'<p>故宫始建于明永乐四年，是世界上现存规模最大、保存最完整的木质结构古建筑群。</p>',
    category:{id:'cat-002',name:'历史古迹'},
    region:'北京', location:'北京市东城区景山前街4号',
    latitude:39.916, longitude:116.397,
    coverImage:img('palace,ancient,china,architecture'),
    images:[img('forbidden,city,beijing')],
    rating:4.9, price:60, openTime:'08:30-17:00', phone:'010-85007421',
    tags:['世界遗产','博物馆','古建筑','亲子'],
    viewCount:125000, likeCount:15600, favCount:5600, commentCount:3,
    author:mockUsers[7], isFavorited:true, isLiked:true, createdAt:'2026-04-20',
  },
  {
    id:'c-016', title:'敦煌莫高窟 — 大漠中的艺术宝库',
    description:'千佛洞壁画和彩塑跨越十个朝代，丝绸之路上的明珠',
    content:'<p>莫高窟现存洞窟735个，壁画4.5万平方米，是丝绸之路上的艺术明珠。</p>',
    category:{id:'cat-002',name:'历史古迹'},
    region:'甘肃省', location:'敦煌市莫高镇',
    latitude:40.041, longitude:94.802,
    coverImage:img('desert,cave,buddha,art'),
    images:[img('dunhuang,grotto,ancient')],
    rating:4.8, price:238, openTime:'09:00-17:30', phone:'0937-8869000',
    tags:['世界遗产','壁画','丝绸之路','佛教'],
    viewCount:67800, likeCount:9800, favCount:3400, commentCount:5,
    author:mockUsers[7], isFavorited:true, isLiked:false, createdAt:'2026-05-08',
  },
  // ── 美食探店 (2) ──
  {
    id:'c-030', title:'成都美食地图',
    description:'火锅、串串、担担面、钵钵鸡...成都的美食天堂',
    content:'<p>成都是中国第一个被联合国授予"美食之都"称号的城市。</p>',
    category:{id:'cat-003',name:'美食探店'},
    region:'四川省', location:'成都市',
    latitude:30.572, longitude:104.066,
    coverImage:img('hotpot,spicy,food,chinese'),
    images:[img('sichuan,cuisine,spicy')],
    rating:4.8, price:0, openTime:'全天', phone:'',
    tags:['火锅','川菜','小吃','美食街'],
    viewCount:45600, likeCount:8200, favCount:3000, commentCount:4,
    author:mockUsers[3], isFavorited:true, isLiked:false, createdAt:'2026-05-20',
  },
  {
    id:'c-031', title:'顺德 — 世界美食之都',
    description:'双皮奶、鱼生、煲仔饭...顺德人是天生的美食家',
    content:'<p>顺德是粤菜发源地之一，被联合国评为"世界美食之都"。</p>',
    category:{id:'cat-003',name:'美食探店'},
    region:'广东省', location:'佛山市顺德区',
    latitude:22.838, longitude:113.244,
    coverImage:img('cantonese,dimsum,food'),
    images:[img('steamed,fish,chinese,cuisine')],
    rating:4.7, price:0, openTime:'全天', phone:'',
    tags:['粤菜','小吃','甜品','米其林'],
    viewCount:32100, likeCount:5600, favCount:2100, commentCount:3,
    author:mockUsers[3], isFavorited:false, isLiked:true, createdAt:'2026-05-18',
  },
  // ── 城市漫步 (2) ──
  {
    id:'c-045', title:'上海法租界漫步',
    description:'武康路、安福路...梧桐树影里的咖啡馆与买手店',
    content:'<p>上海法租界是这座城市最浪漫的角落。武康路、安福路，每一条路都有故事。</p>',
    category:{id:'cat-004',name:'城市漫步'},
    region:'上海', location:'上海市徐汇区',
    latitude:31.208, longitude:121.445,
    coverImage:img('street,cafe,urban,shanghai'),
    images:[img('alley,coffee,tree,lined')],
    rating:4.5, price:0, openTime:'全天', phone:'',
    tags:['城市漫步','咖啡','建筑','老街'],
    viewCount:43200, likeCount:7200, favCount:2600, commentCount:2,
    author:mockUsers[5], isFavorited:false, isLiked:false, createdAt:'2026-05-18',
  },
  {
    id:'c-046', title:'重庆8D魔幻城市',
    description:'轻轨穿楼、长江索道、洪崖洞...一座永远不知道自己在几楼的城市',
    content:'<p>重庆因其独特的地形被称为8D魔幻城市，轻轨穿楼是必打卡景点。</p>',
    category:{id:'cat-004',name:'城市漫步'},
    region:'重庆', location:'重庆市渝中区',
    latitude:29.562, longitude:106.551,
    coverImage:img('city,night,skyline,neon'),
    images:[img('chongqing,river,bridge')],
    rating:4.4, price:0, openTime:'全天', phone:'',
    tags:['城市探索','夜景','轻轨','火锅'],
    viewCount:49800, likeCount:7600, favCount:2800, commentCount:0,
    author:mockUsers[0], isFavorited:true, isLiked:false, createdAt:'2026-05-16',
  },
  // ── 海岛度假 (2) ──
  {
    id:'c-060', title:'三亚 — 东方夏威夷',
    description:'亚龙湾白沙滩、蜈支洲岛潜水、天涯海角日落',
    content:'<p>三亚是中国最南端的热带海滨城市，年均气温25°C。蜈支洲岛是潜水胜地。</p>',
    category:{id:'cat-005',name:'海岛度假'},
    region:'海南省', location:'三亚市',
    latitude:18.252, longitude:109.508,
    coverImage:img('beach,tropical,ocean,palm'),
    images:[img('white,sand,blue,sea')],
    rating:4.6, price:0, openTime:'全天', phone:'',
    tags:['海滩','潜水','度假','热带'],
    viewCount:67800, likeCount:10200, favCount:3800, commentCount:3,
    author:mockUsers[7], isFavorited:true, isLiked:true, createdAt:'2026-06-01',
  },
  {
    id:'c-061', title:'马尔代夫 — 一生必去的海岛',
    description:'水上别墅、珊瑚礁浮潜...天堂的模样',
    content:'<p>马尔代夫由1192个珊瑚岛组成，水上别墅是蜜月旅行的终极梦想。</p>',
    category:{id:'cat-005',name:'海岛度假'},
    region:'海外', location:'马尔代夫共和国',
    latitude:4.175, longitude:73.509,
    coverImage:img('overwater,bungalow,maldives'),
    images:[img('coral,reef,turquoise,water')],
    rating:4.9, price:8000, openTime:'全天', phone:'',
    tags:['出境','海岛','蜜月','潜水'],
    viewCount:56000, likeCount:9800, favCount:4200, commentCount:7,
    author:mockUsers[7], isFavorited:false, isLiked:true, createdAt:'2026-05-28',
  },
];

export const mockMyContents = mockContents.slice(0, 2);

export const mockComments: MockComment[] = [
  {
    id:'cm-001', user:mockUsers[1], content:'太美了！已经加入旅行清单', likeCount:45, isLiked:true,
    createdAt:'2026-05-15 10:00',
    replies:[
      {id:'cm-002',user:mockUsers[2],content:'同感！10月底去的，彩林+蓝水',likeCount:23,isLiked:false,createdAt:'2026-05-15 10:30',replies:[]},
      {id:'cm-003',user:mockUsers[0],content:'建议住在沟内藏民家，清晨镜海无波纹',likeCount:18,isLiked:false,createdAt:'2026-05-15 11:00',replies:[]},
    ],
  },
  { id:'cm-004', user:mockUsers[4], content:'冬天的诺日朗瀑布冻成了冰瀑，完全另一种体验！', likeCount:31, isLiked:false, createdAt:'2026-05-16 09:00', replies:[] },
  {
    id:'cm-005', user:mockUsers[2], content:'值得一去！拍照特别好看', likeCount:12, isLiked:false, createdAt:'2026-06-01',
    replies:[{id:'cm-006',user:mockUsers[1],content:'同问，什么季节去最好？',likeCount:3,isLiked:false,createdAt:'2026-06-01',replies:[]}],
  },
];

export const mockNotifications: MockNotification[] = [
  {id:'nf-001',type:'comment',title:'新评论',content:'背包客小明 评论了你的内容"九寨沟"',relatedId:'c-001',isRead:false,createdAt:'2026-06-09'},
  {id:'nf-002',type:'like',title:'新点赞',content:'摄影爱好者Lily 赞了你的内容"故宫"',relatedId:'c-015',isRead:false,createdAt:'2026-06-08'},
  {id:'nf-003',type:'comment',title:'新回复',content:'户外探险阿杰 回复了你的评论',relatedId:'cm-001',isRead:true,createdAt:'2026-06-07'},
  {id:'nf-004',type:'system',title:'系统通知',content:'欢迎加入旅记！',relatedId:null,isRead:true,createdAt:'2026-06-01'},
  {id:'nf-005',type:'like',title:'新点赞',content:'海岛控阿花 赞了你的评论',relatedId:'cm-005',isRead:false,createdAt:'2026-06-10'},
];

export const mockCurrentUser: MockUser = {
  id:'u-01', username:'旅行达人老张', avatar:avt(1),
  bio:'走遍中国34个省，目标是100个国家', phone:'138****0001',
};

export const mockIsLoggedIn = true;
