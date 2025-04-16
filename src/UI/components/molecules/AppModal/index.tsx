import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
} from "react-native";

import * as Animatable from "react-native-animatable";
import { COLORS } from "../../../styles/colors";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: ViewStyle["height"];
};

const AppModal: React.FC<AppModalProps> = ({
  visible,
  onClose,
  children,
  height,
}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <Animatable.View
              duration={200}
              animation="slideInUp"
              style={[styles.modalContent, { height: height ?? "80%" }]}
            >
              {children}
            </Animatable.View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)", // Fondo negro con opacidad
    justifyContent: "center",
    alignItems: "center",
  },

  modalContent: {
    width: "100%",
    marginBottom: "-100%",
    backgroundColor: COLORS.whiteSmoke,
    padding: 30,
    borderRadius: 12,
    elevation: 10,
  },
});

export default AppModal;
