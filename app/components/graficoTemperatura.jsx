// import React, { useEffect, useState } from 'react';
// import { View, Text } from 'react-native';
// //import { VictoryLine, VictoryChart, VictoryTheme } from 'victory-native';
// import { VictoryLine, VictoryChart, VictoryTheme } from 'victory';
// import { buscarTemperaturas } from '../database/temperaturaService';

// const GraficoTemperatura = () => {
//   const [dados, setDados] = useState([]);

//   useEffect(() => {
//     const intervalo = setInterval(() => {
//       buscarTemperaturas(result => {
//         const dadosConvertidos = result.map(item => ({
//           x: new Date(item.data).toLocaleTimeString(),
//           y: item.valor,
//         }));
//         setDados(dadosConvertidos);
//       });
//     }, 5000);

//     return () => clearInterval(intervalo);
//   }, []);

//   return (
//     <View>
//       <Text style={{ textAlign: 'center', fontSize: 18, marginVertical: 10 }}>Temperatura</Text>
//       <VictoryChart theme={VictoryTheme.material}>
//         <VictoryLine
//           data={dados}
//           interpolation="natural"
//           style={{ data: { stroke: '#c43a31' } }}
//         />
//       </VictoryChart>
//     </View>
//   );
// };

// export default GraficoTemperatura;
