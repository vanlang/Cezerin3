import { Paper } from "@material-ui/core"
import RaisedButton from "material-ui/RaisedButton"
import React from "react"
import { Field, reduxForm } from "redux-form"
import { TextField } from "redux-form-material-ui"
import { messages } from "../../../../lib"
import style from "./style.module.sass"

class EmailSettings extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    let { handleSubmit, pristine, submitting, initialValues } = this.props

    return (
      <form
        onSubmit={handleSubmit}
        style={{
          display: "initial",
          width: "100%",
        }}
      >
        <Paper className="paper-box" elevation={4}>
          <div className={style.innerBox}>
            <Field
              component={TextField}
              fullWidth
              name="apikey"
              hintText="..apiKey"
              floatingLabelText={messages.settings_apikey}
            />
            <Field
              component={TextField}
              fullWidth
              name="sheetid"
              hintText="..sheet-id"
              floatingLabelText={messages.settings_sheetid}
            />
            <Field
              component={TextField}
              fullWidth
              name="range"
              floatingLabelText={messages.settings_tablename}
            />
          </div>
          <div className="buttons-box">
            <RaisedButton
              type="submit"
              label={messages.save}
              primary
              className={style.button}
              disabled={pristine || submitting}
            />
          </div>
        </Paper>
      </form>
    )
  }
}

export default reduxForm({
  form: "ImportSettingsForm",
  enableReinitialize: false,
})(EmailSettings)
