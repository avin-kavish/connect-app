import React, { PropTypes } from 'react'
import { Tabs, Tab, TCFormFields } from 'appirio-tech-react-components'
import _ from 'lodash'
import SpecQuestions from './SpecQuestions'
import FeatureList from '../../../components/FeatureList/FeatureList'
import FileListContainer from './FileListContainer'


const SpecSection = props => {
  const {project, showFeaturesDialog, id, title, description, subSections} = props
  const renderSubSection = (subSection, idx) => (
    <div key={idx} className="section-features-module" id={[id, subSection.id].join('-')}>
      <div className="bottom-border-titles">
        <h4 className="title">{typeof subSection.title === 'function' ? subSection.title(project): subSection.title }</h4>
        { subSection.type === 'features' &&
          <div className="section-actions">
            <button href="javascript:"  onClick={ showFeaturesDialog } className="tc-btn-default tc-btn-sm">Add / Edit features</button>
          </div>
        }
      </div>
      <div className="content-boxs">
        {renderChild(subSection)}
      </div>
    </div>
  )

  const renderChild = props => {
    const {type} = props

    switch(type) {
    case 'tabs': {
      const tabs = _.get(props, 'tabs')
      const renderTab = (t, idx) => (
        <Tab key={idx+1} eventKey={idx+1} title={t.title}>
          {renderChild(t)}
        </Tab>
      )
      return (
        <Tabs defaultActiveKey={1}>
          {tabs.map(renderTab)}
        </Tabs>
      )
    }
    case 'features':
      return (
        <FeatureList>
          {_.get(project, props.fieldName, []).map(
            (f, idx) => <FeatureList.Item {...f} key={idx} />
          )}
        </FeatureList>
      )
    case 'questions':
      return (
        <SpecQuestions questions={props.questions} project={project}/>
      )
    case 'notes':
      return (
        <TCFormFields.Textarea
          name={props.fieldName}
          label={props.description}
          wrapperClass="row"
        />
      )
    case 'files': {
      const files = _.get(project, props.fieldName, [])
      return <FileListContainer projectId={project.id} files={files} />
    }
    default:
      return <noscript />
    }
  }

  return (
    <div className="right-area-item" id={id}>
      <div className="boxes">
        <h2 className="big-titles" id={id}>{title}</h2>
          <p className="gray-text">
            {description}
          </p>
          {subSections.map(renderSubSection)}
        </div>
    </div>
  )
}

SpecSection.propTypes = {
  project: PropTypes.object.isRequired
}

export default SpecSection
