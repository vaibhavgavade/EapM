import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Card, CardItem, Body, Text} from 'native-base';

export const ListItem = ({data, onPress}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Card>
        <CardItem>
          <Body>
            <Text>{data.item.name}</Text>
            <Text>{data.item.url}</Text>
            {/* <Text>{data.item.created_at}</Text>
            <Text>{data.item.author}</Text> */}
          </Body>
        </CardItem>
      </Card>
    </TouchableOpacity>
  );
};
