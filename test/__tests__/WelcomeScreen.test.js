import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import WelcomeScreen from '../src/screens/WelcomeScreen';

describe('WelcomeScreen', () => {
  it('renders logo, tagline and button', () => {
    const navigation = { navigate: jest.fn() };

    const { getByText, getByRole } = render(<WelcomeScreen navigation={navigation} />);

    expect(getByText('Ucz się języków z fiszkami!')).toBeTruthy();
    expect(getByText('Dołącz do nas')).toBeTruthy();
  });

  it('navigates to Auth screen on button press', () => {
    const navigation = { navigate: jest.fn() };

    const { getByText } = render(<WelcomeScreen navigation={navigation} />);

    const button = getByText('Dołącz do nas');
    fireEvent.press(button);

    expect(navigation.navigate).toHaveBeenCalledWith('Auth');
  });
});
