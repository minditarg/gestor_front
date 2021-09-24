import React, { Component } from "react";
import Database from "variables/Database.js";
import moment from 'moment';

import { Route, Switch, Link, withRouter } from 'react-router-dom';
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
//import Button from "components/CustomButtons/Button.js";
//import AddIcon from '@material-ui/icons/Add';

//import NewUser from "./components/NewFicha";
//import EditFicha from "./components/EditFicha";
import ModalDelete from "./components/ModalDelete";
import { localization } from "variables/general.js";

import { toast } from 'react-toastify';


import { StateListFichas, ColumnsListadoFicha, StateEditPaciente } from "./VariablesState";

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


class Fichas extends Component {
  state = { ...StateListFichas };


  componentDidMount() {
    const pacienteID = this.props.match.params.idpaciente;
    //console.log(this.state);
    console.log("entro");
    console.log(pacienteID);
//  console.log(this.props);
//  console.log(this.props.orderForm);
    this.getFichasAdmin(pacienteID);
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
        this.props.history.push(this.props.match.url + '/nuevoficha');
      }

      if (value === 'editar' && this.state.checked.length === 1) {
        this.setState({
          menuContext: menuContext
        })
        let idUser = this.state.checked[0].id;
        this.props.history.push(this.props.match.url + '/editarficha/' + idUser);
      }
    }
  }

  menuHandleOpen = event => {
    this.setState({
      menuContext: event.currentTarget
    })
  }

  getFichasAdmin = (pacienteID) => {
    this.setState({
      isLoading: true
    })

    Database.get('/list-fichas/' + pacienteID)
      .then(res => {
        let resultado = [...res.result[0]];
        console.log(resultado);
        console.log("TESTING");
        console.log(this);



        resultado = resultado.map(elem => {
          return {
            ...elem,
            fecha_mostrar: (( moment(elem.fecha).isValid()) ? moment(elem.fecha).format("DD/MM/YYYY") : ''),
          }
        })



        // resultado = resultado.map(elem => {
        //   return {
        //     ...elem,
        //     edad: ((elem.edad < 30) ? elem.edad + ' días' : ((elem.edad < 365) ? Math.floor(elem.edad / 30) + ' meses' : Math.floor(elem.edad / 365) + ' años')),
        //     castrado_mostrar: ((elem.castrado == 1) ? 'SI' : 'NO'),
        //   }
        // })

        this.setState({
          isLoading:false,
          fichas: resultado,
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
    this.props.history.push(this.props.match.url + '/editarficha/' + value);
  }

  handlePagination = offset => {
    this.setState({
      offset: offset
    })

  }

  handleDeleteFicha = rowData => {
    console.log(rowData);
    Database.post('/delete-ficha', { id: rowData.id },this).then(res => {
        let fichas = [...this.state.fichas]
        fichas = fichas.filter(elem => {
          if (elem.id === rowData.id)
            return false;

          return true

        })

        this.setState({
          fichas: fichas,
          openDeleteDialog:false
        },()=>{
          toast.success("El ficha se ha eliminado con exito!");
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
    //  if (this.props.match.url !== this.props.location.pathname) {
    //    style = { display: 'none' }
    //  }
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card style={style}>
            <CardHeader color="primary">
              <h4 className={this.props.classes.cardTitleWhite} >Fichas</h4>
              <p className={this.props.classes.cardCategoryWhite} >
                Listado de Fichas
                      </p>
            </CardHeader>
            <CardBody>
              <MaterialTable
                isLoading={this.state.isLoading}
                columns={ColumnsListadoFicha}
                data={this.state.fichas}
                title=""
                localization={localization}

                actions={[{
                  icon: 'edit',
                  tooltip: 'Editar Ficha',
                  onClick: (event, rowData) => this.props.history.push(this.props.match.url + '/editarficha/' + rowData.id)
                },
                {
                  icon: 'delete',
                  tooltip: 'Borrar Ficha',
                  onClick: (event, rowData) => this.handleDeleteButton(rowData)

                }]}
                components={{
                  Container: props => (
                    <Paper elevation={0} {...props} />
                  )
                }}

                options={{
                  actionsColumnIndex: -1,
                  exportButton: true,
                  exportAllData:true,
                  exportFileName:"Fichas " + moment().format("DD-MM-YYYY"),
                  exportDelimiter:";",
                  headerStyle: {
                    backgroundColor: lightGreen[700],
                    color: '#FFF'
                  },
                }}
                />
            </CardBody>
          </Card>

          {/* <Switch>
            <Route path={this.props.match.url + "/nuevoficha"} render={() =>

              <NewUser

                getFichasAdmin={() => this.getFichasAdmin()}
                handleListNewUser={(rowData) => this.handleListNewUser(rowData)}


                />}
              />

            <Route path={this.props.match.url + "/editarficha/:idficha"} render={() =>

              <EditFicha
                orderForm={this.state.editFichaForm}
                editFormIsValid={this.state.editFormIsValid}
                successSubmitEdit={this.state.successSubmitEdit}


                handleSubmitEditFicha={(event) => { this.handleSubmitEditFicha(event) } }
                inputEditChangedHandler={(event, inputIdentifier) => this.inputEditChangedHandler(event, inputIdentifier)}
                getUserEdit={(id) => { this.getUserEdit(id) } }
                resetEditForm={this.resetEditForm}
                reloadFichas={this.reloadFichas}
                getFichasAdmin={() => this.getFichasAdmin()}



                />}
              />
              <Route
              path={
                this.props.match.url + "/ficha/:fichaId"
              }
              render={() => (
                <Ficha
                  orderForm={this.state.editCitacionForm}
                  editFormIsValid={this.state.editFormIsValid}
                  successSubmitEdit={this.state.successSubmitEdit}
                  handleSubmitEditCitacion={event => {
                    this.handleSubmitEditCitacion(event);
                  }}
                  inputEditChangedHandler={(event, inputIdentifier) =>
                    this.inputEditChangedHandler(event, inputIdentifier)
                  }
                  getUserEdit={id => {
                    this.getUserEdit(id);
                  }}
                  resetEditForm={this.resetEditForm}
                  reloadCitacion={this.reloadCitacion}
                  getCitacionAdmin={() => this.getCitacionAdmin()}
                />
              )}
                />
              <Route path={this.props.match.url + "/consultas/nuevoconsulta/:id"} render={() =>

                <NewConsulta

                //getFichasAdmin={() => this.getFichasAdmin()}
                //handleListNewUser={(rowData) => this.handleListNewUser(rowData)}


                />}
              />

          </Switch> */}


        </GridItem>
        <ModalDelete
          openDeleteDialog={this.state.openDeleteDialog}
          deleteRowData={this.state.deleteRowData}
          handleClose={() => this.handleModalClose()}
          handleDelete={(rowData) => this.handleDeleteFicha(rowData)}
          />


      </GridContainer>

    );
  }
}


export default withRouter(withStyles(styles)(Fichas));
