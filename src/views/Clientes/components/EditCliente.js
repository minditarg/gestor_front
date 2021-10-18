import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast,ToastContainer } from 'react-toastify';


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { StateEditCliente } from "../VariablesState";



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


class EditCliente extends Component {
  state = JSON.parse(JSON.stringify(StateEditCliente));

  handleClickOpen = () => {
    this.setState({
      openChangePass:true
    })
  };

  handleClose = () => {
    this.setState({
      openChangePass:false
    })
  };




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


  getClienteEdit = (id) => {
    Database.get('/list-clientes/' + id)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              clienteEdit: resultado.result[0]
            })

            let editClienteFormAlt = { ...this.state.editClienteForm };
            editClienteFormAlt.nombre.value = resultado.result[0].nombre;
            editClienteFormAlt.apellido.value = resultado.result[0].apellido;
            editClienteFormAlt.dni.value = resultado.result[0].dni;
            editClienteFormAlt.telefono.value = resultado.result[0].telefono;
            editClienteFormAlt.direccion.value = resultado.result[0].direccion;
            editClienteFormAlt.id_tipo_cliente.value = resultado.result[0].id_tipo_cliente;
            editClienteFormAlt.mail.value = resultado.result[0].mail;
            //editClienteFormAlt.nro_historia_clinica.value = resultado.result[0].nro_historia_clinica;
            editClienteFormAlt.vet_derivante.value = resultado.result[0].vet_derivante;
            editClienteFormAlt.estado_cuenta.value = resultado.result[0].estado_cuenta;
            for (let key in editClienteFormAlt) {
              editClienteFormAlt[key].touched = true;
              editClienteFormAlt[key].valid = true;
            }

            this.setState({
              editClienteForm: editClienteFormAlt
            })
           // this.getClientesType("edit", editClienteFormAlt);
          }
          else {
            this.setState({
              clienteEdit: null
            })
          }

      })

    
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
    let formulario = { ...this.state.editClienteForm }
    formulario.id_tipo_cliente.elementConfig.options = [...a];
    this.setState({
        editClienteForm: formulario
    })
    }, err => {
    toast.error(err.message);
    })
    
  }


  handleSubmitEditCliente = (event) => {

    event.preventDefault();

    Database.post(`/update-cliente`, { id: this.props.match.params.idcliente, 
        nombre: this.state.editClienteForm.nombre.value, 
        apellido: this.state.editClienteForm.apellido.value,
        dni: this.state.editClienteForm.dni.value,
        telefono: this.state.editClienteForm.telefono.value,
        direccion: this.state.editClienteForm.direccion.value,
        id_tipo_cliente: this.state.editClienteForm.id_tipo_cliente.value,
        mail: this.state.editClienteForm.mail.value,
        //nro_historia_clinica: this.state.editClienteForm.nro_historia_clinica.value,
        vet_derivante: this.state.editClienteForm.vet_derivante.value,
        estado_cuenta: this.state.editClienteForm.estado_cuenta.value},this)
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("El cliente se ha modificado con exito!");

              this.props.getClientesAdmin();

          })

      },err =>{
          toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editClienteForm
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
      editClienteForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }





  resetEditForm = () => {
    let editClienteFormAlt = { ...this.state.editClienteForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editClienteFormAlt) {
      editClienteFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  componentDidMount() {

   // this.getClientesType();
    this.getClienteEdit(this.props.match.params.idcliente);
  }

  render() {

    const formElementsArray = [];
    for (let key in this.state.editClienteForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editClienteForm[key]
      });
    }

    return ([

      <form onSubmit={(event) => {
        
        this.handleSubmitEditCliente(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Cliente</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos del cliente
      </p>
          </CardHeader>
          <CardBody>
          {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Cambiar Contraseña
      </Button> */}

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
                  changed={(event) => this.inputEditChangedHandler(event, formElement.id)}
                  />
              ))}
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/clientes')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>


      </ form>,
      
      <Dialog open={this.state.openChangePass} onClose={this.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Cambio de Contraseña</DialogTitle>
      <form onSubmit={(event) => {
        this.handleChangePass(event)

      } }>
      { this.state.openChangePass &&
      <DialogContent>
      
        <DialogContentText>
          Ingrese una nueva contraseña para el Cliente
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="contrasenia"
          name="contrasenia"
          label="nueva contraseña"
          type="password"
          fullWidth
        />
      </DialogContent>
      }
      <DialogActions>
        <Button onClick={this.handleClose} color="primary">
          Cancelar
        </Button>
        <Button type="submit" color="primary">
          Aceptar
        </Button>
      </DialogActions>
      </form>
    </Dialog>
      


              ])
  }

};

export default withRouter(withStyles(styles)(EditCliente));
