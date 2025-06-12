import {
  View,
  ActivityIndicator,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { Detail } from "../../../../domain/entities/sell-summary";
import { StatusBar } from "expo-status-bar";
import * as Animatable from "react-native-animatable";
import SellDetailRenderItem from "../../../components/organism/SellDetailRenderItem";
import BottomTicket from "../../../components/atoms/BottomTicket";
import moment from "moment";

type Props = {
  loading: boolean;
  total: number;
  onPress: () => void;
  products: Detail[];
};

const TicketScreen = (props: Props) => {
  const LoadingIndicator = () => (
    <Animatable.View animation={"fadeInUp"} duration={800}>
      <AppText
        style={{ fontSize: 30, marginBottom: 20 }}
        type="bold"
        children="Enviando transacción..."
      />
      <ActivityIndicator size={50} color={COLORS.blueIOS} />
    </Animatable.View>
  );

  const ListView = () => (
    <Animatable.View animation={"fadeInUp"} duration={800}>
      <View
        style={{
          backgroundColor: COLORS.white,
          alignItems: "center",
          paddingTop: "20%",
        }}
      >
        <StatusBar translucent style="dark" />

        <Ionicons
          name="checkmark-circle-outline"
          color={COLORS.greenSuccess}
          size={80}
        />
        <AppText
          style={{ fontSize: 30, marginBottom: "5%" }}
          type="medium"
          children="¡Venta realizada!"
        />

        <View
          style={{
            width: 420,
            height: "60%",
            alignItems: "center",
            paddingHorizontal: 30,
            paddingTop: 20,
          }}
        >
          <FlatList
            data={props.products}
            renderItem={({ item, index }) => (
              <SellDetailRenderItem
                item={item}
                index={index}
                key={item.productid}
              />
            )}
            keyExtractor={(item) => item.productid.toString()}
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
          />

          <View
            style={{ width: "120%", height: 1, backgroundColor: COLORS.gray }}
          />

          <AppText
            style={{ fontSize: 16, marginTop: 16, width: "100%" }}
            type="semiBold"
            children={`Comprobante interno:`}
          />

          <View style={{ flexDirection: "row", width: "100%" }}>
            <AppText
              style={{
                fontSize: 16,
                marginTop: 16,
                flex: 10,
                textAlign: "left",
              }}
              type="regular"
              children={`Total de la venta:`}
            />

            <AppText
              style={{
                fontSize: 16,
                marginTop: 16,
                flex: 2,
                color: COLORS.blueIOS,
                textAlign: "right",
              }}
              type="medium"
              children={`$${props.total}`}
            />
          </View>

          <View style={{ flexDirection: "row", width: "100%" }}>
            <AppText
              style={{
                fontSize: 16,
                marginTop: 16,
                flex: 10,
                textAlign: "left",
              }}
              type="regular"
              children={`Fecha de la venta:`}
            />

            <AppText
              style={{
                fontSize: 16,
                marginTop: 16,
                flex: 5,
                color: COLORS.blueIOS,
                textAlign: "right",
              }}
              type="medium"
              children={`${moment().format("DD/MM/YYYY")}`}
            />
          </View>
        </View>
      </View>
      <BottomTicket />
    </Animatable.View>
  );

  if (props.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      {!props.loading && (
        <Animatable.View
          animation={"fadeInUp"}
          duration={800}
          style={{ flex: 1, alignItems: "center" }}
        >
          <ListView />

          <TouchableOpacity onPress={props.onPress}>
            <AppText
              children="Volver a vender"
              style={{
                fontSize: 18,
                borderBottomColor: COLORS.blueIOS,
                borderBottomWidth: 1,
                color: COLORS.blueIOS,
              }}
              type="medium"
            />
          </TouchableOpacity>
        </Animatable.View>
      )}
    </View>
  );
};

export default TicketScreen;
