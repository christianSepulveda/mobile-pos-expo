import { ScrollView, StatusBar } from "react-native";
import AppText from "../../components/atoms/AppText";
import * as Animatable from "react-native-animatable";
import { styles } from "./styles";
import OptionItem from "../../components/molecules/AppOptionItem";

type Props = {
  setSelectedOption: (option: number) => void;
};

const OptionScreen = (props: Props) => {
  return (
    <Animatable.View
      animation={"fadeInRight"}
      duration={100}
      style={styles.container}
    >
      <StatusBar translucent barStyle={"dark-content"} />

      <AppText type="medium" style={styles.title} children="Opciones" />

      <ScrollView>
        <OptionItem
          iconName="clipboard"
          title="Administrar categorías"
          onPress={() => props.setSelectedOption(0)}
        />

        <OptionItem
          iconName="lock-closed"
          title="Cambiar contraseña"
          onPress={() => props.setSelectedOption(1)}
        />
        <OptionItem
          iconName="log-out"
          title="Cerrar sesión"
          onPress={() => props.setSelectedOption(2)}
        />
      </ScrollView>
    </Animatable.View>
  );
};

export default OptionScreen;
