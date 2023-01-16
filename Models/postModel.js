//post model
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "post",
    {
      imgUrl: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      readBy: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
    },
    { timestamps: true }
  );
  return Post;
};
