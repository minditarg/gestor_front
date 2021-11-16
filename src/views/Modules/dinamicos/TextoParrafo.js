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

const TextoParrafo = {
    id_type_module:14,
    orderForm:{

        texto: {
            elementType: 'textarea',
            elementConfig: {
              type: 'text',
              label: 'Texto Parrafo',
              fullWidth: true,
              rows: 6
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

export { TextoParrafo }