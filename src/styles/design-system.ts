export const colors = {
    primary: {
      base: 'hsl(226, 100%, 50%)',      // Primary blue
      hover: 'hsl(226, 100%, 45%)',      // Hover state
      light: 'hsl(226, 100%, 97%)',      // Light background
      border: 'hsl(226, 100%, 90%)',     // Light border
    },
    neutral: {
      50: '#fafafa',
      100: '#f5f5f5',
      200: '#e5e5e5',
      300: '#d4d4d4',
      400: '#a3a3a3',
      500: '#737373',
      600: '#525252',
    },
    text: {
      primary: 'hsl(220, 10%, 10%)',
      secondary: 'hsl(220, 10%, 40%)',
    },
    success: '#22c55e',
    error: '#ef4444',
    warning: '#f59e0b',
  };

  export const typography = {
    fonts: {
      primary: 'Plus Jakarta Sans',
      secondary: 'Outfit',
    },
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    weights: {
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
    },
  };

  export const spacing = {
    0: '0',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    5: '1.25rem',
    6: '1.5rem',
    8: '2rem',
    10: '2.5rem',
    12: '3rem',
    16: '4rem',
    20: '5rem',
    24: '6rem',
  };

  export const shadows = {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
  };

  export const transitions = {
    default: '200ms ease-in-out',
    fast: '100ms ease-in-out',
    slow: '300ms ease-in-out',
  };

  export const breakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  };

  export const layout = {
    containerWidth: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    contentWidth: '65ch',
  };