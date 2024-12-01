import { FC } from 'react';
import { Visit } from '../../utils/types';

type Props = {
  data: Visit;
}

const AfterCreateVisitCard: FC<Props> = ({ data }) => {
  return (
    <div>
      {data.type}
      {data.doctor.user.firstName}
    </div>
  );
};

export default AfterCreateVisitCard;