import React from 'react';

import { StyleSheet, View, Text, Alert, TouchableOpacity } from 'react-native';
import { AamarPay } from 'react-native-aamarpay';
import type { JSONURLs } from 'src/types';

// set isTestMode to false when aamarpay in production
const isTestMode = true;

//For Testing Purpose, use SANDBOX Store ID and Signature Key and
//For Production, use your Store ID and Signature Key provided by aamarPay
const storeId = '';
const signatureKey = '';

const jsonURLs: JSONURLs = {
  success_url: "https://www.example.com/success_url",
  success_url_suffix: "success_url",
  fail_url: "https://www.example.com/fail_url",
  fail_url_suffix: "fail_url",
  cancel_url: "https://www.example.com/cancel_url",
  cancel_url_suffix: "cancel_url",
}

const aamarPay = new AamarPay(storeId, signatureKey, isTestMode, jsonURLs);

const Payment: React.FC<{
  aamarPay: AamarPay;
  button: React.ReactElement;
}> = props => {

  const onClickPayment = async () => {
    try {
      const res = await props.aamarPay.onClickPayment(
        '10', //trxAmount = '10'
        'BDT', //trxCurrency = 'BDT'
        'CricChips', //paymentDescription = 'CricChips'
        'abc', //customerName = 'abc',
        'abc@gmail.com', //customerEmail = 'abc@gmail.com'
        '01711111111', //customerPhone = '01711111111'
        '', //customerAddress = ''
        '', //customerCity = ''
        'Bangladesh', //customerCountry = 'Bangladesh'
      );
      Alert.alert('Payment Successful', JSON.stringify(res));
    } catch (e: any) {
      Alert.alert(e?.code, e?.message);
    }
  }

  return (
    <>
      <TouchableOpacity onPress={onClickPayment}>
        {props.button}
      </TouchableOpacity>
    </>
  );
}

export default function App() {
  return (
    <View style={styles.container}>
      <Payment 
        aamarPay={aamarPay}
        button={
          <View style={{
            height: 50,
            width: 200,
            backgroundColor: 'blue',
            margin: 10,
            justifyContent: 'center',
            alignItems: 'center'}}>
            <Text style={{color: 'white'}}>Pay Now</Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000'
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
