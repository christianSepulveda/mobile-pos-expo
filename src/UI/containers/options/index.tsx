import { useState } from "react";
import OptionScreen from "../../screens/options";

import OptionCategoriesContainer from "./option-categories-container";
import OptionPasswordContainer from "./option-password-container";
import { Alert, AlertButton } from "react-native";

type Props = { handleLogOut: () => void };

const OptionContainer = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );

  const onBackPress = () => setSelectedOption(undefined);

  const handleLogout = async () => props.handleLogOut();

  const options: AlertButton[] = [
    { text: "Cancelar", onPress: () => setSelectedOption(undefined) },
    { text: "Cerrar sesión", onPress: handleLogout },
  ];

  if (selectedOption === 0)
    return <OptionCategoriesContainer onBackPress={onBackPress} />;

  if (selectedOption === 1) return <OptionPasswordContainer />;

  if (selectedOption === 2) {
    Alert.alert("¿Estás seguro?", "¿Quieres cerrar sesión?", options, {
      cancelable: false,
    });
  }

  return <OptionScreen setSelectedOption={setSelectedOption} />;
};

export default OptionContainer;
