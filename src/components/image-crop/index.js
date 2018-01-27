import ImageCrop from './image-crop.vue'
import createAPI from '../common/js/create-api'

const addImageCrop = (Vue, ImageCrop) => {
  createAPI(Vue, ImageCrop, ['confirm', 'cancel'], true)
}

ImageCrop.install = function (Vue) {
  Vue.component(ImageCrop.name, ImageCrop)
  addImageCrop(Vue, ImageCrop)
}

export default ImageCrop
