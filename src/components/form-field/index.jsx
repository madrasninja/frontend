import React, { Component } from "react";
import { Field } from "redux-form";
import {
    Input
} from 'reactstrap';

import "./style.scss";

class FormField extends Component {

    generateComponent = (field) => {
        if (field.type === 'select') {
            let optionList = _.map(field.list, (data, index) => {
                return (
                    <option value={data[field.keyword]} key={index}>
                        {data[field.label]}
                    </option>
                );
            })
            return (
                <div>
                    <Input type="select" disabled={field.disable} className={field.meta.touched && field.meta.error ? 'input-error' : ''} {...field.input}>
                        <option value="">Select {field.placeholder}</option>
                        {optionList}
                    </Input>
                    {
                        field.meta.error && field.meta.touched ?
                            <div className="error">
                                <span className="icon">!</span>
                                <span className="message">{field.meta.error}</span>
                            </div>
                            : ''
                    }
                </div>
            )
        } else {
            return (
                <div>
                    <Input
                        type={field.type}
                        placeholder={field.placeholder}
                        {...field.input}
                        className={field.meta.touched && field.meta.error ? 'input-error' : ''}
                    />
                    {
                        field.meta.error && field.meta.touched ?
                            <div className="error">
                                <span className="icon">!</span>
                                <span className="message">{field.meta.error}</span>
                            </div>
                            : ''
                    }
                </div>
            );
        }
    }

    render() {
        return (
            <Field {...this.props}
                component={this.generateComponent}
            />
        );
    }
}

export default FormField;