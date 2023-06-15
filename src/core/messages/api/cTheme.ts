export type cThemeColor = `#${string}`

export default interface cTheme {
  primary: cThemeColor
  secondary: cThemeColor
  danger: cThemeColor
};

export const DefaultTheme: cTheme = {
  primary: '#28a745',
  secondary: '#007bff',
  danger: '#dc3545'
}
