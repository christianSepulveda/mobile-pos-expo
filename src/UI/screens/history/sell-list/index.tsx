import { Sells } from "../../../../domain/constants/data";
import { View, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import HistoryRenderItem from "../../../components/organism/HistoryRenderItem";
import { StatusBar } from "expo-status-bar";
import IconButton from "../../../components/atoms/IconButton";
import { Sell } from "../../../../domain/entities/sell";

type Props = {
  onItemPress: (item: Sell) => void;
};

const HistoryScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent style="dark" />

      <View style={{ flexDirection: "row" }}>
        <IconButton iconName="calendar" label="Fecha" />
        <View style={{ marginHorizontal: 8 }} />
        <IconButton iconName="clock-time-four-outline" label="Hora" />
      </View>

      <FlatList
        data={Sells}
        renderItem={(itemProps) => (
          <HistoryRenderItem {...itemProps} onPress={props.onItemPress} />
        )}
      />
    </View>
  );
};

export default HistoryScreen;
