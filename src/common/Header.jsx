import React, { Component,Fragment, Suspense } from 'react';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useParams,
    useLocation,
    withRouter
    } from "react-router-dom";

import axios from 'axios';    

import Nav from './Nav';

const LoginUser = React.lazy(()=>import('../component/LoginUser'));
const LoginSeller = React.lazy(()=>import('../component/LoginSeller'));
const LoginEmployee = React.lazy(()=>import('../component/LoginEmployee'));
const RegUser = React.lazy(()=>import('../component/RegUser'));
const RegSeller = React.lazy(()=>import('../component/RegSeller'));
const VerifyEmail = React.lazy(()=>import('../component/VerifyEmail'));
const EditEmp = React.lazy(()=>import('../component/EditEmp'));
const ChangeEmp = React.lazy(()=>import('../component/ChangeEmp'));
const ProductTypeAdd = React.lazy(()=>import('../component/ProductTypeAdd'));
const ProductBrandAdd = React.lazy(()=>import('../component/ProductBrandAdd'));
const MainVerfSeller = React.lazy(()=>import('../component/MainVerfSeller'));
const VerifySeller = React.lazy(()=>import('../component/VerifySeller'));

export class Header extends Component {
    constructor(){
        super();
        this.state = {
            image : '',
            slno : '',
            role : ''
        }
    }
    
    BootstrapSpinnerLoader = ()=> {
        return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh', width: '100vw' }}>
            <div class="spinner-grow text-danger" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-warning" role="status">
                <span class="sr-only">Loading...</span>
            </div>
            <div class="spinner-grow text-info" role="status">
                <span class="sr-only">Loading...</span>
            </div>
        </div>
        );
    }

    async componentDidMount(){

        if(localStorage.getItem('slno')){
            try{
                const response = await axios.get(`/amilogged/${localStorage.getItem('token')}`,{
                    'headers' : {
                        'Content-Type' : 'application/json'
                    }
                });
                if(response.status === 200){
                    if(response.data.message == 'Yes'){
                        
                        this.setState({
                            image : localStorage.getItem('image'),
                            slno : localStorage.getItem('slno'),
                            role : localStorage.getItem('role')
                        
                        });
                        console.log(this.state)
                    }else if(response.data.message == 'No'){
                        
                        localStorage.clear();
                    }
                }
            }catch(error){
                console.log(error)
            }
            
        }

    }

    render() {


        return (
            <Router>
                <Fragment>
                    <Nav />

                    <Suspense fallback={this.BootstrapSpinnerLoader()}>
                        <switch>
                            <Route exact path='/loginUser' component={()=>(<LoginUser />)} />
                            <Route exact path='/loginSeller' component={()=>(<LoginSeller />)} />
                            <Route exact path='/loginEmployee' component={()=>(<LoginEmployee />)} />
                            <Route exact path='/regUser' component={()=>(<RegUser />)} />
                            <Route exact path='/regSeller' component={()=>(<RegSeller/>)} />
                            <Route exact path='/verifyEmail' component={()=>(<VerifyEmail/>)} />
                            <Route exact path='/editEmp' component={()=>(<EditEmp />)} />
                            <Route exact path='/changeEmp/:empSlno' component={(props)=>(<ChangeEmp {...props}/>)} />
                            <Route exact path='/productTypeAdd' component={()=>(<ProductTypeAdd />)} />
                            <Route exact path='/productBrandAdd' component={()=>(<ProductBrandAdd />)} />
                            <Route exact path='/verfSellerAll' component={()=>(<MainVerfSeller />)} />
                            <Route exact path='/verfSeller/:sellerSln' component={(props)=>(<VerifySeller {...props}/>)} />

                        </switch>
                    </Suspense>

                </Fragment>
            </Router>
            
        )
    }
}

export default Header
