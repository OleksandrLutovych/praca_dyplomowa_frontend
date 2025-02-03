import React, { FC } from 'react';
import { VisitStatus } from '../../../entities/visits/enums';
import { IoMdAddCircle } from 'react-icons/io';
import { FcApproval, FcCancel } from 'react-icons/fc';
import { FaCalendarCheck } from 'react-icons/fa';
import { CiCircleQuestion } from 'react-icons/ci';

type Props = {
  status?: VisitStatus
  size?: number
}

const StatusIcon: FC<Props> = ({ status, size = 50 }) => {
  if (status === VisitStatus.CREATED) {
    return <IoMdAddCircle size={size} color='gray' />
  }

  if (status === VisitStatus.CANCELED) {
    return <FcCancel size={size} color='red' />
  }

  if (status === VisitStatus.ACCEPTED) {
    return <FcApproval size={size} color='green' />
  }
  if (status === VisitStatus.FINISHED) {
    return <FaCalendarCheck size={size} color='blue' />
  }

  return <CiCircleQuestion />
};

export default StatusIcon;