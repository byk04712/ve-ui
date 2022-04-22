declare module 'vue' {
  export interface GlobalComponents {
    VeTable: typeof import ('../packages/ve-ui')['VeTable']
  }
}

declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {}
}

export { }
