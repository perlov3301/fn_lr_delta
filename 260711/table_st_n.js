class table_stg_n {
    static addRows(
      id="stagesTableBody",
      stg_n,
      base_rmin,
      base_rmax,
      base_lmin,
      base_lmax
    ) {
      const tbody= document.getElementById(id);
 
        const rowHTML= `
        <tr>
          <td rowspan="2">1</td>
          <td>1</td>
          <td><input type="number" onwheel="this.blur()"
            id="Rmin11" step="any" required> </td>
          <td><input type="number" onwheel="this.blur()"
            id="Rmax11" step="any" required> </td>
          <td><input type="number" onwheel="this.blur()"
            id="Lmin11" step="any" required> </td>
          <td><input type="number" onwheel="this.blur()"
            id="Lmax11" step="any" required> </td>
        </tr>
        <tr>
          <td>2</td>
          <td><input type="number" onwheel="this.blur()"
            id="Rmin12" step="any" required> </td>
          <td><input type="number" onwheel="this.blur()"
            id="Rmax12" step="any" required> </td>
          <td><input type="number" onwheel="this.blur()"
            id="Lmin12" step="any" required> </td>
          <td><input type="number" onwheel="this.blur()"
            id="Lmax12" step="any" required> </td>
        </tr>
        <tr>
          <td rowspan="2">2</td>
          <td>1</td>
          <td><input type="number" id="Rmin21" step="any" required> </td>
          <td><input type="number" id="Rmax21" step="any" required> </td>
          <td><input type="number" id="Lmin21" step="any" required> </td>
          <td><input type="number" id="Lmax21" step="any" required> </td>
        </tr>
        <tr>
          <td>2</td>
          <td><input type="number" id="Rmin22" step="any" required> </td>
          <td><input type="number" id="Rmax22" step="any" required> </td>
          <td><input type="number" id="Lmin22" step="any" required> </td>
          <td><input type="number" id="Lmax22" step="any" required> </td>
        </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', rowHTML);
          return { };
      }

}
    
  
  
  export { table_stg_n };
  
  // table.insertRow(-1);
  //     const cell1 = newRow.insertCell(0);
  //     const cell2 = newRow.insertCell(1);
  //     const cell3 = newRow.insertCell(2);
  //     cell1.textContent = `frequency`;
  //     cell2.textContent = `load_real`;
  //     cell3.textContent = `load_imag`;