import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PropTypes from 'prop-types';
import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Text } from 'react-native-elements';
import iconTrans from '../../assets/images/icon_trans.png';
import {
  ButtonLabel,
  FilledButtonContainer,
  NavHeaderContainer,
} from '../../components/BaseComponents';
import Window from '../../constants/Layout';
import {
  HowItWorksButton,
  HowItWorksView,
  RewardButtonSubtitle,
  RewardButtonTitle,
} from '../../styled/rewards';
import { ColumnContainer } from '../../styled/shared';
import { DragBar } from '../../styled/store';

export default function GettingStartedScreen({ route, navigation }) {
  const [checked, setChecked] = React.useState(false);
  const { customerId } = route.params;

  async function handleCheckbox() {
    setChecked(!checked);
    const customerObj = {
      id: customerId.id,
      showLandingScreen: checked,
    };
    const jsonValue = JSON.stringify(customerObj);
    await AsyncStorage.setItem('customerId', jsonValue);
  }

  return (
    <View
      style={{
        flex: 1,
      }}>
      <NavHeaderContainer
        vertical
        noShadow
        paddingTop={0}
        alignItems="center"
        justifyContent="space-between"
        height={Window.height * (12 / 100)}>
        <DragBar style={{ backgroundColor: 'black' }} />
        <Image
          source={iconTrans}
          resizeMode="contain"
          style={{
            height: '100%',
            width: '100%',
          }}
        />
      </NavHeaderContainer>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '2%',
          height: Window.height * (75 / 100),
        }}>
        <View>
          <HowItWorksButton onPress={() => navigation.navigate('Stores')}>
            <Image
              source={require('../../assets/images/Carrot_White.png')}
              style={{
                maxWidth: '30%',
                marginRight: 8,
                resizeMode: 'contain',
                height: 100,
              }}
            />
            <ColumnContainer style={{ flex: 1 }}>
              <RewardButtonTitle>Find Stores Near You</RewardButtonTitle>
              <RewardButtonSubtitle>
                Explore the map to discover nearby stores stocking healthy
                fruits and vegetables
              </RewardButtonSubtitle>
            </ColumnContainer>
            <FontAwesome5
              style={{ marginRight: 30 }}
              name="arrow-right"
              solid
              size={25}
              color="white"
            />
          </HowItWorksButton>

          <HowItWorksButton onPress={() => navigation.navigate('Recipes')}>
            <Image
              source={require('../../assets/images/Groceries_White.png')}
              style={{
                maxWidth: '30%',
                marginRight: 8,
                resizeMode: 'contain',
                height: 100,
              }}
            />
            <ColumnContainer style={{ flex: 1 }}>
              <RewardButtonTitle>Know What&apos;s In Stock</RewardButtonTitle>
              <RewardButtonSubtitle>
                See what products are available before you leave the house
              </RewardButtonSubtitle>
            </ColumnContainer>
            <FontAwesome5
              style={{ marginRight: 30 }}
              name="arrow-right"
              solid
              size={25}
              color="white"
            />
          </HowItWorksButton>

          <HowItWorksButton onPress={() => navigation.navigate('Resources')}>
            <Image
              source={require('../../assets/images/Stay_Informed_White.png')}
              style={{
                maxWidth: '30%',
                marginRight: 8,
                resizeMode: 'contain',
                height: 100,
              }}
            />
            <ColumnContainer style={{ flex: 1 }}>
              <RewardButtonTitle>Stay Informed</RewardButtonTitle>
              <RewardButtonSubtitle>
                Connect with resources to access benefits and tools for healthy
                living.
              </RewardButtonSubtitle>
            </ColumnContainer>
            <FontAwesome5
              style={{ marginRight: 30 }}
              name="arrow-right"
              solid
              size={25}
              color="white"
            />
          </HowItWorksButton>
          <HowItWorksView
            style={{ paddingBottom: 0, marginBottom: 12 }}
            onPress={() => navigation.navigate('Stores')}>
            <Text
              style={{
                height: '100%',
                width: '100%',
                paddingRight: '5%',
                paddingLeft: '5%',
                textAlign: 'center',
                color: 'black',
              }}>
              DC Central Kitchen partners with corner stores across D.C. to
              bring affordable, fresh produce close to home.
            </Text>
          </HowItWorksView>
        </View>
        {/* <View style={styles.checkboxContainer}>
          <Checkbox.Android
            status={checked ? 'checked' : 'unchecked'}
            // eslint-disable-next-line
            onPress={handleCheckbox}
            color={Colors.primaryGreen}
          />
          <Text style={styles.label}>Do not show again</Text>
        </View>
      */}

        <FilledButtonContainer
          width="90%"
          onPress={() => {
            navigation.navigate('Stores');
          }}>
          <ButtonLabel color="white">Continue To App</ButtonLabel>
        </FilledButtonContainer>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
  },

  label: {
    margin: 8,
  },
});

GettingStartedScreen.propTypes = {
  route: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};
