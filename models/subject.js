'use strict';

module.exports = function(sequelize, DataTypes) {
  var Subject = sequelize.define('Subject', {
    subject_name: DataTypes.STRING
    // TeacherId:DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  Subject.associate=function (models){
    Subject.hasMany(models.Teacher);
    // Subject.hasMany(models.ConjStudentSubject);
    Subject.belongsToMany(models.Students,{through:'SubjectStudent'});
  }

  return Subject;
};
