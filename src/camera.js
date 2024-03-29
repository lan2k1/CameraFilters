import React from 'react';
import { Text, View, Button, ScrollView, TouchableOpacity, CameraRoll, TouchableHighlight, Image, Dimensions, StatusBar } from 'react-native';

import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

import Constants from 'expo-constants';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';

import { Col, Row, Grid } from "react-native-easy-grid";
import { Ionicons } from '@expo/vector-icons';

const flexCenterStyle = { flex: 1, justifyContent: 'center', alignItems: 'center' }

import styles from './styles';


import Glasses from './Glasses'
import Hat from './Hat'
import Flower from './flower'
import Cat from './Cat'
import Dog from './Dog'
import Dog1 from './Dog1'
import Dog2 from './Dog2'
import Cow from './Cow'
import Mouth from './Mouth'


const {width, height} = Dimensions.get('screen');

export default class CameraFilter extends React.Component {
  camera = null;
  view = null;

  constructor(props) {
    super(props)

    this.state = {
      key: 0,
      faces: [],
      image: null,
      cameraRollUri: null,
      type: Camera.Constants.Type.front,
      hasCameraPermission: null,
      hasStoragePermission: null,

    }
    this.onFacesDetected = this.onFacesDetected.bind(this)
    this.onFaceDetectionError = this.onFaceDetectionError.bind(this)
  }



    Gallery = async () => {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [3, 4],


      });

      console.log(result);

      if (!result.cancelled) {
        this.setState({ image: result.uri });
      }
    };


    //Detect khuôn mặt
    onFacesDetected({ faces }) {
        console.log(faces)
        this.setState({ faces })
    };

    onFaceDetectionError(error) {
        console.log(error)
    };



    //Cấp quyền truy cập camera
    async componentDidMount() {
      const camera = await Permissions.askAsync(Permissions.CAMERA);
      const storage = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      this.setState({ hasCameraPermission: camera.status === 'granted'});

    };

    //Chụp hình
    snap = async () => {
    // await StatusBar.setHidden(true);
    let result = await takeSnapshotAsync(this._container, {
      format: 'jpg',
      result: 'tmpfile',
      height,
      width,
      quality: 1,

    });
    console.log(result);

    let saveResult = await CameraRoll.saveToCameraRoll(result, 'photo');
    // await StatusBar.setHidden(false);
    this.setState({ cameraRollUri: result });
  };




  render() {
    const { hasCameraPermission, hasStoragePermission, cameraType, capturing, captures, faces, image } = this.state

    // switch filters
    const filters = () =>{
      switch (this.state.key) {
        case 1:
            return faces.map(face => <Dog key={face.faceID} face={face} />)

        case 2:
            return faces.map(face => <Dog1 key={face.faceID} face={face} />)

		    case 3:
            return faces.map(face => <Dog2 key={face.faceID} face={face} />)

        case 4:
            return faces.map(face => <Cat key={face.faceID} face={face} />)

        case 5:
            return faces.map(face => <Glasses key={face.faceID} face={face} />)

        case 6:
            return faces.map(face => <Flower key={face.faceID} face={face} />)

        case 7:
            return faces.map(face => <Hat key={face.faceID} face={face} />)

        case 8:
            return faces.map(face => <Cow key={face.faceID} face={face} />)

        case 9:
            return faces.map(face => <Mouth key={face.faceID} face={face} />)

          }
    }

    if (hasCameraPermission === null) {
          return <View />;
    } else if (hasCameraPermission === false) {
          return <Text>No access to camera</Text>;
    } else {
      return (

      <React.Fragment>

        <View
              style = {flexCenterStyle}
              collapsable={false}
              ref={ view=> {
                this._container = view;
            }}
            >
            <Camera
                type={this.state.type}
                style={styles.preview}
                // ref={camera => this.camera = camera}
                faceDetectorSettings={{
                mode: FaceDetector.Constants.Mode.fast,
                detectLandmarks: FaceDetector.Constants.Landmarks.all,
                runClassifications: FaceDetector.Constants.Classifications.all
                }}
                onFacesDetected={this.onFacesDetected}
                onFacesDetectionError={this.onFacesDetectionError}
            />
            {filters()}
        </View>


        //Button
        <Grid style={styles.topToolbar} >
        <Row>
        <TouchableOpacity
            onPress={() => this.setState({ key: 0})}>
            <Ionicons
                name={'md-refresh'}
                color="white"
                size={40}
            />
        </TouchableOpacity>

        </Row>
        </Grid>
        
        <Grid style={styles.bottomToolbar} >
        <Row>
            <Col style={styles.alignCenter}>
                <TouchableOpacity
                    onPress={this.Gallery}
                    >
                    <Ionicons
                        name={'md-photos'}
                        color="white"
                        size={30}
                    />
                </TouchableOpacity>
            </Col>

            <Col size={2} style={styles.alignCenter}>
            <TouchableOpacity
                 onPress={this.snap}>
                <View style={[styles.captureBtn, capturing && styles.captureBtnActive]}>
                    {capturing && <View style={styles.captureBtnInternal} />}
                </View>

              </TouchableOpacity>

            </Col>

            <Col style={styles.alignCenter}>
                <TouchableOpacity   onPress={() => {
                    this.setState({
                      type:
                        this.state.type === Camera.Constants.Type.back
                          ? Camera.Constants.Type.front
                          : Camera.Constants.Type.back,
                    });
                  }}>
                    <Ionicons
                        name="md-reverse-camera"
                        color="white"
                        size={30}
                    />
                </TouchableOpacity>
            </Col>
        </Row>

        <Row>
        <ScrollView horizontal={true}>
            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 1})}
                >
                    <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/dog_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 2})}>

                    <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/dog1_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 3})}
                >


                    <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/dog2_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 4})}
                >

                    <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/cat_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 5})}
                >

                   <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/glasses_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 6})}
                >

                   <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/flower_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 7})}
                >

                   <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/hat_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 8})}
                >

                   <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/cow_icon.png')}
                    />
                </TouchableOpacity>
            </Col>

            <Col style={styles.alignCenter, styles.filters}>
                <TouchableOpacity
                onPress={() => this.setState({ key: 9})}
                >

                   <Image
                        style={{width: 50, height: 70, borderColor: '#FFF', borderWidth: 0.5,borderRadius: 5}}
                        source={require('../assets/mouth_icon.png')}
                    />
                </TouchableOpacity>
            </Col>
          </ScrollView>
        </Row>


        </Grid>

        </React.Fragment>
      );
    }
  }
}
