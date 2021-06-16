import { AvatarClassKey } from '@material-ui/core';
import * as createPalette from '@material-ui/core/styles/createPalette';

declare module '@material-ui/core/styles/createPalette' {

    interface PaletteOptions {    
        buttonLightLabel?: PaletteColorOptions;
        sidebarLinks?: PaletteColorOptions;
        adminNavbarSearch?:PaletteColorOptions;
        adminNavbarSearch?:PaletteColorOptions;
        authNavbarLink?:PaletteColorOptions;
        MuiAvatarGroup?:AvatarClassKey;
        white?:PaletteColorOptions;
    }
}