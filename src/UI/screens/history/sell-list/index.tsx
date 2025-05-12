import { View, FlatList, TouchableOpacity } from "react-native";
import { styles } from "./styles";

import HistoryRenderItem from "../../../components/organism/HistoryRenderItem";
import { StatusBar } from "expo-status-bar";
import IconButton from "../../../components/atoms/IconButton";
import { Sell } from "../../../../domain/entities/sell";
import AppText from "../../../components/atoms/AppText";
import moment from "moment";
import AppModal from "../../../components/molecules/AppModal";
import AppTextInput from "../../../components/molecules/AppTextInput";
import AppButton from "../../../components/molecules/AppButton";
import { DatePickerInput } from "react-native-paper-dates";
import { COLORS } from "../../../styles/colors";

type Props = {
  date: string;
  data: Sell[] | undefined;
  totalSells: number;

  onItemPress: (item: Sell) => void;
  onChangeDate: (date: string) => void;
};

const HistoryScreen = (props: Props) => {
  return (
    <View style={styles.container}>
      <StatusBar translucent style="dark" />

      <AppText
        type="bold"
        style={{ marginBottom: 40, fontSize: 35 }}
        children="Ventas"
      />

      <View style={{ width: "100%", height: 50 }}>
        <DatePickerInput
          locale="es"
          inputMode="start"
          mode="outlined"
          outlineColor={COLORS.gray}
          activeOutlineColor={COLORS.blueIOS}
          value={
            props.date ? moment(props.date, "DD/MM/YYYY").toDate() : new Date()
          }
          onChange={(date) =>
            props.onChangeDate(moment(date).format("DD/MM/YYYY"))
          }
          style={{
            backgroundColor: COLORS.white,
            marginBottom: 20,
          }}
        />
      </View>

      {props.data === undefined ||
        (props.data.length === 0 && (
          <AppText
            type="bold"
            style={{ marginTop: 10, fontSize: 18 }}
            children={`Sin ventas el día ${props.date}`}
          />
        ))}

      <FlatList
        data={props.data}
        renderItem={(itemProps) => (
          <HistoryRenderItem {...itemProps} onPress={props.onItemPress} />
        )}
      />

      <View style={styles.totalContainer}>
        <AppText
          type="bold"
          style={{ fontSize: 20, color: COLORS.blackIOS, marginVertical: 10 }}
          children={`Total: ${props.totalSells}`}
        />
      </View>
    </View>
  );
};

export default HistoryScreen;
