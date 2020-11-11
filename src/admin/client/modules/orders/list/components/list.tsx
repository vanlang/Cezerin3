import { Divider } from "@material-ui/core"
import { Refresh } from "@material-ui/icons"
import { List } from "material-ui/List"
import RaisedButton from "material-ui/RaisedButton"
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
            <RaisedButton
              disabled={loadingItems || !hasMore}
              label={messages.actions_loadMore}
              labelPosition="before"
              primary={false}
              icon={<Refresh />}
              onClick={loadMore}
            />
          </div>
        </List>
      </>
    )
  }
}

export default OrdersList
