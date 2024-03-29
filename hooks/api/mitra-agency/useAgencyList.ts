import { queryKeyMitraAgency } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { placeholderListBuilder, placeholderListHighlightBuilder } from '@apps/packages/services/BaseResponse'
import {
  MitraAgencyListParams,
  MitraAgencyListResponse,
  MitraAgencyListResponseSchema,
  MitraAgencyMetaResponse,
  MitraAgencyMetaResponseSchema,
} from '@apps/packages/services/mitra-agency'
import { apiResponseValidation } from '@apps/packages/utils'
import { QueryKey, UseQueryOptions, useQueryClient } from '@tanstack/react-query'
import { useMemo } from 'react'

import { useQueryList, useQueryHighlightList } from '../BaseMutation'

type useMitraAgencyListConfig = {
  queryKey?: QueryKey
  params?: MitraAgencyListParams
  options?: UseQueryOptions<MitraAgencyListResponse>
}

export const useMitraAgencyList = (opt?: useMitraAgencyListConfig) => {
  const { queryKey = [queryKeyMitraAgency.MITRA_AGENCY_LIST], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MitraAgencyListResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListHighlightBuilder(),
    []
  )

  return useQueryHighlightList({
    queryKey,
    queryFn: () => apiServices.mitraAgency.getList({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MitraAgencyListResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}

type useMitraAgencyMetaConfig = {
  queryKey?: QueryKey
  params?: MitraAgencyListParams
  options?: UseQueryOptions<MitraAgencyMetaResponse>
}

export const useMitraAgencyMeta = (opt?: useMitraAgencyMetaConfig) => {
  const { queryKey = [queryKeyMitraAgency.MITRA_AGENCY_META], params = { page: 1, page_size: 10 }, options } = opt ?? {}
  const queryClient = useQueryClient()
  const placeholderData: MitraAgencyMetaResponse = useMemo(
    () => queryClient.getQueryData(queryKey) ?? placeholderListBuilder(),
    []
  )

  return useQueryList({
    queryKey,
    queryFn: () => apiServices.mitraAgency.getMeta({ params }),
    refetchOnWindowFocus: false,
    placeholderData,
    select: (response) => {
      return apiResponseValidation({
        response,
        schema: MitraAgencyMetaResponseSchema,
        placeholderData,
      })
    },
    ...options,
  })
}
