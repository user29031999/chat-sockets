import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class users_conversation extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    users_conversation_id: {
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
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'users_conversation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "users_conversation_id" },
        ]
      },
      {
        name: "users_conversation_fk",
        using: "BTREE",
        fields: [
          { name: "conversation_id" },
        ]
      },
      {
        name: "users_conversation_user_id",
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
    ]
  });
  }
}
