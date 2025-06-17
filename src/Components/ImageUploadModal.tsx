import { Modal, StyleSheet, View, TouchableOpacity, Text } from "react-native";
import Colors from "../Utilities/Colors";
import Title from "./Title";
import { ImageUploadProps } from "../Types/Props";
import { ThemeContext } from "../Auth/ThemeContext";

const ImageUploadModal:React.FC<ImageUploadProps> = ({visible, openCamera, openGallery, onClose}) => {

    const { isDarkTheme } = ThemeContext();

    return(
       <Modal visible={visible} animationType="slide" transparent={true}>
           <View style={styles(isDarkTheme).container}>
             <Title heading="Choose a option to upload profile photo" style={styles(isDarkTheme).choose}/>
             <TouchableOpacity style={styles(isDarkTheme).options} onPress={openCamera}>
                <Text style={styles(isDarkTheme).fontColor}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles(isDarkTheme).options} onPress={openGallery}>
                <Text style={styles(isDarkTheme).fontColor}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles(isDarkTheme).cancel} onPress={onClose}>
                <Text style={styles(isDarkTheme).fontColor}>Cancel</Text>
            </TouchableOpacity>
           </View>
       </Modal>
    )

}

const styles = (isDarkTheme:boolean) => StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: isDarkTheme? Colors.darkTheme.cardsBackground : Colors.background,
  },
options: {
    backgroundColor: Colors.primaryButton,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16
  },
cancel:{
    backgroundColor: Colors.dangerButton,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16  
},
fontColor:{
    color : Colors.background,
    fontWeight : "bold",
    fontSize : 15
},
choose:{
    fontSize : 20
}
})

export default ImageUploadModal

