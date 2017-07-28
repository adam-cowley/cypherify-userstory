const cypherify =  require('./index');

[
    'As a User {user_id,first_name,last_name} I would like to create a questionnaire {questionnaire_id}',
    'As a Restaurant Owner I would like to create a menu',
    'As a Customer {customer_id,first_name,last_name} I would like to try a Menu',
    'As a Customer {customer_id,first_name,last_name} I would like to rate a Menu',
].forEach(story => {
    console.log('CREATE '+ cypherify(story));
})