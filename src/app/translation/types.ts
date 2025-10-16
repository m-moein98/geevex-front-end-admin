
import { Filter, Option, Vendor } from '../pages/admin/admin.model'

export type FieldKeys =
  | keyof Filter
  | keyof Option
  | keyof Vendor

  | '_default'

export type FieldsTranslationKeys = `fields:${FieldKeys}`

type is_active = true | false
export type EnumKeys =
  | `is_active:${is_active}`

export type EnumTranslationKeys = `enum:${EnumKeys}`

export type RouterKeys =
  | 'login'
  | 'vendors'

export type CommonKeys =
  | 'errorTitle'
  | 'fetchErrorTitle'
  | 'noData'
  | 'actions'
  | 'add'
  | 'edit'
  | 'delete'
  | 'confirmDelete'
  | 'unknownError'
  | 'tableActionTitle'
  | 'selectPlaceholder'
  | `router:${RouterKeys}`
  | '_undefined'
  | '_empty'
  | '_all'

export type CommonTranslationKeys = `common:${CommonKeys}`

