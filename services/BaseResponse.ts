import { z } from 'zod'

export const HttpBaseResponseMetaSchema = z.object({
  code: z.number(),
  message: z.string(),
  response_time: z.number(),
  success: z.boolean(),
})

export type HttpBaseResponseMeta = z.infer<typeof HttpBaseResponseMetaSchema>

export const HttpGetListResponseMetaSchema = HttpBaseResponseMetaSchema.extend({
  pagination: z
    .object({
      max_page: z.number(),
      current: z.number(),
      size: z.number(),
      total: z.number(),
    })
    .optional(),
})

export const httpGetListResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    meta: HttpGetListResponseMetaSchema,
    result: z.array(schema).optional(),
  })
}

export const HttpGetListResponseSchema = httpGetListResponseSchemaBuilder(z.any())

export type HttpGetListResponse = z.infer<typeof HttpGetListResponseSchema>

export const httpGetListHighlightResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    meta: HttpGetListResponseMetaSchema,
    result: z.object({
      data: z.array(schema).optional(),
      total_highlight: z.number(),
    }),
  })
}

export const HttpGetListHighlightResponseSchema = httpGetListHighlightResponseSchemaBuilder(z.any())

export type HttpGetListHighlightResponse = z.infer<typeof HttpGetListHighlightResponseSchema>

export const httpGetDetailResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    meta: HttpBaseResponseMetaSchema,
    result: schema.optional(),
  })
}

export const HttpGetDetailResponseSchema = httpGetDetailResponseSchemaBuilder(z.any())

export type HttpGetDetailResponse = z.infer<typeof HttpGetDetailResponseSchema>

export const HttpGetListPointerResponseMetaSchema = HttpBaseResponseMetaSchema.extend({
  pagger: z
    .object({
      hasNext: z.boolean(),
      lastPointer: z.number(),
    })
    .optional(),
})

export const httpGetListPointerResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    meta: HttpGetListPointerResponseMetaSchema,
    result: z.array(schema).optional(),
  })
}

export const HttpGetListPointerResponseSchema = httpGetListPointerResponseSchemaBuilder(z.any())

export type HttpGetListPointerResponse = z.infer<typeof HttpGetListPointerResponseSchema>

export const HttpGetListFilterResponseMetaSchema = HttpBaseResponseMetaSchema.extend({
  pagger: z
    .object({
      hasNext: z.boolean(),
      lastPointer: z.number(),
    })
    .optional(),
})

export const httpGetListFilterResponseSchemaBuilder = <T extends z.ZodType>(schema: T) => {
  return z.object({
    meta: HttpGetListFilterResponseMetaSchema,
    result: z.array(schema),
  })
}

export const HttpGetListFilterResponseSchema = httpGetListFilterResponseSchemaBuilder(z.any())

export type HttpGetListFilterResponse = z.infer<typeof HttpGetListFilterResponseSchema>

export const placeholderListHighlightBuilder = (): HttpGetListHighlightResponse => ({
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
    pagination: {
      max_page: 0,
      current: 0,
      size: 0,
      total: 0,
    },
  },
  result: {
    data: [],
    total_highlight: 0,
  },
})

export const placeholderListBuilder = (): HttpGetListResponse => ({
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
    pagination: {
      max_page: 0,
      current: 0,
      size: 0,
      total: 0,
    },
  },
  result: [],
})

export const placeholderDetailBuilder = (): HttpGetDetailResponse => ({
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
  },
  result: {},
})

export const placeholderListFilterBuilder = (): HttpGetListFilterResponse => ({
  meta: {
    code: 200,
    message: '',
    response_time: 0,
    success: true,
    pagger: {
      hasNext: false,
      lastPointer: 0,
    },
  },
  result: [],
})
