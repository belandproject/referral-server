export default sequelize => {
  const { referral, refer_user } = sequelize.models;
  referral.hasMany(refer_user, {
    foreignKey: 'code',
    constraints: true,
  });
  refer_user.belongsTo(referral, {
    foreignKey: 'code',
    constraints: false,
  });
};
