import {NativeModules, Platform} from 'react-native';
import type { FailureResponse, JSONURLs, PaymentInfo } from './types';

const LINKING_ERROR =
  `The package 'react-native-aamarpay' doesn't seem to be linked. Make sure: \n\n` +
  Platform.select({ ios: "- You have run 'pod install'\n", default: '' }) +
  '- You rebuilt the app after installing the package\n';

const Aamarpay = NativeModules.Aamarpay
  ? NativeModules.Aamarpay
  : new Proxy(
      {},
      {
        get() {
          throw new Error(LINKING_ERROR);
        },
      }
    );

export class AamarPay {
  constructor(storeId: string, signatureKey: string, isTestMode=true) {
    Aamarpay.initAamarPay(storeId, signatureKey, isTestMode);
  }

  async setJsonURLs(jsonURLs: JSONURLs){
    try {
      const urls = JSON.stringify(jsonURLs);
      await Aamarpay.setURLs(urls);
    } catch(e) {
      throw e;
    }
  }

  async onClickPayment(
    trxAmount: string,
    trxCurrency: string,
    paymentDescription: string,
    customerName: string,
    customerEmail: string,
    customerPhone: string,
    customerAddress: string,
    customerCity: string,
    customerCountry: string,
  ) {
    try {
      const res = await Aamarpay.onClickPayment(
        trxAmount,
        trxCurrency,
        paymentDescription,
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        customerCity,
        customerCountry
      );
      return JSON.parse(res) as PaymentInfo;
    } catch (e: any) {
      throw e as FailureResponse;
    }
  }
}
