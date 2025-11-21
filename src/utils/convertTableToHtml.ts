import { Row } from "@/types/create-course";

export function convertTableToHtml(table: Row[]) {
  let html = "";
  table.forEach((row, index) => {
    if (index == 0) {
      html += `<table><tr>${Object.keys(row)
        .map((key) => `<th>${key}</th>`)
        .join("")}</tr>`;
      return;
    }

    html += `<tr>${Object.values(row)
      .map((value) => `<td>${value}</td>`)
      .join("")}</tr>`;

    if (index == table.length - 1) html += `</table>`;
  });
  return html;
}
