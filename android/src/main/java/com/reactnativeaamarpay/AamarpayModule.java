package com.reactnativeaamarpay;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.module.annotations.ReactModule;

import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactContext;
import android.content.Context;
import java.util.Map;
import java.util.HashMap;
import android.util.Log;

import com.reactnativeaamarpay.library.AamarPay;

import org.json.JSONException;
import org.json.JSONObject;
import android.app.Activity;

@ReactModule(name = AamarpayModule.NAME)
public class AamarpayModule extends ReactContextBaseJavaModule {
    public static final String NAME = "Aamarpay";
    private AamarPay aamarPay;
  
    private String storeId, signatureKey;
    private boolean isTestMode;
  
    private Context context;
    private Activity activity;
  
    AamarpayModule(ReactApplicationContext reactContext) {
        super(reactContext);
        this.context = reactContext;
    }

    @Override
    @NonNull
    public String getName() {
        return NAME;
    }

    @ReactMethod
    public void initAamarPay(String storeId, String signatureKey, boolean isTestMode, String urls, Promise promise){
        this.storeId = storeId;
        this.signatureKey = signatureKey;
        this.isTestMode = isTestMode;
        // Initiate payment
        try{
            JSONObject jsonURLs = new JSONObject(urls);
            activity = getCurrentActivity();
            aamarPay = new AamarPay(this.context, storeId, signatureKey, activity, jsonURLs);
            // Set Test Mode
            aamarPay.testMode(isTestMode);
            // Auto generate Trx
            aamarPay.autoGenerateTransactionID(true);
        } catch(JSONException e) {
            promise.reject("APIInitFailure", e.getMessage());
        }
    }

    @ReactMethod
    public void onClickPayment(
        String trxAmount,
        String trxCurrency,
        String paymentDescription,
        String customerName,
        String customerEmail,
        String customerPhone,
        String customerAddress,
        String customerCity,
        String customerCountry,
        Promise promise
    ){
        // Set transaction parameter
        aamarPay.setTransactionParameter(trxAmount, trxCurrency, paymentDescription);
        // Set Customer details
        aamarPay.setCustomerDetails(customerName, customerEmail, customerPhone, customerAddress, customerCity, customerCountry);

        // Initiating PGW
        aamarPay.initPGW(new AamarPay.onInitListener() {
            @Override
            public void onInitFailure(Boolean error, String message) {
                // You will get the response, if payment gateway initialization is failed.
                Log.d("TEST_IF", message);
                promise.reject("PaymentInitFailure", message);
            }

            @Override
            public void onPaymentSuccess(JSONObject jsonObject) {
                // You will get the payment success response as a JSON callback
                Log.d("TEST_PS", jsonObject.toString());
                promise.resolve(jsonObject.toString());
            }

            @Override
            public void onPaymentFailure(JSONObject jsonObject) {
                // You will get the payment failed response as a JSON callback
                Log.d("TEST_PF", jsonObject.toString());
                promise.reject("PaymentFailure", jsonObject.toString());
            }

            @Override
            public void onPaymentProcessingFailed(JSONObject jsonObject) {
                // You will get the payment processing failed response as a JSON callback
                Log.d("TEST_PPF", jsonObject.toString());
                promise.reject("PaymentProcessingFailure", jsonObject.toString());
            }

            @Override
            public void onPaymentCancel(JSONObject jsonObject) {
                // You will get the payment cancel response as a JSON callback
                Log.d("TEST_PC", jsonObject.toString());
                try {
                    // Call the transaction verification check validity
                    aamarPay.getTransactionInfo(jsonObject.getString("trx_id"), new AamarPay.TransactionInfoListener() {
                        @Override
                        public void onSuccess(JSONObject jsonObject) {
                            promise.reject("PaymentCancel", jsonObject.toString());
                        }

                        @Override
                        public void onFailure(Boolean error, String message) {
                            promise.reject("PaymentCancel", message);
                        }
                    });
                } catch (JSONException e) {
                    promise.reject("PaymentCancel", jsonObject.toString());
                    e.printStackTrace();
                }
            }
        });
    }
}
