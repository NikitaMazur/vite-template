import isEmpty from 'lodash/isEmpty'
import get from 'lodash/get'
import { createSelector } from 'reselect'

import { StoreState } from 'types'
import { INSTRUCTOR, ADMIN, STUDENT } from 'common/constants/roles'
import { PUBLISHED, ARCHIVED } from 'common/constants/statuses'
import {
  DRAFT,
  NEEDS_MANUAL_GRADING,
  RESUBMISSION_ALLOWED,
  COMPLETED,
  VIEWED,
} from 'common/constants/submissionStatuses'
import { ENABLED_SUBSCRIPTIONS } from 'common/constants/subscriptionStatuses'
import { VIEWER, EDITING, PUBLISHING } from 'common/constants/coursePermissions'

// Session Flags
export const F_PUBLIC = 'F_PUBLIC'
export const F_UNAUTHORISED = 'F_UNAUTHORISED'
export const F_PROTECTED = 'F_PROTECTED'

// Subscription Flags
export const F_FREE_PLAN = 'F_FREE_PLAN'
export const F_TRIAL_PLAN = 'F_TRIAL_PLAN'
export const F_WITH_SUBSCRIPTION = 'F_WITH_SUBSCRIPTION'
export const F_ENABLED_SUBSCRIPTION = 'F_ENABLED_SUBSCRIPTION'

// Campus Flags
export const F_COMMON_SUBDOMAIN = 'F_COMMON_SUBDOMAIN'
export const F_CAMPUS_SUBDOMAIN = 'F_CAMPUS_SUBDOMAIN'
export const F_CAMPUS_ADMIN = 'F_CAMPUS_ADMIN'
export const F_CAMPUS_OWNER = 'F_CAMPUS_OWNER'
export const F_CAMPUS_COURSE_INSTRUCTOR = 'F_CAMPUS_COURSE_INSTRUCTOR'
export const F_CAMPUS_COURSE_STUDENT = 'F_CAMPUS_COURSE_STUDENT'

// Course Flags
export const F_COURSE_INSTRUCTOR_PREVIEW = 'F_COURSE_INSTRUCTOR_PREVIEW'
export const F_COURSE_STUDENT = 'F_COURSE_STUDENT'
export const F_COURSE_INSTRUCTOR = 'F_COURSE_INSTRUCTOR'

// Activity Flags
export const F_DRAFT_ACTIVITY = 'F_DRAFT_ACTIVITY'
export const F_PUBLISHED_ACTIVITY = 'F_PUBLISHED_ACTIVITY'

// Submission Flags
export const F_DRAFT_SUBMISSION = 'F_DRAFT_SUBMISSION'
export const F_NEEDS_MANUAL_GRADING_SUBMISSION = 'F_NEEDS_MANUAL_GRADING_SUBMISSION'
export const F_COMPLETED_SUBMISSION = 'F_COMPLETED_SUBMISSION'
export const F_SUBMISSION_REQUIRED = 'F_SUBMISSION_REQUIRED'
export const F_SUBMISSION_SUBMITTABLE = 'F_SUBMISSION_SUBMITTABLE'

// Plan Features Flags
export const F_AI_SUPPORT = 'F_AI_SUPPORT'
export const F_CUSTOM_DOMAIN_SUPPORT = 'F_CUSTOM_DOMAIN_SUPPORT'

// User Flags
export const F_EMAIL_UNVERIFIED = 'F_EMAIL_UNVERIFIED'

// Permissions
export const F_ACTIVITY_VIEWER = 'F_ACTIVITY_VIEWER'
export const F_ACTIVITY_EDITING = 'F_ACTIVITY_EDITING'
export const F_ACTIVITY_PUBLISHING = 'F_ACTIVITY_PUBLISHING'

export const userLevelSelector = createSelector(
  // base permissions
  () => F_PUBLIC,
  (state: StoreState) => (isEmpty(get(state, 'session.data.token')) ? F_UNAUTHORISED : F_PROTECTED),
  (state: StoreState) =>
    !isEmpty(get(state, 'domainInfo.data.campusSlug')) ? F_CAMPUS_SUBDOMAIN : F_COMMON_SUBDOMAIN,
  (state: StoreState) =>
    !isEmpty(get(state, 'currentCampus.data.subscription')) ? F_WITH_SUBSCRIPTION : null,
  (state: StoreState) =>
    ENABLED_SUBSCRIPTIONS.includes(get(state, 'currentCampus.data.subscription.status', ''))
      ? F_ENABLED_SUBSCRIPTION
      : null,
  (state: StoreState) => {
    if (!get(state, 'course.data')) {
      return null
    }
    const role = get(state, 'course.data.current_user_role')
    switch (role) {
      case STUDENT:
        return F_COURSE_STUDENT
      case INSTRUCTOR:
        return F_COURSE_INSTRUCTOR
      default:
        return F_COURSE_INSTRUCTOR_PREVIEW
    }
  },
  (state: StoreState) => {
    const role = get(state, 'currentCampus.data.course_user_role')
    switch (role) {
      case STUDENT:
        return F_CAMPUS_COURSE_STUDENT
      case INSTRUCTOR:
        return F_CAMPUS_COURSE_INSTRUCTOR
      default:
        return null
    }
  },
  (state: StoreState) =>
    get(state, 'currentCampus.data.current_user_role') === ADMIN ? F_CAMPUS_ADMIN : null,
  (state: StoreState) => (get(state, 'currentCampus.data.is_owner') ? F_CAMPUS_OWNER : null),
  (state: StoreState) =>
    !get(state, 'activity.data.status')
      ? null
      : [PUBLISHED, ARCHIVED].includes(get(state, 'activity.data.status', ''))
      ? F_PUBLISHED_ACTIVITY
      : F_DRAFT_ACTIVITY,
  (state: StoreState) =>
    get(state, 'submission.data.activity.is_submission_required') ? F_SUBMISSION_REQUIRED : null,
  (state: StoreState) =>
    get(state, 'submission.data.activity.is_submittable') ? F_SUBMISSION_SUBMITTABLE : null,
  (state: StoreState) =>
    get(state, 'currentCampus.data.subscription.price.is_free') ? F_FREE_PLAN : null,
  (state: StoreState) =>
    get(state, 'currentCampus.data.subscription.trial_end') &&
    !get(state, 'user.data.has_payment_methods')
      ? F_TRIAL_PLAN
      : null,
  (state: StoreState) => {
    const status = get(state, 'submission.data.status', '')
    const isSubmittable = get(state, 'submission.data.activity.is_submittable')
    switch (status) {
      case DRAFT:
      case RESUBMISSION_ALLOWED:
        return F_DRAFT_SUBMISSION
      case VIEWED:
        return isSubmittable ? F_DRAFT_SUBMISSION : F_COMPLETED_SUBMISSION
      case NEEDS_MANUAL_GRADING:
        return F_NEEDS_MANUAL_GRADING_SUBMISSION
      case COMPLETED:
        return F_COMPLETED_SUBMISSION
      default:
        return null
    }
  },
  (state: StoreState) =>
    get(state, 'currentCampus.data.subscription.plan.features', []).some(
      (feature) => feature.type === 'ai_integration',
    )
      ? F_AI_SUPPORT
      : null,
  (state: StoreState) =>
    get(state, 'currentCampus.data.subscription.plan.features', []).some(
      (feature) => feature.type === 'custom_domain',
    )
      ? F_CUSTOM_DOMAIN_SUPPORT
      : null,
  (state: StoreState) =>
    get(state, 'user.data.email_verified') === false ? F_EMAIL_UNVERIFIED : null,
  (state: StoreState) =>
    get(state, 'course.data.current_user_permission') === VIEWER ? F_ACTIVITY_VIEWER : null,
  (state: StoreState) =>
    get(state, 'course.data.current_user_permission') === EDITING
      ? [F_ACTIVITY_VIEWER, F_ACTIVITY_EDITING]
      : null,
  (state: StoreState) =>
    get(state, 'course.data.current_user_permission') === PUBLISHING
      ? [F_ACTIVITY_VIEWER, F_ACTIVITY_EDITING, F_ACTIVITY_PUBLISHING]
      : null,

  // collect all user permissions
  (...args) => args.flat().filter(Boolean),
)
