import apiServices from '@apps/packages/services'
import { AdminAuthValidateBody, AdminAuthValidateResponse } from '@apps/packages/services/auth'

import { BaseMutationOptions, useMutateItem } from '../BaseMutation'

type MutationArgs = {
  mutationOptions?: BaseMutationOptions<AdminAuthValidateResponse, AdminAuthValidateBody>
}

export const useAuthValidate = (args?: MutationArgs) => {
  const { mutationOptions } = args ?? {}
  return useMutateItem({
    successMessage: () => 'Selamat datang...',
    errorMessage: (res) => res.meta.message,
    mutationFn: (body: AdminAuthValidateBody) => apiServices.auth.adminValidate({ body }),
    mutationOptions,
  })
}
