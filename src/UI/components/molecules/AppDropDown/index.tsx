import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";
import { COLORS } from "../../../styles/colors";
import AppText from "../../atoms/AppText";

export type DropdownItem = {
  id: string;
  name: string;
  code?: string;
};

type Props = {
  data: DropdownItem[];
  selectedItem: DropdownItem;
  onSelect: (selected: DropdownItem) => void;
  placeholder?: string;
  searchByCode: boolean;
};

const AppDropDown = (props: Props) => {
  const renderItem = (item: any) => {
    return (
      <View style={styles.item}>
        <AppText
          type={item === props.selectedItem ? "bold" : "regular"}
          style={{
            ...styles.textItem,
            color:
              item === props.selectedItem ? COLORS.blueIOS : COLORS.blackIOS,
          }}
        >
          {item.name}
        </AppText>
        {item === props.selectedItem && (
          <AntDesign
            style={styles.icon}
            color={COLORS.blueIOS}
            name="checkcircle"
            size={20}
          />
        )}
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      inputSearchStyle={styles.inputSearchStyle}
      iconStyle={styles.iconStyle}
      data={props.data}
      search
      maxHeight={300}
      labelField={props.searchByCode ? "code" : "name"}
      valueField="id"
      placeholder={props.placeholder ?? "Seleccione una opción"}
      searchPlaceholder="Buscar..."
      value={props.selectedItem}
      onChange={(item) => {
        props.onSelect(item);
      }}
      renderItem={renderItem}
    />
  );
};

export default AppDropDown;

const styles = StyleSheet.create({
  dropdown: {
    height: 50,
    backgroundColor: "white",
    borderRadius: 5,
    padding: 12,
  },
  icon: {
    marginRight: 5,
  },
  item: {
    padding: 17,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  textItem: {
    flex: 1,
    fontSize: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
    color: COLORS.blackIOS,
    fontFamily: "Quicksand_400Regular",
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});
