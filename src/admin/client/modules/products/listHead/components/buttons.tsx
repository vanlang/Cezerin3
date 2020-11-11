import { Add, Delete, Folder } from "@material-ui/icons"
import messages from "lib/text"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import IconButton from "material-ui/IconButton"
import React from "react"
import CategorySelect from "../../../productCategories/select"
import DeleteConfirmation from "../../../shared/deleteConfirmation"
import Search from "./search"

class Buttons extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      categoryIdMoveTo: null,
      openMoveTo: false,
      openDelete: false,
    }
  }

  showMoveTo = () => {
    this.setState({ openMoveTo: true })
  }

  openDelete = () => {
    this.setState({ openDelete: true })
  }

  closeDelete = () => {
    this.setState({ openDelete: false })
  }

  deleteProduct = () => {
    this.setState({ openDelete: false })
    this.props.onDelete()
  }

  closeMoveTo = () => {
    this.setState({ openMoveTo: false })
  }

  saveMoveTo = () => {
    this.setState({ openMoveTo: false })
    this.props.onMoveTo(this.state.categoryIdMoveTo)
  }

  selectMoveTo = categoryId => {
    this.setState({ categoryIdMoveTo: categoryId })
  }

  render() {
    const {
      search,
      setSearch,
      selectedCount,
      onDelete,
      onCreate,
      onImportProducts,
    } = this.props

    const actionsMoveTo = [
      <FlatButton
        label={messages.cancel}
        onClick={this.closeMoveTo}
        style={{ marginRight: 10 }}
      />,
      <FlatButton
        label={messages.actions_moveHere}
        primary
        keyboardFocused
        onClick={this.saveMoveTo}
      />,
    ]

    return (
      <>
        <Search value={search} setSearch={setSearch} />
        {selectedCount > 0 && (
          <>
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.actions_delete}
              onClick={this.openDelete}
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
            <DeleteConfirmation
              open={this.state.openDelete}
              isSingle={false}
              itemsCount={selectedCount}
              onCancel={this.closeDelete}
              onDelete={this.deleteProduct}
            />
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
                opened
              />
            </Dialog>
          </>
        )}
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.addProduct}
          onClick={onCreate}
        >
          <Add htmlColor="#fff" />
        </IconButton>
      </>
    )
  }
}

export default Buttons
