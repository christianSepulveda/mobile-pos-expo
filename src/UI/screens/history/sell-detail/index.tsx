import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import { View, FlatList, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

import moment from "moment";
import "moment/locale/es";

import { SellSummary } from "../../../../domain/entities/sell-summary";
import SellDetailFooterRow from "../../../components/organism/SellDetailFooterRow";
import SellDetailRenderItem from "../../../components/organism/SellDetailRenderItem";

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
        <SellDetailFooterRow
          label={`${props.sell?.payment_method}`}
          value={props.sell ? props.sell.cash.toString() : ""}
        />

        <SellDetailFooterRow
          label="Vuelto"
          value={props.sell ? props.sell.change.toString() : ""}
        />

        <SellDetailFooterRow
          label="Total"
          value={props.sell ? props.sell.total.toString() : ""}
        />
      </View>
    </View>
  );
};

export default SellDetailScreen;
