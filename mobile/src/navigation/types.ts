export type RootStackParamList = {
  Home: undefined;
  LocationDetection: undefined;
  DestinationInput: {
    currentLocationNodeId?: string;
  } | undefined;
  Navigation: {
    routeId: string;
  };
  Arrival: {
    destinationLabel: string;
  };
  HapticKey: undefined;
};

