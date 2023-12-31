import { queryKeyInternalUser } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  InternalUserUpdateItemBody,
  InternalUserUpdateItemParams,
  InternalUserUpdateItemResponse,
} from '@apps/packages/services/internal-user'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<InternalUserUpdateItemResponse, InternalUserUpdateItemBody>
}

type ParamsType = InternalUserUpdateItemParams & InternalUserUpdateItemBody

export const useUpdateInternalUser = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: () => 'Data gagal diubah',
    invalidateQueryKey: [queryKeyInternalUser.INTERNAL_USER_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.internalUser.updateItem({ params: { id }, body })
    },
    mutationOptions,
  })
}
