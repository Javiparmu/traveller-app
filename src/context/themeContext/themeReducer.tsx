import { Theme } from '@react-navigation/native';


type ThemeAction =
    | { type: 'set_light_theme' }
    | { type: 'set_dark_theme' }


export interface ThemeState extends Theme {
    currentTheme: 'light' | 'dark',
    dividerColor: string;
    colors: {
        primary: string,
        secondary: string,
        text: string,
        background: string,
        border: string,
        card: string,
        notification: string,
    }
}

const redTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: '#b74b3e',
        secondary: '#DC5647',
        background: '#FFEDEB',
        card: '#FFFFFF',
        text: '#252525',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const blueTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: '#4CB5C1',
        secondary: '#6FD2DE',
        background: '#F5FBFC',
        card: '#FFFFFF',
        text: '#252525',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const greenTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: '#66BF75',
        secondary: '#7cc698',
        background: '#DCF0E4',
        card: '#FFFFFF',
        text: '#252525',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

const anotherTheme: ThemeState = {
    currentTheme: 'light',
    dark: false,
    dividerColor: 'rgba(0,0,0,0.7)',
    colors: {
        primary: '#006D77',
        secondary: '#1F8E98',
        background: '#EDF6F9',
        card: '#FFFFFF',
        text: '#252525',
        border: 'rgb(199, 199, 204)',
        notification: 'rgb(255, 69, 58)',
    },
};

export const lightTheme: ThemeState = redTheme

export const darkTheme: ThemeState = {
    currentTheme: 'dark',
    dark: true,
    dividerColor: 'rgba(255,255,255, 0.6)',
    colors: {
        primary: '#75CEDB',
        secondary: '#75CEDB',
        background: 'black',
        card: 'black',
        text: 'white',
        border: 'black',
        notification: 'teal',
    }
}


export const themeReducer = (state: ThemeState, action: ThemeAction): ThemeState => {

    switch (action.type) {
        case 'set_light_theme':
            return { ...lightTheme }

        case 'set_dark_theme':
            return { ...darkTheme }

        default:
            return state;
    }

}
