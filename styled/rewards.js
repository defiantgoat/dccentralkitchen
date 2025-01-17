import { PixelRatio, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import Colors from '../constants/Colors';

export const RewardsCardContainer = styled.View`
  box-shadow: 0px 1px 3px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
  padding: 10px;
  margin: 6px 12px 6px 4px;

  flex-direction: row;
  background-color: ${Colors.lightestGreen};
`;

export const HowItWorksButton = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${PixelRatio.getFontScale() < 1.2 ? '12px' : '12px'};
  width: 100%;
  border-radius: 30px;
  padding-top: 15px;
  padding-bottom: 15px;
  min-height: 160px;
  background: ${(props) => props.color || Colors.primaryGreen};
`;

export const HowItWorksView = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: ${PixelRatio.getFontScale() < 1.2 ? '12px' : '32px'};
  width: 100%;
`;

export const RewardButtonTitle = styled.Text`
  font-family: opensans-semibold;
  font-size: ${PixelRatio.getFontScale() < 1.2 ? '18px' : '14px'};
  color: ${(props) => props.color || Colors.activeText};
  display: flex;
  text-align: ${(props) => props.textAlign || 'left'};
  color: white;
`;

export const RewardButtonSubtitle = styled.Text`
  font-family: opensans-regular;
  display: flex;
  font-size: ${PixelRatio.getFontScale() < 1.2 ? '16px' : '12px'};
  color: ${(props) => props.color || Colors.activeText};
  text-align: ${(props) => props.textAlign || 'left'};
  color: white;
`;

export const RewardDescriptionContainer = styled.View`
  flex-direction: column;
  margin-left: 8px;
`;

export const RewardsProgressContainer = styled.View`
  margin: 8px 0;
  flex-direction: column;
`;

export const styles = StyleSheet.create({
  tabView: {
    flex: 1,
  },
  tabBar: {
    backgroundColor: Colors.primaryGreen,
    elevation: 7,
    borderBottomWidth: 0,
    height: 50,
    shadowColor: Colors.bgDark,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    justifyContent: 'flex-end',
  },
  tabBarLabel: {
    color: Colors.lightText,
    textTransform: 'capitalize',
    fontSize: 16,
    fontFamily: 'opensans-semibold',
    paddingLeft: 6,
    paddingRight: 6,
  },
  tabBarIndicator: {
    backgroundColor: Colors.lightText,
    height: 2,
    borderRadius: 10,
  },
});
