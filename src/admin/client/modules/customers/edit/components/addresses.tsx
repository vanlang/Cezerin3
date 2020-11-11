import { Paper } from "@material-ui/core"
import { MoreVert } from "@material-ui/icons"
import Dialog from "material-ui/Dialog"
import IconButton from "material-ui/IconButton"
import IconMenu from "material-ui/IconMenu"
import MenuItem from "material-ui/MenuItem"
import React from "react"
import { messages } from "../../../../lib"
import ConfirmationDialog from "../../../shared/confirmation"
import AddressForm from "./addressForm"
import style from "./style.module.sass"

let countRender = 0

const Address = ({ address }) => {
  return (
    <div className={style.address}>
      <p>{address.full_name}</p>
      <p>{address.company}</p>
      <p>{address.address1}</p>
      <p>{address.address2}</p>
      <p>
        {address.city},{" "}
        {address.state && address.state.length > 0 ? address.state + ", " : ""}
        {address.postal_code}
      </p>
      <p>{address.country}</p>
      <p>{address.phone}</p>
    </div>
  )
}

const iconButtonElement = (
  <IconButton touch>
    <MoreVert htmlColor="rgb(189, 189, 189)" />
  </IconButton>
)

class CustomerAddress extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      openEdit: false,
      openDelete: false,
    }
  }

  componentWillMount() {
    countRender++
  }

  showEditForm = () => {
    this.setState({ openEdit: true })
  }

  hideEditForm = () => {
    this.setState({ openEdit: false })
  }

  handleEditForm = address => {
    this.props.onUpdateAddress(address)
    this.hideEditForm()
  }

  showDelete = () => {
    this.setState({ openDelete: true })
  }

  hideDelete = () => {
    this.setState({ openDelete: false })
  }

  handleDelete = () => {
    this.props.onDeleteAddress(this.props.address.id)
    this.hideDelete()
  }

  handleSetDefaultBillingAddress = () => {
    this.props.onSetDefaultBillingAddress(this.props.address.id)
  }

  handleSetDefaultShippingAddress = () => {
    this.props.onSetDefaultShippingAddress(this.props.address.id)
  }

  render() {
    const { address, onUpdateAddress } = this.props

    let title =
      countRender === 1 ? messages.billingAddress : messages.shippingAddress
    if (address.default_billing && address.default_shipping) {
      title = `${messages.shippingAddress} / ${messages.billingAddress}`
    } else if (address.default_billing) {
      title = messages.billingAddress
    } else if (address.default_shipping) {
      title = messages.shippingAddress
    }

    return (
      <Paper className="paper-box" elevation={4}>
        <div className={style.innerBox} style={{ paddingTop: 15 }}>
          <div className="row middle-xs">
            <div className="col-xs-10">{title}</div>
            <div className="col-xs-2">
              <IconMenu iconButtonElement={iconButtonElement}>
                <MenuItem onClick={this.showEditForm}>{messages.edit}</MenuItem>
                <MenuItem onClick={this.showDelete}>
                  {messages.actions_delete}
                </MenuItem>
                <MenuItem
                  onClick={this.handleSetDefaultBillingAddress}
                  disabled={address.default_billing === true}
                >
                  {messages.setDefaultBillingAddress}
                </MenuItem>
                <MenuItem
                  onClick={this.handleSetDefaultShippingAddress}
                  disabled={address.default_shipping === true}
                >
                  {messages.setDefaultShippingAddress}
                </MenuItem>
              </IconMenu>
            </div>
          </div>
          <Address address={address} />
          <ConfirmationDialog
            open={this.state.openDelete}
            title={messages.actions_delete}
            description={messages.messages_deleteConfirmation}
            onSubmit={this.handleDelete}
            onCancel={this.hideDelete}
            submitLabel={messages.actions_delete}
            cancelLabel={messages.cancel}
          />
          <Dialog
            title={messages.editAddress}
            modal={false}
            open={this.state.openEdit}
            onRequestClose={this.hideEditForm}
            autoScrollBodyContent={true}
            contentStyle={{ width: 600 }}
          >
            <AddressForm
              initialValues={address}
              onCancel={this.hideEditForm}
              onSubmit={this.handleEditForm}
            />
          </Dialog>
        </div>
      </Paper>
    )
  }
}

const CustomerAddresses = ({
  customer,
  settings,
  onUpdateAddress,
  onDeleteAddress,
  onSetDefaultBillingAddress,
  onSetDefaultShippingAddress,
}) => {
  if (customer && customer.addresses && customer.addresses.length > 0) {
    console.log(customer.addresses)
    const addresses = customer.addresses.map((address, index) => (
      <CustomerAddress
        key={index}
        address={address}
        onUpdateAddress={onUpdateAddress}
        onDeleteAddress={onDeleteAddress}
        onSetDefaultBillingAddress={onSetDefaultBillingAddress}
        onSetDefaultShippingAddress={onSetDefaultShippingAddress}
      />
    ))
    return <>{addresses}</>
  } else {
    return null
  }
}

export default CustomerAddresses
