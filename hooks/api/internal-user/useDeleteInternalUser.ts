import { queryKeyInternalUser } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { InternalUserDeleteItemParams, InternalUserDeleteItemResponse } from '@apps/packages/services/internal-user'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<InternalUserDeleteItemResponse, InternalUserDeleteItemParams>
}

export const useDeleteInternalUser = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyInternalUser.INTERNAL_USER_LIST],
    mutationFn: (params: InternalUserDeleteItemParams) => apiServices.internalUser.deleteItem({ params }),
    mutationOptions,
  })
}
