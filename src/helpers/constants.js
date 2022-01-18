export const USEQUERY = false

export const ROUTES = {
  DASHBOARD: '/sis/dashboard',
  DASHBOARDLIST: 'sis/dashboardlist',
  ORGANIZATIONS: '/sis/organizations',
  DISTRICT: '/sis/organizations/districts',
  ADDDISTRICT: '/sis/organizations/districts/adddistrict',
  DISTRICTDETAILS: '/sis/organizations/districts/districtdetails',
  EDITDISTRICT: '/sis/organizations/districts/editdistrict',
  ADDSCHOOL: '/sis/organizations/schools/addschool',
  SCHOOLS: '/sis/organizations/schools',
  EDITSCHOOL: '/sis/organizations/schools/editschool',
  SCHOOLDETAILS: '/sis/organizations/schools/schooldetails',
  EDITLMS: '/sis/organizations/schools/editlms',
  ADDNEWLMS: '/sis/organizations/schools/addnewlms',
  REGISTERATIONS: 'sis/application',
  VIEWAPPLICATIONDETAILS: 'sis/application/applicationdetails',
  PROGRAMS: 'sis/programs',
  ADDPROGRAM: 'sis/programs/addprogram',
  PROGRAMDETAIL: 'sis/programs/allprograms/programdetails',
  EDITPROGRAMDETAILS: 'sis/programs/allprograms/programdetails/editprogramdetails',
  COURSES: 'sis/programs/courses',
  COURSESDETAILS: 'sis/programs/courses/coursedetails',
  EDITCOURSES: 'sis/programs/courses/editcourse',
  SUBJECTS: 'sis/programs/subjects',
  EDITSUBJECT: 'sis/programs/subjects/editsubject',
  ALLUSERS: '/sis/users',
  USERDETAILS: '/sis/users/userdetails',
  EDITUSER: '/sis/users/edituser',
  ADDUSER: '/sis/users/adduser',
  EDITROLE: '/sis/administration/roles/editrole',
  ALLROLES: '/sis/administration/roles',
  NOTIFICATION: 'sis/administration/notification',
  EDITTOPIC: 'sis/administration/notification/configuration',
  ADDNEWTOPIC: 'sis/administration/notification/createtopic',
  CONFIGRATION: '/sis/administration/notification/configuration',
  TOPICLOGS: '/sis/administration/notification/topiclogs',
  TOPICLOGSDETAIL: '/sis/administration/notification/topiclogs/topiclogsdetail',
  APPSETTINGS: '/sis/administration/appsettings',
  FORGOTPASSWORD: '/forgotpassword',
  LOGIN: '/login',
  SETTINGS: '/sis/settings',
  AUDIT: '/sis/settings/audit',
  AUDITDETAILS: '/sis/settings/audit/auditdetails',
  EMAIL: '/sis/settings/emails',
  EDITEMAIL: 'sis/settings/emails/editemail',
  VIEWEMAIL: 'sis/settings/emails/viewemail',
  TEMPLATES: 'sis/settings/templates',
  ADDTEMPLATE: 'sis/settings/templates/addtemplate',
  UPLOADTEMPLATE: 'sis/settings/templates/uploadtemplate',
  RENAMETEMPLATE: 'sis/settings/templates/renametemplate',
  COPYTEMPLATE: 'sis/settings/templates/copytemplate',
  EDITTEMPLATE: 'sis/settings/templates/edittemplate',
  TEMPLATE: 'sis/settings/templates',
  TRANSCRIPT: 'sis/transcript',
  ADDTRANSCRIPT: 'sis/transcript/addtranscript',
  EDITTRANSCRIPT: 'sis/transcript/edittranscript',
  ALLENROLLMENTS: 'sis/allenrollments',
  ENROLLMENTDETAIL: 'sis/allenrollments/enrollmentdetail',
  ALLSTUDENTREPORTS: 'sis/reports/allstudents',
  DAILYREPORTS: 'sis/reports/dailyreport',
  INACTIVITYREPORTS: 'sis/reports/inactivityreport',
  GRADUATEREPORTS: 'sis/reports/graduatereport',
  CUSTOMREPORTS: 'sis/reports/customreport',
  INSTITUTE: '/sis/institute',
  DISTRICTINSTITUTE: '/sis/institute/districts',
  ADDDISTRICTINSTITUTE: '/sis/institute/districts/adddistrict',
  DISTRICTDETAILSINSTITUTE: '/sis/institute/districts/districtdetails',
  EDITDISTRICTINSTITUTE: '/sis/institute/districts/editdistrict',
}

export const MESSAGE_SEVERITIES = {
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
  SUCCESS: 'success',
}
export const REGISTERATION_STATUS = {
  INPROCESS: 'INPROCESS',
  APPROVED: 'APPROVED',
  DENIED: 'DENIED',
}

export const ENROLLMENT_STATUS = {
  ENROLLED: 'enrolled',
  PENDING: 'pending_payment',
  DECLINEDPAYMENT: 'declined_payment',
  LOCKED: 'locked',
  DROPPED: 'dropped',
  GRADUATED: 'graduated',
  TRANSFERRED: 'transferred',
  REQUESTFORTRANSFER: 'request_for_transfer',
  PASSED: 'passed',
  FAILED: 'failed',
  INEVALUATION: 'in_evaluation',
  HOLD: 'hold',
  REJECTED: 'rejected',
  INPRINTOFFICE: 'in_print_office',
  PACKAGEPREPARATION: 'package_preparation',
  PRINTED: 'printed',
}

export const ADMIN_TYPES = {
  MASTER_ADMIN: 'MA',
  DISTRICT_ADMIN: 'DA',
  SCHOOL_ADMIN: 'SA',
}
export const TablePageData = {
  current_page: 1,
  from: 1,
  last_page: 1,
  per_page: 10,
  to: 0,
  total: 0,
  query: '',
  per_page_options: [5, 10, 25, 50, 75, 100, 200],
}

export const ROLETYPES = {
  TYPESERVICEADMIN: 'svc-adm',
  TYPESERVICE: 'svc',
  TYPECUSTOM: 'etc',
  TYPEPLATFORM: 'platform',
}

export const PROCESSSTATUSES = {
  WAITING: 0,
  ACTIVE: 1,
  COMPLETED: 2,
}

export const RULE_TYPES = {
  NUMBER_OF_COURSES: 'by_number_of_courses',
  CREDIT_VALUE: 'by_total_credit_value',
}

export const ROLE_KINDS = {
  SYSTEM: 'SYSTEM',
  CUSTOM: 'CUSTOM',
  PREDEFINED: 'PREDEFINED',
}
export const DEFAULTURL = {
  DEFAULT: 'default',
}
export const SUCCESSCOACH = 'successcoach'
export const INSTRUCTOR = 'instructor'

export const UsPhoneCode = '+1'
export const DATEFORMAT = 'MM/DD/YYYY'
export const DATEFORMATWITHTIME = 'MM/DD/YYYY HH:mm:ss'

export const WALLETTRANSACTIONACTION = 'credit'

export const ROLE_SELECTION_TYPES = {
  ROOT: 'rootTypeRole',
  DISTRICT: 'districtTypeRole',
  SCHOOL: 'schoolTypeRole',
}

export const WIZARD_TYPES = {
  BAR: 'Bar Chart',
  PIE: 'Pie Chart',
}
