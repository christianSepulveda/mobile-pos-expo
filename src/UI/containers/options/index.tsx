import { useState } from "react";
import OptionScreen from "../../screens/options";

import OptionProductsContainer from "./option-products-container";
import OptionCategoriesContainer from "./option-categories-container";
import OptionPasswordContainer from "./option-password-container";

type Props = {};

const OptionContainer = (props: Props) => {
  const [selectedOption, setSelectedOption] = useState<number | undefined>(
    undefined
  );

  const onBackPress = () => setSelectedOption(undefined);

  if (selectedOption === 0)
    return <OptionProductsContainer onBackPress={onBackPress} />;

  if (selectedOption === 1)
    return <OptionCategoriesContainer onBackPress={onBackPress} />;
  
  if (selectedOption === 2) return <OptionPasswordContainer />;

  return <OptionScreen setSelectedOption={setSelectedOption} />;
};

export default OptionContainer;
