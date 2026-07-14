class mutation {
//new MutationObserver(callback)
// observe(target, options)-instructs user agent to report any mutatons
//options= {childList:true, attributes:false, characterData:false, 
// subtree:true, attributeOldValue:false, characterDataOldValue:false,
// attributeFilter: false }
//observe()-->disconnect()-stop to observe() until observer() again
// takeRecords()-empties
// disconnect() observe() 
//takeRecords():remove all pending notifications from MutationObserver's
//notification queue and returns them in a new Arra of {MutationRecord}
    static input_f1_mut( var_id ) { 
//node that will be observed for mutations
        console.log("input_f1");
        const targetNode = document.getElementById(var_id);
// options for observer (wich mutation to observe)
        const config= {attributes: true, children: true, subtree: true};
// callback function to execute when mutations are observed
        const callback1= (mutationList, observer)=> {
          let v_yes=0;
          for (const mut of mutationList) {
            if (mut.type=== "childList") {
              console.log("a child node has been added or removed");
              v_yes+= 1;
              const child_input_f= document.getElementById("frequency1");
              if (child_input_f) {
                console.log("input 'frequency' was injected");
              }
            } else if (mut.type=== "attributes") {
                console.log(`${mut.attributeName} attribute was modified.`);
            }
          }
        };
// create an observer instance linked to the callback function
        const observer= new MutationObserver(callback);
// start observing the target node for configured mutations
        observer.observe(targetNode, config);
    }
}
export { mutation };