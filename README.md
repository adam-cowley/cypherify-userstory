# Cypherify your User Story

Convert your User Stories into Cypher Queries.  This repository uses the `compromise` library to run some basic NLP to turn a User Story into a Cypher query.

## Example

```
const cypherify =  require('./index');

[
    'As a Restaurant Owner {owner_id} I would like to create a menu',
    'As a Customer {customer_id,first_name,last_name} I would like to try a Menu',
].forEach(story => {
    console.log('CREATE '+ cypherify(story));
});
```

Produces:
```
CREATE (restaurant_owner:RestaurantOwner {owner_id:"7bc05732-edfd-418e-a3a2-082b577ac1eb"})-[:CREATED]->(menu:Menu)
CREATE (customer:Customer {customer_id:"06e854f1-71ae-48d7-8ed0-d148506df86c",first_name:"Aiden",last_name:"Block")-[:TRIED]->(menu:Menu)
```

## TODO
- Fake more data types
- Cast property types
- Type cast properties & map directly to faker lib