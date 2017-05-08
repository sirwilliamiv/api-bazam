exports.up = function(knex, Promise) {

  return knex.schema
  .createTable('songs', function(table) {
    table.increments();
    table.string('songartist').notNullable();
    table.string('songname').notNullable();
    table.string('songalbum').notNullable();
    table.string('songphoto');
    table.integer('userid').unsigned().index().references('id').inTable('users')
    //
  })

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('songs');

};
