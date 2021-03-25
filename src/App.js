import React, { Component, Fragment } from 'react';
import SearchComponent from "./Component/SearchComponent"
import axios from "axios";
import DisplayGitUsers from './Component/DisplayGitUsers';

class App extends Component {
    state = { 
        term:"",
        reposData:"",
        loading : false,
     }

    onTermSubmit =async term =>{
        let client_id="Iv1.8a414b761ab79f50";
        let client_secret="746a3d07634a283763fe2af3d72f6376287d5c95";
        let response = await axios.get(`https:api.github.com/users/${term}?Client_Secret${client_secret}`);

        let repos=await axios.get(`https:api.github.com/users/${term}/repos?Client_Secret${client_secret}`);

        this.setState({term:response.data , reposData:repos , loading : true })
    };
    
    render() { 
        return ( 
            <Fragment>
                <SearchComponent onTermSubmit={this.onTermSubmit}/>
                <section className="container my-2">
                    <hr className="hr"/>
                    <DisplayGitUsers users={this.state.term} 
                    repos={this.state.reposData}
                    loading ={this.state.loading}/>
                </section>
            </Fragment>
         );
    }
}
 
export default App;