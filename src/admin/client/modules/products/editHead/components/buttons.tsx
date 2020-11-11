import { Delete, OpenInNew } from "@material-ui/icons"
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

  handleDelete = () => {
    this.closeDelete()
    this.props.onDelete()
  }

  render() {
    const { product } = this.props
    const productName =
      product && product.name && product.name.length > 0
        ? product.name
        : "Draft"

    return (
      <>
        <IconButton
          touch
          tooltipPosition="bottom-left"
          tooltip={messages.deleteProduct}
          onClick={this.openDelete}
        >
          <Delete htmlColor="#fff" />
        </IconButton>
        {product && product.enabled && (
          <a href={product.url} target="_blank">
            <IconButton
              touch
              tooltipPosition="bottom-left"
              tooltip={messages.viewOnWebsite}
            >
              <OpenInNew htmlColor="#fff" />
            </IconButton>
          </a>
        )}
        <DeleteConfirmation
          open={this.state.openDelete}
          isSingle
          itemsCount={1}
          itemName={productName}
          onCancel={this.closeDelete}
          onDelete={this.handleDelete}
        />
      </>
    )
  }
}

export default Buttons
