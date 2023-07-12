import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import {useState} from 'react';

import ImageViewer from "./src/component/ImageViewer";
import Button from "./src/component/Button";
import CircleButton from "./src/component/CircleButton";
import IconButton from "./src/component/IconButton";
import EmojiPicker from "./src/component/EmojiPicker";
import EmojiList from "./src/component/EmojiList";
import EmojiSticker from "./src/component/EmojiSticker";

const placeHolderImage = require("./assets/expo.png");
export default function App() {
const [showAppOptions, setShowAppOptions] = useState(false);
const [selectedImage, setSelectedImage] = useState(null);
const [isModalVisible, setIsModalVisible] = useState(false);
 const [pickedEmoji, setPickedEmoji] = useState(null);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing:true,
      quality:1
    });
     if (!result.canceled) {
       setSelectedImage(result.assets[0].uri);
       setShowAppOptions(true);
     } else {
       alert("You did not select any image.");
     }
  }

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onSaveImageAsync = () => {

  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };


  return (
    <View style={styles.container}>
      <ImageViewer
        placeHolderImage={placeHolderImage}
        selectedImage={selectedImage}
      />
      {pickedEmoji !== null ? (
        <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
      ) : null}
      <StatusBar style="auto" />
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton icon="Refresh" label={"Reset"} onPress={onReset} />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon="save-alt"
              label="Save"
              onPress={onSaveImageAsync}
            />
          </View>
          <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
            <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
          </EmojiPicker>
        </View>
      ) : (
        <View style={styles.footerContainer}>
          <Button
            theme="primary"
            label="Choose any other Picture"
            onPress={pickImageAsync}
          ></Button>
          <Button
            label="Use this Picture"
            onPress={() => setShowAppOptions(true)}
          ></Button>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    color: "#fff",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: "center",
  },
  optionsContainer: {
    position: "absolute",
    bottom: 80,
  },
  optionsRow: {
    alignItems: "center",
    flexDirection: "row",
  },
});
