import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewCliente } from "../VariablesState";

import Database from "variables/Database.js";

import { toast } from 'react-toastify';

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';



const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


class NewCliente extends Component {
  state =JSON.parse(JSON.stringify(StateNewCliente));


  handleSubmitNewCliente = (event) => {
    event.preventDefault();

    Database.post(`/insert-clientes`, {nombre: this.state.newClienteForm.nombre.value, 
                                        apellido: this.state.newClienteForm.apellido.value,
                                        dni: this.state.newClienteForm.dni.value,
                                        telefono: this.state.newClienteForm.telefono.value,
                                        direccion: this.state.newClienteForm.direccion.value,
                                        id_tipo_cliente: this.state.newClienteForm.id_tipo_cliente.value,
                                        mail: this.state.newClienteForm.mail.value,
                                        //nro_historia_clinica: this.state.newClienteForm.nro_historia_clinica.value,
                                        vet_derivante: this.state.newClienteForm.vet_derivante.value,
                                        estado_cuenta: this.state.newClienteForm.estado_cuenta.value
                                        },this)
      .then(res => {

          toast.success("El cliente se ha creado con exito!");
          this.setState({
            successSubmit: true,
            formIsValid: false,
          },()=>{
              this.props.getClientesAdmin();
          })
          this.resetNewForm();


      },err => {
        toast.error(err.message);

      })
  }


  inputChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newClienteForm
    };
    const updatedFormElement = {
      ...updatedOrderForm[inputIdentifier]
    };
    updatedFormElement.value = event.target.value;
    checkValid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
    updatedFormElement.valid = checkValid.isValid;
    updatedFormElement.textValid = checkValid.textValid;
    updatedFormElement.touched = true;
    updatedOrderForm[inputIdentifier] = updatedFormElement;

    let formIsValidAlt = true;
    for (let inputIdentifier in updatedOrderForm) {
      formIsValidAlt = updatedOrderForm[inputIdentifier].valid && formIsValidAlt;
    }
    this.setState({
      newClienteForm: updatedOrderForm,
      formIsValid: formIsValidAlt
    })

  }

  resetNewForm = (all) => {
    let newClienteFormAlt = { ...this.state.newClienteForm };
    let successSubmit = this.state.successSubmit;
    for (let key in newClienteFormAlt) {
      newClienteFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
    //this.getClientesType("new", newClienteFormAlt);

  }

  getTipoCliente = () => {
    Database.get('/list-tipo-cliente', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newClienteForm }
        formulario.id_tipo_cliente.elementConfig.options = [...a];
        this.setState({
            newClienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }



  checkValidity = (value, rules) => {
    let isValid = true;
    let textValid = null;

    if (rules.required && isValid) {
      isValid = value.toString().trim() !== '';
      textValid = 'El campo es requerido'
    }

    if (rules.minLength && isValid) {
      isValid = value.length >= rules.minLength;
      textValid = 'La cantidad de caracteres minimos es ' + rules.minLength
    }

    if (rules.maxLength && isValid) {
      isValid = value.length <= rules.maxLength;
      textValid = 'Supera el maximo de caracteres';
    }

    return { isValid: isValid, textValid: textValid };
  }

  componentDidMount() {

    this.getTipoCliente();
  }



  render() {

    const formElementsArray = [];
    for (let key in this.state.newClienteForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newClienteForm[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewCliente(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nuevo Cliente</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de alta de cliente
      </p>
          </CardHeader>
          <CardBody>

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"editcliente-" + formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  textValid={formElement.config.textValid}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event) => this.inputChangedHandler(event, formElement.id)}
                  />
              ))}
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/clientes')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewCliente));
