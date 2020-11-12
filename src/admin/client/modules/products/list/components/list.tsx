import { Button, Divider } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import { List } from "material-ui/List"
import React from "react"
import { messages } from "../../../../lib"
import Head from "./head"
import ProductsListItem from "./item"
import style from "./style.module.sass"

class ProductsList extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onLoad()
  }

  render() {
    const {
      items,
      selected,
      loadingItems,
      onSelect,
      onSelectAll,
      selectedAll,
      loadMore,
      settings,
      hasMore,
      totalCount,
    } = this.props

    const rows = items.map((item, index) => {
      const itemSelected = selected.includes(item.id)
      return (
        <ProductsListItem
          key={index}
          product={item}
          selected={itemSelected}
          onSelect={onSelect}
          settings={settings}
        />
      )
    })

    return (
      <div className="product-list">
        <List>
          <Head onSelectAll={onSelectAll} />
          <Divider />
          {rows}
          <div className={style.more}>
            <Button
              variant="contained"
              color="primary"
              disabled={loadingItems || !hasMore}
              endIcon={<Refresh />}
              onClick={loadMore}
            >
              {messages.actions_loadMore}
            </Button>
          </div>
        </List>
      </div>
    )
  }
}

export default ProductsList
