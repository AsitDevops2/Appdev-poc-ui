import React from 'react';
import { Router, Route, Switch, Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import './style.scss';
import { history } from '../_helpers';
import { alertActions } from '../_actions';
import { PrivateRoute } from '../_components';
import { HomePage } from '../HomePage';
import { LoginPage } from '../LoginPage';
import { RegisterPage } from '../RegisterPage';
import { ResetPasswordPage } from '../ResetPwdPage';
import { AddUser, EditPage, UserList, ProductList,  AddProduct, UpdateProduct, AddCategory ,CategoryList, EditProduct} from '../_components/index';
import { ProfilePage } from '../_components/ProfilePage/ProfilePage';
import { ChartPage } from '../_components/ChartPage/ChartPage';



class App extends React.Component {
    constructor(props) {
        super(props);
        history.listen((location, action) => {
            // clear alert on location change
            this.props.clearAlerts();
        });
    }

   
   
    componentDidMount() {
        if (!localStorage.getItem('user')) {
            history.push('/login');
        }
        $('#body-row .collapse').collapse('hide');
        // Collapse/Expand icon
        $('#collapse-icon').addClass('fa-angle-double-left');
        // Collapse click
        $('[data-toggle=sidebar-colapse]').click(function () {
            $('.menu-collapsed').toggleClass('d-none');
            $('.sidebar-submenu').toggleClass('d-none');
            $('.submenu-icon').toggleClass('d-none');
            $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');

            // Treating d-flex/d-none on separators with title
            var SeparatorTitle = $('.sidebar-separator-title');
            if (SeparatorTitle.hasClass('d-flex')) {
                SeparatorTitle.removeClass('d-flex');
            } else {
                SeparatorTitle.addClass('d-flex');
            }

            // Collapse/Expand icon
            $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
        });
    }

    SidebarCollapse() {
        $('.menu-collapsed').toggleClass('d-none');
        $('.sidebar-submenu').toggleClass('d-none');
        $('.submenu-icon').toggleClass('d-none');
        $('#sidebar-container').toggleClass('sidebar-expanded sidebar-collapsed');

        // Treating d-flex/d-none on separators with title
        var SeparatorTitle = $('.sidebar-separator-title');
        if (SeparatorTitle.hasClass('d-flex')) {
            SeparatorTitle.removeClass('d-flex');
        } else {
            SeparatorTitle.addClass('d-flex');
        }

        // Collapse/Expand icon
        $('#collapse-icon').toggleClass('fa-angle-double-left fa-angle-double-right');
    }
    onClick() {
        history.push("/login");
        
        window.location.reload();
    }

    onProfile(){
        var { user } = this.props;
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
          }
        //  history.push(`/profile/${user.id}`);
    }
    render() {
        var { alert, user } = this.props;
        var loggingIn = false;
        const marginLeft = { 'margin-right': '0px' };
        const height = { 'height': '50px' };
        if (localStorage.getItem('user')) {
            user = JSON.parse(localStorage.getItem('user'));
            loggingIn = true;
        }
        return (

            <div>
                { !loggingIn &&
                    <div>
                        {alert.message && !loggingIn &&
                            <div className={`alert ${alert.type}`}>{alert.message}</div>
                        }
                        <Router history={history}>
                            <Switch>
                                {/* <PrivateRoute exact path="/" component={HomePage} /> */}
                                {/* + 
                                                            <PrivateRoute exact path="/home" component={SideBar} /> */}
                                <PrivateRoute path="/home" component={HomePage} />
                                <Route path="/login" component={LoginPage} />
                                <Route path="/register" component={RegisterPage} />
                                <Route path="/resetPwd" component={ResetPasswordPage} />
                                <Route path="/editPage" component={EditPage}/>
                                <Route path="/addUser" component={AddUser}/>
                                <Route path="/productList" component={ProductList}/>
                                <Route path="/updateProduct" component={UpdateProduct}/>
                                <Route path="/addProduct" component={AddProduct}/>   
                                <Route path="/chart" component={ChartPage}/>                             
                                <Route path="/category" component={CategoryList}/>
                                <Route path="/addCategory" component={AddCategory}/>
                                <Route path="/editProduct" component={EditProduct}/>
                                <Redirect from="*" to="/" />
                            </Switch>
                        </Router>
                    </div>
                }
                { loggingIn &&

                    <div>
                        
                        <Router history={history}>

                            {/* Bootstrap NavBar */}
                            <nav className="navbar navbar-expand-md navbar-dark bg-primary" style={height}>
                                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <a className="navbar-brand" href="#">
                                    <img src="../src/public/img/music.png" width={40} height={30} className="d-inline-block align-top" alt="" />
                                    <span className="menu-collapsed">Raley</span>
                                </a>
                                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                    <ul className="navbar-nav ml-auto">

                                        <li class="nav-item dropdown active" style={marginLeft}>
                                            <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <span>{user.firstName + " " + user.lastName + " "}</span>
                                                <img src="../src/public/img/admin.png" width={30} height={30} className="d-inline-block align-top" alt="" />
                                            </a>
                                            <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                                                <a class="dropdown-item"><Link onClick={this.onProfile.bind(this)} to={{pathname: `/editPage/${user.id}`}}>Profile</Link></a>
                                                <a class="dropdown-item"><Link onClick={this.onClick} to='/login'>Logout</Link></a>

                                            </div>


                                        </li>

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
                                        {/* <li className="list-group-item sidebar-separator-title text-muted d-flex align-items-center menu-collapsed">
                                            <small>MAIN MENU</small>
                                        </li> */}
                                        {/* /END Separator */}
                                        {/* Menu with submenu */}
                                        <a href="/home" className="bg-primary list-group-item list-group-item-action">
                                                <div className="d-flex w-100 justify-content-start align-items-center">
                                                    <span className="fa fa-home fa-fw mr-3" />
                                                    <span className="menu-collapsed">Home</span>
                                                </div>
                                        </a>

                                        <a href="#submenu1" data-toggle="collapse" aria-expanded="false" className="bg-primary list-group-item list-group-item-action flex-column align-items-start">
                                            <div className="d-flex w-100 justify-content-start align-items-center">
                                                <span className="fa fa-dashboard fa-fw mr-3" />
                                                <span className="menu-collapsed">Dashboard</span>
                                                <span className="submenu-icon ml-auto" />
                                            </div>
                                        </a>
                                        {/* Submenu content */}
                                        <div id="submenu1" className="collapse sidebar-submenu">
                                            <a href="/chart" className="list-group-item list-group-item-action bg-primary text-white">
                                                <span className="menu-collapsed">Charts</span>
                                            </a>
                                            {/* /chart */}
                                        </div>

                                        {/* Submenu content */}
                                        <div id="submenu2" className="collapse sidebar-submenu">
                                            <a href="#" className="list-group-item list-group-item-action bg-primary text-white">
                                                <span className="menu-collapsed">Settings</span>
                                            </a>
                                            <a href="#" className="list-group-item list-group-item-action bg-primary text-white">
                                                <span className="menu-collapsed">Password</span>
                                            </a>
                                        </div>
                                        <a href="#" className="bg-primary list-group-item list-group-item-action">
                                            <div className="d-flex w-100 justify-content-start align-items-center">
                                                <span className="fa fa-tasks fa-fw mr-3" />
                                                <span className="menu-collapsed">Tasks</span>
                                            </div>
                                        </a>
                                        <div id="submenu3" className="collapse sidebar-submenu">
                                            <a href="#" className="list-group-item list-group-item-action bg-primary text-white">
                                                <span className="menu-collapsed">Charts</span>
                                            </a>

                                        </div>
                                        <a href="#submenu4" data-toggle="collapse" aria-expanded="false" className="bg-primary list-group-item list-group-item-action flex-column align-items-start">
                                            <div className="d-flex w-100 justify-content-start align-items-center">
                                                <span className="fa fa-user fa-fw mr-3" />
                                                <span className="menu-collapsed">Inventory</span>
                                                <span className="submenu-icon ml-auto" />
                                            </div>
                                        </a>
                                        {/* Submenu content */}
                                        <div id="submenu4" className="collapse sidebar-submenu">
                                            <a href="/productList" className="list-group-item list-group-item-action bg-primary text-white">
                                                <span className="menu-collapsed">Product List</span>
                                            </a>
                                            <a href="/category" className="list-group-item list-group-item-action bg-primary text-white">
                                                <span className="menu-collapsed">Category</span>
                                            </a>

                                        </div>                                      

                                        {(user.role=='admin') &&
                                            <a href="/user" className="bg-primary list-group-item list-group-item-action">
                                                <div className="d-flex w-100 justify-content-start align-items-center">
                                                    <span className="fa fa-tasks fa-fw mr-3" />
                                                    <span className="menu-collapsed">User List</span>
                                                </div>
                                            </a>
                                        }

                                        <li className="list-group-item sidebar-separator menu-collapsed" />
                                        {/* /END Separator */}
                                        <a  className="bg-primary list-group-item list-group-item-action">
                                            <div className="d-flex w-100 justify-content-start align-items-center">
                                                <span className="fa fa-question fa-fw mr-3" />
                                                <span className="menu-collapsed">Help</span>
                                            </div>
                                        </a>
                                        <a data-toggle="sidebar-colapse" className="bg-primary list-group-item list-group-item-action d-flex align-items-center">
                                            <div className="d-flex w-100 justify-content-start align-items-center">
                                                <span id="collapse-icon" className="fa fa-2x mr-3" />
                                                <span id="collapse-text" className="menu-collapsed">Collapse</span>
                                            </div>
                                        </a>



                                    </ul>{/* List Group END*/}
                                </div>{/* sidebar-container END */}
                                {/* MAIN */}
                                <div className="col p-4">
                                        {/* <h5>Welcome <span>{user.firstName + " " + user.lastName + " "}</span></h5> */}
                                    {alert.message &&
                                        <div className={`alert ${alert.type}`}>{alert.message}</div>
                                    }

                                    <Switch>
                                        <PrivateRoute path="/profile/:id" component={ProfilePage} />
                                        <PrivateRoute path="/home" component={HomePage} />
                                        <PrivateRoute path="/user" component={UserList}/>
                                        <Route path="/login" component={LoginPage} />
                                        {/* <Redirect from="*" to="/" /> */}
                                        {(user.role=='admin') &&
                                            <Route path="/user" component={UserList}/>
                                        }
                                        
                                        <Route path="/addUser" component={AddUser}/>
                                        <Route path="/editPage" component={EditPage}/>
                                        <Route path="/register" component={RegisterPage} />
                                        <Route path="/resetPwd" component={ResetPasswordPage} />
                                        <Route path="/productList" component={ProductList}/>
                                        <Route path="/updateProduct" component={UpdateProduct}/>
                                        <Route path="/addProduct" component={AddProduct}/>
                                        <Route path="/chart" component={ChartPage}/>
                                        <Route path="/category" component={CategoryList}/>
                                        <Route path="/addCategory" component={AddCategory}/>
                                        <Route path="/editProduct" component={EditProduct}/>
                                        
                                        {(user.role=='admin') &&
                                            <Redirect from="*" to="/user" />
                                        }
                                        {(user.role=='normal') &&
                                            // <Redirect from="*" to='/profile/:id'/>
                                            <Redirect from="*" onClick={this.onProfile.bind(this)} to={{pathname: `/editPage/${user.id}`}}/>
                                        }
                                        
                                     
                                    </Switch>

                                </div>{/* Main Col END */}
                            </div>{/* body-row END */}
                        </Router>
                    </div>
                }


            </div>


        );
    }
    
}

function mapState(state) {
    const { alert } = state;
    return { alert };
}

const actionCreators = {
    clearAlerts: alertActions.clear
};

const connectedApp = connect(mapState, actionCreators)(App);
export { connectedApp as App };