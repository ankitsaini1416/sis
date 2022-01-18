const permissions = [
  { name: 'ListDistricts', group: 'SIS' },
  { name: 'ReadDistrict', group: 'SIS' },
  { name: 'CreateDistrict', group: 'SIS' },
  { name: 'UpdateDistrict', group: 'SIS' },
  { name: 'DeleteDistrict', group: 'SIS' },
  { name: 'ListDistrictSchools', group: 'SIS' },
  { name: 'ReadDistrictSchoolsDetail', group: 'SIS' },

  { name: 'ListSchool', group: 'SIS' },
  { name: 'ReadSchool', group: 'SIS' },
  { name: 'CreateSchool', group: 'SIS' },
  { name: 'UpdateSchool', group: 'SIS' },
  { name: 'DeleteSchool', group: 'SIS' },

  { name: 'ReadSchoolGeneralInfo', group: 'SIS' },
  { name: 'ReadSchoolGeneralSettings', group: 'SIS' },
  { name: 'UpdateSchoolGeneralSettings', group: 'SIS' },
  { name: 'ReadSchoolCountries', group: 'SIS' },
  { name: 'UpdateSchoolCountries', group: 'SIS' },

  { name: 'ReadSchoolPayment', group: 'SIS' },
  { name: 'UpdateSchoolPayment', group: 'SIS' },
  { name: 'DeleteSchoolPayment', group: 'SIS' },
  { name: 'CreateSchoolPayment', group: 'SIS' },

  { name: 'ReadSchoolLMS', group: 'SIS' },
  { name: 'UpdateSchoolLMS', group: 'SIS' },
  { name: 'DeleteSchoolLMS', group: 'SIS' },
  { name: 'CreateSchoolLMS', group: 'SIS' },

  { name: 'ReadSchoolProgramCategory', group: 'SIS' },
  { name: 'UpdateSchoolProgramCategory', group: 'SIS' },
  { name: 'DeleteSchoolProgramCategory', group: 'SIS' },
  { name: 'CreateSchoolProgramCategory', group: 'SIS' },

  { name: 'ListProgram', group: 'SIS' },
  { name: 'ReadProgram', group: 'SIS' },
  { name: 'CreateProgram', group: 'SIS' },
  { name: 'UpdateProgram', group: 'SIS' },
  { name: 'DeleteProgram', group: 'SIS' },

  { name: 'ListProgramCategory', group: 'SIS' },
  { name: 'CreateProgramCategory', group: 'SIS' },
  { name: 'ReadProgramCategory', group: 'SIS' },
  { name: 'UpdateProgramCategory', group: 'SIS' },
  { name: 'DeleteProgramCategory', group: 'SIS' },

  { name: 'ListLMS', group: 'SIS' },
  { name: 'CreateLMS', group: 'SIS' },
  { name: 'ReadLMS', group: 'SIS' },
  { name: 'UpdateLMS', group: 'SIS' },
  { name: 'DeleteLMS', group: 'SIS' },

  { name: 'ImportLMSCourse', group: 'SIS' },
  { name: 'ImportLMSEnrollment', group: 'SIS' },
  { name: 'GetLMSAccessCode', group: 'SIS' },
  { name: 'GetLMSAuthorizeLink', group: 'SIS' },

  { name: 'ListCourse', group: 'SIS' },
  { name: 'ReadCourse', group: 'SIS' },
  { name: 'CreateCourse', group: 'SIS' },
  { name: 'UpdateCourse', group: 'SIS' },
  { name: 'DeleteCourse', group: 'SIS' },

  { name: 'ListCourseGroup', group: 'SIS' },
  { name: 'ReadCourseGroup', group: 'SIS' },
  { name: 'CreateCourseGroup', group: 'SIS' },
  { name: 'UpdateCourseGroup', group: 'SIS' },
  { name: 'DeleteCourseGroup', group: 'SIS' },
  { name: 'ListCourseGroupItem', group: 'SIS' },
  { name: 'ReadCourseGroupItem', group: 'SIS' },
  { name: 'CreateCourseGroupItem', group: 'SIS' },
  { name: 'UpdateCourseGroupItem', group: 'SIS' },
  { name: 'DeleteCourseGroupItem', group: 'SIS' },

  { name: 'ListStudent', group: 'SIS' },
  { name: 'ReadStudent', group: 'SIS' },
  { name: 'CreateStudent', group: 'SIS' },
  { name: 'UpdateStudent', group: 'SIS' },
  { name: 'DeleteStudent', group: 'SIS' },

  { name: 'ListEnrollment', group: 'SIS' },
  { name: 'ReadEnrollment', group: 'SIS' },
  { name: 'CreateEnrollment', group: 'SIS' },
  { name: 'UpdateEnrollment', group: 'SIS' },
  { name: 'DeleteEnrollment', group: 'SIS' },

  { name: 'ListTranscriptTemplate', group: 'SIS' },
  { name: 'ReadTranscriptTemplate', group: 'SIS' },
  { name: 'CreateTranscriptTemplate', group: 'SIS' },
  { name: 'UpdateTranscriptTemplate', group: 'SIS' },
  { name: 'DeleteTranscriptTemplate', group: 'SIS' },

  { name: 'ListInvoice', group: 'SIS' },
  { name: 'ReadInvoice', group: 'SIS' },
  { name: 'CreateInvoice', group: 'SIS' },
  { name: 'UpdateInvoice', group: 'SIS' },
  { name: 'DeleteInvoice', group: 'SIS' },

  { name: 'ListInvoiceItem', group: 'SIS' },
  { name: 'CreateInvoiceItem', group: 'SIS' },
  { name: 'ReadInvoiceItem', group: 'SIS' },
  { name: 'UpdateInvoiceItem', group: 'SIS' },
  { name: 'DeleteInvoiceItem', group: 'SIS' },

  { name: 'ListInvoiceItemAmount', group: 'SIS' },
  { name: 'CreateInvoiceItemAmount', group: 'SIS' },
  { name: 'ReadInvoiceItemAmount', group: 'SIS' },
  { name: 'UpdateInvoiceItemAmount', group: 'SIS' },
  { name: 'DeleteInvoiceItemAmount', group: 'SIS' },

  { name: 'ListFee', group: 'SIS' },
  { name: 'CreateFee', group: 'SIS' },
  { name: 'ReadFee', group: 'SIS' },
  { name: 'UpdateFee', group: 'SIS' },
  { name: 'DeleteFee', group: 'SIS' },

  { name: 'ListTransaction', group: 'SIS' },
  { name: 'ReadTransaction', group: 'SIS' },
  { name: 'CreateTransaction', group: 'SIS' },
  { name: 'UpdateTransaction', group: 'SIS' },
  { name: 'DeleteTransaction', group: 'SIS' },

  { name: 'ListSuccessCoach', group: 'SIS' },
  { name: 'CreateSuccessCoach', group: 'SIS' },
  { name: 'ReadSuccessCoach', group: 'SIS' },
  { name: 'UpdateSuccessCoach', group: 'SIS' },
  { name: 'DeleteSuccessCoach', group: 'SIS' },

  { name: 'ListSubject', group: 'SIS' },
  { name: 'ReadSubject', group: 'SIS' },
  { name: 'CreateSubject', group: 'SIS' },
  { name: 'UpdateSubject', group: 'SIS' },
  { name: 'DeleteSubject', group: 'SIS' },

  { name: 'ListSubjectNote', group: 'SIS' },
  { name: 'ReadSubjectNote', group: 'SIS' },
  { name: 'CreateSubjectNote', group: 'SIS' },
  { name: 'UpdateSubjectNote', group: 'SIS' },
  { name: 'DeleteSubjectNote', group: 'SIS' },

  { name: 'ListAffiliates', group: 'SIS' },
  { name: 'ReadAffiliates', group: 'SIS' },
  { name: 'CreateAffiliates', group: 'SIS' },
  { name: 'UpdateAffiliates', group: 'SIS' },
  { name: 'DeleteAffiliates', group: 'SIS' },

  { name: 'ListEmail', group: 'SIS' },
  { name: 'ReadEmail', group: 'SIS' },
  { name: 'CreateEmail', group: 'SIS' },
  { name: 'UpdateEmail', group: 'SIS' },
  { name: 'DeleteEmail', group: 'SIS' },
]

const map = function () {
  return permissions.reduce((a, b) => {
    a[`${b.group}/${b.name}`] = `${b.group}/${b.name}`
    return a
  }, {})
}

export default map()
