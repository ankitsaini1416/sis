import React from 'react'
import {
  Briefcase,
  FileText,
  Grid,
  HardDrive,
  Home,
  Layers,
  Settings,
  Shield,
  UserCheck,
} from 'react-feather'

// import { useTranslation } from 'react-i18next'
// import { Briefcase, Home, Key, Users } from 'react-feather'
import { getSchoolUrl } from '../../helpers/utils'
import { ROUTES } from './../../helpers/constants'
/**
 * Menu item json for SIS
 * @type {(({name: string, icon: *, id: string, type: string, url: string}|{name: string, icon: *, id: string, type: string, url: string}|{name: string, icon: *, id: string, type: string, url: string})[]|{name: string, icon: *, id: string, type: string, url: string}[]|{name: string, icon: *, id: string, type: string, url: string}[])[]}
 */

// eslint-disable-next-line no-unused-vars

export const MenuItems = ({ params }, authUser) => {
  // const { t } = useTranslation()
  return [
    {
      // url: getSchoolUrl({ ...params, to: ROUTES.DASHBOARD }),
      name: 'Dashboard',
      id: 'dashboard',
      icon: <Home width={16} height={16} />,
      className: 'menuLink',
      showRoot: true,
      data: [
        {
          url: getSchoolUrl({ ...params, to: ROUTES.DASHBOARDLIST }),
          name: 'Manage Dashboards',
          id: 'dashboardlist',
          className: 'menuLink1',
          showRoot: authUser.showSetting,
        },
      ],
    },
    {
      url: getSchoolUrl({ ...params, to: ROUTES.ORGANIZATIONS }),
      name: 'Organizations',
      id: 'organizations',
      icon: <Briefcase width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showDistrict || authUser.showSchool,
      data: [
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.DISTRICT,
          }),
          name: 'Districts',
          id: 'districts',
          className: 'menuLink1',
          showRoot: authUser.showDistrict,
        },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.SCHOOLS,
          }),
          name: 'Schools',
          id: 'schools',
          className: 'menuLink1',
          showRoot: authUser.showSchool,
        },
      ],
    },
    {
      url: getSchoolUrl({ ...params, to: ROUTES.REGISTERATIONS }),
      name: 'Applications',
      id: 'allApplications',
      showRoot: authUser.showApplication,
      icon: <FileText width={16} height={16} />,
      className: 'menuLink',
    },
    {
      url: getSchoolUrl({ ...params, to: '/sis/allenrollments' }),
      name: 'Enrollments',
      id: 'enrollments',
      icon: <UserCheck width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showEnrollment,
      data: [
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.ALLENROLLMENTS,
          }),
          name: 'All Enrollments',
          id: 'allenrollments',
          className: 'menuLink1',
          showRoot: authUser.showEnrollment,
        },
      ],
    },
    {
      url: getSchoolUrl({ ...params, to: '/sis/programs' }),
      name: 'Programs',
      id: 'programs',
      icon: <Grid width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showProgram || authUser.showCourse || authUser.showSubject,
      data: [
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.PROGRAMS,
          }),
          name: 'All Programs',
          id: 'allPrograms',
          className: 'menuLink1',
          showRoot: authUser.showProgram,
        },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.SUBJECTS,
          }),
          name: 'All Subjects',
          id: 'allSubjects',
          className: 'menuLink1',
          showRoot: authUser.showSubject,
        },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.COURSES,
          }),
          name: 'All Courses',
          id: 'allCourses',
          className: 'menuLink1',
          showRoot: authUser.showCourse,
        },
      ],
    },
    {
      url: getSchoolUrl({ ...params, to: ROUTES.TRANSCRIPT }),
      name: 'Transcripts',
      id: 'tranScript',
      icon: <Layers width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showTranscript,
    },
    {
      url: getSchoolUrl({ ...params, to: '/sis/reports' }),
      name: 'Reports',
      id: 'reports',
      icon: <UserCheck width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showReport,
      data: [
        // {
        //   url: getSchoolUrl({
        //     ...params,
        //     to: ROUTES.ALLSTUDENTREPORTS,
        //   }),
        //   name: 'All Students',
        //   id: 'allstudents',
        //   className: 'menuLink1',
        // },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.DAILYREPORTS,
          }),
          name: 'Daily Report',
          id: 'dailyreport',
          className: 'menuLink1',
          showRoot: authUser.showReport,
        },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.INACTIVITYREPORTS,
          }),
          name: 'Inactivity Report',
          id: 'inactivityreport',
          className: 'menuLink1',
          showRoot: authUser.showReport,
        },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.GRADUATEREPORTS,
          }),
          name: 'Graduate Report',
          id: 'graduatereport',
          className: 'menuLink1',
          showRoot: authUser.showReport,
        },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.CUSTOMREPORTS,
          }),
          name: 'Custom Report',
          id: 'customreport',
          className: 'menuLink1',
          showRoot: authUser.showReport,
        },
      ],
    },
    {
      url: '',
      name: 'User Management',
      id: 'agm',
      icon: <Shield width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showRole || authUser.showUser,
      data: [
        {
          url: getSchoolUrl({ ...params, to: ROUTES.ALLUSERS }),
          name: 'Users',
          id: 'users',
          className: 'menuLink1',
          showRoot: authUser.showUser,
        },
        {
          url: getSchoolUrl({ ...params, to: ROUTES.ALLROLES }),
          name: 'Roles',
          id: 'roles',
          className: 'menuLink1',
          showRoot: authUser.showRole,
        },
      ],
    },
    {
      url: getSchoolUrl({ ...params, to: '/sis/administration' }),
      name: 'Administration',
      id: 'administration',
      icon: <HardDrive width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.isAdmin,
      data: [
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.NOTIFICATION,
          }),
          name: 'Notification',
          id: 'notification',
          className: 'menuLink1',
          showRoot: authUser.isAdmin,
        },
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.APPSETTINGS,
          }),
          name: 'App Settings',
          id: 'appSettings',
          className: 'menuLink1',
          showRoot: authUser.isAdmin,
        },
      ],
    },

    {
      url: getSchoolUrl({ ...params, to: ROUTES.SETTINGS }),
      name: 'Settings',
      id: 'settings',
      icon: <Settings width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showSetting,
      data: [
        {
          url: getSchoolUrl({ ...params, to: ROUTES.AUDIT }),
          name: 'Audit',
          id: 'audit',
          className: 'menuLink1',
          showRoot: authUser.showSetting,
        },
        {
          url: getSchoolUrl({ ...params, to: ROUTES.EMAIL }),
          name: 'Emails',
          id: 'emails',
          className: 'menuLink1',
          showRoot: authUser.showSetting,
        },
        {
          url: getSchoolUrl({ ...params, to: ROUTES.TEMPLATE }),
          name: 'Templates',
          id: 'templates',
          className: 'menuLink1',
          showRoot: authUser.showSetting,
        },
      ],
    },
    {
      url: getSchoolUrl({ ...params, to: ROUTES.INSTITUTE }),
      name: 'Institute',
      id: 'institute',
      icon: <UserCheck width={16} height={16} />,
      className: 'menuLink',
      showRoot: authUser.showDistrict,
      data: [
        {
          url: getSchoolUrl({
            ...params,
            to: ROUTES.DISTRICTINSTITUTE,
          }),
          name: 'Institute Districts',
          id: 'institute districts',
          className: 'menuLink1',
          showRoot: authUser.showDistrict,
        },
      ],
    },
  ]
}
