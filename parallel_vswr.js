// import { inputZ } from './parallel_zin.js';
import { timenow } from './timenow.js';
// import { calculate } from './calculateVSWR.js';
import { f1 } from './vswr1_db1.js'
import { table_f_n }   from './table_f_n.js';
import { format1 } from './format1.js';
document.addEventListener("readystatechange", () => {
    console.log("document.readyState:", document.readyState);
    const explanationArea= document.getElementById("explanation");
    explanationArea.value = `Current readyState: ${document.readyState}\n`;
    // explanationArea.value+= "explanationArea is ready\n";
    // console.clear();
    const vf=1;
    // let vf=1;
    let inputIds_f= [];
    let inputIds_ZL2_real= [];
    let inputIds_ZL2_imag= [];
    let f_array= [];
    let ZL2_real_array= [];
    let ZL2_imag_array= [];
    let Zin_r_array= [];
    let Zin_x_array= [];
    let vswr_array= [];
    let db_array= [];
    let g_array= [];
    
    const tbody = document.getElementById("frequencyTableBody");
    tbody.replaceChildren("");
    const form= document.getElementById("vswrForm");
    const generatorR= document.getElementById("generatorR");
    const frequency_n_input= document.getElementById("frequency_n");
    frequency_n_input.addEventListener("input", ()=>{
      tbody.replaceChildren(""); 
    });
    let f_n=1;
    const button_f_n= document.getElementById("button_f_n_table");
    button_f_n.addEventListener("click", ()=>{
      tbody.replaceChildren(""); 
      f_n= parseInt(frequency_n_input.value,10);
      console.log("button_f was clicked; f_n=", f_n);
      const table_ids=table_f_n.addRows(
          "frequencyTableBody", 
          f_n, 
          "frequency", 
          "load_real", 
          "load_imag");
      inputIds_f= table_ids.id_array_f;
      inputIds_ZL2_real= table_ids.id_array_r;
      inputIds_ZL2_imag= table_ids.id_array_x;
    });
    
    // const resultDiv= document.getElementById("result");
    const result_vswr= document.getElementById("result_vswr");
    const statusIndicator= document.getElementById("statusIndicator");

    statusIndicator.replaceChildren("ready");
    let currentState= "ready";
    function setState(state) {
      // currentState= state;
      // let captions=[];
      // captions[0]= {
      //   ready: "ready for input",
      //   modified: "Input changed",
      //   submitted: "Calculated",
      //   calculatedZin: "Zin was calculated",
      //   error_calculating: "error calculating Zin or VSWR",
      //   calculatedVSWR: "VSWR was calculated",
      // };
      // captions[1]= {
      //   ready: "ready for input",
      //   modified: "Input changed",
      //   submitted: "Calculated",
      //   calculatedZin: "Zin was calculated",
      //   error_calculating: "error calculating Zin or VSWR",
      //   calculatedVSWR: "VSWR was calculated",
      // };
      // statusIndicator.textContent= captions[state] || state;
      // statusIndicator.className= `status-indicator ${state}`;
    }
    function formatNumber(value) {
      return Number.isFinite(value) ? 
          +value.toFixed(3): "NaN";
    }
//lines array_r_min[nst, nrmin]=
    const n_stages= 3;
    const n_l= 2;
    let id_rmin=[];
    let id_rmax=[];
    let id_lmin=[];
    let id_lmax=[];
    let r_min= [];
    let r_max= [];
    let l_min= [];
    let l_max= [];
    r_min = Array.from({ length: n_stages }, ()=> Array(n_l).fill(0));
    console.log("array r_min:", r_min);
    for (let i= 0; i< n_stages; i++) {
      id_rmin[i]= [];
      id_rmax[i]= [];
      id_lmin[i]= [];
      id_lmax[i]= [];
      r_min[i]= [];
      r_max[i]= [];
      l_min[i]= [];
      l_max[i]= [];
      for (let j=0; j< 2; j++) {
        id_rmin[i][j]="Rmin"+(i+1).toString()+(j+1).toString();
        id_rmax[i][j]="Rmax"+(i+1).toString()+(j+1).toString();
        id_lmin[i][j]="Lmin"+(i+1).toString()+(j+1).toString();
        id_lmax[i][j]="Lmax"+(i+1).toString()+(j+1).toString();
        r_min[i][j]= 20;
        r_max[i][j]= 200;
        l_min[i][j]= 20;
        l_max[i][j]= 200;
      }
    }
    
    console.log("id_rmin11",id_rmin[0][0]," id_rmin12=",id_rmin[0][1]);
    console.log("id_lmin11",id_lmin[0][0]," id_lmin12=",id_lmin[0][1]);
    const line1_R= document.getElementById(id_rmin[0][0]);
    const line1_L= document.getElementById(id_lmin[0][0]);
    const line2_R= document.getElementById(id_rmin[0][1]);
    const line2_L= document.getElementById(id_lmin[0][1]);
    
    function updateResult() {
    console.clear();
      try {
        const Z0=  parseFloat(generatorR.value);
        // const f_n= parseInt(frequency_n_input.value,10);
        console.log("updateResult; Z0:", Z0, " f_n:", f_n);

        for (let i=0; i< f_n; i++) {
          const frequencyInput= document.getElementById(inputIds_f[i]);
          const load_real= document.getElementById(inputIds_ZL2_real[i]);
          const load_imag= document.getElementById(inputIds_ZL2_imag[i]);
          f_array[i]= parseFloat(frequencyInput.value);
          ZL2_real_array[i]= parseFloat(load_real.value);
          ZL2_imag_array[i]= parseFloat(load_imag.value);
        } 
       
        const Z01= parseFloat(line1_R.value);
        const Z02= parseFloat(line2_R.value);
        const length1= parseFloat(line1_L.value);
        const length2= parseFloat(line2_L.value);
        console.log("updateResult; Z01:", Z01, " length1:", length1);
        console.log("updateResult; Z02:", Z02, " length2:", length2);
        result_vswr.textContent= "";
        explanationArea.value= "";
        for (let i=0; i< f_n; i++) {
          const frequency= f_array[i];
          const ZL2_real= ZL2_real_array[i];
          const ZL2_imag= ZL2_imag_array[i];
          
          console.log("updateResult; frequency:", frequency);
          console.log("updateResult; ZL2_real:", ZL2_real," ZL2_imag:", ZL2_imag);
  
          const vswrData= f1.vswr1_db1(
              Z0, 
              frequency, ZL2_real, ZL2_imag,
              Z01, Z02, length1, length2,
              vf 
          );
          if (!vswrData || vswrData.vswr === Infinity || vswrData.vswr<1. || vswrData.db > 0) {
            throw new Error("updateResult;Invalid vswrData returned from vswr1_db1.");
          }
          vswr_array[i]=  format1.fvswr(vswrData.vswr);
          db_array[i]=    format1.fdb(vswrData.db);
          g_array[i]=     format1.fg(vswrData.gamma);
          Zin_r_array[i]= format1.fzin_r(vswrData.Zin_parallel.real);
          Zin_x_array[i]= format1.fzin_x(vswrData.Zin_parallel.imag);

          const spaces = " ".repeat(3);
          result_vswr.textContent+= 
          `f= ${frequency}MHz${spaces}vswr: ${vswr_array[i]}${spaces}`+ 
             ` db= ${db_array[i]}dB${spaces}(|Γ| = ${g_array[i]})\n`;
          console.log("updateResult; vswr:", vswr_array[i]," |Γ|:",g_array[i]," db:", db_array[i]);
          explanationArea.value+= `f= ${frequency}MHz${spaces}Zin_r=${Zin_r_array[i]}` +
            `${spaces}Zin_x=${Zin_x_array[i]} Ω\n`;
      }
        console.log("updateResult;f:",f_array," vswr_array:", vswr_array, " db_array:", db_array);

      } catch (error) {
        result_vswr.textContent = "parallel_vswr;Error of calculations .";
        explanationArea.value = error.message;
        setState("updateResult;error_calculating");
      }
    }
    //end of updateResult

    function markModified() {
      if (currentState !== "modified") { // setState("modified");
      } 
    }
    function markSubmitted() {
      if (currentState == "submitted") {}
        
    }

    // generatorR.addEventListener("input", markModified);
    // frequency1Input.addEventListener("input", markModified);
    // load_real1.addEventListener("input", markModified);
    // load_imag1.addEventListener("input", markModified);
    // line1_R.addEventListener("input", markModified);
    // line1_L.addEventListener("input", markModified);
    // line2_R.addEventListener("input", markModified);
    // line2_L.addEventListener("input", markModified);


    form.addEventListener("submit", (event) => {
      event.preventDefault();
      updateResult();
    });

    setState(`time now: ${timenow()}; ready for input `);
});

