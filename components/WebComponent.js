import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useRef, useState } from 'react';
import { View } from 'react-native';
import { WebView } from 'react-native-webview';
import {
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from './BaseComponents';

export default function WebComponent({ navigation }) {
  const webViewRef = useRef();
  const uri = 'https://healthycorners.calblueprint.org/faq.html';
  const [currrentUrl, setCurrentUrl] = useState(uri);

  const goBack = () => webViewRef.current.goBack();

  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer>
        {currrentUrl.includes(uri) ? (
          <NavButtonContainer onPress={() => navigation.toggleDrawer()}>
            <FontAwesome5 name="bars" solid size={24} />
          </NavButtonContainer>
        ) : (
          <NavButtonContainer onPress={goBack}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButtonContainer>
        )}
        <NavTitle>FAQ</NavTitle>
      </NavHeaderContainer>
      <WebView
        onNavigationStateChange={({ url }) => setCurrentUrl(url)}
        ref={webViewRef}
        allowsBackForwardNavigationGestures
        source={{ uri }}
      />
    </View>
  );
}
WebComponent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
