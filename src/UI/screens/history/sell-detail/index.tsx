import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import { View, FlatList, TouchableOpacity } from "react-native";

import { StatusBar } from "expo-status-bar";
import { MaterialIcons } from "@expo/vector-icons";

import moment from "moment";
import "moment/locale/es";

import { SellSummary } from "../../../../domain/entities/sell-summary";
import SellDetailFooterRow from "../../../components/organism/SellDetailFooterRow";
import SellDetailRenderItem from "../../../components/organism/SellDetailRenderItem";

import AppText from "../../../components/atoms/AppText";
import * as Animatable from "react-native-animatable";

type Props = {
  loading: boolean;
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
    <Animatable.View
      animation={"fadeInRight"}
      duration={100}
      style={styles.container}
    >
      <StatusBar translucent style="dark" />

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingTop: "14%",
          width: "100%",
          padding: 20,
        }}
      >
        <TouchableOpacity
          onPress={props.onBackPress}
          style={{ flexDirection: "row", alignItems: "center", flex: 2 }}
        >
          <MaterialIcons
            name="arrow-back-ios"
            color={COLORS.blueIOS}
            size={18}
          />

          <AppText
            type="medium"
            children="Atrás"
            style={{ fontSize: 18, color: COLORS.blueIOS }}
          />
        </TouchableOpacity>

        <AppText
          type="medium"
          children="Información"
          style={styles.titleText}
        />
      </View>

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 15,
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
        style={{ marginHorizontal: 20 }}
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
    </Animatable.View>
  );
};

export default SellDetailScreen;
