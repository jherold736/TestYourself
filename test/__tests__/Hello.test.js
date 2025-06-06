import React from 'react';
import { Text } from 'react-native';
import { render } from '@testing-library/react-native';

const Hello = () => <Text>Hello, world!</Text>;

test('renders hello text', () => {
  const { getByText } = render(<Hello />);
  expect(getByText('Hello, world!')).toBeTruthy();
});
