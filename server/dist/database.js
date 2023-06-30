"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize('findyourquest', 'adrianfersameta', 'SGG400pro!', {
    host: 'localhost',
    dialect: 'postgres',
});
exports.sequelize = sequelize;
