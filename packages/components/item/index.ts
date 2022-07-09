import { withInstall } from '@ve-ui/utils'
import Item from './src/item.vue'
import ItemSplit from './src/item-split.vue'

export const VeItem = withInstall(Item)
export const VeItemSplit = withInstall(ItemSplit)

VeItem.Split = VeItemSplit

export default VeItem

