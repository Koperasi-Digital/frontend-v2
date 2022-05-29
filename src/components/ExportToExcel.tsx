import FileSaver from 'file-saver';
import { Icon } from '@iconify/react';
import downloadFill from '@iconify/icons-eva/download-fill';
import ExcelJS from 'exceljs';

// material
import { Button } from '@mui/material';

export const ExportToExcel = (props: {
  worksheetsNames: string[];
  sizes: { width: number; height: number }[];
  filename: string;
  contents: {
    sheetData?: { No: string; Komponen: string; Jumlah: number }[];
    chartInfo?: string[];
    chartBase64?: string;
  }[];
  onClick?: any;
}) => {
  const fileType =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const downloadFile = async () => {
    const workbook = new ExcelJS.Workbook();

    for (let i = 0; i < props.contents.length; i++) {
      const sheetData = props.contents[i].sheetData;
      const chartInfo = props.contents[i].chartInfo;
      const chartBase64 = props.contents[i].chartBase64;

      const worksheet = workbook.addWorksheet(props.worksheetsNames[i]);

      if (sheetData) {
        worksheet.columns = [
          { header: 'No', key: 'No', width: 10 },
          { header: 'Komponen', key: 'Komponen', width: 20 },
          { header: 'Jumlah', key: 'Jumlah', width: 32 }
        ];

        for (let j = 0; j < sheetData.length; j++) {
          worksheet.insertRow(j + 2, sheetData[j]);
        }
      }

      let j = 0;
      if (chartInfo) {
        while (j < chartInfo.length) {
          worksheet.getCell(`A${j + 1}`).value = chartInfo[j];
          j += 1;
        }
      }

      if (chartBase64) {
        const imageId = workbook.addImage({
          base64: chartBase64,
          extension: 'png'
        });

        worksheet.addImage(imageId, {
          tl: { col: 0, row: j + 5 },
          ext: props.sizes[i]
        });
      }
    }

    const excelBuffer = await workbook.xlsx.writeBuffer();
    const data = new Blob([excelBuffer], { type: fileType });
    FileSaver.saveAs(data, props.filename + fileExtension);
  };

  return (
    <Button
      size="small"
      variant="contained"
      onClick={() => {
        if (props.onClick) {
          props.onClick();
        }
        downloadFile();
      }}
      endIcon={<Icon icon={downloadFill} />}
    >
      Unduh dalam file XLSX
    </Button>
  );
};
