import { Sequelize } from 'sequelize';
import applyExtraSetup from './extra-setup';
import glob from 'glob';
import path from 'path';

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
var sequelize;

const isProduction = process.env.NODE_ENV == 'production';

if (process.env.POSTGRES_URI) {
  sequelize = new Sequelize(process.env.POSTGRES_URI, { logging: !isProduction });
} else {
  const hosts = process.env.DB_READ.split(',');

  sequelize = new Sequelize(process.env.DB, null, null, {
    dialect: 'postgres',
    port: 5432,
    replication: {
      read: hosts.map(host => {
        return { host, username: 'postgres', password: process.env.DB_PASS };
      }),
      write: { host: process.env.DB_WRITE, username: 'postgres', password: process.env.DB_PASS },
    },
    pool: {
      // If you want to override the options used for the read/write pool you can do so here
      max: 20,
      idle: 30000,
    },
    logging: !isProduction,
  });
}

const modelDefiners = glob.sync('./src/models/**/*.ts').map(function (file) {
  return require(path.resolve(file));
});

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyExtraSetup(sequelize);

export default sequelize;
