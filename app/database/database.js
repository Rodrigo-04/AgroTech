// database.js
import Dexie from 'dexie';

export const db = new Dexie('SensorDB');

db.version(1).stores({
  temperaturas: '++id, valor, data'
});

export const addTemperatura = async (valor) => {
  await db.temperaturas.add({ valor, data: new Date().toISOString() });
};

export const getTemperaturas = async () => {
  return await db.temperaturas.toArray();
};



// import * as SQLite from 'expo-sqlite';

// const db = SQLite.openDatabase('sensores.db');

// export const createTables = () => {
//   db.transaction(tx => {
//     tx.executeSql(
//       `CREATE TABLE IF NOT EXISTS temperatura (
//         id INTEGER PRIMARY KEY AUTOINCREMENT,
//         valor REAL NOT NULL,
//         data TEXT NOT NULL
//       );`
//     );
//   });
// };
