import { Button } from "@material-ui/core"
import { Create } from "@material-ui/icons"
import Dialog from "material-ui/Dialog"
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
      <Button
        variant="contained"
        color="primary"
        onClick={this.close}
        style={{ marginRight: 10 }}
      >
        {messages.cancel}
      </Button>,
      <Button
        variant="contained"
        color="primary"
        focusRipple
        onClick={this.close}
      >
        {messages.save}
      </Button>,
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
        <Button
          variant="contained"
          color="primary"
          startIcon={<Create htmlColor="#777" />}
          onClick={this.open}
        >
          {categoryName}
        </Button>
      </>
    )
  }
}

export default ProductCategorySelect
