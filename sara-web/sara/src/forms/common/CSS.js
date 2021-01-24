
import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    content: {
        backgroundColor:
            theme.palette.mode === 'light'
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    login_paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    login_avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    login_form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    login_submit: {
        margin: theme.spacing(3, 0, 2),
    },

    avatar_40: {
        width: theme.spacing(40),
        height: theme.spacing(40),
    },
    avatar_70: {
        width: theme.spacing(70),
        height: theme.spacing(70),
    }
}));

class CSS {

}

export default new CSS();