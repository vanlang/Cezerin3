import { Delete } from "@material-ui/icons"
import messages from "lib/text"
import IconButton from "material-ui/IconButton"
import React from "react"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openDelete: false,
    }
  }

  openDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteOrder = () => {
    this.closeDelete()
    this.props.onDelete()
  }

  render() {
    const { customer } = this.props
    const customerName =
      customer && customer.full_name && customer.full_name.length > 0
        ? customer.full_name
        : "Draft"

    return (
      <>
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.actions_delete}
          onClick={this.openDelete}
        >
          <Delete htmlColor="#fff" />
        </IconButton>
        <DeleteConfirmation
          open={this.state.openDelete}
          isSingle
          itemsCount={1}
          itemName={customerName}
          onCancel={this.closeDelete}
          onDelete={this.props.onDelete}
        />
      </>
    )
  }
}

export default Buttons
