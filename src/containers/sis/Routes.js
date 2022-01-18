import PropTypes from 'prop-types'
import React from 'react'
import { Redirect, Switch } from 'react-router-dom'
import { useRouteMatch } from 'react-router-dom'

import PrivateRoute from '../../PrivateRoute'
import AddDistrict from './AddDistrict'
import AddDistrictInstitute from './AddDistrictInstitute'
import AddEditLMS from './AddEditLMS'
import AddProgram from './AddProgram'
import AddSchool from './AddSchool'
import AddTemplate from './AddTemplate'
import AddTranScript from './AddTranScript'
import AddUser from './AddUser'
import AllApplication from './AllApplication'
import AllCourse from './AllCourse'
import AllEnrollments from './AllEnrollments'
import AllPrograms from './AllPrograms'
import AllSubjects from './AllSubjects'
import ApplicationDetails from './ApplicationDetails'
import AppSettings from './AppSettings'
import Audit from './Audit'
import AuditDetails from './AuditDetails'
import Configuration from './Configuration'
import CourseDetail from './CourseDetail'
import CreateTopic from './CreateTopic'
import CustomReports from './CustomReports'
import DailyReports from './DailyReports'
import Dashboard from './Dashboard'
import DashboardList from './DashboardList'
import DistrictDetails from './DistrictDetails'
import DistrictDetailsInstitute from './DistrictDetailsInstitute'
import Districts from './Districts'
import DistrictsInstitute from './DistrictsInstitute'
import EditCourse from './EditCourse'
import EditDistrict from './EditDistrict'
import EditDistrictInstitute from './EditDistrictInstitute'
import EditEmail from './EditEmail'
import EditRole from './EditRole'
import EditSchool from './EditSchool'
import EditSubject from './EditSubject'
import EditTemplate from './EditTemplate'
import EditTranScript from './EditTranScript'
import EditUser from './EditUser'
import Emails from './Emails'
import EnrollmentDetail from './EnrollmentDetail'
import GraduateReports from './GraduateReports'
import InActivityReports from './InActivityReports'
import Notification from './Notification'
import PageNotFound from './PageNotFound'
import ProgramDetail from './ProgramDetail'
import RenameTemplate from './RenameTemplate'
import Roles from './Roles'
import SchoolDetails from './SchoolDetails'
import Schools from './Schools'
import Templates from './Templates'
import TopicLogDetail from './TopicLogDetail'
import TopicLogs from './TopicLogs'
import TranScript from './TranScript'
import User from './User'
import UserDetails from './UserDetails'
import ViewEmail from './ViewEmail'
/**
 * Defines a component Routes
 * Used for routing in SIS
 * @returns {*}
 * @constructor
 */
function Routes({ authUser }) {
  const match = useRouteMatch()
  /**
   * renders JSX of Routes component
   */
  return (
    <div style={{ width: '100%' }}>
      <Switch>
        <PrivateRoute exact path={`${match.url}/dashboardlist`}>
          <DashboardList />
        </PrivateRoute>
        <PrivateRoute exact path={`${match.url}/dashboard/:dashboardId`}>
          <Dashboard />
        </PrivateRoute>
        {authUser.showUser && (
          <PrivateRoute exact path={`${match.url}/users`}>
            <User />
          </PrivateRoute>
        )}
        {authUser.showUser && (
          <PrivateRoute exact path={`${match.url}/users/adduser`}>
            <AddUser />
          </PrivateRoute>
        )}
        {authUser.showUser && (
          <PrivateRoute exact path={`${match.url}/users/edituser/:userId`}>
            <EditUser />
          </PrivateRoute>
        )}
        {authUser.showUser && (
          <PrivateRoute exact path={`${match.url}/users/userdetails/:userId`}>
            <UserDetails />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute exact path={`${match.url}/organizations/districts`}>
            <Districts />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute exact path={`${match.url}/institute/districts`}>
            <DistrictsInstitute />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute exact path={`${match.url}/organizations/districts/adddistrict`}>
            <AddDistrict />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute exact path={`${match.url}/institute/districts/adddistrict`}>
            <AddDistrictInstitute />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute
            exact
            path={`${match.url}/organizations/districts/editdistrict/:districtId`}
          >
            <EditDistrict />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute exact path={`${match.url}/institute/districts/editdistrict/:districtId`}>
            <EditDistrictInstitute />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute
            exact
            path={`${match.url}/organizations/districts/districtdetails/:districtId`}
          >
            <DistrictDetails />
          </PrivateRoute>
        )}
        {authUser.showDistrict && (
          <PrivateRoute exact path={`${match.url}/institute/districts/districtdetails/:districtId`}>
            <DistrictDetailsInstitute />
          </PrivateRoute>
        )}

        {authUser.showSchool && (
          <PrivateRoute exact path={`${match.url}/organizations/schools`}>
            <Schools />
          </PrivateRoute>
        )}
        {authUser.showSchool && (
          <PrivateRoute exact path={`${match.url}/organizations/schools/addschool`}>
            <AddSchool />
          </PrivateRoute>
        )}
        {authUser.showSchool && (
          <PrivateRoute exact path={`${match.url}/organizations/schools/editschool/:schoolId`}>
            <EditSchool />
          </PrivateRoute>
        )}
        {authUser.showSchool && (
          <PrivateRoute exact path={`${match.url}/organizations/schools/schooldetails/:schoolId`}>
            <SchoolDetails />
          </PrivateRoute>
        )}
        {authUser.showSchool && (
          <PrivateRoute exact path={`${match.url}/organizations/schools/addnewlms`}>
            <AddEditLMS />
          </PrivateRoute>
        )}
        {authUser.showSchool && (
          <PrivateRoute exact path={`${match.url}/organizations/schools/editlms`}>
            <AddEditLMS />
          </PrivateRoute>
        )}
        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/audit`}>
            <Audit />
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/audit/auditdetails/:auditLogId`}>
            <AuditDetails />
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/emails`}>
            <Emails />
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute
            exact
            path={`${match.url}/settings/emails/editemail/:emailId?/:schPublicId?`}
          >
            <EditEmail />{' '}
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/emails/viewemail`}>
            <ViewEmail />
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/templates`}>
            <Templates />
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/templates/addtemplate`}>
            <AddTemplate />
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/templates/renametemplate/:templateID?`}>
            <RenameTemplate />
          </PrivateRoute>
        )}

        {authUser.showSetting && (
          <PrivateRoute exact path={`${match.url}/settings/templates/edittemplate/:templateID?`}>
            <EditTemplate />
          </PrivateRoute>
        )}

        {authUser.isAdmin && (
          <PrivateRoute exact path={`${match.url}/administration/roles`}>
            <Roles />
          </PrivateRoute>
        )}
        {authUser.isAdmin && (
          <PrivateRoute exact path={`${match.url}/administration/roles/editrole/:id`}>
            <EditRole />
          </PrivateRoute>
        )}
        {authUser.isAdmin && (
          <PrivateRoute exact path={`${match.url}/administration/notification`}>
            <Notification />
          </PrivateRoute>
        )}
        {authUser.isAdmin && (
          <PrivateRoute exact path={`${match.url}/administration/notification/createtopic`}>
            <CreateTopic />
          </PrivateRoute>
        )}
        {authUser.isAdmin && (
          <PrivateRoute
            exact
            path={`${match.url}/administration/notification/configuration/:topicId?`}
          >
            <Configuration />
          </PrivateRoute>
        )}
        {authUser.isAdmin && (
          <PrivateRoute exact path={`${match.url}/administration/notification/topiclogs/:topicId?`}>
            <TopicLogs />
          </PrivateRoute>
        )}
        {authUser.isAdmin && (
          <PrivateRoute
            exact
            path={`${match.url}/administration/notification/topiclogs/topiclogsdetail/:topicId/:logId`}
          >
            <TopicLogDetail />
          </PrivateRoute>
        )}
        {authUser.isAdmin && (
          <PrivateRoute exact path={`${match.url}/administration/appsettings`}>
            <AppSettings />
          </PrivateRoute>
        )}

        {authUser.showApplication && (
          <PrivateRoute exact path={`${match.url}/application`}>
            <AllApplication />
          </PrivateRoute>
        )}

        {authUser.showApplication && (
          <PrivateRoute
            exact
            path={`${match.url}/application/applicationdetails/:schoolId/:userId`}
          >
            <ApplicationDetails />
          </PrivateRoute>
        )}

        {authUser.showProgram && (
          <PrivateRoute exact path={`${match.url}/programs/allprograms`}>
            <AllPrograms />
          </PrivateRoute>
        )}

        {authUser.showProgram && (
          <PrivateRoute exact path={`${match.url}/programs/addprogram`}>
            <AddProgram />
          </PrivateRoute>
        )}

        {authUser.showProgram && (
          <PrivateRoute exact path={`${match.url}/programs/allprograms/programdetails/:programId`}>
            <ProgramDetail />
          </PrivateRoute>
        )}

        {authUser.showCourse && (
          <PrivateRoute exact path={`${match.url}/programs/courses`}>
            <AllCourse />
          </PrivateRoute>
        )}

        {authUser.showCourse && (
          <PrivateRoute exact path={`${match.url}/programs/courses/coursedetails/:courseId`}>
            <CourseDetail />
          </PrivateRoute>
        )}

        {authUser.showCourse && (
          <PrivateRoute exact path={`${match.url}/programs/courses/editcourse/:courseId`}>
            <EditCourse />
          </PrivateRoute>
        )}

        {authUser.showSubject && (
          <PrivateRoute exact path={`${match.url}/programs/subjects`}>
            <AllSubjects />
          </PrivateRoute>
        )}

        {authUser.showSubject && (
          <PrivateRoute exact path={`${match.url}/programs/subjects/editsubject/:subjectId?`}>
            <EditSubject />
          </PrivateRoute>
        )}

        {authUser.showProgram && (
          <PrivateRoute exact path={`${match.url}/programs`}>
            <AllPrograms />
          </PrivateRoute>
        )}

        {authUser.showProgram && (
          <PrivateRoute exact path={`${match.url}/programs/addprogram`}>
            <AddProgram />
          </PrivateRoute>
        )}

        {authUser.showTranscript && (
          <PrivateRoute exact path={`${match.url}/transcript`}>
            <TranScript />
          </PrivateRoute>
        )}
        {authUser.showTranscript && (
          <PrivateRoute exact path={`${match.url}/transcript/addtranscript`}>
            <AddTranScript />
          </PrivateRoute>
        )}
        {authUser.showTranscript && (
          <PrivateRoute exact path={`${match.url}/transcript/edittranscript/:transcriptId`}>
            <EditTranScript />
          </PrivateRoute>
        )}

        {authUser.showEnrollment && (
          <PrivateRoute exact path={`${match.url}/allenrollments`}>
            <AllEnrollments />
          </PrivateRoute>
        )}
        {authUser.showEnrollment && (
          <PrivateRoute exact path={`${match.url}/allenrollments/enrollmentdetail/:enrId`}>
            <EnrollmentDetail />
          </PrivateRoute>
        )}

        {authUser.showReport && (
          <PrivateRoute exact path={`${match.url}/reports/dailyreport`}>
            <DailyReports />
          </PrivateRoute>
        )}
        {authUser.showReport && (
          <PrivateRoute exact path={`${match.url}/reports/inactivityreport`}>
            <InActivityReports />
          </PrivateRoute>
        )}
        {authUser.showReport && (
          <PrivateRoute exact path={`${match.url}/reports/graduatereport`}>
            <GraduateReports />
          </PrivateRoute>
        )}
        {authUser.showReport && (
          <PrivateRoute exact path={`${match.url}/reports/customreport`}>
            <CustomReports />
          </PrivateRoute>
        )}

        <PrivateRoute
          exact
          path={match.url}
          render={() => <Redirect to={`${match.url}/dashboard`} />}
        />
        <PrivateRoute exact path={`${match.url}/pagenotfound`}>
          <PageNotFound />
        </PrivateRoute>
        <Redirect to="/notfound" />
      </Switch>
    </div>
  )
}

Routes.propTypes = {
  authUser: PropTypes.object,
}

Routes.defaultProps = {
  authUser: {},
}

/**
 * @exports Routes component
 */
export default Routes
