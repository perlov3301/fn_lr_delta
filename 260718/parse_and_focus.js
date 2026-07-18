class ParseAndFocus {
   constructor( id,f_n, base_id_f,base_id_r,base_id_x,) 
   {
    this.id = id;
    this.f_n = f_n;
    this.base_id_f = base_id_f;
    this.base_id_r = base_id_r;
    this.base_id_x = base_id_x;
    this.table_body= document.getElementById(id);
   }
// method returns a Promise that resolves with the parsed table data
   parseTable() { 
     return new Promise((resolve)=> 
       {
// programmably parsing; example of extracting text
// rows.length;rows[i]=rows.item(i);rows[i].cells[j].innerText
        setTimeout(()=> {
            if (!this.table_body) {
              console.error(`Table body with id ${this.id} not found.`);
              resolve(null);
              return;
            } 
            const parseData= [];
            for (let row of this.table_body.rows) {
              const rowData= [];
              for (let cell of row.cells) {
                rowData.push(cell.innerText);
              }
              parseData.push(rowData);
            }
        // resolves the promise, passing back the parsed data
            resolve(parseData);
        }, 1000); //end of setTimeout-simulating async operation
      });//end of return promise
   }//end of parseTable

//async method to await parsing and focus a specific cell
   async focusParsedCell(rowIndex, cellIndex) {
    // wait for the [parsing] Promise to resolve
     const data= await this.parseTable();
     console.log("Parsed data:", data);
// target the specific cell and add focus
     const targetRow= this.table_body.rows[rowIndex];
     if (targetRow) {
        const targetCell= targetRow.cells[cellIndex];
        if (targetCell) {
          targetCell.tabIndex= -1; //ensure focusability
          targetCell.focus();
          console.log(`focused cell at row ${rowIndex}, column ${cellIndex}`);
        }
     }
    //  const targetCell= this.table_body.rows[rowIndex]?.cells[cellIndex];
   }
   async getUserData() {
      try {
        const response= await fetch('https://api.example.com/data');
        if (!resonse.ok) {throw new Error(`error : ${response.status}`);}
        const user = await response.json();
        console.log("user email:", user.email);
      }
      catch (err) { console.error("error:", err.message); }
   }
}

export { ParseAndFocus };
//usage example:
//const myParser= new ParseAndFocus(id,f_n, base_f,base_r, base_x);
// myParser.focusParseCell(0, 0);
