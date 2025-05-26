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

  const ProductDetailRender = ({ product }: { product: Detail }) => (
    <View
      style={{
        width: "80%",
        margin: 20,
      }}
    >
      <AppText
        style={{ fontSize: 20 }}
        numberOfLines={1}
        type="bold"
        children={`${product.name}`}
      />
      <AppText
        style={{ fontSize: 20 }}
        type="regular"
        children={`${product.quantity} x $${product.total}`}
      />
    </View>
  );

  if (props.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, alignItems: "center", paddingTop: "20%" }}>
      {!props.loading && (
        <>
          <Animatable.View
            animation={"fadeInUp"}
            duration={800}
            style={{ alignItems: "center" }}
          >
            <StatusBar translucent style="dark" />

            <Ionicons
              name="checkmark-circle-outline"
              color={COLORS.greenSuccess}
              size={80}
            />
            <AppText
              style={{ fontSize: 30, marginBottom: "10%" }}
              type="medium"
              children="¡Listo!"
            />

            <View
              style={{
                width: 350,
                height: "50%",
                alignItems: "center",
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
            </View>
          </Animatable.View>

          <Animatable.View
            animation={"fadeIn"}
            duration={800}
            style={{ position: "absolute", bottom: "18%" }}
          >
            <AppText
              style={{ fontSize: 18 }}
              type="regular"
              children={`EL total de la venta fue $${props.total}`}
            />
          </Animatable.View>

          <Animatable.View
            animation={"fadeIn"}
            duration={800}
            style={{ position: "absolute", bottom: 40, width: "80%" }}
          >
            <TouchableOpacity
              style={{
                backgroundColor: COLORS.blueIOS,
                padding: 20,
                borderRadius: 5,
                marginTop: 20,

                alignItems: "center",
                justifyContent: "center",
              }}
              onPress={props.onPress}
            >
              <AppText
                style={{ color: COLORS.white, fontSize: 20 }}
                type="medium"
                children="Volver a vender"
              />
            </TouchableOpacity>
          </Animatable.View>
        </>
      )}
    </View>
  );
};

export default TicketScreen;
