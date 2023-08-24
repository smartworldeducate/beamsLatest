import {
  View,
  Text,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Linking,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState, useRef} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Icon from 'react-native-fontawesome-pro';
import {handleScaneer} from '../features/scan/scanSlice';
import {filterCats} from '../features/category/singleCatSlice';
import Modal from 'react-native-modal';
import {Toast} from 'galio-framework';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Check from 'react-native-vector-icons/AntDesign';
import Tin from 'react-native-vector-icons/MaterialCommunityIcons';
import {BottomSheet} from '@rneui/themed';
import {useDispatch} from 'react-redux';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontSize from '../Styles/fontSize';
const ScannerDetail = props => {
  const dispatch = useDispatch();
  const [sData, setSdata] = useState([]);
  const [animodal, setAnimodal] = useState(false);
  const [animation, setAnimation] = useState(true);
  const [isShow, setShow] = useState(false);
  const [visibleBtn, setVisibleBtn] = useState(false);
  const data = props.route.params;
  console.log(data.user_id);
  const [visible, setVisible] = useState(false);
  const [state, setState] = useState({
    scan: false,
    ScanResult: false,
    result: '',
  });

  const getcatHandle = async user_id => {
    setAnimodal(true);
    const data = await dispatch(filterCats({user_id: user_id}));
    // console.log("single data", data.payload)
    if (data !== '') {
      await setSdata(data.payload);
      // console.log("tagdata here", data.payload)
      setAnimodal(false);
    }
  };

  useEffect(() => {
    getcatHandle(data.user_id);
  }, []);

  const {scan, ScanResult, result} = state;

  var ncode = result?.data;

  var [barcode, setBarcode] = useState({
    item: [],
  });

  const addCode = data => {
    const newCode = barcode.item.concat(data);
    setBarcode({item: newCode});
  };
  // console.log(barcode.item);

  const scanner = useRef(null);

  const scanData = result;

  const onSuccess = async e => {
    console.log(data.user_id, ' ==  ', e);

    data.user_id == e.data ? alert(' success') : setShow(true);
    setInterval(() => {
      setShow(false);
    }, 4000);
    const check = e.data.substring(0, 4);
    setState({
      result: e,
      scan: false,
      ScanResult: true,
    });
    if (check === 'http') {
      Linking.openURL(e.data).catch(err =>
        console.error('An error occured', err),
      );
    } else {
      await dispatch(
        handleScaneer({
          tag_id: e.data,
          user_id: data.user_id,
          setup_id: data.setup_id,
        }),
      );

      setState({
        result: e,
        scan: false,
        ScanResult: true,
      });
      setVisible(false);
      console.log('scan data', e.data);
      const catData = await dispatch(filterCats({user_id: data.user_id}));
      await setSdata(catData.payload);
    }
  };

  const activeQR = e => {
    setState({
      scan: true,
    });
  };

  const handleQrcode = () => {
    // setShow(true)
    setVisible(true);
    activeQR('active qr');
  };

  const handleReset = () => {
    // setShow(true)
    setState({scan: false});
    setVisible(false);
  };

  return (
    <View style={{flex: 1}}>
      <Toast
        isShow={isShow}
        positionIndicator="top"
        style={{
          backgroundColor: '#F1948A',
          width: wp(90),
          marginHorizontal: hp(2.5),
          borderRadius: 5,
        }}>
        <Text style={{color: '#fff'}}>please enter valid Qrcode</Text>
      </Toast>

      {animation && (
        <View>
          <Modal isVisible={animodal}>
            <View
              style={{
                width: wp(30),
                height: hp(15),
                backgroundColor: '#EAFAF1',
                borderRadius: hp(2),
                justifyContent: 'center',
                alignItems: 'center',
                marginHorizontal: hp(15),
              }}>
              <View style={{}}>
                <ActivityIndicator animating={animation} size={'large'} />
              </View>
            </View>
          </Modal>
        </View>
      )}

      <BottomSheet
        isVisible={visible}
        style={{
          width: wp(100),
          height: hp(100),
          backgroundColor: '#fff',
          flex: 1,
        }}>
        <View
          style={{
            width: wp(100),
            position: 'relative',
            zIndex: 1,
            marginBottom: hp(20),
          }}>
          <TouchableOpacity
            onPress={handleReset}
            style={{
              width: wp(10),
              height: hp(5),
              // borderRadius: hp(50),
              justifyContent: 'center',
              alignItems: 'center',
              position: 'absolute',
              top: 20,
              left: hp(45),
            }}>
            <Text style={{color: 'gray', fontSize: hp(2)}}>X</Text>
          </TouchableOpacity>
        </View>

        {scan && (
          <QRCodeScanner
            cameraStyl={{height: hp(120)}}
            reactivate={true}
            showMarker={true}
            ref={scanner}
            onRead={onSuccess}
            bottomContent={
              <View
                style={{
                  paddingTop: hp(8),
                  flexDirection: 'row',
                  marginTop: hp(8),
                }}></View>
            }
          />
        )}
      </BottomSheet>
      <View style={{flex: 1}}>
        {sData?.map((e, i) => {
          const {setup_id, scan_time} = e;
          console.log('map fdata', e);
          return (
            <View>
              <View style={{flex: hp(1)}} key={i}>
                <ImageBackground
                  style={{height: hp(30)}}
                  source={{uri: e.tag_banner}}
                  resizeMode="cover">
                  <TouchableOpacity onPress={() => props.navigation.goBack()}>
                    <View
                      style={{
                        marginTop: hp(8),
                        marginLeft: hp(2),
                      }}>
                      <Icon
                        type="light"
                        name="arrow-left"
                        size={hp(3)}
                        color="#fff"
                      />
                    </View>
                  </TouchableOpacity>
                </ImageBackground>
                <View style={{height: hp(5), marginHorizontal: hp(3.5)}}>
                  <Text style={styles.desc}>{e.tag_desc}</Text>
                </View>
                <View
                  style={{
                    height: hp(5),
                    marginHorizontal: hp(3.5),
                    // marginTop: hp(5),
                  }}>
                  <Text style={styles.desc}>About</Text>
                </View>
                <View
                  style={{
                    height: hp(10),
                    marginHorizontal: hp(3.5),
                    marginTop: hp(2),
                  }}>
                  <Text style={styles.longdesc}>{e.tag_text}</Text>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: hp(5),
                    height: hp(10),
                  }}>
                  {e.scan_time == null && (
                    <View
                      style={{
                        flexDirection: 'row',
                        width: wp(45),
                        marginHorizontal: hp(3.5),
                      }}>
                      <View
                        style={{
                          width: wp(14),
                          height: hp(7),
                          borderRadius: hp(2),
                          backgroundColor:
                            setup_id == 1 ? '#D6EAF8' : '#5DADE2',
                        }}>
                        <Tin
                          style={{
                            marginVertical: hp(1.5),
                            marginHorizontal: hp(1.7),
                          }}
                          name="clock-time-nine"
                          size={30}
                          color={setup_id == 1 ? '#5DADE2' : '#D6EAF8'}
                        />
                      </View>
                      <View
                        style={{
                          height: hp(10),
                          marginLeft: hp(1.5),
                          marginTop: hp(0.5),
                        }}>
                        <View>
                          <Text style={styles.times}>00:00</Text>
                        </View>
                        <View style={{marginTop: hp(0.5)}}>
                          <Text style={styles.texttime}> Time</Text>
                        </View>
                      </View>
                    </View>
                  )}
                  {e.scan_time !== null && (
                    <View
                      style={{
                        flexDirection: 'row',
                        // width: wp(45),
                        marginHorizontal: hp(3.5),
                      }}>
                      <View
                        style={{
                          width: wp(14),
                          height: hp(7),
                          borderRadius: hp(2),
                          backgroundColor:
                            setup_id == 1 ? '#D6EAF8' : '#5DADE2',
                        }}>
                        <Tin
                          style={{
                            marginVertical: hp(1.5),
                            marginHorizontal: hp(1.7),
                          }}
                          name="clock-time-nine"
                          size={30}
                          color={setup_id == 1 ? '#5DADE2' : '#D6EAF8'}
                        />
                      </View>
                      <View style={{marginLeft: hp(1.5), marginTop: hp(0.5)}}>
                        <View>
                          <Text style={styles.times}>{e.scan_time}</Text>
                        </View>
                        <View style={{marginTop: hp(0.5)}}>
                          <Text style={styles.texttime}>
                            {setup_id == 1 ? 'IN' : 'OUT'} Time
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                </View>
              </View>
              <View style={{flex: hp(0.3)}}>
                <TouchableOpacity
                  onPress={handleQrcode}
                  disabled={
                    scan_time == null ? false : setup_id == 2 ? true : false
                  }
                  style={{
                    backgroundColor: '#4D69DC',
                    height: hp(8),
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: 0,
                    top: hp(98.4),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>SCAN NOW</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default ScannerDetail;

const styles = EStyleSheet.create({
  mainHeader: {
    height: hp(26.5),
    borderBottomRightRadius: hp(2.5),
    borderBottomLeftRadius: hp(2.5),
  },
  headerChild: {
    marginTop: hp(4),
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: hp(2),
  },
  textstyle: {
    color: '#fff',
    fontSize: hp(2),
    marginTop: hp(0.5),
  },

  userName: {
    color: '#fff',
    fontSize: '0.75rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },

  catname: {
    color: '#fff',
    fontSize: '0.6rem',
    fontWeight: '500',
    marginTop: hp(0.5),
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    paddingBottom: hp(0.2),
  },
  desc: {
    color: '#1D1E29',
    fontSize: '0.9rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    marginTop: hp(1.5),
  },
  times: {
    color: '#5669FF',
    fontSize: '0.7rem',
    fontWeight: '300',
    fontFamily: fontFamily.ceraLight,
    fontStyle: 'normal',
  },
  texttime: {
    color: '#807A7A',
    fontSize: '0.6rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
  },
  longdesc: {
    fontWeight: '100',
    fontSize: '0.65rem',
    fontFamily: fontFamily.ceraLight,
    color: '#979797',
    fontStyle: 'normal',
    alignItems: 'center',
    lineHeight: hp(1.8),

    latterSpacing: hp(1),
    textAlign: 'justify',
  },
});
