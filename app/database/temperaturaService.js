import { db } from './database';

export const inserirTemperatura = (valor) => {
  const dataAtual = new Date().toISOString();
  db.transaction(tx => {
    tx.executeSql(
      'INSERT INTO temperatura (valor, data) VALUES (?, ?);',
      [valor, dataAtual],
      (_, result) => console.log('Temperatura inserida.'),
      (_, error) => console.error('Erro ao inserir temperatura', error)
    );
  });
};

export const buscarTemperaturas = (callback) => {
  db.transaction(tx => {
    tx.executeSql(
      'SELECT * FROM temperatura ORDER BY data ASC;',
      [],
      (_, { rows }) => callback(rows._array),
      (_, error) => console.error('Erro ao buscar temperaturas', error)
    );
  });
};
