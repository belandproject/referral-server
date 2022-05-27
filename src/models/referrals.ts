import { DataTypes } from 'sequelize';

// We export a function that defines the model.
// This function will automatically receive as parameter the Sequelize connection object.
module.exports = sequelize => {
  sequelize.define(
    'referral',
    {
      code: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: DataTypes.STRING,
      },
      address: {
        allowNull: true,
        unique: true,
        type: DataTypes.STRING,
      },
      referrals: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.DECIMAL,
      },
      commissions: {
        allowNull: false,
        defaultValue: 0,
        type: DataTypes.DECIMAL,
      },
    },
    {
      indexes: [
        {
          fields: ['address'],
        },
      ]
    }
  );
};
