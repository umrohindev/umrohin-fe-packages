import { queryKeyMasterTourLeader } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { TourLeaderCreateItemBody, TourLeaderCreateItemResponse } from '@apps/packages/services/master-tour-leader'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<TourLeaderCreateItemResponse, TourLeaderCreateItemBody>
}

//tes
export const useCreateTourLeader = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil ditambahkan',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMasterTourLeader.MASTER_TOUR_LEADER_LIST],
    mutationFn: (body: TourLeaderCreateItemBody) => apiServices.masterTourLeader.createItem({ body }),
    mutationOptions,
  })
}
