const { Model } = require('objection');
// const knex = require('knex');

// Initialize knex.
const knex = require('knex')({
  client: 'mysql',
  useNullAsDefault: true,
  connection: {
    filename: '../db/coursetrain.db'
  }
});

// Give the knex instance to objection.
Model.knex(knex);

// Person model.
class Answer extends Model {
  static get tableName() {
    return 'answers';
  }

  static get idColumn() {
    return 'id';
  }

  static get relationMappings() {
    return {
      children: {
        relation: Model.HasManyRelation,
        modelClass: Answer,
        join: {
          from: 'answers.id',
          to: 'questions.correctId'
        }
      }
    };
  }
  
}

class Command {
  async getAllAnswers(){
    const datalog = await Answer.query();
    return datalog;
  }
}

const cmd = new Command();



module.exports = cmd;
