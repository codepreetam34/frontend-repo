import { makeStyles } from '@mui/styles';
import colors from '../../constants/colors';
import fontSize from '../../constants/fontSize';

const useStyles = makeStyles((theme) => ({
  label: {
    marginTop: theme.spacing(3),
    color: `${colors.labelColor} !important`,
    position: 'static !important',
    fontWeight: '500 !important',
  },
  input: {
    height: '50px',
    borderRadius: '4px',
    paddingLeft: '10px',
    paddingRight: '20px !important',
    backgroundColor: '#f6f3ec',
    border: 'none',
    display: 'flex',
    justifyContent: 'center',
    '&:placeholder': {
      fontSize: `${fontSize['12px']} !important`,
      color: '#dcd5ce',
    },
    '&:focus': {
      boxShadow: `${colors.primary} 0 0 0 0.1rem`,
      borderColor: colors.primary,
    },
  },
}));

export default useStyles;
