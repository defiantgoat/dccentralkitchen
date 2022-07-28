import React, { Fragment } from 'react';
import { Marker } from 'react-native-maps';
import StoreMarker from '../../components/store/StoreMarker';

export const UnfocusedMarkers = ({
  filteredStores,
  region,
  changeCurrentStore,
  mapFilterObj,
}) => {
  const unfocusedStores = filteredStores.filter(
    (store) => currentStore.id !== store.id
  );
  return (
    <Fragment>
      {unfocusedStores.map((store) => (
        <Marker
          key={store.id}
          coordinate={{
            latitude: store.latitude,
            longitude: store.longitude,
          }}
          onPress={() => changeCurrentStore(store)}>
          <StoreMarker
            showName={region.longitudeDelta < 0.07}
            storeName={store.storeName ?? ''}
            focused={currentStore && currentStore.id === store.id}
            wic={mapFilterObj.wic}
            couponProgramPartner={mapFilterObj.couponProgramPartner}
          />
        </Marker>
      ))}
    </Fragment>
  );
};
