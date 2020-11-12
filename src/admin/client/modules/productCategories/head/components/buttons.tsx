import { Button } from "@material-ui/core"
import {
  Add,
  ArrowDownward,
  ArrowUpward,
  Delete,
  Folder,
} from "@material-ui/icons"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import IconButton from "material-ui/IconButton"
import React from "react"
import CategorySelect from "../../../productCategories/select"
import DeleteConfirmation from "../../../shared/deleteConfirmation"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryIdMoveTo: "root",
      openMoveTo: false,
      openDelete: false,
    }
  }

  showMoveTo = () => {
    this.setState({ openMoveTo: true })
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  closeMoveTo = () => {
    this.setState({ openMoveTo: false })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteCategory = () => {
    this.setState({ openDelete: false })
    this.props.onDelete(this.props.selected.id)
  }

  saveMoveTo = () => {
    this.setState({ openMoveTo: false })
    this.props.onMoveTo(this.state.categoryIdMoveTo)
  }

  selectMoveTo = categoryId => {
    this.setState({ categoryIdMoveTo: categoryId })
  }

  render() {
    const { selected, onMoveUp, onMoveDown, onDelete, onCreate } = this.props
    const categoryName =
      selected && selected.name && selected.name.length > 0
        ? selected.name
        : "Draft"

    const actionsMoveTo = [
      <Button
        variant="contained"
        color="primary"
        onClick={this.closeMoveTo}
        style={{ marginRight: 10 }}
      >
        {messages.cancel}
      </Button>,
      <Button
        variant="contained"
        color="primary"
        focusRipple
        onClick={this.saveMoveTo}
      >
        {messages.actions_moveHere}
      </Button>,
    ]

    return (
      <span>
        {selected && (
          <>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_moveUp}
              onClick={onMoveUp}
            >
              <ArrowUpward htmlColor="#fff" />
            </IconButton>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_moveDown}
              onClick={onMoveDown}
            >
              <ArrowDownward htmlColor="#fff" />
            </IconButton>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_delete}
              onClick={this.showDelete}
            >
              <Delete htmlColor="#fff" />
            </IconButton>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_moveTo}
              onClick={this.showMoveTo}
            >
              <Folder htmlColor="#fff" />
            </IconButton>
            <Dialog
              title={messages.actions_moveTo}
              actions={actionsMoveTo}
              modal={false}
              open={this.state.openMoveTo}
              onRequestClose={this.closeMoveTo}
              autoScrollBodyContent
            >
              <CategorySelect
                onSelect={this.selectMoveTo}
                selectedId={this.state.categoryIdMoveTo}
                showRoot
                showAll={false}
              />
            </Dialog>
            <DeleteConfirmation
              open={this.state.openDelete}
              isSingle
              itemsCount={1}
              itemName={categoryName}
              onCancel={this.closeDelete}
              onDelete={this.deleteCategory}
            />
          </>
        )}
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.productCategories_titleAdd}
          onClick={onCreate}
        >
          <Add htmlColor="#fff" />
        </IconButton>
      </span>
    )
  }
}

export default Buttons
