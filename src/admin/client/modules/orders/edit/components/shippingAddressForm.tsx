import { Button } from "@material-ui/core"
import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import { helper, messages } from "../../../../lib"
import style from "./style.module.sass"

const validate = values => {
  const errors = {}
  const requiredFields = []

  requiredFields.map(field => {
    if (values && !values[field]) {
      errors[field] = messages.errors_required
    }
  })

  return errors
}

const getShippingFieldLabel = ({ label, key }) => {
  return label && label.length > 0 ? label : helper.getOrderFieldLabelByKey(key)
}

class ShippingAddressForm extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    let {
      handleSubmit,
      pristine,
      submitting,
      onCancel,
      shippingMethod,
    } = this.props

    let shippingFields = null
    if (
      shippingMethod &&
      shippingMethod.fields &&
      shippingMethod.fields.length > 0
    ) {
      shippingFields = shippingMethod.fields.map((field, index) => {
        const fieldLabel = getShippingFieldLabel(field)

        return (
          <Field
            key={index}
            component={TextField}
            fullWidth={true}
            name={field.key}
            floatingLabelText={fieldLabel}
          />
        )
      })
    }

    return (
      <form onSubmit={handleSubmit}>
        <>
          {shippingFields}
          <Field
            component={TextField}
            fullWidth={true}
            name="city"
            floatingLabelText={messages.city}
          />
          <div className="row">
            <div className="col-xs-6">
              <Field
                component={TextField}
                fullWidth={true}
                name="state"
                floatingLabelText={messages.state}
              />
            </div>
            <div className="col-xs-6">
              <Field
                component={TextField}
                fullWidth={true}
                name="postal_code"
                floatingLabelText={messages.postal_code}
              />
            </div>
          </div>
          <Field
            component={TextField}
            fullWidth={true}
            name="country"
            floatingLabelText={messages.country}
          />
        </>
        <div className={style.shippingButtons}>
          <Button variant="contained" color="primary" onClick={onCancel}>
            {messages.cancel}
          </Button>
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginLeft: 12 }}
            disabled={pristine || submitting}
          >
            {messages.save}
          </Button>
        </div>
      </form>
    )
  }
}

export default reduxForm({
  form: "ShippingAddressForm",
  validate,
  enableReinitialize: true,
})(ShippingAddressForm)
