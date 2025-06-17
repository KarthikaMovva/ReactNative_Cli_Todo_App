import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ToggleSwitch from '../Components/ToggelSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/Store';
import Colors from '../Utilities/Colors';
import ImageUploadModal from '../Components/ImageUploadModal';
import { setProfileImage } from '../Redux/ProfileSlice';
import ImagePicker from "react-native-image-crop-picker";
import { ThemeContext } from '../Auth/ThemeContext';

const SettingsScreen = () => {
  const { isDarkTheme, setisDarkTheme } = ThemeContext();
  const dispatch = useDispatch();
  const image = useSelector((state: RootState) => state.profile.profileImage);
  const [modalVisible, setmodalVisible] = useState<boolean>(false);

  const profileUpload = () => {
    setmodalVisible(true);
  }

  const onClose = () => {
    setmodalVisible(false);
  }

  const cameraPhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      dispatch(setProfileImage({uri:image.path}));
      setmodalVisible(false);
    })
      .catch(error => {
        console.log('Camera error:', error);
        setmodalVisible(false);
      });
  }

  const galleryPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((image) => {
      console.log(image);
      dispatch(setProfileImage({ uri:image.path }));
      setmodalVisible(false);
    })
      .catch(error => {
        console.log('Gallery error:', error);
        setmodalVisible(false);
      });
  }

  return (
    <View style={styles(isDarkTheme).screenContainer}>
      <ImageUploadModal
        visible={modalVisible}
        onClose={onClose}
        openCamera={cameraPhoto}
        openGallery={galleryPhoto}
      />
      <TouchableOpacity onPress={profileUpload}>
        <Image source={image} style={styles(isDarkTheme).profileImage} />
      </TouchableOpacity>
      <ToggleSwitch
        label='Turn on dark theme'
        value={isDarkTheme}
        onValueChange={(val) => setisDarkTheme(val)}
      />
    </View>
  );
};

const styles = (isDarkTheme: boolean) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDarkTheme ? Colors.darkTheme.darkBackground : Colors.background
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
  }
});

export default SettingsScreen;
