'use strict';
module.exports = function(sequelize, DataTypes) {
  var SubjectStudent = sequelize.define('SubjectStudent', {
    StudentId: DataTypes.INTEGER,
    SubjectId: DataTypes.INTEGER,
    score: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  SubjectStudent.associate=function(models){
    SubjectStudent.belongsTo(models.Subject);
    SubjectStudent.belongsTo(models.Students)
  }
  return SubjectStudent;
};
