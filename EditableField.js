import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import uniqid from 'uniqid';
import './EditableField.css'

export default class EditableField extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: uniqid(),
            text: props.text,
            editing: false
        };
        this.inputRef = React.createRef();
    }

    toggleEdit = () => {
        if (this.state.editing) {
            this.setState({editing: false});
        } else {
            this.setState({editing: true});
        }
    }

    handleKeyPress = (e) => {
        if ((e.key === "Enter" || e.keyCode === 13) && this.inputRed.current === document.activeElement) {
            this.setState({ editing: false });
        }
    };

    handleChange = (e) => {
        if (e.key === 'Enter' || e.keyCode === 13) {
            this.setState({editing: false});
            return
        }
        const text = e.target.value;
        this.setState({text: text});
    }
    
    render() {
        const { id, text, editing } = this.state;
        const { element } = this.props;

        if (editing) {
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
                    <FontAwesomeIcon icon={faCheckCircle} onClick={this.toggleEdit} size="2x"/>
                </div>
            )
        } else {
            return (
                <div className="editable-field">
                    {React.createElement(element, {}, text)}
                    <FontAwesomeIcon icon={faEdit} onClick={this.toggleEdit} />
                </div>
            )
        }
    }
}