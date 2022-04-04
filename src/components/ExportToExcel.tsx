import FileSaver from 'file-saver';
import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
import * as XLSX from 'xlsx';

// material
import { Button } from '@mui/material';

export const ExportToExcel = (props: { csvData: any; fileName: string }) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const exportToCSV = (csvData: any, fileName: string) => {
    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { data: ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, fileName + fileExtension);
  };

  return (
    <Button
      size="small"
      variant="contained"
      onClick={() => exportToCSV(props.csvData, props.fileName)}
      endIcon={<Icon icon={downloadFill} />}
    >
      Export To XLSX File
    </Button>
  );
};
