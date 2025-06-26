// database.js
import Dexie from 'dexie';

export const db = new Dexie('SensorDB');
 
// db.version(1).stores({
//   leituras: '++id, idSensor, data, periodo, temperatura, umidade',
// });

// export const addLeitura = async ({ idSensor, temperatura, umidade }) => {
//   const agora = new Date();
//   const data = agora.toISOString().split('T')[0]; // YYYY-MM-DD
//   const hora = agora.getHours();
//   const periodo = hora < 12 ? 'Manhã' : 'Tarde';

//   const existe = await db.leituras
//     .where({ idSensor, data, periodo })
//     .first();

//     if (!existe) {
//   try {
//     await db.leituras.add({
//       idSensor,
//       temperatura,
//       umidade,
//       data,
//       periodo,
//     });
//     console.log('✅ Leitura salva no IndexedDB');
//   } catch (error) {
//     console.error('❌ Erro ao salvar leitura:', error);
//   }
//   } else {
//     console.log(`⚠️ Já existe leitura para ${data} ${periodo}`);
//   }
// };

db.version(3).stores({
  leituras: '++id, idSensor, data, hora, nome, temperatura, umidade',
  sensores: 'idSensor, nome, planta, irrigacao, intervalo, tempo',
});


export const addLeitura = async ({ idSensor, nome, temperatura, umidade, data, hora }) => {
  const chaveHora = `${data}-${hora}`;

  const existe = await db.leituras
    .where({ idSensor, data, hora })
    .first();

  if (!existe) {
    try {
      await db.leituras.add({
        idSensor,
        nome, // ← Adiciona o nome
        temperatura,
        umidade,
        data,
        hora,
      });
      console.log('✅ Leitura com nome salva no IndexedDB');
    } catch (error) {
      console.error('❌ Erro ao salvar leitura:', error);
    }
  } else {
    console.log(`⚠️ Já existe leitura para ${data} ${hora}`);
  }
};

export const getSensorById = async (idSensor) => {
  return await db.sensores.get(idSensor);
};

export const getLeituras = async () => {
  return await db.leituras.toArray();
};

export const limparBancoDeDados = async () => {
  await db.leituras.clear();
  console.log('📛 Banco de dados limpo.');
};