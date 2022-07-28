import React from 'react';
import { Marker } from 'react-native-maps';
import StoreMarker from '../../components/store/StoreMarker';

export const FocusedMarker = ({
  currentStore,
  region,
  changeCurrentStore,
  mapFilterObj,
}) => {
  return (
    <Marker
      key={currentStore.id}
      coordinate={{
        latitude: currentStore.latitude,
        longitude: currentStore.longitude,
      }}
      onPress={() => changeCurrentStore(currentStore)}>
      <StoreMarker
        showName={region.longitudeDelta < 0.07}
        storeName={currentStore.storeName ?? ''}
        focused={currentStore && currentStore.id === currentStore.id}
        wic={mapFilterObj.wic}
        couponProgramPartner={mapFilterObj.couponProgramPartner}
      />
    </Marker>
  );
};
