import React, { useState } from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ToggleSwitch from '../Components/ToggelSwitch';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../Redux/Store';
import { AppColorsType } from '../Utilities/Colors';
import ImageUploadModal from '../Components/ImageUploadModal';
import { setProfileImage, setTheme } from '../Redux/UserSlice';
import ImagePicker from 'react-native-image-crop-picker';
import { useThemeContext } from '../Auth/ThemeContext';

const SettingsScreen = () => {
  const { requiredColors } = useThemeContext();
  const dispatch = useDispatch();
  const image = useSelector((state: RootState) => state.users.currentUser?.profileImage);
  const isDarkTheme = useSelector((state: RootState) => state.users.currentUser?.theme);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const profileUpload = () => {
    setModalVisible(true);
  };

  const onClose = () => {
    setModalVisible(false);
  };

  const cameraPhoto = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then((picture) => {
      console.log(picture);
      dispatch(setProfileImage({uri:picture.path}));
      setModalVisible(false);
    })
      .catch(error => {
        console.log('Camera error:', error);
        setModalVisible(false);
      });
  };

  const galleryPhoto = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    }).then((photo) => {
      console.log(photo);
      dispatch(setProfileImage({ uri:photo.path }));
      setModalVisible(false);
    })
      .catch(error => {
        console.log('Gallery error:', error);
        setModalVisible(false);
      });
  };

  return (
    <View style={styles(requiredColors).screenContainer}>
      <ImageUploadModal
        visible={modalVisible}
        onClose={onClose}
        openCamera={cameraPhoto}
        openGallery={galleryPhoto}
      />
      <TouchableOpacity onPress={profileUpload}>
        <Image source={image} style={styles(requiredColors).profileImage} />
      </TouchableOpacity>
      <ToggleSwitch
        label="Turn on dark theme"
        value={isDarkTheme || false}
        onValueChange={(val) => dispatch(setTheme(val))}
      />
    </View>
  );
};

const styles = (requiredColors: AppColorsType) => StyleSheet.create({
  screenContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: requiredColors.background,
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
    borderWidth: 2,
  },
});

export default SettingsScreen;
