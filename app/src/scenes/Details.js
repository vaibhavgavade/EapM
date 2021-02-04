import React from 'react';
import {Container, Content, Text} from 'native-base';

export const Details = ({route}) => {
  const {data} = route.params;
  return (
    <Container style={{backgroundColor:'#87cefa'}}>
      <Content>
        <Text>{JSON.stringify(data)}</Text>
      </Content>
    </Container>
  );
};
