import { extendTheme } from '@chakra-ui/react'

const Theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#121212' : '#FFFFFF',
        color: props.colorMode === 'dark' ? '#E5E7EB' : '#2D3748',
      },
    }),
  },
  components: {
    Container: {
      variants: {
        dark: {
          bg: '#2D3748',
          color: '#FFFFFF',
        },
      },
    },
    Button: {
      variants: {
        solid: (props: { colorMode: string }) => ({
          bg: props.colorMode === 'dark' ? '#3182CE' : '#E2E8F0',
          color: props.colorMode === 'dark' ? '#FFFFFF' : '#2D3748',
        }),
      },
    },
    Link: {
      baseStyle: (props: { colorMode: string }) => ({
        color: props.colorMode === 'dark' ? '#4299E1' : '#3182CE',
        _hover: {
          textDecoration: 'underline',
          color: props.colorMode === 'dark' ? '#3182CE' : '#2B6CB0',
        },
      }),
    },
    Input: {
      baseStyle: (props: { colorMode: string }) => ({
        borderColor: props.colorMode === 'dark' ? '#718096' : '#E2E8F0',
        _hover: {
          borderColor: props.colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
        },
        _focus: {
          borderColor: props.colorMode === 'dark' ? '#3182CE' : '#3182CE',
          boxShadow: `0 0 0 1px ${
            props.colorMode === 'dark' ? '#3182CE' : '#3182CE'
          }`,
        },
      }),
    },
    Textarea: {
      baseStyle: (props: { colorMode: string }) => ({
        borderColor: props.colorMode === 'dark' ? '#718096' : '#E2E8F0',
        _hover: {
          borderColor: props.colorMode === 'dark' ? '#4A5568' : '#CBD5E0',
        },
        _focus: {
          borderColor: props.colorMode === 'dark' ? '#3182CE' : '#3182CE',
          boxShadow: `0 0 0 1px ${
            props.colorMode === 'dark' ? '#3182CE' : '#3182CE'
          }`,
        },
      }),
    },
    variants: {
      file: (props: { colorMode: string }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: '8px',
        borderRadius: '8px',
        border: `2px solid ${
          props.colorMode === 'dark' ? '#3182CE' : '#E2E8F0'
        }`,
        _hover: {
          borderColor: props.colorMode === 'dark' ? '#2B6CB0' : '#CBD5E0',
        },
        _focusWithin: {
          borderColor: props.colorMode === 'dark' ? '#3182CE' : '#3182CE',
          boxShadow: `0 0 0 1px ${
            props.colorMode === 'dark' ? '#3182CE' : '#3182CE'
          }`,
        },
      }),
    },
  },
})
export default Theme
