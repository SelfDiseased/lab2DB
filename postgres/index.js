const { Pool } = require('pg');

const {
    PG_USER,
    PG_HOST,
    PG_NAME,
    PG_PORT,
    PG_PASSWORD,
} = process.env;

const poolOptions = {
    user : PG_USER,
    host : PG_HOST || 'localhost',
    password: PG_PASSWORD,
    database : PG_NAME,
    port : parseInt(PG_PORT) || 5432,
    max: 20,
};
const pool = new Pool(poolOptions);

pool.on('end', () => console.log('Disconnected from Postgres!'));
pool.on('error', err => console.error(`Postgres Error : ${err}`));

pool.connect()
    .then(cli => {
        console.log('Postgres connected');
        pool.query('')
        return cli.release();
    })
    .catch(e => {
        console.error(`Postgres Connection Error : ${e}`);
        return process.exit(1);
    });

module.exports = pool;
