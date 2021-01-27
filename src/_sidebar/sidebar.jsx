import React from 'react';
import { Router, Link, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { ProfilePage } from '../_components/ProfilePage';
import './style.scss';

class SideBar extends React.Component {
    constructor(props) {
        super(props);

        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });

    }
    componentDidMount () {
        $('#body-row .collapse').collapse('hide'); 
        // Collapse/Expand icon
        $('#collapse-icon').addClass('fa-angle-double-left'); 
        // Collapse click
        $('[data-toggle=sidebar-colapse]').click(function() {
            $('.menu-collapsed').toggleClass('d-none');
            $('.sidebar-submenu').toggleClass('d-none');
            $('.submenu-icon').toggleClass('d-none');
            $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
            
            // Treating d-flex/d-none on separators with title
            var SeparatorTitle = $('.sidebar-separator-title');
            if ( SeparatorTitle.hasClass('d-flex') ) {
                SeparatorTitle.removeClass('d-flex');
            } else {
                SeparatorTitle.addClass('d-flex');
            }
            
            // Collapse/Expand icon
            $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
       });
    }
  
     SidebarCollapse () {
        $('.menu-collapsed').toggleClass('d-none');
        $('.sidebar-submenu').toggleClass('d-none');
        $('.submenu-icon').toggleClass('d-none');
        $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');
        
        // Treating d-flex/d-none on separators with title
        var SeparatorTitle = $('.sidebar-separator-title');
        if ( SeparatorTitle.hasClass('d-flex') ) {
            SeparatorTitle.removeClass('d-flex');
        } else {
            SeparatorTitle.addClass('d-flex');
        }
        
        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
    }

    render() {
        const { alert, user } = this.props;
        const marginLeft={'margin-right':'0px'};
        const height={ 'height': '50px'};
        const converted = {
            "#body-row": { marginLeft: "0", marginRight: "0" },
            "#sidebar-container": {
              minHeight: "100vh",
              backgroundColor: "#333",
              padding: "0"
            },
            ".sidebar-expanded": { width: "230px" },
            ".sidebar-collapsed": { width: "60px" },
            "#sidebar-container .list-group a": { height: "50px", color: "white" },
            "#sidebar-container .list-group .sidebar-submenu a": {
              height: "45px",
              paddingLeft: "30px"
            },
            ".sidebar-submenu": { fontSize: "0.9rem" },
            ".sidebar-separator-title": { backgroundColor: "#333", height: "35px" },
            ".sidebar-separator": { backgroundColor: "#333", height: "25px" },
            ".logo-separator": { backgroundColor: "#333", height: "60px" },
            '#sidebar-container .list-group .list-group-item[aria-expanded="false"] .submenu-icon::after': {
              content: '" \\f0d7"',
              fontFamily: "FontAwesome",
              display: "inline",
              textAlign: "right",
              paddingLeft: "10px"
            },
            '#sidebar-container .list-group .list-group-item[aria-expanded="true"] .submenu-icon::after': {
              content: '" \\f0da"',
              fontFamily: "FontAwesome",
              display: "inline",
              textAlign: "right",
              paddingLeft: "10px"
            }
          };
          
        return (
     <div>
        {/* Bootstrap NavBar */}
        <nav className="navbar navbar-expand-md navbar-dark bg-primary" style={height}>
          <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <a className="navbar-brand" href="#">
            <img src="src/public/img/music.png" width={40} height={30} className="d-inline-block align-top" alt="" />
            <span className="menu-collapsed">Raley</span>
          </a>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ml-auto">
              {/* <li className="nav-item active">
                <a className="nav-link" href="#top">Home <span className="sr-only">(current)</span></a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#top">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#top">Pricing</a>
              </li> */}
              <li class="nav-item dropdown active" style={marginLeft}>
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                   <span>{user.firstName+" "+user.lastName+" "}</span>
                   <img src="src/public/img/admin.png" width={30} height={30} className="d-inline-block align-top" alt="" />
               </a>
              <div class="dropdown-menu" aria-labelledby="navbarDropdown">
               <a class="dropdown-item"><Link to="/home/profile">Profile</Link></a>
               <a class="dropdown-item"><Link to="/login">Logout</Link></a>
               {/* <div class="dropdown-divider"></div>
                 <a class="dropdown-item" href="#">Something else here</a> */}
              </div>
              
              
            </li>
              {/* This menu is hidden in bigger devices with d-sm-none. 
           The sidebar isn't proper for smaller screens imo, so this dropdown menu can keep all the useful sidebar itens exclusively for smaller screens  */}
              {/* <li className="nav-item dropdown d-sm-block d-md-none">
                <a className="nav-link dropdown-toggle" href="#" id="smallerscreenmenu" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Menu </a>
                <div className="dropdown-menu" aria-labelledby="smallerscreenmenu">
                  <a className="dropdown-item" href="#top">hjsahgjsa</a>
                  <a className="dropdown-item" href="#top">Profile</a>
                  <a className="dropdown-item" href="#top">Tasks</a>
                  <a className="dropdown-item" href="#top">Etc ...</a>
                </div>
              </li>Smaller devices menu END */}
            </ul>
          </div>
        </nav>{/* NavBar END */}
        {/* Bootstrap row */}
        <div className="row" id="body-row" >
          {/* Sidebar */}
          <div id="sidebar-container" className="sidebar-expanded d-none d-md-block">
            {/* d-* hiddens the Sidebar in smaller devices. Its itens can be kept on the Navbar 'Menu' */}
            {/* Bootstrap List Group */}
            <ul className="list-group">
              {/* Separator with title */}
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>MAIN MENU</small>
              </li>
              {/* /END Separator */}
              {/* Menu with submenu */}
              <a href="#submenu1" data-toggle="collapse" aria-expanded="false" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-dashboard fa-fw mr-3" />
                  <span className="menu-collapsed">Dashboard</span>
                  <span className="submenu-icon ml-auto" />
                </div>
              </a>
              {/* Submenu content */}
              <div id="submenu1"  className="collapse sidebar-submenu">
                <a href="#" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed">Charts</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed">Reports</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed">Tables</span>
                </a>
              </div>
              <a href="#submenu2" data-toggle="collapse" aria-expanded="false" className="bg-dark list-group-item list-group-item-action flex-column align-items-start">
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-user fa-fw mr-3" />
                  <span className="menu-collapsed">Profile</span>
                  <span className="submenu-icon ml-auto" />
                </div>
              </a>
              {/* Submenu content */}
              <div id="submenu2" className="collapse sidebar-submenu">
                <a href="#" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed">Settings</span>
                </a>
                <a href="#" className="list-group-item list-group-item-action bg-dark text-white">
                  <span className="menu-collapsed">Password</span>
                </a>
              </div>
              <a href="#" className="bg-dark list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-tasks fa-fw mr-3" />
                  <span className="menu-collapsed">Tasks</span>
                </div>
              </a>
              {/* Separator with title */}
              <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                <small>OPTIONS</small>
              </li>
              {/* /END Separator */}
              <a href="#" className="bg-dark list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-calendar fa-fw mr-3" />
                  <span className="menu-collapsed">Calendar</span>
                </div>
              </a>
              <a href="#" className="bg-dark list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-envelope-o fa-fw mr-3" />
                  <span className="menu-collapsed">Messages <span className="badge badge-pill badge-primary ml-2"></span></span>
                </div>
              </a>
              {/* Separator without title */}
              <li className="list-group-item sidebar-separator menu-collapsed" />
              {/* /END Separator */}
              <a href="#" className="bg-dark list-group-item list-group-item-action">
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span className="fa fa-question fa-fw mr-3" />
                  <span className="menu-collapsed">Help</span>
                </div>
              </a>
              <a href="#top" data-toggle="sidebar-colapse" className="bg-dark list-group-item list-group-item-action d-flex align-items-center">
                <div className="d-flex w-100 justify-content-start align-items-center">
                  <span id="collapse-icon" className="fa fa-2x mr-3" />
                  <span id="collapse-text" className="menu-collapsed">Collapse</span>
                </div>
              </a>
            </ul>{/* List Group END*/}
          </div>{/* sidebar-container END */}
          {/* MAIN */}
          <div className="col p-4">
          {alert.message &&
                         <div className={`alert ${alert.type}`}>{alert.message}</div>
                     }
          <Router history={history}>
                         <Switch>
                             <PrivateRoute exact path="/home" component={HomePage} />
                             <PrivateRoute exact path="/" component={ProfilePage} />
                             {/* <Route path="/login" component={LoginPage} />
                             <Route path="/register" component={RegisterPage} /> */}
                             <Redirect from="*" to="/" />
                         </Switch>
          </Router>
          </div>{/* Main Col END */}
        </div>{/* body-row END */}
      </div>
     
     );
    }
   
}

function mapState(state) {
    const { alert,authentication } = state;
    const { user } = authentication;
    return { alert, user};
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedSideBar = connect(mapState, actionCreators)(SideBar);
export { connectedSideBar as SideBar };