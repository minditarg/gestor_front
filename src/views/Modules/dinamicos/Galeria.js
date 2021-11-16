const muestra = {
    orderForm:{},
    items:{
        orderForm:{

        },
        archivo:false,
        htmlText:true
    },
    archivo:false,
    htmlText:false,
    htmlEditorText:false



}

const Galeria = {
  id_type_module:2,
    orderForm:{
        
        titulo: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              label: 'Titulo',
              fullWidth: true
            },
            value: '',
            validation: {
              required: false
            },
            valid: true,
            touched: false
          },
          width: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              label: 'Width',
              fullWidth: true
            },
            value: '',
            validation: {
              required: false
            },
            valid: true,
            touched: false
          },
          height: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              label: 'Height',
              fullWidth: true
            },
            value: '',
            validation: {
              required: false
            },
            valid: true,
            touched: false
          },

    },
    items:{
        orderForm: {
            titulo: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                label: 'Titulo',
                fullWidth: true
              },
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            texto: {
              elementType: 'textarea',
              elementConfig: {
                type: 'text',
                label: 'Texto',
                fullWidth: true
              },
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            url: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                label: 'URL',
                fullWidth: true
              },
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            },
            archivo: {
              elementType: 'input',
              elementConfig: {
                type: 'text',
                label: 'Imagen',
                fullWidth: true
              },
              value: '',
              validation: {
                required: false
              },
              valid: true,
              touched: false
            }

          },
          archivo: true,
          htmlText: false

    },
    archivo:false,
    htmlText:true,
    htmlEditorText:false



}

export { Galeria }