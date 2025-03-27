import { Sells } from "../../../domain/constants/data";
import { View, FlatList } from "react-native";
import { styles } from "./styles";

import AppTextInput from "../../components/molecules/AppTextInput";
import HistoryRenderItem from "../../components/organism/HistoryRenderItem";

type Props = {};

const HistoryScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.spacingLarge} />

      <FlatList data={Sells} renderItem={HistoryRenderItem} />
    </View>
  );
};

export default HistoryScreen;
