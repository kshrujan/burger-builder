import React, {Component} from 'react';
import Modal from '../../Components/UIComponents/Modal/Modal';
import Aux from '../HOC';


//we will send in the WrappedComponent as well as the axios instance that is being used. Since we are sending the axios instance as well, we must change the functional component (commented out) into a class based component.
const withErrorHandler = (WrappedComponent, axios) => {
    return class extends Component {
        //the class in this case is an anonymous class becuse we don't actually use the class. Instead we are calling withErrorHandler which will then create the classes as it's used.

        state = {
            error: null
        };

        //IMPORTANT: We must remember that since this component is a HOC, we can possibly use this as a wrapper for multiple components. This would cause multiple interceptors to be created which at the best case don't cause errors but use memory, and the worst case would lead to errors. Therefore, we should implement the "componentWillUnmount" life cycle hook to remove the request and response interceptor instances. To do so, we need to be able to refer the instances

        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqInterceptor);
            axios.interceptors.response.eject(this.resInterceptor);
        }


        componentWillMount() {
            this.reqInterceptor = axios.interceptors.request.use(req => {
                this.setState({error: null});
                //this is done to make sure that any request made without an error will in fact reset the error to null
                return req;
            });
            this.resInterceptor = axios.interceptors.response.use(response => {
                return response;
            }, error => {
                //in this case, we only care about the second param, which is the error clause. but we still need to return the response like we do above
                console.log(error);
                this.setState({error: error});
            });
        }


        //we had the below before, but we then changed the life cycle to componentWillMount because if you remember the life cycle, first the contrusctor runs, componentWillMount, render, renders children, then componentDidMount. Because we are doing the get call using axios in burgerbuilder in the componentDidMount method, that would have run prior to this and therefore no interceptors are set
        // componentDidMount() {
        //     axios.interceptors.request.use(req => {
        //         this.setState({error: null});
        //         //this is done to make sure that any request made without an error will in fact reset the error to null
        //         return req;
        //     });
        //     axios.interceptors.response.use(response => {
        //         return response;
        //     }, error => {
        //         //in this case, we only care about the second param, which is the error clause. but we still need to return the response like we do above
        //         this.setState({error: error});
        //     });
        // }

        errorConfirmed = () => {
            this.setState({error: null});
        }

        render() {
            return(
                <Aux>
                    <Modal show={this.state.error} close={this.errorConfirmed}>
                        {this.state.error ? this.state.error.message : null /*firebase gives us an message prop to get the actual message*/}
                        
                    </Modal>
                    <WrappedComponent {...this.props} />
                </Aux>
                
            );
        }
    }

    // return (props) => {
    //     return(
    //         <Aux>
    //             <Modal show>
    //                 Something didn't work!
    //             </Modal>
    //             <WrappedComponent {...props} />
    //         </Aux>
            
    //     );
    // }
}

export default withErrorHandler;