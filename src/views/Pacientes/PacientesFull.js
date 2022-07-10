import React, { Component } from "react";
import Database from "variables/Database.js";
import moment from 'moment';

import { Route, Switch} from 'react-router-dom';
// core components
import MaterialTable from "material-table";
// import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import Card from "components/Card/Card.js";
import Paper from '@material-ui/core/Paper';
import Button from "components/CustomButtons/Button.js";
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import FeaturedPlayListIcon from '@material-ui/icons/FeaturedPlayList';

import NewUser from "./components/NewPaciente";
import EditPaciente from "./components/EditPaciente";
import ModalDelete from "./components/ModalDelete";
import Ficha from './Fichas';
import NewConsulta from './Consultas/components/NewConsulta.js';
import { localization } from "variables/general.js";

import { toast } from 'react-toastify';


import { StateListPacientes, ColumnsListado } from "./VariablesState";

import lightGreen from '@material-ui/core/colors/lightGreen';



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


class Pacientes extends Component {
  state = { ...StateListPacientes };


  componentDidMount() {
    this.getPacientesAdmin();
  }



  handleToggle = value => {
    const currentIndex = this.state.checked.indexOf(value);
    const newChecked = [...this.state.checked];
    let deleteEnabled = false;
    let editEnabled = false;
    const botonesAcc = { ...this.state.botonesAcciones }
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }
    if (newChecked.length > 0) {
      deleteEnabled = true;
      if (newChecked.length === 1)
        editEnabled = true;
    }
    botonesAcc.editar.enabled = editEnabled;
    botonesAcc.delete.enabled = deleteEnabled;
    this.setState({
      botonesAcciones: botonesAcc,
      checked: newChecked
    })

  };

  menuHandleClose = (value) => {
    this.setState({
      menuContext: null
    })
  }

  menuHandleItemClick = (value) => {
    const newItem = { ...this.state.botonesAcciones[value] };
    let menuContext = { ...this.state.menuContext };
    if (newItem.enabled) {
      menuContext = null;

      if (value === 'nuevo') {
        this.setState({
          menuContext: menuContext
        })
        this.props.history.push(this.props.match.url + '/nuevopaciente');
      }

      if (value === 'editar' && this.state.checked.length === 1) {
        this.setState({
          menuContext: menuContext
        })
        let idUser = this.state.checked[0].id;
        this.props.history.push(this.props.match.url + '/editarpaciente/' + idUser);
      }
    }
  }

  menuHandleOpen = event => {
    this.setState({
      menuContext: event.currentTarget
    })
  }

  getPacientesAdmin = () => {
    this.setState({
      isLoading: true
    })

    Database.get('/list-pacientes',this,null,true)
      .then(res => {
        let resultado = [...res.result[0]];
        console.log(resultado);

        resultado = resultado.map(elem => {
          return {
            ...elem,
            edad: (elem.edad != null)&&((elem.edad < 30) ? elem.edad + ' días' : ((elem.edad < 365) ? Math.floor(elem.edad / 30) + ' meses' : Math.floor(elem.edad / 365) + ' años')),
            castrado_mostrar: ((elem.castrado == 1) ? 'SI' : 'NO'),
          }
        })

        this.setState({
          isLoading:false,
          pacientes: resultado,
          checked: [],
          menuContext: null,
          botonesAcciones: {
            nuevo: {
              enabled: true,
              texto: 'Nuevo'
            },
            editar: {
              enabled: false,
              texto: 'Editar'
            },
            delete: {
              enabled: false,
              texto: 'Eliminar'
            }
          }
        })


      },err =>{
        toast.error(err.message);

      })



  }



  editSingleUser = value => {
    this.props.history.push(this.props.match.url + '/editarpaciente/' + value);
  }

  handlePagination = offset => {
    this.setState({
      offset: offset
    })

  }

  handleDeletePaciente = rowData => {
    console.log(rowData);
    Database.post('/delete-paciente', { id: rowData.id },this).then(res => {
        let pacientes = [...this.state.pacientes]
        pacientes = pacientes.filter(elem => {
          if (elem.id === rowData.id)
            return false;

          return true

        })

        this.setState({
          pacientes: pacientes,
          openDeleteDialog:false
        },()=>{
          toast.success("El paciente se ha eliminado con exito!");
        })


    },err => {
      toast.error(err.message);
    })

  }

  handleDeleteButton = rowData => {
    this.setState({
      openDeleteDialog: true,
      deleteRowData: rowData
    })
  }




  handleModalClose() {
    this.setState({
      openDeleteDialog: false,
      deleteRowData: null
    })
  }





  render() {
    let style = {}
    console.log(this.props);
    if (this.props.match.url !== this.props.location.pathname) {
      style = { display: 'none' }
    }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={style}>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite} >Pacientes</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Listado de Pacientes
                      </p>
            </CardHeader>
            <CardBody>
              <Button style={{ marginTop: '25px' }} onClick={() => this.props.history.push(this.props.match.url + '/nuevopaciente')} color="primary"><AddIcon /> Nuevo Paciente</Button>
              <MaterialTable
                isLoading={this.state.isLoading}
                columns={ColumnsListado}
                data={this.state.pacientes}
                title=""
                localization={localization}

                actions={[{
                  icon: 'edit',
                  tooltip: 'Editar Paciente',
                  onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarpaciente/' + rowData.id)
                },
                {
                  icon: AddIcon,
                  tooltip: 'Agregar Consulta',
                  onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/consultas/nuevoconsulta/' + rowData.id)
                },
                {
                  icon: FeaturedPlayListIcon,
                  tooltip: 'Ver Ficha',
                  onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/ficha/' + rowData.id)
                },
                {
                  icon: 'delete',
                  tooltip: 'Borrar Paciente',
                  onClick: (event, rowData) => this.handleDeleteButton(rowData)

                }]}
                components={{
                  Container: props => (
                    <Paper elevation={0} {...props} />
                  )
                }}

                options={{
                  filtering: true,
                  emptyRowsWhenPaging: false,
                  actionsColumnIndex: -1,
                  exportButton: true,
                  exportAllData:true,
                  exportFileName:"Pacientes " + moment().format("DD-MM-YYYY"),
                  exportDelimiter:";",
                  headerStyle: {
                    backgroundColor: lightGreen[700],
                    color: '#FFF'
                  },
                }}
                />
            </CardBody>
          </Card>

          <Switch>
            <Route path={this.props.match.url + "/nuevopaciente"} render={() =>

              <NewUser

                getPacientesAdmin={() => this.getPacientesAdmin()}
                handleListNewUser={(rowData) => this.handleListNewUser(rowData)}


                />}
              />

            <Route path={this.props.match.url + "/editarpaciente/:idpaciente"} render={() =>


              <EditPaciente
                orderForm={this.state.editPacienteForm}
                editFormIsValid={this.state.editFormIsValid}
                successSubmitEdit={this.state.successSubmitEdit}


                handleSubmitEditPaciente={(event) => { this.handleSubmitEditPaciente(event) } }
                inputEditChangedHandler={(event, inputIdentifier) => this.inputEditChangedHandler(event, inputIdentifier)}
                getUserEdit={(id) => { this.getUserEdit(id) } }
                resetEditForm={this.resetEditForm}
                reloadPacientes={this.reloadPacientes}
                getPacientesAdmin={() => this.getPacientesAdmin()}



                />
              }
              />
              <Route path={this.props.match.url + "/ficha/:idpaciente"} render={() => 


                <Ficha
               
                  orderForm={this.state.editPacienteForm}
                  editFormIsValid={this.state.editFormIsValid}
                  successSubmitEdit={this.state.successSubmitEdit}
                  handleSubmitEditFicha={(event) => {this.handleSubmitEditFicha(event) }}
                  inputEditChangedHandler={(event, inputIdentifier) => this.inputEditChangedHandler(event, inputIdentifier)}
                  getUserEdit={(id) => { this.getUserEdit(id) }}
                  resetEditForm={this.resetEditForm}
                  reloadPaciente={this.reloadPaciente}
                  getPacientesAdmin={() => this.getPacientesAdmin()}
                />
              }
                />
              <Route path={this.props.match.url + "/consultas/nuevoconsulta/:id"} render={() =>

                <NewConsulta

                //getPacientesAdmin={() => this.getPacientesAdmin()}
                //handleListNewUser={(rowData) => this.handleListNewUser(rowData)}


                />}
              />

          </Switch>


        </GridItem>
        <ModalDelete
          openDeleteDialog={this.state.openDeleteDialog}
          deleteRowData={this.state.deleteRowData}
          handleClose={() => this.handleModalClose()}
          handleDelete={(rowData) => this.handleDeletePaciente(rowData)}
          />


      </GridContainer>

    );
  }
}


export default withStyles(styles)(Pacientes);
