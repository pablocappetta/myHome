import React from 'react';
import { View } from 'react-native';
import { Snackbar } from 'react-native-paper';
import NetInfo from '@react-native-community/netinfo';

const NetworkStatus = () => {
  const [isConnected, setIsConnected] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <View>
      {!isConnected && (
        <Snackbar visible={!isConnected} duration={Snackbar.DURATION_SHORT}>
         Sin conexión a internet, por favor verifique su conexión.
        </Snackbar>
      )}
    </View>
  );
};

export default NetworkStatus;
