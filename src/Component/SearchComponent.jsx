import { timers } from 'jquery';
import React, { Component ,Fragment } from 'react'

class SearchComponent extends Component {
    state = { 
        term:"",
     };

     handleChange = e =>{
         this.setState({[ e.target.name ]: e.target.value})
     }

    handleVoice = e => {
    window.SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    // eslint-disable-next-line no-undef
    let recognition = new SpeechRecognition();
    recognition.addEventListener("result", e => {
      let transcript = e.results[0][0].transcript.replace(/\s/g, "");
      this.setState({ term: transcript });
      e.preventDefault();
      this.handleSubmit();
    });

    recognition.start();
  };

     handleSubmit =e=>{
         try{
            e.preventDefault();
            this.props.onTermSubmit(this.state.term);
         }catch(err){
             console.log(err);
         }
     }
    render() { 
        return ( 
            <Fragment>
                <section className="my-4">
                    <article className="col-md-6 mx-auto">
                        <form onSubmit={this.handleSubmit}>
                            <input type="search" 
                            className="form-control" 
                            name="term" 
                            id="term" 
                            placeholder="enter the github username"
                            value={this.state.term} 
                            onChange={this.handleChange}/>

                            <span className="microphone" onClick={this.handleVoice}>
                                <i class="fa fa-microphone" aria-hidden="flase"></i>
                            </span>
                        </form>
                    </article>
                </section>
            </Fragment>
         );
    }
}
 
export default SearchComponent;
