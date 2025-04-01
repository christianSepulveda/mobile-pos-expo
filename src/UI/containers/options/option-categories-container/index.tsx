import { View, Text } from "react-native";
import React, { useState } from "react";
import OptionCategoriesScreen from "../../../screens/options/option-categories-screen";
import { Category } from "../../../../domain/entities/category";
import AppModal from "../../../components/molecules/AppModal";
import CreateEditCategoryModal from "../../../components/organism/CreateEditCategoryModal";

type Props = {
  onBackPress: () => void;
};

const OptionCategoriesContainer = (props: Props) => {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();

  const [showCreateOrEditCategory, setShowCreateOrEditCategory] =
    useState(false);

  const onPress = (item: Category | undefined) => {
    setSelectedCategory(item);
    setShowCreateOrEditCategory(true);
  };

  const onCreateOrEditCategory = () => {
    setSelectedCategory(undefined);
    setShowCreateOrEditCategory(false);
  };

  return (
    <>
      <OptionCategoriesScreen
        showSearchBar={showSearchBar}
        onBackPress={props.onBackPress}
        onPress={onPress}
        setShowSearchBar={setShowSearchBar}
      />

      <CreateEditCategoryModal
        visible={showCreateOrEditCategory}
        onClose={() => setShowCreateOrEditCategory(false)}
        onPress={onCreateOrEditCategory}
        category={selectedCategory}
      />
    </>
  );
};

export default OptionCategoriesContainer;
