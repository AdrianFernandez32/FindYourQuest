import { User } from './user';
import { Comment } from './comment';

User.hasMany(Comment, { as: 'Comment', foreignKey: 'userId' });
Comment.belongsTo(User, { as: 'User', foreignKey: 'userId' });

export { User, Comment };
