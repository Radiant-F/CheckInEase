import {StyleSheet, Text, View, Button} from 'react-native';
import React from 'react';
import axios from 'axios';

export default function Demo() {
  return (
    <View>
      <Text>Demo</Text>
      <Button
        title="hit presence in"
        onPress={async () => {
          try {
            const response = await axios.post(
              'https://dev.pondokdigital.pondokqu.id/api/presence-out',
              null,
              {
                headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvZGV2LnBvbmRva2RpZ2l0YWwucG9uZG9rcXUuaWRcL2FwaVwvbG9naW4iLCJpYXQiOjE2OTU5NTM2NDEsImV4cCI6MTY5ODU0NTY0MSwibmJmIjoxNjk1OTUzNjQxLCJqdGkiOiJ1UnF5RTZJeDNXNFF5RXBhIiwic3ViIjo1NzEsInBydiI6Ijg3ZTBhZjFlZjlmZDE1ODEyZmRlYzk3MTUzYTE0ZTBiMDQ3NTQ2YWEifQ.4cb2YGtaNPwTGgqLVLzmf5JpqeFP02LRpdGpbpKL9vM`,
                },
              },
            );
            console.log(response.data);
          } catch (error) {
            console.log(error);
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
