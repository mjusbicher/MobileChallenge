import React from 'react'
import {  Button, Card, Text } from 'react-native-paper';
import styles from './cards.style';

type cardsProps = {
  title: string,
  img: string,
  price: number,
  buttonPress: any
}

const Cards = (props: cardsProps) => {

  const { img, title, price, buttonPress } = props

  return (
    <Card style={styles.card}>
      <Card.Cover resizeMode="contain" source={{ uri: `${img}` }} />
      <Card.Content style={styles.cardText}>
        <Text variant="titleLarge" numberOfLines={1}>{title}</Text>
        <Text variant="titleMedium">$ {price}</Text>
        <Button icon="cart-variant" mode="contained" buttonColor="black" onPress={buttonPress}>Comprar</Button>
      </Card.Content>
    </Card>
  )
}

export default Cards;