import { Create } from "@material-ui/icons"
import Dialog from "material-ui/Dialog"
import FlatButton from "material-ui/FlatButton"
import React from "react"
import { messages } from "../../../../../lib"
import CategorySelect from "../../../../productCategories/select"

class ProductCategorySelect extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
    }
  }

  close = () => {
    this.setState({ open: false })
  }

  open = () => {
    this.setState({ open: true })
  }

  handleSelect = categoryId => {
    this.props.input.onChange(categoryId)
  }

  render() {
    const { categories, input } = this.props
    const { open } = this.state
    const selectedCategoryId = input.value
    const category = categories.find(item => item.id === selectedCategoryId)
    const categoryName = category ? category.name : ""

    const dialogButtons = [
      <FlatButton
        label={messages.cancel}
        onClick={this.close}
        style={{ marginRight: 10 }}
      />,
      <FlatButton
        label={messages.save}
        primary
        keyboardFocused
        onClick={this.close}
      />,
    ]

    return (
      <>
        <Dialog
          title={messages.category}
          actions={dialogButtons}
          modal={false}
          open={open}
          onRequestClose={this.close}
          autoScrollBodyContent
        >
          <CategorySelect
            onSelect={this.handleSelect}
            selectedId={selectedCategoryId}
            opened={false}
          />
        </Dialog>
        <FlatButton
          label={categoryName}
          onClick={this.open}
          icon={<Create htmlColor="#777" />}
        />
      </>
    )
  }
}

export default ProductCategorySelect
