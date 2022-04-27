import { withInstall } from '@ve-ui/utils'
import Item from './src/item.vue'
import ItemRange from './src/range.vue'

export const VeItem = withInstall(Item)
export const VeItemRange = withInstall(ItemRange)

VeItem.Range = VeItemRange

export default VeItem

