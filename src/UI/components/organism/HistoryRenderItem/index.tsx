import { TouchableOpacity, View } from "react-native";
import AppText from "../../atoms/AppText";
import { styles } from "./styles";
import { Sell } from "../../../../domain/entities/sell";

type RenderItemProps = {
  item: Sell;
  index: number;
};

const HistoryRenderItem = (props: RenderItemProps) => {
  const date = props.item.date;
  const time = props.item.time;

  return (
    <TouchableOpacity style={styles.touchable}>
      <View style={styles.itemContainer}>
        <AppText children={`${date}`} type="bold" style={styles.largeText} />

        <AppText
          children={`Venta número: ${props.item.sell_number}`}
          type="bold"
          style={styles.largeText}
        />

        <View style={styles.spacing} />

        <AppText
          children={`Total: ${props.item.total}`}
          type="medium"
          style={styles.shortText}
        />
      </View>
    </TouchableOpacity>
  );
};

export default HistoryRenderItem;
