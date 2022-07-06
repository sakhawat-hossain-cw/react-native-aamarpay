# react-native-aamarpay

A react native library for aamarpay payment gateway. For more details visit [www.aamarpay.com](www.aamarpay.com)
Currently this library only provide support to React Native on android.

## Installation

```sh
npm install react-native-aamarpay
```
or
```sh
yarn add react-native-aamarpay
```

## Usage

```js
import { AamarPay } from 'react-native-aamarpay';
import { JSONURLs } from 'src/types';

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

const aamarPay = new AamarPay(storeId, signatureKey, isTestMode);

// ...

await props.aamarPay.setJsonURLs(jsonURLs);

const res = await aamarPay.onClickPayment(
  '10', //trxAmount = '10'
  'BDT', //trxCurrency = 'BDT'
  'CricChips', //paymentDescription = 'CricChips'
  'abc', //customerName = 'abc',
  'abc@gmail.com', //customerEmail = 'abc@gmail.com'
  '01711111111', //customerPhone = '01711111111'
  'Dhaka', //customerAddress = ''
  'Dhaka', //customerCity = ''
  'Bangladesh', //customerCountry = 'Bangladesh'
);
```

## Credits
Special credit goes to aamarpay-dev team for their [aamarPay-Android-Library](https://github.com/aamarpay-dev/aamarPay-Android-Library)

## Contributing

See the [contributing guide](CONTRIBUTING.md) to learn how to contribute to the repository and the development workflow.

## License

MIT
