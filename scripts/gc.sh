#! /bin/bash

NAME=$1

FILE_PATH=$(cd "$(dirname "${BASH_SOURCE[0]}")/../packages" && pwd)

re="[[:space:]]+"

if [ "$#" -ne 1 ] || [[ $NAME =~ $re ]] || [ "$NAME" == "" ]; then
  echo "Usage: pnpm gc \${name} with no space"
  exit 1
fi

DIRNAME="$FILE_PATH/components/$NAME"
INPUT_NAME=$NAME

if [ -d "$DIRNAME" ]; then
  echo "$NAME component already exists, please change it"
  exit 1
fi

NORMALIZED_NAME=""
for i in $(echo $NAME | sed 's/[_|-]\([a-z]\)/\ \1/;s/^\([a-z]\)/\ \1/'); do
  C=$(echo "${i:0:1}" | tr "[:lower:]" "[:upper:]")
  NORMALIZED_NAME="$NORMALIZED_NAME${C}${i:1}"
done
NAME=$NORMALIZED_NAME

mkdir -p "$DIRNAME"
mkdir -p "$DIRNAME/src"

# Generate vue template file
cat > $DIRNAME/src/$INPUT_NAME.vue <<EOF
<template>
  <div>
    <slot>${NAME}</slot>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: '${NAME}',
  props: {},
  setup(props) {
    // init here
  }
})
</script>
EOF

# Generate property define file
cat > $DIRNAME/src/$INPUT_NAME.ts <<EOF
import { buildProps } from '@bgy-plus/utils/props'

import type { ExtractPropTypes } from 'vue'

export const ${INPUT_NAME}Props = buildProps({

} as const)

export type ${NAME}Props = ExtractPropTypes<typeof ${INPUT_NAME}Props>

export const ${INPUT_NAME}Emits = {
}

export type ${NAME}Emits = typeof ${INPUT_NAME}Emits
EOF

# Generate entry file
cat <<EOF >"$DIRNAME/index.ts"
import { withInstall } from '@ve-ui/utils'
import ${NAME} from './src/${INPUT_NAME}.vue'

export const Ve${NAME} = withInstall(${NAME})

export default Ve${NAME}

EOF

