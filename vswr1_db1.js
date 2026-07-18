import { inputZ } from './parallel_zin.js';
import { calculate } from './calculateVSWR.js';
import { Exm_array } from './exm_array.js';



class f1
{
/** 
 *   @param {number} Z0
   * @param {number} frequency - Frequency (Hz)
 *   @param {number} ZL2_real - real part of Load impedance  of branch 2 (ohms)
   * @param {number} ZL2_imag - imag part of Load impedance  of branch 2 (ohms)
     @param {number} Z01 - Characteristic impedance of transmission line 1 (ohms)
   * @param {number} Z02 - Characteristic impedance of transmission line 2 (ohms)
   * @param {number} length1(m) - Length of branch 1 (short circuit branch) (meters)
   * @param {number} length2(m) - Length of branch 2 (complex load branch) (meters)
   * @param {number} vf =1
   * @returns {object} vswr and db for one frequency point
 * @returns 
 */
    static vswr1_db1(
      Z0, 
      frequency, ZL2_real, ZL2_imag,
      id_rmin, id_rmax, id_lmin, id_lmax,
      // Z01, Z02, length1, length2,
        vf = 1.0
    ) 
    {
        const line1_R= document.getElementById(id_rmin[0][0]);
        const line1_L= document.getElementById(id_lmin[0][0]);
        const line2_R= document.getElementById(id_rmin[0][1]);
        const line2_L= document.getElementById(id_lmin[0][1]);
        const Z01= parseFloat(line1_R.value);
        const Z02= parseFloat(line2_R.value);
        const length1= parseFloat(line1_L.value);
        const length2= parseFloat(line2_L.value);
        console.log("updateResult; Z01:", Z01, " length1:", length1);
        console.log("updateResult; Z02:", Z02, " length2:", length2);
        if (Number.isNaN(Z0) || Number.isNaN(frequency) || 
            Number.isNaN(Z01) || Number.isNaN(Z02) || 
            Number.isNaN(length1) || Number.isNaN(length2) || 
            Number.isNaN(ZL2_real) || Number.isNaN(ZL2_imag) ) {
            throw new Error( "vswr_db1js;enter valid numeric values for all inputs.");
       }
        // const grid= [
        //   ['A', 'B'],
        //   ['C', 'D']
        // ];
        // Exm_array.processGrid(grid);
        const data = inputZ.parallelBranchesImpedance( // mm, MHz, load
          Z01,Z02, //ro of lines
          length1, length2, //mm length of lines
          ZL2_real, ZL2_imag, // Load for branch 2
          frequency, vf
        );
        
      const vswrData= calculate.calculateVSWR( // not dependent on frequency and Load
        Z0, 
        data.Zin_parallel.real, 
        data.Zin_parallel.imag);
        return {
            Zin1: { real: 0, imag: data.Zin1.imag},
            Zin2: { real: data.Zin2.real, imag: data.Zin2.imag },
            Zin_parallel: {
              real: data.Zin2.real,
              imag: data.Zin_parallel.imag,
            },
            gamma: vswrData.gamma,
            vswr: vswrData.vswr,
            db: vswrData.reflection_losses,
        }
    }
}
export {f1};