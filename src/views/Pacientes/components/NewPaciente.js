import React, { Component } from "react";
import Input from 'components/Input/Input';
import { Route, Switch, Link, withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/styles';
import { StateNewPaciente } from "../VariablesState";

import Database from "variables/Database.js";

import { toast } from 'react-toastify';
import moment from "moment";

import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Button from '@material-ui/core/Button';
import ArrowBack from '@material-ui/icons/ArrowBack';
import Save from '@material-ui/icons/Save';
import SelectorClase from './SelectorClase';
import SelectorEspecie from './SelectorEspecie';
import SelectorRaza from './SelectorRaza';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import esLocale from "date-fns/locale/es";



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


class NewPaciente extends Component {
  state =JSON.parse(JSON.stringify(StateNewPaciente));


  handleSubmitNewPaciente = (event) => {
    event.preventDefault();

    let fechaAdopcion = null;
    let fechaNacimiento = null;

    let i_clase = null;
    let i_especie = null;
    let i_raza = null;

    if (this.state.clase != null)
      i_clase = this.state.clase.id;

    if (this.state.especie != null)
      i_especie = this.state.especie.id;

      if (this.state.raza != null)
      i_raza = this.state.raza.id;

    if (this.state.fechaAdopcion != null)
    fechaAdopcion = moment(this.state.fechaAdopcion).format("YYYY-MM-DD HH:mm");

    if (this.state.fechaNacimiento != null)
    fechaNacimiento = moment(this.state.fechaNacimiento).format("YYYY-MM-DD HH:mm");

    Database.post(`/insert-pacientes`, {nombre: this.state.newPacienteForm2.nombre.value, 
                                        id_cliente: this.state.newPacienteForm2.id_cliente.value,
                                        id_clase: i_clase,
                                        id_especie: i_especie,
                                        id_raza: i_raza,
                                        color: this.state.newPacienteForm.color.value,
                                        id_sexo: this.state.newPacienteForm.id_sexo.value,
                                        castrado: this.state.newPacienteForm.castrado.value,
                                        id_alimentacion: this.state.newPacienteForm.id_alimentacion.value,
                                        id_habitos: this.state.newPacienteForm.id_habitos.value,
                                        id_mascotas: this.state.newPacienteForm.id_mascotas.value,
                                        notas: this.state.newPacienteForm.notas.value,
                                        fecha_nacimiento: fechaNacimiento,
                                        fecha_adopcion: fechaAdopcion
                                        },this)
      .then(res => {

          toast.success("El paciente se ha creado con exito!");
          this.setState({
            successSubmit: true,
            formIsValid: false,
          },()=>{
              this.props.getPacientesAdmin();
          })
          this.resetNewForm();


      },err => {
        toast.error(err.message);

      })
  }


  inputChangedHandler = (event, inputIdentifier, newValue) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newPacienteForm
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
      newPacienteForm: updatedOrderForm,
      formIsValid: formIsValidAlt
    })

  }

  inputChangedHandler2 = (event, inputIdentifier, newValue) => {
    let checkValid;
    const updatedOrderForm = {
      ...this.state.newPacienteForm2
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
      newPacienteForm2: updatedOrderForm,
      formIsValid: formIsValidAlt
    })

  }

  resetNewForm = (all) => {
    let newPacienteFormAlt = { ...this.state.newPacienteForm };
    let successSubmit = this.state.successSubmit;
    for (let key in newPacienteFormAlt) {
      newPacienteFormAlt[key].value = ''
    }
    if (all)
      successSubmit = false;

    this.setState({
      successSubmit: successSubmit,
      formIsValid: false
    })
    //this.getPacientesType("new", newPacienteFormAlt);

  }

  getCliente = () => {
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
        let formulario = { ...this.state.newPacienteForm2 }
        formulario.id_cliente.elementConfig.options = [...a];
        this.setState({
            newPacienteForm2: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getClase = () => {
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
        let formulario = { ...this.state.newPacienteForm }
        formulario.id_clase.elementConfig.options = [...a];
        this.setState({
            newPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  resetespecie = () => {
    this.setState({ especie: null });
  }

  resetraza = () => {
    this.setState({ raza: null });
  }

  getSelectedDataClase = (data) => {
    this.setState({ clase: data });
    this.setState({ enabledEspecie: true });
  }

  getSelectedDataEspecie = (data) => {
    this.setState({ especie: data });
    this.setState({ enabledRaza: true });

    if (data !== null) {
      this.setState({ enabledEspecie: true });
    } else {
      this.setState({ enabledEspecie: false });
    }
  }

  getSelectedDataRaza = (data) => {
    this.setState({ raza: data });

    if (data !== null) {
      this.setState({ enabledRaza: true });
    } else {
      this.setState({ enabledRaza: false });
    }
  }

  getEspecie = () => {
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
        let formulario = { ...this.state.newPacienteForm }
        formulario.id_especie.elementConfig.options = [...a];
        this.setState({
            newPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getRaza = () => {
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
        let formulario = { ...this.state.newPacienteForm }
        formulario.id_raza.elementConfig.options = [...a];
        this.setState({
            newPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getSexo = () => {
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
        let formulario = { ...this.state.newPacienteForm }
        formulario.id_sexo.elementConfig.options = [...a];
        this.setState({
            newPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getAlimentacion = () => {
    Database.get('/list-alimentacion', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newPacienteForm }
        formulario.id_alimentacion.elementConfig.options = [...a];
        this.setState({
            newPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getHabitos = () => {
    Database.get('/list-habitos', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newPacienteForm }
        formulario.id_habitos.elementConfig.options = [...a];
        this.setState({
            newPacienteForm: formulario
        })
      }, err => {
        toast.error(err.message);
      })
  }

  getMascotas = () => {
    Database.get('/list-mascotas', this)
      .then(res => {

        let resultado = [...res.result];
        let a = [];
        resultado.forEach(function (entry) {
          a.push({
            value: entry.id,
            displayValue: entry.descripcion
          });
        })
        let formulario = { ...this.state.newPacienteForm }
        formulario.id_mascotas.elementConfig.options = [...a];
        this.setState({
            newPacienteForm: formulario
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

    this.getCliente();
    //this.getClase();
    //this.getEspecie();
    //this.getRaza();
    this.getSexo();
    this.getAlimentacion();
    this.getHabitos();
    this.getMascotas();
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
    for (let key in this.state.newPacienteForm) {
      formElementsArray.push({
        id: key,
        config: this.state.newPacienteForm[key]
      });
    }
    const formElementsArray2 = [];
    for (let key in this.state.newPacienteForm2) {
      formElementsArray2.push({
        id: key,
        config: this.state.newPacienteForm2[key]
      });
    }
    return (

      <form onSubmit={(event) => {
        this.handleSubmitNewPaciente(event)

      } }>





        <Card>
          <CardHeader color="primary">
            <h4 className={this.props.classes.cardTitleWhite}>Nuevo Paciente</h4>
            <p className={this.props.classes.cardCategoryWhite}>
              Formulario de alta de paciente
      </p>
          </CardHeader>
          <CardBody>


            <div className="mt-3 mb-3">
            {formElementsArray2.map(formElement => (
                <Input
                  key={"editpaciente-" + formElement.id}
                  elementType={formElement.config.elementType}
                  elementConfig={formElement.config.elementConfig}
                  value={formElement.config.value}
                  textValid={formElement.config.textValid}
                  invalid={!formElement.config.valid}
                  shouldValidate={formElement.config.validation}
                  touched={formElement.config.touched}
                  changed={(event, newValue) => this.inputChangedHandler2(event, formElement.id, newValue)}
                  />
              ))}
              <br></br>
            <SelectorClase getDataSelectedData={this.getSelectedDataClase} />
            <br></br>
            <SelectorEspecie especie={this.state.especie} clase={this.state.clase} disabled={!this.state.enabledEspecie} getDataSelectedData={this.getSelectedDataEspecie} resetvalue={this.resetespecie} />
            <br></br>
            <SelectorRaza raza={this.state.raza} especie={this.state.especie} disabled={!this.state.enabledRaza} getDataSelectedData={this.getSelectedDataRaza} resetvalue={this.resetraza} />
            
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
                  changed={(event, newValue) => this.inputChangedHandler(event, formElement.id, newValue)}
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

            <Button style={{ marginTop: '25px' }} color="info" onClick={() => this.props.history.push('/admin/pacientes')} ><ArrowBack />Volver</Button>
            <Button style={{ marginTop: '25px' }} color="primary" variant="contained" disabled={!this.state.formIsValid || this.state.disableAllButtons} type="submit" ><Save /> Guardar</Button>


          </CardBody>
        </Card>



      </ form>


    )
  }


};

export default withRouter(withStyles(styles)(NewPaciente));
