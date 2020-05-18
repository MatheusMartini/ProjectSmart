import React, { useState } from "react";
import { createAndSendRawTransaction, getFee } from "../../../../lib/sapi";
import { isAddress, isPK } from "../../../../lib/smart";
import { useForm } from "react-hook-form";
import useModal from "../../../../util/useModal";
import barcode from "../../../../assets/images/barcode.svg";

import Modal from "../modal/Modal";
import styles from './SendFormStyles';
import { View, Button, Text } from 'react-native';


function Send({ address, balance, privateKey, withdraw }) {
  const { isShowing, toggle } = useModal(false);
  const [txid, setTxId] = useState();
  const [fee, setFee] = useState();
  const [loading, setLoading] = useState(false);
  const [type, setType] = useState();
  const {
    register,
    handleSubmit,
    errors,
    setError,
    setValue,
    formState,
    triggerValidation,
    getValues,
  } = useForm({ mode: "onChange", defaultValues: {
      amount: withdraw ? Number(balance - 0.002).toFixed(4) : null
    } });

  const onSubmit = (data) => {
    setLoading(true);
    createAndSendRawTransaction(
      data?.addressTo,
      Number(data?.amount),
      String(privateKey || data?.privateKey)
    )
      .then((data) => setTxId(data?.txid))
      .catch((error) => setError(error[0]?.message))
      .finally(() => setLoading(false));
  };

  const getFeeFromSAPI = (amount) => {
    getFee(Number(amount), address).then((fee) => {
      setFee(fee);
      if (fee && Number(getValues("amount")) + fee > balance) {
        setError("amount", "invalid", "Requested amount exceeds balance");
      }
    });
  };

  if (txid) {
    return (
      <View className={style.amountWasSent}>
        <Text>Amount has been sent</Text>
        <a
          href={`https://insight.smartcash.cc/tx/${txid}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {txid}
          <small>(click to view details)</small>
        </a>
        <Button onClick={() => window.location.reload()}>Refresh Page</Button>
      </View>
    );
  }

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="formGroup"
        autoComplete="off"
      >
        <View className="formControl">
          <label>
            Address to send
            <input
              type="text"
              name="addressTo"
              ref={register({
                required: true,
                validate: async (value) => {
                  let isValid = false;
                  await isAddress(value)
                    .then((data) => {
                      isValid = true;
                    })
                    .catch((error) => {
                      setError("addressTo", "invalid", "Invalid address");
                    });
                  return isValid;
                },
              })}
              onInput={() => triggerValidation("addressTo")}
            />
          </label>
          <button
            type="button"
            className="modalButton"
            onClick={() => {
              toggle();
              setType("address");
            }}
          >
            <img className="barCode" src={barcode} alt="Barcode" />
          </button>
          {errors.addressTo && (
            <Text className="error-message">{errors.addressTo.message}</Text>
          )}
        </View>
        <View className="formControl">
          <label>
            Amount to send
            <input
              type="text"
              name="amount"
              ref={register({
                required: true,
                validate: (value) => {
                  if (value > balance) {
                    setError("amount", "invalid", "Exceeds balance");
                    return false;
                  }
                  if (value < 0.001) {
                    setError(
                      "amount",
                      "invalid",
                      "The minimum amount to send is 0.001"
                    );
                    return false;
                  }
                  if (
                    !value.match(
                      /^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:((\.)\d{0,8})+)?$/
                    )
                  ) {
                    setError(
                      "amount",
                      "invalid",
                      "Invalid format. e.g. 0,000.00000000"
                    );
                    return false;
                  }
                },
              })}
              onInput={async (e) => {
                const amount = e?.target?.value;
                await triggerValidation("amount").then(
                  (data) => data && getFeeFromSAPI(amount)
                );
              }}
            />
          </label>
          {errors.amount && (
            <span className="error-message">{errors.amount.message}</span>
          )}
        </View>
        {fee && (
          <View className={style.fee}>
            <Text>Fee: {fee}</Text>
            <Text>Amount with fee: {Number(getValues("amount")) + fee}</Text>
          </View>
        )}
        {
          !privateKey ?
            (
              <View className="formControl">
                <label>
                  Your Private Key
                  <input
                    type="text"
                    name="privateKey"
                    defaultValue={privateKey}
                    ref={register({
                      required: true,
                      validate: async (value) => {
                        let isValid = false;
                        await isPK(value)
                          .then((data) => (isValid = true))
                          .catch((error) => {
                            setError("privateKey", "invalid", "Invalid Private Key");
                          });
                        return isValid;
                      },
                    })}
                  />
                </label>
                <button
                  type="button"
                  className="modalButton"
                  onClick={() => {
                    toggle();
                    setType("privateKey");
                  }}
                >
                  <img className="barCode" src={barcode} alt="Barcode" />
                </button>
                {errors.privateKey && (
                  <Text className="error-message">{errors.privateKey.message}</Text>
                )}
              </View>
            )
            : null
        }
        <button type="submit" disabled={loading || !formState.isValid}>
          Send
        </button>
      </form>
      <Modal
        isShowing={isShowing}
        hide={toggle}
        callback={(obj) => {
          if (type === "address") {
            obj.address && setValue("addressTo", obj.address, true);
            obj.amount && setValue("amount", obj.amount, true);
          }
          if (type === "privateKey") {
            obj.address && setValue("privateKey", obj.address, true);
          }
        }}
      />
    </>
  );
}

export default Send;
