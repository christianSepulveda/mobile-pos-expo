import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import { Sell } from "../../../../domain/entities/sell";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { View, FlatList, ActivityIndicator } from "react-native";
import { DatePickerInput } from "react-native-paper-dates";

import AppText from "../../../components/atoms/AppText";
import HistoryRenderItem from "../../../components/organism/HistoryRenderItem";

import moment from "moment";
import * as Animatable from "react-native-animatable";
import AppIndicator from "../../../components/molecules/AppIndicator";

type Props = {
  date: string;
  loading: boolean;
  data: Sell[] | undefined;
  totalSells: number;

  onItemPress: (item: Sell) => void;
  onChangeDate: (date: string) => void;
};

const HistoryScreen = (props: Props) => {
  return (
    <Animatable.View
      animation={"fadeInRight"}
      duration={100}
      style={styles.container}
    >
      <StatusBar translucent style="dark" />

      <AppText
        type="medium"
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

      <AppIndicator
        data={props.data}
        loading={props.loading}
        message={`No hay ventas el día ${props.date}`}
      />

      <View style={{height: "68%"}}>
        <FlatList
          data={props.data}
          renderItem={(itemProps) => (
            <HistoryRenderItem {...itemProps} onPress={props.onItemPress} />
          )}
        />
      </View>

      <View style={styles.totalContainer}>
        <View style={styles.totalCard}>
          <View
            style={{ flexDirection: "row", alignItems: "center", flex: 10 }}
          >
            <Ionicons
              name="trending-up-outline"
              color={COLORS.greenSuccess}
              size={20}
            />

            <View style={{ marginHorizontal: 5 }} />

            <AppText
              type="medium"
              style={{ fontSize: 18, color: COLORS.blackIOS }}
              children={`Total:`}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "flex-end",
              flex: 5,
            }}
          >
            <AppText
              type="medium"
              style={{
                fontSize: 18,
                color: COLORS.blackIOS,
              }}
              numberOfLines={1}
              children={`$${props.totalSells}`}
            />
          </View>
        </View>
      </View>
    </Animatable.View>
  );
};

export default HistoryScreen;
