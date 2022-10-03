import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { useState } from 'react';

export const usePhotos = () => {

    const [tempUri, setTempUri] = useState<string>()

    const takePhoto = () => {
        launchCamera({
            mediaType: 'photo',
            quality: 0.5
        }, (resp) => {
            if (resp.didCancel) return;
            if (resp.assets?.length === 0) return;

            setTempUri(resp.assets![0].uri);
            console.log(resp.assets![0].uri);
            // uploadImage(resp, _id);
        });
    }

    const takePhotoFromGallery = () => {
        launchImageLibrary({
            mediaType: 'photo',
            quality: 0.5
        }, (resp) => {
            if (resp.didCancel) return;
            if (resp.assets?.length === 0) return;

            setTempUri(resp.assets![0].uri);
            console.log(resp.assets![0].uri);
            // uploadImage(resp, _id);
        });
    }

    return {
        tempUri,
        takePhoto,
        takePhotoFromGallery
    }
}
