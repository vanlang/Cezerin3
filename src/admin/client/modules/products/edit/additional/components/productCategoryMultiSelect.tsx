import { Button } from "@material-ui/core"
import { Add } from "@material-ui/icons"
import Dialog from "material-ui/Dialog"
import React from "react"
import { messages } from "../../../../../lib"
import CategoryMultiselect from "../../../../productCategories/components/multiselectList"

const CategoryItemActions = ({ fields, index }) => (
  <a
    title={messages.actions_delete}
    onClick={() => fields.remove(index)}
    className="react-tagsinput-remove"
  />
)

const CategoryItem = ({ categoryName, actions }) => (
  <span className="react-tagsinput-tag">
    {categoryName}
    {actions}
  </span>
)

class ProductCategoryMultiSelect extends React.Component {
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

  handleCheck = categoryId => {
    const selectedIds = this.props.fields.getAll()
    if (selectedIds && selectedIds.includes(categoryId)) {
      // remove
      this.props.fields.forEach((name, index, fields) => {
        if (fields.get(index) === categoryId) {
          fields.remove(index)
          return
        }
      })
    } else {
      // add
      this.props.fields.push(categoryId)
    }
  }

  render() {
    const { categories, fields } = this.props
    const { open } = this.state
    const selectedIds = fields.getAll()

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
      <div className="react-tagsinput">
        <span>
          {fields.map((field, index) => {
            const categoryId = fields.get(index)
            const category = categories.find(item => item.id === categoryId)
            const categoryName = category ? category.name : "-"
            const actions = (
              <CategoryItemActions fields={fields} index={index} />
            )
            return (
              <CategoryItem
                key={index}
                categoryName={categoryName}
                actions={actions}
              />
            )
          })}
          <Dialog
            title={messages.additionalCategories}
            actions={dialogButtons}
            modal={false}
            open={open}
            onRequestClose={this.close}
            autoScrollBodyContent={true}
          >
            <CategoryMultiselect
              items={categories}
              selectedIds={selectedIds}
              opened={false}
              onCheck={this.handleCheck}
            />
          </Dialog>
          <Button
            variant="contained"
            color="primary"
            style={{ minWidth: 52 }}
            onClick={this.open}
          >
            <Add htmlColor="#333" />
          </Button>
        </span>
      </div>
    )
  }
}

export default ProductCategoryMultiSelect
