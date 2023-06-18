const { Sequelize, DataTypes } = require("sequelize");
const Users = require("../models/users");
const { DB_TYPE, DB_HOST, DB_USER, DB_PASS, DB_TARGET } = require("../config");

class Sequelizer {
  constructor() {
    this._sequelize = null;
    this._users = null;
  }

  #connect =
    (func) =>
    async (...args) => {
      const sequelize = new Sequelize(DB_TARGET, DB_USER, DB_PASS, {
        host: DB_HOST,
        dialect: DB_TYPE,
      });

      const users = await Users(sequelize, DataTypes);
      this._users = users;

      try {
        const result = await func(sequelize, ...args);
        return result;
      } catch (error) {
        throw error;
      } finally {
        await sequelize.close();
      }
    };

  get users() {
    return this._users;
  }

  findOne = this.#connect(async (sequelize, { type, conditions }) => {
    try {
      return await this[type].findOne(conditions);
    } catch (error) {
      throw error;
    }
  });

  create = this.#connect(async (sequelize, { type, conditions }) => {
    try {
      await sequelize.transaction(async (transaction) => {
        await this[type].create(conditions, { transaction });
      });
    } catch (error) {
      throw error;
    }
  });
}

module.exports = Sequelizer;
