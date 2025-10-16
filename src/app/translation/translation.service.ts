import { Injectable } from '@angular/core';
import { FieldsTranslationKeys, CommonTranslationKeys, EnumTranslationKeys } from './types'


@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  constructor() { }

  private fieldNameTranslations: { [key in FieldsTranslationKeys]: string } = {
    'fields:id': 'شناسه',
    'fields:name': 'نام',
    'fields:is_active': 'فعال',
    'fields:token': 'توکن',
    'fields:username': 'نام کاربری',
    'fields:password': 'رمز عبور',
    'fields:coin_map': 'کانفیگ',
    'fields:placeholder': 'محتوا',
    'fields:defaultValue': 'مقدار پیش‌فرض',
    'fields:options': 'گزینه‌ها',
    'fields:_default': '',
  }

  private enumTranslations: { [key in EnumTranslationKeys]: string } = {
    'enum:is_active:true': 'فعال',
    'enum:is_active:false': 'غیر فعال',
  }

  private messageTranslations: { [key in CommonTranslationKeys]: string } = {
    'common:errorTitle': 'عملیات ناموفق',
    'common:fetchErrorTitle': 'خطا در دریافت اطلاعات',
    'common:noData': 'لیست مورد نظر خالی می‌باشد',
    'common:actions': 'عملیات',
    'common:add': 'افزودن',
    'common:edit': 'ویرایش',
    'common:delete': 'حذف',
    'common:confirmDelete': 'آیا مطمئن هستید؟',
    'common:unknownError': 'خطای غیر منتظره',
    'common:router:login': 'ورود',
    'common:router:vendors': 'فروشنده‌ها',
    'common:tableActionTitle': 'عملیات',
    'common:selectPlaceholder': 'انتخاب کنید',
    'common:_undefined': 'نامشخص',
    'common:_empty': 'خالی',
    'common:_all': 'همه',
  }

  public get(key: FieldsTranslationKeys | CommonTranslationKeys | EnumTranslationKeys): string
  public get(key: string): string | undefined
  public get(key: string): string | undefined {
    return this.fieldNameTranslations[key] ?? this.messageTranslations[key] ?? this.enumTranslations[key]
  }
  public getDate(date: string): string {
    return new Date(date).toLocaleDateString('fa-IR')
  }
}
