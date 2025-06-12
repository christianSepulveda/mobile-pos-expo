import { styles } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from "react-native";

import { COLORS } from "../../../styles/colors";
import AppText from "../../../components/atoms/AppText";
import SellDetailRenderItem from "../../../components/organism/SellDetailRenderItem";

import { BarcodeScanningResult, CameraView } from "expo-camera";
import { StatusBar } from "expo-status-bar";
import { Detail } from "../../../../domain/entities/sell-summary";
import CameraAccessError from "./camera-access-error";
import * as Animatable from "react-native-animatable";
import AppDropDown, {
  DropdownItem,
} from "../../../components/molecules/AppDropDown";
import { Product } from "../../../../domain/entities/product";

type Props = {
  scan: () => void;
  cancelSell: () => void;
  changeStep: () => void;
  editProductInList: (index: number) => void;
  removeProductFromList: (index: number) => void;
  handleBarcodeScanned: (data: BarcodeScanningResult) => void;
  requestCameraPermission: () => void;
  onShowScanner: () => void;
  setScanned: (code: string) => void;

  total: number;
  loading: boolean;
  showScanner: boolean;
  products: Detail[];
  searchList: Product[];
  hasPermission: boolean | null;
  activeBarCodeScanner: boolean;
};

const SellScreen = (props: Props) => {
  const productLength = props.products.length;
  const payButtonColor =
    productLength === 0 ? COLORS.grayLight : COLORS.blueIOS;

  const barcodeMessage = "Escanea un producto para comenzar.";
  const directSellMessage = "Busca un producto para comenzar.";

  const NoProducts = () => (
    <View style={styles.noProductsContainer}>
      <AppText
        children={props.showScanner ? barcodeMessage : directSellMessage}
        style={styles.noProductsText}
        type="medium"
      />
      <Ionicons
        name={props.showScanner ? "barcode-sharp" : "bag-outline"}
        size={70}
        color={COLORS.blueIOS}
      />
    </View>
  );

  if (props.hasPermission === false && props.loading === false) {
    return (
      <CameraAccessError
        requestCameraPermission={props.requestCameraPermission}
      />
    );
  }

  if (props.loading) {
    return (
      <Animatable.View
        animation={"fadeIn"}
        duration={1000}
        style={styles.loadingContainer}
      >
        <ActivityIndicator size="large" color={COLORS.blueIOS} />
        <AppText
          type="medium"
          style={{ marginTop: 20, fontSize: 20 }}
          children="Iniciando..."
        />
      </Animatable.View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={
          props.activeBarCodeScanner &&
          props.showScanner &&
          styles.cameraContainer
        }
      >
        <StatusBar translucent style="dark" />

        {props.activeBarCodeScanner && props.showScanner && (
          <>
            <CameraView
              onBarcodeScanned={props.handleBarcodeScanned}
              style={StyleSheet.absoluteFill}
              selectedLens="builtInTelephotoCamera"
              zoom={0.2}
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

            <TouchableOpacity
              style={styles.searchButton}
              onPress={() => props.onShowScanner()}
              activeOpacity={0.8}
            >
              <Ionicons
                name="search-outline"
                size={25}
                color={COLORS.white}
                style={styles.cancelIcon}
              />
            </TouchableOpacity>
          </>
        )}
      </View>

      <View style={styles.productsContainer}>
        {!props.showScanner && (
          <View style={{ marginTop: 50, marginBottom: 20 }}>
            {props.activeBarCodeScanner && (
              <TouchableOpacity
                style={styles.barcodeButton}
                onPress={() => props.onShowScanner()}
                activeOpacity={0.8}
              >
                <Ionicons
                  name="barcode-outline"
                  size={30}
                  color={COLORS.blueIOS}
                  style={styles.cancelIcon}
                />
              </TouchableOpacity>
            )}

            <AppText
              type="semiBold"
              children="Realizar una venta"
              style={{
                fontSize: 18,
                textAlign: "center",
                marginBottom: 15,
              }}
            />

            <AppDropDown
              data={props.searchList as DropdownItem[]}
              onSelect={(selected) => {
                props.handleBarcodeScanned({
                  data: selected.code ?? "",
                } as BarcodeScanningResult);
                props.scan();
              }}
              selectedItem={{} as DropdownItem}
              searchByCode={true}
              placeholder="Busca un producto"
            />
          </View>
        )}

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
            onPress={productLength > 0 ? props.changeStep : undefined}
            activeOpacity={productLength === 0 ? 1 : 0.8}
          >
            <AppText
              children={`Pagar $${props.total}`}
              numberOfLines={1}
              style={styles.payButtonText}
              type="medium"
            />
          </TouchableOpacity>

          <View style={styles.actionSpacer} />

          <TouchableOpacity
            style={styles.scanButton}
            activeOpacity={0.8}
            onPress={() =>
              !props.showScanner ? props.cancelSell() : props.scan()
            }
          >
            <Ionicons
              name={!props.showScanner ? "trash-bin-outline" : "barcode-sharp"}
              size={!props.showScanner ? 50 : 60}
              style={{ padding: !props.showScanner ? 5 : 0 }}
              color={COLORS.white}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SellScreen;
