import { queryKeyMasterThematics } from '@apps/packages/lib/constants'
import apiServices from '@apps/packages/services'
import { ThematicDeleteItemParams, ThematicDeleteItemResponse } from '@apps/packages/services/master-thematics'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<ThematicDeleteItemResponse, ThematicDeleteItemParams>
}

export const useDeleteThematic = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Data berhasil dihapus',
    errorMessage: () => 'Data gagal dihapus',
    invalidateQueryKey: [queryKeyMasterThematics.MASTER_THEMATIC_LIST],
    mutationFn: (params: ThematicDeleteItemParams) => apiServices.masterThematic.deleteItem({ params }),
    mutationOptions,
  })
}
