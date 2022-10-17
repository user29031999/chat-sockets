import _sequelize from 'sequelize';
const { Model, Sequelize } = _sequelize;

export default class conversation extends Model {
  static init(sequelize, DataTypes) {
  return super.init({
    conversation_id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user',
        key: 'user_id'
      }
    }
  }, {
    sequelize,
    tableName: 'conversation',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "conversation_id" },
        ]
      },
      {
        name: "conversation_creator_fk",
        using: "BTREE",
        fields: [
          { name: "creator_id" },
        ]
      },
    ]
  });
  }
}
