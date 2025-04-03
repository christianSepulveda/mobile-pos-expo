import { View, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Sell } from "../../../../domain/entities/sell";
import AppText from "../../../components/atoms/AppText";
import { Products } from "../../../../domain/constants/data";
import SellDetailRenderItem from "../../../components/organism/SellDetailRenderItem";
import { styles } from "./styles";
import { MaterialIcons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import { StatusBar } from "expo-status-bar";
import { SellDetail } from "../../../../domain/entities/sell-detail";
import { SellSummary } from "../../../../domain/entities/sell-summary";
import moment from "moment";
import "moment/locale/es";

type Props = {
  sell: SellSummary | undefined;
  onBackPress: () => void;
};

const SellDetailScreen = (props: Props) => {
  const humanDateES = props.sell
    ? moment(props.sell.date, "YYYY/MM/DD")
        .locale("es")
        .format("D [de] MMMM [de] YYYY")
    : "";

  return (
    <View style={styles.container}>
      <StatusBar translucent style="dark" />

      <View
        style={{ flexDirection: "row", alignItems: "center", marginTop: 50 }}
      >
        <TouchableOpacity onPress={props.onBackPress}>
          <MaterialIcons
            name="arrow-back-ios"
            color={COLORS.blueIOS}
            size={30}
          />
        </TouchableOpacity>

        <AppText
          type="bold"
          children="Detalle de la Venta"
          style={styles.titleText}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 5,
          marginStart: 30,
        }}
      >
        <AppText
          type="regular"
          children={humanDateES}
          style={styles.dateText}
        />

        <AppText type="regular" children={" a las "} style={styles.dateText} />

        <AppText
          type="regular"
          children={props.sell ? props.sell.time : ""}
          style={styles.dateText}
        />
      </View>

      <View style={styles.marginVertical2} />

      <FlatList
        data={props.sell?.details ?? []}
        renderItem={(item) => (
          <SellDetailRenderItem item={{ ...item.item }} index={item.index} />
        )}
      />

      <View style={styles.footer}>
        <AppText
          type="bold"
          children={props.sell ? `Total: ${props.sell.total}` : ""}
          style={styles.totalText}
        />
      </View>
    </View>
  );
};

export default SellDetailScreen;
