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

      {props.loading && (
        <ActivityIndicator
          size={50}
          color={COLORS.blueIOS}
          style={{ marginTop: 5 }}
        />
      )}

      {props.data === undefined ||
        (props.data.length === 0 && !props.loading && (
          <View
            style={{
              marginStart: 5,
              marginTop: 5,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Ionicons
              name="warning-outline"
              size={20}
              color={COLORS.yellowAlert}
            />
            <AppText
              type="regular"
              style={{ marginLeft: 5, fontSize: 16 }}
              children={`No hay ventas el día ${props.date}`}
            />
          </View>
        ))}

      <FlatList
        data={props.data}
        renderItem={(itemProps) => (
          <HistoryRenderItem {...itemProps} onPress={props.onItemPress} />
        )}
      />

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
              justifyContent: "center",
              flex: 2,
            }}
          >
            <AppText
              type="medium"
              style={{
                fontSize: 18,
                color: COLORS.blackIOS,
              }}
              children={`$${props.totalSells}`}
            />
          </View>
        </View>
      </View>
    </Animatable.View>
  );
};

export default HistoryScreen;
