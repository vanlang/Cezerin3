import { Button, Divider } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import { List } from "material-ui/List"
import React from "react"
import { messages } from "../../../../lib"
import Head from "./head"
import OrdersListItem from "./item"
import style from "./style.module.sass"

class OrdersList extends React.Component {
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
      hasMore,
      onSelect,
      onSelectAll,
      loadMore,
      settings,
    } = this.props
    const rows = items.map((item, index) => (
      <OrdersListItem
        key={index}
        order={item}
        selected={selected}
        onSelect={onSelect}
        settings={settings}
      />
    ))

    return (
      <>
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
      </>
    )
  }
}

export default OrdersList
