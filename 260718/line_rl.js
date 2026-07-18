class LineLR {
   static line1_lr (id_rmin, id_rmax, id_lmin, id_lmax) {
        const line1_R= document.getElementById(id_rmin[0][0]);
        const line1_L= document.getElementById(id_lmin[0][0]);
        const line2_R= document.getElementById(id_rmin[0][1]);
        const line2_L= document.getElementById(id_lmin[0][1]);
        const Z01= parseFloat(line1_R.value);
        const Z02= parseFloat(line2_R.value);
        const length1= parseFloat(line1_L.value);
        const length2= parseFloat(line2_L.value);
        console.log("line_rljs; Z01:", Z01, " length1:", length1);
        console.log("line_rljs; Z02:", Z02, " length2:", length2);
        if (Number.isNaN(Z01) || Number.isNaN(Z02) ||
            Number.isNaN(length1) || Number.isNaN(length2) ) {
            throw new Error( "line_rljs;enter valid numeric values for all line inputs.");
       }
       return {
        Z01, Z02, length1, length2,
       };
   }
 }
 export { LineLR };