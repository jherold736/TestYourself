import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import AuthScreen from '../src/screens/AuthScreen';
import * as api from '../src/api';
import { NavigationContainer } from '@react-navigation/native';

jest.mock('../src/api', () => ({
  loginUser: jest.fn(),
  registerUser: jest.fn(),
}));

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
}));

describe('AuthScreen', () => {
  const mockNavigate = jest.fn();

  const renderComponent = () =>
    render(
      <NavigationContainer>
        <AuthScreen navigation={{ navigate: mockNavigate }} />
      </NavigationContainer>
    );

  test('renders login fields and button', () => {
    const { getByPlaceholderText, getAllByText } = renderComponent();
    expect(getByPlaceholderText('Email')).toBeTruthy();
    expect(getByPlaceholderText('Hasło')).toBeTruthy();
    expect(getAllByText('Zaloguj się').length).toBeGreaterThan(0);
  });

  test('allows user to log in and calls loginUser()', async () => {
    api.loginUser.mockResolvedValueOnce({ token: 'fake-token' });

    const { getByPlaceholderText, getAllByText } = renderComponent();

    fireEvent.changeText(getByPlaceholderText('Email'), 'test@example.com');
    fireEvent.changeText(getByPlaceholderText('Hasło'), 'haslo123');

    const loginButton = getAllByText('Zaloguj się')[1];
    await fireEvent.press(loginButton);

    await waitFor(() => {
      expect(api.loginUser).toHaveBeenCalledWith('test@example.com', 'haslo123');
      expect(mockNavigate).toHaveBeenCalledWith('Main');
    });
  });

  test('switches to registration form when tapping the toggle', () => {
    const { getByText, getByPlaceholderText, getAllByText } = renderComponent();

    fireEvent.press(getByText('Nie masz konta? Zarejestruj się'));

    expect(getByPlaceholderText('Potwierdź hasło')).toBeTruthy();
    expect(getAllByText('Zarejestruj się').length).toBeGreaterThan(0);
  });

  test('allows user to register and calls registerUser()', async () => {
    api.registerUser.mockResolvedValueOnce({ message: 'OK' });

    const { getByText, getByPlaceholderText, getAllByText } = renderComponent();

    fireEvent.press(getByText('Nie masz konta? Zarejestruj się'));

    fireEvent.changeText(getByPlaceholderText('Email'), 'nowy@user.com');
    fireEvent.changeText(getByPlaceholderText('Hasło'), 'tajnehaslo');
    fireEvent.changeText(getByPlaceholderText('Potwierdź hasło'), 'tajnehaslo');

    const registerButton = getAllByText('Zarejestruj się')[1];
    await fireEvent.press(registerButton);

    await waitFor(() => {
      expect(api.registerUser).toHaveBeenCalledWith('nowy@user.com', 'tajnehaslo');
    });
  });
});









