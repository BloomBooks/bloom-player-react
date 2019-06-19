//tslint:disable-next-line:no-submodule-imports
import { createMuiTheme } from "@material-ui/core/styles";

const bloomRed = "#d65649"; // see also @bloomRed in bloom-player.less
const bloomBlue = "#1d94a4";
const bloomPurple = "#96668f";
const bloomGrey = "#2e2e2e";
const bloomWhite = "#ffffff";

const theme = createMuiTheme({
    palette: {
        primary: { dark: bloomRed, main: bloomGrey, contrastText: bloomRed },
        secondary: { main: bloomPurple }
    }
});

export default theme;
