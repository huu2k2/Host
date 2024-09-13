
import React, { useState } from 'react'; 
import { Document, Page,pdfjs } from 'react-pdf'; 
import InputText from "../../../../components/inputDrawRIght/InputText";
import InputDate from "../../../../components/inputDrawRIght/InputDate";
import InputFile from "../../../../components/inputDrawRIght/InputFile";
import InputSelect from "../../../../components/inputDrawRIght/InputSelect";
import InputPrice from "../../../../components/inputDrawRIght/InputPrice";
import { useDispatch, useSelector } from "react-redux";
import { updateContractRoomSlice } from "./contractRoomSlice";
// import './pdf.css'
  
//PDFjs worker from an external cdn 

  
const PDFContractRoom = ({ dataFile }) => { 
  const url = `${dataFile}`
  const dispatch = useDispatch();
  const { selectedHome } = useSelector((state) => state.rooms);
  const { infoContractRoom } = useSelector((state) => state.contractRoomSlice);

    pdfjs.GlobalWorkerOptions.workerSrc =  
    `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`; 
     const [numPages, setNumPages] = useState(null); 
      const [pageNumber, setPageNumber] = useState(1); 
  
    function onDocumentLoadSuccess({ numPages }) { 
    setNumPages(numPages); 
    setPageNumber(1); 
  } 
  return ( 
    <> 
    <div className="main"> 
      <Document 
        file={url} 
        onLoadSuccess={onDocumentLoadSuccess} 
        > 
        <Page pageNumber={pageNumber} /> 
      </Document> 
     </div> 
    </> 
  ); 
}

export default PDFContractRoom