import { TouchableOpacity, View } from "react-native";
import { PaymentMethod } from "../../../../domain/entities/payment-method";
import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import AppText from "../AppText";

type Props = {
  item: PaymentMethod;
  selectedMethod: string;
  onSelect: (text: string) => void;
  index: number;
};

const PaymentMethodButton = ({ item, selectedMethod, onSelect }: Props) => (
  <View style={styles.paymentMethodContainer}>
    <TouchableOpacity
      activeOpacity={0.8}
      style={[
        styles.paymentMethodButton,
        {
          borderColor:
            selectedMethod === item.id ? COLORS.blueIOS : COLORS.gray,
        },
      ]}
      onPress={() => onSelect(item.id)}
    >
      <AppText
        type="semiBold"
        style={{
          ...styles.paymentMethodText,
          color: selectedMethod === item.id ? COLORS.blueIOS : COLORS.blackIOS,
        }}
        children={item.name}
        numberOfLines={1}
      />
    </TouchableOpacity>
  </View>
);

export default PaymentMethodButton;
