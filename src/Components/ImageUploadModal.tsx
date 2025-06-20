import { Modal, StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { AppColorsType } from '../Utilities/Colors';
import Title from './Title';
import { ImageUploadProps } from '../Types/Props';
import { useThemeContext } from '../Auth/ThemeContext';

const ImageUploadModal:React.FC<ImageUploadProps> = ({visible, openCamera, openGallery, onClose}) => {

    const { requiredColors } = useThemeContext();

    return(
       <Modal visible={visible} animationType="slide" transparent={true}>
           <View style={styles(requiredColors).container}>
             <Title heading="Choose a option to upload profile photo" style={styles(requiredColors).choose}/>
             <TouchableOpacity style={styles(requiredColors).options} onPress={openCamera}>
                <Text style={styles(requiredColors).fontColor}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles(requiredColors).options} onPress={openGallery}>
                <Text style={styles(requiredColors).fontColor}>Choose from Gallery</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles(requiredColors).cancel} onPress={onClose}>
                <Text style={styles(requiredColors).fontColor}>Cancel</Text>
            </TouchableOpacity>
           </View>
       </Modal>
    );

};

const styles = (requiredColors:AppColorsType) => StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: requiredColors.background,
  },
options: {
    backgroundColor: requiredColors.brightBlue,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
  },
cancel:{
    backgroundColor: requiredColors.dangerButton,
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    marginVertical: 10,
    fontSize: 16,
},
fontColor:{
    color : requiredColors.darkText,
    fontWeight : 'bold',
    fontSize : 15,
},
choose:{
    fontSize : 20,
},
});

export default ImageUploadModal;

