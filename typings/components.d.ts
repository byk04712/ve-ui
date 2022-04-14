declare module 'vue' {
  export interface GlobalComponents {
    VeTable: typeof import ('../packages/ve-ui')['VeTable']
  }
}
