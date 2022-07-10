/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons

import ListIcon from '@material-ui/icons/List';
import WebIcon from '@material-ui/icons/Web';
import FourKIcon from '@material-ui/icons/FourK';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import Person from "@material-ui/icons/Person";
import Today from "@material-ui/icons/Today";
import Notes from "@material-ui/icons/Notes";
import DirectionsBike from "@material-ui/icons/DirectionsBike";
import ExposureIcon from '@material-ui/icons/Exposure';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PetsIcon from '@material-ui/icons/Pets';
import HealingIcon from '@material-ui/icons/Healing';
import AssignmentIcon from '@material-ui/icons/Assignment';



// core components/views for Admin layout
import Pages from "views/Pages/Pages.js";
import ItemsMenu from "views/ItemsMenu/ItemsMenu.js";
import Files from "views/Files/Files.js";
import TiposUsuarios from "views/Users/TiposUsuarios.js";
import Users from "views/Users/Users.js";
import Noticias from "views/Noticias/Noticias.js";
import TiposFaltas from 'views/TiposFaltas/TiposFaltas.js';
import Empleados from 'views/Empleados/Empleados.js';
import ControlFaltas from 'views/ControlFaltas/ControlFaltas.js';
import Compensatorios from 'views/Compensatorios/Compensatorios.js';
import CompensatoriosPorEmpleados from 'views/Compensatorios/CompensatoriosPorEmpleados.js';
import FaltasPorEmpleados from 'views/ControlFaltas/FaltasPorEmpleados.js';
import ControlFaltasEmpleados from 'views/ControlFaltasEmpleados/ControlFaltas.js';
import CompensatoriosEmpleados from 'views/CompensatoriosEmpleados/Compensatorios.js';
import Clientes from 'views/Clientes/Clientes.js';
import Pacientes from 'views/Pacientes/Pacientes.js';
import PacientesFull from 'views/Pacientes/PacientesFull.js';
import Clases from 'views/Clases/Clases.js';
import Especies from 'views/Especies/Especies.js';
import Razas from 'views/Razas/Razas.js';
import Patologias from 'views/Patologias/Patologias.js';
import Servicios from 'views/Servicios/Servicios.js';
import Consultas from 'views/Pacientes/Consultas/Consultas.js';
import Signos from 'views/Signos/Signos.js';
import ConsultasAlumnos from 'views/Pacientes/ConsultasAlumnos/ConsultasAlumnos.js';


const dashboardRoutes = [

  {
    show:false,
    accesos: [21],
    groupComponent: true,
    name: 'Páginas',
    open: 'open21',
    icon: WebIcon,
    dependences: [
      {
        show:false,
         accesos: [21],
         path: "/pagesest",
         name: "Estaticas",
         rtlName: "DS",
         icon: WebIcon,
         component: Pages,
         parametros:{
          tipo:'E'
        },
         layout: "/admin"
       },
       {
        show:false,
         accesos: [21],
         path: "/pagesdin",
         name: "Dinamicas",
         rtlName: "DS",
         icon: WebIcon,
         component: Pages,
         parametros:{
          tipo:'D'
        },
         layout: "/admin"
       },
    ]
  },
   
   
   {
    accesos: [200],
    path: "/itemsmenu",
    name: "Menu",
    rtlName: "DS",
    icon: ListIcon,
    component: ItemsMenu,
    layout: "/admin"
  }, 
  
  
  {
    show:false,
    accesos: [31],
    path: "/noticias",
    name: "Noticias",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:1
    },
    layout: "/admin"
  }, 
  {
    show:false,
    accesos: [32],
    path: "/misnoticias",
    name: "Mis Noticias",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:1,
      misNoticias:true
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [61],
    path: "/transparente",
    name: "Transparente",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:4
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [62],
    path: "/mistransparentes",
    name: "Mis Transparente",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:4,
      misNoticias:true
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [71],
    path: "/videoteca",
    name: "Videoteca",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:5,
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [72],
    path: "/mivideoteca",
    name: "Mi Videoteca",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:5
      ,
      misNoticias:true
    },
    layout: "/admin"
  }, 
  {
    show:false,
    accesos: [81],
    path: "/bolsa",
    name: "Bolsa de Trabajo",
    rtlName: "DS",
    icon: Notes,
    component: Noticias,
    parametros:{
      idTipoNoticia:6,
    },
    layout: "/admin"
  }, 

  {
    show:false,
    accesos: [91,92,93,94,95,96,97,98],
    groupComponent: true,
    name: 'Personal',
    open: 'open22',
    icon: Person,
    dependences: [
      {
        show:false,
        accesos: [91],
        path: "/empleados",
        name: "Empleados",
        rtlName: "EM",
        icon: Person,
        component: Empleados,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [92],
        path: "/tiposfaltas",
        name: "Tipos Faltas",
        rtlName: "TF",
        icon: Person,
        component: TiposFaltas,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [93],
        path: "/controlfaltas",
        name: "Control Faltas",
        rtlName: "CF",
        icon: Person,
        component: ControlFaltas,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [94],
        path: "/compensatorios",
        name: "Compensatorios",
        rtlName: "C",
        icon: ExposureIcon,
        component: Compensatorios,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [95],
        path: "/controlfaltasempleados",
        name: "Control Faltas",
        rtlName: "CFE",
        icon: Person,
        component: ControlFaltasEmpleados,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [96],
        path: "/compensatoriosempleados",
        name: "Compensatorios",
        rtlName: "COE",
        icon: ExposureIcon,
        component: CompensatoriosEmpleados,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [97],
        path: "/controlfaltasxempleado",
        name: "Faltas por Empleado",
        rtlName: "FXE",
        icon: Person,
        component: FaltasPorEmpleados,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [98],
        path: "/compensatoriosxempleado",
        name: "Compensatorios por Empleado",
        rtlName: "CXE",
        icon: ExposureIcon,
        component: CompensatoriosPorEmpleados,
        layout: "/admin"
      },
    ]
  },

  {
    show:false,
    accesos: [101, 102, 103, 104, 105, 106, 107, 108, 109, 110],
    groupComponent: true,
    name: 'Hospital',
    open: 'open23',
    icon: LocalHospitalIcon,
    dependences: [
      {
        show:false,
        accesos: [101],
        path: "/clientes",
        name: "Clientes",
        rtlName: "CL",
        icon: Person,
        component: Clientes,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [102],
        path: "/pacientes",
        name: "Pacientes",
        rtlName: "PA",
        icon: PetsIcon,
        component: Pacientes,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [111],
        path: "/pacientesfull",
        name: "Pacientes Full",
        rtlName: "PA",
        icon: PetsIcon,
        component: PacientesFull,
        layout: "/admin"
      },      
      {
        show:false,
        accesos: [105],
        path: "/clases",
        name: "Clases",
        rtlName: "CA",
        icon: PetsIcon,
        component: Clases,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [103],
        path: "/especies",
        name: "Especies",
        rtlName: "ES",
        icon: PetsIcon,
        component: Especies,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [104],
        path: "/razas",
        name: "Razas",
        rtlName: "RZ",
        icon: PetsIcon,
        component: Razas,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [106],
        path: "/patologias",
        name: "Patologias",
        rtlName: "PA",
        icon: HealingIcon,
        component: Patologias,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [109],
        path: "/signos",
        name: "Signos y Sintomas",
        rtlName: "SS",
        icon: HealingIcon,
        component: Signos,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [107],
        path: "/servicios",
        name: "Servicios",
        rtlName: "SE",
        icon: AssignmentIcon,
        component: Servicios,
        layout: "/admin"
      },
      {
        show:false,
        accesos: [108],
        path: "/consultas",
        name: "Consultas",
        rtlName: "CN",
        icon: AssignmentIcon,
        component: Consultas,
        layout: "/admin"
      },     
      {
        show:false,
        accesos: [110],
        path: "/consultasalumnos",
        name: "Consultas Alumnos",
        rtlName: "AL",
        icon: AssignmentIcon,
        component: ConsultasAlumnos,
        layout: "/admin"
      },

    ]
  },

  {
    show:false,
    accesos: [41],
    path: "/actividades",
    name: "Actividades",
    rtlName: "DS",
    icon: DirectionsBike,
    component: Noticias,
    parametros:{
      idTipoNoticia:2
    },
    layout: "/admin"
  },
  {
    show:false,
    accesos: [51],
    path: "/campanas",
    name: "Campañas",
    rtlName: "DS",
    icon: Today,
    component: Noticias,
    parametros:{
      idTipoNoticia:3
    },
    layout: "/admin"
  },  
  /*
  {
    show:false,
    accesos: [],
    groupComponent: true,
    name: 'Multimedia',
    open: 'open20',
    icon: FourKIcon,
    dependences: [
      {
        show:false,
        accesos: [],
        path: "/files",
        name: "Archivos",
        icon: FolderOpenIcon,
        component: Files,
        layout: "/admin"
      },

      


    ]
  },
  */
  {
    show:false,
    accesos: [11,12],
    groupComponent: true,
    name: 'Usuarios',
    open: 'open21',
    icon: Person,
    dependences: [
      {
        show:false,
        accesos: [11],
        path: "/usuarios",
        name: "Usuarios",
        rtlName: "Us",
        icon: Person,
        component: Users,
        layout: "/admin"
      },

      {
        show:false,
        accesos: [12],
        path: "/tiposusuarios",
        name: "Tipos Usuarios",
        rtlName: "Us",
        icon: Person,
        component: TiposUsuarios,
        layout: "/admin"
      },




    ]
  },
  
];


export const breadcrumRoutes = [
  {
    path: "/admin/usuarios",
    name: "Usuarios",
    to: "/admin/usuarios",
    children: [
      {
        path: "/nuevousuario",
        name: "Nuevo",
        to: "/admin/usuarios/nuevousuario"
      },
      {
        path: "/editarusuario",
        name: "Editar",
        to: "/admin/usuarios/editarusuario"
      }
    ]
  }

]

export default dashboardRoutes
