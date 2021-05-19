const sqlite3 = require('sqlite3');
const { open } = require('sqlite');


const create_pizza_table = `create table if not exists pizza (
    id integer primary key,
    name text not null,
    size text,
    base text,
    price numeric
);`;

// this is a top-level await 
(async () => {
    // open the database
    
    const db = await open({
      filename: './pizzas.db',
      driver: sqlite3.Database
    });

    db.on('trace', function(data) {
        console.log(data);
    });

    await db.exec(create_pizza_table);

    await db.run(`insert into pizza (name, size, base, price) values (?, ?, ?, ?)`, 'Regina', 'small', 'thin', 30.99);

    const results = await db.all('SELECT * from pizza');

    console.log(results)




})()