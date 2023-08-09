import { useTranslations } from 'common/language'
import Typography from 'common/widgets/Typography'
import animation from '@img/animation.svg'

import classNames from './LoadingComponent.module.scss'

export default function LoaderComponent() {
  const { gettext } = useTranslations()

  return (
    <div className={classNames.loadingWrapper}>
      <div className={classNames.loadingBlock}>
        <img src={animation} className={classNames.loadingImage} />
        <Typography
          size="xl"
          fontWeight={600}
          color="gray-800"
          margin="xl"
          tag="div"
          className={classNames.loadingTitle}
        >
          {gettext('Please wait we are setting up your Workspace')}
        </Typography>
        <Typography color="gray-500" className={classNames.loadingDescription} tag="div">
          {gettext('Please wait while the data is loading. This may take a few minutes...')}
        </Typography>
      </div>
    </div>
  )
}
