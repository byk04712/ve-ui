import { isRef, unref } from 'vue'
import { isFunction } from '@vue/shared'
import type { AxiosInstance, AxiosPromise } from 'axios'

export function useApi(api: any) {
  const { insert, select, update, delete: remove } = api

  // 首先获取 api 属性上的 axios 对象，没有从 el-config-provider 中拿 axios 属性
  let axiosInstance = api?.axios

  if (isRef(axiosInstance)) {
    axiosInstance = unref(axiosInstance) as AxiosInstance
  }
  if (!axiosInstance) {
    throw new Error(
      `axios 实例对象为空, 建议在 el-config-provider 组件上传入 axios 属性`
    )
  }
  const createHttp = (opt: any) => {
    const promise = (
      params: Record<string, string | Blob> | undefined
    ): AxiosPromise => {
      const {
        url,
        method = 'get',
        headers,
        timeout,
        preprocessor,
        onSuccess,
        onError,
      } = opt
      return (axiosInstance as AxiosInstance)({
        url,
        method,
        headers,
        timeout,
        [method.toLocaleLowerCase() === 'get' ? 'params' : 'data']: {
          // 外部传递的 params 优先级低
          ...opt.params,
          ...params,
        },
      })
        .then(({ data }) => {
          const result = isFunction(preprocessor) ? preprocessor!(data) : data
          if (isFunction(onSuccess)) {
            onSuccess!(result)
          }
          return result
        })
        .catch((err) => {
          if (isFunction(onError)) {
            onError!(err)
          }
        })
    }
    return Object.assign(promise, { props: opt?.props })
  }
  return {
    insertApi: createHttp(insert!),
    selectApi: createHttp(select!),
    updateApi: createHttp(update!),
    deleteApi: createHttp(remove!),
  }
}
