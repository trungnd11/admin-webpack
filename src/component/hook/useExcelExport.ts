import { Workbook } from "exceljs";
import { saveAs } from "file-saver";

const defaultOptions = {
  name: "Export",
  data: [
    [new Date("2019-07-20"), 70.1],
    [new Date("2019-07-21"), 70.6],
    [new Date("2019-07-22"), 70.1]
  ],
  tableOptions: {
    name: "TableExport",
    ref: "A1",
    style: {
      theme: null,
      showRowStripes: false
    },
    columns: [
      { name: "Date", filterButton: true },
      { name: "Amount", filterButton: false }
    ]
  }
};

export const useExcelExport = () => {
  const generate = (data: any, workbookOptions: any, tableOptions: any) => {
    const configuration = { ...defaultOptions.tableOptions, ...tableOptions };
    const workbook = new Workbook();
    const sheet = workbook.addWorksheet(workbookOptions.name);

    const row = sheet.getRow(1);
    row.font = { bold: true };

    sheet.addTable({
      name: configuration.name,
      ref: configuration.ref,
      headerRow: configuration.headerRow,
      totalsRow: configuration.totalsRow,
      style: configuration.style,
      columns: configuration.columns,
      rows: data
    });

    configuration.columns.forEach((_column: any, index: number) => {
      const columnData = data.map((row: any) => row[index]);
      const maxLength = Math.max(
        ...columnData.map((cell: any) => cell.toString().length)
      );
      const adjustedWidth = Math.min(Math.max(10, maxLength + 5), 100);
      sheet.getColumn(index + 1).width = adjustedWidth;
      sheet.getColumn(index + 1).numFmt = "#,##";
    });

    data.forEach((_item: any, index: number) => {
      for (let i = 1; i <= 9; i++) {
        sheet.getCell(`${String.fromCharCode(64 + i)}${index + 1}`).border = {
          left: { style: "thin" },
          right: { style: "thin" },
          top: { style: "thin" },
          bottom: { style: "thin" },
        };

        sheet.getCell(`${String.fromCharCode(64 + i)}${data.length + 1}`).border = {
          left: { style: "thin" },
          right: { style: "thin" },
          top: { style: "thin" },
          bottom: { style: "thin" },
        };
      }
    });

    workbook.xlsx.writeBuffer().then(data => {
      const blob = new Blob([data], { type: "text/plain;charset=utf-8" });
      saveAs(blob, `${workbookOptions.name}.xlsx`);
    });
  };

  return {
    generate
  };
};
