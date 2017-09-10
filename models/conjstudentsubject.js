'use strict';
module.exports = function(sequelize, DataTypes) {
  var ConjStudentSubject = sequelize.define('ConjStudentSubject', {
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
  ConjStudentSubject.associate=function (models){
    ConjStudentSubject.belongsTo(models.Students);
    ConjStudentSubject.belongsTo(models.Subject);
  }
  return ConjStudentSubject;
};
