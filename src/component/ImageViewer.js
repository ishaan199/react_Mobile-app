import { Image, StyleSheet } from "react-native";

export default function ImageViewer({ placeHolderImage, selectedImage }) {
     const imageSource = selectedImage !== null
    ? { uri: selectedImage }: placeHolderImage;

  return <Image source={imageSource} style={styles.image}></Image>;
}

const styles = StyleSheet.create({
  image: {
    width: 340,
    height: 340,
    borderRadius: 15,
  },
});
