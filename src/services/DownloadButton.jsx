import { PDFDownloadLink } from '@react-pdf/renderer';
import MyPdf from './Mypdf'
import { FiDownload } from 'react-icons/fi'
import {Button} from '@mui/material'
import PropTypes from 'prop-types'

DownloadButton.propTypes = {
    el: PropTypes.object,
    user: PropTypes.object
}

function DownloadButton({ appointment }) {

    return (
        <>
            <PDFDownloadLink document={<MyPdf data={appointment} />} fileName="Prescription.pdf">
                <Button>Download <FiDownload style={{fontSize:'1rem',color:'green'}}/></Button>
            </PDFDownloadLink>
        </>
    )
}

export default DownloadButton