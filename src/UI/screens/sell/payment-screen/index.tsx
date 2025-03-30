import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import AppText from "../../../components/atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import { FlatList } from "react-native-gesture-handler";
import { PaymentMethod } from "../../../../domain/entities/payment-method";
import { StatusBar } from "expo-status-bar";
import AppTextInput from "../../../components/molecules/AppTextInput";

type Props = {
  total: number;
  selectedMethod: string;
  onSelect: (text: string) => void;
  onBackPress: () => void;
  onConfirmPayment: () => void;
  data: PaymentMethod[];
};

const PaymentScreen = (props: Props) => {
  const total = props.total;

  const PaymentMethodButton = (item: PaymentMethod, index: number) => (
    <View
      style={{
        width: "50%",
        padding: 10,
      }}
    >
      <TouchableOpacity
        activeOpacity={0.8}
        style={{
          backgroundColor: COLORS.white,
          borderColor:
            props.selectedMethod === item.id ? COLORS.blueIOS : COLORS.gray,
          borderWidth: 1,
          borderRadius: 5,
          padding: 20,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => props.onSelect(item.id)}
      >
        <AppText
          type="bold"
          style={{
            fontSize: 18,
            color:
              props.selectedMethod === item.id
                ? COLORS.blueIOS
                : COLORS.blackIOS,
          }}
          children={item.name}
          numberOfLines={1}
        />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={{ paddingTop: "20%", paddingHorizontal: 20, flex: 1 }}>
      <StatusBar translucent style="dark" />

      <AppText
        type="bold"
        style={{ fontSize: 25 }}
        children="Elija un medio de pago"
      />

      <View
        style={{
          flexDirection: "row",
          width: "90%",
          marginTop: 10,
          alignItems: "center",
        }}
      >
        <Ionicons
          name="information-circle"
          color={COLORS.yellowAlert}
          size={25}
          style={{ marginEnd: 5 }}
        />
        <AppText
          type="regular"
          style={{ fontSize: 14 }}
          children={"Consulte por el método de pago antes de continuar."}
        />
      </View>

      <View style={{ height: "30%" }}>
        <FlatList
          data={props.data}
          renderItem={(item) => PaymentMethodButton(item.item, item.index)}
          keyExtractor={(item) => item.id}
          numColumns={2}
          style={{ marginTop: "10%" }}
          columnWrapperStyle={{
            justifyContent: "space-between",
          }}
        />
      </View>

      <AppText
        type="semiBold"
        style={{ fontSize: 14, marginTop: "5%", marginBottom: 10 }}
        children={"Enviar comprobante por correo (opcional)"}
      />

      <AppTextInput
        onChangeText={() => {}}
        placeholder="Correo Electrónico"
        value=""
        keyboardType="email-address"
        theme="light"
      />

      <View
        style={{
          width: "100%",
          position: "absolute",
          bottom: 20,
          alignSelf: "center",
        }}
      >
        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.grayLight,
            borderRadius: 10,
            padding: 20,
            marginBottom: 20,
          }}
          onPress={props.onBackPress}
          activeOpacity={0.8}
        >
          <AppText
            type="bold"
            style={{ fontSize: 20, color: COLORS.white }}
            children={`Volver`}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            width: "100%",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: COLORS.blueIOS,
            borderRadius: 10,
            padding: 20,
          }}
          onPress={props.onConfirmPayment}
          activeOpacity={0.8}
        >
          <AppText
            type="bold"
            style={{ fontSize: 20, color: COLORS.white }}
            children={`Pagar $${total}`}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default PaymentScreen;
