import React, { useEffect, useState } from "react";
import { SafeAreaView, Text, View, FlatList, Keyboard } from "react-native";
import styles from "./home.style";
import Cards from "../../components/cards/cards";
import { getData } from "../../services/axios";
import { beerData } from "../../model/beersInterface";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  ActivityIndicator,
  Button,
  Modal,
  Portal,
  RadioButton,
  Searchbar,
  TextInput,
} from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Header from "../../components/header/header";

type RootStackParamList = {
  ProductDetail: { id: string } | undefined;
};


const Home = () => {
  const [beers, setBeers] = useState<beerData[]>([]);
  const [counter, setCounter] = useState(1);
  const [appState, setAppState] = useState({
    firstRender: true,
    isFetching: true,
    isEnd: false,
  });
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [checked, setChecked] = useState("");
  const [text, setText] = useState("");
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const getBeers = async () => {
    setAppState({ ...appState, isFetching: true });
    const res = await getData(`/beers?page=${counter}`);
    if (res.data.length < 25) setAppState({ ...appState, isEnd: true });
    setBeers((prev) => [...prev, ...res.data]);
    setAppState({ ...appState, isFetching: false });
    if (appState.firstRender) setAppState({ ...appState, firstRender: false });
  };

  useEffect(() => {
    if (searchQuery === "") {
      getBeers();
    }
  }, [counter, searchQuery]);

  const fetchData = () => {
    if (!appState.isFetching && !appState.isEnd) {
      setCounter(counter + 1);
    }
  };

  const navigateToProduct = (id: string) => {
    navigation.navigate("ProductDetail", { id });
  };

  const renderFooter = () => {
    if (beers.length > 0) {
      return (
        <View>
          {appState.isFetching && <ActivityIndicator />}
          {appState.isEnd && <Text>No hay más artículos</Text>}
        </View>
      );
    }
  };

  const renderEmpty = () => {
    if (!appState.firstRender && !appState.isFetching) {
      return (
        <View>
          <Text>No hay datos actualmente</Text>
          <Button onPress={() => getBeers()}>Refrescar</Button>
        </View>
      );
    } else {
      return (
        <View
          style={styles.loadingIndicator}
        >
          <ActivityIndicator size="large" />
        </View>
      );
    }
  };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: "white", padding: 20 };

  const onChangeSearch = (query) => setSearchQuery(query);

  const findByName = async () => {
    setBeers([]);
    setAppState({ ...appState, isFetching: true });
    setCounter(0);
    const formattedName = searchQuery.replaceAll(" ", "_");
    const res = await getData(`/beers?page=1&beer_name=${formattedName}`);
    setBeers(res.data);
    setAppState({ ...appState, isFetching: false });
  };

  const clearInput = () => {
    setAppState({ ...appState, isFetching: true });
    setBeers([]);
    setCounter(1);
  };

  const applyFilter = async () => {
    if (text !== "" && checked) {
      Keyboard.dismiss();
      setVisible(false);
      setBeers([])
      setCounter(0);
      setAppState({ ...appState, isFetching: true });
      const res = await getData(`/beers?${checked}=${text.toString()}`);
      setBeers(res.data);
      setAppState({ ...appState, isFetching: false });
    };
  };

  const cleanFilter = () => {
    Keyboard.dismiss();
    setText("");
    setVisible(false);
    clearInput();
  }

  return (
    <SafeAreaView style={styles.homeContainer}>
      <Header />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
        >
          <Text>Graduación Alcohólica</Text>
          <TextInput
            style={styles.inputFilter}
            selectionColor="red"
            activeUnderlineColor="black"
            underlineColor="grey"
            keyboardType="numeric"
            label="Ingresar Número"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <RadioButton.Group
            onValueChange={(newValue) => setChecked(newValue)}
            value={checked}
          >
            <View style={styles.radioButtonContainer}>
              <RadioButton color="black" value="ibu_lt" />
              <Text>Menor a</Text>
            </View>
            <View style={styles.radioButtonContainer}>
              <RadioButton color="black" value="ibu_gt" />
              <Text>Mayor a</Text>
            </View>
          </RadioButton.Group>
          <Button onPress={applyFilter} buttonColor="black" mode="contained">Aplicar</Button>
          <Button onPress={cleanFilter} textColor="black">Limpiar Filtro</Button>
        </Modal>
      </Portal>
      <View style={styles.optionsContainer}>
        <Searchbar
          style={styles.searchBar}
          placeholder="Buscar"
          onChangeText={onChangeSearch}
          value={searchQuery}
          onSubmitEditing={findByName}
          onClearIconPress={clearInput}
        />
        <Icon
          onPress={showModal}
          size={36}
          name="filter"
        />
      </View>
      <FlatList
        contentContainerStyle={styles.flexGrow}
        style={styles.flexGrow}
        data={beers}
        // numColumns={1}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <Cards
            title={item.name}
            description={item.description}
            img={item.image_url}
            price={item.target_og}
            buttonPress={() => navigateToProduct(item.id.toString())}
          />
        )}
        onEndReached={fetchData}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmpty}
      />
    </SafeAreaView>
  );
};

export default Home;
