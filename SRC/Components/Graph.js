import {View, Text} from 'react-native';
import React from 'react';
import {PieChart} from 'react-native-gifted-charts';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import EStyleSheet from 'react-native-extended-stylesheet';
import fontFamily from '../Styles/fontFamily';
const Graph = () => {
  const pieData = [
    {value: 25, color: '#FFB243', gradientCenterColor: '#FFB243'},
    {value: 25, color: '#D4E9FF', gradientCenterColor: '#8F80F3'},
    {value: 25, color: '#76FFBD', gradientCenterColor: '#FF7F97'},
    {
      value: 25,
      color: '#C1B7FD',
      gradientCenterColor: '#C1B7FD',
      focused: true,
    },
  ];

  const renderDot = color => {
    return (
      <View
        style={{
          height: hp(5),
          width: wp(3.5),
          borderRadius: 1,
          backgroundColor: color,
          marginRight: 10,
        }}
      />
    );
  };

  return (
    <View
      style={{
        width: wp(80),
        marginHorizontal: hp(5),
      }}>
      <View style={{justifyContent: 'center'}}>
        <View style={{padding: 20, alignItems: 'center'}}>
          <PieChart
            data={pieData}
            donut
            showGradient
            sectionAutoFocus
            radius={90}
            innerRadius={60}
            innerCircleColor={'#fff'}
            centerLabelComponent={() => {
              return (
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                  <Text
                    style={styles.tousandlakh}>
                    100,000
                  </Text>
                  <Text style={styles.gross}>
                    gross salary
                  </Text>
                </View>
              );
            }}
          />
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: hp(-3),
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginVertical: hp(0.5)}}>{renderDot('#C1B7FD')}</View>
          <View>
            <View>
              <Text style={styles.numbertext}>25,000</Text>
            </View>
            <View>
              <Text style={styles.basictext}>Basic Salary</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{marginVertical: hp(0.5)}}>{renderDot('#D4E9FF')}</View>
          <View>
            <View>
              <Text style={styles.numbertext}>25,000</Text>
            </View>
            <View>
              <Text style={styles.basictext}>House Rent</Text>
            </View>
          </View>
        </View>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        <View style={{flexDirection: 'row'}}>
          <View style={{marginVertical: hp(0.5)}}>{renderDot('#FEBB5B')}</View>
          <View>
            <View>
              <Text style={styles.numbertext}>25,000</Text>
            </View>
            <View>
              <Text style={styles.basictext}>Allowances</Text>
            </View>
          </View>
        </View>

        <View style={{flexDirection: 'row'}}>
          <View style={{marginVertical: hp(0.5)}}>{renderDot('#76FFBD')}</View>
          <View>
            <View>
              <Text style={styles.numbertext}>25,000</Text>
            </View>
            <View>
              <Text style={styles.basictext}>Utilities       </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Graph;

const styles = EStyleSheet.create({
  smalltext: {
    fontWeight: '500',
    fontSize: '0.9rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#363636',
    fontStyle: 'normal',
  },
  smalltext1: {
    fontWeight: '500',
    fontSize: '0.5rem',
    fontFamily: fontFamily.ceraMedium,
    color: '#353535',
    fontStyle: 'normal',
    alignItems: 'center',
  },
  iconSty:{
    fontSize:hp(2.5),
    color:"#A6ACAF",
    fontWeight:100
  },
  headertext:{
    fontSize: '0.75rem',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    color: '#363636',
    fontWeight: '500',
    
  },
  tousandlakh:{
    fontSize: '1.1rem',
    color: '#646464',
    fontWeight: '700',
    fontFamily: fontFamily.ceraBold,
    fontStyle: 'normal',
  },
  gross:{
    fontSize: '0.45rem',
    color: '#979797',
    fontWeight: '500',
    fontFamily: fontFamily.ceraMedium,
    fontStyle: 'normal',
    textTransform:'uppercase'
  },
  numbertext:{
  color: '#353535',
  fontSize: '0.7rem',
  fontWeight: '700',
  fontFamily: fontFamily.ceraBold,
  fontStyle: 'normal',
  textTransform:'uppercase'
},
basictext:{color: '#979797',
  fontSize: '0.5rem',
  fontWeight: '500',
  fontFamily: fontFamily.ceraMedium,
  fontStyle: 'normal',
  textTransform:'uppercase'

}
});