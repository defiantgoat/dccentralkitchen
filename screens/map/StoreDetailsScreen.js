import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  Body,
  NavButton,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import StoreHours from '../../components/store/StoreHours';
import Colors from '../../constants/Colors';
import { formatPhoneNumber } from '../../lib/authUtils';
import { InLineContainer } from '../../styled/shared';

export default class StoreDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store, storeOpenStatus } = this.props.route.params;
    return (
      <View>
        <NavHeaderContainer withMargin>
          <NavButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButton>
          <NavTitle>{store.storeName}</NavTitle>
        </NavHeaderContainer>
        <ScrollView style={{ marginLeft: 16, marginTop: 30 }}>
          {/* Directions */}
          <TouchableOpacity style={{ paddingBottom: 32 }}>
            <InLineContainer style={{ alignItems: 'center' }}>
              <FontAwesome5
                name="directions"
                size={24}
                color={Colors.activeText}
              />
              <Body style={{ marginLeft: 12 }}>{store.address}</Body>
            </InLineContainer>
          </TouchableOpacity>
          {/* Phone Number */}
          <InLineContainer style={{ alignItems: 'center', paddingBottom: 32 }}>
            <FontAwesome5
              name="phone"
              solid
              size={24}
              color={Colors.activeText}
            />
            <Body style={{ marginLeft: 12 }}>
              {store.phoneNumber
                ? formatPhoneNumber(store.phoneNumber)
                : 'Phone number unavailable'}
            </Body>
          </InLineContainer>
          {/* Store Hours */}
          <InLineContainer style={{ paddingBottom: 32 }}>
            <FontAwesome5
              name="clock"
              solid
              size={24}
              color={Colors.activeText}
              style={{ marginRight: 12 }}
            />
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Body
                color={
                  storeOpenStatus.includes('Open')
                    ? Colors.primaryGreen
                    : Colors.activeText
                }
                style={{ marginBottom: 4 }}>
                {storeOpenStatus}
              </Body>
              <StoreHours hours={store.storeHours} />
            </View>
          </InLineContainer>
          {/* Accepted Programs */}
          <InLineContainer style={{ alignItems: 'center', paddingBottom: 32 }}>
            <FontAwesome5
              name="star"
              solid
              size={24}
              color={Colors.activeText}
            />
            <Body style={{ marginLeft: 12 }}>Accepted Programs</Body>
          </InLineContainer>
        </ScrollView>
      </View>
    );
  }
}

StoreDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};