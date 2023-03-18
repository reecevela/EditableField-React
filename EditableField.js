import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import uniqid from 'uniqid';
import '../styles/EditableField.css'

export default class EditableField extends React.Component {
    constructor(props) {
        super(props);
        // Initialize the state with a unique ID, the text from the props, and the editing state.
        this.state = {
            id: uniqid(),
            text: props.text,
            editing: false,
            children: "" // An empty string to store children
        };
        // Create a reference to the input element
        this.inputRef = React.createRef();
    }

    // Update the state with the children when the component is mounted
    componentDidMount() {
        this.setState({children: this.props.children});
    }

    // Toggle the editing state
    toggleEdit = () => {
        if (this.state.editing) {
            this.setState({editing: false});
        } else {
            this.setState({editing: true});
        }
    }

    // Handle the key press event
    handleKeyPress = (e) => {
        // If the enter key is pressed and the input is in focus, toggle editing off
        if ((e.key === "Enter" || e.keyCode === 13) && this.inputRed.current === document.activeElement) {
            this.setState({editing: false});
        }
    };

    // Handle the input change event
    handleChange = (e) => {
        // If the enter key is pressed, toggle editing off
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.setState({editing: false});
            return
        }
        // Update the text state with the new value
        const text = e.target.value;
        this.setState({text: text});
    }
    
    render() {
        const { id, text, editing } = this.state;
        const { element } = this.props;
        if (this.props.children) {
            // If the component has children, render them with the specified element type
            // Mostly used for div's, ul's, etc.
            return (
                <div>
                    {React.createElement(
                        element, 
                        {},
                        React.Children.map(this.props.children, (child) => {
                            // Clone the child with the ID prop
                            return React.cloneElement(child, { id });
                        })
                    )}
                </div>
            )
        }
        if (editing) {
            // If the component is in editing mode, render an input field and a check icon
            return (
                <div className="editable-field">
                    <input 
                        ref={this.inputRef}
                        type="text" 
                        value={text} 
                        onChange={this.handleChange} 
                        onKeyPress={this.handleChange}
                        id={id}
                    />
                    <FontAwesomeIcon icon={faCheckCircle} onClick={this.toggleEdit} />
                </div>
            )
        } else {
            // If the component is not in editing mode, render the text and an edit icon
            return (
                <div className="editable-field">
                    {React.createElement(element, {}, text)}
                    <FontAwesomeIcon icon={faEdit} onClick={this.toggleEdit} />
                </div>
            )
        }
    }
}
