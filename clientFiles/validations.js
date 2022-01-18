import i18next from 'i18next'
import get from 'lodash/get'
import * as yup from 'yup'
import { mixed, number, object, string } from 'yup'

const phoneNumberRegEx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/
const specialCharacters = /^[a-zA-Z0-9_ .-]+$/
const decimalTwo = /^\d*(\.\d{0,2})?$/
const emailRegexWithAlias = /^[\w.]+@([\w]+\.)+[\w]{2,4}$/
const urlRegEx =
  /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/i

export function createYupSchema(actorsConfig) {
  const yupSchema = actorsConfig.reduce((schema, config) => {
    let validator = yup.string().trim()
    if (config.properties.required && config.properties.required.toString() === 'true') {
      validator = validator.required(
        i18next.t('error:required', { field: i18next.t(`fields:${config.key}`) })
      )
    }

    if (config.properties.acceptRegex) {
      const params = ['error:invalidInput']
      validator = validator.test(config.key, ...params, (value) => {
        return !value || RegExp(config.properties.acceptRegex).test(value)
      })
    }
    if (config.properties.maxValue) {
      const params = [
        i18next.t('error:maxCount', {
          number: config.properties.maxValue,
          field: i18next.t(`fields:${config.key}`),
        }),
      ]
      validator = validator.test(config.key, ...params, (value) => {
        return !value || parseInt(value) <= parseInt(config.properties.maxValue)
      })
    }
    if (config.properties.minValue) {
      const params = [
        i18next.t('error:minCount', {
          number: config.properties.minValue,
          field: i18next.t(`fields:${config.key}`),
        }),
      ]
      validator = validator.test(config.key, ...params, (value) => {
        return !value || parseInt(value) >= parseInt(config.properties.minValue)
      })
    }

    schema[config.key] = validator
    return schema
  }, {})
  let description_Validator = yup.string().required('error:required').trim('error:errorSpace')
  description_Validator = description_Validator.max(
    ...[250, i18next.t('error:maxLength', { length: 250 })]
  )
  yupSchema['description'] = description_Validator
  let name_Validator = yup.string().required('error:required')
  name_Validator = name_Validator
    .max(...[50, i18next.t('error:maxLength', { length: 50 })])
    .matches(/^[aA-zZ\s]+$/, 'error:specialCharacter')
  yupSchema['name'] = name_Validator
  let processor_Validator = yup.string().required('error:required')
  yupSchema['processor'] = processor_Validator
  return yupSchema
}

export const AGMSchema = {
  login: object({
    // accountId: string('error:stringError')
    //   .required('error:required')
    //   .test('accountId', 'error:minLength8', value => {
    //     return !value || value.length >= 8
    //   })
    //   .test('accountId', 'error:maxLength24', value => {
    //     return !value || value.length <= 24
    //   }),
    username: string('error:stringError')
      .trim('error:errorSpace')
      .test('accountId', 'error:minLength6', (value) => {
        return !value || value.length >= 6
      })
      .test('accountId', 'error:maxLength32', (value) => {
        return !value || value.length <= 32
      })
      .required('error:required'),
    password: string('error:stringError').required('error:required'),
  }),
  loginMaster: object({
    account_id: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('account_id', 'error:minLength8', (value) => {
        return !value || value.length >= 8
      })
      .test('account_id', 'error:maxLength24', (value) => {
        return !value || value.length <= 24
      }),
    username: string('error:stringError')
      .trim('error:errorSpace')
      .test('accountId', 'error:minLength6', (value) => {
        return !value || value.length >= 6
      })
      .test('accountId', 'error:maxLength32', (value) => {
        return !value || value.length <= 32
      })
      .required('error:required'),
    password: string('error:stringError').required('error:required'),
  }),
  forgotPassword: object({
    username: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('accountId', 'error:minLength6', (value) => {
        return !value || value.length >= 6
      }),
  }),
  createNewUserSchema: object({
    email: string('error:stringError')
      .email('error:email')
      .test('email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('from', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .required('error:required'),
    first_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      })
      .required('error:required'),
    last_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('last_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('last_name', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      })
      .required('error:required'),
    username: string('error:stringError')
      .trim('error:errorSpace')
      .test('username', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('username', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      })
      .required('error:required'),
  }),
  assignRoleToUser: object({
    platform_role: string('error:stringError'),
    custom_role: string('error:stringError'),
  }),
  assignEntitiesToUser: object({
    districtId: string('error:stringError'),
    schoolId: string('error:stringError'),
  }),
  createCustomRole: object({
    districtId: string('error:stringError'),
    schoolId: string('error:stringError'),
    name: string('error:stringError')
      .trim('error:errorSpace')
      .test('name', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .required('error:required'),
    description: string('error:stringError').test('description', 'error:maxLength150', (value) => {
      return !value || value.length <= 150
    }),
  }),
  editUser: object({
    prefix: string('error:stringError').required('error:required'),
    // ssn: string('error:stringError')
    //   .required('error:required')
    //   .test('ssn', 'error:maxLength4', (value) => {
    //     return !value || value.length <= 4
    //   }),
    first_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      })
      .required('error:required'),
    middle_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      }),
    last_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('last_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('last_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      })
      .required('error:required'),
    // nick_name: string('error:stringError')
    //   .trim('error:errorSpace')
    //   .test('nick_name', 'error:minLength2', (value) => {
    //     return !value || value.length >= 2
    //   })
    //   .test('nick_name', 'error:maxLength26', (value) => {
    //     return !value || value.length <= 26
    //   })
    //   .required('error:required'),
    suffix: string('error:stringError'),
    dob: string('error:stringError').required('error:required'),
    gender: string('error:stringError').required('error:required'),
    adr_address1: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address1', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      })
      .required('error:required'),
    adr_address2: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address2', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      }),
    adr_country_iso: string('error:stringError').required('error:required'),
    adr_state_iso: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('adr_state_iso', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      }),
    adr_city: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_city', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .required('error:required'),
    adr_zipcode: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_zipcode', 'error:maxLength10', (value) => {
        return !value || value.length <= 10
      })
      .required('error:required'),
    email: string('error:stringError')
      .test('email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('from', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .required('error:required'),
    adr_mobile: mixed()
      .test('adr_mobile', 'error:validPhone', (value) => {
        return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
      })
      .required('error:required'),
    adr_phone: mixed().test('adr_phone', 'error:validPhone', (value) => {
      return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
    }),
    avatar_file: mixed()
      .test('avatar_file', 'message:errorFileSize', (value) => {
        return !value || value.size <= 10240000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['jpg', 'jpeg', 'png'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      )
      .required('error:required'),
    upload_id: mixed()
      // .test('required', 'message:required', (value) => {
      //   return !!value
      // })
      .test('fileSize', 'message:errorFileSize', (value) => {
        return !value || value.size <= 10240000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      ),
  }),
  editAGMUser: object({
    prefix: string('error:stringError').required('error:required'),
    // ssn: string('error:stringError')
    //   .required('error:required')
    //   .test('ssn', 'error:maxLength4', (value) => {
    //     return !value || value.length <= 4
    //   }),
    first_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      })
      .required('error:required'),
    middle_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      }),
    last_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('last_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('last_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      })
      .required('error:required'),
    // nick_name: string('error:stringError')
    //   .trim('error:errorSpace')
    //   .test('nick_name', 'error:minLength2', (value) => {
    //     return !value || value.length >= 2
    //   })
    //   .test('nick_name', 'error:maxLength26', (value) => {
    //     return !value || value.length <= 26
    //   })
    //   .required('error:required'),
    suffix: string('error:stringError'),
    dob: string('error:stringError').required('error:required'),
    gender: string('error:stringError').required('error:required'),
    adr_address1: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address1', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      })
      .required('error:required'),
    adr_address2: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address2', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      }),
    adr_country_iso: string('error:stringError').required('error:required'),
    adr_state_iso: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('adr_state_iso', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      }),
    adr_city: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_city', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .required('error:required'),
    adr_zipcode: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_zipcode', 'error:maxLength10', (value) => {
        return !value || value.length <= 10
      })
      .required('error:required'),
    // email: string('error:stringError')
    //   .test('email', 'error:maxLength65', (value) => {
    //     return !value || value.length <= 65
    //   })
    //   .test('from', 'error:validEmail', (value) => {
    //     return emailRegexWithAlias.test(value)
    //   })
    //   .required('error:required'),
    adr_mobile: mixed()
      .test('adr_mobile', 'error:validPhone', (value) => {
        return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
      })
      .required('error:required'),
    adr_phone: mixed().test('adr_phone', 'error:validPhone', (value) => {
      return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
    }),
    avatar: mixed()
      .test('avatar', 'message:errorFileSizeImage', (value) => {
        return !value || typeof value === 'string' || value.size <= 5120000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          typeof value === 'string' ||
          ['jpg', 'jpeg', 'png'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      )
      .required('error:required'),
    upload_id: mixed()
      // .test('required', 'message:required', (value) => {
      //   return !!value
      // })
      .test('fileSize', 'message:errorFileSize', (value) => {
        return !value || value.size <= 10240000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      ),
  }),
  userPassword: object({
    password: string()
      .test('password', 'error:minLength8', (value) => {
        return !value || value.length >= 8
      })
      .test('password', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      })
      .test('password', 'error:errorPasswordTestLowerCase', (value) => {
        return !value || value.toUpperCase() !== value
      })
      .test('password', 'error:errorPasswordTestUpperCase', (value) => {
        return !value || value.toLowerCase() !== value
      })
      .test('password', 'error:errorPasswordTestDigit', (value) => {
        return !value || /\d/.test(value)
      })
      .test('password', 'error:errorPasswordTestSpecial', (value) => {
        return !value || !/^[A-Za-z0-9 ]+$/.test(value)
      })
      .required('error:required'),
    confirmPassword: string()
      .oneOf([yup.ref('password'), null], 'error:errorPasswordConfirmNotMatch')
      .required('error:required'),
  }),
}

export const CoreSchema = {
  addDistrict: object({
    dst_logo: mixed()
      .test('dst_logo', 'message:errorFileSize', (value) => {
        return !value || value.size <= 10240000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['jpg', 'jpeg', 'png'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      ),
    dst_category: string('error:stringError').required('error:required'),
    dst_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_name', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      })
      .test('dst_name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required'),
    dst_organization: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_organization', 'error:maxLength40', (value) => {
        return !value || value.length <= 40
      }),
    dst_contact_person: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_contact_person', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('dst_contact_person', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .test('dst_contact_person', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      })
      .required('error:required'),
    dst_contact_email: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_contact_email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('from', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .required('error:required'),
    dst_phone: mixed()
      .test('Phone Number', 'error:validPhone', (value) => {
        return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
      })
      .required('error:required'),
    dst_type: string('error:stringError').required('error:required'),
    dst_description: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_description', 'error:maxLength250', (value) => {
        return !value || value.length <= 250
      }),
    dst_website: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_website', 'error:maxLength80', (value) => {
        return !value || value.length <= 80
      })
      .test('dst_description', 'error:validURL', (value) => {
        return !value || urlRegEx.test(value)
      }),
    dst_school_count: number()
      .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(1, 'error:minCount1')
      .max(50, 'error:maxCount50')
      .required('error:required'),
    dst_slug: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_slug', 'error:maxLength80', (value) => {
        return !value || value.length <= 80
      })
      .required('error:required'),
  }),

  addSchool: object({
    sch_logo: mixed()
      .test('sch_logo', 'message:errorFileSize', (value) => {
        return !value || value.size <= 10240000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['jpg', 'jpeg', 'png'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      ),
    sch_dst_id: string('error:stringError').required('error:required'),
    sch_name: string('error:stringError')
      .test('sch_name', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      })
      .test('sch_name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .trim('error:errorSpace')
      .required('error:required'),
    sch_school_short_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('sch_school_short_name', 'error:maxLength3', (value) => {
        return !value || value.length <= 3
      })
      .test('sch_school_short_name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required'),
    sch_school_type: string('error:stringError').required('error:required'),
    sch_contact_person: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('sch_contact_person', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('sch_contact_person', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .test('sch_contact_person', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      }),
    sch_contact_email: string('error:stringError')
      .test('sch_contact_email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('sch_contact_email', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .required('error:required'),
    sch_phone: mixed()
      .test('sch_phone', 'error:validPhone', (value) => {
        return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
      })
      .required('error:required'),
    adr_address1: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address1', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      })
      .required('error:required'),
    adr_address2: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address2', 'error:maxLength100', (value) => {
        return !value || value.length <= 100
      }),
    adr_country_iso: string('error:stringError').required('error:required'),
    adr_state_iso: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('adr_state_iso', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      }),
    adr_city: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_city', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .required('error:required'),
    adr_zipcode: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_zipcode', 'error:maxLength10', (value) => {
        return !value || value.length <= 10
      })
      .required('error:required'),
    adr_phone: mixed().test('adr_phone', 'error:validPhone', (value) => {
      return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
    }),
    adr_fax: mixed().test('adr_fax', 'error:validPhone', (value) => {
      return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
    }),
    adr_phone_ext: number()
      .typeError('error:numberError')
      .test('adr_phone_ext', 'error:minLength2', (value) => {
        return !value || value.toString().length >= 2
      })
      .test('adr_phone_ext', 'error:maxLength5', (value) => {
        return !value || value.toString().length <= 5
      }),
    sch_description: string('error:stringError')
      .trim('error:errorSpace')
      .test('dst_description', 'error:maxLength250', (value) => {
        return !value || value.length <= 250
      }),
    sch_website: string('error:stringError')
      .trim('error:errorSpace')
      .test('sch_website', 'error:maxLength80', (value) => {
        return !value || value.length <= 80
      })
      .test('dst_description', 'error:validURL', (value) => {
        return !value || urlRegEx.test(value)
      }),
    sch_slug: string('error:stringError')
      .trim('error:errorSpace')
      .test('sch_slug', 'error:maxLength80', (value) => {
        return !value || value.length <= 80
      })
      .required('error:required'),
  }),
  schoolGeneralSetting: object({
    payment_days: number().min(0, 'error:minCount0'),
  }),
  editEmail: object({
    eml_name: string('error:stringError').trim('error:errorSpace').required('error:required'),
    eml_subject: string('error:stringError').trim('error:errorSpace').required('error:required'),
    eml_from_address: string('error:stringError').trim('error:errorSpace').email('error:email'),
    eml_default_to_address: string('error:stringError')
      .trim('error:errorSpace')
      .test('email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('from', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .email('error:email'),
  }),
  registerStudent: object({
    prefix: string('error:stringError').required('error:required'),
    first_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      })
      .required('error:required'),
    middle_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      }),
    last_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      })
      .required('error:required'),
    suffix: string('error:stringError'),
    nick_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength20', (value) => {
        return !value || value.length <= 20
      })
      .required('error:required'),
    dob: string('error:stringError').required('error:required'),
    gender: string('error:stringError').required('error:required'),
    ethnicity: string('error:stringError').trim('error:errorSpace').required('error:required'),
    adr_address1: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address1', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .required('error:required'),
    adr_address2: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_address2', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      }),
    adr_country_iso: string('error:stringError').required('error:required'),
    adr_state_iso: string('error:stringError').trim('error:errorSpace').required('error:required'),
    adr_city: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_city', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .required('error:required'),
    adr_zipcode: string('error:stringError')
      .trim('error:errorSpace')
      .test('adr_zipcode', 'error:maxLength10', (value) => {
        return !value || value.length <= 10
      })
      .required('error:required'),
    email: string('error:stringError')
      .trim('error:errorSpace')
      .test('email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('from', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .required('error:required'),
    adr_mobile: mixed()
      .test('adr_mobile', 'error:validPhone', (value) => {
        return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
      })
      .required('error:required'),
    adr_phone: mixed().test('adr_phone', 'error:validPhone', (value) => {
      return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
    }),
    ssn: string('error:stringError')
      .trim('error:errorSpace')
      .test('ssn', 'error:maxLength4', (value) => {
        return !value || value.length <= 4
      })
      .test('ssn', 'error:number', (value) => {
        return !value || !isNaN(value)
      })
      .required('error:required'),
    upload_id: mixed()
      // .test('required', 'message:required', (value) => {
      //   return !!value
      // })
      .test('fileSize', 'message:errorFileSize', (value) => {
        return !value || value.size <= 10240000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      ),
    security_question: string('error:stringError').required('error:required'),
    security_answer: string('error:stringError').test(
      'security_answer',
      'error:maxLength40',
      (value) => {
        return !value || value.length <= 40
      }
    ),
  }),
  parentInfoForm: object({
    email: string('error:stringError')
      .test('email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('from', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .required('error:required'),
    prefix: string('error:stringError').required('error:required'),
    first_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('first_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('first_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      })
      .required('error:required'),
    middle_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('middle_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('middle_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      }),
    last_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('last_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('last_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      })
      .required('error:required'),
    suffix: string('error:stringError'),
    nick_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('nick_name', 'error:minLength2', (value) => {
        return !value || value.length >= 2
      })
      .test('nick_name', 'error:maxLength26', (value) => {
        return !value || value.length <= 26
      }),
    primary_phone_number: mixed()
      .test('primary_phone_number', 'error:validPhone', (value) => {
        return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
      })
      .required('error:required'),
    home_phone_number: mixed().test('home_phone_number', 'error:validPhone', (value) => {
      return !value || (phoneNumberRegEx.test(value) && value.length <= 10)
    }),
    relationship_with_student: string('error:stringError').required('error:required'),
    ssn: string('error:stringError')
      .trim('error:errorSpace')
      .test('ssn', 'error:maxLength4', (value) => {
        return !value || value.length <= 4
      })
      .test('ssn', 'error:number', (value) => {
        return !value || !isNaN(value)
      })
      .required('error:required'),
  }),
  createTemplate: object({
    name: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      }),
    nickname: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .test('nickname', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      }),
    group: string('error:stringError').required('error:required'),
    districtId: mixed().required('error:required'),
    collection: mixed('error:stringError').required('error:required'),
    service_code: string('error:stringError').required('error:required'),
  }),
  addProgramGeneralInformation: object({
    pgm_logo: yup.lazy((value) => {
      switch (typeof value) {
        case 'object':
          return yup
            .mixed()
            .test('pgm_logo', 'message:errorFileSize', (value) => {
              return !value || value.size <= 10240000
            })
            .test(
              'fileType',
              'message:errorFileTypes',
              (value) =>
                !value ||
                ['jpg', 'jpeg', 'png'].includes(
                  get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
                )
            )
        default:
          return yup.mixed()
      }
    }),
    districtId: string('error:stringError').required('error:required'),
    pgm_school_id: string('error:stringError').required('error:required'),
    pgm_name: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .max(100, 'error:maxLength100')
      .min(5, 'error:minLength5'),
    // .test('pgm_name', 'error:specialCharacter', (value) => {
    //   return !value || specialCharacters.test(value)
    // }),
    pgm_program_category_id: string('error:stringError').required('error:required'),
    pgm_transcript_grade: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .max(8, 'error:maxLength8')
      .test('pgm_transcript_grade', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      }),
    pgm_minimum_age: number()
      .typeError('error:numberError')
      .required('error:required')
      .min(1, 'error:minCount1'),
    pgm_start_date: string('error:stringError').required('error:required'),
    pgm_end_date: string('error:stringError').required('error:required'),
    pgm_expiration: number()
      .integer('error:decimalValue')
      .typeError('error:numberError')
      .required('error:required')
      .min(0, 'error:minCount0')
      .max(999, 'error:maxCount999'),
    pgm_description: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .min(10, 'error:minLength10')
      .max(1000, 'error:maxLength1000'),
    pgm_prerequisites: string('error:stringError')
      .trim('error:errorSpace')
      .min(10, 'error:minLength10')
      .max(1000, 'error:maxLength1000'),
  }),
  editProgramGeneralInformation: object({
    pgm_school_id: string('error:stringError').required('error:required'),
    pgm_name: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .max(100, 'error:maxLength100')
      .min(5, 'error:minLength5'),
    // .test('pgm_name', 'error:specialCharacter', (value) => {
    //   return !value || specialCharacters.test(value)
    // }),
    pgm_program_category_id: string('error:stringError').required('error:required'),
    pgm_transcript_grade: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .max(8, 'error:maxLength8')
      .test('pgm_transcript_grade', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      }),
    pgm_minimum_age: number()
      .typeError('error:numberError')
      .required('error:required')
      .min(1, 'error:minCount1'),
    pgm_start_date: string('error:stringError').required('error:required'),
    pgm_end_date: string('error:stringError').required('error:required'),
    pgm_expiration: number()
      .integer('error:decimalValue')
      .typeError('error:numberError')
      .required('error:required')
      .min(0, 'error:minCount0')
      .max(999, 'error:maxCount999'),
    pgm_description: string('error:stringError')
      .trim('error:errorSpace')
      .required('error:required')
      .min(10, 'error:minLength10')
      .max(1000, 'error:maxLength1000'),
    pgm_prerequisites: string('error:stringError')
      .trim('error:errorSpace')
      .min(10, 'error:minLength10')
      .max(1000, 'error:maxLength1000'),
  }),
  addProgramCertificate: object({
    attributes: yup.array().of(
      yup.object().shape({
        pt_transcript_name: string('error:stringError')
          .trim('error:errorSpace')
          .max(50, 'error:maxLength50')
          .required('error:required'),
        pt_transcript_template_id: string('error:stringError')
          .required('error:required')
          .trim('error:errorSpace'),
      })
    ),
  }),
  addProgramFee: object({
    fee_name: string('error:stringError')
      .required('error:required')
      .max(50, 'error:maxLength50')
      .trim('error:errorSpace'),
    fee_installment_count: number()
      .integer('error:decimalValue')
      .typeError('error:numberError')
      .required('error:required')
      .max(99, 'error:maxLength99')
      .min(0, 'error:minCount0'),
    fee_installment_duration: number()
      .integer('error:decimalValue')
      .typeError('error:numberError')
      .required('error:required')
      .max(999, 'error:maxLength999')
      .min(0, 'error:minCount0'),
    fee_discount_note: string('error:stringError')
      .trim('error:errorSpace')
      .min(10, 'error:minLength10')
      .max(1000, 'error:maxLength1000'),
    fee_line_items: yup.array().of(
      yup.object().shape({
        fli_name: string('error:stringError')
          .trim('error:errorSpace')
          .max(50, 'error:maxLength50')
          .required('error:required'),
        fli_amount: number()
          // .when('fli_amount', {
          //   is: '',
          //   then: yup.number().required(),
          //   otherwise: yup.number(),
          // })
          .typeError('error:numberError')
          .max(9999.999, 'error:maxCount9999.999')
          .test('fli_amount', 'error:decimalTwo', (value) => {
            return !value || decimalTwo.test(value)
          })
          .required('error:required'),
      })
    ),
  }),
  metadata: object({
    default_email_topic: string('error:stringError').required('error:required'),
    default_inapp_topic: string('error:stringError').required('error:required'),
  }),
  addSubject: object({
    sub_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('sub_name', 'error:minLength1', (value) => {
        return !value || value.length >= 1
      })
      .test('sub_name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required')
      .max(50, 'error:maxLength50'),
    sub_code: string('error:stringError')
      .trim('error:errorSpace')
      .test('sub_code', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required')
      .max(50, 'error:maxLength50'),
    sub_district_id: string('error:stringError').required('error:required'),
    sub_school_id: string('error:stringError').required('error:required'),
  }),
  addCourse: object({
    sch_dst_id: string('error:stringError').required('error:required'),
    cr_logo: mixed()
      .test('cr_logo', 'message:errorFileSize', (value) => {
        return !value || value.size <= 10240000
      })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['jpg', 'jpeg', 'png'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      ),
    cr_school_id: string('error:stringError').required('error:required'),
    cr_subject_id: string('error:stringError').required('error:required'),
    cr_number: string('error:stringError')
      .trim('error:errorSpace')
      .test('cr_number', 'error:minLength5', (value) => {
        return !value || value.length >= 5
      })
      .test('cr_number', 'error:maxLength30', (value) => {
        return !value || value.length <= 30
      })
      .test('cr_number', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required'),
    cr_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('cr_name', 'error:minLength5', (value) => {
        return !value || value.length >= 5
      })
      .test('cr_name', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .test('cr_name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required'),
    cr_default_amount: number()
      // .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(9999.99, 'error:maxCount9999.99')
      .test('cr_default_amount', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
    cr_default_credits: number()
      // .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(99.99, 'error:maxCount99.99')
      .test('cr_default_credits', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
    cr_default_passing_grade: number()
      // .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(99.99, 'error:maxCount99.99')
      .test('cr_default_passing_grade', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
    cr_description: string('error:stringError')
      .trim('error:errorSpace')
      .test('cr_description', 'error:minLength10', (value) => {
        return !value || value.length >= 10
      })
      .test('cr_description', 'error:maxLength1000', (value) => {
        return !value || value.length <= 1000
      }),
  }),
  editCourse: object({
    cr_logo: mixed()
      // .test('cr_logo', 'message:errorFileSize', (value) => {
      //   return !value || value.size <= 10240000
      // })
      .test(
        'fileType',
        'message:errorFileTypes',
        (value) =>
          !value ||
          ['jpg', 'jpeg', 'png'].includes(
            get(value, 'name', '').substr(get(value, 'name', '').lastIndexOf('.') + 1)
          )
      ),
    cr_school_id: string('error:stringError').required('error:required'),
    cr_subject_id: string('error:stringError').required('error:required'),
    cr_number: string('error:stringError')
      .trim('error:errorSpace')
      .test('cr_number', 'error:minLength5', (value) => {
        return !value || value.length >= 5
      })
      .test('cr_number', 'error:maxLength30', (value) => {
        return !value || value.length <= 30
      })
      .test('cr_number', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required'),
    cr_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('cr_name', 'error:minLength5', (value) => {
        return !value || value.length >= 5
      })
      .test('cr_name', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .test('cr_name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required'),
    cr_default_amount: number()
      // .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(9999.99, 'error:maxCount9999.99')
      .test('cr_default_amount', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
    cr_default_credits: number()
      // .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(99.99, 'error:maxCount99.99')
      .test('cr_default_credits', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
    cr_default_passing_grade: number()
      // .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(99.99, 'error:maxCount99.99')
      .test('cr_default_passing_grade', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
    cr_description: string('error:stringError')
      .trim('error:errorSpace')
      .test('cr_description', 'error:minLength10', (value) => {
        return !value || value.length >= 10
      })
      .test('cr_description', 'error:maxLength1000', (value) => {
        return !value || value.length <= 1000
      }),
  }),
  addCategory: object({
    pct_name: string('error:stringError').required('error:required').trim('error:errorSpace'),
    pct_color_hex: mixed().required('error:required'),
  }),
  CertificatesDetail: object({
    pt_transcript_name: string('error:stringError')
      .required('error:required')
      .test('pt_transcript_name', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .trim('error:errorSpace'),
    pt_transcript_template_id: mixed().required('error:required'),
  }),
  LinkLibrary: object({
    pl_name: string('error:stringError')
      .required('error:required')
      .trim('error:errorSpace')
      .test('pl_name', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      }),
    pl_url: string()
      .required('error:required')
      .test('pl_url', 'error:validURL', (value) => {
        return !value || urlRegEx.test(value)
      }),
  }),
  addTranscript: object({
    tt_template_name: string('error:stringError')
      .trim('error:errorSpace')
      .test('tt_template_name', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .test('tt_template_name', 'error:specialCharacter', (value) => {
        return !value || specialCharacters.test(value)
      })
      .required('error:required'),
    tt_layout: string('error:stringError').required('error:required'),
    tt_district_id: string('error:stringError').required('error:required').nullable(),
    tt_school_id: string('error:stringError').required('error:required').nullable(),
    // tt_content: string('error:stringError').min(10, 'error:minLength10'),
    // .max(1000, 'error:maxLength1000'),
  }),
  addProgramCourse: object({
    cg_course_group_name: string('error:stringError')
      .trim('error:errorSpace')
      .matches(/[aA-zZ]/, 'error:alphaError')
      .test('tt_template_name', 'error:maxLength50', (value) => {
        return !value || value.length <= 50
      })
      .required('error:required'),
    cg_rule_type: string('error:stringError').required('error:required'),
    cg_rule_value: number()
      .typeError('error:numberError')
      .required('error:required')
      .min(1, 'error:minLength1')
      .max(999, 'error:maxLength999'),
  }),
  addCourseGroupItem: object({
    cgi_amount: number()
      // .integer('error:validWholeNumber')
      // .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(999.99, 'error:maxCount999.99'),
    cgi_credits: number()
      // .integer('error:validWholeNumber')
      // .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(99.99, 'error:maxCount99.99'),
    cgi_passing_grade: number()
      // .integer('error:validWholeNumber')
      // .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(99.99, 'error:maxCount99.99'),
  }),
  editCourseGroupItem: object({
    cgi_amount: number()
      // .integer('error:validWholeNumber')
      .test('cgi_credits', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      })
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(999.99, 'error:maxCount999.99'),
    cgi_credits: number()
      // .integer('error:validWholeNumber')
      .test('cgi_credits', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      })
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(99.99, 'error:maxCount99.99'),
    cgi_passing_grade: number()
      .test('cgi_passing_grade', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      })
      // .integer('error:validWholeNumber')
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(100, 'error:maxCount100'),
  }),
  paymentAppIdForm: object({
    application_name: string('error:stringError').required('error:required'),
    application_email: string('error:stringError')
      .test('application_email', 'error:maxLength65', (value) => {
        return !value || value.length <= 65
      })
      .test('application_email', 'error:validEmail', (value) => {
        return emailRegexWithAlias.test(value)
      })
      .required('error:required'),
  }),
  editEarnedCredit: object({
    enc_credit_earned: number()
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .test('enc_credit_earned', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
  }),
  editReceivedGrade: object({
    enc_received_grade: number()
      .typeError('error:validWholeNumber')
      .min(0, 'error:minCount0')
      .max(100, 'error:maxLength100')
      .test('enc_received_grade', 'error:decimalTwo', (value) => {
        return !value || decimalTwo.test(value)
      }),
  }),
  addEnrollmentNote: object({
    sn_note: string('error:stringError')
      .trim('error:errorSpace')
      .matches(/[aA-zZ]/, 'error:alphaError')
      .test('sn_note', 'error:minLength1', (value) => {
        return !value || value.length >= 1
      })
      .test('sn_note', 'error:maxLength99', (value) => {
        return !value || value.length <= 99
      })
      .required('error:required'),
    sn_note_type: string('error:stringError').trim('error:errorSpace').required('error:required'),
    sn_description: string('error:stringError')
      .matches(/[aA-zZ]/, 'error:alphaError')
      .test('sn_description', 'error:minLength17', (value) => {
        return !value || value.length >= 17
      })
      //minLength17 added becuase in validation Sn_description is taking value with p tag.,
      .test('sn_description', 'error:maxLength1000', (value) => {
        return !value || value.length <= 1000
      })
      .required('error:required'),
    snf_file: mixed()
      .test('snf_file', 'error:maxLength5', (value) => {
        return !value || value.length <= 5
      })
      .test('snf_file', 'message:errorFileSize10', (value) => {
        return value.every((item) => {
          const flag = isNaN(item) || item.size <= 10240000
          item.isValid = flag
          return flag
        })
      })
      .test('snf_file', 'message:errorFileType', (value) => {
        const fileTypes = ['pdf', 'doc', 'docx', 'jpg', 'jpeg', 'png', 'txt', 'xlsx', 'xls', 'csv']
        return value.every((item) => {
          const flag =
            !!item.snf_file ||
            fileTypes.includes(
              (
                get(item, 'name', '').substr(get(item, 'name', '').lastIndexOf('.') + 1) || ''
              ).toLowerCase()
            )
          item.isValid = flag
          return flag
        })
      }),
  }),
  addWalletMoney: object({
    points: string('error:stringError').required('error:required'),
    reason: string('error:stringError').required('error:required'),
  }),
  addUpdateGradeScales: object({
    state: yup.array().of(
      yup.object().shape({
        gr_name: string('error:stringError').required('error:required'),
        gr_label: string('error:stringError').required('error:required'),
        gr_upper_limit: number()
          .typeError('error:validWholeNumber')
          .required('error:required')
          .test('gr_upper_limit', 'error:decimalTwo', (value) => {
            return !value || decimalTwo.test(value)
          }),
        gr_lower_limit: number()
          .typeError('error:validWholeNumber')
          .required('error:required')
          .test('gr_lower_limit', 'error:decimalTwo', (value) => {
            return !value || decimalTwo.test(value)
          })
          .lessThan(yup.ref('gr_upper_limit'), 'error:lessThanMin'),
        gr_regular: number('error:stringError')
          .typeError('error:validWholeNumber')
          .required('error:required')
          .test('gr_regular', 'error:decimalTwo', (value) => {
            return !value || decimalTwo.test(value)
          }),
        gr_honours: number('error:stringError')
          .typeError('error:validWholeNumber')
          .required('error:required')
          .test('gr_honours', 'error:decimalTwo', (value) => {
            return !value || decimalTwo.test(value)
          }),
        gr_ap_de: number('error:stringError')
          .typeError('error:validWholeNumber')
          .required('error:required')
          .test('gr_ap_de', 'error:decimalTwo', (value) => {
            return !value || decimalTwo.test(value)
          }),
      })
    ),
  }),
}
