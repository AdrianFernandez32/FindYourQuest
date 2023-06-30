"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Comment = exports.User = void 0;
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const comment_1 = require("./comment");
Object.defineProperty(exports, "Comment", { enumerable: true, get: function () { return comment_1.Comment; } });
user_1.User.hasMany(comment_1.Comment, { as: 'Comment', foreignKey: 'userId' });
comment_1.Comment.belongsTo(user_1.User, { as: 'User', foreignKey: 'userId' });
