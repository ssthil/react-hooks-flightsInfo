import React from 'react'
import { Field, reduxForm } from 'redux-form'
import useStyles from './styles';

export interface IRenderedField{
  input: any;
  label: string;
  type: any;
  meta: any;
}
const renderField = ({input, label, type, meta: { touched, error, warning }}: IRenderedField) => (
  <div>
    <div className="control">
      <label className="field">{label}</label>
      <input className="input" {...input} placeholder={label} type={type}/>
      {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const Form = (props: any) => {
//   const { handleSubmit, pristine, reset, submitting } = props
const classes = useStyles();
  return (
    <form className={classes.form}>
       <div className="field">
      <div className="control">
        <Field name="departure" component={renderField} type="text" label="Departure"/>
      </div>
    </div>
    <div className="field">
      <div className="control">
        <Field name="arrival" component={renderField} type="text" label="Arrival"/>
      </div>
    </div>

    <div className="field">
      <div className="control">
        <label className="label">Select cabin type</label>
        <div className="select">
          <Field className="input" name="cabinType" component="select">
            <option />
            <option value="cheap">Cheap</option>
            <option value="business">Business</option>
          </Field>
        </div>
      </div>
    </div>
      
      {/* <div>
        <button type="submit" disabled={pristine || submitting}>Submit</button>
        <button type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
      </div> */}
    </form>
  )
}
// export default Form;
export default reduxForm({
  form: 'simple'  // a unique identifier for this form
})(Form)