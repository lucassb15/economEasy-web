import { extendTheme } from '@chakra-ui/react'

const Theme = extendTheme({
  config: {
    initialColorMode: 'dark',
    useSystemColorMode: false,
  },
  styles: {
    global: (props: { colorMode: string }) => ({
      body: {
        bg: props.colorMode === 'dark' ? '#121212' : '#f5f5f5',
        color: props.colorMode === 'dark' ? '#E5E7EB' : '#000',
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
          bg: props.colorMode === 'dark' ? '#3182CE' : '#3983f4', // Usando a cor principal no fundo do botão no modo claro
          color: props.colorMode === 'dark' ? '#FFFFFF' : '#FFFFFF', // Texto branco para contraste com o fundo azul
          _hover: {
            bg: props.colorMode === 'dark' ? '#2B6CB0' : '#3174D5', // Um tom mais escuro da cor principal para o estado de hover
          },
        }),
      },
    },
    Link: {
      baseStyle: (props: { colorMode: string }) => ({
        color: props.colorMode === 'dark' ? '#4299E1' : '#3983f4', // Cor principal para links no modo claro
        _hover: {
          textDecoration: 'underline',
          color: props.colorMode === 'dark' ? '#3182CE' : '#3174D5', // Um tom mais escuro da cor principal para o estado de hover
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
