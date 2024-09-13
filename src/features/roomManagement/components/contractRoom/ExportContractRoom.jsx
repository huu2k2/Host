import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";
import  PDFContractRoom  from "./PDFContractRoom";

import { FetchFileInfoContractRoom } from '../service/FetchFileInfoContractRoom';
const ExportContractRoom = ({ closeRightDrawer, extraObject }) => {
    const dispatch = useDispatch();
    const { leads } = useSelector((state) => state.lead);
    const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);
    const [dataFile, setDataFile ] = useState("");
useEffect(() => {
    // có hợp đồng
    if (extraObject.contractId) {
        // nếu chưa từng lên hợp đồng
        // gọi api lấy nội thất và dịch vụ
        const data = {
          roomId: extraObject.roomId,
          contractId: extraObject.contractId,
          depositId: extraObject.depositId,
          signatureCustome: infoContractRoom.signature,
          signatureLeads: leads.signature,
        };
  
        const filedata = dispatch(FetchFileInfoContractRoom(data));
        setDataFile(filedata);
        filedata.catch();
      }
}, [])

  return (
    <>
        <div className=''>
            <PDFContractRoom dataFile={dataFile} />
        </div>
    </>
  )
}

export default ExportContractRoom