/**
 * Created by tonghema on 16/10/2017.
 */
const mongoose = require('mongoose');
const httpStatus = require('http-status');
const APIError = require('../utils/APIError');
/**
 * User Roles
 */
const levels = [1, 2, 3];

/**
 * User Schema
 * @private
 */
const companySchema = new mongoose.Schema({
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
  // 企业名称
  name: {
    type: String,
    trim: true,
    index: true,
    unique: true,
    required: true,
    maxlength: 128
  },
  // 企业描述
  description: {
    type: String,
    maxlength: 128
  },
  // 注册地址
  address: {
    type: String,
    default: ''
  },
  apps: [{
    name: String, // 应用名称
    description: String, // 应用描述
    logo: String, // 应用logo
    app_id: String, // 应用 ID
    app_secret: String // 应用 secret
  }],
  // 级别
  level: {
    type: Number
  },
  // 照片
  picture: {
    type: String,
    default: 'http://opoewyfvz.bkt.clouddn.com/default_icon.png'
  }
}, {
  timestamps: true
});

/**
 * Methods
 */
companySchema.method({
  transform() {
    const transformed = {};
    const fields = ['id', 'name', 'apps', 'level', 'address', 'createdAt'];

    fields.forEach((field) => {
      transformed[field] = this[field];
    });

    return transformed;
  }
});

/**
 * Statics
 */
companySchema.statics = {

  levels,

  /**
   * Get user
   *
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  async get(id) {
    try {
      let company;

      if (mongoose.Types.ObjectId.isValid(id)) {
        company = await this.findById(id).exec();
      }
      if (company) {
        return company;
      }

      throw new APIError({
        message: 'company does not exist',
        status: httpStatus.NOT_FOUND
      });
    } catch (error) {
      throw error;
    }
  }
};

/**
 * @typedef User
 */
module.exports = mongoose.model('Company', companySchema);
