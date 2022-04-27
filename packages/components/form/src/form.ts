import { buildProps } from '@ve-ui/utils'
import type { ExtractPropTypes } from 'vue'

export const formProps = buildProps({

} as const)

export type FormProps = ExtractPropTypes<typeof formProps>

export const formEmits = {
}

export type FormEmits = typeof formEmits
