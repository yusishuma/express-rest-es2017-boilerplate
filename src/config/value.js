/**
 * Created by tonghema on 16/10/2017.
 */
exports.RATIO_ROYALTY = 0.9; // 分润比例
exports.ORDER_TYPE = {
  NORMAL: 0,
  ORIENTATION: 1
};
/**
 * 转换支付方式
 */
exports.translatePaymentChannel = function translatePaymentChannel(type) {
  switch (type) {
    case 4:
      return 'alipay';
    case 3:
      return 'upacp_wap';
    case 2:
      return 'JINGDOU';
    case 1:
      return 'wx';
    default:
      return 'wx';
  }
};
// 支付方式
exports.PAYMENT = {
  JINGDOU: 2, // 竞豆
  wx: 1, // 微信
  upacp_wap: 3,
  alipay: 4 // 支付宝
};
/**
 * 转换支付类型
 */
exports.translateChargeType = function translateChargeType(type) {
  switch (type) {
    case 1:
      return '订单支付';
    case 2:
      return '订单退款';
    case 3:
      return '接单分润';
    case 4:
      return '购买竞豆';
    default:
      return '';
  }
};
// 交易类型
exports.CHARGE_TYPE = {
  PAY: 1, // 下单
  REFUND: 2, // 退款
  B2C: 3, // 接单
  buyCoin: 4, // 购买竞豆
  withdrawals: 4 // 提现
};
// 问题类型
exports.QUESTION_TYPE = {
  CHONGZHI: 1, // 充值
  TOUSU: 2, // 投诉
  TIXIAN: 3 // 提现
};
// 网易云 通知配置信息
exports.NETEASE = {
  AppKey: '3b599384a0b4c615655006c76502c4c8',
  AppSecret: 'bb86dc5e2640',
  OFFICE_MSG: 'guanfanggonggao', // 官方公告
  SYS_MSG: 'xitongtongzhi', // 系统通知
  ORDER_MSG: 'dingdantongzhi', // 订单通知
  JC_MSG: 'jingcaitongzhi', // 竞猜通知
  SCRAMBLE_NOTICE: 'qiangdantongzhi', // 抢单中心
  JIEDAN_NOTICE: 'jiedanzhongxin' // 接单中心
};
// ping++ 配置信息
exports.PINGPP = {
  AppKey_TEST: 'sk_test_izjvrTzPSmz51ebTOSabXHG4',
  AppKey_PRODUCTION: 'sk_live_Hm9qDCjHaHO0qnXnHC04OGa1',
  APP_ID: 'app_TavX5G8S8y5CPmDi',
  APP_ID_PRODUCTION: 'app_TavX5G8S8y5CPmDi',
  CHANNEL: 'wx'
};
exports.qiniu = {
  url: 'http://osjpvss28.bkt.clouddn.com/',
  ACCESS_KEY: 'iOn2htIw1aR0jBl0hNMk4ZiE8fsorte1yIjc4Q3u',
  SECRET_KEY: 'Ss4iQHqZYYvMSRwWCBAgS68E3O0oP_0CINM4LcGP'
};
// 购买竞豆 显示按钮
exports.BUTTON_COIN = false;
/**
 * 用户角色
 */
exports.USER_ROLE = {
  // 陪玩后台超级管理员
  PWCN_ADMIN_ADMIN: 0,
  // 普通用户
  NORMAL: 1,
  // 普通管理员
  PWCN_ADMIN_NORMAL_ADMIN: 2,
  // 陪玩后台运营管理员
  PWCN_ADMIN_OPERATOR_ADMIN: 3,

  // 竞猜后台超级管理员
  JC_ADMIN_ADMIN: 100,
  // 竞猜后台普通管理员
  JC_ADMIN_NORMAL_ADMIN: 101,
  // 竞猜后台运营管理员
  JC_ADMIN_OPERATOR_ADMIN: 102
};
// 用户组定义
exports.USER_GROUP = {
  // 新手组(未完善个人信息)
  NEWBIE: 1,
  // 普通组(已完善个人信息)
  NORMAL: 2,
  // 未归类
  OTHERS: 99,
  // 黑名单
  BLACK_LIST: 100
};
// 别名状态
exports.ALIAS_TYPE = {
  // 未确定
  UNCERTAIN: 1,
  // 官方用名
  OFFICIAL: 2,
  // 别名
  ALIAS: 3
};
// Banner 类型
exports.BANNER_TYPE = {
  // 游戏最新
  NEW: 1,
  // 网站首页
  WEBSITE_HOME: 2,
  // 商城
  MALL: 3
};
// 竞彩类型
exports.BET_TYPE = {
  // 常规
  COMMON_TYPE: 1,
  // 组合
  EXPRESS_TYPE: 2
};
// 竞猜单类型
exports.BET_TABLE_TYPE = {
  GAMBLE: 1,
  FUNBET: 2
};
// 竞豆兑换比例
exports.COIN_PROPORTION = 10;
// 评论类型
exports.COMMENT_TYPE = {
  NEWS: 1,
  GAMBLE: 2,
  MATCH: 3,
  ORDER: 4,
  FUNBET: 5
};
// 每日盈利上限
exports.DAY_EARN_AMOUNT = 3000;
exports.DAY_EXPRESS_EARN_AMOUNT = 3000;
// 数据来源
exports.DATA_SOURCE = {
  // 后台添加
  BACKSTAGE: 1,
  // EGB网站
  EGB: 2,
  // 平博
  PINGBO: 3
};
// 赛区
exports.DIVISION_CHANNEL = {
  // 中国(大陆)
  CHINA: 1,
  // 韩国
  KOREA: 2,
  // 欧洲
  EUROPE: 3,
  // 美洲
  AMERICA: 4,
  // 港澳台
  LMS: 5,
  // 东南亚
  SOUTHEASTASIA: 6,
  // 全球
  GLOBAL: 7
};
// 错误信息
exports.ERR_NUMBER = {
  GAMBLE_NULL: {
    number: 1,
    message: '赌局不存在'
  },
  FUND_POOL_NOTENOUGH: {
    number: 2,
    message: '超出风险金上限'
  },
  BET_UP_LIMIT: {
    number: 3,
    message: '高于下注上限'
  },
  BET_LOWER_LIMIT: {
    number: 4,
    message: '低于下注下限'
  },
  BET_OPTION: {
    number: 5,
    message: '下注项不正确'
  },
  REPEAT: {
    number: 6,
    message: '表单包含重复赌局'
  },
  LEAGUE_NULL: {
    number: 7,
    message: '赛事不存在'
  },
  MATCH_NULL: {
    number: 8,
    message: '赛程不存在'
  },
  FAILURE_BET: {
    number: 9,
    message: '无效下注'
  },
  RESULTGETTING: {
    number: 10,
    message: '比赛已开始'
  }
};

/**
 *  性别
 * @type {{UNKNOWN: number, MALE: number, FEMALE: number}}
 */
exports.GENDER = {
  // 未确定
  UNKNOWN: 0,
  // 男
  MALE: 1,
  // 女
  FEMALE: 2
};

/**
 * 状态码说明
 * @type {{UNPUBLISHED: number, PUBLISHED: number, PREPARING: number,
 * STARTED: number, ENDED: number, DELETED: number}}
 */
exports.STATUS = {
  UNPUBLISHED: 0, // 未发布
  PUBLISHED: 1, // 已发布
  PREPARING: 2, // 准备中
  STARTED: 3, // 已开始
  ENDED: 4, // 已结束
  DELETED: 5, // 被删除
  UNREVIEW: 6, // 未审核(用户申请为卖家状态)
  REVIEWING: 7, // 待审核(用户申请为卖家状态)
  REVIEWED: 8 // 已审核(用户申请为卖家状态)
};
// 当前版本内所有游戏的类型
exports.GAME_TYPE = {
  // 类型
  CSGO: 1,
  LOL: 2,
  DOTA: 3,
  // 王者荣耀
  KING_GLORY: 4
};
// 王者荣耀 游戏段位 及 相应陪玩价格
exports.RANK = {
  VERSION: 1,
  /**
   * 段位及各段位排位价格和匹配价格
   */
  RONGYAO_KING: {// 最强王者
    VALUE: 1,
    PIPEI_PRICE: 15,
    PAIWEI: 30
  },
  ZUIQIANG_KING: {// 至尊星耀
    VALUE: 2,
    PIPEI_PRICE: 10,
    PAIWEI: 20
  },
  YONGHENG_ZUANSHI: {// 永恒钻石
    VALUE: 3,
    PIPEI_PRICE: 8,
    PAIWEI: 10
  },
  ZUNGUI_BOJIN: {// 尊贵铂金
    VALUE: 4,
    PIPEI_PRICE: 5,
    PAIWEI: 7
  },
  RONGYAO_HUANGJIN: {// 荣耀黄金
    VALUE: 5,
    PIPEI_PRICE: 4,
    PAIWEI: 5
  },
  ZHIXU_BAIYIN: {// 秩序白银
    VALUE: 6,
    PIPEI_PRICE: 3,
    PAIWEI: 4
  },
  JUEJIANG_QINGTONG: {// 英勇黄铜
    VALUE: 7,
    PIPEI_PRICE: 2,
    PAIWEI: 3
  }
};
/**
 * 转换游戏类型
 */
exports.translateRank = function translateRank(rank) {
  switch (rank) {
    case 1:
      return '最强王者';
    case 2:
      return '至尊星耀';
    case 3:
      return '永恒钻石';
    case 4:
      return '尊贵铂金';
    case 5:
      return '荣耀黄金';
    case 6:
      return '秩序白银';
    case 7:
      return '英勇黄铜';
    default:
      return '';
  }
};
exports.RACE_MODE = {
  /**
   * 比赛模式
   */
  // 排位模式
  PAIWEI: 1,
  // 其他模式
  OTHER: 2
};
// 区服平台
exports.PLAY_SERVER = {
  /**
   * 区／平台
   */
  // 微信大区
  WECHAT: 1,
  // qq大区
  SHOUQ: 2
};
// 赛事状态
exports.MATCH_STATUS = {
  // 竞猜中
  BETTING: 1,
  // 获取中
  RESULTGETTING: 2,
  // 已结束
  ISEND: 3,
  // 流盘
  NORESULT: 4
};
// 赌局状态
exports.GAMBLE_STATUS = {
  // 竞猜中
  BETTING: 1,
  // 获取中
  RESULTGETTING: 2,
  // 已结束
  ISEND: 3,
  // 流盘
  NORESULT: 4,
  // 待发布
  EDITING: 5,
  // 已失效
  ISFAILURE: 6
};
// 赌局类型： 1、赛事赌局，2、话题赌局
exports.GAMBLE_TYPE = {
  // 1 赛事赌局
  LEAGUE: 1,
  // 冠军赌局
  FUNBET: 2
};
// 商品类型
exports.GOODS_TYPE = {
  // 热门商品
  HOT_GOODS: 1,
  // 普通商品
  NORMAL_GOODS: 2,
  // 菠菜币商品
  COIN_GOODS: 3
};

// 商品状态
exports.GOODS_STATUS = {
  // 可购买
  EXCHANGEABLE: 1,
  // 补货中
  REPLENISHMENT: 2,
  // 已下架
  OFF_THE_SHELF: 3
};

// 英雄定位
exports.HERO_TYPE = {
  // 上单
  TOP: 1,
  // 中单
  MID: 2,
  // ADC
  ATTACK: 3,
  // 打野
  JUNGLE: 4,
  // 辅助
  SUPPORT: 5,
  // 敏捷
  AGILITY: 6,
  // 力量
  STRENGTH: 7,
  // 智力
  INTELLIGENCE: 8
};

exports.LEVEL = {
  // 等级1
  ONE: 1,
  TWO: 2,
  THREE: 3
};

// 媒体素材分类
exports.MEDIA_CATEGORY = {
  // 新闻图片
  NEWS: 1001,
  // 战队图标
  TEAMICON: 1002
};

// 上传图片的类型
exports.MEDIA_TYPE = {
  // APP 上传
  APP: 1,
  // WEB 上传
  WEB: 2
};

// 新闻频道
exports.NEWS_CHANNEL = {
  NEW: 1,
  EVENT: 2,
  TRIGRAMS: 3,
  RAIDER: 4,
  OFFICIAL: 5
};

// 通知类型
exports.NOTICE_TYPE = {
  GAMBLEISWIN: 1,
  OFFICE_MSG: 2
};
exports.TMP_BET_TYPE = {
  ALL: 1,
  ONLY_GAMBLE_OPTION_ID: 2
};
// 战队胜负
exports.TEAM_OUTCOME = {
  WIN: 1,
  LOSE: 2,
  DRAW: 3
};

// 订单状态
exports.ORDER_STATUS = {
  UNPAID: 0, // 未支付
  // 兑换成功，待发货
  EXCHANGE_SUCCESS: 1,
  // 已发货
  SHIPPED: 2,
  // 已完成
  COMPLETED: 3,

  // 等待接单
  WAIT_ACCEPT: 4,
  // 订单已受理
  ACCEPTING: 5,
  // 比赛已开始
  GAME_START: 6,
  // 比赛已结束
  GAME_END: 7,
  // 比赛已取消
  GAME_CANCEL: 8
};
// 下注记录状态
exports.PROCESSBET_WIN = {
  WIN: 1,
  LOSE: 2,
  PROCESSING: 3,
  NORESULT: 4
};
// 用户奖励菠菜币类型
exports.REWARD = {
  LOGIN_REWARD: 10,
  COMMENT_REWARD: 10,
  SHARE_REWARD: 10
};
exports.SHARE_TYPE = {
  SHARE: 1
};
// 下注记录查询类型
exports.RECORD_TYPE = {
  // 下注时间
  BETTIME: 1,
  // 下注金额
  BETAMOUNT: 2,
  // 收益金额
  EARNAMOUNT: 3
};
// 返回客户端状态码
exports.RES_STATUS = {
  // 失败
  FAILURE: 0,
  // 成功
  SUCCESS: 1
};

// 武器类型
exports.WEAPON_TYPE = {
  // 手枪
  pistols: 1,
  // 步枪
  rifle: 2,
  // 散弹枪
  shotguns: 3,
  // 微型冲锋枪
  subMachineGuns: 4,
  // 机枪
  machineGun: 5,
  // 狙击步枪
  sniperRifles: 6,
  // 手雷
  grenade: 7,
  // C4炸弹
  bomb: 8,
  // 匕首
  dagger: 9
};
// 事件发生器常量
exports.EVENT_NAME = {
  UPDATEGAMBLESTATUS: 1
};

// 超时时间
exports.NORESULT_TIME = 1000 * 60 * 60 * 24;
// 获取user字段
exports.USERMODEL_POPULATE_SELECT_DATA = 'nickname avatar';

