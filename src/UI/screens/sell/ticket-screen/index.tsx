import { View, ActivityIndicator, TouchableOpacity } from "react-native";
import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import { Ionicons } from "@expo/vector-icons";

type Props = { loading: boolean; total: number, onPress: () => void };

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

  if (props.loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <LoadingIndicator />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {!props.loading && (
        <>
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
          <AppText
            style={{ fontSize: 20 }}
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
