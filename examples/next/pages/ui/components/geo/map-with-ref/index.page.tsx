import { Button, MapView } from '@aws-amplify/ui-react';
import { Amplify } from 'aws-amplify';
import { useCallback, useRef, useState } from 'react';
import type { MapRef } from 'react-map-gl';

import '@aws-amplify/ui-react/styles.css';

import awsExports from './aws-exports';

Amplify.configure(awsExports);

export default function MapWithRef() {
  const mapRef = useRef<MapRef>();

  const [buttonDisabled, setButtonDisabled] = useState(true);

  const flyToSF = useCallback(() => {
    mapRef.current.flyTo({ center: [-122.43, 37.77], zoom: 13 });
  }, []);

  return (
    <>
      <Button disabled={buttonDisabled} onClick={flyToSF}>
        Fly, you fools!
      </Button>
      <MapView onLoad={() => setButtonDisabled(false)} ref={mapRef} />
    </>
  );
}
