export type ThemeColor = `#${string}`

export default interface Theme {
  primary: ThemeColor
  secondary: ThemeColor
  danger: ThemeColor
};

export const DefaultTheme: Theme = {
  primary: '#28a745',
  secondary: '#007bff',
  danger: '#dc3545'
}
