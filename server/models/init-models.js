import _sequelize from "sequelize";
const DataTypes = _sequelize.DataTypes;
import _conversation from  "./conversation.js";
import _messages from  "./messages.js";
import _user from  "./user.js";
import _users_conversation from  "./users_conversation.js";

export default function initModels(sequelize) {
  const conversation = _conversation.init(sequelize, DataTypes);
  const messages = _messages.init(sequelize, DataTypes);
  const user = _user.init(sequelize, DataTypes);
  const users_conversation = _users_conversation.init(sequelize, DataTypes);

  messages.belongsTo(conversation, { as: "conversation", foreignKey: "conversation_id"});
  conversation.hasMany(messages, { as: "messages", foreignKey: "conversation_id"});
  users_conversation.belongsTo(conversation, { as: "conversation", foreignKey: "conversation_id"});
  conversation.hasMany(users_conversation, { as: "users_conversations", foreignKey: "conversation_id"});
  conversation.belongsTo(user, { as: "creator", foreignKey: "creator_id"});
  user.hasMany(conversation, { as: "conversations", foreignKey: "creator_id"});
  messages.belongsTo(user, { as: "sender", foreignKey: "sender_id"});
  user.hasMany(messages, { as: "messages", foreignKey: "sender_id"});
  users_conversation.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(users_conversation, { as: "users_conversations", foreignKey: "user_id"});

  return {
    conversation,
    messages,
    user,
    users_conversation,
  };
}
