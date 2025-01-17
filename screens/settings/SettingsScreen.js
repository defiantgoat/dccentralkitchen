import { FontAwesome5 } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Constants from 'expo-constants';
import * as Analytics from 'expo-firebase-analytics';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Image,
  Platform,
  ScrollView,
  View,
} from 'react-native';
import AlertAsync from 'react-native-alert-async';
import {
  Body,
  ButtonContainer,
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import CategoryBar from '../../components/resources/CategoryBar';
import SettingsCard from '../../components/settings/SettingsCard';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { getCustomerById } from '../../lib/airtable/request';
import { completeLogout, getAsyncCustomerAuth } from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';

export default function SettingsScreen(props) {
  const [customer, setCustomer] = useState(null);
  const isGuest = !customer || customer.id === RecordIds.guestCustomerId;
  const [logoutIsLoading, setLogoutIsLoading] = useState(false);

  const logout = async (signUp = false) => {
    let confirm = false;
    if (!signUp) {
      confirm = await AlertAsync(
        `Are you sure you want to ${isGuest ? 'exit Guest Mode' : 'log out'}?`,
        '',
        [
          {
            text: isGuest ? 'Exit' : 'Log Out',
            onPress: () => true,
          },
          {
            text: 'Cancel',
            onPress: () => false,
            style: 'cancel',
          },
        ],
        { cancelable: false }
      );
    } else {
      confirm = true;
    }
    if (confirm) {
      // Show the loading indicator
      setLogoutIsLoading(true);
      await Analytics.logEvent('logout', {
        is_guest: isGuest,
        redirect_to: signUp ? 'Sign Up' : 'Welcome',
      });
      completeLogout(props.navigation, signUp);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await getAsyncCustomerAuth();
          const guest = customerId.id === RecordIds.guestCustomerId;
          if (isActive && customerId != null && !guest) {
            const customerRecord = await getCustomerById(customerId.id);
            setCustomer(customerRecord);
          }
        } catch (err) {
          // console.error('[SettingsScreen] Airtable:', err);
          logErrorToSentry({
            screen: 'SettingsScreen',
            action: 'useFocusEffect',
            error: err,
          });
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  return (
    (customer || isGuest) && (
      <View style={{ flex: 1 }}>
        <NavHeaderContainer>
          <NavButtonContainer onPress={() => props.navigation.toggleDrawer()}>
            <FontAwesome5 name="bars" solid size={24} />
          </NavButtonContainer>
          <NavTitle>Settings</NavTitle>
        </NavHeaderContainer>
        <ScrollView>
          <CategoryBar title="Account" />
          {isGuest && (
            <SettingsCard
              title="Log in or create an account"
              rightIcon="sign-out-alt"
              description="Start saving with Healthy Rewards"
              navigation={() => logout(true)}
            />
          )}
          {!isGuest && (
            <SettingsCard
              title={customer.name}
              description="Update name"
              rightIcon="angle-right"
              navigation={() =>
                props.navigation.navigate('Name', {
                  name: customer.name,
                })
              }
            />
          )}
          {!isGuest && (
            <SettingsCard
              title={customer.phoneNumber}
              description="Update phone number"
              rightIcon="angle-right"
              navigation={() =>
                props.navigation.navigate('Number', {
                  number: customer.phoneNumber,
                })
              }
            />
          )}
          <CategoryBar title="Privacy" />
          <SettingsCard
            title="Location Settings"
            description="Manage your location sharing preferences"
            navigation={
              Platform.OS === 'ios'
                ? () => Linking.openURL('app-settings:')
                : () => Linking.openSettings()
            }
          />
          <SettingsCard
            title="Privacy Policy"
            navigation={() =>
              WebBrowser.openBrowserAsync(
                'https://healthycorners-rewards.netlify.app/shared/privacypolicy.html'
              )
            }
          />
          <CategoryBar title="Notifications" />
          <SettingsCard
            title="Notifications"
            rightIcon={isGuest ? 'sign-out-alt' : 'angle-right'}
            description={
              isGuest
                ? 'Create an account to receive notifications and delivery alerts'
                : 'Control what messages you receive'
            }
            navigation={
              isGuest
                ? () => logout(true)
                : () => props.navigation.navigate('Notifications')
            }
          />
          <CategoryBar title="Help & Support" />
          <SettingsCard
            title="Frequently Asked Questions"
            navigation={() =>
              WebBrowser.openBrowserAsync(
                'https://healthycorners.calblueprint.org/faq.html'
              )
            }
          />
          <SettingsCard
            title="Report issue or submit feedback"
            navigation={() =>
              WebBrowser.openBrowserAsync('http://tiny.cc/RewardsFeedback')
            }
          />
          <CategoryBar title="About" />
          <View style={{ padding: 24 }}>
            <Image
              source={require('../../assets/images/blue-raster-banner.png')}
              style={{
                maxWidth: '50%',
                resizeMode: 'contain',
                height: 90,
                marginBottom: 4,
              }}
            />
            <Body>
              Blue Raster is proud to support DC Central Kitchen through
              technical app support. Blue Raster assists non-profits,
              transforming conceptual ideas into thoughtful, elegant apps and
              websites, unlocking location intelligence to solve the world’s
              greatest challenges.
            </Body>
            <ButtonContainer
              style={{ marginTop: 8 }}
              onPress={() =>
                WebBrowser.openBrowserAsync('https://blueraster.com')
              }>
              <Body>Click here to learn more at Blue Raster</Body>
            </ButtonContainer>
          </View>
          <CategoryBar title="Exit" />
          <SettingsCard
            title={isGuest ? 'Exit Guest Mode' : 'Log Out'}
            titleColor={Colors.error}
            navigation={() => logout()}
          />
          <Body
            color={Colors.secondaryText}
            style={{
              marginLeft: 24,
              marginTop: 8,
              marginBottom: 200,
            }}>
            {`Version ${Constants.manifest.version}`}
          </Body>
        </ScrollView>
        {logoutIsLoading && (
          <View
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(0,0,0,.4)',
            }}>
            <ActivityIndicator size="large" color={Colors.lightText} />
          </View>
        )}
      </View>
    )
  );
}

SettingsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
