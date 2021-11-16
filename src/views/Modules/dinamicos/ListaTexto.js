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

const ListaTexto = {
    id_type_module:21,
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
             },
    items:{
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
            label: 'URL enlace',
            fullWidth: true
          },
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        icono: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            label: 'Icono',
            fullWidth: true
          },
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        label: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            label: 'Label',
            fullWidth: true
          },
          value: '',
          validation: {
            required: false
          },
          valid: true,
          touched: false
        },
        bg_label: {
          elementType: 'select',
          elementConfig: {
            fullWidth: true,
            label: 'Color Label',
            options: [
              { value: 'blueiris', displayValue: 'Blue Iris' },
              { value: 'aqua', displayValue: 'Aqua' },
              { value: 'yellow', displayValue: 'Yellow' },
              { value: 'green', displayValue: 'Green' },
              { value: 'purple', displayValue: 'Purple' },
              { value: 'orange', displayValue: 'Orange' }
  
            ],
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
      htmlText:false


    },         
    archivo:false,
    htmlText:false,
    htmlEditorText:false


}

export { ListaTexto }

