import { StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const styles = StyleSheet.create({
  container: {
      alignItems: 'center',
  },
  title:{
    fontSize: 18,
    marginBottom: 32,
    fontFamily: theme.fonts.medium,
    color: theme.colors.text_primary
  },
  options: {
    width: '100%',
    marginBottom: 18,
    flexDirection: 'row',
    justifyContent: 'center'
  }
});