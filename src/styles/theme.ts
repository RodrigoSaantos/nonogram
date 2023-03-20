import { extendTheme } from '@chakra-ui/react';
import { Roboto } from 'next/font/google'
const roboto = Roboto({ weight: ['700', '500', '400'], subsets: ['latin'] })

export const theme = extendTheme({
  colors: {
    gray: {
      '900': '#181B23',
      '800': '#1F2029',
      '700': '#353646',
      '600': '#4B4D63',
      '500': '#616480',
      '400': '#797D9A',
      '300': '#9699B0',
      '200': '#B3B5C6',
      '100': '#D1D2DC',
      '50': '#EEEEF2',
    },
  },
  fonts: {
    heading: roboto.style.fontFamily,
    body: roboto.style.fontFamily,
  },
  styles: {
    global: {
      html: {
        base: {
          fontSize: 'xs'
        },
        md: {
          fontSize: 'sm'
        },
        lg: {
          fontSize: 'md'
        }
      },
      body: {
        bg: 'white',
        color: 'gray.700',
      },
    },
  },
});
