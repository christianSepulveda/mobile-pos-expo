import { TouchableOpacity, View } from "react-native";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { COLORS } from "../../../styles/colors";
import { Product } from "../../../../domain/entities/product";

type RenderItemProps = {
  item: Product;
  index: number;
};

const SellDetailRenderItem = (props: RenderItemProps) => {
  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={styles.itemContainer}>
        <View style={{ flex: 8 }}>
          <AppText
            children={`${props.item.code}`}
            type="medium"
            style={styles.shortText}
          />

          <View style={styles.spacing} />

          <AppText
            children={`${props.item.name}`}
            type="bold"
            style={styles.largeText}
          />
        </View>

        <View style={{ alignItems: "flex-end", flex: 4 }}>
          <AppText
            children={`$${props.item.price}`}
            numberOfLines={1}
            type="bold"
            style={{ ...styles.largeText, color: COLORS.blueIOS }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SellDetailRenderItem;
