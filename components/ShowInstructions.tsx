import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
} from "react-native";
import { apiFetch } from "../libs/request";

const images = [
  require("../assets/axo.png"),
  require("../assets/monarch.png"),
  require("../assets/cacti.png"),
];

const ShowInstructions = ({ onNext }) => {
  const [waitingModal, setWaitingModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    let interval;
    let fetchInterval;

    if (waitingModal) {
      interval = setInterval(() => {
        setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 1500);

      fetchInterval = setInterval(async () => {
        const arimals = await apiFetch({ method: 'GET' }, '/api/battle/arimals');
        const answer = await apiFetch({ method:'GET' }, '/api/battle/answer')

        
        if (arimals?.arimalPlayer1?.arimal && arimals?.arimalPlayer2?.arimal && answer.turn == 1) {
          setTimeout(() => {
            setWaitingModal(false);
            onNext();
          }, 4000)
        }

      }, 1500);
    }

    return () => {
      clearInterval(interval);
      clearInterval(fetchInterval);
    };
  }, [waitingModal, onNext]);

  const handleNext = () => {
    setWaitingModal(true);
  };

  const closeModal = () => {
    setWaitingModal(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>
        Coloca tu tarjeta de monstruo favorita sobre el tablero
      </Text>
      <Image
        style={styles.imageStyle}
        source={require("../assets/sensorAnim.gif")}
        resizeMode="contain"
      />
      <TouchableOpacity
        style={[styles.buttonStyle, styles.exitButton]}
        onPress={handleNext}
      >
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>

      {/* Modal de espera */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={waitingModal}
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, styles.smallModal]}>
            <Text style={styles.label}>Espera a que todos los Arimals sean invocados</Text>
            <Image
              style={styles.carouselImage}
              source={images[currentImageIndex]}
              resizeMode="contain"
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#7B2CBF",
    padding: 20,
    width: 400,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 2 },
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  imageStyle: {
    width: 200,
    height: 200,
  },
  label: {
    fontSize: 24,
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  buttonStyle: {
    backgroundColor: "#E0AAFF",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
  },
  exitButton: {
    backgroundColor: "#FF0000",
    marginTop: 10,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    backgroundColor: "#7B2CBF",
    padding: 20,
    borderRadius: 10,
    width: 400,
    alignItems: "center",
  },
  smallModal: {
    width: 400,
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  carouselImage: {
    width: "50%",
    height: 200,
  },
});

export default ShowInstructions;
