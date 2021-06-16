import boxShadows from "./../../box-shadow";
import { Theme } from '@material-ui/core/styles';

const componentStyles = (theme: Theme) => ({
  paper: {
    width: "100%",
    minHeight: "100vh",
    height: "auto",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "left top, right bottom",
    backgroundSize: "auto 300px",
    backgroundImage: "url(https://members.onepeloton.com/static/media/dotsLeft.cbd303b9..svg), url(https://members.onepeloton.com/static/media/dotsRight.a3cd8d0d..svg)",
    backgroundColor: theme.palette.primary.light,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  centerBox: {
      maxWidth: "380px",
      width: "100%"
  },
  logo: {
      fill: "#FFFF"
  },
  form: {

  }
});

export default componentStyles;
