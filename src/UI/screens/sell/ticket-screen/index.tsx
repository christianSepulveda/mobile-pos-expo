import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import { Ionicons } from "@expo/vector-icons";
import { Detail } from "../../../../domain/entities/sell-summary";
import { ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

type Props = {
  loading: boolean;
  total: number;
  onPress: () => void;
  products: Detail[];
};

const TicketScreen = (props: Props) => {
  const LoadingIndicator = () => (
    <View>
      <AppText
        style={{ fontSize: 30, marginBottom: 20 }}
        type="bold"
        children="Enviando transacción..."
      />
      <ActivityIndicator size={50} color={COLORS.blueIOS} />
    </View>
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
    <View style={{ flex: 1, alignItems: "center", paddingTop: "30%" }}>
      {!props.loading && (
        <>
          <StatusBar translucent style="dark" />

          <Ionicons
            name="checkmark-circle"
            color={COLORS.greenSuccess}
            size={100}
          />
          <AppText
            style={{ fontSize: 30, marginBottom: 20 }}
            type="bold"
            children="Transacción exitosa!"
          />

          <View
            style={{
              width: "90%",
              height: "50%",
              alignItems: "center",
            }}
          >
            <ScrollView style={{ width: "100%" }}>
              {props.products.map((product) => (
                <ProductDetailRender
                  key={product.productid}
                  product={product}
                />
              ))}
            </ScrollView>
          </View>

          <AppText
            style={{ fontSize: 20, position: "absolute", bottom: "18%" }}
            type="regular"
            children={`EL total de la venta fue $${props.total}`}
          />

          <TouchableOpacity
            style={{
              backgroundColor: COLORS.blueIOS,
              padding: 20,
              borderRadius: 5,
              marginTop: 20,
              width: "80%",
              alignItems: "center",
              justifyContent: "center",
              position: "absolute",
              bottom: 40,
            }}
            onPress={props.onPress}
          >
            <AppText
              style={{ color: COLORS.white, fontSize: 20 }}
              type="bold"
              children="Volver a vender"
            />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

export default TicketScreen;
