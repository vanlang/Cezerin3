import { Button } from "@material-ui/core"
import Dialog from "material-ui/Dialog"
import React from "react"

class ConfirmationDialog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: props.open,
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.open !== nextProps.open) {
      this.setState({
        open: nextProps.open,
      })
    }
  }

  handleCancel = () => {
    this.setState({ open: false })
    if (this.props.onCancel) {
      this.props.onCancel()
    }
  }

  handleSubmit = () => {
    this.setState({ open: false })
    if (this.props.onSubmit) {
      this.props.onSubmit()
    }
  }

  render() {
    const {
      title,
      description,
      submitLabel,
      cancelLabel,
      modal = false,
    } = this.props

    const actions = [
      <Button
        variant="contained"
        color="primary"
        onClick={this.handleCancel}
        style={{ marginRight: 10 }}
      >
        {cancelLabel}
      </Button>,
      <Button
        variant="contained"
        color="primary"
        focusRipple
        onClick={this.handleSubmit}
      >
        {submitLabel}
      </Button>,
    ]

    return (
      <Dialog
        title={title}
        actions={actions}
        modal={modal}
        open={this.state.open}
        onRequestClose={this.handleCancel}
      >
        <div style={{ wordWrap: "break-word" }}>{description}</div>
      </Dialog>
    )
  }
}

export default ConfirmationDialog
