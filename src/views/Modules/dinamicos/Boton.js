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

const Boton = {
    id_type_module:17,
    orderForm:{
        url: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              label: 'URL del Botón',
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
            elementType: 'input',
            elementConfig: {
              type: 'text',
              label: 'Texto del Botón',
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
    archivo:false,
    htmlText:false,
    htmlEditorText:false


}

export { Boton }

