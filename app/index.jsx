import { useEffect } from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useRouter } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import Logo from '../assets/img/Logo.png';

// Evita que o splash screen desapareça automaticamente
SplashScreen.preventAutoHideAsync();

const Splash = () => {
  const router = useRouter();

  useEffect(() => {
    const prepare = async () => {
      // Espera 2 segundos
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Esconde o splash screen nativo
      await SplashScreen.hideAsync();

      // Redireciona
      router.push('/login');
    };

    prepare();
  }, []);

  return (
    <View style={styles.container}>
      <Image source={Logo} style={styles.img} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E5939',
    alignItems: 'center',
    justifyContent: 'center',
  },
  img: {
    width: 200,
    height: 200
  }
});
