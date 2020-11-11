import { Add, Delete } from "@material-ui/icons"
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

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteGroup = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.selected.id)
  }

  render() {
    const { selected, onDelete, onCreate } = this.props
    const groupName =
      selected && selected.name && selected.name.length > 0
        ? selected.name
        : "Draft"

    return (
      <span>
        {selected && (
          <>
            <IconButton
              touch
              tooltip={messages.actions_delete}
              tooltipPosition="bottom-left"
              onClick={this.showDelete}
            >
              <Delete />
            </IconButton>
            <DeleteConfirmation
              open={this.state.openDelete}
              isSingle
              itemsCount={1}
              itemName={groupName}
              onCancel={this.closeDelete}
              onDelete={this.deleteGroup}
            />
          </>
        )}
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.customerGroups_titleAdd}
          onClick={onCreate}
        >
          <Add htmlColor="#fff" />
        </IconButton>
      </span>
    )
  }
}

export default Buttons
