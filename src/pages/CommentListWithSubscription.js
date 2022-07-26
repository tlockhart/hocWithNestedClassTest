import {Component} from "react";
import CommentList from "./CommentList";
import data from "../utils/data";
import modelClass from "../utils/Model"

const model = new modelClass(data);

// Create a CommentList component with a withSubscription function
// First parameter is a wrapped component,  the second retrieves the data
const CommentListWithSubscription = withSubscription(
    CommentList,
    (model) => {
        return model.data;
    }
  );

  // This function takes a component and return a new component
  // with a data state variable
function withSubscription(WrappedComponent, selectedData) {
    // ...and returns another component...
    return class extends Component {
      constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
          data: selectedData(data, props)
        };
      }
  
      componentDidMount() {
        // ... that takes care of the subscription...
        // DataSource.addChangeListener(this.handleChange);
        this.handleChange();
      }
  
      componentWillUnmount() {
        // DataSource.removeChangeListener(this.handleChange);
      }
  
      handleChange() {
        this.setState({
          data: selectedData(data, this.props)
        });
      }
  
      render() {
        // ... and renders the wrapped component with the fresh data!
        // Notice that we pass through any additional props
        return <WrappedComponent data={this.state.data} {...this.props} />;
      }
    };
  }
  export default CommentListWithSubscription ;