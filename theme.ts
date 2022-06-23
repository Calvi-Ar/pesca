import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
    colors: {
        primary: theme.colors['twitter'],
    },
    styles: {
        global:{
            body:{
                backgroundColor: "primary.50",
            }
        }
    }
});