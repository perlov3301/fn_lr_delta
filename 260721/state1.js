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
    generatorR.addEventListener("input", markModified);
    frequency1Input.addEventListener("input", markModified);
    load_real1.addEventListener("input", markModified);
    load_imag1.addEventListener("input", markModified);
    line1_R.addEventListener("input", markModified);
    line1_L.addEventListener("input", markModified);
    line2_R.addEventListener("input", markModified);
    line2_L.addEventListener("input", markModified);
      function markModified() {
      if (currentState !== "modified") { // setState("modified");
      } 
    }
    function markSubmitted() {
      if (currentState == "submitted") {}
        
    }
        setState("updateResult;error_calculating");
        setState("updateResult;error_calculating");