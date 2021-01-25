import React from "react"
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

// import options from "./data"

const MultiSelect = (options,employee, setClubsOwned) => {
    const opt=[];
    const[selectedOptions,setSelectedOptions] = React.useState([]);
    options.options.forEach(element => {
        opt.push({label:element.name,value:element.id}) 
    });
    console.log(opt);
    function onChange(value, event) {
        
        if (event.action === "select-option" && event.option.value ===
        "*") {
           this.setState(this.options);
        } else if (event.action === "deselect-option" &&
        event.option.value === "*") {
          this.setState([]);
        } else if (event.action === "deselect-option") {
          this.setState(value.filter(o => o.value !== "*"));
        } else if (value.length === this.options.length - 1) {
          this.setState(this.options);
        } else {
          this.setState(value);
        //   debugger
          console.log(value);
          setClubsOwned(value);
        }
      }
    return <ReactMultiSelectCheckboxes width='100%' placeholderButtonLabel="Clubs" options={opt} value={selectedOptions} onChange={onChange}  setState={setSelectedOptions} /> //value={selectedOptions} onChange={onChange}  setState={setSelectedOptions}
    
 // return <ReactMultiSelectCheckboxes  options={[{label: options.options[1].name, value: options.options[1].id},, ...options.options]}/>
}

export default MultiSelect;