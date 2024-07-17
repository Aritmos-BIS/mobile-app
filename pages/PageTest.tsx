import React from 'react';
import { View, StyleSheet, Button } from 'react-native';
import StatusPage from '../components/Status';
import ResultPage from '../components/Result';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useFocusEffect } from '@react-navigation/native';

const StatusPageTest: React.FC = () => {
  const [status, setStatus] = React.useState<'correct' | 'incorrect' | 'waiting' | 'winner' | 'loser'>('waiting');

  useFocusEffect(
    React.useCallback(() => {
      const lockOrientation = async () => {
        await ScreenOrientation.lockAsync(ScreenOrientation.OrientationLock.LANDSCAPE);
      };

      const unlockOrientation = async () => {
        await ScreenOrientation.unlockAsync();
      };

      lockOrientation();

      return () => {
        unlockOrientation();
      };
    }, [])
  );

  const renderContent = () => {
    if (status === 'winner' || status === 'loser') {
      return <ResultPage result={status} profileImage="" />;
    } else {
      return <StatusPage status={status} />;
    }
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        {renderContent()}
        <View style={styles.buttonContainer}>
          <Button title="Correct" onPress={() => setStatus('correct')} />
          <Button title="Incorrect" onPress={() => setStatus('incorrect')} />
          <Button title="Waiting" onPress={() => setStatus('waiting')} />
          <Button title="Winner" onPress={() => setStatus('winner')} />
          <Button title="Loser" onPress={() => setStatus('loser')} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#10002B',
    padding: 20,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
  },
});

export default StatusPageTest;
