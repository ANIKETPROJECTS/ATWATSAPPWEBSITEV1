import type { ReactNode } from 'react';
import { IPhoneMockup } from 'react-device-mockup';

export function DevicePreviewFrame({
  screenWidth = 300,
  hideStatusBar = false,
  frameColor = '#151922',
  children,
}: {
  screenWidth?: number;
  hideStatusBar?: boolean;
  frameColor?: string;
  children: ReactNode;
}) {
  return (
    <IPhoneMockup
      screenWidth={screenWidth}
      screenType="island"
      hideStatusBar={hideStatusBar}
      frameColor={frameColor}
      statusbarColor="#f3efe8"
      hideNavBar={false}
    >
      {children}
    </IPhoneMockup>
  );
}
