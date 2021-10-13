import {exportFile} from "quasar"
import {Notify} from 'quasar'


function wrapCsvValue(val: string, formatFn: any) {
  let formatted = formatFn !== void 0 ? formatFn(val) : val;
  formatted =
    formatted === void 0 || formatted === null ? "" : String(formatted);
  formatted = formatted.split('"').join('""');
  return `"${formatted}"`;
}

export function exportTable(data: [], columns: [], name: string) {
  // @ts-ignore
  const content = [columns.map(col => wrapCsvValue(col.label))]
    .concat(
      data.map(row =>
        columns
          .map(col =>
            wrapCsvValue(
              typeof col.field === "function"
                ? col.field(row)
                : row[col.field === void 0 ? col.name : col.field],
              col.format
            )
          )
          .join(",")
      )
    )
    .join("\r\n");
  const status = exportFile(name, content, "text/csv");
  if (status !== true) {
    Notify.create({
      message: "Browser denied file download...",
      color: "negative",
      icon: "warning"
    });
  }
}
