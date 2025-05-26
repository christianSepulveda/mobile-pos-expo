import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { COLORS } from "../../../styles/colors";
import { Ionicons } from "@expo/vector-icons";
import AppText from "../../atoms/AppText";

type Props = {
  data: any;
  message: string;
  loading: boolean;
};

const AppIndicator = (props: Props) => {
  return (
    <View style={{ width: "100%" }}>
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
              children={props.message}
            />
          </View>
        ))}
    </View>
  );
};

export default AppIndicator;
