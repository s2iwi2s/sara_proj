
import { fade, makeStyles } from '@material-ui/core/styles';
export const useStyles = makeStyles((theme) => ({
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

    appbar_root: {
        flexGrow: 1,
    },
    appbar_menuButton: {
        marginRight: theme.spacing(2),
    },
    appbar_title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
            paddingLeft: theme.spacing(1)
        },
        //backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    appbar_search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(1),
            width: 'auto',
        },
    },
    appbar_searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    appbar_inputRoot: {
        color: 'inherit',
    },
    appbar_inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
    avatar_40: {
        width: theme.spacing(40),
        height: theme.spacing(40),
    },
    avatar_70: {
        width: theme.spacing(70),
        height: theme.spacing(70),
    },
}));

class CSS {

}

export default new CSS();