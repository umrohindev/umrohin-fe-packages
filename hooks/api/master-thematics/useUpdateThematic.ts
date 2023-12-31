import { queryKeyMasterThematics } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import {
  ThematicUpdateItemBody,
  ThematicUpdateItemParams,
  ThematicUpdateItemResponse,
} from '@apps/packages/services/master-thematics'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<ThematicUpdateItemResponse, ThematicUpdateItemBody>
}

type ParamsType = ThematicUpdateItemParams & ThematicUpdateItemBody

export const useUpdateThematic = (args: MutationArgs) => {
  const { mutationOptions } = args

  return useMutateItem({
    successMessage: () => 'Data berhasil diubah',
    errorMessage: (res) => res.meta.message,
    invalidateQueryKey: [queryKeyMasterThematics.MASTER_THEMATIC_LIST],
    mutationFn: (params: ParamsType) => {
      const { id, ...body } = params
      return apiServices.masterThematic.updateItem({ params, body })
    },
    mutationOptions,
  })
}
