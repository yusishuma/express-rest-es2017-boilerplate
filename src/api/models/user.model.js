const mongoose = require('mongoose');
const httpStatus = require('http-status');
const { omitBy, isNil } = require('lodash');
const bcrypt = require('bcryptjs');
const moment = require('moment-timezone');
const jwt = require('jwt-simple');
const uuidv4 = require('uuid/v4');
const APIError = require('../utils/APIError');
const { env, jwtSecret, jwtExpirationInterval } = require('../../config/vars');
const VALUE = require('../../config/value');
/**
* User Roles
*/
const roles = ['user', 'admin'];

/**
 * User Schema
 * @private
 */
const userSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now
  },
  // 手机号
  username: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: true,
    maxlength: 128
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 6,
    maxlength: 128,
    validate: [
      function (pwd) {
        return pwd.length >= 6;
      },
      'Password too short!'
    ]
  },
  // 昵称
  nickname: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  // 角色
  role: {
    type: Number,
    required: true,
    default: VALUE.USER_ROLE.NORMAL
  },
  // 所属企业
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company'
  },
  // 个性签名
  signature: {
    type: String,
    default: ''
  },
  // 性别
  gender: {
    type: Number,
    default: VALUE.GENDER.UNKNOWN
  },
  // 加密盐
  salt: String,
  // 用户头像
  avatar: {
    type: String,
    default: 'http://opoewyfvz.bkt.clouddn.com/default_icon.png'
  },
  // 菠菜币
  coin: {
    type: Number,
    required: true,
    default: 10000
  },
  available_balance: {// 用户余额
    type: Number
  },
  // 用户当日收益上限
  todayEarnAmount: {
    type: Number,
    default: 3000
  },
  // 用户当日花费菠菜币
  todaySpendCoin: {
    type: Number,
    default: 0
  },
  // 用户本周赢取菠菜币
  weekWinCoin: {
    type: Number,
    default: 0
  },
  // 用户本周输掉的菠菜币
  weekLoseCoin: {
    type: Number,
    default: 0
  },
  // 竞猜胜场
  gamblingWinTimes: {
    type: Number,
    default: 0
  },
  // 竞猜参与次数
  gamblingPartInTimes: {
    type: Number,
    default: 0
  },
  // 标记用户最后获得赌局结果的时间
  markLastGambleHaveResultTime: {
    type: Number,
    default: (new Date()).valueOf()
  },
  // 标记用户最后查看获得赌局结果的时间
  markLastViewGambleListTime: {
    type: Number,
    default: new Date().valueOf()
  }
}, {
  timestamps: true
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */
userSchema.pre('save', async function save(next) {
  try {
    if (!this.isModified('password')) return next();

    const rounds = env === 'test' ? 1 : 10;

    const hash = await bcrypt.hash(this.password, rounds);
    this.password = hash;

    return next();
  } catch (error) {
    return next(error);
  }
});

/**
 * Methods
 */
userSchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'username', 'email', 'avatar', 'role', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  },

  token() {
    const playload = {
      exp: moment().add(jwtExpirationInterval, 'minutes').unix(),
      iat: moment().unix(),
      sub: this._id
    };
    return jwt.encode(playload, jwtSecret);
  },

  async passwordMatches(password) {
    return bcrypt.compare(password, this.password);
  }
});

/**
 * Statics
 */
userSchema.statics = {

  roles,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let user;

      if (mongoose.Types.ObjectId.isValid(id)) {
        user = await this.findById(id).exec();
      }
      if (user) {
        return user;
      }

      throw new APIError({
        message: 'User does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  },

  /**
   * Find user by email and tries to generate a JWT token
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async findAndGenerateToken(options) {
    const { email, password, refreshObject } = options;
    if (!email) throw new APIError({ message: 'An email is required to generate a token' });

    const user = await this.findOne({ email }).exec();
    const err = {
      status: httpStatus.UNAUTHORIZED,
      isPublic: true
    };
    if (password) {
      if (user && await user.passwordMatches(password)) {
        return { user, accessToken: user.token() };
      }
      err.message = 'Incorrect email or password';
    } else if (refreshObject && refreshObject.userEmail === email) {
      return { user, accessToken: user.token() };
    } else {
      err.message = 'Incorrect email or refreshToken';
    }
    throw new APIError(err);
  },

  /**
   * List users in descending order of 'createdAt' timestamp.
   *
   * @param {number} skip - Number of users to be skipped.
   * @param {number} limit - Limit number of users to be returned.
   * @returns {Promise<User[]>}
   */
  list({
    page = 1, perPage = 30, username, email, role
  }) {
    const options = omitBy({ username, email, role }, isNil);

    return this.find(options)
      .sort({ createdAt: -1 })
      .skip(perPage * (page - 1))
      .limit(perPage)
      .exec();
  },

  /**
   * Return new validation error
   * if error is a mongoose duplicate key error
   *
   * @param {Error} error
   * @returns {Error|APIError}
   */
  checkDuplicateEmail(error) {
    if (error.name === 'MongoError' && error.code === 11000) {
      return new APIError({
        message: 'Validation Error',
        errors: [{
          field: 'email',
          location: 'body',
          messages: ['"email" already exists']
        }],
        status: httpStatus.CONFLICT,
        isPublic: true,
        stack: error.stack
      });
    }
    return error;
  },

  async oAuthLogin({
    service, id, email, username, avatar
  }) {
    const user = await this.findOne({ $or: [{ [`services.${service}`]: id }, { email }] });
    if (user) {
      user.services[service] = id;
      if (!user.username) user.username = username;
      if (!user.avatar) user.avatar = avatar;
      return user.save();
    }
    const password = uuidv4();
    return this.create({
      services: { [service]: id }, email, password, username, avatar
    });
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('User', userSchema);
