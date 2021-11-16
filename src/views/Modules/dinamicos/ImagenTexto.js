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


const ImagenTexto = {
  id_type_module:15,
    orderForm:{
      tipo: {
        elementType: 'select',
        elementConfig: {
          label: 'URL Imagen',
          fullWidth: true,
          options:[
            { value: 'BANNER', displayValue: 'Banner Principal' },
            { value: 'IMAGENTEXTO', displayValue: 'Imagen y Texto' },
          ]
        },
        value: '',
        validation: {
          required: true
        },
        valid: false,
        touched: false
      },
        archivo: {
            elementType: 'input',
            elementConfig: {
              type: 'text',
              label: 'URL Imagen',
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
              label: 'Texto de Imagen',
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
   
    archivo:true,
    htmlText:false,
    htmlEditorText:false



}

export { ImagenTexto }