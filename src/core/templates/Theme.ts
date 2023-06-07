type Color = `#${string}`

export default interface Theme {
  primary: Color
  secondary: Color
  danger: Color
};

export const DefaultTheme: Theme = {
  primary: '#28a745',
  secondary: '#007bff',
  danger: '#dc3545'
}
