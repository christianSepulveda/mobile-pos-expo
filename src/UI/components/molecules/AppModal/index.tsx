import {
  Modal,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";

import * as Animatable from "react-native-animatable";

type AppModalProps = {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
};

const AppModal: React.FC<AppModalProps> = ({ visible, onClose, children }) => {
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
            <Animatable.View duration={200} animation="slideInUp" style={styles.modalContent}>
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
    height: "80%",
    marginBottom: "-100%",
    backgroundColor: "#fff",
    padding: 30,
    borderRadius: 12,
    elevation: 10,
  },
});

export default AppModal;
