'use strict';
module.exports = function(sequelize, DataTypes) {
  var Students = sequelize.define('Students', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: {
      type:DataTypes.STRING,
      validate:{
        isEmail: true
        // isUnique: (value, next)=>{
        //   Students.find({
        //       where: {email: value},
        //       attributes: ['id']
        //   })
        //   .done((error, Students)=>{
        //       if (error)
        //           return next(error);
        //       if (Students)
        //           return next('Email address already in use!');
        //       next();
        //   });
        // }
      },
      unique:{
        unique:true
      }
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Students.associate=function (models){
    // Students.hasMany(models.ConjStudentSubject);
    Students.belongsToMany(models.Subject,{through:'SubjectStudent'})
  }
  //instance
  Students.prototype.getFullName = function () {
    return `${this.first_name} ${this.last_name}`
  }
  return Students;
};
