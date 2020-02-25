import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    loading: {
      padding: theme.spacing(10, 50),
      display: 'flex', 
      justifyContent: 'center', 
      alignContent: 'center', 
      paddingTop: 50,
    }}),
);

export default useStyles;