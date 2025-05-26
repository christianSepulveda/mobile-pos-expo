import moment from "moment";
import * as Animatable from "react-native-animatable";

import { DatePickerInput } from "react-native-paper-dates";
import { View, TouchableOpacity, FlatList } from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "../../../styles/colors";
import { CashRegister } from "../../../../domain/entities/cash-register";

import AppText from "../../../components/atoms/AppText";
import AppIndicator from "../../../components/molecules/AppIndicator";
import CashRegisterHistoryRenderItem from "../../../components/organism/CashRegisterHistoryRenderItem";

type Props = {
  date: string;
  loading: boolean;
  cashRegisters: CashRegister[];
  onBackPress: () => void;
  onChangeDate: (date: string) => void;
  onSelectCashRegister: (cashRegister: CashRegister) => void;
};

const CashRegisterHistoryScreen = (props: Props) => {
  return (
    <Animatable.View
      animation={"fadeInRight"}
      duration={100}
      style={{
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: COLORS.whiteSmoke,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={props.onBackPress}
          style={{ flexDirection: "row", alignItems: "center", flex: 2 }}
        >
          <Ionicons name="chevron-back" color={COLORS.blueIOS} size={18} />

          <AppText
            type="medium"
            children="Atrás"
            style={{ fontSize: 18, color: COLORS.blueIOS }}
          />
        </TouchableOpacity>

        <AppText
          type="semiBold"
          style={{
            fontSize: 18,
            flex: 10,
            textAlign: "center",
            paddingEnd: "14%",
          }}
          children="Historial de Caja"
        />
      </View>

      <View style={{ marginTop: 40 }} />

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

      <View style={{ marginTop: 8 }} />

      <AppIndicator
        data={props.cashRegisters}
        loading={props.loading}
        message={`No se registran cajas el día ${props.date}`}
      />

      <FlatList
        data={props.cashRegisters}
        renderItem={(item) => (
          <CashRegisterHistoryRenderItem
            {...item}
            onPressItem={props.onSelectCashRegister}
          />
        )}
      />
    </Animatable.View>
  );
};

export default CashRegisterHistoryScreen;
