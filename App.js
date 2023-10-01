import { StatusBar} from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';


let timer = null;
let s = 0;
let m = 0; 
let h = 0;  

export default function App() {

  const [btnText, setBtnText] = useState('Iniciar');
  const [timeClock, setTimeClock] = useState('00:00:00');
  const [resultTimer, setResultTimer] = useState(null);


  const clearTimer = () => {
    if(timer !== null){
      clearInterval(timer); 
      timer = null;
      setBtnText('Iniciar');
    }
    setTimeClock('00:00:00');
    setResultTimer(timeClock);
  }

  const startTimer = () => {
    if(timer !== null){
      //se ele ja estiver rodando e clicar dnv ele vai parar.

      clearInterval(timer); 
      timer = null;
      setBtnText('Iniciar');
    }else{
      timer = setInterval(function(){
        s++;

        if(s > 60){
          s = 0;
          m++;
        }
        if(m > 60){
          m = 0;
          h++;
        }


        let format =
        (h < 10 ? `0${h}` : h) + `:`
        + (m < 10 ? `0${m}` : m) + `:`
        + (s < 10 ? `0${s}` : s);

        setTimeClock(format);

      },1000);

      setBtnText('Parar');
    }
  }

  return (
    <View style={styles.container}>
      <Image 
        source={require('./src/assets/img/crono.png')}
      />

      <Text style={styles.clock}> {timeClock} </Text>

      <View style={styles.btnView}>
        <TouchableOpacity style={styles.btnArea} onPress={startTimer}>
          <Text style={styles.btnText}> {btnText} </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnArea} onPress={clearTimer}>
          <Text style={styles.btnText}> Limpar </Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.result}> {resultTimer ? `último timer é: ${resultTimer}` : null} </Text>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
    justifyContent: 'center',
  },
  clock:{
    marginTop: -160,
    color: '#fff',
    fontSize: 50
  },
  btnView: {
    marginTop: 150,
    flexDirection: 'row',
    width: `100%`,
    alignItems: 'center',
    justifyContent: 'space-evenly'
  },
  btnArea:{
    borderColor: '#6621b0',
    borderWidth: 1,
    width: `30%`,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 5
  },
  btnText:{
    color: '#fff',
    fontSize: 20
  },
  result:{
    color: '#fff',
    marginTop: 40,
    fontSize: 20
  }
});
