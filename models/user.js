'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING,
    salt:DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    },
    // hooks:{
    //   beforeCreate:(user)=>{
    //     let alphabet='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890',newPassword=user.password+'';
    //     for (var i=0; i<9; i++){
    //       newPassword+=(alphabet.charAt(Math.floor(Math.random() * alphabet.length)));
    //     }
    //     user.password=newPassword;
    //   }
    // }
  });
  return User;
};
