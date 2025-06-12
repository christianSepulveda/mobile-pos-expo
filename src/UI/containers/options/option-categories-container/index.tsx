import { Alert } from "react-native";
import { useEffect, useState } from "react";
import OptionCategoriesScreen from "../../../screens/options/option-categories-screen";
import { Category } from "../../../../domain/entities/category";
import CreateEditCategoryModal from "../../../components/organism/CreateEditCategoryModal";
import { CategoryService } from "../../../../infrastructure/services/category-service";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Props = {
  onBackPress: () => void;
};

const OptionCategoriesContainer = (props: Props) => {
  const categoryService = new CategoryService();

  const [showSearchBar, setShowSearchBar] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >();
  const [loading, setLoading] = useState(false);

  const [categories, setCategories] = useState<Category[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>();
  const [companyId, setCompanyId] = useState<string>("");
  const [showCreateOrEditCategory, setShowCreateOrEditCategory] =
    useState(false);

  const onPress = (item: Category | undefined) => {
    setSelectedCategory(item);
    setShowCreateOrEditCategory(true);
  };

  const onCreateOrEditCategory = async (category: Category) => {
    setLoading(true);

    if (category.name.length === 0) {
      Alert.alert("Error", "El nombre de la categoría no puede estar vacío");
      setLoading(false);
      return;
    }

    const isNewCategory = category.id.length === 0;

    if (isNewCategory && !selectedCategory) {
      const newCategory: Category = {
        id: "",
        name: category.name,
        companyid: companyId,
        active: true,
      };

      await categoryService.save(newCategory, companyId);
    }

    if (!isNewCategory && selectedCategory) {
      const updatedCategory: Category = {
        ...selectedCategory,
        name: category.name,
      };

      await categoryService.update(updatedCategory);
    }

    await getCategories();
    setSelectedCategory(undefined);
    setShowCreateOrEditCategory(false);
    setLoading(false);
  };

  const getCategories = async () => {
    setLoading(true);

    const user = await AsyncStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;

    if (!parsedUser) {
      setLoading(false);
      setCategories([]);
      return;
    }

    const companyId = parsedUser.companyid;
    const response = await categoryService.findAll(companyId);

    setCategories(response as Category[]);
    setFilteredCategories(response as Category[]);
    setCompanyId(companyId);
    setLoading(false);
  };

  const filterCategories = () => {
    if (search.length === 0) setFilteredCategories(categories);

    const filteredCategories = categories.filter((category) =>
      category.name.toLowerCase().includes(search.toLowerCase())
    );

    setFilteredCategories(filteredCategories);
  };

  useEffect(filterCategories, [search]);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      <OptionCategoriesScreen
        search={search}
        loading={loading}
        categories={filteredCategories ?? []}
        showSearchBar={showSearchBar}
        onPress={onPress}
        setSearch={setSearch}
        onBackPress={props.onBackPress}
        setShowSearchBar={setShowSearchBar}
      />

      <CreateEditCategoryModal
        category={selectedCategory}
        visible={showCreateOrEditCategory}
        onPress={onCreateOrEditCategory}
        onClose={() => setShowCreateOrEditCategory(false)}
      />
    </>
  );
};

export default OptionCategoriesContainer;
