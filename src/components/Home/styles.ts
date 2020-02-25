import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    heading: {
      margin: theme.spacing(5, 0, 0, 0),
      color: '#7a71a9',
    },
    loading: {
      padding: theme.spacing(10, 50),
    },
    formControl: {
      margin: theme.spacing(5, 0, 5, 0),
      minWidth: 250,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    list: {
      minWidth: 300,
      marginTop: 15,
      border: '1px solid #e5ecf1',
      boxShadow: '1px 3px 2px #efefef',
      padding: 15,
      borderRadius: 4,
    },
    tableContainer: {
      boxShadow:
        '0px 2px 15px -3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    table: {
      minWidth: 320,
    },
    theading: {
      display: 'inline-block',
      verticalAlign: 'text-bottom',
      fontWeight: 500,
      color: '#268bdc',
    },
    pagination: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
      }
  })
);

export default useStyles;