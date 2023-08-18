import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import { Image, View } from 'react-native';
import { getData } from '../../services/axios';
import { ActivityIndicator, Button, Divider, Snackbar, Text } from 'react-native-paper';
import styles from './productDetail.style';
import { beerData } from '../../model/beersInterface';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const ProductDetail = () => {
  const [beer, setBeer] = useState<beerData>({});
  const [isFetching, setIsFetching] = useState(false);
  const [visible, setVisible] = useState(false);
  const route = useRoute();

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  const getProduct = async () => {
    setIsFetching(true);
    const res = await getData(`/beers/${route.params.id}`);
    setBeer(res.data[0]);
    setIsFetching(false);
  };

  useEffect(() => {
    getProduct();
  }, []);


  return (
    <>
      {isFetching ? <View
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" />
      </View> :
        <ScrollView contentContainerStyle={styles.detailContainer}>
          <Image resizeMode='contain' style={styles.image} source={{ uri: beer.image_url }} />
          <View style={styles.titleContainer}>
            <Text variant="headlineLarge">{beer.name}</Text>
            <View style={styles.iconContainer}>
              <Icon color="black" size={24} name="glass-wine" textColor='black' />
              <Text>{beer.ibu}%</Text>
            </View>
          </View>
          <Divider />
          <Text variant="bodyLarge">{beer.description}</Text>
          <Text variant="titleLarge">$ {beer.target_og}</Text>
          <Button onPress={onToggleSnackBar} style={styles.button} mode="contained" buttonColor="black">
            Agregar al Carrito
          </Button>
          <Snackbar
            visible={visible}
            onDismiss={onDismissSnackBar}>
            Se agregó el producto al carrito!
          </Snackbar>
        </ScrollView>}
    </>
  );
};

export default ProductDetail;