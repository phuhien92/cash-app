import { Theme } from '@material-ui/core/styles';
import boxShadows from "./../../box-shadow.js";

const componentStyles = (theme: Theme) => ({
  cardRoot: {
    boxShadow: boxShadows.boxShadow + "!important",
    border: "0!important",
    backgroundColor: theme.palette.secondary.main,
  }
});

export default componentStyles;
