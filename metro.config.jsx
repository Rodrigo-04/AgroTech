const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  const {
    resolver: { sourceExts, assetExts }
  } = await getDefaultConfig();

  return {
    resolver: {
      assetExts,
      sourceExts,
      extraNodeModules: {
        net: require.resolve('react-native-tcp'),
        tls: require.resolve('react-native-tcp'),
        dgram: require.resolve('react-native-udp'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('react-native-crypto'),

        // Adicione os polyfills que seu projeto precisa
        buffer: require.resolve('buffer/'),
        'base-64': require.resolve('base-64'),
        'text-encoding': require.resolve('text-encoding'),
      }
    }
  };
})();
