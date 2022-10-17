import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class messages extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    message_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'conversation',
        key: 'conversation_id'
      }
    },
    sender_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'messages',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "message_id" },
        ]
      },
      {
        name: "message_sender_fk",
        using: "BTREE",
        fields: [
          { name: "sender_id" },
        ]
      },
      {
        name: "message_conversation_fk",
        using: "BTREE",
        fields: [
          { name: "conversation_id" },
        ]
      },
    ]
  });
  }
}
