import React from "react"
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from "react-sortable-hoc"
import GalleryItem from "./item"
import style from "./style.module.sass"
import MultiUploader from "./uploader"

const SortableItem = SortableElement(({ image, onDelete, onImageEdit }) => (
  <li className={style.item}>
    <GalleryItem
      url={image.url}
      alt={image.alt}
      id={image.id}
      onDelete={onDelete}
      onImageEdit={() => {
        onImageEdit(image)
      }}
    />
  </li>
))

const SortableList = SortableContainer(({ items, onDelete, onImageEdit }) => (
  <ul className={style.list}>
    {items.map((value, index) => (
      <SortableItem
        key={`item-${index}`}
        index={index}
        image={value}
        onDelete={onDelete}
        onImageEdit={onImageEdit}
      />
    ))}
  </ul>
))

const Gallery = props => {
  const {
    productId,
    images,
    onImageDelete,
    onImageSort,
    onImageUpload,
    uploading,
    onImageEdit,
  } = props

  if (images && images.length > 0) {
    return (
      <MultiUploader onUpload={onImageUpload} uploading={uploading}>
        <div className={style.gallery}>
          <SortableList
            axis="x"
            items={images}
            onDelete={imageId => {
              onImageDelete(productId, imageId)
            }}
            onImageEdit={onImageEdit}
            onSortEnd={({ oldIndex, newIndex }) => {
              let sortedItems = arrayMove(images, oldIndex, newIndex)
              let withNewPosition = sortedItems.map((image, index) => {
                image.position = index
                return image
              })
              onImageSort(productId, withNewPosition)
            }}
          />
        </div>
      </MultiUploader>
    )
  } else {
    return <MultiUploader onUpload={onImageUpload} uploading={uploading} />
  }
}

export default Gallery
