import {
  createLoader,
  parseAsString
} from 'nuqs/server'

// 서버 사이드에서 사용할 검색 파라미터 캐시
export const loadSearchParams = createLoader({
  label: parseAsString.withDefault('')
})