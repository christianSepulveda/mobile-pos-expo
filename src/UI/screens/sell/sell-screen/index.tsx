import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";

import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";

import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import SellDetailRenderItem from "../../../components/organism/SellDetailRenderItem";

import { BarcodeScanningResult, CameraView } from "expo-camera";
import { SellProduct } from "../../../containers/sell/sell-container";
import { StatusBar } from "expo-status-bar";
import { Detail } from "../../../../domain/entities/sell-summary";

type Props = {
  scan: () => void;
  cancelSell: () => void;
  changeStep: () => void;
  editProductInList: (index: number) => void;
  removeProductFromList: (index: number) => void;
  handleBarcodeScanned: (data: BarcodeScanningResult) => void;

  total: number;
  products: Detail[];
  hasPermission: boolean | null;
};

const SellScreen = (props: Props) => {
  const productLength = props.products.length;
  const payButtonColor =
    productLength === 0 ? COLORS.grayLight : COLORS.blueIOS;

  const NoProducts = () => (
    <View style={styles.noProductsContainer}>
      <AppText
        children="Escanea un producto para comenzar."
        style={styles.noProductsText}
        type="bold"
      />
      <Ionicons name="barcode-outline" size={100} color={COLORS.blueIOS} />
    </View>
  );

  if (props.hasPermission === null) {
    return <View style={styles.cameraBackground} />;
  }
  if (props.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        <StatusBar translucent style="light" />

        <CameraView
          onBarcodeScanned={props.handleBarcodeScanned}
          style={StyleSheet.absoluteFill}
        />

        <TouchableOpacity
          style={styles.cancelButton}
          onPress={props.cancelSell}
          activeOpacity={0.8}
        >
          <Ionicons
            name="close-sharp"
            size={30}
            color={COLORS.white}
            style={styles.cancelIcon}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.productsContainer}>
        {productLength === 0 && <NoProducts />}

        {productLength > 0 && (
          <FlatList
            data={props.products}
            renderItem={(item) => (
              <SellDetailRenderItem
                {...item}
                onPress={() => props.editProductInList(item.index)}
                onDelete={() => props.removeProductFromList(item.index)}
                swipeable={true}
              />
            )}
            keyExtractor={(_, index) => index.toString()}
          />
        )}

        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[styles.payButton, { backgroundColor: payButtonColor }]}
            onPress={props.changeStep}
            activeOpacity={productLength === 0 ? 1 : 0.8}
          >
            <AppText
              children={`Pagar $${props.total}`}
              numberOfLines={1}
              style={styles.payButtonText}
              type="bold"
            />
          </TouchableOpacity>

          <View style={styles.actionSpacer} />

          <TouchableOpacity
            style={styles.scanButton}
            activeOpacity={0.8}
            onPress={() => props.scan()}
          >
            <Ionicons name="barcode-outline" size={60} color={COLORS.white} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SellScreen;
