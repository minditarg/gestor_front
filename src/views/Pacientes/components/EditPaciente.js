import React, { Component } from 'react';
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Database from "variables/Database.js";
import { toast,ToastContainer } from 'react-toastify';
import moment from "moment";


import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";

import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import { StateEditPaciente } from "../VariablesState";



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


class EditPaciente extends Component {
  state = JSON.parse(JSON.stringify(StateEditPaciente));

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


  getPacienteEdit = (id) => {
    Database.get('/list-pacientes/' + id)
      .then(resultado => {

          if (resultado.result.length > 0) {
            this.setState({
              pacienteEdit: resultado.result[0]
            })

            let editPacienteFormAlt = { ...this.state.editPacienteForm };
            editPacienteFormAlt.nombre.value = resultado.result[0].nombre;
            editPacienteFormAlt.id_cliente.value = resultado.result[0].id_cliente;
            editPacienteFormAlt.id_clase.value = resultado.result[0].id_clase;
            editPacienteFormAlt.id_especie.value = resultado.result[0].id_especie;
            editPacienteFormAlt.id_raza.value = resultado.result[0].id_raza;
            editPacienteFormAlt.color.value = resultado.result[0].color;
            editPacienteFormAlt.id_sexo.value = resultado.result[0].id_sexo;
            editPacienteFormAlt.castrado.value = resultado.result[0].castrado;
            editPacienteFormAlt.notas.value = resultado.result[0].notas;
            this.state.fechaNacimiento = resultado.result[0].fecha_nacimiento;
            this.state.fechaAdopcion = resultado.result[0].fecha_adopcion;
            for (let key in editPacienteFormAlt) {
              editPacienteFormAlt[key].touched = true;
              editPacienteFormAlt[key].valid = true;
            }

            this.setState({
              editPacienteForm: editPacienteFormAlt
            })
           // this.getPacientesType("edit", editPacienteFormAlt);
          }
          else {
            this.setState({
              pacienteEdit: null
            })
          }

      })

    
    Database.get('/list-cliente', this)
    .then(res => {

      let resultado = [...res.result];
      let a = [];
      resultado.forEach(function (entry) {
        a.push({
          value: entry.id,
          displayValue: entry.apellido + ', '+ entry.nombre
        });
      })
      let formulario = { ...this.state.editPacienteForm }
      formulario.id_cliente.elementConfig.options = [...a];
      this.setState({
          editPacienteForm: formulario
      })
    }, err => {
      toast.error(err.message);
    })

    Database.get('/list-clase', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.editPacienteForm }
        formulario.id_clase.elementConfig.options = [...a];
        this.setState({
            editPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })

    Database.get('/list-especie', this)
    .then(res => {

      let resultado = [...res.result];
      let a = [];
      resultado.forEach(function (entry) {
        a.push({
          value: entry.id,
          displayValue: entry.descripcion
        });
      })
      let formulario = { ...this.state.editPacienteForm }
      formulario.id_especie.elementConfig.options = [...a];
      this.setState({
          editPacienteForm: formulario
      })
    }, err => {
      toast.error(err.message);
    })

    Database.get('/list-raza', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.editPacienteForm }
        formulario.id_raza.elementConfig.options = [...a];
        this.setState({
            editPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
      
    Database.get('/list-sexo', this)
    .then(res => {

      let resultado = [...res.result];
      let a = [];
      resultado.forEach(function (entry) {
        a.push({
          value: entry.id,
          displayValue: entry.descripcion
        });
      })
      let formulario = { ...this.state.editPacienteForm }
      formulario.id_sexo.elementConfig.options = [...a];
      this.setState({
          editPacienteForm: formulario
      })
    }, err => {
      toast.error(err.message);
    })
    
  }


  handleSubmitEditPaciente = (event) => {

    event.preventDefault();

    Database.post(`/update-paciente`, { id: this.props.match.params.idpaciente, 
        nombre: this.state.editPacienteForm.nombre.value, 
        id_cliente: this.state.editPacienteForm.id_cliente.value,
        id_clase: this.state.editPacienteForm.id_clase.value,
        id_especie: this.state.editPacienteForm.id_especie.value,
        id_raza: this.state.editPacienteForm.id_raza.value,
        color: this.state.editPacienteForm.color.value,
        id_sexo: this.state.editPacienteForm.id_sexo.value,
        castrado: this.state.editPacienteForm.castrado.value,
        notas: this.state.editPacienteForm.notas.value,
        fecha_nacimiento: this.state.fechaNacimiento,
        fecha_adopcion: this.state.fechaAdopcion},this)
      .then(res => {

          this.setState({
            successSubmitEdit: true,
            editFormIsValid: false,
            disableAllButtons:false
          },()=>{
              toast.success("El paciente se ha modificado con exito!");

              this.props.getPacientesAdmin();

          })

      },err =>{
          toast.error(err.message);

      })

  }


  inputEditChangedHandler = (event, inputIdentifier, newValue) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.editPacienteForm
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
    if (inputIdentifier == "castrado") {
      console.log("cambiando castrado: " + newValue);
      if (newValue == true)
        updatedOrderForm["castrado"].value = 1;
      else
        updatedOrderForm["castrado"].value = 0;
    }
    this.setState({
      editPacienteForm: updatedOrderForm,
      editFormIsValid: formIsValidAlt
    })

  }





  resetEditForm = () => {
    let editPacienteFormAlt = { ...this.state.editPacienteForm };
    let successSubmitEdit = this.state.successSubmitEdit;
    for (let key in editPacienteFormAlt) {
      editPacienteFormAlt[key].value = ''
    }

    this.setState({
      editFormIsValid: false,
      successSubmitEdit: successSubmitEdit
    })


  }

  componentDidMount() {

   // this.getPacientesType();
    this.getPacienteEdit(this.props.match.params.idpaciente);
  }

  handleFechaNacimiento = (date) => {
    this.setState(
      {
        fechaNacimiento: date
      }
    )
  };

  handleFechaAdopcion = (date) => {
    this.setState(
      {
        fechaAdopcion: date
      }
    )
  };

  render() {

    const formElementsArray = [];
    for (let key in this.state.editPacienteForm) {
      formElementsArray.push({
        id: key,
        config: this.state.editPacienteForm[key]
      });
    }

    return ([

      <form onSubmit={(event) => {
        
        this.handleSubmitEditPaciente(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Editar Paciente</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario para modificar los datos del paciente
      </p>
          </CardHeader>
          <CardBody>
          {/* <Button variant="outlined" color="primary" onClick={this.handleClickOpen}>
        Cambiar Contraseña
      </Button> */}

            <div className="mt-3 mb-3">
              {formElementsArray.map(formElement => (
                <Input
                  key={"editpaciente-" + formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  textValid={formElement.config.textValid}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event, newValue) => this.inputEditChangedHandler(event, formElement.id, newValue)}
                  />
              ))}

              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechanacimiento"
                    label="Fecha de Nacimiento"
                    format="dd/MM/yyyy"
                    value={this.state.fechaNacimiento}
                    onChange={this.handleFechaNacimiento}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </MuiPickersUtilsProvider>

              <MuiPickersUtilsProvider locale={esLocale} utils={DateFnsUtils}>
                <div>
                  <KeyboardDatePicker
                    margin="normal"
                    id="fechaadopcion"
                    label="Fecha de Adopcion"
                    format="dd/MM/yyyy"
                    value={this.state.fechaAdopcion}
                    onChange={this.handleFechaAdopcion}
                    autoOk={true}
                    cancelLabel={"Cancelar"}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </div>
              </MuiPickersUtilsProvider>
            </div>

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/pacientes')} ><ArrowBack />Volver</Button><Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.editFormIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


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
          Ingrese una nueva contraseña para el Paciente
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

export default withRouter(withStyles(styles)(EditPaciente));
