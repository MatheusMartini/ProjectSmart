import React, { useState } from "react";
import style from "./Send.module.css";
import Header from "./components/header/Header";
import SendForm from "./components/sendForm/SendForm";
import {getBalance, getAddress, createNewWalletKeyPair} from "../../lib/sapi";
import { isAddress, isPK } from "../../lib/smart";
import { useForm } from "react-hook-form";
import useModal from "../../util/useModal";
import Modal from "./components/modal/Modal";
import barcode from "../../assets/images/barcode.svg";
import { NavLink } from "react-router-dom";
import generatePDF from "../export-private-keys/GeneratorPDF";

import { View, Button, Text } from 'react-native';


function Send() {
  const { isShowing, toggle } = useModal(false);
  const [address, setAddress] = useState();
  const [privateKey, setPrivateKey] = useState();
  const [balance, setBalance] = useState(false);
  const {
    register,
    errors,
    setError,
    setValue,
    formState,
    triggerValidation,
  } = useForm({
    mode: "onChange",
  });

  const getBalanceFromSAPI = (address) => {
    setBalance("Loading Balance");
    getBalance(address)
      .then((res) => setBalance(res.balance))
      .catch((error) => setBalance("Error loading balance"));
  };

  const AddressPKValidation = async (value) => {
    let isValid = false;

    await isAddress(value)
      .then(data => {
        setAddress(data);
        getBalanceFromSAPI(data);
        isValid = true;
      })
      .catch(data => data);

    await isPK(value)
      .then(() => {
        const address = getAddress(value);
        setAddress(address);
        setPrivateKey(value);
        getBalanceFromSAPI(address);
        isValid = true;
      })
      .catch(data => data);

    if (!isValid) {
      setError("address", "invalid", "Invalid Address");
    }

    return isValid;
  }

  return (
    <View className={style.root}>

        <Header />

        <View className="container">
          <View className="cardWrapper">
            <View className="formControl">
              <label>
                Your Address or Private Key
                <input
                  type="text"
                  name="address"
                  autoComplete="off"
                  ref={register({
                    required: true,
                    validate: AddressPKValidation,
                  })}
                  onInput={() => triggerValidation("addressTo")}
                />
              </label>
              <Button type="button" className="modalButton" onClick={toggle}>
                <img className="barCode" src={barcode} alt="Barcode" />
              </Button>
              <Modal
                isShowing={isShowing}
                hide={toggle}
                callback={(obj) =>
                  obj.address && setValue("address", obj.address, true)
                }
              />
              {errors.address && (
                <Text className="error-message">{errors.address.message}</Text>
              )}
            </View>
          </View>
        </View>

        {formState.isValid ? (
          <View>
            <View className="container">
              <View className={style.btnWrapper}>
                <Text>Your Balance: {balance}</Text>
                <a
                  className={style.btn}
                  href={`https://insight.smartcash.cc/address/${address}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Show Transactions
                </a>
              </View>
            </View>

            <View className="container">
              <View className="cardWrapper">
                <SendForm address={address} balance={balance} privateKey={privateKey}/>
              </View>
            </View>
          </View>
        ) : null}

      {!formState.isValid ? (
        <>
          <View className="container">
            <Button className={`btn ${style.newAddress}`} onClick={() => generatePDF([createNewWalletKeyPair()], 'SmartCash_Address')}>Generate paper wallet</Button>
          </View>
          <View className="container">
            <View className={style.orSpan}>
              <Text>OR</Text>
            </View>
          </View>
          <View className="container">
            <NavLink to="/export-private-key" className={style.btnExport}>
              Export your private key from the old web wallet
            </NavLink>
          </View>
        </>
      ) : null}


    </View>
  );
}

export default Send;
