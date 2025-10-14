import React from 'react';
import { ThemeContext } from './ThemeContext';
import ThemeToggle from '../../pages/components/ThemeToggle/ThemeToggle';

const ThemeProvider = ({children}) => {
    const themeToggle = <ThemeToggle />
    return (
        <ThemeContext value={themeToggle}>{children}</ThemeContext>
    );
};

export default ThemeProvider;