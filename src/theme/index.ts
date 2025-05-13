import { ThemeOptions } from "@mui/material/styles";

export const commonThemeOptions: ThemeOptions = {



  typography: {
    fontFamily: "var(--font-roboto)",
  },
  components: {
    MuiTouchRipple: {
      styleOverrides: {
        root: {
          "&& .MuiTouchRipple-rippleVisible": {
            // animationDuration: "150ms",
            display: "none",
          },
        },
      },
    },

MuiInputBase: {
      styleOverrides: {
        input: {
          '&:-webkit-autofill': {
            WebkitBoxShadow: '0 0 0 30px transparent inset',
            backgroundColor: 'transparent',
            transition: 'background-color 5000s ease-in-out 0s',
          },
          '&:-webkit-autofill:hover': {
            WebkitBoxShadow: '0 0 0 30px transparent inset',
            backgroundColor: 'transparent',
          },
          '&:-webkit-autofill:focus': {
            WebkitBoxShadow: '0 0 0 30px transparent inset',
            backgroundColor: 'transparent',
          },
          '&:-webkit-autofill:active': {
            WebkitBoxShadow: '0 0 0 30px transparent inset',
            backgroundColor: 'transparent',
          },
        },
      },
    },

    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "50px",
          textTransform: "none",
          padding: "8px 16px",
          boxShadow: "none",
        },
        outlined: ({ theme }) => ({
          border:
            theme.palette.mode === "dark"
              ? "1px solid #ffffff8f"
              : "1px solid #0000008f",
        }),
        contained: ({ theme }) => ({
          '&:hover': {
        boxShadow: 'none'
    }
        }),
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "16px",
          boxShadow: "none",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
         root: ({ theme }) => ({
     
        boxShadow: 'none',
        backgroundColor: theme.palette.background.default,
        color: theme.palette.text.primary,
    
        }),
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 25,
        },
      },
    },

    MuiMenu: {
      styleOverrides: {
        paper: ({theme}) => ({
          width: 200,
          // backgroundColor: theme.palette.background.paper,
        }),
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: 12,
          paddingBottom: 12,
        },
      },
    },
   
  },
};


