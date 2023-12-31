import React, {useState} from 'react';
import {View, Text, Button, Image} from 'react-native';
import {
  Collapse,
  CollapseHeader,
  CollapseBody,
} from 'accordion-collapse-react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import GraphList from './GraphList';
import fontFamily from '../Styles/fontFamily';
import EStyleSheet from 'react-native-extended-stylesheet';
export default BssChild = ({item}) => {
  const [expanded, setExpended] = useState(false);
  const onPress = ({}) => {
    setExpended(!expanded);
  };
  const renderDot = color => {
    return (
      <View
        style={{
          height: hp(3.5),
          width: wp(2.5),
          borderRadius: 1,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };
  return (
    <View style={{marginTop: hp(1)}}>
      <View
        style={{
          justifyContent: 'center',
          backgroundColor: '#FFFFFF',
          borderRadius: hp(2),
          marginHorizontal: hp(2.5),
          elevation: 4,
        }}>
        <Collapse isExpanded={expanded} onToggle={onPress}>
          <CollapseHeader
            style={{
              height: hp(10.7),
              marginHorizontal: hp(1),
            }}>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <View
                  style={{
                    flex: 0.3,
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginLeft: hp(-2),
                    marginVertical: hp(0.3),
                  }}>
                  <Image
                    style={{
                      width: wp(16),
                      height: hp(8),
                      marginTop: hp('1.5'),
                      position: 'absolute',
                      top: hp(0),
                      borderRadius: hp(1),
                    }}
                    source={{uri: item.img}}
                    resizeMode="contain"
                  />
                </View>
                <View style={{flex: 0.7, marginLeft: hp(-2.5)}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <View style={{marginVertical: hp(1.5), marginLeft: hp(-1)}}>
                      <Text style={styles.childname}>{item.name}</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: hp(2),
                      }}>
                      <Text style={styles.number}>{item.id}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp(-2),
                    }}>
                    <View style={{marginVertical: hp(1.5)}}>
                      <Text style={styles.dob}>DOB:</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: hp(2),
                      }}>
                      <Text style={styles.dobdata}>{item.dob}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      marginTop: hp(-2.5),
                    }}>
                    <View style={{marginVertical: hp(1.5)}}>
                      <Text style={styles.dob}>Class Section:</Text>
                    </View>
                    <View
                      style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: hp(2),
                      }}>
                      <Text style={styles.dobdata}>{item.date}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </CollapseHeader>
          <CollapseBody style={{marginHorizontal: hp(2.5)}}>
            <View style={{flexDirection: 'row', marginTop: hp(-3)}}>
              <View
                style={{
                  flex: 0.3,
                  justifyContent: 'center',
                  alignItems: 'center',
                  marginLeft: hp(-2),
                  marginVertical: hp(0.3),
                }}></View>
              <View style={{flex: 0.7, marginLeft: hp(-3)}}>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <View style={{marginVertical: hp(1.5)}}>
                    <Text style={styles.dob}>School</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: hp(1),
                    }}>
                    <Text style={styles.dob}>{item.school}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(-2),
                  }}>
                  <View style={{marginVertical: hp(1.5)}}>
                    <Text style={styles.dob}>Fee Due:</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: hp(0),
                    }}>
                    <Text style={styles.dobdata}>{item.fee}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(-2.5),
                  }}>
                  <View style={{marginVertical: hp(1.5)}}>
                    <Text style={styles.dob}>Due Date:</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: hp(0),
                    }}>
                    <Text style={styles.dobdata}>{item.due}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    marginTop: hp(-2.5),
                  }}>
                  <View style={{marginVertical: hp(1.5)}}>
                    <Text style={styles.dob}>Invoice:</Text>
                  </View>
                  <View
                    style={{
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: hp(0),
                    }}>
                    <Text style={styles.dobdata}>{item.invoice}</Text>
                  </View>
                </View>
              </View>
            </View>
          </CollapseBody>
        </Collapse>
      </View>
    </View>
  );
};

const styles = EStyleSheet.create({
  numbertext: {
    color: '#353535',
    fontSize: '0.7rem',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  basictext: {
    color: '#979797',
    fontSize: '0.5rem',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textTransform: 'uppercase',
  },
  btc: {
    paddingLeft: hp(0.5),
    fontSize: hp(2),
    fontWeight: '700',
    fontFamily: fontFamily.ceraBlack,
  },
  ftbotom: {
    color: '#FFF',
    fontSize: '0.55rem',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
    fontWeight: '700',
  },
  mainHeader: {
    height: hp(8),
    backgroundColor: '#1C37A4',
    borderBottomRightRadius: hp(0),
    borderBottomLeftRadius: hp(0),
  },
  container: {
    flex: 1,
    marginTop: hp(0),
  },

  number: {
    color: '#2D8E00',
    backgroundColor: '#D4FFCC',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraBold,
    fontSize: '0.5rem',
    fontWeight: '700',
    fontStyle: 'normal',
  },
  dob: {
    color: '#363636',
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.5rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  dobdata: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.55rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },
  childname: {
    color: '#353535',
    borderRadius: hp(50),
    paddingHorizontal: hp(0.8),
    fontFamily: fontFamily.ceraMedium,
    fontSize: '0.65rem',
    fontWeight: '300',
    fontStyle: 'normal',
  },

  salaryMainView: {
    height: hp(7),
    marginHorizontal: hp(2.5),
    borderRadius: hp(1),
    backgroundColor: '#E7E7E7',
    marginTop: hp(2),
  },
});
