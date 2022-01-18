import PropTypes from 'prop-types'
import React from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router-dom'

import { headerAction } from '../../actions/header.action'
import { fetchTopicLogDetail } from '../../actions/notification.action'
import TopicLogsDetail from '../../components/sis/administration/notification/TopicLogsDetail'
function TopicLogDetailContainer({ headerAction, fetchTopicLogDetail }) {
  //const { t } = useTranslation()
  const { topicId } = useParams()
  const { logId } = useParams()
  const [details, setDetails] = React.useState({})
  const [originalMessage, setOriginalMessage] = React.useState([])
  const [event, setEvent] = React.useState([])

  const getTopicLogDetail = function () {
    fetchTopicLogDetail(topicId, logId, (data) => {
      setDetails(data)
      setOriginalMessage(data.original_message)
      setEvent(data.events)
    })
  }

  React.useEffect(() => {
    if (topicId) {
      const headerData = {
        activeMenuItem: 'notification',
        activeParent: 'administration',
        sideBar: true,
      }

      headerAction(headerData)
      getTopicLogDetail()
    }
  }, [topicId])

  /**
   * renders JSX of Topic Logs Detail container component
   * @param user
   */
  return (
    <TopicLogsDetail
      details={details}
      originalMessage={originalMessage}
      event={event}
      topicId={topicId}
    />
  )
}

TopicLogDetailContainer.propTypes = {
  headerAction: PropTypes.func,
  fetchTopicLogDetail: PropTypes.func,
}

TopicLogDetailContainer.defaultProps = {
  headerAction: () => {},
  fetchTopicLogDetail: () => {},
}
const mapStateToProps = () => ({})

/**
 *  @exports connect function of redux
 */
export default connect(mapStateToProps, {
  headerAction,
  fetchTopicLogDetail,
})(TopicLogDetailContainer)
