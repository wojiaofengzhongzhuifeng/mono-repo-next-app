export const GET_COUNT_NUMBER = {
  code: 200,
  message: '成功',
  data: {
    number: 1233344321,
    id: 1,
    testList: [1, 2, 3],
  },
}

export const GET_CATEGORY = {
  code: 200,
  message: '成功',
  data: [
    {
      id: 1,
      categoryName: '电子产品',
      categoryDesc: '各类电子设备和数码产品',
      products: [
        {
          id: 101,
          productName: 'iPhone 15 Pro',
          productImg: 'https://example.com/images/iphone15pro.jpg',
          productDesc:
            '苹果最新旗舰手机，配备A17 Pro芯片，6核CPU+6核GPU，性能较上一代提升20%；钛金属机身重量仅187g，比iPhone 14 Pro轻19g；支持USB‑C 3.0接口，传输速度达10Gbps，可直连外接显示器；搭载4800万像素主摄，支持5倍光学变焦，夜景拍摄细节更丰富；预装iOS 18系统，支持动态岛自定义、待机显示功能',
          price: 7999,
          stock: 126,
        },
        {
          id: 102,
          productName: 'MacBook Air M3',
          productImg: 'https://example.com/images/macbook‑air‑m3.jpg',
          productDesc:
            '搭载M3芯片的轻薄笔记本，8核CPU+8核GPU，可流畅运行视频剪辑、编程等重度任务；13.6英寸Liquid Retina显示屏，P3广色域+500尼特亮度，色彩还原更精准；无风扇设计全程静音，机身最厚处仅11.5mm，重量1.24kg，便携性拉满；续航长达18小时，支持MagSafe磁吸充电，搭配67W快充头30分钟可充至50%；预装macOS Sonoma系统，支持台前调度、通用控制功能',
          price: 8999,
          stock: 89,
        },
        {
          id: 103,
          productName: 'AirPods Pro 3',
          productImg: 'https://example.com/images/airpods‑pro3.jpg',
          productDesc:
            '主动降噪无线耳机，采用新一代H1芯片，降噪深度达40dB，可过滤90%环境噪音；支持空间音频技术，搭配动态头部追踪，观影时打造沉浸式声场；USB‑C充电盒兼容MagSafe磁吸充电，单次充电耳机续航6小时，搭配充电盒总续航30小时；新增「自适应通透模式」，可根据环境噪音自动调节通透程度；支持语音控制Siri、查找耳机功能，防水等级IP54，日常出汗、雨天使用无忧',
          price: 1899,
          stock: 203,
        },
      ],
    },
    {
      id: 2,
      categoryName: '服装鞋帽',
      categoryDesc: '时尚服装、鞋类和配饰',
      products: [
        {
          id: 201,
          productName: 'Nike Air Max 270',
          productImg: 'https://example.com/images/nike‑air‑max‑270.jpg',
          productDesc:
            '经典气垫跑鞋，搭载270°可视Max Air气垫，缓震效果出色，落地时可吸收80%冲击力；鞋面采用网眼布+合成革拼接设计，透气性提升30%，夏季穿着不闷脚；鞋舌与鞋跟处添加海绵填充，贴合脚踝减少摩擦；外底采用橡胶材质，纹路深2mm，抓地力强，湿滑路面不易打滑；鞋码覆盖35.5-46码，适合日常运动、通勤、逛街等多种场景',
          price: 899,
          stock: 158,
        },
        {
          id: 202,
          productName: 'Adidas三叶草卫衣',
          productImg: 'https://example.com/images/adidas‑hoodie.jpg',
          productDesc:
            '经典三叶草logo卫衣，采用100%新疆长绒棉材质，纱线细腻无杂质，洗涤后不易起球、变形；衣身采用落肩设计，版型宽松不挑身材，搭配抽绳连帽，可调节领口大小；袖口与下摆处添加罗纹收口，弹性好不易松垮，保暖性更强；胸前刺绣三叶草logo，线迹工整不脱落；颜色可选黑色、白色、灰色，尺码覆盖XS-XXL，适合春秋外穿、冬季内搭',
          price: 399,
          stock: 215,
        },
        {
          id: 203,
          productName: "Levi's 501牛仔裤",
          productImg: 'https://example.com/images/levis‑501.jpg',
          productDesc:
            '经典直筒牛仔裤，采用美国进口丹宁面料，克重12.5oz，厚度适中，挺括不软塌；经过石磨水洗工艺，颜色自然有做旧感，且洗涤后不易褪色；采用经典纽扣门襟+拉链设计，双重固定更耐用；裤型为中腰直筒，腰围处添加弹性纤维，穿着无束缚感；裤长可根据身高修改，搭配腰带、卫衣、衬衫均可；尺码覆盖28-36码，适合日常休闲、约会、通勤等场景',
          price: 799,
          stock: 97,
        },
      ],
    },
    {
      id: 3,
      categoryName: '家居用品',
      categoryDesc: '家庭生活必需品和装饰用品',
      products: [
        {
          id: 301,
          productName: '无印良品收纳盒',
          productImg: 'https://example.com/images/muji‑storage‑box.jpg',
          productDesc:
            '简约设计收纳盒，采用食品级PP材质，无异味、耐高低温（-20℃至100℃），可存放零食、化妆品等；透明盒身设计，内部物品一目了然，无需打开即可查找；盒盖与盒身采用卡扣式连接，密封性好，防尘防潮；尺寸可选小号（20×15×10cm）、中号（30×20×15cm）、大号（40×30×20cm），可叠加存放节省空间；适合卧室抽屉、衣柜、厨房橱柜等场景使用',
          price: 39,
          stock: 320,
        },
        {
          id: 302,
          productName: '宜家北欧风台灯',
          productImg: 'https://example.com/images/ikea‑lamp.jpg',
          productDesc:
            '简约北欧风格台灯，灯座采用实木材质，纹理自然有质感，颜色可选原木色、白色；灯罩为亚麻布艺材质，透光均匀不刺眼，光线柔和适合营造温馨氛围；支持3档亮度调节（暖光2700K、中性光4000K、冷光6500K），可通过灯座按钮切换，满足阅读、办公、休闲不同需求；采用E27灯头，兼容LED灯泡，功率10W，节能省电；灯座高度45cm，灯罩直径20cm，适合床头柜、书桌、梳妆台摆放',
          price: 199,
          stock: 142,
        },
        {
          id: 303,
          productName: '小米空气净化器',
          productImg: 'https://example.com/images/xiaomi‑air‑purifier.jpg',
          productDesc:
            '智能空气净化器，搭载HEPA H13级滤网，可过滤99.97%的PM2.5、花粉、细菌等污染物；CADR值达380m³/h，适用面积28-48㎡，适合卧室、客厅使用；机身顶部配备PM2.5实时监测显示屏，数值直观可见；支持3档风速调节，睡眠模式噪音低至30分贝，不影响休息；可通过小米APP远程控制，设置定时开关、查看滤网寿命；机身尺寸240×240×520mm，占地空间小，底部带万向轮方便移动',
          price: 899,
          stock: 76,
        },
      ],
    },
    {
      id: 4,
      categoryName: '食品饮料',
      categoryDesc: '各类食品、饮料和零食',
      products: [
        {
          id: 401,
          productName: '星巴克咖啡豆',
          productImg: 'https://example.com/images/starbucks‑coffee‑beans.jpg',
          productDesc:
            '精选哥伦比亚阿拉比卡咖啡豆，生长在海拔1800-2200米的高山地区，昼夜温差大造就丰富风味；中度烘焙工艺，烘焙度4/6，口感平衡，带有焦糖、坚果香气，酸度温和不刺激；每袋净含量200g，采用单向排气阀包装，可排出二氧化碳、防止氧气进入，保持咖啡豆新鲜；保质期12个月，开封后建议15天内饮用完毕；适合手冲、滴滤、意式浓缩等多种冲泡方式，冲煮时建议粉水比1:15',
          price: 88,
          stock: 189,
        },
        {
          id: 402,
          productName: '费列罗巧克力',
          productImg: 'https://example.com/images/ferrero‑chocolate.jpg',
          productDesc:
            '意大利进口巧克力，每颗独立金箔包装，外观精致，适合送礼、自食；层次丰富，外层是牛奶巧克力+碎榛子，中层是软质榛子酱，内层是整颗烤榛子，口感酥脆香甜；每盒含16颗，净含量200g，礼盒装设计，礼盒尺寸15×10×5cm，携带方便；保质期9个月，需常温（15-25℃）保存，避免阳光直射、高温；不含反式脂肪酸，采用天然可可脂，口感更醇厚',
          price: 99,
          stock: 256,
        },
        {
          id: 403,
          productName: '农夫山泉天然水',
          productImg: 'https://example.com/images/nongfu‑water.jpg',
          productDesc:
            '天然弱碱性水，水源地来自浙江千岛湖，水质经过深层过滤，富含钾、钙、镁等天然矿物质；pH值7.3±0.5，接近人体体液pH值，饮用更健康；每瓶净含量550ml，瓶身采用食品级PET材质，耐高温（60℃），可回收；保质期24个月，未开封时无需冷藏，开封后建议24小时内饮用完毕；适合日常饮水、泡茶、冲咖啡，也可用于运动后补充水分',
          price: 2,
          stock: 1000,
        },
      ],
    },
    {
      id: 5,
      categoryName: '图书文具',
      categoryDesc: '各类图书、文具和办公用品',
      products: [
        {
          id: 501,
          productName: '《JavaScript高级程序设计》',
          productImg: 'https://example.com/images/js‑book.jpg',
          productDesc:
            '前端开发经典教材，第4版更新至ES2020标准，涵盖JavaScript核心概念与高级特性；全书共24章，分为「语法与基本概念」「DOM与BOM」「事件与异步」「模块化与性能优化」4大模块，逻辑清晰、由浅入深；书中包含300+代码示例，每个知识点搭配实操案例，便于理解；作者Nicholas C. Zakas是前端领域权威专家，内容严谨、实用性强；适合有基础的前端开发者进阶学习，也可作为企业培训教材；平装16开，共944页，采用胶版纸印刷，字迹清晰、不易透墨',
          price: 128,
          stock: 68,
        },
        {
          id: 502,
          productName: '晨光中性笔套装',
          productImg: 'https://example.com/images/chenguang‑pens.jpg',
          productDesc:
            '0.5mm中性笔套装，每盒含12支，颜色包含黑色6支、蓝色3支、红色3支，满足日常书写需求；笔杆采用磨砂材质，防滑设计，握感舒适，长时间书写不易疲劳；笔尖为子弹头设计，出墨均匀，书写流畅不卡顿，墨迹干速快（3秒速干），不易蹭花；墨水采用颜料型配方，防水、防褪色，适合签署文件、笔记记录；笔帽与笔杆采用卡扣式连接，不易脱落，每支笔长度14.5cm，可放入笔袋、口袋携带',
          price: 15,
          stock: 420,
        },
        {
          id: 503,
          productName: 'Moleskine笔记本',
          productImg: 'https://example.com/images/moleskine‑notebook.jpg',
          productDesc:
            '经典硬皮笔记本，源自意大利品牌，封面采用PU材质，耐磨、防水，颜色可选黑色、棕色；内页为80g无酸纸，纸张细腻，书写时不洇墨，兼容钢笔、中性笔、马克笔等多种笔型；内页为横线设计，行距8mm，适合日常记录、随笔创作；笔记本尺寸为13×21cm（口袋版），厚度1.5cm，含192页内页，可使用6-8个月；封底内置口袋，可存放便签、票据，弹性书签绳方便标记页码，适合学生、职场人、创作者使用',
          price: 99,
          stock: 113,
        },
      ],
    },
  ],
}

export const GET_BANNER = {
  code: 200,
  message: '成功',
  data: [
    {
      id: 1,
      imageUrl: 'https://cdn2.thecatapi.com/images/2ep.jpg',
    },
    {
      id: 2,
      imageUrl: 'https://cdn2.thecatapi.com/images/6r8.jpg',
    },
    {
      id: 3,
      imageUrl: 'https://cdn2.thecatapi.com/images/efc.jpg',
    },
  ],
}
