import React, { useState } from 'react';
import { View, TextInput, Button, Text, ImageBackground, Image, StyleSheet } from 'react-native';

const WeatherApp = () => {
  const [cidade, setCidade] = useState('');
  const [dadosClima, setDadosClima] = useState(null);
  const [erro, setErro] = useState(null);

  const CHAVE_API = '7e295a76d2fd0f4f4c99e4b846edc0f0';
  const URL_API = `http://api.openweathermap.org/data/2.5/weather?q=${cidade}&appid=${CHAVE_API}&units=metric`;

  const traduzirDescricao = (descricao) => {
    switch (descricao.toLowerCase()) {
      case 'clear sky':
        return 'Céu Limpo';
      case 'few clouds':
        return 'Poucas Nuvens';
      case 'scattered clouds':
        return 'Nuvens Dispersas';
      case 'broken clouds':
        return 'Nuvens Quebradas';
      case 'light rain':
        return 'Chuva Leve';
      case 'rain':
        return 'Chuva';
      case 'heavy intensity rain':
        return 'Tempestade';
      case 'snow':
        return 'Neve';
      case 'mist':
        return 'Neblina';
      case 'moderate rain':
        return 'Chuva Moderada';
      default:
        return descricao;
    }
  };

  const buscarDadosClima = async () => {
    try {
      const resposta = await fetch(URL_API);
      if (!resposta.ok) {
        throw new Error('Cidade não encontrada, tente novamente.');
      }
      const dados = await resposta.json();
      setDadosClima({
        temperatura: dados.main.temp,
        descricao: traduzirDescricao(dados.weather[0].description),
        icone: `http://openweathermap.org/img/wn/${dados.weather[0].icon}.png`,
      });
      setErro(null);
    } catch (error) {
      setErro(error.message);
    }
  };

  return (
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome da cidade"
          value={cidade}
          onChangeText={setCidade}
        />
        <Button title="Pesquisar" onPress={buscarDadosClima} />
        {dadosClima && (
          <View style={styles.dadosClimaContainer}>
            <Text style={styles.dadosClimaTexto}>Temperatura: {dadosClima.temperatura}°C</Text>
            <Text style={styles.dadosClimaTexto}>Descrição: {dadosClima.descricao}</Text>
            <Image source={{ uri: dadosClima.icone }} style={styles.iconeClima} />
          </View>
        )}
        {erro && <Text style={styles.erroTexto}>{erro}</Text>}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#222',
    borderRadius: 7,
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },
  dadosClimaContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  dadosClimaTexto: {
    marginBottom: 20,
    color: 'white'
  },
  iconeClima: {
    width: 100,
    height: 100,
  },
  erroTexto: {
    marginTop: 20,
    color: 'red',
  },
});

export default WeatherApp;
